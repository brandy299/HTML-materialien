# Design — Englisch-HUB „A Field Guide to Everyday English"

Ein eigenständiges visuelles System für den Englisch-Anfänger-HUB unter
`lernen.yannikbrand.eu/englisch/`. Bewusst **anders** als das „Typesafe"-Design der
Lernraum-App.

## Welt

Ein gemütlicher **britischer Naturführer**: gealtertes Creme-Papier, feine Doppellinien,
gestochene Tafel-Embleme, ein Register, Specimen-Tabellen und rote „Sammler-Marken".
Die Welt besitzt den **Rahmen** (Kopfleiste, Linien, Tafeln, Register, Beschriftungen);
die **Lesespalte bleibt ruhig** (ca. 64 Zeichen, hoher Kontrast). Kein Harry-Potter-IP,
kein Union Jack — nur die Stimmung einer englischen Bibliothek/Teestube.

## Farben (Tokens, `:root`)

| Token | Wert | Rolle |
|---|---|---|
| `--paper` | `#EFE6D2` | Grund (gealtertes Papier) |
| `--paper-2` | `#E7DCC2` | Flächen, Chips |
| `--ink` | `#23201A` | Text, Rahmen-Doppellinien |
| `--forest` | `#23402B` | Vokabeln, Embleme, Links, Primärknopf |
| `--forest-2` | `#2F5638` | Beispielsätze, feine Akzente |
| `--ochre` | `#8A5A14` | Tafeln-No., Abschnitts-Labels, VN-Spalte |
| `--red` | `#9E3B2E` | Korrektur-Marke (richtig/falsch), aktiv |
| `--muted` | `#6A5F49` | Sekundärtext (auf Creme getönt, nicht grau) |
| `--line` / `--line-2` | `#C9BC9C` / `#B4A47E` | Haarlinien |

Kontrast: Tinte auf Creme ≈ 14:1, `--muted`/`--ochre` ≥ 4.5:1 (kleine Labels).

## Schrift

- **Display / Kopfleiste / Tafel-Titel:** *IM Fell English* (antiquarisch-britische
  Serife), selbst gehostet (`fonts/fell-*.woff2`, OFL). Trägt die Welt.
- **Text / UI / Tabellen:** *Be Vietnam Pro* (`fonts/bvp-*.woff2`, OFL) — gut lesbar
  und **mit vietnamesischem Subset** (für die VN-Hilfsspalte).

## Bausteine

- **Masthead:** Titel + Ornament-Sprig + Standfirst + Doppellinie.
- **Register (`.register`):** römische Nummern I–III als Wegweiser; aktiv = rot +
  Doppellinie. Mobil: waagerechte Tabs.
- **Tafel (`.plate`):** `Plate N` + Titel, Doppellinie, **Tafel-Illustration als
  gestochener Kupferstich** (erzeugte Plates `plates/plate-N.webp`, transparent,
  in dünnem Waldgrün-Rahmen; Provenance pro Datei im Sidecar `*.webp.json`),
  Specimen-Unterzeile, Lead-Absatz mit Initial.
- **Schema (`.schema`):** **grafische Grammatik-Erklärung** vor den Übungen — Subjekt-Chips,
  gezeichneter Pfeil, Verb-Chip, rote `+ s`-Marke, Beispielsatz rechts; darunter Schreibregeln
  bzw. `be`/`have`-Leaders. Deterministisch (HTML), nicht generativ.
- **Specimen-Tabelle (`.spec`):** English · Deutsch · Tiếng Việt, nummerierte Zeilen.
- **Übungen (`.ex`), fünf je Tafel, mit roter Korrektur-Marke:**
  - `match` — Paare finden (Chip antippen → Feld antippen), `.mt-*`
  - `cloze` — Lückentext mit Wortbank, `.gap`
  - `order` — Satz aus Wörtern bauen, `.o-target` / `.o-chip`
  - `spot` — den falschen Satz finden, `.spot-item`
  - `sort` — einer Kategorie zuordnen, `.sort-btn`
  - `quiz` — Multiple Choice mit Erklärung, `.opt`
- **Tear-outs:** PDF-Downloads.

## Gemütlich (12.10.2026)

- **Kicker** „Tea-time lessons“ mit Teetassen über dem Titel.
- **Tafel-Bild** im doppelten Rahmen (Innenrahmen + feine Außenlinie, Blatt-Ornamente `❦`).
- **Übungen als Karten** (leichtes Papier, kleiner Versatzschatten); geschaffte Übung zeigt „✓ done“.
- **Tee-Tally:** unter „Practice“ eine Tasse je Übung, gefüllt, wenn alles richtig war (`localStorage` `fe.done`, nur auf dem Gerät). Bei Vollmarke: „Zeit für eine Tasse Tee!“. Symbol `#cup`.
- Leitlinie: gemütlich, aber nicht überladen – Schmuck nur an Rahmen und Rückmeldung, die Lesespalte bleibt ruhig.

## Signatur & Motion

Die **rote Korrektur-Marke**: Beim Prüfen wird im Rand eine handschriftliche Tinte-
Marke (✓/✗) als SVG **gezeichnet** (`stroke-dashoffset`-Animation, ~0,5 s). Der einzige
bewegte Moment; respektiert `prefers-reduced-motion`.

## Browser-Flächen

`::selection` (waldgrün), `caret-color` (rot), `:focus-visible` (waldgrüner Ring),
WebKit-Scrollbar aus der Palette — bewusst gestaltet.

## Verboten (bewusst vermieden)

Kein Eyebrow/Kicker über Überschriften, keine gleichförmigen Icon-Karten als
Seitenstruktur, keine Emoji-Icons (Icons gezeichnet, Tafel-Embleme erzeugte
Kupferstiche), kein `border-left`, keine Gradient-Text/Glass/Hartschatten,
keine System-Display-Schrift.

## Bild-Assets

Die drei Tafel-Stiche sind mit `gpt-image-2.5` erzeugt (Vorgabe: freigestellter
antiquarischer Kupferstich, dunkelgrüne Tinte, transparent), dann zu WebP
(`cwebp -alpha_q 100`, Breite 1400) konvertiert. Der Erzeugungsprompt je Datei
liegt als `plates/plate-N.webp.json` bei (Provenance).


## Handy-Regeln (Pflicht)

Der Hub wird am Beamer gezeigt **und** zwischen den Stunden auf dem Handy wiederholt. Darum gilt:

- **Tippflächen ≥ 44 px** hoch (Chips, Zuordnungs-Knöpfe, Antworten, Links, Knöpfe); `touch-action: manipulation`.
- **Kein seitliches Scrollen** von 320 px Breite an (außer der Reiter-Leiste, die innen scrollt).
- **Register wird zur klebenden Leiste** (`position: sticky`, oben): römische Nummer + Titel, daneben die Vietnamesisch-Hilfe. Der aktive Reiter scrollt von selbst ins Bild. Unter 360 px zeigen die Reiter nur die Nummern.
- **Lücken bleiben im Satz** (`input.gap` hat feste Breite ≈ 9,5 Zeichen). Der Satz darf nie in drei Zeilen zerfallen.
- **Zuordnen (match):** Auf dem Handy liegen Englisch und Lücke in einer Zeile; die deutsche **Wortliste klebt am unteren Rand**, solange die Übung im Bild ist (kein Hin-und-her-Scrollen).
- **Alle Übungen bestätigen mit „Mark it“:** Tippen wählt nur aus (änderbar), geprüft wird erst mit dem Knopf; „Again“ setzt zurück. Auch das Quiz.
- **Sprachen auszeichnen:** Die Seite ist Deutsch (`lang="de"`), englische Inhalte tragen `lang="en"`, Vietnamesisch `lang="vi"` (richtige Vorlesestimme). Das erledigt ein Skript nach dem Rendern; neue Bausteine dort eintragen.
- Ein Tafel-Bild ist optional: Fehlt `plate`, erscheint nur das Ornament. Tafeln I–III sind erzeugte WebP-Stiche, **IV–VI sind handgezeichnete SVG-Stiche** (siehe „Bild-Assets“).

## Neue Tafel (Einheit) anlegen

1. In `englisch/index.html` ein Objekt an `UNITS` anhängen: `id: "plate-N"` (fortlaufend), `no`, `title`, `de`, `lead`, `caption`, `schema` (Schlüssel in `SCHEMA`), `schemaTitle`, `explain` (2 Texte), `vocab` (mindestens 8 × [English, Deutsch, Tiếng Việt]), `exercises` (mindestens 5, Ids `pN-a` … , Buchstaben A, B, C …, am Ende ein `quiz`).
2. Übungstypen: `match` · `cloze` (mit `bank`) · `order` · `spot` · `sort` · `quiz` – Aufbau wie in den vorhandenen Tafeln.
3. Neues Schema (grafische Erklärung) in `SCHEMA` ergänzen – nur HTML/CSS aus den Bausteinen `.schema-row`, `.chip-label`, `.chip-verb`, `.leader`.
4. `node app/tools/check-englisch.js` → **0 Fehler** (läuft auch in der CI).
5. Vietnamesisch ist eine Lernhilfe: bitte von einer Person mit Vietnamesisch-Kenntnissen gegenlesen lassen.
6. Keine Lehrer-Lösungen online, kein Schuljahr, keine echten Personendaten, keine Harry-Potter-Beispiele (siehe `PRODUCT.md`).

## Arbeitsblätter (PDF)

Zu jeder Tafel gehören zwei A4-Blätter: **Vokabeln** (EN · DE · Tiếng Việt) und **Übungen** (ohne Lösungen, zum Ausfüllen). Tafeln IV–VI werden **aus den Daten erzeugt**: `NODE_PATH=<playwright> node app/tools/render-englisch-pdf.js 4 5 6` → `englisch/downloads/FE_U<N>_<Titel>_Vocab.pdf` / `_Practice.pdf` (Hub-Schriften, Waldgrün/Ocker auf Weiß, keine Lösungen). Die PDFs der Tafeln I–III und der Reihenplan stammen aus dem Quell-Workspace der Lehrkraft und werden nicht neu erzeugt. Nach Änderungen an Vokabeln oder Übungen das Blatt neu erzeugen.

## Tafel-Bilder (Stiche)

Jede Tafel hat optional ein Kupferstich-Bild (`plate: "plates/plate-N.webp"` oder `.svg`). Tafeln IV–VI sind **SVG** (scharf, wenige KB), erzeugt mit `python3 englisch/plates/src/p4.py` (bzw. p5, p6; gemeinsame Bausteine `gen.py`: Schraffur-Muster, Efeu-Blatt, Bodenlinie). Stil: Waldgrün `#23402B`, Papier-Füllung `#F4EEDD`, Schraffur statt Verlauf, Format 1400×933, transparent. Neue Tafel: eigenes `pN.py` nach diesem Muster anlegen und `plate:` eintragen.
