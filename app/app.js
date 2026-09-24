/* ============================================================
   LERNRAUM — App
   Hash-Router, Fortschritt im localStorage, Aufgaben-Player.
   ============================================================ */
(() => {
  "use strict";

  const DATA = window.LERNRAUM;
  const $app = document.getElementById("app");
  const $tabbar = document.getElementById("tabbar");
  const SINGLE = DATA.subjects.length === 1 ? DATA.subjects[0] : null;

  /* ── Speicher ───────────────────────────────────────────── */
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem("lernraum." + key); return v ? JSON.parse(v) : fallback; }
      catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem("lernraum." + key, JSON.stringify(value)); } catch { /* privater Modus */ }
    }
  };

  const progress = {
    all() { return store.get("progress", {}); },
    of(s, t) { return this.all()[s + "/" + t] || { done: {}, last: 0 }; },
    save(s, t, p) { const all = this.all(); all[s + "/" + t] = { ...p, ts: Date.now() }; store.set("progress", all); },
    complete(s, t, i, score) { const p = this.of(s, t); p.done = { ...p.done, [i]: score || true }; p.last = i; this.save(s, t, p); },
    touch(s, t, i) { const p = this.of(s, t); p.last = i; this.save(s, t, p); },
    count(s, t) { return Object.keys(this.of(s.id, t.id).done).length; },
    ratio(s, t) { return t.steps.length ? this.count(s, t) / t.steps.length : 0; },
    score(s, t) {
      let c = 0, n = 0;
      Object.values(this.of(s.id, t.id).done).forEach((v) => { if (v && typeof v === "object") { c += v.c; n += v.t; } });
      return { c, n };
    },
    reset() { store.set("progress", {}); store.set("self", {}); }
  };

  /* ── Helfer ─────────────────────────────────────────────── */
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const buzz = (p) => { try { navigator.vibrate && navigator.vibrate(p); } catch { /* egal */ } };
  const findSubject = (id) => DATA.subjects.find((s) => s.id === id);
  const findTopic = (s, id) => s && s.topics.find((t) => t.id === id);
  const firstName = () => store.get("name", "");
  const num = (v) => (v < 0 ? "− " + Math.abs(v) : String(v));
  const signed = (v) => (v > 0 ? "+ " + v : num(v));
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cardsTopic = () => {
    for (const s of DATA.subjects) for (const t of s.topics) if (t.steps.length && t.steps.every((x) => x.type === "cards")) return { s, t };
    return null;
  };

  let cleanup = null;

  const ICON = {
    back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5H5V6h5"/></svg>',
    del: '<svg viewBox="0 0 24 24"><path d="M9 6h11v12H9l-6-6zM12 9l5 6M17 9l-5 6"/></svg>'
  };
  const STEP_LABEL = { slides: "Präsentation", quiz: "Quiz", sort: "Zuordnen", cloze: "Lückentext", calc: "Rechnen", cards: "Lernkarten", selfcheck: "Kann-Liste", link: "Material" };

  function stepMeta(st) {
    switch (st.type) {
      case "slides": return st.slides.length + " Folien";
      case "quiz": return st.questions.length + (st.questions.length === 1 ? " Frage" : " Fragen");
      case "sort": return st.items.length + " Karten";
      case "cloze": return (st.text.match(/\{/g) || []).length + " Lücken";
      case "calc": return st.rows.length + " Felder";
      case "cards": return st.cards.length + " Karten";
      case "selfcheck": return st.items.length + " Aussagen";
      default: return "öffnet sich neu";
    }
  }
  const scoreText = (v) => (v && typeof v === "object" ? `${v.c}/${v.t}` : v ? "✓" : "");

  function toast(msg) {
    const t = h(`<div class="toast">${esc(msg)}</div>`);
    document.body.append(t);
    setTimeout(() => t.remove(), 2200);
  }

  function term(lines) {
    return h(`<div class="term">${lines.map(([cls, txt]) => `<span class="ln ${cls}">${txt}</span>`).join("")}</div>`);
  }

  function blocks(s, t) {
    const done = progress.of(s.id, t.id).done;
    return `<div class="blocks">${t.steps.map((_, i) => `<i class="${done[i] ? "on" : ""}"></i>`).join("")}</div>`;
  }

  /* Gerasterte Pixelwolke (Bayer 8×8), angelehnt an die Typesafe-Stilstudie */
  function dither(canvas, seed = 1) {
    const W = 96, H = 120, g = canvas.getContext("2d");
    canvas.width = W; canvas.height = H;
    const pal = [[254, 254, 254], [251, 219, 229], [248, 176, 201], [243, 134, 161], [221, 109, 181], [212, 91, 182]];
    const B = [[0, 32, 8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26], [12, 44, 4, 36, 14, 46, 6, 38], [60, 28, 52, 20, 62, 30, 54, 22],
      [3, 35, 11, 43, 1, 33, 9, 41], [51, 19, 59, 27, 49, 17, 57, 25], [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21]];
    const blobs = seed === 1
      ? [{ x: .05, y: .25, r: .55, a: 1 }, { x: .95, y: .15, r: .6, a: 1 }, { x: .9, y: .7, r: .45, a: .8 }, { x: .1, y: .8, r: .5, a: .7 }, { x: .5, y: .02, r: .3, a: .5 }]
      : [{ x: .2, y: .1, r: .5, a: 1 }, { x: .8, y: .3, r: .55, a: 1 }, { x: .5, y: .6, r: .4, a: .6 }];
    const img = g.createImageData(W, H), L = pal.length;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let d = 0;
      for (const b of blobs) { const dx = x / W - b.x, dy = (y / H - b.y) * 1.25, dd = Math.sqrt(dx * dx + dy * dy) / b.r; d += b.a * Math.max(0, 1 - dd * dd); }
      d += .08 * Math.sin(x * .31) * Math.cos(y * .27);
      d = Math.min(1, Math.max(0, d / 1.6));
      const lvl = Math.min(L - 1, Math.max(0, Math.round(d * (L - 1) + (B[y & 7][x & 7] / 64 - .5))));
      const c = pal[lvl], i = (y * W + x) * 4;
      img.data[i] = c[0]; img.data[i + 1] = c[1]; img.data[i + 2] = c[2]; img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
  }

  /* ── Router ─────────────────────────────────────────────── */
  const routes = [
    [/^#?\/?$/, viewHome, "home"],
    [/^#\/profil$/, viewProfile, "profil"],
    [/^#\/f\/([\w-]+)$/, viewSubject, "home"],
    [/^#\/f\/([\w-]+)\/([\w-]+)$/, viewTopic, null],
    [/^#\/f\/([\w-]+)\/([\w-]+)\/fertig$/, viewFinish, null],
    [/^#\/f\/([\w-]+)\/([\w-]+)\/(\d+)$/, viewPlayer, null]
  ];

  function render() {
    if (cleanup) { cleanup(); cleanup = null; }
    const hash = location.hash || "#/";
    if (!firstName()) return mount(viewWelcome(), null);
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
    };
    if (document.startViewTransition && !reduced()) document.startViewTransition(swap);
    else swap();
  }

  window.addEventListener("hashchange", render);

  /* ── Willkommen ─────────────────────────────────────────── */
  function viewWelcome() {
    const s = SINGLE;
    const v = h(`<main class="view no-tabbar">
      <section class="hero">
        <canvas aria-hidden="true"></canvas>
        <div class="topstrip"><span class="tag-box"><span class="sq"></span>${esc(s ? s.course || s.name : "Lernraum")}</span></div>
        <div class="win">
          <div class="bar"><span class="d"></span>${esc(s && s.company ? s.company : DATA.school)}<span class="r">v0.1</span></div>
          <div class="body">
            <p class="kick">Neu hier?</p>
            <p class="say">Lernen, wann es dir passt.</p>
            <p class="sub">Präsentationen, Übungen und Lernkarten aus dem Unterricht. Auf deinem Handy.</p>
          </div>
        </div>
        <h1 class="display">${s ? esc(s.name).replace("bedarf", "&shy;bedarf") + "." : "Lernraum."}</h1>
      </section>
      <form style="margin-top:32px">
        <label class="field" for="n"><span>Wie heißt du?</span>
          <input class="input" id="n" name="n" autocomplete="given-name" placeholder="Vorname" maxlength="24" required></label>
        <button class="btn block" style="margin-top:14px" type="submit">Los geht's ${ICON.arrow}</button>
        <p class="hint">Dein Fortschritt bleibt auf diesem Gerät. Es gibt kein Konto und kein Passwort.</p>
      </form>
    </main>`);
    dither(v.querySelector("canvas"));
    v.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const n = e.target.n.value.trim();
      if (n) { store.set("name", n.slice(0, 24)); render(); }
    });
    return v;
  }

  /* ── Start ──────────────────────────────────────────────── */
  function nextStepIndex(s, t) {
    const done = progress.of(s.id, t.id).done;
    const i = t.steps.findIndex((_, k) => !done[k]);
    return i === -1 ? 0 : i;
  }

  function resumeTarget(subjects) {
    const all = progress.all();
    let best = null;
    for (const s of subjects) for (const t of s.topics) {
      const p = all[s.id + "/" + t.id];
      if (!p || !t.steps.length || progress.ratio(s, t) >= 1) continue;
      if (!best || p.ts > best.ts) best = { s, t, ts: p.ts };
    }
    if (best) return best;
    for (const s of subjects) for (const t of s.topics) if (t.steps.length && progress.ratio(s, t) < 1) return { s, t, fresh: true };
    return null;
  }

  function topicWin(s, t) {
    if (t.soon || !t.steps.length) {
      return h(`<div class="win topic-win locked"><div class="bar"><span class="d"></span>${esc(t.kicker || "")}<span class="r">bald</span></div>
        <div class="body"><span class="title">${esc(t.title)}</span></div></div>`);
    }
    const n = progress.count(s, t), total = t.steps.length, sc = progress.score(s, t);
    const done = n >= total;
    return h(`<a class="win topic-win ${done ? "done" : ""}" href="#/f/${s.id}/${t.id}">
      <div class="bar"><span class="d"></span>${esc(t.kicker || "")}<span class="r">${done ? "✓ erledigt" : `ca. ${t.minutes || 10} min`}</span></div>
      <div class="body">
        <span class="title">${esc(t.title)}</span>
        ${blocks(s, t)}
        <span class="meta">${n}/${total} Schritte${sc.n ? ` · ${Math.round((sc.c / sc.n) * 100)} % richtig` : ""}</span>
      </div>
    </a>`);
  }

  function topicList(s) {
    const frag = document.createDocumentFragment();
    let group = null, list = null;
    s.topics.forEach((t) => {
      if (!list || t.group !== group) {
        group = t.group;
        if (group) frag.append(h(`<p class="section-head">${esc(group)}</p>`));
        list = h(`<div class="topics"></div>`);
        if (!group) list.style.marginTop = "16px";
        frag.append(list);
      }
      list.append(topicWin(s, t));
    });
    return frag;
  }

  function viewHome() {
    const subjects = SINGLE ? [SINGLE] : DATA.subjects;
    const s = SINGLE;
    const name = firstName();
    const target = resumeTarget(subjects);
    const open = subjects.flatMap((x) => x.topics.filter((t) => t.steps.length).map((t) => [x, t]));
    const doneCount = open.filter(([x, t]) => progress.ratio(x, t) >= 1).length;

    let winBody;
    if (target) {
      const i = nextStepIndex(target.s, target.t);
      winBody = `<p class="kick">Hallo ${esc(name)} · ${doneCount}/${open.length} Themen</p>
        <p class="say">${target.fresh ? "Starte mit:" : "Weiter mit:"} ${esc(target.t.title)}</p>
        <p class="sub">Schritt ${i + 1} von ${target.t.steps.length} · ${esc(target.t.steps[i].title)}</p>
        <div class="actions"><a class="btn" href="#/f/${target.s.id}/${target.t.id}/${i}">${target.fresh ? "Starten" : "Weitermachen"} ${ICON.arrow}</a></div>`;
    } else {
      winBody = `<p class="kick">Hallo ${esc(name)} · alles erledigt</p><p class="say">Alle Themen geschafft.</p>
        <p class="sub">Wiederhole die Lernkarten vor der Klausur.</p>`;
    }

    const v = h(`<main class="view">
      <section class="hero">
        <canvas aria-hidden="true"></canvas>
        <div class="topstrip">
          <span class="tag-box"><span class="sq"></span>${esc(s ? s.course || s.name : "Lernraum")}</span>
          <a class="tag-box ink" href="#/profil">${esc(name)}</a>
        </div>
        <div class="win">
          <div class="bar"><span class="d"></span>${esc(s && s.company ? s.company + " · Personalplanung" : "Lernraum")}<span class="r">${new Date().getFullYear()}</span></div>
          <div class="body">${winBody}</div>
        </div>
        <h1 class="display">${s ? esc(s.name).replace("bedarf", "&shy;bedarf") + "." : "Deine Fächer."}${s && s.description ? `<small>${esc(s.description)}</small>` : ""}</h1>
      </section>
      <div id="list"></div>
    </main>`);
    dither(v.querySelector("canvas"));

    const list = v.querySelector("#list");
    if (s) list.append(topicList(s));
    else {
      const grid = h(`<div class="topics" style="margin-top:24px"></div>`);
      DATA.subjects.forEach((x) => {
        const tops = x.topics.filter((t) => t.steps.length);
        const done = tops.filter((t) => progress.ratio(x, t) >= 1).length;
        grid.append(h(`<a class="win topic-win" href="#/f/${x.id}">
          <div class="bar"><span class="d"></span>${esc(x.course || "Fach")}<span class="r">${done}/${tops.length}</span></div>
          <div class="body"><span class="title">${esc(x.name)}</span><span class="meta">${esc(x.description || "")}</span></div></a>`));
      });
      list.append(grid);
    }
    return v;
  }

  /* ── Fach (nur bei mehreren Kursen) ─────────────────────── */
  function viewSubject(sid) {
    const s = findSubject(sid);
    if (!s) { location.hash = "#/"; return h("<div></div>"); }
    if (SINGLE) { location.hash = "#/"; return h("<div></div>"); }
    const v = h(`<main class="view">
      <div class="topstrip"><a class="icon-btn" href="#/" aria-label="Zurück">${ICON.back}</a><span class="tag-box"><span class="sq"></span>${esc(s.course || s.name)}</span></div>
      <h1 class="display" style="margin-top:24px">${esc(s.name)}.<small>${esc(s.description || "")}</small></h1>
      <div id="list"></div>
    </main>`);
    v.querySelector("#list").append(topicList(s));
    return v;
  }

  /* ── Thema (Lernpfad) ───────────────────────────────────── */
  function viewTopic(sid, tid) {
    const s = findSubject(sid), t = findTopic(s, tid);
    if (!t || t.soon || !t.steps.length) { location.hash = "#/"; return h("<div></div>"); }
    const p = progress.of(s.id, t.id);
    const next = nextStepIndex(s, t);
    const allDone = progress.ratio(s, t) >= 1;
    const started = Object.keys(p.done).length > 0;
    const back = SINGLE ? "#/" : `#/f/${s.id}`;
    const v = h(`<main class="view no-tabbar">
      <div class="topstrip"><a class="icon-btn" href="${back}" aria-label="Zurück">${ICON.back}</a><span class="tag-box"><span class="sq"></span>${esc(t.kicker || s.name)}</span></div>
      <h1 class="display" style="margin-top:26px;font-size:clamp(44px,13vw,72px)">${esc(t.title)}</h1>
      <p class="eyebrow" style="margin-top:14px">${t.steps.length} Schritte · ca. ${t.minutes || 10} min${t.group ? " · " + esc(t.group) : ""}</p>
      <div class="win" style="margin-top:24px">
        <div class="bar"><span class="d"></span>Lernpfad<span class="r">${progress.count(s, t)}/${t.steps.length}</span></div>
        <ol class="list" id="path" style="border:0;list-style:none"></ol>
      </div>
      <div class="dock"><div class="dock-inner">
        <a class="btn block" href="#/f/${s.id}/${t.id}/${allDone ? 0 : next}">${allDone ? "Nochmal durchgehen" : started ? "Weitermachen" : "Starten"} ${ICON.arrow}</a>
      </div></div>
    </main>`);
    const path = v.querySelector("#path");
    t.steps.forEach((st, i) => {
      const d = p.done[i];
      const isNext = i === next && !allDone;
      path.append(h(`<li><a class="list-row" href="#/f/${s.id}/${t.id}/${i}" style="padding:10px 12px;gap:12px;justify-content:flex-start${isNext ? ";background:var(--pink-soft)" : ""}">
        <span style="flex:none;width:30px;height:30px;display:grid;place-items:center;border:2px solid var(--ink);font:700 13px/1 var(--mono);${d ? "background:var(--ink);color:var(--paper)" : isNext ? "background:var(--pink)" : ""}">${d ? "✓" : String(i + 1).padStart(2, "0")}</span>
        <span style="flex:1;min-width:0"><span style="display:block;font-weight:700;line-height:1.25">${esc(st.title)}</span>
        <span style="display:block;font:400 12px/1.4 var(--mono);color:var(--ink-2)">${STEP_LABEL[st.type]} · ${stepMeta(st)}</span></span>
        ${scoreText(d) ? `<span class="v">${scoreText(d)}</span>` : ""}
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
        <p class="eyebrow">${STEP_LABEL[step.type]} · ${i + 1}/${t.steps.length} · ${esc(t.title)}</p>
        <h1 class="h1">${esc(step.title)}</h1>
      </header>
      <section class="player-body"></section>
      <div class="dock"><div class="dock-inner"><button class="btn block" id="act"></button></div></div>
    </main>`);

    const body = v.querySelector(".player-body");
    const btn = v.querySelector("#act");
    const bar = v.querySelectorAll(".progress i")[i];

    const ctx = {
      body,
      root: v,
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
      },
      key: `${s.id}/${t.id}/${i}`
    };

    (PLAYERS[step.type] || PLAYERS.link)(step, ctx);
    return v;
  }

  const PLAYERS = {

    /* Präsentation: horizontal wischen */
    slides(step, ctx) {
      const n = step.slides.length;
      const wrap = h(`<div class="slides"><div class="slide-track"></div><div class="dots"></div>
        <p class="swipe-hint">← zur Seite wischen →</p></div>`);
      const track = wrap.querySelector(".slide-track");
      const dots = wrap.querySelector(".dots");
      step.slides.forEach((sl, k) => {
        track.append(h(`<article class="slide ${sl.style || ""}" aria-label="Folie ${k + 1} von ${n}">
          <div class="bar"><span class="d"></span>Folie ${String(k + 1).padStart(2, "0")}<span class="r">${k + 1} / ${n}</span></div>
          <div class="slide-in">
            <p class="s-kicker">${sl.kicker || ""}</p>
            ${sl.big ? `<p class="s-big">${sl.big}</p>` : ""}
            <h2 class="s-title">${sl.title || ""}</h2>
            <div class="s-body">${sl.body || ""}</div>
          </div>
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
        const node = h(`<div style="animation:enter .3s var(--ease) both">
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
          buttons.forEach((b) => b.classList.remove("sel"));
          buttons[q.answer].classList.add("right");
          if (!ok) buttons[sel].classList.add("wrong");
          node.append(term([
            ["p", "$ prüfe …"],
            ["", ok ? `› <span class="ok">richtig.</span> ${esc(q.explain || "")}` : `› <span class="no">stimmt nicht.</span> Richtig ist ${"ABCDEF"[q.answer]}. ${esc(q.explain || "")}`]
          ]));
          buzz(ok ? 20 : [30, 40, 30]);
          ctx.setProgress((k + 1) / qs.length);
          const last = k === qs.length - 1;
          ctx.action(last ? `Weiter ${ICON.arrow}` : `Nächste Frage ${ICON.arrow}`, () => {
            if (last) ctx.finish({ c: correct, t: qs.length });
            else { k++; show(); }
          });
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
        <p class="lead">${esc(step.prompt || "")}</p>
        <div class="sort-stage"></div>
        <div class="bins ${cats.length % 2 === 0 ? "two" : ""}"></div>
      </div>`);
      const stage = node.querySelector(".sort-stage");
      const bins = node.querySelector(".bins");
      cats.forEach((c, j) => {
        const b = h(`<button class="bin">${esc(c)}<span class="cnt">0</span></button>`);
        b.onclick = () => pick(j);
        bins.append(b);
      });
      ctx.body.append(node);
      ctx.action("Tippe auf eine Kategorie", null, { enabled: false, variant: "ghost" });

      const card = () => {
        stage.replaceChildren(h(`<div class="win sort-card"><div class="bar"><span class="d"></span>Karte ${k + 1} / ${items.length}<span class="r">?</span></div>
          <div class="body"><span class="txt">${esc(items[k].text)}</span></div></div>`));
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
        c.querySelector(".bar .r").textContent = ok ? "✓ richtig" : "✗ " + cats[it.cat];
        buzz(ok ? 15 : [30, 40, 30]);
        k++;
        ctx.setProgress(k / items.length);
        setTimeout(() => {
          if (k < items.length) return card();
          stage.replaceChildren(h(`<div class="win sort-card"><div class="bar"><span class="d"></span>Auswertung<span class="r">${correct}/${items.length}</span></div>
            <div class="body"><span class="txt">${correct} von ${items.length} richtig zugeordnet.</span></div></div>`));
          ctx.action(`Weiter ${ICON.arrow}`, () => ctx.finish({ c: correct, t: items.length }));
        }, ok ? 650 : 1500);
      };
      card();
    },

    /* Lückentext mit Wortbank */
    cloze(step, ctx) {
      const answers = [];
      const html = esc(step.text).replace(/\{([^}]+)\}/g, (_, w) => {
        answers.push(w);
        return `<button class="gap" data-i="${answers.length - 1}"></button>`;
      });
      const words = shuffle([...answers, ...(step.distractors || [])]);
      const filled = answers.map(() => null);
      let active = 0;

      const node = h(`<div>
        <div class="win"><div class="bar"><span class="d"></span>Text<span class="r">${answers.length} Lücken</span></div>
          <div class="cloze">${html}</div></div>
        <div class="bank"></div>
        <p class="hint">${esc(step.prompt || "Tippe eine Lücke an und dann das passende Wort.")}</p>
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
          g.textContent = filled[i] !== null ? words[filled[i]] : String(i + 1);
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
          if (!ok) g.insertAdjacentHTML("afterend", `<span class="gap right">${esc(answers[i])}</span>`);
        });
        bank.classList.add("locked");
        node.querySelector(".hint").remove();
        node.append(term([["p", "$ prüfe …"], ["", `› ${correct === answers.length ? '<span class="ok">alles richtig.</span>' : `<span class="no">${correct} von ${answers.length} richtig.</span> Die Lösungen stehen grün im Text.`}`]]));
        buzz(correct === answers.length ? 20 : [30, 40, 30]);
        ctx.action(`Weiter ${ICON.arrow}`, () => ctx.finish({ c: correct, t: answers.length }));
      }

      ctx.body.append(node);
      paint();
    },

    /* Rechenschema mit eigenem Zahlenfeld (funktioniert auch ohne Minus-Taste) */
    calc(step, ctx) {
      const rows = step.rows;
      const vals = rows.map(() => "");
      let active = 0, locked = false;

      const node = h(`<div>
        ${step.case ? `<div class="win case"><div class="bar"><span class="d"></span>Fall<span class="r">Angaben</span></div><div class="body">${step.case}</div></div>` : ""}
        <div class="calc">
          <div class="bar"><span class="d"></span>Rechenschema<span class="r">${rows.length} Felder</span></div>
          <div id="rows"></div>
        </div>
        <div id="out"></div>
      </div>`);
      const rowsBox = node.querySelector("#rows");
      const rowEls = rows.map((r, k) => {
        const el = h(`<button class="crow ${r.sum ? "sum" : ""} ${r.sep ? "sep" : ""}" type="button">
          <span class="lbl">${esc(r.label)}</span><span class="cell" aria-label="Wert"></span></button>`);
        el.onclick = () => { if (!locked) { active = k; paint(); } };
        rowsBox.append(el);
        return el;
      });

      const pad = h(`<div class="pad" role="group" aria-label="Zahlenfeld">
        ${["7", "8", "9"].map((d) => `<button data-k="${d}">${d}</button>`).join("")}<button class="fn" data-k="del" aria-label="Löschen">${ICON.del}</button>
        ${["4", "5", "6"].map((d) => `<button data-k="${d}">${d}</button>`).join("")}<button class="fn" data-k="neg" aria-label="Vorzeichen">±</button>
        ${["1", "2", "3"].map((d) => `<button data-k="${d}">${d}</button>`).join("")}<button class="fn" data-k="next" aria-label="Nächstes Feld">↓</button>
        <button data-k="0" style="grid-column:span 2">0</button><button class="fn" data-k="hint" style="grid-column:span 2">Hilfe</button>
      </div>`);
      ctx.dock.prepend(pad);
      ctx.root.classList.add("has-pad");

      const press = (k) => {
        if (locked) return;
        let v = vals[active];
        if (/^\d$/.test(k)) { if (v.replace("-", "").length < 7) v = (v === "0" ? "" : v) + k; }
        else if (k === "del") v = v.slice(0, -1);
        else if (k === "neg") v = v.startsWith("-") ? v.slice(1) : "-" + v;
        else if (k === "next") { active = (active + 1) % rows.length; return paint(); }
        else if (k === "hint") return showHint();
        vals[active] = v;
        buzz(5);
        paint();
      };
      pad.querySelectorAll("button").forEach((b) => b.onclick = () => press(b.dataset.k));

      const onKey = (e) => {
        if (/^\d$/.test(e.key)) press(e.key);
        else if (e.key === "Backspace") press("del");
        else if (e.key === "-") press("neg");
        else if (e.key === "Tab" || e.key === "ArrowDown") { e.preventDefault(); press("next"); }
        else if (e.key === "ArrowUp") { e.preventDefault(); active = (active - 1 + rows.length) % rows.length; paint(); }
        else if (e.key === "Enter" && vals.every((x) => x !== "" && x !== "-")) check();
        else return;
      };
      document.addEventListener("keydown", onKey);
      cleanup = () => document.removeEventListener("keydown", onKey);

      const show = (v) => (v === "" ? "" : v === "-" ? "−" : num(parseInt(v, 10)));
      function paint() {
        rowEls.forEach((el, k) => {
          el.classList.toggle("active", k === active && !locked);
          if (k === active && !locked && el.isConnected) el.scrollIntoView({ block: "nearest", behavior: reduced() ? "auto" : "smooth" });
          if (!locked) el.querySelector(".cell").textContent = show(vals[k]);
        });
        const n = vals.filter((x) => x !== "" && x !== "-").length;
        ctx.setProgress(n / rows.length);
        if (!locked) ctx.action("Prüfen", check, { enabled: n === rows.length });
      }
      function showHint() {
        node.querySelector("#out").replaceChildren(term([["mut", "› " + esc(step.hint || "Rechne Zeile für Zeile.")]]));
      }
      function check() {
        locked = true;
        let correct = 0;
        rows.forEach((r, k) => {
          const x = parseInt(vals[k], 10);
          const ok = x === r.value || (r.either && Math.abs(x) === Math.abs(r.value));
          if (ok) correct++;
          const cell = rowEls[k].querySelector(".cell");
          cell.classList.add(ok ? "right" : "wrong");
          cell.innerHTML = ok ? (r.signed ? signed(x) : show(vals[k]))
            : `<span class="was">${show(vals[k])}</span>${r.signed ? signed(r.value) : num(r.value)}`;
          rowEls[k].disabled = true;
          rowEls[k].classList.remove("active");
        });
        pad.remove();
        ctx.root.classList.remove("has-pad");
        cleanup && cleanup();
        cleanup = null;
        const all = correct === rows.length;
        node.querySelector("#out").replaceChildren(term([
          ["p", "$ prüfe rechenschema …"],
          ["", all ? `› <span class="ok">${correct}/${rows.length} richtig.</span>` : `› <span class="no">${correct}/${rows.length} richtig.</span> Korrekturen stehen im Schema.`],
          ...(step.result ? [["", `› <span class="p">${esc(step.result)}</span>`]] : [])
        ]));
        buzz(all ? 20 : [30, 40, 30]);
        ctx.setProgress(1);
        ctx.action(`Weiter ${ICON.arrow}`, () => ctx.finish({ c: correct, t: rows.length }));
        requestAnimationFrame(() => node.querySelector("#out").scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "nearest" }));
      }

      ctx.body.append(node);
      paint();
    },

    /* Karteikarten: umdrehen, "kann ich" / "nochmal" */
    cards(step, ctx) {
      const queue = shuffle(step.cards.map((_, i) => i));
      const total = step.cards.length;
      let known = 0;
      const node = h(`<div>
        <div class="flash-meta"><span id="left"></span><span id="known"></span></div>
        <div class="flash-wrap"><div class="flash" role="button" tabindex="0" aria-label="Karte umdrehen">
          <div class="face front"><div class="bar"><span class="d"></span>Begriff<span class="r">tippen ↻</span></div><div class="in"><span class="txt"></span><span class="tap">Tippen zum Umdrehen</span></div></div>
          <div class="face back"><div class="bar"><span class="d"></span>Erklärung<span class="r">↻</span></div><div class="in"><span class="txt"></span></div></div>
        </div></div>
      </div>`);
      const flash = node.querySelector(".flash");
      const flip = () => {
        if (!queue.length) return;
        flash.classList.toggle("flipped");
        buzz(6);
        if (flash.classList.contains("flipped")) twoButtons();
      };
      flash.onclick = flip;
      flash.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } };
      ctx.body.append(node);

      const again = h(`<button class="btn ghost">Nochmal</button>`);
      const show = () => {
        again.remove();
        if (!queue.length) {
          flash.classList.remove("flipped");
          flash.querySelector(".front .txt").textContent = "Alle Karten sitzen.";
          flash.querySelector(".front .bar").firstChild.nextSibling.textContent = "Fertig";
          flash.querySelector(".tap").textContent = "";
          node.querySelector("#left").textContent = "0 übrig";
          node.querySelector("#known").textContent = `${total}/${total} sicher`;
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
        ctx.action("Umdrehen", flip, { variant: "ghost" });
      };
      const twoButtons = () => {
        again.onclick = () => { queue.push(queue.shift()); show(); };
        ctx.dock.prepend(again);
        ctx.action(`${ICON.check} Kann ich`, () => { queue.shift(); known++; show(); }, { variant: "good" });
      };
      show();
    },

    /* Kann-Liste: ○ noch unsicher · ◐ geht so · ● sitzt */
    selfcheck(step, ctx) {
      const all = store.get("self", {});
      const vals = all[ctx.key] || step.items.map(() => 0);
      const node = h(`<div>
        <p class="lead">Wie sicher fühlst du dich? Tippe, bis es stimmt.</p>
        <ul class="kann" style="margin-top:16px"></ul>
        <p class="kann-legend"><span><i></i>noch unsicher</span><span><i style="background:linear-gradient(90deg,var(--pink) 50%,var(--paper) 50%)"></i>geht so</span><span><i style="background:var(--ink)"></i>sitzt</span></p>
      </div>`);
      const ul = node.querySelector(".kann");
      step.items.forEach((txt, k) => {
        const li = h(`<li><button type="button"><span class="st" data-v="${vals[k]}"></span><span>${esc(txt)}</span></button></li>`);
        li.querySelector("button").onclick = () => {
          vals[k] = (vals[k] + 1) % 3;
          li.querySelector(".st").dataset.v = vals[k];
          buzz(6);
          ctx.setProgress(vals.filter(Boolean).length / vals.length);
        };
        ul.append(li);
      });
      ctx.body.append(node);
      ctx.setProgress(vals.filter(Boolean).length / vals.length);
      ctx.action(`Speichern ${ICON.check}`, () => {
        const a = store.get("self", {}); a[ctx.key] = vals; store.set("self", a);
        ctx.finish(true);
      });
    },

    /* Bestehendes Material */
    link(step, ctx) {
      let href = "#";
      try { href = new URL(encodeURI(step.href), DATA.materialBase || location.href).href; } catch { /* ungültig */ }
      ctx.body.append(h(`<div class="win material">
        <div class="bar"><span class="d"></span>Material<span class="r">extern</span></div>
        <div class="body"><p class="h2">${esc(step.title)}</p><p>${esc(step.text || "")}</p>
        <a class="btn ghost block" href="${href}" target="_blank" rel="noopener">Material öffnen ${ICON.link}</a></div>
      </div>`));
      ctx.setProgress(1);
      ctx.action(`Erledigt ${ICON.check}`, () => ctx.finish(true));
    }
  };

  /* ── Abschluss ──────────────────────────────────────────── */
  function viewFinish(sid, tid) {
    const s = findSubject(sid), t = findTopic(s, tid);
    if (!t) { location.hash = "#/"; return h("<div></div>"); }
    if (!progress.count(s, t)) { location.hash = `#/f/${s.id}/${t.id}`; return h("<div></div>"); }
    const p = progress.of(s.id, t.id);
    const sc = progress.score(s, t);
    const pct = sc.n ? Math.round((sc.c / sc.n) * 100) : 100;
    const msg = pct >= 90 ? "Stark. Das sitzt." : pct >= 70 ? "Richtig gut." : pct >= 50 ? "Solide – schau dir die Fehler nochmal an." : "Dranbleiben. Einmal wiederholen hilft.";
    const idx = s.topics.indexOf(t);
    const nextTopic = s.topics.slice(idx + 1).concat(s.topics.slice(0, idx)).find((x) => x.steps.length && progress.ratio(s, x) < 1);
    const log = t.steps.map((st, k) => {
      const d = p.done[k];
      const label = esc(st.title).padEnd(28, ".").slice(0, 28);
      return ["", `› ${label} <span class="${d ? "ok" : "mut"}">${scoreText(d) || "–"}</span>`];
    });

    const v = h(`<main class="view no-tabbar finish">
      <section class="hero">
        <canvas aria-hidden="true"></canvas>
        <div class="topstrip"><span class="tag-box ink"><span class="sq"></span>${esc(t.kicker || "Thema")} · erledigt</span></div>
        <p class="finish-num">${pct}<small>%</small></p>
        <p class="h2" style="margin-top:16px">${msg}</p>
        <p class="eyebrow" style="margin-top:10px">${esc(t.title)} · ${sc.n ? `${sc.c} von ${sc.n} Punkten` : "abgeschlossen"}</p>
      </section>
      <div id="log"></div>
      <div class="dock"><div class="dock-inner col">
        ${nextTopic ? `<a class="btn block" href="#/f/${s.id}/${nextTopic.id}">Weiter: ${esc(nextTopic.title)} ${ICON.arrow}</a>` : ""}
        <a class="btn ${nextTopic ? "ghost" : ""} block" href="${SINGLE ? "#/" : `#/f/${s.id}`}">Zur Übersicht</a>
      </div></div>
    </main>`);
    v.querySelector("#log").append(term([["p", "$ auswertung " + esc(t.id)], ...log]));
    dither(v.querySelector("canvas"), 2);
    buzz([20, 60, 20]);
    confetti();
    return v;
  }

  function confetti() {
    if (reduced()) return;
    const box = h(`<div class="confetti" aria-hidden="true"></div>`);
    const colors = ["#F386A1", "#1E1E1E", "#D45BB6", "#5CE0A8"];
    for (let i = 0; i < 48; i++) {
      const p = document.createElement("i");
      p.style.left = Math.random() * 100 + "vw";
      p.style.background = colors[i % colors.length];
      p.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
      p.style.animationDuration = 1.4 + Math.random() * 1.6 + "s";
      p.style.animationDelay = Math.random() * .4 + "s";
      p.style.animationTimingFunction = "steps(" + (14 + Math.floor(Math.random() * 10)) + ")";
      box.append(p);
    }
    document.body.append(box);
    setTimeout(() => box.remove(), 3800);
  }

  /* ── Profil ─────────────────────────────────────────────── */
  function viewProfile() {
    const name = firstName();
    let topicsDone = 0, stepsDone = 0, c = 0, n = 0;
    DATA.subjects.forEach((s) => s.topics.forEach((t) => {
      if (!t.steps.length) return;
      stepsDone += progress.count(s, t);
      if (progress.ratio(s, t) >= 1) topicsDone++;
      const sc = progress.score(s, t); c += sc.c; n += sc.n;
    }));

    const v = h(`<main class="view">
      <div class="topstrip"><span class="tag-box"><span class="sq"></span>Profil</span></div>
      <h1 class="display" style="margin-top:26px">${esc(name)}.</h1>
      <p class="section-head">Fortschritt</p>
      <div class="stat-row">
        <div class="stat"><div class="v">${topicsDone}</div><div class="k">Themen fertig</div></div>
        <div class="stat"><div class="v">${stepsDone}</div><div class="k">Schritte</div></div>
        <div class="stat"><div class="v">${n ? Math.round((c / n) * 100) + "%" : "–"}</div><div class="k">Treffer</div></div>
      </div>
      <p class="section-head">Einstellungen</p>
      <div class="list">
        <button class="list-row" id="rename"><span>Name ändern</span><span class="v">${esc(name)}</span></button>
        <button class="list-row danger" id="reset"><span>Fortschritt zurücksetzen</span></button>
      </div>
      <p class="hint" style="margin-top:14px">Alles bleibt auf diesem Gerät gespeichert. Die Lehrkraft sieht deinen Fortschritt nicht.</p>
    </main>`);

    const rename = v.querySelector("#rename");
    rename.onclick = () => {
      const row = h(`<form class="list-row" style="gap:8px;padding:8px">
        <input class="input" id="newname" style="min-height:44px" maxlength="24" value="${esc(name)}" aria-label="Neuer Name">
        <button class="btn small" type="submit">OK</button></form>`);
      row.onsubmit = (e) => {
        e.preventDefault();
        const nn = row.querySelector("input").value.trim();
        if (nn) { store.set("name", nn.slice(0, 24)); toast("› Name gespeichert"); render(); }
      };
      rename.replaceWith(row);
      row.querySelector("input").focus();
    };
    const reset = v.querySelector("#reset");
    reset.onclick = () => {
      if (reset.dataset.armed) { progress.reset(); toast("› Fortschritt gelöscht"); render(); return; }
      reset.dataset.armed = "1";
      reset.firstElementChild.textContent = "Nochmal tippen zum Löschen";
      setTimeout(() => { if (reset.isConnected) { delete reset.dataset.armed; reset.firstElementChild.textContent = "Fortschritt zurücksetzen"; } }, 4000);
    };
    return v;
  }

  /* ── Start ──────────────────────────────────────────────── */
  const ct = cardsTopic();
  const cardsTab = $tabbar.querySelector('[data-tab="karten"]');
  if (cardsTab) {
    if (ct) cardsTab.href = `#/f/${ct.s.id}/${ct.t.id}/0`;
    else cardsTab.hidden = true;
  }
  render();

  if ("serviceWorker" in navigator && location.protocol === "https:" && location.hostname.endsWith("github.io")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
