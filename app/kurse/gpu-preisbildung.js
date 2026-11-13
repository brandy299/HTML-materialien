/* ============================================================
   KURS: GPU · HS1Y – Preisbildung
   Lernfeld 4 · Modellunternehmen Mediaworld e. K.
   AB 17 „Einflussgrößen der Preisbildung“ (baut auf „Preiskalkulation“ auf)
   Aufbau und alle Aufgabentypen: app/README.md
   ============================================================ */

LERNRAUM.subjects.push({
  id: "gpu-preisbildung",
  fach: "GPU",
  added: "2026-11-13",
  name: "Preisbildung",
  course: "GPU · HS1Y",
  glyph: "E",
  color: "#0ea5e9",
  company: "Mediaworld e. K.",
  description: "Lernfeld 4 · Nach der Preiskalkulation: Was bestimmt den Preis außerdem? Einflussgrößen und die drei Grundrichtungen der Preisbildung.",
  topics: [
    {
      id: "einflussgroessen",
      group: "AB 17 · Einflussgrößen",
      title: "Einflussgrößen der Preisbildung",
      kicker: "Lernfeld 4 · Arbeitsblatt 17",
      minutes: 20,
      help: `<h3>Zwei Seiten des Preises</h3>
             <p><strong>Betriebsintern:</strong> Das steuert der Betrieb selbst (Kosten, Gewinnziel, Auslastung, Service).</p>
             <p><strong>Betriebsextern:</strong> Das kommt von außen (Kundschaft, Konkurrenz, Lieferanten, Steuern, Konjunktur).</p>
             <h3>Drei Grundrichtungen</h3>
             <ul><li><strong>kostenorientiert:</strong> Selbstkosten + Gewinnzuschlag</li>
             <li><strong>nachfrageorientiert:</strong> Zahlungsbereitschaft der Kundschaft</li>
             <li><strong>konkurrenzorientiert:</strong> Preis des Wettbewerbers</li></ul>
             <h3>Spielraum</h3>
             <p>Untergrenze: die <strong>Selbstkosten</strong>. Obergrenze: der <strong>Preis der Konkurrenz</strong>.</p>`,
      steps: [
        {
          type: "slides",
          title: "Der Fall: 88,50 € Unterschied",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Arbeitsblatt 17",
              title: "Warum kostet derselbe Fernseher woanders weniger?",
              body: `<p>Jan sagt: „Einkauf plus Kosten plus Gewinn – fertig.“</p>
                     <p>Sofia fragt: „Warum kostet er bei uns <strong>1.487,50 €</strong> und beim Wettbewerber <strong>1.399,00 €</strong>?“</p>
                     <p>Unterschied: <strong>88,50 €</strong>. Der Preis ist mehr als eine Rechnung.</p>`
            },
            {
              kicker: "Grundwissen · 1 von 3",
              title: "Der Preis hat zwei Seiten.",
              body: `<div class="pair">
                       <div><b>betriebsintern</b>Das steuert der Betrieb selbst: Kosten (Einkauf, Personal, Miete, Strom), Gewinnziel, Auslastung, Service und Image.</div>
                       <div><b>betriebsextern</b>Das kommt von außen: Zahlungsbereitschaft der Kundschaft, Preise der Konkurrenz, Lieferantenpreise, Steuern und Konjunktur.</div>
                     </div>`
            },
            {
              kicker: "Grundwissen · 2 von 3",
              title: "Drei Grundrichtungen.",
              body: `<dl class="terms">
                       <dt>kostenorientiert</dt><dd>Grundlage: Selbstkosten + Gewinnzuschlag. So hast du im Kurs „Preiskalkulation“ gerechnet.</dd>
                       <dt>nachfrageorientiert</dt><dd>Grundlage: Was die Kundschaft zu zahlen bereit ist.</dd>
                       <dt>konkurrenzorientiert</dt><dd>Grundlage: Der Preis des Wettbewerbers.</dd>
                     </dl>`
            },
            {
              kicker: "Grundwissen · 3 von 3",
              title: "Der Spielraum für den Preis.",
              body: `<div class="pair">
                       <div><b>Untergrenze</b>die Selbstkosten. Darunter macht die Mediaworld Verlust.</div>
                       <div><b>Obergrenze</b>der Preis der Konkurrenz. Wer deutlich teurer ist, verliert Kundschaft.</div>
                     </div>
                     <p class="note">Dazwischen entscheidet die Zahlungsbereitschaft.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Der Preis ist eine Entscheidung zwischen Kosten und Markt.",
              body: `<p>Gute Preise beachten Kosten, Nachfrage und Konkurrenz – nicht nur eine Seite.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "A1 · Betriebsintern oder betriebsextern?",
          prompt: "Wer steuert diese Einflussgröße?",
          hints: ["Betriebsintern: Das entscheidet die Mediaworld selbst.", "Betriebsextern: Das kommt von Kundschaft, Konkurrenz, Lieferanten oder Staat."],
          categories: ["betriebsintern", "betriebsextern"],
          items: [
            { text: "Personalkosten", cat: 0 },
            { text: "Zahlungsbereitschaft der Kundschaft", cat: 1 },
            { text: "Mietkosten für die Verkaufsfläche", cat: 0 },
            { text: "Preis des Wettbewerbers 300 Meter weiter", cat: 1 },
            { text: "Gewinnziel der Inhaberin", cat: 0 },
            { text: "Lieferantenrabatt beim Einkauf", cat: 1 },
            { text: "Auslastung der eigenen Werkstatt", cat: 0 },
            { text: "Umsatzsteuer", cat: 1 }
          ]
        },
        {
          type: "cloze",
          title: "A2 · Fachbegriffe sichern",
          prompt: "Drei Wörter passen nicht.",
          hints: ["Einkauf, Personal und Miete bestimmt der Betrieb selbst.", "Selbstkosten + Gewinnzuschlag: Welche Richtung ist das? Am Wettbewerb ausrichten: Welche?"],
          text: "Der Preis für den Fernseher CINEMA 43 hängt von vielen Größen ab. Kosten für Einkauf, Personal und Miete sind {betriebsinterne} Einflussgrößen. Die Zahlungsbereitschaft der Kundschaft und der Preis des {Wettbewerbers} kommen von außen. Wer den Preis aus Selbstkosten und Gewinnzuschlag berechnet, arbeitet {kostenorientiert}. Wer den Preis am Wettbewerb ausrichtet, arbeitet {konkurrenzorientiert}.",
          distractors: ["betriebsexterne", "Staat", "nachfrageorientiert"]
        },
        {
          type: "sort",
          title: "A3 · Welche Grundrichtung?",
          prompt: "Zu welcher Grundrichtung gehört die Grundlage?",
          hints: ["Kostenorientiert: Es wird gerechnet (Selbstkosten + Gewinn).", "Nachfrageorientiert: Die Kundschaft bestimmt, was sie zahlt.", "Konkurrenzorientiert: Der Preis der anderen Anbieter."],
          categories: ["kostenorientiert", "nachfrageorientiert", "konkurrenzorientiert"],
          items: [
            { text: "Selbstkosten + Gewinnzuschlag", cat: 0 },
            { text: "Sofia rechnet 20 % auf die Selbstkosten", cat: 0 },
            { text: "Zahlungsbereitschaft der Kundschaft", cat: 1 },
            { text: "Vor Weihnachten kostet die Spielkonsole 30 € mehr", cat: 1 },
            { text: "Preis des Wettbewerbers", cat: 2 },
            { text: "Mediaworld geht mit dem Preis des Elektromarkts mit", cat: 2 }
          ]
        },
        {
          type: "quiz",
          title: "A4 · Fälle",
          questions: [
            {
              q: "Mediaworld senkt den Preis für Kopfhörer auf 49,99 €, weil der Wettbewerber sie für 49,99 € anbietet.",
              hint: "Woran richtet sich der Preis aus?",
              options: ["kostenorientiert", "nachfrageorientiert", "konkurrenzorientiert", "keine Richtung: betriebsextern"],
              answer: 2,
              explain: "Der Preis richtet sich nach dem Wettbewerber: konkurrenzorientiert."
            },
            {
              q: "Vor dem Weihnachtsgeschäft erhöht Mediaworld den Preis für die Spielkonsole um 30 €, weil die Nachfrage groß ist.",
              hint: "Wer entscheidet hier, was gezahlt wird?",
              options: ["kostenorientiert", "nachfrageorientiert", "konkurrenzorientiert", "keine Richtung: betriebsextern"],
              answer: 1,
              explain: "Die hohe Nachfrage erlaubt einen höheren Preis: nachfrageorientiert."
            },
            {
              q: "Sofia berechnet den Preis für einen Laptop aus Bezugspreis, Handlungskosten und Gewinnzuschlag.",
              hint: "Sie rechnet mit Kosten und Zuschlag.",
              options: ["kostenorientiert", "nachfrageorientiert", "konkurrenzorientiert", "keine Richtung: betriebsextern"],
              answer: 0,
              explain: "Der Preis wird aus den Selbstkosten und dem Gewinnzuschlag berechnet: kostenorientiert."
            },
            {
              q: "Der Lieferant erhöht den Einkaufspreis für Fernseher um 8 %.",
              hint: "Hat die Mediaworld hier einen Preis selbst gesetzt?",
              options: ["kostenorientiert", "nachfrageorientiert", "konkurrenzorientiert", "keine Richtung: betriebsextern"],
              answer: 3,
              explain: "Das ist eine Größe von außen. Die Kosten steigen, aber die Mediaworld hat den Preis nicht selbst gesetzt."
            }
          ]
        },
        {
          type: "sentence",
          title: "A5 ★ · Beurteile die Preisentscheidung",
          case: "Der Wettbewerber verkauft den Fernseher für 1.399,00 €. Welche Grundrichtung passt für die Mediaworld am besten? Bau die Begründung aus den Bausteinen.",
          text: "Am besten passt {*konkurrenzorientiert, mit Kostenkontrolle|nur kostenorientiert|nur nachfrageorientiert}. Nur nach Kosten rechnen: Die Kundschaft {*geht zum Wettbewerber|zahlt gern mehr}. Nur dem Wettbewerb folgen: Die Kosten sind {*nicht sicher gedeckt|immer gedeckt}. Darum gilt: Untergrenze sind die {*Selbstkosten|Lieferantenpreise}, Obergrenze ist der {*Preis der Konkurrenz|Listeneinkaufspreis}.",
          hints: ["Zwei Seiten: Zu teuer verliert Kundschaft, zu billig macht Verlust.", "Die Untergrenze ist das, was die Mediaworld mindestens decken muss."],
          explain: "Guter Antwortsatz: Entscheidung nennen → zwei Argumente (Kundschaft wandert ab / Kosten nicht gedeckt) → Spielraum zwischen Untergrenze und Obergrenze."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann betriebsinterne und betriebsexterne Einflussgrößen unterscheiden.",
            "Ich kann die drei Grundrichtungen der Preisbildung erklären.",
            "Ich kann einen Fall der richtigen Grundrichtung zuordnen.",
            "Ich kann eine Preisentscheidung mit Argumenten beurteilen."
          ]
        }
      ]
    }
  ]
});
