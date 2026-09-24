/* ============================================================
   LERNRAUM — INHALTE
   ------------------------------------------------------------
   Hier pflegst du alle Fächer, Themen und Lernschritte.
   Aufbau:  Fach → Themen → Schritte

   Schritt-Typen:
     slides   Präsentation zum Durchwischen
     quiz     Multiple Choice (eine richtige Antwort)
     sort     Karten in Kategorien einsortieren
     cloze    Lückentext mit Wortbank (Lücken in {geschweiften Klammern})
     cards    Karteikarten (Vorderseite / Rückseite)
     link     bestehendes HTML-Material öffnen

   Anleitung mit Beispielen: app/README.md
   ============================================================ */

window.LERNRAUM = {
  school: "Berufskolleg",
  // Basis für "link"-Schritte: dort liegen die bestehenden Materialien
  materialBase: "https://brandy299.github.io/HTML-materialien/",
  subjects: [

    /* ────────────────────────────────────────────────────── */
    {
      id: "gp",
      name: "Geschäftsprozesse",
      glyph: "G",
      color: "#C8553D",
      description: "Beschaffung, Kaufvertrag und Störungen – so, wie sie im Betrieb wirklich passieren.",
      topics: [
        {
          id: "schlechtleistung",
          title: "Käuferrechte bei Schlechtleistung",
          kicker: "Kaufvertragsstörungen",
          minutes: 15,
          steps: [
            {
              type: "slides",
              title: "Worum geht's?",
              slides: [
                {
                  style: "dark",
                  kicker: "Der Fall",
                  title: "Die Lieferung ist da – <em>aber…</em>",
                  body: `<p>Die <strong>Schmidt GmbH</strong> hat bei der Sitzwerk KG 200 Bürostühle bestellt.</p>
                         <p>Bei der Wareneingangskontrolle fällt auf: Bei 12 Stühlen sind die Bezüge gerissen.</p>
                         <p class="quote" style="margin-top:18px">„Und jetzt? Geld zurück? Neue Stühle?"</p>`
                },
                {
                  kicker: "Grundbegriff",
                  title: "Was ist ein <em>Mangel?</em>",
                  body: `<div class="pair">
                           <div><b>Sachmangel</b>§ 434 BGB – die Ware hat nicht die vereinbarte Beschaffenheit oder taugt nicht für die übliche Verwendung.</div>
                           <div><b>Rechtsmangel</b>§ 435 BGB – ein Dritter hat Rechte an der Ware, z. B. weil sie gar nicht dem Verkäufer gehört.</div>
                         </div>
                         <p class="box">Entscheidend ist der Zustand bei <strong>Übergabe</strong> der Ware.</p>`
                },
                {
                  kicker: "Arten des Sachmangels",
                  title: "Was alles schiefgehen kann",
                  body: `<ul>
                           <li><strong>Qualitätsmangel</strong> – die Ware ist beschädigt oder funktioniert nicht</li>
                           <li><strong>Falschlieferung</strong> – es kommt eine andere Ware als bestellt</li>
                           <li><strong>Mengenmangel</strong> – es wird zu wenig geliefert</li>
                           <li><strong>Montagemangel</strong> – falsch aufgebaut oder fehlerhafte Anleitung</li>
                           <li><strong>Werbeversprechen</strong> – Ware hält nicht, was die Werbung verspricht</li>
                         </ul>`
                },
                {
                  kicker: "Wie erkennbar?",
                  title: "Offen, versteckt oder <em>arglistig</em>",
                  body: `<ul>
                           <li><strong>Offener Mangel</strong> – bei der Prüfung sofort erkennbar</li>
                           <li><strong>Versteckter Mangel</strong> – zeigt sich erst später</li>
                           <li><strong>Arglistig verschwiegen</strong> – der Verkäufer kannte den Mangel und hat ihn bewusst verheimlicht</li>
                         </ul>`
                },
                {
                  kicker: "Mängelrüge",
                  title: "Wann muss ich <em>reklamieren?</em>",
                  body: `<p><strong>Zweiseitiger Handelskauf</strong> (§ 377 HGB): Ware unverzüglich prüfen und Mängel unverzüglich rügen. Versteckte Mängel unverzüglich nach Entdeckung.</p>
                         <p><strong>Sonst gilt:</strong> Mängel können innerhalb der Verjährungsfrist von 2 Jahren geltend gemacht werden (§ 438 BGB).</p>
                         <p class="box">Wer als Kaufmann zu spät rügt, verliert seine Rechte – die Ware gilt als genehmigt.</p>`
                },
                {
                  kicker: "Vorrangiges Recht",
                  big: "1.",
                  title: "Nacherfüllung",
                  body: `<p>Der Käufer wählt (§ 439 BGB):</p>
                         <div class="pair">
                           <div><b>Nachbesserung</b>Der Mangel wird repariert.</div>
                           <div><b>Ersatzlieferung</b>Es wird mangelfreie Ware geliefert.</div>
                         </div>
                         <p style="margin-top:10px">Die Kosten trägt der Verkäufer.</p>`
                },
                {
                  kicker: "Nachrangige Rechte",
                  title: "Erst nach Ablauf einer <em>Frist</em>",
                  body: `<p>Klappt die Nacherfüllung nicht innerhalb einer angemessenen Frist, kann der Käufer:</p>
                         <ul>
                           <li><strong>vom Vertrag zurücktreten</strong> – nicht bei unerheblichen Mängeln</li>
                           <li><strong>den Kaufpreis mindern</strong></li>
                           <li><strong>Schadensersatz</strong> verlangen – nur wenn der Verkäufer den Mangel verschuldet hat</li>
                           <li><strong>Ersatz vergeblicher Aufwendungen</strong> verlangen</li>
                         </ul>`
                },
                {
                  style: "accent",
                  kicker: "Merksatz",
                  title: "Erst reparieren oder neu liefern lassen – <em>dann</em> Rücktritt, Minderung oder Schadensersatz.",
                  body: ``
                }
              ]
            },
            {
              type: "quiz",
              title: "Kurz-Check",
              questions: [
                {
                  q: "Bei 12 Stühlen sind die Bezüge gerissen. Welche Mangelart liegt vor?",
                  options: ["Rechtsmangel", "Qualitätsmangel", "Mengenmangel", "Falschlieferung"],
                  answer: 1,
                  explain: "Die Ware ist beschädigt – sie hat nicht die vereinbarte Beschaffenheit."
                },
                {
                  q: "Welches Recht muss die Schmidt GmbH zuerst geltend machen?",
                  options: ["Rücktritt vom Vertrag", "Minderung", "Nacherfüllung", "Schadensersatz"],
                  answer: 2,
                  explain: "Die Nacherfüllung ist vorrangig. Der Verkäufer bekommt eine zweite Chance."
                },
                {
                  q: "Wer entscheidet, ob nachgebessert oder neu geliefert wird?",
                  options: ["Der Verkäufer", "Der Käufer", "Das Gericht", "Der Spediteur"],
                  answer: 1,
                  explain: "Das Wahlrecht liegt beim Käufer (§ 439 BGB)."
                },
                {
                  q: "Beide Vertragspartner sind Kaufleute. Wann muss ein offener Mangel gerügt werden?",
                  options: ["Innerhalb von 2 Jahren", "Innerhalb von 14 Tagen", "Unverzüglich", "Innerhalb von 6 Monaten"],
                  answer: 2,
                  explain: "Beim zweiseitigen Handelskauf gilt § 377 HGB: unverzüglich prüfen und rügen."
                },
                {
                  q: "Wann kann der Käufer Schadensersatz verlangen?",
                  options: ["Immer, sofort", "Nur wenn der Verkäufer den Mangel verschuldet hat", "Nur bei Rechtsmängeln", "Nie beim Kaufvertrag"],
                  answer: 1,
                  explain: "Schadensersatz setzt Verschulden voraus – im Gegensatz zu Rücktritt und Minderung."
                }
              ]
            },
            {
              type: "sort",
              title: "Mangelarten zuordnen",
              prompt: "Welche Mangelart liegt vor? Tippe auf die passende Kategorie.",
              categories: ["Qualitätsmangel", "Falschlieferung", "Mengenmangel", "Rechtsmangel"],
              items: [
                { text: "Bei mehreren Stühlen hält die Gasdruckfeder die Sitzhöhe nicht.", cat: 0 },
                { text: "Statt Bürostühlen wurden Barhocker geliefert.", cat: 1 },
                { text: "Bestellt: 200 Stühle. Geliefert: 180 Stühle.", cat: 2 },
                { text: "Die Stühle gehören gar nicht dem Lieferer, sondern einer Leasingfirma.", cat: 3 },
                { text: "Die Druckerpatronen passen nicht – es wurde ein anderes Modell geliefert.", cat: 1 },
                { text: "Im Karton sind 45 statt 50 Ordner.", cat: 2 },
                { text: "Der Monitor zeigt nach dem Auspacken nur Streifen.", cat: 0 },
                { text: "Der Laptop war gestohlen und wurde weiterverkauft.", cat: 3 }
              ]
            },
            {
              type: "cloze",
              title: "Lückentext",
              prompt: "Tippe eine Lücke an und dann das passende Wort.",
              text: "Zuerst hat der Käufer ein Recht auf {Nacherfüllung}. Dabei kann er zwischen {Nachbesserung} und {Ersatzlieferung} wählen. Erst nach Ablauf einer angemessenen {Frist} kann er vom Vertrag {zurücktreten}, den Kaufpreis {mindern} oder – wenn der Verkäufer den Mangel verschuldet hat – {Schadensersatz} verlangen.",
              distractors: ["Mahnung", "Verzugszinsen"]
            },
            {
              type: "cards",
              title: "Karteikarten",
              cards: [
                { front: "§ 377 HGB", back: "Prüf- und Rügepflicht beim zweiseitigen Handelskauf: unverzüglich prüfen, unverzüglich rügen." },
                { front: "Nacherfüllung", back: "Vorrangiges Recht: Nachbesserung oder Ersatzlieferung – der Käufer wählt." },
                { front: "Minderung", back: "Der Kaufpreis wird angemessen herabgesetzt." },
                { front: "Rücktritt", back: "Der Vertrag wird rückgängig gemacht – nicht möglich bei unerheblichen Mängeln." },
                { front: "Verjährungsfrist", back: "2 Jahre ab Übergabe der Ware (§ 438 BGB)." }
              ]
            },
            {
              type: "link",
              title: "Fallarbeit im Original",
              text: "Die ausführliche Fallarbeit zur Schmidt GmbH mit Mängelrüge.",
              href: "materialien/GP/Warenlieferung/kaeuferrechte schlechtleistung.html"
            }
          ]
        },
        {
          id: "lieferungsverzug",
          title: "Lieferungsverzug",
          kicker: "Kaufvertragsstörungen",
          minutes: 15,
          soon: true,
          steps: []
        }
      ]
    },

    /* ────────────────────────────────────────────────────── */
    {
      id: "en-b2",
      name: "Englisch B2",
      glyph: "E",
      color: "#3B5BDB",
      description: "Business English for real situations – letters, calls and customers.",
      topics: [
        {
          id: "complaints",
          title: "Complaints & Adjustments",
          kicker: "Business Correspondence",
          minutes: 20,
          steps: [
            {
              type: "slides",
              title: "Intro",
              slides: [
                {
                  style: "dark",
                  kicker: "The situation",
                  title: "Something went <em>wrong.</em>",
                  body: `<p>You work at <strong>Office Pro Ltd</strong>. Your order of 50 desk lamps has just arrived.</p>
                         <p>8 lamps are damaged – and the invoice shows the wrong price.</p>
                         <p class="quote" style="margin-top:18px">"How do we tell the supplier – politely but clearly?"</p>`
                },
                {
                  kicker: "Why customers complain",
                  title: "Typical <em>problems</em>",
                  body: `<ul>
                           <li><strong>Damaged goods</strong> – broken, scratched, not working</li>
                           <li><strong>Wrong goods</strong> – wrong model, colour or size</li>
                           <li><strong>Wrong quantity</strong> – too few or too many items</li>
                           <li><strong>Late delivery</strong> – the goods arrive after the agreed date</li>
                           <li><strong>Invoicing errors</strong> – wrong prices or discounts</li>
                         </ul>`
                },
                {
                  kicker: "Structure",
                  title: "A complaint in <em>five</em> steps",
                  body: `<ul>
                           <li><strong>1 Reference</strong> – order number, date, goods</li>
                           <li><strong>2 Problem</strong> – describe exactly what is wrong</li>
                           <li><strong>3 Consequences</strong> – why this is a problem for you</li>
                           <li><strong>4 Request</strong> – what you want the supplier to do</li>
                           <li><strong>5 Polite close</strong> – ask for a quick reply</li>
                         </ul>`
                },
                {
                  kicker: "Useful language",
                  title: "Say it <em>professionally</em>",
                  body: `<div class="pair">
                           <div><b>Reference</b>With reference to our order no. 4711 of 3 May …</div>
                           <div><b>Problem</b>On unpacking the goods, we found that …</div>
                           <div><b>Request</b>We would be grateful if you could replace …</div>
                           <div><b>Close</b>We look forward to your prompt reply.</div>
                         </div>`
                },
                {
                  kicker: "Tone",
                  title: "Firm, but <em>polite</em>",
                  body: `<div class="pair">
                           <div><b>Too direct</b>You sent us broken lamps!</div>
                           <div><b>Better</b>Unfortunately, eight of the lamps were damaged.</div>
                           <div><b>Too direct</b>Fix your invoice now.</div>
                           <div><b>Better</b>Could you please send us a corrected invoice?</div>
                         </div>`
                },
                {
                  kicker: "The other side",
                  title: "Answering a complaint: the <em>adjustment</em>",
                  body: `<ul>
                           <li><strong>Thank</strong> the customer for the letter</li>
                           <li><strong>Apologise</strong> – "Please accept our apologies for …"</li>
                           <li><strong>Explain</strong> what went wrong (briefly)</li>
                           <li><strong>Offer a solution</strong> – replacement, credit note, discount</li>
                           <li><strong>Reassure</strong> – "This will not happen again."</li>
                         </ul>`
                },
                {
                  style: "accent",
                  kicker: "Remember",
                  title: "Be <em>clear</em> about the problem – and <em>polite</em> about the solution.",
                  body: ``
                }
              ]
            },
            {
              type: "quiz",
              title: "Quick check",
              questions: [
                {
                  q: "Which sentence is the best way to open a complaint letter?",
                  options: ["Hi guys, we have a problem.", "With reference to our order no. 4711, …", "Your products are terrible.", "I hope you are well and happy."],
                  answer: 1,
                  explain: "Start with a clear reference to the order."
                },
                {
                  q: "Which phrase is a polite request?",
                  options: ["Send new lamps immediately.", "You must replace the lamps.", "We would be grateful if you could replace the lamps.", "Replace them or else."],
                  answer: 2,
                  explain: "'We would be grateful if you could …' is firm but polite."
                },
                {
                  q: "What should a supplier do FIRST in an adjustment letter?",
                  options: ["Blame the carrier", "Thank the customer and apologise", "Offer a new product", "Ask for payment"],
                  answer: 1,
                  explain: "Thank and apologise first – then explain and offer a solution."
                },
                {
                  q: "“On unpacking the goods, we found that …” belongs to which part?",
                  options: ["Reference", "Problem", "Request", "Close"],
                  answer: 1,
                  explain: "It introduces the description of the problem."
                }
              ]
            },
            {
              type: "sort",
              title: "Complaint or reply?",
              prompt: "Who would write this sentence?",
              categories: ["Customer (complaint)", "Supplier (adjustment)"],
              items: [
                { text: "Unfortunately, eight of the lamps were damaged.", cat: 0 },
                { text: "Please accept our apologies for the inconvenience.", cat: 1 },
                { text: "We would be grateful if you could send a corrected invoice.", cat: 0 },
                { text: "We have already dispatched replacement goods.", cat: 1 },
                { text: "This delay is causing serious problems for us.", cat: 0 },
                { text: "As a gesture of goodwill, we are offering a 10% discount.", cat: 1 }
              ]
            },
            {
              type: "cloze",
              title: "Complete the letter",
              prompt: "Tap a gap, then tap the right word.",
              text: "With {reference} to our order no. 4711, we are writing to {complain} about the delivery. On {unpacking} the goods, we found that eight lamps were {damaged}. We would be {grateful} if you could replace them. We look {forward} to your prompt reply.",
              distractors: ["angry", "backward"]
            },
            {
              type: "cards",
              title: "Phrase cards",
              cards: [
                { front: "Bezug nehmend auf unsere Bestellung …", back: "With reference to our order …" },
                { front: "Leider müssen wir Ihnen mitteilen, dass …", back: "We regret to inform you that …" },
                { front: "Wir wären Ihnen dankbar, wenn …", back: "We would be grateful if you could …" },
                { front: "Bitte entschuldigen Sie die Unannehmlichkeiten.", back: "Please accept our apologies for the inconvenience." },
                { front: "Gutschrift", back: "credit note" }
              ]
            },
            {
              type: "link",
              title: "Full presentation",
              text: "The original classroom presentation on complaints.",
              href: "materialien/Englisch B2/Complaints/complaints_presentation_1.html"
            }
          ]
        }
      ]
    },

    /* ────────────────────────────────────────────────────── */
    {
      id: "en-b1",
      name: "Englisch B1",
      glyph: "e",
      color: "#2F8F6A",
      description: "Grammar and communication for everyday work situations.",
      topics: [
        {
          id: "reported-speech",
          title: "Reported Speech",
          kicker: "Grammar",
          minutes: 10,
          steps: [
            {
              type: "slides",
              title: "How it works",
              slides: [
                {
                  style: "dark",
                  kicker: "Grammar",
                  title: "What did she <em>say?</em>",
                  body: `<p>We use reported speech to tell someone what another person said.</p>
                         <p class="quote" style="margin-top:18px">"I am busy." → She said (that) she <strong>was</strong> busy.</p>`
                },
                {
                  kicker: "Backshift",
                  title: "One step into the <em>past</em>",
                  body: `<div class="pair">
                           <div><b>Direct</b>am / is</div><div><b>Reported</b>was</div>
                           <div><b>Direct</b>will</div><div><b>Reported</b>would</div>
                           <div><b>Direct</b>can</div><div><b>Reported</b>could</div>
                           <div><b>Direct</b>did / has done</div><div><b>Reported</b>had done</div>
                         </div>`
                },
                {
                  kicker: "Don't forget",
                  title: "Pronouns & <em>time words</em>",
                  body: `<ul>
                           <li>I → he / she, &nbsp;we → they</li>
                           <li>today → that day</li>
                           <li>tomorrow → the next day</li>
                           <li>here → there</li>
                         </ul>`
                }
              ]
            },
            {
              type: "quiz",
              title: "Quick check",
              questions: [
                { q: "\"I will call you.\" → He said he …", options: ["will call me", "would call me", "calls me", "called me tomorrow"], answer: 1, explain: "will → would" },
                { q: "\"We are late.\" → They said they …", options: ["are late", "were late", "have been late", "be late"], answer: 1, explain: "are → were" },
                { q: "\"I can help.\" → She said she …", options: ["can help", "could help", "helps", "will help"], answer: 1, explain: "can → could" }
              ]
            },
            {
              type: "link",
              title: "Interactive practice",
              text: "More exercises in the interactive module.",
              href: "materialien/Englisch B1/Reported Speech/reported_speech_interactive_3.html"
            }
          ]
        }
      ]
    },

    /* ────────────────────────────────────────────────────── */
    {
      id: "pbp",
      name: "Personal",
      glyph: "P",
      color: "#A16A1F",
      description: "Personalbedarf, Entgelt und Vorsorge – Personalprozesse verstehen.",
      topics: [
        {
          id: "personalbedarf",
          title: "Personalbedarf ermitteln",
          kicker: "LF 8",
          minutes: 10,
          steps: [
            {
              type: "slides",
              title: "Die Formel",
              slides: [
                {
                  kicker: "Personalbedarfsplanung",
                  title: "Wie viele Leute <em>brauchen</em> wir?",
                  body: `<p>Der <strong>Bruttopersonalbedarf</strong> ist die Zahl der Stellen, die für die Arbeit nötig sind.</p>
                         <p>Der <strong>Nettopersonalbedarf</strong> zeigt, wie viele Personen tatsächlich eingestellt (oder abgebaut) werden müssen.</p>`
                },
                {
                  style: "dark",
                  kicker: "Die Rechnung",
                  title: "Nettopersonalbedarf",
                  body: `<p class="quote">= Bruttopersonalbedarf<br>− aktueller Personalbestand<br>+ Abgänge<br>− feste Zugänge</p>`
                }
              ]
            },
            {
              type: "quiz",
              title: "Rechnen",
              questions: [
                {
                  q: "Bruttobedarf 40, Bestand 36, 3 Abgänge, 1 fester Zugang. Wie hoch ist der Nettopersonalbedarf?",
                  options: ["4", "6", "2", "8"],
                  answer: 1,
                  explain: "40 − 36 + 3 − 1 = 6"
                },
                {
                  q: "Ein negativer Nettopersonalbedarf bedeutet …",
                  options: ["Personalunterdeckung", "Personalüberdeckung", "Fehler in der Rechnung", "Kurzarbeit ist Pflicht"],
                  answer: 1,
                  explain: "Es sind mehr Mitarbeitende da als benötigt."
                }
              ]
            },
            {
              type: "link",
              title: "Präsentation im Original",
              text: "Die vollständige Präsentation zu LF 8.",
              href: "materialien/PBP/Personalbedarf/PBP_LF8_Praesentation.html"
            }
          ]
        }
      ]
    }
  ]
};
