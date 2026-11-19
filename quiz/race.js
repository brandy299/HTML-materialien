/* ============================================================
   LERNRAUM · Live-Quiz – Rennbahn (Lehreransicht)
   Gezeichnete Pferde (Pixel-Grafik als SVG), Sandbahn mit Startboxen und Zielflagge,
   Tribüne, Siegerpodest, Staub, Konfetti, Überhol-Meldungen.
   Strecke = Gesamtfortschritt (beantwortete Fragen); richtig/falsch nur mit o.detail. Wird von quiz.js benutzt: QuizRace.html / QuizRace.update
   ============================================================ */
(() => {
  "use strict";
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* Pferd, 20 × 13 Pixel. B = Fellfarbe, D = Mähne/Hufe, W = Auge, J = Reiter */
  const BODY = [
    ".........JJ.....DD..",
    ".........JJ....BBDD.",
    ".........JJ...BBBBB.",
    "........JJJJ.BBBBWB.",
    "..DD.BBBBBBBBBBBBBB.",
    ".DDDBBBBBBBBBBBBBBB.",
    "..DDBBBBBBBBBBBBBB..",
    "....BBBBBBBBBBBBB...",
    "....BBBBBBBBBBBBB..."
  ];
  const LEGS_A = ["...BBB.......BBB....", "..BB.BB.....BB.BB...", ".BB...DD...DD...BB..", ".DD.........D...DD.."];
  const LEGS_B = ["....BB.BB....BB.BB..", "....BB.BB....BB.BB..", "....DD.DD....DD.DD..", "...................."];
  function rects(rows) {
    let out = "";
    rows.forEach((row, y) => {
      let x = 0;
      while (x < row.length) {
        const c = row[x];
        if (c === ".") { x++; continue; }
        let e = x; while (e < row.length && row[e] === c) e++;
        const fill = c === "B" ? "currentColor" : c === "D" ? "#3a2314" : c === "W" ? "#fff" : "var(--jc)";
        out += `<rect x="${x}" y="${y}" width="${e - x}" height="1" fill="${fill}"/>`;
        x = e;
      }
    });
    return out;
  }
  const SYMBOLS = `<svg class="r-defs" width="0" height="0" aria-hidden="true"><defs>
    <symbol id="rh-a" viewBox="0 0 20 13">${rects(BODY)}${rects(LEGS_A).replace(/y="(\d+)"/g, (_, y) => `y="${+y + 9}"`)}</symbol>
    <symbol id="rh-b" viewBox="0 0 20 13">${rects(BODY)}${rects(LEGS_B).replace(/y="(\d+)"/g, (_, y) => `y="${+y + 9}"`)}</symbol>
    <symbol id="rh-crown" viewBox="0 0 9 6"><path d="M0 6V1l2 2 2.5-3L7 3l2-2v5z" fill="#FFD84D" stroke="#1E1E1E" stroke-width=".8" stroke-linejoin="round"/></symbol>
  </defs></svg>`;

  const HORSE = ["#8B5A2B", "#F386A1", "#E9E9E6", "#555555", "#D9A21B", "#C1354F", "#3B82C4", "#0A8F57", "#9B5DE5", "#FF8C42"];
  const JOCKEY = ["#C1354F", "#3B82C4", "#FFD84D", "#0A8F57", "#9B5DE5", "#FF8C42", "#F386A1", "#1E1E1E", "#E9E9E6", "#4DD0E1"];
  const CROWD = ["#F386A1", "#FFD84D", "#5CE0A8", "#8EC5FF", "#FF8C42", "#C9A6FF", "#E9E9E6"];

  const sig = (ps, n, o) => `${n}|${o.hide}|${o.beamer}|${ps.length > 10}|` + ps.map((p) => p.id).join(",");

  function html(ps, n, o) {
    const crowd = Array.from({ length: 46 }, (_, i) => `<i style="--c:${CROWD[(i * 7 + (i >> 2)) % CROWD.length]};--d:${((i * 37) % 10) / 10}s"></i>`).join("");
    const lanes = ps.map((p) => `
      <div class="lane" data-id="${esc(p.id)}" style="--c:${HORSE[p.i % HORSE.length]};--jc:${JOCKEY[(p.i + 3) % JOCKEY.length]}">
        <div class="plate"><b>${p.i + 1}</b><span>${esc(o.hide ? `SuS ${p.i + 1}` : p.nick)}</span><em class="streak"></em></div>
        <div class="dirt"><div class="gate"></div>${Array.from({ length: Math.max(0, n - 1) }, (_, k) => `<i class="post" style="left:${(((k + 1) / n) * 100).toFixed(2)}%"></i>`).join("")}
          <div class="goal"></div><div class="dots">${Array.from({ length: n }, () => "<i></i>").join("")}</div>
          <div class="runner" style="--p:0">
            <svg class="crown" width="21" height="14"><use href="#rh-crown"/></svg>
            <svg class="horse" viewBox="0 0 20 13" width="60" height="39"><use class="fa" href="#rh-a"/><use class="fb" href="#rh-b"/></svg>
          </div></div>
        <div class="lsc"><span class="num">0</span><small>/${n}</small><span class="place"></span><span class="okc"></span></div>
      </div>`).join("");
    return `<div class="race${ps.length > 10 ? " many" : ""}" id="race" data-sig="${esc(sig(ps, n, o))}">${SYMBOLS}
      <div class="win"><div class="bar"><span class="d"></span><span class="id">RENNBAHN</span><span class="r">Gesamtfortschritt: jede beantwortete Frage bringt ein Stück näher ans Ziel</span></div>
        <div class="stand"><div class="crowd">${crowd}</div></div>
        <div class="r-toasts" aria-live="polite"></div>
        <div class="course">${lanes}</div>
        <div class="grass"></div>
      </div>
      <div class="podium-wrap"><h3 class="section-head podium-title">Spitzenreiter</h3><div class="podium"></div></div></div>`;
  }

  function rank(ps, fin) {
    const fo = (id) => { const k = fin.indexOf(id); return k < 0 ? 1e9 : k; };
    return [...ps].sort((a, b) => b.done - a.done || fo(a.id) - fo(b.id) || b.ok - a.ok || a.i - b.i);
  }
  function el(cls, parent, text) { const e = document.createElement("i"); e.className = cls; if (text) e.textContent = text; parent.appendChild(e); return e; }
  function toast(box, text) {
    const t = document.createElement("div"); t.className = "r-toast"; t.textContent = text;
    const w = box.querySelector(".r-toasts"); w.prepend(t);
    while (w.children.length > 2) w.lastChild.remove();
    setTimeout(() => t.remove(), 3400);
  }
  function confetti(dirt) {
    const cols = ["#F386A1", "#FFD84D", "#5CE0A8", "#8EC5FF", "#FF8C42", "#C9A6FF"];
    for (let k = 0; k < 26; k++) {
      const c = el("conf", dirt);
      c.style.cssText = `--x:${(Math.random() * 120 - 60).toFixed(0)}px;--y:${(-30 - Math.random() * 60).toFixed(0)}px;--r:${(Math.random() * 720 - 360).toFixed(0)}deg;background:${cols[k % cols.length]};animation-delay:${(Math.random() * .15).toFixed(2)}s`;
      setTimeout(() => c.remove(), 1900);
    }
  }
  const PLACE = ["1.", "2.", "3."];

  function update(box, ps, n, o) {
    if (!box) return;
    box.classList.toggle("detail", !!o.detail);
    const S = box._s || (box._s = { prev: {}, ok: {}, fin: [], rank: {}, first: true, run: {} });
    ps.forEach((p) => {
      const lane = box.querySelector(`.lane[data-id="${CSS.escape(p.id)}"]`); if (!lane) return;
      const runner = lane.querySelector(".runner"), dirt = lane.querySelector(".dirt");
      const old = S.ok[p.id] ?? 0;
      runner.style.setProperty("--p", n ? p.done / n : 0);
      lane.querySelector(".num").textContent = p.done;
      lane.querySelector(".okc").textContent = `${p.ok} ✓`;
      lane.querySelectorAll(".dots i").forEach((d, k) => { d.className = p.r[k] === true ? "ok" : p.r[k] === false ? "no" : ""; });
      if (p.done > old && !S.first) {
        runner.classList.add("run"); clearTimeout(S.run[p.id]);
        S.run[p.id] = setTimeout(() => runner.classList.remove("run"), 1150);
        for (let k = 0; k < 4; k++) { const d = el("dust", dirt); d.style.left = `calc(${n ? old / n : 0} * (100% - var(--w) - 22px) + 12px + ${k * 6}px)`; d.style.animationDelay = `${k * .07}s`; setTimeout(() => d.remove(), 1100); }
        el("pop", runner, "+1").style.animationDelay = ".15s";
        setTimeout(() => runner.querySelector(".pop") && runner.querySelector(".pop").remove(), 1300);
        box.classList.add("cheer"); clearTimeout(box._cheer); box._cheer = setTimeout(() => box.classList.remove("cheer"), 1400);
      }
      S.ok[p.id] = p.done;
      if (p.done === n && n > 0 && !S.fin.includes(p.id)) {
        S.fin.push(p.id); lane.classList.add("win");
        if (!S.first) { confetti(dirt); toast(box, `${o.hide ? `SuS ${p.i + 1}` : p.nick} ist im Ziel!`); }
      }
      let streak = 0; for (let k = p.r.length - 1; k >= 0; k--) { if (p.r[k] === true) streak++; else if (p.r[k] === false) break; }
      const st = lane.querySelector(".streak"); st.textContent = o.detail && streak >= 3 ? `Serie ${streak}` : "";
    });
    const rk = rank(ps, S.fin), pos = {};
    rk.forEach((p, k) => { pos[p.id] = k; });
    const lead = rk.length && rk[0].done > 0 ? rk[0].id : null;
    ps.forEach((p) => {
      const lane = box.querySelector(`.lane[data-id="${CSS.escape(p.id)}"]`); if (!lane) return;
      lane.classList.toggle("lead", p.id === lead);
      const pl = lane.querySelector(".place"), k = pos[p.id];
      pl.textContent = p.done > 0 && k < 3 ? PLACE[k] : ""; pl.dataset.k = k;
    });
    /* Überholt? */
    if (!S.first) {
      let said = false;
      for (const p of rk) {
        if (said || p.done === 0) continue;
        const a = S.rank[p.id]; if (a === undefined || pos[p.id] >= a) continue;
        const passed = rk.find((q) => q.id !== p.id && S.rank[q.id] !== undefined && S.rank[q.id] < a && pos[q.id] > pos[p.id] && q.done > 0);
        if (passed) {
          const nm = (x) => (o.hide ? `SuS ${x.i + 1}` : x.nick);
          toast(box, pos[p.id] === 0 ? `${nm(p)} übernimmt die Spitze!` : `${nm(p)} überholt ${nm(passed)}!`); said = true;
        }
      }
    }
    S.rank = pos; S.first = false;
    /* Podest */
    const pod = box.querySelector(".podium"), top = rk.slice(0, 3).filter((p) => p.done > 0);
    box.querySelector(".podium-title").textContent = o.closed ? "Siegerehrung" : "Spitzenreiter";
    box.querySelector(".podium-wrap").style.display = top.length ? "" : "none";
    const order = [1, 0, 2];
    pod.innerHTML = order.map((k) => { const p = top[k]; return p
      ? `<div class="step s${k + 1}"><span class="who" style="--c:${HORSE[p.i % HORSE.length]}">${esc(o.hide ? `SuS ${p.i + 1}` : p.nick)}</span><span class="pts">${p.done} von ${n}${o.detail ? ` · ${p.ok} richtig` : ""}</span><div class="blk"><b>${k + 1}</b></div></div>`
      : `<div class="step s${k + 1} none"><div class="blk"><b>${k + 1}</b></div></div>`; }).join("");
  }

  window.QuizRace = { html, update, sig };
})();
