/* Erklärvideo · Englisch · Present Perfect – die Idee (Beispiel für Zeitstrahl, Bauplan-Kästen und Schlagwörter) */
LV.video({
  id: "englisch-present-perfect",
  title: "Present Perfect – die Idee",
  poster: 10.8,   // Zeitpunkt (s) für das Vorschaubild
  bpm: 96, mood: "bright",
  scenes: [
    LV.title({ kicker: "Englisch · Zeitformen", title: "Present Perfect.", sub: "Die Vergangenheit, die <b>jetzt noch zählt</b>.", dur: 4.5 }),

    LV.scene({
      kicker: "01 · Die Idee", dur: 7.5,
      items: [
        LV.text("Etwas passierte. <mark>Es wirkt noch.</mark>", { size: "xl", at: 0.4 }),
        LV.timeline({
          at: 2.0,
          marks: [{ x: 0.08, label: "damals", sub: "Schlüssel verloren" }, { x: 0.92, label: "jetzt", sub: "Tür bleibt zu", kind: "now" }],
          arc: { from: 0.08, to: 0.92, at: 3.4 }
        }),
        LV.text("I <b>have lost</b> my keys.", { size: "l", at: 5.0, anim: "words" })
      ]
    }),

    LV.scene({
      kicker: "02 · Die Bildung", dur: 6.5,
      items: [
        LV.stack([
          { label: "Subjekt", text: "They" },
          { label: "+ have / has", text: "have", tone: "pink" },
          { label: "+ 3. Form (V3)", text: "written", tone: "green" }
        ], { at: 0.5, stagger: 0.55 }),
        LV.text("They have written the report.", { size: "m", at: 3.6 })
      ]
    }),

    LV.scene({
      kicker: "03 · Seit wann?", dur: 7,
      items: [
        LV.text("<b>for</b> = wie lange<br><em>since</em> = seit wann", { size: "l", at: 0.4 }),
        LV.timeline({
          at: 1.6,
          ticks: ["2022", "2023", "2024", "2025", "2026"],
          range: { from: 0.25, to: 1, label: "since 2023", at: 2.4 },
          marks: [{ x: 1, kind: "now", at: 3.4 }]
        }),
        LV.chips(["ever", "never", "already", "yet"], { at: 4.4 })
      ]
    }),

    LV.outro({ text: "Jetzt <mark>üben</mark>.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
