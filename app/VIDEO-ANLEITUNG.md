# Erklärvideos bauen – Anleitung für Agenten

Du baust ein kurzes Erklärvideo im Stil der Lernplattform. Du schreibst **keine Videodatei von Hand**, sondern eine kleine Quelldatei mit fertigen Bausteinen.
Ein Werkzeug rendert daraus Bild für Bild das Video (mit selbst erzeugter Musik).

**Vorher lesen:** `docs/VIDEO-DESIGNSPRACHE.md` (Aussehen, Bewegung, Textregeln). Wer die Regeln nicht einhält, bekommt vom Werkzeug Warnungen.

## Wer darf was

- **Content-Agent:** darf pro Kurs Videos bauen: `app/videos/src/<id>.js` (Quelle) und die erzeugten Dateien `app/videos/<id>.mp4`, `.jpg`, `.txt`. Nichts anderes ändern. Branch `kurs/<kurs-id>`, der Lernraum-Check erzwingt das.
- **Creative Director:** besitzt den Baukasten (`app/videos/lib/`, `player.html`), die Werkzeuge (`app/tools/render-video.js`, `video-music.py`, `check-videos.js`) und die Designsprache.
- Fehlt dir ein Baustein (z. B. ein Diagramm, das es nicht gibt)? **Nicht selbst bauen**, sondern ein GitHub-Issue mit Label `design` anlegen und beschreiben, was erklärt werden soll.
- Dateiname/ID: nur `a–z`, `0–9`, `-`, mit Kurs davor, z. B. `pbp-bedarf-berechnen`, `englisch-present-perfect`.

## Einmalig vorbereiten

```bash
pip install imageio-ffmpeg          # liefert ffmpeg (oder ffmpeg im PATH haben / FFMPEG=/pfad setzen)
# Playwright mit Chromium ist in der Cloud-Umgebung vorhanden (sonst: npm i -g playwright)
```

## Ablauf in 7 Schritten

1. **Lernziel in einem Satz.** „Die Schüler/innen können den Nettopersonalbedarf berechnen.“ Ein Video = ein Lernziel.
2. **Storyboard als Tabelle** (kurz, im Kopf oder als Kommentar): je Szene *ein* Gedanke.
   `Frage → Regel → Falle → Kurztest`. Das **Modellunternehmen des Kurses** beibehalten (PBP: Mediaworld), aber Zahlen und Szenario selbst wählen, **nicht aus den Kursaufgaben** (sonst verrät das Video die Lösung). Fachbegriffe so schreiben wie in der Kursdatei.
3. **Quelldatei schreiben:** `app/videos/src/<id>.js` – siehe unten. Vorlagen zum Kopieren: `pbp-bedarf-berechnen.js` (Rechenschema, Kurztest) und `englisch-present-perfect.js` (Zeitstrahl, Bauplan-Kästen, Schlagwörter).
4. **Vorschaubogen ansehen** (schnell, ca. 15 s):
   ```bash
   node app/tools/render-video.js <id> --sheet
   ```
   Das Werkzeug druckt Szenen, Wortzahlen und **Hinweise zur Lesbarkeit** und nennt den Pfad eines Bildes (jedes Feld = 1 Sekunde). Öffne das Bild mit dem Lese-Werkzeug und prüfe: Ist der Text lesbar? Ist die Szene nicht überladen? Erscheint alles nacheinander? Behebe jede Warnung (⚠).
5. **Video rendern** (ca. 1–2 Minuten):
   ```bash
   node app/tools/render-video.js <id>
   ```
   Ergebnis in `app/videos/`: `<id>.mp4` (720×1280 mit Musik, zum **Teilen**), `<id>.m4a` (Musik, wird in der App abgespielt), `<id>.jpg` und `<id>-dark.jpg` (Vorschaubild hell/dunkel, vom Zeitpunkt `poster` in der Quelle), `<id>.txt` (Textfassung). Einzeln neu erzeugen: `--txt-only`, `--audio-only`, `--poster-only`. mp4 größer als 4 MB? Kürzen oder `--crf 29`.
   Nur die Textfassung neu schreiben (ohne das Video neu zu rendern): `node app/tools/render-video.js <id> --txt-only`.
6. **Prüfen:** `node app/tools/check-videos.js` muss „0 Fehler“ melden (Größe, Länge, 9:16, alle Dateien da).
7. **Committen** (Quelle + alle Ergebnisdateien) und Pull Request wie bei Kursen. Die Videodatei nur **fertig** einchecken, nicht bei jeder Änderung neu – jede Fassung bleibt für immer im Repo-Verlauf.

Live-Vorschau im Browser (läuft in Echtzeit, ohne Rendern): `python3 -m http.server 8080`, dann
`http://localhost:8080/app/videos/player.html?v=<id>&play=1`

## Die Quelldatei

```js
LV.video({
  id: "pbp-bedarf-berechnen",              // = Dateiname ohne .js
  title: "Nettopersonalbedarf in 45 Sekunden",
  poster: 18.2,                       // Sekunde mit dem aussagekräftigsten Bild (Vorschaubild)
  bpm: 92, mood: "calm",              // Musik: calm (ruhig) oder bright (heller)
  scenes: [
    LV.title({ kicker: "PBP · Nettopersonalbedarf", title: "Wie viele fehlen wirklich?", sub: "Erklärt in 45 Sekunden.", dur: 4.5 }),
    LV.scene({ kicker: "01 · Die Frage", dur: 6.5, items: [ /* Bausteine */ ] }),
    LV.outro({ text: "Jetzt <mark>selbst</mark> rechnen.", url: "lernen.yannikbrand.eu", dur: 3.5 })
  ]
});
```

- `dur` = Dauer der Szene in Sekunden. Die Gesamtdauer ergibt sich aus der Summe.
- `at` (bei jedem Baustein) = Sekunde **innerhalb der Szene**, ab der der Baustein erscheint. Die ersten 0,3 s einer Szene gehören der Überblendung: erstes Element frühestens bei `at: 0.4`.
- Szenen sind standardmäßig **mittig**; `align: "top"` setzt sie nach oben.
- Szenentypen: `LV.title({kicker,title,sub,dur})` · `LV.scene({kicker,dur,items,align})` · `LV.outro({text,url,dur})`.
- In Texten gilt: `<mark>Wort</mark>` rosa Markierung · `<b>` Magenta · `<em>` Grün · `&shy;` für Silbentrennung langer Wörter.

## Bausteine

| Baustein | Wofür | Aufruf |
|---|---|---|
| `LV.text(html, o)` | Satz oder Überschrift | `o`: `size` `xl`/`l`/`m`/`s`, `at`, `anim` (`rise` Standard, `fade`, `pop`, `words` = Wort für Wort), `until` (Sekunde, ab der er verschwindet), `tone: "mut"` (grau) |
| `LV.chips(list, o)` | Schlagwörter, Signalwörter | `LV.chips(["ever","never"], {at, stagger})` |
| `LV.stack(boxes, o)` | Bauplan aus Kästen (z. B. Satzbau) | `[{label:"Subjekt", text:"They", tone:"pink"\|"green"}]`, `{at, stagger}` |
| `LV.timeline(o)` | Zeitstrahl, Zeitspanne, Bogen | `{at, ticks:["2022",…], marks:[{x:0..1, label, sub, kind:"now"}], arc:{from,to,at}, range:{from,to,label,at}}` (x = Stelle auf dem Strahl, 0 links, 1 rechts) |
| `LV.scheme(rows, o)` | Rechenschema, Schritt für Schritt | `rows`: `[{label, value:30, op:"−", sub, line:true, hi:true}]`, `o`: `{title, at, gap}`. Zahlen zählen hoch; `line` = Strich darüber; `hi` = rosa Ergebnis |
| `LV.term(lines, o)` | Terminal-Rückmeldung wie in der App | `LV.term(["› 5 neue Stellen"], {at})` |
| `LV.quiz(q, options, answer, o)` | Kurztest mit Denkpause und Auflösung | `LV.quiz("Frage?", ["2","38","−2"], 0, {at:0.4, reveal:6.2})` – `answer` = Index der richtigen Antwort, `reveal` = Sekunde der Auflösung |
| `LV.page(o)` | Geschäftsbrief (A4, DIN 5008) mit Kamerafahrt | `{letter:{z1:[Zeilen],…,z9:[…]}, outlines:{at,stagger}, focus:[{at, zone\|all\|r}], marks:[{zone, at, label, note, n?, ruler:{from,to,x,label}}], show, height, left:[3]}` (`left:[3]` = Datum links für Fehlerbilder; `n` = Zahl im Kästchen, `zone:0` = nur Beschriftung) – `""` = Leerzeile; Szene mit `align:"top"`; Beispiele: `inwi-neun-zonen.js`, Fehlerjagd `inwi-fehlerjagd.js` |
| `LV.word(o)` | Word-Fenster: Menüband mit Mauszeiger, Brief wird Schritt für Schritt formatiert | `{done:[Ids bereits erledigt], steps:[{id, at, label?, note?}], raw:[Zeilen]}` · Ids: `font` `margins` `small` `gap1` `right` `bold` `anrede` `sign`; Szene mit `align:"top"`; Beispiel: `inwi-word-formatieren.js` |

Mehrere Bausteine in einer Szene erscheinen **nacheinander**: setze `at` jeweils 1–2 s nach dem vorigen.
Faustwerte: Text 0,5 s · Kästen 0,5 s je Kasten · Rechenschema 0,85 s je Zeile + 1 s · Zeitstrahl ca. 3 s · Kurztest ca. 6 s Denkzeit bis `reveal`.

## Regeln, die das Werkzeug prüft

- Höchstens **14 Wörter** pro Textblock und **3 Wörter pro Sekunde** pro Szene.
- Nach dem letzten Baustein bleibt **mindestens 1 s** Lesezeit.
- Gesamtlänge höchstens 90 s (Ziel 20–60 s), Datei höchstens 4 MB, Format 9:16.
- Zu jeder Quelle gehören `.mp4`, `.jpg` und `.txt`; keine Ergebnisse ohne Quelle.

## Checkliste vor dem Pull Request

- [ ] Ein Lernziel, 4–7 Szenen, Beispiel vor Regel, eine Falle, ein Kurztest.
- [ ] Modellunternehmen des Kurses verwendet; Zahlen **nicht** aus den Kursaufgaben; Fachbegriffe wie in der Kursdatei.
- [ ] Vorschaubogen angesehen, alle Warnungen behoben.
- [ ] Video ohne Ton verständlich (Ton ist nur Musik).
- [ ] `node app/tools/check-videos.js` → 0 Fehler. `node app/tools/check-kurse.js` → 0 Fehler.
- [ ] Nur Dateien in `app/videos/` geändert.

## Wie die App das Video abspielt

Die App spielt **nicht das mp4** ab, sondern führt die Animation **live** mit dem Baukasten aus (`app/videos/lib/`) und spielt dazu die Musik (`<id>.m4a`). Das mp4 ist nur zum Teilen (Teams, Beamer, Weitergabe).
Deshalb: scharf auf jedem Bildschirm, folgt dem **Dark Mode**, funktioniert mit Textfassung und kostet nur wenige KB. Beim Bauen heißt das:

- Farben nur über die Bausteine (sie nutzen die Variablen der App). Keine festen Farbwerte in Quelldateien.
- Alles, was in der Quelle steht, erscheint auch in der Textfassung (`<id>.txt`) und im Textmodus der App.
- Die App kann das Video im Vollbild zeigen (Taste, F; Esc beendet). Die App zeigt zum Video Steuerung (Szene zurück/vor, Pause, Ton, Text), am Desktop den Text daneben.

## Ins Lernmaterial einbinden

Ein Video gehört zu einem **Thema** der Kursdatei: Felder `video`, `videoTitle`, `videoMinutes` am Thema (Beispiel und Regeln: `app/AGENT-ANLEITUNG.md`, Abschnitt „Erklärvideo zu einem Thema“).
Wichtig: **nicht** als Schritt in `steps` einfügen (das würde den gespeicherten Fortschritt der Schüler/innen verschieben). `node app/tools/check-kurse.js` prüft, dass alle Dateien vorhanden sind.
