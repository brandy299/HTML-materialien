/* ============================================================
   LERNRAUM — Startseite
   Liest die Kurse direkt aus der App (app/index.html → app/kurse/*.js),
   damit neue Kurse hier automatisch erscheinen.
   ============================================================ */
(async () => {
  "use strict";

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const load = (src) => new Promise((res) => { const s = document.createElement("script"); s.src = src; s.onload = s.onerror = res; document.head.append(s); });
  const base = location.origin + location.pathname.replace(/[^/]*$/, "");
  const appUrl = (hash = "") => base + "app/" + hash;

  const cloud = document.getElementById("cloud");
  drawCloud(cloud);
  let rt;
  addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => drawCloud(cloud), 200); });

  // 1. Basis + alle Kurse in der Reihenfolge aus app/index.html laden
  await load("app/content.js");
  let files = [];
  try {
    const html = await (await fetch("app/index.html", { cache: "no-cache" })).text();
    files = [...html.matchAll(/<script src="(kurse\/[^"]+)"/g)].map((m) => "app/" + m[1]);
  } catch { /* offline */ }
  for (const f of files) await load(f);
  await load("app/vendor/qrcode.js");

  const DATA = window.LERNRAUM || { subjects: [] };
  const courses = DATA.subjects.filter((s) => !s.materials);
  const fachName = (f) => (DATA.faecher && DATA.faecher[f]) || f;
  const topicsOf = (c) => c.topics.filter((t) => (t.steps && t.steps.length) || t.drill);
  let progress = {};
  try { progress = JSON.parse(localStorage.getItem("lernraum.progress") || "{}"); } catch { /* privat */ }
  // Datums-Helfer für die Kuratierung (Felder added / updated / klausur in den Kursdateien)
  const today = new Date(new Date().toISOString().slice(0, 10));
  const daysSince = (d) => (d ? Math.round((today - new Date(d)) / 864e5) : Infinity);
  const daysUntil = (d) => (d ? Math.round((new Date(d) - today) / 864e5) : -Infinity);
  const fresh = (c) => Math.min(daysSince(c.added), daysSince(c.updated));
  const badge = (c) => (daysSince(c.added) <= 14 ? "Neu" : daysSince(c.updated) <= 7 ? "Aktualisiert" : "");
  const doneTopic = (c, t) => { const p = progress[c.id + "/" + t.id]; return !!(p && t.steps.length && Object.keys(p.done || {}).length >= t.steps.length); };

  document.getElementById("school").textContent = `${DATA.school || ""} · Unterrichtsmaterial als Lern-App`;

  // 2. Zahlen
  const fachs = [...new Set(courses.map((c) => c.fach))];
  const nTopics = courses.reduce((a, c) => a + topicsOf(c).length, 0);
  document.getElementById("stats").innerHTML = [
    [fachs.length, fachs.length === 1 ? "Fach" : "Fächer"],
    [courses.length, courses.length === 1 ? "Kurs" : "Kurse"],
    [nTopics, "Themen & Übungen"],
    [0, "Logins nötig"]
  ].map(([v, k]) => `<div class="stat"><div class="v">${v}</div><div class="k">${k}</div></div>`).join("");

  // 3. Neuigkeiten-Fenster im Hero: neuester Kurs (zuletzt eingetragen) + Klausur-Hinweis
  const news = document.getElementById("news");
  // Klausur-Countdown: nächster Kurs mit Klausurtermin in den kommenden 21 Tagen
  const soon = courses.filter((c) => daysUntil(c.klausur) >= 0 && daysUntil(c.klausur) <= 21).sort((a, b) => daysUntil(a.klausur) - daysUntil(b.klausur))[0];
  if (soon) {
    const n = daysUntil(soon.klausur);
    const ex = soon.topics.find((t) => t.exam);
    news.append(h(`<div class="win"><div class="bar"><span class="d"></span>Klausur · ${esc(soon.course || soon.fach)}<span class="r">${new Date(soon.klausur).toLocaleDateString("de-DE")}</span></div>
      <div class="body"><p class="kick">${n === 0 ? "Heute ist Klausur" : n === 1 ? "Klausur ist morgen" : `Noch ${n} Tage`}</p><p class="say">${esc(soon.name)}</p>
      <a class="btn" href="${appUrl(ex ? `#/f/${soon.id}/${ex.id}` : "#/f/" + soon.id)}">${ex ? "Probe-Klausur starten" : "Jetzt üben"} →</a></div></div>`));
  }
  // „Neu“: zuletzt veröffentlichter oder aktualisierter Kurs
  const newest = [...courses].sort((a, b) => fresh(a) - fresh(b))[0];
  if (newest) {
    news.append(h(`<div class="win"><div class="bar"><span class="d"></span>${badge(newest) || "Zuletzt"} · ${esc(newest.fach)}<span class="r">${esc(newest.course || "")}</span></div>
      <div class="body"><p class="kick">${badge(newest) === "Aktualisiert" ? "Neue Inhalte" : "Jetzt online"}</p><p class="say">${esc(newest.name)}</p>
      <p class="sub">${esc(topicsOf(newest).map((t) => t.title).slice(0, 3).join(" · "))}</p>
      <a class="btn" href="${appUrl("#/f/" + newest.id)}">Kurs öffnen →</a></div></div>`));
  }
  const exam = courses.flatMap((c) => c.topics.filter((t) => t.exam).map((t) => [c, t]))[0];
  if (exam && !soon) {
    news.append(h(`<div class="win"><div class="bar"><span class="d"></span>Klausurtraining<span class="r">${exam[1].exam.minutes} min</span></div>
      <div class="body"><p class="kick">${esc(exam[1].title)}</p><p class="sub">Timer · Punkte · Note · Erwartungshorizont</p>
      <a class="u-link" href="${appUrl(`#/f/${exam[0].id}/${exam[1].id}`)}">Probe-Klausur starten →</a></div></div>`));
  }

  // 4. Kurse, gruppiert nach Fach
  const box = document.getElementById("courses");
  box.innerHTML = courses.length ? "" : `<p class="hint">Noch keine Kurse online.</p>`;
  // Reihenfolge: neueste Kurse zuerst
  [...courses].sort((a, b) => fresh(a) - fresh(b) || (a.fach || "").localeCompare(b.fach || "", "de")).forEach((c) => {
    const tops = topicsOf(c);
    const done = tops.filter((t) => doneTopic(c, t)).length;
    const el = h(`<article class="win l-course">
      <div class="bar"><span class="d"></span>${esc(c.course || c.fach)}${badge(c) ? ` <span class="l-badge">${badge(c)}</span>` : ""}<span class="r">${daysUntil(c.klausur) >= 0 ? `Klausur ${new Date(c.klausur).toLocaleDateString("de-DE")} · ` : ""}${tops.length} Themen${done ? ` · ${done} erledigt` : ""}</span></div>
      <div class="body">
        <p class="l-fach">${esc(c.fach)}${fachName(c.fach) !== c.fach ? " · " + esc(fachName(c.fach)) : ""}</p>
        <h3 class="l-c-title">${esc(c.name)}</h3>
        <p class="l-c-desc">${esc(c.description || "")}</p>
        <ul class="l-topics">${tops.map((t, k) => `<li><a href="${appUrl(`#/f/${c.id}/${t.id}`)}">
          <span class="n ${doneTopic(c, t) ? "done" : ""}">${doneTopic(c, t) ? "✓" : String(k + 1).padStart(2, "0")}</span>
          <span>${esc(t.title)}</span><span class="k">${esc(t.exam ? "Klausur" : t.drill ? "Training" : t.kicker || "")}</span></a></li>`).join("")}</ul>
        <div class="l-actions">
          <a class="btn" href="${appUrl("#/f/" + c.id)}">Kurs öffnen →</a>
          <button class="icon-btn" type="button" aria-label="QR-Code für ${esc(c.name)}">
            <svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z"/></svg></button>
        </div>
      </div></article>`);
    el.querySelector(".icon-btn").onclick = () => openQR(c.name, appUrl("#/f/" + c.id), c.course || c.fach);
    box.append(el);
  });

  /* QR-Fenster (nutzt die Stile der App) */
  function openQR(title, url, sub) {
    let svg = "";
    if (typeof qrcode === "function") { const q = qrcode(0, "M"); q.addData(url); q.make(); svg = q.createSvgTag({ cellSize: 8, margin: 2, scalable: true, alt: "QR-Code" }); }
    const back = h(`<div class="sheet-back"><div class="sheet win" role="dialog" aria-modal="true" aria-label="QR-Code">
      <div class="bar"><span class="d"></span>QR-Code<button class="r sheet-x" aria-label="Schließen">✕ schließen</button></div>
      <div class="sheet-body qr-sheet"><div class="qr-box">${svg}</div>
        <p class="eyebrow" style="margin-top:14px">${esc(sub)}</p><p class="h2" style="margin-top:6px">${esc(title)}</p>
        <p class="qr-url">${esc(url)}</p></div></div></div>`);
    const close = () => { back.remove(); document.removeEventListener("keydown", onEsc); };
    const onEsc = (e) => { if (e.key === "Escape") close(); };
    back.addEventListener("click", (e) => { if (e.target === back) close(); });
    back.querySelector(".sheet-x").onclick = close;
    document.addEventListener("keydown", onEsc);
    document.body.append(back);
    back.querySelector(".sheet-x").focus();
  }

  /* Gerasterte Pixelwolke wie in der App (Bayer 8×8) */
  function drawCloud(canvas) {
    // Pixelraster passend zum Seitenverhältnis des Hero-Bereichs, damit nichts verzerrt
    const box = canvas.getBoundingClientRect();
    const W = box.width < 700 ? 90 : 170, H = Math.max(40, Math.round(W * (box.height || 600) / (box.width || 400))), g = canvas.getContext("2d");
    canvas.width = W; canvas.height = H;
    const pal = [[254, 254, 254], [251, 219, 229], [248, 176, 201], [243, 134, 161], [221, 109, 181], [212, 91, 182]];
    const B = [[0, 32, 8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26], [12, 44, 4, 36, 14, 46, 6, 38], [60, 28, 52, 20, 62, 30, 54, 22],
      [3, 35, 11, 43, 1, 33, 9, 41], [51, 19, 59, 27, 49, 17, 57, 25], [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21]];
    const blobs = [{ x: .08, y: .3, r: .42, a: 1 }, { x: .3, y: .05, r: .35, a: .8 }, { x: .92, y: .25, r: .45, a: 1 },
      { x: .75, y: .75, r: .38, a: .8 }, { x: .12, y: .85, r: .4, a: .7 }, { x: .55, y: .95, r: .3, a: .5 }];
    const img = g.createImageData(W, H), L = pal.length;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let d = 0;
      for (const b of blobs) { const dx = x / W - b.x, dy = (y / H - b.y) * (H / W), dd = Math.sqrt(dx * dx + dy * dy) / b.r; d += b.a * Math.max(0, 1 - dd * dd); }
      d += .07 * Math.sin(x * .23) * Math.cos(y * .31);
      d = Math.min(1, Math.max(0, d / 1.5));
      const lvl = Math.min(L - 1, Math.max(0, Math.round(d * (L - 1) + (B[y & 7][x & 7] / 64 - .5))));
      const c = pal[lvl], i = (y * W + x) * 4;
      img.data[i] = c[0]; img.data[i + 1] = c[1]; img.data[i + 2] = c[2]; img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
  }
})();
