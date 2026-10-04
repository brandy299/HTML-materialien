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
- Paket 11 · Word-Simulation nur ab 700 px (Hinweis am Handy), Video „In Word formatieren“ (INWI Teil 2), Baustein `LV.word`, `app/sw.js` v27: *(PR-Nummer folgt)*. Simulator zurück am Handy: Block „Auf dem Handy …“ am Anfang von `word()` in `app/app.js` entfernen. Video abschalten: `video:`/`videoTitle:` im Thema `word-schritte` entfernen.
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
