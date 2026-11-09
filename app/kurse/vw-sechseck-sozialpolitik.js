/* ============================================================
   KURS: VW · HHOF/KAOA – Sechseck + Sozialpolitik (Wiederholung)
   LS 3.10 (Magisches Sechseck) + LS 14 (Sozialpolitik)
   Roter Faden: Fallakte Oberhausen und Familie Thüne
   Quellen: Arbeitsblätter und Wiederholungsblatt aus dem HBBK-Workspace
   ============================================================ */

const VWS_ZIELE = ["Vollbeschäftigung", "Preisstabilität", "Außenwirtschaftliches Gleichgewicht",
  "Wirtschaftswachstum", "Umwelt- und Klimaschutz", "Gerechte Verteilung"];

const vwsEcken = (subs = [], hi = []) => VWS_ZIELE.map((text, i) => ({ text, sub: subs[i], hi: hi.includes(i) }));
const vwsLinie = (kind, from, to) => ({ from, to, kind });

const VWS_HARMONIEN = [
  vwsLinie("harmonie", 4, 0), vwsLinie("harmonie", 4, 5), vwsLinie("harmonie", 5, 3),
  vwsLinie("harmonie", 1, 5), vwsLinie("harmonie", 3, 0)
];

const VWS_KONFLIKTE = [
  vwsLinie("konflikt", 0, 1), vwsLinie("konflikt", 3, 4), vwsLinie("konflikt", 3, 1), vwsLinie("konflikt", 0, 2)
];

LERNRAUM.subjects.push({
  id: "vw-sechseck-sozialpolitik",
  fach: "VW",
  added: "2026-11-09",
  name: "Sechseck + Sozialpolitik",
  course: "VW · HHOF/KAOA",
  glyph: "V",
  description: "Wiederholung für die HHOF: das magische Sechseck mit Zielen, Kennzahlen, Harmonien und Konflikten – und die Sozialpolitik mit Lenas Abrechnung, Zielen, Gerechtigkeitsleitbildern und einer Stellungnahme.",
  topics: [

    /* ══════════════ MAGISCHES SECHSEck · SECHS ZIELE ══════════════ */
    {
      id: "sechs-ziele",
      group: "Magisches Sechseck",
      title: "Was soll Wirtschaft leisten?",
      kicker: "LS 3.10 · Wiederholung",
      minutes: 18,
      help: `<h3>Das magische Sechseck</h3>
             <p>Die <strong>sechs Ziele</strong> der Wirtschaftspolitik gehören zusammen:</p>
             ${sechseck(vwsEcken(["StabG 1967", "StabG 1967", "StabG 1967", "StabG 1967"]), { title: "Die sechs Ziele", center: "Wirtschafts-\npolitik" })}
             <ul>
               <li><strong>Vollbeschäftigung</strong> – wer arbeiten kann und will, findet eine Stelle.</li>
               <li><strong>Preisstabilität</strong> – die Preise steigen nur langsam.</li>
               <li><strong>Außenwirtschaftliches Gleichgewicht</strong> – Exporte und Importe halten sich die Waage.</li>
               <li><strong>Wirtschaftswachstum</strong> – die Wirtschaft wächst stetig und angemessen.</li>
               <li><strong>Umwelt- und Klimaschutz</strong> – Natur und Klima werden geschützt.</li>
               <li><strong>Gerechte Verteilung</strong> – Einkommen und Vermögen sind fair verteilt.</li>
             </ul>
             <p><strong>Magisch</strong> heißt: Nie sind alle sechs Ziele gleichzeitig optimal erreicht. Die Politik muss immer wieder <strong>abwägen</strong>.</p>`,
      steps: [
        {
          type: "slides",
          title: "Sechs Dinge gleichzeitig",
          slides: [
            {
              style: "dark",
              kicker: "Fallakte Oberhausen · 7/7",
              title: "Die Bürgermeisterin hat sechs Aufträge",
              body: `<p>Die Stadt Oberhausen will <strong>sechs Ziele gleichzeitig</strong> erreichen:</p>
                     <p><strong>Arbeit · stabile Preise · fairer Handel · Wachstum · Umwelt · Gerechtigkeit.</strong></p>
                     <p>„Wir können nicht alles gleichzeitig haben“, sagt sie. „Wir müssen abwägen.“</p>`
            },
            {
              kicker: "Lernziel",
              title: "Ich kann die <mark>sechs Ziele</mark> nennen und in eigenen Worten erklären.",
              body: `<p class="box">Die sechs Ziele zusammen heißen <strong>magisches Sechseck</strong>. Sie stehen für das, was Wirtschaftspolitik erreichen soll.</p>`
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
              body: `${sechseck(vwsEcken(["StabG 1967", "StabG 1967", "StabG 1967", "StabG 1967"]), { center: "Wirtschafts-\npolitik" })}
                     <ul>
                       <li><strong>1. Vollbeschäftigung</strong> – wer arbeiten kann und will, findet eine Stelle.</li>
                       <li><strong>2. Preisstabilität</strong> – die Preise steigen nur langsam.</li>
                       <li><strong>3. Außenwirtschaftliches Gleichgewicht</strong> – Export und Import halten sich die Waage.</li>
                       <li><strong>4. Wirtschaftswachstum</strong> – die Wirtschaft wächst stetig und angemessen.</li>
                       <li><strong>5. Umwelt- und Klimaschutz</strong> – Natur und Klima werden geschützt.</li>
                       <li><strong>6. Gerechte Verteilung</strong> – Einkommen und Vermögen sind fair verteilt.</li>
                     </ul>
                     <p class="note">Die Ziele 1–4 stehen schon im Stabilitätsgesetz von 1967 (StabG).</p>`
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
          title: "Noch tiefer: der ganze Sechseck-Kurs",
          text: "Wenn du ein Thema ausführlicher wiederholen willst, öffne den Kurs „Magisches Sechseck“ mit allen sechs Stunden.",
          href: "#/f/vw-magisches-sechseck"
        },
        {
          type: "link",
          title: "Extra: Das Sechseck in 3D",
          text: "Interaktives Modell: Ziele mit Reglern einstellen und Harmonien und Konflikte in Oberhausen beobachten.",
          href: "materialien/VW/Magisches Sechseck/magisches-sechseck.html"
        },
        {
          type: "sort",
          title: "A1 · Welches Ziel ist gemeint?",
          prompt: "Ordne jede Situation dem Ziel zu, das am besten passt.",
          hints: ["Frag dich: Worum geht es – Arbeit, Preise, Handel oder Natur?", "Bei der Tante geht es um Verkauf ins Ausland und Einkauf dort – also um das Gleichgewicht, nicht um einen einzelnen Export."],
          categories: ["Vollbeschäftigung", "Preisstabilität", "Außenwirtschaftl. Gleichgewicht", "Umwelt- und Klimaschutz"],
          items: [
            { text: "Mia sucht eine Ausbildungsstelle.", cat: 0 },
            { text: "Die Preise steigen stark.", cat: 1 },
            { text: "Die Tante verkauft Maschinen ins Ausland und kauft dort ein.", cat: 2 },
            { text: "Der alte Stadtpark soll bebaut werden.", cat: 3 },
            { text: "Eine Firma sucht dringend neue Auszubildende.", cat: 0 },
            { text: "Der Wocheneinkauf wird immer teurer.", cat: 1 },
            { text: "Exporte und Importe halten sich die Waage.", cat: 2 },
            { text: "Radwege statt neuer Straßen.", cat: 3 }
          ]
        },
        {
          type: "cloze",
          title: "A2 · Was heißt das Sechseck?",
          prompt: "Drei Wörter passen nicht.",
          text: "Die Wirtschaftspolitik will {sechs} Ziele gleichzeitig erreichen. Dieses Zielbündel heißt {magisches Sechseck}. Ein Ziel ist die {Preisstabilität}: Die Preise sollen nur langsam steigen. Ein anderes Ziel ist die {Vollbeschäftigung}: Wer arbeiten will, findet eine Stelle. Weil sich die Ziele widersprechen können, muss die Politik {abwägen}. Auch der Schutz der {Umwelt} und ein stetiges {Wachstum} gehören dazu.",
          distractors: ["Wettbewerb", "sparen", "Inventur"]
        },
        {
          type: "sentence",
          title: "A3 · Begründen",
          case: "Warum heißt das Zielbündel <b>magisch</b>? Baue den Antwortsatz aus den Bausteinen.",
          text: "Das Zielbündel heißt {*magisches Sechseck|Stabilitätsgesetz}. Es heißt magisch, weil man nie alle sechs Ziele {*gleichzeitig optimal|einzeln nacheinander} erreichen kann. Die Politik muss deshalb immer wieder {*abwägen|kürzen}.",
          hints: ["„Magisch“ hat nichts mit Zauberei zu tun – es ist ein Bild dafür, dass etwas fast nicht geht.", "Wenn alle sechs Ziele zusammen nicht passen, muss man sich zwischen ihnen entscheiden."],
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

    /* ══════════════ MAGISCHES SECHSEck · KENNZAHLEN ══════════════ */
    {
      id: "kennzahlen",
      group: "Magisches Sechseck",
      title: "Ziele messbar machen",
      kicker: "LS 3.10 · Wiederholung",
      minutes: 18,
      help: `<h3>Ziele brauchen Kennzahlen</h3>
             <p><strong>Kennzahl</strong> = eine Zahl, die den Zustand eines Ziels beschreibt. Nur so kann man prüfen, ob ein Ziel erreicht ist.</p>
             ${sechseck(vwsEcken(["Arbeitslosenquote ↓", "Inflation ≈ 2 %", "Außenbeitrag ≈ 0", "BIP + ≈ 2 %", "CO₂-Ausstoß ↓", "Gini-Wert ↓"]), { title: "Sechs Ziele und ihre Kennzahlen" })}
             <ul>
               <li>Vollbeschäftigung → Arbeitslosenquote (möglichst <strong>niedrig</strong>)</li>
               <li>Preisstabilität → Inflationsrate (EZB-Ziel: ≈ <strong>2 %</strong>)</li>
               <li>Außenwirtschaftliches Gleichgewicht → Außenhandelssaldo (Export − Import; ≈ <strong>0</strong>)</li>
               <li>Wirtschaftswachstum → Veränderung des BIP (Faustregel: ≈ <strong>2 %</strong>)</li>
               <li>Umwelt- und Klimaschutz → CO₂-Ausstoß (möglichst <strong>niedrig</strong>)</li>
               <li>Gerechte Verteilung → Gini-Wert (0 = alle gleich, 1 = einer hat alles; je <strong>kleiner</strong>, desto gerechter)</li>
             </ul>`,
      steps: [
        {
          type: "slides",
          title: "Woran erkennt man ein Ziel?",
          slides: [
            {
              style: "dark",
              kicker: "Fallakte Oberhausen · 2/6",
              title: "Im Rathaus",
              body: `<p>„Wie sollen wir wissen, ob wir unser Ziel erreicht haben?“, fragt die Bürgermeisterin.</p>
                     <p>Die Kämmerin antwortet: „Wir brauchen <strong>Zahlen</strong> – eine Kennzahl für jedes Ziel.“</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Eine Zahl für jedes Ziel",
              body: `<dl class="terms">
                       <dt>Kennzahl</dt><dd>Eine Zahl, mit der man prüft, ob ein Ziel erreicht ist.</dd>
                       <dt>Inflationsrate</dt><dd>Wie stark die Preise in einem Jahr steigen. Ziel: ≈ 2 %.</dd>
                       <dt>Arbeitslosenquote</dt><dd>Anteil der Arbeitslosen an allen Erwerbspersonen. Je niedriger, desto besser.</dd>
                     </dl>`
            },
            {
              kicker: "Überblick",
              title: "Ziel → Kennzahl → „gut“ ist …",
              body: `${sechseck(vwsEcken(["Arbeitslosenquote ↓", "Inflation ≈ 2 %", "Außenbeitrag ≈ 0", "BIP + ≈ 2 %", "CO₂-Ausstoß ↓", "Gini-Wert ↓"]), { title: "Sechs Ziele und ihre Kennzahlen" })}
                     <p class="note">Ein Wert ist nicht automatisch gut, nur weil er steigt. Bei Arbeitslosigkeit und CO₂ ist <strong>niedrig</strong> gut.</p>`
            },
            {
              kicker: "Kennzahlen erklärt",
              title: "Preise und Wirtschaftsleistung",
              body: `<ul>
                       <li><strong>Inflationsrate:</strong> Preisanstieg eines typischen Warenkorbs. 2 % gelten als stabil.</li>
                       <li><strong>BIP:</strong> Wert aller Güter und Dienstleistungen, die in einem Jahr im Inland produziert werden.</li>
                       <li><strong>Veränderung des BIP:</strong> (neues BIP − altes BIP) : altes BIP · 100.</li>
                     </ul>`
            },
            {
              kicker: "Kennzahlen erklärt",
              title: "Handel und Verteilung",
              body: `<ul>
                       <li><strong>Außenhandelssaldo:</strong> Exporte − Importe. Ist er etwa 0, halten sich beide die Waage.</li>
                       <li><strong>Gini-Wert:</strong> misst die Ungleichheit bei Einkommen und Vermögen. 0 = alle haben gleich viel, 1 = einer hat alles.</li>
                     </ul>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "2 % Inflation sind das Ziel der EZB.",
              body: `<p>Stabile Preise schützen besonders Menschen mit wenig Geld. Zu starke Preissteigerungen fressen ihr Budget.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "A1 · Ziel oder Kennzahl?",
          prompt: "Ordne zu: Ist es ein Ziel des Sechsecks oder eine Kennzahl?",
          hints: ["Ein Ziel sagt, was erreicht werden soll. Eine Kennzahl ist die Zahl, mit der man es misst.", "„Vollbeschäftigung“ ist ein Ziel – „Arbeitslosenquote“ ist die Kennzahl dazu."],
          categories: ["Ziel", "Kennzahl"],
          items: [
            { text: "Vollbeschäftigung", cat: 0 },
            { text: "Inflationsrate", cat: 1 },
            { text: "Umwelt- und Klimaschutz", cat: 0 },
            { text: "Außenhandelssaldo", cat: 1 },
            { text: "Arbeitslosenquote", cat: 1 },
            { text: "Wirtschaftswachstum", cat: 0 },
            { text: "Gini-Wert", cat: 1 },
            { text: "Preisstabilität", cat: 0 }
          ]
        },
        {
          type: "quiz",
          title: "A2 · Kennzahlen zuordnen",
          questions: [
            {
              q: "Mit welcher Kennzahl wird die Preisstabilität gemessen?",
              options: ["Arbeitslosenquote", "Inflationsrate", "CO₂-Ausstoß", "Außenhandelssaldo"],
              answer: 1,
              explain: "Preisstabilität → Inflationsrate. Das Ziel der EZB sind etwa 2 %."
            },
            {
              q: "Welcher Wert gilt bei der Inflation als stabil?",
              options: ["0 %", "etwa 2 %", "etwa 10 %", "so hoch wie möglich"],
              answer: 1,
              explain: "Die Europäische Zentralbank strebt mittelfristig etwa 2 % an."
            },
            {
              q: "Was misst der Gini-Wert?",
              options: ["Die Arbeitslosigkeit", "Die Preissteigerung", "Die Ungleichheit von Einkommen und Vermögen", "Den Exportüberschuss"],
              answer: 2,
              explain: "Je kleiner der Gini-Wert, desto gleicher sind Einkommen und Vermögen verteilt."
            },
            {
              q: "Welches Ziel prüft man mit dem Außenhandelssaldo?",
              options: ["Vollbeschäftigung", "Preisstabilität", "Außenwirtschaftliches Gleichgewicht", "Umwelt- und Klimaschutz"],
              answer: 2,
              explain: "Der Außenhandelssaldo ist Export minus Import. Ausgeglichen ist er etwa bei 0."
            },
            {
              q: "Mit welcher Kennzahl wird der Umwelt- und Klimaschutz gemessen?",
              options: ["Gini-Wert", "BIP-Veränderung", "CO₂-Ausstoß", "Inflationsrate"],
              answer: 2,
              explain: "Umwelt- und Klimaschutz → CO₂-Ausstoß; niedrig ist gut."
            }
          ]
        },
        {
          type: "calc",
          title: "A3 · Veränderung in Prozent",
          decimals: 2,
          case: `Formel: <b>(neu − alt) : alt · 100</b><br>Berechne die Veränderung in Prozent.`,
          rows: [
            { label: "a) Warenkorb: (204 − 200) : 200 · 100", value: 2 },
            { label: "b) Fahrrad: (330 − 300) : 300 · 100", value: 10 },
            { label: "c) BIP: (510 − 500) : 500 · 100", value: 2 }
          ],
          hint: "Ziehe zuerst den alten Wert vom neuen Wert ab. Teile das Ergebnis durch den alten Wert und multipliziere mit 100.",
          result: "a) 2 % · b) 10 % · c) 2 %"
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann jedem Ziel eine Kennzahl zuordnen.",
            "Ich kann erklären, wann ein Kennzahlenwert gut ist.",
            "Ich kann eine Veränderung in Prozent berechnen."
          ]
        }
      ]
    },

    /* ══════════════ MAGISCHES SECHSEck · HARMONIEN/KONFLIKTE ══════════════ */
    {
      id: "harmonien-konflikte",
      group: "Magisches Sechseck",
      title: "Wenn Ziele sich helfen oder streiten",
      kicker: "LS 3.10 · Wiederholung",
      minutes: 20,
      help: `<h3>Harmonie und Konflikt</h3>
             <p><strong>Zielharmonie:</strong> Eine Maßnahme verbessert <strong>zwei Ziele gleichzeitig</strong>.</p>
             <p><strong>Zielkonflikt:</strong> Ein Ziel wird besser, dafür wird ein <strong>anderes schlechter</strong>.</p>
             ${sechseck(vwsEcken(), { title: "Harmonien und Konflikte", lines: [...VWS_HARMONIEN, ...VWS_KONFLIKTE] })}
             <p>Ob zwei Ziele sich helfen oder streiten, hängt von der <strong>Maßnahme</strong> ab. Ein Solarpark schafft Jobs und schützt das Klima. Eine neue Autobahn schafft Jobs, schadet aber dem Klima.</p>`,
      steps: [
        {
          type: "slides",
          title: "Ein Schritt – zwei Ziele",
          slides: [
            {
              style: "dark",
              kicker: "Fallakte Oberhausen · 4/6",
              title: "Steuersenkung im Stadtrat",
              body: `<p>Eine Steuersenkung soll Firmen zu mehr Investitionen bewegen. Das kann <strong>Jobs</strong> und <strong>Wachstum</strong> stärken.</p>
                     <p>Kritiker warnen: Wenn mehr Geld im Umlauf ist, könnten die <strong>Preise steigen</strong>.</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Harmonie heißt: Ziele helfen sich.",
              body: `<p class="box"><strong>Zielharmonie:</strong> Eine Maßnahme verbessert zwei Ziele gleichzeitig.</p>
                     <p>Beispiel: Ein Solarpark auf einem alten Gewerbegebiet schafft Arbeitsplätze und senkt den CO₂-Ausstoß.</p>
                     ${sechseck(vwsEcken([], [0, 4]), { title: "Solarpark: Arbeit + Klima", lines: [vwsLinie("harmonie", 4, 0)] })}`
            },
            {
              kicker: "Grundwissen",
              title: "Konflikt heißt: ein Ziel auf Kosten des anderen.",
              body: `<p class="box"><strong>Zielkonflikt:</strong> Ein Ziel wird besser, dafür wird ein anderes schlechter.</p>
                     <p>Beispiel: Mehr Jobs führen zu mehr Nachfrage – und dadurch können die Preise steigen.</p>
                     ${sechseck(vwsEcken([], [0, 1]), { title: "Jobs ↔ Preise", lines: [vwsLinie("konflikt", 0, 1)] })}`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Die Maßnahme entscheidet.",
              body: `<p>Jobs und Umwelt können sich helfen (Solarpark) oder streiten (Autobahn). Deshalb schaut man immer auf die <strong>konkrete Maßnahme</strong>.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "A1 · Harmonie oder Konflikt?",
          prompt: "Streiten sich die Ziele – oder helfen sie sich?",
          hints: ["Frag dich: Wird bei dieser Maßnahme ein zweites Ziel besser oder schlechter?", "Achte auf Wörter wie „aber“, „dafür“ und „gleichzeitig“."],
          categories: ["Zielharmonie", "Zielkonflikt"],
          items: [
            { text: "Solarpark: neue Jobs und weniger CO₂.", cat: 0 },
            { text: "Steuersenkung: mehr Investitionen, aber steigende Preise.", cat: 1 },
            { text: "Höheres Kindergeld: mehr Gerechtigkeit und mehr Nachfrage.", cat: 0 },
            { text: "Mehr Konsum: mehr Wachstum, aber mehr Importe.", cat: 1 },
            { text: "Kostenloser Nahverkehr: Entlastung und Umweltschutz.", cat: 0 },
            { text: "Neue Autobahn: neue Jobs, aber mehr Abgase.", cat: 1 },
            { text: "Mehr Produktion: mehr Wachstum, aber mehr CO₂.", cat: 1 },
            { text: "Radwege: neue Jobs und weniger Abgase.", cat: 0 }
          ]
        },
        {
          type: "quiz",
          title: "A2 · Kurz-Check",
          questions: [
            {
              q: "Was ist eine Zielharmonie?",
              options: ["Ein Ziel wird besser, ein anderes schlechter.", "Zwei Ziele werden gleichzeitig besser.", "Alle Ziele sind gleichzeitig erreicht.", "Ein Ziel wird gar nicht gemessen."],
              answer: 1,
              explain: "Bei einer Harmonie hilft eine Maßnahme zwei Zielen gleichzeitig."
            },
            {
              q: "Was ist ein Zielkonflikt?",
              options: ["Zwei Ziele werden gleichzeitig besser.", "Ein Ziel wird besser, ein anderes schlechter.", "Alle Ziele bleiben gleich.", "Ein Ziel wird nur mit einer Kennzahl gemessen."],
              answer: 1,
              explain: "Beim Konflikt erkauft man ein Ziel mit einem Nachteil bei einem anderen Ziel."
            },
            {
              q: "Welcher Fall ist ein Zielkonflikt?",
              options: ["Solarpark schafft Jobs und schützt das Klima.", "Mehr Jobs führen zu steigenden Preisen.", "Günstiger Nahverkehr hilft Umwelt und Verteilung.", "Stabile Preise helfen Menschen mit wenig Geld."],
              answer: 1,
              explain: "Mehr Jobs → Preise steigen: Ziel A besser, Ziel B schlechter."
            },
            {
              q: "Welcher Fall ist eine Zielharmonie?",
              options: ["Mehr Autos: mehr Verkehr, mehr Abgase.", "Radwege ausbauen: weniger Abgase und neue Jobs.", "Höhere Steuern: Firmen investieren weniger.", "Höhere Löhne: die Preise steigen."],
              answer: 1,
              explain: "Radwege: Umwelt/Klima (weniger Abgase) und Vollbeschäftigung (Jobs) werden besser."
            }
          ]
        },
        {
          type: "sentence",
          title: "A3 · Begründen",
          case: "Eine neue Autobahn wird gebaut. Welches Ziel wird besser, welches schlechter? Baue den Antwortsatz.",
          text: "Eine neue Autobahn verbessert die {*Vollbeschäftigung|Preisstabilität}, schadet aber dem {*Umwelt- und Klimaschutz|Wirtschaftswachstum}. Das nennt man {*Zielkonflikt|Zielharmonie}.",
          hints: ["Beim Bau und am Rand der Autobahn entstehen Jobs.", "Mehr Verkehr bringt mehr Abgase und Flächenverbrauch."],
          explain: "Die Autobahn schafft Jobs (Vollbeschäftigung), aber mehr Verkehr und Abgase schaden dem Umwelt- und Klimaschutz. Ein Ziel wird besser, ein anderes schlechter – das ist ein Zielkonflikt."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann eine Zielharmonie erklären.",
            "Ich kann einen Zielkonflikt erklären.",
            "Ich kann bei einer Maßnahme sagen, welches Ziel besser und welches schlechter wird."
          ]
        }
      ]
    },

    /* ══════════════ MAGISCHES SECHSEck · FALLAKTE ══════════════ */
    {
      id: "fallakte-oberhausen",
      group: "Magisches Sechseck",
      title: "Streitfall Oberhausen",
      kicker: "LS 3.10 · Wiederholung",
      minutes: 22,
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
          title: "Die Fallakte (7/7)",
          slides: [
            {
              style: "dark",
              kicker: "Fallakte Oberhausen · 7/7",
              title: "Fünf Vorschläge im Stadtrat",
              body: `<ul>
                       <li><strong>Solarpark:</strong> neue Jobs und weniger CO₂.</li>
                       <li><strong>Steuersenkung:</strong> mehr Investitionen, aber möglicherweise steigende Preise.</li>
                       <li><strong>Höheres Kindergeld:</strong> mehr Gerechtigkeit und mehr Nachfrage.</li>
                       <li><strong>Mehr Konsum:</strong> mehr Wachstum, aber mehr Importe.</li>
                       <li><strong>Kostenloser Nahverkehr:</strong> Entlastung und Umweltschutz.</li>
                     </ul>`
            },
            {
              style: "dark",
              kicker: "Der Streitfall",
              title: "Logistikzentrum auf der Brachfläche",
              body: `<p>Auf einer großen <strong>Brachfläche an der Autobahn</strong> plant Oberhausen ein Logistikzentrum.</p>
                     <p><strong>Dafür:</strong> 400 neue Arbeitsplätze · mehr Gewerbesteuer für die Stadt.</p>
                     <p><strong>Dagegen:</strong> Die Fläche war als Naherholungspark geplant · mehr Lkw-Verkehr, Lärm und Abgase · der Boden wird versiegelt.</p>`
            },
            {
              kicker: "Betroffene Ziele",
              title: "Drei Ziele stehen im Mittelpunkt",
              body: `${sechseck(vwsEcken([], [0, 3, 4]), { title: "Diese Ziele sind betroffen", lines: [vwsLinie("harmonie", 0, 3), vwsLinie("konflikt", 3, 4), vwsLinie("konflikt", 0, 4)] })}
                     <p class="note">Vollbeschäftigung und Wachstum werden besser. Der Umwelt- und Klimaschutz wird schlechter.</p>`
            },
            {
              kicker: "So geht ihr vor",
              title: "Abwägen und Urteilen",
              body: `<ul>
                       <li>Betroffene Ziele finden.</li>
                       <li>Pro und Contra sammeln.</li>
                       <li>Folgen für die Menschen prüfen.</li>
                       <li>Einen Kompromiss vorschlagen.</li>
                     </ul>`
            }
          ]
        },
        {
          type: "sort",
          title: "A1 · Harmonie oder Konflikt?",
          prompt: "Ordne die fünf Vorschläge aus der Fallakte zu.",
          hints: ["Ein Vorschlag ist eine Harmonie, wenn zwei Ziele gleichzeitig besser werden.", "Ein Vorschlag ist ein Konflikt, wenn ein Ziel besser und ein anderes schlechter wird."],
          categories: ["Zielharmonie", "Zielkonflikt"],
          items: [
            { text: "Solarpark", cat: 0 },
            { text: "Steuersenkung", cat: 1 },
            { text: "Höheres Kindergeld", cat: 0 },
            { text: "Mehr Konsum", cat: 1 },
            { text: "Kostenloser Nahverkehr", cat: 0 }
          ]
        },
        {
          type: "sort",
          title: "A2 · Welche Ziele sind betroffen?",
          prompt: "Sortiere: besonders betroffen oder nicht im Mittelpunkt?",
          hints: ["Frag dich bei jedem Ziel: Spielt es in diesem Fall wirklich eine Rolle?", "Ein einzelnes Logistikzentrum verändert nicht die Preise in ganz Deutschland und nicht den Export/Import."],
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
          type: "sentence",
          title: "A3 · Stellung nehmen",
          case: "Baue eine begründete Stellungnahme mit einem Kompromiss.",
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

    /* ══════════════ SOZIALPOLITIK · WOFÜR ZAHLT LENA? ══════════════ */
    {
      id: "wofuer-zahlt-lena",
      group: "Sozialpolitik",
      title: "Wofür zahlt Lena?",
      kicker: "LS 14 · Wiederholung",
      minutes: 20,
      help: `<h3>Vom Brutto zum Netto</h3>
             <p><strong>Bruttoentgelt</strong> = Lohn vor allen Abzügen. <strong>Nettoentgelt</strong> = was nach allen Abzügen bleibt.</p>
             <p><strong>Abgabenquote</strong> = alle Abzüge : Bruttoentgelt · 100.</p>
             ${ablauf([
               { text: "Bruttoentgelt", value: "3.000,00 €" },
               { op: "− Lohnsteuer", value: "315,00 €", note: "Steuer" },
               { op: "− Sozialversicherung", value: "646,50 €", note: "Beiträge" },
               { text: "Nettoentgelt", value: "2.038,50 €", hi: true }
             ], { title: "Lenas Abrechnung (fiktiv, gerundet)" })}
             <h3>Steuer oder Beitrag?</h3>
             <p><strong>Steuer:</strong> keine direkte Gegenleistung, z. B. Lohnsteuer. <strong>Beitrag:</strong> begründet einen Anspruch, z. B. Rente oder Krankengeld. <strong>Transferleistung:</strong> Zahlung des Staates an Menschen, z. B. Wohngeld oder Kindergeld.</p>`,
      steps: [
        {
          type: "slides",
          title: "Lenas Frage",
          slides: [
            {
              style: "dark",
              kicker: "Familie Thüne",
              title: "„Der Staat nimmt mir fast ein Drittel.“",
              body: `<p>Lena Thüne arbeitet in der Stadtverwaltung und verdient <strong>3.000,00 € brutto</strong>.</p>
                     <p>Beim Abendessen fragt sie: „Wenn der Staat schon so viel nimmt – <strong>wofür</strong> genau? Und gibt er dafür etwas zurück?“</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Brutto, Abzüge, Netto",
              body: `${ablauf([
                       { text: "Bruttoentgelt", value: "3.000,00 €" },
                       { op: "− Lohnsteuer", value: "315,00 €", note: "Steuer" },
                       { op: "− Sozialversicherung", value: "646,50 €", note: "Beiträge" },
                       { text: "Nettoentgelt", value: "2.038,50 €", hi: true }
                     ], { title: "Lenas Abrechnung (fiktiv, gerundet)" })}
                     <p class="note">Die Abzüge sind echt – aber ein Teil davon sind Beiträge mit Gegenleistung.</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Steuer oder Beitrag?",
              body: `<dl class="terms">
                       <dt>Steuer</dt><dd>Zahlung ohne direkten Anspruch auf eine Gegenleistung, z. B. Lohnsteuer.</dd>
                       <dt>Beitrag</dt><dd>Zahlung an die Sozialversicherung, die einen Anspruch begründet, z. B. auf Rente oder Krankengeld.</dd>
                       <dt>Transferleistung</dt><dd>Zahlung des Staates an Menschen, z. B. Wohngeld oder Kindergeld.</dd>
                     </dl>`
            },
            {
              kicker: "Wofür gibt der Staat Geld aus?",
              title: "Gemeinschaft und Hilfe",
              body: `<ul>
                       <li><strong>Gemeinschaftsaufgaben:</strong> Schulen, Straßen, Polizei, Feuerwehr.</li>
                       <li><strong>Soziale Sicherung:</strong> Rente, Krankenversicherung, Arbeitslosengeld.</li>
                       <li><strong>Hilfe für Bedürftige:</strong> Wohngeld, Grundsicherung, Kindergeld.</li>
                     </ul>`
            },
            {
              style: "accent",
              kicker: "Merksatz",
              title: "Nicht jede Abgabe ist einfach weg.",
              body: `<p>Beiträge sichern Ansprüche. Steuern finanzieren Aufgaben für alle. Transferleistungen helfen Menschen, die Unterstützung brauchen.</p>`
            }
          ]
        },
        {
          type: "cloze",
          title: "A1 · Begriffe ergänzen",
          prompt: "Zwei Wörter passen nicht.",
          text: "Der Lohn vor allen Abzügen heißt {Bruttoentgelt}. Was nach allen Abzügen bleibt, ist das {Nettoentgelt}. Alle Abzüge zusammen, geteilt durch das Brutto und mal 100, ergeben die {Abgabenquote}. Beiträge zur {Sozialversicherung} begründen einen Anspruch. Die Lohnsteuer tut das nicht.",
          distractors: ["Transferleistung", "Beitragssatz"]
        },
        {
          type: "sort",
          title: "A2 · Wozu dient die Abgabe?",
          prompt: "Ordne jede Abgabe oder Zahlung zu.",
          hints: ["Frage dich: Gibt es durch die Zahlung einen direkten Anspruch?", "Wohngeld ist eine Hilfe für Menschen mit niedrigem Einkommen – keine Gegenleistung für eine Einzahlung."],
          categories: ["Gegenleistung (Anspruch)", "Gemeinschaftsaufgabe", "Hilfe für Bedürftige"],
          items: [
            { text: "Beitrag zur Rentenversicherung", cat: 0 },
            { text: "Lohnsteuer für Schulen", cat: 1 },
            { text: "Wohngeld", cat: 2 },
            { text: "Beitrag zur Krankenversicherung", cat: 0 },
            { text: "Polizei aus Steuern", cat: 1 }
          ]
        },
        {
          type: "quiz",
          title: "A3 · Kurz-Check",
          questions: [
            {
              q: "Was ist eine Steuer?",
              options: ["Eine Zahlung, die einen direkten Anspruch begründet.", "Eine Zahlung ohne direkten Anspruch auf eine Gegenleistung.", "Eine Zahlung nur an bedürftige Familien.", "Ein Rabatt auf den Lohn."],
              answer: 1,
              explain: "Steuern finanzieren Gemeinschaftsaufgaben, begründen aber keinen direkten Anspruch wie eine Versicherung."
            },
            {
              q: "Was ist ein Beitrag zur Sozialversicherung?",
              options: ["Eine Zahlung ohne Gegenleistung.", "Eine Zahlung, die einen Anspruch begründet, z. B. auf Rente.", "Eine freiwillige Spende.", "Ein Zuschlag für Überstunden."],
              answer: 1,
              explain: "Beiträge begründen Ansprüche, zum Beispiel auf Rente, Krankengeld oder Arbeitslosengeld."
            },
            {
              q: "Was ist eine Transferleistung?",
              options: ["Ein Beitrag zur Rentenversicherung", "Eine Zahlung des Staates an Menschen, z. B. Wohngeld", "Eine Steuer auf Tabak", "Ein Kredit der Bank"],
              answer: 1,
              explain: "Transferleistungen sind Zahlungen des Staates, etwa Wohngeld, Kindergeld oder Grundsicherung."
            },
            {
              q: "Wie berechnet man die Abgabenquote?",
              options: ["Brutto : Netto · 100", "Alle Abzüge : Brutto · 100", "Netto : Brutto · 100", "Lohnsteuer : Netto · 100"],
              answer: 1,
              explain: "Abgabenquote = alle Abzüge geteilt durch das Bruttoentgelt, mal 100."
            },
            {
              q: "Welche Abgabe begründet einen Anspruch?",
              options: ["Lohnsteuer", "Beitrag zur Krankenversicherung", "Mehrwertsteuer", "Gewerbesteuer"],
              answer: 1,
              explain: "Der Beitrag zur Krankenversicherung begründet einen Anspruch auf Leistungen bei Krankheit."
            }
          ]
        },
        {
          type: "link",
          title: "Extra: Lenas Gehalt in 3D",
          text: "Interaktives Modell: Segmente antippen, auseinanderziehen und die Abgabenquote sehen. Dazu ein Denkmodell zu Sicherheit und Gerechtigkeit.",
          href: "materialien/VW/Sozialpolitik/sozialpolitik-werkstatt.html"
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann Bruttoentgelt und Nettoentgelt unterscheiden.",
            "Ich kann Steuer und Beitrag unterscheiden.",
            "Ich kann Beispiele für Transferleistungen nennen."
          ]
        }
      ]
    },

    /* ══════════════ SOZIALPOLITIK · LENAS ABRECHNUNG ══════════════ */
    {
      id: "lenas-abrechnung",
      group: "Sozialpolitik",
      title: "Lenas Abrechnung nachrechnen",
      kicker: "LS 14 · Wiederholung",
      minutes: 18,
      help: `<h3>Lenas Abrechnung (fiktiv, gerundet)</h3>
             <p>Bruttoentgelt: <strong>3.000,00 €</strong></p>
             <ul>
               <li>Lohnsteuer: 315,00 €</li>
               <li>Krankenversicherung: 256,50 €</li>
               <li>Pflegeversicherung: 72,00 €</li>
               <li>Rentenversicherung: 279,00 €</li>
               <li>Arbeitslosenversicherung: 39,00 €</li>
             </ul>
             <p>Summe der Abzüge: <strong>961,50 €</strong> · Nettoentgelt: <strong>2.038,50 €</strong></p>
             <p class="formula">Abgabenquote = alle Abzüge : Brutto · 100</p>
             <p class="formula">SV-Anteil = SV-Beiträge : alle Abzüge · 100</p>
             ${ablauf([
               { text: "Bruttoentgelt", value: "3.000,00 €" },
               { op: "− Lohnsteuer", value: "315,00 €", note: "10,5 %" },
               { op: "− Sozialversicherung", value: "646,50 €", note: "21,55 %" },
               { text: "Nettoentgelt", value: "2.038,50 €", hi: true }
             ], { title: "Von Brutto zu Netto" })}`,
      steps: [
        {
          type: "slides",
          title: "Die Abrechnung",
          slides: [
            {
              style: "dark",
              kicker: "Familie Thüne",
              title: "Lenas Abrechnung",
              body: `<p><strong>Brutto:</strong> 3.000,00 €</p>
                     <ul>
                       <li>Lohnsteuer 315,00 €</li>
                       <li>Krankenversicherung 256,50 €</li>
                       <li>Pflegeversicherung 72,00 €</li>
                       <li>Rentenversicherung 279,00 €</li>
                       <li>Arbeitslosenversicherung 39,00 €</li>
                     </ul>
                     <p><strong>Netto: 2.038,50 €</strong></p>`
            },
            {
              kicker: "Überblick",
              title: "Von Brutto zu Netto",
              body: `${ablauf([
                       { text: "Bruttoentgelt", value: "3.000,00 €" },
                       { op: "− Lohnsteuer", value: "315,00 €", note: "Steuer" },
                       { op: "− Sozialversicherung", value: "646,50 €", note: "Beiträge" },
                       { text: "Nettoentgelt", value: "2.038,50 €", hi: true }
                     ], { title: "Lenas Abrechnung (fiktiv, gerundet)" })}`
            },
            {
              kicker: "Formeln",
              title: "Zwei Quoten",
              body: `<p class="formula">Abgabenquote = alle Abzüge : Brutto · 100</p>
                     <p class="formula">SV-Anteil = SV-Beiträge : alle Abzüge · 100</p>
                     <p class="note">Die Abgabenquote zeigt, wie viel vom Brutto insgesamt abgeht. Der SV-Anteil zeigt, wie viel davon Sozialversicherung ist.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Fast ein Drittel – und zwei Drittel davon mit Anspruch.",
              body: `<p>32,05 % des Bruttos gehen ab. Davon sind 67,2 % Sozialversicherungsbeiträge, die Ansprüche begründen.</p>`
            }
          ]
        },
        {
          type: "calc",
          title: "A1 · Summen und Netto",
          decimals: 2,
          case: `Lenas Abrechnung: Brutto <b>3.000,00 €</b>. Ziehe die Abzüge ab.`,
          rows: [
            { label: "Bruttoentgelt", value: 3000 },
            { label: "− Lohnsteuer", value: 315 },
            { label: "− Krankenversicherung", value: 256.5 },
            { label: "− Pflegeversicherung", value: 72 },
            { label: "− Rentenversicherung", value: 279 },
            { label: "− Arbeitslosenversicherung", value: 39 },
            { label: "= Summe der Abzüge", value: 961.5, sum: true },
            { label: "= Nettoentgelt", value: 2038.5, sum: true }
          ],
          hint: "Addiere zuerst die fünf Abzüge. Ziehe die Summe dann vom Brutto ab.",
          result: "Summe der Abzüge: 961,50 € · Netto: 2.038,50 €"
        },
        {
          type: "calc",
          title: "A2 · Quoten berechnen",
          decimals: 2,
          case: `Nutze die Werte aus A1. Schreibe den Rechenweg im Kopf mit.`,
          rows: [
            { label: "Summe der Sozialversicherungsbeiträge", value: 646.5 },
            { label: "Abgabenquote in % (alle Abzüge : Brutto · 100)", value: 32.05 },
            { label: "SV-Anteil an allen Abzügen in %", value: 67.2, dec: 1 }
          ],
          hint: "Sozialversicherung: Kranken, Pflege, Rente und Arbeitslosenversicherung zusammen. Abgabenquote: 961,50 : 3.000 · 100.",
          result: "SV-Beiträge: 646,50 € · Abgabenquote: 32,05 % · SV-Anteil: 67,2 %"
        },
        {
          type: "quiz",
          title: "A3 · Kurz-Check",
          questions: [
            {
              q: "Wie hoch ist die Summe der Sozialversicherungsbeiträge?",
              options: ["315,00 €", "646,50 €", "961,50 €", "2.038,50 €"],
              answer: 1,
              explain: "256,50 + 72,00 + 279,00 + 39,00 = 646,50 €."
            },
            {
              q: "Wie hoch ist die Abgabenquote?",
              options: ["10,5 %", "21,55 %", "32,05 %", "67,2 %"],
              answer: 2,
              explain: "961,50 : 3.000 · 100 = 32,05 %."
            },
            {
              q: "Wie hoch ist der Anteil der Sozialversicherung an allen Abzügen?",
              options: ["32,05 %", "50 %", "67,2 %", "90 %"],
              answer: 2,
              explain: "646,50 : 961,50 · 100 = 67,2 %. Etwa zwei Drittel der Abzüge sind Beiträge mit Anspruch."
            },
            {
              q: "Wie hoch ist Lenas Nettoentgelt?",
              options: ["2.038,50 €", "2.354,00 €", "3.000,00 €", "1.961,50 €"],
              answer: 0,
              explain: "3.000,00 − 961,50 = 2.038,50 €."
            }
          ]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann die Summe der Abzüge berechnen.",
            "Ich kann die Abgabenquote berechnen.",
            "Ich kann den Anteil der Sozialversicherung an den Abzügen berechnen."
          ]
        }
      ]
    },

    /* ══════════════ SOZIALPOLITIK · ZIELE ══════════════ */
    {
      id: "ziele-sozialpolitik",
      group: "Sozialpolitik",
      title: "Sicherheit oder Gerechtigkeit?",
      kicker: "LS 14 · Wiederholung",
      minutes: 18,
      help: `<h3>Zwei Ziele der Sozialpolitik</h3>
             <p><strong>Soziale Sicherheit:</strong> Schutz vor Lebensrisiken wie Krankheit, Alter, Arbeitslosigkeit oder Pflege.</p>
             <p><strong>Soziale Gerechtigkeit:</strong> fairer Ausgleich zwischen hohen und niedrigen Einkommen sowie zwischen Menschen mit und ohne Kinder.</p>
             <p><strong>Umverteilung:</strong> der Ausgleich über Steuern, Beiträge und Transferleistungen.</p>
             <h3>Primäre und sekundäre Verteilung</h3>
             <p><strong>Primär:</strong> Einkommen aus Arbeit und Kapital am Markt. <strong>Sekundär:</strong> Einkommen nach Steuern, Beiträgen und Transfers.</p>`,
      steps: [
        {
          type: "slides",
          title: "Nimmt der Staat einfach so?",
          slides: [
            {
              style: "dark",
              kicker: "Familie Thüne",
              title: "Lenas Frage aus Stunde 2",
              body: `<p>„Wenn der Staat schon so viel nimmt – wofür genau? Und gibt er dafür etwas zurück?“</p>
                     <p>Heute klärst du: Ist jede Abgabe einfach weg – oder steckt ein <strong>Ziel</strong> dahinter?</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Soziale Sicherheit",
              body: `<p class="box"><strong>Soziale Sicherheit</strong> schützt vor Lebensrisiken: Krankheit, Alter, Arbeitslosigkeit, Pflege.</p>
                     <p>Beispiele: Rentenversicherung, Krankenversicherung, Arbeitslosengeld I.</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Soziale Gerechtigkeit",
              body: `<p class="box"><strong>Soziale Gerechtigkeit</strong> verlangt einen fairen Ausgleich zwischen hohen und niedrigen Einkommen.</p>
                     <p>Beispiele: progressiver Einkommensteuertarif, Kindergeld, Wohngeld.</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Umverteilung",
              body: `<p><strong>Umverteilung</strong> = Ausgleich über Steuern, Beiträge und Transferleistungen.</p>
                     <p><strong>Primäre Verteilung:</strong> Einkommen aus Arbeit und Kapital am Markt.</p>
                     <p><strong>Sekundäre Verteilung:</strong> Einkommen nach Steuern, Beiträgen und Transfers.</p>`
            },
            {
              style: "accent",
              kicker: "Merksatz",
              title: "Sicherheit und Gerechtigkeit können sich widersprechen.",
              body: `<p>Mehr Schutz kostet Beiträge. Mehr Umverteilung kann Leistungsanreize schwächen. Die Politik muss abwägen.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "A1 · Welches Ziel dient die Maßnahme?",
          prompt: "Ordne zu: soziale Sicherheit, soziale Gerechtigkeit oder beides?",
          hints: ["Sicherheit = Schutz vor einem Risiko. Gerechtigkeit = fairer Ausgleich zwischen Einkommen.", "Wohngeld sichert Wohnen ab und gleicht ein niedriges Einkommen aus – beides."],
          categories: ["soziale Sicherheit", "soziale Gerechtigkeit", "beides"],
          items: [
            { text: "Rentenversicherung", cat: 0 },
            { text: "Progressiver Einkommensteuertarif", cat: 1 },
            { text: "Kindergeld", cat: 1 },
            { text: "Arbeitslosengeld I", cat: 0 },
            { text: "Wohngeld", cat: 2 }
          ]
        },
        {
          type: "cloze",
          title: "A2 · Begriffe ergänzen",
          prompt: "Ein Wort passt nicht.",
          text: "Soziale {Sicherheit} schützt vor Lebensrisiken wie Krankheit, Alter oder Arbeitslosigkeit. Soziale {Gerechtigkeit} verlangt einen fairen Ausgleich zwischen hohen und niedrigen Einkommen. Dieser Ausgleich über Steuern und Abgaben heißt {Umverteilung}.",
          distractors: ["Eigenverantwortung"]
        },
        {
          type: "sentence",
          title: "A3 · Erklären",
          case: "Lena sagt: „Der Staat nimmt mir einfach Geld weg.“ Baue eine genauere Antwort.",
          text: "Beiträge sind keine {*Steuer|Transferleistung}, weil sie einen {*Anspruch|Rabatt} begründen. Steuern finanzieren {*Gemeinschaftsaufgaben|nur Renten}.",
          hints: ["Bei Beiträgen bekommt man eine Gegenleistung, zum Beispiel Krankengeld oder Rente.", "Schulen und Straßen werden aus Steuern bezahlt."],
          explain: "Beiträge begründen Ansprüche. Steuern finanzieren Aufgaben für alle. Deshalb ist nicht jede Abgabe einfach weg."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann soziale Sicherheit und soziale Gerechtigkeit unterscheiden.",
            "Ich kann erklären, was Umverteilung ist.",
            "Ich kann Maßnahmen den beiden Zielen zuordnen."
          ]
        }
      ]
    },

    /* ══════════════ SOZIALPOLITIK · GERECHTIGKEITSLEITBILDER ══════════════ */
    {
      id: "gerechtigkeitsleitbilder",
      group: "Sozialpolitik",
      title: "Was ist gerecht?",
      kicker: "LS 14 · Wiederholung",
      minutes: 20,
      help: `<h3>Drei Gerechtigkeitsleitbilder</h3>
             <p><strong>Leistungsprinzip:</strong> Es zählt, was jemand leistet oder einzahlt. Beispiel: Rente nach Beitragsjahren.</p>
             <p><strong>Bedürfnisprinzip:</strong> Es zählt, was jemand braucht. Beispiel: Wohngeld, Grundsicherung.</p>
             <p><strong>Gleichheitsprinzip:</strong> Alle bekommen den gleichen Anteil. Beispiel: Kindergeld in gleicher Höhe.</p>
             <p>Die drei Leitbilder sind keine Gegensätze, sondern ein <strong>Spannungsfeld</strong>. Eine gerechte Sozialpolitik muss sie ausbalancieren.</p>`,
      steps: [
        {
          type: "slides",
          title: "Familie Thüne diskutiert",
          slides: [
            {
              style: "dark",
              kicker: "Familie Thüne",
              title: "Drei Meinungen – alle meinen „gerecht“",
              body: `<p><strong>Lena:</strong> „Wer viel arbeitet, soll auch viel haben.“</p>
                     <p><strong>Mutter:</strong> „Wer wenig hat, muss mehr bekommen.“</p>
                     <p><strong>Opa:</strong> „Alle sollen gleich viel bekommen.“</p>
                     <p>Alle drei meinen es gerecht – aber sie meinen etwas anderes.</p>`
            },
            {
              kicker: "Leistungsprinzip",
              title: "Es zählt die Leistung.",
              body: `<p class="box"><strong>Leistungsprinzip:</strong> Wer mehr leistet oder mehr einzahlt, bekommt mehr.</p>
                     <p>Beispiel: Frau Thüne erhält nach 40 Beitragsjahren eine höhere Rente als Herr Yilmaz nach 20 Jahren.</p>`
            },
            {
              kicker: "Bedürfnisprinzip",
              title: "Es zählt der Bedarf.",
              body: `<p class="box"><strong>Bedürfnisprinzip:</strong> Wer mehr braucht, bekommt mehr Unterstützung.</p>
                     <p>Beispiel: Familie Kaya erhält Wohngeld, weil das Einkommen niedrig und die Miete hoch ist.</p>`
            },
            {
              kicker: "Gleichheitsprinzip",
              title: "Alle bekommen das Gleiche.",
              body: `<p class="box"><strong>Gleichheitsprinzip:</strong> Alle erhalten den gleichen Betrag oder den gleichen Anteil.</p>
                     <p>Beispiel: Alle Familien erhalten für jedes Kind dasselbe Kindergeld.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Kein Entweder-oder.",
              body: `<p>Die Leitbilder sind kein Widerspruch, sondern ein Spannungsfeld. Die Rente nach Beitragsjahren folgt dem Leistungsprinzip, die Grundsicherung dem Bedürfnisprinzip.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "A1 · Welches Leitbild steckt dahinter?",
          prompt: "Ordne jeden Fall dem passenden Leitbild zu.",
          hints: ["Leistung: Beitrag, Arbeit oder Einkommen entscheiden.", "Bedürfnis: Es wird geprüft, ob jemand wirklich Hilfe braucht.", "Gleichheit: Alle bekommen denselben Betrag."],
          categories: ["Leistungsprinzip", "Bedürfnisprinzip", "Gleichheitsprinzip"],
          items: [
            { text: "Höhere Rente nach 40 Beitragsjahren als nach 20 Jahren.", cat: 0 },
            { text: "Wohngeld, weil das Einkommen niedrig und die Miete hoch ist.", cat: 1 },
            { text: "Alle Familien erhalten für jedes Kind dasselbe Kindergeld.", cat: 2 },
            { text: "Arbeitslosengeld I richtet sich nach dem letzten Lohn.", cat: 0 },
            { text: "Grundsicherung im Alter, weil die Rente nicht zum Leben reicht.", cat: 1 },
            { text: "Einheitsrente: Alle Rentnerinnen und Rentner erhalten denselben Betrag.", cat: 2 }
          ]
        },
        {
          type: "quiz",
          title: "A2 · Kurz-Check",
          questions: [
            {
              q: "Welches Leitbild steckt in der Rente nach Beitragsjahren?",
              options: ["Leistungsprinzip", "Bedürfnisprinzip", "Gleichheitsprinzip", "Zufallsprinzip"],
              answer: 0,
              explain: "Wer mehr Beitragsjahre hat, bekommt mehr Rente – das ist das Leistungsprinzip."
            },
            {
              q: "Welches Leitbild steckt im Wohngeld?",
              options: ["Leistungsprinzip", "Bedürfnisprinzip", "Gleichheitsprinzip", "Marktprinzip"],
              answer: 1,
              explain: "Wohngeld hilft Menschen mit niedrigem Einkommen und hoher Miete – es orientiert sich am Bedarf."
            },
            {
              q: "Welches Leitbild steckt im Kindergeld in gleicher Höhe?",
              options: ["Leistungsprinzip", "Bedürfnisprinzip", "Gleichheitsprinzip", "Versicherungsprinzip"],
              answer: 2,
              explain: "Alle Familien bekommen denselben Betrag pro Kind – das ist das Gleichheitsprinzip."
            },
            {
              q: "Was prüft der Staat mit einer Bedürftigkeitsprüfung?",
              options: ["Wie viel jemand leistet", "Ob jemand wirklich Unterstützung braucht", "Wie viele Kinder jemand hat", "Wie hoch die Steuern sind"],
              answer: 1,
              explain: "Die Bedürftigkeitsprüfung stellt fest, ob jemand wirklich bedürftig ist."
            },
            {
              q: "Warum muss eine gerechte Sozialpolitik die Leitbilder ausbalancieren?",
              options: ["Weil sie sich immer widersprechen.", "Weil sie unterschiedliche Maßstäbe für Gerechtigkeit setzen.", "Weil nur das Leistungsprinzip zählt.", "Weil der Staat keine Leistungen zahlen will."],
              answer: 1,
              explain: "Die Leitbilder setzen unterschiedliche Maßstäbe. Eine gute Politik kombiniert sie, statt nur einem zu folgen."
            }
          ]
        },
        {
          type: "sentence",
          title: "A3 · Verbinden",
          case: "Baue den Antwortsatz: Wie balanciert eine gerechte Sozialpolitik die Leitbilder?",
          text: "Eine gerechte Sozialpolitik muss die drei Leitbilder {*ausbalancieren|ignorieren}. Die Rente nach Beitragsjahren folgt dem {*Leistungsprinzip|Gleichheitsprinzip}; die Grundsicherung folgt dem {*Bedürfnisprinzip|Leistungsprinzip}.",
          hints: ["Rente nach Beitragsjahren: Wer mehr einzahlt, bekommt mehr.", "Grundsicherung: Wer wenig hat, bekommt Hilfe."],
          explain: "Die Leitbilder widersprechen sich nicht grundsätzlich. Eine gerechte Sozialpolitik kombiniert sie, zum Beispiel Rente nach Beitragsjahren (Leistung) und Grundsicherung (Bedarf)."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann die drei Gerechtigkeitsleitbilder erklären.",
            "Ich kann Fälle den Leitbildern zuordnen.",
            "Ich kann erklären, warum die Leitbilder ausbalanciert werden müssen."
          ]
        }
      ]
    },

    /* ══════════════ SOZIALPOLITIK · MEINUNGEN/STELLUNGNAHME ══════════════ */
    {
      id: "meinungen-stellungnahme",
      group: "Sozialpolitik",
      title: "Zwei Meinungen – eine Stellungnahme",
      kicker: "LS 14 · Wiederholung",
      minutes: 22,
      help: `<h3>So baust du eine Stellungnahme</h3>
             <p><strong>These:</strong> Ich stimme Position … eher zu, weil …</p>
             <p><strong>Argument 1 + Beispiel</strong> · <strong>Argument 2 + Beispiel</strong></p>
             <p><strong>Gegenargument:</strong> Allerdings …</p>
             <p><strong>Fazit:</strong> Im Sinne des Ziels … und des …prinzips …</p>
             <p>Die beiden Meinungstexte sind <strong>fiktive, zugespitzte Positionen</strong> – keine echten Verbände oder Parteien. Es gibt keine Richtig-Falsch-Lösung; die Begründung muss schlüssig sein.</p>`,
      steps: [
        {
          type: "slides",
          title: "Zwei Positionen",
          slides: [
            {
              style: "dark",
              kicker: "Diskussion · Position A",
              title: "Solidarisch",
              body: `<p>„Der Sozialstaat ist eine <strong>Versicherung</strong>, nicht ein Geschenk. Wer Beiträge zahlt, bekommt Rente und ist bei Krankheit abgesichert.</p>
                     <p>Dass hohe Einkommen mehr abgeben, ist gerecht: Sie tragen stärker, ohne in Not zu geraten. <strong>Alle zahlen ein, alle sind geschützt.</strong>“</p>`
            },
            {
              style: "dark",
              kicker: "Diskussion · Position B",
              title: "Eigenverantwortung",
              body: `<p>„Fast ein Drittel des Gehalts geht an den Staat. Das belastet mittlere Einkommen und senkt den Anreiz, mehr zu arbeiten.</p>
                     <p>Der Sozialstaat soll sich auf die <strong>wirklich Bedürftigen</strong> konzentrieren. Wer mehr leistet, soll mehr behalten. <strong>Eigenverantwortung statt höherer Beiträge.</strong>“</p>`
            },
            {
              kicker: "So gehst du vor",
              title: "Eine Stellungnahme bauen",
              body: `<ul>
                       <li><strong>These:</strong> Welcher Position stimmst du eher zu?</li>
                       <li><strong>Zwei Argumente</strong> mit Beispiel.</li>
                       <li><strong>Ein Gegenargument</strong> ernst nehmen.</li>
                       <li><strong>Fazit</strong> mit einem Ziel aus dem Sechseck und einem Gerechtigkeitsleitbild.</li>
                     </ul>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Position + Begründung + Gegenargument.",
              body: `<p>Eine gute Stellungnahme ist nicht laut, sondern <strong>begründet</strong>. Sie nennt auch die Schwäche der eigenen Position.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "A1 · Welche Aussage gehört zu welcher Position?",
          prompt: "Ordne die Aussagen den beiden Positionen zu.",
          hints: ["Position A betont Sicherheit und Solidarität.", "Position B betont Leistung, Eigenverantwortung und die Belastung mittlerer Einkommen."],
          categories: ["Position A: solidarisch", "Position B: Eigenverantwortung"],
          items: [
            { text: "Der Sozialstaat ist eine Versicherung.", cat: 0 },
            { text: "Hohe Abzüge belasten mittlere Einkommen.", cat: 1 },
            { text: "Starke Schultern tragen mehr.", cat: 0 },
            { text: "Wer mehr leistet, soll mehr behalten.", cat: 1 },
            { text: "Alle zahlen ein, alle sind geschützt.", cat: 0 },
            { text: "Der Staat soll sich auf die wirklich Bedürftigen konzentrieren.", cat: 1 }
          ]
        },
        {
          type: "quiz",
          title: "A2 · Leitbild und Ziel",
          questions: [
            {
              q: "Welches Gerechtigkeitsleitbild passt eher zu Position A?",
              options: ["Leistungsprinzip", "Bedürfnis- und Gleichheitsprinzip", "Marktprinzip", "Zufallsprinzip"],
              answer: 1,
              explain: "Position A betont Schutz für alle und Ausgleich – das passt zum Bedürfnis- und Gleichheitsprinzip."
            },
            {
              q: "Welches Gerechtigkeitsleitbild passt eher zu Position B?",
              options: ["Leistungsprinzip", "Bedürfnisprinzip", "Gleichheitsprinzip", "Solidarprinzip"],
              answer: 0,
              explain: "Position B betont, dass sich Leistung lohnen soll – das ist das Leistungsprinzip."
            },
            {
              q: "Welches Ziel aus dem Sechseck passt eher zu Position A?",
              options: ["Preisstabilität", "Gerechte Verteilung", "Außenwirtschaftliches Gleichgewicht", "Wirtschaftswachstum"],
              answer: 1,
              explain: "Position A will den Ausgleich zwischen hohen und niedrigen Einkommen stärken – das Ziel ist die gerechte Verteilung."
            },
            {
              q: "Welches Ziel aus dem Sechseck passt eher zu Position B?",
              options: ["Umwelt- und Klimaschutz", "Gerechte Verteilung", "Wirtschaftswachstum und Beschäftigung", "Preisstabilität"],
              answer: 2,
              explain: "Position B betont Leistungsanreize und Eigenverantwortung – das kann Wachstum und Beschäftigung stärken."
            }
          ]
        },
        {
          type: "sentence",
          title: "A3 · Stellungnahme für Position A",
          case: "Baue eine Stellungnahme, die Position A vertritt. Für Position B kannst du die Bausteine gedanklich tauschen.",
          text: "Ich stimme Position {*A|B} eher zu. Dafür spricht, dass {*starke Schultern mehr tragen|hohe Abzüge die Mittelschicht belasten}. Allerdings {*sinken die Leistungsanreize|gibt es keine Gegenleistung}. Im Sinne des Ziels {*gerechte Verteilung|Preisstabilität} und des {*Bedürfnisprinzips|Leistungsprinzips} halte ich das für vertretbar.",
          hints: ["Position A: Der Sozialstaat schützt alle; hohe Einkommen tragen mehr.", "Ein gutes Gegenargument nennt eine Schwäche der eigenen Position – hier die möglichen Leistungsanreize."],
          explain: "Beispiel für Position A: starke Schultern tragen mehr; Gegenargument: Leistungsanreize können sinken; Ziel: gerechte Verteilung; Leitbild: Bedürfnisprinzip. Für Position B wären die Bausteine anders."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann die beiden Positionen unterscheiden.",
            "Ich kann Argumente den Positionen zuordnen.",
            "Ich kann eine Stellungnahme mit These, Argumenten, Gegenargument und Fazit bauen."
          ]
        }
      ]
    },

    /* ══════════════ WIEDERHOLEN · LERNKARTEN ══════════════ */
    {
      id: "lernkarten",
      group: "Wiederholen",
      title: "Alle Lernkarten",
      kicker: "Nachschlagen",
      minutes: 10,
      steps: [
        {
          type: "cards",
          title: "Lernkarten Sechseck + Sozialpolitik",
          cards: [
            { front: "Wirtschaftspolitik", back: "Alle Maßnahmen des Staates, die das Wirtschaftsleben regeln – Gesetze, Steuern, Förderungen." },
            { front: "Magisches Sechseck", back: "Die sechs Ziele der Wirtschaftspolitik zusammen. „Magisch“, weil nie alle sechs gleichzeitig optimal erreicht werden." },
            { front: "Vollbeschäftigung", back: "Möglichst alle, die arbeiten können und wollen, haben eine Stelle. Kennzahl: Arbeitslosenquote." },
            { front: "Preisstabilität", back: "Die Preise steigen nur langsam. EZB-Ziel: ≈ 2 % pro Jahr. Kennzahl: Inflationsrate." },
            { front: "Wirtschaftswachstum", back: "Die Wirtschaftsleistung (BIP) wächst stetig und angemessen. Kennzahl: Veränderung des BIP." },
            { front: "Außenwirtschaftliches Gleichgewicht", back: "Exporte und Importe halten sich etwa die Waage. Kennzahl: Außenhandelssaldo (Export − Import), gut ≈ 0." },
            { front: "Gerechte Verteilung", back: "Einkommen und Vermögen sind fair verteilt. Kennzahl: Gini-Wert – je kleiner, desto gerechter." },
            { front: "Umwelt- und Klimaschutz", back: "Natur und Klima werden geschützt. Kennzahl: CO₂-Ausstoß." },
            { front: "Kennzahl", back: "Eine Zahl, mit der man prüft, ob ein Ziel erreicht ist – z. B. die Inflationsrate für die Preisstabilität." },
            { front: "Stabilitätsgesetz", back: "Gesetz von 1967. § 1 nennt vier Ziele (magisches Viereck): Beschäftigung, Preisstabilität, außenwirtschaftliches Gleichgewicht, Wachstum. Das Sechseck ergänzt Verteilung und Umweltschutz." },
            { front: "Zielharmonie", back: "Eine Maßnahme verbessert zwei Ziele gleichzeitig – z. B. Solarpark: Klimaschutz + Arbeitsplätze." },
            { front: "Zielkonflikt", back: "Ein Ziel wird besser, dafür wird ein anderes schlechter – z. B. mehr Jobs, aber steigende Preise." },
            { front: "Bruttoentgelt", back: "Der Lohn vor allen Abzügen." },
            { front: "Nettoentgelt", back: "Der Lohn nach allen Abzügen." },
            { front: "Abgabenquote", back: "Alle Abzüge geteilt durch das Bruttoentgelt, mal 100." },
            { front: "Steuer", back: "Zahlung ohne direkten Anspruch auf eine Gegenleistung, z. B. Lohnsteuer." },
            { front: "Beitrag", back: "Zahlung an die Sozialversicherung, die einen Anspruch begründet, z. B. auf Rente oder Krankengeld." },
            { front: "Transferleistung", back: "Zahlung des Staates an Menschen, z. B. Wohngeld, Kindergeld oder Grundsicherung." },
            { front: "Soziale Sicherheit", back: "Schutz vor Lebensrisiken wie Krankheit, Alter, Arbeitslosigkeit oder Pflege." },
            { front: "Soziale Gerechtigkeit", back: "Fairer Ausgleich zwischen hohen und niedrigen Einkommen sowie zwischen Menschen mit und ohne Kinder." },
            { front: "Umverteilung", back: "Ausgleich über Steuern, Beiträge und Transferleistungen." },
            { front: "Primäre Verteilung", back: "Einkommen aus Arbeit und Kapital am Markt." },
            { front: "Sekundäre Verteilung", back: "Einkommen nach Steuern, Beiträgen und Transfers." },
            { front: "Leistungsprinzip", back: "Es zählt, was jemand leistet oder einzahlt – z. B. Rente nach Beitragsjahren." },
            { front: "Bedürfnisprinzip", back: "Es zählt, was jemand braucht – z. B. Wohngeld oder Grundsicherung." },
            { front: "Gleichheitsprinzip", back: "Alle bekommen den gleichen Anteil – z. B. Kindergeld in gleicher Höhe." },
            { front: "Bedürftigkeitsprüfung", back: "Der Staat prüft, ob jemand wirklich Unterstützung braucht." },
            { front: "Eigenverantwortung", back: "Menschen sollen möglichst selbst für ihre Sicherheit sorgen; der Staat hilft nur, wo es nötig ist." }
          ]
        }
      ]
    },

    /* ══════════════ WIEDERHOLEN · CHECK ══════════════ */
    {
      id: "wdh-check",
      group: "Wiederholen",
      title: "Wiederholungs-Check",
      kicker: "Alles gemischt",
      minutes: 15,
      help: `<h3>Das Wichtigste auf einen Blick</h3>
             <p><strong>Sechseck:</strong> sechs Ziele, Kennzahlen, Harmonien und Konflikte. „Magisch“ heißt: nie alle sechs gleichzeitig optimal.</p>
             <p><strong>Sozialpolitik:</strong> Abzüge vom Brutto, Steuer vs. Beitrag, soziale Sicherheit und Gerechtigkeit, drei Leitbilder.</p>
             <p><strong>Merksatz:</strong> Abgabenquote = alle Abzüge : Brutto · 100. Beiträge begründen Ansprüche, Steuern finanzieren Gemeinschaftsaufgaben.</p>`,
      steps: [
        {
          type: "quiz",
          title: "A1 · Gemischter Check",
          questions: [
            {
              q: "Wie viele Ziele hat das magische Sechseck?",
              options: ["4", "5", "6", "8"],
              answer: 2,
              explain: "Sechs Ziele: Vollbeschäftigung, Preisstabilität, außenwirtschaftliches Gleichgewicht, Wachstum, Umwelt, gerechte Verteilung."
            },
            {
              q: "Welches Ziel ist kein Ziel des magischen Sechsecks?",
              options: ["Preisstabilität", "Vollbeschäftigung", "Gewinnmaximierung der Unternehmen", "Umwelt- und Klimaschutz"],
              answer: 2,
              explain: "Gewinnmaximierung ist ein Unternehmensziel, kein gesamtwirtschaftliches Ziel des Sechsecks."
            },
            {
              q: "Wie viele Ziele stehen im Stabilitätsgesetz von 1967?",
              options: ["zwei", "vier", "sechs", "acht"],
              answer: 1,
              explain: "§ 1 StabG nennt vier Ziele – das magische Viereck. Verteilung und Umweltschutz kamen später dazu."
            },
            {
              q: "Mit welcher Kennzahl wird die Preisstabilität gemessen?",
              options: ["Arbeitslosenquote", "Inflationsrate", "Gini-Wert", "CO₂-Ausstoß"],
              answer: 1,
              explain: "Preisstabilität → Inflationsrate; Ziel: etwa 2 %."
            },
            {
              q: "Welcher Fall ist eine Zielharmonie?",
              options: ["Mehr Jobs führen zu steigenden Preisen.", "Ein Solarpark schafft Jobs und senkt CO₂.", "Eine Autobahn schafft Jobs, aber mehr Abgase.", "Mehr Konsum erhöht die Importe."],
              answer: 1,
              explain: "Der Solarpark verbessert Vollbeschäftigung und Umwelt- und Klimaschutz gleichzeitig."
            },
            {
              q: "Welcher Fall ist ein Zielkonflikt?",
              options: ["Kostenloser Nahverkehr entlastet Haushalte und die Umwelt.", "Mehr Produktion steigert das Wachstum, aber auch den CO₂-Ausstoß.", "Radwege schaffen Jobs und senken Abgase.", "Kindergeld erhöht die gerechte Verteilung."],
              answer: 1,
              explain: "Mehr Produktion: Wachstum besser, Umwelt schlechter – ein Zielkonflikt."
            },
            {
              q: "Warum heißt das Sechseck „magisch“?",
              options: ["Weil alle Ziele leicht gleichzeitig zu erreichen sind.", "Weil die Ziele nicht messbar sind.", "Weil nie alle sechs Ziele gleichzeitig optimal erreicht werden.", "Weil es nur vier Ziele gibt."],
              answer: 2,
              explain: "Die Politik muss abwägen, weil alle sechs Ziele gleichzeitig kaum zu schaffen sind."
            },
            {
              q: "Was ist das Bruttoentgelt?",
              options: ["Der Lohn nach allen Abzügen", "Der Lohn vor allen Abzügen", "Die Summe der Sozialversicherungsbeiträge", "Die Lohnsteuer"],
              answer: 1,
              explain: "Brutto ist der Lohn vor allen Abzügen; netto ist das, was übrig bleibt."
            },
            {
              q: "Welche Abgabe begründet einen Anspruch?",
              options: ["Lohnsteuer", "Beitrag zur Rentenversicherung", "Mehrwertsteuer", "Gewerbesteuer"],
              answer: 1,
              explain: "Der Beitrag zur Rentenversicherung begründet einen Anspruch auf Rente."
            },
            {
              q: "Wie berechnet man die Abgabenquote?",
              options: ["Brutto : Netto · 100", "Alle Abzüge : Brutto · 100", "Netto : Brutto · 100", "Lohnsteuer : Netto · 100"],
              answer: 1,
              explain: "Abgabenquote = alle Abzüge : Bruttoentgelt · 100."
            },
            {
              q: "Welches Leitbild steckt im Wohngeld?",
              options: ["Leistungsprinzip", "Bedürfnisprinzip", "Gleichheitsprinzip", "Marktprinzip"],
              answer: 1,
              explain: "Wohngeld orientiert sich am Bedarf: niedriges Einkommen, hohe Miete."
            },
            {
              q: "Welches Leitbild steckt in der Rente nach Beitragsjahren?",
              options: ["Leistungsprinzip", "Bedürfnisprinzip", "Gleichheitsprinzip", "Solidarprinzip"],
              answer: 0,
              explain: "Wer mehr Beitragsjahre hat, bekommt mehr Rente – das ist das Leistungsprinzip."
            },
            {
              q: "Welche beiden Ziele der Sozialpolitik können sich widersprechen?",
              options: ["Sicherheit und Gerechtigkeit", "Preisstabilität und Vollbeschäftigung", "Umwelt und Wachstum", "Export und Import"],
              answer: 0,
              explain: "Mehr soziale Sicherheit kostet Beiträge; mehr Umverteilung kann Leistungsanreize schwächen. Beides muss abgewogen werden."
            },
            {
              q: "Welche Aussage gehört zu Position A (solidarisch)?",
              options: ["Wer mehr leistet, soll mehr behalten.", "Alle zahlen ein, alle sind geschützt.", "Der Staat soll sich nur auf Bedürftige konzentrieren.", "Hohe Abzüge sind immer schädlich."],
              answer: 1,
              explain: "Position A betont die Versicherung für alle: Alle zahlen ein, alle sind geschützt."
            },
            {
              q: "Welche Aussage gehört zu Position B (Eigenverantwortung)?",
              options: ["Der Sozialstaat ist eine Versicherung für alle.", "Starke Schultern tragen mehr.", "Wer mehr leistet, soll mehr behalten.", "Alle bekommen den gleichen Betrag."],
              answer: 2,
              explain: "Position B betont Leistung und Eigenverantwortung: Wer mehr leistet, soll mehr behalten."
            }
          ]
        },
        {
          type: "cloze",
          title: "A2 · Zusammenfassung",
          prompt: "Drei Wörter passen nicht.",
          text: "Das magische Sechseck hat {sechs} Ziele. Zwischen den Zielen gibt es {Zielharmonien} und Zielkonflikte. Ob eine Maßnahme hilft oder schadet, hängt von der {Maßnahme} ab. In Lenas Abrechnung sind {961,50} € Abzüge enthalten. Die Abgabenquote beträgt {32,05} %. Beiträge zur Sozialversicherung begründen einen {Anspruch}.",
          distractors: ["acht", "Rabatt", "Skonto"]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann die sechs Ziele und ihre Kennzahlen nennen.",
            "Ich kann Harmonien und Konflikte erklären.",
            "Ich kann Lenas Abzüge und Quoten berechnen.",
            "Ich kann die drei Gerechtigkeitsleitbilder unterscheiden.",
            "Ich kann eine Stellungnahme begründet aufbauen."
          ]
        }
      ]
    }

  ]
});
