#!/usr/bin/env python3
"""Erzeugt app/kurse/materialien.js aus dem Ordner materialien/.
Jeder Fachordner wird zu einer Materialsammlung auf der Startseite (mit QR-Codes).
Aufgenommen werden NUR Materialien, die ab SEIT hochgeladen wurden (Datum des letzten Git-Commits) –
ältere Materialien gehören nicht zur neuen Lernplattform.
Aufruf nach neuen Uploads:  python3 app/tools/build-materialien.py"""
import json, pathlib, re, html

root = pathlib.Path(__file__).resolve().parents[2]
mat = root / "materialien"
out = root / "app" / "kurse" / "materialien.js"
SKIP = {"schilf"}  # Lehrerfortbildung – nicht für Schüler
SEIT = "2026-09-18"  # Start der neuen Lernplattform: nur Materialien ab diesem Datum

import subprocess, datetime
def upload_date(f):
    """Datum des letzten Commits der Datei; nicht committete Dateien gelten als neu."""
    try:
        d = subprocess.run(["git", "log", "-1", "--format=%ad", "--date=short", "--", str(f)],
                           cwd=root, capture_output=True, text=True).stdout.strip()
    except Exception:
        d = ""
    return d or datetime.date.today().isoformat()

def slug(s):
    s = s.lower()
    for a, b in (("ä", "ae"), ("ö", "oe"), ("ü", "ue"), ("ß", "ss")):
        s = s.replace(a, b)
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")[:60]

def title_of(f):
    try:
        m = re.search(r"<title>(.*?)</title>", f.read_text(encoding="utf-8", errors="ignore"), re.S | re.I)
        t = html.unescape(m.group(1)).strip() if m else ""
    except Exception:
        t = ""
    if not t or "{" in t or "'" in t:
        t = re.sub(r"[_-]+", " ", f.stem).strip()
    return re.sub(r"\s+", " ", t)[:90]

subjects = []
for fach in sorted(p for p in mat.iterdir() if p.is_dir() and p.name not in SKIP):
    topics, seen = [], set()
    for f in sorted(fach.rglob("*.html")):
        if upload_date(f) < SEIT:
            continue
        rel = f.relative_to(root).as_posix()
        tid = slug(f.stem) or "material"
        while tid in seen:
            tid += "-2"
        seen.add(tid)
        group = f.parent.name if f.parent != fach else ""
        topics.append({"id": tid, "group": group, "title": title_of(f), "kicker": group or fach.name, "href": rel, "steps": []})
    counts = {}
    for t in topics:
        counts[t["title"]] = counts.get(t["title"], 0) + 1
    for t in topics:
        if counts[t["title"]] > 1:
            m = re.search(r"(\d+)$", pathlib.Path(t["href"]).stem)
            t["title"] += f" (Version {m.group(1)})" if m else f" ({pathlib.Path(t['href']).stem})"
    if topics:
        subjects.append({"id": "mat-" + slug(fach.name), "fach": fach.name, "name": "Materialsammlung",
                         "materials": True, "description": f"{len(topics)} Materialien aus dem Unterricht", "topics": topics})

js = ("/* AUTOMATISCH ERZEUGT von app/tools/build-materialien.py – nicht von Hand bearbeiten. */\n"
      "LERNRAUM.subjects.push(...") + json.dumps(subjects, ensure_ascii=False, indent=1) + ");\n"
out.write_text(js, encoding="utf-8")
print(f"{out}: Materialien ab {SEIT} – {len(subjects)} Fächer, {sum(len(s['topics']) for s in subjects)} Materialien")
