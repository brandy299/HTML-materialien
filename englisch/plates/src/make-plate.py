#!/usr/bin/env python3
"""Tafel-Bild (Aquarell-Stillleben) mit der OpenAI-Bild-API erzeugen.

  python3 englisch/plates/src/make-plate.py 7 "Szene auf Englisch …" [out.png]
  node englisch/plates/src/webp.js out.png englisch/plates/plate-7.webp 0.8 1200   (NODE_PATH=<playwright>)

Der Key kommt aus OPENAI_API_KEY (oder wird von der Umgebung als Network-Secret ergänzt) – nie ins Repo schreiben.
Günstig: Modell gpt-image-1-mini, Qualität low, 1536x1024. Ein Bild pro Szene, nur bei echten Fehlern neu erzeugen.
Stil: Tusche + Aquarell, Creme/Waldgrün/Pastell, Stillleben ohne Menschen, keine Schrift im Bild (Anleitung: englisch/DESIGN.md).
"""
import base64, json, os, sys, urllib.request

BASE = ("Reportage sketch illustration, hand-drawn ink and watercolor on paper. Loose black ink pen outlines with visible sketchy strokes, contour lines not fully closed. "
        "Transparent watercolor washes over the ink, thin layers with visible paper texture and soft bleeding edges. Palette: cream paper, forest green, pale yellow, dusty pink, warm wood brown, soft sky blue. "
        "Soft watercolor wash background with generous white space. Cozy British still life, no people. {scene} "
        "Horizontal 3:2 composition, observer's viewpoint. "
        "No photorealism, no 3D render, no digital smooth gradients, no anime, no oil painting, no text, no letters, no numbers, no artist signature, no dates, no watermark.")

n, scene = sys.argv[1], sys.argv[2]
out = sys.argv[3] if len(sys.argv) > 3 else f"plate-{n}.png"
body = json.dumps({"model": "gpt-image-1-mini", "prompt": BASE.format(scene=scene), "size": "1536x1024", "quality": "low", "n": 1}).encode()
req = urllib.request.Request("https://api.openai.com/v1/images/generations", data=body,
                             headers={"Content-Type": "application/json", "Authorization": "Bearer " + os.environ.get("OPENAI_API_KEY", "x")})
r = json.load(urllib.request.urlopen(req, timeout=180))
open(out, "wb").write(base64.b64decode(r["data"][0]["b64_json"]))
print("ok", out, r.get("usage", {}).get("total_tokens"), "Tokens")
