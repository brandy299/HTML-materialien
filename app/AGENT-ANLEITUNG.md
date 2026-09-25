# Anleitung für KI-Agenten: neue Übungen für den Lernraum

Diese Datei richtet sich an einen KI-Agenten (z. B. Claude Code), der neue Kurse oder Übungen
für die Lern-App „Lernraum“ erstellt und auf GitHub veröffentlicht.

- **Repository:** `brandy299/HTML-materialien`
- **Live:** https://lernen.yannikbrand.eu/app/ (GitHub Pages, Branch `main`)
- **Zielgruppe:** Schüler/innen eines Berufskollegs in NRW, Niveau eher niedrig, Nutzung fast nur am Handy
- **Sprache:** Deutsch (Englisch-Kurse: Aufgaben auf Englisch, Erklärungen dürfen deutsch sein)

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
| `cards` | Lernkarten Begriff/Erklärung |
| `selfcheck` | Kann-Liste am Ende eines Themas |

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
- Keine personenbezogenen Daten echter Schüler/innen.

## Prüfen vor dem Push

```bash
node -e "new (require('vm').Script)(require('fs').readFileSync('app/kurse/<datei>.js','utf8'))"   # Syntax
python3 -m http.server 8080    # dann http://localhost:8080/app/ öffnen
```
Im Browser (Handybreite ~390 px): Startseite → Fach → Kurs → jedes Thema einmal komplett durchklicken,
auf JavaScript-Fehler in der Konsole achten. Playwright/Chromium ist in Claude-Code-Umgebungen meist vorhanden.

## Veröffentlichen

1. Eigenen Branch anlegen (nicht direkt auf `main` arbeiten), committen, pushen.
2. Pull Request nach `main` erstellen: kurze Beschreibung, Liste der neuen Themen, eigene Ergänzungen.
3. Nur mergen, wenn die Lehrkraft das freigegeben hat. Nach dem Merge ist die Übung nach 1–2 Minuten live.
4. Deep-Link einer Übung (für QR-Codes): `https://lernen.yannikbrand.eu/app/#/f/<kurs-id>/<thema-id>` –
   QR-Codes erzeugt die App selbst (QR-Knopf an jeder Übung, Übersicht unter `#/qr`).

## Nicht ändern (ohne ausdrücklichen Auftrag)

`app/app.js`, `app/styles.css`, `app/vendor/`, andere Kursdateien, `app/kurse/materialien.js` (wird erzeugt).
