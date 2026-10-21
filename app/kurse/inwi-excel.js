/* Kurs „Excel üben“ (INWI) – nutzt die Excel-Simulation (Schritt-Typ "xls", app/sim-xls.js) */

const XL_BEDIENUNG = {
  kicker: "Bedienung",
  title: "Tippen, schreiben, bestätigen.",
  body: `<ul><li><strong>Zelle markieren:</strong> antippen. Den runden Griff unten rechts ziehen = Bereich markieren.</li>
         <li><strong>Eingeben:</strong> markierte Zelle nochmal antippen (oder die Formelleiste), schreiben, mit ✓ oder Enter bestätigen.</li>
         <li><strong>Formeln</strong> beginnen mit <strong>=</strong>. Statt „B2“ zu tippen, kannst du die Zelle antippen.</li>
         <li><strong>Reiter</strong> oben: Start, Einfügen, Formeln, Daten – die Knöpfe lassen sich seitwärts wischen.</li></ul>
         <p class="note">Der nächste Hinweis pulsiert grün. Mit „Probe“ prüfst du jede Aufgabe.</p>`
};

LERNRAUM.subjects.push({
  id: "inwi-excel",
  fach: "INWI",
  added: "2026-10-21",
  name: "Excel üben",
  course: "INWI · HHU",
  glyph: "X",
  color: "#217346",
  company: "Fly Bike Werke GmbH",
  description: "Tabellenkalkulation wie in Excel: Formeln, absolute Bezüge, Funktionen, Sortieren, Diagramme und eine Kalkulation. Direkt am Handy üben.",
  topics: [

    /* ══════════════ GRUNDLAGEN ══════════════ */
    {
      id: "umsatzliste",
      group: "Excel-Grundlagen",
      title: "Umsatzliste mit Formeln",
      kicker: "Excel · Teil 1",
      minutes: 15,
      help: `<h3>Formeln beginnen mit =</h3>
             <p>Beispiel: <strong>=B2*C2</strong> multipliziert die Zellen B2 und C2. Ändert sich ein Wert, rechnet Excel alles neu.</p>
             <h3>Formel kopieren</h3>
             <p>Markiere die Zelle mit der Formel und die Zellen darunter, dann <strong>Start → Ausfüllen → Nach unten</strong>. Die Bezüge wandern mit: aus B2 wird B3, B4 …</p>
             <h3>Summe</h3>
             <p><strong>∑ AutoSumme</strong> setzt unter Zahlen die Formel =SUMME(…) ein.</p>
             <h3>Formate</h3>
             <p>Fett, Füllfarbe und Zahlenformat (z. B. Währung €) ändern nur das Aussehen, nicht den Wert.</p>`,
      steps: [
        {
          type: "slides",
          title: "Die Tabelle der Fly Bike Werke",
          slides: [
            {
              style: "dark",
              kicker: "Excel · Fly Bike Werke GmbH",
              title: "Menge mal Preis gleich Umsatz.",
              body: `<p>Die Fly Bike Werke GmbH hat vier Fahrräder verkauft. Du rechnest den Umsatz pro Modell und insgesamt aus – mit <strong>Formeln</strong>, nicht mit dem Taschenrechner.</p>`
            },
            XL_BEDIENUNG
          ]
        },
        {
          type: "xls",
          title: "Umsatz berechnen – geführt",
          mode: "guided",
          file: "Umsatz.xlsx",
          intro: "Löse eine Aufgabe nach der anderen. Antippen, nochmal antippen, schreiben, ✓.",
          sheet: {
            cols: 4, rows: 9, wideA: true,
            cells: { A1: "Artikel", B1: "Menge", C1: "Preis", D1: "Umsatz", A2: "E-Bike", B2: "12", C2: "1899", A3: "Citybike", B3: "25", C3: "649", A4: "Mountainbike", B4: "18", C4: "799", A5: "Kinderrad", B5: "30", C5: "199" }
          },
          criteria: [
            {
              label: "Überschriften (Zeile 1) fett",
              hint: "A1 antippen, den Griff nach rechts bis D1 ziehen, dann F antippen.",
              checks: [{ op: "fmt", cell: "A1:D1", prop: "bold", value: true }],
              task: { wo: "Start → Gruppe Schrift", was: "Markiere A1 bis D1 und mache sie fett (F).", probe: "Die Überschriften sind kräftig." }
            },
            {
              label: "D2: Umsatz E-Bike = Menge · Preis",
              hint: "D2 markieren, nochmal antippen, = tippen, B2 antippen, * tippen, C2 antippen, ✓.",
              checks: [{ op: "formula", cell: "D2", refs: ["B2", "C2"] }, { op: "value", cell: "D2", value: 22788 }],
              task: { wo: "Zelle D2", was: "Schreibe die Formel =B2*C2.", probe: "In D2 steht 22788 – die Formel steht in der Formelleiste." }
            },
            {
              label: "Formel nach unten bis D5 kopieren",
              hint: "D2 antippen, den Griff nach unten bis D5 ziehen, dann Start → Ausfüllen ▾ → Nach unten.",
              checks: [{ op: "formulas", range: "D2:D5" }, { op: "value", cell: "D2:D5", value: [22788, 16225, 14382, 5970] }],
              task: { wo: "D2:D5 markieren → Start → Ausfüllen ▾", was: "Kopiere die Formel nach unten. Tippe danach D4 an und sieh dir die Formel an: aus B2 ist B4 geworden.", probe: "Alle vier Umsätze sind berechnet." }
            },
            {
              label: "Preise und Umsätze im Währungsformat",
              hint: "C2 antippen, Griff bis D5 ziehen, dann Start → Zahlenformat ▾ → Währung (€).",
              checks: [{ op: "fmt", cell: "C2:D5", prop: "numfmt", value: "euro" }],
              task: { wo: "C2:D5 markieren → Start → Gruppe Zahl", was: "Stelle das Zahlenformat auf Währung (€).", probe: "Die Beträge enden auf „€“." }
            },
            {
              label: "A6: „Gesamt“, D6: Summe der Umsätze",
              hint: "A6 antippen und Gesamt schreiben. Dann D6 antippen und Start → ∑ AutoSumme ▾ → Summe wählen.",
              checks: [{ op: "text", cell: "A6", value: "Gesamt" }, { op: "formula", cell: "D6", uses: ["SUMME"], refs: ["D2:D5"] }, { op: "value", cell: "D6", value: 59365 }],
              task: { wo: "A6 und D6", was: "Schreibe in A6 das Wort Gesamt. In D6 summierst du die Umsätze mit ∑ AutoSumme.", probe: "Der Gesamtumsatz beträgt 59.365,00 €." }
            },
            {
              label: "Gesamtzeile: fett und gelb hinterlegt (A6:D6)",
              hint: "A6 antippen, Griff nach rechts bis D6, F antippen, dann Füllfarbe ▾ → Gelb.",
              checks: [{ op: "fmt", cell: "A6:D6", prop: "bold", value: true }, { op: "fmt", cell: "A6:D6", prop: "fill", value: "gelb" }],
              task: { wo: "A6:D6 markieren → Start", was: "Fett und Füllfarbe Gelb.", probe: "Die Summenzeile fällt auf." }
            }
          ]
        }
      ]
    },

    /* ══════════════ ABSOLUTE BEZÜGE ══════════════ */
    {
      id: "umsatzsteuer",
      group: "Excel-Grundlagen",
      title: "Umsatzsteuer und absolute Bezüge",
      kicker: "Excel · Teil 2",
      minutes: 15,
      help: `<h3>Relativ und absolut</h3>
             <ul><li><strong>B4</strong> ist <em>relativ</em>: Beim Kopieren nach unten wird daraus B5, B6 …</li>
             <li><strong>$B$1</strong> ist <em>absolut</em>: Der Bezug bleibt immer B1.</li></ul>
             <h3>Wann absolut?</h3>
             <p>Wenn eine Zelle für <em>alle</em> Zeilen gilt, z. B. der Steuersatz. Tippe beim Schreiben die Taste <strong>F4 $</strong>, um aus B1 ein $B$1 zu machen.</p>
             <h3>Brutto</h3>
             <p class="formula">Umsatzsteuer = Netto · Steuersatz<br>Brutto = Netto + Umsatzsteuer</p>`,
      steps: [
        {
          type: "slides",
          title: "Ein Steuersatz für alle",
          slides: [
            {
              kicker: "Das Problem",
              title: "Der Steuersatz steht nur einmal.",
              body: `<p>In Zelle B1 steht der Steuersatz (19 %). Alle Preise sollen darauf zugreifen. Ändert sich der Satz, ändert man <strong>nur B1</strong>.</p>
                     <p>Dafür brauchst du einen <strong>absoluten Bezug</strong>: <strong>$B$1</strong>.</p>`
            }
          ]
        },
        {
          type: "xls",
          title: "Brutto berechnen – geführt",
          mode: "guided",
          file: "Preise.xlsx",
          intro: "Netto, Umsatzsteuer, Brutto – mit einem festen Steuersatz in B1.",
          sheet: {
            cols: 4, rows: 8, wideA: true,
            cells: { A1: "Steuersatz", B1: "0,19", A3: "Artikel", B3: "Netto", C3: "USt", D3: "Brutto", A4: "E-Bike", B4: "1500", A5: "Citybike", B5: "520", A6: "Mountainbike", B6: "640", A7: "Kinderrad", B7: "160" },
            fmt: { B1: { numfmt: "prozent" }, "A3:D3": { bold: true } }
          },
          criteria: [
            {
              label: "C4: Umsatzsteuer mit festem Satz $B$1",
              hint: "In C4: =B4*$B$1. Tippe B4 an, dann *, dann B1 antippen und danach F4 $ drücken.",
              checks: [{ op: "formula", cell: "C4", refs: ["B4", "$B$1"], abs: true }, { op: "value", cell: "C4", value: 285 }],
              task: { wo: "Zelle C4", was: "Schreibe =B4*$B$1. Das Dollarzeichen setzt du mit der Taste F4 $.", probe: "In C4 steht 285 (19 % von 1500)." }
            },
            {
              label: "Umsatzsteuer nach unten kopieren (C4:C7)",
              hint: "C4 antippen, Griff bis C7 ziehen, dann Ausfüllen ▾ → Nach unten.",
              checks: [{ op: "formulas", range: "C4:C7" }, { op: "value", cell: "C4:C7", value: [285, 98.8, 121.6, 30.4] }],
              task: { wo: "C4:C7 → Start → Ausfüllen ▾", was: "Kopiere die Formel nach unten. Tippe C5 an: B5 hat sich geändert, $B$1 nicht.", probe: "Vier Steuerbeträge stehen da." }
            },
            {
              label: "Brutto: D4 = B4 + C4, nach unten kopiert (D4:D7)",
              hint: "In D4: =B4+C4. Dann D4:D7 markieren und Nach unten ausfüllen.",
              checks: [{ op: "formula", cell: "D4", refs: ["B4", "C4"] }, { op: "formulas", range: "D4:D7" }, { op: "value", cell: "D4:D7", value: [1785, 618.8, 761.6, 190.4] }],
              task: { wo: "D4 und Ausfüllen", was: "Brutto = Netto + Umsatzsteuer. Danach nach unten kopieren.", probe: "Das E-Bike kostet brutto 1785 €." }
            },
            {
              label: "B4:D7 im Währungsformat",
              hint: "B4 antippen, Griff bis D7 ziehen, Zahlenformat ▾ → Währung (€).",
              checks: [{ op: "fmt", cell: "B4:D7", prop: "numfmt", value: "euro" }],
              task: { wo: "B4:D7 markieren → Start → Zahlenformat", was: "Währung (€).", probe: "Alle Beträge enden auf €." }
            },
            {
              label: "Ermäßigter Satz: B1 auf 7 %",
              hint: "B1 antippen, nochmal antippen, 7% schreiben und ✓. Du musst sonst nichts ändern.",
              checks: [{ op: "value", cell: "B1", value: 0.07 }, { op: "value", cell: "D4", value: 1605 }],
              task: { wo: "Zelle B1", was: "Ändere den Steuersatz auf 7 %. Schau, was mit den Brutto-Preisen passiert.", probe: "Alle Preise haben sich selbst geändert – dank $B$1." }
            }
          ]
        }
      ]
    },

    /* ══════════════ FUNKTIONEN ══════════════ */
    {
      id: "funktionen",
      group: "Excel-Funktionen",
      title: "Funktionen: Summe, Mittelwert, WENN",
      kicker: "Excel · Teil 3",
      minutes: 20,
      help: `<h3>Funktionen</h3>
             <p>Eine Funktion hat einen Namen, Klammern und Argumente, getrennt mit <strong>;</strong></p>
             <dl class="terms">
               <dt>=SUMME(B2:B7)</dt><dd>zählt alle Zahlen im Bereich zusammen.</dd>
               <dt>=MITTELWERT(B2:B7)</dt><dd>Durchschnitt.</dd>
               <dt>=MAX(…) / =MIN(…)</dt><dd>größter / kleinster Wert.</dd>
               <dt>=WENN(Bedingung; dann; sonst)</dt><dd>Beispiel: =WENN(B2&gt;12000;B2*0,05;0)</dd>
               <dt>=ZÄHLENWENN(Bereich; Bedingung)</dt><dd>zählt, wie oft die Bedingung stimmt. Bedingung in Anführungszeichen: „&gt;12000“.</dd>
             </dl>
             <p>Funktionen findest du unter <strong>Formeln → fx Funktion</strong> oder du tippst sie ein.</p>`,
      steps: [
        {
          type: "slides",
          title: "Mehr als Rechnen",
          slides: [
            {
              kicker: "Funktionen",
              title: "Excel kann entscheiden und zählen.",
              body: `<p>Die Fly Bike Werke haben ihre Monatsumsätze. Du bestimmst Summe, Durchschnitt, besten und schlechtesten Monat – und einen <strong>Bonus</strong>, wenn ein Monat über 12.000 € liegt.</p>
                     <p class="note">Argumente trennst du mit einem Semikolon: =WENN(B2&gt;12000;B2*0,05;0)</p>`
            }
          ]
        },
        {
          type: "xls",
          title: "Kennzahlen mit Funktionen – geführt",
          mode: "guided",
          file: "Monatsumsatz.xlsx",
          intro: "Die Funktionen findest du auch unter Formeln → fx Funktion.",
          sheet: {
            cols: 3, rows: 13, wideA: true,
            cells: {
              A1: "Monat", B1: "Umsatz", C1: "Bonus",
              A2: "Januar", B2: "12400", A3: "Februar", B3: "9800", A4: "März", B4: "15100", A5: "April", B5: "11200", A6: "Mai", B6: "13600", A7: "Juni", B7: "16800",
              A9: "Summe", A10: "Mittelwert", A11: "Höchster Wert", A12: "Niedrigster Wert", A13: "Monate über 12.000 €"
            },
            fmt: { "A1:C1": { bold: true }, "B2:B7": { numfmt: "euro" } }
          },
          criteria: [
            {
              label: "B9: Summe aller Monatsumsätze",
              hint: "B9 antippen, Start → ∑ AutoSumme ▾ → Summe passt nur, wenn Zahlen direkt darüber stehen. Schreibe sonst =SUMME(B2:B7).",
              checks: [{ op: "formula", cell: "B9", uses: ["SUMME"], refs: ["B2:B7"] }, { op: "value", cell: "B9", value: 78900 }],
              task: { wo: "Zelle B9", was: "=SUMME(B2:B7)", probe: "Die Summe ist 78.900." }
            },
            {
              label: "B10: Mittelwert",
              hint: "=MITTELWERT(B2:B7)",
              checks: [{ op: "formula", cell: "B10", uses: ["MITTELWERT"], refs: ["B2:B7"] }, { op: "value", cell: "B10", value: 13150 }],
              task: { wo: "Zelle B10", was: "Berechne den Durchschnitt mit MITTELWERT.", probe: "Durchschnitt: 13.150." }
            },
            {
              label: "B11: höchster, B12: niedrigster Wert",
              hint: "B11: =MAX(B2:B7), B12: =MIN(B2:B7)",
              checks: [{ op: "formula", cell: "B11", uses: ["MAX"] }, { op: "formula", cell: "B12", uses: ["MIN"] }, { op: "value", cell: "B11", value: 16800 }, { op: "value", cell: "B12", value: 9800 }],
              task: { wo: "Zellen B11 und B12", was: "MAX und MIN über B2:B7.", probe: "Bester Monat: 16.800, schlechtester: 9.800." }
            },
            {
              label: "C2: Bonus 5 % bei Umsatz über 12.000 €",
              hint: "=WENN(B2>12000;B2*0,05;0) – Tippe > mit der Taste unten.",
              checks: [{ op: "formula", cell: "C2", uses: ["WENN"], refs: ["B2"] }, { op: "value", cell: "C2", value: 620 }],
              task: { wo: "Zelle C2", was: "=WENN(B2>12000;B2*0,05;0)", probe: "Im Januar gibt es 620 € Bonus." }
            },
            {
              label: "Bonus nach unten kopieren (C2:C7)",
              hint: "C2 markieren, Griff bis C7 ziehen, Ausfüllen ▾ → Nach unten.",
              checks: [{ op: "formulas", range: "C2:C7" }, { op: "value", cell: "C2:C7", value: [620, 0, 755, 0, 680, 840] }],
              task: { wo: "C2:C7", was: "Nach unten ausfüllen.", probe: "Nur vier Monate haben Bonus." }
            },
            {
              label: "B13: Wie viele Monate liegen über 12.000 €?",
              hint: "=ZÄHLENWENN(B2:B7;\">12000\") – die Anführungszeichen stehen unten auf der Tastenleiste (\").",
              checks: [{ op: "formula", cell: "B13", uses: ["ZÄHLENWENN"], refs: ["B2:B7"] }, { op: "value", cell: "B13", value: 4 }],
              task: { wo: "Zelle B13", was: "Zähle mit ZÄHLENWENN, wie viele Umsätze größer als 12000 sind.", probe: "Es sind 4 Monate." }
            }
          ]
        }
      ]
    },

    /* ══════════════ SORTIEREN UND DIAGRAMME ══════════════ */
    {
      id: "diagramme",
      group: "Excel-Auswertung",
      title: "Sortieren und Diagramme",
      kicker: "Excel · Teil 4",
      minutes: 15,
      help: `<h3>Sortieren</h3>
             <p>Zelle in der Spalte markieren, nach der sortiert werden soll → <strong>Daten → A→Z</strong> (aufsteigend) oder <strong>Z→A</strong> (absteigend). Die Überschrift bleibt oben.</p>
             <h3>Diagramm</h3>
             <p>Bereich <strong>mit Beschriftung und Zahlen</strong> markieren (z. B. A1:B6), dann <strong>Einfügen → Diagramm</strong>.</p>
             <dl class="terms">
               <dt>Säule</dt><dd>Werte vergleichen.</dd>
               <dt>Linie</dt><dd>Entwicklung über die Zeit.</dd>
               <dt>Kreis</dt><dd>Anteile am Ganzen.</dd>
             </dl>`,
      steps: [
        {
          type: "xls",
          title: "Auswerten und darstellen – geführt",
          mode: "guided",
          file: "Verkauf.xlsx",
          intro: "Zuerst sortieren, dann ein Diagramm, am Ende die Anteile.",
          sheet: {
            cols: 3, rows: 10, wideA: true,
            cells: { A1: "Artikel", B1: "Umsatz", A2: "Kinderrad", B2: "5970", A3: "E-Bike", B3: "22788", A4: "Mountainbike", B4: "14382", A5: "Citybike", B5: "16225", A6: "Helm", B6: "3120", A7: "Gesamt", B7: "=SUMME(B2:B6)" },
            fmt: { "A1:C1": { bold: true }, "B2:B7": { numfmt: "euro" } }
          },
          criteria: [
            {
              label: "Nach Umsatz absteigend sortieren (größter oben)",
              hint: "Markiere B2 und ziehe den Griff bis B6 (die Summenzeile B7 gehört nicht dazu). Dann Daten → Z → A absteigend. Die Artikelnamen wandern mit.",
              checks: [{ op: "sorted", range: "B2:B6", dir: "desc" }, { op: "value", cell: "A2", value: "E-Bike" }],
              task: { wo: "B2:B6 markieren → Daten → Z → A", was: "Sortiere die Artikel nach Umsatz, der größte zuerst.", probe: "Das E-Bike steht oben." }
            },
            {
              label: "Säulendiagramm aus A1:B6",
              hint: "A1 antippen, Griff bis B6 ziehen, Einfügen → Diagramm ▾ → Säule.",
              checks: [{ op: "chart", type: "saeule", range: "A1:B6" }],
              task: { wo: "A1:B6 markieren → Einfügen → Diagramm", was: "Erstelle ein Säulendiagramm.", probe: "Unter der Tabelle erscheint das Diagramm." }
            },
            {
              label: "Anteile als Kreisdiagramm",
              hint: "Gleicher Bereich A1:B6 markiert lassen, Einfügen → Diagramm ▾ → Kreis.",
              checks: [{ op: "chart", type: "kreis", range: "A1:B6" }],
              task: { wo: "A1:B6 → Einfügen → Diagramm ▾", was: "Wechsle zum Kreisdiagramm: Es zeigt, welcher Anteil auf welchen Artikel entfällt.", probe: "Die Anteile stehen in Prozent in der Legende." }
            },
            {
              label: "C2: Anteil = B2 / Gesamtumsatz (absolut) als Prozent",
              hint: "In C2: =B2/$B$7 (F4 $ setzt die Dollarzeichen). Dann C2:C6 nach unten ausfüllen und das Format Prozent wählen.",
              checks: [{ op: "formula", cell: "C2", refs: ["B2", "$B$7"], abs: true }, { op: "formulas", range: "C2:C6" }, { op: "fmt", cell: "C2:C6", prop: "numfmt", value: "prozent" }, { op: "value", cell: "C2", value: 0.3647, tol: 0.001 }],
              task: { wo: "Zelle C2 und Ausfüllen", was: "Anteil = Umsatz geteilt durch Gesamtumsatz in B7 (absolut!). Format: Prozent.", probe: "Das E-Bike macht rund 36 % aus." }
            }
          ]
        }
      ]
    },

    /* ══════════════ KALKULATION ══════════════ */
    {
      id: "bezugspreis",
      group: "Excel-Anwendung",
      title: "Bezugskalkulation in Excel",
      kicker: "Excel · Teil 5",
      minutes: 20,
      help: `<h3>Das Schema</h3>
             <p class="formula">Listeneinkaufspreis<br>− Liefererrabatt<br>= Zieleinkaufspreis<br>− Liefererskonto<br>= Bareinkaufspreis<br>+ Bezugskosten<br>= Bezugspreis</p>
             <h3>In Excel</h3>
             <p>Die Prozentsätze stehen in eigenen Zellen (Spalte C). Die Formeln greifen darauf zu. So kannst du später den Rabatt ändern, und alles rechnet sich neu.</p>`,
      steps: [
        {
          type: "slides",
          title: "Kalkulation mit Tabelle",
          slides: [
            {
              kicker: "Anwendung",
              title: "Dasselbe Schema – nur automatisch.",
              body: `<p>Aus dem Fach GPU kennst du die Bezugskalkulation. Jetzt baust du sie in Excel. Der Vorteil: Ändert sich der Rabatt, rechnet Excel alles sofort neu.</p>`
            }
          ]
        },
        {
          type: "xls",
          title: "Bezugspreis berechnen – geführt",
          mode: "guided",
          file: "Bezugskalkulation.xlsx",
          intro: "Rabatt und Skonto stehen schon in Spalte C. Bau die Formeln in Spalte B.",
          sheet: {
            cols: 3, rows: 10, wideA: true, colw: { A: 150 },
            cells: {
              A1: "Bezugskalkulation", A2: "Listeneinkaufspreis", B2: "2400", A3: "− Liefererrabatt", C3: "0,15", A4: "= Zieleinkaufspreis",
              A5: "− Liefererskonto", C5: "0,02", A6: "= Bareinkaufspreis", A7: "+ Bezugskosten", B7: "60", A8: "= Bezugspreis"
            },
            fmt: { A1: { bold: true }, "C3": { numfmt: "prozent" }, "C5": { numfmt: "prozent" }, "B2:B8": { numfmt: "euro" } }
          },
          criteria: [
            {
              label: "B3: Liefererrabatt in Euro",
              hint: "=B2*C3 – Listeneinkaufspreis mal Rabattsatz.",
              checks: [{ op: "formula", cell: "B3", refs: ["B2", "C3"] }, { op: "value", cell: "B3", value: 360 }],
              task: { wo: "Zelle B3", was: "Rabatt = Listeneinkaufspreis · Rabattsatz.", probe: "Rabatt: 360 €." }
            },
            {
              label: "B4: Zieleinkaufspreis",
              hint: "=B2-B3",
              checks: [{ op: "formula", cell: "B4", refs: ["B2", "B3"] }, { op: "value", cell: "B4", value: 2040 }],
              task: { wo: "Zelle B4", was: "Zieleinkaufspreis = Listeneinkaufspreis − Rabatt.", probe: "2.040 €." }
            },
            {
              label: "B5: Liefererskonto (vom Zieleinkaufspreis)",
              hint: "=B4*C5 – Skonto wird vom Zieleinkaufspreis gerechnet, nicht vom Listenpreis.",
              checks: [{ op: "formula", cell: "B5", refs: ["B4", "C5"] }, { op: "value", cell: "B5", value: 40.8 }],
              task: { wo: "Zelle B5", was: "Skonto = Zieleinkaufspreis · Skontosatz.", probe: "Skonto: 40,80 €." }
            },
            {
              label: "B6: Bareinkaufspreis und B8: Bezugspreis",
              hint: "B6: =B4-B5 und B8: =B6+B7",
              checks: [{ op: "formula", cell: "B6", refs: ["B4", "B5"] }, { op: "formula", cell: "B8", refs: ["B6", "B7"] }, { op: "value", cell: "B6", value: 1999.2 }, { op: "value", cell: "B8", value: 2059.2 }],
              task: { wo: "Zellen B6 und B8", was: "Bareinkaufspreis = Ziel − Skonto. Bezugspreis = Bar + Bezugskosten.", probe: "Der Bezugspreis beträgt 2.059,20 €." }
            },
            {
              label: "Was wäre, wenn der Rabatt 20 % beträgt? (C3 ändern)",
              hint: "C3 antippen, nochmal antippen, 20% schreiben, ✓.",
              checks: [{ op: "value", cell: "C3", value: 0.2 }, { op: "value", cell: "B8", value: 1941.6 }],
              task: { wo: "Zelle C3", was: "Ändere den Rabattsatz auf 20 %. Alle Werte rechnen sich neu.", probe: "Neuer Bezugspreis: 1.941,60 €." }
            }
          ]
        }
      ]
    },

    /* ══════════════ VERWEISE ══════════════ */
    {
      id: "sverweis",
      group: "Excel-Anwendung",
      title: "Preisliste nachschlagen (SVERWEIS)",
      kicker: "Excel · Teil 6",
      minutes: 15,
      help: `<h3>SVERWEIS</h3>
             <p>Sucht einen Wert in der <strong>ersten Spalte</strong> einer Tabelle und liefert etwas aus einer anderen Spalte derselben Zeile.</p>
             <p class="formula">=SVERWEIS(Suchwert; Tabelle; Spalte; FALSCH)</p>
             <ul><li><strong>Suchwert:</strong> z. B. die Artikelnummer in B7.</li>
             <li><strong>Tabelle:</strong> der ganze Bereich, z. B. A2:C5.</li>
             <li><strong>Spalte:</strong> 2 = zweite Spalte der Tabelle, 3 = dritte …</li>
             <li><strong>FALSCH</strong> = nur genaue Treffer.</li></ul>`,
      steps: [
        {
          type: "xls",
          title: "Preis nachschlagen – geführt",
          mode: "guided",
          file: "Preisliste.xlsx",
          intro: "Aus einer Artikelnummer sollen Name und Preis automatisch erscheinen.",
          sheet: {
            cols: 3, rows: 10, wideA: true,
            cells: { A1: "Art.-Nr.", B1: "Artikel", C1: "Preis", A2: "101", B2: "E-Bike", C2: "1899", A3: "102", B3: "Citybike", C3: "649", A4: "103", B4: "Mountainbike", C4: "799", A5: "104", B5: "Kinderrad", C5: "199", A7: "Gesuchte Nr.", B7: "103", A8: "Artikel", A9: "Preis" },
            fmt: { "A1:C1": { bold: true }, "C2:C5": { numfmt: "euro" }, "B9": { numfmt: "euro" } }
          },
          criteria: [
            {
              label: "B8: Name des Artikels mit SVERWEIS",
              hint: "=SVERWEIS(B7;A2:C5;2;FALSCH) – tippe B7 an, dann ;, dann ziehe A2:C5 per Hand: tippe A2, tippe : und tippe C5.",
              checks: [{ op: "formula", cell: "B8", uses: ["SVERWEIS"], refs: ["B7", "A2:C5"] }, { op: "value", cell: "B8", value: "Mountainbike" }],
              task: { wo: "Zelle B8", was: "=SVERWEIS(B7;A2:C5;2;FALSCH)", probe: "Dort steht „Mountainbike“." }
            },
            {
              label: "B9: Preis des Artikels mit SVERWEIS",
              hint: "=SVERWEIS(B7;A2:C5;3;FALSCH) – der Preis steht in der 3. Spalte.",
              checks: [{ op: "formula", cell: "B9", uses: ["SVERWEIS"], refs: ["B7", "A2:C5"] }, { op: "value", cell: "B9", value: 799 }],
              task: { wo: "Zelle B9", was: "Gleiche Formel, aber Spalte 3.", probe: "Preis: 799 €." }
            },
            {
              label: "Andere Nummer: B7 auf 102 ändern",
              hint: "B7 antippen, nochmal antippen, 102 schreiben, ✓.",
              checks: [{ op: "value", cell: "B7", value: 102 }, { op: "value", cell: "B8", value: "Citybike" }, { op: "value", cell: "B9", value: 649 }],
              task: { wo: "Zelle B7", was: "Gib die Nummer 102 ein.", probe: "Citybike, 649 € – ohne dass du die Formeln angefasst hast." }
            }
          ]
        }
      ]
    },

    /* ══════════════ ABSCHLUSS ══════════════ */
    {
      id: "gewinn-frei",
      group: "Excel-Anwendung",
      title: "Quartalsauswertung selbst bauen",
      kicker: "Excel · Übung",
      minutes: 20,
      help: `<h3>Ohne Anleitung</h3>
             <p>Die Checkliste zeigt, was fehlt. Die Reihenfolge ist egal. Tipp: Formeln zuerst, Formatierung danach, Diagramm zum Schluss.</p>
             <p class="formula">Gewinn = Umsatz − Kosten</p>`,
      steps: [
        {
          type: "xls",
          title: "Quartalsauswertung – frei",
          mode: "free",
          file: "Quartal.xlsx",
          intro: "Berechne Gewinn und Summen, formatiere und erstelle ein Diagramm. Die Checkliste zeigt, was gefordert ist.",
          hints: ["Tippe eine Zelle zweimal an, um zu schreiben. Formeln beginnen mit =.", "Formeln kopierst du mit Start → Ausfüllen → Nach unten."],
          sheet: {
            cols: 4, rows: 9, wideA: true,
            cells: { A1: "Monat", B1: "Umsatz", C1: "Kosten", D1: "Gewinn", A2: "Januar", B2: "12400", C2: "8900", A3: "Februar", B3: "9800", C3: "7600", A4: "März", B4: "15100", C4: "10200", A5: "April", B5: "11200", C5: "8100" }
          },
          criteria: [
            { label: "Gewinn (D2:D5) = Umsatz − Kosten als Formel", hint: "D2: =B2-C2, dann nach unten ausfüllen.", checks: [{ op: "formulas", range: "D2:D5" }, { op: "value", cell: "D2:D5", value: [3500, 2200, 4900, 3100] }] },
            { label: "A6: „Gesamt“", hint: "A6 antippen und Gesamt schreiben.", checks: [{ op: "text", cell: "A6", value: "Gesamt" }] },
            { label: "Summen in B6, C6 und D6 mit SUMME", hint: "B6 markieren, Griff bis D6 ziehen? Besser: B2:D5 markieren und ∑ AutoSumme.", checks: [{ op: "formula", cell: "B6:D6", uses: ["SUMME"] }, { op: "value", cell: "B6:D6", value: [48500, 34800, 13700] }] },
            { label: "Überschriften und Summenzeile fett", hint: "A1:D1 und A6:D6 markieren, F.", checks: [{ op: "fmt", cell: "A1:D1", prop: "bold", value: true }, { op: "fmt", cell: "A6:D6", prop: "bold", value: true }] },
            { label: "Alle Beträge (B2:D6) im Währungsformat", hint: "B2:D6 markieren, Zahlenformat ▾ → Währung.", checks: [{ op: "fmt", cell: "B2:D6", prop: "numfmt", value: "euro" }] },
            { label: "Gewinn-Spalte grün hinterlegt (D2:D5)", hint: "D2:D5 markieren, Füllfarbe ▾ → Grün.", checks: [{ op: "fmt", cell: "D2:D5", prop: "fill", value: "gruen" }] },
            { label: "Säulendiagramm der Umsätze (A1:B5)", hint: "A1:B5 markieren, Einfügen → Diagramm ▾ → Säule.", checks: [{ op: "chart", type: "saeule", range: "A1:B5" }] }
          ]
        }
      ]
    }
  ]
});
