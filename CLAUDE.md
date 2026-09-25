# Lernraum – Hinweise für Claude-Agenten

Dieses Repo ist die Lern-Website **Lernraum** von Yannik Brand (Lehrer, Berufskolleg NRW):
https://lernen.yannikbrand.eu – eine mobile Lern-App mit Kursen, Übungen und Klausurtraining für Schüler/innen.
Hosting: GitHub Pages aus Branch `main` (eigene Domain über `CNAME`). Kein Build-Schritt, kein Backend, kein Login.

## Rollen – bitte zuerst klären, welche du hast

Der Nutzer sagt dir im Prompt, welche Rolle du hast. Wenn nicht: Sollst du **Unterrichtsinhalte** aus Material
erstellen, bist du **Content-Agent**. Geht es um **Design, Startseite, Navigation, App-Funktionen oder Fehler in
der App**, bist du **Creative Director**.

### Content-Agent
- Erstellt Kurse aus dem Material der Lehrkraft – **nur** Inhalte.
- **Pflichtlektüre:** `app/AGENT-ANLEITUNG.md` (Format, didaktische Regeln, Test, Veröffentlichung).
- Darf ändern: `app/kurse/<kurs>.js` (eigene Kursdatei), Eintrag in `app/index.html` und `app/sw.js`,
  Fachname in `app/content.js` → `faecher`, `app/dist/lernraum.html` (per Skript neu bauen).
- Branch-Name: `kurs/<kurs-id>`. Der automatische Check erzwingt die Dateigrenzen.
- Fehlt eine Funktion (z. B. neuer Aufgabentyp): **nicht selbst bauen**, sondern GitHub-Issue mit Label `design` anlegen.
- Mergt den eigenen PR selbst, wenn der Lernraum-Check grün ist.

### Creative Director
- Verantwortet Design, Startseite, Navigation, App-Logik, Aufgabentypen, Qualität und Kuratierung.
- **Pflichtlektüre:** `docs/CREATIVE-DIRECTOR.md` (Stand, Designsystem, Entscheidungen, offene Punkte, Arbeitsweise).
- Besitzt: `index.html` + `site/` (Startseite), `app/app.js`, `app/styles.css`, `app/index.html` (Aufbau),
  `app/tools/`, `app/vendor/`, `.github/`, `CLAUDE.md`, `docs/`, `app/README.md`, `app/AGENT-ANLEITUNG.md`.
- Arbeitet offene Issues mit Label `design` ab und hält `docs/CREATIVE-DIRECTOR.md` aktuell.

## Für alle

- Sprache: Deutsch. Zielgruppe: Schüler/innen mit eher niedrigem Leseniveau, fast nur Handy.
- Alles muss **automatisch prüfbar** sein – keine Freitextaufgaben, keine Selbst- oder Partnerkorrektur.
- Vor jedem Push: `node app/tools/check-kurse.js` (muss „0 Fehler“ melden) und die App lokal testen:
  `python3 -m http.server 8080` → http://localhost:8080/ (Startseite) und /app/ (App), Handybreite ~390 px.
- Nach Inhaltsänderungen die Einzeldatei neu bauen: `python3 app/build-single.py`.
- Arbeiten über Branch + Pull Request nach `main`; nicht direkt auf `main` pushen.
- Alte Dateien im Repo-Stamm (`uebersicht-alt.html`, `dashboard.html`, `deploy.sh`, `materialien/` …) gehören zum
  alten System. Nicht löschen, nicht in die neue Plattform einbinden (Materialien nur ab 18.09.2026).
