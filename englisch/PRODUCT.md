# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** die Lehrkraft (Yannik Brand) im Englisch-Förderkurs am HBBK Oberhausen —
projiziert den HUB über den **Beamer** im Unterricht und führt die Klasse durch eine Einheit.
**Secondary:** die ca. 7 Schülerinnen des Förderkurses (Muttersprache Vietnamesisch, kaum
bis kein Englisch, lernen parallel Deutsch), die zwischen den Stunden auf dem **Handy**
wiederholen. Kein Login, kein Backend.

## Product Purpose

Ein Anfänger-Englisch-HUB, der drei Einheiten Alltagsenglisch auf Basis des Simple Present
bündelt — je mit kurzer Grammatikerklärung, Vokabeln (EN·DE), interaktiven Übungen
(Lückentext, Quiz) und druckbaren Arbeitsblättern. Er macht fundamentales Anfänger-Englisch
projizierbar und selbstlernbar. Erfolg heißt: eine Einheit lässt sich in 45 Minuten
vorführen und von den Schülerinnen danach allein wiederholen.

## Positioning

Übernimmt die Lücke unterhalb und neben dem regulären Englisch-Kurs: reines
Alltagsenglisch für absoluten Anfang (A1→A2), mit deutscher Stützung und optionaler
Vietnamesisch-Hilfe. Ergänzt den bestehenden Lernraum-Kurs „Förderkurs Englisch"
(Zeitformen), dupliziert ihn nicht.

## Operating Context

- Live im Unterricht: Beamer, Lehrerin treibt, Klasse schaut mit — Lesbarkeit aus der
  letzten Reihe ist entscheidend.
- Danach: Handy, mobil, ohne Anmeldung; die gleichen Inhalte.
- Sprache im Material: Aufgaben/Beispiele **Englisch**, Hilfen/Erklärungen dürfen **Deutsch**;
  Vietnamesisch ist optionale Verständnisstütze.
- Ausdruck: die Arbeitsblätter (Vokabeln, Übungen) gehen als PDF in den Unterricht.

## Capabilities and Constraints

- Statische, **selbstenthaltende** HTML-Seite (kein Build-Schritt), ausgeliefert über
  GitHub Pages unter `lernen.yannikbrand.eu/englisch/`.
- Drei Einheiten: **My Day**, **People & Family**, **Free Time & Likes**.
- Interaktive, **automatisch auswertbare** Übungen (Lückentext, Multiple-Choice) —
  keine Freitext-Aufgaben.
- **Vietnamesisch-Umschalter** (ein/aus) für Vokabeln.
- **PDF-Downloads** (Vokabel- und Übungsblätter, Reihenplan).
- **Keine Lehrer-Lösungen online.** **Keine Harry-Potter-Beispiele** (Schülerinnen kennen es
  nicht). **Kein Schuljahr** nennen. Keine echten Personendaten.
- HBBK Oberhausen; Ausgabe-Stand 2026.

## Brand Commitments

- Ausdrücklicher Wunsch: **cozy-britisch** — warm, gemütlich, britisch (Atmosphäre einer
  englischen Bibliothek/Pension/Teestube), **darf verspielter** sein. Kein Harry-Potter-IP,
  nur die Stimmung.
- Eigenständige, andere Designsprache als das „Typesafe"-Standarddesign der Lernraum-App.

## Evidence on Hand

- Fertige Arbeitsblätter als PDF: `englisch/downloads/FE_U1…`, `FE_U2…`, `FE_U3…` und
  `FE_Everyday_English_Overview.pdf` (Quelle im Gigastefan-Workspace,
  `faecher/englisch/output/FE_Everyday_English/`).
- Vorhandenes Incumbent-Markup: `englisch/index.html` (erste, zu einfache Fassung).
- Es gibt **keine** echten Fotos/Illustrationen; eigene Schrift-/Flächengestaltung nötig.
  Keine erfundenen Erfolgszahlen, Kunden oder Zitate.

## Product Principles

1. **Zeigen, nicht erklären** — die Sprache im Tun erlebbar machen (Beispiel vor Regel).
2. **Niedrige Schwelle** — absolute Anfänger:innen nie überfordern; ein Gedanke pro Schritt.
3. **Vom Beamer ins Handy lesbar** — große, klare Typografie, hoher Kontrast.
4. **Dreisprachige Stütze** — Englisch (Ziel) trägt, Deutsch erklärt, Vietnamesisch hilft.
5. **Alltag statt Fantasie** — Tagesablauf, Familie, Freizeit; kein Schulbuch-Ornament.

## Accessibility & Inclusion

- Projiziert aus der letzten Reihe lesbar (Großzügiger Kontrast, große Schrift).
- Mobil bedienbar (große Tippflächen), Offline-fähig (Einzeldatei).
- Vietnamesisch als wiederkehrende Verständnisstütze, klar von der Zielsprache getrennt.
