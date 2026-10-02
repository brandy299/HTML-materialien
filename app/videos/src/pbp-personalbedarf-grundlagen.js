/* Erklärvideo · PBP · Lektion 1 – Personalbedarf berechnen
   Fall: „Bäckerei Sonne“ – bewusst ANDERE Zahlen als in den Kursaufgaben
   (Kurs rechnet mit Mediaworld 21 / Blumenladen 5), damit das Video die Lösung nicht verrät.
   Rechnung: 12 − 3 + 1 = 10 (Zwischensumme) · 14 − 10 = 4 (Personalbedarf)
   Aufbau nach docs/VIDEO-DESIGNSPRACHE.md: Titel → Warum → Fall → Rechenweg → Falle → Kurztest → Schluss */
LV.video({
  id: "pbp-personalbedarf-grundlagen",
  title: "Personalbedarf in einer Minute",
  bpm: 92, mood: "calm",
  scenes: [
    LV.title({
      kicker: "PBP · Lektion 1",
      title: "Wie viele Leute fehlen?",
      sub: "Personalbedarf – in einer Minute.",
      dur: 4.2
    }),

    LV.scene({
      kicker: "01 · Warum?", dur: 6,
      items: [
        LV.text("Zu <b>wenig</b> Personal: Arbeit bleibt liegen.", { size: "m", at: 0.5 }),
        LV.text("Zu <b>viel</b> Personal: kostet unnötig Geld.", { size: "m", at: 1.9 }),
        LV.text("Darum wird der Bedarf <mark>geplant</mark>.", { size: "m", at: 3.3 })
      ]
    }),

    LV.scene({
      kicker: "02 · Der Fall", dur: 7.5,
      items: [
        LV.text("Bäckerei Sonne hat <b>12</b> Beschäftigte.", { size: "l", at: 0.5 }),
        LV.text("Drei gehen. Einer kommt fest dazu.", { size: "m", at: 2.0 }),
        LV.text("Gebraucht werden <em>14</em>.", { size: "m", at: 3.7 }),
        LV.text("Wie viele fehlen?", { size: "m", at: 5.1, tone: "mut" })
      ]
    }),

    LV.scene({
      kicker: "03 · Der Rechenweg", dur: 9.5,
      items: [
        LV.scheme([
          { label: "Ist-Personalbestand", sub: "wer jetzt da ist", value: 12 },
          { op: "−", label: "Abgänge", value: 3 },
          { op: "+", label: "Zugänge", value: 1 },
          { op: "=", label: "Zwischensumme", value: 10, line: true },
          { label: "Soll-Personalbestand", sub: "so viele werden gebraucht", value: 14 },
          { op: "−", label: "Zwischensumme", value: 10 },
          { op: "=", label: "Personalbedarf", value: 4, line: true, hi: true }
        ], { title: "Der Rechenweg", at: 0.5, gap: 0.8 }),
        LV.term(["› 4 neue Stellen"], { at: 7.0 })
      ]
    }),

    LV.scene({
      kicker: "04 · Die Falle", dur: 6.5,
      items: [
        LV.text("Nicht <b>Soll + Zwischensumme</b> rechnen!", { size: "m", at: 0.5 }),
        LV.text("Es heißt immer <mark>Soll − Zwischensumme</mark>.", { size: "m", at: 2.0 }),
        LV.text("Sonst stimmt der Bedarf nicht.", { size: "m", at: 3.6, tone: "mut" })
      ]
    }),

    LV.scene({
      kicker: "05 · Kurz testen", dur: 9,
      items: [
        LV.quiz("Zwischensumme: <b>10</b>. Soll: <b>14</b>. <b>Personalbedarf?</b>", ["4", "24", "−4"], 0, { at: 0.4, reveal: 6 })
      ]
    }),

    LV.outro({ text: "Jetzt <mark>selbst</mark> rechnen.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
