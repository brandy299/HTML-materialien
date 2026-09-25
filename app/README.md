# Lernraum – die Handy-App für Schüler

Mobile Web-App, in der Schüler ihre Fächer öffnen und Themen als Lernpfad durcharbeiten:
erst eine Präsentation zum Wischen, dann kleine Aufgaben.

Startseite: **Fächer → Kurse & Materialsammlungen → Übungen**, jede Übung mit QR-Code.
Erster Kurs: **PBP · HS1 – Personalbedarf** (LF 8.1, Modellunternehmen Mediaworld e. K.),
gestaltet im Stil der Typesafe-Stilstudie: Fenster mit Titelleiste, Terminal-Rückmeldungen, Pixelwolke.

**Neue Übungen mit einem KI-Agenten erstellen:** siehe [`AGENT-ANLEITUNG.md`](AGENT-ANLEITUNG.md).

- Läuft ohne Build-Schritt: reines HTML, CSS und JS.
- Auf GitHub Pages erreichbar unter `…/HTML-materialien/app/`.
- Lässt sich auf dem Handy als App installieren (Safari: Teilen → „Zum Home-Bildschirm“).
- Der Fortschritt wird nur im Browser des jeweiligen Geräts gespeichert, ohne Login.

## Dateien

| Datei | Zweck |
|---|---|
| `kurse/*.js` | **Ein Kurs pro Datei** – hier entstehen neue Inhalte |
| `kurse/materialien.js` | Materialsammlungen aus `materialien/` – erzeugt mit `tools/build-materialien.py` |
| `content.js` | Basis: Einstellungen (Schule, öffentliche Adresse, Fachnamen) und Rechen-Helfer |
| `index.html` | lädt Basis, alle Kurse, QR-Bibliothek und App – **neue Kurse hier eintragen** |
| `app.js` | Logik (Navigation, Aufgaben, Hilfe, Klausur, Training, QR-Codes) |
| `styles.css` | Design |
| `vendor/qrcode.js` | QR-Code-Generator (Kazuhiko Arase, MIT-Lizenz), lokal eingebunden |
| `build-single.py` | baut alles in eine Datei `dist/lernraum.html` |
| `manifest.json`, `sw.js`, `icon*` | App-Installation & Offline |

## QR-Codes

Jede Übung, jeder Kurs und jedes Material hat einen **QR-Knopf**. Er zeigt den Code mit Link,
„Link kopieren“ und einer **Beamer-Ansicht** (Vollbild). Alle Codes auf einen Blick: `#/qr`
(Link „Für Lehrkräfte: QR-Codes“ unten auf der Startseite und im Profil).
Wer per QR kommt und die App zum ersten Mal öffnet, gibt seinen Namen ein und landet dann direkt in der Übung.

## Inhalte ergänzen

Jeder Kurs ist eine Datei in `kurse/` (`LERNRAUM.subjects.push({...})`): **Kurs → Themen → Schritte**.
Materialsammlungen entstehen automatisch aus `materialien/<Fach>/…`.

```js
// Fach / Kurs
{ id: "pbp", fach: "PBP", name: "Personalbedarf", course: "PBP · HS1", company: "Mediaworld e.K.",
  color: "#F386A1", description: "…", topics: [ … ] }

// Thema
{
  id: "bedarf-berechnen",          // nur a–z, 0–9, Bindestrich
  group: "Lernsituation 2.1",      // Überschrift, unter der das Thema steht
  title: "Personalbedarf berechnen",
  kicker: "LS 2.1 · Teil 1",
  minutes: 20,
  // soon: true,                   // zeigt das Thema gesperrt als „Bald verfügbar“
  steps: [ … ]
}
```

### Hilfe („Ich brauche Hilfe“)

Jede Aufgabe hat oben rechts einen **?-Knopf**. Er öffnet ein Fenster mit drei Reitern:

- **Tipps** – gestufte Hinweise, die Schüler einzeln aufdecken. Quelle: `hints: [...]` am Schritt
  oder `hint`/`hints` an einer Quizfrage. Ein Tipp, der mit „Lösungsweg“ beginnt, bekommt den Knopf „Lösungsweg zeigen“.
  Rechenschemata mit `...bedarf(ist, abgaenge, zugaenge, soll)` erzeugen ihre Tipps automatisch.
- **Merkkasten** – `help: \`<h3>…</h3><p class="formula">…</p><ul><li>…</li></ul>\`` am Thema
- **Begriffe** – durchsuchbares Lexikon aus allen Karteikarten des Kurses (plus optional `glossary: [...]` am Fach)

Der Tab **Hilfe** unten sammelt alle Merkkästen, das Lexikon und eine Anleitung zu den Aufgabentypen.

### Schritt-Typen

**Präsentation**
```js
{ type: "slides", title: "Worum geht's?", slides: [
  { kicker: "Grundbegriff", title: "Was ist ein <em>Mangel?</em>", body: "<p>…</p>" },
  { style: "dark",   kicker: "Der Fall", title: "…", body: "…" },   // dunkle Folie
  { style: "accent", kicker: "Merksatz", title: "…" },               // Folie in Fachfarbe
  { big: "1.", kicker: "…", title: "…", body: "…" }                  // große Zahl
]}
```
Im `body` funktionieren `<p>`, `<ul><li>`, `<strong>`, `<mark>`, `<p class="box">`, `<p class="formula">`,
`<p class="note">`, `<ul class="pm"><li class="m">…</li><li class="p">…</li></ul>` (Minus/Plus-Liste),
`<dl class="terms"><dt>Begriff</dt><dd>Erklärung</dd></dl>`, `schema([…])` für das Rechenschema
sowie `<div class="pair"><div><b>Titel</b>Text</div>…</div>` für Gegenüberstellungen.

**Quiz** – `answer` zählt ab 0
```js
{ type: "quiz", title: "Kurz-Check", questions: [
  { q: "Frage?", options: ["A", "B", "C"], answer: 1, explain: "Warum B richtig ist." }
]}
```

**Zuordnen** – `cat` ist die Nummer der Kategorie (ab 0)
```js
{ type: "sort", title: "…", prompt: "…", categories: ["Kategorie 1", "Kategorie 2"],
  items: [ { text: "Aussage", cat: 0 } ] }
```

**Lückentext** – Lücken in `{geschweifte Klammern}`
```js
{ type: "cloze", title: "…", text: "Zuerst hat der Käufer ein Recht auf {Nacherfüllung}.",
  distractors: ["Mahnung"] }
```

**Rechenschema** – Schüler tippen Zahlen über ein eigenes Zahlenfeld (mit ±-Taste)
```js
{ type: "calc", title: "A1 · Mediaworld",
  case: "<b>Ist:</b> 21 …",                // Angaben zum Fall (HTML)
  rows: [
    { label: "Ist-Personalbestand", value: 21 },
    { label: "− Abgänge", value: 2, either: true },   // either: 2 und −2 zählen als richtig
    { label: "= Zwischensumme", value: 20, sum: true },
    { label: "= Personalbedarf", value: 2, sum: true, signed: true }  // zeigt „+ 2“
  ],
  hint: "Tipp für den Hilfe-Knopf", result: "Antwortsatz nach dem Prüfen" }
```
Für den Personalbedarf gibt es die Abkürzung `bedarfRows(ist, abgaenge, zugaenge, soll)`
(mit `{ split: true }` zusätzlich Ersatz- und Neubedarf, mit `{ klausur: true }` Klausur-Begriffe).

**Kann-Liste** (Selbsteinschätzung ○ ◐ ●)
```js
{ type: "selfcheck", title: "Kann-Liste", items: ["Ich kann …", "Ich kann …"] }
```

**Karteikarten** – ein Thema, das nur aus Karteikarten besteht, erscheint unten als Tab „Lernkarten“
```js
{ type: "cards", title: "…", cards: [ { front: "Begriff", back: "Erklärung" } ] }
```

**Antwortsatz aus Bausteinen** – für deuten, erklären, Stellung nehmen; wird vollständig automatisch geprüft
```js
{ type: "sentence", title: "Antwortsatz bauen", case: "Aufgabenstellung (HTML, optional)",
  text: "Das Ergebnis ist {*positiv|negativ}. Mediaworld muss {*2|20} Personen {*einstellen|entlassen}.",
  explain: "wird nach dem Prüfen angezeigt" }
```
In `{…}` stehen die Bausteine, getrennt durch `|`. Der richtige Baustein beginnt mit `*`. Die Reihenfolge wird in der App gemischt.

### Übungsklausur

Ein Thema mit `exam` wird zur Klausur: Timer, keine Rückmeldung und keine Hilfe während des Schreibens,
am Ende Punkte, Note, Erwartungshorizont je Aufgabe und Empfehlungen zum Wiederholen.
```js
{ id: "uebungsklausur-1", title: "Übungsklausur Personalbedarf", exam: {
    minutes: 45, tools: "Taschenrechner",
    grading: [[92, "1", "sehr gut"], [81, "2", "gut"], …]   // Notenschlüssel: ab Prozent
  },
  steps: [ { type: "quiz", title: "A1 · …", points: 6, review: "fachbegriffe", … } ] }
```
`points` = Punkte der Aufgabe (anteilig nach richtigen Teilen), `review` = Thema, das bei weniger als 75 % empfohlen wird.

### Endlos-Training (Zufallsaufgaben)

Ein Thema mit `drill: "bedarf"` erzeugt unbegrenzt neue Personalbedarf-Aufgaben (Rechenschema + Antwortsatz)
in drei Stufen: 1 Zahlen · 2 Fall mit Namen · 3 Profi mit Ablenkern, Ersatz-/Neubedarf und negativen Ergebnissen.
Firmen, Namen und Ereignisse stehen in `DRILL_DATA` in `app.js` und lassen sich dort erweitern.
```js
{ id: "training-personalbedarf", title: "Endlos-Training", kicker: "Zufallsaufgaben",
  drill: "bedarf", description: "…", steps: [], help: "Merkkasten …" }
```

**Vorhandenes Material verlinken**
```js
{ type: "link", title: "…", text: "…", href: "../materialien/GP/…/datei.html" }
```

## Einzeldatei für gesperrte Schulnetze

Manche Schulnetze sperren `github.io`. Dann die komplette App als **eine HTML-Datei** bauen und über
Moodle/Logineo, IServ, Teams oder per Mail verteilen:

```bash
python3 app/build-single.py   # → app/dist/lernraum.html
```

Nach jeder Inhaltsänderung neu bauen und neu hochladen. Links zu alten Materialien auf github.io
funktionieren im gesperrten Netz weiterhin nicht.

## Lokal testen

```bash
python3 -m http.server 8080
# → http://localhost:8080/app/
```
