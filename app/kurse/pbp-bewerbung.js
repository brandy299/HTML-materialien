/* ============================================================
   KURS: PBP · HS1 – Bewerbung
   Fach PBP · Lernfeld 8.1 · Modellunternehmen Mediaworld e. K.
   Teil 1: Stellenanzeige & Profil (LS 2.2).
   Teil 2: Bewerbung & Auswahl (LS 2.3) – ohne Arbeitsblatt nach Standard-Lehrplan erstellt.
   Aufbau und alle Aufgabentypen: app/README.md
   ============================================================ */

LERNRAUM.subjects.push({
  id: "pbp-bewerbung",
  fach: "PBP",
  added: "2026-10-08",          // Datum der Veröffentlichung (für „Neu“ auf der Startseite)
  updated: "2026-10-19",        // neu: Teil 2 Bewerbung & Auswahl (LS 2.3)
  name: "Bewerbung",
  course: "PBP · HS1",
  glyph: "B",
  color: "#F386A1",
  company: "Mediaworld e.K.",
  description: "Lernsituation 2.2/2.3 · Stellenanzeigen verstehen und die eigene Bewerbung meistern – am Modellunternehmen Mediaworld e. K.",
  folders: [
    {
      id: "stellenanzeige", group: "Stellenanzeige & Profil", kicker: "Ordner · LS 2.2",
      title: "Stellenanzeige & Profil",
      description: "Personalbeschaffung, Anforderungsprofil, Anzeigen-Sprache, Anzeigen-Check und das eigene Stärkenprofil."
    },
    {
      id: "auswahl", group: "Bewerbung & Auswahl", kicker: "Ordner · LS 2.3",
      title: "Bewerbung & Auswahl",
      description: "Bewerbungsmappe, Vorauswahl, Zeugnisse lesen, Vorstellungsgespräch, Bewertungstabelle, Zusage und Absage – Mediaworld wählt aus."
    }
  ],
  topics: [

    /* ══════════════ LS 2.2 · STELLENANZEIGE & PROFIL ══════════════ */
    {
      id: "intern-extern",
      video: "pbp-intern-extern",          // Erklärvideo als Einstieg (app/videos/), zählt nicht als Schritt
      videoTitle: "Intern oder extern?",
      folder: "stellenanzeige",
      help: `<h3>Personalbeschaffung</h3>
             <p class="formula">Alle Maßnahmen, mit denen ein Unternehmen seinen Nettopersonalbedarf deckt – offene Stellen also besetzt.</p>
             <h3>Die zwei Wege</h3>
             <ul><li><strong>Intern:</strong> Die Kraft kommt aus dem eigenen Betrieb – Versetzung, Beförderung, Umschulung, Übernahme.</li>
             <li><strong>Extern:</strong> Die Kraft kommt von außen – Stellenanzeige, Arbeitsagentur, Jobbörse, Personalberater, Empfehlungen, Messen.</li></ul>
             <h3>Der Merksatz</h3>
             <ul><li>Intern ist günstig und schnell – aber <strong>die alte Stelle wird frei: Das Loch wandert.</strong></li>
             <li>Extern bringt neue Ideen – kostet aber Zeit und Geld.</li></ul>
             <h3>Häufige Fehler</h3>
             <ul><li>„Beförderung“ für extern halten – sie kommt aus dem Betrieb, ist also intern.</li>
             <li>Vergessen, dass beim internen Weg die alte Stelle neu besetzt werden muss.</li></ul>`,
      group: "Stellenanzeige & Profil",
      title: "Personal beschaffen: intern oder extern?",
      kicker: "LS 2.2 · Teil 1",
      minutes: 20,
      steps: [
        {
          type: "slides",
          title: "Woher nehmen wir die neuen Leute?",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Die Lage",
              title: "Die Rechnung liegt auf dem Tisch: +3 Stellen.",
              body: `<p>Die Mediaworld e. K. in Oberhausen braucht bis zum Frühjahr <strong>drei zusätzliche Kräfte</strong>. Im nächsten Jahr startet ein Online-Shop, die Werkstatt wird erweitert.</p>
                     <p>Inhaberin Sofia Ramos überlegt: „Gut, wir brauchen Leute. Aber woher nehmen wir sie?“</p>`
            },
            {
              kicker: "Das Problem",
              title: "Melike warnt vor dem <em>wandernden Loch</em>.",
              body: `<p>Melike aus dem Büro sagt: „Wenn jemand aus dem Betrieb wechselt, fehlt er an seiner <strong>alten Stelle</strong>. Das Loch wandert nur.“</p>
                     <p class="box">Genau darüber müssen wir reden: Es gibt <strong>zwei Wege</strong>, offene Stellen zu besetzen.</p>`
            },
            {
              kicker: "Die zwei Wege",
              title: "Intern oder extern?",
              body: `<div class="pair">
                       <div><b>Intern</b>Die neue Kraft kommt aus dem eigenen Betrieb.</div>
                       <div><b>Extern</b>Die neue Kraft kommt von außerhalb – vom Arbeitsmarkt.</div>
                     </div>`
            },
            {
              kicker: "Weg 1",
              title: "Intern – aus dem eigenen Betrieb",
              body: `<dl class="terms">
                       <dt>Versetzung</dt><dd>Ein Mitarbeiter wechselt die Abteilung.</dd>
                       <dt>Beförderung</dt><dd>Er bekommt eine höhere Position.</dd>
                       <dt>Umschulung</dt><dd>Er wird für eine andere Tätigkeit weitergebildet.</dd>
                       <dt>Übernahme</dt><dd>Ein Azubi bleibt nach der Prüfung im Betrieb.</dd>
                     </dl>
                     <p class="note">Vorteil: Die Person kennt Betrieb und Abläufe. Nachteil: Ihre alte Stelle wird frei.</p>`
            },
            {
              kicker: "Weg 2",
              title: "Extern – vom Arbeitsmarkt",
              body: `<ul>
                       <li><strong>Stellenanzeige</strong> – Zeitung, Internet, eigene Homepage</li>
                       <li><strong>Arbeitsagentur</strong> – vermittelt Kräfte</li>
                       <li><strong>Jobbörsen</strong> und <strong>Personalberater</strong></li>
                       <li><strong>Empfehlungen</strong> von Mitarbeitern, <strong>Ausbildungsmessen</strong></li>
                     </ul>
                     <p class="note">Vorteil: neue Ideen, größere Auswahl. Nachteil: dauert länger, kostet Geld, Einarbeitung nötig.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Intern ist günstig – das Loch wandert.<br>Extern bringt Ideen – kostet Zeit.",
              body: `<p>Intern passt, wenn jemand im Betrieb die Aufgaben schon kann. Extern passt, wenn die Qualifikation fehlt oder frische Ideen gebraucht werden.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "Intern oder extern?",
          prompt: "Ordne jede Maßnahme dem richtigen Weg zu.",
          hints: ["Frag dich: Kommt die Person aus dem eigenen Betrieb – oder von außen?",
                  "Eine Beförderung kommt aus dem Betrieb. Eine Stellenanzeige sucht jemanden von außen."],
          categories: ["Intern", "Extern"],
          items: [
            { text: "Ein Lagermitarbeiter wechselt in den Verkauf.", cat: 0 },
            { text: "Eine Stellenanzeige erscheint auf der Homepage.", cat: 1 },
            { text: "Eine Verkäuferin wird stellvertretende Abteilungsleitung.", cat: 0 },
            { text: "Ein Personalberater sucht eine Fachkraft.", cat: 1 },
            { text: "Ein Azubi wird nach der Prüfung übernommen.", cat: 0 },
            { text: "Die Arbeitsagentur vermittelt eine neue Kraft.", cat: 1 }
          ]
        },
        {
          type: "quiz",
          title: "Was passt zusammen?",
          questions: [
            {
              q: "Was ist der große <b>Vorteil</b> der internen Personalbeschaffung?",
              hint: "Denk an Jan Weber und sein Werkstattteam: Wer kennt Werkstatt und Abläufe schon?",
              options: [
                "Die Person kennt den Betrieb und braucht kaum Einarbeitung.",
                "Man findet immer jemanden mit genau der fehlenden Qualifikation.",
                "Es kommen ganz sicher neue Ideen von außen dazu."
              ],
              answer: 0,
              explain: "Intern heißt: Die Kraft ist schon da und kennt Betrieb, Abläufe und Kunden. Deshalb ist die Einarbeitung kurz."
            },
            {
              q: "Für den neuen <b>Online-Shop</b> fehlt im Betrieb jede Erfahrung. Was empfiehlst du Sofia?",
              hint: "Frage dich: Kann das jemand aus dem Betrieb schon – oder brauchen wir jemanden mit neuer Qualifikation?",
              options: [
                "Intern – ein Lagermitarbeiter wechselt einfach in den Online-Shop.",
                "Extern – im Betrieb fehlt die Qualifikation, es braucht neue Ideen.",
                "Gar nichts tun – der Bedarf löst sich von allein."
              ],
              answer: 1,
              explain: "Wenn die Qualifikation im Betrieb fehlt, passt der externe Weg: Stellenanzeige, Jobbörse, Personalberater."
            }
          ]
        },
        {
          type: "sentence",
          title: "Antwortsatz bauen",
          case: "Baue den Antwortsatz zum <b>wandernden Loch</b> aus den Bausteinen.",
          text: "Wenn ein Lagermitarbeiter in die Werkstatt wechselt, wird seine {*alte Stelle|neue Stelle} frei. Das nennt man: Das Loch {*wandert|bleibt stehen}. Deshalb muss die alte Stelle {*doch neu besetzt werden|nie wieder besetzt werden}.",
          hints: ["Die Person ist weg von ihrem alten Platz – dort fehlt jetzt jemand.",
                  "Das Bild vom Loch sagt: Die Lücke verschwindet nicht, sie zieht um."],
          explain: "Beim internen Weg wandert die Lücke: Die neue Stelle ist besetzt, aber an der alten fehlt jetzt eine Kraft."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann erklären, was Personalbeschaffung ist.",
            "Ich kann interne und externe Personalbeschaffung unterscheiden.",
            "Ich kann für einen Fall begründet empfehlen, welcher Weg passt."
          ]
        }
      ]
    },

    {
      id: "anforderungsprofil",
      video: "pbp-anforderungsprofil",
      videoTitle: "Muss erfüllen – mit Kann punkten",
      folder: "stellenanzeige",
      help: `<h3>Anforderungsprofil</h3>
             <p class="formula">Alle fachlichen und persönlichen Anforderungen für eine Stelle – der Maßstab für die Auswahl.</p>
             <h3>Die zwei Bereiche</h3>
             <ul><li><strong>Fachlich:</strong> Wissen und Können – Schulabschluss, Deutsch, Mathe, PC-Grundlagen.</li>
             <li><strong>Persönlich:</strong> Eigenschaften und Verhalten – Zuverlässigkeit, Sorgfalt, Freundlichkeit, Teamfähigkeit.</li></ul>
             <h3>Muss und Kann</h3>
             <ul><li><strong>Muss-Anforderung:</strong> K.O.-Kriterium – ohne sie geht es nicht (z. B. Schulabschluss).</li>
             <li><strong>Kann-Anforderung:</strong> Wunsch – wer sie mitbringt, hat einen Vorteil (z. B. Praktikum).</li></ul>
             <h3>Häufige Fehler</h3>
             <ul><li>Eigenschaften wie „zuverlässig“ für fachlich halten – sie sind persönlich.</li>
             <li>Eine Kann-Anforderung als K.O.-Kriterium behandeln – deshalb werden gute Bewerber aussortiert.</li></ul>`,
      group: "Stellenanzeige & Profil",
      title: "Das Anforderungsprofil einer Stelle",
      kicker: "LS 2.2 · Teil 2",
      minutes: 20,
      steps: [
        {
          type: "slides",
          title: "Was muss die neue Kraft können?",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Vor der Anzeige",
              title: "„Nett reicht nicht.“",
              body: `<p>Melike legt Tara einen Zettel hin: Schulabschluss, Deutsch und Mathe, Sorgfalt, Freundlichkeit, Teamfähigkeit …</p>
                     <p>„Das ist unser <strong>Anforderungsprofil</strong> für die neue Azubi-Stelle. So wissen wir genau, wen wir suchen.“</p>
                     <p>Tara stutzt: „So viel? Ich dachte, wir suchen einfach jemanden, der nett ist.“</p>`
            },
            {
              kicker: "Der Weg bis zur Anzeige",
              title: "Erst die Aufgaben, dann die Anforderungen.",
              body: `<div class="pair">
                       <div><b>Stellenbeschreibung</b>Welche Aufgaben gehören zu dieser Stelle?</div>
                       <div><b>Anforderungsprofil</b>Welche Qualifikationen und Eigenschaften soll die Person mitbringen?</div>
                     </div>
                     <p class="note">Das Profil ist der Maßstab für die ganze Auswahl – vom Bewerbungscheck bis zum Vorstellungsgespräch.</p>`
            },
            {
              kicker: "Bereich 1",
              title: "Fachliche Anforderungen",
              body: `<p>Alles, was man <strong>können und wissen</strong> muss:</p>
                     <ul><li>Schulabschluss</li><li>Deutsch in Wort und Schrift</li><li>Grundrechenarten</li><li>PC-Grundlagen</li></ul>`
            },
            {
              kicker: "Bereich 2",
              title: "Persönliche Anforderungen",
              body: `<p>Alles, wie man <strong>sein und sich verhalten</strong> soll:</p>
                     <ul><li>Zuverlässigkeit und Pünktlichkeit</li><li>Sorgfalt</li><li>Freundlichkeit im Kundenkontakt</li><li>Teamfähigkeit und Lernbereitschaft</li></ul>`
            },
            {
              kicker: "Der Unterschied macht's",
              title: "Muss oder Kann?",
              body: `<dl class="terms">
                       <dt>Muss-Anforderung</dt><dd>K.O.-Kriterium: Wer sie nicht erfüllt, kommt nicht in die Auswahl – z. B. Hauptschulabschluss, Deutsch.</dd>
                       <dt>Kann-Anforderung</dt><dd>Wunsch: schön, aber nicht zwingend – z. B. Praktikum, Führerschein, Englisch. Wer sie mitbringt, hat einen Vorteil.</dd>
                     </dl>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Muss erfüllen – mit Kann punkten.",
              body: `<p>Die Trennung macht die Auswahl <strong>fair</strong>: Jede Absage lässt sich begründen. Und du weißt als Bewerber, was du unbedingt erfüllen musst.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "Fachlich oder persönlich?",
          prompt: "Sortiere die Anforderungen aus dem Mediaworld-Profil.",
          hints: ["Fachlich heißt: Wissen und Können – das kann man lernen und prüfen.",
                  "Pünktlichkeit ist eine Eigenschaft – die kann man nicht unterrichten wie Vokabeln."],
          categories: ["Fachlich", "Persönlich"],
          items: [
            { text: "Grundrechenarten", cat: 0 },
            { text: "Pünktlichkeit", cat: 1 },
            { text: "Deutsch in Wort und Schrift", cat: 0 },
            { text: "Sorgfalt", cat: 1 },
            { text: "PC-Grundkenntnisse", cat: 0 },
            { text: "Freundlichkeit", cat: 1 }
          ]
        },
        {
          type: "sort",
          title: "Muss oder Kann?",
          prompt: "Ohne was geht es gar nicht (K.O.) – und was ist nur ein Wunsch?",
          hints: ["Frage: Wer das nicht hat – kommt der trotzdem in die Auswahl?",
                  "Ein Praktikum ist schön, aber kein K.O.-Kriterium."],
          categories: ["Muss (K.O.)", "Kann (Wunsch)"],
          items: [
            { text: "Hauptschulabschluss nach Klasse 9 oder höher", cat: 0 },
            { text: "Praktikumserfahrung im Büro", cat: 1 },
            { text: "Deutsch sicher in Wort und Schrift", cat: 0 },
            { text: "Führerschein", cat: 1 },
            { text: "Zuverlässigkeit", cat: 0 },
            { text: "Grundkenntnisse Englisch", cat: 1 }
          ]
        },
        {
          type: "sentence",
          title: "Antwortsatz bauen",
          case: "Zwei Bewerbungen liegen vor: <b>A</b> erfüllt alle Muss-Anforderungen, hat aber keine Kann-Anforderungen. <b>B</b> fehlt der Schulabschluss, dafür bringt B drei Kann-Anforderungen mit.",
          text: "Bewerber B erfüllt den Schulabschluss {*nicht|doch}. Der Schulabschluss ist ein {*K.O.-Kriterium|Wunsch}. Deshalb wird B {*aussortiert|eingeladen}, obwohl B Kann-Anforderungen mitbringt.",
          hints: ["Der Schulabschluss steht bei Muss – was bedeutet das für die Auswahl?",
                  "K.O. heißt: Wer das nicht erfüllt, ist raus – egal, was sonst noch da ist."],
          explain: "Der Schulabschluss ist eine Muss-Anforderung (K.O.-Kriterium). B wird aussortiert; A bekommt die Chance, Kann-Punkte klärt das Gespräch."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann erklären, was ein Anforderungsprofil ist.",
            "Ich kann fachliche und persönliche Anforderungen unterscheiden.",
            "Ich kann Muss- und Kann-Anforderungen trennen und begründet entscheiden."
          ]
        }
      ]
    },

    {
      id: "anzeigen-code",
      video: "pbp-anzeigen-code",
      videoTitle: "Der Code der Stellenanzeige",
      folder: "stellenanzeige",
      help: `<h3>Die sechs Bausteine</h3>
             <p class="formula">1. Wer wir sind · 2. Was wir bieten · 3. Wen wir suchen · 4. Deine Aufgaben · 5. Dein Profil · 6. So bewirbst du dich</p>
             <h3>Floskeln entschlüsselt</h3>
             <ul><li><strong>belastbar:</strong> hält Stress aus, auch wenn viel gleichzeitig kommt.</li>
             <li><strong>flexibel:</strong> springt auch mal ein oder bleibt länger.</li>
             <li><strong>Teamplayer:</strong> arbeitet gern mit anderen und teilt Informationen.</li>
             <li><strong>selbstständig:</strong> fragt nicht bei jedem kleinen Schritt nach.</li>
             <li><strong>flache Hierarchien:</strong> kurze Wege – du sprichst direkt mit der Chefin.</li></ul>
             <h3>Abkürzungen</h3>
             <ul><li><strong>m/w/d</strong> männlich/weiblich/divers – die Stelle ist für alle Geschlechter offen · <strong>VZ/TZ</strong> Vollzeit/Teilzeit · <strong>ggf.</strong> gegebenenfalls.</li></ul>
             <h3>Warnsignale</h3>
             <ul><li>Kein Firmenname, nur eine Handynummer, Druck und Eile, Rechtschreibfehler, Vorauszahlung oder Ausweiskopie per Chat.</li></ul>`,
      group: "Stellenanzeige & Profil",
      title: "Die Stellenanzeige: Aufbau und Sprache",
      kicker: "LS 2.2 · Teil 3",
      minutes: 20,
      steps: [
        {
          type: "slides",
          title: "Den Code der Anzeigen knacken",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Tara am Laptop",
              title: "„Was heißt das alles?“",
              body: `<p>Tara sitzt über einer Anzeige aus dem Internet: „m/w/d … wir suchen belastbare Teamplayer … flache Hierarchien …“</p>
                     <p>Melike setzt sich dazu: „Stellenanzeigen haben ihre eigene Sprache. Sie sind wie ein <strong>Code</strong> – wer ihn kennt, weiß sofort, was der Betrieb wirklich sucht.“</p>`
            },
            {
              kicker: "Baustein 1–3",
              title: "Jede Anzeige beginnt mit Werbung.",
              body: `<ol>
                       <li><strong>Wer wir sind</strong> – welcher Betrieb sucht, was macht er?</li>
                       <li><strong>Was wir bieten</strong> – Ausbildung, Vergütung, Team, Übernahmechance.</li>
                       <li><strong>Wen wir suchen</strong> – Beruf, Ausbildungsjahr, Beginn.</li>
                     </ol>`
            },
            {
              kicker: "Baustein 4–6",
              title: "Dann kommt das Kleingedruckte für dich.",
              body: `<ol start="4">
                       <li><strong>Deine Aufgaben</strong> – was du im Alltag machst.</li>
                       <li><strong>Dein Profil</strong> – was du mitbringen musst.</li>
                       <li><strong>So bewirbst du dich</strong> – wohin, mit welchen Unterlagen, bis wann?</li>
                     </ol>
                     <p class="note">Wenn du die sechs Bausteine kennst, liest du jede Anzeige in zwei Minuten.</p>`
            },
            {
              kicker: "Floskeln entschlüsselt",
              title: "Was wirklich gemeint ist",
              body: `<dl class="terms">
                       <dt>belastbar</dt><dd>Du hältst Stress aus, auch wenn viel gleichzeitig kommt.</dd>
                       <dt>flexibel</dt><dd>Du springst auch mal ein oder bleibst länger.</dd>
                       <dt>Teamplayer</dt><dd>Du arbeitest gern mit anderen und teilst Informationen.</dd>
                       <dt>selbstständig</dt><dd>Du fragst nicht bei jedem kleinen Schritt nach.</dd>
                       <dt>flache Hierarchien</dt><dd>Kurze Wege – du sprichst direkt mit der Chefin.</dd>
                     </dl>`
            },
            {
              kicker: "Achtung, unseriös",
              title: "Warnsignale erkennen",
              body: `<ul>
                       <li>Kein Firmenname, keine echte Adresse</li>
                       <li>Nur eine Handynummer als Kontakt</li>
                       <li>Druck und Eile: „Nur heute!“</li>
                       <li>„Verdienst bis zu …“ ohne Berufsbezeichnung</li>
                       <li>Vorauszahlung oder Ausweiskopie per Chat</li>
                     </ul>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Gute Anzeigen werben um dich.<br>Sie locken nicht.",
              body: `<p>Eine seriöse Anzeige nennt Firmenname, Adresse, Aufgaben, Profil und eine erreichbare Kontaktperson.</p>`
            }
          ]
        },
        {
          type: "cloze",
          title: "Fachbegriffe einsetzen",
          text: "Die öffentliche Ausschreibung einer offenen Stelle heißt {Stellenanzeige}. Der Baustein „Dein {Profil}“ sagt, welche Anforderungen du mitbringen musst. Im letzten Baustein steht bis wann du dich bewirbst – also die {Frist}. Fehlt der {Firmenname}, ist die Anzeige unseriös.",
          distractors: ["Überstunden", "Gehalt", "Kündigung"],
          hints: ["Der letzte Baustein heißt „So bewirbst du dich“ – dort steht ein Termin.",
                  "Eine unseriöse Anzeige verrät nicht, wer dahinter steckt – was fehlt da?"]
        },
        {
          type: "sort",
          title: "Seriös oder unseriös?",
          prompt: "Prüfe die Merkmale: Welche gehören zu einer seriösen Anzeige – welche sind Warnsignale?",
          hints: ["Frage: Wirbt der Betrieb um dich – oder wird Druck gemacht?",
                  "Eine echte Firma versteckt sich nicht."],
          categories: ["Seriös", "Unseriös"],
          items: [
            { text: "Vollständiger Firmenname und Adresse", cat: 0 },
            { text: "Nur eine Handynummer als Kontakt", cat: 1 },
            { text: "Klare Beschreibung der Aufgaben", cat: 0 },
            { text: "„Sofort starten! Nur heute!“", cat: 1 },
            { text: "Vorauszahlung für Arbeitskleidung", cat: 1 },
            { text: "Ansprechpartnerin mit Namen genannt", cat: 0 }
          ]
        },
        {
          type: "quiz",
          title: "Floskeln übersetzen",
          questions: [
            {
              q: "In der Anzeige steht: „Wir suchen eine <b>belastbare</b> und flexible Persönlichkeit.“ Was heißt das?",
              hint: "Denk an stressige Tage im Büro: viele Kunden, Telefon, Lieferung – alles gleichzeitig.",
              options: [
                "Du hältst Stress aus und hilfst bei Engpässen auch mal aus.",
                "Du kannst schwere Kartons tragen.",
                "Du arbeitest am liebsten allein und ohne Kunden."
              ],
              answer: 0,
              explain: "Belastbar heißt: Du bleibst auch an stressigen Tagen freundlich und sorgfältig. Flexibel heißt: Du springst ein."
            },
            {
              q: "Welche Anzeige ist <b>unseriös</b>?",
              hint: "Prüfe bei jeder Anzeige: Firmenname? Aufgaben? Profil? Kontaktweg?",
              options: [
                "BüroCenter Ruhr GmbH, Marktstraße 12, Oberhausen – sucht Azubi (m/w/d) Büromanagement.",
                "„Junge Leute gesucht! Gute Bezahlung, melde dich per WhatsApp: 0176-xxxxxxx. Nur heute!“",
                "Die Mediaworld e. K. sucht eine Auszubildende – Bewerbung an bewerbung@mediaworld.de."
              ],
              answer: 1,
              explain: "Kein Firmenname, keine Aufgaben, kein Profil, nur Handynummer und Druck: typische Warnsignale."
            }
          ]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann die sechs Bausteine einer Stellenanzeige benennen.",
            "Ich kann typische Anzeigen-Sprache in einfache Sätze übersetzen.",
            "Ich kann beurteilen, ob eine Anzeige seriös ist."
          ]
        }
      ]
    },

    {
      id: "anzeigen-check",
      folder: "stellenanzeige",
      help: `<h3>Die Sechs-Schritt-Analyse</h3>
             <p class="formula">1. Absender · 2. Stelle/Beginn/Umfang · 3. Ort · 4. Aufgaben · 5. Anforderungen (Muss/Kann) · 6. Bewerbungsweg (Weg, Unterlagen, Frist)</p>
             <h3>Qualitäts-Check (5 Merkmale)</h3>
             <ul><li>vollständiger Firmenname und Adresse</li><li>klare Aufgabenbeschreibung</li>
             <li>realistische Anforderungen (Muss und Kann getrennt)</li>
             <li>Angaben zu Vergütung oder Ausbildungsjahr</li><li>erreichbare Kontaktperson</li></ul>
             <h3>Häufige Fehler</h3>
             <ul><li>Die Bewerbungsfrist vergessen – daran scheitern viele Bewerbungen.</li>
             <li>Ein „komisches Gefühl“ ignorieren – es ist meistens ein Warnsignal.</li></ul>`,
      group: "Stellenanzeige & Profil",
      title: "Werkstatt: Eine Anzeige analysieren",
      kicker: "LS 2.2 · Teil 4",
      minutes: 20,
      steps: [
        {
          type: "slides",
          title: "Wie ein Profi analysieren",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Werkstattauftrag",
              title: "Zwei Anzeigen auf dem Tisch.",
              body: `<p>Melike legt Tara zwei ausgedruckte Anzeigen hin: „Bevor wir unsere eigene schreiben, üben wir an fremden.“</p>
                     <p><strong>Anzeige A:</strong> BüroCenter Ruhr GmbH, Marktstraße 12, Oberhausen – Ausbildung Büromanagement (m/w/d), Start 01.08., Kundenempfang, Telefon, Aufträge erfassen. Profil: Hauptschulabschluss, Deutsch, Sorgfalt. Kontakt: Frau Klein, Frist 15.05.</p>
                     <p><strong>Anzeige B:</strong> „Junge, motivierte Leute für Büroarbeit gesucht! Bis zu 2.500 €, flexible Zeiten. Sofort starten! WhatsApp: 0176-xxxxxxx.“</p>`
            },
            {
              kicker: "So gehst du vor",
              title: "Die Sechs-Schritt-Analyse",
              body: `<ol>
                       <li><strong>Absender</strong> – wer sucht?</li>
                       <li><strong>Stelle</strong> – welcher Beruf, Beginn, Umfang?</li>
                       <li><strong>Ort</strong> – wo wird gearbeitet?</li>
                       <li><strong>Aufgaben</strong> – was ist zu tun?</li>
                       <li><strong>Anforderungen</strong> – was muss, was kann ich mitbringen?</li>
                       <li><strong>Bewerbungsweg</strong> – wie, mit welchen Unterlagen, bis wann?</li>
                     </ol>
                     <p class="note">Arbeite die Schritte immer in derselben Reihenfolge ab – dann vergisst du nichts.</p>`
            },
            {
              kicker: "Der Qualitäts-Check",
              title: "Woran du eine gute Anzeige erkennst",
              body: `<ul>
                       <li>Vollständiger Firmenname und Adresse</li>
                       <li>Klare Aufgabenbeschreibung</li>
                       <li>Realistische Anforderungen – Muss und Kann getrennt</li>
                       <li>Angaben zu Vergütung oder Ausbildungsjahr</li>
                       <li>Erreichbare Kontaktperson</li>
                     </ul>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Ein komisches Gefühl ist ein Warnsignal.",
              body: `<p>Fehlen die Qualitätsmerkmale oder kommen Warnsignale dazu – kein Firmenname, nur Handynummer, Druck – dann: nicht antworten und eine erwachsene Person fragen.</p>`
            }
          ]
        },
        {
          type: "quiz",
          title: "Die Anzeigen prüfen",
          questions: [
            {
              q: "Welche Anzeige ist <b>seriös gemacht</b>?",
              hint: "Prüfe die fünf Qualitätsmerkmale – welche Anzeige erfüllt fast alle?",
              options: [
                "Anzeige A – vollständiger Firmenname, Adresse, Aufgaben, Profil, Kontakt und Frist.",
                "Anzeige B – sie verspricht mehr Geld.",
                "Beide sind gleich gut."
              ],
              answer: 0,
              explain: "Anzeige A erfüllt fast alle Qualitätsmerkmale. Anzeige B nennt weder Firma noch Aufgaben – sie lockt nur."
            },
            {
              q: "Welcher Schritt der Analyse fehlt bei Anzeige B fast komplett?",
              hint: "Was erfährst du bei B über die Aufgaben? Und wer sucht eigentlich?",
              options: [
                "Der Absender und die Aufgaben – es fehlen Firmenname und Tätigkeitsbeschreibung.",
                "Nur die Vergütung – alles andere steht da.",
                "Es fehlt nichts, die Anzeige ist vollständig."
              ],
              answer: 0,
              explain: "Bei B fehlen die wichtigsten Schritte: kein Absender, keine Aufgaben, kein Profil, nur eine Handynummer."
            }
          ]
        },
        {
          type: "sentence",
          title: "Dein Urteil bauen",
          case: "Formuliere dein Urteil über Anzeige B aus den Bausteinen.",
          text: "Anzeige B nennt keinen {*Firmenname|Beruf} und keine Aufgaben. Der Kontakt läuft nur über eine {*Handynummer|E-Mail-Adresse}. Deshalb ist die Anzeige {*unseriös|seriös}.",
          hints: ["Vergleiche B mit den fünf Qualitätsmerkmalen einer guten Anzeige.",
                  "Ein seriöser Betrieb versteckt sich nicht hinter einer Handynummer."],
          explain: "Gute Anzeigen werben um dich mit vollständigen Angaben. B lockt mit Geld und Druck – das sind Warnsignale."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann eine Stellenanzeige mit dem Sechs-Schritt-Raster untersuchen.",
            "Ich kann zwei Anzeigen vergleichen.",
            "Ich kann begründet beurteilen, ob eine Anzeige seriös ist."
          ]
        }
      ]
    },

    {
      id: "staerkenprofil",
      folder: "stellenanzeige",
      help: `<h3>Warum ein Stärkenprofil?</h3>
             <p class="formula">Bewerbung = dein Profil trifft das Anforderungsprofil der Stelle.</p>
             <h3>Der Abgleich</h3>
             <ul><li><strong>Muss-Anforderungen:</strong> erst prüfen – erfülle ich die K.O.-Kriterien?</li>
             <li><strong>Kann-Anforderungen:</strong> hier kannst du punkten – Praktika, Englisch, PC-Kenntnisse, Hobbys.</li></ul>
             <h3>Deine Chance als externe Kraft</h3>
             <ul><li>Neue Ideen, Erfahrungen aus Praktika, Schule und Hobbys, Lernbereitschaft – Dinge, die eine betriebsinterne Kraft nicht mitbringt.</li></ul>
             <h3>Häufige Fehler</h3>
             <ul><li>Sich größer machen als man ist – ehrlich bleiben, sonst fliegt es im Gespräch auf.</li>
             <li>Eigene Stärken kleinreden – jede Stärke mit einem kleinen Beispiel belegen.</li></ul>`,
      group: "Stellenanzeige & Profil",
      title: "Meine Stärken und die Stelle",
      kicker: "LS 2.2 · Teil 5",
      minutes: 15,
      steps: [
        {
          type: "slides",
          title: "Was bringe ich mit?",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Dein Profil",
              title: "Die Stelle ist der Maßstab – du bist die Antwort.",
              body: `<p>Die Mediaworld sucht eine Auszubildende oder einen Auszubildenden für Büromanagement.</p>
                     <p>Für deine Bewerbung heißt das: Vergleiche <strong>dein Stärkenprofil</strong> mit dem <strong>Anforderungsprofil</strong> der Stelle.</p>`
            },
            {
              kicker: "Schritt 1",
              title: "Die Muss-Anforderungen zuerst.",
              body: `<p>Prüfe ehrlich: Erfülle ich die <strong>K.O.-Kriterien</strong>?</p>
                     <ul><li>Hauptschulabschluss (kommt mit dem Zeugnis)</li>
                     <li>Deutsch in Wort und Schrift</li>
                     <li>Zuverlässigkeit und Pünktlichkeit</li></ul>
                     <p class="note">Wenn hier etwas fehlt, ist diese Stelle (noch) nichts – oder du fragst nach, ob es geht.</p>`
            },
            {
              kicker: "Schritt 2",
              title: "Mit den Kann-Anforderungen punkten.",
              body: `<p>Was macht dich <strong>stärker als andere</strong>?</p>
                     <ul><li>Praktikumserfahrung im Büro</li>
                     <li>Grundkenntnisse Englisch</li>
                     <li>PC-Erfahrung, z. B. aus Schule oder Hobbys</li></ul>
                     <p class="note">Immer mit einem kleinen Beispiel belegen: „Ich habe im Praktikum …“</p>`
            },
            {
              kicker: "Deine Chance",
              title: "Als externe Kraft bringst du frische Ideen mit.",
              body: `<ul>
                       <li>Neue Ideen von außen – das, was intern fehlt (Betriebsblindheit!)</li>
                       <li>Erfahrungen aus Praktika, Schule und Hobbys</li>
                       <li>Lernbereitschaft: Du willst es wissen</li>
                     </ul>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Ehrlich + konkret = überzeugend.",
              body: `<p>Keine erfundenen Stärken. Jede Stärke bekommst du mit einem Beispiel: Was hast du gemacht? Wie war das Ergebnis?</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "Fachlich oder persönlich?",
          prompt: "Sortiere die Stärken. Welche ist Wissen und Können – welche ist eine Eigenschaft?",
          hints: ["Kann man es in einem Test prüfen oder lernt man es im Unterricht? Dann ist es fachlich.",
                  "Eigenschaften zeigen sich im Verhalten – nicht in Noten."],
          categories: ["Fachlich", "Persönlich"],
          items: [
            { text: "Ich rechne die Grundrechenarten sicher.", cat: 0 },
            { text: "Ich bin pünktlich und zuverlässig.", cat: 1 },
            { text: "Ich kann gut mit Word umgehen.", cat: 0 },
            { text: "Ich bleibe freundlich, auch wenn Kunden ungeduldig sind.", cat: 1 },
            { text: "Ich kann ganz gut Englisch.", cat: 0 },
            { text: "Ich arbeite gern im Team.", cat: 1 }
          ]
        },
        {
          type: "sentence",
          title: "Mein Profil-Abgleich",
          case: "Bringe dein Profil mit der Azubi-Stelle zusammen – aus den Bausteinen.",
          text: "Ich erfülle die Muss-Anforderungen, weil ich {*zuverlässig|unfreundlich} bin. Mit einer {*Praktikumserfahrung im Büro|neuen Spielekonsole} kann ich zusätzlich punkten.",
          explain: "Erst die Muss-Anforderungen absichern, dann mit Kann-Anforderungen punkten – immer ehrlich und mit Beispiel."
        },
        {
          type: "quiz",
          title: "Passt das zur Stelle?",
          questions: [
            {
              q: "Du bringst keinen Führerschein mit. Kannst du dich trotzdem auf die Azubi-Stelle bewerben?",
              hint: "Was ist der Führerschein: Muss oder Kann?",
              options: [
                "Ja – der Führerschein ist eine Kann-Anforderung. Er bringt einen Vorteil, ist aber kein K.O.-Kriterium.",
                "Nein – ohne Führerschein ist die Bewerbung zwecklos.",
                "Nur wenn ich im Anschreiben den Führerschein erfinde."
              ],
              answer: 0,
              explain: "Kann-Anforderungen sind Wünsche. Wer eine Muss-Anforderung nicht erfüllt, ist raus – beim Kann fehlt nur ein Vorteil."
            },
            {
              q: "Was gehört in eine ehrliche Selbsteinschätzung?",
              hint: "Denk an den Merksatz: Ehrlich + konkret = überzeugend.",
              options: [
                "Konkrete Stärken mit Beispielen – nichts erfinden.",
                "Nur die Dinge, die ich perfekt kann – alles andere verschweigen.",
                "Mindestens zehn Stärken, egal ob sie stimmen."
              ],
              answer: 0,
              explain: "Gute Betriebe merken erfundene Stärken im Gespräch. Ehrlich bleiben und jede Stärke mit einem Beispiel belegen."
            }
          ]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann meine fachlichen und persönlichen Stärken benennen.",
            "Ich kann mein Profil mit dem Anforderungsprofil der Mediaworld vergleichen.",
            "Ich kann begründen, warum ich mich auf die Stelle bewerbe."
          ]
        }
      ]
    },

    {
      id: "leistungsabfrage",
      folder: "stellenanzeige",
      group: "Leistungsabfrage",
      title: "Leistungsabfrage Personalbeschaffung",
      kicker: "Leistungsabfrage · benotet",
      minutes: 20,
      exam: {
        minutes: 20,
        graded: true,    // Kürzel + Klassen-PIN vor dem Start, Ergebnis-Code am Ende (app/lehrer.html liest ihn ein)
        tools: "keine",
        // Notenschlüssel Handelsschule
        grading: [[87, "1", "sehr gut"], [73, "2", "gut"], [59, "3", "befriedigend"], [45, "4", "ausreichend"], [18, "5", "mangelhaft"], [0, "6", "ungenügend"]]
      },
      steps: [
        {
          type: "quiz",
          title: "A1 · Fachbegriffe",
          points: 6,
          review: "intern-extern",
          questions: [
            { q: "Alle Maßnahmen, mit denen ein Betrieb offene Stellen besetzt.", options: ["Personalbeschaffung", "Personalabbau", "Personalplanung", "Lohnabrechnung"], answer: 0 },
            { q: "Die neue Kraft kommt aus dem eigenen Betrieb.", options: ["Externe Beschaffung", "Interne Beschaffung", "Stellenanzeige", "Personalberater"], answer: 1 },
            { q: "Der Betrieb kennt nur die eigenen Abläufe und bekommt keine neuen Ideen von außen.", options: ["Betriebsblindheit", "Kann-Anforderung", "Anforderungsprofil", "Muss-Anforderung"], answer: 0 },
            { q: "Die Zusammenstellung aller fachlichen und persönlichen Anforderungen an eine Stelle.", options: ["Stellenanzeige", "Anforderungsprofil", "Arbeitsvertrag", "Kann-Liste"], answer: 1 },
            { q: "Wer diese Anforderung nicht erfüllt, kommt nicht in die Auswahl.", options: ["Kann-Anforderung", "Muss-Anforderung", "Persönliche Anforderung", "Warnsignal"], answer: 1 },
            { q: "Die öffentliche Ausschreibung einer offenen Stelle.", options: ["Bewerbung", "Anforderungsprofil", "Stellenanzeige", "Zeugnis"], answer: 2 }
          ]
        },
        {
          type: "sort",
          title: "A2 · Intern oder extern?",
          points: 3,
          review: "intern-extern",
          prompt: "Ordne jeden Weg der Personalbeschaffung zu.",
          categories: ["intern", "extern"],
          items: [
            { text: "Eine Verkäuferin wird zur Abteilungsleiterin befördert.", cat: 0 },
            { text: "Der Betrieb schaltet eine Anzeige in einer Jobbörse.", cat: 1 },
            { text: "Ein Lagerist wird in den Verkauf versetzt.", cat: 0 },
            { text: "Ein Personalberater sucht eine Fachkraft.", cat: 1 },
            { text: "Eine Auszubildende wird nach der Prüfung übernommen.", cat: 0 },
            { text: "Die Arbeitsagentur schlägt zwei Bewerber vor.", cat: 1 }
          ]
        },
        {
          type: "sort",
          title: "A3 · Muss oder Kann?",
          points: 3,
          review: "anforderungsprofil",
          prompt: "Ordne jede Anforderung aus einer Stellenanzeige zu.",
          categories: ["Muss", "Kann"],
          items: [
            { text: "Hauptschulabschluss ist Pflicht.", cat: 0 },
            { text: "Ein Praktikum im Handel ist von Vorteil.", cat: 1 },
            { text: "Gute Deutschkenntnisse sind Voraussetzung.", cat: 0 },
            { text: "Ein Führerschein Klasse B ist wünschenswert.", cat: 1 },
            { text: "Sicherer Umgang mit Zahlen ist zwingend.", cat: 0 },
            { text: "Erfahrung mit Kassensystemen ist ein Pluspunkt.", cat: 1 }
          ]
        },
        {
          type: "sort",
          title: "A4 · Fachlich oder persönlich?",
          points: 3,
          review: "anforderungsprofil",
          prompt: "Ordne jede Anforderung zu.",
          categories: ["fachlich", "persönlich"],
          items: [
            { text: "PC-Grundlagen", cat: 0 },
            { text: "Teamfähigkeit", cat: 1 },
            { text: "Sicheres Rechnen", cat: 0 },
            { text: "Zuverlässigkeit", cat: 1 },
            { text: "Schulabschluss", cat: 0 },
            { text: "Freundlichkeit", cat: 1 }
          ]
        },
        {
          type: "cloze",
          title: "A5 · Lückentext",
          points: 5,
          review: "intern-extern",
          prompt: "Zwei Wörter passen nicht.",
          text: "Personalbeschaffung deckt den {Nettopersonalbedarf}. Kommt die Kraft aus dem eigenen Betrieb, heißt das {intern}. Ein Nachteil ist die {Betriebsblindheit}. Außerdem wird die alte Stelle frei, das Loch {wandert}. Kommt die Kraft von außen, spricht man vom {externen} Weg.",
          distractors: ["Umsatzrendite", "Kündigung"]
        },
        {
          type: "quiz",
          title: "A6 · Stellenanzeige prüfen",
          points: 4,
          review: "anzeigen-check",
          questions: [
            { q: "Welches Merkmal spricht für eine seriöse Anzeige?", options: ["Nur eine Handynummer", "Vollständiger Firmenname und Adresse", "Es wird Vorauszahlung verlangt", "Bewerbung nur heute möglich"], answer: 1 },
            { q: "Welches Merkmal ist ein Warnsignal?", options: ["Klare Aufgabenbeschreibung", "Erreichbare Kontaktperson", "Druck und Eile", "Genaues Anforderungsprofil"], answer: 2 },
            { q: "Was gehört in eine gute Stellenanzeige?", options: ["Aufgaben, Profil und Bewerbungsweg", "Nur der Verdienst", "Das Privatleben der Chefin", "Nur ein Foto"], answer: 0 },
            { q: "Vorteil der internen Beschaffung?", options: ["Immer neue Ideen von außen", "Schnell und günstig, die Kraft kennt den Betrieb", "Keine Stelle wird frei", "Es braucht keine Einarbeitung mehr"], answer: 1 }
          ]
        }
      ]
    },

    {
      id: "fachbegriffe",
      folder: "stellenanzeige",
      group: "Stellenanzeige & Profil",
      title: "Fachbegriffe nachschlagen",
      kicker: "Lernkarten",
      minutes: 10,
      steps: [
        {
          type: "cards",
          title: "Fachbegriffe LS 2.2",
          cards: [
            { front: "Personalbeschaffung", back: "Alle Maßnahmen, mit denen ein Unternehmen seinen Nettopersonalbedarf deckt – offene Stellen werden besetzt." },
            { front: "Interne Personalbeschaffung", back: "Die neue Kraft kommt aus dem eigenen Betrieb: Versetzung, Beförderung, Umschulung, Übernahme." },
            { front: "Externe Personalbeschaffung", back: "Die neue Kraft kommt von außerhalb: Stellenanzeige, Arbeitsagentur, Jobbörse, Personalberater, Empfehlung, Messe." },
            { front: "Betriebsblindheit", back: "Der Betrieb kennt nur seine eigenen Abläufe und bekommt keine neuen Ideen von außen." },
            { front: "Anforderungsprofil", back: "Die Zusammenstellung aller fachlichen und persönlichen Anforderungen für eine Stelle – der Maßstab für die Auswahl." },
            { front: "Fachliche Anforderung", back: "Wissen und Können, z. B. Schulabschluss, Deutsch, Mathe, PC-Grundlagen." },
            { front: "Persönliche Anforderung", back: "Eigenschaften und Verhalten, z. B. Zuverlässigkeit, Sorgfalt, Freundlichkeit, Teamfähigkeit." },
            { front: "Muss-Anforderung", back: "K.O.-Kriterium: Wer sie nicht erfüllt, kommt nicht in die Auswahl – z. B. der Schulabschluss." },
            { front: "Kann-Anforderung", back: "Wunsch: schön, aber nicht zwingend. Wer sie mitbringt, hat einen Vorteil – z. B. ein Praktikum." },
            { front: "Stellenanzeige", back: "Die öffentliche Ausschreibung einer offenen Stelle – sie informiert über Betrieb, Aufgaben, Profil und Bewerbungsweg." },
            { front: "Seriöse Anzeige", back: "Vollständiger Firmenname, Adresse, klare Aufgaben, Profil und erreichbare Kontaktperson – keine Vorauszahlung." },
            { front: "Warnsignale", back: "Kein Firmenname, nur eine Handynummer, Druck und Eile, Rechtschreibfehler, Vorauszahlung." }
          ]
        }
      ]
    },
    /* ══════════════ LS 2.3 · BEWERBUNG & AUSWAHL ══════════════
       Ohne Arbeitsblatt der Lehrkraft nach Standard-Lehrplan erstellt (Creative Director, 19.10.2026):
       Bewerbungsmappe · Vorauswahl · Zeugnisse lesen · Vorstellungsgespräch · Bewertungstabelle · Zusage/Absage/Datenschutz. */
    {
      id: "bewerbungsmappe",
      folder: "auswahl",
      group: "Bewerbung & Auswahl",
      title: "Die Bewerbungsmappe",
      kicker: "LS 2.3 · Teil 1",
      minutes: 15,
      help: `<h3>Bewerbungsmappe</h3>
             <p class="formula">Anschreiben + Lebenslauf + Zeugnisse + Nachweise</p>
             <ul><li><strong>Anschreiben:</strong> Warum diese Stelle? Warum passe ich?</li>
             <li><strong>Lebenslauf:</strong> Daten, Schule, Praktika, Kenntnisse – tabellarisch, lückenlos, aktuell.</li>
             <li><strong>Zeugnisse:</strong> das letzte Schulzeugnis.</li>
             <li><strong>Nachweise:</strong> Praktikumsbescheinigungen, Kurse, Zertifikate.</li></ul>
             <h3>Gehört nicht hinein</h3>
             <ul><li>Ausweis-Kopie, Kontoauszug, Krankmeldung, private Fotos.</li></ul>
             <p class="note">Ein Foto ist freiwillig. Der Betrieb darf es nicht verlangen.</p>`,
      steps: [
        {
          type: "slides",
          title: "Die Post ist da",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Zwei Wochen nach der Anzeige",
              title: "„Fünf Bewerbungen – und jetzt?“",
              body: `<p>Die Anzeige für die Azubi-Stelle war online. Jetzt liegen <strong>fünf Bewerbungen</strong> im Postfach.</p>
                     <p>Melike sagt zu Tara: „Bevor wir lesen, prüfen wir: Ist jede <strong>Bewerbungsmappe</strong> vollständig?“</p>`
            },
            {
              kicker: "Was gehört hinein?",
              title: "Vier Teile machen die Mappe komplett.",
              body: `<ol>
                       <li><strong>Anschreiben</strong> – Warum diese Stelle? Warum passe ich?</li>
                       <li><strong>Lebenslauf</strong> – Daten, Schule, Praktika, Kenntnisse</li>
                       <li><strong>Zeugnisse</strong> – das letzte Schulzeugnis</li>
                       <li><strong>Nachweise</strong> – Praktikumsbescheinigungen, Kurse</li>
                     </ol>
                     <p class="note">Heute kommt die Mappe meist als <strong>eine PDF-Datei</strong> per E-Mail oder über ein Online-Formular.</p>`
            },
            {
              kicker: "Der Lebenslauf",
              title: "Tabellarisch, lückenlos, aktuell.",
              body: `<ul><li><strong>tabellarisch:</strong> kurze Zeilen mit Datum, keine langen Sätze</li>
                       <li><strong>lückenlos:</strong> keine Monate, die einfach fehlen</li>
                       <li><strong>aktuell:</strong> mit Ort und Datum von heute</li></ul>
                     <p class="note">Ein Foto ist freiwillig. Der Betrieb darf es nicht verlangen.</p>`
            },
            {
              kicker: "Achtung",
              title: "Das gehört nicht in die Mappe.",
              body: `<ul class="pm"><li class="m">Kopie vom Personalausweis</li><li class="m">Kontoauszug</li><li class="m">Krankmeldung</li><li class="m">Fotos von der Party</li></ul>
                     <p>Solche Unterlagen sind privat. Der Betrieb braucht sie für die Auswahl nicht.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Vollständig – sonst wird es schwer.",
              body: `<p>Fehlt ein wichtiger Teil, wirkt die Bewerbung <strong>unsorgfältig</strong>. Das kostet Punkte, bevor jemand den Inhalt liest.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "Rein oder raus?",
          prompt: "Gehört das in die Bewerbungsmappe für Mediaworld?",
          hints: ["In die Mappe gehört alles, was zeigt: Ich passe zur Stelle.",
                  "Private Unterlagen wie Kontoauszüge oder Krankmeldungen gehören nicht hinein."],
          categories: ["Gehört hinein", "Gehört nicht hinein"],
          items: [
            { text: "Anschreiben", cat: 0 },
            { text: "Kopie vom Personalausweis", cat: 1 },
            { text: "Lebenslauf", cat: 0 },
            { text: "Kontoauszug", cat: 1 },
            { text: "letztes Schulzeugnis", cat: 0 },
            { text: "Krankmeldung vom Arzt", cat: 1 },
            { text: "Praktikumsbescheinigung", cat: 0 }
          ]
        },
        {
          type: "quiz",
          title: "Wo steht was?",
          questions: [
            {
              q: "Wo erklärt die Bewerberin, <b>warum</b> sie gut zur Stelle passt?",
              hint: "Ein Teil der Mappe ist ein Brief an den Betrieb.",
              options: ["im Anschreiben", "im Lebenslauf", "im Schulzeugnis"],
              answer: 0,
              explain: "Das Anschreiben ist der Brief: Warum diese Stelle? Warum passe ich?"
            },
            {
              q: "Wo stehen Schule, Praktika und Kenntnisse kurz mit Datum?",
              options: ["im Anschreiben", "im Lebenslauf", "in der Praktikumsbescheinigung"],
              answer: 1,
              explain: "Der Lebenslauf ist tabellarisch: kurze Zeilen mit Datum."
            },
            {
              q: "Ein Lebenslauf zeigt: Schule bis Juni, dann nichts bis Dezember. Was fehlt?",
              hint: "Denk an die drei Regeln für den Lebenslauf.",
              options: ["Er ist nicht tabellarisch.", "Er ist nicht lückenlos.", "Er hat kein Foto."],
              answer: 1,
              explain: "Lückenlos heißt: Auch Juli bis November müssen erklärt sein (z. B. Praktikum, Jobben, Ferien)."
            },
            {
              q: "Darf Mediaworld ein Bewerbungsfoto verlangen?",
              options: ["Ja, immer.", "Nein, das Foto ist freiwillig.", "Nur von Frauen."],
              answer: 1,
              explain: "Das Foto ist freiwillig. Der Betrieb darf niemanden ohne Foto schlechter behandeln."
            }
          ]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann die vier Teile einer Bewerbungsmappe nennen.",
            "Ich kann erklären, wie ein guter Lebenslauf aussieht.",
            "Ich weiß, welche Unterlagen nicht in die Mappe gehören."
          ]
        }
      ]
    },

    {
      id: "vorauswahl",
      folder: "auswahl",
      group: "Bewerbung & Auswahl",
      title: "Die Vorauswahl",
      kicker: "LS 2.3 · Teil 2",
      minutes: 20,
      help: `<h3>Vorauswahl</h3>
             <p class="formula">Formal prüfen → Inhalt mit dem Anforderungsprofil vergleichen → A, B oder C</p>
             <h3>Formal</h3>
             <ul><li>vollständig, ordentlich, ohne Rechtschreibfehler, richtiger Betriebsname</li></ul>
             <h3>Inhaltlich</h3>
             <ul><li>Muss-Anforderungen erfüllt? Wie viele Kann-Anforderungen?</li>
             <li>Lebenslauf: Lücken? Schulzeugnis: Noten in Deutsch und Mathe, Fehltage</li></ul>
             <h3>Drei Stapel</h3>
             <ul><li><strong>A:</strong> passt gut → zum Gespräch einladen</li>
             <li><strong>B:</strong> passt teilweise → Reserve</li>
             <li><strong>C:</strong> eine Muss-Anforderung fehlt → Absage</li></ul>`,
      steps: [
        {
          type: "slides",
          title: "Fünf Mappen, drei Stapel",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Vorauswahl",
              title: "„Wir können nicht alle einladen.“",
              body: `<p>Melike: „Gespräche kosten Zeit. Deshalb machen wir eine <strong>Vorauswahl</strong>. Der Maßstab ist unser <strong>Anforderungsprofil</strong>.“</p>`
            },
            {
              big: "1.",
              kicker: "Formal prüfen",
              title: "Ist die Mappe in Ordnung?",
              body: `<ul><li>vollständig?</li><li>ordentlich und übersichtlich?</li><li>ohne Rechtschreibfehler?</li><li>richtiger Betriebsname – nicht „Sehr geehrte Firma Mediamarkt“?</li></ul>`
            },
            {
              big: "2.",
              kicker: "Inhalt prüfen",
              title: "Passt die Person zum Profil?",
              body: `<ul><li><strong>Muss-Anforderungen</strong> erfüllt? Fehlt eine, ist die Bewerbung raus.</li>
                       <li>Wie viele <strong>Kann-Anforderungen</strong>?</li>
                       <li>Lebenslauf lückenlos? Schulzeugnis: Deutsch, Mathe, <strong>Fehltage</strong>?</li></ul>`
            },
            {
              big: "3.",
              kicker: "Sortieren",
              title: "A, B oder C?",
              body: `<dl class="terms">
                       <dt>A-Stapel</dt><dd>passt gut → zum Vorstellungsgespräch einladen</dd>
                       <dt>B-Stapel</dt><dd>passt teilweise → Reserve, falls A nicht klappt</dd>
                       <dt>C-Stapel</dt><dd>eine Muss-Anforderung fehlt → freundliche Absage</dd>
                     </dl>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Erst Muss, dann Kann.",
              body: `<p>Wer eine Muss-Anforderung nicht erfüllt, landet auf C – egal wie gut der Rest ist. Kann-Anforderungen entscheiden zwischen A und B.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "Formal oder inhaltlich?",
          prompt: "Tara notiert Auffälligkeiten. Ist das ein formaler oder ein inhaltlicher Punkt?",
          hints: ["Formal heißt: Wie sieht die Mappe aus? Ist sie vollständig und fehlerfrei?",
                  "Inhaltlich heißt: Passt die Person zum Anforderungsprofil?"],
          categories: ["Formal", "Inhaltlich"],
          items: [
            { text: "Im Anschreiben stehen viele Rechtschreibfehler.", cat: 0 },
            { text: "Der Schulabschluss fehlt noch.", cat: 1 },
            { text: "Das Schulzeugnis liegt nicht bei.", cat: 0 },
            { text: "Praktikum im Büro – eine Kann-Anforderung.", cat: 1 },
            { text: "Im Anschreiben steht ein falscher Betriebsname.", cat: 0 },
            { text: "Note 5 in Deutsch.", cat: 1 }
          ]
        },
        {
          type: "sort",
          title: "Welcher Stapel?",
          prompt: "Muss-Anforderungen für die Azubi-Stelle: Hauptschulabschluss, Deutsch mindestens ausreichend. Kann: Praktikum im Büro, Führerschein. Sortiere die Bewerbungen.",
          hints: ["Prüfe zuerst die Muss-Anforderungen. Fehlt eine, ist es C.",
                  "Alle Muss erfüllt? Dann entscheiden die Kann-Anforderungen: viele → A, keine → B."],
          categories: ["A · einladen", "B · Reserve", "C · Absage"],
          items: [
            { text: "Elif: Abschluss, Deutsch 3, Praktikum im Büro", cat: 0 },
            { text: "Jonas: Abschluss, Deutsch 2, Praktikum im Büro, Führerschein", cat: 0 },
            { text: "Mia: Abschluss, Deutsch 4, keine Kann-Anforderung", cat: 1 },
            { text: "Luca: Schulabschluss fehlt, Praktikum im Büro", cat: 2 },
            { text: "Sara: Abschluss, Deutsch 5, Führerschein", cat: 2 }
          ]
        },
        {
          type: "sentence",
          title: "Antwortsatz bauen",
          case: "Sara hat einen Führerschein (Kann-Anforderung), aber in Deutsch die Note 5. Deutsch mindestens ausreichend ist eine Muss-Anforderung.",
          text: "Sara erfüllt eine {*Muss-Anforderung|Kann-Anforderung} nicht. Deshalb kommt ihre Bewerbung auf den {*C-Stapel|A-Stapel}. Der Führerschein {*ändert daran nichts|gleicht das aus}.",
          hints: ["Note 5 ist schlechter als ausreichend (4).", "Eine fehlende Muss-Anforderung kann keine Kann-Anforderung ausgleichen."],
          explain: "Deutsch mindestens ausreichend ist Muss. Mit Note 5 ist sie nicht erfüllt → C. Kann-Anforderungen gleichen ein fehlendes Muss nicht aus."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann eine Bewerbung formal prüfen.",
            "Ich kann eine Bewerbung mit dem Anforderungsprofil vergleichen.",
            "Ich kann Bewerbungen begründet dem A-, B- oder C-Stapel zuordnen."
          ]
        }
      ]
    },

    {
      id: "zeugnisse",
      folder: "auswahl",
      group: "Bewerbung & Auswahl",
      title: "Zeugnisse lesen",
      kicker: "LS 2.3 · Teil 3",
      minutes: 15,
      help: `<h3>Zeugnissprache</h3>
             <p>Arbeits- und Praktikumszeugnisse müssen freundlich klingen. Die Note steckt in der <strong>Zufriedenheitsformel</strong>.</p>
             <ul><li><strong>stets zu unserer vollsten Zufriedenheit</strong> = sehr gut</li>
             <li><strong>stets zu unserer vollen Zufriedenheit</strong> = gut</li>
             <li><strong>zu unserer vollen Zufriedenheit</strong> = befriedigend</li>
             <li><strong>zu unserer Zufriedenheit</strong> = ausreichend</li>
             <li><strong>im Großen und Ganzen zu unserer Zufriedenheit</strong> = mangelhaft</li></ul>
             <h3>Signalwörter</h3>
             <ul><li><strong>stets</strong> = immer → besser</li><li><strong>bemühte sich</strong> = hat es versucht, aber nicht geschafft</li></ul>`,
      steps: [
        {
          type: "slides",
          title: "Was steht zwischen den Zeilen?",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Jonas’ Praktikumszeugnis",
              title: "„Klingt doch alles gut?“",
              body: `<p>Tara liest: „Jonas erledigte seine Aufgaben <strong>zu unserer Zufriedenheit</strong>.“ – „Super, oder?“</p>
                     <p>Melike lächelt: „Zeugnisse haben einen eigenen <strong>Code</strong>. Das hier ist nur eine Vier.“</p>`
            },
            {
              kicker: "Warum ein Code?",
              title: "Zeugnisse müssen freundlich klingen.",
              body: `<p>Ein Betrieb darf in ein Zeugnis nichts Böses schreiben. Deshalb steckt die Note in festen <strong>Formeln</strong>.</p>
                     <p class="note">Wer den Code kennt, liest die Note sofort.</p>`
            },
            {
              kicker: "Die Zufriedenheitsformel",
              title: "Ein Wort macht eine Note.",
              body: `<dl class="terms">
                       <dt>stets zu unserer vollsten Zufriedenheit</dt><dd>1 · sehr gut</dd>
                       <dt>stets zu unserer vollen Zufriedenheit</dt><dd>2 · gut</dd>
                       <dt>zu unserer vollen Zufriedenheit</dt><dd>3 · befriedigend</dd>
                       <dt>zu unserer Zufriedenheit</dt><dd>4 · ausreichend</dd>
                       <dt>im Großen und Ganzen zu unserer Zufriedenheit</dt><dd>5 · mangelhaft</dd>
                     </dl>`
            },
            {
              kicker: "Signalwörter",
              title: "Achte auf diese Wörter.",
              body: `<ul><li><strong>stets</strong> heißt immer – das macht die Note besser.</li>
                       <li><strong>bemühte sich</strong> heißt: hat es versucht, aber nicht geschafft.</li></ul>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "„Stets“ und „vollsten“ – dann ist es eine Eins.",
              body: `<p>Je mehr Lob in der Formel steckt, desto besser die Note.</p>`
            }
          ]
        },
        {
          type: "quiz",
          title: "Code knacken",
          questions: [
            {
              q: "„Sie erledigte ihre Aufgaben <b>stets zu unserer vollsten Zufriedenheit</b>.“ Welche Note ist das?",
              options: ["sehr gut", "gut", "befriedigend", "ausreichend"],
              answer: 0,
              explain: "„stets“ + „vollsten“ = die beste Formel = sehr gut."
            },
            {
              q: "„Er erledigte seine Aufgaben <b>zu unserer Zufriedenheit</b>.“ Welche Note ist das?",
              hint: "Hier fehlen „stets“ und „vollen“.",
              options: ["gut", "befriedigend", "ausreichend", "sehr gut"],
              answer: 2,
              explain: "Ohne „stets“ und ohne „vollen“ = ausreichend (4)."
            },
            {
              q: "„Sie <b>bemühte sich</b>, die Aufgaben zu erledigen.“ Was bedeutet das?",
              options: ["Sie war sehr fleißig.", "Sie hat es versucht, aber nicht geschafft.", "Sie war immer pünktlich."],
              answer: 1,
              explain: "„bemühte sich“ ist ein Warnsignal: versucht, aber nicht geschafft."
            },
            {
              q: "Welches Wort macht die Note besser?",
              options: ["stets", "im Großen und Ganzen", "bemühte sich"],
              answer: 0,
              explain: "„stets“ heißt immer – das lobt."
            }
          ]
        },
        {
          type: "sort",
          title: "Gut oder schwach?",
          prompt: "Sortiere die Sätze aus Praktikumszeugnissen.",
          hints: ["Gut: „stets“ und „vollen/vollsten“. Schwach: „im Großen und Ganzen“, „bemühte sich“, nur „zu unserer Zufriedenheit“."],
          categories: ["sehr gut / gut", "schwach (4 oder schlechter)"],
          items: [
            { text: "stets zu unserer vollen Zufriedenheit", cat: 0 },
            { text: "im Großen und Ganzen zu unserer Zufriedenheit", cat: 1 },
            { text: "stets zu unserer vollsten Zufriedenheit", cat: 0 },
            { text: "bemühte sich um Pünktlichkeit", cat: 1 },
            { text: "zu unserer Zufriedenheit", cat: 1 }
          ]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich weiß, warum Zeugnisse einen eigenen Code haben.",
            "Ich kann die Zufriedenheitsformel einer Note zuordnen.",
            "Ich erkenne Signalwörter wie „stets“ und „bemühte sich“."
          ]
        }
      ]
    },

    {
      id: "vorstellungsgespraech",
      folder: "auswahl",
      group: "Bewerbung & Auswahl",
      title: "Das Vorstellungsgespräch",
      kicker: "LS 2.3 · Teil 4",
      minutes: 20,
      help: `<h3>Ablauf</h3>
             <p class="formula">Begrüßung → Bewerber stellt sich vor → Fragen an den Bewerber → Infos und Fragen des Bewerbers → Abschluss</p>
             <h3>Zulässige Fragen</h3>
             <ul><li>Schule und Noten, Praktika, Stärken und Schwächen, Motivation („Warum Mediaworld?“)</li></ul>
             <h3>Unzulässige Fragen (AGG)</h3>
             <ul><li>Schwangerschaft und Kinderwunsch, Religion, Partei, Gewerkschaft, Herkunft, sexuelle Orientierung</li></ul>
             <p class="note">Bei unzulässigen Fragen musst du nicht ehrlich antworten („Recht zur Lüge“). Du darfst auch freundlich ausweichen.</p>
             <h3>Andere Auswahlverfahren</h3>
             <ul><li><strong>Einstellungstest:</strong> Aufgaben zu Wissen und Logik</li><li><strong>Assessment-Center:</strong> Gruppen- und Rollenspiele, eher in großen Firmen</li></ul>`,
      steps: [
        {
          type: "slides",
          title: "Jetzt wird es persönlich",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Gesprächstermine",
              title: "„Elif und Jonas laden wir ein.“",
              body: `<p>Der A-Stapel steht. Melike plant zwei <strong>Vorstellungsgespräche</strong>. Tara darf dabei sein und mitschreiben.</p>`
            },
            {
              kicker: "Der Ablauf",
              title: "Fünf Phasen",
              body: `<ol><li><strong>Begrüßung</strong> – kurzer Small Talk</li>
                       <li><strong>Vorstellung</strong> – die Bewerberin erzählt von sich</li>
                       <li><strong>Fragen an die Bewerberin</strong> – Schule, Praktikum, Stärken</li>
                       <li><strong>Infos zur Stelle</strong> – und Fragen der Bewerberin</li>
                       <li><strong>Abschluss</strong> – wie geht es weiter?</li></ol>`
            },
            {
              kicker: "Erlaubt",
              title: "Zulässige Fragen",
              body: `<p>Alles, was mit der <strong>Stelle</strong> zu tun hat:</p>
                     <ul><li>„Warum möchten Sie zu Mediaworld?“</li><li>„Was haben Sie im Praktikum gemacht?“</li><li>„Was ist Ihre größte Stärke?“</li></ul>`
            },
            {
              kicker: "Verboten",
              title: "Unzulässige Fragen",
              body: `<p>Das <strong>AGG</strong> (Allgemeines Gleichbehandlungsgesetz) schützt vor Benachteiligung, z. B. wegen Herkunft, Geschlecht, Religion, Behinderung, Alter oder sexueller Identität.</p>
                     <ul class="pm"><li class="m">„Sind Sie schwanger?“</li><li class="m">„Welcher Religion gehören Sie an?“</li><li class="m">„In welcher Partei sind Sie?“</li></ul>`
            },
            {
              kicker: "Dein Recht",
              title: "Was tun bei unzulässigen Fragen?",
              body: `<p>Du musst <strong>nicht ehrlich</strong> antworten – das nennt man das <strong>„Recht zur Lüge“</strong>. Du darfst auch freundlich ausweichen: „Das hat mit der Stelle nichts zu tun.“</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Gefragt wird nur, was zur Stelle gehört.",
              body: `<p>Neben dem Gespräch gibt es weitere Verfahren: den <strong>Einstellungstest</strong> und – eher in großen Firmen – das <strong>Assessment-Center</strong>.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "Zulässig oder unzulässig?",
          prompt: "Darf Mediaworld diese Frage im Vorstellungsgespräch stellen?",
          hints: ["Zulässig ist, was mit der Stelle zu tun hat.",
                  "Schwangerschaft, Religion, Partei und Gewerkschaft sind privat – das schützt das AGG."],
          categories: ["zulässig", "unzulässig"],
          items: [
            { text: "Warum möchten Sie bei uns eine Ausbildung machen?", cat: 0 },
            { text: "Planen Sie, bald Kinder zu bekommen?", cat: 1 },
            { text: "Was haben Sie im Praktikum gelernt?", cat: 0 },
            { text: "Sind Sie in einer Gewerkschaft?", cat: 1 },
            { text: "Welche Stärken bringen Sie mit?", cat: 0 },
            { text: "Gehen Sie regelmäßig in die Kirche oder Moschee?", cat: 1 }
          ]
        },
        {
          type: "quiz",
          title: "Im Gespräch",
          questions: [
            {
              q: "In welcher Phase fragt die Bewerberin nach den Arbeitszeiten?",
              hint: "Die Bewerberin darf auch selbst fragen – wann ist dafür Platz?",
              options: ["Begrüßung", "Infos zur Stelle und Fragen der Bewerberin", "Abschluss"],
              answer: 1,
              explain: "Nach den Fragen des Betriebs gibt es Infos zur Stelle – dann darf die Bewerberin fragen."
            },
            {
              q: "Jonas wird gefragt: „Welcher Partei gehören Sie an?“ Was darf er tun?",
              options: ["Er muss ehrlich antworten.", "Er darf ausweichen oder nicht ehrlich antworten.", "Er muss das Gespräch abbrechen."],
              answer: 1,
              explain: "Die Frage ist unzulässig. Jonas darf ausweichen oder die Unwahrheit sagen („Recht zur Lüge“)."
            },
            {
              q: "Wofür steht AGG?",
              options: ["Allgemeines Gleichbehandlungsgesetz", "Arbeits- und Gesundheitsgesetz", "Ausbildungs- und Gehaltsgesetz"],
              answer: 0,
              explain: "Das Allgemeine Gleichbehandlungsgesetz schützt vor Benachteiligung."
            },
            {
              q: "Gruppenaufgaben und Rollenspiele an einem ganzen Tag – welches Verfahren ist das?",
              options: ["Einstellungstest", "Assessment-Center", "Vorauswahl"],
              answer: 1,
              explain: "Im Assessment-Center lösen mehrere Bewerber Aufgaben in Gruppen und Rollenspielen."
            }
          ]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann die Phasen eines Vorstellungsgesprächs nennen.",
            "Ich kann zulässige und unzulässige Fragen unterscheiden.",
            "Ich weiß, was ich bei einer unzulässigen Frage tun darf."
          ]
        }
      ]
    },

    {
      id: "entscheidung",
      folder: "auswahl",
      group: "Bewerbung & Auswahl",
      title: "Die Entscheidung: Bewertungstabelle",
      kicker: "LS 2.3 · Teil 5",
      minutes: 20,
      help: `<h3>Gewichtete Bewertungstabelle</h3>
             <p class="formula">Gewicht (%) × Punkte = gewichtete Punkte<br>Alle gewichteten Punkte addieren → die höchste Summe gewinnt</p>
             <ul><li><strong>Kriterien</strong> kommen aus dem Anforderungsprofil.</li>
             <li><strong>Gewicht:</strong> Wie wichtig ist das Kriterium? Alle Gewichte zusammen = 100 %.</li>
             <li><strong>Punkte:</strong> 1 (schwach) bis 5 (sehr gut).</li></ul>
             <p class="note">Beispiel: Gewicht 40 %, Punkte 3 → 40 × 3 = 120.</p>`,
      steps: [
        {
          type: "slides",
          title: "Elif oder Jonas?",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Nach den Gesprächen",
              title: "„Beide waren gut. Und jetzt?“",
              body: `<p>Tara mag Jonas, Melike findet Elif stark. Damit die Entscheidung <strong>fair</strong> ist, nutzen sie eine <strong>Bewertungstabelle</strong>.</p>`
            },
            {
              kicker: "So geht’s",
              title: "Kriterien, Gewicht, Punkte",
              body: `<ol><li><strong>Kriterien</strong> aus dem Anforderungsprofil wählen</li>
                       <li>jedes Kriterium <strong>gewichten</strong> – zusammen 100 %</li>
                       <li>jede Person bekommt <strong>Punkte</strong> von 1 bis 5</li>
                       <li><strong>Gewicht × Punkte</strong> rechnen und alles addieren</li></ol>`
            },
            {
              kicker: "Beispiel",
              title: "Gewicht × Punkte",
              body: `<table class="scheme">
                       <tr><td>Deutsch (40 %) · 3 Punkte</td><td>40 × 3 = 120</td></tr>
                       <tr><td>Mathe (30 %) · 4 Punkte</td><td>30 × 4 = 120</td></tr>
                       <tr><td>Auftreten (30 %) · 4 Punkte</td><td>30 × 4 = 120</td></tr>
                       <tr class="sum"><td>= Summe</td><td>360</td></tr>
                     </table>
                     <p class="note">Die Person mit der höchsten Summe bekommt die Zusage.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Erst rechnen, dann entscheiden.",
              body: `<p>Die Tabelle macht die Entscheidung <strong>nachvollziehbar</strong>: Nicht Sympathie entscheidet, sondern die Kriterien.</p>`
            }
          ]
        },
        {
          type: "calc",
          title: "A1 · Bewertung Jonas",
          case: `Kriterien und Gewichte bei Mediaworld:<br><b>Deutsch 30 %</b> · <b>Mathe 20 %</b> · <b>Auftreten im Gespräch 30 %</b> · <b>Praktikum 20 %</b><br><br>
                 Punkte für <b>Jonas</b>: Deutsch 4 · Mathe 3 · Auftreten 5 · Praktikum 2<br>Rechne Gewicht × Punkte und addiere.`,
          rows: [
            { label: "Deutsch: 30 × 4", value: 120 },
            { label: "Mathe: 20 × 3", value: 60 },
            { label: "Auftreten: 30 × 5", value: 150 },
            { label: "Praktikum: 20 × 2", value: 40 },
            { label: "= Summe Jonas", value: 370, sum: true }
          ],
          hints: ["Rechne jede Zeile einzeln: Gewicht mal Punkte.", "Zum Schluss alle vier Ergebnisse addieren: 120 + 60 + 150 + 40."],
          result: "Jonas erreicht 370 gewichtete Punkte."
        },
        {
          type: "calc",
          title: "A2 · Bewertung Elif",
          case: `Gleiche Kriterien und Gewichte: <b>Deutsch 30 %</b> · <b>Mathe 20 %</b> · <b>Auftreten 30 %</b> · <b>Praktikum 20 %</b><br><br>
                 Punkte für <b>Elif</b>: Deutsch 3 · Mathe 5 · Auftreten 4 · Praktikum 4`,
          rows: [
            { label: "Deutsch: 30 × 3", value: 90 },
            { label: "Mathe: 20 × 5", value: 100 },
            { label: "Auftreten: 30 × 4", value: 120 },
            { label: "Praktikum: 20 × 4", value: 80 },
            { label: "= Summe Elif", value: 390, sum: true }
          ],
          hints: ["Wie bei Jonas: Gewicht mal Punkte, dann addieren.", "90 + 100 + 120 + 80 – rechne die Summe in Ruhe aus."],
          result: "Elif erreicht 390 gewichtete Punkte."
        },
        {
          type: "sentence",
          title: "Antwortsatz bauen",
          case: "Jonas: 370 Punkte · Elif: 390 Punkte. Jonas war im Gespräch am stärksten (Auftreten 5).",
          text: "Mediaworld gibt {*Elif|Jonas} die Zusage, weil sie mit {*390|370} Punkten die {*höchste|niedrigste} Summe hat. Das bessere Auftreten von Jonas {*reicht nicht aus|entscheidet allein}, weil alle Kriterien zählen.",
          hints: ["Vergleiche die beiden Summen.", "In der Tabelle zählt die Summe aller Kriterien – nicht ein einzelnes."],
          explain: "Elif hat mit 390 die höchste Summe. Jonas punktet beim Auftreten, verliert aber bei Mathe und Praktikum."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann eine gewichtete Bewertungstabelle ausrechnen.",
            "Ich kann erklären, was das Gewicht bedeutet.",
            "Ich kann eine Auswahlentscheidung mit der Tabelle begründen."
          ]
        }
      ]
    },

    {
      id: "zusage-absage",
      folder: "auswahl",
      group: "Bewerbung & Auswahl",
      title: "Zusage, Absage und Datenschutz",
      kicker: "LS 2.3 · Teil 6",
      minutes: 15,
      help: `<h3>Zusage</h3>
             <ul><li>Einladung zur Unterschrift unter den Ausbildungsvertrag.</li></ul>
             <h3>Absage</h3>
             <ul><li>freundlich, kurz, mit Dank für die Bewerbung</li>
             <li>keine Gründe nennen, die benachteiligen (AGG) – z. B. Alter, Herkunft, Religion</li></ul>
             <h3>Datenschutz</h3>
             <ul><li>Bewerberdaten nur für die Auswahl nutzen, nur die Entscheider sehen sie.</li>
             <li>Nach der Absage: Papier zurückschicken, Dateien löschen – meist nach einigen Monaten (oft 6).</li></ul>`,
      steps: [
        {
          type: "slides",
          title: "Ja für Elif – und die anderen?",
          slides: [
            {
              style: "dark",
              kicker: "Mediaworld e. K. · Die Entscheidung steht",
              title: "„Jetzt schreiben wir allen.“",
              body: `<p>Elif bekommt die <strong>Zusage</strong>. Alle anderen bekommen eine <strong>Absage</strong>. Melike: „Auch eine Absage muss fair und freundlich sein.“</p>`
            },
            {
              kicker: "Die Absage",
              title: "Freundlich, kurz, ohne falsche Gründe.",
              body: `<ul><li>für die Bewerbung <strong>danken</strong></li><li>kurz absagen</li><li>alles Gute wünschen</li></ul>
                     <p class="note">Keine Gründe, die benachteiligen – z. B. Alter, Herkunft oder Religion. Das verbietet das AGG.</p>`
            },
            {
              kicker: "Datenschutz",
              title: "Bewerbungen sind vertraulich.",
              body: `<ul><li>Nur die Personen, die entscheiden, lesen die Unterlagen.</li>
                       <li>Die Daten werden nur für die Auswahl genutzt – nicht für Werbung.</li>
                       <li>Nach der Absage: Papier zurückschicken, Dateien <strong>löschen</strong> – meist nach einigen Monaten.</li></ul>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Fair bis zum letzten Brief.",
              body: `<p>Zusage, Absage, Datenschutz: Auch wer nicht genommen wird, soll Mediaworld in guter Erinnerung behalten.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "Darf Mediaworld das?",
          prompt: "Was ist erlaubt – und was nicht?",
          hints: ["Bewerbungen sind vertraulich: nur für die Auswahl, nur für die Entscheider.",
                  "Gründe wie Alter, Herkunft oder Religion dürfen in keiner Absage stehen."],
          categories: ["erlaubt", "nicht erlaubt"],
          items: [
            { text: "Die Unterlagen nach der Absage zurückschicken.", cat: 0 },
            { text: "Bewerbungen in der Pause herumzeigen.", cat: 1 },
            { text: "Die E-Mail-Adressen der Bewerber für Werbung nutzen.", cat: 1 },
            { text: "Nur die Ausbilderin und die Chefin lesen die Unterlagen.", cat: 0 },
            { text: "In die Absage schreiben: „Sie sind uns zu alt.“", cat: 1 },
            { text: "Die Dateien nach einigen Monaten löschen.", cat: 0 }
          ]
        },
        {
          type: "spot",
          title: "Finde den Fehler",
          prompt: "Tara hat Briefe vorbereitet. In jedem Brief ist eine Zeile nicht in Ordnung – tippe sie an.",
          rounds: [
            {
              lines: [
                "Mediaworld e. K.",
                { t: "Ihre Bewerbung als Auszubildende", bold: true, gap: 1 },
                { t: "Sehr geehrte Frau Novak,", gap: 1 },
                "vielen Dank für Ihre Bewerbung und Ihr Interesse an Mediaworld.",
                "Leider haben wir uns für eine jüngere Bewerberin entschieden.",
                "Wir wünschen Ihnen für Ihren weiteren Weg alles Gute."
              ],
              error: 4,
              hint: "Welche Zeile nennt einen Grund, der benachteiligt?",
              explain: "Das Alter darf kein Grund für eine Absage sein – das verbietet das AGG. Besser ohne Grund: „Leider können wir Ihnen keinen Ausbildungsplatz anbieten.“"
            },
            {
              lines: [
                "Mediaworld e. K.",
                { t: "Einladung zum Vorstellungsgespräch", bold: true, gap: 1 },
                { t: "Sehr geehrter Herr Weber,", gap: 1 },
                "wir laden Sie zu einem Vorstellungsgespräch ein.",
                "Termin: Dienstag, 10:00 Uhr, in unserem Büro.",
                "Bitte teilen Sie uns vorher Ihre Religion mit."
              ],
              error: 5,
              hint: "Welche Angabe hat nichts mit der Stelle zu tun?",
              explain: "Die Religion ist privat und hat nichts mit der Stelle zu tun. Danach darf Mediaworld nicht fragen (AGG)."
            }
          ]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich weiß, was in eine faire Absage gehört.",
            "Ich kann erklären, wie ein Betrieb mit Bewerberdaten umgehen muss.",
            "Ich erkenne Gründe, die in einer Absage nicht stehen dürfen."
          ]
        }
      ]
    },

    {
      id: "fachbegriffe-auswahl",
      folder: "auswahl",
      group: "Bewerbung & Auswahl",
      title: "Fachbegriffe: Bewerbung & Auswahl",
      kicker: "Lernkarten",
      minutes: 10,
      steps: [
        {
          type: "cards",
          title: "Lernkarten Bewerbung & Auswahl",
          cards: [
            { front: "Bewerbungsmappe", back: "Anschreiben, Lebenslauf, Zeugnisse und Nachweise – heute meist als eine PDF-Datei." },
            { front: "Anschreiben", back: "Der Brief in der Bewerbung: Warum diese Stelle? Warum passe ich?" },
            { front: "Lebenslauf", back: "Tabellarisch, lückenlos und aktuell: Daten, Schule, Praktika, Kenntnisse." },
            { front: "Vorauswahl", back: "Bewerbungen formal und inhaltlich prüfen und auf den A-, B- oder C-Stapel legen." },
            { front: "A-, B-, C-Stapel", back: "A: einladen · B: Reserve · C: Absage, weil eine Muss-Anforderung fehlt." },
            { front: "Zufriedenheitsformel", back: "Der Code im Zeugnis: „stets zu unserer vollsten Zufriedenheit“ = sehr gut, „zu unserer Zufriedenheit“ = ausreichend." },
            { front: "Vorstellungsgespräch", back: "Begrüßung, Vorstellung, Fragen an die Bewerberin, Infos und Fragen der Bewerberin, Abschluss." },
            { front: "Unzulässige Frage", back: "Frage ohne Bezug zur Stelle, z. B. nach Schwangerschaft, Religion, Partei oder Gewerkschaft." },
            { front: "Recht zur Lüge", back: "Bei einer unzulässigen Frage muss man nicht ehrlich antworten." },
            { front: "AGG", back: "Allgemeines Gleichbehandlungsgesetz: schützt vor Benachteiligung wegen Herkunft, Geschlecht, Religion, Behinderung, Alter oder sexueller Identität." },
            { front: "Einstellungstest", back: "Schriftliche Aufgaben zu Wissen und Logik." },
            { front: "Assessment-Center", back: "Auswahltag mit Gruppenaufgaben und Rollenspielen, eher in großen Firmen." },
            { front: "Bewertungstabelle", back: "Gewicht × Punkte für jedes Kriterium, dann addieren – die höchste Summe gewinnt." },
            { front: "Datenschutz bei Bewerbungen", back: "Nur für die Auswahl, nur für die Entscheider; nach der Absage Unterlagen zurück und Dateien löschen." }
          ]
        }
      ]
    }


  ]
});
