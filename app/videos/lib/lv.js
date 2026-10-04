/* ============================================================
   LERNRAUM — Video-Baukasten
   Beschreibt ein Erklärvideo als Folge von Szenen mit fertigen Bausteinen
   (Text, Zeitstrahl, Rechenschema, Kurztest …). Jede Szene wird NUR aus der
   Zeit berechnet (LV.seek(t)) – dadurch lässt sich jedes Bild exakt
   rendern (app/tools/render-video.js) und im Browser vorab ansehen
   (player.html?v=<id>&play=1).

   Anleitung für Agenten: app/VIDEO-ANLEITUNG.md · Designsprache: docs/VIDEO-DESIGNSPRACHE.md
   ============================================================ */
(function () {
  "use strict";
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const prog = (t, at, d) => (d <= 0 ? (t >= at ? 1 : 0) : clamp((t - at) / d));
  const E = {
    lin: (t) => t,
    out: (t) => 1 - Math.pow(1 - t, 3),
    expo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    back: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    inout: (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
  };
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const de = (n) => n.toLocaleString("de-DE");
  const plain = (s) => String(s ?? "").replace(/<br\s*\/?>/gi, " · ").replace(/<[^>]+>/g, "").replace(/&shy;/g, "").replace(/\s+/g, " ").trim();
  const wordCount = (s) => String(s).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

  /* ── Ein- und Ausblenden ───────────────────────────────── */
  function reveal(el, p, kind) {
    if (kind === "fade") { el.style.opacity = E.out(p); return; }
    if (kind === "pop") { el.style.opacity = clamp(p * 4); el.style.transform = `scale(${0.78 + 0.22 * E.back(p)})`; return; }
    el.style.opacity = clamp(p * 2.2);
    el.style.transform = p >= 1 ? "none" : `translateY(${(1 - E.expo(p)) * 22}px)`;
  }
  function fadeOut(el, lt, until) {
    if (until == null) return;
    const f = prog(lt, until, 0.3);
    if (f > 0) el.style.opacity = String((parseFloat(el.style.opacity) || 0) * (1 - f));
  }
  function wrapWords(root) {
    const out = [];
    (function walk(n) {
      [...n.childNodes].forEach((c) => {
        if (c.nodeType === 3) {
          const frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach((tok) => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) frag.append(document.createTextNode(" "));
            else { const s = document.createElement("span"); s.className = "lv-w"; s.textContent = tok; frag.append(s); out.push(s); }
          });
          c.replaceWith(frag);
        } else if (c.nodeType === 1) walk(c);
      });
    })(root);
    return out;
  }

  /* ── Bausteine ─────────────────────────────────────────────
     Jeder Baustein: LV.xyz(...) → { _b() } ; _b() baut das Element und liefert
     { el, at, end, words, update(lt) }.  at = Einblendzeit in Sekunden ab Szenenbeginn. */
  const C = {};
  const ZN_DE = { 1: "Briefkopf", 2: "Anschriftfeld", 3: "Datum", 4: "Betreffzeile", 5: "Anrede", 6: "Brieftext", 7: "Grußformel", 8: "Unterschrift", 9: "Anlagen" };
  const comp = (fn) => (...a) => ({ _b: () => fn(...a) });

  // Text. Auszeichnungen im HTML: <mark> = rosa Markierung, <b> = Magenta, <em> = Grün.
  // o: { at, size:'xl|l|m|s', anim:'rise|fade|words|pop', until, tone:'mut' }
  C.text = comp((html, o = {}) => {
    const el = h(`<p class="lv-t lv-${o.size || "l"}${o.tone ? " tone-" + o.tone : ""}"></p>`);
    el.innerHTML = html;
    const marks = [...el.querySelectorAll("mark")];
    const words = o.anim === "words" ? wrapWords(el) : null;
    const at = o.at ?? 0.4, gap = o.stagger ?? 0.16;
    const end = at + (words ? words.length * gap + 0.4 : 0.55) + (marks.length ? 0.55 + marks.length * 0.45 : 0);
    return {
      el, at, end, words: wordCount(html), tx: () => [plain(html)],
      update(lt) {
        if (words) {
          el.style.opacity = lt >= at ? 1 : 0;
          words.forEach((w, i) => { const p = prog(lt, at + i * gap, 0.4); w.style.opacity = clamp(p * 2); w.style.transform = `translateY(${(1 - E.expo(p)) * 14}px)`; });
        } else reveal(el, prog(lt, at, 0.55), o.anim || "rise");
        marks.forEach((m, i) => m.style.setProperty("--m", E.out(prog(lt, (o.markAt ?? at + 0.55) + i * 0.45, 0.4))));
        fadeOut(el, lt, o.until);
      }
    };
  });

  // Kleine Schlagwörter, die nacheinander aufpoppen. list: ["EVER","NEVER"] · o: { at, stagger, tone:'good' }
  C.chips = comp((list, o = {}) => {
    const el = h(`<div class="lv-chips"></div>`);
    const items = list.map((t) => { const c = h(`<span class="lv-chip${o.tone ? " " + o.tone : ""}">${esc(t)}</span>`); el.append(c); return c; });
    const at = o.at ?? 0.6, gap = o.stagger ?? 0.22;
    return {
      el, at, end: at + items.length * gap + 0.4, words: items.length, tx: () => [list.join(" · ")],
      update(lt) { items.forEach((c, i) => reveal(c, prog(lt, at + i * gap, 0.4), "pop")); el.style.opacity = lt >= at ? 1 : 0; fadeOut(el, lt, o.until); }
    };
  });

  // Bauplan: übereinander gestapelte Kästen. boxes: [{label:'Subjekt', text:'They', tone:'pink|green'}]
  C.stack = comp((boxes, o = {}) => {
    const el = h(`<div class="lv-stack"></div>`);
    const items = boxes.map((b) => {
      const x = h(`<div class="lv-box ${b.tone || ""}">${b.label ? `<div class="lv-box-l">${esc(b.label)}</div>` : ""}<div class="lv-box-b">${b.text}</div></div>`);
      el.append(x); return x;
    });
    const at = o.at ?? 0.5, gap = o.stagger ?? 0.45;
    return {
      el, at, end: at + items.length * gap + 0.3, words: boxes.reduce((n, b) => n + wordCount(b.text), 0),
      tx: () => boxes.map((b) => (b.label ? plain(b.label) + ": " : "") + plain(b.text)),
      update(lt) { items.forEach((x, i) => reveal(x, prog(lt, at + i * gap, 0.5), "rise")); el.style.opacity = lt >= at ? 1 : 0; fadeOut(el, lt, o.until); }
    };
  });

  // Zeitstrahl. o: { at, marks:[{x:0..1,label,kind:'now'|'dot'}], arc:{from:0,to:1,label?}, range:{from,to,label}, ticks:['2022','2023',…] }
  C.timeline = comp((o = {}) => {
    const X0 = 12, X1 = 300, Y = 92, w = X1 - X0, px = (x) => X0 + w * x;
    const marks = o.marks || [];
    let svg = `<svg class="lv-tl" viewBox="0 0 312 150" xmlns="http://www.w3.org/2000/svg">
      <line class="ax" x1="${X0}" y1="${Y}" x2="${X1}" y2="${Y}" />`;
    (o.ticks || []).forEach((t, i, a) => { const x = px(a.length > 1 ? i / (a.length - 1) : 0); svg += `<g class="tk"><line x1="${x}" y1="${Y - 4}" x2="${x}" y2="${Y + 4}" /><text x="${x}" y="${Y + 20}" text-anchor="middle">${esc(t)}</text></g>`; });
    if (o.range) svg += `<rect class="rg" x="${px(o.range.from)}" y="${Y - 7}" width="${w * (o.range.to - o.range.from)}" height="14"/>${o.range.label ? `<text class="lbl rgl" x="${px(o.range.from)}" y="${Y - 16}">${esc(o.range.label)}</text>` : ""}`;
    if (o.arc) { const a = px(o.arc.from), b = px(o.arc.to); svg += `<path class="arc" d="M ${a} ${Y - 10} C ${a} 8, ${b} 8, ${b} ${Y - 14}"/><path class="ah" d="M ${b - 7} ${Y - 22} L ${b} ${Y - 10} L ${b + 7} ${Y - 22} Z" />`; }
    marks.forEach((m, i) => {
      const x = px(m.x), an = m.x < 0.2 ? "start" : m.x > 0.8 ? "end" : "middle", tx = an === "start" ? Math.max(x - 10, X0 - 8) : an === "end" ? Math.min(x + 10, X1 + 8) : x; // Beschriftung am Rand nach innen ausrichten
      svg += `<g class="mk${m.kind === "now" ? " now" : ""}"><rect x="${x - (m.kind === "now" ? 9 : 6)}" y="${Y - (m.kind === "now" ? 9 : 6)}" width="${m.kind === "now" ? 18 : 12}" height="${m.kind === "now" ? 18 : 12}" />${m.label ? `<text class="lbl" x="${tx}" y="${Y + 32}" text-anchor="${an}">${esc(m.label)}</text>` : ""}${m.sub ? `<text x="${tx}" y="${Y + 47}" text-anchor="${an}">${esc(m.sub)}</text>` : ""}</g>`;
    });
    svg += `</svg>`;
    const el = h(`<div>${svg}</div>`);
    const q = (s) => el.querySelector(s), qa = (s) => [...el.querySelectorAll(s)];
    const at = o.at ?? 0.5, axisLen = w;
    const mks = qa(".mk"), tks = qa(".tk"), arc = q(".arc"), ah = q(".ah"), rg = q(".rg"), rgl = q(".rgl");
    const arcAt = o.arc?.at ?? at + 0.8 + marks.length * 0.45, rgAt = o.range?.at ?? at + 0.8;
    const end = Math.max(arcAt + 1.1, rgAt + 0.8, at + 0.8 + marks.length * 0.45);
    let arcLen = 0;
    return {
      el, at, end, words: marks.length,
      tx: () => [(o.ticks || []).length ? "Zeitstrahl: " + o.ticks.join(" – ") : "Zeitstrahl", ...marks.map((m) => [m.label, m.sub && `(${m.sub})`].filter(Boolean).join(" ")), o.range && o.range.label].filter(Boolean),
      update(lt) {
        const pa = E.inout(prog(lt, at, 0.7)), ax = q(".ax");
        ax.setAttribute("x2", String(X0 + axisLen * pa));
        tks.forEach((t, i) => { t.style.opacity = prog(lt, at + 0.5 + i * 0.1, 0.3); });
        mks.forEach((m, i) => { const p = prog(lt, m.dataset.at ? +m.dataset.at : at + 0.8 + i * 0.45, 0.4); m.style.opacity = clamp(p * 3); m.style.transformBox = "fill-box"; m.style.transformOrigin = "center"; m.style.transform = `scale(${0.6 + 0.4 * E.back(p)})`; });
        if (rg) { const p = E.out(prog(lt, rgAt, 0.7)); rg.setAttribute("transform", `translate(${px(o.range.from)} 0) scale(${p} 1) translate(${-px(o.range.from)} 0)`); if (rgl) rgl.style.opacity = prog(lt, rgAt + 0.5, 0.3); }
        if (arc) { if (!arcLen) arcLen = arc.getTotalLength() || 300; const p = E.inout(prog(lt, arcAt, 0.9)); arc.style.strokeDasharray = String(arcLen); arc.style.strokeDashoffset = String(arcLen * (1 - p)); ah.style.opacity = prog(lt, arcAt + 0.8, 0.15); }
        el.style.opacity = lt >= at ? 1 : 0; fadeOut(el, lt, o.until);
      }
    };
  });

  // Rechenschema. rows: [{label, value, op:'−'|'+'|'=', sub, line:true (Strich darüber), hi:true (rosa Markierung)}]
  // o: { at, title, gap }  value = Zahl (zählt hoch) oder Text
  C.scheme = comp((rows, o = {}) => {
    const el = h(`<div class="lv-scheme win"><div class="bar"><span class="d"></span>${esc(o.title || "Rechenschema")}</div><div class="body"></div></div>`);
    const body = el.querySelector(".body");
    const at = o.at ?? 0.5, gap = o.gap ?? 0.8;
    const items = rows.map((r) => {
      const x = h(`<div class="lv-row${r.line ? " sum" : ""}${r.hi ? " hi" : ""}"><span class="op">${esc(r.op || "")}</span><span>${esc(r.label)}${r.sub ? `<small>${esc(r.sub)}</small>` : ""}</span><span class="val">${typeof r.value === "number" ? "0" : esc(r.value)}</span></div>`);
      body.append(x); return { x, r, v: x.querySelector(".val") };
    });
    return {
      el, at, end: at + rows.length * gap + 0.9, words: rows.reduce((n, r) => n + wordCount(r.label), 0),
      tx: () => [o.title || "Rechenschema", ...rows.map((r) => `${r.op ? r.op + " " : ""}${r.label}: ${typeof r.value === "number" ? de(r.value) : r.value}`)],
      update(lt) {
        reveal(el, prog(lt, at, 0.4), "rise");
        items.forEach(({ x, r, v }, i) => {
          const s = at + 0.3 + i * gap;
          reveal(x, prog(lt, s, 0.4), "fade");
          if (typeof r.value === "number") v.textContent = de(Math.round(r.value * E.out(prog(lt, s + 0.1, 0.55))));
          if (r.line) x.style.setProperty("--l", E.out(prog(lt, s - 0.1, 0.35)));
          if (r.hi) x.style.setProperty("--m", E.out(prog(lt, s + 0.5, 0.4)));
        });
        fadeOut(el, lt, o.until);
      }
    };
  });

  // Terminal-Zeile wie in der App. lines: ["› Netto: 5 neue Stellen"] · o: { at, cps }
  C.term = comp((lines, o = {}) => {
    const el = h(`<div class="lv-term"></div>`);
    const at = o.at ?? 0.5, cps = o.cps ?? 26;
    const total = lines.reduce((n, l) => n + l.length, 0);
    return {
      el, at, end: at + total / cps + 0.5, words: lines.reduce((n, l) => n + wordCount(l), 0), tx: () => lines.slice(),
      update(lt) {
        el.style.opacity = lt >= at ? 1 : 0;
        let n = Math.floor(Math.max(0, lt - at) * cps), html = "";
        lines.forEach((l, i) => { const k = Math.max(0, Math.min(l.length, n)); n -= l.length; html += (i ? "<br>" : "") + esc(l.slice(0, k)).replace(/^(›)/, '<span class="ok">$1</span>'); });
        el.innerHTML = html + (n < 0 ? '<span class="cur"></span>' : "");
        fadeOut(el, lt, o.until);
      }
    };
  });

  // Kurztest. q: Frage (HTML) · options: ["2","38","−2"] · answer: Index · o: { at, reveal: Sekunde der Auflösung }
  C.quiz = comp((q, options, answer, o = {}) => {
    const el = h(`<div class="lv-q"></div>`);
    const qt = h(`<p class="lv-t lv-m"></p>`); qt.innerHTML = q; el.append(qt);
    const think = h(`<div class="lv-think"><i></i></div>`); el.append(think);
    const opts = options.map((t, i) => { const x = h(`<div class="lv-opt"><span class="key">${"ABCD"[i]}</span><span>${esc(t)}</span><span class="mk"></span></div>`); el.append(x); return x; });
    const at = o.at ?? 0.4, rv = o.reveal ?? at + 5;
    return {
      el, at, end: rv + 1.2, words: wordCount(q) + options.length,
      tx: () => [plain(q), ...options.map((t, i) => `${"ABCD"[i]}) ${t}`), `Antwort: ${options[answer]}`],
      update(lt) {
        reveal(qt, prog(lt, at, 0.5), "rise");
        think.style.opacity = lt >= at + 0.6 ? 1 : 0;
        think.firstChild.style.transform = `scaleX(${1 - prog(lt, at + 0.8 + options.length * 0.3, rv - (at + 0.8 + options.length * 0.3))})`;
        opts.forEach((x, i) => {
          reveal(x, prog(lt, at + 0.5 + i * 0.3, 0.4), "rise");
          const on = lt >= rv;
          x.classList.toggle("right", on && i === answer);
          x.querySelector(".mk").textContent = on && i === answer ? "✓" : "";
          if (on && i !== answer) x.style.opacity = String(0.35 + 0.65 * (1 - prog(lt, rv, 0.3)));
        });
        fadeOut(el, lt, o.until);
      }
    };
  });


  // Brief nach DIN 5008: A4-Blatt mit den neun Zonen, Kamerafahrt, Hervorhebung und Beschriftung.
  // letter: { z1:[Zeilen], z2:[…], … z9:[…] } – leerer Text "" = Leerzeile (z8 enthält die drei Leerzeilen der Unterschrift)
  // show: "all" (Standard) oder [{zone, at}] (at < 0 = von Anfang an sichtbar) · outlines: {at, stagger} = alle Zonen als gestrichelte Kästen mit Nummern
  // focus: [{at, all:true} | {at, zone:2, pad:{x,y}} | {at, r:[x0,y0,x1,y1]}] – Kamera (mm auf dem Blatt)
  // marks: [{zone, at, label, note, until?, ruler?:{from,to,x,label}}] – Hervorhebung + Beschriftung unter dem Blatt
  C.page = comp((o = {}) => {
    const S0 = 312 / 210, VW = 312, VH = o.height || 360;
    const L = o.letter || {};
    const LH = 4.6, LH8 = 3.5, PT = 11;
    const plan = [
      { z: 1, pt: 8, lh: LH8, gap: 0 }, { z: 2, pt: PT, lh: LH, gap: 0.15 }, { z: 3, pt: PT, lh: LH, gap: 2, right: true },
      { z: 4, pt: PT, lh: LH, gap: 2, bold: true }, { z: 5, pt: PT, lh: LH, gap: 1 }, { z: 6, pt: PT, lh: LH, gap: 1, full: true },
      { z: 7, pt: PT, lh: LH, gap: 1 }, { z: 8, pt: PT, lh: LH, gap: 0 }, { z: 9, pt: PT, lh: LH, gap: 1 }
    ];
    let y = 45; const Z = {};   // Anschriftfeld beginnt 45 mm unter dem oberen Blattrand
    plan.forEach((p) => {
      const lines = L["z" + p.z] || [""]; y += p.gap * LH;
      const h = lines.length * p.lh;
      const w = p.full ? 165 : Math.min(165, Math.max(12, Math.max(...lines.map((l) => l.length)) * p.pt * 0.3528 * 0.55 + 3));
      if (p.z === 1) { Z[1] = { ...p, lines, x: 25, y: 45 - h - 1.5, w, h }; return; }
      Z[p.z] = { ...p, lines, x: p.right ? 190 - w : 25, y, w, h }; y += h;
    });

    const el = h(`<div class="lv-pg"><div class="lv-pg-view" style="height:${VH}px"><div class="lv-pg-world"><div class="lv-pg-sheet" style="width:${210 * S0}px;height:${297 * S0}px"></div></div></div>
      <div class="lv-pg-cap"><span class="lv-pg-capn"></span><span class="lv-pg-capt"></span><span class="lv-pg-capm"></span></div></div>`);
    const world = el.querySelector(".lv-pg-world"), sheet = el.querySelector(".lv-pg-sheet");
    const capn = el.querySelector(".lv-pg-capn"), capt = el.querySelector(".lv-pg-capt"), capm = el.querySelector(".lv-pg-capm"), cap = el.querySelector(".lv-pg-cap");
    const mm = (v) => v * S0 + "px";
    const zel = {};
    Object.values(Z).forEach((z) => {
      const d = h(`<div class="lv-pg-z z${z.z}" style="left:${mm(z.x)};top:${mm(z.y)};width:${mm(z.w)};height:${mm(z.h)}"><div class="lv-pg-out"></div><div class="lv-pg-hl"></div>
        <div class="lv-pg-t">${z.lines.map((l) => `<div style="font-size:${z.pt * 0.3528 * S0}px;line-height:${z.lh * S0}px;font-weight:${z.bold ? 700 : 500};text-align:${z.right ? "right" : "left"}">${esc(l) || "&nbsp;"}</div>`).join("")}</div>
        <span class="lv-pg-n">${z.z}</span></div>`);
      sheet.append(d);
      zel[z.z] = { d, out: d.querySelector(".lv-pg-out"), hl: d.querySelector(".lv-pg-hl"), t: d.querySelector(".lv-pg-t"), n: d.querySelector(".lv-pg-n") };
    });
    const marks = (o.marks || []).map((m) => ({ ...m }));
    const rulers = marks.map((m) => {
      if (!m.ruler) return null;
      const r = m.ruler, d = h(`<div class="lv-pg-ruler" style="left:${mm(r.x)};top:${mm(r.from)};height:${mm(r.to - r.from)}"><i></i><b>${esc(r.label || "")}</b></div>`);
      sheet.append(d); return d;
    });
    const showMap = o.show === undefined || o.show === "all" ? null : o.show;
    const show = {}; (showMap || []).forEach((s) => { show[s.zone] = s.at; });
    const at = o.at ?? 0.4;

    /* Kamera */
    const full = { cx: 105, cy: 148.5, k: Math.min(VW / (210 * S0), VH / (297 * S0)) };
    const viewOf = (f) => {
      if (f.all) return { ...full };
      let r = f.r;
      if (f.zone) { const z = Z[f.zone], pad = f.pad || {}; const px = pad.x ?? 8, py = pad.y ?? 5; r = [z.x - px, z.y - py, z.x + z.w + px, z.y + z.h + py]; }
      const rw = r[2] - r[0], rh = r[3] - r[1];
      const k = Math.min(VW / (rw * S0), VH / (rh * S0), 3.6 / S0);   // höchstens ca. 3,6 px je mm (Schrift bleibt scharf)
      return { cx: (r[0] + r[2]) / 2, cy: (r[1] + r[3]) / 2, k };
    };
    const fk = (o.focus && o.focus.length ? o.focus : [{ at: 0, all: true }]).map((f) => ({ at: f.at ?? 0, v: viewOf(f) }));
    const camAt = (lt) => {
      let i = 0; fk.forEach((f, j) => { if (lt >= f.at) i = j; });
      if (i >= 1 && lt < fk[i].at + 0.9) {
        const t = E.inout(prog(lt, fk[i].at, 0.9)), a = fk[i - 1].v, b = fk[i].v;
        return { cx: a.cx + (b.cx - a.cx) * t, cy: a.cy + (b.cy - a.cy) * t, k: Math.exp(Math.log(a.k) + (Math.log(b.k) - Math.log(a.k)) * t) };
      }
      return fk[i].v;
    };

    const ol = o.outlines;
    const lastMark = marks.reduce((m, x) => Math.max(m, x.at), 0);
    const end = Math.max(lastMark + 2.2, ol ? ol.at + 9 * (ol.stagger ?? 0.25) + 0.8 : 0, at + 1);
    let curMark = -2;
    return {
      el, at, end, words: marks.reduce((n, m) => n + wordCount((m.label || "") + " " + (m.note || "")), 0),
      tx: () => [ol ? "Ein Geschäftsbrief hat neun Zonen." : "", ...marks.map((m) => `${m.n ?? m.zone} ${m.label || ""}${m.note ? ": " + plain(m.note) : ""}`)].filter(Boolean),
      update(lt) {
        el.style.opacity = lt >= at ? 1 : 0;
        const c = camAt(lt);
        world.style.setProperty("--k", c.k);
        world.style.transform = `translate(${VW / 2 - c.cx * S0 * c.k}px, ${VH / 2 - c.cy * S0 * c.k}px) scale(${c.k})`;
        Object.keys(Z).forEach((n, idx) => {
          const e = zel[n];
          e.t.style.opacity = showMap ? (show[n] === undefined ? 0 : show[n] < 0 ? 1 : prog(lt, show[n], 0.5)) : 1;
          if (ol) { const p = prog(lt, ol.at + idx * (ol.stagger ?? 0.25), 0.35); e.out.style.opacity = p * (1 - prog(lt, ol.until ?? 1e9, 0.3)); e.n.style.opacity = p; e.n.style.transform = `translate(${+n % 2 ? "100%" : "-100%"}, 0) scale(${0.7 + 0.3 * E.back(p)})`; }
          else { e.out.style.opacity = 0; e.n.style.opacity = 0; }
          let a = 0;
          marks.forEach((m, j) => { if (m.zone === +n) { const next = m.until ?? (marks[j + 1] ? marks[j + 1].at : 1e9); a = Math.max(a, prog(lt, m.at, 0.3) * (1 - prog(lt, next, 0.3))); } });
          e.hl.style.opacity = a; if (a > 0) { e.n.style.opacity = Math.max(+e.n.style.opacity || 0, a); }
          e.d.classList.toggle("on", a > 0.05);
        });
        let ai = -1; marks.forEach((m, j) => { if (lt >= m.at) ai = j; });
        if (ai !== curMark) { curMark = ai; const m = marks[ai]; capn.textContent = m ? (m.n ?? m.zone) : ""; capt.textContent = m ? m.label || ZN_DE[m.zone] : ""; capm.textContent = m ? m.note || "" : ""; }
        const m = marks[ai];
        cap.style.opacity = m ? prog(lt, m.at + 0.05, 0.35) : 0;
        cap.style.transform = m ? `translateY(${(1 - E.out(prog(lt, m.at + 0.05, 0.35))) * 10}px)` : "none";
        rulers.forEach((r, j) => { if (!r) return; const mk = marks[j], next = mk.until ?? (marks[j + 1] ? marks[j + 1].at : 1e9); const a = prog(lt, mk.at + 0.2, 0.6) * (1 - prog(lt, next, 0.3)); r.style.opacity = a > 0 ? 1 : 0; r.firstChild.style.transform = `scaleY(${E.inout(prog(lt, mk.at + 0.2, 0.7))})`; r.lastChild.style.opacity = prog(lt, mk.at + 0.7, 0.3) * (1 - prog(lt, next, 0.3)); });
        fadeOut(el, lt, o.until);
      }
    };
  });

  /* ── Szenen ───────────────────────────────────────────── */
  const S = {};
  // Inhaltsszene: kicker = kleine Überschrift oben („01 · Die Idee“), dur in Sekunden, items = Bausteine
  S.scene = (o) => ({ type: "scene", ...o });
  // Titelbild mit Pixelwolke: { kicker, title, sub, dur }
  S.title = (o) => ({ type: "title", dur: 4, ...o });
  // Schlussbild: { text, url, dur }
  S.outro = (o) => ({ type: "outro", dur: 3.5, ...o });

  /* ── Pixelwolke (Bayer-Raster, wie Startseite) ─────────── */
  const BAYER = [[0, 32, 8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26], [12, 44, 4, 36, 14, 46, 6, 38], [60, 28, 52, 20, 62, 30, 54, 22],
    [3, 35, 11, 43, 1, 33, 9, 41], [51, 19, 59, 27, 49, 17, 57, 25], [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21]];
  const PAL = [[254, 254, 254], [251, 219, 229], [248, 176, 201], [243, 134, 161], [221, 109, 181], [212, 91, 182]];
  const PAL_DARK = [[20, 20, 20], [46, 27, 36], [86, 38, 58], [140, 58, 94], [178, 74, 150], [200, 84, 168]];
  const isDark = () => document.documentElement.dataset.theme === "dark";
  function drawCloud(cv, t, amount) {
    const W = 90, Hh = 100; if (cv.width !== W) { cv.width = W; cv.height = Hh; }
    const g = cv.getContext("2d"), img = g.createImageData(W, Hh), pal = isDark() ? PAL_DARK : PAL;
    const blobs = [{ x: .1 + Math.sin(t * .5) * .05, y: .25, r: .45, a: 1 }, { x: .85 + Math.cos(t * .4) * .05, y: .1, r: .5, a: 1 }, { x: .6, y: .85 + Math.sin(t * .6) * .04, r: .4, a: .7 }, { x: .05, y: .8, r: .35, a: .6 }];
    for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) {
      let d = 0;
      for (const b of blobs) { const dx = x / W - b.x, dy = (y / Hh - b.y) * 1.1, dd = Math.sqrt(dx * dx + dy * dy) / b.r; d += b.a * Math.max(0, 1 - dd * dd); }
      d += .07 * Math.sin(x * .3 + t) * Math.cos(y * .27);
      d = clamp(d / 1.5) * amount;
      const lvl = clamp(Math.round(d * 5 + (BAYER[y & 7][x & 7] / 64 - .5)), 0, 5), c = pal[lvl], i = (y * W + x) * 4;
      img.data[i] = c[0]; img.data[i + 1] = c[1]; img.data[i + 2] = c[2]; img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
  }

  /* ── Aufbau und Zeitsteuerung ─────────────────────────────
     LV.create(def, host, opts) baut eine Instanz in den Container host.
       opts.raw   – Bühne = host selbst, exakt 360 × 640 (Renderer, player.html)
       opts.audio – URL der Musik (m4a); wird mit der Zeit synchron gehalten
       opts.maxH  – () => verfügbare Höhe in Pixel (für die Skalierung in der App)
     Instanz: play() pause() toggle() seek(t) nextScene() prevScene() setMuted(b) info() on(ev, fn) destroy()
     Ereignisse: "time" (t, total) · "state" ("play" | "pause" | "end") · "audio-error" */
  const TR = 0.3; // Länge der Pixel-Überblendung zwischen zwei Szenen (je Seite)

  function create(def, host, opts = {}) {
    if (!def) throw new Error("LV.video({...}) fehlt in der Quelldatei");
    const raw = !!opts.raw;
    let wrap = null, stage;
    if (raw) { stage = host; stage.innerHTML = ""; stage.classList.add("lv-stage"); }
    else { stage = h(`<div class="lv-stage"></div>`); wrap = h(`<div class="lv-wrap"></div>`); wrap.append(stage); host.append(wrap); }

    const content = def.scenes.filter((x) => x.type === "scene");
    const progEl = h(`<div class="lv-prog">${content.map(() => "<i><b></b></i>").join("")}</div>`); stage.append(progEl);
    let start = 0, ci = 0;
    const scenes = def.scenes.map((d) => {
      const el = h(`<section class="lv-scene is-${d.type}${d.align === "top" ? "" : " is-center"}"></section>`);
      stage.append(el);
      const sc = { def: d, el, start, dur: d.dur || 6, items: [], ci: d.type === "scene" ? ci++ : -1 };
      start += sc.dur;
      if (d.type === "scene") {
        if (d.kicker) { sc.kick = h(`<div class="lv-kick">${esc(d.kicker)}</div>`); el.append(sc.kick); }
        (d.items || []).forEach((it) => { const b = (typeof it === "string" ? C.text(it, { size: "m" }) : it)._b(); el.append(b.el); sc.items.push(b); });
      } else if (d.type === "title") {
        sc.cloud = h(`<canvas class="lv-cloud"></canvas>`); el.append(sc.cloud);
        el.append(h(`<span class="tag-box lv-title-tag"><span class="sq"></span>${esc(d.kicker || "Lernraum")}</span>`));
        const m = h(`<div class="lv-title-main"></div>`); el.append(m);
        const t = C.text(d.title, { size: "xl", anim: "words", at: 0.5, stagger: 0.22 })._b(); t.words = wordCount(d.title); m.append(t.el); sc.items.push(t);
        if (d.sub) { const x = h(`<div class="lv-title-sub"><div class="win"><div class="bar"><span class="d"></span>Lernraum</div><div class="body">${d.sub}</div></div></div>`); el.append(x); sc.sub = x; sc.subAt = 1.6; }
      } else {
        sc.cloud = h(`<canvas class="lv-cloud" style="top:auto;bottom:0;transform:scaleY(-1)"></canvas>`); el.append(sc.cloud);
        sc.logo = h(`<span class="tag-box"><span class="sq"></span>Lernraum</span>`); el.append(sc.logo);
        if (d.text) { const t = C.text(d.text, { size: "l", at: 0.7 })._b(); el.append(t.el); sc.items.push(t); }
        if (d.url) { sc.url = h(`<p class="lv-t lv-s">${esc(d.url)}</p>`); el.append(sc.url); }
      }
      return sc;
    });
    const total = start;
    const wipe = h(`<canvas class="lv-wipe" width="90" height="160"></canvas>`); stage.append(wipe);

    function drawWipe(p) {
      const g = wipe.getContext("2d");
      if (p <= 0) { g.clearRect(0, 0, 90, 160); return; }
      const img = g.createImageData(90, 160), v = isDark() ? 20 : 254;
      for (let y = 0; y < 160; y++) for (let x = 0; x < 90; x++) {
        const on = (BAYER[y & 7][x & 7] / 64) < p + (p >= 1 ? 1 : 0), i = (y * 90 + x) * 4;
        if (on) { img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v; img.data[i + 3] = 255; }
      }
      g.putImageData(img, 0, 0);
    }

    let t = 0;
    function render() {
      const tt = clamp(t, 0, total - 1e-4);
      let i = scenes.findIndex((s) => tt < s.start + s.dur); if (i < 0) i = scenes.length - 1;
      const sc = scenes[i], lt = tt - sc.start;
      scenes.forEach((s, k) => { const on = k === i; if (s._on !== on) { s.el.style.display = on ? "flex" : "none"; s._on = on; } });
      if (sc.kick) sc.kick.style.opacity = String(prog(lt, 0.1, 0.4));
      sc.items.forEach((b) => b.update(lt));
      if (sc.cloud) drawCloud(sc.cloud, lt + sc.start * 0.3, sc.def.type === "title" ? Math.min(1, 0.55 + lt * 0.25) : 0.6);
      if (sc.sub) reveal(sc.sub, prog(lt, sc.subAt, 0.5), "rise");
      if (sc.logo) reveal(sc.logo, prog(lt, 0.1, 0.5), "pop");
      if (sc.url) sc.url.style.opacity = String(prog(lt, 1.4, 0.4));
      progEl.style.display = sc.def.type === "scene" ? "flex" : "none";
      [...progEl.children].forEach((c, k) => { c.firstChild.style.transform = `scaleX(${k < sc.ci ? 1 : k === sc.ci ? lt / sc.dur : 0})`; });
      let p = 0;
      if (i < scenes.length - 1) p = Math.max(p, prog(lt, sc.dur - TR, TR));
      if (i > 0) p = Math.max(p, 1 - prog(lt, 0, TR));
      drawWipe(i === scenes.length - 1 && lt > sc.dur - 0.01 ? 0 : p);
      return i;
    }

    /* Skalierung: die Bühne ist 360 × 640 und wird in den Container eingepasst */
    function fit() {
      if (raw) return;
      const maxH = opts.maxH ? opts.maxH() : innerHeight * 0.62;
      const k = Math.max(0.2, Math.min(host.clientWidth / 360, maxH / 640));
      wrap.style.width = Math.round(360 * k) + "px"; wrap.style.height = Math.round(640 * k) + "px";
      stage.style.transform = `scale(${k})`;
    }
    let ro = null;
    if (!raw) { fit(); if (window.ResizeObserver) { ro = new ResizeObserver(fit); ro.observe(host); } addEventListener("resize", fit); }

    /* Abspielen: eigene Uhr, Musik wird nachgeführt */
    const subs = {};
    const emit = (ev, a, b) => (subs[ev] || []).forEach((f) => f(a, b));
    let playing = false, raf = 0, last = 0, lastDraw = -1e3, audio = null, muted = false, ended = false;
    if (opts.audio) {
      audio = new Audio(); audio.preload = opts.preload || "metadata"; audio.src = opts.audio; audio.loop = false;
      audio.addEventListener("error", () => emit("audio-error"));
    }
    const sceneStarts = scenes.map((s) => s.start);
    const sceneAt = (x) => { let k = 0; sceneStarts.forEach((a, j) => { if (x >= a - 1e-6) k = j; }); return k; };

    function tick(now) {
      raf = 0; if (!playing) return;
      t += (now - last) / 1000; last = now;
      if (audio && !audio.paused && Math.abs(audio.currentTime - t) > 0.3) { try { audio.currentTime = Math.min(t, audio.duration || t); } catch { /* noch nicht bereit */ } }
      if (t >= total) { t = total - 1e-3; render(); emit("time", t, total); playing = false; ended = true; if (audio) audio.pause(); emit("state", "end"); return; }
      if (now - lastDraw >= 30) { lastDraw = now; render(); emit("time", t, total); }   // höchstens ca. 33 Bilder/s: schont schwache Handys
      raf = requestAnimationFrame(tick);
    }
    const api = {
      el: wrap || stage, stage, total, scenes: scenes.map((s) => ({ start: s.start, dur: s.dur, type: s.def.type, kicker: s.def.kicker || "" })),
      get time() { return t; }, get playing() { return playing; }, get ended() { return ended; },
      on(ev, fn) { (subs[ev] = subs[ev] || []).push(fn); return api; },
      seek(x) { t = clamp(x, 0, total - 1e-3); ended = false; render(); if (audio && audio.readyState > 0) { try { audio.currentTime = t; } catch { /* egal */ } } emit("time", t, total); },
      play() {
        if (ended || t >= total - 0.05) { t = 0; ended = false; }
        playing = true; last = performance.now();
        if (audio) { audio.muted = muted; try { audio.currentTime = t; } catch { /* egal */ } const pr = audio.play(); if (pr && pr.catch) pr.catch(() => emit("audio-error")); }
        emit("state", "play"); if (!raf) raf = requestAnimationFrame(tick);
      },
      pause() { if (!playing) return; playing = false; if (audio) audio.pause(); emit("state", "pause"); },
      toggle() { playing ? api.pause() : api.play(); },
      nextScene() { const k = sceneAt(t); if (k + 1 < scenes.length) api.seek(scenes[k + 1].start + 0.05); else api.seek(total - 0.01); },
      prevScene() { const k = sceneAt(t), here = scenes[k].start; api.seek(t - here > 1.2 || k === 0 ? here + 0.05 : scenes[k - 1].start + 0.05); },
      setMuted(b) { muted = !!b; if (audio) audio.muted = muted; },
      get muted() { return muted; },
      preloadAudio() { if (audio) { audio.preload = "auto"; audio.load(); } },
      info() {
        const warn = [];
        const out = scenes.map((s, k) => {
          const words = s.items.reduce((n, b) => n + (b.words || 0), 0);
          const lastEnd = s.items.reduce((m, b) => Math.max(m, b.end || 0), 0);
          const label = `Szene ${k + 1}${s.def.kicker ? " „" + s.def.kicker + "“" : ""}`;
          if (s.def.type === "scene") {
            if (words / s.dur > 3) warn.push(`${label}: ${words} Wörter in ${s.dur} s – zu viel zum Lesen (max. 3 Wörter pro Sekunde). Kürzen oder Szene verlängern.`);
            if (lastEnd + 1 > s.dur) warn.push(`${label}: Der letzte Baustein ist erst bei ${lastEnd.toFixed(1)} s fertig, die Szene endet bei ${s.dur} s. Mindestens 1 s Lesezeit am Ende lassen.`);
            s.items.forEach((b) => { if ((b.words || 0) > 14 && b.el.classList.contains("lv-t")) warn.push(`${label}: Ein Textblock hat ${b.words} Wörter (max. 14).`); });
          }
          const text = [s.def.kicker, s.def.title, s.def.sub, s.def.text, ...(s.def.type === "scene" ? s.items.flatMap((b) => (b.tx ? b.tx() : [])) : [])].filter(Boolean).map(plain);
          return { start: s.start, dur: s.dur, type: s.def.type, kicker: s.def.kicker || "", words, text };
        });
        if (total > 90) warn.push(`Das Video ist ${total.toFixed(0)} s lang (Ziel: 20–60 s, maximal 90 s).`);
        return { id: def.id, title: def.title || def.id, bpm: def.bpm || 92, mood: def.mood || "calm", total, scenes: out, warn, poster: def.poster ?? Math.min(total - 0.5, scenes[1] ? scenes[1].start + 2.2 : 1) };
      },
      relayout() { fit(); render(); },
      destroy() {
        playing = false; if (raf) cancelAnimationFrame(raf);
        if (audio) { audio.pause(); audio.removeAttribute("src"); audio.load(); audio = null; }
        if (ro) ro.disconnect(); removeEventListener("resize", fit); removeEventListener("lernraum-theme", onTheme);
        if (!raw && wrap) wrap.remove();
      }
    };
    const onTheme = () => render();
    addEventListener("lernraum-theme", onTheme);
    render();
    return api;
  }

  /* ── Globale Hülle: Quelldateien melden sich mit LV.video({...}) an ── */
  const defs = {};
  let lastDef = null, cur = null;
  const LV = {
    ...C, ...S, E, defs, create,
    video(def) { lastDef = def; if (def && def.id) defs[def.id] = def; },
    // Für player.html und den Renderer: eine Instanz in #stage, exakt 360 × 640
    start(o = {}) {
      cur = create(lastDef, document.getElementById("stage"), { raw: true });
      const fin = () => { window.__lvReady = true; };
      (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(fin));
      if (o.play) {
        const fitPage = () => { const k = Math.min(innerWidth / 360, innerHeight / 640); cur.stage.style.transform = `scale(${k})`; };
        fitPage(); addEventListener("resize", fitPage);
        cur.on("state", (st) => { if (st === "end") { cur.seek(0); cur.play(); } });
        cur.play();
      }
    },
    seek(x) { return cur && cur.seek(x); },
    info() { return cur && cur.info(); }
  };
  window.LV = LV;
})();
