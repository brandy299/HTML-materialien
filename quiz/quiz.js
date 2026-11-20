/* ============================================================
   LERNRAUM · Live-Quiz
   Lehrkraft legt einen Raum an, Schüler/innen treten per Code bei,
   Lehrkraft sieht den Fortschritt jedes Spitznamens live (Beamer-Ansicht).
   Backend: Supabase-Funktionen (supabase/quiz.sql). Ohne config.js → Demo-Modus.
   Anleitung: docs/LIVE-QUIZ.md
   ============================================================ */
(() => {
  "use strict";
  const root = document.getElementById("qz");
  /* Selbstheilung bei altem Stylesheet aus dem Browser-Cache (GitHub Pages cached bis ~10 Min.) */
  const CSS_NEED = "9";
  if (getComputedStyle(document.documentElement).getPropertyValue("--quiz-css").trim() !== CSS_NEED) {
    const l = document.createElement("link"); l.rel = "stylesheet"; l.href = `quiz.css?fresh=${Date.now()}`; document.head.appendChild(l);
  }
  const CFG = window.QUIZ_CONFIG || {};
  const LIVE = !!(CFG.url && CFG.key);
  const MAX_Q = 40;
  const POLL_T = 2000, POLL_S = 5000;

  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = {
    get(k, d = null) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignorieren */ } },
    del(k) { try { localStorage.removeItem(k); } catch { /* ignorieren */ } }
  };
  const rid = (n = 16) => Array.from(crypto.getRandomValues(new Uint8Array(n)), (b) => b.toString(16).padStart(2, "0")).join("");
  const norm = (t) => String(t ?? "").replace(/\s+/g, " ").trim().toLowerCase();

  const ERR = {
    NO_ROOM: "Diesen Raum gibt es nicht (mehr). Prüfe den Code.",
    CLOSED: "Das Quiz ist schon beendet.",
    NOT_STARTED: "Das Quiz hat noch nicht begonnen.",
    NICK_TAKEN: "Dieser Spitzname ist schon vergeben. Nimm einen anderen.",
    BAD_NICK: "Der Spitzname braucht mindestens 2 Zeichen.",
    FULL: "Der Raum ist voll (80 Personen).",
    BAD_PIN: "Die PIN stimmt nicht.",
    NO_PIN: "Auf dem Server ist noch keine Lehrer-PIN gesetzt (siehe docs/LIVE-QUIZ.md).",
    NO_PLAYER: "Du bist in diesem Raum nicht mehr angemeldet.",
    BAD_QUESTIONS: "Wähle 1 bis 40 Fragen aus.",
    OFFLINE: "Keine Verbindung. Prüfe dein Internet und versuche es noch einmal."
  };
  const errText = (e) => ERR[String(e && e.message || e).trim()] || ERR.OFFLINE;

  /* ── Backend: echt (Supabase) oder Demo (localStorage) ───────── */
  async function rpcLive(name, args) {
    let res;
    try {
      res = await fetch(`${CFG.url.replace(/\/$/, "")}/rest/v1/rpc/${name}`, {
        method: "POST",
        headers: { apikey: CFG.key, Authorization: `Bearer ${CFG.key}`, "Content-Type": "application/json" },
        body: JSON.stringify(args)
      });
    } catch { throw new Error("OFFLINE"); }
    let data = null;
    try { data = await res.json(); } catch { /* leer */ }
    if (!res.ok) throw new Error((data && data.message) || "OFFLINE");
    return data;
  }

  /* Demo: gleiche Regeln wie in supabase/quiz.sql, aber nur in diesem Browser (mehrere Tabs). */
  const DEMO_KEY = "quiz.demo";
  const demoDB = () => store.get(DEMO_KEY, { rooms: {}, players: [], answers: [] });
  const strip = (qs) => qs.map(({ a, e, ...rest }) => rest);
  function rpcDemo(name, a) {
    const db = demoDB();
    const save = () => store.set(DEMO_KEY, db);
    const room = (code, secret) => {
      const r = db.rooms[code];
      if (!r || (secret !== undefined && r.secret !== secret)) throw new Error("NO_ROOM");
      return r;
    };
    const player = (code, pid, token) => {
      const p = db.players.find((x) => x.id === pid && x.code === code && x.token === token);
      if (!p) throw new Error("NO_PLAYER");
      return p;
    };
    const solution = (q) => (q.t === "text" ? q.a[0] : q.a);
    switch (name) {
      case "quiz_create": {
        if (!a.p_questions.length || a.p_questions.length > MAX_Q) throw new Error("BAD_QUESTIONS");
        let code; do { code = String(10000 + Math.floor(Math.random() * 90000)); } while (db.rooms[code]);
        db.rooms[code] = { code, secret: a.p_secret, title: (a.p_title || "Quiz").slice(0, 80), questions: a.p_questions, status: "open", bonus: false, created: new Date().toISOString() };
        save(); return code;
      }
      case "quiz_join": {
        const r = room(a.p_code);
        if (r.status === "closed") throw new Error("CLOSED");
        const nick = String(a.p_nick || "").trim().slice(0, 20);
        if (nick.length < 2) throw new Error("BAD_NICK");
        if (db.players.some((p) => p.code === a.p_code && p.nick.toLowerCase() === nick.toLowerCase())) throw new Error("NICK_TAKEN");
        if (db.players.filter((p) => p.code === a.p_code).length >= 80) throw new Error("FULL");
        const p = { id: rid(8), code: a.p_code, nick, token: rid() };
        db.players.push(p); save();
        return { pid: p.id, token: p.token, nick, title: r.title, questions: strip(r.questions), status: r.status };
      }
      case "quiz_answer": {
        const r = room(a.p_code); player(a.p_code, a.p_pid, a.p_token);
        if (r.status === "lobby") throw new Error("NOT_STARTED");
        if (r.status !== "open") throw new Error("CLOSED");
        const q = r.questions[a.p_q]; if (!q) throw new Error("BAD_Q");
        let ex = db.answers.find((x) => x.pid === a.p_pid && x.q === a.p_q);
        if (!ex) {
          const ok = q.t === "text" ? q.a.some((x) => norm(x) === norm(a.p_given)) : String(a.p_given) === String(q.a);
          let bonus = false;
          if (ok && r.bonus) {
            const ps = db.players.filter((p) => p.code === a.p_code);
            const steps = (id) => db.answers.filter((x) => x.pid === id && x.ok).length + db.answers.filter((x) => x.pid === id && x.bonus).length;
            const mine = steps(a.p_pid), ahead = ps.filter((p) => steps(p.id) > mine).length;
            bonus = ps.length >= 4 && ahead >= Math.ceil((ps.length * 2) / 3);
          }
          ex = { pid: a.p_pid, q: a.p_q, given: a.p_given, ok, bonus }; db.answers.push(ex); save();
        }
        return { ok: ex.ok, a: solution(q), e: q.e || null, bonus: !!ex.bonus };
      }
      case "quiz_player_state": {
        const r = room(a.p_code); player(a.p_code, a.p_pid, a.p_token);
        const answers = db.answers.filter((x) => x.pid === a.p_pid).sort((x, y) => x.q - y.q)
          .map((x) => ({ q: x.q, ok: x.ok, given: x.given, a: solution(r.questions[x.q]), e: r.questions[x.q].e || null, bonus: !!x.bonus }));
        return { status: r.status, title: r.title, questions: strip(r.questions), answers, count: db.players.filter((p) => p.code === a.p_code).length };
      }
      case "quiz_watch_state": {
        const r = room(a.p_code); player(a.p_code, a.p_pid, a.p_token);
        const players = db.players.filter((p) => p.code === a.p_code).map((p, k) => ({
          id: String(k + 1), me: p.id === a.p_pid, nick: p.nick,
          done: db.answers.filter((x) => x.pid === p.id).length, ok: db.answers.filter((x) => x.pid === p.id && x.ok).length, bn: db.answers.filter((x) => x.pid === p.id && x.bonus).length }));
        return { status: r.status, n: r.questions.length, bonus: !!r.bonus, players };
      }
      case "quiz_teacher_state": {
        const r = room(a.p_code, a.p_secret);
        const players = db.players.filter((p) => p.code === a.p_code).map((p) => ({
          id: p.id, nick: p.nick, bn: db.answers.filter((x) => x.pid === p.id && x.bonus).length,
          r: r.questions.map((_, i) => { const x = db.answers.find((y) => y.pid === p.id && y.q === i); return x ? x.ok : null; })
        }));
        return { status: r.status, title: r.title, questions: r.questions, players, created: r.created, bonus: !!r.bonus };
      }
      case "quiz_set_bonus": room(a.p_code, a.p_secret).bonus = !!a.p_bonus; save(); return null;
      case "quiz_set_status": room(a.p_code, a.p_secret).status = a.p_status; save(); return null;
      case "quiz_remove_player": room(a.p_code, a.p_secret); db.players = db.players.filter((p) => p.id !== a.p_pid); save(); return null;
      case "quiz_delete_room": delete db.rooms[a.p_code]; db.players = db.players.filter((p) => p.code !== a.p_code); save(); return null;
    }
    throw new Error("OFFLINE");
  }
  const rpc = (name, args) => (LIVE ? rpcLive(name, args) : Promise.resolve().then(() => rpcDemo(name, args)));

  /* ── Router ──────────────────────────────────────────────────── */
  let stopTimer = null;
  function clearTimer() { if (stopTimer) { stopTimer(); stopTimer = null; } }
  function every(ms, fn) {
    let alive = true, t;
    const tick = async () => {
      if (!alive) return;
      if (!document.hidden) { try { await fn(); } catch { /* nächster Versuch */ } }
      if (alive) t = setTimeout(tick, ms);
    };
    t = setTimeout(tick, ms);
    stopTimer = () => { alive = false; clearTimeout(t); };
  }
  function show(html, wide, still) {
    root.innerHTML = `<main class="qz${wide ? " wide" : ""}${still ? " still" : ""}">${LIVE ? "" : `<p class="demo no-beamer">DEMO-MODUS · Läuft nur in diesem Browser (zum Ausprobieren mit zwei Tabs). Für echte Klassen: docs/LIVE-QUIZ.md.</p>`}${html}</main>`;
    return root.firstElementChild;
  }
  const baseUrl = () => location.origin + location.pathname.replace(/index\.html$/, "");
  const joinUrl = (code) => `${baseUrl()}#/${code}`;

  let onFsExit = null;
  document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement && onFsExit) onFsExit(); });
  function route() {
    clearTimer(); onFsExit = null;
    document.body.classList.remove("beamer");
    const h = location.hash.replace(/^#\/?/, "");
    const [a, b] = h.split("/");
    if (a === "lehrer") return viewSetup();
    if (a === "raum" && /^\d{5}$/.test(b || "")) return viewRoom(b);
    if (a === "spiel" && /^\d{5}$/.test(b || "")) return viewPlay(b);
    if (/^\d{5}$/.test(a)) {
      if (store.get(`quiz.player.${a}`)) { location.replace(`#/spiel/${a}`); return; }
      return viewStart(a);
    }
    return viewStart("");
  }
  window.addEventListener("hashchange", route);

  /* ── Start: beitreten ────────────────────────────────────────── */
  function viewStart(code) {
    const el = show(`
      <header class="top"><span class="tag-box"><i class="sq"></i>Live-Quiz</span><a class="tag-box ink no-beamer" href="#/lehrer">Lehrkraft →</a></header>
      <h1 class="display">Quiz<br>starten.<small>Gib den Code von der Tafel ein und wähle einen Spitznamen.</small></h1>
      <form class="win stack" id="join" style="margin-top:28px" autocomplete="off">
        <div class="bar"><span class="d"></span><span class="id">BEITRETEN</span></div>
        <div class="body" style="display:grid;gap:14px">
          <label class="field"><span>Raumcode (5 Ziffern)</span>
            <input class="input code-input" id="code" inputmode="numeric" pattern="[0-9]*" maxlength="5" value="${esc(code)}" autocomplete="off"></label>
          <label class="field"><span>Spitzname (nicht dein echter Name)</span>
            <input class="input" id="nick" maxlength="20" autocomplete="off" autocapitalize="words" placeholder="z. B. Blitz42"></label>
          <button class="btn pink block" type="submit">Beitreten</button>
          <div id="err"></div>
        </div>
      </form>
      <p class="hint">Es werden keine Namen und keine Konten gespeichert. Der Raum wird nach 24 Stunden gelöscht.</p>`);
    const f = el.querySelector("#join"), c = el.querySelector("#code"), n = el.querySelector("#nick");
    c.addEventListener("input", () => { c.value = c.value.replace(/\D/g, "").slice(0, 5); });
    (code ? n : c).focus();
    f.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const err = el.querySelector("#err"), btn = f.querySelector("button");
      if (!/^\d{5}$/.test(c.value)) { err.innerHTML = `<p class="msg">Der Code hat 5 Ziffern.</p>`; return; }
      btn.disabled = true; err.innerHTML = "";
      try {
        const r = await rpc("quiz_join", { p_code: c.value, p_nick: n.value });
        store.set(`quiz.player.${c.value}`, { pid: r.pid, token: r.token, nick: r.nick, title: r.title, questions: r.questions, answers: {} });
        location.hash = `#/spiel/${c.value}`;
      } catch (e) { err.innerHTML = `<p class="msg">${esc(errText(e))}</p>`; btn.disabled = false; }
    });
  }

  /* ── Schüler/in: Fragen beantworten ──────────────────────────── */
  async function viewPlay(code) {
    const me = store.get(`quiz.player.${code}`);
    if (!me) { location.replace(`#/${code}`); return; }
    let state = { status: "open", questions: me.questions, answers: me.answers || {}, title: me.title };
    let cur = null;   // Frage, deren Rückmeldung gerade sichtbar ist
    let busy = false, note = "";

    const apply = (s) => {
      state.status = s.status; state.questions = s.questions; state.title = s.title; state.count = s.count;
      const m = {}; s.answers.forEach((x) => { m[x.q] = x; }); state.answers = m;
    };
    try { apply(await rpc("quiz_player_state", { p_code: code, p_pid: me.pid, p_token: me.token })); }
    catch (e) {
      if (String(e.message) === "NO_ROOM" || String(e.message) === "NO_PLAYER") { store.del(`quiz.player.${code}`); }
      show(`<header class="top"><span class="tag-box"><i class="sq"></i>Live-Quiz</span></header><p class="msg">${esc(errText(e))}</p><p style="margin-top:16px"><a class="btn ghost" href="#/">Zurück</a></p>`);
      return;
    }
    const total = () => state.questions.length;
    const answeredN = () => Object.keys(state.answers).length;
    const nextIdx = () => { for (let i = 0; i < total(); i++) if (!state.answers[i]) return i; return -1; };
    const segs = (active) => `<div class="seg" aria-label="Fortschritt">${state.questions.map((_, i) => {
      const x = state.answers[i]; return `<i class="${x ? (x.ok ? "ok" : "no") : (i === active ? "cur" : "")}"></i>`; }).join("")}</div>`;
    const head = `<header class="top"><span class="tag-box"><i class="sq"></i>${esc(me.nick)}</span><span class="q-count">Raum ${esc(code)}</span></header>`;

    function render() {
      clearTimer();
      if (state.status === "closed") return renderEnd();
      if (state.status === "lobby") return renderLobby();
      const idx = cur != null ? cur : nextIdx();
      if (idx === -1) return renderWait();
      const q = state.questions[idx], ans = state.answers[idx];
      let body;
      if (q.t === "text") {
        body = `<form id="tf" autocomplete="off"><input class="input" id="tv" maxlength="120" placeholder="Deine Antwort" ${ans ? "disabled" : ""} value="${esc(ans ? ans.given : "")}">
          ${ans ? "" : `<button class="btn pink block" style="margin-top:12px" type="submit">Prüfen</button>`}</form>`;
      } else {
        body = `<div class="options ${ans ? "locked" : ""}">${q.o.map((o, i) => {
          let c = "";
          if (ans) { if (i === Number(ans.a)) c = "right"; else if (i === Number(ans.given)) c = "wrong"; }
          return `<button class="option ${c}" data-i="${i}"><span class="key">${"ABCD"[i]}</span><span>${esc(o)}</span></button>`;
        }).join("")}</div>`;
      }
      let fb = "";
      if (ans) {
        fb = `<div class="term"><span class="ln ${ans.ok ? "ok" : "no"}">${ans.ok ? "✓ Richtig." : "✗ Leider falsch."}</span>` +
          (ans.bonus ? `<span class="ln ok">★ Aufholbonus: doppelte Punkte!</span>` : "") +
          (q.t === "text" && !ans.ok ? `<span class="ln">Richtig wäre: ${esc(ans.a)}</span>` : "") +
          (ans.e ? `<span class="ln mut">${esc(ans.e)}</span>` : "") + `</div>
          <button class="btn block" id="next" style="margin-top:14px">${nextIdx() === -1 ? "Fertig" : "Weiter"}</button>`;
      }
      const el = show(`${head}${segs(idx)}
        <div class="q-count" style="margin-top:14px">Frage ${idx + 1} von ${total()}</div>
        <h2 class="q-text">${esc(q.q)}</h2>${body}${fb}${note ? `<p class="msg">${esc(note)}</p>` : ""}`);
      note = "";
      el.querySelectorAll(".option").forEach((b) => { b.onclick = () => send(idx, Number(b.dataset.i)); });
      const tf = el.querySelector("#tf");
      if (tf && !ans) { tf.onsubmit = (ev) => { ev.preventDefault(); const v = el.querySelector("#tv").value.trim(); if (v) send(idx, v); }; el.querySelector("#tv").focus(); }
      const nx = el.querySelector("#next"); if (nx) nx.onclick = () => { cur = null; render(); };
    }
    async function send(idx, given) {
      if (busy) return; busy = true;
      try {
        const r = await rpc("quiz_answer", { p_code: code, p_pid: me.pid, p_token: me.token, p_q: idx, p_given: given });
        state.answers[idx] = { q: idx, ok: r.ok, given, a: r.a, e: r.e, bonus: !!r.bonus };
        cur = idx;
      } catch (e) {
        if (String(e.message) === "CLOSED") state.status = "closed"; else note = errText(e);
      }
      busy = false; render();
    }
    function renderLobby() {
      show(`${head}<div class="win lobby"><div class="bar"><span class="d"></span><span class="id">WARTERAUM</span></div>
        <div class="body"><p class="kick">${esc(state.title)}</p><p class="say">Du bist dabei, ${esc(me.nick)}.</p>
        <p class="sub" style="margin-top:8px">Gleich geht es los. Die Lehrkraft startet das Quiz.</p>
        <div class="waitdots" aria-hidden="true"><i></i><i></i><i></i></div>
        <p class="sub"><b id="cnt">${state.count ?? 1}</b> <span id="cntl">${(state.count ?? 1) === 1 ? "Person" : "Personen"}</span> im Raum · ${total()} Fragen</p></div></div>`);
      every(2000, async () => {
        const s2 = await rpc("quiz_player_state", { p_code: code, p_pid: me.pid, p_token: me.token });
        if (s2.status === "lobby") { const c = root.querySelector("#cnt"), l = root.querySelector("#cntl"); if (c) c.textContent = s2.count; if (l) l.textContent = s2.count === 1 ? "Person" : "Personen"; return; }
        clearTimer(); apply(s2); countdown();
      });
    }
    function countdown() {
      if (state.status !== "open") { render(); return; }
      let k = 3;
      const tick = () => {
        show(`<div class="countdown" aria-live="assertive"><span>${k > 0 ? k : "Los!"}</span></div>`);
        if (k-- < 0) { render(); return; }
        setTimeout(tick, k < 0 ? 600 : 800);
      };
      tick();
    }
    function ownScore() { const v = Object.values(state.answers); return { ok: v.filter((x) => x.ok).length, b: v.filter((x) => x.bonus).length, n: total() }; }
    function renderWait() {
      const s = ownScore();
      show(`${head}${segs(-1)}
        <div class="win" style="margin-top:20px"><div class="bar"><span class="d"></span><span class="id">FERTIG</span></div>
        <div class="body"><p class="kick">Dein Ergebnis</p><p class="score">${s.ok}<span style="font-size:.5em;color:var(--ink-2)"> / ${s.n}</span></p>
        ${s.b ? `<p class="sub" style="margin-top:8px">+ ${s.b} Bonuspunkt${s.b > 1 ? "e" : ""} durch den Aufholbonus</p>` : ""}<p class="sub" style="margin-top:12px">Du bist fertig. Unten siehst du live, wie die anderen noch laufen. Wenn die Lehrkraft beendet, siehst du alle Antworten.</p></div></div>
        <h3 class="section-head">Das Rennen live</h3><div id="raceSlot"></div>
        <p style="margin-top:16px"><button class="btn ghost block" id="rev">Meine Antworten ansehen</button></p>`);
      root.querySelector("#rev").onclick = () => { cur = 0; renderReview(); };
      const paintWatch = (w) => {
        const ps = w.players.map((p, i) => ({ ...p, i, r: Array(w.n).fill(null) }));
        const o = { hide: false, beamer: false, detail: false, bonus: !!w.bonus, closed: false, watch: true, me: (ps.find((p) => p.me) || {}).id };
        const cur0 = root.querySelector("#race");
        if (cur0 && cur0.dataset.sig === QuizRace.sig(ps, w.n, o)) { QuizRace.update(cur0, ps, w.n, o); return; }
        const holder = cur0 || root.querySelector("#raceSlot");
        if (!holder) return;
        holder.outerHTML = QuizRace.html(ps, w.n, o);
        QuizRace.update(root.querySelector("#race"), ps, w.n, o);
      };
      const poll = async () => {
        const w = await rpc("quiz_watch_state", { p_code: code, p_pid: me.pid, p_token: me.token });
        if (w.status === "closed") { apply(await rpc("quiz_player_state", { p_code: code, p_pid: me.pid, p_token: me.token })); render(); return; }
        paintWatch(w);
      };
      poll().catch(() => {});
      every(2000, poll);
    }
    function renderReview() {
      clearTimer();
      show(`${head}<h2 class="h2">Deine Antworten</h2><ul class="review" style="margin-top:14px">${state.questions.map((q, i) => {
        const x = state.answers[i];
        return `<li class="${x ? (x.ok ? "ok" : "no") : ""}"><b>${x ? (x.ok ? "✓" : "✗") : "–"}</b><span>${esc(q.q)}${x && !x.ok ? `<br><span class="hint">Richtig: ${esc(q.t === "text" ? x.a : q.o[Number(x.a)])}</span>` : ""}</span></li>`; }).join("")}</ul>
        <p style="margin-top:16px"><button class="btn block" id="bk">Zurück</button></p>`);
      root.querySelector("#bk").onclick = () => { cur = null; render(); };
    }
    function renderEnd() {
      const s = ownScore();
      show(`${head}<div class="win"><div class="bar"><span class="d"></span><span class="id">QUIZ BEENDET</span></div>
        <div class="body"><p class="kick">${esc(state.title)}</p><p class="score">${s.ok}<span style="font-size:.5em;color:var(--ink-2)"> / ${s.n}</span></p>
        <p class="sub" style="margin-top:10px">${s.b ? `+ ${s.b} Bonuspunkt${s.b > 1 ? "e" : ""} durch den Aufholbonus. ` : ""}${answeredN() < s.n ? `Du hast ${answeredN()} von ${s.n} Fragen beantwortet.` : "Gut gemacht."}</p></div></div>
        <h3 class="section-head">Alle Fragen</h3>
        <ul class="review">${state.questions.map((q, i) => { const x = state.answers[i];
          return `<li class="${x ? (x.ok ? "ok" : "no") : ""}"><b>${x ? (x.ok ? "✓" : "✗") : "–"}</b><span>${esc(q.q)}${x && !x.ok ? `<br><span class="hint">Richtig: ${esc(q.t === "text" ? x.a : q.o[Number(x.a)])}</span>` : ""}${x && x.e ? `<br><span class="hint">${esc(x.e)}</span>` : ""}</span></li>`; }).join("")}</ul>
        <p style="margin-top:20px"><button class="btn ghost block" id="leave">Raum verlassen</button></p>`);
      root.querySelector("#leave").onclick = () => { store.del(`quiz.player.${code}`); location.hash = "#/"; };
    }
    render();
  }

  /* ── Lehrkraft: Quiz zusammenstellen ─────────────────────────── */
  /* Kursfragen kommen aus dem Lernraum (nur lesend, öffentlich) */
  const COURSE_BASE = "https://lernen.yannikbrand.eu/app/";
  let courseCache = null;
  function plain(html) { const d = document.createElement("div"); d.innerHTML = html; return d.textContent.replace(/\s+/g, " ").trim(); }
  function loadScript(src) {
    return new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = () => rej(new Error(src)); document.head.appendChild(s); });
  }
  async function loadCourses() {
    if (courseCache) return courseCache;
    const html = await (await fetch(COURSE_BASE + "index.html")).text();
    const files = [...html.matchAll(/<script src="(kurse\/[a-z0-9-]+\.js)"><\/script>/g)].map((m) => m[1]).filter((f) => !/materialien\.js$/.test(f));
    await loadScript(COURSE_BASE + "content.js");
    for (const f of files) { try { await loadScript(COURSE_BASE + f); } catch { /* Kurs überspringen */ } }
    const out = [];
    for (const s of (window.LERNRAUM && window.LERNRAUM.subjects) || []) {
      const topics = [];
      for (const t of s.topics || []) {
        const qs = [];
        for (const st of t.steps || []) if (st.type === "quiz") for (const q of st.questions || []) {
          if (!q.options || q.options.length < 2 || q.options.length > 4) continue;
          qs.push({ t: "mc", q: plain(q.q), o: q.options.map(plain), a: q.answer, e: q.explain ? plain(q.explain) : "" });
        }
        if (qs.length) topics.push({ title: t.title, qs });
      }
      if (topics.length) out.push({ name: `${s.fach || ""} · ${s.name}`, topics });
    }
    return (courseCache = out);
  }

  /* Datei-Import: CSV (Excel, Semikolon) oder JSON */
  function parseCsv(txt) {
    txt = txt.replace(/^\uFEFF/, "");
    const first = txt.split(/\r?\n/)[0] || "";
    const d = [";", "\t", ","].map((c) => [c, first.split(c).length]).sort((a, b) => b[1] - a[1])[0][0];
    const rows = []; let row = [], cell = "", q = false;
    for (let i = 0; i < txt.length; i++) {
      const c = txt[i];
      if (q) { if (c === '"') { if (txt[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
      else if (c === '"') q = true;
      else if (c === d) { row.push(cell); cell = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && txt[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
      else cell += c;
    }
    row.push(cell); rows.push(row);
    return rows.filter((r) => r.some((x) => x.trim()));
  }
  function importFile(name, txt) {
    txt = txt.replace(/^\s*```[a-z]*\s*$/gim, "").trim();
    const out = [], problems = []; let title = "";
    const add = (q, e, i) => { const bad = checkQ(q); if (bad) problems.push(`Zeile/Frage ${i}: ${bad}`); else out.push(q); };
    function checkQ(q) {
      if (!q.q || q.q.length < 3) return "Frage fehlt";
      if (q.t === "text") return q.a.length ? "" : "Antwort fehlt";
      if (q.o.length < 2) return "mindestens 2 Antworten";
      return Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length ? "" : "richtige Antwort fehlt oder passt nicht";
    }
    if (/\.json$/i.test(name) || /^\s*[\[{]/.test(txt)) {
      let j; try { j = JSON.parse(txt); } catch { return { error: "Die JSON-Datei ist kaputt (Kommas oder Klammern prüfen)." }; }
      if (!Array.isArray(j)) { title = j.title || ""; j = j.questions || j.fragen || []; }
      j.forEach((x, i) => {
        const q = String(x.q ?? x.frage ?? "").trim(), e = String(x.e ?? x.explain ?? x.erklaerung ?? "").trim();
        const o = x.o ?? x.options ?? x.antworten, a = x.a ?? x.answer ?? x.richtig;
        if (Array.isArray(o)) add({ t: "mc", q, o: o.map((v) => String(v).trim()), a: Number(a), e }, e, i + 1);
        else add({ t: "text", q, a: [].concat(a ?? []).map((v) => String(v).trim()).filter(Boolean), e }, e, i + 1);
      });
    } else {
      let rows = parseCsv(txt);
      if (rows.length && /^frage$/i.test(rows[0][0].trim())) rows.shift();
      rows.forEach((r, i) => {
        const c = r.map((v) => v.trim()), q = c[0], e = c[7] || "", key = (c[5] || "").toUpperCase();
        if (key === "TEXT" || key === "KURZ") add({ t: "text", q, a: (c[1] || "").split("|").map((v) => v.trim()).filter(Boolean), e }, e, i + 1);
        else {
          const o = c.slice(1, 5).filter(Boolean), k = "ABCD".indexOf(key[0] || "?");
          const idx = k >= 0 ? k : Number(key) - 1;
          add({ t: "mc", q, o, a: idx, e }, e, i + 1);
        }
      });
    }
    return { qs: out, problems, title };
  }
  const TEMPLATE = "Frage;Antwort A;Antwort B;Antwort C;Antwort D;Richtig;;Erklärung\n" +
    "Was ist die Hauptstadt von Deutschland?;Berlin;München;Hamburg;Köln;A;;Berlin ist seit 1990 Hauptstadt.\n" +
    "Die Erde ist eine Scheibe.;Richtig;Falsch;;;B;;Sie ist (fast) eine Kugel.\n" +
    "Wie heißt die Kündigung durch den Arbeitgeber?;Arbeitgeberkündigung | ordentliche Kündigung;;;;TEXT;;Bei TEXT stehen mehrere richtige Schreibweisen in Spalte B, getrennt mit |.\n";

  const KI_PROMPT = `Du bist Lehrkraft-Assistenz und erstellst ein kurzes Wiederholungsquiz für den Stundenende-Check.

THEMA / MATERIAL: [hier Thema nennen oder Text, Arbeitsblatt, Stichpunkte einfügen]
KLASSE / NIVEAU: [z. B. Berufskolleg, 1. Ausbildungsjahr, einfaches Leseniveau]
ANZAHL FRAGEN: [z. B. 8]

Regeln:
- Alle Fragen müssen sich allein aus dem genannten Material beantworten lassen.
- Kurze Sätze, einfache Sprache, keine Tricksfragen, keine Mehrdeutigkeit.
- Pro Frage genau EINE richtige Antwort und 2 bis 4 Antwortmöglichkeiten. Falsche Antworten sollen typische Fehler zeigen.
- Keine Antworten wie "alle richtig" oder "keine richtig". Die richtige Antwort nicht immer an dieselbe Stelle setzen.
- Spalte "Erklärung": ein kurzer Satz, warum die Antwort stimmt.
- Für Fachbegriffe oder Zahlen darfst du einzelne Kurzantwort-Fragen einbauen (Richtig = TEXT, richtige Schreibweisen in Spalte B, getrennt mit |).

Ausgabeformat: NUR eine CSV-Tabelle in einem Codeblock, Trennzeichen Semikolon, keine Zusatztexte. Erste Zeile genau so:
Frage;Antwort A;Antwort B;Antwort C;Antwort D;Richtig;;Erklärung
Danach eine Zeile pro Frage. In der Spalte "Richtig" steht A, B, C oder D (bei Kurzantwort TEXT). Die siebte Spalte bleibt leer.

Beispiel:
Was ist die Hauptstadt von Deutschland?;Berlin;München;Hamburg;Köln;A;;Berlin ist seit 1990 Hauptstadt.
Wie nennt man die Kündigung durch den Arbeitgeber?;Arbeitgeberkündigung | ordentliche Kündigung;;;;TEXT;;Der Arbeitgeber beendet das Arbeitsverhältnis.`;

  function viewSetup() {
    let draft = store.get("quiz.draft", { title: "", qs: [] });
    const save = () => store.set("quiz.draft", draft);
    const pin = store.get("quiz.pin", "");
    const el = show(`
      <header class="top"><a class="tag-box" href="#/">← Zurück</a><span class="tag-box ink">Lehrkraft</span></header>
      <h1 class="h1">Neues Quiz</h1>
      <div class="stack" style="margin-top:18px">
        <label class="field"><span>Titel</span><input class="input" id="title" maxlength="80" placeholder="Quiz am Stundenende" value="${esc(draft.title)}"></label>
        ${LIVE ? `<label class="field"><span>Lehrer-PIN${pin ? " (gespeichert)" : ""}</span><input class="input" id="pin" type="password" autocomplete="off" value="${esc(pin)}"></label>` : ""}
        <h3 class="section-head">Fragen · <span id="cnt"></span></h3>
        <ol class="chosen" id="chosen"></ol>
        <details class="add" id="dCourse"><summary>Aus einem Kurs wählen</summary><div class="in" id="courseBox"><p class="hint">Lade Kurse …</p></div></details>
        <details class="add" id="dKi"><summary>Anleitung: Quiz mit KI erstellen</summary><div class="in" id="kiBox"></div></details>
        <details class="add" id="dFile"><summary>Quiz aus Datei laden</summary><div class="in" id="fileBox"></div></details>
        <details class="add" id="dOwn"><summary>Eigene Frage schreiben</summary><div class="in" id="ownBox"></div></details>
        <div id="err"></div>
        <button class="btn pink block" id="go">Raum öffnen</button>
      </div>`);
    const chosen = el.querySelector("#chosen");
    function paint() {
      el.querySelector("#cnt").textContent = `${draft.qs.length} von max. ${MAX_Q}`;
      chosen.innerHTML = draft.qs.length ? draft.qs.map((q, i) => `<li><span class="n">${i + 1}</span><span class="t"><span class="tag">${q.t === "text" ? "Text" : q.o.length === 2 ? "R/F" : "MC"}</span>${esc(q.q)}</span><button data-x="${i}" aria-label="Frage entfernen">×</button></li>`).join("")
        : `<li class="empty" style="display:block">Noch keine Fragen. Wähle unten aus einem Kurs oder schreibe eigene.</li>`;
      chosen.querySelectorAll("[data-x]").forEach((b) => { b.onclick = () => { draft.qs.splice(Number(b.dataset.x), 1); save(); paint(); }; });
    }
    paint();
    el.querySelector("#title").oninput = (e) => { draft.title = e.target.value; save(); };
    const add = (qs) => { const room = MAX_Q - draft.qs.length; draft.qs.push(...qs.slice(0, room)); save(); paint(); };

    /* Kurs-Auswahl */
    el.querySelector("#dCourse").addEventListener("toggle", async function () {
      if (!this.open) return;
      const box = el.querySelector("#courseBox");
      let courses;
      try { courses = await loadCourses(); } catch { box.innerHTML = `<p class="msg">Kurse konnten nicht geladen werden.</p>`; return; }
      box.innerHTML = `<label class="field"><span>Kurs</span><select class="input" id="cs">${courses.map((c, i) => `<option value="${i}">${esc(c.name)}</option>`).join("")}</select></label>
        <label class="field"><span>Thema</span><select class="input" id="ts"></select></label>
        <div class="pick" id="pk"></div>
        <div class="row"><button class="btn ghost sm" id="all" type="button">Alle</button><button class="btn pink sm grow" id="addc" type="button">Hinzufügen</button></div>`;
      const cs = box.querySelector("#cs"), ts = box.querySelector("#ts"), pk = box.querySelector("#pk");
      const fillT = () => { ts.innerHTML = courses[cs.value].topics.map((t, i) => `<option value="${i}">${esc(t.title)} (${t.qs.length})</option>`).join(""); fillQ(); };
      const fillQ = () => { const t = courses[cs.value].topics[ts.value]; pk.innerHTML = t.qs.map((q, i) => `<label><input type="checkbox" value="${i}"><span>${esc(q.q)}</span></label>`).join(""); };
      cs.onchange = fillT; ts.onchange = fillQ; fillT();
      box.querySelector("#all").onclick = () => { const bs = pk.querySelectorAll("input"); const all = [...bs].every((b) => b.checked); bs.forEach((b) => { b.checked = !all; }); };
      box.querySelector("#addc").onclick = () => {
        const t = courses[cs.value].topics[ts.value];
        const sel = [...pk.querySelectorAll("input:checked")].map((b) => structuredClone(t.qs[Number(b.value)]));
        if (sel.length) { add(sel); pk.querySelectorAll("input").forEach((b) => { b.checked = false; }); }
      };
    });

    /* KI-Anleitung */
    const ki = el.querySelector("#kiBox");
    ki.innerHTML = `<ol class="guide" style="padding-left:20px;display:grid;gap:8px;font-size:14.5px;line-height:1.4">
        <li><b>Prompt kopieren</b> und in ChatGPT, Claude oder eine andere KI einfügen.</li>
        <li>Die drei Angaben in <b>[eckigen Klammern]</b> ersetzen: Thema oder Material (Text vom Arbeitsblatt einfügen), Niveau, Anzahl.</li>
        <li>Die KI antwortet mit einer Tabelle. <b>Fragen durchlesen und prüfen</b> (stimmt die markierte Antwort?).</li>
        <li>Tabelle unten einfügen und auf <b>Fragen übernehmen</b> tippen. Alternativ als .csv speichern und über „Quiz aus Datei laden“ öffnen.</li></ol>
      <textarea class="input" id="kiPrompt" readonly rows="8" style="font:400 12.5px/1.45 var(--mono);min-height:150px"></textarea>
      <button class="btn pink sm" id="kiCopy" type="button">Prompt kopieren</button>
      <label class="field"><span>Antwort der KI hier einfügen</span><textarea class="input" id="kiIn" placeholder="Frage;Antwort A;Antwort B; …"></textarea></label>
      <button class="btn sm" id="kiGo" type="button">Fragen übernehmen</button><div id="kiErr"></div>
      <p class="hint" style="margin:0">Tipp: Gib keine Namen oder Daten von Schüler/innen in die KI ein. Das Material der Stunde reicht.</p>`;
    ki.querySelector("#kiPrompt").value = KI_PROMPT;
    ki.querySelector("#kiCopy").onclick = async function () {
      try { await navigator.clipboard.writeText(KI_PROMPT); this.textContent = "Kopiert ✓"; }
      catch { const t = ki.querySelector("#kiPrompt"); t.focus(); t.select(); this.textContent = "Markiert: jetzt kopieren"; }
    };
    ki.querySelector("#kiGo").onclick = () => {
      const box = ki.querySelector("#kiErr"), v = ki.querySelector("#kiIn").value;
      if (!v.trim()) { box.innerHTML = `<p class="msg">Füge zuerst die Antwort der KI ein.</p>`; return; }
      const r = importFile("ki.csv", v);
      if (r.error) { box.innerHTML = `<p class="msg">${esc(r.error)}</p>`; return; }
      if (r.qs.length) { add(r.qs); ki.querySelector("#kiIn").value = ""; }
      box.innerHTML = `<p class="hint">${r.qs.length} Fragen übernommen${r.problems.length ? `, ${r.problems.length} übersprungen:` : ". Sie stehen oben in der Liste."}</p>` +
        (r.problems.length ? `<p class="msg">${r.problems.slice(0, 5).map(esc).join("<br>")}</p>` : "");
    };

    /* Datei */
    const fb = el.querySelector("#fileBox");
    fb.innerHTML = `<p class="hint" style="margin:0">Excel-Datei als <b>CSV</b> speichern (Spalten: Frage, Antwort A–D, Richtig als A–D, Erklärung) oder eine <b>JSON</b>-Datei. Die Vorlage zeigt das Format.</p>
      <div class="row"><button class="btn ghost sm" id="tpl" type="button">Vorlage (CSV)</button><label class="btn pink sm grow" style="cursor:pointer">Datei wählen<input type="file" id="fi" accept=".csv,.json,.txt,text/csv,application/json" hidden></label></div><div id="ferr"></div>`;
    fb.querySelector("#tpl").onclick = () => {
      const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob(["\uFEFF" + TEMPLATE], { type: "text/csv" })); a.download = "quiz-vorlage.csv"; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    };
    fb.querySelector("#fi").onchange = async (ev) => {
      const f = ev.target.files[0]; if (!f) return; ev.target.value = "";
      const box = fb.querySelector("#ferr");
      if (f.size > 500000) { box.innerHTML = `<p class="msg">Die Datei ist zu groß.</p>`; return; }
      const r = importFile(f.name, await f.text());
      if (r.error) { box.innerHTML = `<p class="msg">${esc(r.error)}</p>`; return; }
      if (r.qs.length) { if (r.title && !draft.title) { draft.title = r.title; el.querySelector("#title").value = r.title; } add(r.qs); }
      box.innerHTML = `<p class="hint">${r.qs.length} Fragen übernommen${r.problems.length ? `, ${r.problems.length} übersprungen:` : "."}</p>` +
        (r.problems.length ? `<p class="msg">${r.problems.slice(0, 5).map(esc).join("<br>")}</p>` : "");
    };

    /* Eigene Frage */
    const own = el.querySelector("#ownBox");
    own.innerHTML = `<label class="field"><span>Art</span><select class="input" id="ot"><option value="mc">Mehrfachauswahl (4 Antworten)</option><option value="tf">Richtig oder falsch</option><option value="text">Kurzantwort</option></select></label>
      <label class="field"><span>Frage</span><textarea class="input" id="oq" maxlength="250"></textarea></label>
      <div id="oo"></div>
      <label class="field"><span>Erklärung (optional, sieht man nach der Antwort)</span><input class="input" id="oe" maxlength="200" style="font:500 15px/1 var(--grot)"></label>
      <div id="oerr"></div><button class="btn pink block" id="oadd" type="button">Hinzufügen</button>`;
    const ot = own.querySelector("#ot"), oo = own.querySelector("#oo");
    function ownOpts() {
      const t = ot.value;
      if (t === "text") oo.innerHTML = `<label class="field"><span>Richtige Antwort (weitere Schreibweisen mit | trennen)</span><input class="input" id="ta" maxlength="120" style="font:500 15px/1 var(--grot)" placeholder="z. B. Kündigung | Kuendigung"></label><p class="hint">Groß-/Kleinschreibung und Leerzeichen am Rand zählen nicht.</p>`;
      else { const n = t === "tf" ? 2 : 4; oo.innerHTML = `<span class="field"><span style="display:block;font:500 12px/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-2);margin-bottom:8px">Antworten · richtige markieren</span></span><div style="display:grid;gap:8px">${Array.from({ length: n }, (_, i) =>
        `<label class="opt-edit"><input type="radio" name="ok" value="${i}" ${i === 0 ? "checked" : ""}>${t === "tf" ? `<b style="font-size:16px">${i ? "Falsch" : "Richtig"}</b>` : `<input class="input" maxlength="120" data-o="${i}" placeholder="Antwort ${"ABCD"[i]}">`}</label>`).join("")}</div>`; }
    }
    ot.onchange = ownOpts; ownOpts();
    own.querySelector("#oadd").onclick = () => {
      const err = own.querySelector("#oerr"); err.innerHTML = "";
      const q = own.querySelector("#oq").value.trim(), e = own.querySelector("#oe").value.trim(), t = ot.value;
      const fail = (m) => { err.innerHTML = `<p class="msg">${m}</p>`; };
      if (q.length < 3) return fail("Schreibe eine Frage.");
      let item;
      if (t === "text") {
        const a = own.querySelector("#ta").value.split("|").map((x) => x.trim()).filter(Boolean);
        if (!a.length) return fail("Trage die richtige Antwort ein.");
        item = { t: "text", q, a, e };
      } else if (t === "tf") {
        item = { t: "mc", q, o: ["Richtig", "Falsch"], a: Number(own.querySelector("input[name=ok]:checked").value), e };
      } else {
        const o = [...own.querySelectorAll("[data-o]")].map((i) => i.value.trim());
        if (o.some((x) => !x)) return fail("Fülle alle vier Antworten aus.");
        item = { t: "mc", q, o, a: Number(own.querySelector("input[name=ok]:checked").value), e };
      }
      add([item]);
      own.querySelector("#oq").value = ""; own.querySelector("#oe").value = ""; ownOpts();
    };

    el.querySelector("#go").onclick = async function () {
      const err = el.querySelector("#err"); err.innerHTML = "";
      if (!draft.qs.length) { err.innerHTML = `<p class="msg">${esc(ERR.BAD_QUESTIONS)}</p>`; return; }
      const pinV = LIVE ? el.querySelector("#pin").value : "demo";
      this.disabled = true;
      const secret = rid(16);
      try {
        const code = await rpc("quiz_create", { p_pin: pinV, p_title: draft.title.trim() || "Quiz", p_questions: draft.qs, p_secret: secret });
        await rpc("quiz_set_status", { p_code: code, p_secret: secret, p_status: "lobby" });
        if (LIVE) store.set("quiz.pin", pinV);
        store.set(`quiz.teacher.${code}`, secret);
        location.hash = `#/raum/${code}`;
      } catch (e) { err.innerHTML = `<p class="msg">${esc(errText(e))}</p>`; this.disabled = false; }
    };
  }

  /* ── Lehrkraft: Live-Ansicht ─────────────────────────────────── */
  async function viewRoom(code) {
    const secret = store.get(`quiz.teacher.${code}`);
    if (!secret) { show(`<header class="top"><a class="tag-box" href="#/lehrer">← Neues Quiz</a></header><p class="msg">Dieser Raum wurde auf einem anderen Gerät angelegt. Öffne ihn dort, oder lege ein neues Quiz an.</p>`); return; }
    let st = null, hide = store.get("quiz.hideNames", false), view = store.get("quiz.view", "race"), detail = store.get("quiz.detail", false), sortBy = store.get("quiz.sort", "join"), beamer = false;
    const qrSvg = () => {
      if (typeof qrcode !== "function") return "";
      const q = qrcode(0, "M"); q.addData(joinUrl(code)); q.make(); return q.createSvgTag({ cellSize: 8, margin: 1, scalable: true });
    };
    let last = "";
    async function pull() {
      const next = await rpc("quiz_teacher_state", { p_code: code, p_secret: secret });
      const sig = JSON.stringify(next);
      st = next;
      if (sig !== last) { last = sig; paint(); }
    }
    const repaint = () => { last = ""; paint(); };
    function setBeamer(on) {
      beamer = on; document.body.classList.toggle("beamer", on); last = ""; window.scrollTo(0, 0);
      if (on && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
      if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => {});
      paint();
    }
    onFsExit = () => { if (beamer) { beamer = false; document.body.classList.remove("beamer"); if (st) paint(); } };
    /* Rennbahn: Darstellung und Animationen in race.js */
    const raceOpts = () => ({ hide, beamer, detail, bonus: !!st.bonus, closed: st.status === "closed" });
    const raceSig = (ps, n) => QuizRace.sig(ps, n, raceOpts());
    function raceHtml(ps, n) { return QuizRace.html(ps, n, raceOpts()); }
    function raceUpdate(ps, n) { QuizRace.update(root.querySelector("#race"), ps, n, raceOpts()); }
    function paint() {
      const n = st.questions.length, ps = st.players.map((p, i) => {
        const done = p.r.filter((x) => x !== null).length, ok = p.r.filter((x) => x === true).length;
        return { ...p, i, done, ok };
      });
      const finished = ps.filter((p) => p.done === n).length;
      const answered = ps.reduce((s, p) => s + p.done, 0), right = ps.reduce((s, p) => s + p.ok, 0);
      const avg = answered ? Math.round((100 * right) / answered) : 0;
      const list = sortBy === "join" ? ps : [...ps].sort((a, b) => b.done - a.done || b.ok - a.ok || a.i - b.i);
      const closed = st.status === "closed", lobby = st.status === "lobby";
      const qstat = st.questions.map((q, i) => {
        const a = ps.filter((p) => p.r[i] !== null); const k = a.filter((p) => p.r[i] === true).length;
        return { q, n: a.length, k, pc: a.length ? Math.round((100 * k) / a.length) : null };
      });
      const keep = document.scrollingElement.scrollTop;
      const oldRace = root.querySelector("#race");
      show(`
        <header class="top no-beamer"><a class="tag-box" href="#/lehrer">← Neues Quiz</a><span class="tag-box ink">${closed ? "Beendet" : lobby ? "Warteraum" : "Läuft"}</span></header>
        <div class="win"><div class="bar"><span class="d"></span><span class="id">${esc(st.title)}</span><span class="r beamer-only" ><button id="bOff" style="color:var(--paper)">✕ Beamer aus</button></span></div>
          <div class="body join-grid"><div><p class="kick">Raumcode · ${esc(baseUrl().replace(/^https?:\/\//, ""))}</p><p class="code-big">${code}</p>
          ${closed ? `<p class="sub">Quiz beendet. Neue Teilnehmer können nicht mehr beitreten.</p>` : lobby ? `<p class="sub">Warteraum: Das Quiz beginnt erst, wenn du auf „Quiz starten“ tippst.</p>` : `<p class="sub">Schüler/innen scannen den QR-Code oder geben den Code auf der Quiz-Seite ein.</p>`}</div>
          <div class="qr" aria-label="QR-Code zum Beitreten">${qrSvg()}</div></div></div>
        ${lobby ? `
        <h3 class="section-head">Warteraum · ${ps.length} dabei</h3>
        ${ps.length ? `<div class="chips">${ps.map((p) => `<span class="chip">${esc(hide ? `SuS ${p.i + 1}` : p.nick)}${beamer ? "" : `<button data-rm="${esc(p.id)}" aria-label="Entfernen" title="Entfernen">×</button>`}</span>`).join("")}</div>` : `<p class="empty">Noch niemand im Raum. Zeige den Code oder den QR-Code.</p>`}
        <div class="row no-beamer" style="margin-top:16px"><button class="btn sm ${hide ? "on" : "ghost"}" id="bHide">Namen ${hide ? "zeigen" : "ausblenden"}</button><button class="btn sm ghost" id="bBeam">Beamer-Ansicht</button><button class="btn sm ghost" id="bDel">Raum löschen</button></div>
        <div class="row no-beamer" style="margin-top:10px"><button class="btn sm ${st.bonus ? "on" : "ghost"} grow" id="bBonus">Aufholbonus: ${st.bonus ? "an" : "aus"}</button></div>
        <p class="hint no-beamer" style="margin-top:8px">Aufholbonus: Wer im letzten Drittel liegt (ab 4 Personen), bekommt für eine richtige Antwort doppelte Punkte und springt zwei Schritte.</p>
        <button class="btn pink block startbtn" id="bStart" style="margin-top:18px" ${ps.length ? "" : "disabled"}>Quiz starten (${ps.length})</button>` : `
        <div class="stats" style="margin-top:16px"><div><div class="v">${ps.length}</div><div class="k">Dabei</div></div><div><div class="v">${finished}</div><div class="k">Fertig</div></div><div><div class="v">${avg}%</div><div class="k">Ø richtig</div></div></div>
        <div class="row no-beamer" style="margin-top:16px">
          <button class="btn sm ${hide ? "on" : "ghost"}" id="bHide">Namen ${hide ? "zeigen" : "ausblenden"}</button>
          <button class="btn sm ghost" id="bView">Ansicht: ${view === "race" ? "Rennen" : "Einzeln"}</button>
          ${view === "race" ? `<button class="btn sm ${detail ? "on" : "ghost"}" id="bDetail">Einzelantworten: ${detail ? "an" : "aus"}</button>` : `<button class="btn sm ghost" id="bSort">Sortierung: ${sortBy === "join" ? "Beitritt" : "Fortschritt"}</button>`}
          <button class="btn sm ghost" id="bBeam">Beamer-Ansicht</button>
          <span class="grow"></span>
          ${closed ? "" : `<button class="btn sm ${st.bonus ? "on" : "ghost"}" id="bBonus">Aufholbonus: ${st.bonus ? "an" : "aus"}</button>`}
          ${closed ? `<button class="btn sm ghost" id="bOpen">Wieder öffnen</button><button class="btn sm ghost" id="bDel">Raum löschen</button>` : `<button class="btn sm" id="bEnd">Quiz beenden</button>`}
        </div>
        <h3 class="section-head">${view === "race" ? "Rennen" : "Fortschritt"}</h3>
        ${ps.length && view === "race" ? `<div id="raceSlot"></div>` : ps.length ? `<div class="tiles">${list.map((p) => `
          <div class="tile ${p.done === n ? "done" : ""}"><div class="nm"><span>${esc(hide ? `SuS ${p.i + 1}` : p.nick)}</span>${beamer ? "" : `<button data-rm="${esc(p.id)}" aria-label="Entfernen" title="Entfernen">×</button>`}</div>
          <div class="bd"><div class="seg">${p.r.map((x) => `<i class="${x === true ? "ok" : x === false ? "no" : ""}"></i>`).join("")}</div>
          <div class="sc"><span>${p.ok} richtig</span><span>${p.done}/${n}</span></div></div></div>`).join("")}</div>`
          : `<p class="empty">Noch niemand im Raum. Zeige den Code oder den QR-Code.</p>`}
        <h3 class="section-head">Fragen im Überblick</h3>
        <ol class="qbars" style="list-style:none">${qstat.map((s, i) => `<li><b class="q-count">${i + 1}</b><div>${esc(s.q.q)}<div class="bar2"><i style="width:${s.pc ?? 0}%"></i></div></div><span class="pc">${s.pc === null ? "–" : s.pc + "%"}</span></li>`).join("")}</ol>`}`, true, true);
      if (view === "race") root.firstElementChild.classList.add("is-race");
      const slot = root.querySelector("#raceSlot");
      if (slot) {
        if (oldRace && oldRace.dataset.sig === raceSig(ps, n)) { slot.replaceWith(oldRace); raceUpdate(ps, n); }
        else { slot.outerHTML = raceHtml(ps, n); raceUpdate(ps, n); }
      }
      document.scrollingElement.scrollTop = keep;
      const $ = (id) => root.querySelector(id);
      if ($("#bView")) $("#bView").onclick = () => { view = view === "race" ? "tiles" : "race"; store.set("quiz.view", view); paint(); };
      if ($("#bBonus")) $("#bBonus").onclick = async () => { await rpc("quiz_set_bonus", { p_code: code, p_secret: secret, p_bonus: !st.bonus }); pull(); };
      if ($("#bStart")) $("#bStart").onclick = async () => { $("#bStart").disabled = true; await rpc("quiz_set_status", { p_code: code, p_secret: secret, p_status: "open" }); pull(); };
      if ($("#bDetail")) $("#bDetail").onclick = () => { detail = !detail; store.set("quiz.detail", detail); paint(); };
      if ($("#bHide")) $("#bHide").onclick = () => { hide = !hide; store.set("quiz.hideNames", hide); paint(); };
      if ($("#bSort")) $("#bSort").onclick = () => { sortBy = sortBy === "join" ? "progress" : "join"; store.set("quiz.sort", sortBy); paint(); };
      if ($("#bBeam")) $("#bBeam").onclick = () => setBeamer(true);
      if ($("#bOff")) $("#bOff").onclick = () => setBeamer(false);
      if ($("#bEnd")) $("#bEnd").onclick = async () => { if (confirm("Quiz für alle beenden? Danach kann niemand mehr antworten.")) { await rpc("quiz_set_status", { p_code: code, p_secret: secret, p_status: "closed" }); pull(); } };
      if ($("#bOpen")) $("#bOpen").onclick = async () => { await rpc("quiz_set_status", { p_code: code, p_secret: secret, p_status: "open" }); pull(); };
      if ($("#bDel")) $("#bDel").onclick = async () => { if (confirm("Raum und alle Antworten löschen?")) { await rpc("quiz_delete_room", { p_code: code, p_secret: secret }); store.del(`quiz.teacher.${code}`); location.hash = "#/lehrer"; } };
      root.querySelectorAll("[data-rm]").forEach((b) => { b.onclick = async () => { if (confirm("Diese Person aus dem Raum entfernen?")) { await rpc("quiz_remove_player", { p_code: code, p_secret: secret, p_pid: b.dataset.rm }); pull(); } }; });
    }
    try { await pull(); }
    catch (e) { show(`<header class="top"><a class="tag-box" href="#/lehrer">← Neues Quiz</a></header><p class="msg">${esc(errText(e))}</p>`); return; }
    every(POLL_T, pull);
  }

  route();
})();
