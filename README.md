# HTML-Materialien

Interaktive HTML-Lernmaterialien für den Unterricht, erreichbar über GitHub Pages.

**Lernplattform:** https://lernen.yannikbrand.eu/ (leitet auf `app/` weiter – siehe `app/README.md`)

**Alte Materialübersicht:** https://lernen.yannikbrand.eu/uebersicht-alt.html

---

## Neues Material hochladen

```bash
./deploy.sh <datei.html> <Fach> <Thema> ["Titel"]
```

**Beispiele:**
```bash
./deploy.sh ~/Desktop/quiz.html "GPU" "LF5"
./deploy.sh ~/Desktop/quiz.html "GPU" "LF5" "Interaktives Quiz Lernfeld 5"
./deploy.sh ~/Desktop/aufgabe.html "Mathe" "Algebra" "Gleichungen lösen"
```

Das Script:
1. Kopiert die Datei in `materialien/<Fach>/<Thema>/`
2. Aktualisiert die alte Übersichtsseite (`uebersicht-alt.html`) automatisch
3. Pusht alles auf GitHub

---

## Ordnerstruktur

```
materialien/
  GPU/
    LF5/
      LF5_Einstieg_Interaktiv.html
      LF5_Praesentation.html
  Mathe/
    Algebra/
      ...
deploy.sh       ← Upload-Script
index.html      ← leitet auf die Lernplattform (app/) weiter
uebersicht-alt.html ← alte Übersichtsseite (wird von deploy.sh aktualisiert)
```

---

## Voraussetzungen

- [GitHub CLI](https://cli.github.com/) installiert und eingeloggt (`gh auth login`)
- `git` installiert
