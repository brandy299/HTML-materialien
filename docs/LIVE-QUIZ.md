# Live-Quiz (`/quiz/`)

Quiz am Stundenende, ähnlich wie Socrative, im Lernraum-Design. Adresse: **https://lernen.yannikbrand.eu/quiz/**

## So läuft es im Unterricht
1. Lehrkraft öffnet `/quiz/` → „Lehrkraft“ → Fragen aus einem Kurs wählen (alle Kurs-Quizfragen stehen zur Verfügung) und/oder eigene Fragen schreiben (Mehrfachauswahl, Richtig/Falsch, Kurzantwort) und/oder ein **Quiz per Datei laden** (CSV aus Excel oder JSON, Vorlage zum Herunterladen im Quiz). Die Datei wird nur im Browser gelesen, hochgeladen wird erst der fertige Raum → „Raum öffnen“.
2. Es erscheint ein **5-stelliger Raumcode mit QR-Code**. Bis die Lehrkraft auf **„Quiz starten“** tippt, sind alle im **Warteraum** (Namen erscheinen live, danach Countdown 3-2-1). Schüler/innen scannen ihn oder tippen den Code unter `/quiz/` ein und wählen einen **Spitznamen**.
3. Jede Person beantwortet die Fragen im eigenen Tempo und sieht sofort „richtig/falsch“ mit Erklärung.
4. Die Lehrkraft sieht **für jeden Spitznamen einen Fortschrittsbalken** (grün richtig, rot falsch), dazu „Ø richtig“ und je Frage die Trefferquote. Mit „Ansicht: Rennen“ (Standard) wird daraus eine **Rennbahn** (Grafik in `quiz/race.js`): jede Person ist ein gezeichnetes Pferd mit Reiter in ihrer Bahn und galoppiert mit jeder beantworteten Frage Richtung Ziel (**nur richtige Antworten** bewegen das Pferd, falsche nicht; „Einzelantworten: an“ zeigt zusätzlich richtig/falsch je Frage; Staub, „+1“, Krone für die Führung, „Serie 3“ bei drei richtigen in Folge im Detail-Modus, Überhol-Meldungen, Konfetti im Ziel, Siegerpodest). Knöpfe: Namen ausblenden (zeigt „SuS 1, 2 …“), Sortierung, **Beamer-Ansicht** (Vollbild, große Schrift, Bedienknöpfe weg; Beenden mit „✕ Beamer aus“ oder Esc).
5. „Quiz beenden“ schließt den Raum; die Schüler/innen sehen ihr Ergebnis mit allen richtigen Antworten.

Technik: reine statische Seite (`quiz/index.html`, `quiz.js`, `quiz.css`), Echtzeit über Supabase-Funktionen (Abfrage alle 2 s). Keine Zusatzbibliothek außer dem vorhandenen QR-Code. Bewertung der Antworten läuft **auf dem Server**: die Lösungen verlassen den Server erst nach der Antwort.

## Quiz mit KI erstellen (Anleitung im Quiz)
Im Quiz-Editor gibt es „Anleitung: Quiz mit KI erstellen“: ein fertiger **Prompt zum Kopieren** (Thema/Material, Niveau und Anzahl eintragen), der eine CSV-Tabelle im richtigen Format erzeugt, plus ein Feld zum Einfügen der KI-Antwort. Der Prompt steht als `KI_PROMPT` in `quiz/quiz.js`; bei Formatänderungen der Datei-Import dort mitpflegen. Die Lehrkraft muss die Fragen vor dem Einsatz prüfen.

## Subdomain?
GitHub Pages erlaubt pro Repository nur **eine** eigene Domain (hier `lernen.yannikbrand.eu`). Eine zweite Subdomain wie `quiz.yannikbrand.eu` wäre nur mit einem eigenen Repository möglich. Deshalb liegt das Quiz unter dem **Pfad `/quiz/`**. Wer später doch eine Subdomain möchte: neues Repo mit dem Ordner `quiz/`, dort `CNAME`-Datei, bei netcup einen CNAME-Eintrag `quiz` → `brandy299.github.io`.

## Einrichtung
**Stand 19.11.2026: erledigt.** Läuft im bestehenden Supabase-Projekt (Irland, eu-west-1), `supabase/quiz.sql` ausgeführt, Lehrer-PIN gesetzt (nicht im Repo), `quiz/config.js` eingetragen. Zum Ändern der PIN den SQL-Befehl unten erneut ausführen. Für ein neues Projekt:
1. Auf supabase.com ein Projekt anlegen, Region **Frankfurt (eu-central-1)**. (Das Projekt der geplanten Leistungsabfrage kann mitgenutzt werden.)
2. Im **SQL Editor** den ganzen Inhalt von `supabase/quiz.sql` einfügen und „Run“ drücken. Das Skript darf mehrfach laufen.
3. Im SQL Editor die **Lehrer-PIN** setzen (nur wer sie kennt, kann Räume anlegen):
   ```sql
   insert into quiz_config(id, teacher_pin) values (1, 'DEINE-PIN')
   on conflict (id) do update set teacher_pin = excluded.teacher_pin;
   ```
4. Unter *Project Settings → API* die **Project URL** und den **anon/publishable Key** kopieren und in `quiz/config.js` eintragen (der öffentliche Key ist für den Browser gedacht; den geheimen `service_role`-Key **nie** eintragen).
5. Beim ersten Anlegen eines Quiz die PIN eingeben (wird nur auf diesem Gerät gemerkt).

Solange `quiz/config.js` leer ist, läuft das Quiz im **Demo-Modus** (nur im eigenen Browser, zum Ausprobieren mit zwei Tabs, kein Server nötig).

5. **Aufholbonus** (Knopf im Warteraum und während des Rennens, standardmäßig aus): Ab 4 Personen bekommen alle im hinteren Drittel für eine richtige Antwort **doppelte Punkte** (zwei Schritte, „TURBO +2“, Meldung „holt auf“). Berechnung serverseitig in `quiz_answer`; schaltbar mit `quiz_set_bonus`. Bei Neuanlage der Tabellen/Funktionen `supabase/quiz.sql` erneut ausführen (idempotent).

6. **Zuschauer-Ansicht**: Wer fertig ist, sieht auf dem eigenen Handy das Rennen live mit (eigene Bahn gelb umrandet). Dafür gibt es `quiz_watch_state`: liefert nur Spitzname, Anzahl beantworteter Fragen und Bonus, keine Antworten und keine Raum-Geheimnisse; Zugriff nur mit eigenem Token. Bei Updates `supabase/quiz.sql` erneut ausführen.

## Brauchen Lehrkräfte Supabase?
Nein. Lehrkräfte brauchen **kein Konto**, nur die gemeinsame Lehrer-PIN. Supabase läuft einmal im Hintergrund (von dir eingerichtet) und überträgt nur den Live-Stand zwischen Handys und Lehrkraft. Das Laden einer Datei braucht gar kein Backend.

## Datenschutz und Datensparsamkeit
- Keine Konten, keine echten Namen: nur ein **selbst gewählter Spitzname** (Hinweis dazu steht im Formular). Wer die Zuordnung braucht, spricht sie in der Klasse ab.
- Gespeichert werden pro Raum: Code, Titel, Fragen, Spitznamen, Antworten. **Alles wird nach 24 Stunden gelöscht** (beim Anlegen eines neuen Raums), sofort mit „Raum löschen“.
- Die Tabellen sind für den öffentlichen Schlüssel gesperrt (Row Level Security ohne Regeln). Zugriff nur über wenige Funktionen; Lehrkraft-Funktionen brauchen ein zufälliges Geheimnis, das nur im Browser der Lehrkraft liegt.
- Höchstens 80 Personen pro Raum, 40 Fragen. Bei Betrieb mit Schülern: Abstimmung mit Schulleitung/Datenschutz und Auftragsverarbeitungsvertrag mit Supabase wie bei der Leistungsabfrage.
- Zusätzlich lohnt sich im Supabase-Dashboard: Authentication → „Allow new users to sign up“ **aus**, da kein Login genutzt wird.

## Grenzen
- Jede Person darf jede Frage nur einmal beantworten (erste Antwort zählt). Das ist Üben/Sichern, keine benotete Prüfung.
- Nur der Lerninhalt „Quiz-Fragen“ der Kurse lässt sich übernehmen (Mehrfachauswahl mit 2–4 Antworten).
- Lehrkraft-Zugang gilt pro Gerät: den Raum öffnet man auf dem Gerät, auf dem er angelegt wurde.

## Wartung
Fehlermeldungen des Servers: `NO_PIN` (PIN nicht gesetzt), `BAD_PIN`, `NO_ROOM` (Code falsch oder Raum nach 24 h gelöscht), `NICK_TAKEN`, `FULL`, `CLOSED`.

## Hinweis für Updates
GitHub Pages liefert Dateien bis zu 10 Minuten aus dem Browser-Cache. Darum haben die Dateien in `quiz/index.html` eine Versionsnummer (`?v=…`). Bei Änderungen an `quiz.js`, `race.js`, `quiz.css` oder `config.js` die Nummer erhöhen, sonst sieht man zeitweise Alt/Neu gemischt (z. B. Namen im Warteraum ohne Kästchen).
