#!/usr/bin/env node
/* ============================================================
   LERNRAUM — Videos prüfen (läuft im CI und lokal: node app/tools/check-videos.js)
   Jedes Video besteht aus: app/videos/src/<id>.js (Quelle) + <id>.mp4 (Teilen) + <id>.m4a (Musik für die App) + <id>.jpg + <id>-dark.jpg + <id>.txt
   Regeln: mp4 ≤ 4 MB und ≤ 90 s, 9:16 Hochformat, jpg ≤ 300 KB, keine verwaisten Dateien.
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const DIR = path.join(__dirname, "..", "videos");
const MAX_MP4 = 4 * 1048576, MAX_M4A = 1048576, MAX_JPG = 300 * 1024, MAX_SEC = 90;
let errors = 0, warn = 0;
const err = (m) => { console.log("  ✗ " + m); errors++; };
const note = (m) => { console.log("  ! " + m); warn++; };

function mp4Info(buf) {
  // Sucht die Kopfdaten: mvhd (Dauer) und tkhd (Breite × Höhe) – bei „faststart“ stehen sie am Anfang.
  const head = buf.subarray(0, Math.min(buf.length, 262144));
  const i = head.indexOf("mvhd"); if (i < 0) return null;
  const v = head[i + 4];
  const ts = head.readUInt32BE(i + (v === 1 ? 24 : 16)), dur = v === 1 ? Number(head.readBigUInt64BE(i + 28)) : head.readUInt32BE(i + 20);
  let w = 0, h = 0;
  for (let p = head.indexOf("tkhd"); p >= 0; p = head.indexOf("tkhd", p + 4)) {
    const ver = head[p + 4], o = p + (ver === 1 ? 92 : 80), ww = head.readUInt32BE(o) / 65536, hh = head.readUInt32BE(o + 4) / 65536;
    if (ww > 0 && hh > 0) { w = ww; h = hh; break; }
  }
  return { sec: dur / ts, w, h };
}

if (!fs.existsSync(DIR)) { console.log("Keine Videos."); process.exit(0); }
const srcDir = path.join(DIR, "src");
const srcs = fs.existsSync(srcDir) ? fs.readdirSync(srcDir).filter((f) => f.endsWith(".js")).map((f) => f.slice(0, -3)) : [];
const outs = new Set(fs.readdirSync(DIR).filter((f) => /\.(mp4|m4a|jpg|txt)$/.test(f)).map((f) => f.replace(/(-dark)?\.(mp4|m4a|jpg|txt)$/, "")));
let n = 0;
for (const id of srcs) {
  const has = ["mp4", "m4a", "jpg", "txt"].filter((e) => fs.existsSync(path.join(DIR, id + "." + e)));
  if (has.length && !fs.existsSync(path.join(DIR, id + "-dark.jpg"))) err(`${id}-dark.jpg fehlt (node app/tools/render-video.js ${id} --poster-only)`);
  if (!has.length) { note(`${id}: Quelle vorhanden, aber noch nicht gerendert (node app/tools/render-video.js ${id})`); continue; }
  n++; console.log(`Video ${id}`);
  if (!/^[a-z0-9-]+$/.test(id)) err("Name nur aus a–z, 0–9 und Bindestrich");
  for (const e of ["mp4", "m4a", "jpg", "txt"]) if (!has.includes(e)) err(`${id}.${e} fehlt (neu rendern: node app/tools/render-video.js ${id})`);
  if (has.includes("mp4")) {
    const f = path.join(DIR, id + ".mp4"), size = fs.statSync(f).size, info = mp4Info(fs.readFileSync(f));
    if (size > MAX_MP4) err(`mp4 ist ${(size / 1048576).toFixed(1)} MB (max. 4 MB) – kürzen oder --crf 29 rendern`);
    if (!info) err("mp4 nicht lesbar (nicht „faststart“?). Bitte mit render-video.js erzeugen.");
    else {
      if (info.sec > MAX_SEC) err(`Video ist ${info.sec.toFixed(0)} s lang (max. ${MAX_SEC} s)`);
      if (info.w && Math.abs(info.w / info.h - 9 / 16) > 0.01) err(`Format ${info.w}×${info.h} – erwartet 9:16 Hochformat`);
      if (info.w > 800) note(`Auflösung ${info.w}×${info.h}: für die App reichen 720×1280 (--hq nur zum Teilen)`);
    }
  }
  if (has.includes("m4a") && fs.statSync(path.join(DIR, id + ".m4a")).size > MAX_M4A) err("Musik (m4a) ist größer als 1 MB");
  if (has.includes("jpg") && fs.statSync(path.join(DIR, id + ".jpg")).size > MAX_JPG) err("Vorschaubild größer als 300 KB");
}
for (const id of outs) if (!srcs.includes(id)) err(`${id}: Ergebnisdateien ohne Quelle (app/videos/src/${id}.js fehlt)`);
console.log(`\n${n} Video(s) geprüft · ${errors} Fehler · ${warn} Hinweise`);
process.exit(errors ? 1 : 0);
