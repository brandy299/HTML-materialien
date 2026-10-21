/* PowerPoint-Simulation (Schritt-Typ "ppt") – Folien aufbauen wie in PowerPoint, handytauglich, automatisch geprüft.
   Wird von app.js geladen: window.LernraumSim.ppt(step, ctx, env) → Aufräum-Funktion.
   Datenformat und Prüf-Operationen: app/README.md → „PowerPoint-Simulation“. */
(function () {
  "use strict";
  window.LernraumSim = window.LernraumSim || {};

  const LAYOUTS = [["titel", "Titelfolie"], ["inhalt", "Titel und Inhalt"], ["nur-titel", "Nur Titel"], ["leer", "Leer"]];
  const LAYOUT_NAME = Object.fromEntries(LAYOUTS);
  const THEMES = {
    office: { name: "Office", bg: "#ffffff", fg: "#262626", accent: "#c43e1c" },
    dunkel: { name: "Dunkelblau", bg: "#1f2a44", fg: "#ffffff", accent: "#ffb347" },
    gruen: { name: "Grün", bg: "#eaf5ee", fg: "#17331f", accent: "#107c41" },
    sonne: { name: "Sonne", bg: "#fff3d1", fg: "#3b2a00", accent: "#d97706" }
  };
  const TITLE_COLORS = { theme: ["Standard", null], blau: ["Blau", "#1f4e9c"], rot: ["Rot", "#c0392b"], gruen: ["Grün", "#107c41"], schwarz: ["Schwarz", "#000000"] };
  const FONTS = ["Calibri", "Arial", "Verdana", "Georgia"];
  const FONT_STACK = {
    Calibri: "'Calibri','Carlito','Segoe UI',sans-serif",
    Arial: "Arial,'Helvetica Neue',Helvetica,sans-serif",
    Verdana: "Verdana,Geneva,sans-serif",
    Georgia: "Georgia,'Times New Roman',serif"
  };
  const SIZES = [18, 20, 24, 28, 32, 36, 40, 44, 54, 60];
  const SIZE_STEPS = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 54, 60, 66, 72, 80];
  const TRANS = { keine: "Keine", blende: "Überblenden", schieben: "Schieben", wischen: "Wischen", zoom: "Zoom" };
  const ANIMS = { keine: "Keine", erscheinen: "Erscheinen", einfliegen: "Einfliegen", verblassen: "Verblassen", zoom: "Zoom" };
  const EL_NAME = { title: "Titel", body: "Text", pic: "Bild" };
  const PICS = {
    fahrrad: ["Fahrrad", '<circle cx="18" cy="42" r="12"/><circle cx="46" cy="42" r="12"/><path d="M18 42l8-18h14l6 18M26 24l10 18M22 24h8M38 24l-2-6h6"/>'],
    diagramm: ["Diagramm", '<path d="M8 54h48M14 54V34M26 54V22M38 54V30M50 54V14"/>'],
    euro: ["Euro", '<circle cx="32" cy="32" r="22"/><path d="M42 24a12 12 0 1 0 0 16M20 29h16M20 35h16"/>'],
    person: ["Person", '<circle cx="32" cy="20" r="9"/><path d="M12 54c2-14 10-20 20-20s18 6 20 20"/>']
  };
  /* Maße der Platzhalter in Prozent der Folie */
  const BOX = {
    titel: { title: [10, 26, 80, 24], body: [15, 53, 70, 18] },
    inhalt: { title: [6, 6, 88, 16], body: [6, 26, 88, 66] },
    "nur-titel": { title: [6, 6, 88, 16] },
    leer: {}
  };
  const PIC_BOX = { titel: [38, 70, 24, 26], inhalt: [58, 26, 36, 62], "nur-titel": [30, 26, 40, 62], leer: [30, 14, 40, 72] };

  window.LernraumSim.ppt = function (step, ctx, env) {
    const { h, esc, toast, buzz, reduced } = env;
    const crit = step.criteria;
    const guided = step.mode !== "free";

    /* ── Zustand ───────────────────────────────────── */
    const mkSlide = (s) => ({
      layout: s.layout || "inhalt",
      title: s.title || "",
      body: Array.isArray(s.body) ? s.body.slice() : s.body ? String(s.body).split("\n") : [],
      bullets: s.bullets !== undefined ? !!s.bullets : (s.layout || "inhalt") !== "titel",
      pic: s.pic || null,
      fmt: { title: { ...(s.fmt && s.fmt.title) }, body: { ...(s.fmt && s.fmt.body) } },
      anim: { ...(s.anim || {}) },
      trans: s.trans || null
    });
    const deck = {
      theme: (step.deck && step.deck.theme) || "office",
      master: { titleColor: null, titleSize: null, titleBold: null, font: "Calibri", ...((step.deck && step.deck.master) || {}) },
      slides: ((step.deck && step.deck.slides) || [{ layout: "titel" }]).map(mkSlide)
    };
    let ci = 0, selEl = null, tab = "start", pop = null, master = false, mTitle = "";
    let cur = 0, taskOpen = false, checkOpen = window.innerWidth >= 600, give = null, popText = "";
    let player = null;
    const timers = new Set();
    const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); return t; };

    /* ── Hilfen ────────────────────────────────────── */
    const theme = () => THEMES[deck.theme] || THEMES.office;
    const norm = (s) => String(s).toLowerCase().replace(/[.!\s]+$/g, "").replace(/\s+/g, " ").trim();
    const slideAt = (i) => deck.slides[i];
    const cs = () => deck.slides[ci];
    const hasEl = (sl, el) => (el === "pic" ? !!sl.pic : !!(BOX[sl.layout] || {})[el]);
    const nextSize = (v, d) => {
      const i = SIZE_STEPS.findIndex((x) => x >= v);
      const k = Math.max(0, Math.min(SIZE_STEPS.length - 1, (i === -1 ? SIZE_STEPS.length - 1 : i) + d));
      return SIZE_STEPS[k];
    };
    /* wirksame Formatierung = Standard → Folienmaster → eigene Änderung auf der Folie */
    function eff(sl, el) {
      const m = deck.master, th = theme(), own = sl.fmt[el] || {};
      const base = el === "title"
        ? { size: sl.layout === "titel" ? 54 : 44, bold: false, italic: false, align: sl.layout === "titel" ? "center" : "left", color: th.accent }
        : { size: 28, bold: false, italic: false, align: sl.layout === "titel" ? "center" : "left", color: th.fg };
      if (el === "title") {
        if (m.titleSize) base.size = m.titleSize;
        if (m.titleBold !== null) base.bold = !!m.titleBold;
        if (m.titleColor) base.color = m.titleColor;
      }
      const out = { ...base, font: m.font || "Calibri" };
      ["size", "bold", "italic", "align"].forEach((k) => { if (own[k] !== undefined) out[k] = own[k]; });
      return out;
    }

    /* ── Prüfung ───────────────────────────────────── */
    function evalCheck(ck) {
      const sl = typeof ck.slide === "number" ? slideAt(ck.slide) : null;
      switch (ck.op) {
        case "count": return deck.slides.length === ck.value;
        case "layout": return !!sl && sl.layout === ck.value;
        case "text": {
          if (!sl) return false;
          if (ck.el === "title") return norm(sl.title) === norm(ck.value);
          const want = (Array.isArray(ck.value) ? ck.value : [ck.value]).map(norm).join("|");
          return sl.body.map(norm).filter(Boolean).join("|") === want;
        }
        case "lines": return !!sl && sl.body.filter((t) => t.trim()).length >= ck.min;
        case "fmt": return !!sl && hasEl(sl, ck.el) && eff(sl, ck.el)[ck.prop] === ck.value;
        case "bullets": return !!sl && !!(BOX[sl.layout] || {}).body && sl.bullets === (ck.value !== false);
        case "pic": return !!sl && (ck.value === false ? !sl.pic : ck.value === true || ck.value === undefined ? !!sl.pic : sl.pic === ck.value);
        case "anim": return !!sl && hasEl(sl, ck.el) && (sl.anim[ck.el] || "keine") === ck.value;
        case "trans":
          if (ck.slide === "all") return deck.slides.every((s) => (s.trans || "keine") === ck.value);
          return !!sl && (sl.trans || "keine") === ck.value;
        case "theme": return deck.theme === ck.value;
        case "master": return (deck.master[ck.prop] === undefined ? null : deck.master[ck.prop]) === ck.value;
        case "view": return master === (ck.value === "master");
        case "pos": return deck.slides.findIndex((s) => norm(s.title) === norm(ck.title)) === ck.value - 1;
        default: return false;
      }
    }
    const critOK = (c) => c.checks.every(evalCheck);
    const passedCount = () => crit.filter(critOK).length;

    /* ── Folien zeichnen ───────────────────────────── */
    const pct = (b) => `left:${b[0]}%;top:${b[1]}%;width:${b[2]}%;height:${b[3]}%`;
    function elHTML(sl, el, o) {
      const layout = sl.layout;
      let box;
      if (el === "pic") {
        if (!sl.pic || !PICS[sl.pic]) return "";
        box = PIC_BOX[layout];
      } else {
        box = (BOX[layout] || {})[el];
        if (!box) return "";
        if (el === "body" && sl.pic && layout !== "titel") box = [box[0], box[1], 50, box[3]];
      }
      const anim = sl.anim[el];
      const animCls = o.play && anim && anim !== "keine" ? ` ppt-play ppt-a-${anim}` : "";
      const sel = o.edit && !master && selEl === el && ci === o.index ? " sel" : "";
      const badge = o.edit && anim && anim !== "keine" ? `<i class="ppt-badge">★</i>` : "";
      const common = `class="ppt-el ppt-${el}${sel}${animCls}" data-el="${el}" style="${pct(box)}${animCls ? `;animation-delay:${o.delay || 0}s` : ""}`;
      if (el === "pic") return `<div ${common}">${badge}<svg viewBox="0 0 64 64" fill="none" stroke="${theme().accent}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-label="${esc(PICS[sl.pic][0])}">${PICS[sl.pic][1]}</svg></div>`;
      const f = eff(sl, el);
      const css = `;font-family:${FONT_STACK[f.font]};font-size:${(f.size / 9.6).toFixed(3)}cqw;font-weight:${f.bold ? 700 : 400};font-style:${f.italic ? "italic" : "normal"};text-align:${f.align};color:${f.color}`;
      if (el === "title") {
        const empty = !sl.title.trim();
        if (empty && !o.edit) return "";
        return `<div ${common}${css}">${badge}${empty ? `<span class="ppt-ph">Titel hinzufügen</span>` : `<span>${esc(sl.title)}</span>`}</div>`;
      }
      const lines = sl.body.filter((t) => t.trim());
      if (!lines.length && !o.edit) return "";
      const inner = lines.length
        ? lines.map((t) => `<div class="ppt-li${sl.bullets ? " b" : ""}">${esc(t)}</div>`).join("")
        : `<span class="ppt-ph">Text hinzufügen</span>`;
      return `<div ${common}${css}">${badge}${inner}</div>`;
    }
    function slideHTML(sl, o) {
      const th = theme();
      return `<div class="ppt-slide${o.cls ? " " + o.cls : ""}" style="background:${th.bg};color:${th.fg}">${["title", "body", "pic"].map((el, n) => elHTML(sl, el, { ...o, delay: n * 0.5 })).join("")}</div>`;
    }

    const node = h(`<div class="sim ppt">
      <div class="sim-ribbon">
        <div class="sim-tabs" role="tablist" id="ppTabs"></div>
        <div class="sim-groups" id="ppGroups"></div>
        <div class="sim-pop" id="ppPop" hidden></div>
      </div>
      <div id="ppTask"></div>
      <div id="ppOut"></div>
      <div class="ppt-main">
        <div class="ppt-thumbs" id="ppThumbs" role="listbox" aria-label="Folien"></div>
        <div class="ppt-stage" id="ppStage"></div>
      </div>
    </div>`);
    const out = node.querySelector("#ppOut");
    const groups = node.querySelector("#ppGroups");
    const stage = node.querySelector("#ppStage");
    const thumbs = node.querySelector("#ppThumbs");
    const popEl = node.querySelector("#ppPop");

    out.setAttribute("aria-live", "polite");
    let msgTimer = null;
    out.onclick = () => { clearTimeout(msgTimer); out.innerHTML = ""; };
    function simMsg(kind, html) {
      out.innerHTML = `<div class="sim-msg ${kind}"><span class="ico">${kind === "ok" ? "✓" : kind === "no" ? "✗" : "i"}</span><span>${html}</span></div>`;
      clearTimeout(msgTimer);
      if (kind !== "no") msgTimer = setTimeout(() => { out.innerHTML = ""; }, kind === "ok" ? 3500 : 7000);
    }

    /* ── Folien-Leiste und Bühne ───────────────────── */
    function paintThumbs() {
      const hintPos = hintSlide();
      thumbs.innerHTML = deck.slides.map((sl, i) => {
        const mark = (sl.trans && sl.trans !== "keine" ? `<i class="ppt-mark" title="Übergang">✦</i>` : "") + (Object.values(sl.anim).some((a) => a && a !== "keine") ? `<i class="ppt-mark a" title="Animation">★</i>` : "");
        return `<button type="button" class="ppt-th${i === ci && !master ? " on" : ""}${hintPos === i && i !== ci ? " hint" : ""}" data-i="${i}" role="option" aria-selected="${i === ci}" aria-label="Folie ${i + 1}"><b>${i + 1}</b>${mark}${slideHTML(sl, { index: i })}</button>`;
      }).join("");
      thumbs.querySelectorAll(".ppt-th").forEach((b) => b.onclick = () => {
        if (master) return;
        ci = +b.dataset.i; selEl = null; pop = null; refresh();
      });
      const on = thumbs.querySelector(".ppt-th.on");
      if (on && on.scrollIntoView) on.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduced() ? "auto" : "smooth" });
    }
    function paintStage() {
      if (master) {
        const f = { size: deck.master.titleSize || 44, bold: deck.master.titleBold === null ? false : deck.master.titleBold, color: deck.master.titleColor || theme().accent, font: deck.master.font || "Calibri" };
        const th = theme();
        stage.innerHTML = `<div class="ppt-masterlbl">Folienmaster</div><div class="ppt-slide" style="background:${th.bg};color:${th.fg}">
          <div class="ppt-el ppt-title sel" style="${pct(BOX.inhalt.title)};font-family:${FONT_STACK[f.font]};font-size:${(f.size / 9.6).toFixed(3)}cqw;font-weight:${f.bold ? 700 : 400};color:${f.color}"><span>Mastertitelformat bearbeiten</span></div>
          <div class="ppt-el ppt-body" style="${pct(BOX.inhalt.body)};font-family:${FONT_STACK[f.font]};font-size:${(28 / 9.6).toFixed(3)}cqw;color:${th.fg}"><div class="ppt-li b">Mastertextformat bearbeiten</div><div class="ppt-li b">Zweite Ebene</div></div></div>`;
        return;
      }
      const sl = cs();
      stage.innerHTML = `${slideHTML(sl, { index: ci, edit: true })}<div class="ppt-info">Folie ${ci + 1} · ${esc(LAYOUT_NAME[sl.layout])}${selEl ? ` · <b>${EL_NAME[selEl]} markiert</b>` : " · Tippe auf ein Feld, um es zu markieren"}</div>`;
      stage.querySelectorAll(".ppt-el").forEach((el) => el.onclick = () => {
        const k = el.dataset.el;
        const again = selEl === k;
        selEl = k;
        if (again && k !== "pic") { openEdit(); return; }
        if (pop === "text") pop = null;
        refresh();
      });
      stage.querySelector(".ppt-slide").onclick = (e) => { if (e.target.classList.contains("ppt-slide")) { selEl = null; refresh(); } };
      const t = hintTarget();
      if (t && t.el) { const e = stage.querySelector(`.ppt-el[data-el="${t.el}"]`); if (e) e.classList.add("hint"); }
    }

    /* ── Ribbon ────────────────────────────────────── */
    const TABS = [["datei", "Datei"], ["start", "Start"], ["einfuegen", "Einfügen"], ["entwurf", "Entwurf"], ["uebergaenge", "Übergänge"], ["animationen", "Animationen"], ["praesentation", "Bildschirmpräsentation"], ["ansicht", "Ansicht"]];
    function paintTabs() {
      const tabs = master ? [["master", "Folienmaster"]] : TABS;
      node.querySelector("#ppTabs").innerHTML = tabs.map(([id, t]) => `<button type="button" class="sim-tab" ${id === "datei" ? "disabled" : `data-tab="${id}"`} aria-selected="${id === tab}">${t}</button>`).join("");
      node.querySelectorAll(".sim-tab[data-tab]").forEach((b) => b.onclick = () => { tab = b.dataset.tab; pop = null; refresh(); });
    }
    const btn = (act, label, o = {}) => `<button type="button" class="sim-b ppt-b${o.on ? " on" : ""}${o.dead ? " dead" : ""}${o.bold ? " bold" : ""}${o.cls ? " " + o.cls : ""}" data-act="${act}"${o.dead ? ' disabled' : ""}${o.title ? ` title="${esc(o.title)}"` : ""}>${label}</button>`;
    const grp = (lbl, inner) => `<div class="sim-group"><span class="sim-lbl">${lbl}</span><div class="sim-btns">${inner}</div></div>`;
    function paintRibbon() {
      const sl = cs(), f = selEl && selEl !== "pic" ? eff(sl, selEl) : null;
      let html = "";
      if (master) {
        html = grp("Mastertitel", btn("m-color", "Farbe ▾") + btn("m-size", `${deck.master.titleSize || 44} ▾`) + btn("m-bold", "F", { bold: true, on: !!deck.master.titleBold }) + btn("m-font", `${esc(deck.master.font)} ▾`))
          + grp("Schließen", btn("m-close", "Masteransicht schließen", { cls: "wide" }));
      } else if (tab === "start") {
        html = grp("Folien", btn("newslide", "Neue Folie ▾", { cls: "wide" }) + btn("layout", "Layout ▾", { cls: "wide" }) + btn("dup", "Duplizieren") + btn("del", "Löschen") + btn("up", "▲ Hoch") + btn("down", "▼ Runter"))
          + grp("Text", btn("edit", "Text ändern", { cls: "wide" }) + btn("bold", "F", { bold: true, on: !!(f && f.bold) }) + btn("italic", "K", { on: !!(f && f.italic), cls: "it" })
            + btn("size-", "A−") + btn("size", `${f ? f.size : "–"} ▾`) + btn("size+", "A+"))
          + grp("Absatz", btn("bullets", "• Liste", { on: sl.bullets }) + btn("align:left", "Links", { on: !!(f && f.align === "left") }) + btn("align:center", "Mitte", { on: !!(f && f.align === "center") }) + btn("align:right", "Rechts", { on: !!(f && f.align === "right") }));
      } else if (tab === "einfuegen") {
        html = grp("Bilder", btn("pic", "Bild einfügen ▾", { cls: "wide" }) + btn("picdel", "Bild entfernen", { cls: "wide" }))
          + grp("Weiteres", btn("x1", "Tabelle", { dead: true, title: "In dieser Übung nicht nötig" }) + btn("x2", "Formen", { dead: true, title: "In dieser Übung nicht nötig" }) + btn("x3", "Textfeld", { dead: true, title: "In dieser Übung nicht nötig" }));
      } else if (tab === "entwurf") {
        html = grp("Designs", Object.entries(THEMES).map(([id, t]) => `<button type="button" class="sim-b ppt-b ppt-sw${deck.theme === id ? " on" : ""}" data-act="theme:${id}" title="${t.name}"><i style="background:${t.bg};border-color:${t.accent}"><u style="background:${t.accent}"></u></i><span>${t.name}</span></button>`).join(""));
      } else if (tab === "uebergaenge") {
        html = grp("Übergang zu dieser Folie", btn("trans", `${TRANS[sl.trans || "keine"]} ▾`, { cls: "wide" }) + btn("transall", "Auf alle anwenden", { cls: "wide" }) + btn("preview", "Vorschau"));
      } else if (tab === "animationen") {
        html = grp(`Animation für ${selEl ? EL_NAME[selEl] : "markiertes Feld"}`, btn("anim", `${selEl && hasEl(sl, selEl) ? ANIMS[sl.anim[selEl] || "keine"] : "Keine"} ▾`, { cls: "wide" }) + btn("preview", "Vorschau"));
      } else if (tab === "praesentation") {
        html = grp("Präsentation starten", btn("play0", "Von Anfang an", { cls: "wide" }) + btn("play1", "Ab aktueller Folie", { cls: "wide" }));
      } else if (tab === "ansicht") {
        html = grp("Masteransichten", btn("master", "Folienmaster", { cls: "wide" })) + grp("Präsentationsansichten", btn("n1", "Normal", { dead: true }) + btn("n2", "Foliensortierung", { dead: true }));
      }
      groups.innerHTML = html;
    }

    /* ── Popups ────────────────────────────────────── */
    const chip = (attr, label, on, style = "") => `<button type="button" class="sim-chip${on ? " on" : ""}" ${attr}${style ? ` style="${style}"` : ""}>${label}</button>`;
    function paintPop() {
      if (!pop) { popEl.hidden = true; popEl.innerHTML = ""; return; }
      popEl.hidden = false;
      const sl = cs();
      let html = "";
      if (pop === "newslide") html = `<div class="sim-dtitle">Neue Folie mit Layout …</div><div class="sim-chips">${LAYOUTS.map(([id, t]) => chip(`data-new="${id}"`, t)).join("")}</div>`;
      else if (pop === "layout") html = `<div class="sim-dtitle">Layout dieser Folie</div><div class="sim-chips">${LAYOUTS.map(([id, t]) => chip(`data-lay="${id}"`, t, sl.layout === id)).join("")}</div>`;
      else if (pop === "size") html = `<div class="sim-chips">${SIZES.map((s) => chip(`data-s="${s}"`, s, selEl && selEl !== "pic" && eff(sl, selEl).size === s)).join("")}</div>`;
      else if (pop === "pic") html = `<div class="sim-dtitle">Bild einfügen</div><div class="sim-chips">${Object.entries(PICS).map(([id, [n, svg]]) => `<button type="button" class="sim-chip ppt-picchip${sl.pic === id ? " on" : ""}" data-pic="${id}"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${svg}</svg><span>${n}</span></button>`).join("")}</div>`;
      else if (pop === "trans") html = `<div class="sim-dtitle">Übergang</div><div class="sim-chips">${Object.entries(TRANS).map(([id, t]) => chip(`data-tr="${id}"`, t, (sl.trans || "keine") === id)).join("")}</div>`;
      else if (pop === "anim") html = `<div class="sim-dtitle">Animation für ${EL_NAME[selEl] || "Feld"}</div><div class="sim-chips">${Object.entries(ANIMS).map(([id, t]) => chip(`data-an="${id}"`, t, selEl && (sl.anim[selEl] || "keine") === id)).join("")}</div>`;
      else if (pop === "m-color") html = `<div class="sim-dtitle">Schriftfarbe Mastertitel</div><div class="sim-chips">${Object.entries(TITLE_COLORS).map(([id, [t, c]]) => chip(`data-mc="${id}"`, `<i class="ppt-dot" style="background:${c || theme().accent}"></i>${t}`, deck.master.titleColor === c)).join("")}</div>`;
      else if (pop === "m-size") html = `<div class="sim-dtitle">Schriftgrad Mastertitel</div><div class="sim-chips">${SIZES.map((s) => chip(`data-ms="${s}"`, s, (deck.master.titleSize || 44) === s)).join("")}</div>`;
      else if (pop === "m-font") html = `<div class="sim-dtitle">Schriftart (alle Folien)</div><div class="sim-chips">${FONTS.map((f) => chip(`data-mf="${f}"`, f, deck.master.font === f, `font-family:${FONT_STACK[f]}`)).join("")}</div>`;
      else if (pop === "text") {
        html = `<div class="sim-dlg"><div class="sim-dtitle">${selEl === "title" ? "Titel" : "Text – eine Zeile pro Punkt"}</div>
          <textarea id="ppText" class="ppt-ta" rows="${selEl === "title" ? 2 : 4}" maxlength="300" spellcheck="false" autocomplete="off">${esc(popText)}</textarea>
          <div class="sim-dbtns"><button type="button" class="sim-cancel" id="ppCancel">Abbrechen</button><button type="button" class="sim-ok" id="ppOk">OK</button></div></div>`;
      }
      popEl.innerHTML = html;
      popEl.querySelectorAll("[data-new]").forEach((b) => b.onclick = () => newSlide(b.dataset.new));
      popEl.querySelectorAll("[data-lay]").forEach((b) => b.onclick = () => setLayout(b.dataset.lay));
      popEl.querySelectorAll("[data-s]").forEach((b) => b.onclick = () => setFmt("size", +b.dataset.s));
      popEl.querySelectorAll("[data-pic]").forEach((b) => b.onclick = () => { cs().pic = b.dataset.pic; selEl = "pic"; pop = null; buzz(8); refresh(); });
      popEl.querySelectorAll("[data-tr]").forEach((b) => b.onclick = () => { cs().trans = b.dataset.tr === "keine" ? null : b.dataset.tr; pop = null; buzz(8); refresh(); if (cs().trans) previewTrans(); });
      popEl.querySelectorAll("[data-an]").forEach((b) => b.onclick = () => {
        if (!selEl || !hasEl(cs(), selEl)) { toast("› Markiere zuerst ein Feld auf der Folie."); return; }
        const sl2 = cs();
        if (b.dataset.an === "keine") delete sl2.anim[selEl]; else sl2.anim[selEl] = b.dataset.an;
        pop = null; buzz(8); refresh(); if (sl2.anim[selEl]) previewAnim();
      });
      popEl.querySelectorAll("[data-mc]").forEach((b) => b.onclick = () => { deck.master.titleColor = TITLE_COLORS[b.dataset.mc][1]; pop = null; buzz(8); refresh(); });
      popEl.querySelectorAll("[data-ms]").forEach((b) => b.onclick = () => { deck.master.titleSize = +b.dataset.ms; pop = null; buzz(8); refresh(); });
      popEl.querySelectorAll("[data-mf]").forEach((b) => b.onclick = () => { deck.master.font = b.dataset.mf; pop = null; buzz(8); refresh(); });
      const ok = popEl.querySelector("#ppOk");
      if (ok) {
        const ta = popEl.querySelector("#ppText");
        ok.onclick = () => {
          const v = ta.value;
          if (selEl === "title") cs().title = v.replace(/\n+/g, " ").trim();
          else cs().body = v.split("\n").map((x) => x.trim()).filter(Boolean);
          pop = null; buzz(8); refresh();
        };
        popEl.querySelector("#ppCancel").onclick = () => { pop = null; refresh(); };
      }
    }
    function openEdit() {
      if (!selEl || selEl === "pic") { toast("› Tippe zuerst auf den Titel oder den Text."); return; }
      if (!hasEl(cs(), selEl)) { toast("› Dieses Feld gibt es im aktuellen Layout nicht."); return; }
      popText = selEl === "title" ? cs().title : cs().body.join("\n");
      pop = "text";
      refresh();
      const ta = popEl.querySelector("#ppText");
      if (ta) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
    }

    /* ── Aktionen ──────────────────────────────────── */
    const bulletsFor = (layout) => layout !== "titel";
    function newSlide(layout) {
      deck.slides.splice(ci + 1, 0, mkSlide({ layout, title: "", body: [], bullets: bulletsFor(layout) }));
      ci++; selEl = null; pop = null; buzz(10); refresh();
    }
    function setLayout(layout) {
      const sl = cs();
      sl.layout = layout; sl.bullets = bulletsFor(layout);
      if (selEl && !hasEl(sl, selEl)) selEl = null;
      pop = null; buzz(8); refresh();
    }
    function needText() {
      if (!selEl || selEl === "pic" || !hasEl(cs(), selEl)) { toast("› Tippe zuerst auf den Titel oder Text, den du formatieren willst."); return false; }
      return true;
    }
    function setFmt(prop, value) {
      if (!needText()) { pop = null; return; }
      cs().fmt[selEl][prop] = value;
      pop = null; buzz(6); refresh();
    }
    function previewAnim() {
      if (!selEl) return;
      const el = stage.querySelector(`.ppt-el[data-el="${selEl}"]`);
      const a = cs().anim[selEl];
      if (!el || !a) return;
      el.classList.remove("ppt-play", "ppt-a-erscheinen", "ppt-a-einfliegen", "ppt-a-verblassen", "ppt-a-zoom");
      void el.offsetWidth;
      el.classList.add("ppt-play", "ppt-a-" + a);
      later(() => el.classList.remove("ppt-play", "ppt-a-" + a), 1200);
    }
    function previewTrans() {
      const s = stage.querySelector(".ppt-slide");
      const t = cs().trans;
      if (!s || !t) return;
      s.classList.remove("ppt-t-blende", "ppt-t-schieben", "ppt-t-wischen", "ppt-t-zoom");
      void s.offsetWidth;
      s.classList.add("ppt-t-" + t);
      later(() => s.classList.remove("ppt-t-" + t), 1000);
    }
    function move(d) {
      const j = ci + d;
      if (j < 0 || j >= deck.slides.length) { toast("› Weiter geht es nicht."); return; }
      [deck.slides[ci], deck.slides[j]] = [deck.slides[j], deck.slides[ci]];
      ci = j; buzz(8); refresh();
    }
    function act(a) {
      if (["newslide", "layout", "pic", "trans", "m-color", "m-size", "m-font"].includes(a)) { pop = pop === a ? null : a; refresh(); }
      else if (a === "size") { if (!needText()) return; pop = pop === "size" ? null : "size"; refresh(); }
      else if (a === "anim") { if (!selEl || !hasEl(cs(), selEl)) { toast("› Markiere zuerst ein Feld auf der Folie."); return; } pop = pop === "anim" ? null : "anim"; refresh(); }
      else if (a === "edit") openEdit();
      else if (a === "dup") { deck.slides.splice(ci + 1, 0, JSON.parse(JSON.stringify(cs()))); ci++; selEl = null; buzz(8); refresh(); }
      else if (a === "del") {
        if (deck.slides.length <= 1) { toast("› Die letzte Folie bleibt stehen."); return; }
        deck.slides.splice(ci, 1); ci = Math.min(ci, deck.slides.length - 1); selEl = null; buzz(8); refresh();
      }
      else if (a === "up") move(-1);
      else if (a === "down") move(1);
      else if (a === "bold") { if (!needText()) return; setFmt("bold", !eff(cs(), selEl).bold); }
      else if (a === "italic") { if (!needText()) return; setFmt("italic", !eff(cs(), selEl).italic); }
      else if (a === "size-" || a === "size+") { if (!needText()) return; setFmt("size", nextSize(eff(cs(), selEl).size, a === "size+" ? 1 : -1)); }
      else if (a.indexOf("align:") === 0) { if (!needText()) return; setFmt("align", a.slice(6)); }
      else if (a === "bullets") {
        if (!(BOX[cs().layout] || {}).body) { toast("› In diesem Layout gibt es keine Aufzählung."); return; }
        cs().bullets = !cs().bullets; buzz(6); refresh();
      }
      else if (a === "picdel") { if (!cs().pic) { toast("› Auf dieser Folie ist kein Bild."); return; } cs().pic = null; if (selEl === "pic") selEl = null; buzz(8); refresh(); }
      else if (a.indexOf("theme:") === 0) { deck.theme = a.slice(6); buzz(8); refresh(); }
      else if (a === "transall") {
        const t = cs().trans; deck.slides.forEach((s) => (s.trans = t)); buzz(10);
        toast(t ? `› „${TRANS[t]}“ gilt jetzt für alle Folien.` : "› Übergang von allen Folien entfernt."); refresh();
      }
      else if (a === "preview") { if (tab === "animationen") previewAnim(); else previewTrans(); }
      else if (a === "play0") startPlay(0);
      else if (a === "play1") startPlay(ci);
      else if (a === "master") { master = true; tab = "master"; pop = null; selEl = null; refresh(); }
      else if (a === "m-close") { master = false; tab = "ansicht"; pop = null; refresh(); }
      else if (a === "m-bold") { deck.master.titleBold = !deck.master.titleBold; buzz(6); refresh(); }
    }
    groups.addEventListener("click", (e) => {
      const b = e.target.closest("[data-act]");
      if (b && !b.disabled) { cancelIdle(); act(b.dataset.act); armIdle(); }
    });

    /* ── Bildschirmpräsentation ────────────────────── */
    function startPlay(from) {
      if (player) return;
      let i = from;
      player = h(`<div class="ppt-player" role="dialog" aria-label="Bildschirmpräsentation"><div class="ppt-pstage" id="ppPS"></div>
        <button type="button" class="ppt-pexit" aria-label="Präsentation beenden">✕ Beenden</button><div class="ppt-phint">Tippen: weiter · linker Rand: zurück · Handy quer halten für ein größeres Bild</div></div>`);
      const ps = player.querySelector("#ppPS");
      const show = (animate) => {
        const sl = deck.slides[i];
        const t = animate && sl.trans && sl.trans !== "keine" && !reduced() ? ` ppt-t-${sl.trans}` : "";
        ps.innerHTML = slideHTML(sl, { index: i, play: true, cls: "ppt-big" + t });
      };
      const close = () => { if (player) { player.remove(); player = null; } };
      player.querySelector(".ppt-pexit").onclick = (e) => { e.stopPropagation(); close(); };
      player.onclick = (e) => {
        const left = e.clientX < window.innerWidth * 0.25;
        if (left) { if (i > 0) { i--; show(false); } return; }
        if (i >= deck.slides.length - 1) { ps.innerHTML = `<div class="ppt-end">Ende der Bildschirmpräsentation. Klicken zum Beenden.</div>`; player.onclick = close; return; }
        i++; show(true);
      };
      document.body.append(player);
      show(false);   /* Animationen laufen beim Erscheinen der Folie nacheinander ab */
    }

    /* ── Aufgabenkarte, Checkliste, Dock ───────────── */
    function paintTask() {
      const box = node.querySelector("#ppTask");
      if (!guided) {
        box.innerHTML = `<div class="sim-check${checkOpen ? " open" : ""}" id="ppCheckBox">
          <button type="button" class="sim-check-head" id="ppCheckToggle"><span>Checkliste · <b id="ppScore"></b></span><span class="chev">▾</span></button>
          <div class="sim-check-body" id="ppCList"></div></div>`;
        const cb = box.querySelector("#ppCheckBox");
        box.querySelector("#ppCheckToggle").onclick = () => { checkOpen = !checkOpen; cb.classList.toggle("open", checkOpen); };
      } else if (cur >= crit.length) {
        box.innerHTML = `<div class="sim-task done open"><div class="sim-task-head"><span class="n">✓</span><b>Die Präsentation ist fertig.</b></div>
          <div class="sim-task-body"><p>Tippe unten auf „Fertig“.</p></div></div>`;
      } else {
        const c = crit[cur], t = c.task || {};
        box.innerHTML = `<div class="sim-task${taskOpen ? " open" : ""}" id="ppTaskBox">
          <button type="button" class="sim-task-head" id="ppTaskToggle"><span class="n">Aufgabe ${cur + 1}/${crit.length}</span><b>${esc(c.label)}</b><span class="chev">▾</span></button>
          <div class="sim-task-body">
            ${t.wo ? `<p><span class="lbl">Wo?</span> ${esc(t.wo)}</p>` : ""}
            ${t.was ? `<p><span class="lbl">Was?</span> ${esc(t.was)}</p>` : ""}
            ${t.probe ? `<p><span class="lbl">Probe</span> ${esc(t.probe)}</p>` : ""}
          </div></div>`;
        const tb = box.querySelector("#ppTaskBox");
        box.querySelector("#ppTaskToggle").onclick = () => { taskOpen = !taskOpen; tb.classList.toggle("open", taskOpen); };
      }
    }
    function paintChecklist() {
      if (guided) return;
      const list = node.querySelector("#ppCList");
      if (!list) return;
      list.innerHTML = crit.map((c) => `<div class="row${critOK(c) ? " ok" : ""}"><i>✓</i><span>${esc(c.label)}</span></div>`).join("");
      const sc = node.querySelector("#ppScore");
      if (sc) sc.textContent = `${passedCount()}/${crit.length}`;
    }
    const statusEl = h(`<span class="sim-status"></span>`);
    function paintStatus() {
      const n = deck.slides.length;
      statusEl.innerHTML = `<span class="s-txt">${master ? "Folienmaster" : `Folie ${ci + 1} von ${n}`}<span class="s-lang"> · Deutsch (Deutschland)</span></span>`;
    }
    function paintDock() {
      if (guided) {
        if (cur >= crit.length) ctx.action(`Fertig ${env.ICON.check}`, () => ctx.finish({ c: crit.length, t: crit.length }), { variant: "good" });
        else ctx.action(`Probe ${env.ICON.check}`, probe);
      } else if (passedCount() >= crit.length) {
        ctx.action(`Fertig ${env.ICON.check}`, () => ctx.finish({ c: passedCount(), t: crit.length }), { variant: "good" });
      } else {
        ctx.action(`Prüfen ${env.ICON.check}`, freeCheck);
      }
    }

    /* ── Hinweise: Reiter, Knopf, Folie, Feld pulsieren ── */
    const OP_TAB = { count: "start", layout: "start", text: "start", lines: "start", fmt: "start", bullets: "start", pos: "start", pic: "einfuegen", anim: "animationen", trans: "uebergaenge", theme: "entwurf", master: "ansicht", view: "ansicht" };
    function opBtn(ck) {
      switch (ck.op) {
        case "count": return "newslide";
        case "layout": return "layout";
        case "text": case "lines": return "edit";
        case "fmt": return ck.prop === "bold" ? "bold" : ck.prop === "italic" ? "italic" : ck.prop === "size" ? "size" : `align:${ck.value}`;
        case "bullets": return "bullets";
        case "pos": return "up";
        case "pic": return ck.value === false ? "picdel" : "pic";
        case "anim": return "anim";
        case "trans": return ck.slide === "all" ? "transall" : "trans";
        case "theme": return `theme:${ck.value}`;
        case "view": return master ? "m-close" : "master";
        case "master": return master ? { titleColor: "m-color", titleSize: "m-size", titleBold: "m-bold", font: "m-font" }[ck.prop] : "master";
        default: return null;
      }
    }
    const hintCheck = () => (guided && cur < crit.length ? crit[cur].checks.find((ck) => !evalCheck(ck)) || crit[cur].checks[0] : null);
    function hintSlide() { const ck = hintCheck(); return ck && typeof ck.slide === "number" && ck.slide < deck.slides.length ? ck.slide : null; }
    function hintTarget() {
      const ck = hintCheck();
      if (!ck) return null;
      return { el: ["text", "fmt", "anim"].includes(ck.op) ? ck.el : null };
    }
    function paintHints() {
      node.querySelectorAll(".sim-tab.hint, .ppt-b.hint").forEach((el) => el.classList.remove("hint"));
      const ck = hintCheck();
      if (!ck) return;
      const c = crit[cur].task || {};
      const wantTab = master ? "master" : c.tab || OP_TAB[ck.op];
      if (hintSlide() !== null && hintSlide() !== ci && !master) return;   /* erst zur richtigen Folie */
      if (wantTab && tab !== wantTab && !master) { const t = node.querySelector(`.sim-tab[data-tab="${wantTab}"]`); if (t) t.classList.add("hint"); return; }
      if (["text", "fmt", "anim"].includes(ck.op) && ck.el && selEl !== ck.el && ck.op !== "text") return;   /* erst das Feld markieren */
      const b = c.btn || opBtn(ck);
      const el = b && groups.querySelector(`[data-act="${b}"]`);
      if (el) el.classList.add("hint");
    }

    function refresh() {
      paintTabs();
      paintRibbon();
      paintPop();
      paintThumbs();
      paintStage();
      paintStatus();
      paintChecklist();
      paintHints();
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
        paintTask(); paintDock(); paintHints(); paintThumbs(); paintStage();
      } else {
        simMsg("no", `Noch nicht ganz. ${esc(c.hint || "Schau dir die Folie nochmal an.")}`);
        buzz([30, 40, 30]);
      }
    }
    function freeCheck() {
      const n = passedCount();
      const missing = crit.filter((c) => !critOK(c)).map((c) => c.label);
      simMsg(n === crit.length ? "ok" : "no", n === crit.length
        ? "Alles richtig. Die Präsentation ist fertig."
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

    /* Leerlauf: nach 12 s Untätigkeit pulsiert der Hinweis stärker (Geisterhand wie bei Word ist hier nicht nötig) */
    let idle = null;
    const cancelIdle = () => { clearTimeout(idle); node.classList.remove("ppt-nudge"); };
    const armIdle = () => { clearTimeout(idle); if (guided) idle = setTimeout(() => node.classList.add("ppt-nudge"), 12000); };
    node.addEventListener("pointerdown", () => { cancelIdle(); armIdle(); });

    /* ── Einbau ────────────────────────────────────── */
    document.body.classList.add("sim-on", "sim-ppt");
    const topbar = ctx.root.querySelector(".player-top");
    topbar.insertBefore(h(`<span class="sim-file"><b>P</b><span>${esc(step.file || "Präsentation.pptx")} – PowerPoint</span></span>`), topbar.querySelector(".progress"));
    ctx.dock.prepend(statusEl);

    ctx.hintsFor = () => (guided && cur < crit.length ? [crit[cur].hint].filter(Boolean) : step.hints || []);
    ctx.hintKey = () => (guided ? "a" + cur : "frei");

    ctx.body.append(node);
    ctx.setProgress(0);
    paintTask();
    refresh();
    paintDock();
    if (step.intro) simMsg("info", esc(step.intro));
    armIdle();

    return () => {
      document.body.classList.remove("sim-on", "sim-ppt");
      timers.forEach(clearTimeout);
      cancelIdle();
      clearTimeout(msgTimer);
      if (player) player.remove();
    };
  };
})();
