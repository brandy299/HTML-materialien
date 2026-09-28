/* ============================================================
   KURS: Englisch · Förderkurs (FE)
   Grammar Basics: simple present · present progressive · simple past
   · present perfect · past progressive · will / going to · Zeitformen-Mix
   Zielniveau A2 → B1. Erklärungen auf Deutsch, Aufgaben auf Englisch.
   Beispielwelt: Harry Potter (eigene Sätze, kein Buchtext).
   Aufbau und alle Aufgabentypen: app/README.md
   ============================================================ */

LERNRAUM.subjects.push({
  id: "englisch-foerderkurs",
  fach: "Englisch",
  added: "2026-09-28",
  updated: "2026-09-28",
  name: "Förderkurs Englisch",
  course: "Förderkurs Englisch · FE",
  glyph: "E",
  color: "#7c3aed",
  description: "Grammatik-Grundlagen mit Beispielen aus Harry Potter: simple present, present progressive, simple past, present perfect, past progressive sowie will und going to. Erklärungen auf Deutsch, Übungen auf Englisch – Schritt für Schritt auf B1.",
  topics: [

    /* ══════════════ ZEITFORM 1 · SIMPLE PRESENT ══════════════ */
    {
      id: "simple-present",
      group: "Zeitformen",
      title: "Simple Present",
      kicker: "Grammar Basics · Zeitform 1",
      minutes: 18,
      help: `<h3>Simple Present</h3>
             <p class="formula">I / you / we / they + Verb<br>he / she / it + Verb + s</p>
             <h3>Wann?</h3>
             <ul><li>Gewohnheiten und Routinen: every day, always</li>
             <li>Fakten: Hogwarts has four houses.</li></ul>
             <h3>Fragen und Verneinung</h3>
             <p>do / does + Grundform: Do you …? · Does Harry …? · don’t / doesn’t</p>
             <h3>Häufige Fehler</h3>
             <ul><li>„Harry live …“ → Harry <strong>lives</strong> …</li>
             <li>„Does Harry lives …?“ → Does Harry <strong>live</strong> …?</li></ul>`,
      steps: [
        {
          type: "slides",
          title: "Worum geht's?",
          slides: [
            {
              style: "dark",
              kicker: "Förderkurs Englisch · Zeitform 1",
              title: "Jeden Tag. Immer wieder. Das ist das Simple Present.",
              body: `<p>“Hermione <strong>reads</strong> before breakfast.”</p>
                     <p>“Hogwarts <strong>has</strong> four houses.”</p>
                     <p>Etwas passiert <strong>regelmäßig</strong> oder ist einfach ein <strong>Fakt</strong>.</p>`
            },
            {
              kicker: "Lernziel",
              title: "Ich kann über <mark>Gewohnheiten</mark> und <mark>Fakten</mark> sprechen.",
              body: `<p class="box"><strong>Simple Present</strong> = was immer oder regelmäßig passiert.</p>`
            },
            {
              kicker: "So ist es gebaut",
              title: "Nur he / she / it bekommt ein -s.",
              body: `<dl class="terms">
                       <dt>I / you / we / they</dt><dd>Verb in der Grundform: I <strong>play</strong>, they <strong>read</strong>.</dd>
                       <dt>he / she / it</dt><dd>Verb + s: he <strong>plays</strong>, she <strong>reads</strong>, it <strong>goes</strong>.</dd>
                     </dl>`
            },
            {
              kicker: "Fragen und Verneinung",
              title: "do / does + Grundform.",
              body: `<p class="formula">Do you like …? · Does Harry live …?</p>
                     <p class="formula">I don’t like … · Ron doesn’t like …</p>
                     <p class="note">Nach do / does steht immer die Grundform – ohne -s!</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "he / she / it → + s",
              body: `<p>Fragen: Do …? / Does …? · Verneinung: don’t / doesn’t.</p>`
            }
          ]
        },
        {
          type: "quiz",
          title: "A1 · Verstehen",
          questions: [
            {
              q: "Which sentence is correct?",
              options: ["Harry live at Hogwarts.", "Harry lives at Hogwarts.", "Harry living at Hogwarts."],
              answer: 1,
              explain: "he / she / it → Verb + s. Also: Harry lives."
            },
            {
              q: "Choose the right form: Ron ____ spiders.",
              hint: "he / she / it → + s, und die Verneinung mit doesn’t.",
              options: ["don’t like", "doesn’t like", "doesn’t likes"],
              answer: 1,
              explain: "Nach doesn’t steht die Grundform: doesn’t like."
            },
            {
              q: "Make a question: ____ Hermione study every day?",
              options: ["Do", "Does", "Is"],
              answer: 1,
              explain: "Bei he / she / it bildest du Fragen mit Does + Grundform."
            },
            {
              q: "They ____ football on Saturdays.",
              hint: "They ist wie I / you / we – keine -s.",
              options: ["plays", "play", "playing"],
              answer: 1,
              explain: "Bei I / you / we / they steht die Grundform: they play."
            }
          ]
        },
        {
          type: "sort",
          title: "A2 · + s oder Grundform?",
          prompt: "Welche Form passt?",
          hints: ["Nur he / she / it bekommt ein -s.", "Bei I / you / we / they bleibt das Verb in der Grundform."],
          categories: ["he/she/it: + s", "I/you/we/they: Grundform"],
          items: [
            { text: "he plays", cat: 0 },
            { text: "she studies", cat: 0 },
            { text: "it catches", cat: 0 },
            { text: "I play", cat: 1 },
            { text: "we study", cat: 1 },
            { text: "they watch", cat: 1 }
          ]
        },
        {
          type: "cloze",
          title: "A3 · Regel sichern",
          prompt: "Drei Wörter passen nicht.",
          hints: ["Vor dem Verb steht das Hilfsverb: do oder does.", "Bei he / she / it kommt ans Verb ein -s."],
          text: "Bei he / she / it bekommt das Verb ein {s}. Beispiel: “Harry {lives} at Hogwarts.” Fragen bildest du mit {does} + Grundform, die Verneinung mit {doesn’t}. Bei I / you / we / they nimmst du {do}.",
          distractors: ["is", "are", "did"]
        },
        {
          type: "sentence",
          title: "A4 · Sätze bauen",
          case: "Wähle in jedem Kasten den richtigen Baustein.",
          text: "Harry {*lives|live|living} at Hogwarts. He {*plays|play|playing} Quidditch every Saturday. Hermione {*studies|study|studying} every day.",
          explain: "he / she / it → Verb + s: lives, plays, studies."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann über Gewohnheiten und Fakten im Simple Present sprechen.",
            "Ich weiß, dass he / she / it ein -s bekommt.",
            "Ich kann Fragen mit do / does bilden."
          ]
        }
      ]
    },

    /* ══════════════ ZEITFORM 2 · PRESENT PROGRESSIVE ══════════════ */
    {
      id: "present-progressive",
      group: "Zeitformen",
      title: "Present Progressive",
      kicker: "Grammar Basics · Zeitform 2",
      minutes: 18,
      help: `<h3>Present Progressive</h3>
             <p class="formula">am / is / are + Verb-ing</p>
             <h3>Wann?</h3>
             <ul><li>jetzt gerade: Look! Harry is flying.</li>
             <li>vorübergehend: this week</li></ul>
             <h3>Simple Present oder Progressive?</h3>
             <p>Gewohnheit → Simple Present. Jetzt gerade → Progressive.</p>
             <h3>Zustandsverben</h3>
             <p>know, like, want … bleiben im Simple Present (kein -ing).</p>`,
      steps: [
        {
          type: "slides",
          title: "Worum geht's?",
          slides: [
            {
              style: "dark",
              kicker: "Förderkurs Englisch · Zeitform 2",
              title: "Schau! Genau jetzt passiert etwas.",
              body: `<p>“Look! Harry <strong>is flying</strong> on his broom right now.”</p>
                     <p>Nicht jeden Tag – sondern <strong>gerade jetzt</strong>.</p>`
            },
            {
              kicker: "Lernziel",
              title: "Ich kann sagen, was <mark>gerade jetzt</mark> passiert.",
              body: `<p class="box">Present Progressive = es passiert im Moment des Sprechens.</p>`
            },
            {
              kicker: "So ist es gebaut",
              title: "am / is / are + Verb-ing.",
              body: `<dl class="terms">
                       <dt>I</dt><dd>am + -ing: I <strong>am reading</strong>.</dd>
                       <dt>he / she / it</dt><dd>is + -ing: he <strong>is flying</strong>.</dd>
                       <dt>you / we / they</dt><dd>are + -ing: they <strong>are sitting</strong>.</dd>
                     </dl>`
            },
            {
              kicker: "Der Unterschied",
              title: "Gewohnheit oder jetzt?",
              body: `<div class="pair">
                       <div><b>Simple Present</b>Gewohnheit: Harry <strong>plays</strong> Quidditch every Saturday.</div>
                       <div><b>Present Progressive</b>jetzt: Look! Harry <strong>is playing</strong> Quidditch now.</div>
                     </div>
                     ${zeitstrahl([
                       { at: 20, label: "every Saturday", text: "He plays.", also: [8, 32, 68, 80, 92] },
                       { at: 50, label: "now", text: "He is playing.", hi: true, from: 43, to: 57 }
                     ])}`
            },
            {
              kicker: "Achtung",
              title: "Zustandsverben bleiben im Simple Present.",
              body: `<p>know, like, love, want, need, understand, see</p>
                     <p class="note">Nicht „I am knowing“ – sondern „I <strong>know</strong>“.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "am / is / are + Verb-ing = jetzt gerade",
              body: `<p>Signalwörter: now, right now, at the moment, Look!, Listen!</p>`
            }
          ]
        },
        {
          type: "quiz",
          title: "A1 · Verstehen",
          questions: [
            {
              q: "Which sentence is happening right now?",
              options: ["Harry plays Quidditch.", "Harry is playing Quidditch now.", "Harry played Quidditch yesterday."],
              answer: 1,
              explain: "„now“ und „is playing“ zeigen: es passiert gerade jetzt."
            },
            {
              q: "Ron ____ to the teacher at the moment.",
              hint: "at the moment → Progressive; Verneinung: isn’t.",
              options: ["doesn’t listen", "isn’t listening", "not listens"],
              answer: 1,
              explain: "at the moment → is + -ing; Verneinung: isn’t listening."
            },
            {
              q: "I ____ a book right now.",
              options: ["am reading", "read", "reads"],
              answer: 0,
              explain: "right now → Progressive. Bei I: am + -ing = am reading."
            },
            {
              q: "Which verb is a state verb (no -ing)?",
              hint: "Zustandsverben beschreiben keinen Vorgang.",
              options: ["run", "know", "fly"],
              answer: 1,
              explain: "know ist ein Zustandsverb – also „I know“, nicht „I am knowing“."
            }
          ]
        },
        {
          type: "sort",
          title: "A2 · jetzt oder Gewohnheit?",
          prompt: "Zu welcher Zeitform gehört der Satz?",
          hints: ["Look!, now, at the moment → Progressive.", "every day, on Saturdays → Simple Present."],
          categories: ["jetzt (Present Progressive)", "Gewohnheit (Simple Present)"],
          items: [
            { text: "Look! Harry is flying on his broom.", cat: 0 },
            { text: "The students are sitting in the Great Hall.", cat: 0 },
            { text: "I am reading right now.", cat: 0 },
            { text: "Hermione reads every evening.", cat: 1 },
            { text: "Ron watches Quidditch on Saturdays.", cat: 1 },
            { text: "We play Quidditch on Mondays.", cat: 1 }
          ]
        },
        {
          type: "cloze",
          title: "A3 · Regel sichern",
          prompt: "Drei Wörter passen nicht.",
          hints: ["Bei I → am, bei he/she/it → is, bei you/we/they → are.", "Zustandsverben wie know bleiben im Simple Present."],
          text: "Look! Harry {is} flying on his broom. The students {are} sitting in the Great Hall. I {am} reading a book. Bei Zustandsverben wie know bleibt es aber im Simple Present: I {know} the answer.",
          distractors: ["knows", "was", "be"]
        },
        {
          type: "sentence",
          title: "A4 · Sätze bauen",
          case: "Wähle in jedem Kasten den richtigen Baustein.",
          text: "Look! Harry {*is|are|am} flying on his broom. The students {*are|is|am} sitting in the Great Hall. I {*am|is|are} reading a book.",
          explain: "I → am, he/she/it → is, you/we/they → are."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann sagen, was gerade jetzt passiert.",
            "Ich kann am / is / are + -ing richtig bilden.",
            "Ich kenne Zustandsverben, die kein -ing bekommen."
          ]
        }
      ]
    },

    /* ══════════════ ZEITFORM 3 · SIMPLE PAST ══════════════ */
    {
      id: "simple-past",
      group: "Zeitformen",
      title: "Simple Past",
      kicker: "Grammar Basics · Zeitform 3",
      minutes: 18,
      help: `<h3>Simple Past</h3>
             <p class="formula">regelmäßig: Verb + ed<br>unregelmäßig: eigene Form (go → went)</p>
             <h3>Fragen und Verneinung</h3>
             <p>did / didn’t + Grundform: Did you …? · He didn’t go.</p>
             <h3>Wichtigste unregelmäßige Verben</h3>
             <p>go → went · see → saw · take → took · find → found · have → had · be → was/were</p>
             <h3>Häufiger Fehler</h3>
             <p>„Harry didn’t went …“ → Harry didn’t <strong>go</strong> …</p>`,
      steps: [
        {
          type: "slides",
          title: "Worum geht's?",
          slides: [
            {
              style: "dark",
              kicker: "Förderkurs Englisch · Zeitform 3",
              title: "Gestern. Letztes Jahr. In 1991.",
              body: `<p>“Harry <strong>received</strong> his letter in 1991.”</p>
                     <p>“They <strong>went</strong> to Hogsmeade last weekend.”</p>
                     <p>Etwas ist in der Vergangenheit passiert und <strong>abgeschlossen</strong>.</p>`
            },
            {
              kicker: "Lernziel",
              title: "Ich kann über die <mark>Vergangenheit</mark> erzählen.",
              body: `<p class="box"><strong>Simple Past</strong> = abgeschlossene Handlung in der Vergangenheit.</p>`
            },
            {
              kicker: "So ist es gebaut",
              title: "regelmäßig + ed · unregelmäßig eigene Form.",
              body: `<dl class="terms">
                       <dt>regelmäßig</dt><dd>Verb + ed: work → <strong>worked</strong>, visit → <strong>visited</strong>.</dd>
                       <dt>unregelmäßig</dt><dd>eigene Form lernen: go → <strong>went</strong>, see → <strong>saw</strong>, take → <strong>took</strong>.</dd>
                     </dl>`
            },
            {
              kicker: "Fragen und Verneinung",
              title: "did / didn’t + Grundform.",
              body: `<p class="formula">Did you meet Hagrid?</p>
                     <p class="formula">Harry didn’t go to Hogwarts.</p>
                     <p class="note">Nach did / didn’t steht die Grundform – nie die 2. Form!</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "regelmäßig → + ed   ·   did / didn’t + Grundform",
              body: `<p>Signalwörter: yesterday, last week, in 1991, two days ago, then.</p>`
            }
          ]
        },
        {
          type: "quiz",
          title: "A1 · Verstehen",
          questions: [
            {
              q: "Choose the past form: Harry ____ his letter in 1991.",
              options: ["receive", "received", "receives"],
              answer: 1,
              explain: "in 1991 → Simple Past; regelmäßig: receive + ed = received."
            },
            {
              q: "Which sentence is correct?",
              options: ["Harry didn’t went to Hogwarts.", "Harry didn’t go to Hogwarts.", "Harry didn’t goes to Hogwarts."],
              answer: 1,
              explain: "Nach didn’t steht die Grundform: didn’t go."
            },
            {
              q: "The past form of “go” is …",
              options: ["goed", "went", "gone"],
              answer: 1,
              explain: "go ist unregelmäßig: go → went."
            },
            {
              q: "They ____ to Hogsmeade last weekend.",
              hint: "last weekend → Simple Past.",
              options: ["go", "went", "goes"],
              answer: 1,
              explain: "last weekend → Simple Past; go → went."
            }
          ]
        },
        {
          type: "sort",
          title: "A2 · regelmäßig oder unregelmäßig?",
          prompt: "Wie bildet man die Vergangenheit?",
          hints: ["regelmäßig → + ed.", "unregelmäßig → eigene Form, keine Regel."],
          categories: ["regelmäßig (+ ed)", "unregelmäßig"],
          items: [
            { text: "played", cat: 0 },
            { text: "visited", cat: 0 },
            { text: "studied", cat: 0 },
            { text: "went", cat: 1 },
            { text: "saw", cat: 1 },
            { text: "took", cat: 1 }
          ]
        },
        {
          type: "cloze",
          title: "A3 · Regel sichern",
          prompt: "Drei Wörter passen nicht.",
          hints: ["in 1991 und last summer → Simple Past.", "find ist unregelmäßig: find → found.", "Fragen im Past: did + Grundform."],
          text: "Harry {received} his letter in 1991. Ron and Harry {went} to the World Cup last summer. Hermione {found} the answer in a book. Fragen bildest du mit {did} + Grundform.",
          distractors: ["goes", "find", "does"]
        },
        {
          type: "sentence",
          title: "A4 · Sätze bauen",
          case: "Wähle in jedem Kasten den richtigen Baustein.",
          text: "Harry {*received|receive|receives} his letter in 1991. They {*went|go|goed} to Hogsmeade last weekend. Snape {*took|take|taken} points from Gryffindor.",
          explain: "regelmäßig: received · unregelmäßig: went, took."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann über die Vergangenheit erzählen.",
            "Ich kann regelmäßige und unregelmäßige Formen bilden.",
            "Ich kann Fragen und Verneinungen mit did bilden."
          ]
        }
      ]
    },

    /* ══════════════ ZEITFORM 4 · PRESENT PERFECT ══════════════ */
    {
      id: "present-perfect",
      group: "Zeitformen",
      title: "Present Perfect",
      kicker: "Grammar Basics · Zeitform 4",
      minutes: 18,
      help: `<h3>Present Perfect</h3>
             <p class="formula">have / has + 3. Form (past participle)</p>
             <h3>Wann?</h3>
             <ul><li>Das Ergebnis ist jetzt wichtig: I have lost my wand.</li>
             <li>Erfahrung bis jetzt: Have you ever seen a dragon?</li>
             <li>Gerade passiert: Harry has just arrived.</li></ul>
             <h3>Signalwörter</h3>
             <p>already, just, yet, ever, never, so far</p>
             <h3>Simple Past oder Present Perfect?</h3>
             <p>Genaue Zeit vorbei (yesterday, in 1991, last week) → Simple Past. Keine genaue Zeit und Bezug zu jetzt → Present Perfect.</p>
             <h3>Häufige Fehler</h3>
             <ul><li>„He has went …“ → He has <strong>gone</strong> …</li>
             <li>„Yesterday I have seen …“ → Yesterday I <strong>saw</strong> …</li></ul>`,
      steps: [
        {
          type: "slides",
          title: "Worum geht's?",
          slides: [
            {
              style: "dark",
              kicker: "Förderkurs Englisch · Zeitform 4",
              title: "Passiert – und jetzt ist es wichtig.",
              body: `<p>“Harry <strong>has lost</strong> his wand.”</p>
                     <p>“Hermione <strong>has</strong> already <strong>finished</strong> her homework.”</p>
                     <p>Die Handlung ist vorbei, doch das <strong>Ergebnis zählt jetzt</strong>.</p>`
            },
            {
              kicker: "Lernziel",
              title: "Ich kann über Erlebnisse und Ergebnisse sprechen.",
              body: `<p class="box"><strong>Present Perfect</strong> = Vergangenheit mit Bezug zur Gegenwart.</p>`
            },
            {
              kicker: "So ist es gebaut",
              title: "have / has + 3. Form.",
              body: `<dl class="terms">
                       <dt>I / you / we / they</dt><dd>have + 3. Form: I <strong>have visited</strong>, they <strong>have gone</strong>.</dd>
                       <dt>he / she / it</dt><dd>has + 3. Form: he <strong>has visited</strong>, she <strong>has written</strong>.</dd>
                     </dl>`
            },
            {
              kicker: "Der Unterschied",
              title: "Simple Past oder Present Perfect?",
              body: `<div class="pair">
                       <div><b>Simple Past</b>genaue Zeit vorbei: Snape <strong>took</strong> points yesterday.</div>
                       <div><b>Present Perfect</b>Ergebnis jetzt: Snape <strong>has just taken</strong> points.</div>
                     </div>
                     ${zeitstrahl([
                       { at: 14, label: "yesterday", text: "He took points." },
                       { at: 50, label: "just", text: "He has just taken points.", hi: true, from: 36, to: 50 }
                     ])}`
            },
            {
              kicker: "Signalwörter",
              title: "already, just, yet, ever, never.",
              body: `<p>already / just stehen nach have / has: I have <strong>just</strong> finished.</p>
                     <p class="note">yet steht am Satzende: He has not finished <strong>yet</strong>.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "have / has + 3. Form",
              body: `<p>Signalwörter: already, just, yet, ever, never. Genaue Zeit (yesterday) → Simple Past.</p>`
            }
          ]
        },
        {
          type: "quiz",
          title: "A1 · Verstehen",
          questions: [
            {
              q: "Which sentence is in the Present Perfect?",
              options: ["Hermione finished her homework yesterday.", "Hermione has just finished her homework.", "Hermione is finishing her homework now."],
              answer: 1,
              explain: "has + 3. Form, und just zeigt: gerade passiert, Ergebnis jetzt."
            },
            {
              q: "Harry ____ his wand. He can't find it.",
              hint: "Das Ergebnis zählt jetzt: Er hat ihn gerade nicht.",
              options: ["lost", "has lost", "loses"],
              answer: 1,
              explain: "Ergebnis jetzt wichtig → Present Perfect: has lost."
            },
            {
              q: "Choose the right form: Ron has ____ his broom.",
              options: ["broke", "broken", "break"],
              answer: 1,
              explain: "Nach have / has steht die 3. Form: break → broken."
            },
            {
              q: "Which word is a signal for the Present Perfect?",
              hint: "Eine genaue Zeit in der Vergangenheit gehört zum Simple Past.",
              options: ["yesterday", "already", "last week"],
              answer: 1,
              explain: "already ist ein Signalwort für das Present Perfect."
            }
          ]
        },
        {
          type: "sort",
          title: "A2 · Present Perfect oder Simple Past?",
          prompt: "Zu welcher Zeitform gehört der Satz?",
          hints: ["already, just, never → Present Perfect.", "yesterday, last week, in 1991 → Simple Past."],
          categories: ["Present Perfect", "Simple Past"],
          items: [
            { text: "Hermione has already read the book.", cat: 0 },
            { text: "Harry has just seen a dragon.", cat: 0 },
            { text: "They have never visited Hogsmeade.", cat: 0 },
            { text: "Snape took points yesterday.", cat: 1 },
            { text: "We saw Hagrid last week.", cat: 1 },
            { text: "Ron wrote a letter in 1991.", cat: 1 }
          ]
        },
        {
          type: "cloze",
          title: "A3 · Regel sichern",
          prompt: "Drei Wörter passen nicht.",
          hints: ["have / has + 3. Form: go → gone, see → seen.", "yesterday → Simple Past, nicht Present Perfect."],
          text: "Harry {has} just lost his wand. Hermione and Ron {have} already finished their homework. Harry has never {seen} a dragon. He has not found his wand {yet}. Yesterday he {saw} a Hippogriff in the forest.",
          distractors: ["gone", "did", "was"]
        },
        {
          type: "sentence",
          title: "A4 · Sätze bauen",
          case: "Wähle in jedem Kasten den richtigen Baustein.",
          text: "Harry {*has|have|is} just lost his wand. Hermione and Ron {*have|has|are} already finished their homework. He has never {*seen|saw|sees} a dragon. But yesterday Snape {*took|has took|has taken} points from Gryffindor.",
          explain: "just und already → Present Perfect (has / have + 3. Form). yesterday → Simple Past: took."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann das Present Perfect mit have / has + 3. Form bilden.",
            "Ich kenne die Signalwörter already, just, yet, ever, never.",
            "Ich kann Present Perfect und Simple Past unterscheiden."
          ]
        }
      ]
    },

    /* ══════════════ ZEITFORM 5 · PAST PROGRESSIVE ══════════════ */
    {
      id: "past-progressive",
      group: "Zeitformen",
      title: "Past Progressive",
      kicker: "Grammar Basics · Zeitform 5",
      minutes: 18,
      help: `<h3>Past Progressive</h3>
             <p class="formula">was / were + Verb-ing</p>
             <h3>Wann?</h3>
             <ul><li>Eine Handlung war gerade im Gange: At eight o’clock last night I was reading.</li>
             <li>Hintergrund, während etwas anderes passierte: I was reading when the owl arrived.</li></ul>
             <h3>Signalwörter</h3>
             <p>while, at eight o’clock last night, at this time yesterday</p>
             <h3>Simple Past oder Past Progressive?</h3>
             <p>Die laufende Handlung (Hintergrund) → Past Progressive. Die kurze Unterbrechung → Simple Past.</p>
             <h3>Häufige Fehler</h3>
             <ul><li>„I was read …“ → I was <strong>reading</strong> …</li>
             <li>„We was …“ → We <strong>were</strong> …</li></ul>`,
      steps: [
        {
          type: "slides",
          title: "Worum geht's?",
          slides: [
            {
              style: "dark",
              kicker: "Förderkurs Englisch · Zeitform 5",
              title: "Es lief gerade – zu einem Zeitpunkt in der Vergangenheit.",
              body: `<p>“At eight o’clock last night Hermione <strong>was reading</strong> in the library.”</p>
                     <p>“The students <strong>were sitting</strong> in the Great Hall.”</p>
                     <p>Die Handlung war <strong>gerade im Gange</strong>.</p>`
            },
            {
              kicker: "Lernziel",
              title: "Ich kann sagen, was gerade lief, als etwas anderes passierte.",
              body: `<p class="box"><strong>Past Progressive</strong> = eine Handlung war im Gange (Hintergrund).</p>`
            },
            {
              kicker: "So ist es gebaut",
              title: "was / were + Verb-ing.",
              body: `<dl class="terms">
                       <dt>I / he / she / it</dt><dd>was + -ing: I <strong>was reading</strong>, he <strong>was flying</strong>.</dd>
                       <dt>you / we / they</dt><dd>were + -ing: you <strong>were talking</strong>, they <strong>were sitting</strong>.</dd>
                     </dl>`
            },
            {
              kicker: "Der Unterschied",
              title: "Hintergrund oder Unterbrechung?",
              body: `<div class="pair">
                       <div><b>Past Progressive</b>Hintergrund: I <strong>was reading</strong>.</div>
                       <div><b>Simple Past</b>Unterbrechung: when the owl <strong>arrived</strong>.</div>
                     </div>
                     ${zeitstrahl([
                       { at: 16, label: "while / at 8 pm", text: "I was reading.", from: 6, to: 34 },
                       { at: 26, label: "when", text: "The owl arrived.", hi: true }
                     ])}
                     <p class="formula">while + Past Progressive · when + Simple Past</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "was / were + Verb-ing = war gerade im Gange",
              body: `<p>Signalwörter: while, at eight o’clock last night, at this time yesterday.</p>`
            }
          ]
        },
        {
          type: "quiz",
          title: "A1 · Verstehen",
          questions: [
            {
              q: "Which sentence is in the Past Progressive?",
              options: ["Harry played Quidditch yesterday.", "Harry was playing Quidditch at eight o’clock last night.", "Harry is playing Quidditch now."],
              answer: 1,
              explain: "was + -ing zeigt: die Handlung war gerade im Gange."
            },
            {
              q: "At this time yesterday I ____ for the exam.",
              hint: "at this time yesterday → Past Progressive.",
              options: ["studied", "was studying", "am studying"],
              answer: 1,
              explain: "at this time yesterday → was + -ing: was studying."
            },
            {
              q: "The students ____ in the Great Hall at eight o’clock last night.",
              options: ["was sitting", "were sitting", "sat"],
              answer: 1,
              explain: "they / we → were + -ing: were sitting."
            },
            {
              q: "____ I was reading, the owl arrived.",
              hint: "Vor einem ganzen Satz (I was reading) steht das Wort, das den Hintergrund einleitet.",
              options: ["While", "During", "Between"],
              answer: 0,
              explain: "Vor einem ganzen Satz steht while. During braucht ein Nomen (during the lesson)."
            }
          ]
        },
        {
          type: "sort",
          title: "A2 · welche Form ist das?",
          prompt: "Welche Form ist das?",
          hints: ["was / were + -ing → Past Progressive (Hintergrund).", "Eine kurze Handlung ohne -ing → Simple Past."],
          categories: ["Past Progressive", "Simple Past"],
          items: [
            { text: "was reading", cat: 0 },
            { text: "were sitting", cat: 0 },
            { text: "was flying", cat: 0 },
            { text: "arrived", cat: 1 },
            { text: "took", cat: 1 },
            { text: "rang", cat: 1 }
          ]
        },
        {
          type: "cloze",
          title: "A3 · Regel sichern",
          prompt: "Drei Wörter passen nicht.",
          hints: ["I / he / she / it → was, you / we / they → were.", "Die kurze Unterbrechung steht im Simple Past."],
          text: "At eight o’clock last night Hermione {was} reading in the library. Harry and Ron {were} playing chess in the common room. While they were playing, Hedwig suddenly {arrived} with a letter from Hogwarts.",
          distractors: ["is", "arrive", "reads"]
        },
        {
          type: "sentence",
          title: "A4 · Sätze bauen",
          case: "Wähle in jedem Kasten den richtigen Baustein.",
          text: "At eight o’clock last night Harry {*was|were|is} flying on his broom. The students {*were|was|are} sitting in the Great Hall. Hermione was reading {*when|while|during} the owl arrived.",
          explain: "was / were + -ing für die laufende Handlung. Die kurze Unterbrechung steht mit when + Simple Past."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann was / were + -ing bilden.",
            "Ich kann sagen, was gerade lief, als etwas anderes passierte.",
            "Ich kann while und when richtig benutzen."
          ]
        }
      ]
    },

    /* ══════════════ ZEITFORM 6 · FUTURE: WILL UND GOING TO ══════════════ */
    {
      id: "will-future",
      group: "Zeitformen",
      title: "Future: will und going to",
      kicker: "Grammar Basics · Zeitform 6",
      minutes: 18,
      help: `<h3>Future: will und going to</h3>
             <p class="formula">will + Grundform · am / is / are going to + Grundform</p>
             <h3>will</h3>
             <ul><li>spontane Entscheidung: The phone is ringing. I will answer it.</li>
             <li>Vorhersage / Vermutung: I think it will rain.</li>
             <li>Angebot / Versprechen: I will help you.</li></ul>
             <h3>going to</h3>
             <ul><li>Plan / Absicht (schon entschieden): We are going to visit Hagrid.</li>
             <li>Vorhersage mit Beweis: Look at the clouds! It is going to rain.</li></ul>
             <h3>Signalwörter</h3>
             <p>will: I think, probably, spontan · going to: Look!, already decided, plan</p>
             <h3>Häufige Fehler</h3>
             <ul><li>„I will to go …“ → I will <strong>go</strong> …</li>
             <li>„He will goes …“ → He will <strong>go</strong> …</li></ul>`,
      steps: [
        {
          type: "slides",
          title: "Worum geht's?",
          slides: [
            {
              style: "dark",
              kicker: "Förderkurs Englisch · Zeitform 6",
              title: "Spontan oder geplant?",
              body: `<p>“The phone is ringing. I <strong>will</strong> answer it!”</p>
                     <p>“We <strong>are going to</strong> visit Diagon Alley. We have already booked the tickets.”</p>
                     <p>Beides ist Zukunft – aber die Entscheidung ist anders.</p>`
            },
            {
              kicker: "Lernziel",
              title: "Ich kann über die Zukunft sprechen: spontan mit will, geplant mit going to.",
              body: `<p class="box"><strong>will</strong> = spontan / Vermutung. <strong>going to</strong> = Plan / Beweis.</p>`
            },
            {
              kicker: "will",
              title: "will + Grundform.",
              body: `<p>Spontane Entscheidung: I <strong>will answer</strong> the phone.</p>
                     <p>Vermutung: I think Harry <strong>will win</strong>.</p>
                     <p class="note">Verneinung: won’t + Grundform – und nie „will to“.</p>`
            },
            {
              kicker: "going to",
              title: "am / is / are going to + Grundform.",
              body: `<p>Plan, der schon feststeht: We <strong>are going to visit</strong> Hagrid.</p>
                     <p>Vorhersage mit Beweis: Look! It <strong>is going to rain</strong>.</p>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "will = spontan · going to = Plan/Beweis",
              body: `<p>Signale: I think, probably → will · Look!, already decided → going to.</p>`
            }
          ]
        },
        {
          type: "quiz",
          title: "A1 · Verstehen",
          questions: [
            {
              q: "The phone is ringing. I ____ answer it.",
              hint: "Es passiert gerade – die Entscheidung fällt im Moment.",
              options: ["will", "am going to", "go"],
              answer: 0,
              explain: "Spontane Entscheidung im Moment → will + Grundform."
            },
            {
              q: "We have already got the tickets. We ____ the match tomorrow.",
              hint: "Der Plan steht schon fest.",
              options: ["will watch", "are going to watch", "watch"],
              answer: 1,
              explain: "Der Plan ist schon entschieden (Tickets gekauft) → are going to watch."
            },
            {
              q: "Look at those black clouds! It ____ rain.",
              hint: "Du siehst den Beweis direkt vor dir.",
              options: ["will", "is going to", "goes"],
              answer: 1,
              explain: "Beweis vor Augen (Look!) → is going to rain."
            },
            {
              q: "Which sentence is correct?",
              options: ["He will goes to Hogwarts.", "He will to go to Hogwarts.", "He will go to Hogwarts."],
              answer: 2,
              explain: "Nach will steht die Grundform ohne to: will go."
            }
          ]
        },
        {
          type: "sort",
          title: "A2 · spontan oder Plan?",
          prompt: "Welche Zeitform passt?",
          hints: ["Spontan, Vermutung, Angebot → will.", "Plan oder Beweis vor Augen → going to."],
          categories: ["will + Grundform", "going to + Grundform"],
          items: [
            { text: "The phone is ringing. I will answer it.", cat: 0 },
            { text: "I think it will snow tomorrow.", cat: 0 },
            { text: "I will help you with your homework.", cat: 0 },
            { text: "We are going to visit Hagrid. We planned it.", cat: 1 },
            { text: "Look at the clouds! It is going to rain.", cat: 1 },
            { text: "She is going to buy a new wand. She has already decided.", cat: 1 }
          ]
        },
        {
          type: "cloze",
          title: "A3 · Regel sichern",
          prompt: "Drei Wörter passen nicht.",
          hints: ["Spontan → will, geplant → going to.", "Verneinung von will: won’t + Grundform."],
          text: "The phone is ringing. I {will} answer it. We have already decided: we {are} {going} to visit Diagon Alley in the summer holidays. Harry is still not sure, so he {won’t} come with us.",
          distractors: ["is", "was", "went"]
        },
        {
          type: "sentence",
          title: "A4 · Sätze bauen",
          case: "Wähle in jedem Kasten den richtigen Baustein.",
          text: "The phone is ringing. I {*will|am going to|go} answer it. We have already bought the tickets, so we {*are going to|will|go} watch the match. Look at the clouds! It {*is going to|will|goes} rain.",
          explain: "Spontan (Telefon klingelt) → will. Plan (Tickets gekauft) → going to. Beweis (Look!) → going to."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann spontane Entscheidungen mit will ausdrücken.",
            "Ich kann Pläne mit going to ausdrücken.",
            "Ich kann will und going to mit ihren Signalen unterscheiden."
          ]
        }
      ]
    },

    /* ══════════════ ZEITFORMEN-MIX · ALLE SIEBEN FORMEN ══════════════ */
    {
      id: "zeitformen-mix",
      group: "Zeitformen",
      title: "Zeitformen im Mix",
      kicker: "Grammar Basics · Alle sieben Zeitformen",
      minutes: 15,
      help: `<h3>Alle sieben Zeitformen</h3>
             <ul>
               <li><b>Simple Present</b> – he plays · every day, always</li>
               <li><b>Present Progressive</b> – he is playing · now, at the moment</li>
               <li><b>Simple Past</b> – he played / went · yesterday, last week</li>
               <li><b>Present Perfect</b> – he has played / gone · already, just, yet, never</li>
               <li><b>Past Progressive</b> – he was playing · while, at eight o’clock last night</li>
               <li><b>will-Future</b> – he will play · spontan, Vermutung (I think …)</li>
               <li><b>going to</b> – he is going to play · Plan, Beweis (Look! …)</li>
             </ul>
             ${zeitstrahl([
               { at: 10, label: "yesterday", text: "He played." },
               { at: 26, label: "at 8 last night", text: "He was playing.", from: 20, to: 32 },
               { at: 50, label: "now", text: "He is playing.", hi: true },
               { at: 86, label: "tomorrow", text: "He will play." }
             ], { title: "Zeitformen auf dem Zeitstrahl" })}
             <h3>So findest du die Zeitform</h3>
             <p>1. Signalwort suchen. 2. Zeitform bestimmen. 3. Form richtig bilden.</p>`,
      steps: [
        {
          type: "quiz",
          title: "A1 · Signalwort erkennen",
          questions: [
            {
              q: "Hermione ____ her homework every evening.",
              hint: "every evening → immer wieder.",
              options: ["does", "is doing", "did"],
              answer: 0,
              explain: "every evening → Simple Present: does."
            },
            {
              q: "Look! Harry ____ on his broom.",
              hint: "Look! → genau jetzt.",
              options: ["flies", "is flying", "flew"],
              answer: 1,
              explain: "Look! → Present Progressive: is flying."
            },
            {
              q: "They ____ to Hogsmeade last weekend.",
              hint: "last weekend → abgeschlossen.",
              options: ["go", "have gone", "went"],
              answer: 2,
              explain: "last weekend → Simple Past: went."
            },
            {
              q: "Snape ____ just taken points from Gryffindor.",
              hint: "just → gerade passiert, Ergebnis jetzt.",
              options: ["has", "have", "is"],
              answer: 0,
              explain: "he / she / it → has + 3. Form: has taken."
            },
            {
              q: "At eight o’clock last night the students ____ in the Great Hall.",
              hint: "at eight o’clock last night → war gerade im Gange.",
              options: ["sat", "were sitting", "sit"],
              answer: 1,
              explain: "they → were + -ing: were sitting."
            },
            {
              q: "The fire is going out. I ____ get more wood.",
              hint: "Die Entscheidung fällt genau jetzt.",
              options: ["will", "am going to", "go"],
              answer: 0,
              explain: "Spontane Entscheidung → will: will get."
            }
          ]
        },
        {
          type: "sort",
          title: "A2 · in welche Zeit gehört der Satz?",
          prompt: "Ordne jeden Satz dem Zeitbereich zu.",
          hints: ["Signalwort zuerst suchen.", "Ergebnis jetzt (already, just, ever) → Present Perfect."],
          categories: ["Gegenwart", "Vergangenheit", "Ergebnis jetzt", "Zukunft"],
          items: [
            { text: "Hermione reads every evening.", cat: 0 },
            { text: "Look! Harry is flying on his broom.", cat: 0 },
            { text: "They went to Hogsmeade last week.", cat: 1 },
            { text: "I was reading at eight o’clock last night.", cat: 1 },
            { text: "Ron has just lost his rat.", cat: 2 },
            { text: "Have you ever seen a dragon?", cat: 2 },
            { text: "We will visit Hagrid tomorrow morning.", cat: 3 },
            { text: "She is going to buy a new wand.", cat: 3 }
          ]
        },
        {
          type: "sentence",
          title: "A3 · Mini-Story",
          case: "Wähle in jedem Kasten die richtige Form.",
          text: "Every Saturday Harry {*plays|play|played} Quidditch. Right now he {*is flying|flies|flew} over the pitch. Last week he {*fell|has fallen|falls} from his broom. Since then he {*has practised|practised|practises} every day. At eight o’clock last night he {*was training|trained|trains} alone. Next week he {*will play|plays|played} in the big match. And he {*is going to|will|plays} become captain – he has already decided.",
          explain: "Jedes Signalwort verrät die Zeitform: every Saturday, right now, last week, since then, at eight o’clock last night, next week, already decided."
        }
      ]
    },

    /* ══════════════ TRAINING · ZUFALLSAUFGABEN ══════════════
       Generator in app.js (Creative Director). tenses = Zeitformen mit eigenem Thema.
       going to hat keinen Generator und steht deshalb nicht in der Liste. */
    {
      id: "training-zeitformen",
      group: "Training",
      title: "Endlos-Training Zeitformen",
      kicker: "Zufallsaufgaben",
      drill: "zeitformen",
      tenses: ["simple-present", "present-progressive", "simple-past", "present-perfect", "past-progressive", "will-future"],
      description: "Immer neue Sätze: Signalwort erkennen, richtige Form wählen, Mini-Story bauen. Drei Stufen.",
      steps: [],
      help: `<h3>Signalwörter</h3>
             <ul><li><b>every day, on Mondays, every Saturday</b> → Simple Present: he plays</li>
             <li><b>now, right now, at the moment</b> → Present Progressive: he is playing</li>
             <li><b>yesterday, last week, two days ago</b> → Simple Past: he played</li>
             <li><b>already, just, yet, ever, never</b> → Present Perfect: he has played</li>
             <li><b>while, at eight o’clock last night, at this time yesterday</b> → Past Progressive: he was playing</li>
             <li><b>tomorrow, next week, next summer</b> → will-Future: he will play</li>
             <li><b>Look! …, bereits geplant</b> → going to: he is going to play</li></ul>
             <h3>Fragen und Verneinung</h3>
             <p class="formula">do / does · am / is / are · did · have / has · was / were · will / won’t</p>
             <h3>Zustandsverben</h3>
             <p>know, like, want, need, understand → kein -ing, auch nicht bei „now“.</p>`
    },

    /* ══════════════ WIEDERHOLEN · LERNKARTEN ══════════════ */
    {
      id: "lernkarten",
      group: "Wiederholen",
      title: "Alle Lernkarten",
      kicker: "Wiederholen · Lernkarten",
      minutes: 8,
      steps: [
        {
          type: "cards",
          title: "Lernkarten: Regeln & unregelmäßige Verben",
          cards: [
            { front: "Simple Present – he / she / it", back: "Verb + s: he plays, she studies, it goes." },
            { front: "Simple Present – Frage", back: "Do / Does + Grundform: Does Harry live at Hogwarts?" },
            { front: "Present Progressive – Bildung", back: "am / is / are + Verb-ing: I am reading, he is flying." },
            { front: "Present Progressive – wann?", back: "jetzt gerade, vorübergehend: now, at the moment, Look!" },
            { front: "Zustandsverben", back: "know, like, want … bleiben im Simple Present. Nicht „I am knowing“." },
            { front: "Simple Past – regelmäßig", back: "Verb + ed: work → worked, study → studied." },
            { front: "Simple Past – Frage", back: "Did + Grundform: Did you meet Hagrid?" },
            { front: "Simple Past – Verneinung", back: "didn’t + Grundform: Harry didn’t go." },
            { front: "go", back: "go → went" },
            { front: "see", back: "see → saw" },
            { front: "take", back: "take → took" },
            { front: "have", back: "have → had" },
            { front: "be", back: "be → was / were" },
            { front: "know", back: "know → knew" },
            { front: "fly", back: "fly → flew" },
            { front: "write", back: "write → wrote" },
            { front: "find", back: "find → found" },
            { front: "Signalwörter Simple Present", back: "always, usually, every day, on Mondays" },
            { front: "Signalwörter Present Progressive", back: "now, right now, at the moment, Look!" },
            { front: "Signalwörter Simple Past", back: "yesterday, last week, in 1991, two days ago" },
            { front: "Present Perfect – Bildung", back: "have / has + 3. Form: I have visited, he has written." },
            { front: "Present Perfect – wann?", back: "Ergebnis jetzt wichtig oder Erfahrung: already, just, yet, ever, never." },
            { front: "Simple Past oder Present Perfect?", back: "Genaue Zeit vorbei (yesterday) → Simple Past. Keine Zeit / Bezug jetzt → Present Perfect." },
            { front: "Past Progressive – Bildung", back: "was / were + Verb-ing: I was reading, they were sitting." },
            { front: "Past Progressive – wann?", back: "Handlung war gerade im Gange: while, at eight o’clock last night." },
            { front: "while oder when?", back: "while + Past Progressive (Hintergrund), when + Simple Past (Unterbrechung)." },
            { front: "will-Future – Bildung", back: "will + Grundform: I will help you. Verneinung: won’t + Grundform." },
            { front: "will – wann?", back: "spontane Entscheidung, Vermutung, Angebot: I think it will rain." },
            { front: "going to – Bildung", back: "am / is / are going to + Grundform: I am going to visit Hagrid." },
            { front: "going to – wann?", back: "Plan (schon entschieden) oder Beweis (Look!): It is going to rain." },
            { front: "go – 3. Form", back: "go → gone" },
            { front: "see – 3. Form", back: "see → seen" },
            { front: "take – 3. Form", back: "take → taken" },
            { front: "write – 3. Form", back: "write → written" },
            { front: "eat – 3. Form", back: "eat → eaten" },
            { front: "drink – 3. Form", back: "drink → drunk" },
            { front: "fly – 3. Form", back: "fly → flown" },
            { front: "make – 3. Form", back: "make → made" },
            { front: "buy – 3. Form", back: "buy → bought" },
            { front: "be – 3. Form", back: "be → been" },
            { front: "Signalwörter Present Perfect", back: "already, just, yet, ever, never, so far" },
            { front: "Signalwörter Past Progressive", back: "while, at eight o’clock last night, at this time yesterday" },
            { front: "Signalwörter will-Future", back: "spontan / Vermutung (I think …) · tomorrow, next week" },
            { front: "Signalwörter going to", back: "Plan (already decided) · Beweis (Look! …)" }
          ]
        }
      ]
    }
  ]
});
