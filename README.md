# HTML-Materialien

Interaktive HTML-Lernmaterialien für den Unterricht, erreichbar über GitHub Pages.

**Übersichtsseite:** https://brandy299.github.io/HTML-materialien/

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
2. Aktualisiert die Übersichtsseite automatisch
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
index.html      ← Übersichtsseite (wird automatisch aktualisiert)
```

---

## Voraussetzungen

- [GitHub CLI](https://cli.github.com/) installiert und eingeloggt (`gh auth login`)
- `git` installiert
