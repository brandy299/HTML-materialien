# 📚 Business English Phrase Trainer

Spaced-Repetition-Trainer für Business-Phrasen | Höhere Handelsschule NRW | B1–B2

**Live-Demo:** `https://[dein-username].github.io/[repo-name]/`

---

## Features

- 🧠 **Spaced Repetition (SM-2)** – Karten erscheinen genau dann, wenn man sie fast vergisst
- 🔀 **Zwei Übungsmodi** – Deutsch → Englisch | Phrase → Funktion
- 📊 **Fortschrittstracking** – per localStorage, kein Server nötig
- 🔥 **Lernserie** – tägliche Motivation
- 📱 **Mobile-first** – funktioniert auf jedem Gerät
- ✈️ **Offline-fähig** – nach erstem Laden kein Internet nötig

## Themen (85 Phrasen)

| Thema | Phrasen | Level |
|---|---|---|
| 💬 Small Talk | 18 | B1 |
| 📞 Telephoning | 18 | B1 |
| ✉️ Business Emails | 18 | B1–B2 |
| ⚠️ Complaints | 16 | B1–B2 |
| 🔀 Mediation | 16 | B1–B2 |

---

## Setup auf GitHub Pages

### 1. Repository erstellen
```bash
# Neues Repo anlegen (oder in bestehendes Repo pushen)
git init
git add .
git commit -m "feat: add phrase trainer"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/DEIN-REPO.git
git push -u origin main
```

### 2. GitHub Pages aktivieren
1. Repository → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` | Folder: `/` (root) oder `/phrase-trainer`
4. Speichern → nach ~1 Minute live unter `https://USERNAME.github.io/REPO/`

### 3. Neue Phrasen hinzufügen
Öffne `data/phrases.js` und füge eine Karte zum gewünschten Thema hinzu:

```javascript
{ 
  id: "em19",                          // eindeutige ID (nie wiederholen!)
  de: "Ich bestätige den Termin.",     // Deutsch
  en: "I am writing to confirm our appointment.", // Englisch
  function: "Confirming",              // Funktion / Kategorie
  level: "B1"                          // B1 oder B2
}
```

### 4. Neues Thema hinzufügen
In `data/phrases.js` ein neues Objekt in `PHRASES` eintragen:

```javascript
presentations: {
  label: "Presentations",
  icon: "🎤",
  color: "#0891b2",
  colorLight: "#ecfeff",
  cards: [
    { id: "pr01", de: "...", en: "...", function: "...", level: "B1" },
    // ...
  ]
}
```

---

## Dateistruktur

```
phrase-trainer/
├── index.html          ← Haupt-App
├── manifest.json       ← PWA-Manifest
├── css/
│   └── style.css       ← Soft Educator UI
├── js/
│   └── app.js          ← Spaced-Repetition-Logik
└── data/
    └── phrases.js      ← Alle Phrasen + SM-2-Algorithmus
```

---

## Für Schüler: So funktioniert Spaced Repetition

Jede Karte bekommst du nach einem bestimmten Intervall wieder angezeigt:

| Button | Bedeutung | Nächste Wiederholung |
|---|---|---|
| 😬 Nochmal | Nicht gewusst | Sofort (heute nochmal) |
| 😐 Schwer | Gewusst, aber mühsam | In 1–2 Tagen |
| 🙂 Gut | Normal gut gewusst | In 3–7 Tagen |
| 😄 Leicht | Sofort gewusst | In 1–2 Wochen |

**Pro-Tipp:** Lieber täglich 10 Minuten als einmal pro Woche 1 Stunde!

---

*Erstellt für den Business-English-Unterricht an kaufmännischen Berufskollegs in NRW.*
