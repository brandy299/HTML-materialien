# Designsprache für Erklärvideos

Gilt für alle Videos in `app/videos/`. Die Videos sehen aus wie die Lernplattform und erklären immer **eine** Sache.
Die technische Anleitung zum Bauen steht in `app/VIDEO-ANLEITUNG.md`. Dieses Dokument legt fest, **wie** ein Video aussehen und sich bewegen soll.

## Zweck

Ein Video ist ein **Einstieg in ein Thema**, kein Ersatz für Übungen. Es erklärt in 20–60 Sekunden, was die Schüler/innen danach selbst üben. Direkt nach dem Video kommen die automatisch geprüften Aufgaben.
Ein Video ersetzt nie eine Aufgabe und wird nie als „gelernt“ gewertet.

## Format

| | Wert |
|---|---|
| Bild | 9:16 Hochformat, 720 × 1280 (gebaut auf einer Bühne mit 360 × 640 Pixeln, wie ein Handy-Bildschirm) |
| Bilder pro Sekunde | 30 |
| Länge | 20–60 s (Obergrenze 90 s) |
| Dateigröße | höchstens 4 MB (Handys im Mobilnetz) |
| Ton | nur Musik, kein Gesang, leise. Das Video muss **ohne Ton** vollständig verständlich sein |

## Aufbau (Dramaturgie)

Ein Video ist eine Kette aus 4–7 Szenen. Jede Szene hat **einen** Gedanken.

1. **Titelbild** (4 s) – Pixelwolke, Thema als Frage oder Aussage.
2. **Frage / Idee** – ein konkretes Beispiel *vor* der Regel („33 Stellen sind nötig. Heute arbeiten 30 Leute.“).
3. **Regel / Bildung** – die Regel als Bild: Zeitstrahl, Bauplan-Kästen, Rechenschema.
4. **Falle oder Abgrenzung** – der typische Fehler („Nicht so schnell.“). Das ist oft die lehrreichste Szene.
5. **Kurztest** – Frage, Denkpause, Auflösung (Baustein „Kurztest“).
6. **Schlussbild** (3,5 s) – Logo und Aufforderung zum Üben.

Reihenfolge: **zeigen, dann benennen**. Erst das Beispiel, dann der Fachbegriff.

## Sprache und Text

- Zielgruppe: niedriges Leseniveau, Handy. Kurze Sätze, bekannte Wörter, Fachbegriffe wie im Kurs (gleiche Schreibweise wie in der Kursdatei).
- **Höchstens 14 Wörter** pro Textblock, **höchstens 3 Wörter pro Sekunde** pro Szene. Das Werkzeug warnt bei Verstößen.
- Mindestens **1 Sekunde Lesezeit** nach dem letzten Element einer Szene.
- Zahlen in Beispielen **nicht aus den Kursaufgaben** übernehmen, sonst verrät das Video die Lösung. Eigene Fälle erfinden, aber gleiche Rechenwege.
- Keine Namen echter Personen, keine Daten von Schüler/innen.
- Videos bleiben deutsch (Prüfungssprache). Übersetzungen kommen später über die Textfassung (`<id>.txt`).

## Farben und Formen

Die Videos benutzen die Farben der App (`app/styles.css`), nicht eigene.

| Rolle | Darstellung |
|---|---|
| Grundtext | Tinte (fast Schwarz) auf Papierweiß |
| **Signalwort**, wichtigstes Wort | rosa Markierung hinter dem Wort (`<mark>`) |
| Betonung, Fachbegriff | Magenta (`<b>`) |
| Ergebnis, richtig, „fest dazu“ | Grün (`<em>`) |
| Rot | **nie**, außer für „falsch“ (selten nötig) |
| Beschriftungen | kleine Großbuchstaben in Mono-Schrift |

Formen: Fenster mit Titelleiste und hartem Schatten, eckige Kästen, **keine runden Ecken**, keine Verläufe, keine Fotos, keine Cliparts.
Die Pixelwolke gibt es nur im **Titel- und Schlussbild**. Dazwischen bleibt es ruhig.

Sicherer Bereich: Alles Wichtige liegt mit 24 px Abstand zu den Rändern; die **untersten ca. 100 px bleiben frei** (dort liegt die Bedienung des Handys). Die Szenen sind standardmäßig mittig, leicht nach oben gesetzt.

## Bewegung

Bewegung zeigt, **was zusammengehört und was als Nächstes kommt**. Nie nur zur Dekoration.

| Was | Wie | Dauer |
|---|---|---|
| Text und Fenster erscheinen | aufsteigen (22 px) + einblenden, schnell abbremsend | 0,5 s |
| Signalwort wird markiert | rosa Markierung zieht von links nach rechts | 0,4 s, **nach** dem Text |
| Schlagwörter | nacheinander aufpoppen (leichtes Überschwingen) | 0,4 s, Abstand 0,2 s |
| Zeitstrahl, Bögen | wird gezeichnet | 0,7–0,9 s |
| Zahlen im Rechenschema | zählen hoch | 0,55 s |
| Rechenschema-Zeilen | eine nach der anderen | Abstand 0,8–0,9 s |
| Szenenwechsel | **Pixel-Überblendung** (Raster aus der Pixelwolke) | 0,3 s je Seite |
| Terminal-Zeile | wird getippt | ca. 26 Zeichen/s |

Regeln:

- **Eins nach dem anderen.** Nie zwei neue Dinge gleichzeitig einblenden.
- Danach **innehalten**: Nach dem letzten Element mindestens 1 s Ruhe.
- Nichts blinkt, nichts wackelt, keine Dauerschleifen. Für Schüler/innen mit der Einstellung „weniger Bewegung“ zeigt die App später statt des Videos das Vorschaubild mit der Textfassung (geplant, kommt mit dem Schritt-Typ „Video“).
- Eine Ausnahme-Farbe pro Szene reicht. Lieber weglassen als überladen.

## Musik

Die Musik wird mit `app/tools/video-music.py` selbst erzeugt: ein weiches Klangbett aus Akkorden mit leisen Zupftönen, ohne Gesang, rechtefrei.
Stimmungen: `calm` (ruhig, Standard) und `bright` (heller). Sie läuft leise (ca. −24 dB im Mittel) und blendet am Ende aus.
**Keine fremde Musik**, keine Audiodateien aus dem Netz – wegen der Urheberrechte.
Sobald ein Sprecher gefunden ist, ersetzt dessen Aufnahme den Ton; die Szenenlängen sind dafür bewusst großzügig.

## Barrierefreiheit

- Jedes Video hat eine **Textfassung** (`<id>.txt`, wird automatisch erzeugt) und ein **Vorschaubild** (`<id>.jpg`).
- Vorgabe für die App (kommt mit dem Schritt-Typ „Video“): Videos starten nie von selbst, und die Textfassung steht darunter.
- Kontrast: Tinte auf Papier, Magenta nur auf Weiß. Kleinste Schrift 11 px auf der 360-px-Bühne.

## Was nicht geht (bewusst)

Gesprochene Texte ohne Textfassung, schnelle Schnitte, Wackeln, Hintergrundmusik mit Gesang, Videos über 90 s, Videos, die Aufgaben ersetzen, und alles, was Schülerdaten enthält.
