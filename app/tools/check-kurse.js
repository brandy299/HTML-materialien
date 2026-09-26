#!/usr/bin/env node
/* ============================================================
   LERNRAUM — Inhalts-Check für alle Kurse
   Aufruf:  node app/tools/check-kurse.js
   Prüft Aufbau und typische Fehler aller Kurse in app/kurse/*.js.
   Fehler (✗) blockieren den Merge, Hinweise (!) nicht.
   Läuft auch automatisch bei jedem Pull Request (GitHub Actions).
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const APP = path.resolve(__dirname, "..");
const errors = [];
const warns = [];
const err = (where, msg) => errors.push(`✗ ${where}: ${msg}`);
const warn = (where, msg) => warns.push(`! ${where}: ${msg}`);

/* ── 1. Registrierung: index.html, sw.js, Dateien ───────────── */
const indexHtml = fs.readFileSync(path.join(APP, "index.html"), "utf8");
const swJs = fs.readFileSync(path.join(APP, "sw.js"), "utf8");
const listed = [...indexHtml.matchAll(/<script src="(kurse\/[^"]+)"><\/script>/g)].map((m) => m[1]);
const onDisk = fs.readdirSync(path.join(APP, "kurse")).filter((f) => f.endsWith(".js")).map((f) => "kurse/" + f);

for (const f of onDisk) {
  if (!listed.includes(f)) err(f, "Kursdatei ist nicht in app/index.html eingetragen");
  if (!swJs.includes(`"${f}"`)) err(f, "Kursdatei fehlt in app/sw.js (Liste SHELL)");
}
for (const f of listed) if (!onDisk.includes(f)) err("app/index.html", `lädt ${f}, die Datei existiert aber nicht`);
if (listed.length && indexHtml.indexOf(listed[listed.length - 1]) > indexHtml.indexOf("vendor/qrcode.js")) {
  err("app/index.html", "Kursdateien müssen vor vendor/qrcode.js und app.js stehen");
}

/* ── 2. Kurse laden ─────────────────────────────────────────── */
const ctx = { window: {}, console };
ctx.window = ctx;
vm.createContext(ctx);
const run = (file) => {
  try { vm.runInContext(fs.readFileSync(path.join(APP, file), "utf8"), ctx, { filename: file }); return true; }
  catch (e) { err(file, "JavaScript-Fehler: " + e.message); return false; }
};
run("content.js");
const subjectsByFile = {};
for (const f of listed) {
  const before = (ctx.LERNRAUM && ctx.LERNRAUM.subjects.length) || 0;
  if (!run(f)) continue;
  subjectsByFile[f] = ctx.LERNRAUM.subjects.slice(before);
}

/* ── 3. Inhalte prüfen ──────────────────────────────────────── */
const ID = /^[a-z0-9][a-z0-9-]*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TYPES = ["slides", "quiz", "sort", "cloze", "calc", "cards", "selfcheck", "sentence", "word", "link"];
const WORDNUM = { ein: 1, eins: 1, eines: 1, einer: 1, zwei: 2, drei: 3, vier: 4, fünf: 5 };
const str = (x) => typeof x === "string" && x.trim().length > 0;
const subjectIds = new Set();

function checkHints(where, o) {
  if (o.hints !== undefined && (!Array.isArray(o.hints) || !o.hints.every(str))) err(where, "hints muss eine Liste von Texten sein");
  if (o.hint !== undefined && !str(o.hint)) err(where, "hint muss ein Text sein");
}

function checkStep(where, st, topic) {
  if (!TYPES.includes(st.type)) return err(where, `unbekannter Typ "${st.type}" (erlaubt: ${TYPES.join(", ")})`);
  if (!str(st.title)) err(where, "Schritt ohne title");
  checkHints(where, st);
  if (topic.exam && typeof st.points !== "number") err(where, "In einer Übungsklausur braucht jede Aufgabe points");

  switch (st.type) {
    case "slides":
      if (!Array.isArray(st.slides) || !st.slides.length) err(where, "slides ist leer");
      else st.slides.forEach((sl, k) => { if (!str(sl.title)) err(`${where} Folie ${k + 1}`, "Folie ohne title"); });
      break;
    case "quiz":
      if (!Array.isArray(st.questions) || !st.questions.length) { err(where, "questions ist leer"); break; }
      st.questions.forEach((q, k) => {
        const w = `${where} Frage ${k + 1}`;
        if (!str(q.q)) err(w, "Frage ohne Text (q)");
        if (!Array.isArray(q.options) || q.options.length < 2) err(w, "mindestens 2 options nötig");
        else if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) err(w, `answer ${q.answer} passt nicht zu ${q.options.length} Antworten (zählt ab 0)`);
        else if (new Set(q.options).size !== q.options.length) err(w, "doppelte Antwortmöglichkeiten");
        checkHints(w, q);
      });
      break;
    case "sort":
      if (!Array.isArray(st.categories) || st.categories.length < 2) { err(where, "mindestens 2 categories nötig"); break; }
      if (!Array.isArray(st.items) || !st.items.length) { err(where, "items ist leer"); break; }
      st.items.forEach((it, k) => {
        if (!str(it.text)) err(`${where} Karte ${k + 1}`, "Karte ohne text");
        if (!Number.isInteger(it.cat) || it.cat < 0 || it.cat >= st.categories.length) err(`${where} Karte ${k + 1}`, `cat ${it.cat} gibt es nicht (${st.categories.length} Kategorien, zählt ab 0)`);
      });
      st.categories.forEach((c, k) => { if (!st.items.some((it) => it.cat === k)) warn(where, `Kategorie „${c}“ hat keine Karte`); });
      break;
    case "cloze": {
      if (!str(st.text)) { err(where, "text fehlt"); break; }
      const gaps = [...st.text.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
      if (!gaps.length) err(where, "Lückentext ohne {Lücken}");
      if (gaps.some((g) => g.includes("|") || g.includes("*"))) err(where, "Lücken im cloze dürfen kein | oder * enthalten (das ist die Schreibweise für sentence)");
      const dis = st.distractors || [];
      if (!Array.isArray(dis)) err(where, "distractors muss eine Liste sein");
      if (new Set([...gaps, ...dis]).size !== gaps.length + dis.length) warn(where, "ein Wort kommt in Lücken/Ablenkern doppelt vor");
      const m = (st.prompt || "").toLowerCase().match(/(\d+|ein|eins|eines|einer|zwei|drei|vier|fünf)\s+wörter?\s+passen?\s+nicht/);
      if (m) {
        const n = WORDNUM[m[1]] || parseInt(m[1], 10);
        if (n !== dis.length) err(where, `prompt sagt „${m[0]}“, es gibt aber ${dis.length} Ablenker`);
      }
      break;
    }
    case "sentence": {
      if (!str(st.text)) { err(where, "text fehlt"); break; }
      const gaps = [...st.text.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
      if (!gaps.length) err(where, "Antwortsatz ohne {Bausteine}");
      gaps.forEach((g, k) => {
        const opts = g.split("|").map((o) => o.trim());
        const stars = opts.filter((o) => o.startsWith("*")).length;
        if (opts.length < 2) err(`${where} Baustein ${k + 1}`, `„${g}“ braucht mindestens 2 Möglichkeiten`);
        if (stars !== 1) err(`${where} Baustein ${k + 1}`, `„${g}“ braucht genau eine richtige Lösung mit * (gefunden: ${stars})`);
        if (new Set(opts.map((o) => o.replace(/^\*/, ""))).size !== opts.length) err(`${where} Baustein ${k + 1}`, `„${g}“ enthält doppelte Möglichkeiten`);
      });
      break;
    }
    case "calc":
      if (!Array.isArray(st.rows) || !st.rows.length) { err(where, "rows ist leer"); break; }
      st.rows.forEach((r, k) => {
        const w = `${where} Zeile ${k + 1}`;
        if (!str(r.label)) err(w, "Zeile ohne label");
        if (typeof r.value !== "number" || !Number.isFinite(r.value)) err(w, "value muss eine Zahl sein");
        else if (!Number.isInteger(r.value)) err(w, `value ${r.value}: Das Zahlenfeld kann nur ganze Zahlen (keine Kommazahlen)`);
      });
      if (!st.hints && !st.hint && !topic.exam) warn(where, "Rechenaufgabe ohne Tipps (hints)");
      break;
    case "cards":
      if (!Array.isArray(st.cards) || !st.cards.length) err(where, "cards ist leer");
      else st.cards.forEach((c, k) => { if (!str(c.front) || !str(c.back)) err(`${where} Karte ${k + 1}`, "front und back nötig"); });
      break;
    case "selfcheck":
      if (!Array.isArray(st.items) || !st.items.length || !st.items.every(str)) err(where, "items muss eine Liste von Aussagen sein");
      break;
    case "word": {
      if (!Array.isArray(st.blocks) || !st.blocks.length || !st.blocks.every((b) => str(b.text))) { err(where, "blocks muss eine Liste von Zeilen { text } sein"); break; }
      if (st.mode !== undefined && st.mode !== "guided" && st.mode !== "free") err(where, 'mode muss "guided" oder "free" sein');
      if (!Array.isArray(st.criteria) || !st.criteria.length) { err(where, "criteria ist leer"); break; }
      const nb = st.blocks.length;
      st.criteria.forEach((c, k) => {
        const w = `${where} Kriterium ${k + 1}`;
        if (!str(c.label)) err(w, "label fehlt");
        if (!Array.isArray(c.checks) || !c.checks.length) { err(w, "checks ist leer"); return; }
        c.checks.forEach((ck, j) => {
          const w2 = `${w} Check ${j + 1}`;
          if (!["font", "size", "margins", "gap", "align", "bold"].includes(ck.op)) { err(w2, `unbekannter op "${ck.op}"`); return; }
          if (ck.block !== undefined && (!Number.isInteger(ck.block) || ck.block < 0 || ck.block >= nb)) err(w2, `block ${ck.block} gibt es nicht (${nb} Zeilen)`);
          if (ck.skip !== undefined && (!Array.isArray(ck.skip) || ck.skip.some((x) => !Number.isInteger(x) || x < 0 || x >= nb))) err(w2, "skip muss eine Liste gültiger Zeilen-Nummern sein");
          if (ck.op === "font" && !str(ck.value)) err(w2, "font braucht value");
          else if (ck.op === "size" && (!Number.isInteger(ck.value) || ck.value < 6 || ck.value > 72)) err(w2, "size braucht eine ganze Zahl (6–72)");
          else if (ck.op === "size" && ck.block === undefined && ck.skip === undefined) err(w2, "size braucht block oder skip");
          else if (ck.op === "gap" && (!Number.isInteger(ck.value) || ck.value < 0 || ck.value > 4)) err(w2, "gap braucht value 0–4");
          else if (ck.op === "gap" && !Number.isInteger(ck.block)) err(w2, "gap braucht block");
          else if (ck.op === "align" && !["left", "center", "right", "justify"].includes(ck.value)) err(w2, "align braucht left/center/right/justify");
          else if (ck.op === "align" && !Number.isInteger(ck.block)) err(w2, "align braucht block");
          else if (ck.op === "bold" && !Number.isInteger(ck.block)) err(w2, "bold braucht block");
          else if (ck.op === "margins" && !(ck.value && ["top", "bottom", "left", "right"].every((m) => typeof ck.value[m] === "number"))) err(w2, "margins braucht top/bottom/left/right als Zahlen");
        });
      });
      break;
    }
    case "link":
      if (!str(st.href)) err(where, "href fehlt");
      break;
  }
}

for (const [file, subjects] of Object.entries(subjectsByFile)) {
  if (file === "kurse/materialien.js") continue;
  if (!subjects.length) warn(file, "Datei fügt keinen Kurs hinzu (LERNRAUM.subjects.push fehlt?)");
  for (const s of subjects) {
    const W = `${file} [${s.id}]`;
    if (!str(s.id) || !ID.test(s.id)) err(W, "id fehlt oder enthält ungültige Zeichen (nur a–z, 0–9, -)");
    if (subjectIds.has(s.id)) err(W, "Kurs-id ist doppelt");
    subjectIds.add(s.id);
    for (const k of ["fach", "name", "course", "description"]) if (!str(s[k])) err(W, `Pflichtfeld ${k} fehlt`);
    if (!str(s.added) || !DATE.test(s.added)) err(W, `Pflichtfeld added fehlt (Datum der Veröffentlichung, z. B. "${new Date().toISOString().slice(0, 10)}")`);
    if (s.updated !== undefined && !DATE.test(s.updated)) err(W, "updated muss ein Datum JJJJ-MM-TT sein");
    if (s.klausur !== undefined && !DATE.test(s.klausur)) err(W, "klausur muss ein Datum JJJJ-MM-TT sein");
    if (s.fach && ctx.LERNRAUM.faecher && !ctx.LERNRAUM.faecher[s.fach]) warn(W, `Fachname für „${s.fach}“ fehlt in app/content.js → faecher`);
    if (!Array.isArray(s.topics) || !s.topics.length) { err(W, "topics ist leer"); continue; }
    const tids = new Set();
    s.topics.forEach((t) => {
      const WT = `${W} Thema ${t.id}`;
      if (!str(t.id) || !ID.test(t.id)) err(WT, "Thema-id fehlt oder ungültig");
      if (tids.has(t.id)) err(WT, "Thema-id ist doppelt");
      tids.add(t.id);
      if (!str(t.title)) err(WT, "Thema ohne title");
      if (t.drill) return;
      if (t.soon) return;
      if (!Array.isArray(t.steps) || !t.steps.length) return err(WT, "steps ist leer");
      if (!t.help && !t.exam && !t.steps.every((x) => x.type === "cards")) warn(WT, "kein Merkkasten (help) für den ?-Knopf");
      t.steps.forEach((st, k) => checkStep(`${WT} Schritt ${k + 1}`, st, t));
      if (t.exam) {
        if (!Number.isInteger(t.exam.minutes)) err(WT, "exam.minutes fehlt");
        t.steps.forEach((st, k) => { if (st.review && !s.topics.some((x) => x.id === st.review)) err(`${WT} Schritt ${k + 1}`, `review „${st.review}“ verweist auf kein Thema`); });
      }
    });
  }
}

/* ── 4. Ausgabe ─────────────────────────────────────────────── */
const total = Object.values(subjectsByFile).flat().filter((s) => !s.materials).length;
warns.forEach((w) => console.log(w));
errors.forEach((e) => console.log(e));
console.log(`\n${total} Kurse geprüft · ${errors.length} Fehler · ${warns.length} Hinweise`);
if (errors.length) { console.log("→ Bitte Fehler beheben, dann erneut prüfen."); process.exit(1); }
console.log("→ Alles in Ordnung.");
