/* Erklärvideo · INWI · Teil 3 „Typische Fehler“ (Fehlerjagd)
   Modellunternehmen: Fly Bike Werke GmbH. Ein Brief mit sechs Fehlern – bewusst derselbe Briefinhalt wie in „Die neun Zonen“,
   aber falsch gesetzt. Die Aufgaben im Kurs („Finde den Fehler“) nutzen dieselben Fehlerarten mit anderen Zeilen.
   Fehler: 1 PLZ ohne Leerzeile · 2 Datum lang und links · 3 Betreff mit „Betreff“ und Punkt · 4 Anrede ohne Komma ·
   5 Gruß mit Komma · 6 Unterschrift: nur eine Leerzeile Platz. */
const FALSCH = {
  z1: ["Fly Bike Werke GmbH · Rostocker Str. 334 · 26121 Oldenburg"],
  z2: ["Sattel & Co. KG", "Frau Roth", "Lindenallee 5", "49074 Osnabrück"],
  z3: ["12. Oktober 2026"],
  z4: ["Betreff: Anfrage über Fahrradsättel."],
  z5: ["Sehr geehrte Frau Roth"],
  z6: ["wir bauen Citybikes und suchen neue Sättel.", "Bitte senden Sie uns Ihr Angebot."],
  z7: ["Mit freundlichen Grüßen,"],
  z8: ["", "Jan Weber"],
  z9: ["Anlage", "Prospekt Citybike"]
};

LV.video({
  id: "inwi-fehlerjagd",
  title: "Sechs Fehler im Brief",
  poster: 9,
  bpm: 104, mood: "bright",
  scenes: [
    LV.title({ kicker: "INWI · DIN 5008", title: "Sechs Fehler. Findest du sie?", sub: "Fehlerjagd bei Fly Bike Werke.", dur: 4.5 }),

    LV.scene({
      kicker: "01 · Die Jagd", dur: 7, align: "top",
      items: [LV.page({ letter: FALSCH, left: [3], at: 0.4, height: 400,
        marks: [{ zone: 0, n: "6", at: 1.2, label: "Sechs Fehler", note: "Schau genau hin." }] })]
    }),

    LV.scene({
      kicker: "02 · Oben", dur: 11, align: "top",
      items: [LV.page({ letter: FALSCH, left: [3], at: 0.4,
        focus: [{ at: 0, r: [10, 25, 200, 100] }, { at: 0.6, r: [18, 38, 160, 72] }, { at: 5.2, r: [18, 58, 170, 92] }],
        marks: [
          { zone: 2, n: "1", at: 0.9, label: "Keine Leerzeile", note: "Vor der PLZ fehlt eine." },
          { zone: 3, n: "2", at: 5.5, label: "Datum zu lang", note: "Kurz und rechts: 12.10.2026." }
        ] })]
    }),

    LV.scene({
      kicker: "03 · Die Mitte", dur: 11, align: "top",
      items: [LV.page({ letter: FALSCH, left: [3], at: 0.4,
        focus: [{ at: 0, r: [10, 60, 200, 140] }, { at: 0.6, r: [18, 80, 150, 104] }, { at: 5.2, r: [18, 86, 150, 112] }],
        marks: [
          { zone: 4, n: "3", at: 0.9, label: "Betreff", note: "Ohne „Betreff“, ohne Punkt." },
          { zone: 5, n: "4", at: 5.5, label: "Anrede", note: "Das Komma fehlt." }
        ] })]
    }),

    LV.scene({
      kicker: "04 · Das Ende", dur: 11, align: "top",
      items: [LV.page({ letter: FALSCH, left: [3], at: 0.4,
        focus: [{ at: 0, r: [10, 95, 200, 190] }, { at: 0.6, r: [18, 110, 150, 134] }, { at: 5.2, r: [18, 114, 150, 140] }],
        marks: [
          { zone: 7, n: "5", at: 0.9, label: "Gruß mit Komma", note: "Nach dem Gruß kein Komma." },
          { zone: 8, n: "6", at: 5.5, label: "Zu wenig Platz", note: "3 Leerzeilen für die Unterschrift." }
        ] })]
    }),

    LV.scene({
      kicker: "05 · Kurz testen", dur: 9,
      items: [LV.quiz("Welcher <b>Betreff</b> ist richtig?", ["Betreff: Anfrage über Sättel", "Anfrage über Sättel (fett, ohne Punkt)", "Anfrage über Sättel."], 1, { at: 0.4, reveal: 6.4 })]
    }),

    LV.outro({ text: "Jetzt <mark>Fehler</mark> jagen.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
