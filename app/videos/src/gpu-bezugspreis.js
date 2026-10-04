/* Erklärvideo · GPU · AB 4 „Der Bezugspreis“
   Modellunternehmen: Mediaworld e. K., Ware: eine Soundbar (nicht der Fernseher der Kursaufgaben; andere Zahlen).
   Begriffe wie im Thema: Listeneinkaufspreis − Lieferantenrabatt = Zieleinkaufspreis · − Lieferantenskonto = Bareinkaufspreis · + Bezugskosten = Bezugspreis
   Rechnung: 400,00 − 10 % (40,00) = 360,00 · − 2 % Skonto vom Zieleinkaufspreis (7,20) = 352,80 · + Bezugskosten 7,20 → 360,00 hätte verwirrt, daher 17,20 → 370,00 */
LV.video({
  id: "gpu-bezugspreis",
  title: "Der Bezugspreis",
  poster: 34.5,
  bpm: 96, mood: "calm",
  scenes: [
    LV.title({ kicker: "GPU · Bezugskalkulation", title: "Was kostet die Ware wirklich?", sub: "Mediaworld, in einer Minute.", dur: 4.5 }),

    LV.scene({
      kicker: "01 · Die Frage", dur: 7,
      items: [
        LV.text("Eine <mark>Soundbar</mark> für 400 €.", { size: "xl", at: 0.5 }),
        LV.text("So steht es im Angebot.", { size: "m", at: 2.2, tone: "mut" }),
        LV.text("Bezahlt wird <em>weniger</em> …", { size: "l", at: 3.6 }),
        LV.text("… und doch kommt etwas <b>dazu</b>.", { size: "l", at: 5.0 })
      ]
    }),

    LV.scene({
      kicker: "02 · Erst der Rabatt", dur: 8,
      items: [
        LV.scheme([
          { label: "Listeneinkaufspreis", sub: "Katalogpreis", value: "400,00 €" },
          { op: "−", label: "Lieferantenrabatt 10 %", value: "40,00 €" },
          { op: "=", label: "Zieleinkaufspreis", value: "360,00 €", line: true }
        ], { title: "Bezugskalkulation", at: 0.5, gap: 1.0 }),
        LV.text("Der Rabatt kommt <mark>zuerst</mark>.", { size: "m", at: 4.6 })
      ]
    }),

    LV.scene({
      kicker: "03 · Dann das Skonto", dur: 9,
      items: [
        LV.scheme([
          { label: "Zieleinkaufspreis", value: "360,00 €" },
          { op: "−", label: "Lieferantenskonto 2 %", value: "7,20 €" },
          { op: "=", label: "Bareinkaufspreis", value: "352,80 €", line: true }
        ], { title: "Bezugskalkulation", at: 0.5, gap: 1.0 }),
        LV.text("Skonto: immer vom <mark>Zieleinkaufspreis</mark>.", { size: "m", at: 4.6 })
      ]
    }),

    LV.scene({
      kicker: "04 · Die Lieferung", dur: 9.5,
      items: [
        LV.scheme([
          { label: "Bareinkaufspreis", value: "352,80 €" },
          { op: "+", label: "Bezugskosten", sub: "Fracht, Verpackung", value: "17,20 €" },
          { op: "=", label: "Bezugspreis", value: "370,00 €", line: true, hi: true }
        ], { title: "Bezugskalkulation", at: 0.5, gap: 1.0 }),
        LV.chips(["Fracht", "Verpackung", "Versicherung"], { at: 4.6 }),
        LV.text("Das kostet die Soundbar <em>wirklich</em>.", { size: "m", at: 6.4 })
      ]
    }),

    LV.scene({
      kicker: "05 · Kurz testen", dur: 9,
      items: [
        LV.quiz("Skonto 2 %: Von welchem Preis wird es <b>berechnet</b>?", ["Listeneinkaufspreis", "Zieleinkaufspreis", "Bezugspreis"], 1, { at: 0.4, reveal: 6.4 })
      ]
    }),

    LV.outro({ text: "Jetzt <mark>selbst</mark> rechnen.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
