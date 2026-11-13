/* ============================================================
   KURS: GPU · HS1Y – Preisbildung
   Lernfeld 4 · Modellunternehmen Mediaworld e. K.
   AB 17–20 (baut auf „Preiskalkulation“ auf)
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
  description: "Lernfeld 4 · Nach der Preiskalkulation: Was bestimmt den Preis außerdem? Einflussgrößen, Zuschlag und Faktor, Nachfrage und Konkurrenz, Preisauszeichnung.",
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
    }

  ]
});
