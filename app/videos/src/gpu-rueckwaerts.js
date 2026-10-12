/* Erklärvideo · GPU · AB 6 „Rückwärtskalkulation“
   Modellunternehmen: Mediaworld e. K., Ware: eine Gaming-Maus, Marktpreis (Listenverkaufspreis) 200,00 € (andere Zahlen als in den Kursaufgaben: dort 500 €/Notebook-Ständer und 150 €/Kopfhörer).
   Begriffe wie im Thema: Listenverkaufspreis · Zielverkaufspreis · Barverkaufspreis · Selbstkosten · Bezugspreis (höchstens)
   Rechnung: 200,00 × 0,90 = 180,00 (Rabatt 10 %) · × 0,96 = 172,80 (Skonto 4 %) · ÷ 1,20 = 144,00 (Gewinn 20 %) · ÷ 1,20 = 120,00 (Gemeinkosten 20 %)
   Falle: 172,80 − 20 % = 138,24 (zu niedrig) statt 172,80 ÷ 1,20 = 144,00
   Kurztest: Barverkaufspreis 120,00 €, Gewinn 20 % → Selbstkosten 100,00 € (nicht 96,00 €) */
LV.video({
  id: "gpu-rueckwaerts",
  title: "Rückwärtskalkulation",
  poster: 37,   // Zeitpunkt (s) für das Vorschaubild
  bpm: 98, mood: "bright",
  scenes: [
    LV.title({ kicker: "GPU · Rückwärtskalkulation", title: "Wie teuer darf der Einkauf sein?", sub: "Mediaworld, in einer Minute.", dur: 4.5 }),

    LV.scene({
      kicker: "01 · Die Frage", dur: 7.5,
      items: [
        LV.text("Die Gaming-Maus kostet am Markt <mark>200 €</mark>.", { size: "xl", at: 0.5 }),
        LV.text("Der Preis steht <em>fest</em>.", { size: "l", at: 3.0 }),
        LV.text("Wie viel darf der Einkauf höchstens kosten?", { size: "m", at: 4.6, tone: "mut" })
      ]
    }),

    LV.scene({
      kicker: "02 · Die Regel", dur: 9,
      items: [
        LV.text("Rückwärts rechnest du <mark>Stufe für Stufe</mark>.", { size: "l", at: 0.5 }),
        LV.stack([
          { label: "Rabatt · Skonto", text: "mal 0,90 · mal 0,96", tone: "green" },
          { label: "Gewinn · Gemeinkosten", text: "teilen durch 1,20", tone: "pink" }
        ], { at: 2.6, stagger: 1.4 }),
        LV.text("Aufschläge werden nicht abgezogen.", { size: "m", at: 6.4, tone: "mut" })
      ]
    }),

    LV.scene({
      kicker: "03 · Nachlässe zurück", dur: 9.5,
      items: [
        LV.scheme([
          { label: "Listenverkaufspreis", value: "200,00 €" },
          { op: "=", label: "Zielverkaufspreis", sub: "Rabatt 10 %: × 0,90", value: "180,00 €" },
          { op: "=", label: "Barverkaufspreis", sub: "Skonto 4 %: × 0,96", value: "172,80 €", line: true }
        ], { title: "Von oben nach unten", at: 0.5, gap: 1.3 }),
        LV.text("Der Nachlass steckt schon im Preis.", { size: "m", at: 6.2 })
      ]
    }),

    LV.scene({
      kicker: "04 · Aufschläge teilen", dur: 10,
      items: [
        LV.scheme([
          { label: "Barverkaufspreis", value: "172,80 €" },
          { op: "=", label: "Selbstkosten", sub: "Gewinn 20 %: ÷ 1,20", value: "144,00 €" },
          { op: "=", label: "Bezugspreis (höchstens)", sub: "Gemeinkosten 20 %: ÷ 1,20", value: "120,00 €", line: true, hi: true }
        ], { title: "Durch den Aufschlag teilen", at: 0.5, gap: 1.3 }),
        LV.text("Mehr als 120 € darf der Einkauf nicht kosten.", { size: "m", at: 6.4 })
      ]
    }),

    LV.scene({
      kicker: "05 · Die Falle", dur: 9,
      items: [
        LV.text("Nicht einfach <mark>abziehen</mark>.", { size: "xl", at: 0.5 }),
        LV.text("172,80&nbsp;€ − 20&nbsp;% = 138,24&nbsp;€", { size: "m", at: 2.2, tone: "mut" }),
        LV.text("Zu niedrig! Richtig: ÷ 1,20 = <b>144,00&nbsp;€</b>.", { size: "m", at: 4.0 }),
        LV.text("Aufschläge immer <em>teilen</em>.", { size: "m", at: 6.2 })
      ]
    }),

    LV.scene({
      kicker: "06 · Kurz testen", dur: 9.5,
      items: [
        LV.quiz("Barverkaufspreis 120,00 €, Gewinn 20 %. Die <b>Selbstkosten</b> sind …", ["100,00 €", "96,00 €", "144,00 €"], 0, { at: 0.4, reveal: 6.6 })
      ]
    }),

    LV.outro({ text: "Jetzt <mark>selbst</mark> rechnen.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
