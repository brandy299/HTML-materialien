# Leistungsabfrage online (Supabase, EU)

Ziel: Die Schüler/innen senden ihr Ergebnis per Tipp an die Lehrkraft, die Lehrkraft sieht es im Dashboard (`app/lehrer.html`), auch live.
Ohne diese Einrichtung funktioniert weiter der Weg „Code kopieren und schicken“.

## Wie es funktioniert

1. Die App verschlüsselt das Ergebnis auf dem Handy (AES-256-GCM, Schlüssel aus dem Klassen-Passwort, siehe `app/app.js` → `examCode`).
2. Nach einem Tipp auf „An Lehrkraft senden“ geht nur das hin: eine **Klassen-Kennung** (aus dem Passwort abgeleitet, verrät es nicht) und der **verschlüsselte Code**. Kein Kürzel, keine Punkte im Klartext.
3. Die Datenbank erlaubt Schüler/innen **nur Einfügen** (Row Level Security). Lesen und Löschen darf nur das **Lehrer-Konto**.
4. Das Dashboard holt die Codes, entschlüsselt sie im Browser mit dem Klassen-Passwort und zeigt die Auswertung. Optional live (alle 20 s).
5. Die Datenbank löscht Abgaben nach 8 Wochen selbst.

## Einrichtung (einmalig, ca. 10 Minuten)

1. Auf supabase.com ein Projekt anlegen, **Region „Frankfurt (eu-central-1)“**.
2. *SQL Editor*: den Block unten einfügen und ausführen.
3. *Authentication → Providers → Email*: **„Allow new users to sign up“ ausschalten**. Dann *Authentication → Users → Add user*: eine E-Mail und ein starkes Passwort für die Lehrkraft anlegen (Auto Confirm an).
4. *Project Settings → API*: die **Project URL** und den **anon/publishable key** in `app/cloud.js` eintragen (der Schlüssel darf öffentlich sein, die Rechte regelt die Datenbank). Danach per Pull Request nach `main`.
5. Mit dem **Auftragsverarbeitungsvertrag** (Data Processing Addendum) von Supabase abschließen, im Dashboard unter *Legal / Documents*.

```sql
create table public.abgaben (
  id uuid primary key default gen_random_uuid(),
  klasse text not null check (klasse ~ '^[0-9a-f]{32}$'),
  code text not null check (code like 'LA2.%' and length(code) < 4000),
  created_at timestamptz not null default now()
);
create index on public.abgaben (klasse, created_at);

alter table public.abgaben enable row level security;
create policy "Schüler dürfen einreichen" on public.abgaben for insert to anon with check (true);
create policy "Lehrkraft liest"           on public.abgaben for select to authenticated using (true);
create policy "Lehrkraft löscht"          on public.abgaben for delete to authenticated using (true);
grant insert on public.abgaben to anon;
grant select, delete on public.abgaben to authenticated;

-- Automatisch nach 8 Wochen löschen (Extension pg_cron unter Database → Extensions aktivieren)
create extension if not exists pg_cron;
select cron.schedule('abgaben-loeschen', '17 3 * * *', $$delete from public.abgaben where created_at < now() - interval '56 days'$$);
```

## Datenschutz: was noch zu klären ist (keine Rechtsberatung)

- **Auftragsverarbeitung:** Vertrag mit Supabase (siehe Schritt 5), Standort Frankfurt. Der Anbieter protokolliert technisch IP-Adressen, auch wenn der Inhalt verschlüsselt ist.
- **Schule:** Zustimmung von Schulleitung und Datenschutzbeauftragtem, Eintrag im Verfahrensverzeichnis, Information der Schüler/innen (bei Minderjährigen ggf. Eltern). Die App zeigt vor dem Senden einen kurzen Hinweis.
- **Löschfrist:** 8 Wochen automatisch. Die Lehrkraft kann im Dashboard jederzeit „Online-Abgaben der Klasse löschen“.
- **Grenzen:** Wer das Klassen-Passwort kennt, kann Codes erzeugen. Ein langes Passwort aus mehreren Wörtern wählen. Jeder kann Zeilen einfügen (Spam), aber nichts lesen. Die Zeilen ohne passendes Passwort werden im Dashboard als „nicht gewertet“ ausgesondert.
