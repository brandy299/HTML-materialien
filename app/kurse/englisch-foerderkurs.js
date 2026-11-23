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
  updated: "2026-11-23",
  name: "Förderkurs Englisch",
  course: "Förderkurs Englisch · FE",
  glyph: "E",
  color: "#7c3aed",
  description: "Grammatik-Grundlagen mit Beispielen aus Harry Potter: simple present, present progressive, simple past, present perfect, past progressive sowie will und going to. Erklärungen auf Deutsch, Übungen auf Englisch – Schritt für Schritt auf B1.",
  folders: [{
    id: "live-quiz",
    group: "Live-Quiz",
    kicker: "Ordner · Live-Quiz",
    title: "Live-Quiz Zeitformen",
    description: "Fertige Quizfragen zu den ersten vier Zeitformen. Allein üben – oder im Unterricht im Live-Quiz spielen."
  }],
  topics: [

    /* ══════════════ ZEITFORM 1 · SIMPLE PRESENT ══════════════ */
    {
      id: "simple-present",
      group: "Zeitformen",
      title: "Simple Present",
      kicker: "Grammar Basics · Zeitform 1",
      minutes: 30,
      help: `<h3>Simple Present</h3>
             <p class="formula">I / you / we / they + Verb<br>he / she / it + Verb + s</p>
             <h3>Wann?</h3>
             <ul><li>Gewohnheiten und Routinen: every day, always</li>
             <li>Fakten: Hogwarts has four houses.</li></ul>
             <h3>Das -s schreiben</h3>
             <ul><li>meistens + s: play → plays</li>
             <li>nach s, x, ch, sh, o → + es: watch → watches, go → goes</li>
             <li>Konsonant + y → ies: study → studies</li>
             <li>have → has</li></ul>
             <h3>Fragen und Verneinung</h3>
             <p>do / does + Grundform: Do you …? · Does Harry …? · don’t / doesn’t</p>
             <p>Kurzantwort: Yes, he does. · No, he doesn’t.</p>
             <h3>Mit am / is / are gibt es kein do</h3>
             <p>Is Mia at work? (nicht: Does Mia be at work?)</p>
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
                     <p>“Mia <strong>starts</strong> work at eight o’clock.”</p>
                     <p>“Hogwarts <strong>has</strong> four houses.”</p>
                     <p>Etwas passiert <strong>regelmäßig</strong> oder ist einfach ein <strong>Fakt</strong>.</p>`
            },
            {
              kicker: "Lernziel",
              title: "Ich kann über <mark>Gewohnheiten</mark> und <mark>Fakten</mark> sprechen.",
              body: `<p class="box"><strong>Simple Present</strong> = was immer oder regelmäßig passiert.</p>
                     <p>Du lernst: Sätze bilden, das -s schreiben, Fragen stellen und verneinen.</p>`
            },
            {
              kicker: "Wann benutzt man es?",
              title: "Zwei Fälle: Gewohnheit und Fakt.",
              body: `<dl class="terms">
                       <dt>Gewohnheit</dt><dd>Was jemand immer wieder tut: “I <strong>take</strong> the bus to school every day.”</dd>
                       <dt>Fakt</dt><dd>Was einfach stimmt: “Water <strong>boils</strong> at 100 degrees.”</dd>
                     </dl>
                     <p class="note">Im Deutschen sagst du beides in der Gegenwart: „Ich fahre jeden Tag mit dem Bus.“</p>`
            },
            {
              kicker: "So ist es gebaut",
              title: "Nur he / she / it bekommt ein -s.",
              body: `<dl class="terms">
                       <dt>I / you / we / they</dt><dd>Verb in der Grundform: I <strong>play</strong>, they <strong>read</strong>.</dd>
                       <dt>he / she / it</dt><dd>Verb + s: he <strong>plays</strong>, she <strong>reads</strong>, it <strong>goes</strong>.</dd>
                     </dl>
                     <p class="note">Auch Namen und „Dinge“ zählen: Harry = he, the cat = it, Harry and Ron = they.</p>`
            },
            {
              kicker: "Das -s richtig schreiben",
              title: "Meistens + s. Manchmal + es.",
              body: `<dl class="terms">
                       <dt>meistens + s</dt><dd>play → <strong>plays</strong>, read → <strong>reads</strong>, work → <strong>works</strong></dd>
                       <dt>s, x, ch, sh, o → + es</dt><dd>watch → <strong>watches</strong>, fix → <strong>fixes</strong>, go → <strong>goes</strong>, do → <strong>does</strong></dd>
                       <dt>Konsonant + y → ies</dt><dd>study → <strong>studies</strong>, try → <strong>tries</strong></dd>
                       <dt>Vokal + y → + s</dt><dd>play → <strong>plays</strong>, enjoy → <strong>enjoys</strong></dd>
                       <dt>Sonderfall</dt><dd>have → <strong>has</strong></dd>
                     </dl>`
            },
            {
              kicker: "Fragen und Verneinung",
              title: "do / does + Grundform.",
              body: `<p class="formula">Do you like …? · Does Harry live …?</p>
                     <p class="formula">I don’t like … · Ron doesn’t like …</p>
                     <p class="note">Nach do / does steht immer die Grundform – ohne -s!</p>
                     <p>Das -s sitzt nur einmal im Satz: Bei „Does“ steckt es schon im Hilfsverb.</p>`
            },
            {
              kicker: "Kurzantworten und Fragewörter",
              title: "Yes, he does. · Where does he live?",
              body: `<p class="formula">Does Harry live at Hogwarts?<br>Yes, he <strong>does</strong>. · No, he <strong>doesn’t</strong>.</p>
                     <p class="formula">Do you like pizza?<br>Yes, I <strong>do</strong>. · No, I <strong>don’t</strong>.</p>
                     <p class="formula">Fragewort + do / does + Person + Grundform<br>Where <strong>does</strong> Harry <strong>live</strong>? · What <strong>do</strong> you <strong>eat</strong>?</p>`
            },
            {
              kicker: "Achtung",
              title: "Mit am / is / are gibt es kein do.",
              body: `<p>Das Verb <strong>be</strong> bildet Fragen und Verneinung ohne do / does:</p>
                     <p class="formula">Is Mia at work? · She isn’t at home.<br>Are you tired? · We aren’t late.</p>
                     <p class="note">Falsch: „Does Mia be at work?“ – Richtig: <strong>Is</strong> Mia at work?</p>`
            },
            {
              kicker: "Signalwörter",
              title: "always, often, never – und wo sie stehen.",
              body: `<dl class="terms">
                       <dt>100 %</dt><dd>always (immer)</dd>
                       <dt>fast immer</dt><dd>usually (meistens)</dd>
                       <dt>oft</dt><dd>often</dd>
                       <dt>manchmal</dt><dd>sometimes</dd>
                       <dt>0 %</dt><dd>never (nie)</dd>
                     </dl>
                     <p class="note">Sie stehen <strong>vor</strong> dem Verb: She <strong>always</strong> reads. Nach <strong>be</strong>: He is <strong>never</strong> late.</p>
                     <p>Auch typisch: every day, on Mondays, in the morning.</p>`
            },
            {
              kicker: "Typische Fehler",
              title: "Diese drei Fehler siehst du oft.",
              body: `<div class="pair">
                       <div><b>Falsch</b>Harry live at Hogwarts.</div>
                       <div><b>Richtig</b>Harry <strong>lives</strong> at Hogwarts.</div>
                     </div>
                     <div class="pair">
                       <div><b>Falsch</b>Does Harry lives there?</div>
                       <div><b>Richtig</b>Does Harry <strong>live</strong> there?</div>
                     </div>
                     <div class="pair">
                       <div><b>Falsch</b>Ron doesn’t likes spiders.</div>
                       <div><b>Richtig</b>Ron doesn’t <strong>like</strong> spiders.</div>
                     </div>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "he / she / it → + s",
              body: `<p>Fragen: Do …? / Does …? · Verneinung: don’t / doesn’t · danach immer die Grundform.</p>`
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
            },
            {
              q: "Choose the right form: My brother ____ in a bank.",
              hint: "my brother = he.",
              options: ["work", "works", "working"],
              answer: 1,
              explain: "my brother = he → Verb + s: works."
            },
            {
              q: "Choose the right form: We ____ to school by bus.",
              hint: "we → Grundform.",
              options: ["goes", "go", "going"],
              answer: 1,
              explain: "we → Grundform: we go."
            },
            {
              q: "Which sentence is correct?",
              options: ["She always is late.", "She is always late.", "She is late always."],
              answer: 1,
              explain: "Signalwörter wie always stehen nach is / am / are: She is always late."
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
          type: "quiz",
          title: "A5 · Fragen und Verneinung",
          questions: [
            {
              q: "Which question is correct?",
              options: ["Does Mia works in a shop?", "Does Mia work in a shop?", "Do Mia work in a shop?"],
              answer: 1,
              explain: "Does + Grundform: Does Mia work …? Das -s steckt schon in does."
            },
            {
              q: "Choose the short answer: “Do you like pizza?” – “Yes, I ____.”",
              hint: "Die Kurzantwort wiederholt das Hilfsverb aus der Frage.",
              options: ["like", "do", "does"],
              answer: 1,
              explain: "Frage mit Do → Kurzantwort mit do: Yes, I do."
            },
            {
              q: "Choose the right sentence.",
              options: ["Tom don’t play football.", "Tom doesn’t plays football.", "Tom doesn’t play football."],
              answer: 2,
              explain: "Tom = he → doesn’t + Grundform: doesn’t play."
            },
            {
              q: "Where ____ Harry live?",
              hint: "Fragewort + do / does + Person + Grundform.",
              options: ["do", "does", "is"],
              answer: 1,
              explain: "Harry = he → does: Where does Harry live?"
            },
            {
              q: "Which question is correct?",
              hint: "Mit be gibt es kein do / does.",
              options: ["Does she be tired?", "Is she tired?", "Do she tired?"],
              answer: 1,
              explain: "Mit be fragst du ohne do: Is she tired?"
            }
          ]
        },
        {
          type: "sort",
          title: "A6 · -s, -es oder -ies?",
          prompt: "Wie schreibst du die he / she / it-Form?",
          hints: ["Nach s, x, ch, sh und o kommt -es.", "Konsonant + y: y fällt weg, dann -ies."],
          categories: ["+ s", "+ es", "y → ies"],
          items: [
            { text: "read → reads", cat: 0 },
            { text: "play → plays", cat: 0 },
            { text: "watch → watches", cat: 1 },
            { text: "go → goes", cat: 1 },
            { text: "fix → fixes", cat: 1 },
            { text: "study → studies", cat: 2 },
            { text: "try → tries", cat: 2 },
            { text: "fly → flies", cat: 2 }
          ]
        },
        {
          type: "spot",
          title: "A7 · Finde den Fehler",
          prompt: "In jedem Text ist eine Zeile falsch. Tippe sie an.",
          rounds: [
            {
              lines: ["Mia lives in Oberhausen.", "She work at a bank.", "She likes her job."],
              error: 1,
              explain: "Mia = she → work braucht ein -s: She works at a bank."
            },
            {
              lines: ["Tom and Ben play football.", "They doesn’t like tennis.", "They train on Mondays."],
              error: 1,
              explain: "They → don’t, nicht doesn’t: They don’t like tennis."
            },
            {
              lines: ["Does your sister speak English?", "Yes, she does.", "Does she lives in Berlin?"],
              error: 2,
              explain: "Nach Does steht die Grundform: Does she live in Berlin?"
            }
          ]
        },
        {
          type: "cloze",
          title: "A8 · Alltag: Mias Tag",
          prompt: "Drei Wörter passen nicht.",
          hints: ["Mia = she → Verb + s.", "Frage mit Does: danach die Grundform."],
          text: "Mia {wakes} up at six o’clock. She {eats} breakfast with her mother. Then she {goes} to work by train. Mia doesn’t {drive} a car. {Does} she like her job? Yes, she does.",
          distractors: ["wake", "go", "eating"]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann über Gewohnheiten und Fakten im Simple Present sprechen.",
            "Ich weiß, dass he / she / it ein -s bekommt.",
            "Ich kann das -s richtig schreiben (watches, studies, goes).",
            "Ich kann Fragen mit do / does bilden.",
            "Ich kann Kurzantworten geben (Yes, he does.)."
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
      minutes: 30,
      help: `<h3>Present Progressive</h3>
             <p class="formula">am / is / are + Verb-ing</p>
             <h3>Wann?</h3>
             <ul><li>jetzt gerade: Look! Harry is flying.</li>
             <li>vorübergehend: This week I am working in Köln.</li></ul>
             <h3>-ing schreiben</h3>
             <ul><li>meistens + ing: read → reading</li>
             <li>stummes e weg: make → making</li>
             <li>kurzer Vokal + ein Konsonant: doppelt: run → running</li></ul>
             <h3>Fragen und Verneinung</h3>
             <p>Is Harry flying? · Are they playing? · He isn’t flying.</p>
             <h3>Simple Present oder Progressive?</h3>
             <p>Gewohnheit → Simple Present. Jetzt gerade → Progressive.</p>
             <h3>Verben ohne -ing</h3>
             <p>know, like, love, want, need, understand: Sie beschreiben Wissen, Gefühle oder Wünsche. Sie bekommen kein -ing, auch nicht jetzt.</p>`,
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
                     <p>“Be quiet! The baby <strong>is sleeping</strong>.”</p>
                     <p>Nicht jeden Tag – sondern <strong>gerade jetzt</strong>.</p>`
            },
            {
              kicker: "Lernziel",
              title: "Ich kann sagen, was <mark>gerade jetzt</mark> passiert.",
              body: `<p class="box">Present Progressive = es passiert im Moment des Sprechens.</p>
                     <p>Du lernst: die Form bilden, -ing schreiben, fragen und verneinen – und wann du lieber das Simple Present nimmst.</p>`
            },
            {
              kicker: "So ist es gebaut",
              title: "am / is / are + Verb-ing.",
              body: `<dl class="terms">
                       <dt>I</dt><dd>am + -ing: I <strong>am reading</strong>.</dd>
                       <dt>he / she / it</dt><dd>is + -ing: he <strong>is flying</strong>.</dd>
                       <dt>you / we / they</dt><dd>are + -ing: they <strong>are sitting</strong>.</dd>
                     </dl>
                     <p class="note">Es sind immer zwei Teile: <strong>am / is / are</strong> und das Verb mit <strong>-ing</strong>. Fehlt einer, ist der Satz falsch.</p>`
            },
            {
              kicker: "-ing richtig schreiben",
              title: "Meistens einfach + ing.",
              body: `<dl class="terms">
                       <dt>meistens + ing</dt><dd>read → <strong>reading</strong>, play → <strong>playing</strong>, eat → <strong>eating</strong></dd>
                       <dt>stummes e fällt weg</dt><dd>make → <strong>making</strong>, write → <strong>writing</strong>, come → <strong>coming</strong></dd>
                       <dt>Konsonant doppelt</dt><dd>run → <strong>running</strong>, sit → <strong>sitting</strong>, swim → <strong>swimming</strong></dd>
                       <dt>Sonderfall</dt><dd>lie → <strong>lying</strong></dd>
                     </dl>
                     <p class="note">Doppelt wird nur nach einem <strong>kurzen</strong> Vokal und einem einzelnen Konsonanten: run → running, aber eat → eating.</p>`
            },
            {
              kicker: "Fragen und Verneinung",
              title: "am / is / are wandert nach vorn.",
              body: `<p class="formula">He is flying. → <strong>Is</strong> he flying?<br>They are playing. → <strong>Are</strong> they playing?</p>
                     <p class="formula">He is<strong>n’t</strong> flying. · They are<strong>n’t</strong> playing. · I am <strong>not</strong> sleeping.</p>
                     <p class="formula">Yes, he <strong>is</strong>. · No, he <strong>isn’t</strong>.</p>
                     <p class="note">Hier brauchst du <strong>kein</strong> do / does.</p>`
            },
            {
              kicker: "Signalwörter",
              title: "now, right now, at the moment, Look!, Listen!",
              body: `<p>Diese Wörter zeigen: Es passiert <strong>gerade</strong>.</p>
                     <p class="formula">Listen! Someone <strong>is knocking</strong> at the door.<br>I <strong>am</strong> not <strong>working</strong> at the moment.</p>
                     <p>Auch möglich: <strong>vorübergehend</strong>, also nur für eine kurze Zeit: “This week I <strong>am working</strong> in Köln.”</p>`
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
              title: "Manche Verben bekommen kein -ing.",
              body: `<p>Sie beschreiben <strong>kein Tun</strong>, sondern Wissen, Gefühle oder Wünsche:</p>
                     <p class="formula">know · understand · like · love · hate · want · need</p>
                     <p class="note">Nicht „I am knowing“ – sondern „I <strong>know</strong>“. Das gilt auch, wenn es jetzt gerade ist.</p>
                     <p>Auch <strong>have</strong> im Sinne von „besitzen“: I <strong>have</strong> a phone. (nicht: I am having a phone)</p>`
            },
            {
              kicker: "Typische Fehler",
              title: "Diese Fehler siehst du oft.",
              body: `<div class="pair">
                       <div><b>Falsch</b>Harry flying now.</div>
                       <div><b>Richtig</b>Harry <strong>is</strong> flying now.</div>
                     </div>
                     <div class="pair">
                       <div><b>Falsch</b>He is fly.</div>
                       <div><b>Richtig</b>He is <strong>flying</strong>.</div>
                     </div>
                     <div class="pair">
                       <div><b>Falsch</b>I am knowing the answer.</div>
                       <div><b>Richtig</b>I <strong>know</strong> the answer.</div>
                     </div>`
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
              q: "Which sentence is correct?",
              hint: "know beschreibt Wissen, kein Tun.",
              options: ["I am knowing the answer.", "I know the answer.", "I knowing the answer."],
              answer: 1,
              explain: "know bekommt kein -ing – auch nicht jetzt: „I know“."
            },
            {
              q: "Choose the right form: The children ____ in the garden.",
              hint: "The children = they.",
              options: ["is playing", "are playing", "plays"],
              answer: 1,
              explain: "they → are + -ing: are playing."
            },
            {
              q: "Which sentence is correct?",
              options: ["She is writeing a letter.", "She is writing a letter.", "She is writting a letter."],
              answer: 1,
              explain: "Stummes e fällt weg: write → writing."
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
          hints: ["Bei I → am, bei he/she/it → is, bei you/we/they → are.", "Verben wie know bekommen kein -ing."],
          text: "Look! Harry {is} flying on his broom. The students {are} sitting in the Great Hall. I {am} reading a book. Bei Verben wie know gibt es kein -ing: I {know} the answer.",
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
          type: "quiz",
          title: "A5 · Fragen und Verneinung",
          questions: [
            {
              q: "Which question is correct?",
              options: ["Does Harry flying?", "Is Harry flying?", "Harry is flying?"],
              answer: 1,
              explain: "Bei Fragen wandert is nach vorn: Is Harry flying?"
            },
            {
              q: "Choose the short answer: “Are they playing?” – “No, they ____.”",
              hint: "Die Kurzantwort wiederholt das Hilfsverb aus der Frage.",
              options: ["don’t", "aren’t", "isn’t"],
              answer: 1,
              explain: "Frage mit Are → Kurzantwort mit aren’t."
            },
            {
              q: "Choose the right sentence.",
              options: ["I not am sleeping.", "I am not sleeping.", "I don’t sleeping."],
              answer: 1,
              explain: "not steht nach am / is / are: I am not sleeping."
            },
            {
              q: "What ____ you doing right now?",
              options: ["is", "are", "do"],
              answer: 1,
              explain: "you → are: What are you doing?"
            },
            {
              q: "Which sentence is correct?",
              options: ["She isn’t watching TV.", "She doesn’t watching TV.", "She not is watching TV."],
              answer: 0,
              explain: "Verneinung im Progressive: isn’t + -ing, nie doesn’t + -ing."
            }
          ]
        },
        {
          type: "sort",
          title: "A6 · -ing richtig schreiben",
          prompt: "Wie schreibst du die -ing-Form?",
          hints: ["Stummes e am Ende fällt weg: make → making.", "Kurzer Vokal + ein Konsonant: der Konsonant wird doppelt."],
          categories: ["+ ing", "e weg + ing", "Konsonant doppelt"],
          items: [
            { text: "read → reading", cat: 0 },
            { text: "play → playing", cat: 0 },
            { text: "make → making", cat: 1 },
            { text: "write → writing", cat: 1 },
            { text: "come → coming", cat: 1 },
            { text: "run → running", cat: 2 },
            { text: "sit → sitting", cat: 2 },
            { text: "swim → swimming", cat: 2 }
          ]
        },
        {
          type: "sort",
          title: "A7 · mit oder ohne -ing?",
          prompt: "Kann das Verb ein -ing bekommen?",
          hints: ["Tun und Bewegung → -ing ist möglich.", "Wissen, Gefühl, Wunsch → kein -ing."],
          categories: ["Tun: -ing möglich", "Wissen, Gefühl, Wunsch: kein -ing"],
          items: [
            { text: "run", cat: 0 },
            { text: "eat", cat: 0 },
            { text: "write", cat: 0 },
            { text: "know", cat: 1 },
            { text: "want", cat: 1 },
            { text: "understand", cat: 1 },
            { text: "love", cat: 1 }
          ]
        },
        {
          type: "spot",
          title: "A8 · Finde den Fehler",
          prompt: "In jedem Text ist eine Zeile falsch. Tippe sie an.",
          rounds: [
            {
              lines: ["Listen! Someone is singing.", "The children is playing outside.", "I am not sleeping."],
              error: 1,
              explain: "The children = they → are: The children are playing outside."
            },
            {
              lines: ["Where is Tom?", "He sitting in the garden.", "He is reading a book."],
              error: 1,
              explain: "Es fehlt is: He is sitting in the garden."
            },
            {
              lines: ["I am at the station now.", "I am waiting for my train.", "I am knowing the platform."],
              error: 2,
              explain: "know bekommt kein -ing: I know the platform."
            }
          ]
        },
        {
          type: "cloze",
          title: "A9 · Alltag: gerade jetzt",
          prompt: "Drei Wörter passen nicht.",
          hints: ["Gerade jetzt → am / is / are + -ing.", "Verben wie want bekommen kein -ing."],
          text: "It is eight o’clock in the office. Mia {is} drinking coffee. Her colleagues {are} talking about the weekend. I {am} writing an email. The boss is {not} working today. I {want} some coffee too.",
          distractors: ["do", "wanting", "were"]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann sagen, was gerade jetzt passiert.",
            "Ich kann am / is / are + -ing richtig bilden.",
            "Ich kann das -ing richtig schreiben (making, running).",
            "Ich kann Fragen und Verneinungen im Present Progressive bilden.",
            "Ich weiß, welche Verben kein -ing bekommen (know, like, want)."
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
      minutes: 32,
      help: `<h3>Simple Past</h3>
             <p class="formula">regelmäßig: Verb + ed<br>unregelmäßig: eigene Form (go → went)</p>
             <h3>-ed schreiben</h3>
             <ul><li>meistens + ed: work → worked</li>
             <li>Verb endet auf e: nur + d: live → lived</li>
             <li>Konsonant + y → ied: study → studied</li>
             <li>kurzer Vokal + ein Konsonant: doppelt: stop → stopped</li></ul>
             <h3>Fragen und Verneinung</h3>
             <p>did / didn’t + Grundform: Did you …? · He didn’t go.</p>
             <p>Kurzantwort: Yes, I did. · No, I didn’t.</p>
             <h3>Mit be: was / were</h3>
             <p>I was · you were. Fragen: Was he …? Verneinung: wasn’t / weren’t. Kein did!</p>
             <h3>Wichtigste unregelmäßige Verben</h3>
             <p>go → went · see → saw · take → took · find → found · have → had · make → made · get → got · come → came · be → was/were</p>
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
                     <p>“Mia <strong>went</strong> to the cinema last weekend.”</p>
                     <p>Etwas ist in der Vergangenheit passiert und <strong>abgeschlossen</strong>.</p>`
            },
            {
              kicker: "Lernziel",
              title: "Ich kann über die <mark>Vergangenheit</mark> erzählen.",
              body: `<p class="box"><strong>Simple Past</strong> = abgeschlossene Handlung in der Vergangenheit.</p>
                     <p>Du lernst: regelmäßige und unregelmäßige Verben, Fragen und Verneinung mit did und die Formen was / were.</p>`
            },
            {
              kicker: "So ist es gebaut",
              title: "regelmäßig + ed · unregelmäßig eigene Form.",
              body: `<dl class="terms">
                       <dt>regelmäßig</dt><dd>Verb + ed: work → <strong>worked</strong>, visit → <strong>visited</strong>.</dd>
                       <dt>unregelmäßig</dt><dd>eigene Form lernen: go → <strong>went</strong>, see → <strong>saw</strong>, take → <strong>took</strong>.</dd>
                     </dl>
                     <p class="note">Es gibt <strong>nur eine</strong> Form für alle: I went, he went, they went.</p>`
            },
            {
              kicker: "-ed richtig schreiben",
              title: "Meistens + ed. Manchmal anders.",
              body: `<dl class="terms">
                       <dt>meistens + ed</dt><dd>work → <strong>worked</strong>, play → <strong>played</strong></dd>
                       <dt>Verb endet auf e → + d</dt><dd>live → <strong>lived</strong>, love → <strong>loved</strong></dd>
                       <dt>Konsonant + y → ied</dt><dd>study → <strong>studied</strong>, try → <strong>tried</strong></dd>
                       <dt>Konsonant doppelt</dt><dd>stop → <strong>stopped</strong>, plan → <strong>planned</strong></dd>
                     </dl>`
            },
            {
              kicker: "Unregelmäßige Verben (1)",
              title: "Diese Verben musst du auswendig kennen.",
              body: `<dl class="terms">
                       <dt>be</dt><dd><strong>was</strong> / <strong>were</strong></dd>
                       <dt>have</dt><dd><strong>had</strong></dd>
                       <dt>do</dt><dd><strong>did</strong></dd>
                       <dt>go</dt><dd><strong>went</strong></dd>
                       <dt>see</dt><dd><strong>saw</strong></dd>
                       <dt>take</dt><dd><strong>took</strong></dd>
                       <dt>make</dt><dd><strong>made</strong></dd>
                       <dt>get</dt><dd><strong>got</strong></dd>
                     </dl>`
            },
            {
              kicker: "Unregelmäßige Verben (2)",
              title: "Noch mehr Alltags-Verben.",
              body: `<dl class="terms">
                       <dt>come</dt><dd><strong>came</strong></dd>
                       <dt>give</dt><dd><strong>gave</strong></dd>
                       <dt>find</dt><dd><strong>found</strong></dd>
                       <dt>buy</dt><dd><strong>bought</strong></dd>
                       <dt>eat</dt><dd><strong>ate</strong></dd>
                       <dt>write</dt><dd><strong>wrote</strong></dd>
                       <dt>meet</dt><dd><strong>met</strong></dd>
                       <dt>know</dt><dd><strong>knew</strong></dd>
                     </dl>
                     <p class="note">Tipp: Lerne jeden Tag drei Verben. Die Lernkarten am Ende des Kurses helfen dir dabei.</p>`
            },
            {
              kicker: "Fragen und Verneinung",
              title: "did / didn’t + Grundform.",
              body: `<p class="formula">Did you meet Hagrid?</p>
                     <p class="formula">Harry didn’t go to Hogwarts.</p>
                     <p class="note">Nach did / didn’t steht die Grundform – nie die 2. Form!</p>
                     <p class="formula">Did he go? · Yes, he <strong>did</strong>. · No, he <strong>didn’t</strong>.<br>Where <strong>did</strong> you <strong>go</strong> last night?</p>`
            },
            {
              kicker: "Achtung",
              title: "Mit be: was / were. Kein did.",
              body: `<dl class="terms">
                       <dt>I / he / she / it</dt><dd><strong>was</strong>: I was tired.</dd>
                       <dt>you / we / they</dt><dd><strong>were</strong>: they were late.</dd>
                     </dl>
                     <p class="formula">Was he at home? · He <strong>wasn’t</strong> at home.<br>Were you ill? · We <strong>weren’t</strong> ill.</p>
                     <p class="note">Falsch: „Did you be ill?“ – Richtig: <strong>Were</strong> you ill?</p>`
            },
            {
              kicker: "Signalwörter",
              title: "yesterday, last week, two days ago, in 1991.",
              body: `<p>Sie nennen eine <strong>genaue Zeit</strong>, die vorbei ist:</p>
                     <p class="formula">yesterday · last night · last week · last year<br>two days ago · in 1991 · then · when I was ten</p>
                     <p class="note">Im Deutschen erzählst du oft mit „Ich habe gesehen“. Im Englischen nimmst du bei einer genauen Zeit das Simple Past: Yesterday I <strong>saw</strong> a film.</p>`
            },
            {
              kicker: "Typische Fehler",
              title: "Diese Fehler siehst du oft.",
              body: `<div class="pair">
                       <div><b>Falsch</b>Harry didn’t went home.</div>
                       <div><b>Richtig</b>Harry didn’t <strong>go</strong> home.</div>
                     </div>
                     <div class="pair">
                       <div><b>Falsch</b>Did you saw Hagrid?</div>
                       <div><b>Richtig</b>Did you <strong>see</strong> Hagrid?</div>
                     </div>
                     <div class="pair">
                       <div><b>Falsch</b>I goed to school.</div>
                       <div><b>Richtig</b>I <strong>went</strong> to school.</div>
                     </div>`
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
            },
            {
              q: "Choose the right form: We ____ a great film two days ago.",
              hint: "two days ago → Simple Past; see ist unregelmäßig.",
              options: ["see", "saw", "seen"],
              answer: 1,
              explain: "two days ago → Simple Past: see → saw."
            },
            {
              q: "Choose the right form: She ____ a new phone yesterday.",
              options: ["buyed", "bought", "buys"],
              answer: 1,
              explain: "buy ist unregelmäßig: buy → bought."
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
          type: "quiz",
          title: "A5 · Fragen und Verneinung",
          questions: [
            {
              q: "Which question is correct?",
              options: ["Did you saw the film?", "Did you see the film?", "Do you saw the film?"],
              answer: 1,
              explain: "Did + Grundform: Did you see …? Die 2. Form steht nur im Aussagesatz."
            },
            {
              q: "Choose the short answer: “Did Mia go to school yesterday?” – “No, she ____.”",
              hint: "Die Kurzantwort wiederholt das Hilfsverb aus der Frage.",
              options: ["didn’t", "doesn’t", "wasn’t"],
              answer: 0,
              explain: "Frage mit Did → Kurzantwort mit didn’t."
            },
            {
              q: "Choose the right sentence.",
              options: ["We didn’t played football.", "We didn’t play football.", "We not played football."],
              answer: 1,
              explain: "didn’t + Grundform: didn’t play."
            },
            {
              q: "____ you at home last night?",
              hint: "Mit be gibt es kein did.",
              options: ["Did", "Were", "Was"],
              answer: 1,
              explain: "you → were: Were you at home? Mit be steht kein did."
            },
            {
              q: "Where ____ Hermione find the book?",
              options: ["did", "does", "was"],
              answer: 0,
              explain: "Fragewort + did + Person + Grundform: Where did Hermione find …?"
            }
          ]
        },
        {
          type: "sort",
          title: "A6 · -ed richtig schreiben",
          prompt: "Wie schreibst du die Vergangenheit?",
          hints: ["Endet das Verb schon auf e, kommt nur ein d.", "Konsonant + y: y wird zu ied."],
          categories: ["+ ed", "+ d", "y → ied", "Konsonant doppelt"],
          items: [
            { text: "work → worked", cat: 0 },
            { text: "play → played", cat: 0 },
            { text: "live → lived", cat: 1 },
            { text: "love → loved", cat: 1 },
            { text: "study → studied", cat: 2 },
            { text: "try → tried", cat: 2 },
            { text: "stop → stopped", cat: 3 },
            { text: "plan → planned", cat: 3 }
          ]
        },
        {
          type: "spot",
          title: "A7 · Finde den Fehler",
          prompt: "In jedem Text ist eine Zeile falsch. Tippe sie an.",
          rounds: [
            {
              lines: ["Yesterday I got up at six.", "I eated breakfast at home.", "Then I went to work."],
              error: 1,
              explain: "eat ist unregelmäßig: I ate breakfast at home."
            },
            {
              lines: ["Did you go to the party?", "Yes, I did.", "I didn’t met many people."],
              error: 2,
              explain: "Nach didn’t steht die Grundform: I didn’t meet many people."
            },
            {
              lines: ["Last week we visited our aunt.", "She cooked a big dinner.", "Did she cooked fish?"],
              error: 2,
              explain: "Nach Did steht die Grundform: Did she cook fish?"
            }
          ]
        },
        {
          type: "cloze",
          title: "A8 · Alltag: Mias Wochenende",
          prompt: "Drei Wörter passen nicht.",
          hints: ["last weekend → Simple Past.", "buy → bought, go → went, meet → met."],
          text: "Last weekend Mia {went} to the city. She {met} her friend Lina at the station. They {bought} new shoes. In the evening they watched a film. Mia {didn’t} stay long, because she was tired.",
          distractors: ["go", "buy", "goed"]
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann über die Vergangenheit erzählen.",
            "Ich kann regelmäßige und unregelmäßige Formen bilden.",
            "Ich kenne die wichtigsten unregelmäßigen Verben (went, saw, took …).",
            "Ich kann Fragen und Verneinungen mit did bilden.",
            "Ich weiß, wann es was / were heißt."
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
      minutes: 34,
      help: `<h3>Present Perfect</h3>
             <p class="formula">have / has + 3. Form (past participle)</p>
             <h3>Wann?</h3>
             <ul><li>Das Ergebnis ist jetzt wichtig: I have lost my wand.</li>
             <li>Erfahrung bis jetzt: Have you ever seen a dragon?</li>
             <li>Gerade passiert: Harry has just arrived.</li>
             <li>Zeitraum bis jetzt: I have lived here for two years.</li></ul>
             <h3>Die 3. Form</h3>
             <p>regelmäßig: wie das Simple Past (worked). Unregelmäßig: lernen (go → went → gone).</p>
             <h3>Fragen und Verneinung</h3>
             <p>Have you …? · Has she …? · haven’t / hasn’t + 3. Form</p>
             <h3>Signalwörter</h3>
             <p>already, just, yet, ever, never, so far · for + Zeitraum · since + Startpunkt</p>
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
                     <p>“Mia <strong>has</strong> already <strong>finished</strong> her homework.”</p>
                     <p>Die Handlung ist vorbei, doch das <strong>Ergebnis zählt jetzt</strong>.</p>`
            },
            {
              kicker: "Lernziel",
              title: "Ich kann über Erlebnisse und Ergebnisse sprechen.",
              body: `<p class="box"><strong>Present Perfect</strong> = Vergangenheit mit Bezug zur Gegenwart.</p>
                     <p>Du lernst: die Form bilden, die 3. Form, Fragen und Verneinung, Signalwörter – und den Unterschied zum Simple Past.</p>`
            },
            {
              kicker: "Wann benutzt man es?",
              title: "Drei typische Fälle.",
              body: `<dl class="terms">
                       <dt>Ergebnis jetzt</dt><dd>“I <strong>have lost</strong> my key.” (Ich komme jetzt nicht rein.)</dd>
                       <dt>Erfahrung</dt><dd>“<strong>Have</strong> you ever <strong>been</strong> to London?”</dd>
                       <dt>gerade eben</dt><dd>“The train <strong>has just left</strong>.”</dd>
                     </dl>
                     <p class="note">Wichtig ist nicht, <em>wann</em> es passiert ist, sondern dass es <em>jetzt</em> zählt.</p>`
            },
            {
              kicker: "So ist es gebaut",
              title: "have / has + 3. Form.",
              body: `<dl class="terms">
                       <dt>I / you / we / they</dt><dd>have + 3. Form: I <strong>have visited</strong>, they <strong>have gone</strong>.</dd>
                       <dt>he / she / it</dt><dd>has + 3. Form: he <strong>has visited</strong>, she <strong>has written</strong>.</dd>
                     </dl>
                     <p class="note">Kurzform: I<strong>’ve</strong> finished · she<strong>’s</strong> finished.</p>`
            },
            {
              kicker: "Die 3. Form (1)",
              title: "Regelmäßig: wie im Simple Past.",
              body: `<p>Bei regelmäßigen Verben sind Simple Past und 3. Form <strong>gleich</strong>:</p>
                     <dl class="terms">
                       <dt>work</dt><dd>worked · has <strong>worked</strong></dd>
                       <dt>visit</dt><dd>visited · has <strong>visited</strong></dd>
                       <dt>study</dt><dd>studied · has <strong>studied</strong></dd>
                     </dl>
                     <p class="note">Bei unregelmäßigen Verben musst du die 3. Form lernen – sie steht oft in der dritten Spalte deiner Verbliste.</p>`
            },
            {
              kicker: "Die 3. Form (2)",
              title: "Unregelmäßig: Diese Verben solltest du kennen.",
              body: `<dl class="terms">
                       <dt>go · went</dt><dd><strong>gone</strong></dd>
                       <dt>see · saw</dt><dd><strong>seen</strong></dd>
                       <dt>take · took</dt><dd><strong>taken</strong></dd>
                       <dt>write · wrote</dt><dd><strong>written</strong></dd>
                       <dt>eat · ate</dt><dd><strong>eaten</strong></dd>
                       <dt>break · broke</dt><dd><strong>broken</strong></dd>
                       <dt>do · did</dt><dd><strong>done</strong></dd>
                       <dt>be · was/were</dt><dd><strong>been</strong></dd>
                     </dl>`
            },
            {
              kicker: "Die 3. Form (3)",
              title: "Manche Verben bleiben gleich.",
              body: `<dl class="terms">
                       <dt>make · made</dt><dd><strong>made</strong></dd>
                       <dt>buy · bought</dt><dd><strong>bought</strong></dd>
                       <dt>find · found</dt><dd><strong>found</strong></dd>
                       <dt>lose · lost</dt><dd><strong>lost</strong></dd>
                       <dt>have · had</dt><dd><strong>had</strong></dd>
                       <dt>meet · met</dt><dd><strong>met</strong></dd>
                     </dl>
                     <p class="note">Bei diesen Verben sind Simple Past und 3. Form gleich – das macht es leichter.</p>`
            },
            {
              kicker: "Fragen und Verneinung",
              title: "have / has nach vorn · haven’t / hasn’t.",
              body: `<p class="formula">You have seen it. → <strong>Have</strong> you seen it?<br>She has finished. → <strong>Has</strong> she finished?</p>
                     <p class="formula">I <strong>haven’t</strong> finished. · He <strong>hasn’t</strong> arrived.</p>
                     <p class="formula">Yes, I <strong>have</strong>. · No, she <strong>hasn’t</strong>.</p>
                     <p class="note">Kein do / does! Die 3. Form bleibt unverändert.</p>`
            },
            {
              kicker: "Signalwörter (1)",
              title: "already, just, yet, ever, never.",
              body: `<p>already / just stehen nach have / has: I have <strong>just</strong> finished.</p>
                     <p class="note">yet steht am Satzende: He has not finished <strong>yet</strong>. Fragen: Have you finished <strong>yet</strong>?</p>
                     <p>ever (jemals) in Fragen: Have you <strong>ever</strong> been to London?<br>never (nie): I have <strong>never</strong> been to London.</p>`
            },
            {
              kicker: "Signalwörter (2)",
              title: "for und since.",
              body: `<div class="pair">
                       <div><b>for + Zeitraum</b>for two years, for three weeks, for an hour</div>
                       <div><b>since + Startpunkt</b>since 2023, since Monday, since 8 o’clock</div>
                     </div>
                     <p class="formula">I have lived here <strong>for</strong> two years.<br>I have lived here <strong>since</strong> 2023.</p>
                     <p class="note">Im Deutschen sagst du „Ich wohne seit zwei Jahren hier“ (Gegenwart). Im Englischen nimmst du das <strong>Present Perfect</strong>.</p>`
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
              kicker: "Deutsch-Falle",
              title: "Das deutsche Perfekt ist kein Present Perfect.",
              body: `<p>Im Deutschen sagst du: „Ich <strong>habe</strong> gestern einen Film <strong>gesehen</strong>.“</p>
                     <p>Im Englischen steht bei <strong>yesterday</strong> das Simple Past:</p>
                     <div class="pair">
                       <div><b>Falsch</b>Yesterday I have seen a film.</div>
                       <div><b>Richtig</b>Yesterday I <strong>saw</strong> a film.</div>
                     </div>
                     <p class="note">Merke: Steht eine <strong>genaue Zeit</strong> im Satz (yesterday, last week, in 1991), nimmst du nie das Present Perfect.</p>`
            },
            {
              kicker: "Typische Fehler",
              title: "Diese Fehler siehst du oft.",
              body: `<div class="pair">
                       <div><b>Falsch</b>He has went home.</div>
                       <div><b>Richtig</b>He has <strong>gone</strong> home.</div>
                     </div>
                     <div class="pair">
                       <div><b>Falsch</b>She have finished.</div>
                       <div><b>Richtig</b>She <strong>has</strong> finished.</div>
                     </div>
                     <div class="pair">
                       <div><b>Falsch</b>I have seen him yesterday.</div>
                       <div><b>Richtig</b>I <strong>saw</strong> him yesterday.</div>
                     </div>`
            },
            {
              style: "accent",
              kicker: "Merke",
              title: "have / has + 3. Form",
              body: `<p>Signalwörter: already, just, yet, ever, never, for, since. Genaue Zeit (yesterday) → Simple Past.</p>`
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
            },
            {
              q: "Choose the right form: We have ____ the film. It was great.",
              options: ["saw", "seen", "see"],
              answer: 1,
              explain: "have + 3. Form: see → seen."
            },
            {
              q: "Choose the right form: He ____ never been to London.",
              hint: "he → has.",
              options: ["have", "has", "is"],
              answer: 1,
              explain: "he / she / it → has + 3. Form: has never been."
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
          type: "quiz",
          title: "A5 · Fragen und Verneinung",
          questions: [
            {
              q: "Which question is correct?",
              options: ["Do you have seen the film?", "Have you seen the film?", "Did you have seen the film?"],
              answer: 1,
              explain: "have nach vorn: Have you seen …? Kein do."
            },
            {
              q: "Choose the short answer: “Has she finished?” – “No, she ____.”",
              hint: "Die Kurzantwort wiederholt das Hilfsverb aus der Frage.",
              options: ["hasn’t", "haven’t", "doesn’t"],
              answer: 0,
              explain: "Frage mit Has → Kurzantwort: No, she hasn’t."
            },
            {
              q: "Choose the right sentence.",
              options: ["I haven’t finish my homework yet.", "I haven’t finished my homework yet.", "I don’t have finished my homework yet."],
              answer: 1,
              explain: "haven’t + 3. Form: haven’t finished. yet steht am Satzende."
            },
            {
              q: "Have you ____ been to London?",
              hint: "Ein Wort für „jemals“ in Fragen.",
              options: ["ever", "yet", "just"],
              answer: 0,
              explain: "ever = jemals: Have you ever been …?"
            },
            {
              q: "Which sentence is correct?",
              hint: "yet steht am Satzende.",
              options: ["Has he arrived yet?", "Has he yet arrived?", "Yet has he arrived?"],
              answer: 0,
              explain: "yet steht am Ende: Has he arrived yet?"
            }
          ]
        },
        {
          type: "sort",
          title: "A6 · Welche 3. Form?",
          prompt: "Ist die 3. Form gleich wie das Simple Past oder anders?",
          hints: ["Steht in der Zeile zweimal dasselbe Wort, ist die 3. Form gleich.", "go – went – gone: die 3. Form ist neu."],
          categories: ["3. Form = Simple Past", "3. Form ist anders"],
          items: [
            { text: "make – made – made", cat: 0 },
            { text: "buy – bought – bought", cat: 0 },
            { text: "find – found – found", cat: 0 },
            { text: "work – worked – worked", cat: 0 },
            { text: "go – went – gone", cat: 1 },
            { text: "see – saw – seen", cat: 1 },
            { text: "write – wrote – written", cat: 1 },
            { text: "take – took – taken", cat: 1 }
          ]
        },
        {
          type: "spot",
          title: "A7 · Finde den Fehler",
          prompt: "In jedem Text ist eine Zeile falsch. Tippe sie an.",
          rounds: [
            {
              lines: ["I have lost my keys.", "I can’t open the door.", "She have helped me twice."],
              error: 2,
              explain: "she → has: She has helped me twice."
            },
            {
              lines: ["Tom has gone to Berlin.", "He has went by train.", "He has never been there."],
              error: 1,
              explain: "Die 3. Form von go ist gone: He has gone by train."
            },
            {
              lines: ["We have never been to London.", "Last year we have visited Paris.", "We loved it."],
              error: 1,
              explain: "Last year ist eine genaue Zeit → Simple Past: Last year we visited Paris."
            }
          ]
        },
        {
          type: "cloze",
          title: "A8 · Alltag: Erfahrungen",
          prompt: "Drei Wörter passen nicht.",
          hints: ["Erfahrung bis jetzt → have / has + 3. Form.", "ever steht in der Frage, never in der Aussage."],
          text: "{Have} you {ever} worked in a shop? No, I have {never} worked in a shop. But my sister has {worked} in a shop for two years.",
          distractors: ["did", "work", "since"]
        },
        {
          type: "sentence",
          title: "A9 · for oder since?",
          case: "Wähle in jedem Kasten das richtige Wort.",
          text: "Mia has lived in Oberhausen {*for|since} five years. She has worked at the bank {*since|for} 2022. I have known Tom {*for|since} three weeks. We have been here {*since|for} eight o’clock.",
          explain: "for + Zeitraum (five years, three weeks). since + Startpunkt (2022, eight o’clock)."
        },
        {
          type: "selfcheck",
          title: "Kann-Liste",
          items: [
            "Ich kann das Present Perfect mit have / has + 3. Form bilden.",
            "Ich kenne wichtige 3. Formen (gone, seen, taken, written).",
            "Ich kenne die Signalwörter already, just, yet, ever, never.",
            "Ich kann for und since richtig benutzen.",
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

    /* ══════════════ KLAUSUR · ÜBUNGSKLAUSUR ZEITFORMEN ══════════════ */
    {
      id: "uebungsklausur",
      group: "Klausur",
      title: "Übungsklausur Zeitformen",
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
          title: "A1 · Gegenwart",
          points: 8,
          review: "simple-present",
          questions: [
            {
              q: "Neville ____ his toad every morning.",
              options: ["feed", "feeds", "feeding"],
              answer: 1,
              explain: "every morning → Simple Present, he → Verb + s: feeds."
            },
            {
              q: "Make a question: ____ Luna like strange animals?",
              options: ["Do", "Does", "Is"],
              answer: 1,
              explain: "Bei he / she / it: Does + Grundform."
            },
            {
              q: "Be quiet! The teacher ____ to us.",
              options: ["talks", "is talking", "talk"],
              answer: 1,
              explain: "Be quiet! → es passiert gerade jetzt: Present Progressive, is talking."
            },
            {
              q: "Which verb does NOT take -ing (it describes knowing, not doing)?",
              options: ["to play", "to know", "to read"],
              answer: 1,
              explain: "Verben wie know, like, want beschreiben Wissen, Gefühle oder Wünsche. Sie bleiben im Simple Present."
            }
          ]
        },
        {
          type: "sort",
          title: "A2 · Signalwörter",
          points: 8,
          review: "zeitformen-mix",
          prompt: "Welche Zeitform zeigt das Signalwort an?",
          categories: ["Simple Present", "Present Progressive", "Simple Past", "Present Perfect"],
          items: [
            { text: "always", cat: 0 },
            { text: "on Fridays", cat: 0 },
            { text: "right now", cat: 1 },
            { text: "at the moment", cat: 1 },
            { text: "yesterday", cat: 2 },
            { text: "two days ago", cat: 2 },
            { text: "already", cat: 3 },
            { text: "ever", cat: 3 }
          ]
        },
        {
          type: "cloze",
          title: "A3 · Regeln",
          points: 8,
          review: "simple-past",
          prompt: "Zwei Wörter passen nicht.",
          text: "Regelmäßige Verben bilden das Simple Past mit {-ed}. „Go“ ist unregelmäßig: Die Form heißt {went}. Fragen und Verneinung im Simple Past bildest du mit {did} + Grundform. Das Present Perfect bildest du mit have / has + {3. Form}.",
          distractors: ["goed", "does"]
        },
        {
          type: "sentence",
          title: "A4 · Vergangenheit und Ergebnis",
          points: 8,
          review: "present-perfect",
          case: "Wähle in jedem Kasten die richtige Form.",
          text: "Last summer Ron {*visited|has visited|visits} his brother in Romania. Hermione {*has already finished|already finishes|already finished} her homework – she is free now. At seven o’clock yesterday I {*was cooking|cooked|am cooking} dinner when my phone {*rang|was ringing|rings}. {*Have you ever|Did you ever|Are you ever} seen a dragon?",
          explain: "last summer → Simple Past · already + Ergebnis jetzt → Present Perfect · at seven o’clock yesterday → Past Progressive, when + Simple Past · ever → Present Perfect."
        },
        {
          type: "quiz",
          title: "A5 · Zukunft",
          points: 4,
          review: "will-future",
          questions: [
            {
              q: "Look at the sky! It ____ rain.",
              options: ["will", "is going to", "rains"],
              answer: 1,
              explain: "Anzeichen jetzt (dunkle Wolken) → going to: is going to rain."
            },
            {
              q: "The phone is ringing. – I ____ answer it.",
              options: ["will", "am going to", "answered"],
              answer: 0,
              explain: "Spontane Entscheidung → will: I’ll answer."
            }
          ]
        },
        {
          type: "sentence",
          title: "A6 · Mini-Story",
          points: 8,
          review: "zeitformen-mix",
          case: "Wähle in jedem Kasten die richtige Form.",
          text: "Every day Harry {*walks|walk|walked} to school. Today he {*is walking|walks|walked} because the bus is late. Last week he {*missed|has missed|misses} the bus twice. Tomorrow he {*will take|takes|took} the earlier bus. He {*has|have|is having} already decided: he {*is going to|will|goes} set two alarms.",
          explain: "Signalwörter: every day, today / because (jetzt), last week, tomorrow, already decided → going to."
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
             <h3>Verben ohne -ing</h3>
             <p>know, like, want, need, understand (Wissen, Gefühl, Wunsch) → kein -ing, auch nicht bei „now“.</p>`
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
            { front: "Verben ohne -ing", back: "know, like, want, need, understand (Wissen, Gefühl, Wunsch) bleiben im Simple Present. Nicht „I am knowing“." },
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
            { front: "Signalwörter going to", back: "Plan (already decided) · Beweis (Look! …)" },
            { front: "Simple Present – das -s schreiben", back: "meistens + s · nach s, x, ch, sh, o + es (watches, goes) · Konsonant + y → ies (studies)" },
            { front: "Simple Present – Kurzantwort", back: "Does he live here? Yes, he does. / No, he doesn’t." },
            { front: "Häufigkeitswörter", back: "always, usually, often, sometimes, never – vor dem Verb, nach am / is / are." },
            { front: "Present Progressive – -ing schreiben", back: "make → making (e weg) · run → running (doppelt) · read → reading" },
            { front: "Present Progressive – Frage", back: "am / is / are nach vorn: Is he flying? Are they playing?" },
            { front: "Simple Past – -ed schreiben", back: "live → lived · study → studied · stop → stopped · work → worked" },
            { front: "Simple Past – was / were", back: "I / he / she / it was · you / we / they were. Frage ohne did: Were you at home?" },
            { front: "come / give / buy / eat", back: "came · gave · bought · ate" },
            { front: "meet / get / make / do", back: "met · got · made · did" },
            { front: "Present Perfect – Frage", back: "have / has nach vorn: Have you seen it? Has she finished?" },
            { front: "Present Perfect – Verneinung", back: "haven’t / hasn’t + 3. Form: I haven’t finished yet." },
            { front: "for oder since?", back: "for + Zeitraum (for two years) · since + Startpunkt (since 2023)." },
            { front: "3. Form: gleich wie Simple Past", back: "make → made · buy → bought · find → found · have → had · meet → met" },
            { front: "do / break / know – 3. Form", back: "done · broken · known" }
          ]
        }
      ]
    },

    /* ══════════════ WEITER · TELEPHONING ══════════════ */
    /* ══════════════ LIVE-QUIZ · Fragen für die Stunde ══════════════ */
    {
      id: "live-quiz-simple-present",
      folder: "live-quiz",
      group: "Live-Quiz",
      title: "Live-Quiz · Simple Present",
      kicker: "Live-Quiz · Fragen für die Stunde",
      minutes: 5,
      help: `<h3>Live-Quiz</h3>
             <p>10 Fragen zu: Simple Present.</p>
             <p>Du kannst sie hier allein üben. Im Unterricht stellt die Lehrkraft sie im <strong>Live-Quiz</strong> (quiz.yannikbrand.eu).</p>`,
      steps: [
        {
          type: "quiz",
          title: "Live-Quiz · Simple Present",
          questions: [
            {
              q: "Mia ____ at a bank.",
              options: ["work", "works", "working", "is work"],
              answer: 1,
              explain: "Mia = she → Verb + s: works."
            },
            {
              q: "Which sentence is correct?",
              options: ["Tom don’t like tea.", "Tom doesn’t likes tea.", "Tom not like tea.", "Tom doesn’t like tea."],
              answer: 3,
              explain: "he / she / it → doesn’t + Grundform: doesn’t like."
            },
            {
              q: "Which question is correct?",
              options: ["Is Mia at work?", "Does Mia be at work?", "Do Mia at work?", "Mia is at work does?"],
              answer: 0,
              explain: "Mit be (am / is / are) fragst du ohne do / does."
            },
            {
              q: "She ____ for the exam every evening.",
              options: ["study", "studys", "studies", "studying"],
              answer: 2,
              explain: "Konsonant + y → ies: study → studies."
            },
            {
              q: "Which sentence is correct?",
              options: ["He never is late.", "He is late never.", "He does never late.", "He is never late."],
              answer: 3,
              explain: "Signalwörter wie never stehen nach is / am / are."
            },
            {
              q: "We ____ football on Saturdays.",
              options: ["plays", "play", "are play", "does play"],
              answer: 1,
              explain: "we → Grundform: we play."
            },
            {
              q: "Where ____ Harry live?",
              options: ["do", "is", "does", "did"],
              answer: 2,
              explain: "Harry = he → does + Grundform: Where does Harry live?"
            },
            {
              q: "Which sentence is correct?",
              options: ["Water boils at 100 degrees.", "Water is boiling at 100 degrees.", "Water boil at 100 degrees.", "Water does boils at 100 degrees."],
              answer: 0,
              explain: "Ein Fakt steht im Simple Present. it → boils."
            },
            {
              q: "Which sentence is correct?",
              options: ["My parents doesn’t work on Sundays.", "My parents don’t works on Sundays.", "My parents not work on Sundays.", "My parents don’t work on Sundays."],
              answer: 3,
              explain: "my parents = they → don’t + Grundform: don’t work."
            },
            {
              q: "Mia ____ to school by bus.",
              options: ["goes", "go", "gos", "going"],
              answer: 0,
              explain: "Mia = she → nach o kommt -es: goes."
            }
          ]
        }
      ]
    },

    {
      id: "live-quiz-present-progressive",
      folder: "live-quiz",
      group: "Live-Quiz",
      title: "Live-Quiz · Present Progressive",
      kicker: "Live-Quiz · Fragen für die Stunde",
      minutes: 5,
      help: `<h3>Live-Quiz</h3>
             <p>10 Fragen zu: Present Progressive.</p>
             <p>Du kannst sie hier allein üben. Im Unterricht stellt die Lehrkraft sie im <strong>Live-Quiz</strong> (quiz.yannikbrand.eu).</p>`,
      steps: [
        {
          type: "quiz",
          title: "Live-Quiz · Present Progressive",
          questions: [
            {
              q: "Look! Harry ____ on his broom.",
              options: ["flies", "fly", "is flying", "flying"],
              answer: 2,
              explain: "Look! → jetzt gerade → is + -ing."
            },
            {
              q: "I ____ for a bus at the moment.",
              options: ["am waiting", "wait", "waits", "is waiting"],
              answer: 0,
              explain: "at the moment → am + -ing. Bei I heißt es am."
            },
            {
              q: "Which sentence is correct?",
              options: ["She is writeing a letter.", "She writing a letter.", "She does writing a letter.", "She is writing a letter."],
              answer: 3,
              explain: "Stummes e fällt weg: write → writing. Und is darf nicht fehlen."
            },
            {
              q: "Which sentence is correct?",
              options: ["I am knowing the answer.", "I know the answer.", "I knowing the answer.", "I does know the answer."],
              answer: 1,
              explain: "know beschreibt Wissen, kein Tun. Es bekommt kein -ing."
            },
            {
              q: "____ they playing outside?",
              options: ["Are", "Is", "Do", "Does"],
              answer: 0,
              explain: "they → Are: Are they playing …?"
            },
            {
              q: "Tom isn’t ____ TV now.",
              options: ["watch", "watches", "watching", "watched"],
              answer: 2,
              explain: "isn’t + -ing: isn’t watching."
            },
            {
              q: "Which words tell you: it is happening right now?",
              options: ["every Monday", "at the moment", "last week", "always"],
              answer: 1,
              explain: "at the moment, now, Look!, Listen! → Present Progressive."
            },
            {
              q: "The children ____ in the garden.",
              options: ["is running", "are runing", "runs", "are running"],
              answer: 3,
              explain: "they → are. run → running (n wird doppelt)."
            },
            {
              q: "Be quiet! The baby ____.",
              options: ["sleeps", "sleep", "is sleeping", "sleeping"],
              answer: 2,
              explain: "Be quiet! → jetzt gerade → is + -ing."
            },
            {
              q: "Which question is correct?",
              options: ["Does he reading a book?", "Is he reading a book?", "He is reading a book?", "Are he reading a book?"],
              answer: 1,
              explain: "is nach vorn: Is he reading …? Kein does."
            }
          ]
        }
      ]
    },

    {
      id: "live-quiz-simple-past",
      folder: "live-quiz",
      group: "Live-Quiz",
      title: "Live-Quiz · Simple Past",
      kicker: "Live-Quiz · Fragen für die Stunde",
      minutes: 5,
      help: `<h3>Live-Quiz</h3>
             <p>10 Fragen zu: Simple Past.</p>
             <p>Du kannst sie hier allein üben. Im Unterricht stellt die Lehrkraft sie im <strong>Live-Quiz</strong> (quiz.yannikbrand.eu).</p>`,
      steps: [
        {
          type: "quiz",
          title: "Live-Quiz · Simple Past",
          questions: [
            {
              q: "Harry ____ his letter in 1991.",
              options: ["receive", "receives", "has received", "received"],
              answer: 3,
              explain: "in 1991 ist eine genaue Zeit → Simple Past: received."
            },
            {
              q: "The past form of “go” is …",
              options: ["goed", "went", "gone", "goes"],
              answer: 1,
              explain: "go ist unregelmäßig: go → went."
            },
            {
              q: "Which sentence is correct?",
              options: ["We didn’t went to school.", "We not went to school.", "We didn’t go to school.", "We didn’t goes to school."],
              answer: 2,
              explain: "didn’t + Grundform: didn’t go."
            },
            {
              q: "____ you see the film last night?",
              options: ["Did", "Do", "Have", "Were"],
              answer: 0,
              explain: "last night → Simple Past. Frage mit Did + Grundform."
            },
            {
              q: "She ____ a new phone two days ago.",
              options: ["buyed", "bought", "buys", "has buy"],
              answer: 1,
              explain: "buy ist unregelmäßig: buy → bought."
            },
            {
              q: "____ you at home yesterday?",
              options: ["Did", "Was", "Are", "Were"],
              answer: 3,
              explain: "you → were. Mit be gibt es kein did."
            },
            {
              q: "Mia ____ for her exam last night.",
              options: ["studied", "studyed", "studies", "studiing"],
              answer: 0,
              explain: "Konsonant + y → ied: study → studied."
            },
            {
              q: "Yesterday Mia ____ breakfast at six.",
              options: ["eated", "eats", "ate", "eaten"],
              answer: 2,
              explain: "eat ist unregelmäßig: eat → ate."
            },
            {
              q: "Which question is correct?",
              options: ["Did she went to the party?", "Did she go to the party?", "Does she went to the party?", "Was she go to the party?"],
              answer: 1,
              explain: "Did + Grundform: Did she go …?"
            },
            {
              q: "Last week we ____ our aunt.",
              options: ["visited", "visit", "visiting", "visits"],
              answer: 0,
              explain: "last week → Simple Past: visit + ed = visited."
            }
          ]
        }
      ]
    },

    {
      id: "live-quiz-present-perfect",
      folder: "live-quiz",
      group: "Live-Quiz",
      title: "Live-Quiz · Present Perfect",
      kicker: "Live-Quiz · Fragen für die Stunde",
      minutes: 5,
      help: `<h3>Live-Quiz</h3>
             <p>10 Fragen zu: Present Perfect.</p>
             <p>Du kannst sie hier allein üben. Im Unterricht stellt die Lehrkraft sie im <strong>Live-Quiz</strong> (quiz.yannikbrand.eu).</p>`,
      steps: [
        {
          type: "quiz",
          title: "Live-Quiz · Present Perfect",
          questions: [
            {
              q: "I have ____ my keys. I can’t get in.",
              options: ["lost", "lose", "losed", "loses"],
              answer: 0,
              explain: "have + 3. Form: lose → lost."
            },
            {
              q: "Which sentence is correct?",
              options: ["She have just left.", "She has just leave.", "She has just left.", "She is just left."],
              answer: 2,
              explain: "she → has + 3. Form: has just left."
            },
            {
              q: "He has ____ to Berlin.",
              options: ["went", "gone", "go", "goes"],
              answer: 1,
              explain: "have / has + 3. Form: go → gone."
            },
            {
              q: "Which sentence is correct?",
              options: ["I have seen him yesterday.", "I has seen him yesterday.", "I see him yesterday.", "I saw him yesterday."],
              answer: 3,
              explain: "yesterday ist eine genaue Zeit → Simple Past: saw."
            },
            {
              q: "I have lived here ____ 2020.",
              options: ["for", "from", "since", "at"],
              answer: 2,
              explain: "since + Startpunkt (2020)."
            },
            {
              q: "We have lived here ____ three years.",
              options: ["for", "since", "from", "at"],
              answer: 0,
              explain: "for + Zeitraum (three years)."
            },
            {
              q: "Have you ____ been to London?",
              options: ["since", "ago", "last", "ever"],
              answer: 3,
              explain: "ever = jemals: Have you ever been …?"
            },
            {
              q: "“Has she finished?” – “No, she ____.”",
              options: ["haven’t", "hasn’t", "doesn’t", "isn’t"],
              answer: 1,
              explain: "Frage mit Has → Kurzantwort: No, she hasn’t."
            },
            {
              q: "Which sentence is correct?",
              options: ["They has never been to Paris.", "They have never be to Paris.", "They have been never to Paris.", "They have never been to Paris."],
              answer: 3,
              explain: "they → have. never steht nach have: have never been."
            },
            {
              q: "She has ____ her homework already.",
              options: ["finish", "finishing", "finished", "finishes"],
              answer: 2,
              explain: "has + 3. Form: has finished."
            }
          ]
        }
      ]
    },

    {
      id: "live-quiz-gemischt",
      folder: "live-quiz",
      group: "Live-Quiz",
      title: "Live-Quiz · Alle vier gemischt",
      kicker: "Live-Quiz · Fragen für die Stunde",
      minutes: 6,
      help: `<h3>Live-Quiz</h3>
             <p>12 Fragen zu: Alle vier gemischt.</p>
             <p>Du kannst sie hier allein üben. Im Unterricht stellt die Lehrkraft sie im <strong>Live-Quiz</strong> (quiz.yannikbrand.eu).</p>`,
      steps: [
        {
          type: "quiz",
          title: "Live-Quiz · Alle vier gemischt",
          questions: [
            {
              q: "Mia usually walks to work, but right now she ____ the bus.",
              options: ["takes", "took", "is taking", "has take"],
              answer: 2,
              explain: "right now → Present Progressive: is taking."
            },
            {
              q: "Last summer we ____ to Spain.",
              options: ["went", "have gone", "go", "are going"],
              answer: 0,
              explain: "last summer ist eine genaue Zeit → Simple Past: went."
            },
            {
              q: "I ____ my homework yet.",
              options: ["didn’t finish", "don’t finish", "am not finishing", "haven’t finished"],
              answer: 3,
              explain: "yet → Present Perfect: haven’t finished."
            },
            {
              q: "He ____ football every Saturday.",
              options: ["is playing", "plays", "played", "has played"],
              answer: 1,
              explain: "every Saturday → Gewohnheit → Simple Present: plays."
            },
            {
              q: "Tom ____ in Berlin since 2021.",
              options: ["has lived", "lived", "lives", "is living"],
              answer: 0,
              explain: "since + Startpunkt → Present Perfect: has lived."
            },
            {
              q: "Listen! Someone ____ the piano.",
              options: ["plays", "played", "has played", "is playing"],
              answer: 3,
              explain: "Listen! → jetzt gerade → is playing."
            },
            {
              q: "Yesterday I ____ a great film.",
              options: ["have seen", "saw", "see", "am seeing"],
              answer: 1,
              explain: "yesterday → Simple Past: saw."
            },
            {
              q: "She ____ three emails already.",
              options: ["wrote", "writes", "has written", "is writing"],
              answer: 2,
              explain: "already → Present Perfect: has written."
            },
            {
              q: "Which sentence is correct?",
              options: ["Is he knowing the answer?", "Does he knows the answer?", "Has he know the answer?", "Does he know the answer?"],
              answer: 3,
              explain: "know bekommt kein -ing. Nach Does steht die Grundform."
            },
            {
              q: "Have you ever ____ sushi?",
              options: ["ate", "eaten", "eat", "eating"],
              answer: 1,
              explain: "have + 3. Form: eat → eaten."
            },
            {
              q: "Which time word goes with the Simple Past?",
              options: ["two days ago", "already", "right now", "every day"],
              answer: 0,
              explain: "two days ago ist eine genaue Zeit in der Vergangenheit → Simple Past."
            },
            {
              q: "Which sentence is correct?",
              options: ["We haven’t saw him last night.", "We don’t saw him last night.", "We didn’t see him last night.", "We didn’t saw him last night."],
              answer: 2,
              explain: "didn’t + Grundform: didn’t see."
            }
          ]
        }
      ]
    }
,

    {
      id: "weiter-telephoning",
      group: "Weiter",
      title: "Weiter geht's: Telephoning",
      kicker: "Ausblick",
      minutes: 3,
      help: `<h3>Weiterlernen</h3>
             <p>Die Zeitformen sitzen? Dann geht es an echte Gespräche: höflich telefonieren, Namen und Nummern buchstabieren, Termine machen und ein Hotel buchen.</p>
             <p class="formula">Nächster Kurs: <b>Telephoning</b> (Fach Englisch).</p>`,
      steps: [
        {
          type: "slides",
          title: "Dranbleiben",
          slides: [
            {
              style: "dark",
              kicker: "Ausblick",
              title: "Grammatik sitzt? Dann kommt der Alltag.",
              body: `<p>Mit den Zeitformen kannst du Sätze bilden. Im echten Büro telefoniert man aber auch auf Englisch – höflich, klar und sicher.</p>`
            },
            {
              style: "accent",
              kicker: "Nächster Kurs",
              title: "Telephoning",
              body: `<p>Redemittel, Buchstabieren, Termine machen und ein Hotel buchen – mit Dr Kiesbauer und Wilkinson and Friends Ltd.</p>`
            }
          ]
        },
        {
          type: "link",
          title: "Zum Kurs „Telephoning“",
          text: "Öffne den Kurs Telephoning und arbeite die Themen der Reihe nach durch. Danach: die Lernkarten wiederholen und die Übungsklausur schreiben.",
          href: "app/#/f/englisch-telephoning"
        }
      ]
    }
  ]
});
