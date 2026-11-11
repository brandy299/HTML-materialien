/* ============================================================
   KURS: PBP · HS1 – Lebenslauf schreiben (Extra-Kurs)
   Fach PBP · Ergänzt LS 2.3 „Bewerbung & Auswahl“ (Thema „Die Bewerbungsmappe“)
   Modellunternehmen Mediaworld e. K. · Beispiel-Bewerber: Jonas Kaya (erfunden)
   Download: app/downloads/Lebenslauf-Muster.docx (ausgefüllt) und Lebenslauf-Vorlage.docx (zum Ausfüllen)
   Aufbau und alle Aufgabentypen: app/README.md
   ============================================================ */

/* Der Rohtext für die Word-Übung – Zeile für Zeile. */
const PBP_LL_BLOCKS = [
  { text: "Lebenslauf" },                                                        // 0
  { text: "Jonas Kaya" },                                                        // 1
  { text: "Hauptstraße 12 · 46045 Oberhausen" },                                 // 2
  { text: "0151 1234567 · jonas.kaya@beispiel.de" },                             // 3
  { text: "Schulbildung" },                                                      // 4
  { text: "seit 08/2025 · Berufskolleg Oberhausen, Höhere Handelsschule" },      // 5
  { text: "08/2019 – 07/2025 · Gesamtschule Oberhausen, Fachoberschulreife" },   // 6
  { text: "Praktikum" },                                                         // 7
  { text: "03/2023 · Elektro Brandt, Oberhausen: Kunden beraten" },              // 8
  { text: "Kenntnisse" },                                                        // 9
  { text: "Word und Excel: gute Kenntnisse · Englisch: gute Kenntnisse" },       // 10
  { text: "Oberhausen, 11.11.2026" },                                            // 11
  { text: "Jonas Kaya" }                                                         // 12
];

const PBP_LL_KRITERIEN = [
  {
    label: "Grundschrift: alles Calibri 11",
    checks: [{ op: "font", value: "Calibri" }, { op: "size", value: 11, skip: [0] }],
    task: { wo: "Start → Gruppe Schriftart", was: "Drücke Strg+A (Tasten unten) und stelle Calibri und Schriftgrad 11 ein.", probe: "Alle Zeilen stehen in Calibri 11.", kurz: "Strg+A → Calibri 11" },
    hint: "Mit Strg+A alles markieren, dann Calibri und 11 wählen."
  },
  {
    label: "Seitenränder: oben 2,5 · unten 2 · links 2,5 · rechts 2 cm",
    checks: [{ op: "margins", value: { top: 2.5, bottom: 2, left: 2.5, right: 2 } }],
    task: { wo: "Registerkarte Layout → Seitenränder …", was: "Stelle oben 2,5 · unten 2 · links 2,5 · rechts 2 cm ein und bestätige mit OK.", probe: "Rundherum bleibt ein sauberer Rand.", kurz: "Layout → Seitenränder: 2,5 · 2 · 2,5 · 2 cm" },
    hint: "Oben und links 2,5 cm, unten und rechts 2 cm."
  },
  {
    label: "Titel „Lebenslauf“: Größe 16, fett, zentriert",
    checks: [{ op: "size", value: 16, block: 0 }, { op: "bold", block: 0 }, { op: "align", block: 0, value: "center" }],
    task: { wo: "Zeile 1 antippen → Schriftgrad, F und Zentriert", was: "Mache „Lebenslauf“ groß (16), fett und zentriert.", probe: "Der Titel fällt sofort auf.", kurz: "Titel antippen → 16 · F · zentriert" },
    hint: "Drei Dinge für die erste Zeile: Schriftgrad 16, fett, zentriert."
  },
  {
    label: "Name fett",
    checks: [{ op: "bold", block: 1 }],
    task: { wo: "Start → F oder Strg+B", was: "Markiere „Jonas Kaya“ (zweite Zeile) und mache ihn fett.", probe: "Der Name ist auf einen Blick zu finden.", kurz: "Name antippen → Strg+B" },
    hint: "Tippe auf die Zeile mit dem Namen und dann auf F."
  },
  {
    label: "Leerzeile vor „Schulbildung“",
    checks: [{ op: "gap", block: 3, value: 1 }],
    task: { wo: "Kontaktzeile antippen, dann Enter ↵", was: "Füge unter der Zeile mit Telefon und E-Mail eine Leerzeile ein.", probe: "Die Kontaktdaten sind vom Rest getrennt.", kurz: "Telefon-Zeile antippen → 1 × ↵" },
    hint: "Die Leerzeile kommt nach der Zeile mit Telefon und E-Mail."
  },
  {
    label: "Überschriften fett: Schulbildung, Praktikum, Kenntnisse",
    checks: [{ op: "bold", block: 4 }, { op: "bold", block: 7 }, { op: "bold", block: 9 }],
    task: { wo: "Start → F oder Strg+B", was: "Mache die drei Überschriften „Schulbildung“, „Praktikum“ und „Kenntnisse“ fett.", probe: "Man findet jeden Abschnitt sofort.", kurz: "3 Überschriften antippen → Strg+B" },
    hint: "Es sind drei Zeilen: Schulbildung, Praktikum, Kenntnisse. Jede einzeln fett machen."
  },
  {
    label: "Leerzeile vor „Praktikum“ und vor „Kenntnisse“",
    checks: [{ op: "gap", block: 6, value: 1 }, { op: "gap", block: 8, value: 1 }],
    task: { wo: "Zeile antippen, dann Enter ↵", was: "Füge eine Leerzeile unter dem letzten Schuleintrag und unter dem Praktikumseintrag ein.", probe: "Jeder Abschnitt steht für sich.", kurz: "Zeile 7 und 9 antippen → je 1 × ↵" },
    hint: "Leerzeile nach „Gesamtschule …“ und nach „Elektro Brandt …“."
  },
  {
    label: "Ort und Datum: zwei Leerzeilen davor",
    checks: [{ op: "gap", block: 10, value: 2 }],
    task: { wo: "Zeile „Word und Excel …“ antippen", was: "Füge darunter zwei Leerzeilen ein, bevor Ort und Datum kommen.", probe: "Unten steht Ort und Datum – gleich daneben die Unterschrift.", kurz: "Kenntnisse-Zeile antippen → 2 × ↵" },
    hint: "Nach der letzten Zeile der Kenntnisse kommen zwei Leerzeilen."
  },
  {
    label: "Platz für die Unterschrift: zwei Leerzeilen unter dem Datum",
    checks: [{ op: "gap", block: 11, value: 2 }],
    task: { wo: "Datumszeile antippen", was: "Füge unter „Oberhausen, 11.11.2026“ zwei Leerzeilen für die Unterschrift ein.", probe: "Ausgedruckt unterschreibst du dort mit der Hand. Als PDF reicht der getippte Name.", kurz: "Datum antippen → 2 × ↵" },
    hint: "Nach Ort und Datum folgen zwei Leerzeilen, dann der Name."
  }
];

LERNRAUM.subjects.push({
  id: "pbp-lebenslauf",
  fach: "PBP",
  added: "2026-11-11",         // Datum der Veröffentlichung (für „Neu“ auf der Startseite)
  name: "Lebenslauf schreiben",
  course: "PBP · HS1",
  glyph: "L",
  color: "#F386A1",
  company: "Mediaworld e.K.",
  description: "Extra-Kurs zur Bewerbung: Aufbau, Regeln und Format deines Lebenslaufs – mit Muster und Vorlage zum Herunterladen.",
  topics: [

    /* ══════════════ 1 · AUFBAU ══════════════ */
    {
      id: "ll-aufbau",
      group: "Lebenslauf",
      title: "Was gehört in den Lebenslauf?",
      kicker: "Teil 1",
      minutes: 15,
      help: `<h3>Der Lebenslauf</h3>
             <p class="formula">Dein Werdegang – kurz, tabellarisch, ehrlich.</p>
             <h3>Die fünf Blöcke</h3>
             <ul><li><strong>Persönliche Daten:</strong> Name, Anschrift, Telefon, E-Mail, Geburtsdatum</li>
             <li><strong>Schulbildung:</strong> Schule und Abschluss</li>
             <li><strong>Praktika und Erfahrungen:</strong> Praktikum, Nebenjob, Ehrenamt</li>
             <li><strong>Kenntnisse:</strong> PC, Sprachen</li>
             <li><strong>Interessen:</strong> zwei bis drei, die zur Stelle passen</li></ul>
             <h3>Am Ende</h3>
             <ul><li>Ort und Datum von heute, dazu die Unterschrift.</li></ul>
             <h3>Gehört nicht hinein</h3>
             <ul><li>Religion, Partei, Gesundheit, Einkommen der Eltern, Noten aus der Grundschule.</li></ul>`,
      steps: [
        {
          type: "slides",
          title: "Der erste Eindruck",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Die Auswahl",
              title: "Ein Blick, dann die Entscheidung.",
              body: `<p>Bei Mediaworld liegen <strong>fünf Bewerbungen</strong> auf dem Tisch. Tara schaut sich jeden Lebenslauf nur <strong>kurz</strong> an.</p>
                     <p>Sie sucht: Wer passt zur Stelle? Ist alles <strong>klar und vollständig</strong>?</p>`
            },
            {
              kicker: "Der Lebenslauf",
              title: "Dein Werdegang auf einer Seite.",
              body: `<p>Der Lebenslauf zeigt in <strong>kurzen Zeilen</strong>, was du bisher gemacht hast: Schule, Praktika, Kenntnisse.</p>
                     <p class="box">Ziel: Der Betrieb sieht in 30 Sekunden, was du kannst.</p>`
            },
            {
              kicker: "Die Blöcke",
              title: "Fünf Blöcke – immer in dieser Reihenfolge.",
              body: `<ol>
                       <li><strong>Persönliche Daten</strong> – Name, Anschrift, Telefon, E-Mail</li>
                       <li><strong>Schulbildung</strong> – Schule und Abschluss</li>
                       <li><strong>Praktika und Erfahrungen</strong> – Praktikum, Nebenjob, Ehrenamt</li>
                       <li><strong>Kenntnisse</strong> – PC und Sprachen</li>
                       <li><strong>Interessen</strong> – zwei bis drei</li>
                     </ol>`
            },
            {
              kicker: "Zum Schluss",
              title: "Ort, Datum, Unterschrift.",
              body: `<p>Unter den letzten Block schreibst du <strong>Ort und Datum von heute</strong>.</p>
                     <p>Darunter kommt deine <strong>Unterschrift</strong>. Wenn du den Lebenslauf als PDF schickst, reicht dein getippter Name.</p>`
            },
            {
              kicker: "Achtung",
              title: "Das gehört nicht hinein.",
              body: `<ul class="pm"><li class="m">Religion oder Partei</li><li class="m">Krankheiten</li><li class="m">Beruf oder Einkommen der Eltern</li><li class="m">Noten aus der Grundschule</li></ul>
                     <p>Diese Angaben sind privat oder nicht wichtig. Der Betrieb darf danach in der Auswahl auch nicht entscheiden (AGG).</p>
                     <p class="note">Ein Foto ist freiwillig.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Kurz, klar, ehrlich.",
              body: `<p>Schreibe nur, was <strong>stimmt</strong> und was <strong>zur Stelle passt</strong>. Erfundene Angaben fliegen im Gespräch auf.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "Rein oder raus?",
          prompt: "Gehört das in den Lebenslauf für die Azubi-Stelle bei Mediaworld?",
          hints: ["Frag dich: Zeigt es, dass ich zur Stelle passe?", "Private Dinge wie Religion, Krankheit oder das Einkommen der Eltern gehören nicht hinein."],
          categories: ["Gehört hinein", "Gehört nicht hinein"],
          items: [
            { text: "Name und Anschrift", cat: 0 },
            { text: "Religion", cat: 1 },
            { text: "Schulabschluss", cat: 0 },
            { text: "Beruf der Eltern", cat: 1 },
            { text: "Schülerpraktikum im Einzelhandel", cat: 0 },
            { text: "Krankheiten", cat: 1 },
            { text: "Word- und Excel-Kenntnisse", cat: 0 },
            { text: "Noten aus der Grundschule", cat: 1 }
          ]
        },
        {
          type: "quiz",
          title: "Welcher Block?",
          questions: [
            {
              q: "In welchen Block gehört „Word und Excel: gute Kenntnisse“?",
              hint: "Es geht um das, was du am Computer kannst.",
              options: ["Schulbildung", "Kenntnisse", "Interessen"],
              answer: 1,
              explain: "PC-Programme und Sprachen stehen im Block „Kenntnisse“."
            },
            {
              q: "Wo steht „Nachhilfe für Mitschüler, 2 Std. pro Woche“?",
              options: ["Praktika und Erfahrungen", "Persönliche Daten", "Kenntnisse"],
              answer: 0,
              explain: "Nebenjob, Ehrenamt und Nachhilfe zeigen, was du schon getan hast. Das gehört zu den Erfahrungen."
            },
            {
              q: "Du verschickst den Lebenslauf als PDF. Was steht unten?",
              hint: "Zwei Angaben von heute plus ein Name.",
              options: ["nur dein Name", "Ort, Datum und dein Name als Unterschrift", "Ort und die Handynummer"],
              answer: 1,
              explain: "Unten stehen Ort, Datum von heute und die Unterschrift. Als PDF reicht der getippte Name."
            },
            {
              q: "Kann Mediaworld ein Foto verlangen?",
              options: ["Ja, immer.", "Nein, das Foto ist freiwillig.", "Nur bei Verkaufsstellen."],
              answer: 1,
              explain: "Das Foto ist freiwillig. Wer keins schickt, darf nicht schlechter behandelt werden."
            }
          ]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann die fünf Blöcke des Lebenslaufs nennen.",
            "Ich weiß, was unten im Lebenslauf steht.",
            "Ich weiß, welche Angaben nicht hineingehören."
          ]
        }
      ]
    },

    /* ══════════════ 2 · REGELN ══════════════ */
    {
      id: "ll-regeln",
      group: "Lebenslauf",
      title: "Die Regeln: Reihenfolge, Zeiten, Lücken",
      kicker: "Teil 2",
      minutes: 15,
      help: `<h3>Drei Regeln</h3>
             <ul><li><strong>Neu zuerst:</strong> Der jüngste Eintrag steht oben, der älteste unten.</li>
             <li><strong>Zeiten genau:</strong> Monat und Jahr, z. B. 08/2019 – 07/2025.</li>
             <li><strong>Keine Lücken:</strong> Jeder Monat ist erklärt, z. B. Praktikum, Ferien, Jobben.</li></ul>
             <h3>Kenntnisse</h3>
             <ul><li>Mit Stufe: Grundkenntnisse, gute Kenntnisse, sehr gute Kenntnisse.</li>
             <li>Muttersprache: „Muttersprache“ oder „fließend“.</li></ul>
             <h3>E-Mail-Adresse</h3>
             <ul><li>Seriös: <strong>jonas.kaya@…</strong>, nicht <strong>coolerjonas99@…</strong></li></ul>`,
      steps: [
        {
          type: "slides",
          title: "Drei Regeln",
          slides: [
            {
              kicker: "Regel 1",
              title: "Das Neueste kommt zuerst.",
              body: `<p>Der Betrieb will wissen, <strong>was du jetzt machst</strong>. Darum steht der jüngste Eintrag ganz oben.</p>
                     <div class="pair">
                       <div><b>Richtig</b>seit 08/2025 Berufskolleg<br>08/2019 – 07/2025 Gesamtschule</div>
                       <div><b>Falsch</b>08/2019 – 07/2025 Gesamtschule<br>seit 08/2025 Berufskolleg</div>
                     </div>`
            },
            {
              kicker: "Regel 2",
              title: "Monat und Jahr.",
              body: `<p>Schreibe die Zeiten genau: <strong>08/2019 – 07/2025</strong>.</p>
                     <ul><li>Läuft etwas noch: <strong>seit 08/2025</strong></li>
                     <li>Kurz, nur ein Monat: <strong>03/2023</strong></li></ul>
                     <p class="note">Nur „2019 – 2025“ ist ungenau. Der Betrieb sieht nicht, ob Monate fehlen.</p>`
            },
            {
              kicker: "Regel 3",
              title: "Keine Lücken.",
              body: `<p>Von der Schule bis heute soll <strong>jeder Monat</strong> erklärt sein.</p>
                     <p class="box">Zwischen zwei Einträgen fehlen Monate? Schreibe auf, was da war: Praktikum, Nebenjob, Sprachreise, Familie, Suche nach einem Ausbildungsplatz.</p>`
            },
            {
              kicker: "Kenntnisse",
              title: "Mit Stufe, ohne Übertreibung.",
              body: `<ul><li><strong>Word, Excel:</strong> Grundkenntnisse · gute Kenntnisse · sehr gute Kenntnisse</li>
                     <li><strong>Sprachen:</strong> Deutsch (Muttersprache) · Englisch (gute Kenntnisse)</li></ul>
                     <p class="note">Schreibe nur Stufen, die du im Gespräch zeigen kannst.</p>`
            },
            {
              kicker: "E-Mail",
              title: "Die Adresse ist Teil der Bewerbung.",
              body: `<ul class="pm"><li class="p">jonas.kaya@beispiel.de</li><li class="m">coolerjonas99@beispiel.de</li><li class="m">xX_gamer_Xx@beispiel.de</li></ul>
                     <p>Eine seriöse Adresse enthält <strong>deinen Namen</strong>. Spitznamen wirken unsicher.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Neu zuerst · Monat und Jahr · lückenlos.",
              body: `<p>Mit diesen drei Regeln ist dein Lebenslauf schon besser als viele andere.</p>`
            }
          ]
        },
        {
          type: "quiz",
          title: "Welche Zeile steht oben?",
          questions: [
            {
              q: "Jonas hat seit 08/2025 das Berufskolleg besucht. Vorher war er auf der Gesamtschule. Was steht im Block „Schulbildung“ oben?",
              hint: "Das Neueste kommt zuerst.",
              options: ["Gesamtschule, 08/2019 – 07/2025", "Berufskolleg, seit 08/2025"],
              answer: 1,
              explain: "Der jüngste Eintrag steht oben: also das Berufskolleg."
            },
            {
              q: "Welche Zeitangabe ist richtig?",
              options: ["Gesamtschule, Sommer bis Sommer", "Gesamtschule, 2019 – 2025", "Gesamtschule, 08/2019 – 07/2025"],
              answer: 2,
              explain: "Monat und Jahr machen die Angabe genau. So sieht der Betrieb sofort, ob etwas fehlt."
            },
            {
              q: "Zwischen 07/2025 und 09/2025 steht nichts. Was machst du?",
              hint: "Denk an die Regel „keine Lücken“.",
              options: ["Nichts. Das fällt nicht auf.", "Ich schreibe auf, was in dieser Zeit war, z. B. ein Ferienjob.", "Ich ändere die Daten, bis es passt."],
              answer: 1,
              explain: "Erkläre die Zeit ehrlich: Ferienjob, Praktikum oder Pause. Daten ändern ist unehrlich."
            },
            {
              q: "Welche E-Mail-Adresse passt in die Bewerbung?",
              options: ["lea.berg@beispiel.de", "partyqueen_lea@beispiel.de", "lea-ist-die-beste@beispiel.de"],
              answer: 0,
              explain: "Seriös ist die Adresse mit Vor- und Nachnamen."
            }
          ]
        },
        {
          type: "spot",
          title: "Finde den Fehler",
          prompt: "In jedem Lebenslauf-Ausschnitt steckt ein Fehler. Tippe auf die falsche Zeile.",
          rounds: [
            {
              lines: [
                { t: "Schulbildung", bold: true },
                "seit 08/2025 · Berufskolleg Oberhausen",
                "08/2015 – 07/2019 · Grundschule Am Park",
                "08/2019 – 07/2025 · Gesamtschule Oberhausen"
              ],
              error: 2,
              explain: "Die Reihenfolge stimmt nicht: Die Grundschule (bis 07/2019) ist älter als die Gesamtschule und muss darunter stehen.",
              hint: "Vergleiche die Jahreszahlen von oben nach unten: Es muss immer älter werden."
            },
            {
              lines: [
                { t: "Kenntnisse", bold: true },
                "Word und Excel: gute Kenntnisse",
                "Englisch: super",
                "Deutsch: Muttersprache"
              ],
              error: 2,
              explain: "„super“ ist keine Stufe. Besser: Englisch: gute Kenntnisse.",
              hint: "Welche Zeile nennt keine Stufe?"
            },
            {
              lines: [
                { t: "Persönliche Daten", bold: true },
                "Jonas Kaya",
                "Hauptstraße 12 · 46045 Oberhausen",
                "0151 1234567",
                "coolerjonas99@beispiel.de"
              ],
              error: 4,
              explain: "Die E-Mail-Adresse ist nicht seriös. Besser: jonas.kaya@beispiel.de.",
              hint: "Welche Angabe würde ein Betrieb unseriös finden?"
            },
            {
              lines: [
                { t: "Praktika und Erfahrungen", bold: true },
                "03/2023 · Elektro Brandt: Kunden beraten",
                "seit 2022 · Nachhilfe in Mathe",
                "Fußball im Verein"
              ],
              error: 2,
              explain: "„seit 2022“ ist ungenau: Es fehlt der Monat. Besser: seit 09/2022.",
              hint: "Schau auf die Zeitangaben: Wo fehlt der Monat?"
            }
          ]
        },
        {
          type: "cloze",
          title: "Regeln einsetzen",
          text: "Im Lebenslauf steht der {jüngste} Eintrag oben. Zeiten schreibst du mit {Monat} und Jahr. Fehlen Monate, entsteht eine {Lücke}. Die E-Mail-Adresse soll {seriös} sein.",
          distractors: ["älteste", "Wochentag", "Hobby"],
          hints: ["Bei der Reihenfolge gilt: Das Neueste kommt zuerst.", "Eine Zeit wie 08/2019 enthält zwei Angaben: Monat und …"]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich weiß, welcher Eintrag im Lebenslauf oben steht.",
            "Ich kann Zeiten mit Monat und Jahr schreiben.",
            "Ich kann erklären, was eine Lücke ist und was ich dann schreibe."
          ]
        }
      ]
    },

    /* ══════════════ 3 · FORMAT (Word-Simulation) ══════════════ */
    {
      id: "ll-format",
      group: "Lebenslauf",
      title: "Lebenslauf in Word formatieren",
      kicker: "Teil 3",
      minutes: 20,
      help: `<h3>So sieht ein ordentlicher Lebenslauf aus</h3>
             <ul><li><strong>Eine Schrift:</strong> Calibri 11</li>
             <li><strong>Titel:</strong> größer, fett, zentriert</li>
             <li><strong>Überschriften:</strong> fett</li>
             <li><strong>Leerzeilen:</strong> zwischen den Blöcken, damit alles Luft hat</li>
             <li><strong>Ränder:</strong> rundherum frei</li></ul>
             <h3>Tasten</h3>
             <ul><li>Strg+A = alles markieren</li><li>Strg+B = fett</li><li>Enter = Leerzeile</li></ul>`,
      steps: [
        {
          type: "word",
          title: "Lebenslauf formatieren – geführt",
          mode: "guided",
          file: "Lebenslauf_Rohtext.docx",
          intro: "Gleich öffnet sich Word – als Simulation. Der Text steht schon da, aber ohne Form. Du bringst ihn Schritt für Schritt in Form. Unten findest du die Tasten (Enter, Strg+A/B/R).",
          start: { font: "Arial", size: 10 },
          blocks: PBP_LL_BLOCKS,
          criteria: PBP_LL_KRITERIEN
        },
        {
          type: "word",
          title: "Lebenslauf formatieren – frei",
          mode: "free",
          file: "Lebenslauf_Rohtext.docx",
          intro: "Jetzt ohne Anleitung: Bringe den Lebenslauf in Form. Die Checkliste zeigt dir live, was schon passt.",
          start: { font: "Arial", size: 10 },
          blocks: PBP_LL_BLOCKS,
          criteria: PBP_LL_KRITERIEN,
          hints: ["Tippe eine Zeile an – an den blauen Griffen ziehst du die Markierung größer. Schrift und Absätze: Start · Seitenränder: Layout · Leerzeilen: Enter (löschen: ⌫).", "Die Checkliste prüft automatisch – du kannst nichts kaputt machen. Mit ↺ oben startest du neu."]
        },
        {
          type: "quiz",
          title: "Welche Form ist richtig?",
          questions: [
            {
              q: "Wie viele verschiedene Schriftarten verwendest du im Lebenslauf?",
              hint: "Ruhig und einheitlich wirkt am besten.",
              options: ["Eine einzige.", "Pro Block eine andere.", "So viele wie möglich."],
              answer: 0,
              explain: "Eine einzige Schrift (z. B. Calibri 11) wirkt ruhig und sorgfältig."
            },
            {
              q: "Wie hebst du die Überschriften „Schulbildung“ und „Kenntnisse“ hervor?",
              options: ["Rot und unterstrichen", "Fett", "In Großbuchstaben mit Ausrufezeichen"],
              answer: 1,
              explain: "Fett reicht. Bunt und unterstrichen wirkt unruhig."
            },
            {
              q: "In welchem Format schickst du den fertigen Lebenslauf per E-Mail?",
              hint: "Das Format sieht auf jedem Handy gleich aus.",
              options: ["Als Word-Datei", "Als PDF", "Als Foto vom Bildschirm"],
              answer: 1,
              explain: "Ein PDF sieht bei jedem gleich aus. Eine Word-Datei kann sich verschieben."
            }
          ]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann einen Lebenslauf in Word übersichtlich formatieren.",
            "Ich weiß, warum ich eine einzige Schrift benutze.",
            "Ich weiß, dass ich den Lebenslauf als PDF verschicke."
          ]
        }
      ]
    },

    /* ══════════════ 4 · MUSTER ══════════════ */
    {
      id: "ll-muster",
      group: "Lebenslauf",
      title: "Mein Lebenslauf: Muster und Vorlage",
      kicker: "Teil 4",
      minutes: 10,
      help: `<h3>Checkliste vor dem Versenden</h3>
             <ul><li>Neuester Eintrag oben, Zeiten mit Monat und Jahr, keine Lücken</li>
             <li>Seriöse E-Mail-Adresse</li>
             <li>Ort, Datum und Name unten</li>
             <li>Als PDF speichern: <strong>Lebenslauf_Nachname.pdf</strong></li></ul>`,
      steps: [
        {
          type: "slides",
          title: "So gehst du vor",
          slides: [
            {
              kicker: "Dein Lebenslauf",
              title: "Drei Schritte zum eigenen Lebenslauf.",
              body: `<ol>
                       <li><strong>Muster ansehen.</strong> Jonas Kaya ist erfunden. Du siehst, wie ein fertiger Lebenslauf aussieht.</li>
                       <li><strong>Vorlage ausfüllen.</strong> Ersetze alles in [eckigen Klammern] durch deine Angaben.</li>
                       <li><strong>Als PDF speichern</strong> und prüfen.</li>
                     </ol>`
            },
            {
              kicker: "Zum Ausfüllen",
              title: "Mit Zeit am PC geht es am besten.",
              body: `<p>Die Dateien sind Word-Dokumente (.docx). Du kannst sie am <strong>Schul-PC</strong>, am Laptop oder in der <strong>Word-App</strong> öffnen.</p>
                     <p class="note">Nur ein Handy? Dann schreibe die Angaben erst auf einen Zettel oder in eine Notiz. Das Formatieren machst du in der Schule.</p>`
            },
            {
              kicker: "Vor dem Versenden",
              title: "Die Checkliste.",
              body: `<ul><li>Neuester Eintrag steht oben</li>
                     <li>Zeiten mit Monat und Jahr</li>
                     <li>Keine Lücken</li>
                     <li>E-Mail-Adresse seriös</li>
                     <li>Ort, Datum und Name unten</li>
                     <li>Keine Rechtschreibfehler (Freund/in lesen lassen)</li>
                     <li>Als PDF gespeichert: <strong>Lebenslauf_Nachname.pdf</strong></li></ul>`
            }
          ]
        },
        {
          type: "link",
          title: "Download: Muster (ausgefüllt)",
          text: "Der Lebenslauf von Jonas Kaya (erfunden) als Word-Datei: zum Ansehen und Vergleichen.",
          href: "downloads/Lebenslauf-Muster.docx"
        },
        {
          type: "link",
          title: "Download: Vorlage zum Ausfüllen",
          text: "Die leere Vorlage als Word-Datei. Ersetze alles in [eckigen Klammern] durch deine Angaben.",
          href: "downloads/Lebenslauf-Vorlage.docx"
        },
        {
          type: "sort",
          title: "Vor dem Versenden prüfen",
          prompt: "Ordne die Aussagen: Stimmt das für einen guten Lebenslauf?",
          hints: ["Denk an die drei Regeln: neu zuerst, Monat und Jahr, keine Lücken.", "Hobbys wie „Party“ oder eine Spaß-Mailadresse wirken nicht seriös."],
          categories: ["Passt", "Muss geändert werden"],
          items: [
            { text: "seit 08/2025 steht über 08/2019 – 07/2025", cat: 0 },
            { text: "Die Zeit zwischen Schule und Praktikum ist nicht erklärt", cat: 1 },
            { text: "E-Mail: jonas.kaya@beispiel.de", cat: 0 },
            { text: "E-Mail: coolerjonas99@beispiel.de", cat: 1 },
            { text: "Schrift: Calibri 11 im ganzen Dokument", cat: 0 },
            { text: "Jeder Block hat eine andere Schriftart", cat: 1 },
            { text: "Datei: Lebenslauf_Kaya.pdf", cat: 0 },
            { text: "Datei: neu_final_2.docx", cat: 1 }
          ]
        },
        {
          type: "cards",
          title: "Fachbegriffe Lebenslauf",
          cards: [
            { front: "Lebenslauf", back: "Dein Werdegang in kurzen, tabellarischen Zeilen: Schule, Praktika, Kenntnisse." },
            { front: "Tabellarisch", back: "Kurze Zeilen mit Datum und Stichworten statt langer Sätze." },
            { front: "Lückenlos", back: "Jeder Monat von der Schule bis heute ist erklärt." },
            { front: "Werdegang", back: "Alles, was du bisher gelernt und gemacht hast – in der Reihenfolge, wie es passiert ist." },
            { front: "Umgekehrt chronologisch", back: "Das Neueste steht oben, das Älteste unten." },
            { front: "Kenntnisse", back: "Das, was du kannst: PC-Programme und Sprachen – mit Stufe." },
            { front: "Bewerbungsmappe", back: "Anschreiben, Lebenslauf, Zeugnisse und Nachweise zusammen." },
            { front: "Seriös", back: "Ordentlich und vertrauenswürdig – z. B. eine E-Mail-Adresse mit deinem Namen." }
          ]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich habe Muster und Vorlage angesehen.",
            "Ich kann meinen eigenen Lebenslauf in der Vorlage schreiben.",
            "Ich prüfe vor dem Versenden alle Punkte der Checkliste."
          ]
        }
      ]
    }
  ]
});
