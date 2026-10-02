/* Erklärvideo · PBP · Lernsituation 2.1, Teil 2 „Ersatz- und Neubedarf“
   Fall: „Café Sonnenschein“ – bewusst andere Zahlen als in den Kursaufgaben (A5–A8, Probeklausur).
   Ist 18 · Abgänge 5 · Zugänge 2 · Soll 20  →  Zwischensumme 15 · Personalbedarf 5
   Ersatzbedarf = 5 − 2 = 3 · Neubedarf = 20 − 18 = 2 (mit dem URSPRÜNGLICHEN Ist!) · 3 + 2 = 5 */
LV.video({
  id: "pbp-ersatz-neubedarf",
  title: "Ersatz- und Neubedarf",
  bpm: 92, mood: "calm",
  scenes: [
    LV.title({
      kicker: "PBP · Ersatz- und Neubedarf",
      title: "Ersatz oder neu?",
      sub: "Warum ein Betrieb Leute sucht.",
      dur: 4.5
    }),

    LV.scene({
      kicker: "01 · Der Fall", dur: 7.5,
      items: [
        LV.text("Dem Café Sonnenschein fehlen <mark>5</mark> Leute.", { size: "xl", at: 0.5 }),
        LV.chips(["Ist 18", "− 5 Abgänge", "+ 2 Zugänge", "Soll 20"], { at: 2.4, stagger: 0.3 }),
        LV.text("Aber <b>warum</b> fehlen sie?", { size: "l", at: 4.8 })
      ]
    }),

    LV.scene({
      kicker: "02 · Der Ersatz", dur: 9,
      items: [
        LV.text("Wer geht, wird <mark>ersetzt</mark>.", { size: "l", at: 0.4 }),
        LV.scheme([
          { label: "Abgänge", value: 5 },
          { op: "−", label: "Zugänge", value: 2 },
          { op: "=", label: "Ersatzbedarf", value: 3, line: true, hi: true }
        ], { title: "Ersatzbedarf", at: 2.0, gap: 0.9 }),
        LV.text("<em>3</em> Stellen: nur Ersatz.", { size: "m", at: 6.0 })
      ]
    }),

    LV.scene({
      kicker: "03 · Der Zuwachs", dur: 9.5,
      items: [
        LV.text("Wachstum schafft <mark>neue</mark> Stellen.", { size: "l", at: 0.4 }),
        LV.scheme([
          { label: "Soll", value: 20 },
          { op: "−", label: "ursprünglicher Ist", sub: "von vor dem Jahr – nicht die 15", value: 18 },
          { op: "=", label: "Neubedarf", value: 2, line: true, hi: true }
        ], { title: "Neubedarf", at: 2.0, gap: 0.9 }),
        LV.text("Der Ist von <b>vorher</b> zählt.", { size: "m", at: 6.2 })
      ]
    }),

    LV.scene({
      kicker: "04 · Zusammen", dur: 8,
      items: [
        LV.scheme([
          { label: "Ersatzbedarf", value: 3 },
          { op: "+", label: "Neubedarf", value: 2 },
          { op: "=", label: "Personalbedarf", value: 5, line: true, hi: true }
        ], { title: "Ersatz + Neu = Gesamt", at: 0.5, gap: 0.9 }),
        LV.term(["› Passt zum Rechenschema."], { at: 4.4 })
      ]
    }),

    LV.scene({
      kicker: "05 · Kurz testen", dur: 9,
      items: [
        LV.quiz("Ein Betrieb wächst um 4 Stellen. Niemand geht. <b>Was ist das?</b>", ["Ersatzbedarf", "Neubedarf", "Abgang"], 1, { at: 0.4, reveal: 6.2 })
      ]
    }),

    LV.outro({ text: "Jetzt selbst <mark>zerlegen</mark>.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
