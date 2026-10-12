# Zurück zum alten Stand – so geht's

Jede Verbesserung kommt als **eigener kleiner Pull Request** nach `main`. So lässt sich jede Änderung einzeln zurücknehmen, ohne die anderen zu verlieren.
GitHub Pages veröffentlicht immer den aktuellen Stand von `main`; nach einem Rücksprung ist die Seite nach 1–2 Minuten wieder wie vorher
(Browser-Cache: einmal hart neu laden).

## Wichtige Rücksprungpunkte

| Stand | Commit | Beschreibung |
|---|---|---|
| **vor Paket 1+2** (01.10.2026) | `cd04f03` | Startseite lang, Google Fonts, alle Übersetzungen im Eintrag, kein Lerncode |

(Ein Git-Tag ließ sich in der Arbeitsumgebung nicht anlegen. Der Commit bleibt in der Historie erhalten und ist der Rücksprungpunkt.
Wer will, legt in GitHub unter *Releases → Draft a new release* einen Tag auf diesen Commit.)

## Einzelne Änderung zurücknehmen (empfohlen)

1. In GitHub **Pull requests → Closed** den betreffenden Pull Request öffnen.
2. Unten auf **Revert** klicken. GitHub erstellt einen neuen Pull Request, der genau diese Änderung rückgängig macht.
3. Diesen Pull Request mergen. Fertig.

Pull Requests dieser Pakete (werden hier eingetragen):

- Paket 2a · eigene Schriften statt Google Fonts: #47
- Paket 2b · Kursübersetzungen erst bei Bedarf laden: #48
- Paket 2c · Lerncode + Startbildschirm-Hinweis: #49
- Paket 1 · kompakte Startseite + Themensuche in der App: #50
- Paket 4 · Dark Mode + Textgröße (`app/theme.js`, Abschnitt „Dark Mode“ am Ende von `app/styles.css`): *(PR-Nummer folgt)*. Gespeicherte Einstellung: `lernraum.theme`, `lernraum.textsize` (zusätzliche Schlüssel, Fortschritt bleibt unberührt).
- Paket 22 · Ordner mit allen Themen des Kurses zeigt keine Extra-Karte mehr (`folderShown` in `app/app.js`, betrifft `pbp-bewerbung`), `app/sw.js` v38: im selben PR wie Paket 21 (PR #82). Zurücknehmen: `folderShown` wieder durch `folderOf` ersetzen.
- Paket 23 · Bündel A: Brotkrumen (`crumbs` in `app/app.js`, `.crumbs` in `app/styles.css`), „‹“ im Player, „✓ Gespeichert“ in der Klausur, `app/sw.js` v39 (PR #82). Zurücknehmen: Revert des PR; Fortschrittsdaten bleiben unberührt.
- Paket 24 · Englisch-Hub: handgezeichnete SVG-Tafeln IV–VI (`englisch/plates/plate-4..6.svg`, Quellen `englisch/plates/src/`), `platePrompt` entfernt (PR #82). Zurücknehmen: `plate:` bei den Tafeln IV–VI wieder entfernen (dann nur Ornament).
- Paket 25 · Bündel C: ehrlicher Fortschritt (`hitText`, `GRADED`, Profil-Block „Training“, Abschluss ohne „100 %“), `app/sw.js` v40 (PR #83). Zurücknehmen: Revert des PR; Fortschrittsdaten bleiben unberührt.
- Paket 26 · Englisch-Hub: QR-Code je Tafel und für den ganzen Hub (`englisch/vendor/qrcode.js`, `openQR` in `englisch/index.html`) (PR #83). Zurücknehmen: Revert des PR.
- Paket 27 · Englisch-Hub: alle sechs Tafelbilder durch einheitliche Aquarell-Stillleben ersetzt (`englisch/plates/plate-1..6.webp`, Skript `englisch/plates/src/make-plate.py`); ersetzt Paket 24 (SVG-Tafeln). Zurücknehmen: Dateien aus der Git-Historie wiederherstellen (alte Kupferstiche I–III) bzw. `plate:` entfernen (PR #83).
- Paket 28 · Kurs-Illustrationen: sieben SVGs (`app/art/`, Quellen `app/art/src/`), `artImg`/`ART` in `app/app.js`, `.art` in `app/styles.css`, `app/sw.js` v41 (PR #84). Zurücknehmen: Revert des PR (Karten zeigen dann wieder nur Text).
- Paket 29 · Fix: Erklärvideos stürzten ab („i is not defined“, Nebenwirkung von Bündel A, PR #82) + Rauchtest `app/tools/smoke.js`, `app/sw.js` v42 (PR #84). Zurücknehmen: nicht nötig (reiner Fix).
- Paket 30 · Issue #81: Video „Der Code der Stellenanzeige“ neu (Floskel → Übersetzung, m/w/d erklärt, „z. K.“ entfernt) + Kurstext angepasst + Arabisch für `pbp-bewerbung` (279 Texte, maschinell, Muttersprachler-Prüfung offen) (PR #87). Zurücknehmen: Dateien aus der Git-Historie wiederherstellen.
- Paket 31 · Große Motive (Startseite, Abschluss, Klausurergebnis: `app/art/*.webp`, `bigArt` in `app/app.js`), `app/sw.js` v43 (PR #87). Zurücknehmen: Revert (Seiten zeigen dann kein Motiv).
- Paket 32 · Bündel D: Willkommen-Hinweise, Gastmodus, Lehrkraft-Modus (`isTeacher`, Route `#/lehrer`), `app/sw.js` v44 (PR #87). Zurücknehmen: Revert; gespeicherte Schlüssel `guest`/`teacher` stören nicht.
- Paket 33 · GPU-Video „Rückwärtskalkulation“ (`gpu-rueckwaerts`, am Thema `rueckwaerts` eingebunden), Prüfbogen Arabisch Bewerbung (PR #88). Zurücknehmen: `video:`/`videoTitle` am Thema entfernen bzw. Dateien aus der Historie.
- Paket 21 · Englisch-Hub: Tafeln IV–VI (insgesamt 6 Tafeln, 30 Übungen), `app/tools/render-englisch-pdf.js` + 6 PDFs, Doku: *(PR-Nummer folgt)*. Zurücknehmen = PR zurücksetzen (nur `englisch/`, Tool, Docs).
- Paket 20 · Englisch-Hub: Handy-Fixes, Quiz mit „Mark it“, klebende Reiter-Leiste, dynamische Navigation, `app/tools/check-englisch.js` + CI-Schritt, Doku: PR #79. Zurücknehmen = PR zurücksetzen (nur `englisch/`, `app/tools/check-englisch.js`, Workflow, Docs).
- Paket 19 · Lange Wörter in Themen-Überschriften (z. B. „Anforderungsprofil“) laufen am Handy nicht mehr über (`titleFit` in `app/app.js`), `app/sw.js` v37: PR #78. Zurücknehmen = PR zurücksetzen.
- Paket 18 · Bedienung intuitiver B (Issue #70: `spot`/`sort` mit „Prüfen“, Folien-Navigation, Szenen-Knöpfe im Video, Word-Griffe/„Alles markieren“), `app/sw.js` v34: *(PR-Nummer folgt)*. Zurücknehmen = PR zurücksetzen; Kursdaten und Fortschritt sind nicht betroffen.
- Paket 17 · PBP-Video „Wie viele Azubis pro Jahr?“ (Ausbildungsbedarf, vom Content-Agent, Issue #67; Kurztest vom CD angepasst), `app/sw.js` v33: *(PR-Nummer folgt)*. Abschalten: `video:`/`videoTitle:` im Thema `ausbildungsbedarf` entfernen.
- Paket 16 · GPU-Videos „Was kostet die Ware wirklich?“ (AB 4) und „Vom Einkauf ins Regal“ (AB 5), `app/sw.js` v32: PR #66. Abschalten: `video:`/`videoTitle:` in den Themen `bezugspreis` und `verkaufspreis` entfernen.
- Paket 15 · PBP-Video „Zählen oder rechnen?“ (Übungsblatt 2), `app/sw.js` v31: PR #65. Abschalten: `video:`/`videoTitle:` im Thema `stellenplan-kennzahlen` entfernen.
- Paket 14 · Ordner im Kurs (`folders`/`folder`, `viewFolder` in `app/app.js`, `mapTexts` in `app/content.js`), PBP-Klausurvorbereitung in einem Ordner, `app/sw.js` v30: PR #65. Zurücknehmen: im PBP-Kurs `folder:`-Zeilen und `folders:` entfernen (Gruppen-Namen ggf. zurück auf „Klausurtraining“); Fortschritt bleibt erhalten.
- Paket 13 · Video „Sechs Fehler im Brief“ (INWI Teil 3), `LV.page` mit `left`/`n`, `app/sw.js` v29: PR #65. Video abschalten: `video:`/`videoTitle:` im Thema `fehlercheck` entfernen.
- Paket 12 · Schritt-Typ `spot` („Finde den Fehler“, `app/app.js`, `app/styles.css`, `check-kurse.js`) + Schritt im INWI-Thema `fehlercheck`, `app/sw.js` v28: PR #64. Nur die Aufgabe entfernen: den Block `type: "spot"` in `app/kurse/inwi-geschaeftsbrief.js` löschen (Schritte danach rücken zurück).
- Paket 11 · Word-Simulation nur ab 700 px (Hinweis am Handy), Video „In Word formatieren“ (INWI Teil 2), Baustein `LV.word`, `app/sw.js` v27: PR #63. Simulator zurück am Handy: Block „Auf dem Handy …“ am Anfang von `word()` in `app/app.js` entfernen. Video abschalten: `video:`/`videoTitle:` im Thema `word-schritte` entfernen.
- Paket 10 · Video „Die neun Zonen“ (INWI), Baustein `LV.page` (Briefblatt), Vollbild/größere Videoanzeige im Player, `app/sw.js` v26: PR #62. Nur das Video abschalten: Zeilen `video:`/`videoTitle:` im Thema `zonen` von `app/kurse/inwi-geschaeftsbrief.js` entfernen. Vollbild/Größe: nur CSS/JS im Player (`videoPlayer` in `app/app.js`, Abschnitt „vid-fs“ in `app/styles.css`). Fortschritt bleibt erhalten.
- Paket 9 · Erklärvideos live in der App (Schritt-Typ/Themenfeld `video`, Karte im Thema, `app/videos/`, `app/sw.js` v25): PR #61. Zurücknehmen = PR zurücksetzen. Nur das Video abschalten: Zeilen `video:` in `app/kurse/pbp-personalbedarf.js` entfernen. Der Fortschritt bleibt in beiden Fällen erhalten (zusätzlicher Schlüssel `video` im Thema-Fortschritt).
- Paket 8 · Erklärvideo-Baukasten (Machbarkeit): `app/videos/`, `app/tools/render-video.js`, `video-music.py`, `check-videos.js`: *(PR-Nummer folgt)*. Reine Ergänzung: kein Eingriff in App oder Startseite, nichts verlinkt. Zurücknehmen = PR zurücksetzen.
- Paket 7 · tolerante Themensuche (`app/search.js`: Tippfehler, Umlaute, Synonyme): *(PR-Nummer folgt)*
- Paket 6 · Desktop-Startseite mit 3D-Szene (`site/hero3d.js`), Ticker, Einblenden: *(PR-Nummer folgt)*. Nur Desktop mit Maus; zum Abschalten reicht es, den Block „fancy“ in `site/landing.js` zu entfernen. Seit der Logo-Szene echtes three.js (r128, lokal in `site/vendor/`, nur Desktop geladen).

## Alles auf den alten Stand zurücksetzen

Nur wenn mehrere Pakete zurück sollen. Auf einem Rechner mit Git:

```bash
git checkout main && git pull
git checkout -b zurueck-auf-stand-2026-10-01
git revert --no-edit cd04f03..HEAD      # nimmt alle späteren Änderungen zurück (Merge-Commits ggf. mit -m 1)
git push -u origin zurueck-auf-stand-2026-10-01
```
Dann in GitHub einen Pull Request daraus machen und mergen. Neue Kurse der Content-Agenten, die seit dem Stand dazugekommen sind,
würden dabei ebenfalls zurückgenommen – deshalb besser einzelne Pull Requests zurücknehmen.

## Notfall: alte Startseite

Die vorherige, lange Startseite bleibt als `index-v1.html` erhalten (seit Paket 1 vorhanden, nicht von Suchmaschinen indexiert) und ist unter
`https://lernen.yannikbrand.eu/index-v1.html` erreichbar. Die App unter `/app/` ist davon unabhängig.

## Fortschritt der Schüler/innen

Der Fortschritt liegt im Browser der Schüler/innen (`localStorage`, Schlüssel `lernraum.*`). Rücksprünge der Website verändern oder löschen ihn nicht.
Neue Funktionen legen nur **zusätzliche** Schlüssel an und ändern bestehende nicht.
