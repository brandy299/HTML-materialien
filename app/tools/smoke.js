#!/usr/bin/env node
/* Rauchtest: öffnet die wichtigsten Ansichten der App im Handy-Browser und meldet JavaScript-Fehler.
   Aufruf (Server muss laufen: python3 -m http.server 8080):
     NODE_PATH=<pfad zu playwright> node app/tools/smoke.js [http://localhost:8080/app/]
   Ablauf: Startseite, Profil, jeder Kurs, jedes Thema, jedes Erklärvideo, jede Aufgabe (erste und letzte). Exit 1 bei Fehlern. */
const { chromium } = require("playwright");
const base = process.argv[2] || "http://localhost:8080/app/";
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || "/opt/pw-browsers/chromium" });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
  await ctx.addInitScript(() => { localStorage.setItem("lernraum.name", '"Test"'); localStorage.setItem("lernraum.faecher", "[]"); });
  const p = await ctx.newPage();
  let bad = 0, n = 0, current = "";
  p.on("pageerror", (e) => { bad++; console.log(`✗ ${current}: ${e.message}`); });
  const visit = async (hash, wait = 500) => { current = hash; n++; await p.goto(base + hash); await p.waitForTimeout(wait); };
  await visit("#/"); await visit("#/profil"); await visit("#/hilfe");
  const subjects = await p.evaluate(() => (window.LERNRAUM.subjects || []).map((s) => ({ id: s.id, topics: s.topics.map((t) => ({ id: t.id, steps: (t.steps || []).length, video: !!t.video, exam: !!t.exam, drill: !!t.drill })) })));
  for (const s of subjects) {
    await visit(`#/f/${s.id}`);
    for (const t of s.topics) {
      await visit(`#/f/${s.id}/${t.id}`);
      if (t.video) await visit(`#/f/${s.id}/${t.id}/video`, 1500);
      if (t.steps && !t.exam) { await visit(`#/f/${s.id}/${t.id}/0`); await visit(`#/f/${s.id}/${t.id}/${t.steps - 1}`); }
    }
  }
  await browser.close();
  console.log(`\n${n} Ansichten geöffnet · ${bad} JavaScript-Fehler`);
  process.exit(bad ? 1 : 0);
})();
