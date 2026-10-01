# Anleitung für KI-Agenten: neue Übungen für den Lernraum

Diese Datei richtet sich an einen KI-Agenten (z. B. Claude Code), der neue Kurse oder Übungen
für die Lern-App „Lernraum“ erstellt und auf GitHub veröffentlicht.

- **Repository:** `brandy299/HTML-materialien`
- **Live:** https://lernen.yannikbrand.eu/app/ (GitHub Pages, Branch `main`)
- **Zielgruppe:** Schüler/innen eines Berufskollegs in NRW, Niveau eher niedrig, Nutzung fast nur am Handy
- **Sprache:** Deutsch (Englisch-Kurse: Aufgaben auf Englisch, Erklärungen dürfen deutsch sein)
- **Deine Rolle:** Content-Agent. Du lieferst Inhalte. Design, Startseite und App-Funktionen gehören dem
  Creative Director (siehe `CLAUDE.md`). Fehlt dir eine Funktion (z. B. ein neuer Aufgabentyp),
  baue sie **nicht** selbst, sondern lege ein GitHub-Issue mit dem Label `design` an und nutze bis dahin
  vorhandene Typen.

## Zwei Wege, Inhalte hinzuzufügen

### Weg A (bevorzugt): Kurs in der App
Die App bringt Design, Navigation, Hilfe, QR-Codes und Auswertung mit. Du schreibst **nur Inhalte**
als JavaScript-Datenobjekt – kein HTML, kein CSS, keine App-Logik.

1. Neue Datei `app/kurse/<fach>-<thema>.js` anlegen (Kleinbuchstaben, Bindestriche), z. B. `app/kurse/gpu-abc-analyse.js`.
2. Inhalt nach diesem Muster (vollständiges Beispiel: `app/kurse/pbp-personalbedarf.js`):
   ```js
   LERNRAUM.subjects.push({
     id: "gpu-abc",               // eindeutig, nur a–z, 0–9, Bindestrich
     fach: "GPU",                 // Fachkürzel = Abschnitt auf der Startseite (gleich wie Ordner in materialien/)
     name: "ABC-Analyse",         // Kursname
     course: "GPU · HS1",         // Fach · Klasse
     company: "Böckler-Office GmbH", // Modellunternehmen (optional)
     description: "Ein Satz, worum es geht.",
     added: "2026-09-25",         // PFLICHT: Datum der Veröffentlichung (JJJJ-MM-TT) → Badge „Neu“ auf der Startseite
     // updated: "2026-10-02",    // optional: bei inhaltlicher Überarbeitung → Badge „Aktualisiert“
     // klausur: "2026-10-15",    // optional: Klausurtermin → Countdown auf der Startseite (21 Tage vorher)
     topics: [ /* Themen, siehe unten */ ]
   });
   ```
3. In `app/index.html` **vor** `vendor/qrcode.js` eine Zeile ergänzen:
   `<script src="kurse/gpu-abc-analyse.js"></script>`
4. In `app/sw.js` den Dateipfad in die Liste `SHELL` aufnehmen und `CACHE` hochzählen (z. B. `lernraum-v4`).
5. Optional: ausgeschriebenen Fachnamen in `app/content.js` unter `faecher` eintragen (z. B. `GPU: "Geschäftsprozesse"`), aber nur wenn bekannt – nicht raten.
6. Einzeldatei neu bauen: `python3 app/build-single.py`

**Themen und Schritte:** Jedes Thema ist ein Lernpfad aus Schritten. Alle Schritt-Typen mit Beispielen
stehen in `app/README.md`. Kurzüberblick:

| Typ | Wofür |
|---|---|
| `slides` | Einstieg/Erklärung als Folien zum Wischen (3–7 Folien, kurze Sätze) |
| `quiz` | Multiple Choice, genau eine richtige Antwort, mit `explain` |
| `sort` | Aussagen Kategorien zuordnen (2–4 Kategorien) |
| `cloze` | Lückentext mit Wortbank und 2–3 Ablenkern |
| `calc` | Rechenschema mit Zahlenfeld (Zahlen als ganze Zahlen) |
| `sentence` | Antwortsatz aus Bausteinen `{*richtig|falsch}` – für deuten, erklären, Stellung nehmen |
| `word` | Word-Simulation: Dokument wie in Word formatieren – geführt (Aufgabe für Aufgabe) oder frei (Live-Checkliste); automatisch geprüft |
| `cards` | Lernkarten Begriff/Erklärung |
| `selfcheck` | Kann-Liste am Ende eines Themas |

Grafiken: nur die Bausteine `zeitstrahl()` und `ablauf()` (siehe `app/README.md` → „Grafiken“), keine eigenen SVGs/Bilder.
Zusätzlich möglich: `help` (Merkkasten) pro Thema, `hints` (gestufte Tipps) pro Schritt,
Übungsklausur (`exam`), Endlos-Training (`drill`) – siehe README.

### Weg B: fertige einzelne HTML-Seite
Für Material, das nicht in die App passt (z. B. eine eigene interaktive Seite):
1. Datei ablegen unter `materialien/<Fach>/<Thema>/<datei>.html`
2. `python3 app/tools/build-materialien.py` ausführen – neue Materialien (Upload ab 18.09.2026) erscheinen dann
   in der Materialsammlung des Fachs auf der Startseite, inklusive QR-Code.
3. Die Seite muss selbst mobil tauglich sein und ein aussagekräftiges `<title>` haben.

## Didaktische Regeln (wichtig)

- **Alles wird automatisch geprüft.** Keine Freitextaufgaben, keine Selbst- oder Partnerkorrektur.
  Für „erklären/deuten/Stellung nehmen“ den Typ `sentence` verwenden.
- **Niveau niedrig halten:** kurze Sätze, ein Gedanke pro Folie, Fachbegriffe erklären.
  Ablenker in Quiz/Satzbausteinen = typische Schülerfehler (z. B. Vorzeichen vertauscht).
- **Aufbau eines Themas:** `slides` → 2–4 Übungen (steigende Schwierigkeit) → optional `sentence` → optional `selfcheck`.
- **Inhalte aus den gelieferten Materialien** der Lehrkraft übernehmen (Zahlen, Namen, Modellunternehmen).
  Eigene Ergänzungen sparsam und fachlich korrekt; in der Commit-/PR-Beschreibung auflisten, was ergänzt wurde.
- Rechnungen immer nachrechnen. Jede `calc`-Zeile braucht einen korrekten `value`.
- **Tipps (`hints`/`hint`) gegen die Lösung prüfen:** Jeder Tipp muss zur richtigen Antwort führen.
  Bei Lückentexten: Wenn ein Tipp eine bestimmte Lücke meint, deren Lösungswort im `text` nachsehen.
- **Eindeutigkeit:** Jede Lücke und jeder Satzbaustein darf nur **eine** richtige Lösung zulassen
  (z. B. Signalwort wie „last weekend“ ergänzen). Groß-/Kleinschreibung darf die Lösung nicht verraten.
- Nur abfragen, was vorher (Folien, Merkkasten, Tipps) eingeführt wurde.
- `explain`, `hint`, `hints`: **reiner Text**, kein Markdown (`**fett**` erscheint wörtlich).
- Fremdsprachen: Beispielsätze vollständig in der Zielsprache – keine Mischsätze wie „Die Schüler are sitting“.
- Keine personenbezogenen Daten echter Schüler/innen.

## Geführte Probeklausur mit Erklärungen

Für Klausurtraining mit Anleitung: Thema mit `exam: { guided: true, … }` und an jedem Schritt `points` + `guide` (2–3 Erklär-Folien).
Aufbau, Beispiel und Regeln: `app/README.md` → „Probeklausur mit Erklärungen“. Vorbild: `probeklausur-2` in `app/kurse/pbp-personalbedarf.js`.
Regeln für gute Erklärungen: erst das Prinzip mit **eigenem Beispiel (andere Zahlen als in der Aufgabe)**, dann „So gehst du vor“, dann „Typische Fallen“.
Die Erklärung verrät nie die Lösung der Aufgabe.

## Prüfen vor dem Push

```bash
node app/tools/check-kurse.js  # Inhalts-Check: Pflichtfelder, Lösungsindizes, Ablenker, ganze Zahlen, Registrierung
python3 -m http.server 8080    # dann http://localhost:8080/app/ öffnen
```
Der Inhalts-Check muss **0 Fehler** melden. Hinweise (z. B. fehlender Merkkasten) solltest du beheben.
Im Browser (Handybreite ~390 px): Startseite → Fach → Kurs → jedes Thema einmal komplett durchklicken,
auf JavaScript-Fehler in der Konsole achten. Playwright/Chromium ist in Claude-Code-Umgebungen meist vorhanden.

## Veröffentlichen (selbstständig, ohne Rückfrage)

1. Vorher `main` aktualisieren (`git fetch origin main`) und den eigenen Branch darauf aufbauen –
   so gibt es keine Konflikte mit Änderungen, die inzwischen gemergt wurden.
2. Branch **`kurs/<kurs-id>`** anlegen (z. B. `kurs/gpu-abc`), committen, pushen.
   Auf `kurs/…`-Branches dürfen nur diese Dateien geändert werden: `app/kurse/*.js` (außer `materialien.js`),
   `app/index.html` (nur `<script src="kurse/…">`-Zeilen), `app/sw.js`, `app/content.js`, `app/dist/lernraum.html`.
   Der GitHub-Check lehnt alles andere ab.
3. Pull Request nach `main` erstellen: kurze Beschreibung, Liste der neuen Themen, eigene Ergänzungen, was getestet wurde.
4. Warten, bis im Pull Request der Check **„Lernraum-Check“ grün** ist, dann **den Pull Request selbst mergen**.
   Ist er rot: Log lesen, Fehler beheben, neu pushen.
   Bei Merge-Konflikten: `main` in den Branch mergen, Konflikte lösen (bei `app/dist/lernraum.html`
   einfach `python3 app/build-single.py` neu ausführen), erneut testen, dann mergen.
5. Nach 1–2 Minuten ist der Kurs live – auf der Startseite https://lernen.yannikbrand.eu/ und in der App.
   Deep-Link einer Übung (für QR-Codes): `https://lernen.yannikbrand.eu/app/#/f/<kurs-id>/<thema-id>` –
   QR-Codes erzeugt die App selbst (QR-Knopf an jeder Übung, Übersicht unter `#/qr`).
6. Der Lehrkraft am Ende die Deep-Links der neuen Themen nennen.

## Übersetzungen der Kursinhalte (Englisch, Arabisch)

> **Entscheidung der Lehrkraft (29.09.2026): Nur der Kurs PBP (`pbp`) wird auf Arabisch übersetzt.**
> Andere Kurse nicht übersetzen, außer die Lehrkraft verlangt es ausdrücklich.
> **Wer PBP ändert, aktualisiert die Übersetzung mit:** `node app/tools/texte.js pbp ar` → neue `""`-Einträge übersetzen.
> Der Inhalts-Check erinnert daran („neue Kurstexte fehlen in der Pflicht-Übersetzung“).

Schüler/innen können die App auf Englisch oder Arabisch stellen. Damit auch die **Inhalte** übersetzt erscheinen,
gibt es pro Kurs und Sprache eine Datei `app/uebersetzungen/<kurs-id>.<en|ar>.js`.

1. Datei erzeugen oder aktualisieren: `node app/tools/texte.js <kurs-id> <en|ar>`
   → enthält **alle** übersetzbaren Texte des Kurses, links Deutsch (nicht ändern!), rechts `""` zum Ausfüllen.
   Die Datei wird automatisch in `app/index.html` eingetragen (als Verweis; die App lädt sie erst, wenn die Sprache gewählt wird). Stand aller Kurse: `node app/tools/texte.js --stand`.
2. Rechts die Übersetzung eintragen. `""` lassen = die App zeigt das Deutsche (auch das ist erlaubt).
3. `node app/tools/check-kurse.js` → 0 Fehler. Geprüft wird u. a., dass Lücken/Bausteine erhalten bleiben.
4. Wenn sich der Kurs ändert: Schritt 1 erneut ausführen – vorhandene Übersetzungen bleiben, neue Texte kommen dazu.

**Regeln (wichtig – die Prüfung ist auf Deutsch):**
- **Fachbegriffe bleiben deutsch**, beim ersten Vorkommen pro Text mit Übersetzung in Klammern:
  „Personalbedarf (الاحتياج من الموظفين)“. So lernen die Schüler/innen den deutschen Begriff, verstehen ihn aber.
- **Lösungswörter bleiben unverändert:** Wörter in `{Lücken}`, Bausteine `{*richtig|falsch}`, Ablenker (`distractors`),
  Antwortoptionen, die Fachbegriffe sind, und Kategorien, die Fachbegriffe sind. Nur den Text drumherum übersetzen.
  Anzahl und Reihenfolge der `{…}` müssen gleich bleiben, der richtige Baustein behält sein `*`.
- **HTML übernehmen:** Tags wie `<strong>`, `<mark>`, `<p class="…">`, `<figure …>` unverändert lassen, nur den sichtbaren Text übersetzen.
  Diagramme (Zeitstrahl/Ablauf) erscheinen als fertiges HTML – nur die Texte in den Karten/Kästen übersetzen,
  `style="…"` und Zahlen nicht anfassen.
- **Englischkurs:** Englische Aufgaben, Beispielsätze und Antworten bleiben englisch (`""` lassen). Übersetzt werden nur die
  deutschen Erklärungen, Tipps und Anleitungen.
- Namen, Firmen (Mediaworld e. K.), Zahlen, Beträge, Paragrafen bleiben, wie sie sind.
- Einfache Sprache, kurze Sätze (Niveau wie im Deutschen). Arabisch: Hocharabisch (MSA), keine Dialekte.
- Übungsklausuren, Word-Simulation und Endlos-Trainings werden nicht übersetzt (tauchen in der Datei nicht auf).

## Nicht ändern (ohne ausdrücklichen Auftrag)

`CLAUDE.md`, `docs/`, `.github/`, `app/tools/`, `app/app.js`, `app/styles.css`, `app/vendor/`, andere Kursdateien, `app/kurse/materialien.js` (wird erzeugt),
die Startseite `index.html` und `site/` (sie liest die Kurse automatisch aus `app/index.html`).
