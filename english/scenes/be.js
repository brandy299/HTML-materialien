/* Szene „be“ (Einheit 1): Wortblöcke, der be-Block springt und wechselt seine Form.
   createStage(container) → { place(pronoun), reset(), onPick(fn), dispose() }
   Es gibt zwei Bühnen mit gleicher Schnittstelle: three.js (3D) und ein DOM-Ersatz
   (kein WebGL oder „Bewegung reduzieren“). Beschriftungen stehen als echter Text
   außerhalb des Canvas, die Bühne selbst ist dekorativ (aria-hidden) und per Tastatur
   über die Ersatz-Tasten unter der Bühne bedienbar. */

export const FORM = { I: "am", you: "are", we: "are", they: "are", he: "is", she: "is", it: "is" };
export const COLOR = { am: "#FF8A3D", is: "#7BE08A", are: "#4DB8FF" };
export const TRAY = [["I", "you", "we", "they"], ["he", "she", "it"]];
const PRON_COLOR = (p) => COLOR[FORM[p]];

/* ---------- DOM-Ersatz ---------- */
export function createDomStage(container) {
  container.style.minHeight = "0"; container.style.height = "auto";
  container.innerHTML = `
    <div class="dstage" aria-hidden="false">
      <div class="drow">
        <span class="dblock dslot" data-slot="p">?</span>
        <span class="dblock dbe" data-slot="be">be</span>
        <span class="dblock dready">ready</span>
      </div>
      <div class="dtray" role="group" aria-label="Pronomen">
        ${TRAY.map((row) => `<div>${row.map((p) => `<button type="button" class="dblock dpick" data-p="${p}" lang="en">${p}</button>`).join("")}</div>`).join("")}
      </div>
    </div>`;
  const slot = container.querySelector('[data-slot="p"]');
  const be = container.querySelector('[data-slot="be"]');
  let pick = () => {};
  container.addEventListener("click", (e) => {
    const b = e.target.closest(".dpick");
    if (b) pick(b.dataset.p);
  });
  return {
    kind: "dom",
    onPick: (fn) => { pick = fn; },
    async place(p) {
      slot.textContent = p;
      slot.style.background = PRON_COLOR(p);
      slot.classList.add("on");
      be.textContent = FORM[p];
      be.style.background = COLOR[FORM[p]];
      be.classList.add("on");
      return new Promise((r) => setTimeout(r, 250));
    },
    reset() {
      slot.textContent = "?"; slot.style.background = ""; slot.classList.remove("on");
      be.textContent = "be"; be.style.background = ""; be.classList.remove("on");
    },
    dispose() { container.innerHTML = ""; }
  };
}

/* ---------- three.js-Bühne ---------- */
export async function createThreeStage(container) {
  const THREE = await import("../vendor/three.module.min.js");
  if (document.fonts && document.fonts.load) {
    try { await document.fonts.load('700 64px "Be Vietnam Pro"'); } catch (e) { /* Schrift ist nur schöner, nicht nötig */ }
  }
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.domElement.setAttribute("aria-hidden", "true");
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 7.2, 7.4);
  camera.lookAt(0, 0, 0.55);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x556070, 1.6));
  const sun = new THREE.DirectionalLight(0xffffff, 1.2);
  sun.position.set(-3, 8, 5);
  scene.add(sun);


  const W = 1.5, H = 0.55, D = 0.95;
  function face(text, bg, fg, w, h) {
    const c = document.createElement("canvas");
    c.width = w * 200; c.height = h * 200;
    const g = c.getContext("2d");
    g.fillStyle = bg; g.fillRect(0, 0, c.width, c.height);
    g.strokeStyle = "rgba(255,255,255,.35)"; g.lineWidth = 6; g.strokeRect(8, 8, c.width - 16, c.height - 16);
    g.fillStyle = fg; g.textAlign = "center"; g.textBaseline = "middle";
    let size = Math.min(c.height * 0.5, 84);
    g.font = `700 ${size}px "Be Vietnam Pro", system-ui, sans-serif`;
    while (g.measureText(text).width > c.width * 0.82 && size > 20) { size -= 4; g.font = `700 ${size}px "Be Vietnam Pro", system-ui, sans-serif`; }
    g.fillText(text, c.width / 2, c.height / 2 + 4);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }
  const mats = (text, bg, fg) => {
    const side = new THREE.MeshStandardMaterial({ color: new THREE.Color(bg).multiplyScalar(0.7), roughness: 0.8 });
    const top = new THREE.MeshStandardMaterial({ map: face(text, bg, fg, W, D), roughness: 0.7 });
    const front = new THREE.MeshStandardMaterial({ map: face(text, bg, fg, W, H), roughness: 0.7 });
    return [side, side, top, side, front, side];
  };
  const geo = new THREE.BoxGeometry(W, H, D);
  const disposables = [geo];
  function block(text, bg, fg) {
    const m = new THREE.Mesh(geo, mats(text, bg, fg));
    m.userData = { text, bg, fg };
    scene.add(m);
    return m;
  }
  function retext(m, text, bg, fg) {
    m.material.forEach((mt) => { if (mt.map) mt.map.dispose(); mt.dispose(); });
    m.material = mats(text, bg, fg);
    m.userData = { text, bg, fg };
  }

  const SLOT = { p: new THREE.Vector3(-2.15, 0, -1.6), be: new THREE.Vector3(0, 0, -1.6), ready: new THREE.Vector3(2.15, 0, -1.6) };
  const trayPos = {};
  TRAY.forEach((row, r) => row.forEach((p, i) => {
    const gap = 1.62, x0 = -((row.length - 1) * gap) / 2;
    trayPos[p] = new THREE.Vector3(x0 + i * gap, 0, 1.25 + r * 1.35);
  }));

  const beBlock = block("be", "#4A5568", "#F2F4F8"); beBlock.position.copy(SLOT.be);
  const ready = block("ready", "#3A4453", "#F2F4F8"); ready.position.copy(SLOT.ready);
  const pron = {};
  Object.keys(trayPos).forEach((p) => { pron[p] = block(p, "#2A3240", "#F2F4F8"); pron[p].position.copy(trayPos[p]); });

  /* kleine Tween-Verwaltung: gerendert wird nur, solange sich etwas bewegt */
  const tweens = [];
  let raf = 0, disposed = false;
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  function tween(dur, fn) {
    return new Promise((resolve) => { tweens.push({ t0: performance.now(), dur, fn, resolve }); kick(); });
  }
  function kick() { if (!raf && !disposed) raf = requestAnimationFrame(frame); }
  function frame(now) {
    raf = 0;
    for (let i = tweens.length - 1; i >= 0; i--) {
      const tw = tweens[i];
      const t = Math.min(1, (now - tw.t0) / tw.dur);
      tw.fn(ease(t));
      if (t >= 1) { tweens.splice(i, 1); tw.resolve(); }
    }
    renderer.render(scene, camera);
    if (tweens.length) kick();
  }
  function move(m, to, dur = 650, arc = 0.9) {
    const from = m.position.clone();
    return tween(dur, (k) => {
      m.position.lerpVectors(from, to, k);
      m.position.y = Math.sin(Math.PI * k) * arc;
    });
  }
  function hop(m, dur = 700) {
    const y0 = m.position.y; let swapped = false;
    return tween(dur, (k) => {
      m.position.y = y0 + Math.sin(Math.PI * k) * 1.1;
      m.rotation.y = k * Math.PI * 2;
      if (k >= 0.5 && !swapped) { swapped = true; m.userData.swap && m.userData.swap(); }
      if (k >= 1) m.rotation.y = 0;
    });
  }

  let current = null;
  let busy = Promise.resolve();
  let pick = () => {};

  async function doPlace(p) {
    const prev = current;
    current = p;
    if (prev && prev !== p) {
      await move(pron[prev], trayPos[prev], 450, 0.6);
      retext(pron[prev], prev, "#2A3240", "#F2F4F8");
    }
    retext(pron[p], p, PRON_COLOR(p), "#12161D");
    const going = move(pron[p], SLOT.p, 650);
    const form = FORM[p];
    beBlock.userData.swap = () => retext(beBlock, form, COLOR[form], "#12161D");
    if (beBlock.userData.text !== form) await Promise.all([going, hop(beBlock)]);
    else await going;
    beBlock.rotation.y = 0;
  }
  async function doReset() {
    if (current) { const p = current; current = null; await move(pron[p], trayPos[p], 450, 0.6); retext(pron[p], p, "#2A3240", "#F2F4F8"); }
    retext(beBlock, "be", "#4A5568", "#F2F4F8"); beBlock.userData.swap = null;
    renderer.render(scene, camera);
  }

  /* Tippen auf einen Block im Vorrat */
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  renderer.domElement.addEventListener("pointerup", (e) => {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(Object.values(pron))[0];
    if (hit) { const p = Object.keys(pron).find((k) => pron[k] === hit.object); if (p && p !== current) pick(p); }
  });

  function resize() {
    const w = container.clientWidth || 320;
    const h = Math.round(Math.min(Math.max(w * 0.9, 280), 520));
    container.style.height = h + "px";
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = "100%"; renderer.domElement.style.height = "100%";
    camera.aspect = w / h;
    camera.position.set(0, 7.2, 7.4 + Math.max(0, (1.0 - camera.aspect)) * 4.5);
    camera.lookAt(0, 0, 0.55);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }
  const ro = new ResizeObserver(resize); ro.observe(container);
  resize();

  return {
    kind: "three",
    onPick: (fn) => { pick = fn; },
    place: (p) => (busy = busy.then(() => doPlace(p))),
    reset: () => (busy = busy.then(doReset)),
    dispose() {
      disposed = true; cancelAnimationFrame(raf); ro.disconnect();
      scene.traverse((o) => { if (o.material) [].concat(o.material).forEach((m) => { m.map && m.map.dispose(); m.dispose(); }); });
      disposables.forEach((d) => d.dispose && d.dispose());
      renderer.dispose(); container.innerHTML = "";
    }
  };
}
