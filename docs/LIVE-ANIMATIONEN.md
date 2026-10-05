# Live-Animationen im Lernraum – Leitfaden für Agenten

Kurzfassung: **Wir benutzen keine Animationsbibliothek.** Alles ist Vanilla-JavaScript + CSS ohne Build-Schritt. Die Erklärvideos sind keine Videodateien, sondern **Animationen, die live im Browser aus der Zeit berechnet werden** (eigener „Video-Baukasten“). Dieselbe Quelldatei wird außerdem Bild für Bild zu einem mp4 gerendert (zum Teilen).

Dieser Leitfaden erklärt, *womit* und *wie* das gebaut ist. Für das reine **Erstellen eines Videos aus vorhandenen Bausteinen** gilt `app/VIDEO-ANLEITUNG.md`, für Aussehen und Bewegung `docs/VIDEO-DESIGNSPRACHE.md`.

## 1. Was es gibt (Überblick)

| Was | Technik | Wo |
|---|---|---|
| **Erklärvideos (live)** | Video-Baukasten: DOM + CSS, Zeitsteuerung per `requestAnimationFrame`, Musik als `<audio>` | `app/videos/lib/lv.js`, `lv.css`, Quellen `app/videos/src/<id>.js` |
| Einbindung in die App | Player mit Steuerung, Textmodus, Vollbild | `app/app.js` (`videoPlayer`, `loadVideo`, `videoCard`), `app/styles.css` (`.vid*`) |
| mp4 zum Teilen | Playwright-Screenshots → ffmpeg, Musik selbst erzeugt | `app/tools/render-video.js`, `video-music.py` |
| Pixelwolke (Titel/Schluss) | `<canvas>`, Bayer-Dither (8×8) in den Markenfarben | `drawCloud` in `lv.js`, ähnlich auf der Startseite (`site/landing.js`) |
| Startseite Desktop-Hero | three.js r128 (lokal), grob gerendert + Bayer-Dither, nur Desktop mit Maus | `site/hero3d.js`, `site/vendor/three.min.js` |
| Seitenwechsel | View Transitions API (`document.startViewTransition`), aus bei „weniger Bewegung“ | `render()` in `app/app.js` |
| Mikro-Animationen der App | CSS-Keyframes (`enter`, `pop`, `shake` …), Konfetti | `app/styles.css`, `confetti()` in `app/app.js` |

Es gibt **kein** React, GSAP, Lottie, Three.js im Video-Baukasten, keine Video-Hosting-Dienste und keine Nachladung von fremden Servern. Schriften und Skripte liegen lokal (`app/fonts/`, `site/vendor/`).

## 2. Das Grundprinzip des Video-Baukastens

**Jedes Bild ist eine reine Funktion der Zeit.** Eine Szene hat keinen Zustand, der „abläuft“; sie berechnet bei jedem Aufruf aus der Zeit `lt` (Sekunden seit Szenenbeginn), wie alles aussieht.

```
LV.seek(t)  →  für jede Szene/jeden Baustein:  update(lt)  →  Styles setzen (opacity, transform, Text …)
```

Das hat drei Vorteile, auf die alles andere aufbaut:

1. **Pausieren, Springen, Zurückspulen** sind kostenlos (`seek`). Die App kann Szenen überspringen, ohne Animationen neu zu starten.
2. **Rendern zu mp4** ist trivial: Zeit setzen → Screenshot → nächstes Bild. Kein Echtzeit-Aufnehmen, daher exakt und reproduzierbar.
3. **Tests** sind einfach: `LV.seek(25)` und ein Screenshot zeigt genau Sekunde 25.

**Bühne:** feste Größe **360 × 640 CSS-Pixel (9:16)**. In der App wird sie per `transform: scale()` in den Container skaliert (`.lv-wrap` / `.lv-stage`), beim Rendern mit Device-Scale-Factor 2 auf 720 × 1280 gebracht. Alles wird in diesen 360 × 640 Pixeln entworfen.

**Zeitschleife** (`tick` in `create()`): Die Zeit läuft über `requestAnimationFrame`, gezeichnet wird **höchstens alle 30 ms (ca. 33 Bilder/s)** – schont schwache Handys. Die Musik läuft als `<audio>` mit; weicht sie mehr als 0,3 s ab, wird sie nachgeführt.

## 3. Aufbau einer Videodefinition

```js
LV.video({
  id: "pbp-bedarf-berechnen",          // = Dateiname ohne .js
  title: "…", poster: 22.4,             // poster = Sekunde für das Vorschaubild
  bpm: 92, mood: "calm",                // nur für die erzeugte Musik
  scenes: [
    LV.title({ kicker, title, sub, dur }),
    LV.scene({ kicker: "01 · Die Frage", dur: 6.5, items: [ LV.text("…", { size: "xl", at: 0.5 }), … ] }),
    LV.outro({ text, url, dur })
  ]
});
```

- `dur` = Dauer der Szene; Gesamtdauer = Summe. `at` an Bausteinen = Sekunde **innerhalb der Szene**.
- Die ersten 0,3 s einer Szene gehören der **Pixel-Überblendung** (Bayer-Raster, wie die Pixelwolke) – erstes Element frühestens bei `at: 0.4`.
- Vorhandene Bausteine: `LV.text`, `chips`, `stack`, `timeline`, `scheme` (Rechenschema), `term`, `quiz`, `page` (A4-Brief nach DIN 5008 mit Kamerafahrt), `word` (Word-Fenster mit Mauszeiger). Aufrufe und Optionen: Tabelle in `app/VIDEO-ANLEITUNG.md`.

## 4. Einen neuen Baustein bauen

> **Rollenregel:** Neue Bausteine baut der **Creative Director** (Besitzer von `app/videos/lib/`). Content-Agenten bauen sie nicht selbst, sondern legen ein GitHub-Issue mit Label `design` an. Dieser Abschnitt ist für den, der den Baukasten erweitert.

Ein Baustein ist eine Funktion, die mit `comp(...)` verpackt wird und ein Objekt mit `update(lt)` liefert. Skelett:

```js
// in app/videos/lib/lv.js, vor dem Abschnitt „Szenen“
C.meinBaustein = comp((daten, o = {}) => {
  const el = h(`<div class="lv-mein"></div>`);          // h() baut ein Element aus HTML
  const at = o.at ?? 0.5;                                // Einblendzeit in der Szene
  return {
    el, at,
    end: at + 2,                                         // Sekunde, ab der der Baustein „fertig“ ist (Lesezeit-Prüfung!)
    words: wordCount(daten.text),                        // zählt für die Wörter-pro-Sekunde-Prüfung
    tx: () => [plain(daten.text)],                       // Textfassung (txt-Datei, Textmodus der App)
    update(lt) {                                         // nur aus lt berechnen, nichts „merken“
      reveal(el, prog(lt, at, 0.5), "rise");             // Ein-/Ausblenden
      fadeOut(el, lt, o.until);                          // optional: verschwindet ab o.until
    }
  };
});
```

Hilfsfunktionen im Baukasten:

- `prog(lt, start, dauer)` → 0…1 (begrenzt). Aus `lt` einen Fortschritt machen.
- `E.out / E.expo / E.back / E.inout / E.lin` → Easing-Kurven (`E.back` = leichtes Überschwingen).
- `reveal(el, p, "rise" | "fade" | "pop")`, `fadeOut(el, lt, until)`.
- `wrapWords(el)` → Text in Wörter zerlegen (für „Wort für Wort“).
- `h(html)`, `esc(text)`, `plain(html)`, `wordCount(html)`, `de(zahl)` (deutsches Zahlenformat).

**Regeln für `update(lt)`:**

1. **Rein aus `lt` berechnen.** Keine Timer, kein `setTimeout`, keine CSS-Animationen mit eigener Laufzeit – sonst stimmen Springen und Rendern nicht mehr. (Ausnahme: Übergänge, die rein dekorativ und zeitunabhängig sind, z. B. ein `transition` auf `padding` im Word-Fenster – sparsam einsetzen; beim Rendern zählt nur der Zustand nach dem Setzen.)
2. **Nur `opacity` und `transform` animieren** (und ggf. `scale`/`translate`/`rotate`-Eigenschaften). Kein Layout pro Bild (`width`, `top` …) – das ruckelt auf alten Handys.
3. **Position/Größe nicht in `update` messen**, wenn es vermeidbar ist. Falls doch (z. B. Mauszeiger auf einem Knopf), mit `getBoundingClientRect()` und durch die Bühnen-Skalierung teilen (`rect.width / el.offsetWidth`) – `offsetLeft` allein stimmt bei versteckten Elementen nicht.
4. **`end` und `words` ehrlich angeben.** Danach prüft `info()` automatisch: höchstens 14 Wörter pro Textblock, höchstens 3 Wörter/s pro Szene, nach dem letzten Baustein mindestens 1 s Lesezeit.
5. **`tx()` liefert saubere Textzeilen** (kein HTML). Alles, was im Video steht, muss auch in der Textfassung stehen.
6. **Skalierungsunabhängige Linien:** Für Rahmen/Plaketten, die bei Kamerafahrten mitskalieren, `calc(2px / var(--k, 1))` verwenden (`--k` setzt der Baustein, siehe `C.page`).

CSS für den Baustein kommt in `app/videos/lib/lv.css` (Präfix `.lv-…`).

## 5. Farben, Dark Mode, Schrift

- **Nur Variablen der App** (`--ink`, `--paper`, `--pink-fill`, `--ink-2`, `--good` …, definiert in `app/styles.css`), keine festen Farbwerte in Quelldateien. Ausnahme: „Papier“-Elemente, die immer hell bleiben sollen (Briefblatt, Word-Fenster) – dort feste, helle Farben.
- **Dark Mode** folgt der App (`:root[data-theme="dark"]`) und reagiert live auf das Ereignis `lernraum-theme` (`create()` rendert dann neu). Die Pixelwolke hat eine eigene dunkle Palette (`PAL_DARK`).
- **Schriften** liegen lokal (`app/fonts/`): Archivo (Text, `var(--grot)`) und JetBrains Mono (Beschriftungen, `var(--mono)`). Kleinste Schrift 11 px auf der 360-px-Bühne.
- **Formen:** eckige Kästen, harte Schatten, keine Verläufe, keine Fotos, keine runden Ecken. Die Pixelwolke gibt es nur in Titel- und Schlussbild.

## 6. Einbindung in die App

```
Kursdatei (Thema)  →  video: "<id>", videoTitle: "…", videoMinutes: 1
```

- **Nicht als Schritt** in `steps`, sonst verschiebt sich der gespeicherte Fortschritt. Das Video hängt am Thema; der Fortschritt steht in `p.video`.
- Route `#/f/<kurs>/<thema>/video`; Karte oben im Thema (`videoCard`, mit Vorschaubild hell/dunkel).
- `loadVideo(id)` lädt erst bei Bedarf `lv.css`, `lv.js` und `src/<id>.js` (alles klein, wenige KB) und gibt die Definition zurück. Musik (`<id>.m4a`) wird erst beim Start geladen.
- `videoPlayer`: Tippzonen (links = Szene zurück, rechts = vor, Mitte = Pause), Steuerleiste (zurück, Start/Pause, vor, Ton, Text, Vollbild), Textmodus (bei „weniger Bewegung“ automatisch), am Desktop der Text daneben mit hervorgehobener Szene, Vollbild (Taste, `F`, `Esc`).
- **Ton startet nur nach Tipp** (iPhone-Regel). Fehlt der Ton, läuft das Video ohne Musik, mit Hinweis.
- **Testhaken:** `window.__LV_TEST = true` vor dem Laden setzt `window.__vid` auf die laufende Instanz (nur für automatische Tests).
- Der **Service Worker** (`app/sw.js`) lässt `.m4a`, `.mp4` und Range-Anfragen in Ruhe. Bei Änderungen an `app.js`, `styles.css`, `i18n.js` oder Kursdateien die Cache-Version (`CACHE`) hochzählen.
- Die Einzeldatei (`app/dist/lernraum.html`) zeigt statt des Videos einen Hinweis; nach Änderungen `python3 app/build-single.py` ausführen.

## 7. Lokal ansehen und testen

```bash
python3 -m http.server 8080
# Vorschau in Echtzeit:
#   http://localhost:8080/app/videos/player.html?v=<id>&play=1
# In der App (Handybreite ~390 px):
#   http://localhost:8080/app/#/f/<kurs>/<thema>
```

**Vorschaubogen** (jedes Feld = 1 Sekunde, mit Warnungen zur Lesbarkeit):

```bash
node app/tools/render-video.js <id> --sheet
```

**Einzelne Sekunde als Bild** (Playwright, Chromium ist installiert): `player.html?v=<id>&render=1` öffnen, warten bis `window.__lvReady === true`, dann `LV.seek(sekunde)` und Screenshot. So prüft man Kamerafahrten und Übergänge gezielt.

**Voll rendern:**

```bash
node app/tools/render-video.js <id>            # mp4 + m4a + jpg + dark.jpg + txt (ca. 2 Minuten)
node app/tools/render-video.js <id> --txt-only # nur Textfassung
node app/tools/render-video.js <id> --poster-only
```

**Prüfen** (muss „0 Fehler“ melden, auch in der CI): `node app/tools/check-videos.js`, `node app/tools/check-kurse.js`, `node app/tools/check-i18n.js`.

Typische Fallen:

- Vorschaubild mitten im Hochzählen → `poster` auf einen Zeitpunkt setzen, an dem alles fertig ist.
- Text bricht in Zahlenzeilen ungünstig um → geschützte Leerzeichen (`&nbsp;`) zwischen Zahl und Einheit.
- Sich überlagernde Elemente: positionierte Elemente liegen über nicht positionierten; Text über der Pixelwolke braucht `position: relative; z-index: 2` (steht schon in `lv.css` für den Schlussbildschirm).
- Etwas misst oder zählt falsch, wenn die Szene noch unsichtbar ist (`display: none`) → nicht in `update` messen, solange `offsetWidth` 0 ist.

## 8. Musik

Kein Sprecher, nur Musik – **selbst erzeugt** (`app/tools/video-music.py`, reines Python): weiches Klangbett aus Akkorden mit leisen Zupftönen, Stimmung `calm` oder `bright`, Tempo `bpm`. Rechtefrei. **Keine fremde Musik, keine Audiodateien aus dem Netz.** Das Video muss ohne Ton vollständig verständlich sein.

## 9. Zugänglichkeit und Leistung

- Jedes Video hat eine **Textfassung** (`<id>.txt`, automatisch aus `tx()` erzeugt) und zwei **Vorschaubilder** (hell/dunkel). Videos starten nie von selbst.
- Bei „weniger Bewegung“ (`prefers-reduced-motion`) zeigt die App den Textmodus statt der Animation; die Startseiten-Effekte (3D-Hero, Konfetti) schalten sich ab.
- Leistung: ca. 33 Bilder/s Obergrenze, nur `opacity`/`transform`, kleine Dateien (mp4 höchstens 4 MB, m4a höchstens 1 MB, Video höchstens 90 s – Ziel 20–60 s).

## 10. Startseite und App-Effekte (kurz)

- **Pixelwolke:** `<canvas>` mit kleiner Auflösung (z. B. 90 × 100 Pixel), Wert pro Pixel aus überlagerten weichen Kreisen, dann **Bayer-Dither** (8×8-Matrix) auf 6 Farbstufen der Marke. Hochskaliert ohne Glättung (`image-rendering: pixelated`) ergibt das den Pixel-Look.
- **Desktop-Hero:** `site/hero3d.js` rendert das Schullogo mit three.js in grobem Pixelraster und überträgt es per Bayer-Dither in die Markenfarben; schwebt, neigt sich zur Maus, dreht beim Scrollen. Wird **nur** geladen bei `(min-width: 900px) and (hover: hover) and (prefers-reduced-motion: no-preference)` und ohne „Datensparen“ (`landing.js`). three.js liegt lokal in `site/vendor/` (r128).
- **Seitenwechsel:** `document.startViewTransition` (wenn vorhanden und keine reduzierte Bewegung).
- **Mikro-Animationen:** CSS-`@keyframes` in `app/styles.css` (`enter`, `pop`, `shake`), Konfetti ab 67 % in `confetti()`.

## 11. Wer darf was

| Bereich | Besitzer |
|---|---|
| Baukasten `app/videos/lib/`, `player.html`, Werkzeuge `app/tools/`, Designsprache, App-Player in `app/app.js`/`styles.css`, Startseite `site/` | Creative Director |
| Video-Quellen `app/videos/src/<id>.js` und erzeugte Dateien `app/videos/<id>.mp4|m4a|jpg|txt`, `video:`-Feld am Thema | Content-Agent (eigener Kurs) |
| Fehlt ein Baustein oder eine Funktion | GitHub-Issue mit Label `design` |

Arbeit läuft über Branch + Pull Request nach `main`, nie direkt auf `main`. Vor jedem Push: `node app/tools/check-kurse.js` (0 Fehler) und die App lokal testen (Handybreite ~390 px).

## 12. Wenn du eine ganz neue Art von Animation brauchst

Frage zuerst: **Lässt sie sich als Baustein aus der Zeit berechnen?** Wenn ja, bau sie wie in Abschnitt 4 – sie läuft dann automatisch live, im Vollbild, im Textmodus, im Dark Mode und als mp4. Wenn nein (z. B. etwas, das auf Eingaben der Schüler/innen reagiert), ist es kein Video, sondern ein **Aufgabentyp** (`PLAYERS` in `app/app.js`, siehe `app/README.md`) – und muss wie alle Aufgaben automatisch prüfbar sein.

Vorlagen zum Abgucken:

- `LV.scheme` – Zeilen erscheinen nacheinander, Zahlen zählen hoch (einfachster datengetriebener Baustein).
- `LV.timeline` – gezeichnete Linien (`stroke-dashoffset` aus `prog`).
- `LV.page` – Kamerafahrt (Interpolation zwischen Ausschnitten, `--k`-Skalierung).
- `LV.word` – Mauszeiger, der sich zwischen Knöpfen bewegt, Dokumentzustand aus den bereits erledigten Schritten.
