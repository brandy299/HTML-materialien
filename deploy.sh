#!/bin/bash
# deploy.sh – HTML-Materialien auf GitHub Pages hochladen
# Nutzung: ./deploy.sh meine-datei.html
#    oder: ./deploy.sh meine-datei.html "Titel der Datei"

set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
MATERIALIEN_DIR="$REPO_DIR/materialien"

# Argumente
DATEI="$1"
TITEL="${2:-}"

if [ -z "$DATEI" ]; then
  echo "Nutzung: ./deploy.sh <datei.html> [\"Optionaler Titel\"]"
  exit 1
fi

# Datei existiert?
if [ ! -f "$DATEI" ]; then
  echo "Fehler: Datei '$DATEI' nicht gefunden."
  exit 1
fi

BASENAME=$(basename "$DATEI")
ZIEL="$MATERIALIEN_DIR/$BASENAME"

# Titel ableiten
if [ -z "$TITEL" ]; then
  TITEL="${BASENAME%.html}"
  TITEL="${TITEL//-/ }"
  TITEL="${TITEL//_/ }"
fi

DATUM=$(date "+%d.%m.%Y")

echo "→ Kopiere '$BASENAME' nach materialien/..."
cp "$DATEI" "$ZIEL"

echo "→ Aktualisiere Übersichtsseite..."

# Alle HTML-Dateien im materialien-Ordner einlesen und Liste neu aufbauen
LISTE=""
for f in "$MATERIALIEN_DIR"/*.html; do
  [ -f "$f" ] || continue
  fname=$(basename "$f")
  ftitle="${fname%.html}"
  ftitle="${ftitle//-/ }"
  ftitle="${ftitle//_/ }"

  # Bestehenden Titel aus index.html holen falls vorhanden
  existing=$(grep -o "\"name\":\"[^\"]*\",\"pfad\":\"materialien/$fname\"" "$REPO_DIR/index.html" | grep -o '"name":"[^"]*"' | cut -d'"' -f4 || true)
  if [ -n "$existing" ]; then
    ftitle="$existing"
  fi

  # Für die neue Datei den übergebenen Titel nutzen
  if [ "$fname" = "$BASENAME" ]; then
    ftitle="$TITEL"
  fi

  fdate=$(stat -f "%Sm" -t "%d.%m.%Y" "$f" 2>/dev/null || date "+%d.%m.%Y")
  LISTE="${LISTE}      {\"name\":\"${ftitle}\",\"pfad\":\"materialien/${fname}\",\"datum\":\"${fdate}\"},\n"
done

# Trailing comma entfernen
LISTE=$(echo -e "$LISTE" | sed '$ s/,$//')

# index.html aktualisieren (zwischen // MATERIALIEN_LISTE)
python3 - <<PYEOF
import re

with open("$REPO_DIR/index.html", "r") as fh:
    content = fh.read()

new_list = """$LISTE"""

# Ersetze alles zwischen den Array-Klammern
new_content = re.sub(
    r'(const materialien = \[)[^\]]*(\];)',
    r'\1\n' + new_list + r'\n    \2',
    content,
    flags=re.DOTALL
)

with open("$REPO_DIR/index.html", "w") as fh:
    fh.write(new_content)

print("  index.html aktualisiert.")
PYEOF

echo "→ Git commit & push..."
cd "$REPO_DIR"
git add materialien/"$BASENAME" index.html
git commit -m "Neu: $TITEL ($DATUM)"
git push origin main

echo ""
echo "✅ Fertig! Deine Datei ist online:"
echo "   https://brandy299.github.io/HTML-materialien/materialien/$BASENAME"
echo ""
echo "📋 Übersichtsseite:"
echo "   https://brandy299.github.io/HTML-materialien/"
