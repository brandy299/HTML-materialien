/* ============================================================
   KURS: INWI · HHU – Geschäftsbrief nach DIN 5008
   Fach Informationswirtschaft · Höhere Handelsschule (HHUC/HHUD)
   Modellunternehmen Fly Bike Werke GmbH (Oldenburg)
   Quelle: Arbeitsblatt „Geschäftsbrief richtig formatieren“,
   Rohtext (AWE Aluminiumwerke AG) + Probeklausur (2026-09-24).
   Aufbau und alle Aufgabentypen: app/README.md
   ============================================================ */

/* Der Rohtext aus dem Word-Arbeitsblatt – Zeile für Zeile. */
const INWI_GB_BLOCKS = [
  { text: "Fly Bike Werke GmbH · Rostocker Str. 334 · 26121 Oldenburg" },
  { text: "AWE Aluminiumwerke AG" },
  { text: "Herrn Köllen" },
  { text: "St. Augustiner Str. 30" },
  { text: "53225 Bonn" },
  { text: "Oldenburg, 24.09.2026" },
  { text: "Anfrage über Aluminiumrohre" },
  { text: "Sehr geehrte Damen und Herren," },
  { text: "für die Rahmenfertigung benötigen wir dringend Aluminiumrohre." },
  { text: "Bitte senden Sie uns ein Angebot über 500 Aluminiumrohre in der bisherigen Spezifikation. Nennen Sie uns bitte Preise, Lieferzeit und Zahlungsbedingungen sowie einen Liefertermin bis zum 20.10.2026." },
  { text: "Mit freundlichen Grüßen" },
  { text: "Oliver Thüne" },
  { text: "Einkauf/Logistik" },
  { text: "Anlagen: Bedarfsmeldung" }
];

/* Die Prüfpunkte der Word-Simulation – jeder Punkt ist eine Regel aus
   dem Arbeitsblatt. Dieselbe Liste steuert den geführten und den freien Modus. */
const INWI_GB_KRITERIEN = [
  {
    label: "Grundschrift: alles Calibri 11",
    checks: [{ op: "font", value: "Calibri" }, { op: "size", value: 11, skip: [0] }],
    task: { wo: "Registerkarte Start → Gruppe Schriftart", was: "Tippe auf „Alles markieren“ und stelle Schriftart Calibri und Schriftgrad 11 ein (in Word: Strg+A).", probe: "Alle Zeilen stehen in Calibri 11." },
    hint: "Setze zuerst die Grundschrift für den ganzen Brief: „Alles markieren“, dann Calibri und 11."
  },
  {
    label: "Seitenränder: oben 4,5 · unten 2 · links 2,5 · rechts 2 cm",
    checks: [{ op: "margins", value: { top: 4.5, bottom: 2, left: 2.5, right: 2 } }],
    task: { wo: "Registerkarte Layout → Seitenränder …", was: "Stelle oben 4,5 · unten 2 · links 2,5 · rechts 2 cm ein und bestätige mit OK.", probe: "Das Anschriftfeld beginnt 45 mm unter dem oberen Blattrand." },
    hint: "Achtung: Oben braucht der Brief viel Platz – 4,5 cm. Die anderen Werte: unten 2 · links 2,5 · rechts 2 cm."
  },
  {
    label: "Rücksendeangabe klein: Zeile 1 auf 8 pt",
    checks: [{ op: "size", value: 8, block: 0 }],
    task: { wo: "Start → Schriftgrad", was: "Markiere die erste Zeile (Rücksendeangabe) und stelle Schriftgrad 8 ein.", probe: "Die erste Zeile ist deutlich kleiner als der Brieftext." },
    hint: "Tippe auf die erste Zeile – dann auf Schriftgrad – und wähle 8."
  },
  {
    label: "Anschriftfeld: Leerzeile vor der PLZ",
    checks: [{ op: "gap", block: 3, value: 1 }],
    task: { wo: "Zeile „St. Augustiner Str. 30“ markieren, dann „¶ +“", was: "Füge nach der Straße eine Leerzeile ein (in Word: 1 × Enter).", probe: "Zwischen Straße und PLZ ist eine leere Zeile – so liest die Post maschinell." },
    hint: "Zwischen Straße und Postleitzahl steht genau eine Leerzeile."
  },
  {
    label: "Nach der PLZ: zwei Leerzeilen",
    checks: [{ op: "gap", block: 4, value: 2 }],
    task: { wo: "Zeile „53225 Bonn“ markieren, dann 2 × „¶ +“", was: "Füge nach der PLZ zwei Leerzeilen ein (in Word: 2 × Enter).", probe: "Vor dem Datum ist Platz – der Brief atmet." },
    hint: "Nach der Empfänger-PLZ kommen zwei Leerzeilen."
  },
  {
    label: "Datum rechtsbündig",
    checks: [{ op: "align", block: 5, value: "right" }],
    task: { wo: "Start → Absatz → „Rechtsbündig“ (in Word: Strg+R)", was: "Markiere die Datumszeile und richte sie rechtsbündig aus.", probe: "Das Datum steht am rechten Rand." },
    hint: "Wähle die Datumszeile und tippe auf das Symbol mit den nach rechts ausgerichteten Linien."
  },
  {
    label: "Betreff fett – ohne „Betreff“, ohne Punkt",
    checks: [{ op: "bold", block: 6 }],
    task: { wo: "Start → F (in Word: Strg+B)", was: "Markiere „Anfrage über Aluminiumrohre“ und mache die Zeile fett.", probe: "Der Betreff ist fett, kurz und ohne Punkt am Ende." },
    hint: "Die Betreffzeile wird fett gesetzt – das Wort „Betreff“ gehört nicht davor."
  },
  {
    label: "Anrede: Komma + Leerzeile danach",
    checks: [{ op: "gap", block: 7, value: 1 }],
    task: { wo: "Zeile „Sehr geehrte Damen und Herren,“ markieren", was: "Setze eine Leerzeile unter die Anrede (in Word: 1 × Enter).", probe: "Unter der Anrede ist eine leere Zeile, der Text beginnt groß." },
    hint: "Nach der Anrede folgt genau eine Leerzeile."
  },
  {
    label: "Leerzeile zwischen den Absätzen",
    checks: [{ op: "gap", block: 8, value: 1 }],
    task: { wo: "Ersten Textabsatz markieren", was: "Trenne Anlass und Bitte mit einer Leerzeile.", probe: "Ein Gedanke pro Absatz – erst Anlass, dann Bitte." },
    hint: "Zwischen „…dringend Aluminiumrohre.“ und „Bitte senden Sie …“ steht eine Leerzeile."
  },
  {
    label: "Grußformel: drei Leerzeilen für die Unterschrift",
    checks: [{ op: "gap", block: 10, value: 3 }],
    task: { wo: "Zeile „Mit freundlichen Grüßen“ markieren", was: "Füge darunter drei Leerzeilen ein (in Word: 3 × Enter).", probe: "Nach dem Ausdrucken unterschreibst du handschriftlich in die leere Zeile." },
    hint: "Nach „Mit freundlichen Grüßen“ kommen drei Leerzeilen – Platz für die Unterschrift."
  }
];

LERNRAUM.subjects.push({
  id: "inwi-geschaeftsbrief",
  fach: "INWI",
  added: "2026-09-26",
  updated: "2026-09-26",
  name: "Geschäftsbrief nach DIN 5008",
  course: "INWI · HHU",
  glyph: "G",
  color: "#D45BB6",
  company: "Fly Bike Werke GmbH",
  description: "Der Brief an Geschäftspartner: neun Zonen, klare Regeln – und die Word-Schritte, die du in der Klausur brauchst.",
  topics: [

    /* ══════════════ GRUNDLAGEN ══════════════ */
    {
      id: "zonen",
      group: "Grundlagen",
      title: "Die neun Zonen",
      kicker: "DIN 5008 · Teil 1",
      minutes: 15,
      help: `<h3>Warum DIN 5008?</h3>
             <p>Einheitliche Geschäftsbriefe: Die Post kann die Anschrift maschinell lesen, und der Empfänger findet alles an derselben Stelle.</p>
             <h3>Die neun Zonen</h3>
             <dl class="terms">
               <dt>1 Briefkopf</dt><dd>Rücksendeangabe klein oben: Name, Straße, PLZ/Ort.</dd>
               <dt>2 Anschriftfeld</dt><dd>Empfänger; beginnt 45 mm von oben; Leerzeile vor der PLZ.</dd>
               <dt>3 Informationsblock</dt><dd>Datum rechtsbündig und kurz: TT.MM.JJJJ.</dd>
               <dt>4 Betreffzeile</dt><dd>Fett – ohne das Wort „Betreff“, ohne Punkt am Ende.</dd>
               <dt>5 Anrede</dt><dd>„Sehr geehrte …“ mit Komma, danach eine Leerzeile.</dd>
               <dt>6 Brieftext</dt><dd>Einleitung – Hauptteil – Schluss; ein Gedanke pro Absatz.</dd>
               <dt>7 Grußformel</dt><dd>Mit freundlichen Grüßen – ohne Komma.</dd>
               <dt>8 Unterschrift</dt><dd>Handschriftlich, darunter der Name in Druckschrift.</dd>
               <dt>9 Anlagen</dt><dd>Anlagenvermerk, z. B. „Anlagen: Bedarfsmeldung“.</dd>
             </dl>`,
      steps: [
        {
          type: "slides",
          title: "Der Fall Fly Bike",
          slides: [
            {
              style: "dark",
              kicker: "Fly Bike Werke GmbH · Oldenburg",
              title: "Herr Thüne schreibt eine Anfrage.",
              body: `<p>Für die Rahmenfertigung fehlen <strong>Aluminiumrohre</strong>. Einkauf/Logistik schreibt deshalb an die <strong>AWE Aluminiumwerke AG</strong>.</p>
                     <p>Der Text steht – aber die Form fehlt noch. Dafür gibt es eine Norm: <strong>DIN 5008</strong>.</p>`
            },
            {
              kicker: "Grundwissen",
              title: "Warum gibt es die DIN 5008?",
              body: `<ul><li>Briefe sehen <strong>einheitlich</strong> aus – man findet alles an derselben Stelle.</li>
                     <li>Die Post kann die <strong>Anschrift maschinell lesen</strong>.</li>
                     <li>Ein sauberer Brief wirkt <strong>professionell</strong>.</li></ul>`
            },
            {
              kicker: "Der Brief von oben nach unten",
              title: "Neun Zonen – ein Bauplan.",
              body: `<div class="brief-mock">
                       <p class="bm-title"><span>Geschäftsbrief nach DIN 5008</span><span>Fly Bike → AWE</span></p>
                       <div class="bm-zone"><span class="bm-n">1</span><span class="bm-l">Briefkopf</span><span class="bm-c bm-s">Fly Bike Werke GmbH · Rostocker Str. 334 · 26121 Oldenburg</span></div>
                       <div class="bm-zone"><span class="bm-n">2</span><span class="bm-l">Anschriftfeld</span><span class="bm-c">AWE Aluminiumwerke AG<br>Herrn Köllen<br>St. Augustiner Str. 30<br><br>53225 Bonn</span></div>
                       <div class="bm-zone"><span class="bm-n">3</span><span class="bm-l">Datum</span><span class="bm-c bm-r">Oldenburg, 24.09.2026</span></div>
                       <div class="bm-zone"><span class="bm-n">4</span><span class="bm-l">Betreff</span><span class="bm-c bm-b">Anfrage über Aluminiumrohre</span></div>
                       <div class="bm-zone"><span class="bm-n">5</span><span class="bm-l">Anrede</span><span class="bm-c">Sehr geehrte Damen und Herren,</span></div>
                       <div class="bm-zone"><span class="bm-n">6</span><span class="bm-l">Brieftext</span><span class="bm-c">Erst der Anlass (fehlende Rohre), dann die Bitte (Angebot, Preise, Termin).</span></div>
                       <div class="bm-zone"><span class="bm-n">7</span><span class="bm-l">Gruß</span><span class="bm-c">Mit freundlichen Grüßen</span></div>
                       <div class="bm-zone"><span class="bm-n">8</span><span class="bm-l">Unterschrift</span><span class="bm-c">Platz für die Handschrift · Oliver Thüne, Einkauf/Logistik</span></div>
                       <div class="bm-zone"><span class="bm-n">9</span><span class="bm-l">Anlagen</span><span class="bm-c">Anlagen: Bedarfsmeldung</span></div>
                     </div>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Die Form steht fest – dein Text füllt sie.",
              body: `<p>Absender klein · Empfänger mit Leerzeile · Datum rechts · Betreff fett · Anrede mit Komma · Gruß ohne Komma.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "Was gehört in welche Zone?",
          prompt: "Ordne jeden Inhalt der passenden Zone zu.",
          hints: ["Der Empfänger steht im Anschriftfeld.", "Die Betreffzeile ist kurz, fett und ohne das Wort „Betreff“.", "Die Anrede spricht die Person direkt an.", "Der Gruß steht am Ende des Briefs."],
          categories: ["Anschriftfeld", "Betreffzeile", "Anrede", "Grußformel"],
          items: [
            { text: "AWE Aluminiumwerke AG", cat: 0 },
            { text: "St. Augustiner Str. 30", cat: 0 },
            { text: "Anfrage über Aluminiumrohre", cat: 1 },
            { text: "Bewerbung als Industriekauffrau", cat: 1 },
            { text: "Sehr geehrte Frau Ganser,", cat: 2 },
            { text: "Sehr geehrter Herr Thüne,", cat: 2 },
            { text: "Mit freundlichen Grüßen", cat: 3 },
            { text: "Freundliche Grüße", cat: 3 }
          ]
        },
        {
          type: "quiz",
          title: "A1 · Die Regeln",
          questions: [
            {
              q: "Was ist die DIN 5008?",
              options: [
                "Eine Word-Version",
                "Eine Norm für Geschäftsbriefe",
                "Eine Schriftart",
                "Eine Regel fürs Porto"
              ],
              answer: 1,
              explain: "DIN 5008 legt fest, wie Geschäftsbriefe aufgebaut und formatiert werden."
            },
            {
              q: "Im Anschriftfeld steht zwischen Straße und Postleitzahl …",
              hint: "Die Post liest die Anschrift maschinell – sie braucht die Zeilen klar getrennt.",
              options: ["gar nichts", "eine Leerzeile", "ein Komma", "das Datum"],
              answer: 1,
              explain: "Zwischen Straße und PLZ steht eine Leerzeile – so wird die Anschrift maschinell gelesen."
            },
            {
              q: "Wie beginnt die Betreffzeile?",
              options: [
                "Mit dem Wort „Betreff:“",
                "Fett und ohne das Wort „Betreff“",
                "Kursiv und mit Punkt am Ende",
                "Immer in Großbuchstaben"
              ],
              answer: 1,
              explain: "Fett, ohne „Betreff“ und ohne Punkt am Ende."
            },
            {
              q: "Wie wird das Datum gesetzt?",
              options: [
                "Linksbündig und ausgeschrieben",
                "Rechtsbündig und kurz: TT.MM.JJJJ",
                "Zentriert und fett",
                "In die Fußzeile"
              ],
              answer: 1,
              explain: "Rechtsbündig und kurz – z. B. Oldenburg, 24.09.2026."
            },
            {
              q: "Was folgt nach der Anrede?",
              hint: "Die Anrede endet mit einem Komma.",
              options: ["Sofort der Brieftext", "Eine Leerzeile", "Der Betreff", "Die Unterschrift"],
              answer: 1,
              explain: "Komma am Ende, dann eine Leerzeile – der Text beginnt groß."
            }
          ]
        },
        {
          type: "cloze",
          title: "A2 · Der Aufbau",
          prompt: "Achtung: Drei Wörter passen nicht!",
          hints: ["Das Datum steht am rechten Rand.", "Der Betreff ist die kurze Zeile über der Anrede.", "Ganz unten steht der Anlagenvermerk."],
          text: "Ganz oben steht der {Briefkopf} mit dem Absender. Darunter folgt das {Anschriftfeld} mit dem Empfänger – zwischen Straße und PLZ steht eine Leerzeile. Das Datum steht {rechtsbündig}. Die {Betreffzeile} ist fett und steht ohne das Wort „Betreff“. Nach der Anrede folgt eine {Leerzeile}, dann kommt der Brieftext. Am Ende stehen Grußformel und {Unterschrift}.",
          distractors: ["linksbündig", "Überschrift", "Fußzeile"]
        },
        {
          type: "cards",
          title: "Fachbegriffe",
          cards: [
            { front: "Rücksendeangabe", back: "Die klein gesetzte Absenderzeile in Zone 1 – z. B. „Fly Bike Werke GmbH · Rostocker Str. 334 · 26121 Oldenburg“ in 8 pt." },
            { front: "Anschriftfeld", back: "Zone 2 mit dem Empfänger. Beginnt 45 mm von oben; zwischen Straße und PLZ steht eine Leerzeile." },
            { front: "Informationsblock", back: "Zone 3: Datum rechtsbündig und kurz (TT.MM.JJJJ), ggf. Ihr Zeichen / Ihre Nachricht." },
            { front: "Betreffzeile", back: "Zone 4: kurz und fett – ohne das Wort „Betreff“, ohne Punkt am Ende." },
            { front: "Anrede", back: "Zone 5: „Sehr geehrte …“ – endet mit Komma, danach eine Leerzeile." },
            { front: "Grußformel", back: "Zone 7: „Mit freundlichen Grüßen“ – ohne Komma." },
            { front: "Anlagenvermerk", back: "Zone 9, letzte Zeile: z. B. „Anlagen: Bedarfsmeldung“ – nur wenn wirklich etwas beiliegt." }
          ]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann die neun Zonen eines Geschäftsbriefs benennen.",
            "Ich kann erklären, warum es die DIN 5008 gibt.",
            "Ich kann sagen, was ins Anschriftfeld gehört.",
            "Ich kann die Regeln für Betreff, Anrede und Gruß nennen."
          ]
        }
      ]
    },

    /* ══════════════ WORD-PRAXIS ══════════════ */
    {
      id: "word-schritte",
      group: "Word-Praxis",
      title: "In Word formatieren",
      kicker: "DIN 5008 · Teil 2",
      minutes: 30,
      help: `<h3>Die zwei Registerkarten</h3>
             <ul><li><strong>Start:</strong> Schriftart, Schriftgrad, Fett (F), Ausrichtung, Leerzeilen ¶.</li>
             <li><strong>Layout:</strong> Seitenränder.</li></ul>
             <h3>Die Werte für diesen Brief</h3>
             <p class="formula">Ränder: oben 4,5 · unten 2 · links 2,5 · rechts 2 cm<br>Schrift: Calibri 11 · Rücksendeangabe 8 pt</p>
             <h3>Die Regeln</h3>
             <ul><li>Datum <strong>rechtsbündig</strong>, kurz: TT.MM.JJJJ.</li>
             <li><strong>Betreff</strong> fett – ohne „Betreff“, ohne Punkt.</li>
             <li><strong>Anrede</strong> mit Komma, danach eine Leerzeile.</li>
             <li><strong>Gruß</strong> ohne Komma, drei Zeilen Platz für die Unterschrift.</li>
             <li>Zwischen <strong>Straße und PLZ</strong> eine Leerzeile.</li></ul>
             <h3>In Word am PC</h3>
             <p>Strg+A markiert alles · Strg+B macht fett · Strg+R richtet rechtsbündig aus.</p>`,
      steps: [
        {
          type: "slides",
          title: "Der Rohtext",
          slides: [
            {
              style: "dark",
              kicker: "Word 2016 · Rohtext",
              title: "Der Text steht schon da.",
              body: `<p>Alles in Arial 10, keine Ränder, keine Leerzeilen – ein <strong>Rohtext</strong>.</p>
                     <p>Deine Aufgabe: Formatiere ihn zum Geschäftsbrief nach DIN 5008. Den Text selbst musst du nicht schreiben.</p>`
            },
            {
              kicker: "Die zwei Registerkarten",
              title: "Start und Layout.",
              body: `<div class="pair">
                       <div><b>Start</b>Schriftart, Schriftgrad, Fett, Ausrichtung, Leerzeilen ¶</div>
                       <div><b>Layout</b>Seitenränder</div>
                     </div>`
            },
            {
              kicker: "Die Werte",
              title: "Welche Zahlen brauchst du?",
              body: `<p class="formula">Ränder: oben 4,5 · unten 2 · links 2,5 · rechts 2 cm<br>Schrift: Calibri 11 · Rücksendeangabe 8 pt</p>
                     <p class="note">Datum rechtsbündig · Betreff fett · Gruß ohne Komma</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Erst die Form, dann der Text.",
              body: `<p>Wenn die Form steht, ist der Brief in der Klausur schnell geschrieben.</p>`
            }
          ]
        },
        {
          type: "word",
          title: "Brief formatieren – geführt",
          mode: "guided",
          file: "Brief_Rohtext.docx",
          intro: "Gleich öffnet sich Word – als Simulation. Der Brieftext steht schon da, aber noch roh: Arial 10, keine Leerzeilen. Formatiere ihn Schritt für Schritt.",
          start: { font: "Arial", size: 10 },
          blocks: INWI_GB_BLOCKS,
          criteria: INWI_GB_KRITERIEN
        },
        {
          type: "word",
          title: "Brief formatieren – frei",
          mode: "free",
          file: "Brief_Rohtext.docx",
          intro: "Jetzt ohne Anleitung: Bringe den Brief von oben nach unten in Form. Die Checkliste zeigt dir live, was schon passt.",
          start: { font: "Arial", size: 10 },
          blocks: INWI_GB_BLOCKS,
          criteria: INWI_GB_KRITERIEN,
          hints: ["Tippe eine Zeile an und schau dann in die Leiste: Alles für die Schrift und die Absätze findest du unter Start, die Seitenränder unter Layout.", "Die Checkliste prüft automatisch – du kannst nichts kaputt machen. Mit ↺ oben startest du neu."]
        },
        {
          type: "quiz",
          title: "A3 · Die Klickwege",
          questions: [
            {
              q: "Wo stellst du die Seitenränder ein?",
              options: ["Start → Schriftart", "Layout → Seitenränder", "Start → Absatz", "Überprüfen → Rechtschreibung"],
              answer: 1,
              explain: "Die Seitenränder findest du auf der Registerkarte Layout."
            },
            {
              q: "Wie markierst du den ganzen Brief auf einmal?",
              options: ["Überprüfen → Kommentar", "Strg+A bzw. „Alles markieren“", "Jede Zeile einzeln antippen", "Datei → Speichern"],
              answer: 1,
              explain: "Strg+A markiert alles – am Handy gibt es dafür den Knopf „Alles markieren“."
            },
            {
              q: "Wie wird die Betreffzeile formatiert?",
              hint: "Zwei Dinge sind wichtig: die Schriftstärke und das, was NICHT davorsteht.",
              options: ["Kursiv und unterstrichen", "Fett – ohne das Wort „Betreff“, ohne Punkt", "Rot und mit Punkt am Ende", "Groß und mittig"],
              answer: 1,
              explain: "Fett, kurz, ohne „Betreff“ und ohne Punkt am Ende."
            },
            {
              q: "Das Datum soll an den rechten Rand. Was tust du?",
              options: ["Start → Absatz → Rechtsbündig (Strg+R)", "Layout → Seitenränder", "Start → Schriftgrad 8", "Die Zeile mit Leerzeichen nach rechts schieben"],
              answer: 0,
              explain: "Rechtsbündig ausrichten ist sauber – Leerzeichen schieben ist Handarbeit und verrutscht."
            },
            {
              q: "Warum stellt man zuerst die Grundschrift für den ganzen Text ein?",
              options: ["Damit alle Zeilen einheitlich sind", "Weil Word sonst abstürzt", "Damit die Seitenränder verschwinden", "Dann braucht man die Betreffzeile nicht"],
              answer: 0,
              explain: "Erst die Grundschrift (Strg+A → Calibri 11), dann die Ausnahmen wie die 8-pt-Rücksendeangabe."
            }
          ]
        },
        {
          type: "sentence",
          title: "A4 · Der Merksatz",
          case: "Bau den Merksatz fertig.",
          text: "Vor dem Tippen stelle ich zuerst {*die Seitenränder|die Schriftfarbe} ein. Die Rücksendeangabe wird {*klein|fett}. Das Datum steht {*rechtsbündig|linksbündig}. Die Betreffzeile ist {*fett|kursiv}. Nach der Anrede folgt eine {*Leerzeile|Linie}.",
          hints: ["Formatiere von oben nach unten – wie der Brief aufgebaut ist.", "Datum: kurz und rechts. Betreff: fett und ohne Punkt."],
          explain: "Form zuerst: Ränder, Schrift, dann die Feinheiten."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann die Seitenränder in Word einstellen (Layout → Seitenränder).",
            "Ich kann Zeilen markieren und Schriftart, Schriftgrad und Fett ändern.",
            "Ich kann das Datum rechtsbündig ausrichten (Strg+R).",
            "Ich kann Leerzeilen an den richtigen Stellen einfügen (Enter).",
            "Ich kann den Brief in Word selbstständig formatieren."
          ]
        }
      ]
    },

    /* ══════════════ KLAUSURTRAINING ══════════════ */
    {
      id: "fehlercheck",
      group: "Klausurtraining",
      title: "Typische Fehler",
      kicker: "DIN 5008 · Teil 3",
      minutes: 15,
      help: `<h3>Die häufigsten Fehler</h3>
             <ul><li>Datum links statt <strong>rechtsbündig</strong>, lang statt kurz.</li>
             <li>„Betreff:“ davor oder Punkt am Ende.</li>
             <li>Anrede ohne Komma oder ohne Leerzeile.</li>
             <li>Keine Leerzeile vor der PLZ.</li>
             <li>Grußformel mit Komma.</li>
             <li>Zu wenig Platz für die Unterschrift.</li></ul>
             <h3>Die Prüf-Reihenfolge</h3>
             <p class="formula">Briefkopf → Anschrift → Datum → Betreff → Anrede → Text → Gruß → Unterschrift → Anlagen</p>
             <h3>Warum die Form zählt</h3>
             <p>Der Empfänger findet jede Information an der Stelle, die er erwartet – und die Post liest die Anschrift maschinell.</p>`,
      steps: [
        {
          type: "slides",
          title: "Fehler vermeiden",
          slides: [
            {
              style: "dark",
              kicker: "Klausurtraining",
              title: "Diese Fehler kosten Punkte.",
              body: `<ul><li>Datum links statt <strong>rechtsbündig</strong> – und lang statt kurz</li>
                     <li>„Betreff:“ davor oder Punkt am Ende</li>
                     <li>Anrede ohne Komma oder ohne Leerzeile</li>
                     <li>Keine Leerzeile vor der PLZ</li>
                     <li>Grußformel mit Komma</li>
                     <li>Zu wenig Platz für die Unterschrift</li></ul>`
            },
            {
              style: "accent",
              kicker: "Prüfe von oben nach unten",
              title: "Briefkopf → Anschrift → Datum → Betreff → Anrede → Text → Gruß → Unterschrift → Anlagen.",
              body: `<p>Wer in dieser Reihenfolge kontrolliert, findet jeden Fehler.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "A5 · Richtig oder falsch?",
          prompt: "So ist es richtig formatiert – oder so ist es falsch?",
          hints: ["Frag bei jeder Karte: Verstößt das gegen eine konkrete DIN-5008-Regel?", "Datum, Betreff, Anrede, Gruß und Anschriftfeld haben feste Regeln."],
          categories: ["So ist es richtig", "So ist es falsch"],
          items: [
            { text: "Betreff: fett, ohne das Wort „Betreff“, ohne Punkt", cat: 0 },
            { text: "Betreff: „Betreff: Anfrage über Aluminiumrohre.“", cat: 1 },
            { text: "Datum: rechtsbündig, kurz als 24.09.2026", cat: 0 },
            { text: "Datum: ausgeschrieben und links im Text", cat: 1 },
            { text: "Anschriftfeld: Leerzeile zwischen Straße und PLZ", cat: 0 },
            { text: "PLZ direkt unter der Straße", cat: 1 },
            { text: "Anrede endet mit Komma, darunter eine Leerzeile", cat: 0 },
            { text: "Grußformel mit Komma: „Mit freundlichen Grüßen,“", cat: 1 },
            { text: "Drei Leerzeilen Platz für die handschriftliche Unterschrift", cat: 0 },
            { text: "Rücksendeangabe in 8 pt", cat: 0 }
          ]
        },
        {
          type: "quiz",
          title: "A6 · Der Klausurcheck",
          questions: [
            {
              q: "Warum gibt es die DIN 5008?",
              hint: "Denk an die Post und an den Empfänger.",
              options: [
                "Damit Geschäftsbriefe einheitlich aussehen und maschinell gelesen werden können",
                "Damit Briefe bunter werden",
                "Damit man weniger Porto bezahlt",
                "Damit Word schneller startet"
              ],
              answer: 0,
              explain: "Einheitliche Form: Die Post liest die Anschrift maschinell, der Empfänger findet alles an der erwarteten Stelle."
            },
            {
              q: "Die Betreffzeile lautet: „Betreff: Anfrage.“ Zwei Fehler – welche?",
              options: ["Das Wort „Betreff“ und der Punkt am Ende", "Fett und zu kurz", "Nichts, so ist es richtig", "Die Zeile müsste kursiv sein"],
              answer: 0,
              explain: "Die Betreffzeile steht ohne „Betreff“ und ohne Punkt – dafür fett."
            },
            {
              q: "Woran erkennt man, dass das Anschriftfeld stimmt?",
              options: [
                "Straße und PLZ stehen untereinander mit Leerzeile dazwischen",
                "Alles steht in einer Zeile",
                "Die PLZ steht ganz oben",
                "Der Empfänger ist fett gedruckt"
              ],
              answer: 0,
              explain: "Nur so kann die Post die Anschrift maschinell lesen."
            }
          ]
        },
        {
          type: "sentence",
          title: "A7 · Warum die Form?",
          case: "Bau den Antwortsatz: Warum ist die Form im Geschäftsleben wichtig?",
          text: "Die DIN 5008 sorgt dafür, dass Geschäftsbriefe {*einheitlich|verschieden} aussehen. Die Post kann die {*Anschrift|Unterschrift} maschinell lesen. Ein fehlerhaft formatierter Brief wirkt {*unprofessionell|professionell}.",
          hints: ["Es geht um Einheitlichkeit – nicht um Schönheit.", "Was kann die Post maschinell lesen?"],
          explain: "Der Empfänger findet jede Information an der erwarteten Stelle – das spart Zeit und wirkt professionell."
        },
        {
          type: "selfcheck",
          title: "Klausurcheck",
          items: [
            "Ich kann typische DIN-5008-Fehler erkennen und verbessern.",
            "Ich kann erklären, warum es die DIN 5008 gibt.",
            "Ich kann mein Ergebnis mit der Checkliste kontrollieren.",
            "Ich bin bereit für die Klausur."
          ]
        }
      ]
    }
  ]
});
