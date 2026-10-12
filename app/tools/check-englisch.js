#!/usr/bin/env node
/* Prüft die Inhalte des Englisch-Hubs (englisch/index.html: UNITS, SCHEMA).
   Aufruf: node app/tools/check-englisch.js   → muss „0 Fehler“ melden.
   Der Hub ist ein eigenständiges Produkt mit eigener Designsprache (englisch/DESIGN.md) und gehört nicht zur Lernraum-App. */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..", "..", "englisch");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
let errors = 0, warns = 0;
const err = (w, m) => { errors++; console.log(`✗ ${w}: ${m}`); };
const warn = (w, m) => { warns++; console.log(`! ${w}: ${m}`); };
const str = (x) => typeof x === "string" && x.trim().length > 0;

const a = html.indexOf("const UNITS = ["), b = html.indexOf("\nconst esc =");
if (a < 0 || b < 0) { console.log("✗ UNITS nicht gefunden in englisch/index.html"); process.exit(1); }
let UNITS;
try { UNITS = vm.runInNewContext("(" + html.slice(a + "const UNITS = ".length, b).trim().replace(/;$/, "") + ")"); } catch (e) { console.log("✗ UNITS lässt sich nicht lesen: " + e.message); process.exit(1); }
const schemaKeys = [...html.slice(html.indexOf("const SCHEMA = {"), a).matchAll(/^  (\w+): `/gm)].map((m) => m[1]);
const norm = (s) => String(s).toLowerCase().replace(/[’‘`´]/g, "'").replace(/\s+/g, " ").replace(/[.,!?]/g, "").trim();
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));

const unitIds = new Set(), exIds = new Set();
UNITS.forEach((u, ui) => {
  const W = `Tafel ${ui + 1} (${u.id})`;
  if (!/^plate-\d+$/.test(u.id || "")) err(W, "id muss „plate-<Nummer>“ sein");
  else if (u.id !== `plate-${ui + 1}`) err(W, `id passt nicht zur Reihenfolge (erwartet plate-${ui + 1})`);
  if (unitIds.has(u.id)) err(W, "id doppelt"); unitIds.add(u.id);
  ["no", "title", "de", "lead", "caption"].forEach((k) => { if (!str(u[k])) err(W, `${k} fehlt`); });
  if (u.plate) { if (!exists(u.plate)) err(W, `Bild fehlt: ${u.plate}`); } else warn(W, "kein Tafel-Bild (plate) – es erscheint nur das Ornament; Prompt: platePrompt");
  if (!schemaKeys.includes(u.schema)) err(W, `schema „${u.schema}“ gibt es nicht in SCHEMA (${schemaKeys.join(", ")})`);
  if (!str(u.schemaTitle)) err(W, "schemaTitle fehlt");
  if (!Array.isArray(u.explain) || u.explain.length !== 2 || !u.explain.every(str)) err(W, "explain braucht genau 2 Texte");
  if (!Array.isArray(u.vocab) || u.vocab.length < 8) err(W, "vocab braucht mindestens 8 Wörter");
  else {
    const en = new Set();
    u.vocab.forEach((v, i) => {
      if (!Array.isArray(v) || v.length !== 3 || !v.every(str)) return err(`${W} Vokabel ${i + 1}`, "braucht [English, Deutsch, Tiếng Việt]");
      if (en.has(v[0].toLowerCase())) err(`${W} Vokabel ${i + 1}`, `„${v[0]}“ doppelt`); en.add(v[0].toLowerCase());
    });
  }
  if (!Array.isArray(u.exercises) || u.exercises.length < 5) err(W, "mindestens 5 Übungen nötig");
  const types = new Set();
  (u.exercises || []).forEach((ex, ei) => {
    const E = `${W} Übung ${ex.id || ei + 1}`;
    if (!new RegExp(`^p${ui + 1}-[a-z]$`).test(ex.id || "")) err(E, `id muss „p${ui + 1}-<Buchstabe>“ sein`);
    if (exIds.has(ex.id)) err(E, "id doppelt"); exIds.add(ex.id);
    if (ex.n !== String.fromCharCode(65 + ei)) err(E, `n muss „${String.fromCharCode(65 + ei)}“ sein (Reihenfolge A, B, C …)`);
    if (!str(ex.title)) err(E, "title fehlt");
    types.add(ex.type);
    switch (ex.type) {
      case "match": {
        if (!Array.isArray(ex.pairs) || ex.pairs.length < 4) return err(E, "match braucht mindestens 4 Paare");
        const l = new Set(), r = new Set();
        ex.pairs.forEach((p, i) => {
          if (!Array.isArray(p) || p.length !== 2 || !p.every(str)) return err(E, `Paar ${i + 1} braucht [Englisch, Deutsch]`);
          if (l.has(norm(p[0])) || r.has(norm(p[1]))) err(E, `Paar ${i + 1}: doppelt (jede Seite darf nur einmal vorkommen)`);
          l.add(norm(p[0])); r.add(norm(p[1]));
        });
        break;
      }
      case "cloze": {
        if (!Array.isArray(ex.items) || ex.items.length < 4) return err(E, "cloze braucht mindestens 4 Sätze");
        ex.items.forEach((it, i) => {
          if (typeof it.b !== "string" || typeof it.af !== "string") err(E, `Satz ${i + 1}: b/af (Text vor/nach der Lücke) fehlen`);
          if (!Array.isArray(it.a) || !it.a.length || !it.a.every(str)) err(E, `Satz ${i + 1}: a (richtige Antworten) fehlt`);
          if (!(it.b + it.af).trim()) err(E, `Satz ${i + 1}: Satz ohne Text`);
        });
        if (ex.bank) {
          if (!Array.isArray(ex.bank)) err(E, "bank muss eine Liste sein");
          else ex.items.forEach((it, i) => { if (Array.isArray(it.a) && !ex.bank.some((w) => it.a.some((x) => norm(x) === norm(w)))) err(E, `Satz ${i + 1}: Antwort „${it.a[0]}“ steht nicht in der Wortbank`); });
        } else warn(E, "ohne Wortbank (bank): Eintippen ohne Hilfe ist für Anfänger schwer");
        break;
      }
      case "order":
        if (!str(ex.answer) || ex.answer.split(" ").length < 4) err(E, "order braucht answer mit mindestens 4 Wörtern");
        else if (new Set(ex.answer.split(" ")).size !== ex.answer.split(" ").length) warn(E, "Wörter kommen doppelt vor – Antippen ist dann mehrdeutig, aber erlaubt");
        break;
      case "spot":
        if (!Array.isArray(ex.sentences) || ex.sentences.length < 3) err(E, "spot braucht mindestens 3 Sätze");
        else if (!Number.isInteger(ex.wrong) || ex.wrong < 0 || ex.wrong >= ex.sentences.length) err(E, `wrong ${ex.wrong} passt nicht zu ${ex.sentences.length} Sätzen (zählt ab 0)`);
        if (!str(ex.correction)) err(E, "correction (richtiger Satz) fehlt");
        break;
      case "sort":
        if (!Array.isArray(ex.cats) || ex.cats.length < 2) return err(E, "sort braucht mindestens 2 cats");
        if (!Array.isArray(ex.items) || ex.items.length < 4) return err(E, "sort braucht mindestens 4 Karten");
        ex.items.forEach((it, i) => { if (!Array.isArray(it) || !str(it[0]) || !/^\d+$/.test(String(it[1])) || +it[1] >= ex.cats.length) err(E, `Karte ${i + 1}: [Text, "Kategorie-Nummer"] erwartet (Nummer ab 0, als Text)`); });
        ex.cats.forEach((c, k) => { if (!ex.items.some((it) => String(it[1]) === String(k))) warn(E, `Kategorie „${c}“ hat keine Karte`); });
        break;
      case "quiz":
        if (!Array.isArray(ex.items) || ex.items.length < 4) return err(E, "quiz braucht mindestens 4 Fragen");
        ex.items.forEach((q, i) => {
          if (!str(q.q)) err(E, `Frage ${i + 1} ohne Text`);
          if (!Array.isArray(q.o) || q.o.length < 2) err(E, `Frage ${i + 1}: mindestens 2 Antworten`);
          else if (new Set(q.o).size !== q.o.length) err(E, `Frage ${i + 1}: doppelte Antworten`);
          else if (!Number.isInteger(q.c) || q.c < 0 || q.c >= q.o.length) err(E, `Frage ${i + 1}: c ${q.c} passt nicht zu ${q.o.length} Antworten (zählt ab 0)`);
          if (!str(q.e)) err(E, `Frage ${i + 1}: Erklärung (e) fehlt`);
        });
        break;
      default: err(E, `Typ „${ex.type}“ unbekannt (match, cloze, order, spot, sort, quiz)`);
    }
  });
  if ((u.exercises || []).length && !(u.exercises || []).some((e) => e.type === "quiz")) warn(W, "keine quiz-Übung am Ende");
  (u.pdfs || []).forEach(([t, f]) => { if (!exists(f)) err(W, `PDF fehlt: ${f}`); });
  if (!u.pdfs || !u.pdfs.length) warn(W, "keine PDF-Arbeitsblätter (pdfs)");
});

/* Dateien im Hub: Schriften und Plates müssen vorhanden sein */
["fonts/fonts.css", "downloads/FE_Everyday_English_Overview.pdf"].forEach((f) => { if (!exists(f)) err("Hub", `Datei fehlt: ${f}`); });
/* Keine externen Adressen (Datenschutz): außer W3C-Namensraum */
const ext = [...html.matchAll(/https?:\/\/[^\s"'`)<]+/g)].map((m) => m[0]).filter((u) => !u.startsWith("http://www.w3.org/"));
if (ext.length) err("Hub", `externe Adresse(n) gefunden (nicht erlaubt): ${[...new Set(ext)].join(", ")}`);
/* Lehrer-Lösungen dürfen nicht online stehen (PRODUCT.md) */
if (/downloads\/[^"']*(Loesung|Lösung|Solution|Key)/i.test(html)) err("Hub", "Lösungs-PDF verlinkt – laut PRODUCT.md keine Lehrer-Lösungen online");

console.log(`\n${UNITS.length} Tafeln · ${exIds.size} Übungen geprüft · ${errors} Fehler · ${warns} Hinweise`);
console.log(errors ? "→ Bitte Fehler beheben, dann erneut prüfen." : "→ Alles in Ordnung.");
process.exit(errors ? 1 : 0);
