/* ============================================================
   KURS: VW — HHOF/KAOA — Klausur-Trainer
   Magisches Sechseck (LS 3.10) + Sozialpolitik (LS 14 S01–S03)
   Klausurformat: 25 Punkte · 45 Minuten · HH/KA-Schlüssel
   Quellen: Arbeitsblätter und Wiederholungsblatt aus dem HBBK-Workspace
   ============================================================ */

const VWK_ZIELE = ["Vollbeschäftigung", "Preisstabilität", "Außenwirtschaftliches Gleichgewicht",
  "Wirtschaftswachstum", "Umwelt- und Klimaschutz", "Gerechte Verteilung"];

LERNRAUM.subjects.push({
  id: "vw-klausurtrainer",
  fach: "VW",
  added: "2026-11-15",
  updated: "2026-11-22",
  name: "Klausur-Trainer",
  course: "VW — HHOF/KAOA",
  glyph: "V",
  description: "Klausurtraining für die HHOF und KAOA: Magisches Sechseck, Kennzahlen, Abzüge, Gerechtigkeitsleitbilder und eine Stellungnahme. Mit Training, Lernkarten und einer geführten Probeklausur (25 Punkte, 45 Minuten).",
  folders: [
    {
      id: "klausur",
      group: "Klausurvorbereitung",
      kicker: "Ordner · Klausur",
      title: "Klausur-Trainer",
      description: "Erst lesen, dann üben, dann die Probeklausur schreiben. Alles an einem Ort."
    }
  ],
  topics: [

    /* ---------------------------------------------------------- */
    /* 1 · SO LÄUFT DIE KLAUSUR                                   */
    /* ---------------------------------------------------------- */
    {
      id: "klausur-start",
      folder: "klausur",
      group: "Orientierung",
      title: "So läuft die Klausur",
      kicker: "Klausur · Format und Regeln",
      minutes: 8,
      help: `<h3>Klausurformat</h3>
             <p><strong>25 Punkte · 45 Minuten · Taschenrechner erlaubt.</strong> Vier Aufgaben, die aufeinander aufbauen.</p>
             <h3>Notenschlüssel HH/KA</h3>
             <p class="formula">87 % → 1 · 74 % → 2 · 61 % → 3 · 48 % → 4 · 24 % → 5</p>
             <p>Bei 25 Punkten: 22 P = 1, 19 P = 2, 16 P = 3, 12 P = 4, 6 P = 5.</p>`,
      steps: [
        {
          type: "slides",
          title: "Die Klausur in 45 Minuten",
          slides: [
            {
              style: "dark",
              kicker: "VW · HHOF/KAOA",
              title: "25 Punkte. 45 Minuten. Vier Aufgaben.",
              body: `<p>Die Klausur prüft <strong>Magisches Sechseck</strong> und <strong>Sozialpolitik</strong>.</p>
                     <ul><li><strong>A1 Grundwissen:</strong> Ziele und Kennzahlen (6 P, 8 Min).</li>
                     <li><strong>A2 Anwendung:</strong> Lenas Abrechnung (7 P, 12 Min).</li>
                     <li><strong>A3 Transfer:</strong> Fall Logistikzentrum (8 P, 15 Min).</li>
                     <li><strong>A4 Problemlösung:</strong> Stellungnahme (4 P, 10 Min).</li></ul>
                     <p class="note">Taschenrechner ist erlaubt. Schreibe den Rechenweg auf — nicht nur das Ergebnis.</p>`
            },
            {
              kicker: "Operatoren",
              title: "Was die Aufgabe von dir will",
              body: `<dl class="terms">
                       <dt>Nennen</dt><dd>Stichworte, keine Begründung.</dd>
                       <dt>Erklären</dt><dd>Ursache und Zusammenhang in ganzen Sätzen.</dd>
                       <dt>Berechnen</dt><dd>Rechenweg und Ergebnis mit Einheit.</dd>
                       <dt>Beurteilen</dt><dd>Position, Argumente, Gegenargument, Fazit.</dd>
                     </dl>
                     <p class="note">Die Operatorwörter stehen fett in der Aufgabe. Richte deine Antwort danach.</p>`
            },
            {
              style: "accent",
              kicker: "Notenschlüssel HH/KA",
              title: "22 von 25 Punkten sind eine 1.",
              body: `<p><strong>87 % → 1 · 74 % → 2 · 61 % → 3 · 48 % → 4 · 24 % → 5.</strong></p>
                     <p>Bei 25 Punkten: 22 P = 1 · 19 P = 2 · 16 P = 3 · 12 P = 4 · 6 P = 5.</p>
                     <p class="note">Punkte sammeln heißt: jede Teilaufgabe bearbeiten. Auch ein halber Ansatz zählt.</p>`
            }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------- */
    /* 2 · TRAINING A1                                            */
    /* ---------------------------------------------------------- */
    {
      id: "training-a1",
      folder: "klausur",
      group: "Training",
      title: "A1 · Ziele und Kennzahlen",
      kicker: "Training · Grundwissen",
      minutes: 15,
      help: `<h3>Die sechs Ziele</h3>
             <ul><li>Vollbeschäftigung</li><li>Preisstabilität</li><li>Außenwirtschaftliches Gleichgewicht</li>
             <li>Wirtschaftswachstum</li><li>Umwelt- und Klimaschutz</li><li>Gerechte Verteilung</li></ul>
             <h3>Kennzahlen</h3>
             <p>Arbeitslosenquote · Inflationsrate · Veränderung des BIP · Außenhandelssaldo · Gini-Wert · CO₂-Ausstoß</p>
             <h3>Merke</h3>
             <p>„Magisch“ heißt: Alle sechs Ziele gleichzeitig optimal zu erreichen ist nicht möglich. Die Politik muss abwägen.</p>`,
      steps: [
        {
          type: "slides",
          title: "Sechs Ziele, ein Bündel",
          slides: [
            {
              kicker: "Grundwissen",
              title: "Das magische Sechseck",
              body: `${sechseck(VWK_ZIELE.map(function(z){ return { text: z }; }), { title: "Die sechs Ziele", center: "Wirtschafts-\npolitik" })}
                     <p class="note">Die ersten vier Ziele stehen im Stabilitätsgesetz von 1967. Umwelt und gerechte Verteilung sind später dazugekommen.</p>`
            },
            {
              kicker: "Ziele messen",
              title: "Jedes Ziel hat eine Kennzahl",
              body: `<ul>
                       <li><strong>Vollbeschäftigung</strong> → Arbeitslosenquote</li>
                       <li><strong>Preisstabilität</strong> → Inflationsrate (Ziel ≈ 2 %)</li>
                       <li><strong>Außenwirtschaft</strong> → Außenhandelssaldo (≈ 0)</li>
                       <li><strong>Wachstum</strong> → Veränderung des BIP</li>
                       <li><strong>Gerechte Verteilung</strong> → Gini-Wert</li>
                       <li><strong>Umwelt</strong> → CO₂-Ausstoß</li>
                     </ul>`
            },
            {
              style: "accent",
              kicker: "Merksatz",
              title: "Ohne Kennzahl keine Prüfung.",
              body: `<p>Ein Ziel ohne Messgröße bleibt eine Behauptung. Die Kennzahl macht sichtbar, ob das Ziel erreicht wurde.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "A1 · Welche Kennzahl gehört zu welchem Ziel?",
          prompt: "Ordne jede Kennzahl dem passenden Ziel zu.",
          categories: VWK_ZIELE,
          items: [
            { text: "Arbeitslosenquote", cat: 0 },
            { text: "Inflationsrate", cat: 1 },
            { text: "Außenhandelssaldo", cat: 2 },
            { text: "Veränderung des BIP", cat: 3 },
            { text: "CO₂-Ausstoß", cat: 4 },
            { text: "Gini-Wert der Einkommen", cat: 5 }
          ]
        },
        {
          type: "quiz",
          title: "A1 · Kurz-Check",
          questions: [
            { q: "Welche Kennzahl misst die Preisstabilität?", options: ["Inflationsrate", "Arbeitslosenquote", "Gini-Wert", "CO₂-Ausstoß"], answer: 0, explain: "Die Inflationsrate zeigt, wie stark die Preise steigen. Ziel der EZB: etwa 2 %." },
            { q: "Welche Kennzahl misst die Vollbeschäftigung?", options: ["Arbeitslosenquote", "Außenhandelssaldo", "Veränderung des BIP", "Inflationsrate"], answer: 0, explain: "Je niedriger die Arbeitslosenquote, desto besser das Ziel Vollbeschäftigung." },
            { q: "Welche Kennzahl misst das Wirtschaftswachstum?", options: ["Veränderung des BIP", "Gini-Wert", "Inflationsrate", "CO₂-Ausstoß"], answer: 0, explain: "Das BIP misst die produzierte Gütermenge. Die Veränderung in Prozent zeigt das Wachstum." },
            { q: "Welche Kennzahl misst das außenwirtschaftliche Gleichgewicht?", options: ["Außenhandelssaldo", "Arbeitslosenquote", "Gini-Wert", "Veränderung des BIP"], answer: 0, explain: "Der Außenhandelssaldo ist die Differenz zwischen Exporten und Importen. Ziel: etwa 0." },
            { q: "Welche Kennzahl misst die gerechte Verteilung?", options: ["Gini-Wert der Einkommen", "Inflationsrate", "CO₂-Ausstoß", "Außenhandelssaldo"], answer: 0, explain: "Der Gini-Wert zeigt, wie ungleich Einkommen verteilt sind. Je niedriger, desto gleicher." },
            { q: "Welche Kennzahl misst den Umwelt- und Klimaschutz?", options: ["CO₂-Ausstoß", "Arbeitslosenquote", "Veränderung des BIP", "Gini-Wert"], answer: 0, explain: "Ein sinkender CO₂-Ausstoß zeigt, dass das Ziel Umwelt- und Klimaschutz besser erreicht wird." }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------- */
    /* 3 · TRAINING A2                                            */
    /* ---------------------------------------------------------- */
    {
      id: "training-a2",
      folder: "klausur",
      group: "Training",
      title: "A2 · Lenas Abrechnung",
      kicker: "Training · Rechnen",
      minutes: 18,
      help: `<h3>Beitrag oder Steuer?</h3>
             <p><strong>Beitrag:</strong> Sozialversicherung, begründet einen Anspruch (Rente, Krankengeld).</p>
             <p><strong>Steuer:</strong> finanziert Gemeinschaftsaufgaben, kein direkter Anspruch.</p>
             <h3>Formeln</h3>
             <p class="formula">Abgabenquote = alle Abzüge ÷ Brutto × 100<br>SV-Anteil = SV-Beiträge ÷ alle Abzüge × 100</p>
             <h3>Lenas Werte</h3>
             <p>Brutto 3.000,00 € · Lohnsteuer 315,00 € · KV 262,50 € · PV 72,00 € · RV 279,00 € · AV 39,00 €</p>`,
      steps: [
        {
          type: "slides",
          title: "Wo bleibt das Geld?",
          slides: [
            {
              style: "dark",
              kicker: "Familie Thüne",
              title: "3.000 € brutto, 2.032,50 € netto.",
              body: `${ablauf([
                { text: "Bruttoarbeitsentgelt", value: "3.000,00 €" },
                { op: "− Lohnsteuer", value: "315,00 €" },
                { op: "− Krankenversicherung", value: "262,50 €" },
                { op: "− Pflegeversicherung", value: "72,00 €" },
                { op: "− Rentenversicherung", value: "279,00 €" },
                { op: "− Arbeitslosenversicherung", value: "39,00 €" },
                { text: "Nettoarbeitsentgelt", value: "2.032,50 €", hi: true }
              ])}
              <p class="note">Die Lohnsteuer ist die einzige Steuer in dieser Abrechnung. Alles andere sind Sozialversicherungsbeiträge.</p>`
            },
            {
              kicker: "Rechnen",
              title: "Zwei Quoten, zwei Blickwinkel",
              body: `<p><strong>Abgabenquote:</strong> Wie viel von allen Abzügen am Brutto bleibt? 967,50 € von 3.000,00 € sind 32,25 %.</p>
                     <p><strong>SV-Anteil:</strong> Wie viel der Abzüge sind Beiträge? 652,50 € von 967,50 € sind 67,4 %.</p>
                     <p class="note">Runde auf zwei Nachkommastellen. Schreibe den Rechenweg auf.</p>`
            }
          ]
        },
        {
          type: "calc",
          title: "A2 · Lenas Abrechnung",
          decimals: 2,
          case: `Lena Thüne verdient <b>3.000,00 € brutto</b>. Abzüge: Lohnsteuer <b>315,00 €</b>, Krankenversicherung <b>262,50 €</b>, Pflegeversicherung <b>72,00 €</b>, Rentenversicherung <b>279,00 €</b>, Arbeitslosenversicherung <b>39,00 €</b>. Runde auf zwei Nachkommastellen.`,
          rows: [
            { label: "Summe der Sozialversicherungsbeiträge in €", value: 652.5 },
            { label: "Abgabenquote in % (alle Abzüge : Brutto × 100)", value: 32.25 },
            { label: "Anteil der Sozialversicherung an allen Abzügen in %", value: 67.4 }
          ],
          hint: "SV-Beiträge: KV + PV + RV + AV. Alle Abzüge: SV-Beiträge + Lohnsteuer.",
          result: "652,50 € · 32,25 % · 67,4 % — etwa zwei Drittel der Abzüge sind Beiträge mit Anspruch."
        },
        {
          type: "cloze",
          title: "A2 · Steuer oder Beitrag?",
          text: "Die Lohnsteuer ist eine {Steuer} und begründet keinen direkten {Anspruch}. Die Beiträge zur {Sozialversicherung} begründen dagegen einen Anspruch, z. B. auf {Rente} oder Krankengeld. Was nach allen Abzügen bleibt, ist das {Nettoentgelt}.",
          distractors: ["Beitragssatz", "Grundsicherung", "Bruttoentgelt"],
          hint: "Drei Begriffe der Wörterbox passen nicht."
        },
        {
          type: "quiz",
          title: "A2 · Kurz-Check",
          questions: [
            { q: "Die Lohnsteuer ist …", options: ["eine Steuer", "ein Sozialversicherungsbeitrag", "eine Transferleistung", "ein Beitragssatz"], answer: 0, explain: "Die Lohnsteuer finanziert Gemeinschaftsaufgaben und begründet keinen direkten Anspruch." },
            { q: "Welche Abzüge begründen einen Anspruch auf Leistungen?", options: ["KV, PV, RV und AV", "nur die Lohnsteuer", "nur die Krankenversicherung", "Wohngeld und Kindergeld"], answer: 0, explain: "Die vier Sozialversicherungsbeiträge begründen Ansprüche, zum Beispiel auf Rente oder Krankengeld." }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------- */
    /* 4 · TRAINING A3                                            */
    /* ---------------------------------------------------------- */
    {
      id: "training-a3",
      folder: "klausur",
      group: "Training",
      title: "A3 · Fall Logistikzentrum",
      kicker: "Training · Transfer",
      minutes: 20,
      help: `<h3>Harmonie und Konflikt</h3>
             <p><strong>Harmonie:</strong> Eine Maßnahme verbessert zwei Ziele gleichzeitig.</p>
             <p><strong>Konflikt:</strong> Ein Ziel wird besser, ein anderes schlechter.</p>
             <h3>Leitbilder</h3>
             <p><strong>Leistung:</strong> Wer mehr einzahlt, bekommt mehr.</p>
             <p><strong>Bedürfnis:</strong> Wer mehr braucht, bekommt mehr.</p>
             <p><strong>Gleichheit:</strong> Alle bekommen den gleichen Anteil.</p>
             <h3>Magisch</h3>
             <p>Alle sechs Ziele gleichzeitig optimal zu erreichen ist nicht möglich. Die Politik muss abwägen.</p>`,
      steps: [
        {
          type: "slides",
          title: "Ein Fall, viele Ziele",
          slides: [
            {
              style: "dark",
              kicker: "Fallakte Oberhausen",
              title: "400 Jobs, 12 Hektar, mehr Lkw.",
              body: `<p>Ein Investor will ein <strong>Logistikzentrum</strong> bauen: <strong>400 neue Arbeitsplätze</strong>, aber <strong>12 Hektar Fläche</strong> und deutlich mehr Lkw-Verkehr.</p>
                     <p>Die Bürgermeisterin sagt: „Wir können nicht alles gleichzeitig haben. Wir müssen abwägen.“</p>`
            },
            {
              kicker: "Ziele prüfen",
              title: "Besser, schlechter oder neutral?",
              body: `<table class="table">
                       <tr><th>Ziel</th><th>Richtung</th></tr>
                       <tr><td>Vollbeschäftigung</td><td>besser (400 Jobs)</td></tr>
                       <tr><td>Umwelt- und Klimaschutz</td><td>schlechter (Fläche, Lkw, CO₂)</td></tr>
                       <tr><td>Gerechte Verteilung</td><td>eher besser oder neutral</td></tr>
                     </table>
                     <p class="note">Nenne immer die Richtung: „besser“ oder „schlechter“ — nicht nur das Ziel.</p>`
            },
            {
              kicker: "Leitbilder",
              title: "Drei Antworten auf „Was ist gerecht?“",
              body: `<dl class="terms">
                       <dt>Leistungsprinzip</dt><dd>Rente nach Beitragsjahren: wer mehr einzahlt, bekommt mehr.</dd>
                       <dt>Bedürfnisprinzip</dt><dd>Wohngeld und Grundsicherung: wer mehr braucht, bekommt mehr.</dd>
                       <dt>Gleichheitsprinzip</dt><dd>Kindergeld in gleicher Höhe: alle bekommen den gleichen Betrag.</dd>
                     </dl>`
            }
          ]
        },
        {
          type: "sort",
          title: "A3 · Harmonie oder Konflikt?",
          prompt: "Ordne jede Maßnahme zu.",
          categories: ["Harmonie", "Konflikt"],
          items: [
            { text: "Solarpark: neue Jobs und weniger CO₂", cat: 0 },
            { text: "Steuersenkung: mehr Jobs, aber steigende Preise", cat: 1 },
            { text: "Höheres Kindergeld: Familien haben mehr Geld, die Wirtschaft wächst", cat: 0 },
            { text: "Mehr Konsum: mehr Importe, der Außenhandel gerät aus dem Gleichgewicht", cat: 1 }
          ]
        },
        {
          type: "quiz",
          title: "A3 · Welches Leitbild?",
          questions: [
            { q: "Frau Thüne erhält nach 40 Beitragsjahren eine höhere Rente als Herr Yilmaz nach 20 Jahren.", options: ["Leistungsprinzip", "Bedürfnisprinzip", "Gleichheitsprinzip", "kein Leitbild"], answer: 0, explain: "Die Höhe richtet sich nach den Beitragsjahren — also nach der Leistung." },
            { q: "Familie Kaya erhält Wohngeld, weil ihr Einkommen niedrig und die Miete hoch ist.", options: ["Bedürfnisprinzip", "Leistungsprinzip", "Gleichheitsprinzip", "kein Leitbild"], answer: 0, explain: "Das Wohngeld richtet sich nach dem Bedarf, nicht nach Einzahlungen." },
            { q: "Alle Familien erhalten für jedes Kind dasselbe Kindergeld.", options: ["Gleichheitsprinzip", "Leistungsprinzip", "Bedürfnisprinzip", "kein Leitbild"], answer: 0, explain: "Alle bekommen den gleichen Betrag — unabhängig von Einkommen oder Beitrag." }
          ]
        },
        {
          type: "sentence",
          title: "A3 · Magisch und Kompromiss",
          case: "Baue die beiden Sätze.",
          text: "Das Sechseck heißt magisch, weil {*nie alle sechs Ziele gleichzeitig optimal erreicht werden können|alle Ziele immer gleichzeitig erreicht werden}. Ein Kompromiss für das Logistikzentrum ist {*ein Bahnanschluss statt nur Lkw|mehr Lkw-Verkehr}.",
          explain: "„Magisch“ meint die Knappheit der Ziele: Wird eines besser, kann ein anderes schlechter werden. Ein Kompromiss entschärft den Konflikt, zum Beispiel mit Bahnanschluss, Solaranlagen oder Ausgleichsflächen."
        }
      ]
    },

    /* ---------------------------------------------------------- */
    /* 5 · TRAINING A4                                            */
    /* ---------------------------------------------------------- */
    {
      id: "training-a4",
      folder: "klausur",
      group: "Training",
      title: "A4 · Stellungnahme",
      kicker: "Training · Problemlösung",
      minutes: 15,
      help: `<h3>Aufbau</h3>
             <p><strong>These</strong> → <strong>Argument 1 mit Beispiel</strong> → <strong>Argument 2 mit Beispiel</strong> → <strong>Gegenargument</strong> → <strong>Fazit mit Ziel und Leitbild</strong>.</p>
             <h3>Text A · solidarisch</h3>
             <p>Der Sozialstaat ist eine Versicherung. Wer Beiträge zahlt, bekommt Rente und Krankengeld. Starke Schultern tragen mehr.</p>
             <h3>Text B · Eigenverantwortung</h3>
             <p>Hohe Abzüge belasten mittlere Einkommen. Wer mehr leistet, soll mehr behalten. Der Staat soll sich auf die wirklich Bedürftigen konzentrieren.</p>`,
      steps: [
        {
          type: "slides",
          title: "Wie eine Stellungnahme gebaut wird",
          slides: [
            {
              kicker: "Aufbau",
              title: "These. Argumente. Gegenargument. Fazit.",
              body: `<ol>
                       <li><strong>These:</strong> Ich stimme Text A/B eher zu, weil …</li>
                       <li><strong>Argument 1 + Beispiel:</strong> Beiträge, Rente, Abgabenquote …</li>
                       <li><strong>Argument 2 + Beispiel:</strong> ein zweiter Grund.</li>
                       <li><strong>Gegenargument:</strong> „Allerdings …“</li>
                       <li><strong>Fazit:</strong> Ziel aus dem Sechseck + Leitbild.</li>
                     </ol>`
            },
            {
              style: "accent",
              kicker: "Merksatz",
              title: "Eine Meinung ist noch keine Stellungnahme.",
              body: `<p>Erst die Begründung mit Beispielen und die Abwägung machen daraus eine Klausurantwort.</p>`
            }
          ]
        },
        {
          type: "sentence",
          title: "A4 · Die Struktur bauen",
          case: "Setze die Bausteine richtig ein. Geprüft wird der Aufbau, nicht deine Position.",
          text: "Eine Stellungnahme beginnt mit {*einer These|einer Frage}. Danach folgen {*zwei Argumente mit Beispiel|zwei Behauptungen ohne Beispiel}. Wichtig ist außerdem {*ein Gegenargument|kein Gegenargument}. Das Fazit nennt {*ein Ziel und ein Leitbild|nur eine Zahl}.",
          explain: "Diese vier Bausteine machen aus einer Meinung eine begründete Stellungnahme. Ob du Text A oder B zustimmst, ist offen — die Begründung muss schlüssig sein."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann die sechs Ziele des magischen Sechsecks nennen.",
            "Ich kann jedem Ziel eine Kennzahl zuordnen.",
            "Ich kann die Abgabenquote und den SV-Anteil berechnen.",
            "Ich kann einem Fall Harmonie oder Konflikt zuordnen.",
            "Ich kann die drei Gerechtigkeitsleitbilder unterscheiden.",
            "Ich kann eine Stellungnahme mit These, Argumenten, Gegenargument und Fazit schreiben."
          ]
        }
      ]
    },

    /* ---------------------------------------------------------- */
    /* 6 · LERNKARTEN                                             */
    /* ---------------------------------------------------------- */
    {
      id: "lernkarten",
      folder: "klausur",
      group: "Wiederholen",
      title: "Lernkarten",
      kicker: "Wiederholen · Karteikarten",
      minutes: 10,
      steps: [
        {
          type: "cards",
          title: "Lernkarten",
          cards: [
            { front: "Magisches Sechseck", back: "Die sechs Ziele der Wirtschaftspolitik: Vollbeschäftigung, Preisstabilität, außenwirtschaftliches Gleichgewicht, Wirtschaftswachstum, Umwelt- und Klimaschutz, gerechte Verteilung." },
            { front: "Warum „magisch“?", back: "Alle sechs Ziele gleichzeitig optimal zu erreichen ist nicht möglich. Die Politik muss abwägen." },
            { front: "Vollbeschäftigung → Kennzahl", back: "Arbeitslosenquote. Je niedriger, desto besser." },
            { front: "Preisstabilität → Kennzahl", back: "Inflationsrate. Ziel der EZB: etwa 2 % pro Jahr." },
            { front: "Wirtschaftswachstum → Kennzahl", back: "Veränderung des BIP in Prozent." },
            { front: "Außenwirtschaftliches Gleichgewicht → Kennzahl", back: "Außenhandelssaldo. Ziel: etwa 0, Exporte und Importe halten sich die Waage." },
            { front: "Gerechte Verteilung → Kennzahl", back: "Gini-Wert der Einkommen. Je niedriger, desto gleicher verteilt." },
            { front: "Umwelt- und Klimaschutz → Kennzahl", back: "CO₂-Ausstoß. Je niedriger, desto besser." },
            { front: "Beitrag oder Steuer?", back: "Beitrag: Sozialversicherung, begründet einen Anspruch. Steuer: finanziert Gemeinschaftsaufgaben, kein direkter Anspruch." },
            { front: "Abgabenquote", back: "Alle Abzüge ÷ Brutto × 100. Bei Lena: 967,50 ÷ 3.000 × 100 = 32,25 %." },
            { front: "SV-Anteil an den Abzügen", back: "SV-Beiträge ÷ alle Abzüge × 100. Bei Lena: 652,50 ÷ 967,50 × 100 = 67,4 %." },
            { front: "Leistungsprinzip", back: "Wer mehr leistet oder einzahlt, bekommt mehr. Beispiel: Rente nach Beitragsjahren." },
            { front: "Bedürfnisprinzip", back: "Wer mehr braucht, bekommt mehr. Beispiel: Wohngeld, Grundsicherung." },
            { front: "Gleichheitsprinzip", back: "Alle bekommen den gleichen Anteil. Beispiel: Kindergeld in gleicher Höhe." },
            { front: "Zielharmonie", back: "Eine Maßnahme verbessert zwei Ziele gleichzeitig. Beispiel: Solarpark → Umwelt + Vollbeschäftigung." },
            { front: "Zielkonflikt", back: "Ein Ziel wird besser, ein anderes schlechter. Beispiel: Steuersenkung → mehr Jobs, aber steigende Preise." }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------- */
    /* 7 · PROBEKLAUSUR                                           */
    /* ---------------------------------------------------------- */
    {
      id: "probeklausur",
      folder: "klausur",
      group: "Probeklausur",
      title: "Probeklausur · 25 Punkte",
      kicker: "Probeklausur · mit Erklärungen",
      minutes: 45,
      exam: {
        guided: true,
        minutes: 45,
        tools: "Taschenrechner, Heft für Nebenrechnungen",
        situation: `<p><strong>Zwei Fälle, eine Klausur.</strong> Die Stadt Oberhausen plant ein Logistikzentrum: 400 neue Arbeitsplätze, aber viel Fläche und mehr Lkw-Verkehr. Lena Thüne arbeitet in der Stadtverwaltung und verdient 3.000,00 € brutto.</p>
                    <p>Alle Aufgaben gehören zu diesen beiden Fällen. Schreibe bei Rechnungen den Rechenweg auf.</p>`,
        grading: [[87, "1", "sehr gut"], [74, "2", "gut"], [61, "3", "befriedigend"], [48, "4", "ausreichend"], [24, "5", "mangelhaft"], [0, "6", "ungenügend"]]
      },
      help: `<h3>Formeln</h3>
             <p class="formula">Abgabenquote = alle Abzüge ÷ Brutto × 100<br>SV-Anteil = SV-Beiträge ÷ alle Abzüge × 100</p>
             <h3>Notenschlüssel HH/KA</h3>
             <p>87 % → 1 · 74 % → 2 · 61 % → 3 · 48 % → 4 · 24 % → 5</p>`,
      steps: [
        {
          type: "quiz",
          title: "A1 · Sechs Ziele und Kennzahlen (3 P.)",
          points: 3,
          review: "training-a1",
          guide: [
            {
              style: "dark",
              kicker: "A1 · Grundwissen",
              title: "Ziele und ihre Messgrößen",
              body: `<p>Die sechs Ziele der Wirtschaftspolitik brauchen Kennzahlen, sonst kann man ihre Erreichung nicht prüfen.</p>
                     <p><strong>Beispiel:</strong> Preisstabilität misst man mit der Inflationsrate, nicht mit dem BIP.</p>`
            },
            {
              kicker: "A1 · So gehst du vor",
              title: "Ziel → Kennzahl.",
              body: `<ul><li>Beschäftigung → Arbeitslosenquote</li><li>Preise → Inflationsrate</li><li>Wachstum → BIP</li><li>Außenhandel → Saldo</li><li>Verteilung → Gini</li><li>Umwelt → CO₂</li></ul>
                     <p class="note">Achte auf die Richtung: „besser“ heißt nicht immer „höher“.</p>`
            }
          ],
          questions: [
            { q: "Welche Kennzahl misst die Preisstabilität?", options: ["Inflationsrate", "Arbeitslosenquote", "Gini-Wert", "CO₂-Ausstoß"], answer: 0, explain: "Die Inflationsrate zeigt die Veränderung der Preise. Ziel: etwa 2 %." },
            { q: "Welche Kennzahl misst die Vollbeschäftigung?", options: ["Arbeitslosenquote", "Außenhandelssaldo", "Veränderung des BIP", "Inflationsrate"], answer: 0, explain: "Die Arbeitslosenquote zeigt, wie viele Arbeitsuchende keine Stelle finden." },
            { q: "Welche Kennzahl misst das Wirtschaftswachstum?", options: ["Veränderung des BIP", "Gini-Wert", "Inflationsrate", "CO₂-Ausstoß"], answer: 0, explain: "Das BIP misst die Produktion. Die Veränderung in Prozent ist das Wachstum." },
            { q: "Welche Kennzahl misst das außenwirtschaftliche Gleichgewicht?", options: ["Außenhandelssaldo", "Arbeitslosenquote", "Gini-Wert", "Veränderung des BIP"], answer: 0, explain: "Der Saldo aus Exporten und Importen sollte nahe 0 liegen." },
            { q: "Welche Kennzahl misst die gerechte Verteilung?", options: ["Gini-Wert der Einkommen", "Inflationsrate", "CO₂-Ausstoß", "Außenhandelssaldo"], answer: 0, explain: "Der Gini-Wert misst die Ungleichheit der Einkommen." },
            { q: "Welche Kennzahl misst den Umwelt- und Klimaschutz?", options: ["CO₂-Ausstoß", "Arbeitslosenquote", "Veränderung des BIP", "Gini-Wert"], answer: 0, explain: "Ein sinkender CO₂-Ausstoß zeigt den Fortschritt beim Klimaschutz." }
          ]
        },
        {
          type: "sort",
          title: "A1 · Kennzahlen zuordnen (3 P.)",
          points: 3,
          review: "training-a1",
          prompt: "Ordne jede Kennzahl dem passenden Ziel zu.",
          categories: VWK_ZIELE,
          items: [
            { text: "Arbeitslosenquote", cat: 0 },
            { text: "Inflationsrate", cat: 1 },
            { text: "Außenhandelssaldo", cat: 2 },
            { text: "Veränderung des BIP", cat: 3 },
            { text: "CO₂-Ausstoß", cat: 4 },
            { text: "Gini-Wert der Einkommen", cat: 5 }
          ]
        },
        {
          type: "calc",
          title: "A2 · Lenas Abrechnung (6 P.)",
          points: 6,
          review: "training-a2",
          decimals: 2,
          case: `Lena Thüne verdient <b>3.000,00 € brutto</b>. Abzüge: Lohnsteuer <b>315,00 €</b>, Krankenversicherung <b>262,50 €</b>, Pflegeversicherung <b>72,00 €</b>, Rentenversicherung <b>279,00 €</b>, Arbeitslosenversicherung <b>39,00 €</b>. Runde auf zwei Nachkommastellen.`,
          rows: [
            { label: "Summe der Sozialversicherungsbeiträge in €", value: 652.5 },
            { label: "Abgabenquote in % (alle Abzüge : Brutto × 100)", value: 32.25 },
            { label: "Anteil der Sozialversicherung an allen Abzügen in %", value: 67.4 }
          ],
          hint: "SV-Beiträge: KV + PV + RV + AV. Alle Abzüge: SV-Beiträge + Lohnsteuer.",
          result: "652,50 € · 32,25 % · 67,4 %"
        },
        {
          type: "quiz",
          title: "A2 · Steuer oder Beitrag? (1 P.)",
          points: 1,
          review: "training-a2",
          questions: [
            { q: "Die Lohnsteuer ist …", options: ["eine Steuer", "ein Sozialversicherungsbeitrag", "eine Transferleistung", "ein Beitragssatz"], answer: 0, explain: "Die Lohnsteuer finanziert Gemeinschaftsaufgaben und begründet keinen direkten Anspruch." }
          ]
        },
        {
          type: "sort",
          title: "A3 · Harmonie oder Konflikt? (4 P.)",
          points: 4,
          review: "training-a3",
          guide: [
            {
              kicker: "A3 · Transfer",
              title: "Eine Maßnahme, mehrere Ziele",
              body: `<p>Prüfe jede Maßnahme: Wird ein Ziel besser und ein anderes schlechter? Dann ist es ein <strong>Konflikt</strong>. Werden zwei Ziele gleichzeitig besser, ist es eine <strong>Harmonie</strong>.</p>`
            },
            {
              kicker: "A3 · So gehst du vor",
              title: "Ziel für Ziel prüfen.",
              body: `<p>Nenne immer die <strong>Richtung</strong>: „Die Vollbeschäftigung wird besser, weil 400 Jobs entstehen.“ Nur das Ziel zu nennen reicht nicht.</p>`
            }
          ],
          prompt: "Ordne jede Maßnahme zu.",
          categories: ["Harmonie", "Konflikt"],
          items: [
            { text: "Solarpark: neue Jobs und weniger CO₂", cat: 0 },
            { text: "Steuersenkung: mehr Jobs, aber steigende Preise", cat: 1 },
            { text: "Höheres Kindergeld: Familien haben mehr Geld, die Wirtschaft wächst", cat: 0 },
            { text: "Mehr Konsum: mehr Importe, der Außenhandel gerät aus dem Gleichgewicht", cat: 1 }
          ]
        },
        {
          type: "quiz",
          title: "A3 · Leitbilder (2 P.)",
          points: 2,
          review: "training-a3",
          questions: [
            { q: "Frau Thüne erhält nach 40 Beitragsjahren eine höhere Rente als Herr Yilmaz nach 20 Jahren.", options: ["Leistungsprinzip", "Bedürfnisprinzip", "Gleichheitsprinzip", "kein Leitbild"], answer: 0, explain: "Die Rente richtet sich nach den Beitragsjahren — also nach der Leistung." },
            { q: "Familie Kaya erhält Wohngeld, weil ihr Einkommen niedrig und die Miete hoch ist.", options: ["Bedürfnisprinzip", "Leistungsprinzip", "Gleichheitsprinzip", "kein Leitbild"], answer: 0, explain: "Das Wohngeld richtet sich nach dem Bedarf." },
            { q: "Alle Familien erhalten für jedes Kind dasselbe Kindergeld.", options: ["Gleichheitsprinzip", "Leistungsprinzip", "Bedürfnisprinzip", "kein Leitbild"], answer: 0, explain: "Alle bekommen den gleichen Betrag." }
          ]
        },
        {
          type: "sentence",
          title: "A3 · Magisch und Kompromiss (2 P.)",
          points: 2,
          review: "training-a3",
          case: "Baue die beiden Sätze.",
          text: "Das Sechseck heißt magisch, weil {*nie alle sechs Ziele gleichzeitig optimal erreicht werden können|alle Ziele immer gleichzeitig erreicht werden}. Ein Kompromiss für das Logistikzentrum ist {*ein Bahnanschluss statt nur Lkw|mehr Lkw-Verkehr}.",
          explain: "„Magisch“ meint die Knappheit der Ziele. Ein Kompromiss entschärft den Konflikt, zum Beispiel mit Bahnanschluss, Solaranlagen oder Ausgleichsflächen."
        },
        {
          type: "sentence",
          title: "A4 · Stellungnahme (4 P.)",
          points: 4,
          review: "training-a4",
          guide: [
            {
              style: "dark",
              kicker: "A4 · Problemlösung",
              title: "Position beziehen — aber begründet.",
              body: `<p>Eine Stellungnahme ist keine Meinungsumfrage. Sie braucht eine <strong>These</strong>, <strong>zwei Argumente mit Beispiel</strong>, ein <strong>Gegenargument</strong> und ein <strong>Fazit</strong> mit Ziel und Leitbild.</p>`
            },
            {
              kicker: "A4 · So gehst du vor",
              title: "Erst die Struktur, dann der Inhalt.",
              body: `<p>Schreibe in ganzen Sätzen. Ein Argument ohne Beispiel ist nur eine Behauptung. Ein Gegenargument zeigt, dass du abwägst.</p>
                     <p class="note">Geprüft wird der Aufbau. Ob du Text A oder B zustimmst, ist offen.</p>`
            }
          ],
          case: "Setze die Bausteine richtig ein. Geprüft wird der Aufbau, nicht deine Position.",
          text: "Eine Stellungnahme beginnt mit {*einer These|einer Frage}. Danach folgen {*zwei Argumente mit Beispiel|zwei Behauptungen ohne Beispiel}. Wichtig ist außerdem {*ein Gegenargument|kein Gegenargument}. Das Fazit nennt {*ein Ziel und ein Leitbild|nur eine Zahl}.",
          explain: "Diese vier Bausteine machen aus einer Meinung eine begründete Stellungnahme. Ob du Text A oder B zustimmst, ist offen — die Begründung muss schlüssig sein."
        }
      ]
    }

  ]
});
