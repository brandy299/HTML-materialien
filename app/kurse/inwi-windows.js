/* Kurs „Windows & Dateien“ (INWI) – nutzt die Windows-Simulation (Schritt-Typ "win", app/sim-win.js) */

LERNRAUM.subjects.push({
  id: "inwi-windows",
  fach: "INWI",
  added: "2026-10-21",
  name: "Windows & Dateien",
  course: "INWI · HHU",
  glyph: "W",
  color: "#0067C0",
  company: "Fly Bike Werke GmbH",
  description: "Mit Windows sicher umgehen: Startmenü, Datei-Explorer, Ordner anlegen, kopieren, verschieben, löschen, sortieren, suchen. Direkt am Handy üben.",
  topics: [

    /* ══════════════ EXPLORER ══════════════ */
    {
      id: "explorer-start",
      group: "Windows-Grundlagen",
      title: "Desktop und Datei-Explorer",
      kicker: "Windows · Teil 1",
      minutes: 15,
      help: `<h3>Der Desktop</h3>
             <p>Unten die <strong>Taskleiste</strong> mit dem <strong>Startmenü</strong> (Windows-Zeichen). Auf dem Desktop liegen Symbole. <strong>Doppelklick</strong> (am Handy: zweimal schnell tippen) öffnet sie.</p>
             <h3>Der Datei-Explorer</h3>
             <dl class="terms">
               <dt>Adressleiste</dt><dd>zeigt den Weg zum Ordner: Dieser PC › Dokumente › Fly Bike. Tippe auf einen Teil, um dorthin zu springen.</dd>
               <dt>▲</dt><dd>eine Ebene nach oben.</dd>
               <dt>Ansicht</dt><dd>Symbole oder Details (Typ, Größe, Datum).</dd>
               <dt>Sortieren</dt><dd>nach Name, Datum, Typ oder Größe.</dd>
               <dt>Dateiendung</dt><dd>der Teil nach dem Punkt, z. B. .docx (Word) oder .xlsx (Excel).</dd>
             </dl>`,
      steps: [
        {
          type: "slides",
          title: "Zurechtfinden",
          slides: [
            {
              style: "dark",
              kicker: "Windows · Fly Bike Werke GmbH",
              title: "Wo liegt die Datei?",
              body: `<p>Im Büro musst du Dateien schnell finden und ordentlich ablegen. Dazu brauchst du den <strong>Datei-Explorer</strong>.</p>`
            },
            {
              kicker: "Bedienung",
              title: "Antippen und zweimal tippen.",
              body: `<ul><li><strong>Einmal tippen:</strong> Datei oder Ordner markieren.</li>
                     <li><strong>Zweimal schnell tippen:</strong> öffnen (Doppelklick).</li>
                     <li><strong>Leiste oben:</strong> Neu, Ausschneiden, Kopieren, Einfügen, Umbenennen, Löschen – wische seitwärts.</li></ul>
                     <p class="note">Der nächste Hinweis pulsiert blau. Mit „Probe“ prüfst du jede Aufgabe.</p>`
            }
          ]
        },
        {
          type: "win",
          title: "Im Explorer zurechtfinden – geführt",
          mode: "guided",
          start: "desktop",
          intro: "Du siehst den Desktop. Starte den Datei-Explorer und finde dich im Dateisystem zurecht.",
          fs: {
            Desktop: ["Info.txt"],
            Dokumente: [{ n: "Fly Bike", k: ["Angebot_Mueller.docx", "Preisliste.xlsx", "Vortrag.pptx"] }, "Notizen.txt"],
            Downloads: ["Rechnung_Oktober.pdf", "Logo.png", "Foto_Messe.jpg"],
            Bilder: ["Messe1.jpg", "Messe2.jpg"]
          },
          criteria: [
            {
              label: "Datei-Explorer über das Startmenü öffnen",
              hint: "Tippe unten links auf das Windows-Zeichen und dann auf „Datei-Explorer“.",
              checks: [{ op: "explorer", value: "open" }],
              task: { wo: "Taskleiste unten links", was: "Startmenü öffnen, Datei-Explorer wählen.", probe: "Das Explorer-Fenster ist offen." }
            },
            {
              label: "Zum Ordner Dokumente › Fly Bike gehen",
              hint: "Tippe oben auf „Dokumente“, dann den Ordner „Fly Bike“ zweimal schnell antippen.",
              checks: [{ op: "at", path: "Dokumente/Fly Bike" }],
              task: { wo: "Schnellzugriff oben → Dokumente", was: "Öffne den Ordner „Fly Bike“ mit einem Doppelklick (zweimal schnell tippen).", probe: "In der Adressleiste steht Dieser PC › Dokumente › Fly Bike." }
            },
            {
              label: "Dateiendungen einblenden",
              hint: "In der Leiste auf „Dateiendungen ☐“ tippen.",
              checks: [{ op: "ext" }],
              task: { wo: "Leiste im Explorer", was: "Blende die Dateiendungen ein.", probe: "Die Namen enden jetzt auf .docx, .xlsx, .pptx." }
            },
            {
              label: "Ansicht „Details“ wählen",
              hint: "„Ansicht“ antippen und „Details“ wählen.",
              checks: [{ op: "view", value: "details" }],
              task: { wo: "Leiste → Ansicht ▾", was: "Wechsle zur Detailansicht.", probe: "Unter jedem Namen stehen Typ, Größe und Datum." }
            },
            {
              label: "Nach Größe absteigend sortieren",
              hint: "„Sortieren“ antippen, „Größe“ und „Absteigend“ wählen.",
              checks: [{ op: "sort", by: "groesse", dir: "desc" }],
              task: { wo: "Leiste → Sortieren ▾", was: "Sortiere nach Größe, die größte Datei zuerst.", probe: "Die größte Datei steht oben." }
            },
            {
              label: "Im Suchfeld nach „notizen“ suchen",
              hint: "Gehe mit ▲ eine Ebene nach oben (nach Dokumente) und tippe ins Suchfeld: notizen",
              checks: [{ op: "search", query: "notizen" }],
              task: { wo: "Suchfeld oben rechts", was: "Tippe notizen ins Suchfeld. Die Suche zeigt alle Treffer im aktuellen Ordner und darunter.", probe: "Die Datei Notizen erscheint als Treffer." }
            }
          ]
        }
      ]
    },

    /* ══════════════ ORDNER ANLEGEN ══════════════ */
    {
      id: "ordner-anlegen",
      group: "Windows-Grundlagen",
      title: "Ordner anlegen und umbenennen",
      kicker: "Windows · Teil 2",
      minutes: 15,
      help: `<h3>Neu → Ordner</h3>
             <p>Im richtigen Ordner auf <strong>Neu ▾</strong> tippen, dann <strong>Ordner</strong>, Namen eingeben, OK.</p>
             <h3>Umbenennen</h3>
             <p>Datei markieren, <strong>Umbenennen</strong>. Die Endung (z. B. .txt) bleibt erhalten.</p>
             <h3>Gute Namen</h3>
             <ul><li>Kurz und eindeutig: <strong>Rechnungen</strong>, nicht „Neuer Ordner 2“.</li>
             <li>Nicht erlaubt: \\ / : * ? " &lt; &gt; |</li></ul>`,
      steps: [
        {
          type: "win",
          title: "Ordnerstruktur aufbauen – geführt",
          mode: "guided",
          intro: "Die Fly Bike Werke brauchen Ordnung. Du baust die Ablage im Ordner „Dokumente“ auf.",
          fs: { Dokumente: [], Desktop: ["Info.txt"] },
          criteria: [
            {
              label: "In Dokumente: Ordner „Fly Bike“ anlegen",
              hint: "Tippe oben auf „Dokumente“, dann Neu ▾ → Ordner, Namen Fly Bike eingeben und OK.",
              checks: [{ op: "exists", path: "Dokumente/Fly Bike", type: "folder" }],
              task: { wo: "Dokumente → Neu ▾ → Ordner", was: "Lege einen Ordner mit dem Namen Fly Bike an.", probe: "Der Ordner steht in Dokumente." }
            },
            {
              label: "Darin die Ordner „Rechnungen“ und „Angebote“ anlegen",
              hint: "Öffne „Fly Bike“ (zweimal tippen) und lege die beiden Ordner nacheinander an.",
              checks: [{ op: "exists", path: "Dokumente/Fly Bike/Rechnungen", type: "folder" }, { op: "exists", path: "Dokumente/Fly Bike/Angebote", type: "folder" }],
              task: { wo: "Im Ordner Fly Bike", was: "Zwei neue Ordner: Rechnungen und Angebote.", probe: "Beide Ordner liegen in Fly Bike." }
            },
            {
              label: "In Fly Bike: Textdokument „Notizen“ erstellen",
              hint: "Gehe in Fly Bike. Neu ▾ → Textdokument, Name Notizen, OK. Die Endung .txt kommt automatisch.",
              checks: [{ op: "exists", path: "Dokumente/Fly Bike/Notizen.txt", type: "file" }],
              task: { wo: "Im Ordner Fly Bike → Neu ▾", was: "Lege ein Textdokument Notizen an.", probe: "Notizen.txt liegt in Fly Bike." }
            },
            {
              label: "Notizen.txt in „Besprechung.txt“ umbenennen",
              hint: "Datei antippen (markieren), dann „Umbenennen“ und Besprechung schreiben.",
              checks: [{ op: "exists", path: "Dokumente/Fly Bike/Besprechung.txt" }, { op: "notExists", path: "Dokumente/Fly Bike/Notizen.txt" }],
              task: { wo: "Datei markieren → Umbenennen", was: "Neuer Name: Besprechung. Die Endung bleibt .txt.", probe: "Die Datei heißt jetzt Besprechung.txt." }
            }
          ]
        }
      ]
    },

    /* ══════════════ KOPIEREN, VERSCHIEBEN, LÖSCHEN ══════════════ */
    {
      id: "dateien-ordnen",
      group: "Windows-Grundlagen",
      title: "Kopieren, Verschieben, Löschen",
      kicker: "Windows · Teil 3",
      minutes: 20,
      help: `<h3>Kopieren oder Verschieben?</h3>
             <dl class="terms">
               <dt>Kopieren + Einfügen</dt><dd>Die Datei ist danach <strong>zweimal</strong> da: Original und Kopie.</dd>
               <dt>Ausschneiden + Einfügen</dt><dd>Die Datei <strong>wandert</strong> – am alten Ort ist sie weg.</dd>
             </dl>
             <h3>Reihenfolge</h3>
             <ol><li>Datei markieren</li><li>Kopieren oder Ausschneiden</li><li>Zielordner öffnen</li><li>Einfügen</li></ol>
             <h3>Mehrere Dateien</h3>
             <p>Tippe auf „Mehrere“, dann antippen, was du brauchst. Am PC: Strg halten und klicken.</p>
             <h3>Löschen</h3>
             <p>Gelöschtes landet im <strong>Papierkorb</strong>. Dort kann man es <strong>wiederherstellen</strong>. Erst „Endgültig löschen“ entfernt es wirklich.</p>`,
      steps: [
        {
          type: "win",
          title: "Dateien einsortieren – geführt",
          mode: "guided",
          intro: "Der Download-Ordner ist voll. Sortiere die Dateien in die Fly-Bike-Ordner.",
          fs: {
            Downloads: ["Rechnung_Oktober.pdf", "Rechnung_November.pdf", "Logo.png", "Foto_Messe.jpg", "altes_Angebot.docx"],
            Dokumente: [{ n: "Fly Bike", k: [{ n: "Rechnungen", k: [] }, { n: "Bilder", k: [] }] }]
          },
          criteria: [
            {
              label: "Logo.png kopieren nach Dokumente › Fly Bike › Bilder",
              hint: "Downloads öffnen, Logo markieren, Kopieren. Dann nach Dokumente › Fly Bike › Bilder gehen und Einfügen.",
              checks: [{ op: "exists", path: "Dokumente/Fly Bike/Bilder/Logo.png" }, { op: "exists", path: "Downloads/Logo.png" }],
              task: { wo: "Downloads → Kopieren → Zielordner → Einfügen", was: "Kopiere das Logo. Das Original soll in Downloads bleiben.", probe: "Logo.png liegt an beiden Orten." }
            },
            {
              label: "Beide Rechnungen in den Ordner „Rechnungen“ verschieben",
              hint: "In Downloads „Mehrere“ antippen, beide Rechnungen markieren, Ausschneiden. Dann in Dokumente › Fly Bike › Rechnungen Einfügen.",
              checks: [{ op: "exists", path: "Dokumente/Fly Bike/Rechnungen/Rechnung_Oktober.pdf" }, { op: "exists", path: "Dokumente/Fly Bike/Rechnungen/Rechnung_November.pdf" }, { op: "notExists", path: "Downloads/Rechnung_Oktober.pdf" }, { op: "notExists", path: "Downloads/Rechnung_November.pdf" }],
              task: { wo: "Downloads → Mehrere → Ausschneiden → Einfügen", was: "Verschiebe beide Rechnungen. In Downloads sollen sie danach weg sein.", probe: "Beide Rechnungen liegen in „Rechnungen“, nicht mehr in Downloads." }
            },
            {
              label: "altes_Angebot.docx löschen (Papierkorb)",
              hint: "Gehe zu Downloads, markiere die Datei und tippe auf „Löschen“.",
              checks: [{ op: "inTrash", name: "altes_Angebot.docx" }, { op: "notExists", path: "Downloads/altes_Angebot.docx" }],
              task: { wo: "Downloads → Datei markieren → Löschen", was: "Lösche die Datei. Sie landet im Papierkorb.", probe: "Der Papierkorb enthält altes_Angebot.docx." }
            },
            {
              label: "Doch noch gebraucht: aus dem Papierkorb wiederherstellen",
              hint: "Papierkorb öffnen (oben im Schnellzugriff), Datei markieren, „Wiederherstellen“.",
              checks: [{ op: "exists", path: "Downloads/altes_Angebot.docx" }],
              task: { wo: "Schnellzugriff → Papierkorb", was: "Stelle die Datei wieder her. Sie kehrt an ihren Ursprungsort zurück.", probe: "altes_Angebot.docx liegt wieder in Downloads." }
            }
          ]
        }
      ]
    },

    /* ══════════════ ABSCHLUSS ══════════════ */
    {
      id: "aufraeumen-frei",
      group: "Windows-Anwendung",
      title: "Büro aufräumen – frei",
      kicker: "Windows · Übung",
      minutes: 20,
      help: `<h3>Ohne Anleitung</h3>
             <p>Die Checkliste zeigt, was am Ende stimmen muss. Die Reihenfolge ist egal.</p>
             <p><strong>Tipp:</strong> Erst die Ordner anlegen, dann Dateien verschieben (Ausschneiden) oder kopieren.</p>`,
      steps: [
        {
          type: "win",
          title: "Dateien richtig ablegen – frei",
          mode: "free",
          intro: "Auf dem Desktop und in Downloads liegt alles durcheinander. Bringe Ordnung hinein.",
          hints: ["Neue Ordner: Neu ▾ → Ordner.", "Verschieben: Ausschneiden + Einfügen. Kopieren: Kopieren + Einfügen.", "Die Endungen zeigst du mit „Dateiendungen“ an."],
          fs: {
            Desktop: ["Info.txt", "Foto_Messe.jpg", "Rechnung_Oktober.pdf"],
            Downloads: ["Rechnung_November.pdf", "Preisliste.xlsx", "Logo.png", "Angebot_Mueller.docx", "kaputt.zip"],
            Dokumente: [],
            Bilder: []
          },
          criteria: [
            { label: "Ordner Dokumente › Fly Bike › Rechnungen und › Angebote", hint: "Zuerst Fly Bike, dann darin die zwei Ordner.", checks: [{ op: "exists", path: "Dokumente/Fly Bike/Rechnungen", type: "folder" }, { op: "exists", path: "Dokumente/Fly Bike/Angebote", type: "folder" }] },
            { label: "Beide Rechnungen liegen in „Rechnungen“ (verschoben)", hint: "Rechnung_Oktober ist auf dem Desktop, Rechnung_November in Downloads.", checks: [{ op: "exists", path: "Dokumente/Fly Bike/Rechnungen/Rechnung_Oktober.pdf" }, { op: "exists", path: "Dokumente/Fly Bike/Rechnungen/Rechnung_November.pdf" }, { op: "notExists", path: "Desktop/Rechnung_Oktober.pdf" }, { op: "notExists", path: "Downloads/Rechnung_November.pdf" }] },
            { label: "Angebot_Mueller.docx liegt in „Angebote“ (verschoben)", hint: "Ausschneiden, nach Angebote, Einfügen.", checks: [{ op: "exists", path: "Dokumente/Fly Bike/Angebote/Angebot_Mueller.docx" }, { op: "notExists", path: "Downloads/Angebot_Mueller.docx" }] },
            { label: "Ordner Bilder › Messe mit Foto_Messe.jpg (verschoben)", hint: "Gehe nach Bilder, lege Messe an. Das Foto liegt auf dem Desktop.", checks: [{ op: "exists", path: "Bilder/Messe", type: "folder" }, { op: "exists", path: "Bilder/Messe/Foto_Messe.jpg" }, { op: "notExists", path: "Desktop/Foto_Messe.jpg" }] },
            { label: "Preisliste.xlsx zusätzlich in Fly Bike kopiert (Original bleibt)", hint: "Kopieren, nach Dokumente › Fly Bike, Einfügen.", checks: [{ op: "exists", path: "Dokumente/Fly Bike/Preisliste.xlsx" }, { op: "exists", path: "Downloads/Preisliste.xlsx" }] },
            { label: "kaputt.zip im Papierkorb", hint: "Datei in Downloads markieren, Löschen.", checks: [{ op: "inTrash", name: "kaputt.zip" }] },
            { label: "Dateiendungen sichtbar", hint: "Leiste → Dateiendungen.", checks: [{ op: "ext" }] }
          ]
        }
      ]
    }
  ]
});
