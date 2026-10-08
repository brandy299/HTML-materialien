/* Erklärvideo · PBP · Lernsituation 2.2, Teil 3 „Der Code der Stellenanzeige“
   Modellunternehmen: Mediaworld, „ein Jahr später“ – anderes Szenario als in den Kursaufgaben.
   Begriffe wie in der Lektion: sechs Bausteine · Floskeln · Warnsignale. */

LV.video({
  id: "pbp-anzeigen-code",
  title: "Der Code der Stellenanzeige",
  poster: 24.0,   // Zeitpunkt (s) für das Vorschaubild (sechs Bausteine)
  bpm: 92, mood: "calm",
  scenes: [
    LV.title({
      kicker: "PBP · Stellenanzeigen lesen",
      title: "Der Code der Stellenanzeige",
      sub: "Mediaworld, ein Jahr später.",
      dur: 4.5
    }),

    LV.scene({
      kicker: "01 · Die Frage", dur: 7,
      items: [
        LV.text("m/w/d … z. K. … flache Hierarchien …", { size: "l", at: 0.5 }),
        LV.text("Was heißt das <mark>alles</mark>?", { size: "xl", at: 2.0 }),
        LV.text("Anzeigen haben ihren eigenen Code.", { size: "m", at: 3.8, tone: "mut" })
      ]
    }),

    LV.scene({
      kicker: "02 · Die ersten drei Bausteine", dur: 8.5,
      items: [
        LV.stack([
          { label: "1", text: "Wer wir sind" },
          { label: "2", text: "Was wir bieten" },
          { label: "3", text: "Wen wir suchen" }
        ], { at: 0.5, stagger: 0.6 }),
        LV.text("Jede Anzeige beginnt mit Werbung.", { size: "m", at: 4.8 })
      ]
    }),

    LV.scene({
      kicker: "03 · Die letzten drei Bausteine", dur: 8.5,
      items: [
        LV.stack([
          { label: "4", text: "Deine Aufgaben" },
          { label: "5", text: "Dein Profil" },
          { label: "6", text: "So bewirbst du dich" }
        ], { at: 0.5, stagger: 0.6 }),
        LV.text("Am Ende steht, wie du dich bewirbst.", { size: "m", at: 4.8 })
      ]
    }),

    LV.scene({
      kicker: "04 · Floskeln übersetzen", dur: 8,
      items: [
        LV.text("Floskeln – einfach übersetzt:", { size: "xl", at: 0.5 }),
        LV.chips(["hält Stress aus", "springt ein", "arbeitet im Team", "fängt allein an"], { at: 2.2 }),
        LV.text("Nie blind überfliegen.", { size: "m", at: 5.4, tone: "mut" })
      ]
    }),

    LV.scene({
      kicker: "05 · Die Falle", dur: 7.5,
      items: [
        LV.text("Warnsignale <mark>erkennen</mark>.", { size: "xl", at: 0.5 }),
        LV.chips(["kein Firmenname", "nur Handynummer", "Druck und Eile", "Vorauszahlung"], { at: 2.0 }),
        LV.text("Gute Anzeigen werben um dich.", { size: "m", at: 4.9, tone: "mut" })
      ]
    }),

    LV.scene({
      kicker: "06 · Kurz testen", dur: 9,
      items: [
        LV.quiz("Kein Firmenname, nur eine Handynummer, Druck. Die Anzeige ist …", ["unseriös", "seriös", "amtlich"], 0, { at: 0.4, reveal: 6.2 })
      ]
    }),

    LV.outro({ text: "Jetzt <mark>selbst</mark> analysieren.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
