/* Kurs „PowerPoint üben“ (INWI) – Prototyp der PowerPoint-Simulation (Schritt-Typ "ppt", app/sim-ppt.js) */

const PPT_FIRMA = [
  { layout: "titel", title: "Fly Bike Werke GmbH", body: ["Wir stellen uns vor"] },
  { layout: "inhalt", title: "Unsere Produkte", body: ["E-Bike", "Citybike", "Mountainbike"] },
  { layout: "inhalt", title: "Kontakt", body: ["Rostocker Str. 334", "26121 Oldenburg"] }
];

LERNRAUM.subjects.push({
  id: "inwi-powerpoint",
  fach: "INWI",
  added: "2026-10-21",
  name: "PowerPoint üben",
  course: "INWI · HHU",
  glyph: "P",
  color: "#E8683B",
  company: "Fly Bike Werke GmbH",
  description: "Eine Präsentation bauen wie in PowerPoint – Folien, Layout, Bilder, Design, Übergänge, Animationen und Folienmaster. Direkt am Handy üben.",
  topics: [

    /* ══════════════ FOLIEN BAUEN ══════════════ */
    {
      id: "folien-bauen",
      group: "PowerPoint-Praxis",
      title: "Folien bauen",
      kicker: "PowerPoint · Teil 1",
      minutes: 15,
      help: `<h3>Die Bausteine einer Folie</h3>
             <ul><li><strong>Titel</strong> und <strong>Text</strong> sind Platzhalter. Tippe darauf, dann auf „Text ändern“.</li>
             <li>Das <strong>Layout</strong> bestimmt, welche Felder da sind (Titelfolie, Titel und Inhalt, Nur Titel, Leer).</li></ul>
             <h3>Wo finde ich was?</h3>
             <dl class="terms">
               <dt>Start</dt><dd>Neue Folie, Layout, Folie löschen oder verschieben, Text formatieren.</dd>
               <dt>Einfügen</dt><dd>Bilder, Tabellen, Formen.</dd>
             </dl>
             <h3>Gute Folien</h3>
             <p>Wenig Text, große Schrift, ein Gedanke pro Folie.</p>`,
      steps: [
        {
          type: "slides",
          title: "So sieht PowerPoint aus",
          slides: [
            {
              style: "dark",
              kicker: "Präsentation · Fly Bike Werke GmbH",
              title: "Du baust eine Firmenvorstellung.",
              body: `<p>Die Fly Bike Werke GmbH stellt sich vor. Du baust die Folien selbst – in einer <strong>PowerPoint-Simulation</strong>.</p>
                     <p>Sie funktioniert am Handy genauso wie am PC.</p>`
            },
            {
              kicker: "Bedienung",
              title: "Antippen, dann Knopf.",
              body: `<ul><li><strong>Folie wechseln:</strong> unten in der Folienleiste (am PC links).</li>
                     <li><strong>Feld markieren:</strong> auf Titel oder Text tippen. Ein zweites Tippen öffnet die Texteingabe.</li>
                     <li><strong>Reiter:</strong> oben Start, Einfügen, Entwurf … – die Knöpfe lassen sich seitwärts wischen.</li></ul>
                     <p class="note">Der nächste Hinweis pulsiert orange. Mit „Probe“ prüfst du jede Aufgabe.</p>`
            }
          ]
        },
        {
          type: "ppt",
          title: "Firmenvorstellung bauen – geführt",
          mode: "guided",
          file: "Fly-Bike-Vorstellung.pptx",
          intro: "Die Präsentation ist noch leer. Löse eine Aufgabe nach der anderen.",
          deck: { theme: "office", slides: [{ layout: "titel", title: "", body: [] }] },
          criteria: [
            {
              label: "Titelfolie: Titel „Fly Bike Werke GmbH“",
              hint: "Tippe auf „Titel hinzufügen“, tippe nochmal und schreibe: Fly Bike Werke GmbH.",
              checks: [{ op: "text", slide: 0, el: "title", value: "Fly Bike Werke GmbH" }],
              task: { wo: "Folie 1 → Titelfeld antippen → nochmal antippen", was: "Schreibe als Titel: Fly Bike Werke GmbH. Mit „OK“ bestätigen.", probe: "Der Titel steht groß in der Mitte der Titelfolie." }
            },
            {
              label: "Untertitel: „Wir stellen uns vor“",
              hint: "Das Feld darunter antippen, nochmal antippen und den Text schreiben.",
              checks: [{ op: "text", slide: 0, el: "body", value: "Wir stellen uns vor" }],
              task: { wo: "Textfeld unter dem Titel", was: "Schreibe: Wir stellen uns vor.", probe: "Der Untertitel ist zentriert." }
            },
            {
              label: "Neue Folie „Titel und Inhalt“",
              hint: "Start → Neue Folie → „Titel und Inhalt“ wählen.",
              checks: [{ op: "count", value: 2 }, { op: "layout", slide: 1, value: "inhalt" }],
              task: { wo: "Start → Gruppe Folien → Neue Folie ▾", was: "Füge hinter der Titelfolie eine Folie mit dem Layout „Titel und Inhalt“ ein.", probe: "In der Folienleiste gibt es jetzt zwei Folien." }
            },
            {
              label: "Folie 2: Titel „Unsere Produkte“ und drei Aufzählungspunkte",
              hint: "Titel antippen (zweimal) und schreiben. Dann das Textfeld: drei Zeilen, z. B. E-Bike, Citybike, Mountainbike.",
              checks: [{ op: "text", slide: 1, el: "title", value: "Unsere Produkte" }, { op: "lines", slide: 1, min: 3 }],
              task: { wo: "Folie 2 → Titel und Textfeld", was: "Titel: Unsere Produkte. Text: drei Produkte, jedes in einer eigenen Zeile.", probe: "Die drei Punkte haben Aufzählungszeichen." }
            },
            {
              label: "Titel fett und 40 pt",
              hint: "Titel einmal antippen (markieren), dann F und die Schriftgröße 40 wählen.",
              checks: [{ op: "fmt", slide: 1, el: "title", prop: "bold", value: true }, { op: "fmt", slide: 1, el: "title", prop: "size", value: 40 }],
              task: { wo: "Titel markieren → Start → Gruppe Text", was: "Mache den Titel fett (F) und stelle die Schriftgröße auf 40.", probe: "Der Titel ist kräftiger und etwas kleiner als vorher." }
            },
            {
              label: "Bild „Fahrrad“ einfügen",
              hint: "Reiter Einfügen → Bild einfügen → Fahrrad.",
              checks: [{ op: "pic", slide: 1, value: "fahrrad" }],
              task: { wo: "Einfügen → Bild einfügen ▾", was: "Füge auf Folie 2 das Bild „Fahrrad“ ein.", probe: "Rechts neben der Liste steht ein Fahrrad." }
            },
            {
              label: "Neue Folie „Wir sind für Sie da“ mit Bild „Person“",
              hint: "Start → Neue Folie → Titel und Inhalt. Titel schreiben. Dann Einfügen → Bild → Person.",
              checks: [{ op: "count", value: 3 }, { op: "text", slide: 2, el: "title", value: "Wir sind für Sie da" }, { op: "pic", slide: 2, value: "person" }],
              task: { wo: "Start → Neue Folie, dann Einfügen → Bild", was: "Neue Folie „Titel und Inhalt“ mit dem Titel „Wir sind für Sie da“ und dem Bild „Person“.", probe: "Die Präsentation hat jetzt drei Folien." }
            },
            {
              label: "Reihenfolge: „Wir sind für Sie da“ an zweite Stelle",
              hint: "Wähle die Folie „Wir sind für Sie da“ und schiebe sie mit ▲ Hoch auf Platz 2.",
              checks: [{ op: "pos", title: "Wir sind für Sie da", value: 2 }],
              task: { wo: "Start → Gruppe Folien → ▲ Hoch / ▼ Runter", was: "Verschiebe die Folie „Wir sind für Sie da“ auf Platz 2, vor „Unsere Produkte“.", probe: "In der Folienleiste steht sie jetzt als zweite Folie." }
            }
          ]
        }
      ]
    },

    /* ══════════════ DESIGN, ÜBERGÄNGE, ANIMATIONEN ══════════════ */
    {
      id: "design-effekte",
      group: "PowerPoint-Praxis",
      title: "Design, Übergänge, Animationen",
      kicker: "PowerPoint · Teil 2",
      minutes: 15,
      help: `<h3>Drei Reiter, drei Aufgaben</h3>
             <dl class="terms">
               <dt>Entwurf</dt><dd>Das <strong>Design</strong> bestimmt Farben für die ganze Präsentation.</dd>
               <dt>Übergänge</dt><dd>Der <strong>Übergang</strong> ist der Wechsel von einer Folie zur nächsten. „Auf alle anwenden“ gilt für jede Folie.</dd>
               <dt>Animationen</dt><dd>Eine <strong>Animation</strong> bewegt ein einzelnes Feld auf der Folie, z. B. Einfliegen.</dd>
             </dl>
             <h3>Weniger ist mehr</h3>
             <p>Ein Übergang für alle Folien wirkt ruhig. Animationen nur sparsam einsetzen.</p>`,
      steps: [
        {
          type: "ppt",
          title: "Effekte einstellen – geführt",
          mode: "guided",
          file: "Fly-Bike-Vorstellung.pptx",
          intro: "Die Firmenvorstellung ist fertig gebaut. Jetzt bekommt sie Design und Effekte. Tipp: Im Reiter „Bildschirmpräsentation“ siehst du am Ende alles in Aktion.",
          deck: { theme: "office", slides: PPT_FIRMA },
          criteria: [
            {
              label: "Design „Grün“ wählen",
              hint: "Reiter Entwurf → Design „Grün“ antippen.",
              checks: [{ op: "theme", value: "gruen" }],
              task: { wo: "Entwurf → Gruppe Designs", was: "Wähle das Design „Grün“.", probe: "Alle Folien haben jetzt einen grünlichen Hintergrund." }
            },
            {
              label: "Übergang „Schieben“ für alle Folien",
              hint: "Reiter Übergänge → Übergang ▾ → Schieben. Danach „Auf alle anwenden“.",
              checks: [{ op: "trans", slide: "all", value: "schieben" }],
              task: { wo: "Übergänge → Übergang ▾ und Auf alle anwenden", was: "Stelle für Folie 1 „Schieben“ ein und übertrage ihn auf alle Folien.", probe: "In der Folienleiste zeigt jede Folie ein ✦." }
            },
            {
              label: "Folie 2: Liste „Einfliegen“",
              hint: "Folie 2 wählen, das Textfeld markieren, dann Animationen → Animation ▾ → Einfliegen.",
              checks: [{ op: "anim", slide: 1, el: "body", value: "einfliegen" }],
              task: { wo: "Folie 2 → Textfeld markieren → Animationen", was: "Das Textfeld mit den Produkten soll einfliegen.", probe: "Am Textfeld erscheint ein ★. Die Vorschau zeigt das Einfliegen." }
            },
            {
              label: "Folie 3: Titel „Zoom“",
              hint: "Folie 3 wählen, den Titel markieren, dann Animationen → Animation ▾ → Zoom.",
              checks: [{ op: "anim", slide: 2, el: "title", value: "zoom" }],
              task: { wo: "Folie 3 → Titel markieren → Animationen", was: "Der Titel „Kontakt“ soll mit „Zoom“ erscheinen.", probe: "Auch hier steht ein ★ am Titel." }
            }
          ]
        }
      ]
    },

    /* ══════════════ FOLIENMASTER ══════════════ */
    {
      id: "folienmaster",
      group: "PowerPoint-Praxis",
      title: "Folienmaster",
      kicker: "PowerPoint · Teil 3",
      minutes: 10,
      help: `<h3>Einmal ändern, überall gültig</h3>
             <p>Der <strong>Folienmaster</strong> legt fest, wie Titel und Text auf <em>allen</em> Folien aussehen. Wer ihn ändert, muss nicht jede Folie einzeln anpassen.</p>
             <h3>So geht es</h3>
             <ol><li>Ansicht → <strong>Folienmaster</strong></li>
             <li>Mastertitel formatieren (Farbe, Größe, Fett, Schriftart)</li>
             <li><strong>Masteransicht schließen</strong></li></ol>`,
      steps: [
        {
          type: "slides",
          title: "Warum ein Master?",
          slides: [
            {
              kicker: "Die Lösung",
              title: "Eine Änderung. Alle Folien.",
              body: `<p>Du hast zehn Folien und der Chef will blaue Titel. Ohne Master änderst du zehnmal.</p>
                     <p>Mit dem <strong>Folienmaster</strong> änderst du einmal – alle Titel passen sich an.</p>`
            }
          ]
        },
        {
          type: "ppt",
          title: "Titelformat im Master ändern – geführt",
          mode: "guided",
          file: "Fly-Bike-Vorstellung.pptx",
          intro: "Alle drei Titel sollen gleich aussehen – ohne dass du jede Folie anfasst.",
          deck: { theme: "office", slides: PPT_FIRMA },
          criteria: [
            {
              label: "Folienmaster öffnen",
              hint: "Reiter Ansicht → Folienmaster.",
              checks: [{ op: "view", value: "master" }],
              task: { wo: "Ansicht → Gruppe Masteransichten", was: "Öffne den Folienmaster.", probe: "Oben steht nur noch der Reiter „Folienmaster“." }
            },
            {
              label: "Mastertitel: blau, 40 pt, fett",
              hint: "Farbe ▾ → Blau, dann die Größe 40 wählen und F antippen.",
              checks: [{ op: "master", prop: "titleColor", value: "#1f4e9c" }, { op: "master", prop: "titleSize", value: 40 }, { op: "master", prop: "titleBold", value: true }],
              task: { wo: "Folienmaster → Gruppe Mastertitel", was: "Farbe Blau, Schriftgrad 40, Fett.", probe: "Der Mastertitel ist blau und kräftig." }
            },
            {
              label: "Schriftart Arial für alle Folien",
              hint: "Schriftart ▾ → Arial.",
              checks: [{ op: "master", prop: "font", value: "Arial" }],
              task: { wo: "Folienmaster → Schriftart ▾", was: "Stelle die Schriftart auf Arial.", probe: "Titel und Text sind jetzt in Arial." }
            },
            {
              label: "Masteransicht schließen",
              hint: "Tippe auf „Masteransicht schließen“.",
              checks: [{ op: "view", value: "normal" }],
              task: { wo: "Folienmaster → Masteransicht schließen", was: "Schließe den Master und schau dir deine Folien an.", probe: "Alle drei Titel sind blau, ohne dass du sie einzeln geändert hast." }
            }
          ]
        }
      ]
    },

    /* ══════════════ SELBST BAUEN ══════════════ */
    {
      id: "mini-praesentation",
      group: "PowerPoint-Praxis",
      title: "Mini-Präsentation selbst bauen",
      kicker: "PowerPoint · Übung",
      minutes: 15,
      help: `<h3>Ohne Anleitung</h3>
             <p>Die Checkliste zeigt, was fehlt. Die Reihenfolge ist egal. Mit „Prüfen“ siehst du, was noch offen ist.</p>
             <p>Wenn du nicht weiterkommst: Merkkasten der Themen davor.</p>`,
      steps: [
        {
          type: "ppt",
          title: "Mini-Präsentation – frei",
          mode: "free",
          file: "Fly-Bike-Praesentation.pptx",
          intro: "Baue die Präsentation selbst. Die Checkliste oben zeigt, was gefordert ist.",
          deck: { theme: "office", slides: [{ layout: "titel", title: "", body: [] }] },
          hints: ["Nutze die Reiter: Start (Folien, Text), Einfügen (Bild), Entwurf (Design), Übergänge, Animationen.", "Tippe ein Feld zweimal an, um den Text zu ändern."],
          criteria: [
            { label: "Titelfolie mit dem Titel „Fly Bike Werke GmbH“", hint: "Folie 1: Titel eintragen.", checks: [{ op: "layout", slide: 0, value: "titel" }, { op: "text", slide: 0, el: "title", value: "Fly Bike Werke GmbH" }] },
            { label: "Drei Folien insgesamt", hint: "Start → Neue Folie.", checks: [{ op: "count", value: 3 }] },
            { label: "Folie 2: Titel „Unsere Produkte“ mit mindestens drei Punkten", hint: "Layout „Titel und Inhalt“ verwenden.", checks: [{ op: "layout", slide: 1, value: "inhalt" }, { op: "text", slide: 1, el: "title", value: "Unsere Produkte" }, { op: "lines", slide: 1, min: 3 }] },
            { label: "Folie 2: Bild „Fahrrad“", hint: "Einfügen → Bild einfügen.", checks: [{ op: "pic", slide: 1, value: "fahrrad" }] },
            { label: "Folie 3: Titel „Kontakt“ in Fett", hint: "Titel markieren, F antippen.", checks: [{ op: "text", slide: 2, el: "title", value: "Kontakt" }, { op: "fmt", slide: 2, el: "title", prop: "bold", value: true }] },
            { label: "Design „Dunkelblau“", hint: "Reiter Entwurf.", checks: [{ op: "theme", value: "dunkel" }] },
            { label: "Übergang „Überblenden“ auf allen Folien", hint: "Übergänge → Auf alle anwenden.", checks: [{ op: "trans", slide: "all", value: "blende" }] },
            { label: "Folie 2: Textfeld mit Animation „Verblassen“", hint: "Textfeld markieren, Reiter Animationen.", checks: [{ op: "anim", slide: 1, el: "body", value: "verblassen" }] }
          ]
        }
      ]
    }
  ]
});
