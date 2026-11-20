/* ============================================================
   LERNRAUM · Live-Quiz – Rennbahn (Lehreransicht)
   Gezeichnete Pferde (Pixel-Grafik als SVG), Sandbahn mit Startboxen und Zielflagge,
   Tribüne, Siegerpodest, Staub, Konfetti, Überhol-Meldungen.
   Strecke = richtige Antworten (+ Aufholbonus); falsche Antworten bewegen das Pferd nicht, mit o.detail zeigen Punkte richtig/falsch. Wird von quiz.js benutzt: QuizRace.html / QuizRace.update
   ============================================================ */
(() => {
  "use strict";
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* Pferd mit Reiter im Galopp, 36 × 28 Pixel, zwei Bilder (gestreckt / gesammelt).
     B Fell (Farbe der Bahn), S/F Schatten, L Licht, D Mähne/Schweif/Hufe, M Maul, W/E Auge, K Haut, G Satteldecke, T Stiefel,
     J Jacke und H Helm (Farbe des Reiters) */
  const FRAME_A = ["..................HHHH.....DDB......", "..................HJJH.....DDB......", "..................HHHHH..DDDBBBB....", "..................KKKKHHDDDBBBBB....", "..................KKKKKDDDBBBBBBB...", "..............JJJJJKKKDDDDBBBBWEB...", ".............JJJJJJJJDDDDBBBBBBEBB..", ".......BBBBBJJJJJJJJJJJJBBBBBBBBBBB.", "......BBBBBJJJJJJJJBDJJJKBBB..BBBMM.", "...DDBBLLLLBGJTTGGBBLDLJKBBB...BMME.", ".DDDBBLLLLLLGGTTTGBLLLLLBBB.........", "DDDDBBBLLLLBBBBTTBBBLLLBBB..........", "DDDDBBBBBBBBBBBTTTBBBBBBBB..........", "DDDDSBBBBBBBBBBBTTBBBBBBBS..........", "DDD..SBBBBBBBBBBTTBBBBBBB...........", "DD....SBBSBBSSSSSSSSBBBBB...........", "DD.....SSBBBSSSSSS.SBBBBBF..........", "......FFBBBB.........BBBBBF.FDD.....", ".....FFBBBB...........BBBBBBFDDDD...", "....FFBBBB..............BBBBBDDDD...", "...FFFBBB...................BDDDD...", "..FFFBBB.......................DD...", ".DDFBBB.............................", "DDDDDB..............................", "DD.DD...............................", "D.DD................................", "..DD................................", "...................................."];
  const FRAME_B = ["..................HHHH.....DDB......", "..................HJJH.....DDB......", "..................HHHHH..DDDBBBB....", "..................KKKKHHDDDBBBBB....", "..................KKKKKDDDBBBBBBB...", "..............JJJJJKKKDDDDBBBBWEB...", ".............JJJJJJJJDDDDBBBBBBEBB..", ".......BBBBBJJJJJJJJJJJJBBBBBBBBBBB.", "......BBBBBJJJJJJJJBDJJJKBBB..BBBMM.", "...DDBBLLLLBGJTTGGBBLDLJKBBB...BMME.", ".DDDBBLLLLLLGGTTTGBLLLLLBBB.........", "DDDDBBBLLLLBBBBTTBBBLLLBBB..........", "DDDDBBBBBBBBBBBTTTBBBBBBBB..........", "DDDDSBBBBBBBBBBBTTBBBBBBBS..........", "DDD..SBBBBBBBBBBTTBBBBBBB...........", "DD....SSSBBBBSSSSSSBBBBBS...........", "DD.....SSSSBBBSSSS.BBBSS............", ".........FFBBB.....BBBBF............", ".........FFFBBB.....BBBF............", ".........FFFBBB......BBF............", "..........FF.BB......FBB............", "..........FFFBBB.....DDDD...........", "...........DD.DD.....DDDD...........", "...........DD.DD.....DDDD...........", "...........DD.DD.....DDDD...........", "............D.DD......DDD...........", "...............D........D...........", "...................................."];
  /* Zuschauer, 11 × 9 Pixel: Haare (--hr), Haut (--sk), Shirt (--c); A = Arme unten, B = Arme hoch (jubeln) */
  const FAN_A = ["...HHHHH...", "..HKKKKKH..", "..HKKKKKH..", "...KKKKK...", "..SSSSSSS..", ".KSSSSSSSK.", ".KSSSSSSSK.", "..SSSSSSS..", "..SSSSSSS.."];
  const FAN_B = ["K..HHHHH..K", "K.HKKKKKH.K", "S.HKKKKKH.S", "S..KKKKK..S", "SSSSSSSSSSS", ".SSSSSSSSS.", ".SSSSSSSSS.", "..SSSSSSS..", "..SSSSSSS.."];
  const FAN_PAL = { H: "var(--hr)", K: "var(--sk)", S: "var(--c)" };
  const fanRects = (rows) => rows.map((row, y) => row.split("").map((c, x) => c === "." ? "" : `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${FAN_PAL[c]}"/>`).join("")).join("");
  const MIX = (c, pct, to) => `color-mix(in srgb, ${c} ${pct}%, ${to})`;
  const PAL = {
    B: ["currentColor"], S: ["currentColor", MIX("currentColor", 72, "#000")], F: ["currentColor", MIX("currentColor", 50, "#000")],
    L: ["currentColor", MIX("currentColor", 78, "#fff")], D: ["#2e1b0e"], M: ["#e0bf94"], W: ["#fff"], E: ["#111"],
    K: ["#f2c9a0"], G: ["#fff"], T: ["#222"], J: ["var(--jc)"], H: ["var(--jc)", MIX("var(--jc)", 70, "#000")]
  };
  function rects(rows) {
    let out = "";
    rows.forEach((row, y) => {
      let x = 0;
      while (x < row.length) {
        const c = row[x];
        if (c === ".") { x++; continue; }
        let e = x; while (e < row.length && row[e] === c) e++;
        const p = PAL[c] || ["#f0f"];
        out += `<rect x="${x}" y="${y}" width="${e - x}" height="1.02" fill="${p[0]}"${p[1] ? ` style="fill:${p[1]}"` : ""}/>`;
        x = e;
      }
    });
    return out;
  }
  const SYMBOLS = `<svg class="r-defs" width="0" height="0" aria-hidden="true"><defs>
    <symbol id="rh-a" viewBox="0 0 36 28">${rects(FRAME_A)}</symbol>
    <symbol id="rh-b" viewBox="0 0 36 28">${rects(FRAME_B)}</symbol>
    <symbol id="fan-a" viewBox="0 0 11 9">${fanRects(FAN_A)}</symbol>
    <symbol id="fan-b" viewBox="0 0 11 9">${fanRects(FAN_B)}</symbol>
    <symbol id="rh-crown" viewBox="0 0 9 6"><path d="M0 6V1l2 2 2.5-3L7 3l2-2v5z" fill="#FFD84D" stroke="#1E1E1E" stroke-width=".8" stroke-linejoin="round"/></symbol>
  </defs></svg>`;

  const HORSE = ["#8B5A2B", "#F386A1", "#E9E9E6", "#555555", "#D9A21B", "#C1354F", "#3B82C4", "#0A8F57", "#9B5DE5", "#FF8C42"];
  const JOCKEY = ["#C1354F", "#3B82C4", "#FFD84D", "#0A8F57", "#9B5DE5", "#FF8C42", "#F386A1", "#1E1E1E", "#E9E9E6", "#4DD0E1"];

  const stp = (p) => p.ok + (p.bn || 0);   /* Schritte = richtige Antworten + Aufholbonus (falsche Antworten bewegen nicht) */
  const sig = (ps, n, o) => `${n}|${o.hide}|${o.beamer}|${ps.length > 10}|` + ps.map((p) => p.id).join(",");

  function html(ps, n, o) {
    const SHIRT = ["#F386A1", "#FFD84D", "#5CE0A8", "#8EC5FF", "#FF8C42", "#C9A6FF", "#E9E9E6", "#C1354F"], HAIR = ["#2e1b0e", "#6b4220", "#d9a21b", "#111", "#b5532a", "#e9e9e6"], SKIN = ["#f2c9a0", "#e0ac7e", "#c68a5b", "#8d5a3b", "#6b4228"];
    const fan = (i, back) => `<span class="fan${back ? " back" : ""}" style="--c:${SHIRT[(i * 5 + (back ? 3 : 0)) % SHIRT.length]};--hr:${HAIR[(i * 7 + 2) % HAIR.length]};--sk:${SKIN[(i * 3 + (back ? 1 : 0)) % SKIN.length]};--d:${((i * 37) % 10) / 10}s"><svg viewBox="0 0 11 9"><use class="fa" href="#fan-a"/><use class="fb" href="#fan-b"/></svg></span>`;
    const crowd = `<div class="row back">${Array.from({ length: 12 }, (_, i) => fan(i + 20, true)).join("")}</div><div class="row">${Array.from({ length: 12 }, (_, i) => fan(i, false)).join("")}</div>`;
    const lanes = ps.map((p) => `
      <div class="lane${o.me && String(o.me) === String(p.id) ? " me" : ""}" data-id="${esc(p.id)}" style="--c:${HORSE[p.i % HORSE.length]};--jc:${JOCKEY[(p.i + 3) % JOCKEY.length]}">
        <div class="plate"><b>${p.i + 1}</b><span>${esc(o.hide ? `SuS ${p.i + 1}` : p.nick)}</span><em class="streak"></em></div>
        <div class="dirt"><div class="gate"></div>${Array.from({ length: Math.max(0, n - 1) }, (_, k) => `<i class="post" style="left:${(((k + 1) / n) * 100).toFixed(2)}%"></i>`).join("")}
          <div class="goal"></div><div class="dots">${Array.from({ length: n }, () => "<i></i>").join("")}</div>
          <div class="runner" style="--p:0">
            <svg class="crown" width="21" height="14"><use href="#rh-crown"/></svg>
            <svg class="horse" viewBox="0 0 36 28" width="59" height="46"><use class="fa" href="#rh-a"/><use class="fb" href="#rh-b"/></svg>
          </div></div>
        <div class="lsc"><span class="num">0</span><small>/${n}</small><span class="place"></span><span class="okc"></span></div>
      </div>`).join("");
    return `<div class="race${ps.length > 10 ? " many" : ""}${o.watch ? " watch" : ""}" id="race" data-sig="${esc(sig(ps, n, o))}">${SYMBOLS}
      <div class="win"><div class="bar"><span class="d"></span><span class="id">RENNBAHN</span><span class="r">Jede richtige Antwort bringt ein Stück näher ans Ziel</span></div>
        <div class="stand"><div class="crowd">${crowd}</div></div>
        <div class="r-toasts" aria-live="polite"></div>
        <div class="course">${lanes}</div>
        <div class="grass"></div>
      </div>
      <div class="podium-wrap"><h3 class="section-head podium-title">Spitzenreiter</h3><div class="podium"></div></div></div>`;
  }

  function rank(ps, fin) {
    const fo = (id) => { const k = fin.indexOf(id); return k < 0 ? 1e9 : k; };
    return [...ps].sort((a, b) => stp(b) - stp(a) || fo(a.id) - fo(b.id) || b.ok - a.ok || a.i - b.i);
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
      const steps = stp(p);
      runner.style.setProperty("--p", n ? Math.min(1, steps / n) : 0);
      lane.querySelector(".num").textContent = steps;
      lane.querySelector(".okc").textContent = `${p.ok} ✓`;
      lane.querySelectorAll(".dots i").forEach((d, k) => { d.className = p.r[k] === true ? "ok" : p.r[k] === false ? "no" : ""; });
      if (steps > old && !S.first) {
        const inc = steps - old;
        runner.classList.add("run"); clearTimeout(S.run[p.id]);
        S.run[p.id] = setTimeout(() => runner.classList.remove("run"), 1150);
        for (let k = 0; k < 4; k++) { const d = el("dust", dirt); d.style.left = `calc(${n ? old / n : 0} * (100% - var(--w) - 22px) + 12px + ${k * 6}px)`; d.style.animationDelay = `${k * .07}s`; setTimeout(() => d.remove(), 1100); }
        const pop = el("pop", runner, inc > 1 ? `TURBO +${inc}` : "+1"); pop.style.animationDelay = ".15s"; if (inc > 1) { pop.classList.add("turbo"); runner.classList.add("boost"); setTimeout(() => runner.classList.remove("boost"), 1500); toast(box, `${o.hide ? `SuS ${p.i + 1}` : p.nick} holt auf: Aufholbonus!`); }
        setTimeout(() => runner.querySelector(".pop") && runner.querySelector(".pop").remove(), 1300);
        box.classList.add("cheer"); clearTimeout(box._cheer); box._cheer = setTimeout(() => box.classList.remove("cheer"), 1400);
      }
      S.ok[p.id] = steps;
      if (steps >= n && n > 0 && !S.fin.includes(p.id)) {
        S.fin.push(p.id); lane.classList.add("win");
        if (!S.first) { confetti(dirt); toast(box, `${o.hide ? `SuS ${p.i + 1}` : p.nick} ist im Ziel!`); }
      }
      let streak = 0; for (let k = p.r.length - 1; k >= 0; k--) { if (p.r[k] === true) streak++; else if (p.r[k] === false) break; }
      const st = lane.querySelector(".streak"); st.textContent = o.detail && streak >= 3 ? `Serie ${streak}` : "";
    });
    const rk = rank(ps, S.fin), pos = {};
    rk.forEach((p, k) => { pos[p.id] = k; });
    const lead = rk.length && stp(rk[0]) > 0 ? rk[0].id : null;
    ps.forEach((p) => {
      const lane = box.querySelector(`.lane[data-id="${CSS.escape(p.id)}"]`); if (!lane) return;
      lane.classList.toggle("lead", p.id === lead);
      const pl = lane.querySelector(".place"), k = pos[p.id];
      pl.textContent = stp(p) > 0 && k < 3 ? PLACE[k] : ""; pl.dataset.k = k;
    });
    /* Überholt? */
    if (!S.first) {
      let said = false;
      for (const p of rk) {
        if (said || stp(p) === 0) continue;
        const a = S.rank[p.id]; if (a === undefined || pos[p.id] >= a) continue;
        const passed = rk.find((q) => q.id !== p.id && S.rank[q.id] !== undefined && S.rank[q.id] < a && pos[q.id] > pos[p.id] && stp(q) > 0);
        if (passed) {
          const nm = (x) => (o.hide ? `SuS ${x.i + 1}` : x.nick);
          toast(box, pos[p.id] === 0 ? `${nm(p)} übernimmt die Spitze!` : `${nm(p)} überholt ${nm(passed)}!`); said = true;
        }
      }
    }
    S.rank = pos; S.first = false;
    /* Podest */
    const pod = box.querySelector(".podium"), top = rk.slice(0, 3).filter((p) => stp(p) > 0);
    box.querySelector(".podium-title").textContent = o.closed ? "Siegerehrung" : "Spitzenreiter";
    box.querySelector(".podium-wrap").style.display = top.length ? "" : "none";
    const order = [1, 0, 2];
    pod.innerHTML = order.map((k) => { const p = top[k]; return p
      ? `<div class="step s${k + 1}"><span class="who" style="--c:${HORSE[p.i % HORSE.length]}">${esc(o.hide ? `SuS ${p.i + 1}` : p.nick)}</span><span class="pts">${o.bonus ? `${stp(p)} Punkte` : `${p.ok} von ${n} richtig`}</span><div class="blk"><b>${k + 1}</b></div></div>`
      : `<div class="step s${k + 1} none"><div class="blk"><b>${k + 1}</b></div></div>`; }).join("");
  }

  window.QuizRace = { html, update, sig };
})();
