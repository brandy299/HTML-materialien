/* ============================================================
   KURS: Englisch · Förderkurs (FE)
   Grammar Basics: simple present · present progressive · simple past
   Zielniveau A2 → B1. Erklärungen auf Deutsch, Aufgaben auf Englisch.
   Beispielwelt: Harry Potter (eigene Sätze, kein Buchtext).
   Aufbau und alle Aufgabentypen: app/README.md
   ============================================================ */

LERNRAUM.subjects.push({
  id: "englisch-foerderkurs",
  fach: "Englisch",
  added: "2026-09-28",
  name: "Förderkurs Englisch",
  course: "Förderkurs Englisch · FE",
  glyph: "E",
  color: "#7c3aed",
  description: "Grammatik-Grundlagen mit Beispielen aus Harry Potter: simple present, present progressive und simple past. Erklärungen auf Deutsch, Übungen auf Englisch – Schritt für Schritt auf B1.",
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
                     </div>`
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
            { front: "Signalwörter Simple Past", back: "yesterday, last week, in 1991, two days ago" }
          ]
        }
      ]
    }
  ]
});
