#!/bin/bash
# delete.sh – Material löschen und von GitHub entfernen
# Nutzung: ./delete.sh "materialien/GPU/LF5/datei.html"

set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
PFAD="$1"

if [ -z "$PFAD" ]; then
  echo "Nutzung: ./delete.sh \"materialien/Fach/Thema/datei.html\""
  exit 1
fi

FULL_PATH="$REPO_DIR/$PFAD"

if [ ! -f "$FULL_PATH" ]; then
  echo "Fehler: '$PFAD' nicht gefunden."
  exit 1
fi

BASENAME=$(basename "$PFAD")
DATUM=$(date "+%d.%m.%Y")

echo "→ Lösche '$PFAD'..."
rm "$FULL_PATH"

# Leere Ordner aufräumen
rmdir "$(dirname "$FULL_PATH")" 2>/dev/null || true
rmdir "$(dirname "$(dirname "$FULL_PATH")")" 2>/dev/null || true

echo "→ Aktualisiere index.html..."

python3 - <<PYEOF
import re, json

with open("$REPO_DIR/index.html", "r") as fh:
    content = fh.read()

# Zeile mit diesem pfad entfernen
pfad = "$PFAD"
new_content = re.sub(
    r'\s*\{[^}]*"pfad":"' + re.escape(pfad) + r'"[^}]*\},?\n?',
    '\n',
    content
)
# Trailing comma bei letztem Eintrag fixen
new_content = re.sub(r',(\s*\n\s*\])', r'\1', new_content)

with open("$REPO_DIR/index.html", "w") as fh:
    fh.write(new_content)

print("  index.html aktualisiert.")
PYEOF

echo "→ Git commit & push..."
cd "$REPO_DIR"
git add -A
git commit -m "Gelöscht: $BASENAME ($DATUM)"
git push origin main

echo ""
echo "✅ '$BASENAME' wurde gelöscht und von GitHub entfernt."
