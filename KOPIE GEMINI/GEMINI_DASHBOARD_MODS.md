# Dashboard-Verbesserungen (Teacher View)

Hier sind einige Ideen, um das `dashboard.html` noch leistungsfähiger zu machen.

## 1. Real-time Monitoring
*   **Live-Status**: Eine Anzeige, welche Schüler gerade aktiv an welchem Material arbeiten (Supabase Realtime nutzen).
*   **Heatmap**: Visualisierung, bei welchen Aufgaben/Fragen die Schüler am meisten Zeit verbringen oder die meisten Fehler machen.

## 2. Schüler-Verwaltung
*   **Klassen-Gruppierung**: Filtern der Ergebnisse nach Klassen-Codes (z.B. "BK24a").
*   **Export**: Button zum Exportieren der Ergebnisse als CSV oder Excel für die Notengebung.

## 3. UI/UX Polishing
*   **Dark Mode**: Automatische Anpassung an das System-Theme.
*   **Interaktive Diagramme**: Nutzung von Chart.js für die Erfolgsquote pro Fach/Thema.
*   **Kompakte Ansicht**: Eine Listenansicht für Lehrer, die schnell viele Schüler überblicken müssen.

## 4. Feature: Quiz-Generator Integration
Da das Projekt bereits eine `codegenerator.html` und `pruefung-erstellen.html` hat, könnten diese direkt im Dashboard verknüpft werden, um einen nahtlosen Workflow zu ermöglichen:
`Prüfung erstellen` -> `Deployen` -> `Ergebnisse im Dashboard sehen`.

---

*Analysiert und erstellt von Gemini CLI.*
