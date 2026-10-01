# Zurück zum alten Stand – so geht's

Jede Verbesserung kommt als **eigener kleiner Pull Request** nach `main`. So lässt sich jede Änderung einzeln zurücknehmen, ohne die anderen zu verlieren.
GitHub Pages veröffentlicht immer den aktuellen Stand von `main`; nach einem Rücksprung ist die Seite nach 1–2 Minuten wieder wie vorher
(Browser-Cache: einmal hart neu laden).

## Wichtige Rücksprungpunkte

| Stand | Commit | Beschreibung |
|---|---|---|
| **vor Paket 1+2** (01.10.2026) | `cd04f03` | Startseite lang, Google Fonts, alle Übersetzungen im Eintrag, kein Lerncode |

(Ein Git-Tag ließ sich in der Arbeitsumgebung nicht anlegen. Der Commit bleibt in der Historie erhalten und ist der Rücksprungpunkt.
Wer will, legt in GitHub unter *Releases → Draft a new release* einen Tag auf diesen Commit.)

## Einzelne Änderung zurücknehmen (empfohlen)

1. In GitHub **Pull requests → Closed** den betreffenden Pull Request öffnen.
2. Unten auf **Revert** klicken. GitHub erstellt einen neuen Pull Request, der genau diese Änderung rückgängig macht.
3. Diesen Pull Request mergen. Fertig.

Pull Requests dieser Pakete (werden hier eingetragen):

- Paket 2a · eigene Schriften statt Google Fonts: *(PR-Nummer folgt)*

## Alles auf den alten Stand zurücksetzen

Nur wenn mehrere Pakete zurück sollen. Auf einem Rechner mit Git:

```bash
git checkout main && git pull
git checkout -b zurueck-auf-stand-2026-10-01
git revert --no-edit cd04f03..HEAD      # nimmt alle späteren Änderungen zurück (Merge-Commits ggf. mit -m 1)
git push -u origin zurueck-auf-stand-2026-10-01
```
Dann in GitHub einen Pull Request daraus machen und mergen. Neue Kurse der Content-Agenten, die seit dem Stand dazugekommen sind,
würden dabei ebenfalls zurückgenommen – deshalb besser einzelne Pull Requests zurücknehmen.

## Notfall: alte Startseite

Die vorherige Startseite bleibt als `index-v1.html` erhalten (wird mit Paket 1 angelegt) und ist unter
`https://lernen.yannikbrand.eu/index-v1.html` erreichbar. Die App unter `/app/` ist davon unabhängig.

## Fortschritt der Schüler/innen

Der Fortschritt liegt im Browser der Schüler/innen (`localStorage`, Schlüssel `lernraum.*`). Rücksprünge der Website verändern oder löschen ihn nicht.
Neue Funktionen legen nur **zusätzliche** Schlüssel an und ändern bestehende nicht.
