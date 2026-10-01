#!/usr/bin/env python3
"""Baut die komplette App in EINE HTML-Datei (dist/lernraum.html).
Für Schulnetze, die github.io sperren: Datei auf Moodle/IServ/Teams hochladen oder verschicken.
Aufruf: python3 app/build-single.py"""
import pathlib, re
here = pathlib.Path(__file__).parent
html = (here / "index.html").read_text(encoding="utf-8")
css = (here / "styles.css").read_text(encoding="utf-8")
# PWA-Teile entfernen (funktionieren in einer Einzeldatei nicht)
html = re.sub(r'\s*<link rel="(manifest|icon|apple-touch-icon)"[^>]*>', "", html)
import base64
fonts = (here / "fonts" / "fonts.css").read_text(encoding="utf-8")
fonts = re.sub(r'url\("([^"]+\.woff2)"\)', lambda m: 'url("data:font/woff2;base64,' + base64.b64encode((here / "fonts" / m.group(1)).read_bytes()).decode() + '")', fonts)
html = re.sub(r'\s*<link rel="preload"[^>]*fonts/[^>]*>', "", html)
html = html.replace('<link rel="stylesheet" href="fonts/fonts.css">', "<style>\n" + fonts + "\n</style>")
html = html.replace('<link rel="stylesheet" href="styles.css">', "<style>\n" + css + "\n</style>")
# Übersetzungen: in der Einzeldatei fest einbetten (Verweise → Skripte)
html = re.sub(r'<link rel="x-lernraum-i18n"[^>]*href="([^"]+)">', r'<script src="\1"></script>', html)
# alle lokalen Skripte (Basis, Kurse, QR, App) in der Reihenfolge aus index.html einbetten
def inline(m):
    code = (here / m.group(1)).read_text(encoding="utf-8").replace("</script>", "<\\/script>")
    return "<script>\n" + code + "\n</script>"
html = re.sub(r'<script src="([^":]+)"></script>', inline, html)
out = here / "dist" / "lernraum.html"
out.parent.mkdir(exist_ok=True)
out.write_text(html, encoding="utf-8")
print(f"{out} ({out.stat().st_size // 1024} KB)")
