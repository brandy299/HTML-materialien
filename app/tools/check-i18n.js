#!/usr/bin/env node
/* Prüft, ob jeder Oberflächentext in app/app.js (tr("…")) in allen Sprachen aus app/i18n.js übersetzt ist.
   Aufruf: node app/tools/check-i18n.js   (Exit 1 bei fehlenden Übersetzungen oder kaputten Platzhaltern) */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const APP = path.resolve(__dirname, "..");
const src = fs.readFileSync(path.join(APP, "app.js"), "utf8");

/* Alle String-Literale im ersten Argument jedes tr(…) einsammeln – stringbewusst */
const keys = new Set(["Start", "Karten", "Hilfe", "Ich", "Präsentation", "Quiz", "Zuordnen", "Lückentext", "Rechnen", "Lernkarten", "Kann-Liste", "Material", "Antwortsatz", "Word üben"]);
const re = /(^|[^\w$.])tr\(/g;
let m;
while ((m = re.exec(src))) {
  let i = m.index + m[0].length, depth = 0, lits = [];
  for (; i < src.length; i++) {
    const c = src[i];
    if (c === '"' || c === "'") {
      let j = i + 1, s = "";
      for (; src[j] !== c; j++) { if (src[j] === "\\") { s += src[++j]; } else s += src[j]; }
      lits.push(s); i = j; continue;
    }
    if (c === "(" || c === "{" || c === "[") depth++;
    else if (c === ")" || c === "}" || c === "]") { if (depth === 0) break; depth--; }
    else if (c === "," && depth === 0) break;
  }
  lits.forEach((l) => keys.add(l));
}

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(APP, "i18n.js"), "utf8"), ctx);
const I = ctx.window.LERNRAUM_I18N;
const HOWTO = src.match(/const HOWTO = \{([\s\S]*?)\n  \};/)[1].match(/^\s+(\w+):/gm).map((x) => x.trim().slice(0, -1));
const ph = (x) => (String(x).match(/\{\w+\}/g) || []).sort().join();
let errors = 0;
for (const [lang, dict] of Object.entries(I)) {
  const miss = [...keys].filter((k) => !(k in dict));
  const extra = Object.keys(dict).filter((k) => k !== "howto" && !keys.has(k));
  const badPh = [...keys].filter((k) => k in dict && ph(k) !== ph(dict[k]) && !/^\{n\} (Frage|Kurs|Fach)$|· \{n\} Fach$/.test(k));
  const missHow = HOWTO.filter((k) => !(dict.howto && dict.howto[k]));
  miss.forEach((k) => console.log(`✗ [${lang}] fehlt: ${k}`));
  missHow.forEach((k) => console.log(`✗ [${lang}] Anleitung fehlt: howto.${k}`));
  badPh.forEach((k) => console.log(`✗ [${lang}] Platzhalter passen nicht: ${k} → ${dict[k]}`));
  extra.forEach((k) => console.log(`! [${lang}] wird nicht mehr benutzt: ${k}`));
  errors += miss.length + missHow.length + badPh.length;
}
console.log(`\n${keys.size} Texte · ${Object.keys(I).length} Sprachen · ${errors} Fehler`);
process.exit(errors ? 1 : 0);
