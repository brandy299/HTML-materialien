# Creative Director – Handbuch & Stand

Dieses Dokument ist das Gedächtnis des Creative Directors. Wer in einem neuen Chat weiterarbeitet, liest es
zuerst und **aktualisiert es am Ende jeder Sitzung** (Abschnitte „Stand“, „Entscheidungen“, „Offen“).

## Auftrag

Die Lehrkraft (Yannik Brand) liefert Unterrichtsmaterial. **Content-Agenten** machen daraus Kurse
(`app/kurse/*.js`, siehe `app/AGENT-ANLEITUNG.md`) und veröffentlichen selbst. Der **Creative Director**
sorgt dafür, dass alles wie aus einem Guss wirkt:

- Startseite (`index.html`, `site/`) und Navigation in der App
- Designsystem und App-Funktionen (`app/app.js`, `app/styles.css`)
- neue Aufgabentypen und Funktionen nach Wünschen (Issues mit Label `design`)
- Qualität neuer Kurse: Stil, Einheitlichkeit, inhaltliche Fehler (Tipps und Lösungen gegenprüfen!)
- Kuratierung: Was steht oben, was ist neu, welche Klausur steht an
- Werkzeuge: Inhalts-Check (`app/tools/check-kurse.js`), GitHub-Check (`.github/workflows/lernraum-check.yml`)

## Stand (zuletzt aktualisiert: 28.09.2026)

- **Live:** https://lernen.yannikbrand.eu (Startseite) · https://lernen.yannikbrand.eu/app/ (App).
  Domain bei netcup, CNAME `lernen` → `brandy299.github.io`. Im Schulnetz (Sophos-Firewall) inzwischen erreichbar.
- **Kurse:** PBP · HS1 Personalbedarf (vom Creative Director erstellt, 10 Themen inkl. Übungsklausur und
  Endlos-Training) · GPU · HS1Y Preiskalkulation (3 Themen) · INWI · HHU Geschäftsbrief nach DIN 5008
  (mit Word-Simulation) · Englisch · Förderkurs Englisch (Zeitformen, Harry-Potter-Beispiele, 4 Themen;
  Review in Issue #24 am 28.09.2026, Fehler korrigiert). Alle außer PBP von Content-Agenten.
- **Funktionen:** Folien, Quiz, Zuordnen, Lückentext, Rechenschema mit Zahlenfeld, Satzbausteine, Lernkarten,
  Kann-Liste, **Word-Simulation v3 in eigener Vollbild-Word-Umgebung (Bedienen mit Enter/Griffen/Strg-Kürzeln,
  Sprechblasen, Geisterhand, Lineale, Zoom; 26.09.2026)**, Übungsklausur (Timer,
  Note, Erwartungshorizont), Endlos-Training (Personalbedarf; Zeitformen Englisch seit 28.09.2026), Hilfe (gestufte Tipps, Merkkasten, Lexikon),
  ↺ Aufgabe/Thema zurücksetzen, QR-Codes mit Beamer-Ansicht, Einzeldatei-Build, Offline/PWA.
- **Startseite:** Hero mit Neuigkeiten (neuester Kurs, Klausur-Countdown), Zahlen, Kurse (neueste zuerst,
  Badge „Neu“ ≤ 14 Tage / „Aktualisiert“ ≤ 7 Tage), So geht's, Funktionen, Installieren, Lehrkräfte.
  Liest alle Kurse automatisch aus `app/index.html`.

## Designsystem („Typesafe“-Stil – von der Lehrkraft gewünscht)

Vorbild: typesafe.ai (pinke gerasterte Wolken, Retro-Fenster, riesige Grotesk-Überschriften, Terminal-Look).
Stilstudie der Lehrkraft war die Vorlage.

- **Farben** (`app/styles.css` → `:root`): Papier `#FEFEFE`, Tinte `#1E1E1E`, Panel `#E9E9E6`,
  Pink `#F386A1`, Pink tief `#D45BB6`, Grün (richtig) `#0A8F57`, Rot (falsch) `#C1354F`, Terminal-Grün `#5CE0A8`.
  Nur helles Design (bewusst kein Dark Mode).
- **Schrift:** Archivo 800 für Überschriften (eng, `letter-spacing` negativ), JetBrains Mono für Labels,
  Titelleisten, Terminal. Beide **lokal gehostet** in `app/fonts/` (seit 01.10.2026, keine Verbindung zu Google; OFL-Lizenzen liegen dabei).
- **Bausteine:** `.win` + `.bar` (Fenster mit schwarzer Titelleiste, pinker Punkt), harte Schatten
  `4px 4px 0 var(--ink)`, `.term` (Terminal-Rückmeldung), `.btn` (eckig, Großbuchstaben), Pixelwolke per
  Bayer-Dithering (`dither()` in app.js, `drawCloud()` in site/landing.js), Ecken-Markierungen.
- **Regeln:** Mobile first (390 px), keine seitliche Scrollbar, große Tippflächen (≥ 44 px),
  Rückmeldung immer im Terminal-Stil, keine Emojis als Deko.

## Wichtige Entscheidungen (mit Grund)

- **Meine Fächer (28.09.2026):** Beim ersten Start wählen Schüler/innen ihre Fächer (Kacheln mit vollem Namen + Klasse).
  Die Startseite zeigt nur diese Fächer; „Weiter mit …“ nur aus den eigenen Fächern. Wer per QR/Link in einen Kurs
  kommt, bekommt das Fach automatisch dazu und überspringt die Auswahl. Speicher: `lernraum.faecher`
  (`null` = nie gewählt, `[]` = alle). Grund: Lehrkraft-Feedback „PBP-Schüler könnten verwirrt werden“.
- **Kommazahlen im Zahlenfeld (30.09.2026, Issue #15):** `calc` mit `decimals: 2` (oder Kommawert) zeigt eine Komma-Taste,
  max. 2 Nachkommastellen, tolerante Prüfung (Toleranz 0,005), Anzeige mit festen Nachkommastellen. Erste Nutzung: GPU „A4 · Bezugskalkulation“.
- **Geführte Probeklausur (29.09.2026):** `exam.guided: true` + `guide`-Folien pro Aufgabe. Bewertung wie Klausur, aber ohne Timer,
  mit Rückmeldung/Hilfe (Reiter „Erklärung“ im ?-Fenster). Erstes Beispiel: PBP `probeklausur-2` (Sporthaus Lindner, 11 Aufgaben,
  40 P), Link `…/app/#/f/pbp/probeklausur-2`. Steht vor der zeitlich begrenzten Übungsklausur 1 (erst üben, dann Klausur).
  Wunsch der Lehrkraft: „gute, aufschlussreiche Erklärungen vor den Aufgaben“, „separat verlinkbar“.
- **Sprachen der Oberfläche (28.09.2026):** Deutsch, Englisch, Arabisch – umschaltbar beim ersten Start, unter „Ich“ und
  **mitten in einer Aufgabe im Hilfe-Fenster (?)**. Der Wechsel lädt nicht neu: Eingaben bleiben erhalten, `retranslate()` schreibt alle sichtbaren
  Oberflächentexte der Aufgabe um (Textknoten, die exakt einem i18n-Text entsprechen; Kursinhalte werden übersprungen).
  Mischtexte deshalb immer als eigenen Knoten bauen: `<span>${tr("…")}</span>`. In der Übungsklausur gibt es keinen Wechsel (keine Hilfe).
  Übersetzt werden nur Knöpfe, Anleitungen („So geht's“), Rückmeldungen und Tipps-Rahmen; **Kursinhalte bleiben deutsch**
  (Prüfungssprache). Texte in `app/i18n.js`, deutscher Text = Schlüssel. Jeder neue Oberflächentext in `app.js` muss durch
  `tr("…")` laufen und in beiden Sprachen stehen – `node app/tools/check-i18n.js` prüft das (auch im GitHub-Check).
  Arabisch: Layout bleibt links→rechts (Inhalte sind deutsch), keine Sperrung, Systemschrift für arabische Zeichen.
  Die arabischen Texte sind maschinennah formuliert – **von einer muttersprachlichen Person gegenlesen lassen** (offen).
- **Lerncode + Startbildschirm (01.10.2026):** `#/sichern` (Profil → „Fortschritt sichern“, auch auf dem Willkommensbildschirm): Code `LR1z.…` = alle
  `lernraum.*`-Werte, komprimiert (deflate-raw), als Text kopieren oder als Datei speichern; Einlesen **führt zusammen** (je Thema der neuere Stand, Schritte vereinigt,
  Training mit mehr Runden), stellt Name/Fächer/Sprache wieder her. Nur `lernraum.*`-Schlüssel werden gelesen/geschrieben. Hinweiskarte „App auf den Startbildschirm“
  (nur Handy, https, nicht installiert, nach erstem Lernfortschritt, „Später“ = 14 Tage Ruhe; im Profil immer). Grund: Safari kann Browserdaten nach ca. 7 Tagen ohne Besuch löschen; installierte Apps nicht.
- **Übersetzungen laden bei Bedarf (01.10.2026):** `app/index.html` enthält `<link rel="x-lernraum-i18n" lang="ar" href="uebersetzungen/…">`; `loadLang()` in app.js lädt die Dateien erst,
  wenn die Sprache gewählt ist (Deutsch-Schüler sparen ca. 340 KB). Einzeldatei bettet sie fest ein. Offline: wurde die Sprache einmal geladen, liegt sie im Service-Worker-Cache.
- **Übersetzte Kursinhalte (28.09.2026):** Pro Kurs und Sprache `app/uebersetzungen/<kurs-id>.<en|ar>.js`, Schlüssel = deutscher
  Text. Welche Felder übersetzbar sind, legt `mapTexts()` in `content.js` fest (App und Werkzeuge nutzen dieselbe Funktion).
  Nicht übersetzt: Übungsklausur, Word-Simulation, Endlos-Training, Links. Fachbegriffe und Lösungswörter bleiben deutsch
  (Prüfungssprache), Übersetzung in Klammern. Werkzeug: `node app/tools/texte.js <kurs> <sprache>` bzw. `--stand`.
  Sprachwechsel mitten in einer übersetzten Aufgabe startet die Aufgabe neu (Inhalt ändert sich), sonst bleibt sie stehen.
- **Grafiken nur als Bausteine (28.09.2026):** `zeitstrahl()` und `ablauf()` in `content.js`, Stil in `styles.css`
  (`.dia-*`). Content-Agenten zeichnen keine eigenen SVGs/Bilder (Check warnt). Neue Diagrammtypen baut der Creative Director.

- **Keine Freitext-Aufgaben**, alles automatisch prüfbar – Niveau der Schüler/innen (Wunsch der Lehrkraft).
  Für deuten/erklären/Stellung nehmen: Satzbausteine (`sentence`).
- **Kein Backend/Supabase, kein Login** – bewusst, vorerst. Fortschritt nur im localStorage.
- **Nur neue Inhalte** auf der Plattform. Alte Materialien (vor 18.09.2026) nicht einbinden;
  alte Übersicht liegt unter `uebersicht-alt.html`.
- **Content-Agenten mergen selbst** nach grünem Check. Branch `kurs/<id>`, nur Kursdateien.
- **Übungsklausur** ohne ↺ und ohne Hilfe. Notenschlüssel 92/81/67/50/30 % (von der Lehrkraft nicht bestätigt).
- **Zahlenfeld** nur ganze Zahlen – deshalb hat „Der Bezugspreis“ (GPU) keine Rechenaufgabe.
- **Weihnachtsgeschäft** als „extern“ eingeordnet (PBP) – von der Lehrkraft nicht bestätigt.
- **Word-Simulation als eigener Schritt-Typ `word` (26.09.2026):** Kurse sind nur Daten – Interaktion gehört in
  die Engine. v1 kann Schriftart/-grad, Fett, Ausrichtung, Leerzeilen und Seitenränder; Startzustand Arial 10,
  Zielwerte wie das Word-Arbeitsblatt (DIN 5008). Bewusst keine echte Word-Datei: Handy-taugliche Klick-Übung,
  der echte Transfer bleibt das Formatieren am PC. Geführt (Aufgabe für Aufgabe) und frei (Live-Checkliste).
- **Simulator-Umgebung v2 (26.09.2026):** Der `word`-Schritt öffnet als eigene Vollbild-Umgebung im Word-Look
  (Ribbon mit Tabs, Lineal, A4-Seite, Statusleiste, blaue Auswahl) und verlässt bewusst die Typesafe-Sprache –
  Wunsch der Lehrkraft („eher zum Word-Simulator passend“). Die Engine-Schnittstelle bleibt unverändert; pro
  Aufgabe leuchtet die betroffene Zeile auf, die passenden Bedienelemente pulsieren. Zonen-Schaubild für
  Kurs-Folien als Baustein `.brief-mock` ergänzt (erster Einsatz: INWI-Kurs-Update).
- **Simulator v3 – Bediengefühl + Word-Treue (26.09.2026):** Nach Lehrkraft-Feedback („Klicks statt Bedienen“,
  „zu wenig Word-Detail“): Tastaturleiste mit **Enter/⌫/Strg+A/B/R** (am PC die echten Tasten, Enter fügt
  Leerzeilen ein wie in Word), **Markieren per Zieh-Griffen**, Sprechblase direkt an der Zielzeile,
  **Geisterhand** nach 12 s Untätigkeit, ¶-Schalter, angedeutete (deaktivierte) Word-Befehle, waagerechtes und
  senkrechtes Lineal, Statusleiste mit Wörtern, Auswahl und **Zoom** (80–175 %), Fehl-Rückmeldung mit Tipp.
  Kursdaten unverändert; Sprechblasen-Kurztexte über `task.kurz`.

## Offen / Ideen

- [ ] Arabisch von Muttersprachler/in prüfen lassen (Prüfliste: `docs/ARABISCH-PRUEFLISTE.md`; Blindtest per Rückübersetzung am 30.09.2026 ohne Bedeutungsfehler; die Lehrkraft kennt keine Muttersprachler/in – Idee: arabischsprachige Schüler/innen die Liste bestätigen lassen): Oberfläche (`app/i18n.js`) und Kursinhalte (`app/uebersetzungen/*.ar.js`,
      Stand 29.09.2026: PBP 590/606 (inkl. Probeklausur 2); früher 28.09.: PBP 405/421, GPU 179/205, INWI 197/209, Englisch 266/485 – Rest bewusst deutsch/englisch).
      Unsichere Begriffe u. a.: Fortschreibung, Zieleinkaufspreis, Selbstkosten, hochrechnen, Rücksendeangabe, rechts-/linksbündig.
- [ ] Englische Übersetzung der Kursinhalte (gleiches Verfahren: `node app/tools/texte.js <kurs> en`).
- [ ] Optional: Fachbegriffe (Lernkarten) zusätzlich auf Englisch/Arabisch als Verständnishilfe – bräuchte Übersetzungen pro Kurs.
- [ ] Weitere Diagrammtypen bei Bedarf: Verzweigung/Baum (Ersatz-/Neubedarf), Balken (Ist/Soll). `sechseck()` gibt es seit 29.09.2026.
- [ ] three.js-Studie (29.09.2026, Artifact „Lernraum in 3D“): A 3D-Pixelwolke Startseite, B Sechseck zum Drehen, C Abschluss-Belohnung.
      Empfehlung: gezielt (Startseite, erklärende Inhalte, Abschluss), nicht in Aufgaben; three.js lokal in app/vendor, 2D-Rückfall.
      Entscheidung der Lehrkraft steht aus.
- Entscheidung 29.09.2026: **Arabische Kursinhalte nur für PBP** (Pflicht, im Check hinterlegt: `PFLICHT` in check-kurse.js).
  GPU/INWI/Förderkurs haben aus der Anfangsphase arabische Dateien – werden nicht weiter gepflegt; keine neuen Kurse übersetzen.
- [ ] Feld `color`/`glyph` der Kurse wird von der App aktuell nicht genutzt (Design bewusst einheitlich pink).

- [x] Kommazahlen im Zahlenfeld (#15) – erledigt 30.09.2026.
- [ ] **Impressum** – Pflicht bei eigener Domain; Angaben muss die Lehrkraft liefern. Im Footer verlinken.
- [x] Google Fonts lokal eingebunden (01.10.2026). Rücksprung-Anleitung: `docs/ROLLBACK.md`.
- [ ] Übungspaket 3 (PBP) wurde nie geliefert.
- [ ] Endlos-Training gibt es für Personalbedarf und Zeitformen. Weitere Generatoren denkbar (z. B. Bezugskalkulation mit zufälligen Preisen – Kommazahlen gibt es jetzt).
- [ ] Englisch: Wenn der Content-Agent Present Perfect / Past Progressive / will-Future liefert, diese in `tenses` des Trainings aufnehmen (der Agent darf das selbst).
- [ ] Word-Simulation: zweiter Fall als Transfer (z. B. Kunststoffwerke-Brief), Blocksatz-Aufgabe und
      „Speichern unter“ mit Dateinamen-Regel; Prüfungsmodus (Zeit/Punkte/Note) als mögliche Stufe 3.
- [ ] Referenz-Screenshots von Word 2016 (Schul-PC) können Symbole und Dialoge weiter schärfen.
- [ ] Optional: Branch-Schutz für `main` in den GitHub-Einstellungen (Lernraum-Check als Pflicht) –
      muss die Lehrkraft selbst in GitHub aktivieren.

## Arbeitsweise

1. Zu Beginn: dieses Dokument lesen, `git log --oneline -15`, offene Issues mit Label `design` und offene PRs ansehen.
2. Neue Kurse seit dem letzten Stand durchsehen (`git log -- app/kurse`), `node app/tools/check-kurse.js` laufen lassen,
   stichprobenartig Tipps/Lösungen gegenprüfen, Kurs in der App durchklicken.
3. Änderungen über eigenen Branch + PR, vorher testen (Playwright/Chromium ist in Claude-Code-Umgebungen vorhanden),
   dann selbst mergen. Die Lehrkraft möchte die Ergebnisse sehen, nicht jeden Zwischenschritt freigeben.
4. Am Ende: „Stand“, „Entscheidungen“, „Offen“ hier aktualisieren und mitcommitten.

## Startprompt für einen neuen Chat

```
Du bist Creative Director für meine Lern-Website Lernraum im Repo brandy299/HTML-materialien
(live: https://lernen.yannikbrand.eu). Lies zuerst CLAUDE.md und docs/CREATIVE-DIRECTOR.md,
schau dir die offenen Issues mit Label "design" und neue Kurse seit dem letzten Stand an
und sag mir kurz, was ansteht. Dann: [DEIN AUFTRAG]
```

## Darstellung: Dark Mode und Textgröße (01.10.2026)

- `app/theme.js` (zuerst im `<head>`) setzt `data-theme` (light/dark) und `data-ts` (m/l/xl) am `<html>`. Gespeichert in `lernraum.theme` (auto/light/dark) und `lernraum.textsize`.
- Dark Mode = Tinte und Papier tauschen die Rollen (Variablen in `styles.css`, Block „Dark Mode“). Rosa-Flächen nutzen `--pink-fill` (im Dunkeln dunkler, damit Schrift lesbar bleibt), Terminals/Footer `--term-bg`. Neue Farben immer als Variable anlegen, nie `#fff`/`#000` für Oberflächen.
- Pixelwolken (Canvas/Shader) haben dunkle Paletten und zeichnen bei `lernraum-theme` neu.
- Textgröße über `zoom` auf `body` (1,12 / 1,25); untere Leiste bleibt normal groß.
- Schalter: Profil → Darstellung; Startseite: Knopf in der Navigation.

## Erklärvideos (Stand 02.10.2026: in der App eingebunden)

- **Idee:** Videos im Plattform-Stil (9:16, 20–60 s) als Einstieg in ein Thema; danach kommen die geprüften Übungen. Ein Video ersetzt nie eine Aufgabe.
- **Wiedergabe live, nicht als mp4:** Die App führt die Animation mit dem Baukasten aus (`app/videos/lib/lv.js`, `lv.css`, Quelle `app/videos/src/<id>.js`, wird erst bei Bedarf geladen) und spielt die Musik (`<id>.m4a`, ca. 0,2–0,4 MB). Vorteile: Dark Mode, scharf, wenige KB, Textfassung, später EN/AR. Das mp4 ist nur zum Teilen. Der Baukasten ist eine Komponente: `LV.create(def, host, {audio, maxH})` → `play/pause/seek/nextScene/prevScene/setMuted/info/on/destroy`.
- **Einbindung:** Feld `video` (+ `videoTitle`, `videoMinutes`) **am Thema**, nicht als Schritt, damit Schritt-Nummern und gespeicherter Fortschritt unverändert bleiben (Fortschritt `p.video = true`). Route `#/f/<kurs>/<thema>/video`. Karte oben im Thema (Vorschaubild hell/dunkel), „Starten“ führt zuerst zum Video, solange das Thema nicht begonnen wurde. Der Schritt-Typ `video` (in `steps`) existiert zusätzlich für neue Themen ohne Fortschritt.
- **Bedienung:** Tippen ins Bild: links Szene zurück, rechts Szene vor, Mitte Pause. Tasten darunter (zurück, Start/Pause, vor, Ton, Text). Textmodus (bei „weniger Bewegung“ automatisch); am Desktop steht der Text dauerhaft neben dem Video, die laufende Szene ist hervorgehoben. Als „angesehen“ zählt ab ca. 90 %. Der Ton startet nur nach Tipp (iPhone). Ohne Ton/Ladefehler: Hinweis bzw. Rückfall mit „Weiter“.
- **Größe/Vollbild (04.10.2026):** Bühne ca. 17 % größer, Steuerung als Leiste über dem Bild (blendet beim Abspielen aus). Vollbild-Taste (oder F, Esc beendet); die Bühne wird dafür in den `body` gesetzt, weil der Player-Container eine Transformation hat. Geplant: weitere INWI-Videos („Typische Fehler“ als Fehlerjagd, „Abstände und Schrift“).
- **Word-Simulation (Beschluss 04.10.2026):** Auf dem Handy (< 700 px) zeigt der Schritt `word` nur einen Hinweis „Das übst du am PC“ + Weiter (Fortschritt/Schritt-Nummern unverändert); Tablet/PC behalten den Simulator. Am Handy übernehmen das Video `inwi-word-formatieren` und geprüfte Kurzaufgaben (Klickwege, Werte, „Finde den Fehler“). `step.phone = true` erzwingt den Simulator. Neuer Schritt-Typ **`spot`** („Finde den Fehler“: Briefausschnitt, falsche Zeile antippen, Erklärung danach; `app/README.md`) – im Thema `fehlercheck` (INWI Teil 3) nach dem Quiz A6; dadurch rücken dort die Schritte danach um eins (neuer Kurs, kaum Fortschritt betroffen).
- **Werkzeuge:** `node app/tools/render-video.js <id>` (`--sheet` Vorschaubogen, `--txt-only`, `--audio-only`, `--poster-only`, `--hq`), `app/tools/video-music.py` (selbst erzeugte, rechtefreie Musik), `app/tools/check-videos.js` (CI: mp4 ≤ 4 MB, m4a ≤ 1 MB, ≤ 90 s, 9:16, alle Dateien) und Prüfung in `check-kurse.js`. Service Worker lässt m4a/mp4/Range-Anfragen in Ruhe. Einzeldatei (`dist/lernraum.html`) zeigt statt des Videos einen Hinweis.
- **Agenten:** `app/VIDEO-ANLEITUNG.md`, `docs/VIDEO-DESIGNSPRACHE.md`, `app/AGENT-ANLEITUNG.md` (Feld am Thema). CI erlaubt Content-Branches `app/videos/src/*.js` und `app/videos/<id>.mp4|m4a|jpg|txt`.
- **Videos:** `pbp-bedarf-berechnen` (LS 2.1 Teil 1, Rechenschema mit „Zwischensumme“; Brutto/Netto/Fortschreibung erst ab Übungsblatt 1), `pbp-ersatz-neubedarf` (LS 2.1 Teil 2, Falle „ursprünglicher Ist“), `inwi-neun-zonen` (INWI Teil 1, Baustein `LV.page`: A4-Brief mit Kamerafahrt durch die neun Zonen; Modellunternehmen Fly Bike Werke GmbH, anderer Brief als in den Aufgaben), `inwi-fehlerjagd` (INWI Teil 3: Brief mit sechs Fehlern, `LV.page` mit `left:[3]` und nummerierten Marken), `inwi-word-formatieren` (INWI Teil 2, Baustein `LV.word`: Menüband mit Zeiger, Brief wird in 8 Schritten formatiert), `englisch-present-perfect` (Zeitstrahl, Kästen, Schlagwörter; noch keinem Thema zugeordnet). **Modellunternehmen bleibt Mediaworld** (Beschluss 02.10.2026): „Mediaworld, ein Jahr später“ (Ist 23, Abgänge 4, Zugang 1, Soll 25), andere Zahlen als in den Aufgaben A1–A8.
- **Ungetestet:** echte Geräte (iPhone/Android), Ton (nur technisch geprüft), Leistung auf alten Handys (Wiedergabe ist auf ca. 30 Bilder/s begrenzt). Bei Problemen: `video:` am Thema entfernen schaltet das Video ab, der Rest bleibt.
- **Offen:** Texte der Videos auf Englisch/Arabisch (Textfassung vorhanden, Übersetzung fehlt); weitere Videos (z. B. „Bedarf decken“); Hosting-Limits prüfen; Zähler „Video angesehen“ im Fortschritts-Lerncode ist enthalten (Teil von `lernraum.progress`).
