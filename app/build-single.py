#!/usr/bin/env python3
"""Baut die komplette App in EINE HTML-Datei (dist/lernraum.html).
Für Schulnetze, die github.io sperren: Datei auf Moodle/IServ/Teams hochladen oder verschicken.
Aufruf: python3 app/build-single.py"""
import pathlib, re
here = pathlib.Path(__file__).parent
html = (here / "index.html").read_text(encoding="utf-8")
css = (here / "styles.css").read_text(encoding="utf-8")
content = (here / "content.js").read_text(encoding="utf-8")
app = (here / "app.js").read_text(encoding="utf-8")
# PWA-Teile entfernen (funktionieren in einer Einzeldatei nicht)
html = re.sub(r'\s*<link rel="(manifest|icon|apple-touch-icon)"[^>]*>', "", html)
html = html.replace('<link rel="stylesheet" href="styles.css">', "<style>\n" + css + "\n</style>")
html = html.replace('<script src="content.js"></script>', "<script>\n" + content + "\n</script>")
html = html.replace('<script src="app.js"></script>', "<script>\n" + app.replace("</script>", "<\\/script>") + "\n</script>")
out = here / "dist" / "lernraum.html"
out.parent.mkdir(exist_ok=True)
out.write_text(html, encoding="utf-8")
print(f"{out} ({out.stat().st_size // 1024} KB)")
