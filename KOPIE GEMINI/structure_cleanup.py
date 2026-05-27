#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
structure_cleanup.py – Migriert die Material-Daten aus index.html in eine eigene JSON-Datei.
Dies erhöht die Wartbarkeit und verhindert Syntaxfehler in der index.html.
"""

import os
import re
import json
import sys

def migrate():
    # Pfade bestimmen
    repo_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    index_path = os.path.join(repo_dir, "index.html")
    data_dir = os.path.join(repo_dir, "data")
    json_path = os.path.join(data_dir, "materialien.json")

    if not os.path.exists(index_path):
        print(f"Fehler: index.html nicht gefunden in {repo_dir}")
        return

    # 1. Daten aus index.html extrahieren
    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()

    marker_regex = r'/\*__MATERIALIEN_START__\*/.*?const materialien\s*=\s*(\[.*?\]);.*?/\*__MATERIALIEN_END__\*/'
    match = re.search(marker_regex, content, re.DOTALL)
    
    if not match:
        print("Keine Material-Daten in index.html gefunden (oder Marker fehlen).")
        return

    json_str = match.group(1)
    try:
        # Säuberung für JSON Parser falls nötig
        json_str_clean = re.sub(r',\s*]', ']', json_str)
        json_str_clean = re.sub(r',\s*}', '}', json_str_clean)
        data = json.loads(json_str_clean)
    except Exception as e:
        print(f"Fehler beim Parsen der JSON-Daten: {e}")
        return

    # 2. JSON-Datei erstellen
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
    
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Erfolg: {len(data)} Einträge nach {json_path} migriert.")

    # 3. index.html vorbereiten (Placeholder für Fetch einbauen)
    # Dies ist ein destruktiver Schritt, daher kommentieren wir ihn hier nur als Anleitung:
    """
    Empfehlung für index.html Script-Teil:
    
    let materialien = [];
    async function loadData() {
        const r = await fetch('data/materialien.json');
        materialien = await r.json();
        renderDashboard(); // Initialer Render-Aufruf
    }
    """
    
    print("\nNächste Schritte:")
    print("1. Ändere index.html so, dass sie 'data/materialien.json' per fetch() lädt.")
    print("2. Aktualisiere update_index.py, so dass es nur noch die JSON-Datei schreibt.")
    print("3. Die Marker in index.html können dann entfernt werden.")

if __name__ == "__main__":
    migrate()
