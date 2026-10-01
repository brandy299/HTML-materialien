#!/usr/bin/env node
/* Übersetzungsdatei für einen Kurs anlegen oder auf den neuesten Stand bringen.
   Aufruf:  node app/tools/texte.js <kurs-id> <sprache>      z. B.  node app/tools/texte.js pbp ar
   → schreibt app/uebersetzungen/<kurs-id>.<sprache>.js mit ALLEN übersetzbaren Texten des Kurses.
     Vorhandene Übersetzungen bleiben erhalten, neue Texte kommen mit "" dazu (leer = noch nicht übersetzt,
     die App zeigt dann das Deutsche). Die Datei wird automatisch in app/index.html eingetragen (als Verweis, wird erst bei Bedarf geladen).
   Nur Übersicht:  node app/tools/texte.js --stand */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const APP = path.resolve(__dirname, "..");
const LANGS = ["en", "ar"];

const indexPath = path.join(APP, "index.html"), swPath = path.join(APP, "sw.js");
let indexHtml = fs.readFileSync(indexPath, "utf8");
const ctx = { console }; ctx.window = ctx; vm.createContext(ctx);
const run = (f) => vm.runInContext(fs.readFileSync(path.join(APP, f), "utf8"), ctx, { filename: f });
run("content.js");
[...indexHtml.matchAll(/<script src="(kurse\/[^"]+)"><\/script>/g), ...indexHtml.matchAll(/<link rel="x-lernraum-i18n"[^>]*href="(uebersetzungen\/[^"]+)">/g)].forEach((m) => run(m[1]));
const L = ctx.LERNRAUM;

const textsOf = (s) => { const seen = []; ctx.mapTexts(s, (x) => { if (!seen.includes(x)) seen.push(x); return x; }); return seen; };
const trOf = (id, lang) => Object.assign({}, ...L.translations.filter((t) => t.course === id && t.lang === lang).map((t) => t.strings));

if (process.argv[2] === "--stand") {
  L.subjects.filter((s) => !s.materials).forEach((s) => {
    const all = textsOf(s);
    console.log(`${s.id.padEnd(24)} ${all.length} Texte · ` + LANGS.map((l) => { const d = trOf(s.id, l); return `${l}: ${all.filter((x) => d[x]).length}`; }).join(" · "));
  });
  process.exit(0);
}

const [id, lang] = process.argv.slice(2);
const s = L.subjects.find((x) => x.id === id);
if (!s || !LANGS.includes(lang)) {
  console.log(`Aufruf: node app/tools/texte.js <kurs-id> <${LANGS.join("|")}>\nKurse: ${L.subjects.filter((x) => !x.materials).map((x) => x.id).join(", ")}`);
  process.exit(1);
}
const all = textsOf(s);
const old = trOf(id, lang);
const rel = `uebersetzungen/${id}.${lang}.js`;
const J = (x) => JSON.stringify(x);
const body = all.map((x) => `    ${J(x)}:\n      ${J(old[x] || "")}`).join(",\n\n");
const stale = Object.keys(old).filter((k) => !all.includes(k) && old[k]);
fs.writeFileSync(path.join(APP, rel), `/* ${s.name} (${s.id}) – Übersetzung: ${lang}
   Erzeugt mit: node app/tools/texte.js ${id} ${lang}  (erneut ausführen, wenn sich der Kurs ändert)
   Links steht der deutsche Text (NICHT ändern), rechts die Übersetzung. "" = noch nicht übersetzt.
   Regeln: app/AGENT-ANLEITUNG.md → „Übersetzungen“ */
LERNRAUM.translations.push({ course: ${J(id)}, lang: ${J(lang)}, strings: {

${body}${stale.length ? `,

    /* veraltet – der deutsche Text steht so nicht mehr im Kurs */
${stale.map((k) => `    ${J(k)}:\n      ${J(old[k])}`).join(",\n\n")}` : ""}

} });
`);
/* in index.html eintragen (Verweis; die App lädt die Datei erst, wenn die Sprache gewählt wird) */
if (!indexHtml.includes(`href="${rel}"`)) {
  indexHtml = indexHtml.replace('  <script src="vendor/qrcode.js"></script>', `  <link rel="x-lernraum-i18n" lang="${lang}" href="${rel}">\n  <script src="vendor/qrcode.js"></script>`);
  fs.writeFileSync(indexPath, indexHtml);
}
const done = all.filter((x) => old[x]).length;
console.log(`app/${rel}: ${all.length} Texte, davon ${done} übersetzt${stale.length ? `, ${stale.length} veraltet` : ""}.`);
