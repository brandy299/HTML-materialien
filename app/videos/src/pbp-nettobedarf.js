/* Erklärvideo · PBP · Nettopersonalbedarf (Lernsituation 2.1, Teil 1)
   Modellunternehmen: Mediaworld, „ein Jahr später“ – bewusst andere Zahlen als in den Kursaufgaben (A1–A8).
   Rechnung: 23 − 4 + 1 = 20 (Bestand am Jahresende) · 25 − 20 = 5 (Nettopersonalbedarf)
   Gleicher Fall wie im Video pbp-ersatz-neubedarf (dort in Ersatz- und Neubedarf zerlegt). */
LV.video({
  id: "pbp-nettobedarf",
  title: "Nettopersonalbedarf",
  bpm: 92, mood: "calm",
  scenes: [
    LV.title({
      kicker: "PBP · Nettopersonalbedarf",
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
      kicker: "03 · Der Bestand", dur: 8.5,
      items: [
        LV.scheme([
          { label: "Ist-Personalbestand", sub: "wer jetzt da ist", value: 23 },
          { op: "−", label: "Abgänge", value: 4 },
          { op: "+", label: "Zugänge", value: 1 },
          { op: "=", label: "Bestand am Jahresende", value: 20, line: true }
        ], { title: "Fortschreibung", at: 0.5, gap: 0.85 }),
        LV.text("So viele sind dann <em>wirklich</em> da.", { size: "m", at: 5.2 })
      ]
    }),

    LV.scene({
      kicker: "04 · Der Bedarf", dur: 8.5,
      items: [
        LV.scheme([
          { label: "Bruttopersonalbedarf", sub: "so viele braucht der Betrieb", value: 25 },
          { op: "−", label: "Bestand am Jahresende", value: 20 },
          { op: "=", label: "Nettopersonalbedarf", value: 5, line: true, hi: true }
        ], { title: "Soll minus Bestand", at: 0.5, gap: 0.9 }),
        LV.term(["› 5 neue Stellen"], { at: 4.2 })
      ]
    }),

    LV.scene({
      kicker: "05 · Kurz testen", dur: 9,
      items: [
        LV.quiz("Mediaworld-Lager: Soll 12, Bestand am Jahresende 10. <b>Nettopersonalbedarf?</b>", ["2", "22", "−2"], 0, { at: 0.4, reveal: 6.2 })
      ]
    }),

    LV.outro({ text: "Jetzt <mark>selbst</mark> rechnen.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
