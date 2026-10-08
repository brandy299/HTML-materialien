/* ============================================================
   KURS: PBP · HS1 – Bewerbung
   Fach PBP · Lernfeld 8.1 · Modellunternehmen Mediaworld e. K.
   Teil 1: Stellenanzeige & Profil (LS 2.2). Teil 2 (Bewerbung &
   Auswahl, LS 2.3) folgt.
   Aufbau und alle Aufgabentypen: app/README.md
   ============================================================ */

LERNRAUM.subjects.push({
  id: "pbp-bewerbung",
  fach: "PBP",
  added: "2026-10-08",          // Datum der Veröffentlichung (für „Neu“ auf der Startseite)
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
             <ul><li><strong>m/w/d</strong> männlich/weiblich/divers · <strong>VZ/TZ</strong> Vollzeit/Teilzeit · <strong>ggf.</strong> gegebenenfalls · <strong>z. K.</strong> zur Kennzeichnung.</li></ul>
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
              body: `<p>Tara sitzt über einer Anzeige aus dem Internet: „m/w/d … z. K. … wir bieten flache Hierarchien und ein dynamisches Team …“</p>
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
    }

  ]
});
