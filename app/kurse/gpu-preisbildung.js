/* ============================================================
   KURS: GPU · HS1Y – Preisbildung
   Lernfeld 4 · Modellunternehmen Mediaworld e. K.
   AB 17–20 + Übungsmodul (baut auf „Preiskalkulation“ auf)
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
  description: "Lernfeld 4 · Nach der Preiskalkulation: Was bestimmt den Preis außerdem? Einflussgrößen, Zuschlag und Faktor, Nachfrage und Konkurrenz, Preisauszeichnung – plus Übungsmodul.",
  updated: "2026-11-19",
  folders: [
    {
      id: "uebungsmodul",
      group: "Übungsmodul",
      kicker: "Ordner · Übungsmodul",
      title: "Übungsmodul",
      description: "Einflussgrößen und kostenorientiertes Kalkulieren üben – mit geführten Aufgaben, typischen Fehlern und Lernstandskontrolle."
    }
  ],
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
    },

    /* ══════════════ AB 18 · ZUSCHLAG UND FAKTOR ══════════════ */
    {
      id: "zuschlag-faktor",
      group: "AB 18 · Zuschlag und Faktor",
      title: "Zuschlag und Faktor",
      kicker: "Lernfeld 4 · Arbeitsblatt 18",
      minutes: 20,
      help: `<h3>Zwei Abkürzungen – eine Idee</h3>
             <p class="formula">Kalkulationszuschlag = (LVP − BP) ÷ BP × 100<br>Kalkulationsfaktor = LVP ÷ BP<br>LVP = BP × Faktor</p>
             <p>LVP = Listenverkaufspreis, BP = Bezugspreis.</p>
             <h3>Umrechnen</h3>
             <p class="formula">Faktor = 1 + Zuschlag ÷ 100<br>Zuschlag = (Faktor − 1) × 100</p>
             <p class="note">Faktor 1,60 bedeutet 60 % Zuschlag – nicht 160 %. 160 % Zuschlag wäre Faktor 2,60.</p>`,
      steps: [
        {
          type: "slides",
          title: "Der Fall: Soundbar",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Arbeitsblatt 18",
              title: "150 € Einkauf, 240 € Verkauf. Wie viel Prozent sind das?",
              body: `<p>Jan hat die Soundbar <strong>SOUND 300</strong> für <strong>150,00 €</strong> eingekauft. Sie soll <strong>240,00 €</strong> kosten.</p>
                     <p>Sofia fragt: „Wie viel Prozent Aufschlag ist das – und wie rechne ich das für andere Geräte schnell?“</p>`
            },
            {
              kicker: "Grundwissen · 1 von 2",
              title: "Zwei Abkürzungen.",
              body: `<dl class="terms">
                       <dt>Kalkulationszuschlag</dt><dd>Der Aufschlag in Prozent vom Bezugspreis. <strong>(LVP − BP) ÷ BP × 100</strong></dd>
                       <dt>Kalkulationsfaktor</dt><dd>Eine einzige Zahl. <strong>LVP ÷ BP</strong>. Damit gilt: LVP = BP × Faktor.</dd>
                     </dl>
                     <p class="note">LVP = Listenverkaufspreis, BP = Bezugspreis.</p>`
            },
            {
              kicker: "Musterbeispiel",
              title: "Soundbar SOUND 300",
              body: `<table class="scheme">
                       <tr><td>Zuschlag: (240 − 150) ÷ 150 × 100</td><td>60 %</td></tr>
                       <tr><td>Faktor: 240 ÷ 150</td><td>1,60</td></tr>
                       <tr class="sum"><td>Probe: 150 × 1,60</td><td>240 €</td></tr>
                     </table>`
            },
            {
              kicker: "Grundwissen · 2 von 2",
              title: "Zuschlag und Faktor ineinander umrechnen.",
              body: `<div class="pair">
                       <div><b>Zuschlag → Faktor</b>1 + Zuschlag ÷ 100. Aus 60 % wird 1,60.</div>
                       <div><b>Faktor → Zuschlag</b>(Faktor − 1) × 100. Aus 1,60 wird 60 %.</div>
                     </div>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Faktor 1,60 heißt 60 % Aufschlag.",
              body: `<p>Nicht 160 %. Der Faktor enthält die 100 % vom Bezugspreis schon mit.</p>`
            }
          ]
        },
        {
          type: "calc",
          title: "A1 · Zuschlag und Faktor",
          decimals: 2,
          case: `Für den Beamer <b>BEAM 100</b> gilt: Bezugspreis <b>200,00 €</b>, Listenverkaufspreis <b>320,00 €</b>.<br><br>Berechne Zuschlag (in %) und Faktor. Mache die Probe. Dann: Wie hoch ist der Listenverkaufspreis eines Geräts mit Bezugspreis <b>275,00 €</b> bei demselben Faktor?`,
          rows: [
            { label: "Kalkulationszuschlag in %", value: 60, dec: 0 },
            { label: "Kalkulationsfaktor", value: 1.6 },
            { label: "Probe: 200,00 × Faktor", value: 320, sum: true },
            { label: "LVP bei Bezugspreis 275,00 €", value: 440, sum: true }
          ],
          hints: [
            "Zuschlag: Aufschlag in Euro ÷ Bezugspreis × 100. Der Aufschlag ist 320 − 200.",
            "Faktor = LVP ÷ BP = 320 ÷ 200.",
            "Zweites Gerät: 275,00 × Faktor."
          ],
          result: "Zuschlag 60 %, Faktor 1,60. Das zweite Gerät kostet 440,00 €."
        },
        {
          type: "calc",
          title: "A2 · Umrechnen",
          decimals: 2,
          case: `Rechne um. Nutze: <b>Faktor = 1 + Zuschlag ÷ 100</b> und <b>Zuschlag = (Faktor − 1) × 100</b>.`,
          rows: [
            { label: "Zuschlag 25 % → Faktor", value: 1.25 },
            { label: "Faktor 1,45 → Zuschlag in %", value: 45, dec: 0 },
            { label: "Zuschlag 80 % → Faktor", value: 1.8 },
            { label: "Faktor 1,60 → Zuschlag in %", value: 60, dec: 0 }
          ],
          hints: ["25 % sind 0,25. Dazu kommt die 1 für den Bezugspreis selbst.", "Erst 1 abziehen, dann × 100."]
        },
        {
          type: "calc",
          title: "A3 · Kopfhörer",
          decimals: 2,
          case: `Sofia kauft Kopfhörer für <b>85,00 €</b> Bezugspreis ein. Sie will <b>70 % Zuschlag</b> erreichen. Der Wettbewerber verkauft vergleichbare Kopfhörer für <b>120,00 €</b>.<br><br>Runde Zuschlag und Faktor auf zwei Nachkommastellen.`,
          rows: [
            { label: "Geplanter LVP (85,00 × 1,70)", value: 144.5 },
            { label: "Zuschlag bei 120,00 € in %", value: 41.18 },
            { label: "Faktor bei 120,00 €", value: 1.41 },
            { label: "Es fehlen bis zum Ziel (€)", value: 24.5, sum: true }
          ],
          hints: [
            "Faktor 1,70 ist 70 % Zuschlag. LVP = 85,00 × 1,70.",
            "Zuschlag: (120 − 85) ÷ 85 × 100. Faktor: 120 ÷ 85.",
            "Fehlbetrag: geplanter LVP minus 120,00 €."
          ],
          result: "Bei 120,00 € erreicht Sofia nur etwa 41 % Zuschlag. Es fehlen 24,50 €."
        },
        {
          type: "sentence",
          title: "A4 ★ · Faktor oder Prozent?",
          case: "Erkläre, warum „Faktor 1,60“ nicht „160 % Zuschlag“ bedeutet.",
          text: "Faktor 1,60 bedeutet: Der Verkaufspreis ist das {*1,60-Fache|0,60-Fache} des Bezugspreises. Der Zuschlag beträgt also {*60 %|160 %} des Bezugspreises. {*160 %|60 %} Zuschlag wäre der Faktor {*2,60|1,60}.",
          hints: ["Der Faktor enthält den Bezugspreis (1,00) schon mit.", "Faktor − 1 ergibt den Zuschlag als Dezimalzahl."],
          explain: "Faktor = 1 + Zuschlag ÷ 100. Darum gehört zu 160 % Zuschlag der Faktor 2,60."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann den Kalkulationszuschlag aus BP und LVP berechnen.",
            "Ich kann den Kalkulationsfaktor berechnen.",
            "Ich kann Zuschlag und Faktor ineinander umrechnen.",
            "Ich kann mit dem Faktor einen Listenverkaufspreis berechnen.",
            "Ich kann eine Preisentscheidung mit Zuschlag und Faktor beurteilen."
          ]
        }
      ]
    },

    /* ══════════════ AB 19 · NACHFRAGE UND KONKURRENZ ══════════════ */
    {
      id: "nachfrage-konkurrenz",
      group: "AB 19 · Nachfrage und Konkurrenz",
      title: "Nachfrage und Konkurrenz",
      kicker: "Lernfeld 4 · Arbeitsblatt 19",
      minutes: 25,
      help: `<h3>Zwei Marktgrößen</h3>
             <p><strong>Nachfrage:</strong> Wie viele Kundinnen und Kunden kaufen bei welchem Preis? Sinkt der Preis, steigt meist die Menge – aber pro Gerät bleibt weniger Gewinn.</p>
             <p><strong>Konkurrenz:</strong> Der Preis des Wettbewerbers ist die Obergrenze. Optionen: mitgehen, unterbieten oder den Preis halten und mit Service punkten.</p>
             <h3>Rechnen</h3>
             <p class="formula">Umsatz = Preis × Menge<br>Gewinn pro Stück = Preis − Selbstkosten<br>Gewinn gesamt = Gewinn pro Stück × Menge<br>Break-even-Menge = alter Gewinn ÷ neuer Stückgewinn (aufrunden)</p>
             <p class="note">Entscheidend ist der Gewinn, nicht der Umsatz.</p>`,
      steps: [
        {
          type: "slides",
          title: "Der Fall: Preis senken?",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Arbeitsblatt 19",
              title: "Mehr Umsatz heißt nicht mehr Gewinn.",
              body: `<p>Der <strong>CINEMA 43</strong> kostet bei der Mediaworld <strong>599,00 €</strong>. Der Wettbewerber verlangt <strong>559,00 €</strong>.</p>
                     <p>Sofia: „Bei 549,00 € verkaufe ich mehr.“ Jan: „Mehr Umsatz heißt nicht mehr Gewinn.“</p>`
            },
            {
              kicker: "Grundwissen · 1 von 2",
              title: "Zwei Marktgrößen.",
              body: `<dl class="terms">
                       <dt>Nachfrage</dt><dd>Wie viele kaufen bei welchem Preis? Sinkt der Preis, steigt meist die Menge. Pro Gerät bleibt aber weniger Gewinn.</dd>
                       <dt>Konkurrenz</dt><dd>Der Preis des Wettbewerbers setzt die Obergrenze. Optionen: <strong>mitgehen</strong>, <strong>unterbieten</strong> oder den Preis halten und mit <strong>Service</strong> punkten.</dd>
                     </dl>`
            },
            {
              kicker: "Grundwissen · 2 von 2",
              title: "Gewinn = (Preis − Selbstkosten) × Menge.",
              body: `<p>Der Gewinn zählt, nicht der Umsatz.</p>
                     <p class="box">Umsatz = Preis × Menge<br>Gewinn pro Stück = Preis − Selbstkosten<br>Gewinn gesamt = Gewinn pro Stück × Menge</p>`
            },
            {
              kicker: "Musterbeispiel",
              title: "CINEMA 43 · Selbstkosten 480,00 €",
              body: `<table class="scheme">
                       <tr><td></td><td>bisher</td><td>neu</td></tr>
                       <tr><td>Preis</td><td>599 €</td><td>549 €</td></tr>
                       <tr><td>Menge</td><td>40</td><td>52</td></tr>
                       <tr><td>Umsatz</td><td>23.960 €</td><td>28.548 €</td></tr>
                       <tr><td>Gewinn/Stück</td><td>119 €</td><td>69 €</td></tr>
                       <tr class="sum"><td>Gewinn gesamt</td><td>4.760 €</td><td>3.588 €</td></tr>
                     </table>
                     <p class="note">Umsatz steigt um 4.588 €, Gewinn sinkt um 1.172 €. Um den alten Gewinn zu halten: 4.760 ÷ 69 = 68,99 → 69 Geräte (immer aufrunden).</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Rechne immer beide Seiten: Umsatz und Gewinn.",
              body: `<p>Konkurrenz = Obergrenze. Selbstkosten = Untergrenze. Service kann einen höheren Preis rechtfertigen.</p>`
            }
          ]
        },
        {
          type: "quiz",
          title: "A1 · Begriffe",
          questions: [
            {
              q: "Was bedeutet Preis-Absatz-Zusammenhang?",
              hint: "Es geht um Preis und verkaufte Menge.",
              options: ["Je niedriger der Preis, desto mehr Stück werden meist verkauft.", "Je niedriger der Preis, desto höher der Gewinn pro Stück.", "Der Preis hängt nur von den Selbstkosten ab.", "Der Preis ist immer gleich der Menge."],
              answer: 0,
              explain: "Sinkt der Preis, steigt meist die Menge. Der Gewinn pro Stück sinkt aber."
            },
            {
              q: "Was bedeutet „mitgehen“?",
              options: ["Der eigene Preis wird an den Preis des Wettbewerbers angeglichen.", "Der eigene Preis liegt bewusst unter dem Wettbewerb.", "Der Preis wird erhöht.", "Der Preis bleibt trotz Konkurrenz gleich."],
              answer: 0,
              explain: "Mitgehen heißt: den eigenen Preis an den Wettbewerber anpassen."
            },
            {
              q: "Was bedeutet „unterbieten“?",
              options: ["Der eigene Preis wird dem Wettbewerber angeglichen.", "Der eigene Preis liegt bewusst unter dem Preis des Wettbewerbers.", "Die Selbstkosten werden gesenkt.", "Es gibt eine Lieferung gratis dazu."],
              answer: 1,
              explain: "Unterbieten: bewusst billiger als der Wettbewerber, um mehr Kundschaft zu gewinnen."
            }
          ]
        },
        {
          type: "calc",
          title: "A2 · Soundbar: Umsatz und Gewinn",
          decimals: 2,
          case: `Soundbar <b>SOUND 300</b>, Selbstkosten <b>180,00 €</b> pro Stück.<br>Bisher: <b>249,00 €</b> und <b>60 Stück</b>. Neu: <b>229,00 €</b> und <b>75 Stück</b>.<br><br>Berechne Umsatz, Gewinn pro Stück und Gewinn gesamt – erst bisher, dann neu.`,
          rows: [
            { label: "Umsatz bisher", value: 14940 },
            { label: "Gewinn pro Stück bisher", value: 69 },
            { label: "Gewinn gesamt bisher", value: 4140, sum: true },
            { label: "Umsatz neu", value: 17175 },
            { label: "Gewinn pro Stück neu", value: 49 },
            { label: "Gewinn gesamt neu", value: 3675, sum: true }
          ],
          hints: [
            "Umsatz = Preis × Menge. Bisher: 249 × 60.",
            "Gewinn pro Stück = Preis − Selbstkosten (180,00 €).",
            "Gewinn gesamt = Gewinn pro Stück × Menge."
          ],
          result: "Der Umsatz steigt um 2.235 €, aber der Gewinn sinkt um 465 €."
        },
        {
          type: "calc",
          title: "A2 b) · Break-even-Menge",
          decimals: 2,
          case: `Wie viele Stück müsste Sofia bei <b>229,00 €</b> verkaufen, um den alten Gewinn (<b>4.140,00 €</b>) zu erreichen?<br><br>Rechne alter Gewinn ÷ neuer Stückgewinn (49,00 €). <b>Runde auf ganze Stück auf.</b>`,
          rows: [
            { label: "Break-even-Menge (Stück)", value: 85, dec: 0 },
            { label: "Es fehlen bei 75 Stück noch (Stück)", value: 10, dec: 0 }
          ],
          hints: ["4.140 ÷ 49 = 84,49. Ein halbes Gerät gibt es nicht – aufrunden.", "Fehlende Stück = Break-even-Menge − 75."],
          result: "Sofia müsste 85 Stück verkaufen. Bei 75 Stück fehlen 10."
        },
        {
          type: "sentence",
          title: "A3 · Drei Optionen beurteilen",
          case: "Der Wettbewerber verkauft den CINEMA 43 jetzt für <b>529,00 €</b> (Selbstkosten 480,00 €). Optionen: (1) mitgehen auf 529,00 €, (2) unterbieten auf 519,00 €, (3) bei 549,00 € bleiben und kostenlose Lieferung anbieten. Bau die Empfehlung.",
          text: "Bei Option 1 sinkt der Gewinn pro Gerät auf {*49,00 €|69,00 €}. Bei Option 2 bleiben nur {*39,00 €|19,00 €} pro Gerät – das kann schnell zum {*Verlustgeschäft|Gewinnbringer} werden. Bei Option 3 bleibt der Preis höher, aber die Lieferung kostet {*Geld|nichts} und muss in die Kalkulation. Ich empfehle {*Option 3, wenn die Lieferkosten unter der Preisdifferenz liegen|Option 2 ohne Kostenkontrolle}.",
          hints: ["Gewinn pro Gerät = neuer Preis − 480,00 €.", "Zu welcher Option gehört „Service“?"],
          explain: "Gute Beurteilung: alle Optionen mit Zahlen begründen. Unterbieten ohne Kostenkontrolle ist nicht empfehlenswert."
        },
        {
          type: "sentence",
          title: "A4 ★ · Stellung nehmen",
          case: "„Eine Preissenkung ist immer gut, weil der Umsatz steigt.“ Beurteile die Aussage mit den Zahlen aus A2.",
          text: "Die Aussage ist {*falsch|richtig}. In A2 steigt der Umsatz von 14.940,00 € auf 17.175,00 €, aber der Gewinn {*sinkt|steigt} von 4.140,00 € auf 3.675,00 €. Entscheidend ist der {*Gewinn|Umsatz}. Eine Preissenkung lohnt sich nur, wenn die zusätzliche Menge den niedrigeren Stückgewinn {*mindestens ausgleicht|überhaupt nicht beachtet}.",
          hints: ["Vergleiche den Gewinn bisher und neu.", "Denk an die Break-even-Menge."],
          explain: "Guter Antwortsatz: Aussage bewerten → Zahlen nennen → Regel: Gewinn zählt, nicht Umsatz."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann den Preis-Absatz-Zusammenhang erklären.",
            "Ich kann Umsatz und Gewinn bei zwei Preisen vergleichen.",
            "Ich kann die Break-even-Menge berechnen.",
            "Ich kann Preisoptionen im Wettbewerb beurteilen."
          ]
        }
      ]
    },

    /* ══════════════ AB 20 · PREISE AUSZEICHNEN ══════════════ */
    {
      id: "preisauszeichnung",
      group: "AB 20 · Preise auszeichnen",
      title: "Preise auszeichnen",
      kicker: "Lernfeld 4 · Arbeitsblatt 20",
      minutes: 20,
      help: `<h3>Regeln der Preisauszeichnung</h3>
             <ul><li><strong>Endpreis:</strong> Preis inklusive Umsatzsteuer und aller Nebenkosten.</li>
             <li><strong>Preisklarheit:</strong> eindeutig, gut lesbar, direkt am Artikel.</li>
             <li><strong>Preiswahrheit:</strong> Der Preis muss gelten. Lockvogelpreise sind unzulässig.</li>
             <li><strong>Grundpreis:</strong> Preis pro kg, l, Meter oder 100 g/ml – bei Waren, die nach Menge verkauft werden.</li></ul>
             <p class="note">Rechtsgrundlage: Preisangabenverordnung (PAngV). Der Nettopreis gehört nicht aufs Schild.</p>
             <p class="formula">Grundpreis = Preis ÷ Menge × Bezugsmenge</p>`,
      steps: [
        {
          type: "slides",
          title: "Der Fall: falsches Schild",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Arbeitsblatt 20",
              title: "„Auf dem Schild stehen 4,99 €. Jetzt soll ich 5,94 € zahlen.“",
              body: `<p>Ein Kunde beschwert sich an der Kasse. Sofia sieht nach: Das Schild zeigt den <strong>Nettopreis</strong>.</p>
                     <p>Der Kunde hat recht. So darf ein Preis nicht ausgezeichnet werden.</p>`
            },
            {
              kicker: "Grundwissen · 1 von 2",
              title: "Das muss aufs Preisschild.",
              body: `<dl class="terms">
                       <dt>Endpreis</dt><dd>Preis inklusive Umsatzsteuer und aller Nebenkosten – das, was man wirklich zahlt.</dd>
                       <dt>Preisklarheit</dt><dd>Eindeutig, gut lesbar, direkt am Artikel oder im Regal.</dd>
                       <dt>Preiswahrheit</dt><dd>Der Preis muss gelten. Lockvogelpreise sind unzulässig.</dd>
                     </dl>`
            },
            {
              kicker: "Grundwissen · 2 von 2",
              title: "Der Grundpreis.",
              body: `<p>Bei Waren, die nach Menge, Gewicht, Volumen oder Länge verkauft werden, steht zusätzlich der <strong>Grundpreis</strong>: pro kg, pro l, pro Meter oder pro 100 ml.</p>
                     <p class="box">Tinte 200 ml für 12,99 €<br>12,99 ÷ 2 = 6,50 € pro 100 ml</p>
                     <p class="note">Bei einem Fernseher gibt es keinen Grundpreis. Rechtsgrundlage: Preisangabenverordnung (PAngV).</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Endpreis = Preis inklusive Umsatzsteuer.",
              body: `<p>Der Nettopreis gehört nicht auf das Schild. Der Grundpreis macht Angebote vergleichbar.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "A1 · Preisschild: ja oder nein?",
          prompt: "Gehört die Angabe auf ein korrektes Preisschild?",
          hints: ["Die Kundschaft muss den Artikel erkennen und den echten Preis sehen.", "Interne Infos wie der Lagerplatz oder der Hersteller sind nicht vorgeschrieben."],
          categories: ["gehört dazu", "gehört nicht"],
          items: [
            { text: "Artikelbezeichnung", cat: 0 },
            { text: "Endpreis inklusive Umsatzsteuer", cat: 0 },
            { text: "Nettopreis ohne Umsatzsteuer", cat: 1 },
            { text: "Grundpreis (wenn vorgeschrieben)", cat: 0 },
            { text: "Lagerplatz im Regal", cat: 1 },
            { text: "Name des Herstellers", cat: 1 }
          ]
        },
        {
          type: "calc",
          title: "A2 · Grundpreise",
          decimals: 2,
          case: `Berechne den Grundpreis. Runde auf zwei Nachkommastellen.<br><br>Tinte COLOR, 200 ml: <b>12,99 €</b> → pro 100 ml<br>USB-Kabel, 2 m: <b>8,49 €</b> → pro Meter<br>Druckerpapier, 500 Blatt: <b>4,29 €</b> → pro 100 Blatt`,
          rows: [
            { label: "Tinte: € pro 100 ml", value: 6.5 },
            { label: "Kabel: € pro Meter", value: 4.25 },
            { label: "Papier: € pro 100 Blatt", value: 0.86 }
          ],
          hints: ["200 ml sind 2 mal 100 ml. Also Preis ÷ 2.", "2 m: Preis ÷ 2.", "500 Blatt sind 5 mal 100 Blatt. Preis ÷ 5."],
          result: "Tinte 6,50 € pro 100 ml, Kabel 4,25 € pro Meter, Papier 0,86 € pro 100 Blatt."
        },
        {
          type: "quiz",
          title: "A3 · Preisschilder prüfen",
          questions: [
            {
              q: "Schild A: „Fernseher CINEMA 43 · 1.399,00 € zzgl. MwSt.“ Was ist richtig?",
              hint: "Was zahlt die Kundschaft wirklich?",
              options: ["Das Schild ist korrekt.", "Falsch: „zzgl. MwSt.“ ist kein Endpreis.", "Es fehlt der Grundpreis.", "Es fehlt der Name des Herstellers."],
              answer: 1,
              explain: "Auf das Schild gehört der Endpreis inklusive Umsatzsteuer. „zzgl. MwSt.“ ist ein Nettopreis. Einen Grundpreis gibt es bei einem Fernseher nicht."
            },
            {
              q: "Schild B: „Tinte COLOR 200 ml · 12,99 €“. Was ist richtig?",
              hint: "Tinte wird nach Volumen verkauft.",
              options: ["Das Schild ist korrekt.", "Der Endpreis fehlt.", "Unvollständig: Es fehlt der Grundpreis (6,50 € pro 100 ml).", "Die Artikelbezeichnung fehlt."],
              answer: 2,
              explain: "Bei Tinte muss der Grundpreis stehen: 12,99 € ÷ 2 = 6,50 € pro 100 ml."
            },
            {
              q: "Schild C: „USB-Kabel 2 m · 8,49 € · 4,25 €/m“. Was ist richtig?",
              hint: "Prüfe Endpreis und Grundpreis.",
              options: ["Das Schild ist korrekt: Endpreis und Grundpreis stehen darauf.", "Der Nettopreis fehlt.", "Der Lagerplatz fehlt.", "Der Grundpreis ist falsch."],
              answer: 0,
              explain: "Endpreis 8,49 € und Grundpreis 4,25 € pro Meter (8,49 ÷ 2) stehen auf dem Schild. Es ist korrekt."
            }
          ]
        },
        {
          type: "sentence",
          title: "A4 ★ · Grundpreis: nur Bürokratie?",
          case: "„Grundpreise sind nur Bürokratie – für die Kundschaft bringen sie nichts.“ Nimm Stellung.",
          text: "Die Aussage ist {*falsch|richtig}. Ohne Grundpreis kann man unterschiedlich große Packungen nicht {*fair vergleichen|schneller kaufen}. 12,99 € für 200 ml wirken billiger als 19,99 € für 500 ml, aber pro 100 ml kostet das erste Angebot {*6,50 €|4,00 €} und das zweite {*4,00 €|6,50 €}. Der Grundpreis schafft {*Vergleichbarkeit|Verwirrung} und schützt vor Scheinvorteilen.",
          hints: ["Rechne beide Angebote auf 100 ml um: 19,99 ÷ 5.", "Welches Angebot ist pro 100 ml günstiger?"],
          explain: "Der Handel hat etwas mehr Aufwand, die Kundschaft aber mehr Transparenz."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann den Unterschied zwischen Netto- und Endpreis erklären.",
            "Ich kann die Pflichtangaben eines Preisschilds nennen.",
            "Ich kann einen Grundpreis berechnen.",
            "Ich kann ein fehlerhaftes Preisschild erkennen und korrigieren."
          ]
        }
      ]
    },

    /* ══════════════ EINFLUSSGRÖSSEN · ERKENNEN ══════════════ */
    {
      id: "einfluss-erkennen",
      folder: "uebungsmodul",
      group: "Einflussgrößen",
      title: "Einflussgrößen erkennen",
      kicker: "Übungsmodul · Einflussgrößen 1",
      minutes: 20,
      help: `<h3>Zwei Seiten des Preises</h3>
             <p><strong>Betriebsintern:</strong> Das steuert die Mediaworld e. K. selbst – Kosten, Gewinnziel, Auslastung, Service und Image.</p>
             <p><strong>Betriebsextern:</strong> Das kommt von außen – Kundschaft, Konkurrenz, Lieferanten, Staat und Konjunktur.</p>
             <h3>Drei Grundrichtungen</h3>
             <ul><li><strong>kostenorientiert:</strong> Selbstkosten + Gewinnzuschlag.</li>
             <li><strong>nachfrageorientiert:</strong> Zahlungsbereitschaft der Kundschaft.</li>
             <li><strong>konkurrenzorientiert:</strong> Preis des Wettbewerbers.</li></ul>
             <h3>Der Spielraum</h3>
             <p>Untergrenze: die <strong>Selbstkosten</strong>. Obergrenze: der <strong>Preis der Konkurrenz</strong>.</p>
             <p class="note">Der Preis ist eine Entscheidung zwischen Kosten und Markt.</p>`,
      steps: [
        {
          type: "slides",
          title: "Der Fall: 88,50 € Unterschied",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Übungsmodul",
              title: "Derselbe Fernseher. Zwei Preise.",
              body: `<p>Bei der Mediaworld e. K. kostet der Fernseher <strong>1.487,50 €</strong>.</p>
                     <p>Der Wettbewerber verlangt <strong>1.399,00 €</strong>.</p>
                     <p>Unterschied: <strong>88,50 €</strong>. Ist der Preis nur eine Rechnung?</p>`
            },
            {
              kicker: "Lernziel · Operator AFB I/II",
              title: "Ich kann Einflussgrößen <mark>unterscheiden</mark> und den drei Grundrichtungen <mark>zuordnen</mark>.",
              body: `<p class="box"><strong>unterscheiden</strong> heißt: sagen können, ob eine Größe von innen oder von außen kommt.<br><strong>zuordnen</strong> heißt: den passenden Fachbegriff wählen.</p>`
            },
            {
              kicker: "Grundwissen · 1 von 3",
              title: "Der Preis hat zwei Seiten.",
              body: `<div class="pair">
                       <div><b>betriebsintern</b>Das steuert die Mediaworld e. K. selbst: Personalkosten, Miete, Gewinnziel, Auslastung, Service und Image.</div>
                       <div><b>betriebsextern</b>Das kommt von außen: Zahlungsbereitschaft, Wettbewerbspreise, Lieferantenpreise, Steuern und Konjunktur.</div>
                     </div>`
            },
            {
              kicker: "Grundwissen · 2 von 3",
              title: "Drei Grundrichtungen.",
              body: `<dl class="terms">
                       <dt>kostenorientiert</dt><dd>Grundlage: Selbstkosten + Gewinnzuschlag. So rechnest du im Kurs „Preiskalkulation“.</dd>
                       <dt>nachfrageorientiert</dt><dd>Grundlage: Was die Kundschaft zu zahlen bereit ist.</dd>
                       <dt>konkurrenzorientiert</dt><dd>Grundlage: Der Preis des Wettbewerbers.</dd>
                     </dl>`
            },
            {
              kicker: "Grundwissen · 3 von 3",
              title: "Der Preis-Spielraum.",
              body: `${ablauf([
                       { text: "Selbstkosten", value: "480,00 €", sub: true },
                       { op: "bis", note: "dazwischen liegt der Spielraum" },
                       { text: "Preis der Konkurrenz", value: "599,00 €", hi: true }
                     ])}
                     <p class="note">Untergrenze: Kosten. Obergrenze: Wettbewerb. Dazwischen entscheidet die Zahlungsbereitschaft.</p>`
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
          prompt: "Wer bestimmt diese Einflussgröße?",
          hints: ["Betriebsintern: Das kann die Mediaworld e. K. selbst ändern.", "Betriebsextern: Das kommt von Kundschaft, Konkurrenz, Lieferanten oder Staat."],
          categories: ["betriebsintern", "betriebsextern"],
          items: [
            { text: "Personalkosten", cat: 0 },
            { text: "Zahlungsbereitschaft der Kundschaft", cat: 1 },
            { text: "Mietkosten für die Verkaufsfläche", cat: 0 },
            { text: "Preis des Wettbewerbers 300 Meter weiter", cat: 1 },
            { text: "Gewinnziel der Inhaberin", cat: 0 },
            { text: "Lieferantenrabatt beim Einkauf", cat: 1 },
            { text: "Auslastung der eigenen Werkstatt", cat: 0 },
            { text: "Umsatzsteuer", cat: 1 },
            { text: "Eigene Serviceleistung", cat: 0 },
            { text: "Tarifabschluss für den Einzelhandel", cat: 1 }
          ]
        },
        {
          type: "cloze",
          title: "A2 · Fachbegriffe sichern",
          prompt: "Drei Wörter passen nicht.",
          hints: ["Einkauf, Personal und Miete bestimmt die Mediaworld e. K. selbst.", "Der Wettbewerber und die Kundschaft kommen von außen.", "Selbstkosten + Gewinnzuschlag: Welche Richtung ist das?"],
          text: "Kosten für Einkauf, Personal und Miete sind {betriebsinterne} Einflussgrößen. Der Preis des {Wettbewerbers} und die {Zahlungsbereitschaft} der Kundschaft kommen von außen. Wer aus Selbstkosten und Gewinnzuschlag rechnet, arbeitet {kostenorientiert}.",
          distractors: ["betriebsexterne", "Staat", "konkurrenzorientiert"]
        },
        {
          type: "quiz",
          title: "A3 · Fälle zuordnen",
          questions: [
            {
              q: "Die Mediaworld e. K. senkt den Preis für Kopfhörer, weil der Elektromarkt sie billiger anbietet. Welche Grundrichtung?",
              hint: "Woran richtet sich der Preis aus?",
              options: ["kostenorientiert", "nachfrageorientiert", "konkurrenzorientiert", "keine Richtung: betriebsextern"],
              answer: 2,
              explain: "Der Preis richtet sich nach dem Wettbewerber: konkurrenzorientiert."
            },
            {
              q: "Vor Weihnachten erhöht die Mediaworld e. K. den Preis für die Spielkonsole, weil die Nachfrage groß ist. Welche Grundrichtung?",
              hint: "Wer entscheidet hier, was gezahlt wird?",
              options: ["kostenorientiert", "nachfrageorientiert", "konkurrenzorientiert", "keine Richtung: betriebsextern"],
              answer: 1,
              explain: "Die hohe Nachfrage erlaubt einen höheren Preis: nachfrageorientiert."
            },
            {
              q: "Sofia rechnet den Preis aus Bezugspreis, Gemeinkosten und Gewinnzuschlag. Welche Grundrichtung?",
              hint: "Sie rechnet mit Kosten und Zuschlag.",
              options: ["kostenorientiert", "nachfrageorientiert", "konkurrenzorientiert", "keine Richtung: betriebsextern"],
              answer: 0,
              explain: "Der Preis wird aus den Selbstkosten und dem Gewinnzuschlag berechnet: kostenorientiert."
            },
            {
              q: "Der Lieferant erhöht den Einkaufspreis um 8 %. Welche Grundrichtung?",
              hint: "Hat die Mediaworld e. K. hier einen Preis selbst gesetzt?",
              options: ["kostenorientiert", "nachfrageorientiert", "konkurrenzorientiert", "keine Richtung: betriebsextern"],
              answer: 3,
              explain: "Das ist eine Größe von außen. Die Kosten steigen, aber die Mediaworld e. K. hat den Preis nicht selbst gesetzt."
            },
            {
              q: "Der Staat erhöht die Umsatzsteuer. Welche Grundrichtung?",
              hint: "Kommt diese Größe von innen oder von außen?",
              options: ["kostenorientiert", "nachfrageorientiert", "konkurrenzorientiert", "keine Richtung: betriebsextern"],
              answer: 3,
              explain: "Die Umsatzsteuer ist eine betriebsexterne Größe. Sie ist keine der drei Grundrichtungen."
            }
          ]
        },
        {
          type: "sentence",
          title: "A4 · Preisentscheidung begründen",
          case: "Der Wettbewerber verkauft den Fernseher für 1.399,00 €. Die Selbstkosten der Mediaworld e. K. liegen bei 1.180,00 €. Bau die Begründung.",
          text: "Am besten passt {*konkurrenzorientiert, mit Kostenkontrolle|nur kostenorientiert}. Der Wettbewerber verlangt {*1.399,00 €|1.487,50 €}. Die Mediaworld e. K. darf nicht unter die {*Selbstkosten|Wettbewerbspreise} gehen. Dazwischen entscheidet die {*Zahlungsbereitschaft|Mehrwertsteuer} der Kundschaft.",
          hints: ["Zwei Seiten: zu teuer verliert Kundschaft, zu billig macht Verlust.", "Die Untergrenze sind die Selbstkosten."],
          explain: "Guter Antwortsatz: Richtung nennen → Wettbewerbspreis nennen → Untergrenze Kosten → Spielraum durch die Zahlungsbereitschaft."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann betriebsinterne und betriebsexterne Einflussgrößen unterscheiden.",
            "Ich kann die drei Grundrichtungen der Preisbildung nennen.",
            "Ich kann einen Fall der richtigen Grundrichtung zuordnen.",
            "Ich kann erklären, warum der Preis einen Spielraum hat."
          ]
        }
      ]
    },

    /* ══════════════ EINFLUSSGRÖSSEN · TRAINIEREN ══════════════ */
    {
      id: "einfluss-trainieren",
      folder: "uebungsmodul",
      group: "Einflussgrößen",
      title: "Einflussgrößen trainieren",
      kicker: "Übungsmodul · Einflussgrößen 2",
      minutes: 25,
      help: `<h3>Die drei Fragen</h3>
             <ul><li><strong>kostenorientiert:</strong> Was kostet es uns?</li>
             <li><strong>nachfrageorientiert:</strong> Was ist es der Kundschaft wert?</li>
             <li><strong>konkurrenzorientiert:</strong> Was verlangen die anderen?</li></ul>
             <h3>Der Preis-Spielraum</h3>
             <p class="formula">Untergrenze = Selbstkosten<br>Obergrenze = Preis der Konkurrenz<br>Spielraum = Obergrenze − Untergrenze</p>
             <h3>Häufige Fehler</h3>
             <ul><li>Konkurrenzpreis für die Untergrenze halten.</li>
             <li>Nur die Kosten betrachten und die Kundschaft vergessen.</li>
             <li>Eine Kostenänderung für eine Grundrichtung halten.</li></ul>`,
      steps: [
        {
          type: "slides",
          title: "Der Fall: Die Preisrunde",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Preisrunde",
              title: "Drei Vorschläge für einen Preis.",
              body: `<p>Jan sagt: „Wir rechnen <strong>20 %</strong> auf die Kosten.“</p>
                     <p>Sofia sagt: „Der Wettbewerber ist <strong>billiger</strong>.“</p>
                     <p>Die Verkäuferin sagt: „Vor Weihnachten <strong>zahlen die Leute mehr</strong>.“</p>
                     <p>Wer hat recht?</p>`
            },
            {
              kicker: "Grundwissen · 1 von 2",
              title: "Drei Richtungen – drei Fragen.",
              body: `<dl class="terms">
                       <dt>kostenorientiert</dt><dd>Was kostet es uns? Grundlage: Selbstkosten + Gewinnzuschlag.</dd>
                       <dt>nachfrageorientiert</dt><dd>Was ist es der Kundschaft wert? Grundlage: Zahlungsbereitschaft.</dd>
                       <dt>konkurrenzorientiert</dt><dd>Was verlangen die anderen? Grundlage: Preis des Wettbewerbers.</dd>
                     </dl>`
            },
            {
              kicker: "Grundwissen · 2 von 2",
              title: "Der Spielraum hat zwei Grenzen.",
              body: `${ablauf([
                       { text: "Selbstkosten", value: "480,00 €", sub: true },
                       { op: "Spielraum", value: "119,00 €", note: "599,00 − 480,00" },
                       { text: "Preis der Konkurrenz", value: "599,00 €", hi: true }
                     ])}
                     <p class="note">Ein Preis unter 480,00 € macht Verlust. Ein Preis über 599,00 € ist schwer zu verkaufen.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Gute Preise beachten alle drei Seiten.",
              body: `<p>Kosten, Nachfrage und Konkurrenz gehören zusammen. Keine Seite allein reicht.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "A1 · Welche Grundrichtung?",
          prompt: "Ordne die Aussage der passenden Grundrichtung zu.",
          hints: ["Es wird gerechnet: kostenorientiert.", "Die Kundschaft bestimmt: nachfrageorientiert.", "Die anderen Anbieter bestimmen: konkurrenzorientiert."],
          categories: ["kostenorientiert", "nachfrageorientiert", "konkurrenzorientiert"],
          items: [
            { text: "Selbstkosten + Gewinnzuschlag", cat: 0 },
            { text: "Sofia rechnet 20 % auf die Selbstkosten", cat: 0 },
            { text: "Gemeinkosten prüfen und senken", cat: 0 },
            { text: "Zahlungsbereitschaft der Kundschaft", cat: 1 },
            { text: "Vor Weihnachten kostet die Spielkonsole 30 € mehr", cat: 1 },
            { text: "Ein Bundle mit Zubehör anbieten", cat: 1 },
            { text: "Preis des Wettbewerbers", cat: 2 },
            { text: "Mediaworld e. K. geht mit dem Preis des Elektromarkts mit", cat: 2 },
            { text: "Den Wettbewerber um 5 € unterbieten", cat: 2 }
          ]
        },
        {
          type: "quiz",
          title: "A2 · Typische Fehler",
          questions: [
            {
              q: "„Wenn wir die Kosten senken, senken wir automatisch den Preis.“ Stimmt das?",
              hint: "Der Preis hängt nicht nur von den Kosten ab.",
              options: ["Ja, der Preis sinkt immer mit den Kosten.", "Nein, Nachfrage und Konkurrenz bestimmen den Preis mit.", "Ja, aber nur bei Fernsehern.", "Nein, Kosten haben keinen Einfluss auf den Preis."],
              answer: 1,
              explain: "Kosten sind die Untergrenze. Ob der Preis sinkt, hängt auch von Nachfrage und Konkurrenz ab."
            },
            {
              q: "Der Preis des Wettbewerbers ist die …",
              hint: "Wo liegt der Preis im Spielraum?",
              options: ["Untergrenze.", "Obergrenze.", "immer der eigene Preis.", "Mehrwertsteuer."],
              answer: 1,
              explain: "Der Wettbewerbspreis setzt die Obergrenze. Die Selbstkosten setzen die Untergrenze."
            },
            {
              q: "Die Zahlungsbereitschaft der Kundschaft ist …",
              hint: "Kann die Mediaworld e. K. sie selbst festlegen?",
              options: ["betriebsintern.", "betriebsextern.", "eine Steuer.", "ein Gewinnziel."],
              answer: 1,
              explain: "Die Zahlungsbereitschaft kommt von der Kundschaft – also von außen."
            },
            {
              q: "Das Gewinnziel der Inhaberin ist …",
              hint: "Wer legt das Ziel fest?",
              options: ["betriebsintern.", "betriebsextern.", "eine Steuer.", "ein Wettbewerbspreis."],
              answer: 0,
              explain: "Das Gewinnziel legt die Inhaberin selbst fest: betriebsintern."
            }
          ]
        },
        {
          type: "calc",
          title: "A3 · Den Spielraum berechnen",
          decimals: 2,
          case: `Der <b>CINEMA 55</b> hat Selbstkosten von <b>620,00 €</b>. Der Wettbewerber verkauft ihn für <b>749,00 €</b>. Die Mediaworld e. K. überlegt einen Preis von <b>699,00 €</b>.<br><br>Berechne den Spielraum und die Abstände.`,
          rows: [
            { label: "Untergrenze (Selbstkosten)", value: 620 },
            { label: "Obergrenze (Wettbewerbspreis)", value: 749 },
            { label: "Spielraum", value: 129, sum: true },
            { label: "699,00 € − Untergrenze", value: 79 },
            { label: "Obergrenze − 699,00 €", value: 50, sum: true }
          ],
          hints: [
            "Die Untergrenze sind die Selbstkosten. Die Obergrenze ist der Wettbewerbspreis.",
            "Spielraum = Obergrenze − Untergrenze.",
            "Abstand zur Untergrenze: 699,00 − 620,00. Abstand zur Obergrenze: 749,00 − 699,00."
          ],
          result: "Der Spielraum ist 129,00 €. Der Preis von 699,00 € liegt 79,00 € über den Kosten und 50,00 € unter dem Wettbewerb."
        },
        {
          type: "sentence",
          title: "A4 · Den Spielraum deuten",
          case: "Nutze die Zahlen aus A3.",
          text: "Der Preis von 699,00 € liegt {*über|unter} der Untergrenze von 620,00 € und {*unter|über} der Obergrenze von 749,00 €. Die Mediaworld e. K. hat also {*Spielraum|keinen Spielraum}. Ob 699,00 € klug sind, hängt von der {*Zahlungsbereitschaft|Mehrwertsteuer} ab.",
          hints: ["Vergleiche 699,00 € mit 620,00 € und 749,00 €.", "Zwischen den beiden Grenzen liegt der Spielraum."],
          explain: "Guter Antwortsatz: beide Grenzen nennen → Lage des Preises → Bedeutung der Zahlungsbereitschaft."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann die drei Grundrichtungen an Beispielen erklären.",
            "Ich kann typische Fehler bei den Einflussgrößen erkennen.",
            "Ich kann den Preis-Spielraum berechnen.",
            "Ich kann einen Preis mit Untergrenze und Obergrenze beurteilen."
          ]
        }
      ]
    },

    /* ══════════════ KALKULATION · BEZUGSPREIS ══════════════ */
    {
      id: "bezugspreis-trainieren",
      folder: "uebungsmodul",
      group: "Kostenorientiert kalkulieren",
      title: "Bezugspreis trainieren",
      kicker: "Übungsmodul · Kalkulation 1",
      minutes: 25,
      help: `<h3>Die Bezugskalkulation</h3>
             <p class="formula">Listeneinkaufspreis − Rabatt = Zieleinkaufspreis<br>Zieleinkaufspreis − Skonto = Bareinkaufspreis<br>Bareinkaufspreis + Bezugskosten = Bezugspreis</p>
             <h3>Erst Rabatt, dann Skonto</h3>
             <p>Der <strong>Rabatt</strong> kommt vom Listeneinkaufspreis. Das <strong>Skonto</strong> kommt vom Zieleinkaufspreis – also vom Preis nach dem Rabatt.</p>
             <h3>Bezugskosten</h3>
             <p>Fracht, Verpackung, Transportversicherung. Miete, Strom und Werbung sind <strong>Gemeinkosten</strong>.</p>
             <p class="note">Der Bezugspreis ist der Einstandspreis – die Grundlage für den Verkaufspreis.</p>`,
      steps: [
        {
          type: "slides",
          title: "Der Fall: 15 Soundbars",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Einkauf",
              title: "480,00 € stehen im Angebot. Was kostet die Soundbar wirklich?",
              body: `<p>Sofia bestellt <strong>15 Soundbars</strong> der Serie <strong>SOUND 500</strong>.</p>
                     <p>Der Listeneinkaufspreis ist <strong>480,00 €</strong> pro Stück.</p>
                     <p>Rabatt, Skonto und Fracht kommen noch dazu – oder gehen ab.</p>`
            },
            {
              kicker: "Lernziel · Operator AFB II",
              title: "Ich kann den <mark>Bezugspreis</mark> berechnen und zwei <mark>Angebote vergleichen</mark>.",
              body: `<p class="box"><strong>berechnen</strong> heißt: das Rechenschema der Reihe nach ausfüllen.<br><strong>vergleichen</strong> heißt: beide Bezugspreise ausrechnen und die Differenz nennen.</p>`
            },
            {
              kicker: "So rechnest du",
              title: "Die Bezugskalkulation.",
              body: `${ablauf([
                       { text: "Listeneinkaufspreis" },
                       { op: "− Rabatt", note: "vom Listeneinkaufspreis" },
                       { text: "Zieleinkaufspreis", sub: true },
                       { op: "− Skonto", note: "vom Zieleinkaufspreis" },
                       { text: "Bareinkaufspreis", sub: true },
                       { op: "+ Bezugskosten", note: "Fracht, Verpackung, Versicherung" },
                       { text: "Bezugspreis", hi: true }
                     ])}
                     <p class="note">Übertrage das Schema in dein Heft.</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Zwei Abzüge – zwei Grundlagen.",
              body: `<div class="pair">
                       <div><b>Rabatt</b>kommt vom Listeneinkaufspreis. Danach heißt der Preis Zieleinkaufspreis.</div>
                       <div><b>Skonto</b>kommt vom Zieleinkaufspreis. Danach heißt der Preis Bareinkaufspreis.</div>
                     </div>
                     <p class="note">Wer das Skonto vom Listeneinkaufspreis rechnet, bekommt einen falschen Bezugspreis.</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Bezugskosten oder Gemeinkosten?",
              body: `<div class="pair">
                       <div><b>Bezugskosten</b>Fracht, Verpackung, Transportversicherung – alles für die Lieferung.</div>
                       <div><b>Gemeinkosten</b>Miete, Personal, Strom, Werbung – das gehört in die Verkaufskalkulation.</div>
                     </div>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Der Bezugspreis ist der Einstandspreis.",
              body: `<p>Er sagt, was die Ware tatsächlich gekostet hat – vor Gemeinkosten und Gewinn.</p>`
            }
          ]
        },
        {
          type: "calc",
          title: "A1 · Geführt: SOUND 500",
          decimals: 2,
          case: `Die <b>SOUND 500</b> hat einen Listeneinkaufspreis von <b>480,00 €</b>. Der Lieferant gibt <b>15 % Rabatt</b> und <b>2 % Skonto</b>. Für Fracht und Versicherung fallen <b>36,00 €</b> Bezugskosten an.<br><br>Berechne den Bezugspreis. Runde das Skonto auf ganze Cent.`,
          rows: [
            { label: "Listeneinkaufspreis", value: 480 },
            { label: "− Lieferantenrabatt (15 %)", value: 72 },
            { label: "= Zieleinkaufspreis", value: 408, sum: true },
            { label: "− Lieferantenskonto (2 %)", value: 8.16 },
            { label: "= Bareinkaufspreis", value: 399.84, sum: true },
            { label: "+ Bezugskosten", value: 36 },
            { label: "= Bezugspreis", value: 435.84, sum: true }
          ],
          hints: [
            "Rabatt: 15 % von 480,00 €. 10 % sind 48,00 €, 5 % sind 24,00 €.",
            "Zieleinkaufspreis = 480,00 − 72,00. Das Skonto rechnest du von diesem Preis.",
            "Skonto: 2 % von 408,00 € = 8,16 €.",
            "Lösungsweg: 480,00 − 72,00 = 408,00 → − 8,16 = 399,84 → + 36,00 = 435,84."
          ],
          result: "Der Bezugspreis beträgt 435,84 €."
        },
        {
          type: "calc",
          title: "A2 · Selbstständig: RAPIDCORE 14",
          decimals: 2,
          case: `Der Laptop <b>RAPIDCORE 14</b> hat einen Listeneinkaufspreis von <b>1.200,00 €</b>. Der Großhändler gibt <b>20 % Rabatt</b> und <b>3 % Skonto</b>. Die Bezugskosten betragen <b>24,50 €</b>.<br><br>Berechne den Bezugspreis. Runde das Skonto auf ganze Cent.`,
          rows: [
            { label: "Listeneinkaufspreis", value: 1200 },
            { label: "− Lieferantenrabatt (20 %)", value: 240 },
            { label: "= Zieleinkaufspreis", value: 960, sum: true },
            { label: "− Lieferantenskonto (3 %)", value: 28.8 },
            { label: "= Bareinkaufspreis", value: 931.2, sum: true },
            { label: "+ Bezugskosten", value: 24.5 },
            { label: "= Bezugspreis", value: 955.7, sum: true }
          ],
          hints: [
            "Rabatt: 20 % von 1.200,00 €.",
            "Skonto: 3 % vom Zieleinkaufspreis, nicht von 1.200,00 €.",
            "Bezugskosten kommen zum Bareinkaufspreis dazu."
          ],
          result: "Der Bezugspreis beträgt 955,70 €."
        },
        {
          type: "calc",
          title: "A3 · Zwei Angebote vergleichen",
          decimals: 2,
          case: `<b>Angebot A:</b> Listeneinkaufspreis <b>640,00 €</b>, <b>10 % Rabatt</b>, <b>2 % Skonto</b>, Bezugskosten <b>18,00 €</b>.<br><br>
                 <b>Angebot B:</b> Listeneinkaufspreis <b>620,00 €</b>, <b>5 % Rabatt</b>, <b>2 % Skonto</b>, Bezugskosten <b>25,00 €</b>.<br><br>
                 Berechne beide Bezugspreise und den Vorteil des günstigeren Angebots.`,
          rows: [
            { label: "Bezugspreis Angebot A", value: 582.48 },
            { label: "Bezugspreis Angebot B", value: 602.22 },
            { label: "Vorteil für Angebot A", value: 19.74, sum: true }
          ],
          hints: [
            "Rechne beide Angebote getrennt: erst Rabatt, dann Skonto, dann Bezugskosten.",
            "A: 640,00 − 64,00 = 576,00. Skonto: 2 % von 576,00 €.",
            "B: 620,00 − 31,00 = 589,00. Skonto: 2 % von 589,00 €.",
            "Vergleiche die beiden Bezugspreise: 602,22 − 582,48."
          ],
          result: "Angebot A ist 19,74 € günstiger. Der höhere Listenpreis lohnt sich wegen des größeren Rabatts."
        },
        {
          type: "quiz",
          title: "A4 · Typische Fehler",
          questions: [
            {
              q: "Wovon wird das Skonto gerechnet?",
              hint: "Skonto kommt nach dem Rabatt.",
              options: ["vom Listeneinkaufspreis", "vom Zieleinkaufspreis", "vom Bezugspreis", "von den Bezugskosten"],
              answer: 1,
              explain: "Skonto = Zieleinkaufspreis × Skontosatz. Deshalb: erst Rabatt, dann Skonto."
            },
            {
              q: "Welche Kosten sind Bezugskosten?",
              options: ["Miete für das Geschäft", "Fracht und Transportversicherung", "Werbung im Radio", "Gehälter der Verkäufer/innen"],
              answer: 1,
              explain: "Bezugskosten hängen an der Lieferung. Miete, Werbung und Gehälter sind Gemeinkosten."
            },
            {
              q: "Wie lautet die richtige Reihenfolge?",
              options: ["Rabatt → Skonto → Bezugskosten", "Skonto → Rabatt → Bezugskosten", "Bezugskosten → Rabatt → Skonto", "Rabatt → Bezugskosten → Skonto"],
              answer: 0,
              explain: "Erst Rabatt vom Listeneinkaufspreis, dann Skonto vom Zieleinkaufspreis, zum Schluss die Bezugskosten addieren."
            },
            {
              q: "Was ist der Bezugspreis?",
              options: ["der Katalogpreis ohne Abzug", "der Preis nach Rabatt und Skonto plus Bezugskosten", "der Preis mit Gewinnaufschlag", "der Preis nach dem Rabatt"],
              answer: 1,
              explain: "Der Bezugspreis ist der Einstandspreis – das, was die Ware tatsächlich kostet."
            }
          ]
        },
        {
          type: "sentence",
          title: "A5 · Angebot A begründen",
          case: "Nutze die Zahlen aus A3.",
          text: "Angebot A ist {*19,74 €|31,52 €} günstiger. A hat zwar einen {*höheren|niedrigeren} Listeneinkaufspreis, aber der {*Rabatt|Skonto} ist größer. Beim Vergleich zählt nur der {*Bezugspreis|Listeneinkaufspreis}.",
          hints: ["Vergleiche die beiden Bezugspreise aus A3.", "Der Listenpreis allein sagt nicht, welches Angebot günstiger ist."],
          explain: "Guter Antwortsatz: Vorteil nennen → Grund beim Rabatt nennen → auf den Bezugspreis verweisen."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann den Bezugspreis in drei Stufen berechnen.",
            "Ich kann erklären, warum Skonto vom Zieleinkaufspreis gerechnet wird.",
            "Ich kann Bezugskosten von Gemeinkosten unterscheiden.",
            "Ich kann zwei Angebote über den Bezugspreis vergleichen."
          ]
        }
      ]
    },

    /* ══════════════ KALKULATION · VERKAUFSPREIS ══════════════ */
    {
      id: "verkaufspreis-trainieren",
      folder: "uebungsmodul",
      group: "Kostenorientiert kalkulieren",
      title: "Verkaufspreis trainieren",
      kicker: "Übungsmodul · Kalkulation 2",
      minutes: 30,
      help: `<h3>Die Handelskalkulation</h3>
             <p class="formula">Bezugspreis + Gemeinkosten = Selbstkosten<br>Selbstkosten + Gewinnaufschlag = Barverkaufspreis<br>Barverkaufspreis + Kundenskonto = Zielverkaufspreis<br>Zielverkaufspreis + Kundenrabatt = Listenverkaufspreis</p>
             <h3>Nachlässe hochrechnen</h3>
             <p>Skonto und Rabatt werden nicht abgezogen, sondern <strong>hochgerechnet</strong>:</p>
             <p class="formula">Zielverkaufspreis = Barverkaufspreis × 100 ÷ 96<br>Listenverkaufspreis = Zielverkaufspreis × 100 ÷ 90</p>
             <h3>Zuschlag und Faktor</h3>
             <p class="formula">Zuschlag = (LVP − BP) ÷ BP × 100<br>Faktor = LVP ÷ BP</p>
             <p class="note">Faktor 1,60 heißt 60 % Zuschlag – nicht 160 %.</p>`,
      steps: [
        {
          type: "slides",
          title: "Der Fall: VISION 65",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Verkauf",
              title: "600,00 € Einkauf. Und im Laden?",
              body: `<p>Der neue Fernseher <strong>VISION 65</strong> kostet im Einkauf <strong>600,00 €</strong> (Bezugspreis).</p>
                     <p>Sofia will <strong>20 % Gemeinkosten</strong>, <strong>20 % Gewinn</strong>, <strong>4 % Skonto</strong> und <strong>10 % Rabatt</strong> einrechnen.</p>
                     <p>Was steht am Ende auf dem Preisschild?</p>`
            },
            {
              kicker: "Lernziel · Operator AFB II",
              title: "Ich kann den <mark>Listenverkaufspreis</mark> Schritt für Schritt <mark>berechnen</mark>.",
              body: `<p class="box"><strong>berechnen</strong> heißt: vom Bezugspreis nach oben rechnen – Gemeinkosten, Gewinn, Skonto, Rabatt.</p>`
            },
            {
              kicker: "So rechnest du",
              title: "Die Handelskalkulation.",
              body: `${ablauf([
                       { text: "Bezugspreis" },
                       { op: "+ Gemeinkosten", note: "vom Bezugspreis" },
                       { text: "Selbstkosten", sub: true },
                       { op: "+ Gewinnaufschlag", note: "von den Selbstkosten" },
                       { text: "Barverkaufspreis", sub: true },
                       { op: "+ Kundenskonto", note: "vom Zielverkaufspreis" },
                       { text: "Zielverkaufspreis", sub: true },
                       { op: "+ Kundenrabatt", note: "vom Listenverkaufspreis" },
                       { text: "Listenverkaufspreis", hi: true }
                     ])}`
            },
            {
              kicker: "Grundwissen",
              title: "Nachlässe rechnest du hoch.",
              body: `<p>Skonto und Rabatt sollen im Preis <strong>enthalten</strong> sein. Deshalb rechnest du vom Barverkaufspreis zum Zielverkaufspreis <strong>hoch</strong>.</p>
                     <p class="box">Skonto 4 %: Barverkaufspreis × 100 ÷ 96<br>Rabatt 10 %: Zielverkaufspreis × 100 ÷ 90</p>
                     <p class="note">Nicht abziehen! Sonst ist der Preis zu niedrig.</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Zuschlag und Faktor.",
              body: `<dl class="terms">
                       <dt>Kalkulationszuschlag</dt><dd>Der Aufschlag in Prozent vom Bezugspreis: (LVP − BP) ÷ BP × 100.</dd>
                       <dt>Kalkulationsfaktor</dt><dd>Eine einzige Zahl: LVP ÷ BP. Damit gilt: LVP = BP × Faktor.</dd>
                     </dl>
                     <p class="note">Faktor 1,60 bedeutet 60 % Zuschlag. 160 % Zuschlag wäre Faktor 2,60.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Erst rechnen, dann nachlassen.",
              body: `<p>Gemeinkosten und Gewinn kommen auf den Bezugspreis. Skonto und Rabatt werden in den Preis eingeplant.</p>`
            }
          ]
        },
        {
          type: "calc",
          title: "A1 · Geführt: VISION 65",
          decimals: 2,
          case: `Bezugspreis <b>600,00 €</b>. Gemeinkosten <b>20 %</b>, Gewinnaufschlag <b>20 %</b>, Kundenskonto <b>4 %</b>, Kundenrabatt <b>10 %</b>.<br><br>Berechne den Listenverkaufspreis. Rechne Skonto und Rabatt hoch.`,
          rows: [
            { label: "Bezugspreis", value: 600 },
            { label: "+ Gemeinkosten (20 % vom Bezugspreis)", value: 120 },
            { label: "= Selbstkosten", value: 720, sum: true },
            { label: "+ Gewinnaufschlag (20 % von den Selbstkosten)", value: 144 },
            { label: "= Barverkaufspreis", value: 864, sum: true },
            { label: "+ Kundenskonto (4 % vom Zielverkaufspreis)", value: 36 },
            { label: "= Zielverkaufspreis", value: 900, sum: true },
            { label: "+ Kundenrabatt (10 % vom Listenverkaufspreis)", value: 100 },
            { label: "= Listenverkaufspreis (netto)", value: 1000, sum: true }
          ],
          hints: [
            "Gemeinkosten: 20 % von 600,00 €. Gewinn: 20 % von den Selbstkosten.",
            "Skonto wird vom Zielverkaufspreis gerechnet. Also: 864,00 × 100 ÷ 96.",
            "Rabatt wird vom Listenverkaufspreis gerechnet. Also: 900,00 × 100 ÷ 90.",
            "Lösungsweg: 600 + 120 = 720; + 144 = 864; × 100 ÷ 96 = 900; × 100 ÷ 90 = 1.000."
          ],
          result: "Der Listenverkaufspreis beträgt 1.000,00 €."
        },
        {
          type: "calc",
          title: "A2 · Selbstständig: SOUND 700",
          decimals: 2,
          case: `Die Soundbar <b>SOUND 700</b> hat einen Bezugspreis von <b>320,00 €</b>. Gemeinkosten <b>25 %</b>, Gewinnaufschlag <b>20 %</b>, Kundenskonto <b>4 %</b>, Kundenrabatt <b>20 %</b>.<br><br>Berechne den Listenverkaufspreis.`,
          rows: [
            { label: "Bezugspreis", value: 320 },
            { label: "+ Gemeinkosten (25 % vom Bezugspreis)", value: 80 },
            { label: "= Selbstkosten", value: 400, sum: true },
            { label: "+ Gewinnaufschlag (20 % von den Selbstkosten)", value: 80 },
            { label: "= Barverkaufspreis", value: 480, sum: true },
            { label: "+ Kundenskonto (4 % vom Zielverkaufspreis)", value: 20 },
            { label: "= Zielverkaufspreis", value: 500, sum: true },
            { label: "+ Kundenrabatt (20 % vom Listenverkaufspreis)", value: 125 },
            { label: "= Listenverkaufspreis (netto)", value: 625, sum: true }
          ],
          hints: [
            "25 % von 320,00 € sind ein Viertel.",
            "Gewinn: 20 % von 400,00 €.",
            "Skonto: 480,00 × 100 ÷ 96. Rabatt: 500,00 × 100 ÷ 80."
          ],
          result: "Der Listenverkaufspreis beträgt 625,00 €."
        },
        {
          type: "calc",
          title: "A3 · Zuschlag und Faktor",
          decimals: 2,
          case: `Der Beamer <b>BEAM 100</b> hat einen Bezugspreis von <b>200,00 €</b> und einen Listenverkaufspreis von <b>320,00 €</b>.<br><br>Berechne Zuschlag und Faktor. Prüfe mit der Probe. Dann: Wie hoch ist der Listenverkaufspreis eines Geräts mit Bezugspreis <b>275,00 €</b> bei demselben Faktor?`,
          rows: [
            { label: "Kalkulationszuschlag in %", value: 60, dec: 0 },
            { label: "Kalkulationsfaktor", value: 1.6 },
            { label: "Probe: 200,00 × Faktor", value: 320, sum: true },
            { label: "LVP bei Bezugspreis 275,00 €", value: 440, sum: true }
          ],
          hints: [
            "Zuschlag: Aufschlag in Euro ÷ Bezugspreis × 100. Der Aufschlag ist 320 − 200.",
            "Faktor = LVP ÷ BP = 320 ÷ 200.",
            "Zweites Gerät: 275,00 × Faktor."
          ],
          result: "Zuschlag 60 %, Faktor 1,60. Das zweite Gerät kostet 440,00 €."
        },
        {
          type: "quiz",
          title: "A4 · Verstehen",
          questions: [
            {
              q: "In welcher Reihenfolge rechnest du vorwärts?",
              options: ["Bezugspreis → Gemeinkosten → Gewinn → Skonto → Rabatt", "Bezugspreis → Rabatt → Gewinn → Skonto → Gemeinkosten", "Gewinn → Bezugspreis → Skonto → Rabatt → Gemeinkosten", "Skonto → Rabatt → Bezugspreis → Gewinn → Gemeinkosten"],
              answer: 0,
              explain: "Vom Bezugspreis über die Gemeinkosten zu den Selbstkosten, dann Gewinn, Skonto und Rabatt."
            },
            {
              q: "Wovon werden die Gemeinkosten gerechnet?",
              options: ["vom Listenverkaufspreis", "vom Bezugspreis", "vom Barverkaufspreis", "vom Zielverkaufspreis"],
              answer: 1,
              explain: "Gemeinkosten sind ein Zuschlag auf den Bezugspreis."
            },
            {
              q: "Warum rechnen wir den Zielverkaufspreis hoch?",
              hint: "Das Skonto soll im Preis enthalten sein.",
              options: ["Weil das Skonto sonst doppelt zählt.", "Weil das Skonto ein Nachlass auf den Zielverkaufspreis ist.", "Weil die Mehrwertsteuer fehlt.", "Weil der Gewinn zu niedrig ist."],
              answer: 1,
              explain: "Das Skonto wird vom Zielverkaufspreis gegeben. Also muss der Zielverkaufspreis so hoch sein, dass nach dem Skonto der Barverkaufspreis bleibt."
            },
            {
              q: "Was bedeutet Faktor 1,60?",
              options: ["160 % Zuschlag", "60 % Zuschlag", "60 % Rabatt", "1,60 € Gewinn"],
              answer: 1,
              explain: "Der Faktor enthält den Bezugspreis (1,00) schon mit. 1,60 − 1,00 = 0,60 = 60 %."
            },
            {
              q: "Warum ist der Listenverkaufspreis höher als die Selbstkosten?",
              options: ["Weil die Mehrwertsteuer dazukommt.", "Weil Gewinn, Skonto und Rabatt eingeplant sind.", "Weil der Bezugspreis falsch ist.", "Weil die Gemeinkosten fehlen."],
              answer: 1,
              explain: "Auf die Selbstkosten kommen Gewinnaufschlag, Kundenskonto und Kundenrabatt."
            }
          ]
        },
        {
          type: "sentence",
          title: "A5 · Den Preis erklären",
          case: "Nutze die Zahlen aus A1.",
          text: "Der Listenverkaufspreis beträgt {*1.000,00 €|864,00 €|1.080,00 €}. Vom Bezugspreis kommen zuerst die {*Gemeinkosten|Kundenskonten} dazu. Danach folgen {*Gewinnaufschlag, Skonto und Rabatt|nur die Mehrwertsteuer}.",
          hints: ["Der Listenverkaufspreis steht in der letzten Zeile des Schemas.", "Nach den Selbstkosten kommen Gewinn, Skonto und Rabatt."],
          explain: "Guter Antwortsatz: Ergebnis nennen → Aufbau der Kalkulation in der richtigen Reihenfolge erklären."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann den Listenverkaufspreis Schritt für Schritt berechnen.",
            "Ich kann Skonto und Rabatt richtig hochrechnen.",
            "Ich kann Zuschlag und Faktor berechnen.",
            "Ich kann erklären, warum der Listenverkaufspreis über den Selbstkosten liegt."
          ]
        }
      ]
    },

    /* ══════════════ KALKULATION · GEMISCHT ENTSCHEIDEN ══════════════ */
    {
      id: "gemischt-entscheiden",
      folder: "uebungsmodul",
      group: "Kostenorientiert kalkulieren",
      title: "Gemischt entscheiden",
      kicker: "Übungsmodul · Anwenden",
      minutes: 30,
      help: `<h3>Vom Rechnen zur Entscheidung</h3>
             <p>Die Kalkulation liefert einen <strong>Preisvorschlag</strong>. Ob er am Markt durchsetzbar ist, entscheiden Nachfrage und Konkurrenz.</p>
             <h3>Der Preis-Spielraum</h3>
             <p class="formula">Untergrenze = Selbstkosten<br>Obergrenze = Preis der Konkurrenz</p>
             <h3>Drei Antworten auf einen billigeren Wettbewerber</h3>
             <ul><li><strong>mitgehen:</strong> Preis anpassen.</li>
             <li><strong>unterbieten:</strong> bewusst billiger werden – nur mit Kostenkontrolle.</li>
             <li><strong>halten:</strong> Preis bleibt, dafür Service und Beratung betonen.</li></ul>`,
      steps: [
        {
          type: "slides",
          title: "Der Fall: HOMEMATE",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Preisentscheidung",
              title: "120,00 € oder 109,00 €?",
              body: `<p>Die Mediaworld e. K. plant den Smart Speaker <strong>HOMEMATE</strong>.</p>
                     <p>Bezugspreis <strong>72,00 €</strong>. Gemeinkosten <strong>20 %</strong>, Gewinn <strong>20 %</strong>, Skonto <strong>4 %</strong>, Rabatt <strong>10 %</strong>.</p>
                     <p>Der Wettbewerber verkauft ein vergleichbares Gerät für <strong>109,00 €</strong>.</p>`
            },
            {
              kicker: "Lernziel · Operator AFB III",
              title: "Ich kann einen berechneten Preis <mark>beurteilen</mark> und eine <mark>Empfehlung</mark> geben.",
              body: `<p class="box"><strong>beurteilen</strong> heißt: den Preis mit Kosten und Wettbewerb vergleichen.<br><strong>Empfehlung</strong> heißt: eine Option wählen und sie mit Zahlen begründen.</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Der Preisvorschlag ist noch kein Preis.",
              body: `<p>Die Kalkulation zeigt, was der Preis <strong>mindestens</strong> kosten muss: die Selbstkosten.</p>
                     <p>Der Wettbewerb zeigt, was der Markt <strong>höchstens</strong> hergibt.</p>
                     <p class="note">Dazwischen liegt der Spielraum für die Entscheidung.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Rechnen, vergleichen, entscheiden.",
              body: `<p>Erst den Preis berechnen. Dann mit dem Wettbewerb vergleichen. Dann eine Richtung wählen und begründen.</p>`
            }
          ]
        },
        {
          type: "calc",
          title: "A1 · Preis für HOMEMATE berechnen",
          decimals: 2,
          case: `Bezugspreis <b>72,00 €</b>. Gemeinkosten <b>20 %</b>, Gewinnaufschlag <b>20 %</b>, Kundenskonto <b>4 %</b>, Kundenrabatt <b>10 %</b>.<br><br>Berechne den Listenverkaufspreis.`,
          rows: [
            { label: "Bezugspreis", value: 72 },
            { label: "+ Gemeinkosten (20 % vom Bezugspreis)", value: 14.4 },
            { label: "= Selbstkosten", value: 86.4, sum: true },
            { label: "+ Gewinnaufschlag (20 % von den Selbstkosten)", value: 17.28 },
            { label: "= Barverkaufspreis", value: 103.68, sum: true },
            { label: "+ Kundenskonto (4 % vom Zielverkaufspreis)", value: 4.32 },
            { label: "= Zielverkaufspreis", value: 108, sum: true },
            { label: "+ Kundenrabatt (10 % vom Listenverkaufspreis)", value: 12 },
            { label: "= Listenverkaufspreis (netto)", value: 120, sum: true }
          ],
          hints: [
            "Gemeinkosten: 20 % von 72,00 €. Gewinn: 20 % von den Selbstkosten.",
            "Skonto: 103,68 × 100 ÷ 96. Rabatt: 108,00 × 100 ÷ 90.",
            "Lösungsweg: 72 + 14,40 = 86,40; + 17,28 = 103,68; × 100 ÷ 96 = 108; × 100 ÷ 90 = 120."
          ],
          result: "Der Listenverkaufspreis beträgt 120,00 €."
        },
        {
          type: "calc",
          title: "A2 · Mit dem Wettbewerb vergleichen",
          decimals: 2,
          case: `Der Wettbewerber verkauft ein vergleichbares Gerät für <b>109,00 €</b>. Die Selbstkosten des HOMEMATE betragen <b>86,40 €</b>.<br><br>Vergleiche die Preise und den Gewinn pro Stück.`,
          rows: [
            { label: "Preis des Wettbewerbers", value: 109 },
            { label: "Eigener Listenverkaufspreis", value: 120 },
            { label: "Preisunterschied", value: 11, sum: true },
            { label: "Gewinn pro Stück bei 120,00 €", value: 33.6 },
            { label: "Gewinn pro Stück bei 109,00 €", value: 22.6 },
            { label: "Weniger Gewinn pro Stück", value: 11, sum: true }
          ],
          hints: [
            "Preisunterschied: 120,00 − 109,00.",
            "Gewinn pro Stück = Preis − Selbstkosten (86,40 €).",
            "Vergleiche 120,00 € und 109,00 € mit den Selbstkosten."
          ],
          result: "Der eigene Preis liegt 11,00 € über dem Wettbewerb. Bei 109,00 € bleiben noch 22,60 € Gewinn pro Stück."
        },
        {
          type: "quiz",
          title: "A3 · Die Entscheidung",
          questions: [
            {
              q: "Was ist die Untergrenze für den HOMEMATE?",
              hint: "Was muss mindestens gedeckt sein?",
              options: ["109,00 €", "86,40 €", "120,00 €", "72,00 €"],
              answer: 1,
              explain: "Die Selbstkosten (86,40 €) sind die Untergrenze. Darunter macht die Mediaworld e. K. Verlust."
            },
            {
              q: "Was ist die Obergrenze?",
              hint: "Was verlangt der Wettbewerb?",
              options: ["86,40 €", "109,00 €", "120,00 €", "72,00 €"],
              answer: 1,
              explain: "Der Wettbewerbspreis (109,00 €) setzt die Obergrenze."
            },
            {
              q: "Was ist das Problem bei 120,00 €?",
              hint: "Vergleiche mit dem Wettbewerb.",
              options: ["Der Preis liegt unter den Selbstkosten.", "Der Preis liegt über dem Wettbewerb.", "Der Preis ist zu niedrig.", "Es gibt kein Problem."],
              answer: 1,
              explain: "120,00 € liegen 11,00 € über dem Wettbewerbspreis. Die Kundschaft könnte zum Wettbewerber gehen."
            },
            {
              q: "Welche Argumente rechtfertigen einen höheren Preis?",
              options: ["bessere Beratung, Garantie und Service", "nur der eigene Wunsch nach mehr Gewinn", "eine höhere Mehrwertsteuer", "ein längerer Ladenname"],
              answer: 0,
              explain: "Service, Beratung und Garantie können einen höheren Preis rechtfertigen – wenn die Kundschaft den Mehrwert sieht."
            },
            {
              q: "Was ist die kostenorientierte Antwort auf den Wettbewerb?",
              options: ["einfach den Preis senken", "Bezugspreis und Gemeinkosten prüfen, um Spielraum zu gewinnen", "die Mehrwertsteuer senken", "den Wettbewerber ignorieren"],
              answer: 1,
              explain: "Wer Kosten senkt, gewinnt Spielraum. Einfach den Preis senken kann zum Verlust führen."
            }
          ]
        },
        {
          type: "sort",
          title: "A4 · Maßnahmen zuordnen",
          prompt: "Zu welcher Grundrichtung passt die Maßnahme?",
          hints: ["Kostenorientiert: an den eigenen Kosten arbeiten.", "Nachfrageorientiert: die Zahlungsbereitschaft nutzen.", "Konkurrenzorientiert: auf den Wettbewerb reagieren."],
          categories: ["kostenorientiert", "nachfrageorientiert", "konkurrenzorientiert"],
          items: [
            { text: "Bezugspreis durch Rabattverhandlung senken", cat: 0 },
            { text: "Gemeinkosten prüfen und senken", cat: 0 },
            { text: "Gewinnaufschlag reduzieren", cat: 0 },
            { text: "Vor Weihnachten den Preis erhöhen", cat: 1 },
            { text: "Ein Bundle mit Zubehör anbieten", cat: 1 },
            { text: "Eine Zielgruppe mit hoher Zahlungsbereitschaft ansprechen", cat: 1 },
            { text: "Den Preis an den Elektromarkt anpassen", cat: 2 },
            { text: "Mit Preisgarantie werben", cat: 2 },
            { text: "Den Wettbewerber um 5 € unterbieten", cat: 2 }
          ]
        },
        {
          type: "sentence",
          title: "A5 · Eine Empfehlung geben",
          case: "Nutze die Zahlen aus A1 und A2.",
          text: "Für die Mediaworld e. K. passt am besten eine {*konkurrenzorientierte|nur kostenorientierte} Preisentscheidung mit Kostenkontrolle. 120,00 € liegen {*über|unter} dem Wettbewerbspreis von 109,00 €. Wenn die Kundschaft den Mehrwert nicht sieht, {*geht sie zum Wettbewerber|zahlt sie jeden Preis}. Gleichzeitig dürfen die {*Selbstkosten|Wettbewerbspreise} nicht unterschritten werden.",
          hints: ["Vergleiche 120,00 € mit 109,00 €.", "Die Untergrenze sind die Selbstkosten, nicht der Wettbewerbspreis."],
          explain: "Gute Empfehlung: Richtung nennen → Wettbewerbspreis vergleichen → Folge für die Kundschaft → Untergrenze Kosten."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann einen berechneten Preis mit dem Wettbewerb vergleichen.",
            "Ich kann Untergrenze und Obergrenze bestimmen.",
            "Ich kann Maßnahmen den drei Grundrichtungen zuordnen.",
            "Ich kann eine Preisempfehlung mit Zahlen begründen."
          ]
        }
      ]
    },

    /* ══════════════ LERNSTANDKONTROLLE ══════════════ */
    {
      id: "uebungscheck",
      folder: "uebungsmodul",
      group: "Lernstandskontrolle",
      title: "Übungscheck Preisbildung",
      kicker: "Lernstandskontrolle · mit Erklärungen",
      minutes: 45,
      exam: {
        guided: true,
        minutes: 45,
        tools: "Taschenrechner",
        situation: `<p>Die Mediaworld e. K. plant Preise für neue Geräte. In sechs Aufgaben wiederholst du Einflussgrößen und kostenorientiertes Kalkulieren.</p>
                    <p>Der Übungscheck ist wie eine Klassenarbeit aufgebaut. Du bekommst nach jeder Aufgabe eine Rückmeldung und am Ende Punkte und eine Note.</p>`,
        grading: [[92, "1", "sehr gut"], [81, "2", "gut"], [67, "3", "befriedigend"], [50, "4", "ausreichend"], [30, "5", "mangelhaft"], [0, "6", "ungenügend"]]
      },
      help: `<h3>Das brauchst du</h3>
             <ul><li>Einflussgrößen: innen und außen.</li>
             <li>Drei Grundrichtungen: kosten-, nachfrage- und konkurrenzorientiert.</li>
             <li>Bezugskalkulation: Rabatt, Skonto, Bezugskosten.</li>
             <li>Handelskalkulation: Gemeinkosten, Gewinn, Skonto, Rabatt.</li>
             <li>Zuschlag und Faktor.</li></ul>
             <p class="note">Rechne jeden Schritt auf. Auch der Weg bringt Punkte.</p>`,
      steps: [
        {
          type: "quiz",
          title: "A1 · Einflussgrößen",
          points: 6,
          review: "einfluss-erkennen",
          guide: [
            {
              kicker: "Erklärung · 1 von 2",
              title: "Wer entscheidet?",
              body: `<p>Frage bei jeder Größe: <strong>Kann die Mediaworld e. K. sie selbst ändern?</strong></p>
                     <p>Beispiel: Die Miete für das Geschäft ist betriebsintern. Der Preis des Lieferanten ist betriebsextern.</p>`
            },
            {
              style: "accent",
              kicker: "Erklärung · 2 von 2",
              title: "Drei Richtungen – drei Grundlagen.",
              body: `<p>kostenorientiert = Selbstkosten + Gewinn. nachfrageorientiert = Zahlungsbereitschaft. konkurrenzorientiert = Wettbewerbspreis.</p>
                     <p class="note">Eine Kostenänderung ist noch keine Grundrichtung.</p>`
            }
          ],
          questions: [
            {
              q: "Welche Einflussgröße ist betriebsintern?",
              options: ["Preis des Wettbewerbers", "Personalkosten", "Umsatzsteuer", "Zahlungsbereitschaft der Kundschaft"],
              answer: 1,
              explain: "Personalkosten kann die Mediaworld e. K. selbst beeinflussen."
            },
            {
              q: "Welche Einflussgröße ist betriebsextern?",
              options: ["Gewinnziel", "Miete", "Lieferantenrabatt", "Serviceangebot"],
              answer: 2,
              explain: "Der Lieferantenrabatt kommt vom Lieferanten – also von außen."
            },
            {
              q: "Die Mediaworld e. K. richtet ihren Preis am Elektromarkt aus. Welche Grundrichtung?",
              options: ["kostenorientiert", "nachfrageorientiert", "konkurrenzorientiert", "keine Richtung"],
              answer: 2,
              explain: "Der Wettbewerbspreis ist die Grundlage: konkurrenzorientiert."
            }
          ]
        },
        {
          type: "sort",
          title: "A2 · Innen oder außen?",
          points: 6,
          review: "einfluss-trainieren",
          guide: [
            {
              kicker: "Erklärung · 1 von 2",
              title: "Innen oder außen?",
              body: `<p><strong>Innen:</strong> Das entscheidet die Mediaworld e. K. selbst – Kosten, Gewinnziel, Auslastung, Service.</p>
                     <p><strong>Außen:</strong> Das kommt von Kundschaft, Wettbewerb, Lieferanten oder Staat.</p>`
            },
            {
              style: "accent",
              kicker: "Erklärung · 2 von 2",
              title: "Prüfe mit einer Frage.",
              body: `<p>Frage: <strong>Wer setzt diese Größe?</strong> Die Mediaworld e. K. oder jemand anderes?</p>
                     <p class="note">Der Lieferantenrabatt wird vom Lieferanten gesetzt – auch wenn die Mediaworld e. K. ihn aushandelt.</p>`
            }
          ],
          categories: ["betriebsintern", "betriebsextern"],
          items: [
            { text: "Personalkosten", cat: 0 },
            { text: "Preis des Wettbewerbers", cat: 1 },
            { text: "Gewinnziel", cat: 0 },
            { text: "Umsatzsteuer", cat: 1 },
            { text: "Auslastung der Werkstatt", cat: 0 },
            { text: "Zahlungsbereitschaft der Kundschaft", cat: 1 },
            { text: "Serviceangebot", cat: 0 },
            { text: "Lieferantenpreis", cat: 1 }
          ]
        },
        {
          type: "calc",
          title: "A3 · Bezugspreis",
          points: 10,
          review: "bezugspreis-trainieren",
          decimals: 2,
          guide: [
            {
              kicker: "Erklärung · 1 von 2",
              title: "Die Bezugskalkulation.",
              body: `${ablauf([
                       { text: "Listeneinkaufspreis" },
                       { op: "− Rabatt" },
                       { text: "Zieleinkaufspreis", sub: true },
                       { op: "− Skonto" },
                       { text: "Bareinkaufspreis", sub: true },
                       { op: "+ Bezugskosten" },
                       { text: "Bezugspreis", hi: true }
                     ])}
                     <p class="note">Beispiel mit anderen Zahlen: 500 − 50 = 450; − 9 = 441; + 20 = 461.</p>`
            },
            {
              style: "accent",
              kicker: "Erklärung · 2 von 2",
              title: "Typische Falle.",
              body: `<p>Das Skonto wird <strong>vom Zieleinkaufspreis</strong> gerechnet, nicht vom Listeneinkaufspreis.</p>
                     <p>Bezugskosten werden <strong>addiert</strong>. Miete und Strom sind keine Bezugskosten.</p>`
            }
          ],
          case: `Listeneinkaufspreis <b>750,00 €</b>, Lieferantenrabatt <b>12 %</b>, Lieferantenskonto <b>2 %</b>, Bezugskosten <b>40,00 €</b>.<br><br>Berechne den Bezugspreis. Runde das Skonto auf ganze Cent.`,
          rows: [
            { label: "Listeneinkaufspreis", value: 750 },
            { label: "− Lieferantenrabatt (12 %)", value: 90 },
            { label: "= Zieleinkaufspreis", value: 660, sum: true },
            { label: "− Lieferantenskonto (2 %)", value: 13.2 },
            { label: "= Bareinkaufspreis", value: 646.8, sum: true },
            { label: "+ Bezugskosten", value: 40 },
            { label: "= Bezugspreis", value: 686.8, sum: true }
          ],
          hints: [
            "Rabatt: 12 % von 750,00 €.",
            "Skonto: 2 % vom Zieleinkaufspreis.",
            "Bezugskosten kommen zum Bareinkaufspreis dazu."
          ]
        },
        {
          type: "calc",
          title: "A4 · Verkaufspreis",
          points: 10,
          review: "verkaufspreis-trainieren",
          decimals: 2,
          guide: [
            {
              kicker: "Erklärung · 1 von 2",
              title: "Die Handelskalkulation.",
              body: `${ablauf([
                       { text: "Bezugspreis" },
                       { op: "+ Gemeinkosten" },
                       { text: "Selbstkosten", sub: true },
                       { op: "+ Gewinn" },
                       { text: "Barverkaufspreis", sub: true },
                       { op: "+ Skonto" },
                       { text: "Zielverkaufspreis", sub: true },
                       { op: "+ Rabatt" },
                       { text: "Listenverkaufspreis", hi: true }
                     ])}
                     <p class="note">Beispiel mit anderen Zahlen: 400 + 100 = 500; + 100 = 600; × 100 ÷ 96 = 625; × 100 ÷ 80 = 781,25.</p>`
            },
            {
              style: "accent",
              kicker: "Erklärung · 2 von 2",
              title: "Nachlässe hochrechnen.",
              body: `<p>Skonto und Rabatt werden <strong>nicht abgezogen</strong>, sondern in den Preis eingeplant.</p>
                     <p class="formula">Zielverkaufspreis = Barverkaufspreis × 100 ÷ 96<br>Listenverkaufspreis = Zielverkaufspreis × 100 ÷ 90</p>`
            }
          ],
          case: `Bezugspreis <b>800,00 €</b>. Gemeinkosten <b>25 %</b>, Gewinnaufschlag <b>20 %</b>, Kundenskonto <b>4 %</b>, Kundenrabatt <b>20 %</b>.<br><br>Berechne den Listenverkaufspreis.`,
          rows: [
            { label: "Bezugspreis", value: 800 },
            { label: "+ Gemeinkosten (25 % vom Bezugspreis)", value: 200 },
            { label: "= Selbstkosten", value: 1000, sum: true },
            { label: "+ Gewinnaufschlag (20 % von den Selbstkosten)", value: 200 },
            { label: "= Barverkaufspreis", value: 1200, sum: true },
            { label: "+ Kundenskonto (4 % vom Zielverkaufspreis)", value: 50 },
            { label: "= Zielverkaufspreis", value: 1250, sum: true },
            { label: "+ Kundenrabatt (20 % vom Listenverkaufspreis)", value: 312.5 },
            { label: "= Listenverkaufspreis (netto)", value: 1562.5, sum: true }
          ],
          hints: [
            "Gemeinkosten: 25 % von 800,00 €. Gewinn: 20 % von den Selbstkosten.",
            "Skonto: 1.200,00 × 100 ÷ 96.",
            "Rabatt: 1.250,00 × 100 ÷ 80."
          ]
        },
        {
          type: "sentence",
          title: "A5 · Preis beurteilen",
          points: 6,
          review: "gemischt-entscheiden",
          guide: [
            {
              kicker: "Erklärung · 1 von 2",
              title: "Der Preis-Spielraum.",
              body: `<p>Untergrenze: Selbstkosten. Obergrenze: Wettbewerbspreis.</p>
                     <p>Liegt der eigene Preis über dem Wettbewerb, muss die Mediaworld e. K. den Mehrwert erklären – oder den Preis anpassen.</p>`
            },
            {
              style: "accent",
              kicker: "Erklärung · 2 von 2",
              title: "So baust du die Beurteilung.",
              body: `<p>1. Zahlen vergleichen. 2. Folge für die Kundschaft nennen. 3. Untergrenze prüfen. 4. Empfehlung geben.</p>
                     <p class="note">Beispiel: „Unser Preis liegt 20 € über dem Wettbewerb. Wenn der Service den Unterschied nicht wert ist, geht die Kundschaft zum Wettbewerber.“</p>`
            }
          ],
          case: `Der Listenverkaufspreis aus A4 beträgt 1.562,50 €. Der Wettbewerber verkauft das Gerät für 1.499,00 €. Die Selbstkosten betragen 1.000,00 €.<br><br>Beurteile den Preis.`,
          text: "Der eigene Preis liegt {*63,50 €|1.562,50 €} über dem Wettbewerb. Die Mediaworld e. K. kann den Preis {*mit Service rechtfertigen|ohne Prüfung senken}. Die Untergrenze sind die {*Selbstkosten|Wettbewerbspreise}.",
          hints: ["1.562,50 − 1.499,00 = 63,50.", "Die Untergrenze sind die Selbstkosten aus A4."],
          explain: "Gute Beurteilung: Differenz nennen → Rechtfertigung durch Service prüfen → Untergrenze Kosten beachten."
        },
        {
          type: "calc",
          title: "A6 · Zuschlag und Faktor",
          points: 6,
          review: "verkaufspreis-trainieren",
          decimals: 2,
          guide: [
            {
              kicker: "Erklärung · 1 von 2",
              title: "Zuschlag und Faktor.",
              body: `<p class="formula">Zuschlag = (LVP − BP) ÷ BP × 100<br>Faktor = LVP ÷ BP</p>
                     <p>Beispiel: BP 250,00 €, LVP 400,00 € → Zuschlag 60 %, Faktor 1,60.</p>`
            },
            {
              style: "accent",
              kicker: "Erklärung · 2 von 2",
              title: "Typische Falle.",
              body: `<p>Faktor 1,60 bedeutet <strong>60 % Zuschlag</strong>. Die 1,00 im Faktor ist der Bezugspreis selbst.</p>
                     <p>160 % Zuschlag wäre Faktor 2,60.</p>`
            }
          ],
          case: `Ein Gerät hat einen Bezugspreis von <b>480,00 €</b> und einen Listenverkaufspreis von <b>768,00 €</b>.<br><br>Berechne Zuschlag und Faktor. Wie hoch ist der Listenverkaufspreis bei einem Bezugspreis von <b>350,00 €</b> und demselben Faktor?`,
          rows: [
            { label: "Kalkulationszuschlag in %", value: 60, dec: 0 },
            { label: "Kalkulationsfaktor", value: 1.6 },
            { label: "LVP bei Bezugspreis 350,00 €", value: 560, sum: true }
          ],
          hints: [
            "Zuschlag: (768 − 480) ÷ 480 × 100.",
            "Faktor: 768 ÷ 480.",
            "Zweites Gerät: 350,00 × Faktor."
          ]
        }
      ]
    }
  ]
});
