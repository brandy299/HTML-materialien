/* Erklärvideo · PBP · Lernsituation 2.2, Teil 2 „Das Anforderungsprofil“
   Modellunternehmen: Mediaworld, „ein Jahr später“ – anderes Szenario als in den Kursaufgaben.
   Begriffe wie in der Lektion: Anforderungsprofil · fachlich/persönlich · Muss (K.O.) und Kann. */

LV.video({
  id: "pbp-anforderungsprofil",
  title: "Muss erfüllen – mit Kann punkten",
  poster: 26.5,   // Zeitpunkt (s) für das Vorschaubild („Muss ist K.O.“)
  bpm: 92, mood: "calm",
  scenes: [
    LV.title({
      kicker: "PBP · Anforderungsprofil",
      title: "Muss erfüllen – mit Kann punkten",
      sub: "Mediaworld, ein Jahr später.",
      dur: 4.5
    }),

    LV.scene({
      kicker: "01 · Die Frage", dur: 6.5,
      items: [
        LV.text("Eine Azubi-Stelle ist frei.", { size: "xl", at: 0.5 }),
        LV.text("Wen lädt der Betrieb ein?", { size: "l", at: 1.9 }),
        LV.text("Nett reicht nicht.", { size: "m", at: 3.5, tone: "mut" })
      ]
    }),

    LV.scene({
      kicker: "02 · Die zwei Bereiche", dur: 8.5,
      items: [
        LV.text("Das <mark>Anforderungsprofil</mark> hat zwei Bereiche.", { size: "xl", at: 0.5 }),
        LV.stack([
          { label: "Fachlich", text: "Schulabschluss · Deutsch · Mathe · PC" },
          { label: "Persönlich", text: "Sorgfalt · Freundlichkeit · Team" }
        ], { at: 2.3, stagger: 0.6 }),
        LV.text("Der Betrieb legt beides vorher fest.", { size: "m", at: 5.6 })
      ]
    }),

    LV.scene({
      kicker: "03 · Muss oder Kann?", dur: 8.5,
      items: [
        LV.text("Muss ist <mark>K.O.</mark> – Kann ist Bonus.", { size: "xl", at: 0.5 }),
        LV.stack([
          { label: "Muss", text: "Ohne geht es nicht", tone: "pink" },
          { label: "Kann", text: "Wunsch – bringt Vorteile", tone: "green" }
        ], { at: 2.3, stagger: 0.6 }),
        LV.text("Wer Kann erfüllt, hat Vorteile.", { size: "m", at: 5.8 })
      ]
    }),

    LV.scene({
      kicker: "04 · Die Falle", dur: 7.5,
      items: [
        LV.text("Alles als <mark>Muss</mark>? Dann fliegen Gute raus.", { size: "xl", at: 0.5 }),
        LV.text("Die Trennung macht die Auswahl fair.", { size: "l", at: 2.6 }),
        LV.text("Jede Absage lässt sich begründen.", { size: "m", at: 4.6, tone: "mut" })
      ]
    }),

    LV.scene({
      kicker: "05 · Kurz testen", dur: 9,
      items: [
        LV.quiz("Der Schulabschluss ist …", ["Muss-Anforderung – K.O.-Kriterium", "Kann-Anforderung – nur ein Wunsch", "Betriebsblindheit"], 0, { at: 0.4, reveal: 6.2 })
      ]
    }),

    LV.outro({ text: "Jetzt <mark>selbst</mark> prüfen.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
