/* ============================================================
   KURS: Englisch · Telephoning (Business English)
   Höflich telefonieren im Büro: Verhalten, Redemittel, Buchstabieren,
   Termine machen und ein Hotel buchen.
   Zielniveau A2 → B1. Erklärungen auf Deutsch, Aufgaben auf Englisch.
   Beispielwelt: Dr Kiesbauer (Düsseldorf) und Wilkinson and Friends Ltd.
   (Birmingham) – Namen, Nummern und Adressen aus dem Material der Lehrkraft.
   Aufbau und alle Aufgabentypen: app/README.md
   ============================================================ */

LERNRAUM.subjects.push({
  id: "englisch-telephoning",
  fach: "Englisch",
  added: "2026-09-29",
  name: "Telephoning",
  course: "Englisch · Telephoning",
  glyph: "T",
  color: "#0d9488",
  description: "Business English am Telefon: höflich sprechen, Redemittel sicher benutzen, Namen und Nummern buchstabieren, Termine machen und ein Hotel buchen. Erklärungen auf Deutsch, Übungen auf Englisch – mit Dr Kiesbauer und Wilkinson and Friends Ltd.",
  topics: [

    /* ══════════════ 1 · VERHALTEN AM TELEFON ══════════════ */
    {
      id: "grundlagen",
      group: "Einstieg",
      title: "How (not) to behave",
      kicker: "Telephoning · Einstieg",
      minutes: 18,
      help: `<h3>Golden Rules am Telefon</h3>
             <ul>
               <li>Sei <strong>höflich und freundlich</strong> – dein Verhalten fällt auf dich und deine Firma zurück.</li>
               <li>Sprich in einem freundlichen Ton (lächeln – man hört es am Telefon).</li>
               <li>Nicht zu laut, nicht zu leise; nicht zu schnell, nicht zu langsam.</li>
               <li>Stell dich vor: Vorname, Nachname und Firma.</li>
               <li>Begrüße die andere Person: Hello, Good morning, Good afternoon, …</li>
               <li>Benutze freundliche Wörter: Could you …?, please, thank you, I’m afraid …</li>
               <li>Bedanke dich für Hilfe und <strong>beende</strong> das Gespräch freundlich.</li>
             </ul>
             <h3>Höfliche Grundformeln</h3>
             <p class="formula">Could I speak to …? · Can I take a message? · I’d like to …</p>`,
      steps: [
        {
          type: "slides",
          title: "Worum geht's?",
          slides: [
            {
              style: "dark",
              kicker: "Telephoning · Einstieg",
              title: "Your first day at Dr Kiesbauer’s surgery.",
              body: `<p>Dein Chef, <strong>Dr Kiesbauer</strong>, bittet dich, einen wichtigen Termin mit seinem Geschäftspartner <strong>Mr Wilkinson</strong> in <strong>Birmingham</strong> zu organisieren.</p>
                     <p>Du bist unsicher. Also schaust du zuerst deiner Kollegin <strong>Jenny</strong> beim Telefonieren zu …</p>`
            },
            {
              kicker: "So bitte nicht",
              title: "Jenny ruft bei Wilkinson and Friends Ltd. an.",
              body: `<p><strong>Receptionist:</strong> Wilkinson and Friends Ltd. Good morning, how can I help you?</p>
                     <p><strong>Jenny:</strong> (unfriendly voice) I want to speak Mr Wilkinson. NOW!</p>
                     <p><strong>Sam Carter:</strong> Arthur Wilkinson’s office, Sam Carter speaking.</p>
                     <p><strong>Jenny:</strong> What? I wanted to speak to Mr Wilkinson.</p>
                     <p><strong>Sam Carter:</strong> I’m afraid he is out at the moment. Can I take a message?</p>
                     <p><strong>Jenny:</strong> Damn it. Tell him to call me back at three in the afternoon, British time!</p>`
            },
            {
              kicker: "Was schiefgelaufen ist",
              title: "Das war <em>nicht</em> höflich.",
              body: `<ul>
                       <li>Keine Begrüßung, kein Name, keine Firma.</li>
                       <li>Zu direkte Befehle: „I want … NOW!“, „Tell him …!“</li>
                       <li>Unhöfliche Wörter („Damn it“, „What?“).</li>
                       <li>Kein Dank, kein freundlicher Abschluss.</li>
                     </ul>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Höflichkeit ist die halbe Miete.",
              body: `<p>Begrüßen · vorstellen · freundlich bitten (<strong>Could you …?</strong>) · danken · freundlich verabschieden.</p>`
            }
          ]
        },
        {
          type: "quiz",
          title: "A1 · Verstehen",
          questions: [
            {
              q: "Jenny says: “I want to speak Mr Wilkinson. NOW!” What is the problem?",
              options: ["It is impolite and too direct.", "It uses the wrong tense.", "It is too quiet."],
              answer: 0,
              explain: "Höflich wäre: “Could I speak to Mr Wilkinson, please?”"
            },
            {
              q: "Sam asks for her name, number and reason. What should Jenny be?",
              options: ["rude", "polite and clear", "silent"],
              answer: 1,
              explain: "Freundlich UND klar: Name, Nummer und Grund nennen."
            },
            {
              q: "Which sentence is polite?",
              hint: "Freundliche Wörter wie could und please helfen.",
              options: ["Could I speak to Mr Wilkinson, please?", "I want Wilkinson. Now!", "You’d better call me back."],
              answer: 0,
              explain: "Could I …? und please machen den Satz höflich."
            },
            {
              q: "How should you end a business call?",
              options: ["Hang up quickly.", "Say goodbye in a friendly way.", "Say “Damn it”."],
              answer: 1,
              explain: "Freundlicher Abschluss: “It was nice talking to you. Have a nice day. Goodbye.”"
            }
          ]
        },
        {
          type: "sort",
          title: "A2 · höflich oder nicht?",
          prompt: "Sortiere die Sätze.",
          hints: ["Could, please und thank you sind höflich.", "Befehle und Schimpfwörter sind unhöflich."],
          categories: ["polite ✓", "not polite ✗"],
          items: [
            { text: "Could I speak to Mr Wilkinson, please?", cat: 0 },
            { text: "I want to speak to him NOW!", cat: 1 },
            { text: "I’m afraid he is out at the moment.", cat: 0 },
            { text: "Are you freaking kidding me?", cat: 1 },
            { text: "Can I take a message?", cat: 0 },
            { text: "You’d better call me back!", cat: 1 }
          ]
        },
        {
          type: "sentence",
          title: "A3 · Jenny höflich machen",
          case: "Bilde aus Jennys Anruf ein höfliches Gespräch.",
          text: "Good morning. {*This is|Here is|I am being} Jenny Meier from Dr Kiesbauer’s surgery in Düsseldorf. {*Could I speak|I want|I need} to Mr Wilkinson, please? … Thank you. Could you {*ask him to call me back|tell him to call me|order him to ring} at three in the afternoon, British time, please?",
          explain: "Höflich: “This is …”, “Could I speak to …?” und “Could you ask him to call me back …?”"
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann höfliche und unhöfliche Formulierungen am Telefon unterscheiden.",
            "Ich kenne die wichtigsten Golden Rules am Telefon.",
            "Ich kann Jennys unhöflichen Anruf höflich korrigieren."
          ]
        }
      ]
    },

    /* ══════════════ 2 · REDEMITTEL ══════════════ */
    {
      id: "redemittel",
      group: "Redemittel",
      title: "Useful words and phrases",
      kicker: "Redemittel · Gesprächsphasen",
      minutes: 20,
      help: `<h3>Gesprächsphasen</h3>
             <ul>
               <li><b>Making a call</b> – Good morning, this is … of … . May I ask who I am speaking with, please?</li>
               <li><b>Answering</b> – Dr Kiesbauer’s office. This is … speaking. How can I help you? · May I ask who is calling, please?</li>
               <li><b>Asking to speak</b> – I’d like to speak to …, please. · Could I speak to …, please?</li>
               <li><b>Putting through</b> – I’m putting you through now. Please hold the line. · The line is busy. Would you like to hold?</li>
               <li><b>Taking a message</b> – I’m afraid … is in a meeting. Can I take a message? · Would you like to leave a message?</li>
               <li><b>Asking for help</b> – Could I have his extension, please? · Could you ask him to call me back at …?</li>
               <li><b>Helping</b> – Of course. · That’s no problem at all. · I’ll deal with this right away.</li>
               <li><b>Thanking / finishing</b> – Thank you very much for your help. · It was nice talking to you. · I wish you a nice day. Goodbye.</li>
             </ul>
             <h3>Wichtig</h3>
             <p class="formula">It’s urgent. · I didn’t catch that. · You’ve been most helpful.</p>`,
      steps: [
        {
          type: "slides",
          title: "Worum geht's?",
          slides: [
            {
              style: "dark",
              kicker: "Redemittel · Gesprächsphasen",
              title: "Ein Gespräch hat Bausteine.",
              body: `<p>Für jede Phase gibt es fertige <strong>Redemittel</strong>. Du musst sie nicht erfinden – nur richtig einsetzen.</p>
                     ${ablauf([
                       { text: "1 · Begrüßen", value: "Good morning" },
                       { op: "→", note: "This is … of …" },
                       { text: "2 · Durchstellen", value: "Please hold the line" },
                       { op: "→", note: "Can I take a message?" },
                       { text: "3 · Nachricht", value: "Leave a message?" },
                       { op: "→", note: "How can I be of assistance?" },
                       { text: "4 · Danken", value: "Thank you for your help" },
                       { op: "→", note: "I wish you a nice day." },
                       { text: "5 · Verabschieden", value: "Have a nice day.", hi: true }
                     ], { title: "So läuft ein Anruf" })}`
            },
            {
              kicker: "Anrufen / abnehmen",
              title: "Making a call · Answering",
              body: `<dl class="terms">
                       <dt>Making a call</dt><dd>Good morning, this is Peter Clark of Supercars Ltd. in Manchester. · May I ask who I am speaking with, please?</dd>
                       <dt>Answering</dt><dd>Dr Kiesbauer’s office. This is Jenny speaking. How can I help you? · May I ask who is calling, please?</dd>
                     </dl>`
            },
            {
              kicker: "Durchstellen / Nachricht",
              title: "Putting through · Taking a message",
              body: `<dl class="terms">
                       <dt>Putting through</dt><dd>Please hold on for a moment. · I’m putting you through now. Please hold the line. · The line is busy. Would you like to hold?</dd>
                       <dt>Taking a message</dt><dd>I’m afraid Mr Wilkinson is in a meeting. Can I take a message? · Would you like to leave a message?</dd>
                     </dl>`
            },
            {
              kicker: "Hilfe / Abschluss",
              title: "Asking for help · Finishing the call",
              body: `<dl class="terms">
                       <dt>Asking for help</dt><dd>Could I have his extension, please? · Could you ask him to call me back at three? · I didn’t catch that.</dd>
                       <dt>Finishing</dt><dd>Thank you very much for your help. · You’ve been most helpful. · It was nice talking to you. · I wish you a nice day. Goodbye.</dd>
                     </dl>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Fertige Bausteine = weniger Stress.",
              body: `<p>Kenne <strong>eine</strong> höfliche Formel pro Gesprächsphase.</p>`
            }
          ]
        },
        {
          type: "sort",
          title: "A1 · welche Phase?",
          prompt: "Ordne jede Formulierung der passenden Gesprächsphase zu.",
          hints: ["Achte auf das Ziel der Aussage (begrüßen, Nachricht, abschließen).", "“Can I take a message?” gehört zum Aufnehmen einer Nachricht."],
          categories: ["Making a call", "Answering the phone", "Taking a message", "Finishing the call"],
          items: [
            { text: "Good morning, this is Peter Clark of Supercars Ltd. in Manchester.", cat: 0 },
            { text: "May I ask who I am speaking with, please?", cat: 0 },
            { text: "Dr Kiesbauer’s office. This is Jenny speaking. How can I help you?", cat: 1 },
            { text: "May I ask who is calling, please?", cat: 1 },
            { text: "I’m afraid Mr Wilkinson is in a meeting. Can I take a message?", cat: 2 },
            { text: "Would you like to leave a message?", cat: 2 },
            { text: "It was nice talking to you. Have a nice day. Goodbye.", cat: 3 },
            { text: "I wish you a nice day, too. Goodbye.", cat: 3 }
          ]
        },
        {
          type: "cloze",
          title: "A2 · Redemittel sichern",
          prompt: "Vier Wörter passen nicht.",
          hints: ["Es geht ums Sprechen, Warten, Bedauern und eine Nachricht.", "“to be … of a company” und “hold … for a moment” sind feste Wendungen."],
          text: "I’d like to {speak} to Mr Wilkinson, please. Please hold {on} for a moment. I’m {afraid} he is in a meeting. Can I take a {message}? Thank you for your help. It was {nice} talking to you.",
          distractors: ["see", "off", "happy", "call"]
        },
        {
          type: "quiz",
          title: "A3 · die richtige Formulierung",
          questions: [
            {
              q: "Somebody picks up: “Good morning, Supercars Ltd. How can I help you?” You want Mr Wilkinson. What do you say?",
              options: ["I’d like to speak to Mr Wilkinson, please.", "I want Wilkinson.", "Who is this?"],
              answer: 0,
              explain: "Höflich: “I’d like to speak to …, please.”"
            },
            {
              q: "You want to know the caller’s name – politely.",
              options: ["May I ask who is calling, please?", "What’s your name?", "Who are you?"],
              answer: 0,
              explain: "“May I ask who is calling, please?” ist die höfliche Frage."
            },
            {
              q: "The line is busy. What can you say?",
              options: ["I’m sorry, the line is busy. Would you like to hold?", "The line is busy. Bye.", "No time."],
              answer: 0,
              explain: "Auch hier gilt: freundlich bleiben und eine Wahl anbieten (hold)."
            },
            {
              q: "“It’s urgent.” means …",
              hint: "urgent = dringend.",
              options: ["Es ist dringend.", "Es ist nicht wichtig.", "Es ist billig."],
              answer: 0,
              explain: "urgent = dringend."
            }
          ]
        },
        {
          type: "sentence",
          title: "A4 · Sätze bauen",
          case: "Wähle in jedem Kasten den richtigen Baustein.",
          text: "{*May I|Must I|Do I} ask who I am speaking with, please? … I’m sorry, I {*didn’t catch|did not hear|do not catch} that because of the bad connection. … Thank you very much for your help. You’ve been {*most helpful|very laughable|too late}.",
          explain: "“May I ask …?”, “I didn’t catch that.” und “You’ve been most helpful.” sind feste höfliche Wendungen."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann ein Telefonat eröffnen (begrüßen, vorstellen).",
            "Ich kann nach einer Person fragen und eine Nachricht aufnehmen.",
            "Ich kann mich für Hilfe bedanken und das Gespräch freundlich beenden."
          ]
        }
      ]
    },

    /* ══════════════ 3 · BUCHSTABIEREN ══════════════ */
    {
      id: "buchstabieren",
      group: "Am Telefon",
      title: "Spelling, numbers, emails",
      kicker: "Am Telefon · Buchstabieren",
      minutes: 18,
      help: `<h3>Telefonier-Alphabet</h3>
             <p class="formula">A Alpha · B Bravo · C Charlie · D Delta · E Echo · F Foxtrot · G Golf · H Hotel · I India · J Juliette · K Kilo · L Lima · M Mike</p>
             <p class="formula">N November · O Oscar · P Papa · Q Quebec · R Romeo · S Sierra · T Tango · U Uniform · V Victor · W Whisky · X X-ray · Y Yankee · Z Zulu</p>
             <p class="note">Beispiel „car“: „si – äi – ar“ oder mit Code: „C for Charlie, A for Alpha, R for Romeo“.</p>
             <h3>Telefonnummern</h3>
             <p>Ziffern einzeln sprechen. 0 = <b>oh</b> oder <b>zero</b>. „five – five“ kann man auch <b>double five</b> sagen. Die erste 0 der Ortsvorwahl fällt bei internationalen Anrufen weg (+49 211 …).</p>
             <h3>Zeichen und E-Mail</h3>
             <p class="formula">@ at · . dot · - dash/hyphen · _ underscore · / slash/stroke · \\ backslash · : colon</p>
             <p class="note">E-Mail: t.miller@peterson.com → „ti – dot – miller – at – peterson dot com“.</p>`,
      steps: [
        {
          type: "slides",
          title: "Worum geht's?",
          slides: [
            {
              style: "dark",
              kicker: "Am Telefon · Buchstabieren",
              title: "Bad connection? Dann buchstabieren.",
              body: `<p>Am Telefon hört man Namen und Nummern oft falsch. Dann hilft das <strong>internationale Telefonier-Alphabet</strong>: “A for Alpha, B for Bravo …”.</p>`
            },
            {
              kicker: "Telefonier-Alphabet (1/2)",
              title: "A bis M",
              body: `<ul>
                       <li><strong>A</strong> – Alpha · <strong>B</strong> – Bravo · <strong>C</strong> – Charlie · <strong>D</strong> – Delta</li>
                       <li><strong>E</strong> – Echo · <strong>F</strong> – Foxtrot · <strong>G</strong> – Golf · <strong>H</strong> – Hotel</li>
                       <li><strong>I</strong> – India · <strong>J</strong> – Juliette · <strong>K</strong> – Kilo · <strong>L</strong> – Lima · <strong>M</strong> – Mike</li>
                     </ul>`
            },
            {
              kicker: "Telefonier-Alphabet (2/2)",
              title: "N bis Z",
              body: `<ul>
                       <li><strong>N</strong> – November · <strong>O</strong> – Oscar · <strong>P</strong> – Papa · <strong>Q</strong> – Quebec</li>
                       <li><strong>R</strong> – Romeo · <strong>S</strong> – Sierra · <strong>T</strong> – Tango · <strong>U</strong> – Uniform</li>
                       <li><strong>V</strong> – Victor · <strong>W</strong> – Whisky · <strong>X</strong> – X-ray · <strong>Y</strong> – Yankee · <strong>Z</strong> – Zulu</li>
                     </ul>`
            },
            {
              kicker: "Nummern und Zeichen",
              title: "Ziffern, double five, dot/at",
              body: `<p>0201 5684 → “oh – two – oh – one – five – six – eight – four”.</p>
                     <p>5581678 → “double five – eight – one – six – seven – eight”.</p>
                     <p>E-Mail: t.miller@peterson.com → “ti – dot – miller – at – peterson dot com”.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Namen mit Code · Nummern Ziffer für Ziffer.",
              body: `<p>@ at · . dot · - dash · _ underscore · / slash · : colon</p>`
            }
          ]
        },
        {
          type: "quiz",
          title: "A1 · Verstehen",
          questions: [
            {
              q: "Why do people use the international telephone alphabet?",
              options: ["Because names are often not understood on a bad line.", "Because it is faster than normal talking.", "Because it is a secret code."],
              answer: 0,
              explain: "Bei schlechter Verbindung versteht man sonst Buchstaben wie B, D, P, T nicht."
            },
            {
              q: "How do you say the letter “W” in the telephone alphabet?",
              options: ["Whisky", "Water", "Window"],
              answer: 0,
              explain: "W – Whisky."
            },
            {
              q: "Which letter is “Kilo”?",
              options: ["K", "C", "Q"],
              answer: 0,
              explain: "K – Kilo."
            },
            {
              q: "Instead of “five – five”, you can also say …",
              hint: "Zwei gleiche Ziffern direkt hintereinander.",
              options: ["double five", "five double", "two five"],
              answer: 0,
              explain: "double five = 55 (zwei Fünfen)."
            }
          ]
        },
        {
          type: "cloze",
          title: "A2 · E-Mail diktieren",
          prompt: "Drei Wörter passen nicht.",
          hints: ["Zeichen wie @ und . haben englische Namen.", "Der Bindestrich heißt hyphen."],
          text: "To spell an email address, say the words and single {letters}. For “t.miller@peterson.com”, you say: ti – {dot} – miller – {at} – peterson dot com. A dash is also called {hyphen}.",
          distractors: ["numbers", "comma", "colon"]
        },
        {
          type: "sentence",
          title: "A3 · buchstabieren",
          case: "Wähle in jedem Kasten den richtigen Baustein.",
          text: "Spell the name “Carter” with the telephone alphabet: {*C for Charlie|C for Cat|C for Cola} – A for Alpha – R for Romeo – T for Tango – E for Echo – R for Romeo. … Dictate the number 0201 5684: oh – two – oh – one – {*five|fifty} – six – eight – {*four|forty}.",
          explain: "Im Code: “C for Charlie”. Nummern Ziffer für Ziffer: five, four (nicht fifty, forty)."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann Namen mit dem Telefonier-Alphabet buchstabieren.",
            "Ich kann Telefonnummern Ziffer für Ziffer diktieren.",
            "Ich kann eine E-Mail-Adresse mit dot und at ansagen."
          ]
        }
      ]
    },

    /* ══════════════ 4 · TERMINE MACHEN ══════════════ */
    {
      id: "termine",
      group: "Am Telefon",
      title: "Making appointments",
      kicker: "Am Telefon · Termine",
      minutes: 20,
      help: `<h3>Datum – schreiben</h3>
             <p>Vorsicht bei reinen Zahlen: 12/05/15 lesen Briten als 12. Mai, Amerikaner als 5. Dezember. Darum den Monatsnamen schreiben: <b>12 May 2015</b> (kein Punkt nach der Zahl).</p>
             <h3>Datum – sprechen</h3>
             <p class="formula">the sixth of July · on the 4th of July · the 1st (first), the 2nd (second), the 3rd (third), the 21st (twenty-first) …</p>
             <h3>Uhrzeit – zwei Formen</h3>
             <p>Langform: five past eight, a quarter past eight, half past eight, twenty-five to nine.</p>
             <p>Kurzform: eight oh five a.m., eight fifteen a.m., eight thirty a.m.</p>
             <p>12:00 = noon · 00:00 = midnight · a.m. = vormittags · p.m. = nachmittags/abends.</p>
             <p class="note">Achtung: “half three” heißt <b>3:30</b>, nicht 2:30!</p>
             <h3>Redemittel</h3>
             <p class="formula">Could we make an appointment? · Would Thursday suit you? · I’ll check the diary. · I’m afraid that won’t be possible. · Could we make it 11:30?</p>`,
      steps: [
        {
          type: "slides",
          title: "Worum geht's?",
          slides: [
            {
              style: "dark",
              kicker: "Am Telefon · Termine",
              title: "Sam Carter schlägt einen Termin vor.",
              body: `<p>Mr Wilkinson’s secretary ruft an. Die Konferenz läuft von <strong>Montag, den 3. Juli</strong> bis <strong>Freitag, den 7. Juli</strong>. Mr Wilkinson könnte Dr Kiesbauer am <strong>Donnerstag, den 6. Juli</strong> treffen – entweder um <strong>half nine</strong> morgens oder um <strong>half three</strong> nachmittags.</p>
                     <p>Jenny antwortet: “Half three will be convenient.”</p>`
            },
            {
              kicker: "Die Woche im Überblick",
              title: "Konferenz und Termin auf einen Blick.",
              body: `${zeitstrahl([
                       { at: 10, label: "Mo 3 July", text: "Convention starts" },
                       { at: 55, label: "Thu 6 July · half three", text: "Meeting: 3:30 p.m.", hi: true },
                       { at: 90, label: "Fr 7 July", text: "Convention ends" }
                     ], { title: "Birmingham, 3.–7. Juli", now: 55, axis: ["3 July", "6 July", "7 July"] })}`
            },
            {
              kicker: "Der Stolperstein",
              title: "“Half three” = 3:30.",
              body: `<p>Im Deutschen ist „halb drei“ = <strong>2:30</strong>. Im Englischen ist “half three” = <strong>3:30</strong>.</p>
                     <p class="note">Jenny notiert „14:30 Uhr“ – das ist der <strong>Fehler</strong>. Richtig wäre 15:30 Uhr (half three = half past three).</p>`
            },
            {
              kicker: "Datum",
              title: "Monat ausschreiben statt 12/05/15.",
              body: `<p>Reine Zahlen sind zweideutig. Besser: <strong>12 May 2015</strong>, <strong>6 July</strong>.</p>
                     <p>Gelesen: “the sixth of July”, “on the 4th of July”.</p>`
            },
            {
              kicker: "Uhrzeit",
              title: "Langform und Kurzform.",
              body: `<div class="pair">
                       <div><b>Langform (Wörter)</b>a quarter past eight · twenty-five to nine</div>
                       <div><b>Kurzform (Zahlen)</b>eight fifteen a.m. · eight thirty-five a.m.</div>
                     </div>
                     <p>a.m. = vormittags · p.m. = nachmittags/abends · noon = 12:00 · midnight = 00:00.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "half three = 3:30 · Datum mit Monatsname",
              body: `<p>Termin vorschlagen: “How about …?” · “Would … suit you?”</p>`
            }
          ]
        },
        {
          type: "quiz",
          title: "A1 · Verstehen",
          questions: [
            {
              q: "“Half three in the afternoon” means …",
              options: ["3:30 p.m.", "2:30 p.m.", "half past two"],
              answer: 0,
              explain: "half three = half past three = 3:30. Nicht 2:30!"
            },
            {
              q: "How do you write the date clearly for a British and an American partner?",
              options: ["6 July", "07/06", "6/7"],
              answer: 0,
              explain: "Der Monatsname verhindert Missverständnisse."
            },
            {
              q: "12/05/15 – what does an American read?",
              hint: "Amerikaner lesen Monat/Tag/Jahr.",
              options: ["5 December 2015", "12 May 2015", "the same as a Briton"],
              answer: 0,
              explain: "USA: Monat/Tag/Jahr → 12/05/15 = 5. Dezember. Briten: 12. Mai."
            },
            {
              q: "“At half nine in the morning” means …",
              options: ["9:30 a.m.", "8:30 a.m.", "9:00 a.m."],
              answer: 0,
              explain: "half nine = half past nine = 9:30."
            }
          ]
        },
        {
          type: "sort",
          title: "A2 · lang oder kurz?",
          prompt: "Zu welcher Form gehört die Uhrzeit?",
          hints: ["Wörter wie past und to gehören zur Langform.", "a.m./p.m. mit Ziffern ist die Kurzform."],
          categories: ["long form (words)", "short form (numbers)"],
          items: [
            { text: "five past eight in the morning", cat: 0 },
            { text: "a quarter past eight", cat: 0 },
            { text: "twenty-five to nine", cat: 0 },
            { text: "eight oh five a.m.", cat: 1 },
            { text: "eight fifteen a.m.", cat: 1 },
            { text: "eight forty-five a.m.", cat: 1 }
          ]
        },
        {
          type: "cloze",
          title: "A3 · Termine Redemittel",
          prompt: "Drei Wörter passen nicht.",
          hints: ["Es geht ums Vorschlagen, Treffen, Nachschauen und Passen.", "“to … an appointment”, “to … Dr Kiesbauer”, “appointment …”, “will be …”."],
          text: "Mr Wilkinson would like to {suggest} an appointment to see Dr Kiesbauer. When would Mr Wilkinson like to {meet} Dr Kiesbauer? One moment, please. I’ll just take a quick look at our appointment {book}. Half three will be {convenient}.",
          distractors: ["cancel", "pay", "cheap"]
        },
        {
          type: "sentence",
          title: "A4 · Termin verschieben",
          case: "Wähle in jedem Kasten den richtigen Baustein.",
          text: "I’m calling about Dr Kiesbauer’s appointment with Mr Wilkinson. I’m afraid he has to {*change|stop|break} it. Could we {*make it|take it|do it} at 11:30? {*Would that|Will that|Can that} be possible for Mr Wilkinson?",
          explain: "Höflich verschieben: “I’m afraid …”, “Could we make it …?”, “Would that be possible?”"
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann ein Datum schreiben und sprechen (12 May 2015 · the sixth of July).",
            "Ich kann Uhrzeiten in der Lang- und Kurzform sagen.",
            "Ich kenne den Unterschied zwischen „half three“ und „halb drei“."
          ]
        }
      ]
    },

    /* ══════════════ 5 · DIALOGE ÜBEN ══════════════ */
    {
      id: "dialoge",
      group: "Üben",
      title: "Practising a dialogue",
      kicker: "Üben · Gespräche",
      minutes: 20,
      help: `<h3>So klingt ein gutes Gespräch</h3>
             <ol>
               <li>Begrüßen und vorstellen: “Good morning. This is … from …”</li>
               <li>Anliegen nennen: “Could I speak to …, please?” / “I’m calling about …”</li>
               <li>Nachricht: “Yes, please. Could you ask him to call me back by …?”</li>
               <li>Danken und verabschieden: “Thank you. I wish you a nice day. Goodbye.”</li>
             </ol>
             <p class="note">Kurze Antworten wie “Yes.” oder “No.” wirken unfreundlich. Immer etwas freundlicher formulieren.</p>`,
      steps: [
        {
          type: "slides",
          title: "Worum geht's?",
          slides: [
            {
              style: "dark",
              kicker: "Üben · Gespräche",
              title: "Jetzt telefonierst du selbst.",
              body: `<p>Dr Kiesbauer bittet dich, <strong>Mr Wilkinson</strong> anzurufen und eine Nachricht zu hinterlassen – auf Englisch.</p>
                     <p>Später rufst du für ihn <strong>Ms Alice Parker</strong> an: Konferenz am 4. Juli um 16 Uhr in Manchester, wegen eines neuen Vertrags.</p>`
            },
            {
              kicker: "Deine Entscheidungen zählen",
              title: "Freundlich oder unfreundlich?",
              body: `<p>In beiden Gesprächen entscheidest du, wie du reagierst. Freundliche Wörter (<strong>could, please, thank you</strong>) helfen dir.</p>`
            }
          ]
        },
        {
          type: "sentence",
          title: "A1 · Der Wilkinson-Anruf",
          case: "Fülle das höfliche Gespräch.",
          text: "Good morning. {*This is|Here is|I am} Jenny Meier from Dr Kiesbauer’s surgery in Düsseldorf. {*Could I speak|I want|Give me} to Mr Wilkinson, please? … I’m afraid he is not available. Would you like to leave a message? … Yes, please. Could you {*ask him to call me back|tell him to call me|order him to ring} by 15:00 British time?",
          explain: "Höflich: “This is …”, “Could I speak to …?” und “Could you ask him to call me back …?”"
        },
        {
          type: "quiz",
          title: "A2 · Das Parker-Gespräch",
          questions: [
            {
              q: "Thomas: “Good morning, Jenson Ltd. How can I help you?” What do you say?",
              options: ["Good morning. This is Jenny Meier from Dr Kiesbauer’s surgery. Could I speak to Ms Parker, please?", "What? Where is Ms Parker? Get her on the horn now!", "I want Ms Parker."],
              answer: 0,
              explain: "Höflich begrüßen, vorstellen und höflich fragen."
            },
            {
              q: "Ms Parker is out for the rest of the day. Thomas can take a message. What is best?",
              options: ["Yes, that would be nice. Could you please ask her if she would like to meet Dr Kiesbauer at a conference in Manchester to discuss a new contract?", "Yes, I hope you can do that. Dr Kiesbauer wants to see her at a conference.", "No."],
              answer: 0,
              explain: "Höflich bitten: “Could you please ask her if she would like to …?”"
            },
            {
              q: "Thomas: “When will the conference be held?”",
              hint: "Dr Kiesbauer nennt den 4. Juli, 16 Uhr.",
              options: ["It will be held on the fourth of July at four pm.", "It will be held on the fourth of June at four pm.", "It will be held on the third of July at four pm."],
              answer: 0,
              explain: "Der Termin ist am vierten Juli (the fourth of July) um vier Uhr."
            },
            {
              q: "Thomas: “I could ask her tomorrow and call you back. Would that be ok?” What is polite?",
              options: ["That would be great. Thank you very much.", "Yes.", "That’s very late! Ok, well, if that’s the best you can do…"],
              answer: 0,
              explain: "Kurze Antworten wie “Yes.” wirken unfreundlich – besser danken."
            },
            {
              q: "Thomas: “Is there anything else I can do for you?” What do you say?",
              options: ["No, that’s it. Thanks again for your help. I appreciate it.", "No.", "No, that’s it."],
              answer: 0,
              explain: "Dank und Wertschätzung gehören zum höflichen Abschluss."
            }
          ]
        },
        {
          type: "cloze",
          title: "A3 · Termin verschieben",
          prompt: "Drei Wörter passen nicht.",
          hints: ["Es geht um Termin, Erreichbarkeit, Zeitpunkt und Machen.", "“an …”, “available”, “a good …”, “to … it 11:30”."],
          text: "I’m afraid Mr Wilkinson already has an {appointment} at that time. Would Dr Kiesbauer also be {available} at 11:00? I’m sorry, that’s not a very good {time} for him. Could we {make} it 11:30?",
          distractors: ["party", "sleepy", "break"]
        },
        {
          type: "sentence",
          title: "A4 · freundlich beenden",
          case: "Wähle in jedem Kasten den richtigen Baustein.",
          text: "It was {*nice|funny|heavy} talking to you. Thank you for your {*help|money|call}. I {*wish|want|must} you a nice day. Goodbye.",
          explain: "Höflicher Schluss: “It was nice talking to you.” · “Thank you for your help.” · “I wish you a nice day.”"
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann ein vollständiges Telefongespräch auf Englisch führen.",
            "Ich kann höflich um eine Nachricht und einen Rückruf bitten.",
            "Ich kann das Gespräch freundlich beenden."
          ]
        }
      ]
    },

    /* ══════════════ 6 · HOTEL BUCHEN ══════════════ */
    {
      id: "hotel",
      group: "Üben",
      title: "Booking a hotel",
      kicker: "Üben · Hotel",
      minutes: 20,
      help: `<h3>Nützliches Vokabular</h3>
             <ul>
               <li><b>to book</b> – buchen · <b>reservation</b> – Reservierung/Buchung</li>
               <li><b>single room</b> – Einzelzimmer · <b>double room</b> – Doppelzimmer</li>
               <li><b>en suite bathroom</b> – mit anschließendem (eigenen) Badezimmer</li>
               <li><b>rate</b> – (Zimmer-)Preis · <b>booking fee</b> – Buchungsgebühr · <b>to charge</b> – berechnen</li>
               <li><b>confirmation</b> – Bestätigung · <b>cancellation</b> – Stornierung</li>
               <li><b>date of arrival</b> – Ankunftstag · <b>date of departure</b> – Abreisetag</li>
               <li><b>spa</b> – Wellness-Bereich · <b>WiFi</b> – W-LAN · <b>facilities</b> – Einrichtungen</li>
             </ul>
             <h3>Redemittel</h3>
             <p class="formula">I’d like to book … · Is breakfast included? · How much is the WiFi per day? · Could you send the confirmation by email?</p>`,
      steps: [
        {
          type: "slides",
          title: "Worum geht's?",
          slides: [
            {
              style: "dark",
              kicker: "Üben · Hotel",
              title: "Dr Kiesbauer braucht ein Zimmer in Birmingham.",
              body: `<p>Er fährt zum Kongress und bittet dich, telefonisch ein Zimmer zu buchen. Seine Wünsche stehen in einer E-Mail.</p>`
            },
            {
              kicker: "Die E-Mail des Chefs",
              title: "Das braucht Dr Kiesbauer.",
              body: `<ul>
                       <li>Einzelzimmer mit eigenem Badezimmer, <strong>3. bis 7. Juli</strong></li>
                       <li>max. ca. <strong>£130</strong> pro Nacht · ist Frühstück inbegriffen?</li>
                       <li>WLAN: was kostet es pro Tag?</li>
                       <li>Konferenzraum für 5–10 Personen, <strong>6. Juli, 11:30–16:00</strong>, max. £150</li>
                       <li>Wellness-Bereich: was kostet er?</li>
                       <li>Hotel nahe dem <strong>National Exhibition Centre (NEC)</strong></li>
                       <li>Bestätigung an hermann.kiesbauer@kiesbauer-in-gelsenkirchen.de</li>
                     </ul>`
            },
            {
              kicker: "Zwei Hotels im Vergleich",
              title: "Edison oder Dalton?",
              body: `<div class="pair">
                       <div><b>Edison Birmingham Hotel (4*)</b>direkt am NEC · kostenloses Frühstücksbuffet · WLAN auf Anfrage (£4/Tag) · Pool, Sauna · Konferenzräume</div>
                       <div><b>The Dalton Hotel (5*)</b>fünf Meilen vom NEC · kostenloses WLAN · Spa mit Jacuzzi · 12 Tagungsräume · Stadtzentrum</div>
                     </div>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "Buchen: Wunsch, Preis, Extras, Bestätigung.",
              body: `<p>I’d like to book … · rate · included · confirmation</p>`
            }
          ]
        },
        {
          type: "quiz",
          title: "A1 · Verstehen",
          questions: [
            {
              q: "Dr Kiesbauer arrives on 3 July and leaves on 7 July. How many nights is that?",
              options: ["4", "5", "3"],
              answer: 0,
              explain: "Vom 3. bis 7. Juli sind es vier Nächte."
            },
            {
              q: "The Edison Birmingham Hotel is …",
              options: ["right next to the NEC", "five miles from the NEC", "in London"],
              answer: 0,
              explain: "Das Edison liegt direkt am NEC – ideal für den Kongress."
            },
            {
              q: "What does “en suite bathroom” mean?",
              options: ["mit anschließendem (eigenen) Badezimmer", "ein Gemeinschaftsbad auf dem Flur", "eine Dusche ohne WC"],
              answer: 0,
              explain: "en suite = das eigene Bad gehört zum Zimmer."
            },
            {
              q: "What does “rate” mean?",
              hint: "Es geht ums Geld pro Nacht.",
              options: ["(Zimmer-)Preis", "Buchungsgebühr", "Reise"],
              answer: 0,
              explain: "rate = der Zimmerpreis (pro Nacht)."
            }
          ]
        },
        {
          type: "sort",
          title: "A2 · welches Hotel?",
          prompt: "Zu welchem Hotel gehört die Angabe?",
          hints: ["Lies die zwei Kurzbeschreibungen genau.", "Edison = direkt am NEC; Dalton = 5 Meilen weg, kostenloses WLAN."],
          categories: ["Edison Birmingham Hotel", "The Dalton Hotel"],
          items: [
            { text: "right next to the NEC", cat: 0 },
            { text: "free breakfast buffet", cat: 0 },
            { text: "WiFi at £4 per day", cat: 0 },
            { text: "five miles from the NEC", cat: 1 },
            { text: "free WiFi", cat: 1 },
            { text: "spa with a jacuzzi", cat: 1 }
          ]
        },
        {
          type: "cloze",
          title: "A3 · Buchungs-Vokabular",
          prompt: "Drei Wörter passen nicht.",
          hints: ["Es geht ums Buchen, den Preis, Inbegriffenes und die Bestätigung.", "“to … a room”, “rate”, “included”, “confirmation”."],
          text: "I’d like to {book} a single room with an en suite bathroom for my boss. Could you tell me the {rate} per night? Is breakfast {included} in the price? When would you send the booking {confirmation}?",
          distractors: ["sell", "bill", "question"]
        },
        {
          type: "sentence",
          title: "A4 · Zimmer buchen",
          case: "Wähle in jedem Kasten den richtigen Baustein.",
          text: "Good morning. {*This is|Here is|It is} Sandra Berger from Dr Kiesbauer’s surgery in Düsseldorf. {*I’d like to book|I book|I want book} a single room for my boss. {*Is breakfast included|Breakfast is included|Includes breakfast} in the price?",
          explain: "Höflich buchen: “This is …”, “I’d like to book …”, “Is breakfast included …?”"
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann ein Hotelzimmer am Telefon buchen.",
            "Ich kenne das wichtigste Hotel-Vokabular (rate, en suite, confirmation).",
            "Ich kann nach Preisen, Extras und einer Bestätigung fragen."
          ]
        }
      ]
    },

    /* ══════════════ 7 · LERNKARTEN (VOKABELTRAINER) ══════════════ */
    {
      id: "lernkarten",
      group: "Wiederholen",
      title: "Lernkarten: Telephoning",
      kicker: "Wiederholen · Vokabeltrainer",
      minutes: 10,
      help: `<h3>So lernst du mit den Karten</h3>
             <p>Überlege dir zuerst die englische Lösung, tippe dann zum Umdrehen. Ehrlich bleiben: „Nochmal“ legt die Karte nach hinten – so wiederholst du genau das, was du noch nicht kannst.</p>
             <p class="note">Tipp: Lieber jeden Tag 10 Minuten als einmal pro Woche eine Stunde.</p>`,
      steps: [
        {
          type: "cards",
          title: "DE → EN: Redemittel und Vokabeln",
          cards: [
            { front: "Guten Morgen, wie kann ich Ihnen helfen?", back: "Good morning, how can I help you?" },
            { front: "Hier spricht Peter Clark von Supercars Ltd. in Manchester.", back: "This is Peter Clark of Supercars Ltd. in Manchester." },
            { front: "Darf ich bitte fragen, mit wem ich spreche?", back: "May I ask who I am speaking with, please?" },
            { front: "Darf ich bitte fragen, wer anruft?", back: "May I ask who is calling, please?" },
            { front: "Ich möchte gerne mit Mr Wilkinson sprechen, bitte.", back: "I’d like to speak to Mr Wilkinson, please." },
            { front: "Könnte ich bitte mit Ms Parker sprechen?", back: "Could I speak to Ms Parker, please?" },
            { front: "Bitte bleiben Sie einen Moment dran.", back: "Please hold on for a moment." },
            { front: "Ich stelle Sie jetzt durch. Bitte bleiben Sie am Apparat.", back: "I’m putting you through now. Please hold the line." },
            { front: "Die Leitung ist leider besetzt. Möchten Sie dranbleiben?", back: "I’m sorry, the line is busy. Would you like to hold?" },
            { front: "Tut mir leid, Mr Wilkinson ist im Moment nicht da.", back: "I’m sorry, Mr Wilkinson isn’t in at the moment." },
            { front: "Er ist leider gerade in einem Meeting.", back: "I’m afraid he is in a meeting right now." },
            { front: "Kann ich etwas ausrichten?", back: "Can I take a message?" },
            { front: "Möchten Sie eine Nachricht hinterlassen?", back: "Would you like to leave a message?" },
            { front: "Könnten Sie mir bitte seine Durchwahl geben?", back: "Could you give me his extension, please?" },
            { front: "Könnten Sie ihn bitten, mich um drei zurückzurufen?", back: "Could you ask him to call me back at three, please?" },
            { front: "Es ist dringend.", back: "It’s urgent." },
            { front: "Tut mir leid, das habe ich wegen der schlechten Verbindung nicht verstanden.", back: "I’m sorry, I didn’t catch that because of the bad connection." },
            { front: "Wie kann ich Ihnen behilflich sein?", back: "How can I be of assistance?" },
            { front: "Das ist überhaupt kein Problem.", back: "That’s no problem at all." },
            { front: "Ich werde mich sofort darum kümmern.", back: "I’ll deal with this right away." },
            { front: "Kann ich sonst noch etwas für Sie tun?", back: "Is there anything else I can do for you?" },
            { front: "Vielen Dank für Ihre Hilfe.", back: "Thank you very much for your help." },
            { front: "Sie waren sehr hilfreich. Ich weiß das zu schätzen.", back: "You’ve been most helpful. I appreciate it." },
            { front: "Es war nett, mit Ihnen zu sprechen.", back: "It was nice talking to you." },
            { front: "Ich wünsche Ihnen noch einen schönen Tag. Auf Wiederhören.", back: "I wish you a nice day. Goodbye." },
            { front: "Könnten wir einen Termin vereinbaren?", back: "Could we make an appointment?" },
            { front: "Wann würde es Ihnen passen?", back: "When would be a good time for you?" },
            { front: "Wäre Ihnen Donnerstag, der sechste Juli, recht?", back: "Would Thursday, the sixth of July, suit you?" },
            { front: "Ja, das passt mir gut.", back: "Yes, that suits me fine." },
            { front: "Ich schaue eben in den Terminkalender.", back: "I’ll take a quick look at the diary." },
            { front: "Ich fürchte, das wird leider nicht möglich sein.", back: "I’m afraid that won’t be possible." },
            { front: "Könnten wir 11:30 Uhr daraus machen?", back: "Could we make it 11:30?" },
            { front: "Einzelzimmer", back: "single room" },
            { front: "…mit anschließendem (eigenen) Badezimmer", back: "en suite bathroom" },
            { front: "Reservierung / Buchung", back: "reservation / booking" },
            { front: "Buchungsbestätigung", back: "booking confirmation" },
            { front: "Stornierung", back: "cancellation" },
            { front: "Ankunftstag / Abreisetag", back: "date of arrival / date of departure" },
            { front: "(Zimmer-)Preis", back: "rate" },
            { front: "Wellness-Bereich", back: "spa" },
            { front: "Halbpension / Vollpension", back: "half-board / full-board" },
            { front: "„five – five“ kurz gesagt", back: "double five" },
            { front: "Wann benutzt man das Telefonier-Alphabet?", back: "Wenn die Verbindung schlecht ist und man Namen buchstabieren muss." },
            { front: "Zeichen: @ . - _ / :", back: "at · dot · dash/hyphen · underscore · slash · colon" }
          ]
        }
      ]
    },

    /* ══════════════ 8 · ÜBUNGSKLAUSUR ══════════════ */
    {
      id: "uebungsklausur",
      group: "Klausur",
      title: "Übungsklausur Telephoning",
      kicker: "Klausur · 45 Minuten",
      exam: {
        minutes: 45,
        tools: "keine Hilfsmittel",
        // Notenschlüssel HBBK (HS/HH/KA einheitlich): 90 / 76 / 63 / 50 / 30 %
        grading: [[90, "1", "sehr gut"], [76, "2", "gut"], [63, "3", "befriedigend"], [50, "4", "ausreichend"], [30, "5", "mangelhaft"], [0, "6", "ungenügend"]]
      },
      steps: [
        {
          type: "quiz",
          title: "A1 · Höfliches Verhalten",
          points: 6,
          review: "grundlagen",
          questions: [
            {
              q: "Which sentence is the most polite way to ask for Mr Wilkinson?",
              options: ["Could I speak to Mr Wilkinson, please?", "I want to speak to Mr Wilkinson now.", "Give me Mr Wilkinson."],
              answer: 0,
              explain: "Höflich: “Could I … please?”"
            },
            {
              q: "How do you end a business call politely?",
              options: ["It was nice talking to you. Goodbye.", "Bye.", "That’s it. (hang up)"],
              answer: 0,
              explain: "Freundlicher Abschluss mit Dank und Wunsch."
            }
          ]
        },
        {
          type: "sentence",
          title: "A2 · Ein Gespräch korrigieren",
          points: 8,
          review: "redemittel",
          text: "Good morning. {*This is|Here is|It is} Jenny Meier from Dr Kiesbauer’s surgery. {*Could I speak|I want|I must} to Mr Wilkinson, please? … I’m afraid he is out. {*Can I take|Can I give|Can I say} a message for you?",
          explain: "Höflich vorstellen, höflich fragen, Nachricht anbieten: “Can I take a message?”"
        },
        {
          type: "sort",
          title: "A3 · Gesprächsphasen",
          points: 6,
          review: "redemittel",
          prompt: "Ordne jede Formulierung der passenden Phase zu.",
          categories: ["Answering the phone", "Taking a message"],
          items: [
            { text: "Dr Kiesbauer’s office. How can I help you?", cat: 0 },
            { text: "May I ask who is calling, please?", cat: 0 },
            { text: "I’m afraid he is in a meeting.", cat: 1 },
            { text: "Would you like to leave a message?", cat: 1 }
          ]
        },
        {
          type: "cloze",
          title: "A4 · Termin am Telefon",
          points: 8,
          review: "termine",
          text: "Mr Wilkinson could meet Dr Kiesbauer on {Thursday} the sixth of July at {half} three in the afternoon. “Half three” means 3:{30}.",
          distractors: ["Monday"]
        },
        {
          type: "quiz",
          title: "A5 · Buchstabieren und Nummern",
          points: 6,
          review: "buchstabieren",
          questions: [
            {
              q: "Which telephone-alphabet word stands for the letter “R”?",
              options: ["Romeo", "Radio", "River"],
              answer: 0,
              explain: "R – Romeo."
            },
            {
              q: "How do you say “55”?",
              options: ["double five", "five double", "fifty"],
              answer: 0,
              explain: "double five = 55."
            },
            {
              q: "In an email address, “@” is said as …",
              options: ["at", "dot", "dash"],
              answer: 0,
              explain: "at = @."
            }
          ]
        },
        {
          type: "sentence",
          title: "A6 · Hotel buchen",
          points: 8,
          review: "hotel",
          text: "Good morning. {*I’d like to book|I book|I want book} a single room for my boss. {*Is breakfast included|Breakfast included|Includes breakfast} in the price? Could you send the {*confirmation|reservation|cancellation} by email, please?",
          explain: "“I’d like to book …”, “Is breakfast included …?”, “send the confirmation”."
        }
      ]
    }

  ]
});
