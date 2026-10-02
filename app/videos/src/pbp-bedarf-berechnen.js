/* Erklärvideo · PBP · Lernsituation 2.1, Teil 1 „Personalbedarf berechnen“
   Modellunternehmen: Mediaworld, „ein Jahr später“ – bewusst andere Zahlen als in den Kursaufgaben (A1–A8).
   Begriffe wie in der Lektion: Ist − Abgänge + Zugänge = Zwischensumme · Soll − Zwischensumme = Personalbedarf
   (Brutto-/Nettopersonalbedarf und Fortschreibung kommen erst im Übungsblatt 1 – hier nicht verwenden!)
   Rechnung: 23 − 4 + 1 = 20 (Zwischensumme) · 25 − 20 = 5 (Personalbedarf)
   Gleicher Fall wie im Video pbp-ersatz-neubedarf (dort in Ersatz- und Neubedarf zerlegt). */
LV.video({
  id: "pbp-bedarf-berechnen",
  title: "Personalbedarf berechnen",
  poster: 22.4,   // Zeitpunkt (s) für das Vorschaubild
  bpm: 92, mood: "calm",
  scenes: [
    LV.title({
      kicker: "PBP · Personalbedarf berechnen",
      title: "Wie viele fehlen wirklich?",
      sub: "Mediaworld, ein Jahr später.",
      dur: 4.5
    }),

    LV.scene({
      kicker: "01 · Die Frage", dur: 6.5,
      items: [
        LV.text("Mediaworld braucht <mark>25</mark> Leute.", { size: "xl", at: 0.5 }),
        LV.text("Heute arbeiten dort <b>23</b>.", { size: "l", at: 1.8 }),
        LV.text("Also <em>2</em> einstellen?", { size: "l", at: 3.4, until: 5.7 }),
        LV.text("Nicht so schnell.", { size: "m", at: 4.7, tone: "mut" })
      ]
    }),

    LV.scene({
      kicker: "02 · Die Falle", dur: 6.5,
      items: [
        LV.text("Im Jahr <mark>ändert sich</mark> der Bestand.", { size: "xl", at: 0.5 }),
        LV.chips(["− Abgänge", "+ Zugänge"], { at: 2.2 }),
        LV.text("Wer geht? Wer kommt <em>fest</em> dazu?", { size: "m", at: 3.4 }),
        LV.text("Das zählt zuerst.", { size: "m", at: 4.5, tone: "mut" })
      ]
    }),

    LV.scene({
      kicker: "03 · Die Zwischensumme", dur: 8.5,
      items: [
        LV.scheme([
          { label: "Ist-Personalbestand", sub: "wer jetzt da ist", value: 23 },
          { op: "−", label: "Abgänge", value: 4 },
          { op: "+", label: "Zugänge", value: 1 },
          { op: "=", label: "Zwischensumme", sub: "so viele sind dann wirklich da", value: 20, line: true }
        ], { title: "Rechenschema", at: 0.5, gap: 0.85 }),
        LV.text("Das ist der <em>neue</em> Bestand.", { size: "m", at: 5.2 })
      ]
    }),

    LV.scene({
      kicker: "04 · Der Personalbedarf", dur: 8.5,
      items: [
        LV.scheme([
          { label: "Soll", sub: "so viele braucht der Betrieb", value: 25 },
          { op: "−", label: "Zwischensumme", value: 20 },
          { op: "=", label: "Personalbedarf", value: 5, line: true, hi: true }
        ], { title: "Soll minus Zwischensumme", at: 0.5, gap: 0.9 }),
        LV.term(["› 5 neue Stellen"], { at: 4.2 })
      ]
    }),

    LV.scene({
      kicker: "05 · Kurz testen", dur: 9,
      items: [
        LV.quiz("Mediaworld-Lager: Soll 12, Zwischensumme 10. <b>Personalbedarf?</b>", ["2", "22", "−2"], 0, { at: 0.4, reveal: 6.2 })
      ]
    }),

    LV.outro({ text: "Jetzt <mark>selbst</mark> rechnen.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
