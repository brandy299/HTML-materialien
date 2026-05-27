# Analyse & Verbesserungsvorschläge – Github HTML Pipeline

Dieses Projekt ist ein hervorragendes Beispiel für eine "No-Build" Automatisierung, die GitHub Pages voll ausnutzt. Die Kombination aus statischem Hosting und dynamischer Verwaltung über die GitHub API ist sehr effizient.

## 1. Detaillierte Analyse

### Stärken
*   **Minimalistisches Deployment**: Kein Build-Schritt notwendig, Änderungen sind sofort live.
*   **Benutzerfreundlichkeit**: Die macOS-Droplets und AppleScripts machen die Bedienung für Nicht-Entwickler (Lehrkräfte) sehr einfach.
*   **Zentralisiertes Tracking**: Die Integration von Supabase ermöglicht eine einfache Fortschrittskontrolle ohne eigenen Server.
*   **Robustes Scripting**: `update_index.py` behandelt Encoding-Probleme und bewahrt Metadaten.

### Schwachstellen / Risiken
*   **Portabilität**: `verwalten.sh` enthält einen hardcodierten absoluten Pfad (`/Users/yabrand/Desktop/Projekte/...`).
*   **Daten-Integrität**: Die Speicherung der Daten direkt in `index.html` via Regex-Ersetzung ist clever, aber anfällig für Syntaxfehler, wenn man manuell in der Datei arbeitet.
*   **Sicherheit**: Der Supabase Key ist zwar ein "Anon Key", aber die Datenbank-Policies müssen extrem restriktiv sein, da der Key öffentlich in `tracking.js` steht.
*   **Skalierbarkeit**: Bei hunderten von Materialien wird das `materialien`-Array in `index.html` sehr groß und verlangsamt das initiale Laden der Seite.

---

## 2. Empfohlene Verbesserungen

### A. Portabilität Fix (Priorität: Hoch)
Die absoluten Pfade in den Shell-Scripten sollten durch relative Pfade (basierend auf `dirname $0`) ersetzt werden.

### B. Daten-Entkopplung (Priorität: Mittel)
Anstatt die JSON-Daten direkt in `index.html` zu injizieren, sollte eine `data/materialien.json` erstellt werden.
*   `index.html` lädt die Daten per `fetch()`.
*   Die Scripte aktualisieren nur die JSON-Datei.
*   Vorteil: Sauberere Trennung von Logik, Design und Daten.

### C. Unified CLI (Priorität: Niedrig)
Ein kleines Python-Tool (z.B. mit `click` oder `typer`), das alle Funktionen (`deploy`, `delete`, `rename`, `list`) vereint, anstatt vieler einzelner Bash-Scripte.

---

## 3. Erstellte Dateien in diesem Ordner

1.  `verwalten_fixed.sh`: Eine portable Version des Verwaltungs-Scripts.
2.  `structure_cleanup.py`: Ein Vorschlag zur Migration auf eine externe JSON-Datenquelle.
3.  `GEMINI_DASHBOARD_MODS.md`: Design-Ideen für das Teacher Dashboard.
