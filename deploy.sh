#!/bin/bash
# deploy.sh – HTML-Materialien auf GitHub Pages hochladen
# Nutzung: ./deploy.sh <datei.html> <Fach> <Thema> [Titel]
# Beispiel: ./deploy.sh ~/Desktop/quiz.html "GPU" "LF5" "Interaktives Quiz"

set -e
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

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
DATUM=$(date "+%d.%m.%Y")

# Titel ableiten falls nicht angegeben
if [ -z "$TITEL" ]; then
  TITEL="${BASENAME%.html}"
  TITEL="${TITEL//-/ }"
  TITEL="${TITEL//_/ }"
fi

echo "→ Fach: $FACH | Thema: $THEMA | Titel: $TITEL"
echo "→ Kopiere '$BASENAME' nach materialien/$FACH/$THEMA/..."
cp "$DATEI" "$ZIEL"

echo "→ Aktualisiere Übersichtsseite..."

# Python-Script als DATEI aufrufen (kein Heredoc, kein Bash-Variable-Injection)
# Alle Argumente werden sauber als Python-Argumente übergeben
python3 "$REPO_DIR/update_index.py" \
  --repo    "$REPO_DIR" \
  --neu     "$ZIEL" \
  --fach    "$FACH" \
  --thema   "$THEMA" \
  --titel   "$TITEL" \
  --datum   "$DATUM"

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
