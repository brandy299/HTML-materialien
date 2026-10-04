/* Erklärvideo · PBP · Übungsblatt „Ausbildungsbedarf“ (Fachkräfte von morgen)
   Modellunternehmen: Mediaworld, „ein Jahr später“ – bewusst andere Zahlen als in den Kursaufgaben (dort: 9/12/15 ÷ 3).
   Begriffe wie in der Lektion: benötigte Fachkräfte ÷ Ausbildungsjahre = Plätze pro Jahr · Azubis lösen keinen akuten Bedarf.
   Rechnung: 18 ÷ 3 = 6 Plätze pro Jahr · Kurztest: 21 ÷ 3 = 7 (Ablenker 18 = 21 − 3, 63 = 21 × 3) */
LV.video({
  id: "pbp-ausbildungsbedarf",
  title: "Wie viele Azubis pro Jahr?",
  poster: 24.5,
  bpm: 94, mood: "calm",
  scenes: [
    LV.title({ kicker: "PBP · Ausbildungsbedarf", title: "Wie viele Azubis pro Jahr?", sub: "Mediaworld, ein Jahr später.", dur: 4.5 }),

    LV.scene({
      kicker: "01 · Die Frage", dur: 7,
      items: [
        LV.text("Bald fehlen Mediaworld <mark>18</mark> Fachkräfte.", { size: "xl", at: 0.5 }),
        LV.text("Ausbildung dauert <b>3</b> Jahre.", { size: "l", at: 1.9 }),
        LV.text("18 Azubis auf einmal?", { size: "l", at: 3.5, until: 5.6 }),
        LV.text("Zu viele.", { size: "m", at: 4.8, tone: "mut" })
      ]
    }),

    LV.scene({
      kicker: "02 · Die Falle", dur: 6.5,
      items: [
        LV.text("Azubis lösen <mark>keinen akuten</mark> Bedarf.", { size: "xl", at: 0.5 }),
        LV.text("Ausbildung dauert drei Jahre.", { size: "m", at: 2.6 }),
        LV.text("Der Bedarf von heute bleibt.", { size: "m", at: 4.0, tone: "mut" })
      ]
    }),

    LV.scene({
      kicker: "03 · Die Rechnung", dur: 8.5,
      items: [
        LV.scheme([
          { label: "Benötigte Fachkräfte", sub: "in den nächsten Jahren", value: 18 },
          { op: "÷", label: "Ausbildungsjahre", value: 3 },
          { op: "=", label: "Plätze pro Jahr", value: 6, line: true, hi: true }
        ], { title: "Fachkräfte ÷ Ausbildungsjahre", at: 0.5, gap: 0.9 }),
        LV.term(["› 6 pro Jahr"], { at: 4.4 })
      ]
    }),

    LV.scene({
      kicker: "04 · Lohnt sich das?", dur: 8,
      items: [
        LV.text("Warum trotzdem <mark>ausbilden</mark>?", { size: "xl", at: 0.5 }),
        LV.stack([
          { label: "Kosten", text: "Vergütung, Berufsschule, Zeit." },
          { label: "Nutzen", text: "Azubis kennen die Abläufe.", tone: "green" }
        ], { at: 2.4, stagger: 1.0 }),
        LV.text("Übernahme sichert <em>Fachkräfte</em>.", { size: "m", at: 5.6 })
      ]
    }),

    LV.scene({
      kicker: "05 · Kurz testen", dur: 9,
      items: [
        LV.quiz("Mediaworld braucht 21 Fachkräfte in 3 Jahren. <b>Plätze pro Jahr?</b>", ["7", "18", "63"], 0, { at: 0.4, reveal: 6.2 })
      ]
    }),

    LV.outro({ text: "Jetzt <mark>selbst</mark> rechnen.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
