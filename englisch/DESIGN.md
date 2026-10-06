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
