/* ============================================================
   LERNRAUM — Desktop-Hero: das Schullogo-Dach als weiche 3D-Szene (three.js)
   Zwei extrudierte Formen (grüner Linienzug, lila Bogen) mit abgerundeten
   Kanten, mattem Material und weichem Schatten – schwebt leicht, neigt sich
   zur Maus und dreht beim Scrollen mit. Wird nur auf großen Bildschirmen mit
   Maus und ohne „weniger Bewegung“ geladen (landing.js); three.js liegt
   lokal in site/vendor/. Der Schriftzug des Logos ist bewusst nicht dabei.
   ============================================================ */
(function () {
  "use strict";

  // Umrisse in Pixeln der Vorlage (2000×1250, y nach unten)
  const GREEN = [
    [213, 305], [232, 288], [300, 278], [560, 278], [650, 272], [880, 165], [1005, 95], [1035, 75], [1075, 92], [1190, 170],
    [1330, 178], [1360, 190], [1400, 255], [1450, 280], [1550, 300], [1620, 320], [1685, 330],
    [1595, 358], [1520, 380], [1465, 402], [1485, 378], [1540, 358], [1555, 350],
    [1440, 326], [1380, 300], [1330, 262], [1290, 238], [1180, 238], [1160, 232], [1030, 160], [940, 205], [760, 300],
    [680, 330], [640, 332], [300, 330], [230, 328]
  ];
  const PURPLE = [
    [318, 452], [1010, 290], [1045, 289], [1100, 305], [1500, 438], [1540, 462], [1548, 500], [1546, 700], [1542, 915],
    [1500, 905], [1470, 780], [1445, 640], [1442, 500], [1070, 380], [1058, 376], [1050, 500], [1030, 572], [1000, 580],
    [978, 568], [972, 380], [955, 372], [392, 490], [388, 570], [355, 577], [318, 560], [302, 525], [302, 480]
  ];
  const CX = 950, CY = 480, S = 3.2 / 1472; // Mitte und Maßstab (Logo ≈ 3,2 Einheiten breit)

  window.LERNRAUM_HERO3D = function (host, canvas) {
    const T = window.THREE;
    if (!T) return false;
    let renderer;
    try { renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" }); } catch (e) { return false; }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.outputEncoding = T.sRGBEncoding;

    const scene = new T.Scene();
    const cam = new T.PerspectiveCamera(28, 1, 0.1, 60);
    cam.position.set(0, 0, 11);

    // Licht: weich, leicht von oben links – wie in der Vorlage
    scene.add(new T.HemisphereLight(0xffffff, 0xb9a6c6, 0.75));
    const key = new T.DirectionalLight(0xffffff, 0.85); key.position.set(-3, 5, 6); scene.add(key);
    const rim = new T.DirectionalLight(0xffd9ec, 0.45); rim.position.set(5, -2, 2); scene.add(rim);

    const make = (pts, color, depth) => {
      const sh = new T.Shape();
      pts.forEach(([x, y], i) => { const px = (x - CX) * S, py = -(y - CY) * S; i ? sh.lineTo(px, py) : sh.moveTo(px, py); });
      const g = new T.ExtrudeGeometry(sh, { depth, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.03, bevelSegments: 6, curveSegments: 8 });
      g.translate(0, 0, -depth / 2);
      const m = new T.MeshStandardMaterial({ color, roughness: 0.62, metalness: 0 });
      m.color.convertSRGBToLinear(); // Hex-Farben sind sRGB
      return new T.Mesh(g, m);
    };
    const logo = new T.Group();
    logo.add(make(GREEN, 0x6fa17a, 0.1), make(PURPLE, 0x9a7ab0, 0.12));
    const pivot = new T.Group(); pivot.add(logo); scene.add(pivot);

    // Weicher Schatten auf „dem Boden“ (Verlaufstextur)
    const sc = document.createElement("canvas"); sc.width = sc.height = 128;
    const sg = sc.getContext("2d"), gr = sg.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, "rgba(40,20,50,.34)"); gr.addColorStop(1, "rgba(40,20,50,0)");
    sg.fillStyle = gr; sg.fillRect(0, 0, 128, 128);
    const shadow = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ map: new T.CanvasTexture(sc), transparent: true, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2; scene.add(shadow);

    const size = () => {
      const r = host.getBoundingClientRect();
      renderer.setSize(r.width, r.height, false);
      cam.aspect = r.width / r.height; cam.updateProjectionMatrix();
      const visH = 2 * Math.tan(cam.fov * Math.PI / 360) * cam.position.z, visW = visH * cam.aspect;
      const k = Math.min(visW * 0.42 / 3.2, visH * 0.56 / 1.4);
      pivot.scale.setScalar(k);
      pivot.position.set(visW * 0.245, visH * 0.03, 0);
      shadow.position.set(pivot.position.x, pivot.position.y - 1.15 * k, 0);
      shadow.scale.set(3.4 * k, 1.1 * k, 1);
    };
    size();
    let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(size, 150); });

    let mx = 0, my = 0, tx = 0, ty = 0, sc2 = 0, visible = true, raf = 0;
    addEventListener("pointermove", (e) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; }, { passive: true });
    new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); }).observe(host);
    document.addEventListener("visibilitychange", () => { if (!document.hidden && visible && !raf) raf = requestAnimationFrame(frame); });

    const t0 = performance.now();
    function frame(now) {
      raf = 0;
      if (document.hidden || !visible) return;
      const t = (now - t0) / 1000;
      mx += (tx - mx) * 0.06; my += (ty - my) * 0.06;
      sc2 += (scrollY / 800 - sc2) * 0.1;
      pivot.rotation.y = Math.sin(t * 0.5) * 0.18 + mx * 0.7 + sc2 * 1.2;
      pivot.rotation.x = my * 0.35 + 0.06;
      logo.position.y = Math.sin(t * 0.9) * 0.04; // schwebt
      const s = 1 - Math.sin(t * 0.9) * 0.04;
      shadow.material.opacity = 0.9 * s;
      renderer.render(scene, cam);
      host.style.setProperty("--py", Math.min(scrollY, 900) * 0.25 + "px");
      host.style.setProperty("--mx", (mx * -14).toFixed(2) + "px");
      host.style.setProperty("--my", (my * -10).toFixed(2) + "px");
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return true;
  };
})();
