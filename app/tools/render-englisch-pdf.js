#!/usr/bin/env node
/* Arbeitsblätter (PDF) für Tafeln des Englisch-Hubs erzeugen: Vokabelblatt + Übungsblatt (ohne Lösungen).
   Aufruf:  NODE_PATH=<playwright> node app/tools/render-englisch-pdf.js <Tafelnummer> [weitere …]      z. B.  … 4 5 6
   Liest die Inhalte aus englisch/index.html (UNITS), schreibt englisch/downloads/FE_U<N>_<Titel>_Vocab.pdf und _Practice.pdf.
   Danach in UNITS an der Tafel eintragen:  pdfs:[["Vokabeln","downloads/…_Vocab.pdf"],["Übungen","downloads/…_Practice.pdf"]]
   Eigenständiges Produkt: nutzt nur Schriften und Gestaltung des Hubs (englisch/DESIGN.md), keine Lernraum-App-Dateien. */
"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..", "..", "englisch");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const a = html.indexOf("const UNITS = ["), b = html.indexOf("\nconst esc =");
const UNITS = vm.runInNewContext("(" + html.slice(a + "const UNITS = ".length, b).trim().replace(/;$/, "") + ")");
const esc = (s) => String(s).replace(/&amp;/g, "&").replace(/<[^>]+>/g, "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
// feste „Zufallsreihenfolge“ (immer gleich, damit das Blatt reproduzierbar ist)
const mix = (arr, seed) => { const x = arr.slice(); let s = seed * 9301 + 49297; for (let i = x.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };
const slug = (t) => String(t).replace(/&amp;/g, " and ").replace(/<[^>]+>/g, "").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");

const CSS = `
@page{size:A4; margin:16mm 16mm 18mm}
*{box-sizing:border-box}
body{margin:0; font-family:"Be Vietnam Pro",system-ui,sans-serif; font-size:11pt; line-height:1.5; color:#23201A}
h1{font-family:"IM Fell English",Georgia,serif; font-weight:400; color:#23402B; font-size:24pt; margin:0; line-height:1.05}
.kick{font-family:"IM Fell English",Georgia,serif; font-style:italic; color:#8A5A14; font-size:12pt}
.sub{color:#6A5F49; font-style:italic; margin:.1rem 0 .4rem}
.rule{border-top:1.6px solid #23201A; margin:.5rem 0 1rem; position:relative} .rule::after{content:""; display:block; border-top:.6px solid #23201A; margin-top:2px}
h2{font-size:8.5pt; letter-spacing:.18em; text-transform:uppercase; color:#8A5A14; margin:1.3rem 0 .45rem; padding-bottom:.2rem; border-bottom:.6px solid #B4A47E}
.lead{color:#6A5F49; margin:0 0 .5rem}
table{width:100%; border-collapse:collapse}
th{text-align:left; font-size:8pt; letter-spacing:.14em; text-transform:uppercase; color:#6A5F49; border-bottom:1.2px solid #23201A; padding:.2rem .4rem .3rem 0}
td{padding:.32rem .4rem .32rem 0; border-bottom:.5px solid #C9BC9C; vertical-align:top}
td.en{font-weight:600; color:#23402B} td.n{color:#B4A47E; width:9mm; font-size:9pt} td.vi{color:#8A5A14}
.cols{display:grid; grid-template-columns:1fr 1fr; gap:0 12mm}
.row{padding:.35rem 0; border-bottom:.5px solid #C9BC9C; display:flex; gap:.5rem; align-items:baseline; break-inside:avoid}
.row .n{font-family:"IM Fell English",Georgia,serif; color:#8A5A14; min-width:6mm}
.gapl{display:inline-block; border-bottom:1px solid #23201A; min-width:26mm; height:1.1em; vertical-align:baseline}
.line{border-bottom:1px solid #23201A; height:1.7em; margin-top:.2rem}
.bank,.words{display:flex; flex-wrap:wrap; gap:.3rem .45rem; margin:.2rem 0 .7rem}
.bank span,.words span{border:.8px solid #B4A47E; padding:.12rem .55rem; border-radius:2px}
.box{display:inline-block; width:3.4mm; height:3.4mm; border:.9px solid #23201A; margin-right:.45rem; vertical-align:-.5mm}
.opt{margin:.12rem 0 .12rem 6mm} .q{margin:.55rem 0 .1rem; font-weight:600; break-inside:avoid}
.sorttab td.c{text-align:center; width:30mm}
.foot{position:fixed; bottom:0; left:0; right:0; font-size:8pt; color:#6A5F49; display:flex; justify-content:space-between}
.name{margin-top:.2rem; color:#6A5F49}
`;
const head = (u, what) => `<div class="kick">${esc(u.no)} · ${what}</div><h1>${esc(u.title)}</h1><p class="sub">${esc(u.de)}</p><div class="rule"></div>`;
const foot = (u) => `<div class="foot"><span>English for Beginners · A Field Guide to Everyday English</span><span>HBBK Oberhausen · Förderkurs Englisch</span></div>`;

function vocabDoc(u) {
  return `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="FONTS"><style>${CSS}</style>${head(u, "Vocabulary · Vokabeln")}
  <p class="lead">${esc(u.explain[0])}</p>
  <h2>Specimens · Vokabeln</h2>
  <table><thead><tr><th></th><th>English</th><th>Deutsch</th><th>Tiếng Việt</th></tr></thead><tbody>
  ${u.vocab.map(([en, de, vi], i) => `<tr><td class="n">${String(i + 1).padStart(2, "0")}</td><td class="en" lang="en">${esc(en)}</td><td>${esc(de)}</td><td class="vi" lang="vi">${esc(vi)}</td></tr>`).join("")}
  </tbody></table>
  <h2>My own words · Meine Wörter</h2>
  ${[1, 2, 3, 4, 5].map(() => `<div class="line"></div>`).join("")}
  ${foot(u)}`;
}

function exDoc(ex, ui, ei) {
  // Auf Papier wird nicht getippt: Anleitung je Übungstyp für den Druck
  const PRINT_LEAD = { match: "Welches deutsche Wort gehört zu welchem englischen Wort? Schreibe den Buchstaben neben die Nummer.", order: "Bringe die Wörter in die richtige Reihenfolge und schreibe den Satz auf.", spot: "Kreuze den Satz an, der einen Fehler hat, und schreibe ihn richtig auf.", sort: "Kreuze für jede Zeile die richtige Spalte an.", quiz: "Kreuze die richtige Antwort an." };
  const lead = PRINT_LEAD[ex.type] || (ex.lead || "").replace(/^Tippe/, "Wähle");
  const T = `<h2>Exercise ${ex.n} · ${esc(ex.title)}</h2>${lead ? `<p class="lead">${esc(lead)}</p>` : ""}`;
  if (ex.type === "match") {
    const right = mix(ex.pairs.map((p) => p[1]), ui * 7 + ei);
    return T + `<div class="cols"><div>${ex.pairs.map((p, i) => `<div class="row"><span class="n">${i + 1}</span><span lang="en">${esc(p[0])}</span><span class="gapl" style="min-width:10mm; margin-left:auto"></span></div>`).join("")}</div>
      <div>${right.map((d, i) => `<div class="row"><span class="n">${"ABCDEFGHIJ"[i]}</span><span>${esc(d)}</span></div>`).join("")}</div></div>`;
  }
  if (ex.type === "cloze") {
    return T + (ex.bank ? `<div class="bank" lang="en">${mix(ex.bank, ui + ei).map((w) => `<span>${esc(w)}</span>`).join("")}</div>` : "") +
      ex.items.map((it, i) => `<div class="row"><span class="n">${i + 1}</span><span lang="en">${esc(it.b)}<span class="gapl"></span>${esc(it.af)}</span></div>`).join("");
  }
  if (ex.type === "order") {
    return T + `<div class="words" lang="en">${mix(ex.answer.split(" "), ui * 3 + ei).map((w) => `<span>${esc(w)}</span>`).join("")}</div><div class="line"></div><div class="line"></div>`;
  }
  if (ex.type === "spot") {
    return T + ex.sentences.map((s, i) => `<div class="row"><span class="n"><span class="box"></span></span><span lang="en">${esc(s)}</span></div>`).join("") +
      `<div class="line"></div>`;
  }
  if (ex.type === "sort") {
    return T + `<table class="sorttab"><thead><tr><th></th>${ex.cats.map((c) => `<th class="c">${esc(c)}</th>`).join("")}</tr></thead><tbody>
      ${ex.items.map((it) => `<tr><td lang="en">${esc(it[0])}</td>${ex.cats.map(() => `<td class="c"><span class="box" style="margin:0"></span></td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }
  if (ex.type === "quiz") {
    return T + ex.items.map((q, i) => `<div class="q"><span lang="en">${i + 1}. ${esc(q.q)}</span></div>${q.o.map((o) => `<div class="opt" lang="en"><span class="box"></span>${esc(o)}</div>`).join("")}`).join("");
  }
  return "";
}
function practiceDoc(u, ui) {
  return `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="FONTS"><style>${CSS}</style>${head(u, "Practice · Übungen")}<p class="name">Name: ______________________________ &nbsp;&nbsp; Date: ______________</p>
  ${u.exercises.map((ex, ei) => exDoc(ex, ui, ei)).join("")}${foot(u)}`;
}

(async () => {
  const nums = process.argv.slice(2).map(Number).filter(Boolean);
  if (!nums.length) { console.log("Aufruf: node app/tools/render-englisch-pdf.js <Tafelnummer …>  (z. B. 4 5 6)"); process.exit(1); }
  let chromium;
  try { ({ chromium } = require("playwright")); } catch (e) { console.log("Playwright fehlt (NODE_PATH setzen, siehe app/VIDEO-ANLEITUNG.md)"); process.exit(1); }
  const browser = await chromium.launch();
  const fontsUrl = "file://" + path.join(ROOT, "fonts", "fonts.css");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "fe-pdf-"));
  for (const n of nums) {
    const u = UNITS[n - 1]; if (!u) { console.log(`Tafel ${n} gibt es nicht`); continue; }
    const base = `FE_U${n}_${slug(u.title)}`;
    for (const [kind, doc] of [["Vocab", vocabDoc(u)], ["Practice", practiceDoc(u, n)]]) {
      const f = path.join(tmp, `${kind}.html`);
      fs.writeFileSync(f, doc.replace(/FONTS/g, fontsUrl));
      const page = await browser.newPage();
      await page.goto("file://" + f); await page.evaluate(() => document.fonts.ready);
      const out = path.join(ROOT, "downloads", `${base}_${kind}.pdf`);
      await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
      await page.close();
      console.log("geschrieben:", path.relative(path.join(ROOT, ".."), out), `(${Math.round(fs.statSync(out).size / 1024)} KB)`);
    }
  }
  await browser.close();
})();
