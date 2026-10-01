/* ============================================================
   LERNRAUM — Desktop-Hero: das Schullogo-Dach als weiche 3D-Szene (three.js)
   Zwei extrudierte Formen (grüner Linienzug, lila Bogen) mit abgerundeten
   Kanten. Die Szene wird in grobem Pixelraster gerendert und per Bayer-Dither
   in die Markenfarben (Rosa, Tinte, Logo-Grün) übersetzt – wie die Pixelwolke.
   Schwebt leicht, neigt sich zur Maus und dreht beim Scrollen mit. Wird nur auf großen Bildschirmen mit
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

  const CELL = 3; // Bildschirm-Pixel je Rasterpunkt

  const FRAG = `
precision highp float;
uniform sampler2D tD; uniform vec2 uRes; uniform float uT; uniform float uS; uniform float uDark;
varying vec2 vUv;
vec3 pal(int i){
  if(i==0) return vec3(.996,.996,.996);
  if(i==1) return vec3(.984,.859,.898);
  if(i==2) return vec3(.973,.690,.788);
  if(i==3) return vec3(.953,.525,.631);
  if(i==4) return vec3(.867,.427,.710);
  if(i==5) return vec3(.831,.357,.714);
  return vec3(.067,.067,.067);
}
vec3 palB(int i){ // Hintergrund: hell oder dunkel
  if(uDark<.5) return pal(i);
  if(i==0) return vec3(.078,.078,.078);
  if(i==1) return vec3(.18,.106,.14);
  if(i==2) return vec3(.337,.149,.227);
  if(i==3) return vec3(.55,.227,.37);
  if(i==4) return vec3(.70,.29,.59);
  return vec3(.784,.33,.659);
}
float bayer(vec2 c){
  vec2 q=floor(mod(c,8.));
  float v=0.,w=16.;
  for(int i=0;i<3;i++){
    float bx=mod(q.x,2.),by=mod(q.y,2.);
    v+=(2.*abs(bx-by)+by)*w;
    q=floor(q/2.); w/=4.;
  }
  return v/64.;
}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
void main(){
  vec2 frag=gl_FragCoord.xy;
  vec2 uv=(frag-.5*uRes)/uRes.y;
  float bd=bayer(frag);
  vec4 c=texture2D(tD,vUv);
  vec3 col;
  if(c.a>.5){
    float sh=clamp(max(c.r,c.g)*1.05-.12,0.,1.);
    int k=int(clamp(floor(sh*6.+bd),0.,6.));
    if(c.g>c.r){ // Logo-Grün
      if(k==0) col=pal(6); else if(k==1) col=vec3(.14,.36,.20); else if(k==2) col=vec3(.20,.50,.27);
      else if(k==3) col=vec3(.32,.65,.38); else if(k==4) col=vec3(.55,.80,.55); else if(k==5) col=vec3(.80,.92,.78); else col=pal(0);
    } else {     // Lila Teile in der Rosa-Palette der Seite
      int kp=int(clamp(floor(sh*4.4+bd),0.,6.)); // dunkler halten, damit das Lila auf Rosa trägt
      if(kp==0) col=pal(6); else if(kp==1) col=pal(5); else if(kp==2) col=pal(5);
      else if(kp==3) col=pal(4); else if(kp==4) col=pal(3); else if(kp==5) col=pal(2); else col=pal(1);
    }
  } else {
    // Hintergrund: weiche Pixelwolke, links hell (Platz für den Text), rechts kräftiger
    vec2 w=uv*2.2+vec2(uT*.03,uS*.8);
    float cl=noise(w)*.55+noise(w*2.1+4.)*.3+noise(w*4.3)*.15;
    float side=smoothstep(-.7,.9,uv.x/(uRes.x/uRes.y)*1.6+uv.y*.2);
    float d=clamp(cl*.9*side+.08*side,0.,1.);
    d*=smoothstep(-.55,-.1,uv.y+.45*cl);
    col=palB(int(clamp(floor(d*5.+bd),0.,5.)));
  }
  gl_FragColor=vec4(col,1.);
}`;

  window.LERNRAUM_HERO3D = function (host, canvas) {
    const T = window.THREE;
    if (!T) return false;
    let renderer;
    try { renderer = new T.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "low-power" }); } catch (e) { return false; }
    renderer.setPixelRatio(1);

    const scene = new T.Scene();
    const cam = new T.PerspectiveCamera(28, 1, 0.1, 60);
    cam.position.set(0, 0, 11);
    scene.add(new T.HemisphereLight(0xffffff, 0x886a99, 0.8));
    const key = new T.DirectionalLight(0xffffff, 0.95); key.position.set(-3, 5, 6); scene.add(key);

    const make = (pts, color, depth) => {
      const sh = new T.Shape();
      pts.forEach(([x, y], i) => { const px = (x - CX) * S, py = -(y - CY) * S; i ? sh.lineTo(px, py) : sh.moveTo(px, py); });
      const g = new T.ExtrudeGeometry(sh, { depth, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.03, bevelSegments: 6, curveSegments: 8 });
      g.translate(0, 0, -depth / 2);
      return new T.Mesh(g, new T.MeshLambertMaterial({ color }));
    };
    const logo = new T.Group();
    logo.add(make(GREEN, 0x1f9f1f, 0.1), make(PURPLE, 0x9f1f9f, 0.12)); // Grün: g > r, Lila: r ≥ g (Shader unterscheidet daran)
    const pivot = new T.Group(); pivot.add(logo); scene.add(pivot);

    // Nachbearbeitung: Raster + Dither
    let target = null;
    const post = new T.Scene(), pcam = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const pmat = new T.ShaderMaterial({
      uniforms: { tD: { value: null }, uRes: { value: new T.Vector2(1, 1) }, uT: { value: 0 }, uS: { value: 0 }, uDark: { value: 0 } },
      vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}",
      fragmentShader: FRAG, depthTest: false, depthWrite: false
    });
    const syncTheme = () => { pmat.uniforms.uDark.value = document.documentElement.dataset.theme === "dark" ? 1 : 0; };
    syncTheme(); addEventListener("lernraum-theme", syncTheme);
    post.add(new T.Mesh(new T.PlaneGeometry(2, 2), pmat));

    const size = () => {
      const r = host.getBoundingClientRect();
      const w = Math.max(60, Math.round(r.width / CELL)), h = Math.max(40, Math.round(r.height / CELL));
      renderer.setSize(w, h, false);
      if (target) target.dispose();
      target = new T.WebGLRenderTarget(w, h, { minFilter: T.NearestFilter, magFilter: T.NearestFilter, format: T.RGBAFormat });
      pmat.uniforms.tD.value = target.texture; pmat.uniforms.uRes.value.set(w, h);
      cam.aspect = w / h; cam.updateProjectionMatrix();
      const visH = 2 * Math.tan(cam.fov * Math.PI / 360) * cam.position.z, visW = visH * cam.aspect;
      const k = Math.min(visW * 0.42 / 3.2, visH * 0.56 / 1.4);
      pivot.scale.setScalar(k);
      pivot.position.set(visW * 0.245, visH * 0.03, 0);
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
      pmat.uniforms.uT.value = t; pmat.uniforms.uS.value = sc2;
      renderer.setRenderTarget(target);
      renderer.setClearColor(0x000000, 0); renderer.clear();
      renderer.render(scene, cam);
      renderer.setRenderTarget(null);
      renderer.render(post, pcam);
      host.style.setProperty("--py", Math.min(scrollY, 900) * 0.25 + "px");
      host.style.setProperty("--mx", (mx * -14).toFixed(2) + "px");
      host.style.setProperty("--my", (my * -10).toFixed(2) + "px");
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return true;
  };
})();
