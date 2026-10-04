/* Erklärvideo · PBP · Übungsblatt 2 „Stellenplan & Kennzahlen“
   Modellunternehmen: Mediaworld, „ein Jahr später“ – bewusst andere Zahlen als in den Kursaufgaben (A2: 3 600 000 ÷ 200 000, 2 800 000 ÷ 140 000, 3 400 000 ÷ 200 000).
   Begriffe wie im Übungsblatt: Stellenplan (zählen, genau, aufwendig) · Kennzahlen (rechnen, schnell, grob) · Umsatz ÷ Umsatz je Vollzeitstelle.
   Rechnung: 3 300 000 € ÷ 150 000 € = 330 ÷ 15 = 22 Vollzeitstellen · Kurztest: 2 000 000 ÷ 80 000 = 200 ÷ 8 = 25 */
LV.video({
  id: "pbp-stellenplan-kennzahlen",
  title: "Stellenplan oder Kennzahlen?",
  poster: 24,
  bpm: 94, mood: "calm",
  scenes: [
    LV.title({ kicker: "PBP · Bruttopersonalbedarf", title: "Zählen oder rechnen?", sub: "Mediaworld, zwei Methoden.", dur: 4.5 }),

    LV.scene({
      kicker: "01 · Zwei Wege", dur: 8,
      items: [
        LV.text("Wie viele Stellen braucht <mark>Mediaworld</mark>?", { size: "xl", at: 0.5 }),
        LV.stack([
          { label: "Stellenplan", text: "<b>Zählen</b>: jede Stelle einzeln.", tone: "pink" },
          { label: "Kennzahlen", text: "<b>Rechnen</b> mit dem Umsatz.", tone: "green" }
        ], { at: 2.4, stagger: 1.0 })
      ]
    }),

    LV.scene({
      kicker: "02 · Stellenplan", dur: 8,
      items: [
        LV.text("Jede Stelle wird <mark>einzeln</mark> gezählt.", { size: "xl", at: 0.5 }),
        LV.chips(["genau", "aufwendig"], { at: 2.6 }),
        LV.text("Gut für <em>kleine</em> Betriebe.", { size: "m", at: 4.4 })
      ]
    }),

    LV.scene({
      kicker: "03 · Kennzahlen", dur: 9.5,
      items: [
        LV.scheme([
          { label: "Umsatz", value: "3 300 000 €" },
          { op: "÷", label: "Umsatz je Vollzeitstelle", value: "150 000 €" },
          { op: "=", label: "Vollzeitstellen", value: 22, line: true, hi: true }
        ], { title: "Umsatz ÷ Umsatz je Vollzeitstelle", at: 0.5, gap: 1.0 }),
        LV.text("Schnell – aber <mark>grob</mark>.", { size: "m", at: 5.6 })
      ]
    }),

    LV.scene({
      kicker: "04 · Der Trick", dur: 8.5,
      items: [
        LV.text("Gleich viele <mark>Nullen</mark> streichen.", { size: "xl", at: 0.5 }),
        LV.text("3 300 000 ÷ 150 000", { size: "l", at: 2.6, tone: "mut" }),
        LV.text("330 ÷ 15 = <em>22</em>", { size: "xl", at: 4.2 })
      ]
    }),

    LV.scene({
      kicker: "05 · Die Falle", dur: 8,
      items: [
        LV.text("Kennzahlen sehen nur den <mark>Umsatz</mark>.", { size: "xl", at: 0.5 }),
        LV.text("Welche Bereiche Personal brauchen, zeigt der <b>Stellenplan</b>.", { size: "m", at: 3.0 })
      ]
    }),

    LV.scene({
      kicker: "06 · Kurz testen", dur: 9,
      items: [
        LV.quiz("Mediaworld-Filiale: Umsatz 2 000 000 €, je Vollzeitstelle 80 000 €. <b>Stellen?</b>", ["25", "250", "2,5"], 0, { at: 0.4, reveal: 6.4 })
      ]
    }),

    LV.outro({ text: "Jetzt <mark>selbst</mark> rechnen.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
