#!/usr/bin/env node
/* ============================================================
   LERNRAUM — Erklärvideo rendern
   Quelle:  app/videos/src/<id>.js   (Szenen mit dem Video-Baukasten)
   Ergebnis: app/videos/<id>.mp4  (+ <id>.jpg Vorschaubild, <id>.txt Textfassung)

   Aufrufe
     node app/tools/render-video.js <id> --sheet     Vorschaubogen (1 Bild pro Sekunde) ansehen – schnell, zuerst nutzen
     node app/tools/render-video.js <id>             fertiges Video (720×1280, 30 fps, Musik)
     node app/tools/render-video.js <id> --hq        1080×1920 (nur für Weitergabe, nicht für die App)
     node app/tools/render-video.js <id> --txt-only  nur die Textfassung (<id>.txt) neu schreiben (schnell)
     Weitere Schalter: --no-audio · --crf 27 · --fps 30 · --out <Ordner>

   Voraussetzungen: Node mit Playwright (Chromium), ffmpeg (Umgebungsvariable FFMPEG,
   „ffmpeg“ im PATH oder  pip install imageio-ffmpeg), python3 für die Musik.
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), os = require("os"), http = require("http");
const { spawn, spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..", "..");
const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith("--"));
const flag = (n) => args.includes("--" + n);
const opt = (n, d) => { const i = args.indexOf("--" + n); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
if (!id) { console.error("Aufruf: node app/tools/render-video.js <video-id> [--sheet] [--hq] [--no-audio]"); process.exit(2); }
if (!fs.existsSync(path.join(ROOT, "app/videos/src", id + ".js"))) { console.error(`Quelle fehlt: app/videos/src/${id}.js`); process.exit(2); }

const FPS = +opt("fps", 30), HQ = flag("hq"), SCALE = HQ ? 3 : 2;
const CRF = opt("crf", HQ ? "23" : "27");
const OUT = path.resolve(ROOT, opt("out", "app/videos"));

function findFfmpeg() {
  if (process.env.FFMPEG) return process.env.FFMPEG;
  if (spawnSync("ffmpeg", ["-version"]).status === 0) return "ffmpeg";
  const r = spawnSync("python3", ["-c", "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"], { encoding: "utf8" });
  if (r.status === 0 && r.stdout.trim()) return r.stdout.trim();
  console.error("ffmpeg nicht gefunden. Installieren:  pip install imageio-ffmpeg   (oder FFMPEG=/pfad/zu/ffmpeg setzen)");
  process.exit(2);
}
function loadPlaywright() {
  const tries = [() => require("playwright"), () => require(path.join(spawnSync("npm", ["root", "-g"], { encoding: "utf8" }).stdout.trim(), "playwright"))];
  for (const t of tries) { try { return t(); } catch { /* weiter */ } }
  console.error("Playwright nicht gefunden (npm i -g playwright  bzw. Chromium der Umgebung nutzen)."); process.exit(2);
}

const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };
function serve() {
  return new Promise((res) => {
    const srv = http.createServer((req, rsp) => {
      const p = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]));
      if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { rsp.writeHead(404); return rsp.end(); }
      rsp.writeHead(200, { "Content-Type": MIME[path.extname(p)] || "application/octet-stream" });
      fs.createReadStream(p).pipe(rsp);
    }).listen(0, "127.0.0.1", () => res(srv));
  });
}

(async () => {
  const ffmpeg = findFfmpeg();
  const { chromium } = loadPlaywright();
  const srv = await serve();
  const url = `http://127.0.0.1:${srv.address().port}/app/videos/player.html?v=${encodeURIComponent(id)}&render=1`;
  const browser = await chromium.launch({ args: ["--force-color-profile=srgb"] });
  const page = await (await browser.newContext({ viewport: { width: 360, height: 640 }, deviceScaleFactor: SCALE })).newPage();
  const errs = []; page.on("pageerror", (e) => errs.push(e.message)); page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  await page.goto(url);
  await page.waitForFunction(() => window.__lvReady === true, null, { timeout: 20000 }).catch(() => {});
  if (errs.length) { console.error("Fehler in der Quelle:\n  " + errs.join("\n  ")); await browser.close(); srv.close(); process.exit(1); }
  const info = await page.evaluate(() => LV.info());

  console.log(`Video „${info.title}“ · ${info.total.toFixed(1)} s · ${info.scenes.length} Szenen`);
  info.scenes.forEach((s, i) => console.log(`  ${String(i + 1).padStart(2)}. ${s.type.padEnd(6)} ${s.start.toFixed(1).padStart(5)} s  ${String(s.dur).padStart(4)} s  ${s.words} Wörter  ${s.kicker}`));
  if (info.warn.length) { console.log("\nHinweise zur Lesbarkeit:"); info.warn.forEach((w) => console.log("  ⚠ " + w)); }

  const writeTxt = () => { fs.mkdirSync(OUT, { recursive: true }); fs.writeFileSync(path.join(OUT, id + ".txt"), `${info.title}\n${"=".repeat(info.title.length)}\n\n` + info.scenes.map((s) => s.text.join("\n")).filter(Boolean).join("\n\n") + "\n"); };
  if (flag("txt-only")) { writeTxt(); console.log(`\nTextfassung geschrieben: ${path.relative(ROOT, path.join(OUT, id + ".txt"))}`); await browser.close(); srv.close(); return; }

  const shot = async (t, type = "png") => { await page.evaluate((x) => LV.seek(x), t); return page.screenshot({ type, quality: type === "jpeg" ? 88 : undefined }); };

  if (flag("sheet")) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "lv-sheet-"));
    const step = +opt("step", 1), n = Math.floor(info.total / step);
    for (let i = 0; i < n; i++) fs.writeFileSync(path.join(dir, `f${String(i).padStart(3, "0")}.png`), await shot(i * step + 0.02));
    const cols = Math.min(8, n), out = path.join(os.tmpdir(), `lv-${id}-sheet.png`);
    const r = spawnSync(ffmpeg, ["-y", "-loglevel", "error", "-framerate", "1", "-i", path.join(dir, "f%03d.png"), "-vf", `scale=180:-1,tile=${cols}x${Math.ceil(n / cols)}:padding=4:color=0x777777`, "-frames:v", "1", out]);
    if (r.status !== 0) { console.error(String(r.stderr)); process.exit(1); }
    console.log(`\nVorschaubogen: ${out}   (jedes Feld = ${step} s)`);
    await browser.close(); srv.close(); return;
  }

  fs.mkdirSync(OUT, { recursive: true });
  const t0 = Date.now();
  let wav = null;
  if (!flag("no-audio")) {
    wav = path.join(os.tmpdir(), `lv-${id}.wav`);
    const m = spawnSync("python3", [path.join(__dirname, "video-music.py"), "--seconds", String(info.total), "--bpm", String(info.bpm), "--mood", info.mood, "--seed", id, "--out", wav], { encoding: "utf8" });
    if (m.status !== 0) { console.error("Musik fehlgeschlagen:\n" + m.stderr); process.exit(1); }
  }
  const mp4 = path.join(OUT, id + ".mp4");
  const a = ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "png", "-i", "-"];
  if (wav) a.push("-i", wav);
  a.push("-c:v", "libx264", "-preset", "slow", "-crf", CRF, "-pix_fmt", "yuv420p", "-r", String(FPS), "-movflags", "+faststart");
  if (wav) a.push("-af", `volume=0.55,afade=t=out:st=${Math.max(0, info.total - 1.6).toFixed(2)}:d=1.6`, "-c:a", "aac", "-b:a", "80k", "-ac", "1", "-t", info.total.toFixed(3));
  a.push(mp4);
  const ff = spawn(ffmpeg, a, { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((r) => ff.on("close", r));
  const frames = Math.round(info.total * FPS);
  for (let f = 0; f < frames; f++) {
    const buf = await shot(f / FPS);
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    if (f % 90 === 0) process.stdout.write(`\r  Bild ${f}/${frames}`);
  }
  ff.stdin.end();
  const code = await done;
  process.stdout.write("\n");
  if (code !== 0) { console.error("ffmpeg fehlgeschlagen"); process.exit(1); }

  fs.writeFileSync(path.join(OUT, id + ".jpg"), await shot(info.poster, "jpeg"));
  writeTxt();
  await browser.close(); srv.close();

  const mb = fs.statSync(mp4).size / 1048576;
  console.log(`\nFertig in ${((Date.now() - t0) / 1000).toFixed(0)} s:`);
  console.log(`  ${path.relative(ROOT, mp4)}   ${mb.toFixed(2)} MB   (${SCALE * 360}×${SCALE * 640}, ${FPS} fps)`);
  console.log(`  ${path.relative(ROOT, path.join(OUT, id + ".jpg"))}  ·  ${path.relative(ROOT, path.join(OUT, id + ".txt"))}`);
  if (!HQ && mb > 4) console.log(`  ⚠ Größer als 4 MB: Video kürzen oder --crf 29 versuchen (Handys im Mobilnetz).`);
  if (HQ) console.log(`  Hinweis: --hq ist nur zum Teilen gedacht und gehört nicht in die App.`);
})().catch((e) => { console.error(e); process.exit(1); });
