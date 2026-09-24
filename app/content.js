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

/* Rechenschema + gestufte Tipps aus den Zahlen des Falls */
function bedarf(ist, ab, zu, soll, opts = {}) {
  const zw = ist - ab + zu, nb = soll - zw;
  const sig = (v) => (v > 0 ? "+ " + v : v < 0 ? "− " + Math.abs(v) : "0");
  const hints = [
    "Übertrage zuerst die Zahlen aus dem Fall: <b>Ist-Bestand</b>, <b>Abgänge</b>, <b>Zugänge</b> und <b>Soll</b>. Zähle die Namen – jede Person ist 1.",
    `Zwischensumme: Vom Ist-Bestand ziehst du die Abgänge ab und zählst die Zugänge dazu.<br><b>${ist} − ${ab} + ${zu} = ?</b>`,
    `Personalbedarf: <b>Soll minus Zwischensumme</b> – nicht andersherum! Achte auf das Vorzeichen.<br><b>${soll} − ${zw} = ?</b>`
  ];
  if (opts.split) hints.push(`Ersatzbedarf = Abgänge − Zugänge = <b>${ab} − ${zu}</b>.<br>Neubedarf = Soll − ursprünglicher Ist = <b>${soll} − ${ist}</b>.`);
  hints.push(`Lösungsweg: ${ist} − ${ab} + ${zu} = <b>${zw}</b> → ${soll} − ${zw} = <b>${sig(nb)}</b>` +
    (opts.split ? ` → Ersatz ${ab - zu} + Neu ${soll - ist} = ${sig(nb)}` : "") +
    `<br>${nb > 0 ? "Positiv: Es muss eingestellt werden." : nb < 0 ? "Negativ: Es sind zu viele da." : "Null: Es passt genau."}`);
  return { rows: bedarfRows(ist, ab, zu, soll, opts), hints };
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
          help: `<h3>Ausbildungsbedarf</h3>
                 <p class="formula">benötigte Fachkräfte ÷ Ausbildungsjahre = Plätze pro Jahr</p>
                 <h3>Merksatz</h3>
                 <p>Azubis lösen <strong>keinen akuten</strong> Personalbedarf – Ausbildung dauert drei Jahre.</p>
                 <h3>Kosten und Nutzen</h3>
                 <ul><li><strong>Kosten:</strong> Ausbildungsvergütung, Berufsschulzeiten, Zeit der Ausbilder/innen.</li>
                 <li><strong>Nutzen:</strong> Azubis kennen die Abläufe, Übernahme sichert Fachkräfte.</li></ul>`,

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

        /* ══════════════ MINI-KLAUSUREN ══════════════ */
        {
          id: "mini-klausur-1",
          help: `<h3>In der Klausur</h3>
                 <ul><li>Erst alle Aufgaben lesen, dann arbeiten.</li>
                 <li>Beim Rechnen jeden Schritt aufschreiben – auch der Weg bringt Punkte.</li>
                 <li>Ergebnis immer mit Vorzeichen deuten und einen Antwortsatz schreiben.</li></ul>
                 <p class="formula">Ist − Abgänge + Zugänge = fortgeschriebener Ist<br>Soll − fortgeschriebener Ist = Nettopersonalbedarf</p>
                 <p class="formula">Umsatz ÷ Umsatz je Vollzeitstelle = Stellen<br>Fachkräfte ÷ Ausbildungsjahre = Plätze pro Jahr</p>`,

          group: "Klausurtraining",
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

          group: "Klausurtraining",
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

          group: "Klausurtraining",
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
        {
          id: "uebungsklausur-1",
          group: "Klausurtraining",
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
    }
  ]
};
