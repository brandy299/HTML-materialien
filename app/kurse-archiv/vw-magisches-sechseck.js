/* ============================================================
   KURS: VW · HHOF/KAOA – Magisches Sechseck
   Lernsituation LS 3.10 · Wirtschaftspolitische Rahmenbedingungen
   Roter Faden: Fallakte Oberhausen (1/6 … 6/6)
   Quelle: 6 Arbeitsblätter + Extras aus dem HBBK-Workspace (Gigastefan)
   Aufbau und alle Aufgabentypen: app/README.md
   ============================================================ */

/* Die sechs Ziele – Ecken des Sechsecks im Uhrzeigersinn ab oben (Reihenfolge wie im Material).
   Ecken 0–3 = Stabilitätsgesetz 1967 (magisches Viereck). */
const VW_ZIELE = ["Vollbeschäftigung", "Preisstabilität", "Außenwirtschaftliches Gleichgewicht",
  "Wirtschaftswachstum", "Umwelt- und Klimaschutz", "Gerechte Verteilung"];
// Ecken für sechseck(): subs = kleine Zeile je Ecke, hi = hervorgehobene Ecken
const vwEcken = (subs = [], hi = []) => VW_ZIELE.map((text, i) => ({ text, sub: subs[i], hi: hi.includes(i) }));
const vwLinie = (kind, from, to) => ({ from, to, kind });
const VW_HARMONIEN = [vwLinie("harmonie", 4, 0), vwLinie("harmonie", 4, 5), vwLinie("harmonie", 5, 3),
  vwLinie("harmonie", 1, 5), vwLinie("harmonie", 3, 0)];

LERNRAUM.subjects.push({
  id: "vw-magisches-sechseck",
  fach: "VW",
  added: "2026-09-29",
  name: "Magisches Sechseck",
  course: "VW · HHOF/KAOA",
  glyph: "V",
  description: "Wirtschaftspolitik in sechs Zielen: Vollbeschäftigung, Preisstabilität, Wachstum, außenwirtschaftliches Gleichgewicht, gerechte Verteilung und Umwelt- und Klimaschutz. Mit der Fallakte Oberhausen – Ziele erkennen, messen, Harmonien und Konflikte beurteilen.",
  topics: [

    /* ══════════════ STUNDE 1 · DIE SECHS ZIELE ══════════════ */
    {
      id: "sechs-ziele",
      group: "Lernsituation 3.10",
      title: "Was soll Wirtschaft leisten?",
      kicker: "LS 3.10 · Stunde 1",
      minutes: 20,
      help: `<h3>Wirtschaftspolitik</h3>
             <p>Alle Maßnahmen des <strong>Staates</strong>, die das Wirtschaftsleben regeln – Gesetze, Steuern, Förderungen.</p>
             <h3>Das magische Sechseck</h3>
             <p>Die <strong>sechs Ziele</strong> der Wirtschaftspolitik zusammen:</p>
             ${sechseck(vwEcken(["StabG 1967", "StabG 1967", "StabG 1967", "StabG 1967"]), { title: "Das magische Sechseck", center: "Wirtschafts-\npolitik" })}
             <ul><li>Vollbeschäftigung</li><li>Preisstabilität</li><li>Außenwirtschaftliches Gleichgewicht</li>
             <li>Wirtschaftswachstum</li><li>Umwelt- und Klimaschutz</li>
             <li>Gerechte Verteilung (von Einkommen und Vermögen)</li></ul>
             <p>Die ersten vier Ziele stehen im <strong>Stabilitätsgesetz</strong> von 1967.</p>
             <h3>Warum „magisch“?</h3>
             <p>Nie sind alle sechs Ziele <strong>gleichzeitig</strong> optimal erreicht. Die Politik muss immer wieder <strong>abwägen</strong>.</p>`,
      steps: [
        {
          type: "slides",
          title: "Die sechs Ziele entdecken",
          slides: [
            {
              style: "dark",
              kicker: "Fallakte Oberhausen · 1/6",
              title: "Vier Stimmen aus der Stadt",
              body: `<p><strong>Mia (17):</strong> „Ich habe mich bei zehn Firmen um eine Ausbildung beworben – bisher ohne Zusage.“</p>
                     <p><strong>Mias Vater:</strong> „Alles wird teurer! Für den Wocheneinkauf zahle ich immer mehr.“</p>
                     <p><strong>Mias Tante:</strong> „Unsere Firma verkauft Maschinen ins Ausland – und kauft dort Bauteile ein. Beides hält sich etwa die Waage.“</p>
                     <p><strong>Mias Nachbar:</strong> „Der alte Stadtpark soll bebaut werden. Viele Nachbarn wollen den Park behalten.“</p>`
            },
            {
              kicker: "Lernziel",
              title: "Ich kann die <mark>sechs Ziele</mark> nennen und in eigenen Worten erklären.",
              body: `<p class="box"><strong>Wirtschaftspolitik</strong> soll sechs Ziele gleichzeitig erreichen. Dieses Zielbündel heißt <strong>magisches Sechseck</strong>.</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Was heißt Wirtschaftspolitik?",
              body: `<dl class="terms">
                       <dt>Wirtschaftspolitik</dt><dd>Alle Maßnahmen des Staates, die das Wirtschaftsleben regeln – Gesetze, Steuern, Förderungen.</dd>
                       <dt>Magisches Sechseck</dt><dd>Die sechs Ziele der Wirtschaftspolitik zusammen.</dd>
                       <dt>„Magisch“</dt><dd>Alle sechs gleichzeitig zu schaffen, ist fast unmöglich – deshalb muss die Politik abwägen.</dd>
                     </dl>`
            },
            {
              kicker: "Die sechs Ziele",
              title: "Was soll Wirtschaft leisten?",
              body: `${sechseck(vwEcken(["StabG 1967", "StabG 1967", "StabG 1967", "StabG 1967"]), { center: "Wirtschafts-\npolitik" })}
                     <ul>
                       <li><strong>1. Vollbeschäftigung</strong> – wer arbeiten kann und will, findet eine Stelle.</li>
                       <li><strong>2. Preisstabilität</strong> – die Preise steigen nur langsam.</li>
                       <li><strong>3. Außenwirtschaftliches Gleichgewicht</strong> – Export und Import halten sich die Waage.</li>
                       <li><strong>4. Wirtschaftswachstum</strong> – die Wirtschaft wächst stetig und angemessen.</li>
                       <li><strong>5. Umwelt- und Klimaschutz</strong> – Natur und Klima werden geschützt.</li>
                       <li><strong>6. Gerechte Verteilung</strong> – Einkommen und Vermögen sind fair verteilt.</li>
                     </ul>
                     <p class="note">Ziele 1–4 stehen schon im Stabilitätsgesetz von 1967 (StabG).</p>`
            },
            {
              style: "accent",
              kicker: "Merksatz",
              title: "Sechs Ziele – ein Zielbündel.",
              body: `<p>Ein einzelnes Ziel ist leicht zu schaffen. Alle sechs <strong>gleichzeitig</strong> – das ist die Kunst.</p>`
            }
          ]
        },
        {
          type: "link",
          title: "Extra: Das Sechseck am Beamer",
          text: "Interaktives 3D-Modell: Stelle die sechs Ziele mit Reglern ein und beobachte Harmonien und Konflikte in drei Oberhausen-Szenarien.",
          href: "materialien/VW/Magisches Sechseck/magisches-sechseck.html"
        },
        {
          type: "sort",
          title: "A1 · Situation oder Ziel?",
          prompt: "Ordne jede Situation dem Ziel zu, das am besten passt.",
          hints: ["Frag dich: Worum geht es in der Situation – Arbeit, Preise, Handel oder Natur?", "Bei der Tante geht es um Verkauf ins Ausland UND Einkauf dort – also um das Gleichgewicht, nicht um einen einzelnen Export."],
          categories: ["Vollbeschäftigung", "Preisstabilität", "Außenwirtschaftl. Gleichgewicht", "Umwelt- und Klimaschutz"],
          items: [
            { text: "Mia sucht eine Ausbildungsstelle.", cat: 0 },
            { text: "Der Vater findet alles teurer.", cat: 1 },
            { text: "Die Tante verkauft Maschinen ins Ausland und kauft dort ein.", cat: 2 },
            { text: "Der alte Stadtpark soll bebaut werden.", cat: 3 },
            { text: "Eine Firma sucht dringend neue Auszubildende.", cat: 0 },
            { text: "Die Preise steigen stark.", cat: 1 },
            { text: "Radwege statt neuer Straßen.", cat: 3 }
          ]
        },
        {
          type: "cloze",
          title: "A2 · Was heißt das Sechseck?",
          prompt: "Drei Wörter passen nicht.",
          text: "Die Wirtschaftspolitik in Deutschland soll sechs Ziele erreichen. Dieses Zielbündel heißt {magisches Sechseck}. Ein Ziel ist die {Preisstabilität}: Die Preise sollen nur langsam steigen. Ein anderes Ziel ist die {Vollbeschäftigung}: Wer arbeiten will, soll eine Stelle finden. Weil sich die Ziele widersprechen können, muss die Politik immer wieder {abwägen}. Auch der Schutz der {Umwelt} und ein stetiges {Wachstum} gehören zu den sechs Zielen.",
          distractors: ["Wettbewerb", "sparen", "Inventur"]
        },
        {
          type: "sentence",
          title: "A3 · Begründen",
          case: "Warum heißt das Zielbündel <b>magisch</b>? Baue den Antwortsatz aus den Bausteinen.",
          text: "Das Zielbündel heißt {*magisches Sechseck|Stabilitätsgesetz}. Es heißt magisch, weil man nie alle sechs Ziele {*gleichzeitig optimal|einzeln nacheinander} erreichen kann. Die Politik muss deshalb immer wieder {*abwägen|kürzen}.",
          hints: ["„Magisch“ hat nichts mit Zauberei zu tun – es ist ein Bild dafür, dass etwas (fast) nicht geht.", "Wenn alle sechs Ziele zusammen nicht passen, muss man sich zwischen ihnen entscheiden."],
          explain: "Merksatz: Magisch heißt – nie sind alle sechs Ziele gleichzeitig optimal erreicht. Deshalb muss die Politik abwägen."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann die sechs Ziele des magischen Sechsecks nennen.",
            "Ich kann die Ziele in eigenen Worten erklären.",
            "Ich kann Alltagssituationen den Zielen zuordnen."
          ]
        }
      ]
    },

    /* ══════════════ STUNDE 2 · KENNZAHLEN ══════════════ */
    {
      id: "kennzahlen",
      group: "Lernsituation 3.10",
      title: "Ziele messbar machen",
      kicker: "LS 3.10 · Stunde 2",
      minutes: 22,
      help: `<h3>Ziele brauchen Kennzahlen</h3>
             <p><strong>Kennzahl</strong> = eine Zahl, die den Zustand eines Ziels beschreibt. Nur so kann man prüfen, ob ein Ziel erreicht ist.</p>
             <h3>Ziel → Kennzahl</h3>
             ${sechseck(vwEcken(["Arbeitslosenquote ↓", "Inflation ≈ 2 %", "Außenbeitrag ≈ 0", "BIP + ≈ 2 %", "CO₂-Ausstoß ↓", "Gini-Wert ↓"]), { title: "Sechs Ziele und ihre Kennzahlen" })}
             <ul><li>Vollbeschäftigung → Arbeitslosenquote (möglichst <strong>niedrig</strong>)</li>
             <li>Preisstabilität → Inflationsrate (EZB-Ziel: ≈ <strong>2 %</strong>)</li>
             <li>Außenwirtschaftliches Gleichgewicht → Außenhandelssaldo (Außenbeitrag: Export − Import; ≈ <strong>0</strong>, ausgeglichen)</li>
             <li>Wirtschaftswachstum → Veränderung des BIP (Faustregel: ≈ <strong>2 %</strong>)</li>
             <li>Umwelt- und Klimaschutz → CO₂-Ausstoß (möglichst niedrig)</li>
             <li>Gerechte Verteilung → Gini-Wert (möglichst niedrig)</li></ul>
             <h3>Kennzahlen erklärt</h3>
             <p><strong>Inflationsrate</strong> = Preisanstieg eines Warenkorbs (Verbraucherpreisindex) in einem Jahr.</p>
             <p><strong>Gini-Wert:</strong> 0 = alle haben gleich viel, 1 = einer hat alles. Je kleiner, desto gerechter.</p>
             <h3>Wichtig</h3>
             <p>Das <strong>Stabilitätsgesetz</strong>: Gesetz von 1967. § 1 nennt vier Ziele (= <strong>magisches Viereck</strong>): hoher Beschäftigungsstand, stabiles Preisniveau, außenwirtschaftliches Gleichgewicht, stetiges und angemessenes Wachstum. Das Sechseck ergänzt gerechte Verteilung und Umweltschutz.</p>
             <p>Feste Zahlen nennt das Gesetz <strong>nicht</strong>. Die 2 % sind das EZB-Ziel (Preise) bzw. eine Faustregel (Wachstum).</p>`,
      steps: [
        {
          type: "slides",
          title: "Woran erkennt man ein Ziel?",
          slides: [
            {
              style: "dark",
              kicker: "Fallakte Oberhausen · 2/6",
              title: "Im Rathaus",
              body: `<p>Die Bürgermeisterin sagt: „Unser Ziel ist <strong>Preisstabilität</strong>.“</p>
                     <p>Ein Journalist fragt: „Und woran genau sieht man das?“</p>
                     <p>Die Bürgermeisterin braucht eine Zahl – eine <strong>Kennzahl</strong>.</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Eine Zahl für jedes Ziel",
              body: `<dl class="terms">
                       <dt>Kennzahl</dt><dd>Eine Zahl, die den Zustand eines Ziels beschreibt.</dd>
                       <dt>Zweck</dt><dd>Nur mit Kennzahlen kann man prüfen, ob ein Ziel erreicht wurde.</dd>
                       <dt>Stabilitätsgesetz</dt><dd>Gesetz von 1967. § 1 nennt vier Ziele (= magisches Viereck): hoher Beschäftigungsstand, stabiles Preisniveau, außenwirtschaftliches Gleichgewicht, stetiges und angemessenes Wachstum. Das Sechseck ergänzt gerechte Verteilung und Umweltschutz.</dd>
                     </dl>`
            },
            {
              kicker: "Überblick",
              title: "Ziel → Kennzahl → „gut“ ist …",
              body: `${sechseck(vwEcken(["Arbeitslosenquote ↓", "Inflation ≈ 2 %", "Außenbeitrag ≈ 0", "BIP + ≈ 2 %", "CO₂-Ausstoß ↓", "Gini-Wert ↓"]), { title: "Sechs Ziele und ihre Kennzahlen" })}
                     <p class="note">↓ = möglichst niedrig · ≈ = ungefähr</p>`
            },
            {
              kicker: "Kennzahlen erklärt",
              title: "Preise und Wirtschaftsleistung",
              body: `<dl class="terms">
                       <dt>Inflationsrate</dt><dd>Preisanstieg eines Warenkorbs (Verbraucherpreisindex) in einem Jahr.</dd>
                       <dt>Warenkorb</dt><dd>Viele Dinge, die Haushalte oft kaufen – z. B. Brot, Strom, Miete.</dd>
                       <dt>BIP</dt><dd>Bruttoinlandsprodukt: Wert aller Waren und Dienstleistungen, die in einem Jahr im Land hergestellt werden.</dd>
                     </dl>`
            },
            {
              kicker: "Kennzahlen erklärt",
              title: "Handel und Verteilung",
              body: `<dl class="terms">
                       <dt>Außenhandelssaldo</dt><dd>Auch Außenbeitrag: Export − Import. Gut ist ein Wert nahe 0 (ausgeglichen).</dd>
                       <dt>Gini-Wert</dt><dd>0 = alle haben gleich viel, 1 = einer hat alles. Je kleiner, desto gerechter.</dd>
                     </dl>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "2 % Inflation sind das Ziel der EZB.",
              body: `<p>Nicht 0 %! Sinkende Preise (<strong>Deflation</strong>) sind gefährlich: Firmen verdienen weniger und stellen weniger ein.</p>`
            }
          ]
        },
        {
          type: "cloze",
          title: "A1 · Welche Kennzahl gehört dazu?",
          prompt: "Zwei Wörter passen nicht.",
          text: "Jedes Ziel prüft man mit einer Kennzahl. Die Vollbeschäftigung misst man mit der {Arbeitslosenquote}. Die Preisstabilität misst man mit der {Inflationsrate}. Das Wirtschaftswachstum zeigt die Veränderung des {BIP}. Das außenwirtschaftliche Gleichgewicht zeigt der {Außenhandelssaldo}. Die gerechte Verteilung zeigt der {Gini-Wert}. Den Umwelt- und Klimaschutz misst man am {CO₂-Ausstoß}.",
          distractors: ["Rendite", "Rabatt"]
        },
        {
          type: "quiz",
          title: "A2 · Welcher Wert passt?",
          questions: [
            {
              q: "Welche Inflationsrate passt am besten zum Ziel Preisstabilität?",
              hint: "Preisstabilität heißt „leicht steigende Preise“ – nicht „gar keine Preiserhöhung“.",
              options: ["− 3 % (die Preise sinken)", "0 % (die Preise stehen still)", "2 % (die Preise steigen leicht)", "12 % (die Preise steigen stark)"],
              answer: 2,
              explain: "Richtig ist 2 %. Sinkende Preise (Deflation) sind gefährlich: Firmen verdienen weniger und stellen weniger ein."
            }
          ]
        },
        {
          type: "calc",
          title: "A3 · Veränderung in Prozent",
          case: `Formel: <b>(neu − alt) : alt · 100</b><br>Rechne die Veränderung in Prozent aus.`,
          rows: [
            { label: "a) Warenkorb: (102 − 100) : 100 · 100", value: 2 },
            { label: "b) Schokoriegel: (1,10 − 1,00) : 1,00 · 100", value: 10 },
            { label: "c) BIP: (408 − 400) : 400 · 100", value: 2 }
          ],
          hints: ["Ziehe zuerst das Alte vom Neuen ab – das ist die Veränderung (neu − alt).", "Teile die Veränderung durch den alten Wert und mal 100.", "Lösungsweg a) (102 − 100) : 100 · 100 = 2 %. b) = 10 %. c) = 2 %."],
          result: "a) 2 % (passt zur Preisstabilität) · b) 10 % (Ziel klar verfehlt) · c) 2 % (angemessenes Wachstum)."
        },
        {
          type: "sentence",
          title: "A4 · Erklären",
          case: "Warum sind 2 % Inflation besser als 0 %? Baue den Antwortsatz.",
          text: "Ein bisschen Inflation ist besser als null Prozent, weil sich die Preise dann {*langsam anpassen|einfrieren} können und Firmen nicht in Schwierigkeiten geraten. Sinkende Preise heißen {*Deflation|Inflation} – sie können die Wirtschaft {*bremsen|ankurbeln}.",
          hint: "Überlege, was passiert, wenn alle Preise fallen: Firmen verdienen weniger und stellen weniger ein.",
          explain: "Nicht 0 % ist das Ziel, sondern leicht steigende Preise (≈ 2 %). Fallende Preise (Deflation) können eine Wirtschaft bremsen."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann sagen, welche Kennzahl zu welchem Ziel gehört.",
            "Ich kann einfache Veränderungen in Prozent berechnen.",
            "Ich kann eine Inflationsrate beurteilen (≈ 2 % ist gut)."
          ]
        }
      ]
    },

    /* ══════════════ STUNDE 3 · ZIELHARMONIEN ══════════════ */
    {
      id: "zielharmonien",
      group: "Lernsituation 3.10",
      title: "Wenn Ziele sich helfen",
      kicker: "LS 3.10 · Stunde 3",
      minutes: 20,
      help: `<h3>Zielharmonie</h3>
             <p>Zwei Ziele <strong>helfen sich</strong>: Eine Maßnahme bringt beide Ziele voran.</p>
             <h3>Beispiele</h3>
             ${sechseck(vwEcken(), { title: "Harmonien: Diese Ziele helfen sich", lines: VW_HARMONIEN })}
             <ul><li>Solarpark → Umwelt/Klima + Vollbeschäftigung (Jobs)</li>
             <li>Günstiger Nahverkehr → Umwelt/Klima + gerechte Verteilung</li>
             <li>Kindergeld erhöhen → gerechte Verteilung + Wirtschaftswachstum</li>
             <li>Stabile Preise → Preisstabilität + gerechte Verteilung (Inflation trifft Menschen mit wenig Geld stärker)</li>
             <li>Wirtschaftswachstum → Vollbeschäftigung: Firmen verkaufen mehr und brauchen mehr Arbeitskräfte.</li></ul>
             <h3>Denk-Werkzeug</h3>
             <p>1) Welche Ziele werden besser? 2) Welche schlechter? 3) Wer profitiert – und wer nicht?</p>`,
      steps: [
        {
          type: "slides",
          title: "Ein Schritt – zwei Ziele",
          slides: [
            {
              style: "dark",
              kicker: "Fallakte Oberhausen · 3/6",
              title: "Solarpark geplant",
              body: `<p>Die Stadt Oberhausen plant einen großen <strong>Solarpark</strong> auf einem alten Gewerbegebiet.</p>
                     <p>Die Bürgermeisterin: „Wir schützen das Klima und schaffen neue Arbeitsplätze.“</p>
                     <p class="note">Zwei Ziele werden mit einer Maßnahme besser – das nennt man Zielharmonie.</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Harmonie heißt: Ziele helfen sich.",
              body: `<dl class="terms">
                       <dt>Zielharmonie</dt><dd>Eine Maßnahme bringt zwei Ziele gleichzeitig voran.</dd>
                       <dt>Beispiel</dt><dd>Solarpark: Umwelt- und Klimaschutz + Vollbeschäftigung (Jobs).</dd>
                       <dt>Denk-Werkzeug</dt><dd>Welche Ziele werden besser? Welche schlechter? Wer profitiert – wer nicht?</dd>
                     </dl>
                     ${sechseck(vwEcken(), { title: "Harmonien: Diese Ziele helfen sich", lines: VW_HARMONIEN })}
                     <p class="note">Beispiele zu allen Linien: Merkkasten über den ?-Knopf.</p>`
            },
            {
              style: "accent",
              kicker: "Merksatz",
              title: "Ein Schritt – zwei Ziele erreicht.",
              body: `<p>Harmonie bedeutet nicht, dass alle Ziele besser werden – nur, dass <strong>zwei</strong> zusammenpassen.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "A1 · Harmonie oder nicht?",
          prompt: "Hilft die Maßnahme mindestens zwei Zielen gleichzeitig?",
          hints: ["Eine Harmonie braucht eine Maßnahme, die zwei Ziele gleichzeitig besser macht.", "Zähle, wie viele Ziele besser werden. Wird nur ein Ziel besser, ist es keine Harmonie."],
          categories: ["Zielharmonie", "nur ein Ziel wird besser"],
          items: [
            { text: "Solarpark bauen: Klima schützen und Jobs schaffen.", cat: 0 },
            { text: "Filteranlage im Kraftwerk: weniger Abgase, die Zahl der Jobs bleibt gleich.", cat: 1 },
            { text: "Kostenloses Kita-Essen: Eltern können arbeiten (Beschäftigung), Familien mit wenig Geld werden entlastet (Verteilung).", cat: 0 },
            { text: "Radwege ausbauen: weniger Abgase und neue Jobs.", cat: 0 },
            { text: "Mehr Personal für die Arbeitsagentur: Arbeitslose finden schneller eine Stelle.", cat: 1 }
          ]
        },
        {
          type: "cloze",
          title: "A2 · Harmonie beschreiben",
          prompt: "Drei Wörter passen nicht.",
          text: "Manchmal hilft eine Maßnahme zwei Zielen gleichzeitig. So ein Fall heißt {Zielharmonie}. Ein Beispiel ist der Bau von {Solaranlagen}: Dabei wird das Klima geschützt und es entstehen neue {Arbeitsplätze}. Auch günstiger Nahverkehr ist eine Harmonie: Weniger Autos fahren – das hilft dem Ziel {Umweltschutz}. Auch Menschen mit wenig Geld können Bus fahren – das hilft dem Ziel {Gerechte Verteilung}.",
          distractors: ["Zielkonflikt", "Skonto", "Werbung"]
        },
        {
          type: "sentence",
          title: "A3 · Zwei Ziele benennen",
          case: "Ergänze die Harmonie mit den passenden Zielen.",
          text: "Kindergeld zu erhöhen verbessert die {*gerechte Verteilung|Preisstabilität} und das {*Wirtschaftswachstum|außenwirtschaftliche Gleichgewicht}, weil Familien mehr Geld {*ausgeben|sparen}.",
          hint: "Familien mit mehr Geld geben mehr aus – das hilft dem Wachstum und der gerechten Verteilung.",
          explain: "Eine Maßnahme verbessert zwei Ziele: gerechte Verteilung (Familien haben mehr) und Wirtschaftswachstum (mehr Ausgaben)."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann erklären, was eine Zielharmonie ist.",
            "Ich kann einer Maßnahme zwei Ziele zuordnen.",
            "Ich kann mit dem Denk-Werkzeug prüfen, wer profitiert."
          ]
        }
      ]
    },

    /* ══════════════ STUNDE 4 · ZIELKONFLIKTE ══════════════ */
    {
      id: "zielkonflikte",
      group: "Lernsituation 3.10",
      title: "Wenn Ziele sich streiten",
      kicker: "LS 3.10 · Stunde 4",
      minutes: 20,
      help: `<h3>Zielkonflikt</h3>
             <p>Ziel A wird besser, dafür wird Ziel B <strong>schlechter</strong>.</p>
             <h3>Typische Konflikte</h3>
             ${sechseck(vwEcken(), { title: "Konflikte: Diese Ziele streiten sich", lines: [vwLinie("konflikt", 0, 1), vwLinie("konflikt", 3, 4), vwLinie("konflikt", 3, 1), vwLinie("konflikt", 0, 2), vwLinie("harmonie", 3, 0)] })}
             <ul><li>Mehr Jobs ↔ stabile Preise: Wer mehr verdient, gibt mehr aus → Firmen erhöhen die Preise.</li>
             <li>Mehr Wachstum ↔ Umweltschutz: Mehr produzieren heißt mehr Energie, Verkehr und CO₂.</li>
             <li>Mehr Wachstum ↔ stabile Preise: Wächst die Wirtschaft sehr stark, wird mehr gekauft → die Preise steigen.</li>
             <li>Mehr Jobs ↔ außenwirtschaftliches Gleichgewicht: Mehr Konsum heißt mehr Importe.</li>
             <li>Niedrige Zinsen ↔ Preisstabilität: Billige Kredite → mehr Investitionen, aber auch steigende Preise.</li></ul>
             <p>Zum Vergleich (Harmonie): Wirtschaftswachstum hilft der Vollbeschäftigung – Firmen brauchen mehr Arbeitskräfte.</p>
             <h3>Deshalb „magisch“</h3>
             <p>Nie sind alle sechs Ziele gleichzeitig optimal – die Politik muss abwägen.</p>`,
      steps: [
        {
          type: "slides",
          title: "Warum das Sechseck magisch ist",
          slides: [
            {
              style: "dark",
              kicker: "Fallakte Oberhausen · 4/6",
              title: "Steuersenkung im Stadtrat",
              body: `<p>Die Bundesregierung senkt die Steuern. Firmen investieren mehr – auch in Oberhausen siedeln sich neue Firmen an.</p>
                     <p>Ergebnis: Es entstehen <strong>Jobs</strong>. Die Menschen haben mehr Geld und kaufen mehr – deshalb steigen die <strong>Preise</strong>.</p>
                     <p class="note">Zwei Ziele streiten sich: mehr Beschäftigung ↔ stabile Preise.</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Konflikt heißt: ein Ziel auf Kosten des anderen.",
              body: `<dl class="terms">
                       <dt>Zielkonflikt</dt><dd>Ziel A wird besser, dafür wird Ziel B schlechter.</dd>
                       <dt>Beispiel</dt><dd>Mehr Beschäftigung → mehr Einkommen → mehr Nachfrage → die Preise steigen.</dd>
                       <dt>Folge</dt><dd>Die Politik muss abwägen – nie geht alles gleichzeitig.</dd>
                     </dl>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Jobs ↔ Preise. Wachstum ↔ Umwelt.",
              body: `<p>Wer mehr verdient, gibt mehr aus → die Preise steigen. Mehr Produktion kostet Energie und verbraucht Natur. Starkes Wachstum → mehr Nachfrage → die Preise steigen.</p>
                     ${sechseck(vwEcken(), { lines: [vwLinie("konflikt", 0, 1), vwLinie("konflikt", 3, 4), vwLinie("konflikt", 3, 1), vwLinie("harmonie", 3, 0)] })}
                     <p class="note">Zum Vergleich: Wachstum und Vollbeschäftigung helfen sich (Harmonie).</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "A1 · Konflikt oder Harmonie?",
          prompt: "Streiten sich die Ziele – oder helfen sie sich?",
          hints: ["Konflikt: Ein Ziel wird besser, dafür ein anderes schlechter.", "Harmonie: Eine Maßnahme macht zwei Ziele gleichzeitig besser."],
          categories: ["Zielkonflikt", "Zielharmonie"],
          items: [
            { text: "Solarpark bauen: neue Jobs und mehr Klimaschutz.", cat: 1 },
            { text: "Die Zinsen sinken: Firmen investieren mehr, aber die Preise steigen.", cat: 0 },
            { text: "Höhere Löhne: gerechtere Verteilung, aber die Preise steigen.", cat: 0 },
            { text: "Ein Pfandsystem schafft Arbeitsplätze und spart Müll.", cat: 1 },
            { text: "Neue Autobahn: mehr Jobs, aber mehr Abgase und Flächenverbrauch.", cat: 0 }
          ]
        },
        {
          type: "cloze",
          title: "A2 · Mini-Fall",
          prompt: "Zwei Wörter passen nicht.",
          text: "Senkt die Regierung die Steuern, investieren die Firmen mehr. Es entstehen mehr {Arbeitsplätze}, und die Beschäftigung steigt. Gleichzeitig fragen die Menschen mehr nach, deshalb steigen die {Preise}. Es entsteht ein Zielkonflikt: Das Ziel {Vollbeschäftigung} wird besser, das Ziel {Preisstabilität} wird schlechter.",
          distractors: ["Außenhandel", "Umweltschutz"]
        },
        {
          type: "sentence",
          title: "A3 · Begründen",
          case: "Eine neue Autobahn wird gebaut. Welches Ziel wird besser, welches schlechter? Baue den Antwortsatz.",
          text: "Eine neue Autobahn verbessert die {*Vollbeschäftigung|Preisstabilität}, schadet aber dem {*Umwelt- und Klimaschutz|Wirtschaftswachstum}. Das nennt man {*Zielkonflikt|Zielharmonie}.",
          hint: "Beim Bau und am Rand der Autobahn entstehen Jobs. Mehr Verkehr bringt aber mehr Abgase und Flächenverbrauch.",
          explain: "Die Autobahn schafft Jobs (Vollbeschäftigung), aber mehr Verkehr und Abgase schaden dem Umwelt- und Klimaschutz. Ein Ziel wird besser, ein anderes schlechter – das ist ein Zielkonflikt."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann erklären, was ein Zielkonflikt ist.",
            "Ich kann einen Konflikt in einem Beispiel erkennen.",
            "Ich kann bei einer Maßnahme sagen, welches Ziel besser und welches schlechter wird."
          ]
        }
      ]
    },

    /* ══════════════ STUNDE 5 · STREITFALL OBERHAUSEN ══════════════ */
    {
      id: "streitfall-oberhausen",
      group: "Lernsituation 3.10",
      title: "Streitfall Oberhausen",
      kicker: "LS 3.10 · Stunde 5",
      minutes: 25,
      help: `<h3>So beurteilst du einen Fall</h3>
             <p>1) <strong>Betroffene Ziele</strong> benennen: Welche Ziele des Sechsecks sind wichtig?</p>
             <p>2) <strong>Abwägen:</strong> Was spricht dafür (Pro), was dagegen (Contra)?</p>
             <p>3) <strong>Folgen prüfen:</strong> Was passiert kurzfristig, was langfristig? Wer gewinnt, wer verliert?</p>
             <p>4) <strong>Kompromiss finden:</strong> Wie könnten beide Seiten leben?</p>
             <h3>Beispiele für Kompromisse</h3>
             <p>Ausgleichsflächen · Solaranlagen aufs Dach · begrenzte Lkw-Zeiten · Jobticket.</p>`,
      steps: [
        {
          type: "slides",
          title: "Logistikzentrum auf der Brachfläche",
          slides: [
            {
              style: "dark",
              kicker: "Fallakte Oberhausen · 5/6",
              title: "Der Fall",
              body: `<p>Auf einer großen <strong>Brachfläche an der Autobahn</strong> plant Oberhausen ein Logistikzentrum. Ein Online-Kaufhaus will dort Pakete umschlagen.</p>
                     <p><strong>Dafür:</strong> 400 neue Arbeitsplätze · mehr Gewerbesteuer für die Stadt (Geld für Schulen und Schwimmbäder).</p>
                     <p><strong>Dagegen:</strong> Die Fläche war als Naherholungspark geplant · mehr Lkw-Verkehr, Lärm und Abgase · der Boden wird versiegelt.</p>
                     ${sechseck(vwEcken([], [0, 3, 4]), { title: "Diese Ziele sind betroffen", lines: [vwLinie("harmonie", 0, 3), vwLinie("konflikt", 3, 4), vwLinie("konflikt", 0, 4)] })}`
            },
            {
              kicker: "So geht ihr vor",
              title: "Die Stadtratssitzung",
              body: `<ul>
                       <li>Rollen ziehen und in Gruppen beraten.</li>
                       <li>In der Rolle: betroffene Ziele finden und Pro/Contra abwägen.</li>
                       <li>Sitzung: jede Rolle hält einen Redebeitrag (max. 1 Minute).</li>
                       <li>Beschluss: einen Kompromissantrag formulieren und abstimmen.</li>
                     </ul>`
            },
            {
              kicker: "Grundwissen",
              title: "Abwägen und Urteilen",
              body: `<dl class="terms">
                       <dt>Pro und Contra</dt><dd>Was spricht für das Projekt, was dagegen?</dd>
                       <dt>Folgen</dt><dd>Kurzfristig vs. langfristig · wer gewinnt, wer verliert?</dd>
                       <dt>Kompromiss</dt><dd>Eine Lösung, mit der beide Seiten leben können.</dd>
                     </dl>`
            }
          ]
        },
        {
          type: "sort",
          title: "A1 · Welche Ziele sind betroffen?",
          prompt: "Sortiere: besonders betroffen oder nicht im Mittelpunkt?",
          hints: ["Frag dich bei jedem Ziel: Spielt es in diesem Fall wirklich eine Rolle?", "Ein einzelnes Logistikzentrum verändert nicht den Export/Import und nicht die Preise in ganz Deutschland."],
          categories: ["besonders betroffen", "nicht im Mittelpunkt"],
          items: [
            { text: "Vollbeschäftigung (400 neue Jobs)", cat: 0 },
            { text: "Umwelt- und Klimaschutz", cat: 0 },
            { text: "Wirtschaftswachstum (Investition, mehr Gewerbesteuer)", cat: 0 },
            { text: "Preisstabilität in ganz Deutschland", cat: 1 },
            { text: "Außenwirtschaftliches Gleichgewicht", cat: 1 }
          ]
        },
        {
          type: "sort",
          title: "A2 · Pro und Contra",
          prompt: "Ordne jedes Argument zu.",
          hints: ["Pro heißt: Es spricht für das Logistikzentrum.", "Contra heißt: Es spricht dagegen."],
          categories: ["Dafür (Pro)", "Dagegen (Contra)"],
          items: [
            { text: "400 neue Arbeitsplätze", cat: 0 },
            { text: "Mehr Steuern für Schulen und Schwimmbäder", cat: 0 },
            { text: "Der Park als Naherholung geht verloren", cat: 1 },
            { text: "Mehr Lärm und Abgase", cat: 1 },
            { text: "Attraktiver Standort für Firmen", cat: 0 },
            { text: "Der Boden wird versiegelt", cat: 1 }
          ]
        },
        {
          type: "cards",
          title: "Die Rollen der Sitzung",
          cards: [
            { front: "Stadtkämmerin", back: "Interesse: die Kasse der Stadt. Ziele: Wirtschaftswachstum (Gewerbesteuer), Vollbeschäftigung. Kompromiss: nur mit Ausgleichsflächen und gesicherter Erschließung." },
            { front: "IHK-Vertreter", back: "Interesse: starker Wirtschaftsstandort. Ziele: Vollbeschäftigung, Wirtschaftswachstum. Kompromiss: Solar aufs Dach und feste Lkw-Zeiten." },
            { front: "Anwohnerinitiative „Naherholung“", back: "Interesse: Ruhe, Grün, lebenswertes Viertel. Ziel: Umwelt- und Klimaschutz. Kompromiss: Lärmschutzwall, Grünstreifen, Nachtfahrverbot." },
            { front: "Umweltverband", back: "Interesse: Klima, Boden, Artenvielfalt. Ziel: Umwelt- und Klimaschutz. Kompromiss: Dach-Solar, Ausgleichsflächen, Jobticket." },
            { front: "Logistikunternehmen", back: "Interesse: schneller Paketumschlag an der Autobahn. Ziele: Vollbeschäftigung, Wirtschaftswachstum. Kompromiss: Dach-Solar und Jobticket für die Beschäftigten." },
            { front: "Sitzungsleitung (Moderation)", back: "Führt die Sitzung, erteilt das Wort, achtet auf die Zeit und lässt am Ende über den Kompromissantrag abstimmen." }
          ]
        },
        {
          type: "sentence",
          title: "A3 · Stellung nehmen",
          case: "Bau eine begründete Stellungnahme mit einem Kompromiss.",
          text: "Ich bin {*dafür|dagegen}, weil 400 Arbeitsplätze für Oberhausen wichtig sind. Wichtig ist dabei das Ziel {*Vollbeschäftigung|Preisstabilität}. Ein Kompromiss könnte sein: Solaranlagen aufs {*Dach|Dorf} und {*Ausgleichsflächen|Parkplätze} für die Natur.",
          hint: "Eine gute Stellungnahme: Position + betroffenes Ziel + Begründung + Kompromiss.",
          explain: "Beispiel: dafür – 400 Arbeitsplätze (Vollbeschäftigung) – Kompromiss: Solar aufs Dach und Ausgleichsflächen. Wichtig ist, dass Position und Begründung zusammenpassen."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann betroffene Ziele in einem Fall erkennen.",
            "Ich kann Pro- und Contra-Argumente abwägen.",
            "Ich kann einen Kompromiss vorschlagen."
          ]
        }
      ]
    },

    /* ══════════════ STUNDE 6 · TRAINING ══════════════ */
    {
      id: "training",
      group: "Lernsituation 3.10",
      title: "Fit fürs Thema – Training",
      kicker: "LS 3.10 · Stunde 6",
      minutes: 22,
      help: `<h3>Das Wichtigste auf einen Blick</h3>
             <p>Sechs Ziele: Vollbeschäftigung · Preisstabilität · außenwirtschaftliches Gleichgewicht · Wirtschaftswachstum · Umwelt- und Klimaschutz · gerechte Verteilung.</p>
             <p>Gemessen mit Kennzahlen. Zwischen den Zielen gibt es <strong>Harmonien</strong> und <strong>Konflikte</strong> – deshalb ist das Sechseck „magisch“.</p>
             ${sechseck(vwEcken(), { title: "Alle Harmonien und Konflikte", lines: [...VW_HARMONIEN, vwLinie("konflikt", 0, 1), vwLinie("konflikt", 3, 4), vwLinie("konflikt", 3, 1), vwLinie("konflikt", 0, 2)] })}
             <p>Achtung: Ob zwei Ziele sich helfen oder streiten, hängt von der <strong>Maßnahme</strong> ab. Jobs und Umwelt: Solarpark = Harmonie, neue Autobahn = Konflikt.</p>
             <h3>Zum Nachschlagen</h3>
             <p>Öffne das Thema <strong>Alle Lernkarten</strong>.</p>`,
      steps: [
        {
          type: "quiz",
          title: "A1 · Quiz zum Sechseck",
          questions: [
            {
              q: "Wie viele Ziele hat das magische Sechseck?",
              options: ["4", "5", "6", "8"],
              answer: 2,
              explain: "Das magische Sechseck hat sechs Ziele."
            },
            {
              q: "Mit welcher Kennzahl wird die Preisstabilität gemessen?",
              options: ["Arbeitslosenquote", "Inflationsrate", "CO₂-Ausstoß", "Außenhandelssaldo"],
              answer: 1,
              explain: "Preisstabilität → Inflationsrate (Ziel: ≈ 2 %)."
            },
            {
              q: "„Wer arbeiten will, findet eine Stelle“ – welches Ziel ist das?",
              options: ["Preisstabilität", "Vollbeschäftigung", "Wachstum", "Gerechte Verteilung"],
              answer: 1,
              explain: "Das ist die Vollbeschäftigung – gemessen mit der Arbeitslosenquote."
            },
            {
              q: "Welcher Fall ist ein Zielkonflikt?",
              options: ["Solarpark schafft Jobs und schützt das Klima.", "Mehr Jobs führen zu steigenden Preisen.", "Günstiger Nahverkehr hilft Umwelt und Verteilung.", "Stabile Preise helfen Menschen mit wenig Geld."],
              answer: 1,
              explain: "Mehr Jobs → Preise steigen: Ziel A besser, Ziel B schlechter – ein Zielkonflikt."
            },
            {
              q: "Womit misst man den Umwelt- und Klimaschutz?",
              options: ["Gini-Wert", "BIP-Veränderung", "CO₂-Ausstoß", "Inflationsrate"],
              answer: 2,
              explain: "Umwelt- und Klimaschutz → CO₂-Ausstoß."
            },
            {
              q: "Was bedeutet „magisch“ beim magischen Sechseck?",
              options: ["Alle Ziele sind gleichzeitig leicht zu erreichen.", "Die Ziele kann man nicht messen.", "Alle Ziele gleichzeitig optimal zu erreichen, ist fast unmöglich.", "Es gibt nur vier Ziele."],
              answer: 2,
              explain: "Magisch heißt: nie sind alle sechs Ziele gleichzeitig optimal erreicht."
            },
            {
              q: "Welcher Fall ist eine Zielharmonie?",
              options: ["Mehr Autos in der Stadt: mehr Verkehr, mehr Abgase.", "Radwege ausbauen: weniger Abgase und neue Jobs.", "Höhere Steuern: Firmen investieren weniger.", "Höhere Löhne: die Preise steigen."],
              answer: 1,
              explain: "Radwege: Umwelt/Klima (weniger Abgase) + Vollbeschäftigung (Jobs) – eine Harmonie."
            },
            {
              q: "In welchem Gesetz stehen die ersten vier Ziele?",
              options: ["Grundgesetz", "Stabilitätsgesetz (§ 1 StabG)", "BGB", "HGB"],
              answer: 1,
              explain: "Die ersten vier Ziele nennt § 1 des Stabilitätsgesetzes (StabG)."
            }
          ]
        },
        {
          type: "cloze",
          title: "A2 · Zusammenfassung",
          prompt: "Drei Wörter passen nicht.",
          text: "Die Wirtschaftspolitik verfolgt in Deutschland {sechs} Ziele. Dieses Zielbündel heißt {magisches Sechseck}. Es heißt so, weil man nie alle Ziele {gleichzeitig} optimal erreichen kann. Zwischen den Zielen gibt es {Zielkonflikte} und Harmonien. Prüfen kann man die Ziele mit {Kennzahlen}, zum Beispiel mit der Inflationsrate. Sie sollte bei etwa {zwei} Prozent liegen.",
          distractors: ["acht", "Skonto", "Rabatt"]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann alle sechs Ziele nennen.",
            "Ich kann Kennzahlen den Zielen zuordnen.",
            "Ich kann Konflikte und Harmonien unterscheiden."
          ]
        }
      ]
    },

    /* ══════════════ LERNKARTEN ══════════════ */
    {
      id: "lernkarten",
      group: "Wiederholen",
      title: "Alle Lernkarten",
      kicker: "Nachschlagen",
      minutes: 8,
      steps: [
        {
          type: "cards",
          title: "Lernkarten Magisches Sechseck",
          cards: [
            { front: "Wirtschaftspolitik", back: "Alle Maßnahmen des Staates, die die Wirtschaft regeln – Gesetze, Steuern, Förderungen." },
            { front: "Magisches Sechseck", back: "Die sechs Ziele der Wirtschaftspolitik zusammen. „Magisch“, weil nie alle sechs gleichzeitig optimal erreicht werden." },
            { front: "Vollbeschäftigung", back: "Möglichst alle, die arbeiten können und wollen, haben eine Stelle. Kennzahl: Arbeitslosenquote." },
            { front: "Preisstabilität", back: "Die Preise steigen nur langsam. EZB-Ziel: ≈ 2 % pro Jahr. Kennzahl: Inflationsrate." },
            { front: "Wirtschaftswachstum", back: "Die Wirtschaftsleistung (BIP) wächst stetig und angemessen. Kennzahl: Veränderung des BIP." },
            { front: "Außenwirtschaftliches Gleichgewicht", back: "Exporte und Importe halten sich etwa die Waage. Kennzahl: Außenhandelssaldo (Außenbeitrag: Export − Import), gut ≈ 0." },
            { front: "Gerechte Verteilung", back: "Einkommen und Vermögen sind fair verteilt. Kennzahl: Gini-Wert – 0 = alle haben gleich viel, 1 = einer hat alles. Je kleiner, desto gerechter." },
            { front: "Umwelt- und Klimaschutz", back: "Natur und Klima werden geschützt. Kennzahl: CO₂-Ausstoß." },
            { front: "Inflationsrate", back: "Preisanstieg eines Warenkorbs (Verbraucherpreisindex) in einem Jahr. Gut: ≈ 2 %." },
            { front: "Kennzahl", back: "Eine Zahl, mit der man prüft, ob ein Ziel erreicht ist – z. B. die Inflationsrate für die Preisstabilität." },
            { front: "Zielharmonie", back: "Eine Maßnahme verbessert zwei Ziele gleichzeitig – z. B. Solarpark: Klimaschutz + Arbeitsplätze." },
            { front: "Zielkonflikt", back: "Ein Ziel wird besser, dafür wird ein anderes schlechter – z. B. mehr Jobs, aber steigende Preise." },
            { front: "Stabilitätsgesetz", back: "Gesetz von 1967. § 1 nennt vier Ziele (= magisches Viereck): hoher Beschäftigungsstand, stabiles Preisniveau, außenwirtschaftliches Gleichgewicht, stetiges und angemessenes Wachstum. Das Sechseck ergänzt gerechte Verteilung und Umweltschutz." },
            { front: "Deflation", back: "Sinkende Preise. Gefährlich: Firmen verdienen weniger und stellen weniger ein." },
            { front: "Denk-Werkzeug", back: "1) Welche Ziele werden besser? 2) Welche schlechter? 3) Wer profitiert – und wer nicht?" },
            { front: "Abwägen / Urteil", back: "Pro und Contra prüfen, Folgen bedenken und sich dann begründet entscheiden." }
          ]
        }
      ]
    },

    /* ══════════════ ÜBUNGSKLAUSUR ══════════════ */
    {
      id: "uebungsklausur",
      group: "Klausurtraining",
      title: "Übungsklausur Magisches Sechseck",
      kicker: "Übungsklausur",
      minutes: 45,
      exam: {
        minutes: 45,
        tools: "keine Hilfsmittel",
        // Notenschlüssel HBBK (HS/HH/KA einheitlich): 90 / 76 / 63 / 50 / 30 %
        grading: [[90, "1", "sehr gut"], [76, "2", "gut"], [63, "3", "befriedigend"], [50, "4", "ausreichend"], [30, "5", "mangelhaft"], [0, "6", "ungenügend"]]
      },
      steps: [
        {
          type: "quiz",
          title: "A1 · Grundwissen (6 P.)",
          points: 6,
          review: "sechs-ziele",
          questions: [
            { q: "Wie viele Ziele hat das magische Sechseck?", options: ["4", "5", "6", "8"], answer: 2 },
            { q: "Welches Ziel bedeutet: Die Preise steigen nur langsam?", options: ["Vollbeschäftigung", "Preisstabilität", "Wirtschaftswachstum", "Gerechte Verteilung"], answer: 1 },
            { q: "In welchem Gesetz stehen die ersten vier Ziele?", options: ["Grundgesetz", "BGB", "Stabilitätsgesetz (§ 1 StabG)", "HGB"], answer: 2 },
            { q: "Mit welcher Kennzahl prüft man das außenwirtschaftliche Gleichgewicht?", options: ["Außenhandelssaldo", "Inflationsrate", "Arbeitslosenquote", "Gini-Wert"], answer: 0 },
            { q: "Was bedeutet „magisch“ beim magischen Sechseck?", options: ["Alle Ziele sind gleichzeitig leicht erreichbar.", "Die Ziele kann man nicht messen.", "Alle Ziele gleichzeitig optimal zu erreichen, ist fast unmöglich.", "Es gibt nur vier Ziele."], answer: 2 },
            { q: "Welches Ziel prüft man mit dem Gini-Wert?", options: ["Gerechte Einkommens- und Vermögensverteilung", "Umwelt- und Klimaschutz", "Wirtschaftswachstum", "Außenwirtschaftliches Gleichgewicht"], answer: 0 }
          ]
        },
        {
          type: "sort",
          title: "A2 · Ziel oder Kennzahl? (4 P.)",
          points: 4,
          review: "kennzahlen",
          prompt: "Ordne zu: Ist es ein Ziel des Sechsecks oder eine Kennzahl?",
          categories: ["Ziel", "Kennzahl"],
          items: [
            { text: "Vollbeschäftigung", cat: 0 },
            { text: "Inflationsrate", cat: 1 },
            { text: "Umwelt- und Klimaschutz", cat: 0 },
            { text: "Außenhandelssaldo", cat: 1 },
            { text: "Arbeitslosenquote", cat: 1 },
            { text: "Wirtschaftswachstum", cat: 0 }
          ]
        },
        {
          type: "cloze",
          title: "A3 · Ziele und Kennzahlen (6 P.)",
          points: 6,
          review: "kennzahlen",
          prompt: "Zwei Wörter passen nicht.",
          text: "Die {Preisstabilität} prüft man mit der Inflationsrate. Sie sollte bei etwa {zwei} Prozent liegen. Die Vollbeschäftigung prüft man mit der {Arbeitslosenquote}. Das {Wirtschaftswachstum} zeigt die Veränderung des BIP. Ein ausgeglichener {Außenhandelssaldo} zeigt das außenwirtschaftliche Gleichgewicht. Den Umweltschutz misst man am {CO₂-Ausstoß}.",
          distractors: ["null", "Gini-Wert"]
        },
        {
          type: "calc",
          title: "A4 · Veränderung in Prozent (6 P.)",
          points: 6,
          review: "kennzahlen",
          case: `Formel: <b>(neu − alt) : alt · 100</b><br>Berechne die Veränderung in Prozent.`,
          rows: [
            { label: "a) Warenkorb: (204 − 200) : 200 · 100", value: 2 },
            { label: "b) Fahrrad: (330 − 300) : 300 · 100", value: 10 },
            { label: "c) BIP: (510 − 500) : 500 · 100", value: 2 }
          ]
        },
        {
          type: "sort",
          title: "A5 · Konflikt oder Harmonie? (4 P.)",
          points: 4,
          review: "zielkonflikte",
          prompt: "Streiten sich die Ziele – oder helfen sie sich?",
          categories: ["Zielkonflikt", "Zielharmonie"],
          items: [
            { text: "Kostenloser Nahverkehr: Umweltschutz und gerechte Verteilung.", cat: 1 },
            { text: "Niedrigere Zinsen: mehr Investitionen, aber steigende Preise.", cat: 0 },
            { text: "Kindergeld erhöhen: gerechte Verteilung und Wachstum.", cat: 1 },
            { text: "Mehr Produktion: mehr Wachstum, aber mehr CO₂.", cat: 0 }
          ]
        },
        {
          type: "sentence",
          title: "A6 · Stellung nehmen (3 P.)",
          points: 3,
          review: "streitfall-oberhausen",
          case: "Nimm Stellung zum Logistikzentrum und nenne einen Kompromiss.",
          text: "Für das Logistikzentrum spricht, dass {*400 Arbeitsplätze|5 Arbeitsplätze} entstehen. Dagegen spricht der verlorene {*Naherholungspark|Gewinn}. Ein Kompromiss wäre {*Solaranlagen aufs Dach|mehr Lkw} plus Ausgleichsflächen für die Natur.",
          explain: "Position + betroffenes Ziel + Begründung + Kompromiss. Punkte für jede richtig gewählte Begründung."
        }
      ]
    }

  ]
});
