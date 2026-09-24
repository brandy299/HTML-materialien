/* ============================================================
   LERNRAUM — App
   Hash-Router, Fortschritt im localStorage, Aufgaben-Player.
   ============================================================ */
(() => {
  "use strict";

  const DATA = window.LERNRAUM;
  const $app = document.getElementById("app");
  const $tabbar = document.getElementById("tabbar");

  /* ── Speicher ───────────────────────────────────────────── */
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem("lernraum." + key); return v ? JSON.parse(v) : fallback; }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem("lernraum." + key, JSON.stringify(value)); } catch { /* privat-Modus */ }
    }
  };

  const progress = {
    all() { return store.get("progress", {}); },
    of(s, t) { return this.all()[s + "/" + t] || { done: {}, last: 0 }; },
    save(s, t, p) { const all = this.all(); all[s + "/" + t] = { ...p, ts: Date.now() }; store.set("progress", all); },
    complete(s, t, i, score) {
      const p = this.of(s, t);
      p.done = { ...p.done, [i]: score || true };
      p.last = i;
      this.save(s, t, p);
    },
    touch(s, t, i) { const p = this.of(s, t); p.last = i; this.save(s, t, p); },
    ratio(subject, topic) {
      if (!topic.steps.length) return 0;
      return Object.keys(this.of(subject.id, topic.id).done).length / topic.steps.length;
    },
    reset() { store.set("progress", {}); }
  };

  /* ── Helfer ─────────────────────────────────────────────── */
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const buzz = (p) => { try { navigator.vibrate && navigator.vibrate(p); } catch { /* egal */ } };
  const findSubject = (id) => DATA.subjects.find((s) => s.id === id);
  const findTopic = (s, id) => s && s.topics.find((t) => t.id === id);
  const setColor = (el, color) => el.style.setProperty("--c", color || "#1B1916");
  const firstName = () => store.get("name", "");

  const ICON = {
    back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    chev: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    slides: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    quiz: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/></svg>',
    sort: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="8" height="7" rx="1.5"/><rect x="13" y="13" width="8" height="7" rx="1.5"/><path d="M15 4h4a2 2 0 0 1 2 2v3M9 20H5a2 2 0 0 1-2-2v-3"/></svg>',
    cloze: '<svg viewBox="0 0 24 24"><path d="M4 7h6M14 7h6M4 12h3M11 12h9M4 17h9M17 17h3"/></svg>',
    cards: '<svg viewBox="0 0 24 24"><rect x="6" y="3" width="13" height="16" rx="2"/><path d="M4 7v12a2 2 0 0 0 2 2h9"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/></svg>',
    lock: '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    trophy: '<svg viewBox="0 0 24 24"><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4"/></svg>'
  };
  const STEP_LABEL = { slides: "Präsentation", quiz: "Quiz", sort: "Zuordnen", cloze: "Lückentext", cards: "Karteikarten", link: "Material" };

  function ring(ratio, size = 42) {
    const r = 17, c = 2 * Math.PI * r;
    const pct = Math.round(ratio * 100);
    return `<div class="ring ${ratio >= 1 ? "full" : ""}" style="width:${size}px;height:${size}px">
      <svg viewBox="0 0 42 42"><circle class="bg" cx="21" cy="21" r="${r}"/>
      <circle class="fg" cx="21" cy="21" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - ratio)}"/></svg>
      <span class="lbl">${ratio >= 1 ? "✓" : pct + "%"}</span></div>`;
  }

  function stepMeta(step) {
    if (step.type === "slides") return step.slides.length + " Folien";
    if (step.type === "quiz") return step.questions.length + " Fragen";
    if (step.type === "sort") return step.items.length + " Karten";
    if (step.type === "cloze") return (step.text.match(/\{/g) || []).length + " Lücken";
    if (step.type === "cards") return step.cards.length + " Karten";
    return "öffnet sich neu";
  }

  function scoreText(v) { return v && typeof v === "object" ? `${v.c}/${v.t}` : ""; }

  function toast(msg) {
    const t = h(`<div class="toast">${esc(msg)}</div>`);
    document.body.append(t);
    setTimeout(() => t.remove(), 2200);
  }

  /* ── Router ─────────────────────────────────────────────── */
  const routes = [
    [/^#?\/?$/, viewHome, "home"],
    [/^#\/faecher$/, viewSubjects, "faecher"],
    [/^#\/profil$/, viewProfile, "profil"],
    [/^#\/f\/([\w-]+)$/, viewSubject, "faecher"],
    [/^#\/f\/([\w-]+)\/([\w-]+)$/, viewTopic, null],
    [/^#\/f\/([\w-]+)\/([\w-]+)\/fertig$/, viewFinish, null],
    [/^#\/f\/([\w-]+)\/([\w-]+)\/(\d+)$/, viewPlayer, null]
  ];

  function render() {
    const hash = location.hash || "#/";
    if (!firstName() && hash !== "#/profil") return mount(viewWelcome(), null);
    for (const [re, fn, tab] of routes) {
      const m = hash.match(re);
      if (m) return mount(fn(...m.slice(1)), tab);
    }
    location.hash = "#/";
  }

  function mount(node, tab) {
    const swap = () => {
      $app.replaceChildren(node);
      if (!node.classList.contains("finish")) document.querySelectorAll(".confetti").forEach((c) => c.remove());
      window.scrollTo(0, 0);
      $tabbar.classList.toggle("hidden", !tab);
      $tabbar.querySelectorAll("a").forEach((a) => a.classList.toggle("active", a.dataset.tab === tab));
      document.documentElement.style.setProperty("--c", node.style.getPropertyValue("--c") || "#1B1916");
    };
    if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) document.startViewTransition(swap);
    else swap();
  }

  window.addEventListener("hashchange", render);

  /* ── Willkommen ─────────────────────────────────────────── */
  function viewWelcome() {
    const v = h(`<main class="view no-tabbar" style="display:flex;flex-direction:column;min-height:100dvh">
      <div style="margin-top:12vh">
        <p class="eyebrow">Lernraum · ${esc(DATA.school)}</p>
        <h1 class="display" style="margin-top:14px">Lernen, <em>wann</em> es dir passt.</h1>
        <p class="lead" style="margin-top:16px">Präsentationen, Übungen und Karteikarten aus deinem Unterricht – alles auf deinem Handy.</p>
      </div>
      <form style="margin-top:auto;padding-top:40px">
        <label class="field"><span>Wie sollen wir dich nennen?</span>
          <input class="input" name="n" autocomplete="given-name" placeholder="Vorname" maxlength="24" required></label>
        <button class="btn block" style="margin-top:14px" type="submit">Los geht's ${ICON.arrow}</button>
        <p class="hint" style="text-align:center">Dein Fortschritt wird nur auf diesem Gerät gespeichert.</p>
      </form>
    </main>`);
    v.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const n = e.target.n.value.trim();
      if (!n) return;
      store.set("name", n);
      render();
    });
    return v;
  }

  /* ── Start ──────────────────────────────────────────────── */
  function lastActivity() {
    const all = progress.all();
    let best = null;
    for (const key in all) {
      const [sid, tid] = key.split("/");
      const s = findSubject(sid), t = findTopic(s, tid);
      if (!t || !t.steps.length) continue;
      const r = progress.ratio(s, t);
      if (r >= 1) continue;
      if (!best || all[key].ts > best.ts) best = { s, t, ts: all[key].ts, r };
    }
    return best;
  }

  function nextStepIndex(s, t) {
    const done = progress.of(s.id, t.id).done;
    const i = t.steps.findIndex((_, i) => !done[i]);
    return i === -1 ? 0 : i;
  }

  function viewHome() {
    const name = firstName();
    const hour = new Date().getHours();
    const greet = hour < 11 ? "Guten Morgen" : hour < 18 ? "Hallo" : "Guten Abend";
    const last = lastActivity();
    const v = h(`<main class="view">
      <header class="topbar">
        <p class="eyebrow">${new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })}</p>
        <a class="avatar" href="#/profil" aria-label="Profil">${esc(name.charAt(0).toUpperCase())}</a>
      </header>
      <h1 class="display">${greet},<br><em>${esc(name)}.</em></h1>
      <div id="resume"></div>
      <div class="section-head"><p class="eyebrow">Deine Fächer</p></div>
      <div class="subject-grid" id="grid"></div>
    </main>`);

    const box = v.querySelector("#resume");
    if (last) {
      const i = nextStepIndex(last.s, last.t);
      const a = h(`<a class="resume pressable" style="margin-top:28px" href="#/f/${last.s.id}/${last.t.id}/${i}">
        <p class="eyebrow">Weitermachen · ${esc(last.s.name)}</p>
        <p class="h2">${esc(last.t.title)}</p>
        <p class="meta">Schritt ${i + 1} von ${last.t.steps.length} · ${esc(last.t.steps[i].title)}</p>
        <div class="bar"><i style="width:${Math.round(last.r * 100)}%"></i></div>
        <span class="go">${ICON.arrow}</span>
      </a>`);
      setColor(a, last.s.color);
      box.append(a);
    } else {
      box.append(h(`<p class="lead" style="margin-top:14px">Wähle ein Fach und starte mit deinem ersten Lernmodul.</p>`));
    }

    const grid = v.querySelector("#grid");
    DATA.subjects.forEach((s) => {
      const open = s.topics.filter((t) => !t.soon);
      const avg = open.length ? open.reduce((sum, t) => sum + progress.ratio(s, t), 0) / open.length : 0;
      const a = h(`<a class="subject pressable" href="#/f/${s.id}">
        <span class="glyph">${esc(s.glyph)}</span>
        ${avg > 0 ? ring(avg, 36) : ""}
        <span><span class="name">${esc(s.name)}</span><span class="count" style="display:block">${open.length} ${open.length === 1 ? "Thema" : "Themen"}</span></span>
      </a>`);
      setColor(a, s.color);
      grid.append(a);
    });
    return v;
  }

  /* ── Fächerliste ────────────────────────────────────────── */
  function viewSubjects() {
    const v = h(`<main class="view">
      <header class="topbar"><p class="eyebrow">Übersicht</p></header>
      <h1 class="display">Alle <em>Fächer</em></h1>
      <div id="list" style="margin-top:28px"></div>
    </main>`);
    const list = v.querySelector("#list");
    DATA.subjects.forEach((s) => {
      const open = s.topics.filter((t) => !t.soon).length;
      const a = h(`<a class="subject-row pressable" href="#/f/${s.id}">
        <span class="glyph">${esc(s.glyph)}</span>
        <span><span class="t" style="display:block">${esc(s.name)}</span><span class="s">${open} ${open === 1 ? "Thema" : "Themen"}</span></span>
        <span class="chev">${ICON.chev}</span>
      </a>`);
      setColor(a, s.color);
      list.append(a);
    });
    return v;
  }

  /* ── Fach ───────────────────────────────────────────────── */
  function viewSubject(sid) {
    const s = findSubject(sid);
    if (!s) { location.hash = "#/"; return h("<div></div>"); }
    const v = h(`<main class="view">
      <header class="topbar"><a class="icon-btn" href="#/faecher" aria-label="Zurück">${ICON.back}</a></header>
      <section class="hero">
        <p class="eyebrow">Fach</p>
        <h1 class="display">${esc(s.name)}</h1>
        <p class="lead">${esc(s.description || "")}</p>
      </section>
      <div class="section-head"><p class="eyebrow">Themen</p></div>
      <div id="topics"></div>
    </main>`);
    setColor(v, s.color);
    const box = v.querySelector("#topics");
    s.topics.forEach((t) => {
      const r = progress.ratio(s, t);
      const inner = `<span class="kicker">${esc(t.kicker || "")}</span>
        <span class="title">${esc(t.title)}</span>
        <span class="info">${t.soon ? "Bald verfügbar" : `${t.steps.length} Schritte · ca. ${t.minutes || 10} Min.`}</span>
        ${t.soon ? `<span class="chev" style="grid-column:2;grid-row:1/span 3;color:var(--ink-3)">${ICON.lock}</span>` : ring(r)}`;
      box.append(t.soon
        ? h(`<div class="topic locked">${inner}</div>`)
        : h(`<a class="topic pressable" href="#/f/${s.id}/${t.id}">${inner}</a>`));
    });
    return v;
  }

  /* ── Thema (Lernpfad) ───────────────────────────────────── */
  function viewTopic(sid, tid) {
    const s = findSubject(sid), t = findTopic(s, tid);
    if (!t || t.soon) { location.hash = s ? "#/f/" + sid : "#/"; return h("<div></div>"); }
    const p = progress.of(s.id, t.id);
    const next = nextStepIndex(s, t);
    const allDone = progress.ratio(s, t) >= 1;
    const v = h(`<main class="view no-tabbar">
      <header class="topbar"><a class="icon-btn" href="#/f/${s.id}" aria-label="Zurück">${ICON.back}</a>${ring(progress.ratio(s, t))}</header>
      <section class="hero">
        <p class="eyebrow">${esc(s.name)} · ${esc(t.kicker || "")}</p>
        <h1 class="display">${esc(t.title)}</h1>
        <div class="chips"><span class="chip c">${t.steps.length} Schritte</span><span class="chip">ca. ${t.minutes || 10} Min.</span></div>
      </section>
      <div class="section-head"><p class="eyebrow">Dein Lernpfad</p></div>
      <ol class="path" id="path"></ol>
      <div class="dock"><div class="dock-inner">
        <a class="btn block" href="#/f/${s.id}/${t.id}/${allDone ? 0 : next}">${allDone ? "Nochmal durchgehen" : Object.keys(p.done).length ? "Weitermachen" : "Starten"} ${ICON.arrow}</a>
      </div></div>
    </main>`);
    setColor(v, s.color);
    const path = v.querySelector("#path");
    t.steps.forEach((st, i) => {
      const done = p.done[i];
      const cls = done ? "done" : i === next && !allDone ? "next" : "";
      path.append(h(`<li><a class="step ${cls}" href="#/f/${s.id}/${t.id}/${i}">
        <span class="dot">${done ? ICON.check : ICON[st.type] || ICON.slides}</span>
        <span class="body"><span class="t" style="display:block">${esc(st.title)}</span>
        <span class="s">${STEP_LABEL[st.type]} · ${stepMeta(st)}</span></span>
        ${scoreText(done) ? `<span class="score">${scoreText(done)}</span>` : ""}
      </a></li>`));
    });
    return v;
  }

  /* ── Player ─────────────────────────────────────────────── */
  function viewPlayer(sid, tid, idx) {
    const s = findSubject(sid), t = findTopic(s, tid), i = +idx;
    const step = t && t.steps[i];
    if (!step) { location.hash = t ? `#/f/${sid}/${tid}` : "#/"; return h("<div></div>"); }
    progress.touch(s.id, t.id, i);

    const v = h(`<main class="player">
      <div class="player-top">
        <a class="icon-btn" href="#/f/${s.id}/${t.id}" aria-label="Schließen">${ICON.close}</a>
        <div class="progress">${t.steps.map((_, k) => `<i style="--f:${k < i ? 1 : 0}"></i>`).join("")}</div>
      </div>
      <header class="player-head">
        <p class="eyebrow">${STEP_LABEL[step.type]} · ${i + 1}/${t.steps.length}</p>
        <h1 class="h1">${esc(step.title)}</h1>
      </header>
      <section class="player-body"></section>
      <div class="dock"><div class="dock-inner"><button class="btn block" id="act"></button></div></div>
    </main>`);
    setColor(v, s.color);

    const body = v.querySelector(".player-body");
    const btn = v.querySelector("#act");
    const bar = v.querySelectorAll(".progress i")[i];

    const ctx = {
      body,
      dock: v.querySelector(".dock-inner"),
      setProgress(f) { bar.style.setProperty("--f", Math.max(0, Math.min(1, f))); },
      action(label, fn, { enabled = true, variant = "" } = {}) {
        btn.innerHTML = label;
        btn.disabled = !enabled;
        btn.className = "btn block " + variant;
        btn.onclick = fn;
      },
      finish(score) {
        progress.complete(s.id, t.id, i, score);
        buzz(15);
        location.hash = i + 1 < t.steps.length ? `#/f/${s.id}/${t.id}/${i + 1}` : `#/f/${s.id}/${t.id}/fertig`;
      }
    };

    (PLAYERS[step.type] || PLAYERS.link)(step, ctx);
    return v;
  }

  const PLAYERS = {

    /* Präsentation: horizontal wischen */
    slides(step, ctx) {
      const n = step.slides.length;
      const wrap = h(`<div class="slides"><div class="slide-track"></div><div class="dots"></div>
        <p class="swipe-hint">Wische zur Seite ←</p></div>`);
      const track = wrap.querySelector(".slide-track");
      const dots = wrap.querySelector(".dots");
      step.slides.forEach((sl, k) => {
        track.append(h(`<article class="slide ${sl.style || ""}" aria-label="Folie ${k + 1} von ${n}">
          <p class="s-kicker">${sl.kicker || ""}</p>
          ${sl.big ? `<p class="s-big">${sl.big}</p>` : ""}
          <h2 class="s-title">${sl.title || ""}</h2>
          <div class="s-body">${sl.body || ""}</div>
          <p class="s-foot">${k + 1} / ${n}</p>
        </article>`));
        dots.append(document.createElement("i"));
      });
      ctx.body.append(wrap);

      let cur = -1, goal = -1;
      const stepW = () => track.firstElementChild.offsetWidth + 12;
      const update = () => {
        if (!track.isConnected || !track.clientWidth) return requestAnimationFrame(update);
        const k = Math.min(n - 1, Math.round(track.scrollLeft / stepW()));
        if (k === goal) goal = -1;
        if (k === cur) return;
        cur = k;
        [...dots.children].forEach((d, j) => d.classList.toggle("on", j === k));
        ctx.setProgress((k + 1) / n);
        if (k > 0) wrap.querySelector(".swipe-hint").style.visibility = "hidden";
        if (k >= n - 1) ctx.action(`Weiter ${ICON.arrow}`, () => ctx.finish(true));
        else ctx.action(`Nächste Folie ${ICON.arrow}`, () => {
          goal = Math.min(n - 1, (goal >= 0 ? goal : cur) + 1);
          track.scrollTo({ left: goal * stepW(), behavior: "smooth" });
        }, { variant: "ghost" });
      };
      track.addEventListener("scroll", () => { if (track.clientWidth) update(); }, { passive: true });
      requestAnimationFrame(update);
    },

    /* Multiple Choice */
    quiz(step, ctx) {
      const qs = step.questions;
      let k = 0, correct = 0;
      const show = () => {
        const q = qs[k];
        let sel = -1;
        ctx.setProgress(k / qs.length);
        const node = h(`<div style="animation:enter .35s var(--ease) both">
          <p class="q-count">Frage ${k + 1} von ${qs.length}</p>
          <p class="q-text">${esc(q.q)}</p>
          <div class="options"></div>
        </div>`);
        const opts = node.querySelector(".options");
        q.options.forEach((o, j) => {
          const b = h(`<button class="option"><span class="key">${"ABCDEF"[j]}</span><span>${esc(o)}</span></button>`);
          b.onclick = () => {
            sel = j;
            opts.querySelectorAll(".option").forEach((x, m) => x.classList.toggle("sel", m === j));
            buzz(8);
            ctx.action("Prüfen", check);
          };
          opts.append(b);
        });
        ctx.body.replaceChildren(node);
        ctx.action("Prüfen", check, { enabled: false });

        function check() {
          const ok = sel === q.answer;
          if (ok) correct++;
          opts.classList.add("locked");
          const buttons = opts.querySelectorAll(".option");
          buttons[q.answer].classList.add("right");
          if (!ok) buttons[sel].classList.add("wrong");
          buttons.forEach((b) => b.classList.remove("sel"));
          node.append(h(`<div class="feedback ${ok ? "good" : "bad"}"><b>${ok ? "Richtig!" : "Nicht ganz."}</b>${esc(q.explain || "")}</div>`));
          buzz(ok ? 20 : [30, 40, 30]);
          ctx.setProgress((k + 1) / qs.length);
          const last = k === qs.length - 1;
          ctx.action(last ? `Weiter ${ICON.arrow}` : `Nächste Frage ${ICON.arrow}`, () => {
            if (last) ctx.finish({ c: correct, t: qs.length });
            else { k++; show(); }
          }, { variant: ok ? "good" : "" });
        }
      };
      show();
    },

    /* Zuordnen: eine Karte nach der anderen */
    sort(step, ctx) {
      const items = shuffle(step.items);
      const cats = step.categories;
      let k = 0, correct = 0;
      const counts = cats.map(() => 0);
      const node = h(`<div>
        <p class="lead" style="font-size:16px">${esc(step.prompt || "")}</p>
        <div class="sort-stage"></div>
        <div class="bins ${cats.length === 2 || cats.length === 4 ? "two" : ""}"></div>
      </div>`);
      const stage = node.querySelector(".sort-stage");
      const bins = node.querySelector(".bins");
      cats.forEach((c, j) => {
        const b = h(`<button class="bin">${esc(c)}<span class="cnt">0</span></button>`);
        b.onclick = () => pick(j);
        bins.append(b);
      });
      ctx.body.append(node);
      ctx.action("Wähle eine Kategorie", null, { enabled: false, variant: "ghost" });

      const card = () => {
        const it = items[k];
        stage.replaceChildren(h(`<div class="sort-card"><span class="n">Karte ${k + 1} von ${items.length}</span><span class="txt">${esc(it.text)}</span></div>`));
        bins.classList.remove("locked");
      };
      const pick = (j) => {
        const it = items[k];
        const ok = j === it.cat;
        if (ok) correct++;
        counts[it.cat]++;
        bins.children[it.cat].querySelector(".cnt").textContent = counts[it.cat];
        bins.classList.add("locked");
        const c = stage.firstElementChild;
        c.classList.add(ok ? "right" : "wrong");
        c.append(h(`<span class="verdict">${ok ? "✓ Richtig" : "✗ Richtig wäre: " + esc(cats[it.cat])}</span>`));
        buzz(ok ? 15 : [30, 40, 30]);
        k++;
        ctx.setProgress(k / items.length);
        setTimeout(() => {
          if (k < items.length) card();
          else {
            stage.replaceChildren(h(`<div class="sort-card"><span class="n">Geschafft</span><span class="txt">${correct} von ${items.length} richtig zugeordnet.</span></div>`));
            ctx.action(`Weiter ${ICON.arrow}`, () => ctx.finish({ c: correct, t: items.length }));
          }
        }, ok ? 650 : 1500);
      };
      card();
    },

    /* Lückentext mit Wortbank */
    cloze(step, ctx) {
      const answers = [];
      const html = esc(step.text).replace(/\{([^}]+)\}/g, (_, w) => {
        answers.push(w);
        return `<button class="gap" data-i="${answers.length - 1}">…</button>`;
      });
      const words = shuffle([...answers, ...(step.distractors || [])]);
      const filled = answers.map(() => null);
      let active = 0;

      const node = h(`<div>
        <div class="cloze">${html}</div>
        <div class="bank"></div>
        <p class="hint">${esc(step.prompt || "")}</p>
      </div>`);
      const gaps = [...node.querySelectorAll(".gap")];
      const bank = node.querySelector(".bank");
      words.forEach((w, j) => {
        const b = h(`<button class="word" data-j="${j}">${esc(w)}</button>`);
        b.onclick = () => place(j);
        bank.append(b);
      });

      const paint = () => {
        gaps.forEach((g, i) => {
          g.classList.toggle("active", i === active);
          g.classList.toggle("filled", filled[i] !== null);
          g.textContent = filled[i] !== null ? words[filled[i]] : "…";
        });
        bank.querySelectorAll(".word").forEach((b) => b.classList.toggle("used", filled.includes(+b.dataset.j)));
        const n = filled.filter((x) => x !== null).length;
        ctx.setProgress(n / answers.length);
        ctx.action("Prüfen", check, { enabled: n === answers.length });
      };
      const place = (j) => {
        if (active < 0) return;
        filled[active] = j;
        buzz(8);
        const nextEmpty = filled.findIndex((x, i) => x === null && i > active);
        active = nextEmpty !== -1 ? nextEmpty : filled.indexOf(null);
        paint();
      };
      gaps.forEach((g, i) => g.onclick = () => {
        if (filled[i] !== null && active === i) filled[i] = null;
        active = i;
        paint();
      });

      function check() {
        let correct = 0;
        gaps.forEach((g, i) => {
          const ok = words[filled[i]] === answers[i];
          if (ok) correct++;
          g.classList.remove("active", "filled");
          g.classList.add(ok ? "right" : "wrong");
          g.disabled = true;
          if (!ok) g.insertAdjacentHTML("afterend", `<span class="gap right" style="margin-left:0">${esc(answers[i])}</span>`);
        });
        bank.classList.add("locked");
        node.querySelector(".hint").textContent = `${correct} von ${answers.length} Lücken richtig.`;
        buzz(correct === answers.length ? 20 : [30, 40, 30]);
        ctx.action(`Weiter ${ICON.arrow}`, () => ctx.finish({ c: correct, t: answers.length }), { variant: correct === answers.length ? "good" : "" });
      }

      ctx.body.append(node);
      paint();
    },

    /* Karteikarten: umdrehen, "kann ich" / "nochmal" */
    cards(step, ctx) {
      let queue = step.cards.map((_, i) => i);
      const total = step.cards.length;
      let known = 0;
      const node = h(`<div>
        <div class="flash-meta"><span id="left"></span><span id="known"></span></div>
        <div class="flash-wrap"><div class="flash" role="button" tabindex="0" aria-label="Karte umdrehen">
          <div class="face front"><span class="lbl">Begriff</span><span class="txt"></span><span class="tap">Tippen zum Umdrehen</span></div>
          <div class="face back"><span class="lbl">Erklärung</span><span class="txt"></span></div>
        </div></div>
      </div>`);
      const flash = node.querySelector(".flash");
      const flip = () => {
        flash.classList.toggle("flipped");
        buzz(6);
        if (flash.classList.contains("flipped")) twoButtons();
      };
      flash.onclick = flip;
      flash.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } };
      ctx.body.append(node);

      const again = h(`<button class="btn ghost">Nochmal</button>`);

      const show = () => {
        if (!queue.length) {
          again.remove();
          flash.classList.remove("flipped");
          flash.querySelector(".front .txt").textContent = "Alle Karten sitzen!";
          flash.querySelector(".front .lbl").textContent = "Stark";
          flash.querySelector(".tap").textContent = "";
          flash.onclick = null;
          ctx.setProgress(1);
          ctx.action(`Weiter ${ICON.arrow}`, () => ctx.finish(true));
          return;
        }
        const c = step.cards[queue[0]];
        const wasFlipped = flash.classList.contains("flipped");
        flash.classList.remove("flipped");
        flash.querySelector(".front .txt").textContent = c.front;
        setTimeout(() => { flash.querySelector(".back .txt").textContent = c.back; }, wasFlipped ? 300 : 0);
        node.querySelector("#left").textContent = `${queue.length} übrig`;
        node.querySelector("#known").textContent = `${known}/${total} sicher`;
        ctx.setProgress(known / total);
        again.remove();
        ctx.action("Umdrehen", flip, { variant: "ghost" });
      };
      const twoButtons = () => {
        again.onclick = () => { queue.push(queue.shift()); show(); };
        ctx.dock.prepend(again);
        ctx.action(`${ICON.check} Kann ich`, () => { queue.shift(); known++; show(); }, { variant: "good" });
      };
      show();
    },

    /* Bestehendes Material */
    link(step, ctx) {
      const href = encodeURI(step.href || "#");
      ctx.body.append(h(`<div class="material">
        <div class="icon">${ICON.link}</div>
        <p class="h2">${esc(step.title)}</p>
        <p>${esc(step.text || "")}</p>
        <a class="btn ghost block" href="${href}" target="_blank" rel="noopener">Material öffnen ${ICON.link}</a>
      </div>`));
      ctx.setProgress(1);
      ctx.action(`Erledigt ${ICON.check}`, () => ctx.finish(true));
    }
  };

  /* ── Abschluss ──────────────────────────────────────────── */
  function viewFinish(sid, tid) {
    const s = findSubject(sid), t = findTopic(s, tid);
    if (!t) { location.hash = "#/"; return h("<div></div>"); }
    const p = progress.of(s.id, t.id);
    let c = 0, total = 0;
    Object.values(p.done).forEach((v) => { if (v && typeof v === "object") { c += v.c; total += v.t; } });
    const pct = total ? Math.round((c / total) * 100) : 100;
    const msg = pct >= 90 ? "Hervorragend!" : pct >= 70 ? "Richtig gut!" : pct >= 50 ? "Solide Arbeit." : "Dranbleiben!";
    const nextTopic = s.topics.find((x) => x !== t && !x.soon && progress.ratio(s, x) < 1);

    const v = h(`<main class="view no-tabbar finish">
      <div class="medal">${ICON.trophy}</div>
      <p class="eyebrow">${esc(t.title)}</p>
      <h1 class="display" style="margin-top:10px">${msg}</h1>
      <div class="stats">
        <div class="stat"><div class="v">${pct}%</div><div class="k">richtige Antworten</div></div>
        <div class="stat"><div class="v">${t.steps.length}</div><div class="k">Schritte erledigt</div></div>
      </div>
      <div class="dock"><div class="dock-inner" style="flex-direction:column">
        ${nextTopic ? `<a class="btn block" href="#/f/${s.id}/${nextTopic.id}">Nächstes Thema ${ICON.arrow}</a>` : ""}
        <a class="btn ${nextTopic ? "ghost" : ""} block" href="#/f/${s.id}">Zurück zu ${esc(s.name)}</a>
      </div></div>
    </main>`);
    setColor(v, s.color);
    buzz([20, 60, 20]);
    confetti(s.color);
    return v;
  }

  function confetti(color) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = h(`<div class="confetti" aria-hidden="true"></div>`);
    const colors = [color, "#1B1916", "#E9B949", "#F3EFE7"];
    for (let i = 0; i < 60; i++) {
      const p = document.createElement("i");
      p.style.left = Math.random() * 100 + "vw";
      p.style.background = colors[i % colors.length];
      p.style.setProperty("--dx", (Math.random() * 160 - 80) + "px");
      p.style.setProperty("--r", (Math.random() * 720 - 360) + "deg");
      p.style.animationDuration = 1.6 + Math.random() * 1.6 + "s";
      p.style.animationDelay = Math.random() * .4 + "s";
      box.append(p);
    }
    document.body.append(box);
    setTimeout(() => box.remove(), 4000);
  }

  /* ── Profil ─────────────────────────────────────────────── */
  function viewProfile() {
    const name = firstName();
    let topicsDone = 0, stepsDone = 0, c = 0, total = 0;
    DATA.subjects.forEach((s) => s.topics.forEach((t) => {
      if (!t.steps.length) return;
      const p = progress.of(s.id, t.id);
      stepsDone += Object.keys(p.done).length;
      if (progress.ratio(s, t) >= 1) topicsDone++;
      Object.values(p.done).forEach((v) => { if (v && typeof v === "object") { c += v.c; total += v.t; } });
    }));
    const theme = store.get("theme", "auto");

    const v = h(`<main class="view">
      <header class="topbar"><p class="eyebrow">Profil</p></header>
      <h1 class="display">${name ? esc(name) : "Profil"}</h1>
      <div class="section-head"><p class="eyebrow">Dein Fortschritt</p></div>
      <div class="stat-row">
        <div class="stat"><div class="v">${topicsDone}</div><div class="k">Themen fertig</div></div>
        <div class="stat"><div class="v">${stepsDone}</div><div class="k">Schritte</div></div>
        <div class="stat"><div class="v">${total ? Math.round((c / total) * 100) + "%" : "–"}</div><div class="k">Trefferquote</div></div>
      </div>
      <div class="section-head"><p class="eyebrow">Einstellungen</p></div>
      <div class="list">
        <button class="list-row" id="rename"><span>Name ändern</span><span class="v">${esc(name)}</span></button>
        <div class="list-row"><span>Darstellung</span>
          <div class="seg" id="theme">
            <button data-t="auto">Auto</button><button data-t="light">Hell</button><button data-t="dark">Dunkel</button>
          </div></div>
        <button class="list-row danger" id="reset"><span>Fortschritt zurücksetzen</span></button>
      </div>
      <p class="hint" style="margin-top:18px">Alles wird nur auf diesem Gerät gespeichert.</p>
    </main>`);

    v.querySelectorAll("#theme button").forEach((b) => {
      b.classList.toggle("on", b.dataset.t === theme);
      b.onclick = () => { store.set("theme", b.dataset.t); applyTheme(); render(); };
    });
    v.querySelector("#rename").onclick = () => {
      const n = prompt("Wie sollen wir dich nennen?", name);
      if (n && n.trim()) { store.set("name", n.trim().slice(0, 24)); render(); }
    };
    v.querySelector("#reset").onclick = () => {
      if (confirm("Wirklich den gesamten Fortschritt löschen?")) { progress.reset(); toast("Fortschritt gelöscht"); render(); }
    };
    return v;
  }

  function applyTheme() {
    const t = store.get("theme", "auto");
    if (t === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
  }

  /* ── Start ──────────────────────────────────────────────── */
  applyTheme();
  render();

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
