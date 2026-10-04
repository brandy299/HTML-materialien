/* ============================================================
   KURS: PBP · HS1 – Personalbedarf
   Fach PBP · Lernfeld 8.1 · Modellunternehmen Mediaworld e. K.
   Aufbau und alle Aufgabentypen: app/README.md
   ============================================================ */

LERNRAUM.subjects.push({
  id: "pbp",
  fach: "PBP",
  added: "2026-09-24",          // Datum der Veröffentlichung (für „Neu“ auf der Startseite)
  updated: "2026-10-04",        // neue Inhalte: Ordner „Klausurvorbereitung“ (für „Aktualisiert“)
  name: "Personalbedarf",
  course: "PBP · HS1",
  glyph: "P",
  color: "#F386A1",
  company: "Mediaworld e.K.",
  description: "Lernfeld 8.1 · Personalbezogene Prozesse. Rechnen statt schätzen – am Modellunternehmen Mediaworld e. K.",
  /* Ordner: fasst die Klausurvorbereitung zusammen (Thema-Feld folder). Zurücknehmen: folder-Zeilen entfernen. */
  folders: [
    {
      id: "klausur", group: "Klausurvorbereitung", kicker: "Ordner · Klausur",
      title: "Klausurvorbereitung",
      description: "Übungsblätter, Endlos-Training, Mini-Klausuren, Probe- und Übungsklausur."
    }
  ],
  topics: [

    /* ══════════════ LS 2.1 · TEIL 1 ══════════════ */
    {
      id: "bedarf-berechnen",
      video: "pbp-bedarf-berechnen",       // Erklärvideo als Einstieg (app/videos/), zählt nicht als Schritt
      videoTitle: "Personalbedarf kurz erklärt",
      help: `<h3>Das Rechenschema</h3>
             <p class="formula">Ist − Abgänge + Zugänge = Zwischensumme<br>Soll − Zwischensumme = Personalbedarf</p>
             <h3>Abgang oder Zugang?</h3>
             <ul><li><strong>Abgang (−):</strong> Jemand verlässt das Unternehmen – Rente, Elternzeit, Kündigung.</li>
             <li><strong>Zugang (+):</strong> Jemand kommt fest dazu – Übernahme nach der Ausbildung, Rückkehr aus der Elternzeit, unterschriebener Vertrag.</li></ul>
             <h3>Ergebnis deuten</h3>
             <ul><li><strong>positiv (+):</strong> Es fehlen Leute → einstellen.</li><li><strong>negativ (−):</strong> Zu viele da → Personal abbauen.</li></ul>
             <h3>Häufige Fehler</h3>
             <ul><li>Soll und Zwischensumme vertauscht: Es heißt immer <strong>Soll − Zwischensumme</strong>.</li>
             <li>Die gesuchte neue Stelle als Zugang gezählt – sie steckt schon im Soll.</li></ul>`,

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
          hints: ["Frag dich: Ist die Person danach <b>noch im Unternehmen</b> tätig – oder nicht mehr?", "Elternzeit zählt als Abgang, weil die Person im Planungszeitraum nicht arbeitet. Die Rückkehr aus der Elternzeit ist ein Zugang."],
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
          ...bedarf(21, 2, 1, 22),
          result: "Mediaworld e. K. muss 2 neue Mitarbeiter/innen einstellen."
        },
        {
          type: "sentence",
          title: "Antwortsatz bauen",
          case: `In der Klausur gehört zu jeder Rechnung ein <b>Antwortsatz</b>. Bau ihn für Mediaworld aus den Bausteinen.`,
          text: "Der Personalbedarf beträgt {*+ 2|− 2|22}. Das Ergebnis ist {*positiv|negativ}. Mediaworld e. K. muss {*2|20|22} neue Mitarbeiter/innen {*einstellen|entlassen}.",
          hints: ["Das Ergebnis aus A1 steht in der letzten Zeile des Rechenschemas.", "Positiv heißt: Es fehlen Leute → einstellen."],
          explain: "Ein guter Antwortsatz: Ergebnis mit Vorzeichen → Bedeutung → was das Unternehmen tun muss."
        },
        {
          type: "quiz",
          title: "A2 · Ergebnis deuten",
          questions: [
            {
              q: "Der Personalbedarf von Mediaworld beträgt +2. Was bedeutet das?",
              hint: "Positives Vorzeichen heißt: Es <b>fehlen</b> Leute.",
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
              hints: ["Die Rückkehr ist ein zusätzlicher <b>Zugang</b>. Die Zwischensumme steigt also um 1.", "Neue Zwischensumme: 20 + 1 = 21. Dann: 22 − 21 = ?"],
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
          ...bedarf(8, 2, 1, 10),
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
              hint: "Ziehe den kleineren vom größeren Bedarf ab: 3 − 2.",
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
      video: "pbp-ersatz-neubedarf",
      videoTitle: "Ersatz oder neu?",
      help: `<h3>Gesamter Personalbedarf zerlegt</h3>
             <p class="formula">Ersatzbedarf = Abgänge − Zugänge<br>Neubedarf = Soll − ursprünglicher Ist<br>Gesamt = Ersatzbedarf + Neubedarf</p>
             <ul><li><strong>Ersatzbedarf:</strong> Leute, die gehen und ersetzt werden müssen.</li>
             <li><strong>Neubedarf:</strong> zusätzliche Stellen durch Wachstum.</li></ul>
             <h3>Informationen filtern</h3>
             <ul><li>Wichtig: Wer geht (Abgang), wer kommt fest dazu (Zugang), welche Stelle ist neu (Soll).</li>
             <li>Unwichtig: Beschwerden, kurze Krankheit, Zufriedenheit – das ändert den Personalbestand nicht.</li></ul>
             <h3>Bedarf decken</h3>
             <ul><li><strong>Neueinstellung:</strong> planbar, hohe Bindung – dauert lange.</li>
             <li><strong>Zeitarbeit:</strong> schnell, flexibel – teurer, geringe Bindung.</li>
             <li><strong>Überstunden:</strong> kein neues Personal – überlastet, nicht dauerhaft.</li>
             <li><strong>Teilzeit aufstocken:</strong> kennen den Betrieb – reicht oft nicht.</li></ul>`,

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
          hints: ["Frag bei jedem Satz: Verändert das die <b>Zahl der Beschäftigten</b>?", "Eine Beschwerde oder eine kurze Krankheit ändert nichts am Personalbestand → nicht wichtig.", "Eine zusätzlich geschaffene Stelle ist kein Zugang, sondern erhöht das <b>Soll</b> → Neue Stelle."],
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
          ...bedarf(10, 2, 1, 12, { split: true }),
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
          hints: ["Lies die Tabelle <b>spaltenweise</b>: Verkaufsshop + Lager + Buchhaltung.", "Abgänge: 2 + 1 + 0. Zugänge: 1 + 0 + 1. Neue Stellen: 1 + 0 + 1."],
          result: "Abgänge 3 · Zugänge 2 · Neue Stellen 2"
        },
        {
          type: "calc",
          title: "A8 · Mediaworld gesamt",
          case: `<b>Ist:</b> 21 Mitarbeiter/innen<br>
                 <b>Abgänge:</b> 3 · <b>Zugänge:</b> 2 (aus A7)<br>
                 <b>Soll:</b> 21 + 2 neue Stellen`,
          ...bedarf(21, 3, 2, 23, { split: true }),
          result: "Mediaworld braucht 3 neue Mitarbeiter/innen: Ersatzbedarf 1 + Neubedarf 2."
        },
        {
          type: "quiz",
          title: "A9 · Wie deckt man den Bedarf?",
          questions: [
            {
              q: "Welche Möglichkeit ist schnell verfügbar und flexibel, aber teurer?",
              hint: "Man „leiht“ sich Personal von einer anderen Firma – dafür zahlt man extra.",
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
      help: `<h3>Die Begriffe</h3>
             <ul><li><strong>Ist-Personalbestand:</strong> wer JETZT da ist.</li>
             <li><strong>Fortschreibung:</strong> Ist − Abgänge + Zugänge.</li>
             <li><strong>Bruttopersonalbedarf:</strong> der Soll-Bestand – wie viele insgesamt gebraucht werden.</li>
             <li><strong>Nettopersonalbedarf:</strong> Soll − fortgeschriebener Ist – was neu beschafft werden muss.</li></ul>
             <h3>Autonom oder initiiert?</h3>
             <p>Frag dich: <strong>Hat der Betrieb das entschieden?</strong> Ja → initiiert (einstellen, versetzen, entlassen, ausbilden). Nein → autonom (Rente, Elternzeit, eigene Kündigung).</p>
             <h3>Extern oder intern?</h3>
             <p>Frag dich: <strong>Kann der Betrieb das selbst beschließen?</strong> Ja → intern (Online-Shop, Wachstum, neue Aufgaben). Nein → extern (Konjunktur, Gesetze, Mindestlohn, Arbeitsmarkt, Saison).</p>`,

      folder: "klausur",
      group: "Übungsblätter",
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
          hints: ["Achte auf Signalwörter: <b>JETZT</b> → Ist-Bestand. <b>Soll</b> → Brutto. <b>neu beschaffen</b> → Netto. <b>Ist − Abgänge + Zugänge</b> → Fortschreibung."],
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
          hints: ["Frag dich: <b>Wer hat entschieden?</b> Die Beschäftigten selbst oder das Leben (Rente, Elternzeit) → autonom.", "Hat der Betrieb bewusst gehandelt – einstellen, versetzen, entlassen, ausbilden → initiiert."],
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
          hints: ["Frag dich: <b>Kann Mediaworld das selbst beschließen?</b> Ja → intern. Nein → extern.", "Konjunktur, Gesetze, Mindestlohn, Arbeitsmarkt und Jahreszeiten kann ein Betrieb nicht steuern → extern."],
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
          hints: ["Die drei Wörter, die nicht passen, haben nichts mit der Personalplanung zu tun: Rendite, Anzeige, Blindheit.", "Soll-Bestand = Brutto. Was tatsächlich fehlt = Netto."],
          text: "Der {Ist-Personalbestand} sagt, wie viele Beschäftigte JETZT im Betrieb arbeiten. Bei der Fortschreibung zieht man die voraussichtlichen {Abgänge} ab. Bereits fest vereinbarte Einstellungen zählen als {Zugänge}. Der Soll-Bestand heißt auch {Bruttopersonalbedarf}. Was tatsächlich neu eingestellt werden muss, ist der {Nettopersonalbedarf}. Die {Stellenplanmethode} zählt jede benötigte Stelle einzeln durch.",
          distractors: ["Betriebsblindheit", "Umsatzrendite", "Stellenanzeige"]
        },
        {
          type: "quiz",
          title: "A5 · Kurz erklärt",
          questions: [
            {
              q: "Was ist der Unterschied zwischen Brutto- und Nettopersonalbedarf?",
              hint: "Hier geht es nicht ums Gehalt! Brutto = <b>Soll</b>, Netto = was nach der Fortschreibung noch <b>fehlt</b>.",
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
      help: `<h3>Stellenplanmethode</h3>
             <p>Jede Stelle einzeln durchzählen. <strong>Genau, aber aufwendig</strong> – gut für kleine Betriebe.</p>
             <h3>Kennzahlenmethode</h3>
             <p class="formula">Umsatz ÷ Umsatz je Vollzeitstelle = Vollzeitstellen</p>
             <p><strong>Schnell, aber grob</strong> – gut für große Betriebe und einen ersten Überblick. Sie zeigt nicht, welche Bereiche Personal brauchen.</p>
             <h3>Rechentrick</h3>
             <p>Bei beiden Zahlen gleich viele Nullen streichen: 3 600 000 ÷ 200 000 = 36 ÷ 2 = 18.</p>`,

      folder: "klausur",
      group: "Übungsblätter",
      title: "Stellenplan & Kennzahlen",
      kicker: "Übungsblatt 2",
      minutes: 15,
      video: "pbp-stellenplan-kennzahlen",     // Erklärvideo als Einstieg (app/videos/), zählt nicht als Schritt
      videoTitle: "Zählen oder rechnen?",
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
          hints: ["Stellenplan = <b>zählen</b>: jede Stelle einzeln. Genau, aber aufwendig.", "Kennzahlen = <b>rechnen</b> mit dem Umsatz. Schnell, aber grob – und abhängig vom Umsatz."],
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
          hints: ["Formel: <b>Umsatz ÷ Umsatz je Vollzeitstelle</b>.", "Streiche bei beiden Zahlen gleich viele Nullen: 3 600 000 ÷ 200 000 = 36 ÷ 2.", "Lösungsweg: 36 ÷ 2 = 18 · 280 ÷ 14 = 20 · 34 ÷ 2 = 17"],
          result: "Elektromarkt 18 · Möbelhaus 20 · Mediaworld 17 Vollzeitstellen."
        },
        {
          type: "quiz",
          title: "A3 · A4 · Methode wählen",
          questions: [
            {
              q: "Ein kleiner Familienbetrieb mit 8 Beschäftigten plant seinen Personalbedarf. Welche Methode passt?",
              hint: "Bei 8 Stellen kann man jede einzelne gut durchzählen.",
              options: ["Stellenplanmethode", "Kennzahlenmethode"],
              answer: 0,
              explain: "Bei wenigen Stellen kann man jede einzeln durchzählen – das ist genauer."
            },
            {
              q: "Eine Kaufhauskette mit 600 Beschäftigten will schnell einen Überblick. Welche Methode passt?",
              hint: "Das Stichwort ist <b>schnell</b>.",
              options: ["Stellenplanmethode", "Kennzahlenmethode"],
              answer: 1,
              explain: "Bei 600 Stellen wäre das Durchzählen sehr aufwendig. Die Kennzahl liefert schnell eine Schätzung."
            },
            {
              q: "Warum ist die Kennzahlenmethode nur eine grobe Schätzung?",
              hint: "Womit rechnet die Kennzahlenmethode – und was schaut sie sich <b>nicht</b> an?",
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
      video: "pbp-ausbildungsbedarf",      // Erklärvideo als Einstieg (app/videos/), zählt nicht als Schritt
      help: `<h3>Ausbildungsbedarf</h3>
             <p class="formula">benötigte Fachkräfte ÷ Ausbildungsjahre = Plätze pro Jahr</p>
             <h3>Merksatz</h3>
             <p>Azubis lösen <strong>keinen akuten</strong> Personalbedarf – Ausbildung dauert drei Jahre.</p>
             <h3>Kosten und Nutzen</h3>
             <ul><li><strong>Kosten:</strong> Ausbildungsvergütung, Berufsschulzeiten, Zeit der Ausbilder/innen.</li>
             <li><strong>Nutzen:</strong> Azubis kennen die Abläufe, Übernahme sichert Fachkräfte.</li></ul>`,

      folder: "klausur",
      group: "Übungsblätter",
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
          hints: ["Formel: <b>benötigte Fachkräfte ÷ Ausbildungsjahre</b>.", "Lösungsweg: 9 ÷ 3 = 3 · 12 ÷ 3 = 4 · 15 ÷ 3 = 5"],
          result: "3 · 4 · 5 Ausbildungsplätze pro Jahr."
        },
        {
          type: "sort",
          title: "Kosten oder Nutzen?",
          prompt: "Ist das ein Kostenpunkt oder ein Nutzen der Ausbildung?",
          hints: ["Kosten: Alles, was den Betrieb <b>Geld oder Arbeitszeit</b> kostet.", "Nutzen: Alles, was der Betrieb durch eigene Azubis <b>gewinnt</b>."],
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
              hint: "Wie lange dauert eine Ausbildung?",
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

    /* ══════════════ ENDLOS-TRAINING ══════════════ */
    {
      id: "training-personalbedarf",
      folder: "klausur",
      group: "Training",
      title: "Endlos-Training",
      kicker: "Zufallsaufgaben",
      drill: "bedarf",          // erzeugt immer neue Personalbedarf-Aufgaben
      description: "Immer neue Personalbedarf-Aufgaben mit Antwortsatz. Wähle deine Stufe und übe, bis es sitzt.",
      steps: [],
      help: `<h3>Das Rechenschema</h3>
             <p class="formula">Ist − Abgänge + Zugänge = Zwischensumme<br>Soll − Zwischensumme = Personalbedarf</p>
             <h3>Abgang oder Zugang?</h3>
             <ul><li><strong>Abgang:</strong> Rente, Elternzeit, Kündigung, Wechsel zu einer anderen Firma.</li>
             <li><strong>Zugang:</strong> Übernahme nach der Ausbildung, Rückkehr aus der Elternzeit, unterschriebener Vertrag.</li>
             <li><strong>Nicht wichtig:</strong> Krankheit, Urlaub, Beschwerden, Fortbildung.</li></ul>
             <h3>Stufe 3: Ersatz- und Neubedarf</h3>
             <p class="formula">Ersatzbedarf = Abgänge − Zugänge<br>Neubedarf = Soll − ursprünglicher Ist</p>
             <h3>Ergebnis deuten</h3>
             <ul><li><strong>positiv (+):</strong> Es fehlen Leute → einstellen.</li><li><strong>negativ (−):</strong> Zu viele da → abbauen.</li></ul>`
    },

    /* ══════════════ MINI-KLAUSUREN ══════════════ */
    {
      id: "mini-klausur-1",
      help: `<h3>In der Klausur</h3>
             <ul><li>Erst alle Aufgaben lesen, dann arbeiten.</li>
             <li>Beim Rechnen jeden Schritt aufschreiben – auch der Weg bringt Punkte.</li>
             <li>Ergebnis immer mit Vorzeichen deuten und einen Antwortsatz schreiben.</li></ul>
             <p class="formula">Ist − Abgänge + Zugänge = fortgeschriebener Ist<br>Soll − fortgeschriebener Ist = Nettopersonalbedarf</p>
             <p class="formula">Umsatz ÷ Umsatz je Vollzeitstelle = Stellen<br>Fachkräfte ÷ Ausbildungsjahre = Plätze pro Jahr</p>`,

      folder: "klausur",
      group: "Mini-Klausuren",
      title: "Mini-Klausur 1",
      kicker: "Übungsblatt 4",
      minutes: 12,
      steps: [
        {
          type: "sort",
          title: "A1 · Autonom oder initiiert?",
          prompt: "2 Punkte",
          categories: ["autonom", "initiiert"],
          hints: ["Hat der Betrieb entschieden? Ja → initiiert. Nein → autonom."],
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
          ...bedarf(12, 2, 1, 14, { klausur: true }),
          result: "Die Bäckerei muss 3 Personen einstellen."
        },
        {
          type: "sentence",
          title: "A3 · Deuten",
          case: "Was bedeutet dein Ergebnis aus A2 für die Bäckerei Korn? (2 Punkte)",
          text: "Der Nettopersonalbedarf ist {*positiv|negativ}. Der Bäckerei Korn {*fehlen|bleiben} {*3|11|14} Beschäftigte, deshalb muss sie Personal {*beschaffen|abbauen}.",
          hints: ["Positives Vorzeichen → es fehlen Leute."]
        }
      ]
    },
    {
      id: "mini-klausur-2",
      help: `<h3>In der Klausur</h3>
             <ul><li>Erst alle Aufgaben lesen, dann arbeiten.</li>
             <li>Beim Rechnen jeden Schritt aufschreiben – auch der Weg bringt Punkte.</li>
             <li>Ergebnis immer mit Vorzeichen deuten und einen Antwortsatz schreiben.</li></ul>
             <p class="formula">Ist − Abgänge + Zugänge = fortgeschriebener Ist<br>Soll − fortgeschriebener Ist = Nettopersonalbedarf</p>
             <p class="formula">Umsatz ÷ Umsatz je Vollzeitstelle = Stellen<br>Fachkräfte ÷ Ausbildungsjahre = Plätze pro Jahr</p>`,

      folder: "klausur",
      group: "Mini-Klausuren",
      title: "Mini-Klausur 2",
      kicker: "Übungsblatt 4",
      minutes: 12,
      steps: [
        {
          type: "sort",
          title: "A1 · Extern oder intern?",
          prompt: "2 Punkte",
          categories: ["extern", "intern"],
          hints: ["Kann der Betrieb das selbst beschließen? Ja → intern. Nein → extern."],
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
          hints: ["Umsatz ÷ Umsatz je Vollzeitstelle. Streiche gleich viele Nullen.", "4 800 000 ÷ 200 000 = 48 ÷ 2 = ?"],
          result: "Das Warenhaus braucht 24 Vollzeitstellen."
        },
        {
          type: "calc",
          title: "A3 · Ausbildungsbedarf",
          case: `Ein Betrieb braucht in <b>drei Jahren neun Fachkräfte</b> aus eigener Ausbildung.`,
          rows: [{ label: "Ausbildungsplätze pro Jahr: 9 ÷ 3", value: 3 }],
          hints: ["benötigte Fachkräfte ÷ Ausbildungsjahre", "9 ÷ 3 = ?"],
          result: "3 Ausbildungsplätze pro Jahr."
        }
      ]
    },
    {
      id: "mini-klausur-3",
      help: `<h3>In der Klausur</h3>
             <ul><li>Erst alle Aufgaben lesen, dann arbeiten.</li>
             <li>Beim Rechnen jeden Schritt aufschreiben – auch der Weg bringt Punkte.</li>
             <li>Ergebnis immer mit Vorzeichen deuten und einen Antwortsatz schreiben.</li></ul>
             <p class="formula">Ist − Abgänge + Zugänge = fortgeschriebener Ist<br>Soll − fortgeschriebener Ist = Nettopersonalbedarf</p>
             <p class="formula">Umsatz ÷ Umsatz je Vollzeitstelle = Stellen<br>Fachkräfte ÷ Ausbildungsjahre = Plätze pro Jahr</p>`,

      folder: "klausur",
      group: "Mini-Klausuren",
      title: "Mini-Klausur 3",
      kicker: "Übungsblatt 4",
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
          ...bedarf(15, 1, 3, 16, { klausur: true }),
          result: "Nettopersonalbedarf − 1: eine Person zu viel."
        },
        {
          type: "sentence",
          title: "A3 · Deuten",
          case: "Dein Ergebnis aus A2 ist negativ. Was muss das Fitnessstudio tun? (2 Punkte)",
          text: "Der Nettopersonalbedarf ist {*negativ|positiv}. Das Fitnessstudio hat {*eine Person zu viel|eine Person zu wenig}. Es muss Personal {*abbauen|einstellen}, zum Beispiel indem es einen Abgang {*nicht ersetzt|doppelt ersetzt}.",
          hints: ["Negativ heißt: Es sind mehr Leute da als gebraucht."]
        }
      ]
    },

    /* ══════════════ ÜBUNGSKLAUSUR ══════════════ */
    /* ══════════════ PROBEKLAUSUR 2 · MIT ERKLÄRUNGEN ══════════════
       Geführte Probeklausur (exam.guided): wird wie eine Klausur bewertet (Punkte, Note, Erwartungshorizont),
       aber ohne Timer und mit einer Erklärung (guide) vor jeder Aufgabe. Eigener Link: #/f/pbp/probeklausur-2 */
    {
      id: "probeklausur-2",
      folder: "klausur",
      group: "Große Klausuren",
      title: "Probeklausur Personalbedarf – mit Erklärungen",
      kicker: "Probeklausur · mit Erklärungen",
      minutes: 60,
      help: `<h3>Der Rechenweg</h3>
             <p class="formula">Ist − Abgänge + Zugänge = fortgeschriebener Ist<br>Soll − fortgeschriebener Ist = Nettopersonalbedarf</p>
             <h3>Ersatz- und Neubedarf</h3>
             <p class="formula">Ersatzbedarf = Abgänge − Zugänge<br>Neubedarf = Soll − ursprünglicher Ist<br>Ersatz + Neu = Netto</p>
             <h3>Ergebnis deuten</h3>
             <ul><li><strong>positiv (+):</strong> Es fehlen Leute → Personal beschaffen.</li>
             <li><strong>negativ (−):</strong> Zu viele da → Personal abbauen.</li></ul>
             <h3>Filtern</h3>
             <p>Zählt: Abgang, fester Zugang, neue Stelle (Soll). Zählt nicht: kurze Krankheit, Urlaub, Streit, Feiern.</p>
             <h3>Weitere Formeln</h3>
             <p class="formula">Umsatz ÷ Umsatz je Vollzeitstelle = Vollzeitstellen<br>Fachkräfte ÷ Ausbildungsjahre = Plätze pro Jahr</p>`,
      exam: {
        guided: true,
        minutes: 60,
        tools: "Taschenrechner, Heft für Nebenrechnungen",
        situation: `<p><strong>Sporthaus Lindner e. K.</strong> hat <strong>28 Beschäftigte</strong> in Verkauf, Lager, Fahrradwerkstatt und Büro. Inhaberin ist Frau Lindner.</p>
                    <p>Im nächsten Jahr startet ein <strong>Online-Shop</strong> und die <strong>Werkstatt wird erweitert</strong>. Frau Lindner braucht dafür einen Personalplan. Alle Aufgaben gehören zu diesem Betrieb.</p>`,
        grading: [[92, "1", "sehr gut"], [81, "2", "gut"], [67, "3", "befriedigend"], [50, "4", "ausreichend"], [30, "5", "mangelhaft"], [0, "6", "ungenügend"]]
      },
      steps: [
        /* ── A1 · Fachbegriffe ── */
        {
          type: "quiz",
          title: "A1 · Fachbegriffe",
          points: 5,
          review: "fachbegriffe",
          guide: [
            {
              style: "dark",
              kicker: "Los geht's",
              title: "Erst verstehen, dann lösen.",
              body: `<p>Vor jeder Aufgabe erklären dir ein paar Folien, <strong>worum es geht</strong> und <strong>wie du vorgehst</strong>.</p>
                     <ul><li>Erst die Folien lesen.</li><li>Dann die Aufgabe lösen. Du siehst sofort, was richtig war.</li><li>Am Ende gibt es Punkte und eine Note.</li></ul>
                     <p class="note">Bleibst du hängen? Der ?-Knopf zeigt Tipps und diese Erklärung noch einmal.</p>`
            },
            {
              kicker: "Aufgabe 1 · Fachbegriffe",
              title: "Fünf Wörter, ein Rechenweg.",
              body: `<p>Diese Wörter hängen an einer Rechnung. Der Neubedarf kommt in Aufgabe 5 dazu.</p>
                     ${ablauf([
                       { text: "Ist-Personalbestand", value: "jetzt da" },
                       { op: "− Abgänge + Zugänge", note: "Fortschreibung" },
                       { text: "fortgeschriebener Ist", sub: true },
                       { op: "Soll − fortgeschriebener Ist" },
                       { text: "Nettopersonalbedarf", value: "fehlt", hi: true }
                     ])}
                     <p class="note">Der Soll-Bestand heißt auch Bruttopersonalbedarf.</p>`
            },
            {
              kicker: "Aufgabe 1 · So erkennst du den Begriff",
              title: "Achte auf das Signalwort.",
              body: `<dl class="terms">
                       <dt>Ist-Personalbestand</dt><dd>„heute“, „aktuell“: wer jetzt da ist.</dd>
                       <dt>Brutto&shy;personal&shy;bedarf</dt><dd>„Soll“, „nötig“: die Zahl laut Plan.</dd>
                       <dt>Fortschreibung</dt><dd>Ist − Abgänge + Zugänge.</dd>
                       <dt>Netto&shy;personal&shy;bedarf</dt><dd>„fehlt noch“, „muss besorgt werden“.</dd>
                       <dt>Neubedarf</dt><dd>„Wachstum“, „mehr Aufträge“.</dd>
                     </dl>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Brutto ist der ganze Kuchen. Netto ist das fehlende Stück.",
              body: `<p>Brutto: wie viele insgesamt gebraucht werden. Netto: wie viele noch fehlen.</p>`
            }
          ],
          questions: [
            {
              q: "Alle Beschäftigten, die zurzeit im Sporthaus arbeiten.",
              options: ["Ist-Personalbestand", "Bruttopersonalbedarf", "Nettopersonalbedarf", "Neubedarf"],
              answer: 0,
              hint: "Das Signalwort ist „zurzeit“.",
              explain: "„Zurzeit“ heißt: jetzt. Das ist der Ist-Personalbestand."
            },
            {
              q: "Wie viele Beschäftigte das Sporthaus laut Plan insgesamt braucht.",
              options: ["Ist-Personalbestand", "Bruttopersonalbedarf", "Fortschreibung", "Ersatzbedarf"],
              answer: 1,
              hint: "„Insgesamt“ und „laut Plan“ passen zum Soll-Bestand.",
              explain: "Der Soll-Bestand ist der Bruttopersonalbedarf: alle Stellen, die der Plan vorsieht."
            },
            {
              q: "Der Ist-Bestand, nachdem man die Abgänge abgezogen und die Zugänge dazugezählt hat.",
              options: ["Nettopersonalbedarf", "Neubedarf", "Bruttopersonalbedarf", "Fortschreibung"],
              answer: 3,
              hint: "Es ist der erste Schritt der Rechnung, noch ohne den Soll-Bestand.",
              explain: "Ist − Abgänge + Zugänge nennt man Fortschreibung."
            },
            {
              q: "So viele Beschäftigte muss das Sporthaus noch beschaffen (Soll − fortgeschriebener Ist).",
              options: ["Ersatzbedarf", "Bruttopersonalbedarf", "Ist-Personalbestand", "Nettopersonalbedarf"],
              answer: 3,
              hint: "Was „noch fehlt“, ist die Lücke zwischen Soll und fortgeschriebenem Ist.",
              explain: "Soll − fortgeschriebener Ist ist der Nettopersonalbedarf: das fehlende Stück."
            },
            {
              q: "Der Teil des Bedarfs, der durch neue Stellen für den Online-Shop entsteht.",
              options: ["Ersatzbedarf", "Neubedarf", "Fortschreibung", "Ist-Personalbestand"],
              answer: 1,
              hint: "Neue Stellen entstehen durch Wachstum.",
              explain: "Neue Stellen durch Wachstum sind der Neubedarf. Der Ersatzbedarf ersetzt dagegen Ausscheidende."
            }
          ]
        },

        /* ── A2 · Autonom oder initiiert ── */
        {
          type: "sort",
          title: "A2 · Autonom oder initiiert?",
          points: 3,
          review: "fachbegriffe",
          guide: [
            {
              kicker: "Aufgabe 2 · Autonom oder initiiert?",
              title: "Wer hat entschieden?",
              body: `<div class="pair">
                       <div><b>autonom</b>Es passiert von selbst. Der Betrieb kann es nicht steuern, zum Beispiel Mutterschutz oder der Umzug einer Beschäftigten.</div>
                       <div><b>initiiert</b>Der Betrieb hat es entschieden, zum Beispiel neue Leute suchen, jemandem kündigen oder die Stunden verändern.</div>
                     </div>
                     <p class="box">Eine Frage genügt: <strong>Hat der Betrieb das entschieden?</strong> Ja → initiiert. Nein → autonom.</p>`
            },
            {
              kicker: "Aufgabe 2 · Grenzfälle",
              title: "Wer kündigt, entscheidet.",
              body: `<dl class="terms">
                       <dt>Sie kündigt selbst</dt><dd>autonom: die Beschäftigte entscheidet.</dd>
                       <dt>Der Betrieb kündigt</dt><dd>initiiert: der Betrieb entscheidet.</dd>
                       <dt>Vertrag läuft aus</dt><dd>Verlängert der Betrieb nicht, ist das initiiert: er hat entschieden.</dd>
                       <dt>Mutterschutz</dt><dd>autonom: das Gesetz regelt es, nicht der Betrieb.</dd>
                     </dl>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Autonom passiert. Initiiert wird gemacht.",
              body: `<p>Autonomes kann der Betrieb nicht steuern. Initiiertes plant er selbst.</p>`
            }
          ],
          prompt: "Ordne jede Veränderung im Sporthaus zu.",
          hints: ["Hat der Betrieb das entschieden? Ja → initiiert. Nein → autonom."],
          categories: ["autonom", "initiiert"],
          items: [
            { text: "Eine Verkäuferin geht in Rente.", cat: 0 },
            { text: "Frau Lindner stellt einen Werkstattmeister ein.", cat: 1 },
            { text: "Ein Lagerist wechselt zu einem anderen Arbeitgeber.", cat: 0 },
            { text: "Ein Verkäufer wird in die Werkstatt versetzt.", cat: 1 },
            { text: "Eine Kollegin geht in Elternzeit.", cat: 0 },
            { text: "Ein Azubi wird nach der Prüfung übernommen.", cat: 1 }
          ]
        },

        /* ── A3 · Extern oder intern ── */
        {
          type: "sort",
          title: "A3 · Extern oder intern?",
          points: 3,
          review: "fachbegriffe",
          guide: [
            {
              kicker: "Aufgabe 3 · Extern oder intern?",
              title: "Kann der Betrieb das selbst beschließen?",
              body: `<div class="pair">
                       <div><b>intern</b>Kommt aus dem Betrieb: neue Filiale, neue Maschinen, andere Öffnungszeiten.</div>
                       <div><b>extern</b>Kommt von außen: Gesetze, Arbeitsmarkt, Wetter, Preise der Lieferanten.</div>
                     </div>
                     <p class="box">Ja, der Betrieb beschließt es selbst → <strong>intern</strong>. Nein → <strong>extern</strong>.</p>`
            },
            {
              kicker: "Aufgabe 3 · Warum ist das wichtig?",
              title: "Extern beobachten. Intern steuern.",
              body: `<ul><li>Extern kann der Betrieb nicht ändern. Er muss darauf <strong>reagieren</strong>, zum Beispiel mit mehr Personal vor Weihnachten.</li>
                     <li>Intern kann der Betrieb <strong>selbst gestalten</strong>, zum Beispiel eine neue Filiale eröffnen.</li>
                     <li>Beides verändert den Personalbedarf.</li></ul>
                     <p class="note">Falle: Ein Gesetz betrifft den Betrieb, aber der Betrieb hat es nicht beschlossen. Also extern.</p>`
            }
          ],
          prompt: "Ordne jeden Einflussfaktor zu.",
          hints: ["Kann das Sporthaus es selbst beschließen? Ja → intern. Nein → extern."],
          categories: ["extern", "intern"],
          items: [
            { text: "Der Mindestlohn steigt.", cat: 0 },
            { text: "Frau Lindner startet einen Online-Shop.", cat: 1 },
            { text: "Die Konjunktur schwächt sich ab.", cat: 0 },
            { text: "Die Werkstatt bekommt zwei zusätzliche Arbeitsplätze.", cat: 1 },
            { text: "Im Frühjahr kaufen mehr Menschen Fahrräder.", cat: 0 },
            { text: "Das Sporthaus führt ein neues Kassensystem ein.", cat: 1 }
          ]
        },

        /* ── A4 · Informationen filtern ── */
        {
          type: "sort",
          title: "A4 · Was zählt für den Bedarf?",
          points: 3,
          review: "ersatz-neubedarf",
          guide: [
            {
              kicker: "Aufgabe 4 · Informationen filtern",
              title: "Erst filtern, dann rechnen.",
              body: `<div class="pair">
                       <div><b>zählt</b>Abgang · fester Zugang · neue Stelle (Soll)</div>
                       <div><b>zählt nicht</b>kurze Krankheit · Urlaub · Streit · Feiern</div>
                     </div>
                     <p>Der Personalbestand ändert sich nur, wenn jemand <strong>geht</strong>, <strong>fest dazukommt</strong> oder eine <strong>Stelle neu entsteht</strong>.</p>`
            },
            {
              kicker: "Aufgabe 4 · So filterst du einen Text",
              title: "Markiere beim Lesen.",
              body: `<ul class="pm"><li class="m">Abgang (−): Rente, Elternzeit, Kündigung</li><li class="p">Zugang (+): Übernahme, Rückkehr, unterschriebener Vertrag</li></ul>
                     <p class="box">Dazu kommt der <strong>Soll-Bestand</strong>: die Zahl, die der Betrieb künftig braucht. Alles andere streichst du durch.</p>
                     <p class="note">„Frau Kern geht in Rente (−). Ben wird fest eingestellt (+). Zwei sind krank (streichen).“</p>`
            }
          ],
          prompt: "Ändert die Information den Personalbestand?",
          hints: ["Ändert sich dadurch, wer im Betrieb arbeitet – oder wie viele Stellen es gibt?", "Krankheit, Urlaub und Betriebsklima ändern den Bestand nicht."],
          categories: ["zählt für den Bedarf", "zählt nicht"],
          items: [
            { text: "Herr Vogel geht in Rente.", cat: 0 },
            { text: "Drei Beschäftigte hatten letzte Woche eine Grippe.", cat: 1 },
            { text: "Eine Auszubildende wird fest übernommen.", cat: 0 },
            { text: "Der Betriebsausflug hat allen gut gefallen.", cat: 1 },
            { text: "Für den Online-Shop wird eine zusätzliche Stelle geschaffen.", cat: 0 },
            { text: "Zwei Mitarbeiter machen im Sommer drei Wochen Urlaub.", cat: 1 }
          ]
        },

        /* ── A5 · Nettopersonalbedarf berechnen ── */
        {
          type: "calc",
          title: "A5 · Nettopersonalbedarf",
          points: 8,
          review: "ersatz-neubedarf",
          guide: [
            {
              kicker: "Aufgabe 5 · Nettopersonalbedarf",
              title: "Der Rechenweg in sechs Kästen.",
              body: `<p>Beispiel: Ein Zoofachgeschäft hat 10 Beschäftigte. 2 gehen, 1 kommt fest dazu. Der Soll-Bestand ist 11.</p>
                     ${ablauf([
                       { text: "Ist-Bestand", value: "10" },
                       { op: "− Abgänge", value: "2" },
                       { op: "+ Zugänge", value: "1" },
                       { text: "fortgeschriebener Ist", value: "9", sub: true },
                       { op: "Soll 11 − 9" },
                       { text: "Nettopersonalbedarf", value: "+ 2", hi: true }
                     ])}`
            },
            {
              kicker: "Aufgabe 5 · Ersatz und Neu",
              title: "Zerlege das Ergebnis.",
              body: `<table class="scheme">
                       <tr><td>Ersatzbedarf: Abgänge − Zugänge = 2 − 1</td><td>1</td></tr>
                       <tr><td>Neubedarf: Soll − ursprünglicher Ist = 11 − 10</td><td>1</td></tr>
                       <tr class="sum"><td>Ersatz + Neu = Netto</td><td>2</td></tr>
                     </table>
                     <p class="note">Beim Neubedarf nimmst du den Ist-Bestand von VOR der Fortschreibung.</p>`
            },
            {
              kicker: "Aufgabe 5 · Fallen",
              title: "Drei typische Fehler.",
              body: `<ul class="pm">
                       <li class="m">Krankheit als Abgang zählen. Sie ändert den Bestand nicht.</li>
                       <li class="m">Soll und fortgeschriebenen Ist vertauschen. Dann stimmt das Vorzeichen nicht.</li>
                       <li class="m">Den Neubedarf mit dem fortgeschriebenen Ist rechnen.</li>
                       <li class="p">Probe: Ersatz + Neu muss das Nettoergebnis ergeben.</li>
                     </ul>
                     <p class="note">Schreibe jede Rechenzeile auf. Auch der Weg bringt Punkte.</p>`
            }
          ],
          case: `Das Sporthaus Lindner e. K. hat <b>28 Beschäftigte</b>. Im nächsten Jahr geht Herr Vogel in Rente, Frau Aydin geht in Elternzeit und Herr Meier kündigt, weil er umzieht. Die Auszubildende Lea wird nach der Prüfung fest übernommen, und Herr Sommer kommt aus der Elternzeit zurück. Im Winter waren vier Beschäftigte mit Grippe krank. Für den Online-Shop und die erweiterte Werkstatt werden zwei zusätzliche Stellen geschaffen – insgesamt werden <b>30 Beschäftigte</b> gebraucht.<br><br>Berechne den Nettopersonalbedarf und zerlege ihn in Ersatz- und Neubedarf.`,
          ...bedarf(28, 3, 2, 30, { klausur: true, split: true }),
          result: "Nettopersonalbedarf + 3 = Ersatzbedarf 1 + Neubedarf 2."
        },

        /* ── A6 · Ergebnis deuten ── */
        {
          type: "sentence",
          title: "A6 · Ergebnis deuten",
          points: 3,
          review: "bedarf-berechnen",
          guide: [
            {
              kicker: "Aufgabe 6 · Ergebnis deuten",
              title: "Ohne Deutung fehlen Punkte.",
              body: `<div class="pair">
                       <div><b>positiv (+)</b>Es fehlen Leute. Der Betrieb muss Personal beschaffen.</div>
                       <div><b>negativ (−)</b>Es sind zu viele da. Der Betrieb muss Personal abbauen.</div>
                     </div>
                     <p class="note">Ergebnis null: Der Bestand passt genau.</p>`
            },
            {
              kicker: "Aufgabe 6 · So baust du den Satz",
              title: "Vorzeichen, Bedeutung, Zahl, Folge.",
              body: `<ul><li><strong>1.</strong> Vorzeichen nennen: positiv oder negativ.</li>
                     <li><strong>2.</strong> Bedeutung: Es fehlen Leute oder es bleiben welche übrig.</li>
                     <li><strong>3.</strong> Zahl: Nimm die Zahl aus dem <em>Nettopersonalbedarf</em>.</li>
                     <li><strong>4.</strong> Folge: einstellen oder abbauen.</li></ul>
                     <p class="box">„Der Nettopersonalbedarf ist negativ (− 2). Dem Zoofachgeschäft bleiben 2 Beschäftigte übrig, deshalb muss es Personal abbauen.“</p>`
            }
          ],
          case: `Deute dein Ergebnis aus A5 für das Sporthaus Lindner. Baue dazu den Antwortsatz.`,
          text: "Der Nettopersonalbedarf ist {*positiv|negativ}. Dem Sporthaus Lindner {*fehlen|bleiben} {*drei|zwei|sieben} Beschäftigte, deshalb muss der Betrieb Personal {*einstellen|abbauen}.",
          hints: ["Schau auf das Vorzeichen deines Ergebnisses aus A5.", "Die Zahl steht im Nettopersonalbedarf – nicht im Ersatz- oder Neubedarf."],
          explain: "Deuten heißt: Vorzeichen → Bedeutung → Zahl → Folge."
        },

        /* ── A7 · Bedarf decken ── */
        {
          type: "sort",
          title: "A7 · Bedarf decken",
          points: 3,
          review: "ersatz-neubedarf",
          guide: [
            {
              kicker: "Aufgabe 7 · Bedarf decken",
              title: "Fünf Wege, eine Lücke zu füllen.",
              body: `<dl class="terms">
                       <dt>Überstunden</dt><dd>schnell, kein neues Personal – aber Überlastung.</dd>
                       <dt>Zeitarbeit</dt><dd>schnell und flexibel – aber teurer, die Kräfte bleiben nur kurz im Betrieb.</dd>
                       <dt>Aushilfen</dt><dd>flexibel für Stoßzeiten – aber wenig Erfahrung.</dd>
                       <dt>Einstellen</dt><dd>dauerhaft, hohe Bindung – aber die Suche dauert.</dd>
                       <dt>Ausbilden</dt><dd>sichert Fachkräfte – aber drei Jahre Wartezeit.</dd>
                     </dl>`
            },
            {
              kicker: "Aufgabe 7 · Welche Frist?",
              title: "Wie schnell brauchst du Hilfe?",
              body: `<p class="box"><strong>Schnell nötig</strong> → kurzfristig helfen: Überstunden, Zeitarbeit, Aushilfen.</p>
                     <p class="box"><strong>Dauerhaft nötig</strong> → langfristig lösen: ausbilden, weiterbilden, einstellen.</p>
                     <p class="note">Schnelle Lösungen helfen sofort, kosten aber oft mehr oder belasten die Beschäftigten.</p>`
            }
          ],
          prompt: "Wie schnell wirkt die Maßnahme?",
          hints: ["Was hilft schon in wenigen Tagen oder Wochen?", "Ausbildung und Weiterbildung dauern Monate bis Jahre."],
          categories: ["kurzfristig", "langfristig"],
          items: [
            { text: "Überstunden anordnen", cat: 0 },
            { text: "Eigene Fachkräfte ausbilden", cat: 1 },
            { text: "Zeitarbeitskräfte anfordern", cat: 0 },
            { text: "Beschäftigte zur Fachkraft weiterbilden", cat: 1 },
            { text: "Aushilfen für das Wochenende suchen", cat: 0 },
            { text: "Eine Mitarbeiterin zur Meisterin weiterbilden", cat: 1 }
          ]
        },

        /* ── A8 · Kennzahlenmethode ── */
        {
          type: "calc",
          title: "A8 · Kennzahlenmethode",
          points: 3,
          review: "stellenplan-kennzahlen",
          guide: [
            {
              kicker: "Aufgabe 8 · Kennzahlenmethode",
              title: "Umsatz ÷ Umsatz je Vollzeitstelle.",
              body: `<p>Beispiel Möbelhaus: 2 400 000 € Umsatz, 150 000 € je Vollzeitstelle.</p>
                     ${ablauf([
                       { text: "Umsatz", value: "2 400 000 €" },
                       { op: "÷ Umsatz je Stelle", value: "150 000 €" },
                       { text: "Vollzeitstellen", value: "16", hi: true }
                     ])}
                     <p class="note">Rechentrick: gleich viele Nullen streichen. 240 ÷ 15 = 16.</p>`
            },
            {
              kicker: "Aufgabe 8 · Was die Zahl bedeutet",
              title: "Vollzeitstellen sind keine Köpfe.",
              body: `<p>Zwei Teilzeitkräfte mit je einer halben Stelle sind zusammen <strong>eine</strong> Vollzeitstelle.</p>
                     <div class="pair">
                       <div><b>Stärke</b>Schnell gerechnet, gut für einen ersten Überblick.</div>
                       <div><b>Schwäche</b>Sie zeigt nicht, in welchem Bereich Personal fehlt.</div>
                     </div>`
            }
          ],
          case: `Das Sporthaus erwartet im nächsten Jahr <b>3 600 000 €</b> Umsatz. Je Vollzeitstelle werden <b>120 000 €</b> Umsatz angesetzt. Berechne die Zahl der Vollzeitstellen.`,
          hints: ["Teile den Umsatz durch den Umsatz je Vollzeitstelle.", "Streiche bei beiden Zahlen vier Nullen: 360 ÷ 12."],
          rows: [{ label: "Vollzeitstellen: 3 600 000 € ÷ 120 000 €", value: 30 }],
          result: "Das Sporthaus braucht nach der Kennzahlenmethode 30 Vollzeitstellen. Das passt zum Plan aus A5."
        },

        /* ── A9 · Methode beurteilen ── */
        {
          type: "quiz",
          title: "A9 · Methode beurteilen",
          points: 2,
          review: "stellenplan-kennzahlen",
          guide: [
            {
              kicker: "Aufgabe 9 · Methode beurteilen",
              title: "Zwei Methoden im Vergleich.",
              body: `<div class="pair">
                       <div><b>Stellenplan</b>Jede Stelle wird einzeln durchgezählt. Genau, aber aufwendig.</div>
                       <div><b>Kennzahlen</b>Umsatz ÷ Umsatz je Stelle. Schnell, aber nur grob.</div>
                     </div>
                     <p class="box">Beurteilen heißt: Vorteil nennen, Nachteil nennen, Fazit ziehen.</p>`
            },
            {
              kicker: "Aufgabe 9 · Die Entscheidungsregel",
              title: "Klein und genau – oder groß und schnell?",
              body: `<ul class="pm">
                       <li class="p">Stellenplan: kleine Betriebe mit wenigen Beschäftigten, neue Aufgaben, genaue Planung.</li>
                       <li class="p">Kennzahlen: große Betriebe, erster Überblick, verlässlicher Umsatz.</li>
                       <li class="m">Kennzahlen sind ungenau, wenn Erfahrungswerte (Zahlen aus früheren Jahren) fehlen, zum Beispiel für ein ganz neues Produkt.</li>
                     </ul>
                     <p class="note">Lies jede Antwort zu Ende. Oft ist nur ein Teil einer Aussage falsch.</p>`
            }
          ],
          questions: [
            {
              q: "Für den neuen Online-Shop weiß das Sporthaus noch nicht, wie viel Umsatz eine Vollzeitstelle dort bringt. Was stimmt?",
              options: [
                "Die Kennzahlenmethode ist ungenau, weil dieser Wert fehlt.",
                "Die Kennzahlenmethode ist sehr genau, weil der Umsatz eines Betriebs immer bekannt ist.",
                "Die Stellenplanmethode geht nicht, weil man neue Stellen nicht planen kann.",
                "Beide Methoden sind bei neuen Aufgaben immer gleich genau."
              ],
              answer: 0,
              hint: "Was braucht die Kennzahlenmethode als Grundlage?",
              explain: "Ohne Erfahrungswert für den Umsatz je Vollzeitstelle wird die Kennzahlenmethode ungenau."
            },
            {
              q: "Warum passt die Stellenplanmethode gut zum Sporthaus mit 28 Beschäftigten?",
              options: [
                "Der Betrieb ist klein genug, um jede Stelle und Aufgabe einzeln zu prüfen.",
                "Sie betrachtet nur den Umsatz und ist deshalb besonders schnell.",
                "Große Betriebe dürfen sie nicht nutzen.",
                "Sie braucht keine Zahlen."
              ],
              answer: 0,
              hint: "Die Stellenplanmethode zählt jede Stelle einzeln durch.",
              explain: "Bei 28 Beschäftigten lässt sich jede Stelle einzeln prüfen. Das macht die Planung genau."
            }
          ]
        },

        /* ── A10 · Ausbildungsbedarf ── */
        {
          type: "calc",
          title: "A10 · Ausbildungsbedarf",
          points: 3,
          review: "ausbildungsbedarf",
          guide: [
            {
              kicker: "Aufgabe 10 · Ausbildungsbedarf",
              title: "Fachkräfte ÷ Ausbildungsjahre.",
              body: `<p>Beispiel Bäckerei: 9 Fachkräfte in 3 Jahren, die Ausbildung dauert 3 Jahre.</p>
                     ${ablauf([
                       { text: "Fachkräfte gebraucht", value: "9" },
                       { op: "÷ Ausbildungsjahre", value: "3" },
                       { text: "Plätze pro Jahr", value: "3", hi: true },
                       { op: "× Ausbildungsjahre", value: "3" },
                       { text: "Azubis gleichzeitig", value: "9", sub: true }
                     ])}`
            },
            {
              kicker: "Aufgabe 10 · Kosten und Nutzen",
              title: "Azubis lösen keinen akuten Bedarf.",
              body: `<div class="pair">
                       <div><b>Kosten</b>Ausbildungsvergütung, Berufsschulzeiten, Zeit der Ausbilder/innen</div>
                       <div><b>Nutzen</b>Azubis kennen die Abläufe. Übernahme sichert Fachkräfte.</div>
                     </div>
                     <p class="note">Erst nach der Ausbildung sind Azubis Fachkräfte. Deshalb planst du Ausbildung mehrere Jahre im Voraus.</p>`
            }
          ],
          case: `Das Sporthaus braucht in <b>drei Jahren sechs Fachkräfte</b> aus eigener Ausbildung. Die Ausbildung dauert drei Jahre.`,
          hints: ["Teile die Fachkräfte durch die Ausbildungsjahre.", "Azubis gleichzeitig = Plätze pro Jahr × Ausbildungsjahre."],
          rows: [
            { label: "Ausbildungsplätze pro Jahr: 6 ÷ 3", value: 2 },
            { label: "Azubis gleichzeitig im Betrieb, wenn alle drei Ausbildungsjahre besetzt sind", value: 6 }
          ],
          result: "2 Plätze pro Jahr. Sind alle drei Ausbildungsjahre besetzt, sind 6 Azubis gleichzeitig im Betrieb."
        },

        /* ── A11 · Stellung nehmen ── */
        {
          type: "sentence",
          title: "A11 · Stellung nehmen",
          points: 4,
          review: "ersatz-neubedarf",
          guide: [
            {
              kicker: "Aufgabe 11 · Stellung nehmen",
              title: "Meinung mit Begründung.",
              body: `<p>Du sagst, was du von einem Vorschlag hältst, und begründest es mit dem Fall.</p>
                     ${ablauf([
                       { text: "Vorteil nennen" },
                       { op: "aber" },
                       { text: "Nachteil nennen" },
                       { op: "weil (Bezug zum Fall)" },
                       { text: "Empfehlung geben", hi: true }
                     ])}`
            },
            {
              kicker: "Aufgabe 11 · Musterbeispiel",
              title: "So klingt eine gute Stellungnahme.",
              body: `<p class="box">„Eine Kollegin fehlt nur zwei Wochen. Aushilfen haben den Vorteil, dass sie flexibel und schnell einsetzbar sind. Ein Nachteil ist, dass sie wenig Erfahrung haben. Da die Lücke nur kurz ist, empfehle ich Aushilfen.“</p>
                     <p class="note">In A11 gilt das gleiche Muster, nur mit Zeitarbeit.</p>`
            },
            {
              kicker: "Aufgabe 11 · Fallen",
              title: "Achte auf den Fall.",
              body: `<ul class="pm">
                       <li class="m">Nur Vorteile oder nur Nachteile nennen.</li>
                       <li class="m">Eine Empfehlung ohne Bezug zum Fall.</li>
                       <li class="p">Die Empfehlung muss zur Dauer im Fall passen: kurz oder dauerhaft.</li>
                     </ul>`
            }
          ],
          case: `Frau Lindner überlegt: „Die zwei neuen Stellen für Online-Shop und Werkstatt besetze ich dauerhaft mit Zeitarbeitskräften.“ <b>Nimm Stellung</b>, indem du die Stellungnahme aus Bausteinen baust.`,
          text: "Zeitarbeit hat den Vorteil, dass die Kräfte {*schnell verfügbar sind|dauerhaft günstiger sind}. Ein Nachteil ist, dass Zeitarbeit {*teurer ist und die Bindung an den Betrieb gering bleibt|die Stelle nie besetzt}. Da die zwei Stellen {*dauerhaft|nur ein paar Tage} gebraucht werden, empfehle ich {*eigene Neueinstellungen|noch mehr Zeitarbeit}.",
          hints: ["Vorteil, Nachteil, Begründung mit dem Fall, Empfehlung.", "Die Stellen werden dauerhaft gebraucht. Was passt dazu?"],
          explain: "Stellung nehmen: Vorteil → Nachteil → Begründung mit dem Fall → eigene Empfehlung."
        }
      ]
    },

    {
      id: "uebungsklausur-1",
      folder: "klausur",
      group: "Große Klausuren",
      title: "Übungsklausur Personalbedarf",
      kicker: "Übungsklausur · Klausur 1",
      minutes: 45,
      exam: {
        minutes: 45,
        tools: "Taschenrechner, Heft für Nebenrechnungen",
        // Notenschlüssel: [ab Prozent, Note, Bezeichnung] – bei Bedarf an den eigenen Schlüssel anpassen
        grading: [[92, "1", "sehr gut"], [81, "2", "gut"], [67, "3", "befriedigend"], [50, "4", "ausreichend"], [30, "5", "mangelhaft"], [0, "6", "ungenügend"]]
      },
      steps: [
        {
          type: "quiz",
          title: "A1 · Fachbegriffe",
          points: 6,
          review: "fachbegriffe",
          questions: [
            { q: "So viele Beschäftigte arbeiten zurzeit im Betrieb.", options: ["Bruttopersonalbedarf", "Ist-Personalbestand", "Nettopersonalbedarf", "Ersatzbedarf"], answer: 1 },
            { q: "Wie viele Beschäftigte der Betrieb laut Plan insgesamt braucht.", options: ["Bruttopersonalbedarf", "Fortschreibung", "Ist-Personalbestand", "Neubedarf"], answer: 0 },
            { q: "Ist-Bestand − Abgänge + Zugänge", options: ["Nettopersonalbedarf", "Kennzahlenmethode", "Fortschreibung", "Ersatzbedarf"], answer: 2 },
            { q: "Der Teil des Bedarfs, der durch zusätzliche Stellen entsteht.", options: ["Ersatzbedarf", "Neubedarf", "Ausbildungsbedarf", "Ist-Personalbestand"], answer: 1 },
            { q: "Der Teil des Bedarfs, der ausscheidende Beschäftigte ersetzt.", options: ["Neubedarf", "Bruttopersonalbedarf", "Ersatzbedarf", "Zugang"], answer: 2 },
            { q: "Umsatz ÷ Umsatz je Vollzeitstelle", options: ["Stellenplanmethode", "Kennzahlenmethode", "Fortschreibung", "Ausbildungsbedarf"], answer: 1 }
          ]
        },
        {
          type: "sort",
          title: "A2 · Autonom oder initiiert?",
          points: 3,
          review: "fachbegriffe",
          prompt: "Ordne jede Veränderung zu.",
          categories: ["autonom", "initiiert"],
          items: [
            { text: "Eine Kassiererin geht in den Ruhestand.", cat: 0 },
            { text: "Der Betrieb stellt einen Lageristen ein.", cat: 1 },
            { text: "Ein Verkäufer kündigt, weil er studieren möchte.", cat: 0 },
            { text: "Die Chefin versetzt eine Kraft ins Lager.", cat: 1 },
            { text: "Ein Mitarbeiter geht in Elternzeit.", cat: 0 },
            { text: "Einem Mitarbeiter wird wegen Diebstahls gekündigt.", cat: 1 }
          ]
        },
        {
          type: "sort",
          title: "A3 · Extern oder intern?",
          points: 3,
          review: "fachbegriffe",
          prompt: "Ordne jeden Einflussfaktor zu.",
          categories: ["extern", "intern"],
          items: [
            { text: "Die Wirtschaft wächst stark.", cat: 0 },
            { text: "Der Betrieb führt eine neue Kassensoftware ein.", cat: 1 },
            { text: "Ein neues Gesetz verlängert die Ladenöffnungszeiten.", cat: 0 },
            { text: "Die Geschäftsleitung eröffnet eine zweite Filiale.", cat: 1 },
            { text: "In der Region gibt es kaum Fachkräfte.", cat: 0 },
            { text: "Der Betrieb verlängert seine Öffnungszeiten am Samstag.", cat: 1 }
          ]
        },
        {
          type: "cloze",
          title: "A4 · Lückentext",
          points: 5,
          review: "fachbegriffe",
          prompt: "Zwei Wörter passen nicht.",
          text: "Zuerst schreibt man den {Ist-Personalbestand} fort: Man zieht die {Abgänge} ab und zählt die {Zugänge} dazu. Vom {Soll-Bestand} zieht man den fortgeschriebenen Ist-Bestand ab. Das Ergebnis ist der {Nettopersonalbedarf}.",
          distractors: ["Umsatzrendite", "Bruttolohn"]
        },
        {
          type: "calc",
          title: "A5 · Elektro Schulte OHG",
          points: 8,
          review: "ersatz-neubedarf",
          case: `Die Elektro Schulte OHG hat <b>34 Beschäftigte</b>. Herr Brandt geht im März in Rente, Frau Yilmaz geht in Elternzeit. Ein Verkäufer kündigt, weil er studieren möchte. Zwei Auszubildende werden nach bestandener Prüfung übernommen. Im letzten Monat waren drei Beschäftigte krank. Für die neue Smart-Home-Abteilung wird eine zusätzliche Stelle geschaffen – insgesamt werden <b>35 Beschäftigte</b> gebraucht.<br><br>Berechne den Nettopersonalbedarf und zerlege ihn in Ersatz- und Neubedarf.`,
          rows: bedarfRows(34, 3, 2, 35, { klausur: true, split: true }),
          result: "Nettopersonalbedarf + 2 = Ersatzbedarf 1 + Neubedarf 1."
        },
        {
          type: "sentence",
          title: "A6 · Ergebnis deuten",
          points: 3,
          review: "bedarf-berechnen",
          case: `Deute dein Ergebnis aus A5 und nenne eine Möglichkeit, wie Elektro Schulte den Bedarf <b>kurzfristig</b> decken kann. Baue dazu den Antwortsatz.`,
          text: "Der Nettopersonalbedarf ist {*positiv|negativ}. Elektro Schulte fehlen {*zwei|drei|keine} Beschäftigte, der Betrieb muss Personal {*einstellen|abbauen}. Kurzfristig hilft {*Zeitarbeit|Ausbildung}, weil Leiharbeitskräfte {*schnell verfügbar|günstiger} sind.",
          explain: "Deuten heißt: Vorzeichen → Bedeutung → Zahl → Maßnahme mit Begründung."
        },
        {
          type: "calc",
          title: "A7 · Kennzahlenmethode",
          points: 3,
          review: "stellenplan-kennzahlen",
          case: `Ein Baumarkt erwartet <b>5 400 000 €</b> Umsatz. Je Vollzeitstelle werden <b>180 000 €</b> Umsatz angesetzt.`,
          rows: [{ label: "Vollzeitstellen: 5 400 000 € ÷ 180 000 €", value: 30 }],
          result: "Der Baumarkt braucht 30 Vollzeitstellen."
        },
        {
          type: "quiz",
          title: "A8 · Methode beurteilen",
          points: 2,
          review: "stellenplan-kennzahlen",
          questions: [
            {
              q: "Ein Friseursalon mit 6 Beschäftigten plant seinen Personalbedarf. Welche Methode ist geeigneter?",
              options: ["Stellenplanmethode, weil man jede Stelle genau durchzählen kann", "Kennzahlenmethode, weil sie genauer ist", "Kennzahlenmethode, weil kleine Betriebe keinen Umsatz haben", "Keine Methode, kleine Betriebe brauchen keine Planung"],
              answer: 0
            },
            {
              q: "Der Umsatz des Baumarkts schwankt stark. Was bedeutet das für die Kennzahlenmethode?",
              options: ["Sie wird genauer.", "Das Ergebnis ist schnell veraltet.", "Nichts, der Umsatz spielt keine Rolle.", "Man muss dann die Stellen zählen."],
              answer: 1
            }
          ]
        },
        {
          type: "calc",
          title: "A9 · Ausbildungsbedarf",
          points: 3,
          review: "ausbildungsbedarf",
          case: `Elektro Schulte braucht in <b>drei Jahren zwölf Fachkräfte</b> aus eigener Ausbildung. Die Ausbildung dauert drei Jahre.`,
          rows: [
            { label: "Ausbildungsplätze pro Jahr: 12 ÷ 3", value: 4 },
            { label: "Azubis gleichzeitig im Betrieb, wenn drei Jahrgänge laufen", value: 12 }
          ],
          result: "4 Plätze pro Jahr. Bei drei Ausbildungsjahren sind dann 12 Azubis gleichzeitig im Betrieb."
        },
        {
          type: "sentence",
          title: "A10 · Stellung nehmen",
          points: 4,
          review: "ersatz-neubedarf",
          case: `Die Geschäftsführung schlägt vor: „Den Bedarf aus A5 decken wir komplett mit Überstunden.“ <b>Nimm Stellung</b>, indem du die Stellungnahme aus Bausteinen baust.`,
          text: "Überstunden haben den Vorteil, dass {*kein neues Personal gesucht werden muss|die Beschäftigten mehr Freizeit haben}. Ein Nachteil ist, dass die Beschäftigten {*überlastet werden|weniger verdienen}. Da die zwei Stellen {*dauerhaft|nur ein paar Tage} fehlen, empfehle ich {*zwei feste Neueinstellungen|noch mehr Überstunden}.",
          explain: "Stellung nehmen: Vorteil → Nachteil → Begründung → eigene Entscheidung."
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
});
