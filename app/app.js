/* ============================================================
   LERNRAUM — App
   Hash-Router, Fortschritt im localStorage, Aufgaben-Player.
   ============================================================ */
(() => {
  "use strict";

  const DATA = window.LERNRAUM;
  const $app = document.getElementById("app");
  const $tabbar = document.getElementById("tabbar");
  // Startseite = Fächer-Übersicht. Nur mit `single: true` in content.js startet die App direkt im einzigen Kurs.
  const SINGLE = DATA.single && DATA.subjects.length === 1 ? DATA.subjects[0] : null;

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
    uncomplete(s, t, i) { const p = this.of(s, t); if (p.done) delete p.done[i]; this.save(s, t, p); },
    count(s, t) { return Object.keys(this.of(s.id, t.id).done).length; },
    ratio(s, t) { return t.steps.length ? this.count(s, t) / t.steps.length : 0; },
    score(s, t) {
      let c = 0, n = 0;
      Object.values(this.of(s.id, t.id).done).forEach((v) => { if (v && typeof v === "object") { c += v.c; n += v.t; } });
      return { c, n };
    },
    resetTopic(s, t) { const all = this.all(); delete all[s.id + "/" + t.id]; store.set("progress", all); },
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
    help: '<svg viewBox="0 0 24 24"><path d="M9 9a3 3 0 1 1 4.5 2.6c-.9.5-1.5 1.2-1.5 2.2V15M12 18.5v.5"/></svg>',
    qr: '<svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2zM6.5 6.5h1v1h-1zM16.5 6.5h1v1h-1zM6.5 16.5h1v1h-1z"/></svg>',
    ext: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5H5V6h5"/></svg>',
    reset: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v5h5"/></svg>',
    del: '<svg viewBox="0 0 24 24"><path d="M9 6h11v12H9l-6-6zM12 9l5 6M17 9l-5 6"/></svg>'
  };
  const HOWTO = {
    slides: "Wische nach links, um weiterzublättern. Lies jede Folie in Ruhe – die Aufgaben danach bauen darauf auf.",
    quiz: "Tippe eine Antwort an und dann auf „Prüfen“. Genau eine Antwort ist richtig.",
    sort: "Lies die Karte und tippe auf die Kategorie, zu der sie gehört.",
    cloze: "Tippe zuerst eine Lücke an und dann das passende Wort unten. Einige Wörter passen nirgends.",
    calc: "Tippe ein Feld an und gib die Zahl über das Zahlenfeld ein. Mit ± machst du eine Zahl negativ, mit ↓ springst du ins nächste Feld.",
    cards: "Überlege dir die Antwort, dann tippe zum Umdrehen. Ehrlich bleiben: „Nochmal“ legt die Karte nach hinten.",
    selfcheck: "Tippe jede Aussage so oft an, bis sie zu dir passt: leer = noch unsicher, halb = geht so, voll = sitzt.",
    link: "Das Material öffnet sich in einem neuen Tab. Komm danach zurück und tippe auf „Erledigt“.",
    sentence: "Tippe eine Lücke an und wähle unten den passenden Baustein. So entsteht Schritt für Schritt ein vollständiger Antwortsatz.",
    word: "Tippe eine Zeile an – an den blauen Griffen ziehst du die Markierung größer. Formatiere mit der Leiste, Leerzeilen setzt du mit Enter (löschen: ⌫), Kürzel: Strg+A/B/R. Mit „Probe“ prüfst du die Aufgabe."
  };
  const STEP_LABEL = { slides: "Präsentation", quiz: "Quiz", sort: "Zuordnen", cloze: "Lückentext", calc: "Rechnen", cards: "Lernkarten", selfcheck: "Kann-Liste", link: "Material", sentence: "Antwortsatz", word: "Word üben" };

  function stepMeta(st) {
    switch (st.type) {
      case "slides": return st.slides.length + " Folien";
      case "quiz": return st.questions.length + (st.questions.length === 1 ? " Frage" : " Fragen");
      case "sort": return st.items.length + " Karten";
      case "cloze": return (st.text.match(/\{/g) || []).length + " Lücken";
      case "calc": return st.rows.length + " Felder";
      case "cards": return st.cards.length + " Karten";
      case "selfcheck": return st.items.length + " Aussagen";
      case "sentence": return (st.text.match(/\{/g) || []).length + " Bausteine";
      case "word": return st.mode === "free" ? st.criteria.length + " Prüfpunkte" : st.criteria.length + " Aufgaben";
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

  /* ── Übungsklausur ─────────────────────────────────────────── */
  const GRADING = [[92, "1", "sehr gut"], [81, "2", "gut"], [67, "3", "befriedigend"], [50, "4", "ausreichend"], [30, "5", "mangelhaft"], [0, "6", "ungenügend"]];
  const examPoints = (t) => t.steps.reduce((a, st) => a + (st.points || 0), 0);
  const stepPoints = (st, d) => (d && typeof d === "object" && d.t ? Math.round((st.points || 0) * d.c / d.t * 2) / 2 : 0);
  const fmtP = (x) => String(x).replace(".", ",");
  const clock = (sec) => { const a = Math.abs(Math.round(sec)); return (sec < 0 ? "+" : "") + String(Math.floor(a / 60)).padStart(2, "0") + ":" + String(a % 60).padStart(2, "0"); };
  function examRemaining(s, t) {
    const p = progress.of(s.id, t.id);
    if (!p.examStart) return t.exam.minutes * 60;
    const end = p.examEnd || Date.now();
    return t.exam.minutes * 60 - (end - p.examStart) / 1000;
  }
  function grade(pct, t) {
    return (t.exam.grading || GRADING).find(([min]) => pct >= min) || GRADING[GRADING.length - 1];
  }

  /* Erwartungshorizont je Aufgabe */
  function solutionHTML(st) {
    switch (st.type) {
      case "quiz": return `<ol class="sol-list">${st.questions.map((q) => `<li>${esc(q.q)}<br><b>→ ${esc(q.options[q.answer])}</b></li>`).join("")}</ol>`;
      case "sort": return st.categories.map((c, k) => `<p><b>${esc(c)}:</b> ${st.items.filter((it) => it.cat === k).map((it) => esc(it.text)).join(" · ")}</p>`).join("");
      case "cloze": return `<p>${esc(st.text).replace(/\{([^}]+)\}/g, (_, w) => `<mark>${w}</mark>`)}</p>`;
      case "calc": return `<table class="scheme">${st.rows.map((r) => `<tr class="${r.sum ? "sum" : ""}"><td>${esc(r.label)}</td><td>${r.signed ? signed(r.value) : num(r.value)}</td></tr>`).join("")}</table>` + (st.result ? `<p class="note">${esc(st.result)}</p>` : "");
      case "sentence": return `<p>${sentenceParts(st.text).map((x) => (typeof x === "string" ? esc(x) : `<mark>${esc(x.right)}</mark>`)).join("")}</p>`;
      default: return "";
    }
  }
  function mistakesHTML(st, d) {
    if (!d || typeof d !== "object" || !d.wrong || !d.wrong.length) return "";
    const w = d.wrong;
    const txt = st.type === "quiz" ? "Falsch beantwortet: Frage " + w.join(", ")
      : st.type === "sort" ? "Falsch zugeordnet: " + w.map(esc).join(" · ")
      : st.type === "cloze" ? "Falsche Lücken, richtig wäre: " + w.map(esc).join(", ")
      : st.type === "calc" ? "Fehler in: " + w.map(esc).join(" · ")
      : st.type === "sentence" ? "Falsche Bausteine, richtig wäre: " + w.map(esc).join(", ") : "";
    return txt ? `<p class="sol-wrong">${txt}</p>` : "";
  }

  /* Satzbausteine: „Das Ergebnis ist {*positiv|negativ}.“ – * markiert den richtigen Baustein */
  function sentenceParts(text) {
    const out = [];
    let last = 0;
    text.replace(/\{([^}]+)\}/g, (m, inner, pos) => {
      if (pos > last) out.push(text.slice(last, pos));
      const opts = inner.split("|").map((o) => o.trim());
      const right = (opts.find((o) => o.startsWith("*")) || opts[0]).replace(/^\*/, "");
      out.push({ right, options: opts.map((o) => o.replace(/^\*/, "")) });
      last = pos + m.length;
    });
    if (last < text.length) out.push(text.slice(last));
    return out;
  }

  /* ── Router ─────────────────────────────────────────────── */
  const routes = [
    [/^#?\/?$/, viewHome, "home"],
    [/^#\/profil$/, viewProfile, "profil"],
    [/^#\/hilfe$/, viewHelp, "hilfe"],
    [/^#\/qr$/, viewQR, null],
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
    if (t.drill) {
      const ds = drillStats(t);
      return h(`<a class="win topic-win drill-win" href="#/f/${s.id}/${t.id}">
        <div class="bar"><span class="d"></span>${esc(t.kicker || "Training")}<span class="r">∞ Aufgaben</span></div>
        <div class="body">
          <span class="title">${esc(t.title)}</span>
          <span class="meta">${ds.rounds ? `${ds.rounds} gelöst · ${ds.perfect} perfekt · Serie ${ds.streak}` : esc(t.description || "Immer neue Aufgaben – üben, bis es sitzt.")}</span>
        </div>
      </a>`);
    }
    if (t.soon || !t.steps.length) {
      return h(`<div class="win topic-win locked"><div class="bar"><span class="d"></span>${esc(t.kicker || "")}<span class="r">bald</span></div>
        <div class="body"><span class="title">${esc(t.title)}</span></div></div>`);
    }
    const n = progress.count(s, t), total = t.steps.length, sc = progress.score(s, t);
    const done = n >= total;
    if (t.exam) {
      const pts = t.steps.reduce((a, st, k) => a + stepPoints(st, progress.of(s.id, t.id).done[k]), 0);
      return h(`<a class="win topic-win exam-win ${done ? "done" : ""}" href="#/f/${s.id}/${t.id}">
        <div class="bar"><span class="d"></span>${esc(t.kicker || "Übungsklausur")}<span class="r">${t.exam.minutes} min · ${examPoints(t)} P</span></div>
        <div class="body">
          <span class="title">${esc(t.title)}</span>
          ${blocks(s, t)}
          <span class="meta">${done ? `Ergebnis: ${fmtP(pts)} von ${examPoints(t)} Punkten · Note ${grade(pts / examPoints(t) * 100, t)[1]}` : n ? `${n}/${total} Aufgaben · läuft` : "Wie in der echten Klausur: Timer, keine Hilfe, Note am Ende"}</span>
        </div>
      </a>`);
    }
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

  const fachName = (f) => (DATA.faecher && DATA.faecher[f]) || f;
  const courseTopics = (x) => x.topics.filter((t) => t.steps.length || t.drill);

  function viewHome() {
    if (!SINGLE) return viewLanding();
    const s = SINGLE;
    const name = firstName();
    const target = resumeTarget([s]);
    const open = s.topics.filter((t) => t.steps.length);
    const doneCount = open.filter((t) => progress.ratio(s, t) >= 1).length;
    const v = h(`<main class="view">
      <section class="hero">
        <canvas aria-hidden="true"></canvas>
        <div class="topstrip">
          <span class="tag-box"><span class="sq"></span>${esc(s.course || s.name)}</span>
          <a class="tag-box ink" href="#/profil">${esc(name)}</a>
        </div>
        <div class="win">
          <div class="bar"><span class="d"></span>${esc(s.company ? s.company + " · Personalplanung" : s.name)}<span class="r">${new Date().getFullYear()}</span></div>
          <div class="body">${resumeBody(target, name, `${doneCount}/${open.length} Themen`)}</div>
        </div>
        <h1 class="display">${esc(s.name).replace("bedarf", "&shy;bedarf")}.${s.description ? `<small>${esc(s.description)}</small>` : ""}</h1>
      </section>
      <div id="list"></div>
    </main>`);
    dither(v.querySelector("canvas"));
    v.querySelector("#list").append(topicList(s));
    return v;
  }

  function resumeBody(target, name, count) {
    if (target) {
      const i = nextStepIndex(target.s, target.t);
      const st = target.t.steps[i];
      return `<p class="kick">Hallo ${esc(name)}${count ? " · " + count : ""}</p>
        <p class="say">${target.fresh ? "Starte mit:" : "Weiter mit:"} ${esc(target.t.title)}</p>
        <p class="sub">${esc(target.s.course || target.s.name)}${st ? ` · Schritt ${i + 1} von ${target.t.steps.length}` : ""}</p>
        <div class="actions"><a class="btn" href="#/f/${target.s.id}/${target.t.id}/${i}">${target.fresh ? "Starten" : "Weitermachen"} ${ICON.arrow}</a></div>`;
    }
    return `<p class="kick">Hallo ${esc(name)}</p><p class="say">Alles erledigt.</p><p class="sub">Wiederhole die Lernkarten vor der Klausur.</p>`;
  }

  /* Startseite bei mehreren Fächern: Fach → Kurse & Materialsammlungen */
  function viewLanding() {
    const name = firstName();
    const courses = DATA.subjects.filter((x) => !x.materials);
    const target = resumeTarget(courses);
    const fachs = [...new Set(DATA.subjects.map((x) => x.fach || x.name))]
      .sort((a, b) => (DATA.subjects.some((x) => x.fach === b && !x.materials) - DATA.subjects.some((x) => x.fach === a && !x.materials)) || a.localeCompare(b, "de"));
    const v = h(`<main class="view">
      <section class="hero">
        <canvas aria-hidden="true"></canvas>
        <div class="topstrip">
          <span class="tag-box"><span class="sq"></span>Lernraum</span>
          <a class="tag-box ink" href="#/profil">${esc(name)}</a>
        </div>
        <div class="win">
          <div class="bar"><span class="d"></span>${esc(DATA.school)}<span class="r">${new Date().getFullYear()}</span></div>
          <div class="body">${courses.length ? resumeBody(target, name, "") : `<p class="kick">Hallo ${esc(name)}</p><p class="say">Wähle dein Fach.</p>`}</div>
        </div>
        <h1 class="display">Lernraum.<small>Übungen und Lernpfade für deine Fächer – gemacht fürs Handy. Wähle unten dein Fach.</small></h1>
      </section>
      <div class="fach-chips" role="navigation" aria-label="Fächer"></div>
      <div id="list"></div>
      <a class="u-link" href="#/qr" style="display:inline-block;margin-top:28px">Für Lehrkräfte: QR-Codes für alle Übungen →</a>
    </main>`);
    dither(v.querySelector("canvas"));
    const chips = v.querySelector(".fach-chips");
    if (fachs.length < 2) chips.remove();
    const list = v.querySelector("#list");
    fachs.forEach((f, k) => {
      const chip = h(`<button class="tag-box">${esc(f)}</button>`);
      chip.onclick = () => v.querySelector(`#fach-${k}`).scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
      if (fachs.length > 1) chips.append(chip);
      list.append(h(`<p class="section-head fach-head" id="fach-${k}">${esc(f)}${fachName(f) !== f ? " · " + esc(fachName(f)) : ""}</p>`));
      const grid = h(`<div class="topics"></div>`);
      DATA.subjects.filter((x) => (x.fach || x.name) === f).sort((a, b) => (!!a.materials - !!b.materials) || String(b.updated || b.added || "").localeCompare(String(a.updated || a.added || ""))).forEach((x) => grid.append(subjectWin(x)));
      list.append(grid);
    });
    return v;
  }

  const isNew = (x) => x.added && (Date.now() - new Date(x.added)) / 864e5 <= 14;
  function subjectWin(x) {
    if (x.materials) {
      const groups = [...new Set(x.topics.map((t) => t.group).filter(Boolean))];
      return h(`<a class="win topic-win mat-win" href="#/f/${x.id}">
        <div class="bar"><span class="d"></span>Materialsammlung<span class="r">${x.topics.length} Materialien</span></div>
        <div class="body"><span class="title">${esc(x.fach)}: Materialien</span>
          <span class="meta">${esc(groups.slice(0, 4).join(" · "))}${groups.length > 4 ? " …" : ""}</span></div></a>`);
    }
    const tops = courseTopics(x).filter((t) => t.steps.length);
    const done = tops.filter((t) => progress.ratio(x, t) >= 1).length;
    return h(`<a class="win topic-win" href="#/f/${x.id}">
      <div class="bar"><span class="d"></span>Kurs · ${esc(x.course || x.fach || "")}${isNew(x) ? ' <span class="badge-new">Neu</span>' : ""}<span class="r">${done}/${tops.length} Themen</span></div>
      <div class="body"><span class="title">${esc(x.name)}</span>
        <div class="blocks">${tops.map((t) => `<i class="${progress.ratio(x, t) >= 1 ? "on" : ""}"></i>`).join("")}</div>
        <span class="meta">${esc(x.description || "")}</span></div></a>`);
  }

  /* ── Fach / Kurs (bei mehreren Kursen) ──────────────────── */
  function viewSubject(sid) {
    const s = findSubject(sid);
    if (!s || SINGLE) { location.hash = "#/"; return h("<div></div>"); }
    if (s.materials) return viewMaterials(s);
    const v = h(`<main class="view">
      <div class="topstrip"><a class="icon-btn" href="#/" aria-label="Zurück">${ICON.back}</a>
        <span class="tag-box"><span class="sq"></span>${esc(s.course || s.name)}</span>
        <button class="icon-btn" id="qrBtn" aria-label="QR-Code für diesen Kurs">${ICON.qr}</button></div>
      <h1 class="display" style="margin-top:24px">${esc(s.name).replace("bedarf", "&shy;bedarf")}.<small>${esc(s.description || "")}</small></h1>
      <div id="list"></div>
    </main>`);
    v.querySelector("#qrBtn").onclick = () => openQR(s.name, appUrl(`#/f/${s.id}`), s.course || s.fach || "");
    v.querySelector("#list").append(topicList(s));
    return v;
  }

  function viewMaterials(s) {
    const v = h(`<main class="view">
      <div class="topstrip"><a class="icon-btn" href="#/" aria-label="Zurück">${ICON.back}</a>
        <span class="tag-box"><span class="sq"></span>${esc(s.fach)} · Materialien</span></div>
      <h1 class="display" style="margin-top:24px">${esc(s.fach)}.<small>${esc(fachName(s.fach) !== s.fach ? fachName(s.fach) + " · " : "")}${esc(s.description || "")}. Materialien öffnen sich in einem neuen Tab.</small></h1>
      <div id="list"></div>
    </main>`);
    const list = v.querySelector("#list");
    let group = null, box = null;
    s.topics.forEach((t) => {
      if (!box || t.group !== group) {
        group = t.group;
        list.append(h(`<p class="section-head">${esc(group || s.fach)}</p>`));
        box = h(`<div class="list mat-list"></div>`);
        list.append(box);
      }
      const row = h(`<div class="list-row mat-row">
        <a class="mat-open" href="${matUrl(t.href)}" target="_blank" rel="noopener"><span>${esc(t.title)}</span>${ICON.ext}</a>
        <button class="icon-btn small" aria-label="QR-Code für ${esc(t.title)}">${ICON.qr}</button></div>`);
      row.querySelector("button").onclick = () => openQR(t.title, matUrl(t.href), `${s.fach} · ${t.group || "Material"}`);
      box.append(row);
    });
    return v;
  }

  /* ── Thema (Lernpfad) ───────────────────────────────────── */
  function viewTopic(sid, tid) {
    const s = findSubject(sid), t = findTopic(s, tid);
    if (t && t.drill) return viewDrillIntro(s, t);
    if (t && t.href) {
      const v = h(`<main class="view no-tabbar">
        <div class="topstrip"><a class="icon-btn" href="#/f/${s.id}" aria-label="Zurück">${ICON.back}</a><span class="tag-box"><span class="sq"></span>${esc(s.fach)} · ${esc(t.group || "Material")}</span></div>
        <h1 class="display" style="margin-top:26px;font-size:clamp(40px,12vw,64px)">${esc(t.title)}</h1>
        <div class="qr-box" style="margin-top:22px"></div>
        <div class="dock"><div class="dock-inner"><a class="btn block" href="${matUrl(t.href)}" target="_blank" rel="noopener">Material öffnen ${ICON.ext}</a></div></div>
      </main>`);
      v.querySelector(".qr-box").innerHTML = qrSvg(matUrl(t.href));
      return v;
    }
    if (!t || t.soon || !t.steps.length) { location.hash = "#/"; return h("<div></div>"); }
    if (t.exam) return viewExamIntro(s, t);
    const p = progress.of(s.id, t.id);
    const next = nextStepIndex(s, t);
    const allDone = progress.ratio(s, t) >= 1;
    const started = Object.keys(p.done).length > 0;
    const back = SINGLE ? "#/" : `#/f/${s.id}`;
    const v = h(`<main class="view no-tabbar">
      <div class="topstrip"><a class="icon-btn" href="${back}" aria-label="Zurück">${ICON.back}</a><span class="tag-box"><span class="sq"></span>${esc(t.kicker || s.name)}</span>${qrButton(s, t)}</div>
      <h1 class="display" style="margin-top:26px;font-size:clamp(44px,13vw,72px)">${esc(t.title)}</h1>
      <p class="eyebrow" style="margin-top:14px">${t.steps.length} Schritte · ca. ${t.minutes || 10} min${t.group ? " · " + esc(t.group) : ""}</p>
      <div class="win" style="margin-top:24px">
        <div class="bar"><span class="d"></span>Lernpfad<span class="r">${progress.count(s, t)}/${t.steps.length}</span></div>
        <ol class="list" id="path" style="border:0;list-style:none"></ol>
      </div>
      ${started ? `<button class="u-link reset-topic" type="button">↺ Thema zurücksetzen</button>` : ""}
      <div class="dock"><div class="dock-inner">
        <a class="btn block" href="#/f/${s.id}/${t.id}/${allDone ? 0 : next}">${allDone ? "Nochmal durchgehen" : started ? "Weitermachen" : "Starten"} ${ICON.arrow}</a>
      </div></div>
    </main>`);
    const rt = v.querySelector(".reset-topic");
    if (rt) rt.onclick = () => {
      if (!rt.dataset.armed) { rt.dataset.armed = "1"; rt.textContent = "Wirklich alles in diesem Thema löschen? Nochmal tippen."; return; }
      progress.resetTopic(s, t);
      const a = store.get("self", {}); Object.keys(a).filter((k) => k.startsWith(`${s.id}/${t.id}/`)).forEach((k) => delete a[k]); store.set("self", a);
      render();
      toast("› Thema zurückgesetzt");
    };
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

  function viewExamIntro(s, t) {
    const p = progress.of(s.id, t.id);
    const n = progress.count(s, t), done = n >= t.steps.length;
    const running = !!p.examStart && !done;
    const rest = examRemaining(s, t);
    const next = nextStepIndex(s, t);
    const back = SINGLE ? "#/" : `#/f/${s.id}`;
    const v = h(`<main class="view no-tabbar">
      <div class="topstrip"><a class="icon-btn" href="${back}" aria-label="Zurück">${ICON.back}</a><span class="tag-box ink"><span class="sq"></span>${esc(t.kicker || "Übungsklausur")}</span>${qrButton(s, t)}</div>
      <h1 class="display" style="margin-top:26px;font-size:clamp(44px,13vw,72px)">${esc(t.title)}</h1>
      <div class="stat-row" style="margin-top:22px">
        <div class="stat"><div class="v">${t.exam.minutes}</div><div class="k">Minuten</div></div>
        <div class="stat"><div class="v">${examPoints(t)}</div><div class="k">Punkte</div></div>
        <div class="stat"><div class="v">${t.steps.length}</div><div class="k">Aufgaben</div></div>
      </div>
      <div class="win" style="margin-top:22px">
        <div class="bar"><span class="d"></span>Klausurbedingungen<span class="r">bitte lesen</span></div>
        <div class="body merk" style="background:var(--paper)">
          <ul>
            <li>Der <strong>Timer</strong> startet mit der ersten Aufgabe und läuft weiter, auch wenn du die App schließt.</li>
            <li>Während der Klausur gibt es <strong>keine Rückmeldung und keine Hilfe</strong>.</li>
            <li>Antwortsätze baust du aus Bausteinen. Alles wird automatisch ausgewertet.</li>
            <li>Am Ende siehst du Punkte, Note, Lösungen und was du wiederholen solltest.</li>
            ${t.exam.tools ? `<li>Hilfsmittel: <strong>${esc(t.exam.tools)}</strong></li>` : ""}
          </ul>
        </div>
      </div>
      <div class="win" style="margin-top:22px">
        <div class="bar"><span class="d"></span>Aufgaben<span class="r">${examPoints(t)} P</span></div>
        <ol class="list" style="border:0;list-style:none">${t.steps.map((st, k) => `<li class="list-row" style="min-height:48px;gap:12px;justify-content:flex-start">
          <span style="flex:none;width:30px;height:30px;display:grid;place-items:center;border:2px solid var(--ink);font:700 13px/1 var(--mono);${p.done[k] ? "background:var(--ink);color:var(--paper)" : ""}">${p.done[k] ? "✓" : String(k + 1).padStart(2, "0")}</span>
          <span style="flex:1;font-weight:600;line-height:1.25">${esc(st.title)}</span><span class="v">${fmtP(st.points || 0)} P</span></li>`).join("")}</ol>
      </div>
      <div class="dock"><div class="dock-inner col"></div></div>
    </main>`);
    const dock = v.querySelector(".dock-inner");
    if (done) {
      dock.append(h(`<a class="btn block" href="#/f/${s.id}/${t.id}/fertig">Ergebnis ansehen ${ICON.arrow}</a>`));
      const again = h(`<button class="btn ghost block">Neu schreiben</button>`);
      again.onclick = () => {
        if (!again.dataset.armed) { again.dataset.armed = "1"; again.textContent = "Ergebnis löschen und neu starten?"; return; }
        progress.resetTopic(s, t); location.hash = `#/f/${s.id}/${t.id}/0`;
      };
      dock.append(again);
    } else {
      dock.append(h(`<a class="btn block" href="#/f/${s.id}/${t.id}/${next}">${running ? `Weiter schreiben · ${clock(rest)} übrig` : "Klausur starten"} ${ICON.arrow}</a>`));
    }
    return v;
  }

  /* ── Player ─────────────────────────────────────────────── */
  function viewPlayer(sid, tid, idx) {
    const s = findSubject(sid), t = findTopic(s, tid), i = +idx;
    if (t && t.drill) return viewDrill(s, t);
    const step = t && t.steps[i];
    if (!step) { location.hash = t ? `#/f/${sid}/${tid}` : "#/"; return h("<div></div>"); }
    progress.touch(s.id, t.id, i);
    const exam = !!t.exam;
    if (exam && !progress.of(s.id, t.id).examStart) { const p = progress.of(s.id, t.id); p.examStart = Date.now(); progress.save(s.id, t.id, p); }

    const v = h(`<main class="player">
      <div class="player-top">
        <a class="icon-btn" href="#/f/${s.id}/${t.id}" aria-label="Schließen">${ICON.close}</a>
        <div class="progress">${t.steps.map((_, k) => `<i style="--f:${k < i ? 1 : 0}"></i>`).join("")}</div>
        ${exam ? `<span class="timer" id="timer" aria-label="Restzeit">--:--</span>` : `<button class="icon-btn reset-btn" id="resetBtn" aria-label="Aufgabe zurücksetzen" title="Aufgabe zurücksetzen">${ICON.reset}</button><button class="icon-btn help-btn" id="helpBtn" aria-label="Ich brauche Hilfe">${ICON.help}</button>`}
      </div>
      <header class="player-head">
        <p class="eyebrow">${exam ? `Aufgabe ${i + 1}/${t.steps.length} · ${fmtP(step.points || 0)} Punkte` : `${STEP_LABEL[step.type]} · ${i + 1}/${t.steps.length} · ${esc(t.title)}`}</p>
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
        if (exam && progress.count(s, t) >= t.steps.length) { const p = progress.of(s.id, t.id); if (!p.examEnd) { p.examEnd = Date.now(); progress.save(s.id, t.id, p); } }
        buzz(15);
        location.hash = i + 1 < t.steps.length ? `#/f/${s.id}/${t.id}/${i + 1}` : `#/f/${s.id}/${t.id}/fertig`;
      },
      key: `${s.id}/${t.id}/${i}`,
      hintsFor: null,      // Player können aufgabenspezifische Tipps liefern
      hintKey: () => "0",  // z. B. Frage-Index im Quiz
      revealed: {},
      exam
    };
    ctx.openHelp = (tab) => (exam ? toast("› In der Klausur gibt es keine Hilfe") : openHelp(s, t, step, ctx, tab));
    if (exam) {
      const timer = v.querySelector("#timer");
      const tick = () => {
        const r = examRemaining(s, t);
        timer.textContent = clock(r);
        timer.classList.toggle("low", r < 300 && r >= 0);
        timer.classList.toggle("over", r < 0);
      };
      tick();
      const iv = setInterval(tick, 1000);
      const prev = cleanup;
      cleanup = () => { clearInterval(iv); prev && prev(); };
    } else {
      v.querySelector("#helpBtn").onclick = () => ctx.openHelp();
      // ↺ Aufgabe zurücksetzen: Eingaben, Bewertung und Tipps dieser einen Aufgabe löschen und neu starten
      v.querySelector("#resetBtn").onclick = () => {
        progress.uncomplete(s.id, t.id, i);
        if (step.type === "selfcheck") { const a = store.get("self", {}); delete a[ctx.key]; store.set("self", a); }
        buzz(10);
        render();
        toast("› Aufgabe zurückgesetzt");
      };
    }

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
      const wrong = [];
      const show = () => {
        const q = qs[k];
        let sel = -1;
        ctx.hintsFor = () => [].concat(q.hint || [], q.hints || []);
        ctx.hintKey = () => String(k);
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
            ctx.action(ctx.exam ? "Antwort speichern" : "Prüfen", check);
          };
          opts.append(b);
        });
        ctx.body.replaceChildren(node);
        ctx.action(ctx.exam ? "Antwort speichern" : "Prüfen", check, { enabled: false });

        function check() {
          const ok = sel === q.answer;
          if (ok) correct++;
          else wrong.push(k + 1);
          if (ctx.exam) {
            buzz(8);
            if (k === qs.length - 1) return ctx.finish({ c: correct, t: qs.length, wrong });
            k++; return show();
          }
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
            if (last) ctx.finish({ c: correct, t: qs.length, wrong });
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
      const wrong = [];
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
        else wrong.push(it.text);
        const shown = ctx.exam ? j : it.cat;
        counts[shown]++;
        bins.children[shown].querySelector(".cnt").textContent = counts[shown];
        bins.classList.add("locked");
        const c = stage.firstElementChild;
        if (ctx.exam) c.querySelector(".bar .r").textContent = "→ " + cats[j];
        else {
          c.classList.add(ok ? "right" : "wrong");
          c.querySelector(".bar .r").textContent = ok ? "✓ richtig" : "✗ " + cats[it.cat];
        }
        buzz(ctx.exam ? 8 : ok ? 15 : [30, 40, 30]);
        k++;
        ctx.setProgress(k / items.length);
        setTimeout(() => {
          if (k < items.length) return card();
          if (ctx.exam) return ctx.finish({ c: correct, t: items.length, wrong });
          stage.replaceChildren(h(`<div class="win sort-card"><div class="bar"><span class="d"></span>Auswertung<span class="r">${correct}/${items.length}</span></div>
            <div class="body"><span class="txt">${correct} von ${items.length} richtig zugeordnet.</span></div></div>`));
          ctx.action(`Weiter ${ICON.arrow}`, () => ctx.finish({ c: correct, t: items.length, wrong }));
        }, ctx.exam ? 350 : ok ? 650 : 1500);
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
        ctx.action(ctx.exam ? "Abgeben" : "Prüfen", check, { enabled: n === answers.length });
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
        if (ctx.exam) {
          const wrong = answers.filter((a, i) => words[filled[i]] !== a);
          return ctx.finish({ c: answers.length - wrong.length, t: answers.length, wrong });
        }
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
        <button data-k="0" style="grid-column:span 2">0</button>${ctx.exam ? `<button class="fn" data-k="next" style="grid-column:span 2">nächstes Feld ↓</button>` : `<button class="fn" data-k="hint" style="grid-column:span 2">Hilfe</button>`}
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
        else if (k === "hint") return ctx.openHelp("tipps");
        vals[active] = v;
        buzz(5);
        paint();
      };
      pad.querySelectorAll("button").forEach((b) => b.onclick = () => press(b.dataset.k));

      const onKey = (e) => {
        if (document.querySelector(".sheet-back")) return;
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
        if (!locked) ctx.action(ctx.exam ? "Abgeben" : "Prüfen", check, { enabled: n === rows.length });
      }
      function check() {
        if (ctx.exam) {
          const wrong = rows.filter((r, k) => { const x = parseInt(vals[k], 10); return !(x === r.value || (r.either && Math.abs(x) === Math.abs(r.value))); }).map((r) => r.label);
          cleanup && cleanup(); cleanup = null;
          return ctx.finish({ c: rows.length - wrong.length, t: rows.length, wrong });
        }
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

    /* Antwortsatz aus Bausteinen – vollständig automatisch geprüft */
    sentence(step, ctx) {
      const parts = sentenceParts(step.text);
      const gapsData = parts.filter((x) => typeof x !== "string").map((g) => ({ ...g, options: shuffle(g.options) }));
      const chosen = gapsData.map(() => null);
      let active = 0;
      let gi = 0;
      const html = parts.map((x) => (typeof x === "string" ? esc(x) : `<button class="gap sgap" data-i="${gi++}"></button>`)).join("");
      const node = h(`<div>
        ${step.case ? `<div class="win case"><div class="bar"><span class="d"></span>Aufgabe<span class="r">${gapsData.length} Bausteine</span></div><div class="body">${step.case}</div></div>` : ""}
        <div class="win" style="margin-top:${step.case ? 18 : 0}px"><div class="bar"><span class="d"></span>Dein Antwortsatz<span class="r" id="cnt"></span></div>
          <div class="cloze sentence">${html}</div></div>
        <p class="eyebrow" style="margin-top:18px" id="pickLbl"></p>
        <div class="picks"></div>
        <div id="out"></div>
      </div>`);
      const gaps = [...node.querySelectorAll(".sgap")];
      const picks = node.querySelector(".picks");
      let locked = false;

      const paint = () => {
        gaps.forEach((g, i) => {
          g.classList.toggle("active", i === active && !locked);
          g.classList.toggle("filled", chosen[i] !== null);
          g.textContent = chosen[i] !== null ? chosen[i] : String(i + 1);
        });
        const n = chosen.filter((x) => x !== null).length;
        node.querySelector("#cnt").textContent = `${n}/${gapsData.length}`;
        picks.replaceChildren();
        if (!locked && active >= 0) {
          node.querySelector("#pickLbl").textContent = `Baustein ${active + 1} wählen`;
          gapsData[active].options.forEach((o) => {
            const b = h(`<button class="pick ${chosen[active] === o ? "sel" : ""}">${esc(o)}</button>`);
            b.onclick = () => {
              chosen[active] = o;
              buzz(8);
              const nextEmpty = chosen.findIndex((x, i) => x === null && i > active);
              active = nextEmpty !== -1 ? nextEmpty : chosen.indexOf(null);
              paint();
            };
            picks.append(b);
          });
        } else if (!locked) node.querySelector("#pickLbl").textContent = "Fertig? Tippe eine Lücke an, um sie zu ändern.";
        ctx.setProgress(n / gapsData.length);
        if (!locked) ctx.action(ctx.exam ? "Abgeben" : "Prüfen", check, { enabled: n === gapsData.length });
      };
      gaps.forEach((g, i) => g.onclick = () => { if (!locked) { active = i; paint(); } });

      function check() {
        const wrong = gapsData.filter((g, i) => chosen[i] !== g.right).map((g) => g.right);
        const correct = gapsData.length - wrong.length;
        if (ctx.exam) return ctx.finish({ c: correct, t: gapsData.length, wrong });
        locked = true;
        gaps.forEach((g, i) => {
          const ok = chosen[i] === gapsData[i].right;
          g.classList.remove("active", "filled");
          g.classList.add(ok ? "right" : "wrong");
          g.disabled = true;
          if (!ok) g.insertAdjacentHTML("afterend", `<span class="gap right">${esc(gapsData[i].right)}</span>`);
        });
        picks.replaceChildren();
        node.querySelector("#pickLbl").textContent = "";
        const all = correct === gapsData.length;
        node.querySelector("#out").replaceChildren(term([
          ["p", "$ prüfe antwortsatz …"],
          ["", all ? `› <span class="ok">${correct}/${gapsData.length} richtig.</span> Ein vollständiger Antwortsatz!` : `› <span class="no">${correct}/${gapsData.length} richtig.</span> Die richtigen Bausteine stehen grün im Satz.`],
          ...(step.explain ? [["", `› <span class="p">${esc(step.explain)}</span>`]] : [])
        ]));
        buzz(all ? 20 : [30, 40, 30]);
        ctx.action(`Weiter ${ICON.arrow}`, () => ctx.finish({ c: correct, t: gapsData.length, wrong }));
      }

      ctx.body.append(node);
      paint();
    },

    /* Word-Simulation: einen Brief wie in Word formatieren – geführt oder frei */
    word(step, ctx) {
      const W_FONTS = ["Calibri", "Arial", "Times New Roman", "Verdana"];
      const W_SIZES = [8, 9, 10, 11, 12, 14, 16];
      const W_STACK = {
        "Calibri": "'Calibri','Carlito','Segoe UI',sans-serif",
        "Arial": "Arial,'Helvetica Neue',Helvetica,sans-serif",
        "Times New Roman": "'Times New Roman',Times,serif",
        "Verdana": "Verdana,Geneva,sans-serif"
      };
      const W_ALIGN = [
        ["left", "Linksbündig", '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 10h10M4 14h16M4 18h10"/></svg>'],
        ["center", "Zentriert", '<svg viewBox="0 0 24 24"><path d="M4 6h16M7 10h10M4 14h16M7 18h10"/></svg>'],
        ["right", "Rechtsbündig", '<svg viewBox="0 0 24 24"><path d="M4 6h16M10 10h10M4 14h16M10 18h10"/></svg>'],
        ["justify", "Blocksatz", '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>']
      ];
      const W_CM = { top: "oben", bottom: "unten", left: "links", right: "rechts" };

      const start = step.start || {};
      const doc = {
        margins: { top: 2.5, bottom: 2.5, left: 2.5, right: 2.5, ...(start.margins || {}) },
        blocks: step.blocks.map((b) => ({ text: b.text, font: start.font || "Arial", size: start.size || 10, bold: false, align: "left", gap: 0 }))
      };
      const crit = step.criteria;
      const guided = step.mode !== "free";
      let cur = 0, sel = null, tab = "start", pop = null, popMargins = null, give = null;
      let taskOpen = false, checkOpen = window.innerWidth >= 600;
      let pilcrow = true, zoom = 100, drag = null, idleTimer = null, ghost = null;
      const flashSet = new Set();

      const node = h(`<div class="sim">
        <div class="sim-ribbon">
          <div class="sim-tabs" role="tablist">
            <button type="button" class="sim-tab" disabled>Datei</button>
            <button type="button" class="sim-tab" data-tab="start" aria-selected="true">Start</button>
            <button type="button" class="sim-tab" disabled>Einfügen</button>
            <button type="button" class="sim-tab" disabled>Entwurf</button>
            <button type="button" class="sim-tab" data-tab="layout" aria-selected="false">Layout</button>
            <button type="button" class="sim-tab" disabled>Verweise</button>
            <button type="button" class="sim-tab" disabled>Überprüfen</button>
          </div>
          <div class="sim-groups" id="wrGroups"></div>
          <div class="sim-pop" id="wrPop" hidden></div>
        </div>
        <div id="wrTask"></div>
        <div id="wrOut"></div>
        <div class="sim-scroll">
          <div class="sim-canvas">
            <div class="sim-page-wrap" id="wrWrap">
              <div class="sim-ruler" id="wrRuler" aria-hidden="true"></div>
              <div class="sim-page-row">
                <div class="sim-vruler" aria-hidden="true"></div>
                <div class="sim-page" id="wrPage"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="sim-keys" role="group" aria-label="Tasten">
          <button type="button" class="sim-key" data-key="enter" title="Leerzeile einfügen (Enter)">↵&nbsp;Enter</button>
          <button type="button" class="sim-key" data-key="back" title="Leerzeile löschen (Backspace)">⌫</button>
          <button type="button" class="sim-key" data-key="a" title="Alles markieren (Strg+A)">Strg+A</button>
          <button type="button" class="sim-key" data-key="b" title="Fett (Strg+B)">Strg+B</button>
          <button type="button" class="sim-key" data-key="r" title="Rechtsbündig (Strg+R)">Strg+R</button>
        </div>
      </div>`);
      const out = node.querySelector("#wrOut");
      const groups = node.querySelector("#wrGroups");
      const page = node.querySelector("#wrPage");
      const wrap = node.querySelector("#wrWrap");

      const short = (t) => (t.length > 26 ? t.slice(0, 25) + "…" : t);
      const fmtCm = (v) => String(v).replace(".", ",");
      const selIdx = () => {
        if (!sel) return [];
        if (sel.all) return doc.blocks.map((_, i) => i);
        const a = Math.min(sel.a, sel.b), b = Math.max(sel.a, sel.b);
        return Array.from({ length: b - a + 1 }, (_, n) => a + n);
      };
      const selBold = () => { const ix = selIdx(); return ix.length > 0 && ix.every((i) => doc.blocks[i].bold); };
      const selAlign = () => { const ix = selIdx(); if (!ix.length) return null; const v = doc.blocks[ix[0]].align; return ix.every((i) => doc.blocks[i].align === v) ? v : null; };
      const selLabel = () => (!sel ? "" : sel.all ? "Alles markiert" : sel.a === sel.b ? `Zeile ${sel.a + 1} markiert` : `Zeilen ${Math.min(sel.a, sel.b) + 1}–${Math.max(sel.a, sel.b) + 1} markiert`);
      const lineEl = (i) => page.querySelector(`.sim-line[data-i="${i}"]`);

      function evalCheck(ck) {
        if (ck.op === "font") return doc.blocks.every((b) => b.font === ck.value);
        if (ck.op === "size") {
          if (ck.block !== undefined) return (doc.blocks[ck.block] || {}).size === ck.value;
          return doc.blocks.every((b, i) => (ck.skip || []).includes(i) || b.size === ck.value);
        }
        if (ck.op === "margins") return ["top", "bottom", "left", "right"].every((k) => doc.margins[k] === ck.value[k]);
        if (ck.op === "gap") return (doc.blocks[ck.block] || {}).gap === ck.value;
        if (ck.op === "align") return (doc.blocks[ck.block] || {}).align === ck.value;
        if (ck.op === "bold") return !!((doc.blocks[ck.block] || {}).bold) === (ck.value !== false);
        return false;
      }
      const critOK = (c) => c.checks.every(evalCheck);
      const passedCount = () => crit.filter(critOK).length;
      const hintBlocks = () => {
        if (!guided || cur >= crit.length) return [];
        const set = new Set();
        crit[cur].checks.forEach((ck) => { if (Number.isInteger(ck.block)) set.add(ck.block); });
        return [...set];
      };
      function simMsg(kind, html) {
        out.innerHTML = `<div class="sim-msg ${kind}"><span class="ico">${kind === "ok" ? "✓" : kind === "no" ? "✗" : "i"}</span><span>${html}</span></div>`;
      }
      function hintTargets() {
        const list = [];
        const line = page.querySelector(".sim-line.hint");
        if (line) list.push(line);
        node.querySelectorAll(".hint").forEach((el) => { if (!list.includes(el)) list.push(el); });
        return list;
      }
      function removeGhost() { if (ghost) { ghost.remove(); ghost = null; } }
      function showGhost() {
        if (!guided || cur >= crit.length || !node.isConnected) return;
        const t = hintTargets()[0];
        if (!t) return;
        t.scrollIntoView({ block: "nearest", behavior: reduced() ? "auto" : "smooth" });
        const r = t.getBoundingClientRect();
        ghost = h(`<span class="sim-ghost" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10m0-4.5a1.5 1.5 0 0 1 3 0V10m0-3.5a1.5 1.5 0 0 1 3 0V11m0-2.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.6a6 6 0 0 1-4.2-1.7L5 15.5a1.6 1.6 0 0 1 2.3-2.3L9 14.5"/></svg></span>`);
        ghost.style.left = Math.round(Math.max(6, Math.min(r.left - 36, window.innerWidth - 44))) + "px";
        ghost.style.top = Math.round(Math.min(Math.max(8, r.top + r.height / 2 - 6), window.innerHeight - 64)) + "px";
        node.append(ghost);
        setTimeout(removeGhost, 6000);
      }
      function armGhost() {
        clearTimeout(idleTimer);
        removeGhost();
        if (!guided || cur >= crit.length) return;
        idleTimer = setTimeout(showGhost, 12000);
      }
      const poke = () => { removeGhost(); armGhost(); };

      function paintSelClasses() {
        const ix = selIdx();
        page.querySelectorAll(".sim-line").forEach((el) => el.classList.toggle("sel", ix.includes(+el.dataset.i)));
      }

      function paintHandles() {
        page.querySelectorAll(".sim-handle").forEach((el) => el.remove());
        if (!sel || sel.all) return;
        const a = Math.min(sel.a, sel.b), b = Math.max(sel.a, sel.b);
        const top = lineEl(a), bot = lineEl(b);
        if (!top || !bot) return;
        const hTop = h(`<span class="sim-handle top" data-h="top" role="presentation"></span>`);
        hTop.style.top = Math.round(top.offsetTop - 9) + "px";
        const hBot = h(`<span class="sim-handle bottom" data-h="bottom" role="presentation"></span>`);
        hBot.style.top = Math.round(bot.offsetTop + bot.offsetHeight - 9) + "px";
        [hTop, hBot].forEach((el) => {
          el.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            drag = { mode: el.dataset.h, a0: sel.a, b0: sel.b };
            buzz(6);
          });
          page.append(el);
        });
      }

      function paintBubble() {
        page.querySelectorAll(".sim-bubble").forEach((el) => el.remove());
        if (!guided || cur >= crit.length) return;
        const c = crit[cur];
        const txt = (c.task && c.task.kurz) || c.label;
        const idx = c.checks.map((ck) => ck.block).filter(Number.isInteger);
        if (!idx.length) return;
        const el = lineEl(Math.min(...idx));
        if (!el) return;
        const b = h(`<span class="sim-bubble">${esc(txt)}</span>`);
        page.append(b);
        const top = el.offsetTop - b.offsetHeight - 7;
        b.style.top = (top > 2 ? top : el.offsetTop + el.offsetHeight + 7) + "px";
        b.classList.toggle("below", top <= 2);
      }

      function paintPage() {
        const k = Math.max(8, (page.clientWidth || 320) / 21);
        page.style.padding = `${doc.margins.top * k}px ${doc.margins.right * k}px ${doc.margins.bottom * k}px ${doc.margins.left * k}px`;
        const hint = hintBlocks();
        const a = sel && !sel.all ? Math.min(sel.a, sel.b) : -1;
        const b = sel && !sel.all ? Math.max(sel.a, sel.b) : -1;
        page.innerHTML = `<div class="sim-lines">${doc.blocks.map((bl, i) => {
          const on = sel && (sel.all || (i >= a && i <= b));
          const cls = "sim-line" + (on ? " sel" : "") + (hint.includes(i) ? " hint" : "") + (flashSet.has(i) ? " did" : "");
          const gaps = Array.from({ length: bl.gap }, () => `<div class="sim-gap" data-i="${i}">${pilcrow ? "¶" : ""}</div>`).join("");
          return `<div class="${cls}" data-i="${i}" style="font-family:${W_STACK[bl.font] || "'Calibri',sans-serif"};font-size:${Math.round(bl.size * 1.32)}px;font-weight:${bl.bold ? 700 : 400};text-align:${bl.align}"><span>${esc(bl.text)}</span>${pilcrow ? '<span class="sim-pil">¶</span>' : ""}</div>${gaps}`;
        }).join("")}</div>`;
        page.querySelectorAll(".sim-line,.sim-gap").forEach((el) => {
          el.onclick = () => { sel = { a: +el.dataset.i, b: +el.dataset.i }; closePop(); removeGhost(); armGhost(); refresh(); };
        });
        node.querySelector("#wrRuler").innerHTML =
          `<i class="m ml" style="width:${((doc.margins.left / 21) * 100).toFixed(3)}%"></i>` +
          `<i class="m mr" style="width:${((doc.margins.right / 21) * 100).toFixed(3)}%"></i>` +
          Array.from({ length: 10 }, (_, n) => (n + 1) * 2).map((cm) => `<span class="num" style="left:${((cm / 21) * 100).toFixed(3)}%">${cm}</span>`).join("");
        paintHandles();
        paintBubble();
      }

      function selVal(get) {
        const ix = selIdx();
        if (!ix.length) return "–";
        const v = get(doc.blocks[ix[0]]);
        return ix.every((i) => get(doc.blocks[i]) === v) ? v : "gemischt";
      }

      function paintRibbon() {
        node.querySelectorAll(".sim-tab[data-tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === tab)));
        if (tab === "start") {
          groups.innerHTML = `
            <div class="sim-group"><span class="sim-lbl">Schriftart</span><div class="sim-btns">
              <button type="button" class="sim-b combo" data-act="font" title="Schriftart"><span>${esc(String(selVal((b) => b.font)))}</span><i>▾</i></button>
              <button type="button" class="sim-b combo small" data-act="size" title="Schriftgrad"><span>${esc(String(selVal((b) => b.size)))}</span><i>▾</i></button>
              <button type="button" class="sim-b" data-act="size-" title="Schrift verkleinern">A−</button>
              <button type="button" class="sim-b" data-act="size+" title="Schrift vergrößern">A+</button>
              <button type="button" class="sim-b bold${selBold() ? " on" : ""}" data-act="bold" title="Fett (Strg+B)">F</button>
              <button type="button" class="sim-b dead" disabled title="Kursiv (in dieser Übung nicht nötig)">K</button>
              <button type="button" class="sim-b dead" disabled title="Unterstrichen (in dieser Übung nicht nötig)">U</button>
              <button type="button" class="sim-b dead" disabled title="Textmarker (in dieser Übung nicht nötig)"><svg viewBox="0 0 24 24"><path d="M5 19h14M7 15l7-9 4 3-7 9H7z"/></svg></button>
              <button type="button" class="sim-b dead" disabled title="Schriftfarbe (in dieser Übung nicht nötig)"><svg viewBox="0 0 24 24"><path d="M6 18L12 5l6 13M8.5 14h7M4 21h16"/></svg></button>
            </div></div>
            <div class="sim-group"><span class="sim-lbl">Absatz</span><div class="sim-btns">
              ${W_ALIGN.map(([a, t, svg]) => `<button type="button" class="sim-b${selAlign() === a ? " on" : ""}" data-act="align:${a}" title="${t}">${svg}</button>`).join("")}
              <button type="button" class="sim-b${pilcrow ? " on" : ""}" data-act="pilcrow" title="Formatierungszeichen ein-/ausblenden">¶</button>
              <button type="button" class="sim-b dead" disabled title="Zeilenabstand (in dieser Übung nicht nötig)"><svg viewBox="0 0 24 24"><path d="M4 8h16M4 12h16M4 16h16M7 4v3M7 17v3M17 4v3M17 17v3"/></svg></button>
            </div></div>`;
        } else {
          groups.innerHTML = `
            <div class="sim-group"><span class="sim-lbl">Seite einrichten</span><div class="sim-btns">
              <button type="button" class="sim-b wide" data-act="margins" title="Seitenränder festlegen">Seitenränder ▾</button>
              <button type="button" class="sim-b dead" disabled title="Ausrichtung (in dieser Übung nicht nötig)">Ausrichtung</button>
              <button type="button" class="sim-b dead" disabled title="Größe (in dieser Übung nicht nötig)">Größe</button>
              <button type="button" class="sim-b dead" disabled title="Spalten (in dieser Übung nicht nötig)">Spalten</button>
            </div></div>
            <div class="sim-group"><span class="sim-lbl">Absatz</span><div class="sim-btns">
              <button type="button" class="sim-b dead" disabled title="Einzug (in dieser Übung nicht nötig)"><svg viewBox="0 0 24 24"><path d="M4 6h16M10 10h10M10 14h10M4 18h16M4 13l4-2v4z"/></svg></button>
              <button type="button" class="sim-b dead" disabled title="Abstand (in dieser Übung nicht nötig)"><svg viewBox="0 0 24 24"><path d="M4 5h16M4 19h16M12 8v8M9 11l3-3 3 3M9 13l3 3 3-3"/></svg></button>
            </div></div>`;
        }
      }

      function closePop() { pop = null; popMargins = null; paintPop(); }
      function paintPop() {
        const p = node.querySelector("#wrPop");
        if (!pop) { p.hidden = true; p.innerHTML = ""; return; }
        p.hidden = false;
        if (pop === "font") {
          p.innerHTML = `<div class="sim-chips">${W_FONTS.map((f) => `<button type="button" class="sim-chip${selIdx().length && doc.blocks[selIdx()[0]].font === f ? " on" : ""}" data-f="${esc(f)}" style="font-family:${W_STACK[f]}">${esc(f)}</button>`).join("")}</div>`;
          p.querySelectorAll("[data-f]").forEach((b) => b.onclick = () => applyFont(b.dataset.f));
        } else if (pop === "size") {
          p.innerHTML = `<div class="sim-chips">${W_SIZES.map((s) => `<button type="button" class="sim-chip${selIdx().length && doc.blocks[selIdx()[0]].size === s ? " on" : ""}" data-s="${s}" style="font-size:${Math.round(s * 1.5)}px">${s}</button>`).join("")}</div>`;
          p.querySelectorAll("[data-s]").forEach((b) => b.onclick = () => applySize(+b.dataset.s));
        } else {
          if (!popMargins) popMargins = { ...doc.margins };
          p.innerHTML = `<div class="sim-dlg"><div class="sim-dtitle">Seitenränder</div>${["top", "bottom", "left", "right"].map((k) => `<div class="sim-drow" data-k="${k}"><span>${W_CM[k]}</span>
            <button type="button" class="sim-step" data-d="-1" aria-label="kleiner">−</button><b>${fmtCm(popMargins[k])} cm</b><button type="button" class="sim-step" data-d="1" aria-label="größer">+</button></div>`).join("")}
            <div class="sim-dbtns"><button type="button" class="sim-cancel" id="wrCancel">Abbrechen</button><button type="button" class="sim-ok" id="wrOk">OK</button></div></div>`;
          p.querySelectorAll(".sim-drow").forEach((row) => {
            const k = row.dataset.k;
            row.querySelectorAll("[data-d]").forEach((b) => b.onclick = () => {
              const v = Math.round((popMargins[k] + (+b.dataset.d) * 0.5) * 2) / 2;
              popMargins[k] = Math.max(1, Math.min(6, v));
              paintPop();
            });
          });
          p.querySelector("#wrOk").onclick = () => { doc.margins = { ...popMargins }; pop = null; popMargins = null; buzz(8); refresh(); };
          p.querySelector("#wrCancel").onclick = () => closePop();
        }
      }

      function needSel() { if (!sel) { toast("› Markiere zuerst eine Zeile (antippen oder Griff ziehen)."); return false; } return true; }
      function markFlash(ix) { flashSet.clear(); ix.forEach((i) => flashSet.add(i)); }
      function applyFont(f) { if (!needSel()) return; const ix = selIdx(); ix.forEach((i) => (doc.blocks[i].font = f)); markFlash(ix); pop = null; buzz(8); refresh(); }
      function applySize(s) { if (!needSel()) return; const ix = selIdx(); ix.forEach((i) => (doc.blocks[i].size = s)); markFlash(ix); pop = null; buzz(8); refresh(); }
      function bumpSize(d) {
        if (!needSel()) return;
        const ix = selIdx();
        ix.forEach((i) => { doc.blocks[i].size = Math.max(6, Math.min(72, doc.blocks[i].size + d)); });
        markFlash(ix); buzz(6); refresh();
      }
      function toggleBold() { if (!needSel()) return; const on = !selBold(); const ix = selIdx(); ix.forEach((i) => (doc.blocks[i].bold = on)); markFlash(ix); buzz(6); refresh(); }
      function applyAlign(v) { if (!needSel()) return; const ix = selIdx(); ix.forEach((i) => (doc.blocks[i].align = v)); markFlash(ix); buzz(6); refresh(); }
      function keyEnter() {
        removeGhost(); armGhost();
        if (!sel || sel.all || sel.a !== sel.b) { toast("› Markiere genau eine Zeile – dann Enter."); return; }
        const b = doc.blocks[sel.a];
        if (b.gap >= 4) { toast("› Mehr Leerzeilen gehen hier nicht."); return; }
        b.gap++; markFlash([sel.a]); buzz(6); refresh();
      }
      function keyBack() {
        removeGhost(); armGhost();
        if (!sel || sel.all || sel.a !== sel.b) { toast("› Markiere die Zeile über der Leerzeile."); return; }
        const b = doc.blocks[sel.a];
        if (!b.gap) { toast("› Hier ist keine Leerzeile zum Löschen."); return; }
        b.gap--; buzz(6); refresh();
      }

      function paintTask() {
        const box = node.querySelector("#wrTask");
        if (!guided) {
          box.innerHTML = `<div class="sim-check${checkOpen ? " open" : ""}" id="wrCheckBox">
            <button type="button" class="sim-check-head" id="wrCheckToggle"><span>Checkliste · <b id="wrScore"></b></span><span class="chev">▾</span></button>
            <div class="sim-check-body" id="wrCList"></div></div>`;
          const cb = box.querySelector("#wrCheckBox");
          box.querySelector("#wrCheckToggle").onclick = () => { checkOpen = !checkOpen; cb.classList.toggle("open", checkOpen); };
        } else if (cur >= crit.length) {
          box.innerHTML = `<div class="sim-task done open"><div class="sim-task-head"><span class="n">✓</span><b>Der Brief ist fertig formatiert.</b></div>
            <div class="sim-task-body"><p>Tippe unten auf „Fertig“.</p></div></div>`;
        } else {
          const c = crit[cur], t = c.task || {};
          box.innerHTML = `<div class="sim-task${taskOpen ? " open" : ""}" id="wrTaskBox">
            <button type="button" class="sim-task-head" id="wrTaskToggle"><span class="n">Aufgabe ${cur + 1}/${crit.length}</span><b>${esc(c.label)}</b><span class="chev">▾</span></button>
            <div class="sim-task-body">
              ${t.wo ? `<p><span class="lbl">Wo?</span> ${esc(t.wo)}</p>` : ""}
              ${t.was ? `<p><span class="lbl">Was?</span> ${esc(t.was)}</p>` : ""}
              ${t.probe ? `<p><span class="lbl">Probe</span> ${esc(t.probe)}</p>` : ""}
            </div></div>`;
          const tb = box.querySelector("#wrTaskBox");
          box.querySelector("#wrTaskToggle").onclick = () => { taskOpen = !taskOpen; tb.classList.toggle("open", taskOpen); };
        }
      }

      function paintChecklist() {
        if (guided) return;
        const list = node.querySelector("#wrCList");
        if (!list) return;
        list.innerHTML = crit.map((c) => `<div class="row${critOK(c) ? " ok" : ""}"><i>✓</i><span>${esc(c.label)}</span></div>`).join("");
        const sc = node.querySelector("#wrScore");
        if (sc) sc.textContent = `${passedCount()}/${crit.length}`;
      }

      function paintDock() {
        if (guided) {
          if (cur >= crit.length) ctx.action(`Fertig ${ICON.check}`, () => ctx.finish({ c: crit.length, t: crit.length }), { variant: "good" });
          else ctx.action(`Probe ${ICON.check}`, probe);
        } else if (passedCount() >= crit.length) {
          ctx.action(`Fertig ${ICON.check}`, () => ctx.finish({ c: passedCount(), t: crit.length }), { variant: "good" });
        } else {
          ctx.action(`Prüfen ${ICON.check}`, freeCheck);
        }
      }

      function paintStatus() {
        if (!statusEl) return;
        const words = doc.blocks.reduce((n, b) => n + b.text.split(/\s+/).filter(Boolean).length, 0);
        statusEl.innerHTML = `<span class="s-txt">S. 1/1${sel ? ` · <b class="s-sel">${selLabel()}</b>` : ""}<span class="s-words"> · ${words} Wörter</span><span class="s-lang"> · Deutsch (Deutschland)</span></span>
          <span class="sim-zoom"><button type="button" data-z="-1" aria-label="Verkleinern">−</button><b>${zoom} %</b><button type="button" data-z="1" aria-label="Vergrößern">+</button></span>`;
        statusEl.querySelectorAll("[data-z]").forEach((b) => b.onclick = () => {
          const steps = [80, 100, 125, 150, 175];
          let n = steps.indexOf(zoom);
          if (n === -1) n = 1;
          n = Math.max(0, Math.min(steps.length - 1, n + (+b.dataset.z)));
          zoom = steps[n];
          wrap.style.zoom = zoom / 100;
          paintPage();
          paintStatus();
        });
      }

      function paintCtrlHint() {
        groups.querySelectorAll(".hint").forEach((el) => el.classList.remove("hint"));
        node.querySelectorAll(".sim-tab.hint, .sim-key.hint").forEach((el) => el.classList.remove("hint"));
        if (!guided || cur >= crit.length) return;
        const checks = crit[cur].checks;
        const pulse = (sel2) => { const el = groups.querySelector(sel2); if (el) el.classList.add("hint"); };
        const key = (k) => { const el = node.querySelector(`[data-key="${k}"]`); if (el) el.classList.add("hint"); };
        const curTab = () => node.querySelector(`[data-tab="${tab}"]`);
        const startOps = checks.some((ck) => ["font", "size", "bold", "align"].includes(ck.op));
        const marginOps = checks.some((ck) => ck.op === "margins");
        if (startOps && tab !== "start") { const t2 = curTab(); if (t2) t2.classList.add("hint"); }
        if (marginOps && tab !== "layout") { const t2 = curTab(); if (t2) t2.classList.add("hint"); }
        if (tab === "start" || tab === "layout") {
          if (checks.some((ck) => ck.op === "font" || (ck.op === "size" && ck.block === undefined))) {
            key("a");
            if (checks.some((ck) => ck.op === "font")) pulse('[data-act="font"]');
            if (checks.some((ck) => ck.op === "size" && ck.block === undefined)) pulse('[data-act="size"]');
          }
          checks.forEach((ck) => {
            if (ck.op === "size" && Number.isInteger(ck.block)) pulse('[data-act="size"]');
            if (ck.op === "bold") { pulse('[data-act="bold"]'); key("b"); }
            if (ck.op === "align") { pulse(`[data-act="align:${ck.value}"]`); if (ck.value === "right") key("r"); }
            if (ck.op === "gap") key("enter");
            if (ck.op === "margins") pulse('[data-act="margins"]');
          });
        }
      }

      function refresh() {
        paintRibbon();
        paintPage();
        paintChecklist();
        paintPop();
        paintStatus();
        paintCtrlHint();
        if (flashSet.size) {
          setTimeout(() => { flashSet.clear(); page.querySelectorAll(".sim-line.did").forEach((el) => el.classList.remove("did")); }, 800);
        }
        if (!guided) {
          ctx.setProgress(passedCount() / crit.length);
          if (passedCount() >= crit.length) { if (give) { give.remove(); give = null; } paintDock(); }
        }
      }

      function probe() {
        const c = crit[cur];
        if (!c) return;
        if (critOK(c)) {
          simMsg("ok", `Passt. ${esc((c.task && c.task.probe) || "")}`);
          buzz(20);
          cur++;
          ctx.setProgress(cur / crit.length);
          paintTask();
          paintPage();
          paintCtrlHint();
          paintStatus();
          paintDock();
          const hl = page.querySelector(".sim-line.hint");
          if (hl) hl.scrollIntoView({ block: "nearest", behavior: reduced() ? "auto" : "smooth" });
          armGhost();
        } else {
          simMsg("no", `Noch nicht ganz. ${esc(c.hint || "Schau dir die Zeile nochmal an.")}`);
          buzz([30, 40, 30]);
          armGhost();
        }
      }

      function freeCheck() {
        const n = passedCount();
        const missing = crit.filter((c) => !critOK(c)).map((c) => c.label);
        simMsg(n === crit.length ? "ok" : "no", n === crit.length
          ? `Alles richtig. Der Brief ist fertig formatiert.`
          : `${n} von ${crit.length}. Noch offen: ${esc(missing.join(" · "))}`);
        buzz(n === crit.length ? 20 : [30, 40, 30]);
        ctx.setProgress(n / crit.length);
        if (give) { give.remove(); give = null; }
        if (n < crit.length) {
          give = h(`<button class="btn ghost">Abgeben · ${n}/${crit.length}</button>`);
          give.onclick = () => ctx.finish({ c: n, t: crit.length });
          ctx.dock.append(give);
        }
        paintDock();
      }

      function act(a) {
        if (a === "font") { pop = pop === "font" ? null : "font"; paintPop(); }
        else if (a === "size") { pop = pop === "size" ? null : "size"; paintPop(); }
        else if (a === "margins") { pop = pop === "margins" ? null : "margins"; paintPop(); }
        else if (a === "bold") toggleBold();
        else if (a === "size-") bumpSize(-1);
        else if (a === "size+") bumpSize(1);
        else if (a === "pilcrow") { pilcrow = !pilcrow; paintRibbon(); paintPage(); }
        else if (a.indexOf("align:") === 0) applyAlign(a.slice(6));
      }

      groups.addEventListener("click", (e) => {
        const b = e.target.closest("[data-act]");
        if (b && !b.disabled) act(b.dataset.act);
      });
      node.querySelectorAll(".sim-tab[data-tab]").forEach((b) => b.onclick = () => { tab = b.dataset.tab; pop = null; popMargins = null; paintRibbon(); paintPop(); paintCtrlHint(); });
      node.querySelectorAll(".sim-key").forEach((b) => b.onclick = () => {
        removeGhost(); armGhost();
        const k = b.dataset.key;
        if (k === "enter") keyEnter();
        else if (k === "back") keyBack();
        else if (k === "a") { sel = { all: true }; closePop(); refresh(); }
        else if (k === "b") toggleBold();
        else if (k === "r") applyAlign("right");
      });

      const onKey = (e) => {
        if (!node.isConnected) return;
        if ((e.ctrlKey || e.metaKey) && (e.key === "a" || e.key === "A")) { e.preventDefault(); removeGhost(); armGhost(); sel = { all: true }; refresh(); }
        else if ((e.ctrlKey || e.metaKey) && (e.key === "b" || e.key === "B")) { e.preventDefault(); removeGhost(); armGhost(); toggleBold(); }
        else if ((e.ctrlKey || e.metaKey) && (e.key === "r" || e.key === "R")) { e.preventDefault(); removeGhost(); armGhost(); applyAlign("right"); }
        else if ((e.ctrlKey || e.metaKey) && (e.key === "e" || e.key === "E")) { e.preventDefault(); removeGhost(); armGhost(); applyAlign("center"); }
        else if ((e.ctrlKey || e.metaKey) && (e.key === "l" || e.key === "L")) { e.preventDefault(); removeGhost(); armGhost(); applyAlign("left"); }
        else if (e.key === "Enter") { e.preventDefault(); keyEnter(); }
        else if (e.key === "Backspace") { e.preventDefault(); keyBack(); }
      };
      const onResize = () => paintPage();
      const onDown = () => poke();
      const onDragMove = (e) => {
        if (!drag) return;
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const line = el && el.closest ? el.closest(".sim-line,.sim-gap") : null;
        if (!line) return;
        const i = +line.dataset.i;
        sel = drag.mode === "bottom"
          ? { a: drag.a0, b: Math.max(i, drag.a0) }
          : { a: Math.min(i, drag.b0), b: drag.b0 };
        paintSelClasses();
        paintHandles();
        paintStatus();
      };
      const onDragEnd = () => { if (drag) { drag = null; paintStatus(); } };
      document.addEventListener("keydown", onKey);
      window.addEventListener("resize", onResize);
      window.addEventListener("pointermove", onDragMove);
      window.addEventListener("pointerup", onDragEnd);
      node.addEventListener("pointerdown", onDown);
      document.body.classList.add("sim-on");

      const topbar = ctx.root.querySelector(".player-top");
      topbar.insertBefore(h(`<span class="sim-file"><b>W</b><span>${esc(step.file || "Brief.docx")} – Word</span></span>`), topbar.querySelector(".progress"));
      const statusEl = h(`<span class="sim-status"></span>`);
      ctx.dock.prepend(statusEl);
      cleanup = () => {
        document.body.classList.remove("sim-on");
        clearTimeout(idleTimer);
        removeGhost();
        document.removeEventListener("keydown", onKey);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onDragMove);
        window.removeEventListener("pointerup", onDragEnd);
      };

      ctx.hintsFor = () => (guided && cur < crit.length ? [crit[cur].hint].filter(Boolean) : step.hints || []);
      ctx.hintKey = () => (guided ? "a" + cur : "frei");

      ctx.body.append(node);
      ctx.setProgress(0);
      paintTask();
      paintRibbon();
      paintPage();
      paintChecklist();
      paintStatus();
      paintCtrlHint();
      paintDock();
      if (step.intro) simMsg("info", esc(step.intro));
      armGhost();
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

  /* ── Endlos-Training (Zufallsaufgaben) ───────────────────── */
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const rint = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const sig = (v) => (v > 0 ? "+ " + v : v < 0 ? "− " + Math.abs(v) : "0");
  const drillKey = (t) => "drill." + t.id;
  const drillStats = (t) => ({ rounds: 0, perfect: 0, streak: 0, best: 0, level: 1, ...store.get(drillKey(t), {}) });

  const DRILL_DATA = {
    companies: ["Autohaus Berger KG", "Bäckerei Sommer", "Fitnessstudio Vital", "Modehaus Kaya", "Getränkemarkt Olsen",
      "Hotel Seeblick", "Buchhandlung Fuchs", "Spedition Lange GmbH", "Elektromarkt Pixel", "Gartencenter Grünwerk",
      "Friseursalon Schnittig", "Möbelhaus Holzwerk", "Reisebüro Fernweh", "Drogerie Blau"],
    names: ["Herr Yilmaz", "Frau Novak", "Herr Becker", "Frau Schulz", "Herr Kowalski", "Frau Hoffmann", "Herr Ahmadi",
      "Frau Wagner", "Herr Petrović", "Frau Richter", "Herr Demir", "Frau Klein", "Herr Wolf", "Frau Şahin", "Herr Neumann", "Frau Braun"],
    out: ["geht in Rente", "geht in Elternzeit", "kündigt wegen eines Umzugs", "kündigt für ein Studium",
      "wechselt zu einem anderen Unternehmen", "scheidet aus Altersgründen aus"],
    in: ["wird nach der Ausbildung übernommen", "kommt aus der Elternzeit zurück", "hat einen Arbeitsvertrag unterschrieben und fängt bald an"],
    noise: ["war zwei Wochen krank, ist aber wieder da", "hat sich über den Dienstplan beschwert", "macht im Sommer drei Wochen Urlaub",
      "hat eine Fortbildung besucht", "hat Geburtstag gefeiert", "wünscht sich einen neuen Bürostuhl"],
    noiseFree: ["Ein Kunde hat den Service gelobt.", "Die Firma hat einen neuen Internetauftritt.", "Im Pausenraum steht eine neue Kaffeemaschine."]
  };

  function makeBedarfRound(level) {
    const D = DRILL_DATA;
    const company = pick(D.companies);
    let ist, ab, zu, delta;
    do {
      ist = rint(6, 40); ab = rint(1, 3); zu = rint(0, level === 3 ? 2 : 3);
      delta = level === 3 ? rint(-3, 3) : rint(0, 3);
    } while (ist - ab + zu <= 0 || ist + delta - (ist - ab + zu) === 0 || (level < 3 && ist + delta - (ist - ab + zu) < 0));
    const soll = ist + delta, zw = ist - ab + zu, nb = soll - zw;
    const names = shuffle(D.names);
    const lines = [];
    for (let k = 0; k < ab; k++) lines.push(`${names.pop()} ${pick(D.out)}.`);
    for (let k = 0; k < zu; k++) lines.push(`${names.pop()} ${pick(D.in)}.`);
    if (level === 3) {
      lines.push(`${names.pop()} ${pick(D.noise)}.`);
      if (Math.random() < .5) lines.push(pick(D.noiseFree));
    }
    let casehtml;
    if (level === 1) {
      casehtml = `<b>${esc(company)}</b><br><b>Ist-Bestand:</b> ${ist}<br><b>Abgänge:</b> ${ab}<br><b>Zugänge:</b> ${zu}<br><b>Soll-Bestand:</b> ${soll}`;
    } else {
      const sollTxt = level === 2
        ? `Insgesamt werden künftig <b>${soll} Beschäftigte</b> gebraucht.`
        : delta > 0 ? `Weil das Geschäft wächst, werden <b>${delta} zusätzliche Stellen</b> geschaffen.`
        : delta < 0 ? `Wegen sinkender Umsätze fallen <b>${-delta} Stellen</b> weg.`
        : `Die Zahl der Stellen bleibt gleich.`;
      casehtml = `<b>${esc(company)}</b> hat zurzeit <b>${ist} Beschäftigte</b>. ${shuffle(lines).map(esc).join(" ")} ${sollTxt}`;
    }
    const b = bedarf(ist, ab, zu, soll, { split: level === 3 });
    const calcStep = {
      type: "calc", title: company, case: casehtml, rows: b.rows,
      hints: (level > 1 ? ["Markiere im Kopf: Wer <b>geht</b> (Abgang)? Wer <b>kommt fest dazu</b> (Zugang)? Jede Person zählt 1." + (level === 3 ? " Krankheit, Urlaub oder Beschwerden ändern nichts!" : "")] : [])
        .concat(level === 3 ? [`Soll-Bestand = Ist + neue Stellen − wegfallende Stellen = <b>${ist} ${delta < 0 ? "−" : "+"} ${Math.abs(delta)}</b>`] : [])
        .concat(b.hints.slice(1)),
      result: `${company}: Personalbedarf ${sig(nb)}.`
    };
    const wrongNum = shuffle([...new Set([-nb, soll, zw].filter((x) => x !== nb))]).slice(0, 2);
    const absWrong = shuffle([...new Set([zw, soll, Math.abs(nb) + 1].filter((x) => x !== Math.abs(nb)))]).slice(0, 2);
    const sentStep = {
      type: "sentence", title: "Antwortsatz",
      case: `Bau den Antwortsatz für <b>${esc(company)}</b>.`,
      text: `Der Personalbedarf beträgt {*${sig(nb)}|${wrongNum.map(sig).join("|")}}. Das Ergebnis ist {*${nb > 0 ? "positiv" : "negativ"}|${nb > 0 ? "negativ" : "positiv"}}. ${company} muss {*${Math.abs(nb)}|${absWrong.join("|")}} ${Math.abs(nb) === 1 ? "Person" : "Personen"} {*${nb > 0 ? "einstellen" : "abbauen"}|${nb > 0 ? "abbauen" : "einstellen"}}.`,
      hints: ["Das Ergebnis steht in der letzten Zeile deines Rechenschemas.", "Positiv → es fehlen Leute → einstellen. Negativ → zu viele → abbauen."]
    };
    return { company, calcStep, sentStep };
  }
  const DRILLS = { bedarf: makeBedarfRound };
  const LEVELS = [
    { n: 1, name: "Zahlen", text: "Ist, Abgänge, Zugänge und Soll stehen direkt da. Ideal zum Einstieg." },
    { n: 2, name: "Fall", text: "Eine kurze Geschichte mit Namen. Du liest Abgänge und Zugänge selbst heraus." },
    { n: 3, name: "Profi", text: "Mit Ablenkern, Ersatz- und Neubedarf. Das Ergebnis kann auch negativ sein." }
  ];

  function viewDrillIntro(s, t) {
    const ds = drillStats(t);
    const back = SINGLE ? "#/" : `#/f/${s.id}`;
    const v = h(`<main class="view no-tabbar">
      <div class="topstrip"><a class="icon-btn" href="${back}" aria-label="Zurück">${ICON.back}</a><span class="tag-box"><span class="sq"></span>${esc(t.kicker || "Training")}</span>${qrButton(s, t)}</div>
      <h1 class="display" style="margin-top:26px;font-size:clamp(44px,13vw,72px)">${esc(t.title)}</h1>
      <p class="lead" style="margin-top:14px">${esc(t.description || "")}</p>
      <div class="stat-row" style="margin-top:22px">
        <div class="stat"><div class="v">${ds.rounds}</div><div class="k">gelöst</div></div>
        <div class="stat"><div class="v">${ds.perfect}</div><div class="k">perfekt</div></div>
        <div class="stat"><div class="v">${ds.best}</div><div class="k">beste Serie</div></div>
      </div>
      <p class="section-head">Stufe wählen</p>
      <div class="topics" id="levels"></div>
    </main>`);
    const box = v.querySelector("#levels");
    LEVELS.forEach((L) => {
      const a = h(`<a class="win topic-win ${ds.level === L.n ? "done" : ""}" href="#/f/${s.id}/${t.id}/0">
        <div class="bar"><span class="d"></span>Stufe ${L.n}<span class="r">${ds.level === L.n ? "zuletzt gewählt" : ""}</span></div>
        <div class="body"><span class="title">${L.name}</span><span class="meta">${L.text}</span></div></a>`);
      a.addEventListener("click", () => { const d = drillStats(t); d.level = L.n; store.set(drillKey(t), d); });
      box.append(a);
    });
    return v;
  }

  function viewDrill(s, t) {
    const gen = DRILLS[t.drill];
    let level = drillStats(t).level;
    let round, phase, scores;
    const v = h(`<main class="player">
      <div class="player-top">
        <a class="icon-btn" href="#/f/${s.id}/${t.id}" aria-label="Training beenden">${ICON.close}</a>
        <div class="progress"><i></i><i></i><i></i></div>
        <button class="icon-btn reset-btn" id="resetBtn" aria-label="Runde neu starten" title="Runde neu starten">${ICON.reset}</button>
        <button class="icon-btn help-btn" id="helpBtn" aria-label="Ich brauche Hilfe">${ICON.help}</button>
      </div>
      <header class="player-head"><p class="eyebrow" id="eb"></p><h1 class="h1" id="ttl"></h1></header>
      <section class="player-body"></section>
      <div class="dock"><div class="dock-inner"><button class="btn block" id="act"></button></div></div>
    </main>`);
    const body = v.querySelector(".player-body");
    const btn = v.querySelector("#act");
    const bars = v.querySelectorAll(".progress i");
    const ctx = {
      body, root: v, dock: v.querySelector(".dock-inner"),
      setProgress(f) { bars[phase].style.setProperty("--f", Math.max(0, Math.min(1, f))); },
      action(label, fn, { enabled = true, variant = "" } = {}) { btn.innerHTML = label; btn.disabled = !enabled; btn.className = "btn block " + variant; btn.onclick = fn; },
      finish(score) { scores.push(score); buzz(15); show(phase + 1); },
      key: "drill", hintsFor: null, hintKey: () => "0", revealed: {}, exam: false
    };
    const current = () => (phase === 0 ? round.calcStep : round.sentStep);
    ctx.openHelp = (tab) => openHelp(s, t, current(), ctx, tab);
    v.querySelector("#helpBtn").onclick = () => ctx.openHelp();
    v.querySelector("#resetBtn").onclick = () => {
      scores = [];
      bars.forEach((b) => b.style.setProperty("--f", 0));
      buzz(10);
      show(0);
      toast("› Runde neu gestartet");
    };

    function reset() {
      if (cleanup) { cleanup(); cleanup = null; }
      body.replaceChildren();
      [...ctx.dock.children].forEach((c) => { if (c !== btn) c.remove(); });
      v.classList.remove("has-pad");
      ctx.revealed = {};
      window.scrollTo(0, 0);
    }
    function newRound() {
      round = gen(level);
      scores = [];
      bars.forEach((b) => b.style.setProperty("--f", 0));
      show(0);
    }
    function show(ph) {
      phase = ph;
      reset();
      const ds = drillStats(t);
      bars.forEach((b, k) => { if (k < ph) b.style.setProperty("--f", 1); });
      v.querySelector("#eb").textContent = `Stufe ${level} · ${LEVELS[level - 1].name} · Aufgabe ${ds.rounds + 1}`;
      v.querySelector("#helpBtn").hidden = ph === 2;
      v.querySelector("#resetBtn").hidden = ph === 2;
      ctx.dock.classList.remove("col");
      if (ph === 0) { v.querySelector("#ttl").textContent = "Personalbedarf berechnen"; PLAYERS.calc(round.calcStep, ctx); }
      else if (ph === 1) { v.querySelector("#ttl").textContent = "Antwortsatz bauen"; PLAYERS.sentence(round.sentStep, ctx); }
      else result();
    }
    function result() {
      const c = scores.reduce((a, x) => a + x.c, 0), n = scores.reduce((a, x) => a + x.t, 0);
      const perfect = c === n;
      const ds = drillStats(t);
      ds.rounds++; if (perfect) { ds.perfect++; ds.streak++; } else ds.streak = 0;
      ds.best = Math.max(ds.best, ds.streak); ds.level = level;
      store.set(drillKey(t), ds);
      bars[2].style.setProperty("--f", 1);
      v.querySelector("#ttl").textContent = perfect ? "Perfekt!" : "Geschafft.";
      const suggestUp = perfect && ds.streak > 0 && ds.streak % 3 === 0 && level < 3;
      body.append(h(`<div>
        <p class="finish-num" style="margin-top:8px">${c}<small>/${n}</small></p>
        <div class="stat-row" style="margin-top:22px">
          <div class="stat"><div class="v">${ds.rounds}</div><div class="k">gelöst</div></div>
          <div class="stat"><div class="v">${ds.streak}</div><div class="k">Serie</div></div>
          <div class="stat"><div class="v">${ds.best}</div><div class="k">Rekord</div></div>
        </div>
        ${suggestUp ? `<div class="term"><span class="ln p">$ level-check …</span><span class="ln">› <span class="ok">3 perfekte Runden in Folge.</span> Bereit für Stufe ${level + 1} (${LEVELS[level].name})?</span></div>` : ""}
        ${!perfect ? `<div class="term"><span class="ln p">$ tipp</span><span class="ln">› Schau dir die grünen Korrekturen nochmal an – oder öffne den Merkkasten über den ?-Knopf.</span></div>` : ""}
      </div>`));
      if (perfect) { buzz([20, 60, 20]); if (ds.streak % 3 === 0) confetti(); }
      if (suggestUp) {
        const up = h(`<button class="btn pink block">Stufe ${level + 1} starten ${ICON.arrow}</button>`);
        up.onclick = () => { level++; const d = drillStats(t); d.level = level; store.set(drillKey(t), d); newRound(); };
        ctx.dock.prepend(up);
        ctx.dock.classList.add("col");
        ctx.action("Gleiche Stufe weiter", () => { ctx.dock.classList.remove("col"); newRound(); }, { variant: "ghost" });
      } else {
        ctx.dock.classList.remove("col");
        ctx.action(`Neue Aufgabe ${ICON.arrow}`, newRound);
      }
    }
    newRound();
    return v;
  }

  /* ── QR-Codes ─────────────────────────────────────────────── */
  function appUrl(hash) {
    const base = /^https?:$/.test(location.protocol) ? location.origin + location.pathname : DATA.publicUrl;
    return base + hash;
  }
  function matUrl(href) {
    try { return new URL(encodeURI(href), DATA.materialBase).href; } catch { return "#"; }
  }
  function qrSvg(text) {
    if (typeof qrcode !== "function") return `<p class="hint">QR-Code nicht verfügbar.</p>`;
    const q = qrcode(0, "M");
    q.addData(text);
    q.make();
    return q.createSvgTag({ cellSize: 8, margin: 2, scalable: true, alt: "QR-Code" });
  }
  function qrButton(s, t) {
    return `<button class="icon-btn" data-qr="${esc(s.id)}/${esc(t.id)}" aria-label="QR-Code für diese Übung">${ICON.qr}</button>`;
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-qr]");
    if (!b) return;
    const [sid, tid] = b.dataset.qr.split("/");
    const s = findSubject(sid), t = findTopic(s, tid);
    if (t) openQR(t.title, appUrl(`#/f/${s.id}/${t.id}`), `${s.course || s.name} · ${t.kicker || ""}`);
  });

  function openQR(title, url, sub) {
    if (document.querySelector(".sheet-back")) return;
    const offline = !/^https?:$/.test(location.protocol);
    const back = h(`<div class="sheet-back">
      <div class="sheet win" role="dialog" aria-modal="true" aria-label="QR-Code">
        <div class="bar"><span class="d"></span>QR-Code<button class="r sheet-x" aria-label="Schließen">✕ schließen</button></div>
        <div class="sheet-body qr-sheet">
          <div class="qr-box">${qrSvg(url)}</div>
          <p class="eyebrow" style="margin-top:14px">${esc(sub || "")}</p>
          <p class="h2" style="margin-top:6px">${esc(title)}</p>
          <p class="qr-url">${esc(url)}</p>
          ${offline ? `<p class="hint">Der Code führt zur Online-Version der App.</p>` : ""}
          <div class="qr-actions">
            <button class="btn pink" id="beamer">Beamer-Ansicht</button>
            <button class="btn ghost" id="copy">Link kopieren</button>
          </div>
        </div>
      </div>
    </div>`);
    const close = () => { document.removeEventListener("keydown", onEsc); back.remove(); };
    const onEsc = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onEsc);
    back.addEventListener("click", (e) => { if (e.target === back) close(); });
    back.querySelector(".sheet-x").onclick = close;
    back.querySelector("#copy").onclick = async () => {
      try { await navigator.clipboard.writeText(url); toast("› Link kopiert"); }
      catch { const r = document.createRange(); r.selectNodeContents(back.querySelector(".qr-url")); getSelection().removeAllRanges(); getSelection().addRange(r); toast("› Link markiert – jetzt kopieren"); }
    };
    back.querySelector("#beamer").onclick = () => {
      const full = h(`<div class="qr-full" role="dialog" aria-label="QR-Code groß">
        <div class="qr-full-in">
          <div class="qr-box">${qrSvg(url)}</div>
          <div class="qr-full-txt"><p class="eyebrow">${esc(sub || "")}</p><p class="display">${esc(title)}</p>
            <p class="qr-url">${esc(url.replace(/^https?:\/\//, ""))}</p><p class="hint">Mit der Handykamera scannen · Tippen zum Schließen</p></div>
        </div></div>`);
      full.onclick = () => full.remove();
      document.body.append(full);
      try { full.requestFullscreen && full.requestFullscreen().catch(() => {}); } catch { /* optional */ }
    };
    document.body.append(back);
    back.querySelector(".sheet-x").focus();
    const prev = cleanup;
    cleanup = () => { close(); document.querySelectorAll(".qr-full").forEach((x) => x.remove()); prev && prev(); };
  }

  /* Übersicht für Lehrkräfte: alle QR-Codes */
  function viewQR() {
    const v = h(`<main class="view">
      <div class="topstrip"><a class="icon-btn" href="#/" aria-label="Zurück">${ICON.back}</a><span class="tag-box ink"><span class="sq"></span>Für Lehrkräfte</span></div>
      <h1 class="display" style="margin-top:24px">QR-Codes.<small>Für jede Übung und jedes Material. Tippe auf den QR-Knopf, dann auf „Beamer-Ansicht“ – die Schüler scannen mit der Handykamera und landen direkt in der Übung.</small></h1>
      <div id="list"></div>
    </main>`);
    const list = v.querySelector("#list");
    const addRow = (box, title, sub, url) => {
      const row = h(`<div class="list-row mat-row"><span class="mat-open"><span>${esc(title)}</span></span>
        <button class="icon-btn small" aria-label="QR-Code für ${esc(title)}">${ICON.qr}</button></div>`);
      row.querySelector("button").onclick = () => openQR(title, url, sub);
      box.append(row);
    };
    DATA.subjects.forEach((s) => {
      list.append(h(`<p class="section-head">${esc(s.fach || "")} · ${esc(s.materials ? "Materialien" : s.course || s.name)}</p>`));
      const box = h(`<div class="list mat-list"></div>`);
      if (!s.materials) addRow(box, `Ganzer Kurs: ${s.name}`, s.course || s.name, appUrl(SINGLE ? "#/" : `#/f/${s.id}`));
      s.topics.forEach((t) => addRow(box, t.title, `${s.course || s.fach} · ${t.kicker || t.group || ""}`, t.href ? matUrl(t.href) : appUrl(`#/f/${s.id}/${t.id}`)));
      list.append(box);
    });
    return v;
  }

  /* ── Hilfe ──────────────────────────────────────────────── */
  function glossary(subject) {
    const list = [];
    const seen = new Set();
    const subs = subject ? [subject] : DATA.subjects;
    subs.forEach((s) => (s.glossary || []).concat(...s.topics.flatMap((t) => t.steps.filter((x) => x.type === "cards").map((x) => x.cards)))
      .forEach((c) => { const k = c.front.toLowerCase(); if (!seen.has(k)) { seen.add(k); list.push(c); } }));
    return list.sort((a, b) => a.front.localeCompare(b.front, "de"));
  }

  function glossaryBox(subject) {
    const items = glossary(subject);
    const box = h(`<div>
      <label class="field" for="gsearch"><span>Begriff suchen</span>
        <input class="input" id="gsearch" type="search" placeholder="z. B. Zugang" autocomplete="off"></label>
      <dl class="terms glossary" style="margin-top:12px"></dl>
      <p class="hint" id="gempty" hidden>Kein Begriff gefunden.</p>
    </div>`);
    const dl = box.querySelector("dl");
    const draw = (q) => {
      q = (q || "").trim().toLowerCase();
      const hits = items.filter((c) => !q || c.front.toLowerCase().includes(q) || c.back.toLowerCase().includes(q));
      dl.innerHTML = hits.map((c) => `<dt>${esc(c.front)}</dt><dd>${esc(c.back)}</dd>`).join("");
      box.querySelector("#gempty").hidden = hits.length > 0;
      dl.hidden = !hits.length;
    };
    box.querySelector("input").addEventListener("input", (e) => draw(e.target.value));
    draw("");
    return box;
  }

  function hintsOf(step, ctx) {
    const list = [].concat(ctx && ctx.hintsFor ? ctx.hintsFor() : [], step.hint || [], step.hints || []);
    return [...new Set(list)];
  }

  function openHelp(s, t, step, ctx, tab = "tipps") {
    if (document.querySelector(".sheet-back")) return;
    const back = h(`<div class="sheet-back">
      <div class="sheet win" role="dialog" aria-modal="true" aria-labelledby="sheetTitle">
        <div class="bar"><span class="d"></span><span id="sheetTitle">Hilfe · ${esc(step.title)}</span>
          <button class="r sheet-x" aria-label="Hilfe schließen">✕ schließen</button></div>
        <div class="tabs" role="tablist">
          <button role="tab" data-tab="tipps">Tipps</button>
          <button role="tab" data-tab="merk">Merkkasten</button>
          <button role="tab" data-tab="begriffe">Begriffe</button>
        </div>
        <div class="sheet-body"></div>
      </div>
    </div>`);
    const bodyEl = back.querySelector(".sheet-body");
    const prevFocus = document.activeElement;

    const renderTipps = () => {
      const hints = hintsOf(step, ctx);
      const key = ctx.hintKey();
      const shown = ctx.revealed[key] || 0;
      const wrap = h(`<div>
        <p class="howto"><b>So geht's:</b> ${esc(HOWTO[step.type] || "")}</p>
        <div class="tip-list"></div>
      </div>`);
      const listEl = wrap.querySelector(".tip-list");
      if (!hints.length) {
        listEl.append(h(`<p class="hint">Für diese Aufgabe gibt es keine extra Tipps. Schau in den <b>Merkkasten</b> oder in die <b>Begriffe</b>.</p>`));
      } else {
        hints.slice(0, shown).forEach((x, n) => listEl.append(h(`<div class="tip"><span class="tip-n">Tipp ${n + 1}</span><span>${x}</span></div>`)));
        if (shown < hints.length) {
          const last = shown === hints.length - 1 && hints.length > 1;
          const solution = /^Lösungsweg/.test(hints[shown]);
          const b = h(`<button class="btn ${shown ? "ghost" : "pink"} block" style="margin-top:12px">${solution ? "Lösungsweg zeigen" : last ? "Letzten Tipp zeigen" : shown ? "Noch ein Tipp" : "Ersten Tipp zeigen"} <span style="font:500 12px/1 var(--mono);opacity:.7">${shown + 1}/${hints.length}</span></button>`);
          b.onclick = () => { ctx.revealed[key] = shown + 1; buzz(6); renderTipps(); };
          listEl.append(b);
        } else {
          listEl.append(h(`<p class="hint">Das waren alle Tipps. Versuch es jetzt nochmal selbst!</p>`));
        }
      }
      bodyEl.replaceChildren(wrap);
    };
    const renderMerk = () => {
      bodyEl.replaceChildren(t.help
        ? h(`<div class="merk">${t.help}</div>`)
        : h(`<p class="hint">Für dieses Thema gibt es noch keinen Merkkasten. Blättere zurück zur Präsentation.</p>`));
    };
    const renderBegriffe = () => bodyEl.replaceChildren(glossaryBox(s));

    const select = (name) => {
      back.querySelectorAll(".tabs button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === name)));
      ({ tipps: renderTipps, merk: renderMerk, begriffe: renderBegriffe })[name]();
      bodyEl.scrollTop = 0;
    };
    back.querySelectorAll(".tabs button").forEach((b) => b.onclick = () => select(b.dataset.tab));

    const close = () => {
      if (cleanup === myCleanup) cleanup = prevCleanup;
      document.removeEventListener("keydown", onEsc);
      back.classList.add("closing");
      setTimeout(() => back.remove(), reduced() ? 0 : 180);
      if (prevFocus && prevFocus.focus) prevFocus.focus();
    };
    const onEsc = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onEsc);
    back.addEventListener("click", (e) => { if (e.target === back) close(); });
    back.querySelector(".sheet-x").onclick = close;
    const prevCleanup = cleanup;
    const myCleanup = () => { back.remove(); document.removeEventListener("keydown", onEsc); prevCleanup && prevCleanup(); };
    cleanup = myCleanup;

    document.body.append(back);
    select(tab);
    back.querySelector(".sheet-x").focus();
  }

  function viewHelp() {
    const subjects = SINGLE ? [SINGLE] : DATA.subjects;
    const v = h(`<main class="view">
      <div class="topstrip"><span class="tag-box"><span class="sq"></span>Hilfe</span></div>
      <h1 class="display" style="margin-top:26px">Hilfe.<small>Merkkästen, Fachbegriffe und wie die App funktioniert. In jeder Aufgabe erreichst du die Hilfe auch über den ?-Knopf oben rechts.</small></h1>
      <p class="section-head">Merkkästen</p>
      <div id="merk" class="topics"></div>
      <p class="section-head">Begriffe</p>
      <div id="gloss"></div>
      <p class="section-head">So funktioniert die App</p>
      <div class="win"><div class="bar"><span class="d"></span>Aufgabentypen<span class="r">${Object.keys(HOWTO).length}</span></div>
        <dl class="terms" style="border:0">${Object.keys(HOWTO).map((k) => `<dt>${STEP_LABEL[k]}</dt><dd>${esc(HOWTO[k])}</dd>`).join("")}</dl></div>
    </main>`);
    const merk = v.querySelector("#merk");
    subjects.forEach((s) => s.topics.filter((t) => t.help).forEach((t) => {
      merk.append(h(`<details class="win merk-win">
        <summary class="bar"><span class="d"></span>${esc(t.title)}<span class="r">${esc(t.kicker || "")} ▾</span></summary>
        <div class="body merk">${t.help}</div>
      </details>`));
    }));
    v.querySelector("#gloss").append(glossaryBox(SINGLE));
    return v;
  }

  /* ── Abschluss ──────────────────────────────────────────── */
  function viewFinish(sid, tid) {
    const s = findSubject(sid), t = findTopic(s, tid);
    if (!t) { location.hash = "#/"; return h("<div></div>"); }
    if (!progress.count(s, t)) { location.hash = `#/f/${s.id}/${t.id}`; return h("<div></div>"); }
    if (t.exam) return viewExamResult(s, t);
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

  function viewExamResult(s, t) {
    const p = progress.of(s.id, t.id);
    const total = examPoints(t);
    const got = t.steps.reduce((a, st, k) => a + stepPoints(st, p.done[k]), 0);
    const pct = total ? got / total * 100 : 0;
    const [, note, word] = grade(pct, t);
    const used = p.examStart ? ((p.examEnd || Date.now()) - p.examStart) / 1000 : 0;
    const over = used > t.exam.minutes * 60;
    const review = [];
    t.steps.forEach((st, k) => {
      if (st.review && stepPoints(st, p.done[k]) < (st.points || 0) * .75) {
        const rt = findTopic(s, st.review);
        if (rt && !review.includes(rt)) review.push(rt);
      }
    });
    const v = h(`<main class="view no-tabbar finish">
      <section class="hero">
        <canvas aria-hidden="true"></canvas>
        <div class="topstrip"><span class="tag-box ink"><span class="sq"></span>${esc(t.title)} · Ergebnis</span></div>
        <p class="finish-num">${fmtP(got)}<small>/${total} P</small></p>
        <p class="h2" style="margin-top:16px">Note ${note} · ${word}</p>
        <p class="eyebrow" style="margin-top:10px">${Math.round(pct)} % · Zeit ${clock(used).replace("+", "")} min${over ? ` · <span style="color:var(--bad)">${clock(t.exam.minutes * 60 - used)} über der Zeit</span>` : ""}</p>
      </section>
      <p class="section-head">Punkte je Aufgabe</p>
      <div class="win"><div class="bar"><span class="d"></span>Auswertung<span class="r">${fmtP(got)}/${total}</span></div>
        <div id="tasks"></div></div>
      ${review.length ? `<p class="section-head">Das solltest du wiederholen</p><div class="topics" id="review"></div>` : ""}
      <p class="hint" style="margin-top:18px">Notenschlüssel: ${(t.exam.grading || GRADING).map(([m, n]) => `${n} ab ${m} %`).join(" · ")}</p>
      <div class="dock"><div class="dock-inner col">
        <a class="btn block" href="${SINGLE ? "#/" : `#/f/${s.id}`}">Zur Übersicht</a>
      </div></div>
    </main>`);
    const tasks = v.querySelector("#tasks");
    t.steps.forEach((st, k) => {
      const d = p.done[k];
      const pts = stepPoints(st, d);
      const full = pts >= (st.points || 0);
      tasks.append(h(`<details class="task-row">
        <summary><span class="tn">${String(k + 1).padStart(2, "0")}</span><span class="tt">${esc(st.title)}</span>
          <span class="tp ${full ? "ok" : pts ? "part" : "no"}">${fmtP(pts)}/${fmtP(st.points || 0)}</span></summary>
        <div class="sol">${mistakesHTML(st, d)}<p class="sol-h">Erwartungshorizont</p>${solutionHTML(st)}</div>
      </details>`));
    });
    const rv = v.querySelector("#review");
    if (rv) review.forEach((rt) => rv.append(topicWin(s, rt)));
    dither(v.querySelector("canvas"), 2);
    if (pct >= 67) confetti();
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
        <a class="list-row" href="#/qr"><span>Für Lehrkräfte: QR-Codes</span><span class="v">→</span></a>
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
    if (ct && SINGLE) cardsTab.href = `#/f/${ct.s.id}/${ct.t.id}/0`;
    else cardsTab.hidden = true;
  }
  render();

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
