-- ============================================================
-- LERNRAUM · Live-Quiz  (lernen.yannikbrand.eu/quiz/)
-- Einmal im Supabase-SQL-Editor ausführen (EU-Region).
-- Danach: Lehrer-PIN setzen (letzter Abschnitt), Adresse + anon-Key in quiz/config.js eintragen.
--
-- Datensparsamkeit:
--   · kein Login, keine Namen: nur Spitznamen, die Schüler/innen selbst wählen
--   · Tabellen sind für den öffentlichen Schlüssel gesperrt; Zugriff nur über die Funktionen unten
--   · Räume werden nach 24 Stunden samt Antworten automatisch gelöscht
-- Der Skript ist wiederholbar (kann erneut ausgeführt werden, z. B. nach Updates).
-- ============================================================

create table if not exists quiz_config (
  id int primary key default 1 check (id = 1),
  teacher_pin text not null
);

create table if not exists quiz_rooms (
  code text primary key,
  secret text not null,
  title text not null,
  questions jsonb not null,
  status text not null default 'open' check (status in ('open','closed')),
  created_at timestamptz not null default now()
);

alter table quiz_rooms add column if not exists bonus boolean not null default false;

create table if not exists quiz_players (
  id uuid primary key default gen_random_uuid(),
  code text not null references quiz_rooms(code) on delete cascade,
  nick text not null,
  token text not null,
  joined_at timestamptz not null default now(),
  unique (code, nick)
);

create table if not exists quiz_answers (
  player_id uuid not null references quiz_players(id) on delete cascade,
  q int not null,
  given jsonb,
  ok boolean not null,
  at timestamptz not null default now(),
  primary key (player_id, q)
);
alter table quiz_answers add column if not exists bonus boolean not null default false;

-- Status: lobby (Warteraum) -> open (läuft) -> closed (beendet). Auch für bestehende Installationen:
alter table quiz_rooms drop constraint if exists quiz_rooms_status_check;
alter table quiz_rooms add constraint quiz_rooms_status_check check (status in ('lobby','open','closed'));

alter table quiz_config  enable row level security;
alter table quiz_rooms   enable row level security;
alter table quiz_players enable row level security;
alter table quiz_answers enable row level security;
revoke all on quiz_config, quiz_rooms, quiz_players, quiz_answers from anon, authenticated;

-- Hilfsfunktion: Text vergleichbar machen
create or replace function quiz_norm(t text) returns text
language sql immutable as $$ select lower(btrim(regexp_replace(coalesce(t,''), '\s+', ' ', 'g'))) $$;

-- Fragen ohne Lösung (für Schüler/innen)
create or replace function quiz_strip(qs jsonb) returns jsonb
language sql immutable as $$
  select coalesce(jsonb_agg(q - 'a' - 'e' order by ord), '[]'::jsonb)
  from jsonb_array_elements(qs) with ordinality as t(q, ord)
$$;

-- Alte Räume löschen (> 24 h)
create or replace function quiz_cleanup() returns void
language sql security definer set search_path = public as $$
  delete from quiz_rooms where created_at < now() - interval '24 hours'
$$;

-- Raum anlegen (Lehrkraft) --------------------------------------------------
create or replace function quiz_create(p_pin text, p_title text, p_questions jsonb, p_secret text)
returns text language plpgsql security definer set search_path = public as $$
declare v_code text; v_pin text; i int := 0;
begin
  select teacher_pin into v_pin from quiz_config where id = 1;
  if v_pin is null then raise exception 'NO_PIN'; end if;
  if v_pin <> coalesce(p_pin,'') then raise exception 'BAD_PIN'; end if;
  if jsonb_typeof(p_questions) <> 'array' or jsonb_array_length(p_questions) not between 1 and 40 then
    raise exception 'BAD_QUESTIONS'; end if;
  if length(coalesce(p_secret,'')) < 16 then raise exception 'BAD_SECRET'; end if;
  perform quiz_cleanup();
  loop
    v_code := lpad((floor(random() * 90000) + 10000)::int::text, 5, '0');
    exit when not exists (select 1 from quiz_rooms where code = v_code);
    i := i + 1; if i > 50 then raise exception 'NO_CODE'; end if;
  end loop;
  insert into quiz_rooms(code, secret, title, questions)
  values (v_code, p_secret, left(coalesce(nullif(btrim(p_title),''),'Quiz'), 80), p_questions);
  return v_code;
end $$;

-- Beitreten (Schüler/in) --------------------------------------------------
create or replace function quiz_join(p_code text, p_nick text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare r quiz_rooms; v_id uuid; v_tok text; v_nick text := left(btrim(coalesce(p_nick,'')), 20);
begin
  select * into r from quiz_rooms where code = p_code;
  if not found then raise exception 'NO_ROOM'; end if;
  if r.status = 'closed' then raise exception 'CLOSED'; end if;
  if length(v_nick) < 2 then raise exception 'BAD_NICK'; end if;
  if (select count(*) from quiz_players where code = p_code) >= 80 then raise exception 'FULL'; end if;
  if exists (select 1 from quiz_players where code = p_code and lower(nick) = lower(v_nick)) then
    raise exception 'NICK_TAKEN'; end if;
  v_tok := replace(gen_random_uuid()::text, '-', '');
  insert into quiz_players(code, nick, token) values (p_code, v_nick, v_tok) returning id into v_id;
  return jsonb_build_object('pid', v_id, 'token', v_tok, 'nick', v_nick, 'title', r.title,
                            'questions', quiz_strip(r.questions), 'status', r.status);
end $$;

-- Antworten (Schüler/in) --------------------------------------------------
create or replace function quiz_answer(p_code text, p_pid uuid, p_token text, p_q int, p_given jsonb)
returns jsonb language plpgsql security definer set search_path = public as $$
declare r quiz_rooms; qq jsonb; v_ok boolean := false; v_a jsonb; ex quiz_answers;
        v_bonus boolean := false; v_tot int; v_my int; v_ahead int;
begin
  select * into r from quiz_rooms where code = p_code;
  if not found then raise exception 'NO_ROOM'; end if;
  if not exists (select 1 from quiz_players where id = p_pid and code = p_code and token = p_token) then
    raise exception 'NO_PLAYER'; end if;
  if r.status = 'lobby' then raise exception 'NOT_STARTED'; end if;
  if r.status <> 'open' then raise exception 'CLOSED'; end if;
  if p_q < 0 or p_q >= jsonb_array_length(r.questions) then raise exception 'BAD_Q'; end if;
  if length(p_given::text) > 300 then raise exception 'TOO_LONG'; end if;
  qq := r.questions -> p_q;
  if qq->>'t' = 'text' then
    v_a := qq->'a'->0;
  else
    v_a := qq->'a';
  end if;
  -- erste Antwort zählt
  select * into ex from quiz_answers where player_id = p_pid and q = p_q;
  if found then
    return jsonb_build_object('ok', ex.ok, 'a', v_a, 'e', qq->'e', 'bonus', ex.bonus);
  end if;
  if qq->>'t' = 'text' then
    v_ok := exists (select 1 from jsonb_array_elements_text(qq->'a') x where quiz_norm(x) = quiz_norm(p_given #>> '{}'));
  else
    v_ok := (p_given #>> '{}') = (qq->>'a');
  end if;
  -- Aufholbonus: richtige Antwort im letzten Drittel (ab 4 Personen) zählt doppelt
  if v_ok and r.bonus then
    select count(*) into v_tot from quiz_players where code = p_code;
    select (select count(*) from quiz_answers a where a.player_id = p_pid and a.ok)
         + (select count(*) from quiz_answers a where a.player_id = p_pid and a.bonus) into v_my;
    select count(*) into v_ahead from (
      select (select count(*) from quiz_answers a where a.player_id = p.id and a.ok)
           + (select count(*) from quiz_answers a where a.player_id = p.id and a.bonus) as s
      from quiz_players p where p.code = p_code) t where t.s > v_my;
    v_bonus := v_tot >= 4 and v_ahead >= ceil(v_tot * 2.0 / 3.0)::int;
  end if;
  insert into quiz_answers(player_id, q, given, ok, bonus) values (p_pid, p_q, p_given, v_ok, v_bonus)
  on conflict (player_id, q) do nothing;
  return jsonb_build_object('ok', v_ok, 'a', v_a, 'e', qq->'e', 'bonus', v_bonus);
end $$;

-- Stand abfragen (Schüler/in: Wiedereinstieg + Raum beendet?) ------------------
create or replace function quiz_player_state(p_code text, p_pid uuid, p_token text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare r quiz_rooms; v_answers jsonb;
begin
  select * into r from quiz_rooms where code = p_code;
  if not found then raise exception 'NO_ROOM'; end if;
  if not exists (select 1 from quiz_players where id = p_pid and code = p_code and token = p_token) then
    raise exception 'NO_PLAYER'; end if;
  select coalesce(jsonb_agg(jsonb_build_object(
           'q', a.q, 'ok', a.ok, 'given', a.given,
           'a', case when r.questions->a.q->>'t' = 'text' then r.questions->a.q->'a'->0 else r.questions->a.q->'a' end,
           'e', r.questions->a.q->'e', 'bonus', a.bonus) order by a.q), '[]'::jsonb)
    into v_answers from quiz_answers a where a.player_id = p_pid;
  return jsonb_build_object('status', r.status, 'title', r.title,
                            'questions', quiz_strip(r.questions), 'answers', v_answers,
                            'count', (select count(*) from quiz_players where code = p_code));
end $$;

-- Live-Stand (Lehrkraft) ------------------------------------------------------
create or replace function quiz_teacher_state(p_code text, p_secret text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare r quiz_rooms; v_players jsonb;
begin
  select * into r from quiz_rooms where code = p_code and secret = p_secret;
  if not found then raise exception 'NO_ROOM'; end if;
  select coalesce(jsonb_agg(jsonb_build_object(
      'id', p.id, 'nick', p.nick,
      'bn', (select count(*) from quiz_answers a where a.player_id = p.id and a.bonus),
      'r', (select jsonb_agg((select a.ok from quiz_answers a where a.player_id = p.id and a.q = g) order by g)
            from generate_series(0, jsonb_array_length(r.questions) - 1) g)
    ) order by p.joined_at), '[]'::jsonb)
  into v_players from quiz_players p where p.code = p_code;
  return jsonb_build_object('status', r.status, 'title', r.title, 'questions', r.questions,
                            'players', v_players, 'created', r.created_at, 'bonus', r.bonus);
end $$;

-- Zuschauer-Ansicht für fertige Schüler/innen: nur Spitzname und Fortschritt, keine Antworten ------
create or replace function quiz_watch_state(p_code text, p_pid uuid, p_token text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare r quiz_rooms; v_players jsonb;
begin
  select * into r from quiz_rooms where code = p_code;
  if not found then raise exception 'NO_ROOM'; end if;
  if not exists (select 1 from quiz_players where id = p_pid and code = p_code and token = p_token) then
    raise exception 'NO_PLAYER'; end if;
  select coalesce(jsonb_agg(jsonb_build_object(
      'id', p.n::text, 'me', p.id = p_pid, 'nick', p.nick,
      'done', (select count(*) from quiz_answers a where a.player_id = p.id),
      'ok', (select count(*) from quiz_answers a where a.player_id = p.id and a.ok),
      'bn', (select count(*) from quiz_answers a where a.player_id = p.id and a.bonus)
    ) order by p.n), '[]'::jsonb)
  into v_players
  from (select q.*, row_number() over (order by q.joined_at) as n from quiz_players q where q.code = p_code) p;
  return jsonb_build_object('status', r.status, 'n', jsonb_array_length(r.questions), 'bonus', r.bonus, 'players', v_players);
end $$;

-- Quiz beenden / wieder öffnen / Teilnehmer entfernen (Lehrkraft) ----------------
create or replace function quiz_set_status(p_code text, p_secret text, p_status text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_status not in ('lobby','open','closed') then raise exception 'BAD_STATUS'; end if;
  update quiz_rooms set status = p_status where code = p_code and secret = p_secret;
  if not found then raise exception 'NO_ROOM'; end if;
end $$;

create or replace function quiz_set_bonus(p_code text, p_secret text, p_bonus boolean)
returns void language plpgsql security definer set search_path = public as $$
begin
  update quiz_rooms set bonus = coalesce(p_bonus, false) where code = p_code and secret = p_secret;
  if not found then raise exception 'NO_ROOM'; end if;
end $$;

create or replace function quiz_remove_player(p_code text, p_secret text, p_pid uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from quiz_rooms where code = p_code and secret = p_secret) then raise exception 'NO_ROOM'; end if;
  delete from quiz_players where id = p_pid and code = p_code;
end $$;

create or replace function quiz_delete_room(p_code text, p_secret text)
returns void language plpgsql security definer set search_path = public as $$
begin
  delete from quiz_rooms where code = p_code and secret = p_secret;
end $$;

-- Rechte: nur diese Funktionen darf der öffentliche Schlüssel aufrufen -----------
revoke all on function quiz_cleanup() from public, anon, authenticated;
grant execute on function
  quiz_create(text, text, jsonb, text),
  quiz_join(text, text),
  quiz_answer(text, uuid, text, int, jsonb),
  quiz_player_state(text, uuid, text),
  quiz_teacher_state(text, text),
  quiz_watch_state(text, uuid, text),
  quiz_set_status(text, text, text),
  quiz_set_bonus(text, text, boolean),
  quiz_remove_player(text, text, uuid),
  quiz_delete_room(text, text)
to anon, authenticated;

-- ============================================================
-- LETZTER SCHRITT (einmal, mit eigener PIN):
--   insert into quiz_config(id, teacher_pin) values (1, 'DEINE-PIN')
--   on conflict (id) do update set teacher_pin = excluded.teacher_pin;
-- Ohne PIN kann niemand Räume anlegen. Die PIN tippst du im Quiz einmal pro Gerät ein.
-- ============================================================
