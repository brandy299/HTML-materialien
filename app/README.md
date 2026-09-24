# Lernraum – die Handy-App für Schüler

Mobile Web-App, in der Schüler ihre Fächer öffnen und Themen als Lernpfad durcharbeiten:
erst eine Präsentation zum Wischen, dann kleine Aufgaben.

- Läuft ohne Build-Schritt: reines HTML, CSS und JS.
- Auf GitHub Pages erreichbar unter `…/HTML-materialien/app/`.
- Lässt sich auf dem Handy als App installieren (Safari: Teilen → „Zum Home-Bildschirm“).
- Der Fortschritt wird nur im Browser des jeweiligen Geräts gespeichert, ohne Login.

## Dateien

| Datei | Zweck |
|---|---|
| `content.js` | **Alle Inhalte** – hier arbeitest du |
| `app.js` | Logik (Navigation, Aufgaben, Fortschritt) |
| `styles.css` | Design |
| `manifest.json`, `sw.js`, `icon*` | App-Installation & Offline |

## Inhalte ergänzen

Alles steht in `content.js`: **Fach → Themen → Schritte**.

```js
{
  id: "schlechtleistung",          // nur a–z, 0–9, Bindestrich
  title: "Käuferrechte bei Schlechtleistung",
  kicker: "Kaufvertragsstörungen",
  minutes: 15,
  // soon: true,                   // zeigt das Thema gesperrt als „Bald verfügbar“
  steps: [ … ]
}
```

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
Im `body` funktionieren `<p>`, `<ul><li>`, `<strong>`, `<p class="quote">`, `<p class="box">`
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

**Karteikarten**
```js
{ type: "cards", title: "…", cards: [ { front: "Begriff", back: "Erklärung" } ] }
```

**Vorhandenes Material verlinken**
```js
{ type: "link", title: "…", text: "…", href: "../materialien/GP/…/datei.html" }
```

## Lokal testen

```bash
python3 -m http.server 8080
# → http://localhost:8080/app/
```
