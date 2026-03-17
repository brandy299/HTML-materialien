#!/bin/bash
# verwalten.sh – Materialien verwalten (Umbenennen, Löschen, Verschieben)
# Einfach doppelklicken oder ./verwalten.sh aufrufen

set -e
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
INDEX="$REPO_DIR/index.html"

# Alle Materialien aus index.html auslesen
MATERIALIEN=$(python3 - <<'PYEOF'
import re, json, sys

with open("/Users/yabrand/Desktop/Projekte/Github HTML Pipeline/index.html") as fh:
    content = fh.read()

m = re.search(r'const materialien = \[(.*?)\];', content, re.DOTALL)
if not m:
    sys.exit(0)

entries = re.findall(r'\{[^}]+\}', m.group(1))
for e in entries:
    try:
        d = json.loads(e)
        print(f"{d['name']}|{d['fach']}|{d['thema'].strip()}|{d['pfad']}")
    except:
        pass
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
with open("$INDEX") as fh:
    c = fh.read()
c = re.sub(r'\s*\{[^}]*"pfad":"' + re.escape("$PFAD") + r'"[^}]*\},?\n?', '\n', c)
c = re.sub(r',(\s*\n\s*\])', r'\1', c)
with open("$INDEX", "w") as fh:
    fh.write(c)
PYEOF

    cd "$REPO_DIR"
    git add -A
    git commit -m "Gelöscht: $NAME ($DATUM)"
    git push origin main

    osascript -e "display notification \"$NAME wurde gelöscht.\" with title \"Fertig\""
    ;;

  "Umbenennen / Verschieben")
    # Neuer Titel
    NEUER_TITEL=$(osascript -e "text returned of (display dialog \"Neuer Titel:\" default answer \"${NAME}\" with title \"Umbenennen\")")
    [ -z "$NEUER_TITEL" ] && exit 0

    # Neues Fach
    NEUES_FACH=$(osascript -e "text returned of (display dialog \"Fach:\" default answer \"${FACH}\" with title \"Fach ändern\")")
    [ -z "$NEUES_FACH" ] && exit 0

    # Neues Thema
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

with open("$INDEX") as fh:
    c = fh.read()

def replacer(m):
    try:
        d = json.loads(m.group())
        if d.get("pfad") == "$PFAD":
            d["name"]  = "$NEUER_TITEL"
            d["fach"]  = "$NEUES_FACH"
            d["thema"] = "$NEUES_THEMA"
            d["pfad"]  = "$NEUER_PFAD"
            return json.dumps(d, ensure_ascii=False)
    except:
        pass
    return m.group()

c = re.sub(r'\{[^}]+\}', replacer, c)
with open("$INDEX", "w") as fh:
    fh.write(c)
PYEOF

    cd "$REPO_DIR"
    git add -A
    git commit -m "Bearbeitet: $NEUER_TITEL [$NEUES_FACH / $NEUES_THEMA] ($DATUM)"
    git push origin main

    osascript -e "display notification \"$NEUER_TITEL wurde aktualisiert.\" with title \"Fertig\""
    ;;
esac
