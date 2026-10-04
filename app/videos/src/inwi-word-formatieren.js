/* Erklärvideo · INWI · Teil 2 „In Word formatieren“
   Modellunternehmen: Fly Bike Werke GmbH. Gleicher Brief wie in „Die neun Zonen“ (nicht der AWE-Brief der Aufgaben).
   Werte wie in der Lektion: Calibri 11 · Ränder oben 4,5 / unten 2 / links 2,5 / rechts 2 cm · Rücksendeangabe 8 pt ·
   Datum rechtsbündig · Betreff fett · Leerzeile vor der PLZ, 2 danach · Anrede mit Komma + Leerzeile · Gruß, 3 Leerzeilen. */
LV.video({
  id: "inwi-word-formatieren",
  title: "In Word formatieren",
  poster: 17,
  bpm: 100, mood: "bright",
  scenes: [
    LV.title({ kicker: "INWI · Word", title: "Vom Rohtext zum Brief.", sub: "Fly Bike Werke, Schritt für Schritt.", dur: 4.5 }),

    LV.scene({
      kicker: "01 · Schrift", dur: 8, align: "top",
      items: [LV.word({ steps: [{ id: "font", at: 1.0 }] })]
    }),

    LV.scene({
      kicker: "02 · Ränder", dur: 8, align: "top",
      items: [LV.word({ done: ["font"], steps: [{ id: "margins", at: 1.0 }] })]
    }),

    LV.scene({
      kicker: "03 · Anschrift", dur: 11, align: "top",
      items: [LV.word({ done: ["font", "margins"], steps: [{ id: "small", at: 0.8 }, { id: "gap1", at: 4.2 }, { id: "right", at: 7.4 }] })]
    }),

    LV.scene({
      kicker: "04 · Betreff bis Gruß", dur: 11, align: "top",
      items: [LV.word({ done: ["font", "margins", "small", "gap1", "right"], steps: [{ id: "bold", at: 0.8 }, { id: "anrede", at: 4.2 }, { id: "sign", at: 7.4 }] })]
    }),

    LV.scene({
      kicker: "05 · Kurz testen", dur: 9,
      items: [LV.quiz("Wie markierst du <b>alles</b> auf einmal?", ["Strg+B", "Strg+A", "Strg+R"], 1, { at: 0.4, reveal: 6.2 })]
    }),

    LV.outro({ text: "Jetzt <mark>Wege</mark> üben.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
