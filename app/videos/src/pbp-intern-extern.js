/* Erklärvideo · PBP · Lernsituation 2.2, Teil 1 „Intern oder extern?“
   Modellunternehmen: Mediaworld, „ein Jahr später“ – bewusst anderes Szenario als in den
   Kursaufgaben (dort: Lagermitarbeiter → Werkstatt/Verkauf, 3 Stellen). Hier: Verkauf + Empfang.
   Begriffe wie in der Lektion: Personalbeschaffung · intern/extern · Versetzung, Beförderung,
   Umschulung, Übernahme · „Das Loch wandert.“ */

LV.video({
  id: "pbp-intern-extern",
  title: "Intern oder extern?",
  poster: 28.6,   // Zeitpunkt (s) für das Vorschaubild (Falle „Das Loch wandert“)
  bpm: 92, mood: "calm",
  scenes: [
    LV.title({
      kicker: "PBP · Personalbeschaffung",
      title: "Intern oder extern?",
      sub: "Mediaworld, ein Jahr später.",
      dur: 4.5
    }),

    LV.scene({
      kicker: "01 · Die Lage", dur: 6.5,
      items: [
        LV.text("Zwei Stellen sind <mark>frei</mark>.", { size: "xl", at: 0.5 }),
        LV.text("Im Verkauf fehlt eine Kraft.", { size: "l", at: 1.8 }),
        LV.text("Und am Empfang auch.", { size: "l", at: 3.2 }),
        LV.text("Woher nehmen?", { size: "m", at: 4.6, tone: "mut" })
      ]
    }),

    LV.scene({
      kicker: "02 · Der interne Weg", dur: 8,
      items: [
        LV.text("<mark>Intern</mark> heißt: aus dem eigenen Betrieb.", { size: "xl", at: 0.5 }),
        LV.chips(["Versetzung", "Beförderung", "Umschulung", "Übernahme"], { at: 2.4 }),
        LV.text("Die Person kennt den Betrieb – kaum Einarbeitung.", { size: "m", at: 5.0 })
      ]
    }),

    LV.scene({
      kicker: "03 · Der externe Weg", dur: 8,
      items: [
        LV.text("<mark>Extern</mark> heißt: von außen.", { size: "xl", at: 0.5 }),
        LV.chips(["Stellenanzeige", "Arbeitsagentur", "Jobbörse", "Personalberater"], { at: 2.4 }),
        LV.text("Neue Ideen – aber Einarbeitung nötig.", { size: "m", at: 5.0 })
      ]
    }),

    LV.scene({
      kicker: "04 · Die Falle", dur: 7.5,
      items: [
        LV.text("Die alte Stelle wird trotzdem frei.", { size: "l", at: 0.5 }),
        LV.text("Das Loch <mark>wandert</mark>.", { size: "xl", at: 2.2 }),
        LV.text("Wer wechselt, fehlt an seiner alten Stelle.", { size: "m", at: 4.4, tone: "mut" })
      ]
    }),

    LV.scene({
      kicker: "05 · Kurz testen", dur: 9,
      items: [
        LV.quiz("Eine Verkäuferin wird <b>Abteilungsleitung</b>. Was ist das?", ["Intern", "Extern", "Zeitarbeit"], 0, { at: 0.4, reveal: 6.2 })
      ]
    }),

    LV.outro({ text: "Jetzt <mark>selbst</mark> üben.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
