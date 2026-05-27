#!/bin/bash
# verwalten_fixed.sh – Materialien verwalten (PORTABLE VERSION)
# Basierend auf verwalten.sh, aber ohne hardcodierte Pfade.

set -e
# Bestimme das Repository-Verzeichnis relativ zum Script-Pfad
REPO_DIR="$(cd "$(dirname "$0")" && cd .. && pwd)"
INDEX="$REPO_DIR/index.html"

if [ ! -f "$INDEX" ]; then
    osascript -e "display alert \"Fehler: index.html nicht gefunden im Verzeichnis: $REPO_DIR\" as critical"
    exit 1
fi

# Alle Materialien aus index.html auslesen – Dynamische Pfadübergabe an Python
MATERIALIEN=$(python3 - <<PYEOF
import re, json, sys, os

index_path = "$INDEX"
if not os.path.exists(index_path):
    sys.exit(0)

with open(index_path, encoding="utf-8") as fh:
    content = fh.read()

m = re.search(r'const materialien = \[(.*?)\];', content, re.DOTALL)
if not m:
    sys.exit(0)

# Extrahiere einzelne Objekte
entries = re.findall(r'\{[^}]+\}', m.group(1))
for e in entries:
    try:
        # Säubere JSON (entferne evtl. trailing commas vor dem Schließen)
        e_clean = re.sub(r',\s*}', '}', e)
        d = json.loads(e_clean)
        print(f"{d['name']}|{d['fach']}|{d['thema'].strip()}|{d['pfad']}")
    except Exception as err:
        # Silent skip für kaputte Einträge
        continue
PYEOF
)

if [ -z "$MATERIALIEN" ]; then
  osascript -e 'display alert "Keine Materialien gefunden." as warning'
  exit 0
fi

# Liste für Dialog aufbauen
NAMEN=$(echo "$MATERIALIEN" | awk -F'|' '{print "\"" $1 " [" $2 " / " $3 "]\""}' | paste -sd ',' -)

AUSWAHL=$(osascript <<ASEOF
set materialListe to {${NAMEN}}
set auswahl to choose from list materialListe with title "Materialien verwalten" with prompt "Wähle ein Material:" OK button name "Weiter" cancel button name "Abbrechen"
if auswahl is false then return ""
return item 1 of auswahl
ASEOF
)

[ -z "$AUSWAHL" ] && exit 0

# Zeile finden
ZEILE=$(echo "$MATERIALIEN" | awk -F'|' -v name="$AUSWAHL" '{
  label = $1 " [" $2 " / " $3 "]"
  if (label == name) print $0
}')

NAME=$(echo "$ZEILE" | cut -d'|' -f1)
FACH=$(echo "$ZEILE" | cut -d'|' -f2)
THEMA=$(echo "$ZEILE" | cut -d'|' -f3)
PFAD=$(echo "$ZEILE" | cut -d'|' -f4)
FILENAME=$(basename "$PFAD")
DATUM=$(date "+%d.%m.%Y")

# Aktion wählen
AKTION=$(osascript <<ASEOF
set aktion to button returned of (display dialog "Was möchtest du mit \"${NAME}\" machen?" buttons {"Abbrechen", "Löschen", "Umbenennen / Verschieben"} default button "Umbenennen / Verschieben" with title "Material bearbeiten")
return aktion
ASEOF
)

case "$AKTION" in

  "Löschen")
    CONFIRM=$(osascript -e "button returned of (display dialog \"Wirklich löschen?\\n\\n${NAME}\\n[${FACH} / ${THEMA}]\" buttons {\"Abbrechen\", \"Löschen\"} default button \"Abbrechen\" with title \"Löschen bestätigen\")")
    [ "$CONFIRM" != "Löschen" ] && exit 0

    rm "$REPO_DIR/$PFAD"
    rmdir "$(dirname "$REPO_DIR/$PFAD")" 2>/dev/null || true
    rmdir "$(dirname "$(dirname "$REPO_DIR/$PFAD")")" 2>/dev/null || true

    python3 - <<PYEOF
import re
with open("$INDEX", encoding="utf-8") as fh:
    c = fh.read()
# Robusterer Regex für Löschen
c = re.sub(r'\s*\{[^}]*"pfad":\s*"' + re.escape("$PFAD") + r'"[^}]*\},?\n?', '\n', c)
c = re.sub(r',(\s*\n\s*\])', r'\1', c)
with open("$INDEX", "w", encoding="utf-8") as fh:
    fh.write(c)
PYEOF

    cd "$REPO_DIR"
    git add -A
    git commit -m "Gelöscht: $NAME ($DATUM)"
    git push origin main

    osascript -e "display notification \"$NAME wurde gelöscht.\" with title \"Fertig\""
    ;;

  "Umbenennen / Verschieben")
    # Dialoge für neue Werte
    NEUER_TITEL=$(osascript -e "text returned of (display dialog \"Neuer Titel:\" default answer \"${NAME}\" with title \"Umbenennen\")")
    [ -z "$NEUER_TITEL" ] && exit 0

    NEUES_FACH=$(osascript -e "text returned of (display dialog \"Fach:\" default answer \"${FACH}\" with title \"Fach ändern\")")
    [ -z "$NEUES_FACH" ] && exit 0

    NEUES_THEMA=$(osascript -e "text returned of (display dialog \"Thema / Lernfeld:\" default answer \"${THEMA}\" with title \"Thema ändern\")")
    [ -z "$NEUES_THEMA" ] && exit 0

    # Datei ggf. verschieben
    NEUES_DIR="$REPO_DIR/materialien/$NEUES_FACH/$NEUES_THEMA"
    NEUER_PFAD="materialien/$NEUES_FACH/$NEUES_THEMA/$FILENAME"

    if [ "$NEUER_PFAD" != "$PFAD" ]; then
      mkdir -p "$NEUES_DIR"
      mv "$REPO_DIR/$PFAD" "$NEUES_DIR/$FILENAME"
      rmdir "$(dirname "$REPO_DIR/$PFAD")" 2>/dev/null || true
      rmdir "$(dirname "$(dirname "$REPO_DIR/$PFAD")")" 2>/dev/null || true
    fi

    # index.html aktualisieren
    python3 - <<PYEOF
import re, json

with open("$INDEX", encoding="utf-8") as fh:
    c = fh.read()

def replacer(m):
    try:
        # JSON säubern für Parser
        obj_str = re.sub(r',\s*}', '}', m.group())
        d = json.loads(obj_str)
        if d.get("pfad") == "$PFAD":
            d["name"]  = "$NEUER_TITEL"
            d["fach"]  = "$NEUES_FACH"
            d["thema"] = "$NEUES_THEMA"
            d["pfad"]  = "$NEUER_PFAD"
            return json.dumps(d, ensure_ascii=False, indent=2)
    except:
        pass
    return m.group()

c = re.sub(r'\{[^}]+\}', replacer, c)
with open("$INDEX", "w", encoding="utf-8") as fh:
    fh.write(c)
PYEOF

    cd "$REPO_DIR"
    git add -A
    git commit -m "Bearbeitet: $NEUER_TITEL [$NEUES_FACH / $NEUES_THEMA] ($DATUM)"
    git push origin main

    osascript -e "display notification \"$NEUER_TITEL wurde aktualisiert.\" with title \"Fertig\""
    ;;
esac
