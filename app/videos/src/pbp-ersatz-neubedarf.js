/* Erklärvideo · PBP · Lernsituation 2.1, Teil 2 „Ersatz- und Neubedarf“
   Modellunternehmen: Mediaworld, „ein Jahr später“ – bewusst andere Zahlen als in den Kursaufgaben (A1–A8).
   Ist 23 · Abgänge 4 · Zugang 1 · Soll 25  →  Bestand am Jahresende 20 · Personalbedarf 5
   Ersatzbedarf = 4 − 1 = 3 · Neubedarf = 25 − 23 = 2 (mit dem URSPRÜNGLICHEN Ist!) · 3 + 2 = 5
   Gleicher Fall wie im Video pbp-bedarf-berechnen (dort als Rechenschema, hier zerlegt). */
LV.video({
  id: "pbp-ersatz-neubedarf",
  title: "Ersatz- und Neubedarf",
  poster: 18.2,   // Zeitpunkt (s) für das Vorschaubild
  bpm: 92, mood: "calm",
  scenes: [
    LV.title({
      kicker: "PBP · Ersatz- und Neubedarf",
      title: "Ersatz oder neu?",
      sub: "Mediaworld, ein Jahr später.",
      dur: 4.5
    }),

    LV.scene({
      kicker: "01 · Der Fall", dur: 7.5,
      items: [
        LV.text("Bei Mediaworld fehlen <mark>5</mark> Leute.", { size: "xl", at: 0.5 }),
        LV.chips(["Ist 23", "− 4 Abgänge", "+ 1 Zugang", "Soll 25"], { at: 2.4, stagger: 0.3 }),
        LV.text("Aber <b>warum</b> fehlen sie?", { size: "l", at: 4.8 })
      ]
    }),

    LV.scene({
      kicker: "02 · Der Ersatz", dur: 9,
      items: [
        LV.text("Wer geht, wird <mark>ersetzt</mark>.", { size: "l", at: 0.4 }),
        LV.scheme([
          { label: "Abgänge", value: 4 },
          { op: "−", label: "Zugänge", value: 1 },
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
          { label: "Soll", value: 25 },
          { op: "−", label: "ursprünglicher Ist", sub: "von vor dem Jahr – nicht die Zwischensumme", value: 23 },
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
        LV.quiz("Mediaworld wächst um 4 Stellen. Niemand geht. <b>Was ist das?</b>", ["Ersatzbedarf", "Neubedarf", "Abgang"], 1, { at: 0.4, reveal: 6.2 })
      ]
    }),

    LV.outro({ text: "Jetzt selbst <mark>zerlegen</mark>.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
