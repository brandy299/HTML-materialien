# Creative Director – Handbuch & Stand

Dieses Dokument ist das Gedächtnis des Creative Directors. Wer in einem neuen Chat weiterarbeitet, liest es
zuerst und **aktualisiert es am Ende jeder Sitzung** (Abschnitte „Stand“, „Entscheidungen“, „Offen“).

## Auftrag

Die Lehrkraft (Yannik Brand) liefert Unterrichtsmaterial. **Content-Agenten** machen daraus Kurse
(`app/kurse/*.js`, siehe `app/AGENT-ANLEITUNG.md`) und veröffentlichen selbst. Der **Creative Director**
sorgt dafür, dass alles wie aus einem Guss wirkt:

- Startseite (`index.html`, `site/`) und Navigation in der App
- Designsystem und App-Funktionen (`app/app.js`, `app/styles.css`)
- neue Aufgabentypen und Funktionen nach Wünschen (Issues mit Label `design`)
- Qualität neuer Kurse: Stil, Einheitlichkeit, inhaltliche Fehler (Tipps und Lösungen gegenprüfen!)
- Kuratierung: Was steht oben, was ist neu, welche Klausur steht an
- Werkzeuge: Inhalts-Check (`app/tools/check-kurse.js`), GitHub-Check (`.github/workflows/lernraum-check.yml`)

## Stand (zuletzt aktualisiert: 26.09.2026)

- **Live:** https://lernen.yannikbrand.eu (Startseite) · https://lernen.yannikbrand.eu/app/ (App).
  Domain bei netcup, CNAME `lernen` → `brandy299.github.io`. Im Schulnetz (Sophos-Firewall) inzwischen erreichbar.
- **Kurse:** PBP · HS1 Personalbedarf (vom Creative Director erstellt, 10 Themen inkl. Übungsklausur und
  Endlos-Training) · GPU · HS1Y Preiskalkulation (von einem Content-Agenten, 3 Themen).
- **Funktionen:** Folien, Quiz, Zuordnen, Lückentext, Rechenschema mit Zahlenfeld, Satzbausteine, Lernkarten,
  Kann-Liste, **Word-Simulation (`word`: Brief formatieren, geführt + frei, 26.09.2026)**, Übungsklausur (Timer,
  Note, Erwartungshorizont), Endlos-Training (nur Personalbedarf), Hilfe (gestufte Tipps, Merkkasten, Lexikon),
  ↺ Aufgabe/Thema zurücksetzen, QR-Codes mit Beamer-Ansicht, Einzeldatei-Build, Offline/PWA.
- **Startseite:** Hero mit Neuigkeiten (neuester Kurs, Klausur-Countdown), Zahlen, Kurse (neueste zuerst,
  Badge „Neu“ ≤ 14 Tage / „Aktualisiert“ ≤ 7 Tage), So geht's, Funktionen, Installieren, Lehrkräfte.
  Liest alle Kurse automatisch aus `app/index.html`.

## Designsystem („Typesafe“-Stil – von der Lehrkraft gewünscht)

Vorbild: typesafe.ai (pinke gerasterte Wolken, Retro-Fenster, riesige Grotesk-Überschriften, Terminal-Look).
Stilstudie der Lehrkraft war die Vorlage.

- **Farben** (`app/styles.css` → `:root`): Papier `#FEFEFE`, Tinte `#1E1E1E`, Panel `#E9E9E6`,
  Pink `#F386A1`, Pink tief `#D45BB6`, Grün (richtig) `#0A8F57`, Rot (falsch) `#C1354F`, Terminal-Grün `#5CE0A8`.
  Nur helles Design (bewusst kein Dark Mode).
- **Schrift:** Archivo 800 für Überschriften (eng, `letter-spacing` negativ), JetBrains Mono für Labels,
  Titelleisten, Terminal. Beide über Google Fonts (Datenschutz-Punkt offen, siehe unten).
- **Bausteine:** `.win` + `.bar` (Fenster mit schwarzer Titelleiste, pinker Punkt), harte Schatten
  `4px 4px 0 var(--ink)`, `.term` (Terminal-Rückmeldung), `.btn` (eckig, Großbuchstaben), Pixelwolke per
  Bayer-Dithering (`dither()` in app.js, `drawCloud()` in site/landing.js), Ecken-Markierungen.
- **Regeln:** Mobile first (390 px), keine seitliche Scrollbar, große Tippflächen (≥ 44 px),
  Rückmeldung immer im Terminal-Stil, keine Emojis als Deko.

## Wichtige Entscheidungen (mit Grund)

- **Keine Freitext-Aufgaben**, alles automatisch prüfbar – Niveau der Schüler/innen (Wunsch der Lehrkraft).
  Für deuten/erklären/Stellung nehmen: Satzbausteine (`sentence`).
- **Kein Backend/Supabase, kein Login** – bewusst, vorerst. Fortschritt nur im localStorage.
- **Nur neue Inhalte** auf der Plattform. Alte Materialien (vor 18.09.2026) nicht einbinden;
  alte Übersicht liegt unter `uebersicht-alt.html`.
- **Content-Agenten mergen selbst** nach grünem Check. Branch `kurs/<id>`, nur Kursdateien.
- **Übungsklausur** ohne ↺ und ohne Hilfe. Notenschlüssel 92/81/67/50/30 % (von der Lehrkraft nicht bestätigt).
- **Zahlenfeld** nur ganze Zahlen – deshalb hat „Der Bezugspreis“ (GPU) keine Rechenaufgabe.
- **Weihnachtsgeschäft** als „extern“ eingeordnet (PBP) – von der Lehrkraft nicht bestätigt.
- **Word-Simulation als eigener Schritt-Typ `word` (26.09.2026):** Kurse sind nur Daten – Interaktion gehört in
  die Engine. v1 kann Schriftart/-grad, Fett, Ausrichtung, Leerzeilen und Seitenränder; Startzustand Arial 10,
  Zielwerte wie das Word-Arbeitsblatt (DIN 5008). Bewusst keine echte Word-Datei: Handy-taugliche Klick-Übung,
  der echte Transfer bleibt das Formatieren am PC. Geführt (Aufgabe für Aufgabe) und frei (Live-Checkliste).

## Offen / Ideen

- [ ] **Kommazahlen im Zahlenfeld** (Wunsch aus GPU-Kurs, Bezugskalkulation) → Issue mit Label `design`.
- [ ] **Impressum** – Pflicht bei eigener Domain; Angaben muss die Lehrkraft liefern. Im Footer verlinken.
- [ ] **Google Fonts lokal einbinden** (Datenschutz/IP-Übertragung an Google).
- [ ] Übungspaket 3 (PBP) wurde nie geliefert.
- [ ] Endlos-Training nur für Personalbedarf – Generator für weitere Themen (z. B. Kalkulation) denkbar.
- [ ] Word-Simulation v2: zweiter Fall als Transfer (z. B. Kunststoffwerke-Brief), Blocksatz-Aufgabe und
      „Speichern unter“ mit Dateinamen-Regel.
- [ ] Optional: Branch-Schutz für `main` in den GitHub-Einstellungen (Lernraum-Check als Pflicht) –
      muss die Lehrkraft selbst in GitHub aktivieren.

## Arbeitsweise

1. Zu Beginn: dieses Dokument lesen, `git log --oneline -15`, offene Issues mit Label `design` und offene PRs ansehen.
2. Neue Kurse seit dem letzten Stand durchsehen (`git log -- app/kurse`), `node app/tools/check-kurse.js` laufen lassen,
   stichprobenartig Tipps/Lösungen gegenprüfen, Kurs in der App durchklicken.
3. Änderungen über eigenen Branch + PR, vorher testen (Playwright/Chromium ist in Claude-Code-Umgebungen vorhanden),
   dann selbst mergen. Die Lehrkraft möchte die Ergebnisse sehen, nicht jeden Zwischenschritt freigeben.
4. Am Ende: „Stand“, „Entscheidungen“, „Offen“ hier aktualisieren und mitcommitten.

## Startprompt für einen neuen Chat

```
Du bist Creative Director für meine Lern-Website Lernraum im Repo brandy299/HTML-materialien
(live: https://lernen.yannikbrand.eu). Lies zuerst CLAUDE.md und docs/CREATIVE-DIRECTOR.md,
schau dir die offenen Issues mit Label "design" und neue Kurse seit dem letzten Stand an
und sag mir kurz, was ansteht. Dann: [DEIN AUFTRAG]
```
