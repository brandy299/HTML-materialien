/* Erklärvideo · INWI · Teil 1 „Die neun Zonen“ (DIN 5008)
   Modellunternehmen: Fly Bike Werke GmbH. Bewusst ein anderer Brief als in den Kursaufgaben (dort: AWE Aluminiumwerke AG).
   Begriffe wie in der Lektion: Briefkopf · Anschriftfeld · Informationsblock · Betreffzeile · Anrede · Brieftext · Grußformel · Unterschrift · Anlagen */
const BRIEF = {
  z1: ["Fly Bike Werke GmbH · Rostocker Str. 334 · 26121 Oldenburg"],
  z2: ["Sattel & Co. KG", "Frau Roth", "Lindenallee 5", "", "49074 Osnabrück"],
  z3: ["12.10.2026"],
  z4: ["Anfrage über Fahrradsättel"],
  z5: ["Sehr geehrte Frau Roth,"],
  z6: ["wir bauen Citybikes und suchen neue Sättel.", "Bitte senden Sie uns Ihr Angebot."],
  z7: ["Mit freundlichen Grüßen"],
  z8: ["", "", "", "Jan Weber"],
  z9: ["Anlage", "Prospekt Citybike"]
};

LV.video({
  id: "inwi-neun-zonen",
  title: "Die neun Zonen des Geschäftsbriefs",
  poster: 11,
  bpm: 96, mood: "bright",
  scenes: [
    LV.title({ kicker: "INWI · DIN 5008", title: "Neun Zonen. Ein Brief.", sub: "Fly Bike Werke schreibt an Sattel & Co.", dur: 4.5 }),

    LV.scene({
      kicker: "01 · Der Bauplan", dur: 8, align: "top",
      items: [LV.page({ letter: BRIEF, outlines: { at: 0.6, stagger: 0.3 }, height: 430, at: 0.4,
        marks: [{ zone: 0, n: "9", at: 4.6, label: "Neun Plätze", note: "Jede Zone hat ihren festen Platz.", until: 7.3 }] })]
    }),

    LV.scene({
      kicker: "02 · Oben", dur: 11, align: "top",
      items: [LV.page({ letter: BRIEF, at: 0.4,
        show: [{ zone: 1, at: -1 }, { zone: 2, at: -1 }, { zone: 3, at: -1 }],
        focus: [{ at: 0, r: [10, 8, 200, 100] }, { at: 0.6, zone: 1, pad: { x: 20, y: 14 } }, { at: 3.6, zone: 2, pad: { x: 12, y: 10 } }, { at: 7.4, zone: 3, pad: { x: 40, y: 20 } }],
        marks: [
          { zone: 1, at: 0.8, label: "Briefkopf", note: "Klein: 8 pt." },
          { zone: 2, at: 3.8, label: "Anschriftfeld", note: "Ab 45 mm von oben.", ruler: { from: 0, to: 45, x: 8, label: "45 mm" } },
          { zone: 3, at: 7.6, label: "Informationsblock", note: "Datum rechts: TT.MM.JJJJ." }
        ] })]
    }),

    LV.scene({
      kicker: "03 · Die Mitte", dur: 11, align: "top",
      items: [LV.page({ letter: BRIEF, at: 0.4,
        show: [{ zone: 1, at: -1 }, { zone: 2, at: -1 }, { zone: 3, at: -1 }, { zone: 4, at: -1 }, { zone: 5, at: -1 }, { zone: 6, at: -1 }],
        focus: [{ at: 0, r: [10, 50, 200, 130] }, { at: 0.6, zone: 4, pad: { x: 40, y: 12 } }, { at: 4, zone: 5, pad: { x: 40, y: 12 } }, { at: 7.4, zone: 6, pad: { x: 8, y: 8 } }],
        marks: [
          { zone: 4, at: 0.8, label: "Betreffzeile", note: "Fett. Ohne „Betreff“, ohne Punkt." },
          { zone: 5, at: 4.2, label: "Anrede", note: "Mit Komma." },
          { zone: 6, at: 7.6, label: "Brieftext", note: "Ein Gedanke pro Absatz." }
        ] })]
    }),

    LV.scene({
      kicker: "04 · Das Ende", dur: 11, align: "top",
      items: [LV.page({ letter: BRIEF, at: 0.4,
        focus: [{ at: 0, r: [10, 90, 200, 190] }, { at: 0.6, zone: 7, pad: { x: 40, y: 12 } }, { at: 4, zone: 8, pad: { x: 40, y: 8 } }, { at: 7.4, zone: 9, pad: { x: 40, y: 12 } }],
        marks: [
          { zone: 7, at: 0.8, label: "Grußformel", note: "Ohne Komma." },
          { zone: 8, at: 4.2, label: "Unterschrift", note: "3 Leerzeilen Platz." },
          { zone: 9, at: 7.6, label: "Anlagen", note: "Was liegt dabei?" }
        ] })]
    }),

    LV.scene({
      kicker: "05 · Kurz testen", dur: 9,
      items: [LV.quiz("Wo steht das Datum im Brief? <b>Zone?</b>", ["Briefkopf", "Informationsblock", "Betreffzeile"], 1, { at: 0.4, reveal: 6.2 })]
    }),

    LV.outro({ text: "Jetzt <mark>Zonen</mark> zuordnen.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
