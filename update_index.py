#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
update_index.py – Aktualisiert das materialien-Array in index.html.
Wird von deploy.sh aufgerufen. Kein Bash-Variable-Injection, alles UTF-8.

Argumente:
  --repo   Pfad zum Repository-Verzeichnis
  --neu    Pfad zur neu hochgeladenen Datei
  --fach   Fach (z.B. "GPU")
  --thema  Thema (z.B. "LF5")
  --titel  Titel des Materials
  --datum  Datum (z.B. "24.03.2026")
"""

import argparse
import json
import os
import re
import sys
from datetime import datetime

def slugify_title(filename: str) -> str:
    """Dateiname ohne .html und mit Leerzeichen statt Trennzeichen."""
    t = os.path.splitext(filename)[0]
    t = t.replace("-", " ").replace("_", " ")
    return t

def parse_args():
    p = argparse.ArgumentParser()
    p.add_argument("--repo",   required=True)
    p.add_argument("--neu",    default="")   # optional: neu hochgeladene Datei
    p.add_argument("--fach",   default="")
    p.add_argument("--thema",  default="")
    p.add_argument("--titel",  default="")
    p.add_argument("--datum",  default="")
    return p.parse_args()

def load_existing_titles(index_path: str) -> dict:
    """Liest die bestehenden Titel aus index.html (pfad → name)."""
    titles = {}
    try:
        with open(index_path, encoding="utf-8") as fh:
            content = fh.read()
        m = re.search(r"const materialien\s*=\s*(\[.*?\]);", content, re.DOTALL)
        if m:
            data = json.loads(m.group(1))
            for entry in data:
                titles[entry.get("pfad", "")] = entry.get("name", "")
    except Exception as e:
        print(f"  Warnung: Kann bestehende Titel nicht lesen: {e}", file=sys.stderr)
    return titles

def scan_materialien(repo_dir: str, neu_pfad: str, fach: str, thema: str,
                     titel: str, datum: str, existing_titles: dict) -> list:
    """Scannt alle HTML-Dateien im materialien/-Ordner und baut die Liste auf."""
    mat_dir = os.path.join(repo_dir, "materialien")
    entries = []

    # Alle HTML-Dateien sammeln und sortieren
    html_files = []
    for root, dirs, files in os.walk(mat_dir):
        dirs.sort()
        for fname in sorted(files):
            if fname.endswith(".html"):
                html_files.append(os.path.join(root, fname))

    for fpath in html_files:
        relpath = os.path.relpath(fpath, repo_dir).replace("\\", "/")
        parts = relpath.split("/")
        # Struktur: materialien/FACH/THEMA/datei.html
        fach_dir  = parts[1] if len(parts) > 1 else ""
        thema_dir = parts[2] if len(parts) > 2 else ""
        fname     = parts[-1]

        if fpath == neu_pfad:
            # Neu hochgeladene Datei: angegebene Metadaten verwenden
            ftitel   = titel
            ffach    = fach
            fthema   = thema
            fdatum   = datum
        elif relpath in existing_titles and existing_titles[relpath]:
            # Bestehende Datei: gespeicherten Titel behalten
            ftitel   = existing_titles[relpath]
            ffach    = fach_dir
            fthema   = thema_dir
            fdatum   = get_file_date(fpath)
        else:
            # Neue oder unbekannte Datei: Titel aus Dateiname ableiten
            ftitel   = slugify_title(fname)
            ffach    = fach_dir
            fthema   = thema_dir
            fdatum   = get_file_date(fpath)

        entries.append({
            "name":  ftitel,
            "fach":  ffach,
            "thema": fthema,
            "pfad":  relpath,
            "datum": fdatum,
        })

    return entries

def get_file_date(fpath: str) -> str:
    """Gibt das Änderungsdatum einer Datei im Format DD.MM.YYYY zurück."""
    try:
        ts = os.path.getmtime(fpath)
        return datetime.fromtimestamp(ts).strftime("%d.%m.%Y")
    except Exception:
        return datetime.now().strftime("%d.%m.%Y")

def fix_encoding(text: str) -> str:
    """Repariert double-encoded UTF-8 Sequenzen (z.B. Ã¼ → ü, â → →).
    Wird nach jedem Lesen aufgerufen, damit Encoding-Fehler sich nicht akkumulieren."""
    result = []
    i = 0
    while i < len(text):
        c = text[i]
        code = ord(c)
        if 0x00C0 <= code <= 0x00FF:
            j = i + 1
            while j < len(text) and 0x0080 <= ord(text[j]) <= 0x00BF:
                j += 1
            if j > i + 1:
                try:
                    bs = bytes(ord(ch) for ch in text[i:j])
                    result.append(bs.decode('utf-8'))
                    i = j
                    continue
                except (UnicodeDecodeError, ValueError):
                    pass
        result.append(c)
        i += 1
    return ''.join(result)


def update_index_html(index_path: str, entries: list) -> None:
    """Ersetzt das materialien-Array in index.html (UTF-8, kein Encoding-Problem)."""
    with open(index_path, encoding="utf-8") as fh:
        content = fh.read()

    content = fix_encoding(content)

    new_json = json.dumps(entries, ensure_ascii=False, indent=2)

    new_content, n = re.subn(
        r"(const materialien\s*=\s*)\[.*?\](;)",
        lambda m: m.group(1) + new_json + m.group(2),
        content,
        flags=re.DOTALL,
    )

    if n == 0:
        print("  FEHLER: 'const materialien' nicht in index.html gefunden!", file=sys.stderr)
        sys.exit(1)

    with open(index_path, encoding="utf-8") as fh:
        original = fh.read()
    if new_content == original:
        print("  index.html unverändert (keine neuen Daten).")
        return

    with open(index_path, "w", encoding="utf-8") as fh:
        fh.write(new_content)

    print(f"  index.html aktualisiert ({len(entries)} Materialien).")

def main():
    args = parse_args()

    index_path = os.path.join(args.repo, "index.html")
    if not os.path.exists(index_path):
        print(f"FEHLER: index.html nicht gefunden: {index_path}", file=sys.stderr)
        sys.exit(1)

    print(f"  Lese bestehende Titel aus index.html...")
    existing = load_existing_titles(index_path)

    print(f"  Scanne materialien/-Ordner...")
    entries = scan_materialien(
        repo_dir      = args.repo,
        neu_pfad      = args.neu,
        fach          = args.fach,
        thema         = args.thema,
        titel         = args.titel,
        datum         = args.datum,
        existing_titles = existing,
    )

    print(f"  {len(entries)} Materialien gefunden.")
    update_index_html(index_path, entries)

if __name__ == "__main__":
    main()
