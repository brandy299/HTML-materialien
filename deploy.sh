#!/bin/bash
# deploy.sh – HTML-Materialien auf GitHub Pages hochladen
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
#
# Nutzung:
#   ./deploy.sh <datei.html> <Fach> <Thema> [Titel]
#
# Beispiele:
#   ./deploy.sh ~/Desktop/quiz.html "GPU" "LF5"
#   ./deploy.sh ~/Desktop/quiz.html "GPU" "LF5" "Interaktives Quiz Lernfeld 5"
#   ./deploy.sh ~/Desktop/aufgabe.html "Mathe" "Algebra" "Gleichungen Übung"

set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

# Argumente
DATEI="$1"
FACH="$2"
THEMA="$3"
TITEL="${4:-}"

if [ -z "$DATEI" ] || [ -z "$FACH" ] || [ -z "$THEMA" ]; then
  echo "Nutzung: ./deploy.sh <datei.html> <Fach> <Thema> [\"Titel\"]"
  echo ""
  echo "Beispiel: ./deploy.sh quiz.html \"GPU\" \"LF5\" \"Quiz Lernfeld 5\""
  exit 1
fi

if [ ! -f "$DATEI" ]; then
  echo "Fehler: Datei '$DATEI' nicht gefunden."
  exit 1
fi

BASENAME=$(basename "$DATEI")
ZIEL_DIR="$REPO_DIR/materialien/$FACH/$THEMA"
mkdir -p "$ZIEL_DIR"
ZIEL="$ZIEL_DIR/$BASENAME"

# Titel ableiten
if [ -z "$TITEL" ]; then
  TITEL="${BASENAME%.html}"
  TITEL="${TITEL//-/ }"
  TITEL="${TITEL//_/ }"
fi

DATUM=$(date "+%d.%m.%Y")

echo "→ Fach: $FACH | Thema: $THEMA | Titel: $TITEL"
echo "→ Kopiere '$BASENAME' nach materialien/$FACH/$THEMA/..."
cp "$DATEI" "$ZIEL"

echo "→ Aktualisiere Übersichtsseite..."

# Alle HTML-Dateien rekursiv einlesen und Liste aufbauen
LISTE=""
while IFS= read -r -d '' f; do
  fname=$(basename "$f")
  # Relativen Pfad ab materialien/
  relpath="${f#$REPO_DIR/}"

  # Fach und Thema aus Pfad extrahieren
  # Struktur: materialien/FACH/THEMA/datei.html
  fach_dir=$(echo "$relpath" | cut -d'/' -f2)
  thema_dir=$(echo "$relpath" | cut -d'/' -f3)

  ftitle="${fname%.html}"
  ftitle="${ftitle//-/ }"
  ftitle="${ftitle//_/ }"

  # Für die gerade hochgeladene Datei den Titel verwenden
  if [ "$f" = "$ZIEL" ]; then
    ftitle="$TITEL"
    fach_dir="$FACH"
    thema_dir="$THEMA"
  fi

  # Bestehenden Titel aus index.html wiederherstellen falls vorhanden
  existing=$(python3 -c "
import re, json
with open('$REPO_DIR/index.html', encoding='utf-8') as fh:
    m = re.search(r'\\{[^}]*\"pfad\":\"${relpath//\//\\/}\"[^}]*\\}', fh.read())
    if m:
        d = json.loads(m.group())
        print(d.get('name',''))
" 2>/dev/null || true)
  if [ -n "$existing" ] && [ "$f" != "$ZIEL" ]; then
    ftitle="$existing"
  fi

  fdate=$(stat -f "%Sm" -t "%d.%m.%Y" "$f" 2>/dev/null || date "+%d.%m.%Y")
  escaped_title=$(echo "$ftitle" | sed 's/"/\\"/g')
  LISTE="${LISTE}      {\"name\":\"${escaped_title}\",\"fach\":\"${fach_dir}\",\"thema\":\"${thema_dir}\",\"pfad\":\"${relpath}\",\"datum\":\"${fdate}\"},\n"
done < <(find "$REPO_DIR/materialien" -name "*.html" -print0 | sort -z)

# Trailing comma entfernen
LISTE=$(printf "%b" "$LISTE" | sed '$ s/,$//')

# index.html aktualisieren
python3 - <<PYEOF
import re

with open("$REPO_DIR/index.html", "r", encoding="utf-8") as fh:
    content = fh.read()

new_list = r"""$LISTE"""

new_content = re.sub(
    r'(const materialien = \[)[^\]]*(\];)',
    lambda m: m.group(1) + '\n' + new_list + '\n    ' + m.group(2),
    content,
    flags=re.DOTALL
)

with open("$REPO_DIR/index.html", "w", encoding="utf-8") as fh:
    fh.write(new_content)

print("  index.html aktualisiert.")
PYEOF

echo "→ Git commit & push..."
cd "$REPO_DIR"
git add materialien/ index.html
git commit -m "[$FACH / $THEMA] $TITEL ($DATUM)"
git push origin main

echo ""
echo "✅ Fertig! Deine Datei ist online:"
echo "   https://brandy299.github.io/HTML-materialien/materialien/$FACH/$THEMA/$BASENAME"
echo ""
echo "📋 Übersichtsseite:"
echo "   https://brandy299.github.io/HTML-materialien/"
