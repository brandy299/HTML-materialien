/* ============================================================
   LERNRAUM — INHALTE
   ------------------------------------------------------------
   Aufbau:  Fach (Kurs) → Themen → Schritte

   Schritt-Typen:
     slides     Präsentation zum Durchwischen
     quiz       Multiple Choice (eine richtige Antwort)
     sort       Karten in Kategorien einsortieren
     cloze      Lückentext mit Wortbank (Lücken in {geschweiften Klammern})
     calc       Rechenschema mit Zahlenfeld
     cards      Karteikarten (Vorderseite / Rückseite)
     selfcheck  Kann-Liste zur Selbsteinschätzung
     link       bestehendes HTML-Material öffnen

   Anleitung mit Beispielen: app/README.md
   ============================================================ */

/* Rechenschema als Folien-Tabelle. Werte leer lassen = Blanko-Schema. */
function schema(v = []) {
  const rows = [
    ["Ist-Personalbestand am Jahresanfang", v[0]],
    ["− voraussichtliche Abgänge", v[1]],
    ["+ erwartete Zugänge", v[2]],
    ["= Zwischensumme", v[3], "sum"],
    ["Soll-Personalbestand", v[4]],
    ["= erforderlicher Personalbedarf", v[5], "sum"]
  ];
  return `<table class="scheme">${rows.map(([l, x, c]) =>
    `<tr class="${c || ""}"><td>${l}</td><td>${x ?? "____"}</td></tr>`).join("")}</table>`;
}

/* Standard-Zeilen für den Aufgabentyp "calc" (Personalbedarf) */
function bedarfRows(ist, ab, zu, soll, opts = {}) {
  const zw = ist - ab + zu;
  const L = opts.klausur
    ? ["Ist-Personalbestand", "− Abgänge", "+ Zugänge", "= fortgeschriebener Ist-Bestand", "Soll-Bestand (Bruttopersonalbedarf)", "= Nettopersonalbedarf"]
    : ["Ist-Personalbestand am Jahresanfang", "− voraussichtliche Abgänge", "+ erwartete Zugänge", "= Zwischensumme", "Soll-Personalbestand", "= erforderlicher Personalbedarf"];
  const rows = [
    { label: L[0], value: ist },
    { label: L[1], value: ab, either: true },
    { label: L[2], value: zu },
    { label: L[3], value: zw, sum: true },
    { label: L[4], value: soll },
    { label: L[5], value: soll - zw, sum: true, signed: true }
  ];
  if (opts.split) {
    rows.push({ label: "Ersatzbedarf (Abgänge − Zugänge)", value: ab - zu, sep: true });
    rows.push({ label: "Neubedarf (Soll − ursprünglicher Ist)", value: soll - ist });
  }
  return rows;
}

window.LERNRAUM = {
  school: "Hans-Böckler-Berufskolleg",
  // Basis für "link"-Schritte: dort liegen die bestehenden Materialien
  materialBase: "https://brandy299.github.io/HTML-materialien/",
  subjects: [
    {
      id: "pbp",
      name: "Personalbedarf",
      course: "PBP · HS1",
      glyph: "P",
      color: "#F386A1",
      company: "Mediaworld e.K.",
      description: "Lernfeld 8.1 · Personalbezogene Prozesse. Rechnen statt schätzen – am Modellunternehmen Mediaworld e. K.",
      topics: [

        /* ══════════════ LS 2.1 · TEIL 1 ══════════════ */
        {
          id: "bedarf-berechnen",
          group: "Lernsituation 2.1",
          title: "Personalbedarf berechnen",
          kicker: "LS 2.1 · Teil 1",
          minutes: 20,
          steps: [
            {
              type: "slides",
              title: "Der Fall Mediaworld",
              slides: [
                {
                  style: "dark",
                  kicker: "Mediaworld e.K. · Personalplanung 2026",
                  title: "Im nächsten Jahr ändert sich einiges.",
                  body: `<p>Aktuell arbeiten <strong>21 Mitarbeiter/innen</strong> bei Mediaworld.</p>
                         <ul class="pm">
                           <li class="m">Florian Peek geht in Rente.</li>
                           <li class="m">Sabine Hauser geht in Elternzeit.</li>
                           <li class="p">Bastian Lenz wird nach der Ausbildung fest in der Buchhaltung angestellt.</li>
                           <li class="p">Ein zweiter Mitarbeiter für den Verkaufsshop wird gesucht.</li>
                         </ul>`
                },
                {
                  kicker: "Lernziel · Operator AFB II",
                  title: "Ich kann <mark>berechnen</mark>, wie viele Mitarbeiter/innen ein Unternehmen in Zukunft braucht.",
                  body: `<p class="box"><strong>berechnen</strong> heißt: Du nutzt ein Rechenschema – eine feste Reihenfolge von Schritten – und rechnest Schritt für Schritt bis zum Ergebnis.</p>`
                },
                {
                  kicker: "Grundwissen",
                  title: "Diese fünf Begriffe musst du kennen.",
                  body: `<dl class="terms">
                           <dt>Ist-Bestand</dt><dd>So viele arbeiten JETZT im Unternehmen. Mediaworld: 21.</dd>
                           <dt>Abgang (−)</dt><dd>Jemand VERLÄSST das Unternehmen. Peek geht in Rente.</dd>
                           <dt>Zugang (+)</dt><dd>Jemand KOMMT NEU dazu. Lenz wird übernommen.</dd>
                           <dt>Soll-Bestand</dt><dd>So viele werden laut Plan GEBRAUCHT.</dd>
                           <dt>Personalbedarf</dt><dd>So viele Mitarbeiter/innen FEHLEN noch.</dd>
                         </dl>`
                },
                {
                  kicker: "So rechnest du",
                  title: "Das Rechenschema",
                  body: schema() + `<p class="note">Übertrage das Schema in dein Heft.</p>`
                },
                {
                  kicker: "Vorgerechnetes Beispiel",
                  title: "Der Blumenladen",
                  body: `<p>5 Mitarbeiter/innen. Eine geht in Rente, niemand kommt dazu. Gebraucht werden weiter 5.</p>` +
                        schema([5, "− 1", "+ 0", "= 4", 5, "= + 1"]) +
                        `<p class="note">Der Blumenladen muss 1 neue Kraft einstellen.</p>`
                },
                {
                  style: "accent",
                  kicker: "Merke",
                  title: "Positiv (+) → einstellen.<br>Negativ (−) → zu viele da.",
                  body: `<p>Das Vorzeichen sagt dir, was das Unternehmen tun muss.</p>`
                }
              ]
            },
            {
              type: "sort",
              title: "Abgang oder Zugang?",
              prompt: "Verlässt jemand das Unternehmen oder kommt jemand dazu?",
              categories: ["Abgang (−)", "Zugang (+)"],
              items: [
                { text: "Florian Peek geht in Rente.", cat: 0 },
                { text: "Bastian Lenz wird nach der Ausbildung fest angestellt.", cat: 1 },
                { text: "Sabine Hauser geht in Elternzeit.", cat: 0 },
                { text: "Herr Sahin kündigt, weil er umzieht.", cat: 0 },
                { text: "Eine Aushilfe wird fest übernommen.", cat: 1 },
                { text: "Eine Mitarbeiterin kommt aus der Elternzeit zurück.", cat: 1 }
              ]
            },
            {
              type: "calc",
              title: "A1 · Mediaworld",
              case: `<b>Ist:</b> 21 Mitarbeiter/innen<br>
                     <b>Abgänge:</b> Peek (Rente), Hauser (Elternzeit)<br>
                     <b>Zugänge:</b> Lenz (nach der Ausbildung, Buchhaltung)<br>
                     <b>Soll:</b> 22 – zweite Kraft für den Verkaufsshop`,
              rows: bedarfRows(21, 2, 1, 22),
              hint: "Erst den Ist-Bestand fortschreiben: 21 − 2 + 1. Dann vom Soll abziehen.",
              result: "Mediaworld e. K. muss 2 neue Mitarbeiter/innen einstellen."
            },
            {
              type: "quiz",
              title: "A2 · Ergebnis deuten",
              questions: [
                {
                  q: "Der Personalbedarf von Mediaworld beträgt +2. Was bedeutet das?",
                  options: [
                    "Mediaworld hat 2 Mitarbeiter/innen zu viel.",
                    "Mediaworld muss 2 neue Mitarbeiter/innen einstellen.",
                    "2 Mitarbeiter/innen gehen in Rente.",
                    "Mediaworld braucht insgesamt 2 Mitarbeiter/innen."
                  ],
                  answer: 1,
                  explain: "Positiv heißt: Es fehlen Leute. Verkaufsshop und Buchhaltung müssen besetzt werden."
                },
                {
                  q: "★ Sabine Hauser kommt aus der Elternzeit zurück. Wie hoch ist der Personalbedarf jetzt?",
                  options: ["+ 3", "+ 2", "+ 1", "0"],
                  answer: 2,
                  explain: "Neuer Zugang: 20 + 1 = 21. Dann 22 − 21 = + 1."
                }
              ]
            },
            {
              type: "calc",
              title: "A3 · Fahrradwelt Krause",
              case: `Kleiner Fahrradladen mit Werkstatt.<br>
                     <b>Ist:</b> 8 Mitarbeiter/innen<br>
                     <b>Abgänge:</b> Frau Boldt (Elternzeit), Herr Sahin (Kündigung, Umzug)<br>
                     <b>Zugänge:</b> David (nach der Ausbildung übernommen)<br>
                     <b>Soll:</b> 10 – Herr Krause eröffnet eine zweite Filiale`,
              rows: bedarfRows(8, 2, 1, 10),
              hint: "8 − 2 + 1 = Zwischensumme. Dann Soll minus Zwischensumme.",
              result: "Die Fahrradwelt Krause muss 3 neue Mitarbeiter/innen einstellen."
            },
            {
              type: "quiz",
              title: "A4 · Vergleichen",
              questions: [
                {
                  q: "Mediaworld: + 2. Fahrradwelt Krause: + 3. Wer hat den größeren Personalbedarf?",
                  options: ["Mediaworld e. K.", "Fahrradwelt Krause", "Beide gleich"],
                  answer: 1,
                  explain: "+ 3 ist größer als + 2."
                },
                {
                  q: "Um wie viele Mitarbeiter/innen ist der Bedarf größer?",
                  options: ["um 1", "um 2", "um 3", "um 5"],
                  answer: 0,
                  explain: "3 − 2 = 1"
                },
                {
                  q: "Warum ist es wichtig, den Personalbedarf frühzeitig zu planen?",
                  options: [
                    "Dann braucht man kein Rechenschema.",
                    "Neue Mitarbeiter/innen zu finden und einzuarbeiten dauert Zeit.",
                    "Dann dürfen Mitarbeiter/innen nicht mehr kündigen.",
                    "Frühe Planung senkt den Mindestlohn."
                  ],
                  answer: 1,
                  explain: "Außerdem: Ohne genug Personal bleiben Aufgaben liegen – und zu viel Personal kostet unnötig Geld."
                }
              ]
            }
          ]
        },

        /* ══════════════ LS 2.1 · TEIL 2 ══════════════ */
        {
          id: "ersatz-neubedarf",
          group: "Lernsituation 2.1",
          title: "Ersatz- und Neubedarf",
          kicker: "LS 2.1 · Teil 2",
          minutes: 25,
          steps: [
            {
              type: "slides",
              title: "Bedarf zerlegen",
              slides: [
                {
                  kicker: "Rückblick · Das kannst du schon",
                  title: "Zwei Zeilen, ein Ergebnis.",
                  body: `<p class="formula">Ist − Abgänge + Zugänge = Zwischensumme</p>
                         <p class="formula">Soll − Zwischensumme = Personalbedarf</p>
                         <p class="note">Mediaworld: + 2 · Fahrradwelt Krause: + 3</p>`
                },
                {
                  kicker: "Neu",
                  title: "Ersatzbedarf",
                  body: `<p>Der Teil des Bedarfs, der ausscheidende Mitarbeiter/innen <strong>ERSETZT</strong>.</p>
                         <p class="formula">Ersatzbedarf = Abgänge − Zugänge</p>`
                },
                {
                  kicker: "Neu",
                  title: "Neubedarf",
                  body: `<p>Der Teil des Bedarfs, der durch <strong>WACHSTUM</strong> entsteht: neue Stellen, mehr Aufträge.</p>
                         <p class="formula">Neubedarf = Soll − ursprünglicher Ist</p>`
                },
                {
                  kicker: "Probe am Beispiel Mediaworld",
                  title: "Ersatz + Neu = Gesamt",
                  body: `<table class="scheme">
                           <tr><td>Ersatzbedarf: 2 − 1</td><td>1</td></tr>
                           <tr><td>Neubedarf: 22 − 21</td><td>1</td></tr>
                           <tr class="sum"><td>= gesamter Personalbedarf</td><td>+ 2</td></tr>
                         </table>
                         <p class="note">Gleiches Ergebnis wie mit dem Rechenschema.</p>`
                }
              ]
            },
            {
              type: "sort",
              title: "A5 · Filtern",
              prompt: "Ein Jahr später bei der Fahrradwelt Krause. Nicht alles ist für die Rechnung wichtig!",
              categories: ["Abgang", "Zugang", "Neue Stelle", "Nicht wichtig"],
              items: [
                { text: "Die Verkäuferin Frau Nowak kündigt zum Jahresende.", cat: 0 },
                { text: "Werkstattmeister Herr Öztürk scheidet altersbedingt aus.", cat: 0 },
                { text: "Ein Kunde hat sich über lange Wartezeiten beschwert.", cat: 3 },
                { text: "Die Auszubildende Frau Celik hat bestanden und bleibt im Verkauf.", cat: 1 },
                { text: "Ein Mitarbeiter war zwei Wochen krank, ist aber wieder da.", cat: 3 },
                { text: "In der zweiten Filiale wird eine weitere Werkstatt-Stelle geschaffen.", cat: 2 },
                { text: "Herr Krause ist mit der neuen Filiale sehr zufrieden.", cat: 3 }
              ]
            },
            {
              type: "calc",
              title: "A6 · Fahrradwelt, ein Jahr später",
              case: `<b>Ist:</b> 10 Mitarbeiter/innen<br>
                     <b>Abgänge:</b> Nowak, Öztürk<br>
                     <b>Zugang:</b> Celik<br>
                     <b>Soll:</b> 12 Mitarbeiter/innen`,
              rows: bedarfRows(10, 2, 1, 12, { split: true }),
              hint: "Ersatzbedarf: 2 − 1. Neubedarf: 12 − 10. Zusammen ergibt das den Personalbedarf.",
              result: "Personalbedarf + 3 = Ersatzbedarf 1 + Neubedarf 2."
            },
            {
              type: "calc",
              title: "A7 · Abteilungen addieren",
              case: `Bei Mediaworld ändert sich gleichzeitig etwas in drei Abteilungen.
                     <table class="mini">
                       <tr><th></th><th>Abgänge</th><th>Zugänge</th><th>Neue Stellen</th></tr>
                       <tr><td>Verkaufsshop</td><td>2</td><td>1</td><td>1</td></tr>
                       <tr><td>Lager</td><td>1</td><td>0</td><td>0</td></tr>
                       <tr><td>Buchhaltung</td><td>0</td><td>1</td><td>1</td></tr>
                     </table>`,
              rows: [
                { label: "Abgänge gesamt", value: 3 },
                { label: "Zugänge gesamt", value: 2 },
                { label: "Neue Stellen gesamt", value: 2 }
              ],
              hint: "Addiere jede Spalte von oben nach unten.",
              result: "Abgänge 3 · Zugänge 2 · Neue Stellen 2"
            },
            {
              type: "calc",
              title: "A8 · Mediaworld gesamt",
              case: `<b>Ist:</b> 21 Mitarbeiter/innen<br>
                     <b>Abgänge:</b> 3 · <b>Zugänge:</b> 2 (aus A7)<br>
                     <b>Soll:</b> 21 + 2 neue Stellen`,
              rows: bedarfRows(21, 3, 2, 23, { split: true }),
              hint: "Soll-Bestand = 21 + 2 = 23.",
              result: "Mediaworld braucht 3 neue Mitarbeiter/innen: Ersatzbedarf 1 + Neubedarf 2."
            },
            {
              type: "quiz",
              title: "A9 · Wie deckt man den Bedarf?",
              questions: [
                {
                  q: "Welche Möglichkeit ist schnell verfügbar und flexibel, aber teurer?",
                  options: ["Neueinstellung (fest)", "Zeitarbeit (Leiharbeit)", "Überstunden", "Teilzeitkräfte aufstocken"],
                  answer: 1,
                  explain: "Zeitarbeit: schnell und flexibel – aber teurer und mit geringerer Bindung ans Unternehmen."
                },
                {
                  q: "Was ist der Nachteil, wenn bestehende Mitarbeiter/innen Überstunden machen?",
                  options: ["Es dauert sehr lange.", "Sie werden überlastet – dauerhaft geht das nicht.", "Sie kennen den Betrieb nicht.", "Es ist teurer als Zeitarbeit."],
                  answer: 1,
                  explain: "Kein neues Personal nötig – aber keine Lösung auf Dauer."
                },
                {
                  q: "Welche Möglichkeit ist langfristig planbar und bindet Mitarbeiter/innen stark?",
                  options: ["Zeitarbeit", "Überstunden", "Neueinstellung (fest)", "Keine davon"],
                  answer: 2,
                  explain: "Nachteil: Es dauert lange, und eine Fehlbesetzung ist riskant."
                },
                {
                  q: "Teilzeitkräfte aufstocken – was spricht dagegen?",
                  options: ["Sie kennen den Betrieb nicht.", "Es deckt oft nicht den ganzen Bedarf.", "Es ist verboten.", "Es dauert drei Jahre."],
                  answer: 1,
                  explain: "Vorteil: Die Mitarbeiter/innen kennen den Betrieb schon."
                }
              ]
            },
            {
              type: "selfcheck",
              title: "Kann-Liste",
              items: [
                "Ich kann den Personalbedarf mit dem Rechenschema berechnen.",
                "Ich kann mein Ergebnis in eigenen Worten erklären.",
                "Ich kann Ersatzbedarf und Neubedarf unterscheiden.",
                "Ich kann begründet entscheiden, wie ein Unternehmen den Bedarf deckt."
              ]
            }
          ]
        },

        /* ══════════════ ÜBUNGSBLATT 1 ══════════════ */
        {
          id: "fachbegriffe",
          group: "Übungspaket · Klausur 1",
          title: "Fachbegriffe & Einflussfaktoren",
          kicker: "Übungsblatt 1",
          minutes: 20,
          steps: [
            {
              type: "slides",
              title: "Das Vokabular",
              slides: [
                {
                  kicker: "Brutto, Netto, Fortschreibung",
                  title: "Was gebraucht wird – und was fehlt.",
                  body: `<dl class="terms">
                           <dt>Bruttopersonalbedarf</dt><dd>Der Soll-Bestand: wie viele Beschäftigte insgesamt gebraucht werden.</dd>
                           <dt>Fortschreibung</dt><dd>Ist − Abgänge + Zugänge = fortgeschriebener Ist-Bestand.</dd>
                           <dt>Nettopersonalbedarf</dt><dd>Soll − fortgeschriebener Ist. Immer mit Vorzeichen deuten!</dd>
                         </dl>`
                },
                {
                  kicker: "Veränderungen im Personal",
                  title: "Autonom oder initiiert?",
                  body: `<div class="pair">
                           <div><b>autonom</b>Geschieht von selbst: Rente, Elternzeit, Kündigung durch Beschäftigte.</div>
                           <div><b>initiiert</b>Der Betrieb handelt bewusst: Einstellung, Versetzung, Entlassung.</div>
                         </div>`
                },
                {
                  kicker: "Einflussfaktoren",
                  title: "Extern oder intern?",
                  body: `<div class="pair">
                           <div><b>extern</b>Kommt von außen: Konjunktur, Mindestlohn, Gesetze, Arbeitsmarkt.</div>
                           <div><b>intern</b>Entscheidet der Betrieb selbst: Online-Shop eröffnen, wachsen, neue Aufgaben.</div>
                         </div>`
                }
              ]
            },
            {
              type: "quiz",
              title: "A1 · Begriffe zuordnen",
              questions: [
                { q: "Wie viele Beschäftigte der Betrieb insgesamt braucht (Soll).", options: ["Ist-Personalbestand", "Bruttopersonalbedarf", "Nettopersonalbedarf", "Fortschreibung"], answer: 1 },
                { q: "Rechnung: Ist-Bestand − Abgänge + Zugänge.", options: ["Fortschreibung", "Stellenplanmethode", "Bruttopersonalbedarf", "Ausbildungsbedarf"], answer: 0 },
                { q: "Zahl der Ausbildungsplätze, die heute für die Fachkräfte von morgen gebraucht werden.", options: ["Nettopersonalbedarf", "Ist-Personalbestand", "Ausbildungsbedarf", "Fortschreibung"], answer: 2 },
                { q: "So viele Beschäftigte arbeiten JETZT im Betrieb.", options: ["Bruttopersonalbedarf", "Ist-Personalbestand", "Stellenplanmethode", "Nettopersonalbedarf"], answer: 1 },
                { q: "Was tatsächlich neu beschafft werden muss: Soll minus fortgeschriebener Ist-Bestand.", options: ["Nettopersonalbedarf", "Bruttopersonalbedarf", "Ausbildungsbedarf", "Fortschreibung"], answer: 0 },
                { q: "Zählt die benötigten Stellen einzeln durch – genau, gut für kleine Betriebe.", options: ["Kennzahlenmethode", "Fortschreibung", "Stellenplanmethode", "Ist-Personalbestand"], answer: 2 }
              ]
            },
            {
              type: "sort",
              title: "A2 · Autonom oder initiiert?",
              prompt: "Passiert das von selbst – oder handelt der Betrieb bewusst?",
              categories: ["autonom", "initiiert"],
              items: [
                { text: "Eine Verkäuferin kündigt.", cat: 0 },
                { text: "Mediaworld stellt eine Aushilfe ein.", cat: 1 },
                { text: "Ein Lagerist geht in Rente.", cat: 0 },
                { text: "Melike versetzt eine Kraft in den Online-Shop.", cat: 1 },
                { text: "Eine Bürokraft geht in Elternzeit.", cat: 0 },
                { text: "Sofia entlässt eine Kraft wegen Fehlverhaltens.", cat: 1 },
                { text: "Eine Kraft zieht um und kündigt deswegen.", cat: 0 },
                { text: "Der Betrieb bildet ab August zwei Azubis aus.", cat: 1 }
              ]
            },
            {
              type: "sort",
              title: "A3 · Extern oder intern?",
              prompt: "Kommt der Einfluss von außen – oder entscheidet der Betrieb selbst?",
              categories: ["extern", "intern"],
              items: [
                { text: "Die Konjunktur schwächelt.", cat: 0 },
                { text: "Das Weihnachtsgeschäft steht bevor.", cat: 0 },
                { text: "Der Mindestlohn steigt.", cat: 0 },
                { text: "Der Online-Shop wird eröffnet.", cat: 1 },
                { text: "Die Arbeitslosigkeit in Oberhausen sinkt.", cat: 0 },
                { text: "Die Werkstatt bekommt neue Aufgaben.", cat: 1 },
                { text: "Neue gesetzliche Vorgaben für den Verkauf kommen.", cat: 0 },
                { text: "Sofia beschließt: Wir wachsen um 10 %.", cat: 1 }
              ]
            },
            {
              type: "cloze",
              title: "A4 · Lücken füllen",
              prompt: "Achtung: Drei Wörter passen nicht!",
              text: "Der {Ist-Personalbestand} sagt, wie viele Beschäftigte JETZT im Betrieb arbeiten. Bei der Fortschreibung zieht man die voraussichtlichen {Abgänge} ab. Bereits fest vereinbarte Einstellungen zählen als {Zugänge}. Der Soll-Bestand heißt auch {Bruttopersonalbedarf}. Was tatsächlich neu eingestellt werden muss, ist der {Nettopersonalbedarf}. Die {Stellenplanmethode} zählt jede benötigte Stelle einzeln durch.",
              distractors: ["Betriebsblindheit", "Umsatzrendite", "Stellenanzeige"]
            },
            {
              type: "quiz",
              title: "A5 · Kurz erklärt",
              questions: [
                {
                  q: "Was ist der Unterschied zwischen Brutto- und Nettopersonalbedarf?",
                  options: [
                    "Brutto ist mit Steuern, Netto ohne Steuern.",
                    "Brutto = wie viele insgesamt gebraucht werden; Netto = wie viele davon neu beschafft werden müssen.",
                    "Brutto gilt für Vollzeit, Netto für Teilzeit.",
                    "Es gibt keinen Unterschied."
                  ],
                  answer: 1,
                  explain: "Netto = Brutto (Soll) − fortgeschriebener Ist-Bestand."
                },
                {
                  q: "Ein Betrieb plant zu wenig Personal ein. Was kann passieren?",
                  options: [
                    "Die Personalkosten steigen stark.",
                    "Kunden warten lange, Aufgaben bleiben liegen, die Beschäftigten werden überlastet.",
                    "Es passiert nichts.",
                    "Der Betrieb muss Personal abbauen."
                  ],
                  answer: 1,
                  explain: "Zu viel Personal kostet dagegen unnötig Geld."
                }
              ]
            }
          ]
        },

        /* ══════════════ ÜBUNGSBLATT 2 ══════════════ */
        {
          id: "stellenplan-kennzahlen",
          group: "Übungspaket · Klausur 1",
          title: "Stellenplan & Kennzahlen",
          kicker: "Übungsblatt 2",
          minutes: 15,
          steps: [
            {
              type: "slides",
              title: "Zwei Methoden",
              slides: [
                {
                  kicker: "Wie ermittelt man den Bruttopersonalbedarf?",
                  title: "Zwei Methoden",
                  body: `<div class="pair">
                           <div><b>Stellenplan</b>Jede Stelle und Aufgabe wird einzeln durchgezählt. Genau – aber aufwendig. Gut für kleine Betriebe.</div>
                           <div><b>Kennzahlen</b>Umsatz ÷ Umsatz je Vollzeitstelle. Schnell – aber nur eine grobe Schätzung.</div>
                         </div>`
                },
                {
                  style: "dark",
                  kicker: "Kennzahlenmethode",
                  title: "Umsatz ÷ Umsatz je Vollzeitstelle",
                  body: `<p class="formula">3 600 000 € ÷ 200 000 € = 18 Stellen</p>
                         <p>Sie schaut nur auf den Umsatz – nicht darauf, welche Bereiche wirklich Personal brauchen.</p>`
                }
              ]
            },
            {
              type: "sort",
              title: "A1 · Welche Methode?",
              prompt: "Passt die Aussage zur Stellenplan- oder zur Kennzahlenmethode?",
              categories: ["Stellenplan", "Kennzahlen"],
              items: [
                { text: "Zählt jede Stelle einzeln durch.", cat: 0 },
                { text: "Rechnet mit dem Umsatz.", cat: 1 },
                { text: "Ist bei kleinen Betrieben genauer.", cat: 0 },
                { text: "Geht schnell und ist einfach.", cat: 1 },
                { text: "Berücksichtigt nicht, welche Bereiche Personal brauchen.", cat: 1 },
                { text: "Ist bei Umsatzschwankungen schnell veraltet.", cat: 1 },
                { text: "Gut geeignet für eine grobe Schätzung.", cat: 1 },
                { text: "Zeigt genau, welche Aufgaben Personal brauchen.", cat: 0 }
              ]
            },
            {
              type: "calc",
              title: "A2 · Kennzahlen rechnen",
              case: `Rechne: <b>Umsatz ÷ Umsatz je Vollzeitstelle</b>.`,
              rows: [
                { label: "Elektromarkt: 3 600 000 € ÷ 200 000 €", value: 18 },
                { label: "Möbelhaus: 2 800 000 € ÷ 140 000 €", value: 20 },
                { label: "Mediaworld: 3 400 000 € ÷ 200 000 €", value: 17 }
              ],
              hint: "Tipp: Streiche bei beiden Zahlen gleich viele Nullen. 3 600 000 ÷ 200 000 = 36 ÷ 2.",
              result: "Elektromarkt 18 · Möbelhaus 20 · Mediaworld 17 Vollzeitstellen."
            },
            {
              type: "quiz",
              title: "A3 · A4 · Methode wählen",
              questions: [
                {
                  q: "Ein kleiner Familienbetrieb mit 8 Beschäftigten plant seinen Personalbedarf. Welche Methode passt?",
                  options: ["Stellenplanmethode", "Kennzahlenmethode"],
                  answer: 0,
                  explain: "Bei wenigen Stellen kann man jede einzeln durchzählen – das ist genauer."
                },
                {
                  q: "Eine Kaufhauskette mit 600 Beschäftigten will schnell einen Überblick. Welche Methode passt?",
                  options: ["Stellenplanmethode", "Kennzahlenmethode"],
                  answer: 1,
                  explain: "Bei 600 Stellen wäre das Durchzählen sehr aufwendig. Die Kennzahl liefert schnell eine Schätzung."
                },
                {
                  q: "Warum ist die Kennzahlenmethode nur eine grobe Schätzung?",
                  options: [
                    "Weil man dafür einen Taschenrechner braucht.",
                    "Weil sie nur mit dem Umsatz rechnet und nicht zeigt, welche Aufgaben wirklich Personal brauchen.",
                    "Weil sie nur für kleine Betriebe gilt.",
                    "Weil der Umsatz immer gleich bleibt."
                  ],
                  answer: 1,
                  explain: "Außerdem ist sie bei Umsatzschwankungen schnell veraltet."
                }
              ]
            }
          ]
        },

        /* ══════════════ AUSBILDUNG ══════════════ */
        {
          id: "ausbildungsbedarf",
          group: "Übungspaket · Klausur 1",
          title: "Ausbildungsbedarf",
          kicker: "Fachkräfte von morgen",
          minutes: 10,
          steps: [
            {
              type: "slides",
              title: "Selbst ausbilden",
              slides: [
                {
                  kicker: "Ausbildungsbedarf",
                  title: "Wie viele Ausbildungsplätze pro Jahr?",
                  body: `<p class="formula">benötigte Fachkräfte ÷ Ausbildungsjahre = Plätze pro Jahr</p>
                         <p class="note">Beispiel: 9 Fachkräfte in 3 Jahren → 3 Plätze pro Jahr.</p>`
                },
                {
                  kicker: "Kosten und Nutzen",
                  title: "Lohnt sich Ausbildung?",
                  body: `<div class="pair">
                           <div><b>Kosten</b>Ausbildungsvergütung, Berufsschulzeiten, Zeit der Ausbilder/innen</div>
                           <div><b>Nutzen</b>Eigene Azubis kennen die Abläufe. Übernahme sichert Fachkräfte.</div>
                         </div>`
                },
                {
                  style: "accent",
                  kicker: "Merksatz",
                  title: "Azubis lösen keinen akuten Personalbedarf.",
                  body: `<p>Ausbildung dauert drei Jahre.</p>`
                }
              ]
            },
            {
              type: "calc",
              title: "Plätze pro Jahr",
              case: `Rechne: <b>benötigte Fachkräfte ÷ Ausbildungsjahre</b>.`,
              rows: [
                { label: "9 Fachkräfte in 3 Jahren", value: 3 },
                { label: "12 Fachkräfte in 3 Jahren", value: 4 },
                { label: "15 Fachkräfte in 3 Jahren", value: 5 }
              ],
              hint: "Teile die Zahl der Fachkräfte durch die Zahl der Jahre.",
              result: "3 · 4 · 5 Ausbildungsplätze pro Jahr."
            },
            {
              type: "sort",
              title: "Kosten oder Nutzen?",
              prompt: "Ist das ein Kostenpunkt oder ein Nutzen der Ausbildung?",
              categories: ["Kosten", "Nutzen"],
              items: [
                { text: "Ausbildungsvergütung", cat: 0 },
                { text: "Eigene Azubis kennen die Abläufe.", cat: 1 },
                { text: "Berufsschulzeiten", cat: 0 },
                { text: "Übernahme sichert Fachkräfte.", cat: 1 },
                { text: "Zeit der Ausbilder/innen", cat: 0 },
                { text: "Keine lange Suche nach Fachkräften auf dem Arbeitsmarkt.", cat: 1 }
              ]
            },
            {
              type: "quiz",
              title: "Check",
              questions: [
                {
                  q: "Mediaworld fehlen ab sofort zwei Verkäufer/innen. Hilft es, jetzt zwei Azubis einzustellen?",
                  options: [
                    "Ja, das Problem ist damit gelöst.",
                    "Nein – Ausbildung dauert drei Jahre. Der akute Bedarf muss anders gedeckt werden.",
                    "Ja, Azubis zählen sofort als Fachkräfte.",
                    "Nein, Azubis dürfen nicht im Verkauf arbeiten."
                  ],
                  answer: 1,
                  explain: "Ausbildung deckt den Bedarf von morgen – nicht den von heute."
                }
              ]
            }
          ]
        },

        /* ══════════════ MINI-KLAUSUREN ══════════════ */
        {
          id: "mini-klausur-1",
          group: "Klausurtraining",
          title: "Mini-Klausur 1",
          kicker: "ca. 12 Minuten",
          minutes: 12,
          steps: [
            {
              type: "sort",
              title: "A1 · Autonom oder initiiert?",
              prompt: "2 Punkte",
              categories: ["autonom", "initiiert"],
              items: [
                { text: "Ein Verkäufer geht in Rente.", cat: 0 },
                { text: "Der Betrieb stellt eine Aushilfe ein.", cat: 1 },
                { text: "Eine Bürokraft geht in Elternzeit.", cat: 0 },
                { text: "Melike versetzt eine Verkäuferin ins Lager.", cat: 1 }
              ]
            },
            {
              type: "calc",
              title: "A2 · Bäckerei Korn",
              case: `<b>Ist:</b> 12<br>
                     <b>Abgänge:</b> eine Kündigung, ein Renteneintritt<br>
                     <b>Zugang:</b> eine fest zugesagte Aushilfe<br>
                     <b>Soll:</b> 14`,
              rows: bedarfRows(12, 2, 1, 14, { klausur: true }),
              hint: "12 − 2 + 1 = fortgeschriebener Ist-Bestand.",
              result: "Die Bäckerei muss 3 Personen einstellen."
            },
            {
              type: "quiz",
              title: "A3 · Deuten",
              questions: [
                {
                  q: "Nettopersonalbedarf + 3. Was bedeutet das für die Bäckerei Korn?",
                  options: [
                    "Sie hat 3 Beschäftigte zu viel.",
                    "Es fehlen 3 Beschäftigte – sie muss 3 Personen einstellen.",
                    "Sie braucht insgesamt 3 Beschäftigte.",
                    "3 Beschäftigte gehen in Rente."
                  ],
                  answer: 1,
                  explain: "Positives Vorzeichen → Personal beschaffen."
                }
              ]
            }
          ]
        },
        {
          id: "mini-klausur-2",
          group: "Klausurtraining",
          title: "Mini-Klausur 2",
          kicker: "ca. 12 Minuten",
          minutes: 12,
          steps: [
            {
              type: "sort",
              title: "A1 · Extern oder intern?",
              prompt: "2 Punkte",
              categories: ["extern", "intern"],
              items: [
                { text: "Die Konjunktur zieht an.", cat: 0 },
                { text: "Das Weihnachtsgeschäft steht bevor.", cat: 0 },
                { text: "Der Mindestlohn steigt.", cat: 0 },
                { text: "Sofia eröffnet einen Online-Shop.", cat: 1 }
              ]
            },
            {
              type: "calc",
              title: "A2 · Kennzahlenmethode",
              case: `Ein Warenhaus macht <b>4 800 000 €</b> Umsatz. Je Vollzeitstelle werden <b>200 000 €</b> angesetzt.`,
              rows: [{ label: "Vollzeitstellen: 4 800 000 € ÷ 200 000 €", value: 24 }],
              hint: "48 ÷ 2",
              result: "Das Warenhaus braucht 24 Vollzeitstellen."
            },
            {
              type: "calc",
              title: "A3 · Ausbildungsbedarf",
              case: `Ein Betrieb braucht in <b>drei Jahren neun Fachkräfte</b> aus eigener Ausbildung.`,
              rows: [{ label: "Ausbildungsplätze pro Jahr: 9 ÷ 3", value: 3 }],
              hint: "benötigte Fachkräfte ÷ Ausbildungsjahre",
              result: "3 Ausbildungsplätze pro Jahr."
            }
          ]
        },
        {
          id: "mini-klausur-3",
          group: "Klausurtraining",
          title: "Mini-Klausur 3",
          kicker: "ca. 12 Minuten",
          minutes: 12,
          steps: [
            {
              type: "sort",
              title: "A1 · Kosten oder Nutzen?",
              prompt: "2 Punkte",
              categories: ["Kosten", "Nutzen"],
              items: [
                { text: "Ausbildungsvergütung", cat: 0 },
                { text: "Eigene Azubis kennen die Abläufe.", cat: 1 },
                { text: "Berufsschulzeiten", cat: 0 },
                { text: "Übernahme sichert Fachkräfte.", cat: 1 }
              ]
            },
            {
              type: "calc",
              title: "A2 · Fitnessstudio Puls",
              case: `Achtung: Vorzeichen!<br>
                     <b>Ist:</b> 15<br>
                     <b>Abgang:</b> eine Kündigung<br>
                     <b>Zugänge:</b> drei neue Verträge für den Kursbereich<br>
                     <b>Soll:</b> 16`,
              rows: bedarfRows(15, 1, 3, 16, { klausur: true }),
              hint: "15 − 1 + 3 = 17. Dann 16 − 17.",
              result: "Nettopersonalbedarf − 1: eine Person zu viel."
            },
            {
              type: "quiz",
              title: "A3 · Deuten",
              questions: [
                {
                  q: "Das Ergebnis ist negativ (− 1). Was muss das Fitnessstudio tun?",
                  options: [
                    "Eine Person einstellen.",
                    "Personal abbauen – zum Beispiel einen Abgang nicht ersetzen.",
                    "Nichts, das Ergebnis ist falsch.",
                    "Den Soll-Bestand auf 17 erhöhen."
                  ],
                  answer: 1,
                  explain: "Negativ heißt: Es sind zu viele da."
                }
              ]
            }
          ]
        },

        /* ══════════════ LERNKARTEN ══════════════ */
        {
          id: "lernkarten",
          group: "Wiederholen",
          title: "Alle Lernkarten",
          kicker: "Übungsblatt 5",
          minutes: 8,
          steps: [
            {
              type: "cards",
              title: "Lernkarten Klausur 1",
              cards: [
                { front: "Ist-Personalbestand", back: "So viele Beschäftigte arbeiten JETZT im Betrieb." },
                { front: "Abgang (−)", back: "Eine Kraft VERLÄSST den Betrieb: Kündigung, Rente, Elternzeit." },
                { front: "Zugang (+)", back: "Eine Kraft KOMMT NEU dazu – Vertrag unterschrieben." },
                { front: "Fortschreibung", back: "Ist − Abgänge + Zugänge = fortgeschriebener Ist-Bestand." },
                { front: "Bruttopersonalbedarf", back: "Der Soll-Bestand: wie viele Beschäftigte insgesamt gebraucht werden." },
                { front: "Nettopersonalbedarf", back: "Soll − fortgeschriebener Ist. Ergebnis immer mit Vorzeichen deuten!" },
                { front: "Ergebnis positiv (+)", back: "Es fehlen Leute → Personal beschaffen (einstellen)." },
                { front: "Ergebnis negativ (−)", back: "Zu viele da → Personal abbauen (Abgänge nicht ersetzen)." },
                { front: "Stellenplanmethode", back: "Stellen einzeln durchzählen – genau, gut für kleine Betriebe." },
                { front: "Kennzahlenmethode", back: "Umsatz ÷ Umsatz je Vollzeitstelle – schnell, aber grob." },
                { front: "Autonome Veränderung", back: "Geschieht von selbst: Rente, Kündigung durch Beschäftigte." },
                { front: "Initiierte Veränderung", back: "Der Betrieb handelt bewusst: Einstellung, Versetzung, Entlassung." },
                { front: "Ausbildungsbedarf", back: "benötigte Fachkräfte ÷ Ausbildungsjahre = Plätze pro Jahr." },
                { front: "Merksatz Ausbildung", back: "Azubis lösen keinen akuten Personalbedarf – Ausbildung dauert drei Jahre." }
              ]
            }
          ]
        }
      ]
    }
  ]
};
