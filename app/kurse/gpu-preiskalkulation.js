/* ============================================================
   KURS: GPU · HS1Y – Preiskalkulation
   Lernfeld 4 · Modellunternehmen Mediaworld e. K.
   AB 4 „Der Bezugspreis" + AB 5 „Der Verkaufspreis"
   Aufbau und alle Aufgabentypen: app/README.md
   ============================================================ */

LERNRAUM.subjects.push({
  id: "gpu-preiskalkulation",
  fach: "GPU",
  added: "2026-09-25",          // Datum der Veröffentlichung (für „Neu“ auf der Startseite)
  name: "Preiskalkulation",
  course: "GPU · HS1Y",
  glyph: "P",
  color: "#10b981",
  company: "Mediaworld e. K.",
  description: "Lernfeld 4 · Leistungsprogrammplanung. Vom Listeneinkaufspreis über den Bezugspreis bis zum Listenverkaufspreis – rechnen am Modellunternehmen Mediaworld e. K.",
  topics: [

    /* ══════════════ AB 4 · DER BEZUGSPREIS ══════════════ */
    {
      id: "bezugspreis",
      group: "AB 4 · Der Bezugspreis",
      title: "Der Bezugspreis",
      kicker: "Lernfeld 4 · Stunde 4",
      minutes: 20,
      help: `<h3>Die Bezugskalkulation</h3>
             <p class="formula">Listeneinkaufspreis − Lieferantenrabatt = Zieleinkaufspreis<br>Zieleinkaufspreis − Lieferantenskonto = Bareinkaufspreis<br>Bareinkaufspreis + Bezugskosten = Bezugspreis</p>
             <h3>Erst Rabatt, dann Skonto</h3>
             <p>Der <strong>Rabatt</strong> wird vom Listeneinkaufspreis abgezogen. Das <strong>Skonto</strong> immer vom <strong>Zieleinkaufspreis</strong> – also vom Preis nach dem Rabatt.</p>
             <p class="note">Skonto vom Listeneinkaufspreis rechnen → falscher Bezugspreis.</p>
             <h3>Bezugskosten</h3>
             <p>Alles für die Lieferung: <strong>Fracht</strong>, <strong>Verpackung</strong>, <strong>Transportversicherung</strong>.</p>
             <h3>Bezugspreis = Einstandspreis</h3>
             <p>Was die Ware tatsächlich kostet.</p>`,
      steps: [
        {
          type: "slides",
          title: "Der Fall: 20 Fernseher",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Stunde 4",
              title: "799 € stehen im Angebot. Bezahlt wird weniger.",
              body: `<p>Sofia bestellt <strong>20 Fernseher</strong> der Serie <strong>VISION 55 QLED</strong> beim Großhändler.</p>
                     <p>Im Angebot steht der <strong>Listeneinkaufspreis</strong>: 799,00 €.</p>
                     <p>Am Ende zahlt die Mediaworld weniger – und trotzdem kommt noch etwas dazu.</p>`
            },
            {
              kicker: "Lernziel · Operator AFB I/II",
              title: "Ich kann den <mark>Bezugspreis</mark> Schritt für Schritt <mark>berechnen</mark>.",
              body: `<p class="box"><strong>berechnen</strong> heißt: Du füllst das Rechenschema der Reihe nach aus – von oben nach unten.</p>`
            },
            {
              kicker: "Grundwissen · 1 von 2",
              title: "Zwei Abzüge – zwei Grundlagen.",
              body: `<dl class="terms">
                       <dt>Listeneinkaufspreis</dt><dd>Katalogpreis des Lieferanten ohne Abzug. Hier: 799,00 €.</dd>
                       <dt>Lieferantenrabatt</dt><dd>Nachlass, weil Sofia Stammkundin ist. Wird vom <strong>Listeneinkaufspreis</strong> abgezogen.</dd>
                       <dt>Lieferantenskonto</dt><dd>Nachlass bei schneller Zahlung. Wird vom <strong>Zieleinkaufspreis</strong> abgezogen.</dd>
                     </dl>`
            },
            {
              kicker: "Grundwissen · 2 von 2",
              title: "Drei Stufen bis zum Bezugspreis.",
              body: `<dl class="terms">
                       <dt>Zieleinkaufspreis</dt><dd>Listeneinkaufspreis − Rabatt.</dd>
                       <dt>Bareinkaufspreis</dt><dd>Zieleinkaufspreis − Skonto.</dd>
                       <dt>Bezugskosten</dt><dd>Fracht, Verpackung, Transportversicherung.</dd>
                       <dt>Bezugspreis</dt><dd>Bareinkaufspreis + Bezugskosten. Das ist der Einstandspreis.</dd>
                     </dl>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Erst Rabatt, dann Skonto.",
              body: `<p>Rabatt vom Listeneinkaufspreis, Skonto vom Zieleinkaufspreis.</p>`
            },
            {
              kicker: "Bezugskosten",
              title: "Nur die Lieferung zählt.",
              body: `<div class="pair">
                       <div><b>Bezugskosten</b>Fracht, Verpackung, Transportversicherung – alles für die Lieferung.</div>
                       <div><b>keine Bezugskosten</b>Miete, Personal, Strom, Werbung – das sind <strong>Gemeinkosten</strong>.</div>
                     </div>`
            },
            {
              kicker: "So rechnest du",
              title: "Die Bezugskalkulation",
              body: `<table class="scheme">
                       <tr><td>Listeneinkaufspreis</td><td>____</td></tr>
                       <tr><td>− Lieferantenrabatt</td><td>____</td></tr>
                       <tr class="sum"><td>= Zieleinkaufspreis</td><td>____</td></tr>
                       <tr><td>− Lieferantenskonto</td><td>____</td></tr>
                       <tr class="sum"><td>= Bareinkaufspreis</td><td>____</td></tr>
                       <tr><td>+ Bezugskosten</td><td>____</td></tr>
                       <tr class="sum"><td>= Bezugspreis</td><td>____</td></tr>
                     </table>
                     <p class="note">Übertrage das Schema in dein Heft.</p>`
            }
          ]
        },
        {
          type: "quiz",
          title: "A1–A3 · Verstehen",
          questions: [
            {
              q: "Welche Reihenfolge ist richtig?",
              hint: "Es gibt zwei Abzüge und eine Addition.",
              options: ["Rabatt → Skonto → Bezugskosten", "Skonto → Rabatt → Bezugskosten", "Bezugskosten → Rabatt → Skonto", "Rabatt → Bezugskosten → Skonto"],
              answer: 0,
              explain: "Erst Rabatt vom Listeneinkaufspreis, dann Skonto vom Zieleinkaufspreis, zum Schluss die Bezugskosten addieren."
            },
            {
              q: "Wovon wird das Skonto gerechnet?",
              hint: "Skonto kommt nach dem Rabatt.",
              options: ["vom Listeneinkaufspreis", "vom Zieleinkaufspreis", "vom Bareinkaufspreis", "vom Bezugspreis"],
              answer: 1,
              explain: "Skonto = Zieleinkaufspreis × 2 %. Deshalb heißt es: erst Rabatt, dann Skonto."
            },
            {
              q: "Welche Kosten gehören zu den Bezugskosten?",
              options: ["Strom der Verkaufsfläche", "Fracht und Transportversicherung", "Werbebudget", "die Miete des Ladens"],
              answer: 1,
              explain: "Bezugskosten hängen an der Lieferung. Strom, Miete und Werbung sind Gemeinkosten."
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
          type: "sort",
          title: "A3 · Bezugskosten oder Gemeinkosten?",
          prompt: "Gehört die Kostenart direkt zur Lieferung?",
          hints: ["Bezugskosten hängen an der <b>Lieferung</b>: Fracht, Verpackung, Versicherung.", "Gemeinkosten fallen im Betrieb an: Miete, Personal, Strom, Werbung."],
          categories: ["Bezugskosten", "Gemeinkosten"],
          items: [
            { text: "Fracht vom Werk ins Lager", cat: 0 },
            { text: "Transportversicherung für die Fernseher", cat: 0 },
            { text: "Verpackung der Lieferung", cat: 0 },
            { text: "Strom für die Verkaufsfläche", cat: 1 },
            { text: "Miete für das Geschäft", cat: 1 },
            { text: "Werbung im lokalen Radio", cat: 1 },
            { text: "Gehälter der Verkäufer/innen", cat: 1 }
          ]
        },
        {
          type: "cloze",
          title: "A2 · Fachbegriffe sichern",
          prompt: "Drei Wörter passen nicht.",
          hints: ["Der Rabatt kommt zuerst, danach das Skonto.", "Letzte Lücke: Alles, was für die <b>Lieferung</b> bezahlt wird – Fracht, Verpackung, Transportversicherung – heißt zusammen …"],
          text: "Der {Listeneinkaufspreis} ist der Katalogpreis ohne Abzüge. Der Lieferant gibt einen {Rabatt}, der davon abgezogen wird – so entsteht der {Zieleinkaufspreis}. Bei schneller Zahlung kommt noch das {Skonto} ab; danach heißt der Preis {Bareinkaufspreis}. Fracht und Versicherung sind {Bezugskosten}.",
          distractors: ["Gewinnaufschlag", "Mehrwertsteuer", "Listenverkaufspreis"]
        },
        {
          type: "sentence",
          title: "A5 · Antwortsatz bauen",
          case: "In der Klausur gehört zu jeder Rechnung ein <b>Antwortsatz</b>. Bau ihn aus den Bausteinen.",
          text: "Der Bezugspreis beträgt {*750,00 €|799,00 €|719,10 €}. Er ist {*niedriger|höher} als der Listeneinkaufspreis, weil zuerst der {*Rabatt|Skonto} und dann das {*Skonto|Rabatt} abgezogen wurden – danach kamen die {*Bezugskosten|Gemeinkosten} dazu.",
          hints: ["Von 799,00 € auf 750,00 €: Rabatt und Skonto ziehen ab, die Bezugskosten kommen dazu.", "Skonto wird immer vom Zieleinkaufspreis gerechnet."],
          explain: "Guter Antwortsatz: Ergebnis → Vergleich mit dem Ausgangswert → Begründung mit den Fachbegriffen."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann den Bezugspreis in drei Stufen berechnen.",
            "Ich kann erklären, warum Skonto vom Zieleinkaufspreis gerechnet wird.",
            "Ich kann Bezugskosten von Gemeinkosten unterscheiden."
          ]
        }
      ]
    },

    /* ══════════════ AB 5 · DER VERKAUFSPREIS ══════════════ */
    {
      id: "verkaufspreis",
      group: "AB 5 · Der Verkaufspreis",
      title: "Der Verkaufspreis",
      kicker: "Lernfeld 4 · Stunde 5",
      minutes: 25,
      help: `<h3>Die Handelskalkulation</h3>
             <p class="formula">Bezugspreis + Gemeinkosten = Selbstkosten<br>Selbstkosten + Gewinnaufschlag = Barverkaufspreis<br>Barverkaufspreis + Kundenskonto = Zielverkaufspreis<br>Zielverkaufspreis + Kundenrabatt = Listenverkaufspreis</p>
             <h3>Nachlässe hochrechnen</h3>
             <p>Skonto und Rabatt werden nicht abgezogen, sondern hochgerechnet.</p>
             <p class="formula">Skonto 4 % → Zielverkaufspreis = Barverkaufspreis × 100 ÷ 96<br>Rabatt 10 % → Listenverkaufspreis = Zielverkaufspreis × 100 ÷ 90</p>
             <h3>Drei Wege zum Preis</h3>
             <ul><li><strong>kostenorientiert:</strong> aus der eigenen Kalkulation.</li>
             <li><strong>nachfrageorientiert:</strong> was Kunden zahlen wollen.</li>
             <li><strong>konkurrenzorientiert:</strong> Preise der Mitbewerber.</li></ul>
             <h3>Häufige Fehler</h3>
             <ul><li>Gewinnaufschlag vom Bezugspreis statt von den Selbstkosten rechnen.</li>
             <li>Rabatt als Prozent von der Zeile darüber abziehen, statt hochzurechnen.</li></ul>`,
      steps: [
        {
          type: "slides",
          title: "Der Fall: VISION 55 QLED",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Stunde 5",
              title: "Der Fernseher kostet 750 €. Und im Laden?",
              body: `<p>Der <strong>VISION 55 QLED</strong> kostet die Mediaworld <strong>750,00 €</strong> – den <strong>Bezugspreis</strong> aus dem letzten Thema.</p>
                     <p>Im Regal soll er mehr kosten. Miete, Personal, Strom und Werbung müssen bezahlt werden.</p>`
            },
            {
              kicker: "Lernziel · Operator AFB II",
              title: "Ich kann den <mark>Listenverkaufspreis</mark> Schritt für Schritt <mark>berechnen</mark>.",
              body: `<p class="box"><strong>berechnen</strong> heißt: das Rechenschema der Reihe nach ausfüllen und jeden Schritt aufschreiben.</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Fünf Begriffe – vom Einkauf ins Regal.",
              body: `<dl class="terms">
                       <dt>Bezugspreis</dt><dd>Was die Mediaworld zahlt. Hier: 750,00 €.</dd>
                       <dt>Gemeinkosten</dt><dd>Miete, Personal, Strom, Werbung. 20 % vom Bezugspreis.</dd>
                       <dt>Selbstkosten</dt><dd>Bezugspreis + Gemeinkosten. Hier: 900,00 €.</dd>
                       <dt>Barverkaufspreis</dt><dd>Selbstkosten + Gewinnaufschlag. Hier: 1.080,00 €.</dd>
                       <dt>Listenverkaufspreis</dt><dd>Der Angebotspreis (netto) vor der Mehrwertsteuer.</dd>
                     </dl>`
            },
            {
              kicker: "So rechnest du",
              title: "Die Handelskalkulation",
              body: `<table class="scheme">
                       <tr><td>Bezugspreis</td><td>750,00 €</td></tr>
                       <tr><td>+ Gemeinkosten 20 %</td><td>____</td></tr>
                       <tr class="sum"><td>= Selbstkosten</td><td>____</td></tr>
                       <tr><td>+ Gewinnaufschlag 20 %</td><td>____</td></tr>
                       <tr class="sum"><td>= Barverkaufspreis</td><td>____</td></tr>
                       <tr><td>+ Kundenskonto</td><td>____</td></tr>
                       <tr class="sum"><td>= Zielverkaufspreis</td><td>____</td></tr>
                       <tr><td>+ Kundenrabatt</td><td>____</td></tr>
                       <tr class="sum"><td>= Listenverkaufspreis</td><td>____</td></tr>
                     </table>`
            },
            {
              kicker: "Die zwei Nachlass-Stufen",
              title: "Nachlässe rechnest du hoch.",
              body: `<p class="formula">Skonto 4 % → Zielverkaufspreis = Barverkaufspreis × 100 ÷ 96</p>
                     <p class="formula">Rabatt 10 % → Listenverkaufspreis = Zielverkaufspreis × 100 ÷ 90</p>
                     <p class="note">Nicht als Prozent von der Zeile darüber abziehen!</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Erst rechnen, dann nachlassen.",
              body: `<p>Bezugspreis → Selbstkosten → Barverkaufspreis → Zielverkaufspreis → Listenverkaufspreis.</p>`
            }
          ]
        },
        {
          type: "calc",
          title: "A2 · Handelskalkulation VISION 55 QLED",
          case: `<b>Alle Beträge in Euro.</b><br>
                 <b>Bezugspreis:</b> 750,00 €<br>
                 <b>Gemeinkosten:</b> 20 % · <b>Gewinnaufschlag:</b> 20 %<br>
                 <b>Kundenskonto:</b> 4 % · <b>Kundenrabatt:</b> 10 %`,
          rows: [
            { label: "Bezugspreis (€)", value: 750 },
            { label: "+ Gemeinkosten 20 % (€)", value: 150 },
            { label: "= Selbstkosten (€)", value: 900, sum: true },
            { label: "+ Gewinnaufschlag 20 % (€)", value: 180 },
            { label: "= Barverkaufspreis (€)", value: 1080, sum: true },
            { label: "+ Kundenskonto (€)", value: 45 },
            { label: "= Zielverkaufspreis (€)", value: 1125, sum: true },
            { label: "+ Kundenrabatt (€)", value: 125 },
            { label: "= Listenverkaufspreis netto (€)", value: 1250, sum: true, sep: true }
          ],
          hints: [
            "Gemeinkosten: 20 % von 750. Danach der Gewinnaufschlag: 20 % von den <b>Selbstkosten</b>.",
            "Skonto und Rabatt werden hochgerechnet: Skonto-Zeile = Barverkaufspreis × 100 ÷ 96 − Barverkaufspreis.",
            "Rabatt-Zeile = Zielverkaufspreis × 100 ÷ 90 − Zielverkaufspreis.",
            "Lösungsweg: 750 + 150 = 900 → + 180 = 1.080 → × 100 ÷ 96 = 1.125 (Skonto 45) → × 100 ÷ 90 = 1.250 (Rabatt 125)."
          ],
          result: "Der Listenverkaufspreis (netto) beträgt 1.250,00 €. Mit 19 % Mehrwertsteuer wären es 1.487,50 € brutto."
        },
        {
          type: "quiz",
          title: "A3 · Verstehen und deuten",
          questions: [
            {
              q: "Der Gewinnaufschlag von 20 % wird berechnet von …",
              hint: "Schau eine Zeile darüber.",
              options: ["vom Bezugspreis", "von den Selbstkosten", "vom Barverkaufspreis", "vom Listenverkaufspreis"],
              answer: 1,
              explain: "Selbstkosten 900 € × 20 % = 180 €."
            },
            {
              q: "Der Barverkaufspreis ist 1.080 €. Wie hoch ist der Zielverkaufspreis bei 4 % Skonto?",
              hint: "Skonto wird hochgerechnet: × 100 ÷ 96.",
              options: ["1.080 €", "1.125 €", "1.152 €"],
              answer: 1,
              explain: "1.080 × 100 ÷ 96 = 1.125 €. Der Skonto beträgt 45 €."
            },
            {
              q: "Der Markt nebenan verkauft den Fernseher für 1.199 €. Sofia hat 1.250 € errechnet. Was kann sie tun?",
              hint: "Sie muss sich entscheiden: Preis senken oder etwas Besonderes bieten.",
              options: [
                "Nichts – sie verkauft weiter für 1.250 €.",
                "Den Preis senken oder den Zusatznutzen betonen (Beratung, Werkstatt, Lieferung).",
                "Die Mehrwertsteuer weglassen."
              ],
              answer: 1,
              explain: "Bei 1.199 € sinkt die Marge, aber sie bleibt über den Selbstkosten. Alternativ differenzieren und den Preis halten."
            },
            {
              q: "Mit 19 % Mehrwertsteuer kostet der Fernseher brutto …",
              hint: "1.250 × 1,19",
              options: ["1.250,00 €", "1.487,50 €", "1.500,00 €"],
              answer: 1,
              explain: "1.250,00 × 1,19 = 1.487,50 €. Das ist der Preis im Regal."
            }
          ]
        },
        {
          type: "sort",
          title: "Drei Wege zum Preis",
          prompt: "Zu welchem Weg der Preisgestaltung gehört die Aussage?",
          hints: ["Kostenorientiert = eigene Kalkulation. Nachfrageorientiert = was Kunden zahlen wollen. Konkurrenzorientiert = was andere verlangen."],
          categories: ["kostenorientiert", "nachfrageorientiert", "konkurrenzorientiert"],
          items: [
            { text: "Sofia rechnet Selbstkosten plus Gewinn.", cat: 0 },
            { text: "Ein Kunde zahlt für gute Qualität gern mehr.", cat: 1 },
            { text: "Der Markt nebenan verlangt 1.199 €.", cat: 2 },
            { text: "Sofia schaut in ihren Kalkulationsbogen.", cat: 0 },
            { text: "Eine Umfrage: Was zahlen Kunden für 55 Zoll?", cat: 1 },
            { text: "Sofia vergleicht die Preise im Online-Shop.", cat: 2 }
          ]
        },
        {
          type: "cloze",
          title: "Fachbegriffe sichern",
          prompt: "Drei Wörter passen nicht.",
          hints: ["Erst die Gemeinkosten, dann der Gewinn.", "Am Ende stehen Skonto und Rabatt – beide werden hochgerechnet."],
          text: "Der {Bezugspreis} ist der Einstandspreis. Die {Gemeinkosten} kommen dazu – zusammen sind das die {Selbstkosten}. Mit dem {Gewinnaufschlag} entsteht der Barverkaufspreis. Skonto und Rabatt werden {hochgerechnet}, so entstehen Zielverkaufspreis und {Listenverkaufspreis}.",
          distractors: ["abgezogen", "Mehrwertsteuer", "Lagerkennziffer"]
        },
        {
          type: "sentence",
          title: "Antwortsatz bauen",
          case: "In der Klausur gehört zu jeder Rechnung ein <b>Antwortsatz</b>. Bau ihn aus den Bausteinen.",
          text: "Der Listenverkaufspreis (netto) beträgt {*1.250,00 €|1.080,00 €|1.487,50 €}. Er besteht aus den Selbstkosten von {*900,00 €|750,00 €|1.125,00 €} plus Gewinnaufschlag und den beiden {*Nachlässen|Gemeinkosten}.",
          hints: ["Das Endergebnis steht in der letzten Zeile des Rechenschemas.", "Selbstkosten = Bezugspreis + Gemeinkosten = 750 + 150."],
          explain: "Guter Antwortsatz: Ergebnis mit Einheit → Bezug auf die Rechnung → Fachbegriff richtig."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann den Listenverkaufspreis mit dem Rechenschema berechnen.",
            "Ich kann Skonto und Rabatt hochrechnen.",
            "Ich kann die drei Wege der Preisgestaltung unterscheiden."
          ]
        }
      ]
    },

    /* ══════════════ LERNKARTEN ══════════════ */
    {
      id: "lernkarten",
      group: "Wiederholen",
      title: "Alle Lernkarten",
      kicker: "Übungsblatt · Lernkarten",
      minutes: 8,
      steps: [
        {
          type: "cards",
          title: "Lernkarten Bezugspreis & Verkaufspreis",
          cards: [
            { front: "Listeneinkaufspreis", back: "Katalogpreis des Lieferanten ohne Abzug. Hier: 799,00 €." },
            { front: "Lieferantenrabatt", back: "Nachlass des Lieferanten. Wird vom Listeneinkaufspreis abgezogen (79,90 €)." },
            { front: "Zieleinkaufspreis", back: "Listeneinkaufspreis − Rabatt. 799,00 € − 79,90 € = 719,10 €." },
            { front: "Lieferantenskonto", back: "Nachlass bei schneller Zahlung. Vom Zieleinkaufspreis: 719,10 € × 2 % = 14,38 €." },
            { front: "Bareinkaufspreis", back: "Zieleinkaufspreis − Skonto. 719,10 € − 14,38 € = 704,72 €." },
            { front: "Bezugskosten", back: "Alles für die Lieferung: Fracht, Verpackung, Transportversicherung (45,28 €)." },
            { front: "Bezugspreis", back: "Bareinkaufspreis + Bezugskosten = Einstandspreis. 704,72 € + 45,28 € = 750,00 €." },
            { front: "Regel: erst Rabatt, dann Skonto", back: "Rabatt vom Listeneinkaufspreis, Skonto vom Zieleinkaufspreis." },
            { front: "Gemeinkosten", back: "Miete, Personal, Strom, Werbung. Hier: 20 % von 750,00 € = 150,00 €." },
            { front: "Selbstkosten", back: "Bezugspreis + Gemeinkosten. 750,00 € + 150,00 € = 900,00 €." },
            { front: "Gewinnaufschlag", back: "Aufschlag auf die Selbstkosten: 20 % von 900,00 € = 180,00 €." },
            { front: "Barverkaufspreis", back: "Selbstkosten + Gewinnaufschlag. 900,00 € + 180,00 € = 1.080,00 €." },
            { front: "Kundenskonto", back: "Nachlass bei schneller Zahlung. Zielverkaufspreis = Barverkaufspreis × 100 ÷ 96." },
            { front: "Kundenrabatt", back: "Nachlass auf den Zielverkaufspreis. Listenverkaufspreis = Zielverkaufspreis × 100 ÷ 90." },
            { front: "Listenverkaufspreis", back: "Angebotspreis (netto) vor der Mehrwertsteuer. Hier: 1.250,00 €." },
            { front: "Bruttopreis", back: "Listenverkaufspreis + 19 % Mehrwertsteuer: 1.250,00 € × 1,19 = 1.487,50 €." },
            { front: "Drei Wege zum Preis", back: "kostenorientiert · nachfrageorientiert · konkurrenzorientiert." }
          ]
        }
      ]
    }
  ]
});
