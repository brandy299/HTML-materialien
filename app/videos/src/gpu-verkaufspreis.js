/* Erklärvideo · GPU · AB 5 „Der Verkaufspreis“
   Modellunternehmen: Mediaworld e. K., Ware: eine Soundbar mit Bezugspreis 360,00 € (andere Zahlen als in den Kursaufgaben: dort 750 €, Gemeinkosten 20 %, Gewinn 20 %).
   Begriffe wie im Thema: Bezugspreis + Gemeinkosten = Selbstkosten · + Gewinnaufschlag = Barverkaufspreis · + Kundenskonto = Zielverkaufspreis · + Kundenrabatt = Listenverkaufspreis
   Rechnung: 360 + 25 % (90) = 450 · + 20 % von den Selbstkosten (90) = 540 · × 100 ÷ 96 = 562,50 · × 100 ÷ 90 = 625,00
   Falle: „+ 10 %“ statt hochrechnen: 562,50 × 1,10 = 618,75 → Kunde zieht 10 % ab = 556,88 (zu wenig) */
LV.video({
  id: "gpu-verkaufspreis",
  title: "Der Verkaufspreis",
  poster: 34,
  bpm: 98, mood: "bright",
  scenes: [
    LV.title({ kicker: "GPU · Verkaufskalkulation", title: "Vom Einkauf ins Regal.", sub: "Mediaworld, in einer Minute.", dur: 4.5 }),

    LV.scene({
      kicker: "01 · Die Frage", dur: 7,
      items: [
        LV.text("Die Soundbar kostet uns <mark>360 €</mark>.", { size: "xl", at: 0.5 }),
        LV.text("Im Regal muss sie mehr kosten.", { size: "l", at: 2.6 }),
        LV.chips(["Miete", "Personal", "Strom", "Werbung"], { at: 4.0 })
      ]
    }),

    LV.scene({
      kicker: "02 · Selbstkosten", dur: 8,
      items: [
        LV.scheme([
          { label: "Bezugspreis", value: "360,00 €" },
          { op: "+", label: "Gemeinkosten 25 %", value: "90,00 €" },
          { op: "=", label: "Selbstkosten", value: "450,00 €", line: true }
        ], { title: "Handelskalkulation", at: 0.5, gap: 1.0 }),
        LV.text("Das kostet der Betrieb <em>insgesamt</em>.", { size: "m", at: 4.6 })
      ]
    }),

    LV.scene({
      kicker: "03 · Der Gewinn", dur: 8.5,
      items: [
        LV.scheme([
          { label: "Selbstkosten", value: "450,00 €" },
          { op: "+", label: "Gewinnaufschlag 20 %", value: "90,00 €" },
          { op: "=", label: "Barverkaufspreis", value: "540,00 €", line: true }
        ], { title: "Handelskalkulation", at: 0.5, gap: 1.0 }),
        LV.text("Gewinn: immer von den <mark>Selbstkosten</mark>.", { size: "m", at: 4.6 })
      ]
    }),

    LV.scene({
      kicker: "04 · Hochrechnen", dur: 10,
      items: [
        LV.scheme([
          { label: "Barverkaufspreis", value: "540,00 €" },
          { op: "=", label: "Zielverkaufspreis", sub: "Skonto 4 %: × 100 ÷ 96", value: "562,50 €" },
          { op: "=", label: "Listenverkaufspreis", sub: "Rabatt 10 %: × 100 ÷ 90", value: "625,00 €", line: true, hi: true }
        ], { title: "Nachlässe hochrechnen", at: 0.5, gap: 1.2 }),
        LV.text("Das ist der Preis im <em>Angebot</em>.", { size: "m", at: 6.0 })
      ]
    }),

    LV.scene({
      kicker: "05 · Die Falle", dur: 9,
      items: [
        LV.text("Nicht <mark>draufschlagen</mark>.", { size: "xl", at: 0.5 }),
        LV.text("562,50&nbsp;€ + 10&nbsp;% = 618,75&nbsp;€", { size: "m", at: 2.2, tone: "mut" }),
        LV.text("Der Kunde zieht 10&nbsp;% ab: nur <b>556,88&nbsp;€</b>.", { size: "m", at: 4.0 }),
        LV.text("Immer <em>hochrechnen</em>.", { size: "m", at: 6.0 })
      ]
    }),

    LV.scene({
      kicker: "06 · Kurz testen", dur: 9,
      items: [
        LV.quiz("Gewinnaufschlag 20 %: Wovon wird er <b>berechnet</b>?", ["Bezugspreis", "Selbstkosten", "Barverkaufspreis"], 1, { at: 0.4, reveal: 6.4 })
      ]
    }),

    LV.outro({ text: "Jetzt <mark>selbst</mark> rechnen.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
