/* ============================================================
   LERNRAUM — Desktop-Hero: gerasterte 3D-Szene (WebGL, ohne Bibliothek)
   Raymarching-Shader: weich verschmelzende Kugeln + Ring, Bayer-Dither
   in der Farbpalette der Marke. Gerendert wird in grober Auflösung
   (Pixelraster) – dadurch kaum Rechenlast. Reagiert auf Maus und Scrollen.
   Wird nur auf großen Bildschirmen mit Maus und ohne „weniger Bewegung“
   geladen; sonst bleibt die statische Pixelwolke.
   ============================================================ */
(function () {
  "use strict";
  window.LERNRAUM_HERO3D = function (host, canvas) {
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return false;

    const vs = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
    const fs = `
precision highp float;
uniform vec2 uRes; uniform float uT; uniform vec2 uM; uniform float uS;

vec3 pal(int i){
  if(i==0) return vec3(.996,.996,.996);
  if(i==1) return vec3(.984,.859,.898);
  if(i==2) return vec3(.973,.690,.788);
  if(i==3) return vec3(.953,.525,.631);
  if(i==4) return vec3(.867,.427,.710);
  if(i==5) return vec3(.831,.357,.714);
  return vec3(.067,.067,.067);
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
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
// Logo-Einheiten (Pixel des Schullogos) → Welt
vec2 L(float x,float y){return vec2((x-66.)/32.,(30.-y)/32.);}
float seg(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);return length(pa-ba*h);}
// Balken mit Tiefe und abgerundeten Kanten
float bar(vec3 p,vec2 a,vec2 b,float w,float dz){
  vec2 q=vec2(seg(p.xy,a,b)-w,abs(p.z)-dz);
  return length(max(q,0.))+min(max(q.x,q.y),0.)-.03;
}
vec3 dp;
vec2 map(vec3 p){
  p.y-=sin(uT*.8)*.05;
  p.xz*=rot(sin(uT*.45)*.35+uM.x*.9+uS*1.6);
  p.yz*=rot(uM.y*.5);
  // grün: Dach-Linienzug
  float g=bar(p,L(17.,21.),L(50.,21.),.1,.16);
  g=min(g,bar(p,L(50.,21.),L(75.,5.),.1,.16));
  g=min(g,bar(p,L(75.,5.),L(98.,13.),.1,.16));
  g=min(g,bar(p,L(98.,13.),L(113.,24.),.1,.16));
  // lila: Bogen mit Pfosten
  float v=bar(p,L(24.,42.),L(24.,33.),.085,.2);
  v=min(v,bar(p,L(24.,33.),L(72.,19.),.14,.2));
  v=min(v,bar(p,L(72.,19.),L(108.,36.),.14,.2));
  v=min(v,bar(p,L(108.,36.),L(108.,62.),.085,.2));
  v=min(v,bar(p,L(73.,30.),L(73.,46.),.085,.2));
  return g<v?vec2(g,1.):vec2(v,0.);
}
vec3 nor(vec3 p){vec2 e=vec2(.004,0.);return normalize(vec3(map(p+e.xyy).x-map(p-e.xyy).x,map(p+e.yxy).x-map(p-e.yxy).x,map(p+e.yyx).x-map(p-e.yyx).x));}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}

void main(){
  vec2 frag=gl_FragCoord.xy;
  vec2 uv=(frag-.5*uRes)/uRes.y;
  float bd=bayer(frag);

  // Hintergrund: weiche Wolken, links hell (Platz für den Text), rechts kräftiger
  vec2 w=uv*2.2+vec2(uT*.03,uS*.8);
  float cl=noise(w)*.55+noise(w*2.1+4.)*.3+noise(w*4.3)*.15;
  float side=smoothstep(-.7,.9,uv.x/(uRes.x/uRes.y)*1.6+uv.y*.2);
  float dbg=clamp(cl*.9*side+.08*side,0.,1.);
  // zum unteren Rand hin ausblenden
  dbg*=smoothstep(-.55,-.1,uv.y+.45*cl);
  int lvl=int(clamp(floor(dbg*5.+bd),0.,5.));
  vec3 col=pal(lvl);

  // Szene: rechts neben dem Text
  vec3 ro=vec3(0.,0.,8.4);
  vec2 off=vec2(.29*(uRes.x/uRes.y),-.03);
  vec3 rd=normalize(vec3(uv-off,-1.7));
  float t=0.,hit=0.;
  for(int i=0;i<64;i++){
    float d=map(ro+rd*t).x;
    if(d<.003){hit=1.;break;}
    t+=d; if(t>14.) break;
  }
  if(hit>.5){
    vec3 p=ro+rd*t, n=nor(p);
    float id=map(p).y;
    vec3 L0=normalize(vec3(-.5,.8,.6));
    float dif=clamp(dot(n,L0),0.,1.);
    float fre=pow(1.-clamp(dot(n,-rd),0.,1.),2.2);
    float sh=clamp(dif*.8+.18-fre*.3,0.,1.);
    int k=int(clamp(floor(sh*6.+bd),0.,6.));
    if(id<.5){
      // lila Teile: rosa Palette der Seite, dunkel = Tinte
      if(k==0) col=pal(6); else if(k==1) col=pal(5); else if(k==2) col=pal(4);
      else if(k==3) col=pal(3); else if(k==4) col=pal(2); else if(k==5) col=pal(1); else col=pal(0);
    } else {
      // grüne Teile (Logo-Grün)
      if(k==0) col=pal(6); else if(k==1) col=vec3(.14,.36,.20); else if(k==2) col=vec3(.20,.50,.27);
      else if(k==3) col=vec3(.32,.65,.38); else if(k==4) col=vec3(.55,.80,.55); else if(k==5) col=vec3(.80,.92,.78); else col=pal(0);
    }
  }
  gl_FragColor=vec4(col,1.);
}`;
    const mk = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
    const v = mk(gl.VERTEX_SHADER, vs), f = mk(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return false;
    const pr = gl.createProgram();
    gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return false;
    gl.useProgram(pr);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "p");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n) => gl.getUniformLocation(pr, n);
    const uRes = U("uRes"), uT = U("uT"), uM = U("uM"), uS = U("uS");

    const CELL = 3; // Bildschirm-Pixel je Rasterpunkt
    const size = () => {
      const r = host.getBoundingClientRect();
      canvas.width = Math.max(40, Math.round(r.width / CELL));
      canvas.height = Math.max(40, Math.round(r.height / CELL));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    size();
    let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(size, 150); });

    // Maus und Scrollen (weich nachgeführt)
    let mx = 0, my = 0, tx = 0, ty = 0, sc = 0, visible = true, raf = 0;
    addEventListener("pointermove", (e) => { tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5; }, { passive: true });
    new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); }).observe(host);
    document.addEventListener("visibilitychange", () => { if (!document.hidden && visible && !raf) raf = requestAnimationFrame(frame); });

    const t0 = performance.now();
    function frame(now) {
      raf = 0;
      if (document.hidden || !visible) return;
      mx += (tx - mx) * .06; my += (ty - my) * .06;
      sc += (scrollY / 800 - sc) * .1;
      gl.uniform1f(uT, (now - t0) / 1000);
      gl.uniform2f(uM, mx, my);
      gl.uniform1f(uS, sc);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      // Parallax: Szene wandert langsamer als die Seite, Fenster leicht gegenläufig
      host.style.setProperty("--py", Math.min(scrollY, 900) * .25 + "px");
      host.style.setProperty("--mx", (mx * -14).toFixed(2) + "px");
      host.style.setProperty("--my", (my * -10).toFixed(2) + "px");
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return true;
  };
})();
