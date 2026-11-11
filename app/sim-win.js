/* Windows-Simulation (Schritt-Typ "win") – Desktop, Startmenü, Datei-Explorer, Papierkorb; handytauglich, automatisch geprüft.
   Wird von app.js geladen: window.LernraumSim.win(step, ctx, env) → Aufräum-Funktion.
   Datenformat und Prüf-Operationen: app/README.md → „Windows-Simulation“. */
(function () {
  "use strict";
  window.LernraumSim = window.LernraumSim || {};

  const ROOTS = ["Desktop", "Dokumente", "Downloads", "Bilder"];
  const TYPES = {
    pdf: ["PDF-Dokument", "#c0392b", "PDF"], docx: ["Word-Dokument", "#2b579a", "W"], xlsx: ["Excel-Tabelle", "#107c41", "X"], pptx: ["PowerPoint-Präsentation", "#c43e1c", "P"],
    txt: ["Textdokument", "#666", "T"], jpg: ["JPG-Bild", "#8e44ad", "▲"], png: ["PNG-Bild", "#8e44ad", "▲"], zip: ["ZIP-Archiv", "#b8860b", "Z"]
  };
  const SORTS = { name: "Name", datum: "Änderungsdatum", typ: "Typ", groesse: "Größe" };
  const BAD = /[\\/:*?"<>|]/;
  const norm = (s) => String(s).trim().toLowerCase();

  window.LernraumSim.win = function (step, ctx, env) {
    const { h, esc, toast, buzz } = env;
    const crit = step.criteria;
    const guided = step.mode !== "free";

    /* ── Dateisystem ───────────────────────────────── */
    let uid = 0;
    const hash = (s) => [...s].reduce((n, c) => (n * 31 + c.charCodeAt(0)) % 9973, 7);
    const splitExt = (name) => { const i = name.lastIndexOf("."); return i > 0 ? [name.slice(0, i), name.slice(i + 1).toLowerCase()] : [name, ""]; };
    function mk(spec) {
      if (typeof spec === "string") spec = { n: spec };
      const folder = Array.isArray(spec.k);
      const node = { id: ++uid, name: spec.n, kind: folder ? "folder" : "file", size: spec.s || 8 + (hash(spec.n) % 900), mod: spec.d || "2026-10-0" + (1 + (hash(spec.n) % 9)), kids: [] };
      if (folder) node.kids = spec.k.map(mk);
      return node;
    }
    const root = { id: 0, name: "Dieser PC", kind: "folder", kids: [], size: 0, mod: "" };
    ROOTS.forEach((r) => root.kids.push(mk({ n: r, k: (step.fs && step.fs[r]) || [] })));
    const trash = { id: -1, name: "Papierkorb", kind: "folder", kids: [], size: 0, mod: "" };
    const all = (n, out = []) => { out.push(n); n.kids.forEach((k) => all(k, out)); return out; };
    const find = (id) => all(root).concat(all(trash)).find((n) => n.id === id);
    const parentOf = (n) => [root, trash].map((r) => all(r).find((p) => p.kids.includes(n))).find(Boolean);
    const byPath = (p) => {
      let cur = root;
      for (const seg of String(p).split("/").filter(Boolean)) { cur = cur.kids.find((k) => norm(k.name) === norm(seg)); if (!cur) return null; }
      return cur;
    };
    const pathOf = (n) => { const out = []; for (let c = n; c && c !== root && c !== trash; c = parentOf(c)) out.unshift(c.name); return out; };

    /* ── Zustand ───────────────────────────────────── */
    let here = root, selIds = new Set(), view = "symbole", sort = { by: "name", dir: "asc" }, showExt = false, query = "", multi = false;
    let clip = null, win = step.start === "desktop" ? "closed" : "open", pop = null, startOpen = false, lastTap = { id: null, t: 0 };
    let cur = 0, taskOpen = false, checkOpen = window.innerWidth >= 600, give = null, popErr = "";
    const trashFrom = new Map();
    const timers = new Set();
    const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); return t; };
    const inTrashView = () => here === trash;
    const typeOf = (n) => (n.kind === "folder" ? "Dateiordner" : (TYPES[splitExt(n.name)[1]] || [(splitExt(n.name)[1] || "Datei").toUpperCase() + "-Datei"])[0]);
    const shownName = (n) => (n.kind === "file" && !showExt ? splitExt(n.name)[0] : n.name);
    const fmtSize = (n) => (n.kind === "folder" ? "" : n.size >= 1024 ? (n.size / 1024).toFixed(1).replace(".", ",") + " MB" : n.size + " KB");

    /* ── Prüfung ───────────────────────────────────── */
    function evalCheck(ck) {
      switch (ck.op) {
        case "exists": { const n = byPath(ck.path); return !!n && (!ck.type || (ck.type === "folder") === (n.kind === "folder")); }
        case "notExists": return !byPath(ck.path);
        case "inTrash": return trash.kids.some((k) => norm(k.name) === norm(ck.name));
        case "count": { const n = byPath(ck.path); return !!n && n.kids.length === ck.value; }
        case "at": return pathOf(here).join("/").toLowerCase() === norm(ck.path) && here !== trash;
        case "atTrash": return here === trash;
        case "view": return view === ck.value;
        case "sort": return sort.by === ck.by && (!ck.dir || sort.dir === ck.dir);
        case "ext": return showExt === (ck.value !== false);
        case "search": return norm(query) === norm(ck.query);
        case "clip": return !!clip && clip.mode === ck.mode && clip.ids.some((id) => { const n = find(id); return n && norm(n.name) === norm(ck.name); });
        case "explorer": return (win === "open") === (ck.value === "open");
        default: return false;
      }
    }
    const critOK = (c) => c.checks.every(evalCheck);
    const passedCount = () => crit.filter(critOK).length;

    /* ── Gerüst ────────────────────────────────────── */
    const node = h(`<div class="sim win">
      <div id="wnTask"></div>
      <div id="wnOut"></div>
      <div class="wn-desk" id="wnDesk">
        <div class="wn-icons" id="wnIcons"></div>
        <div class="wn-win" id="wnWin" hidden></div>
        <div class="wn-start" id="wnStart" hidden></div>
        <div class="wn-pop" id="wnPop" hidden></div>
      </div>
      <div class="wn-task" id="wnBar"></div>
    </div>`);
    const q = (s) => node.querySelector(s);
    const out = q("#wnOut"), winEl = q("#wnWin"), iconsEl = q("#wnIcons"), startEl = q("#wnStart"), popEl = q("#wnPop"), barEl = q("#wnBar");
    out.setAttribute("aria-live", "polite");
    let msgTimer = null;
    out.onclick = () => { clearTimeout(msgTimer); out.innerHTML = ""; };
    function simMsg(kind, html) {
      out.innerHTML = `<div class="sim-msg ${kind}"><span class="ico">${kind === "ok" ? "✓" : kind === "no" ? "✗" : "i"}</span><span>${html}</span></div>`;
      clearTimeout(msgTimer);
      if (kind !== "no") msgTimer = setTimeout(() => { out.innerHTML = ""; }, kind === "ok" ? 3500 : 7000);
    }

    const icon = (n) => {
      if (n.kind === "folder") return `<span class="wn-ico folder"><i></i></span>`;
      const t = TYPES[splitExt(n.name)[1]] || ["", "#777", "·"];
      return `<span class="wn-ico file" style="--c:${t[1]}"><b>${t[2]}</b></span>`;
    };
    function sortedKids(list) {
      const dir = sort.dir === "desc" ? -1 : 1;
      const key = (n) => (sort.by === "datum" ? n.mod : sort.by === "typ" ? typeOf(n).toLowerCase() : sort.by === "groesse" ? n.size : n.name.toLowerCase());
      return list.slice().sort((a, b) => {
        if (a.kind !== b.kind && sort.by !== "groesse") return a.kind === "folder" ? -1 : 1;
        const x = key(a), y = key(b);
        return (x < y ? -1 : x > y ? 1 : a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1) * dir;
      });
    }
    const listing = () => {
      if (query.trim()) { const qq = norm(query); return all(here).filter((n) => n !== here && norm(n.name).includes(qq)); }
      return here.kids;
    };

    /* ── Explorer ──────────────────────────────────── */
    function paintWin() {
      if (win !== "open") { winEl.hidden = true; return; }
      winEl.hidden = false;
      const items = sortedKids(listing()), trashMode = inTrashView();
      const crumbs = [`<button type="button" class="wn-crumb" data-go="">Dieser PC</button>`].concat(pathOf(here).map((seg, i, arr) => `<button type="button" class="wn-crumb" data-go="${esc(arr.slice(0, i + 1).join("/"))}">${esc(seg)}</button>`));
      if (trashMode) crumbs.splice(0, crumbs.length, `<button type="button" class="wn-crumb" data-go="">Dieser PC</button>`, `<button type="button" class="wn-crumb" data-go="@trash">Papierkorb</button>`);
      const tb = (a, label, o = {}) => `<button type="button" class="wn-b${o.on ? " on" : ""}" data-act="${a}"${o.off ? " disabled" : ""}>${label}</button>`;
      const hasSel = selIds.size > 0;
      const tools = trashMode
        ? tb("restore", "Wiederherstellen", { off: !hasSel }) + tb("delforever", "Endgültig löschen", { off: !hasSel }) + tb("multi", "Mehrere", { on: multi })
        : tb("new", "Neu ▾") + tb("cut", "Ausschneiden", { off: !hasSel }) + tb("copy", "Kopieren", { off: !hasSel }) + tb("paste", "Einfügen", { off: !clip }) + tb("rename", "Umbenennen", { off: selIds.size !== 1 }) + tb("del", "Löschen", { off: !hasSel })
          + tb("view", view === "symbole" ? "Ansicht: Symbole ▾" : "Ansicht: Details ▾") + tb("sort", `Sortieren: ${SORTS[sort.by]} ${sort.dir === "asc" ? "↑" : "↓"} ▾`) + tb("ext", `Dateiendungen ${showExt ? "☑" : "☐"}`) + tb("multi", "Mehrere", { on: multi });
      const quick = ROOTS.map((r) => `<button type="button" class="wn-q${!trashMode && pathOf(here)[0] === r ? " on" : ""}" data-go="${r}">${r}</button>`).join("") + `<button type="button" class="wn-q${trashMode ? " on" : ""}" data-go="@trash">Papierkorb</button>`;
      const body = !items.length ? `<p class="wn-empty">${query.trim() ? "Keine Treffer." : trashMode ? "Der Papierkorb ist leer." : "Dieser Ordner ist leer."}</p>`
        : `<div class="wn-list ${view}">${items.map((n) => `<button type="button" class="wn-item${selIds.has(n.id) ? " sel" : ""}" data-id="${n.id}" aria-pressed="${selIds.has(n.id)}">${icon(n)}<span class="wn-name">${esc(shownName(n))}</span>${view === "details" ? `<span class="wn-meta">${esc(typeOf(n))}${fmtSize(n) ? " · " + fmtSize(n) : ""} · ${esc(n.mod)}${query.trim() ? " · " + esc(pathOf(parentOf(n) || root).join("/")) : ""}</span>` : ""}</button>`).join("")}</div>`;
      winEl.innerHTML = `<div class="wn-title"><span class="wn-wico">${trashMode ? "🗑" : "📁"}</span><b>${esc(trashMode ? "Papierkorb" : here === root ? "Dieser PC" : here.name)} – Datei-Explorer</b><button type="button" class="wn-wb" data-act="min" aria-label="Minimieren">–</button><button type="button" class="wn-wb x" data-act="close" aria-label="Schließen">✕</button></div>
        <div class="wn-tools">${tools}</div>
        <div class="wn-nav"><button type="button" class="wn-nb" data-act="back" aria-label="Zurück"${navHist.length ? "" : " disabled"}>◀</button><button type="button" class="wn-nb" data-act="up" aria-label="Eine Ebene nach oben">▲</button>
          <div class="wn-addr">${crumbs.join('<i>›</i>')}</div>
          <input class="wn-search" id="wnSearch" type="search" placeholder="Suchen" value="${esc(query)}" autocomplete="off" aria-label="Suchen"${trashMode ? " disabled" : ""}></div>
        <div class="wn-quick">${quick}</div>
        <div class="wn-body" id="wnBody">${body}</div>
        <div class="wn-status">${items.length} Element${items.length === 1 ? "" : "e"}${hasSel ? ` · ${selIds.size} ausgewählt` : ""}${clip ? ` · ${clip.mode === "cut" ? "Ausgeschnitten" : "Kopiert"}: ${clip.ids.length}` : ""}</div>`;
      const se = winEl.querySelector("#wnSearch");
      if (se) se.oninput = () => { query = se.value; selIds.clear(); paintBody(); paintChecklist(); };
    }
    function paintBody() { const f = document.activeElement === winEl.querySelector("#wnSearch"); const pos = f ? winEl.querySelector("#wnSearch").selectionStart : 0; paintWin(); if (f) { const s = winEl.querySelector("#wnSearch"); s.focus(); try { s.setSelectionRange(pos, pos); } catch { /* egal */ } } }

    /* ── Desktop und Taskleiste ────────────────────── */
    function paintDesktop() {
      const desk = root.kids[0], items = [{ id: "pc", name: "Dieser PC", kind: "folder", special: true }, { id: "trash", name: "Papierkorb", kind: "folder", special: true }].concat(desk.kids);
      iconsEl.innerHTML = items.map((n) => `<button type="button" class="wn-dicon${selIds.has(n.id) && here === desk && win === "closed" ? " sel" : ""}" data-did="${n.id}">${n.id === "trash" ? `<span class="wn-ico trash"><i></i></span>` : n.id === "pc" ? `<span class="wn-ico pc"><i></i></span>` : icon(n)}<span>${esc(n.special ? n.name : shownName(n))}</span></button>`).join("");
      iconsEl.querySelectorAll("[data-did]").forEach((b) => b.onclick = () => {
        startOpen = false; pop = null;
        const id = b.dataset.did, now = Date.now(), dbl = lastTap.id === id && now - lastTap.t < 600;
        lastTap = { id, t: now };
        if (!dbl) { toast("› Doppelt tippen öffnet."); return; }
        if (id === "pc") openExplorer(root);
        else if (id === "trash") openExplorer(trash);
        else { const n = find(+id); if (n && n.kind === "folder") openExplorer(n); else toast(`› „${n.name}“ wird geöffnet (in dieser Übung nur zum Ansehen).`); }
      });
    }
    function paintBar() {
      barEl.innerHTML = `<button type="button" class="wn-startbtn${startOpen ? " on" : ""}" data-act="start" aria-label="Start"><i></i><i></i><i></i><i></i></button>
        <button type="button" class="wn-tapp${win === "open" ? " on" : win === "min" ? " min" : ""}" data-act="taskapp" aria-label="Datei-Explorer"><span>📁</span></button><span class="wn-clock">${esc(step.clock || "10:42")}<br><small>${esc(step.date || "21.10.2026")}</small></span>`;
      startEl.hidden = !startOpen;
      if (startOpen) startEl.innerHTML = `<div class="wn-sm-h">Angeheftet</div><div class="wn-sm-g">
        <button type="button" class="wn-sm" data-act="open-explorer"><span>📁</span>Datei-Explorer</button>
        <button type="button" class="wn-sm off" disabled><span>📝</span>Editor</button>
        <button type="button" class="wn-sm off" disabled><span>⚙</span>Einstellungen</button>
        <button type="button" class="wn-sm off" disabled><span>🌐</span>Internet</button></div>
        <div class="wn-sm-f">Fly Bike Werke · Schüler/in</div>`;
    }
    function openExplorer(where) { win = "open"; here = where; selIds.clear(); query = ""; startOpen = false; pop = null; buzz(8); refresh(); }

    /* ── Aktionen ──────────────────────────────────── */
    const navHist = [];
    function go(target) {
      if (target === "@trash") target = trash; else if (target === "" || target === null) target = root; else target = byPath(target);
      if (!target || target === here) return;
      lastTap = { id: null, t: 0 }; navHist.push(here); here = target; selIds.clear(); query = ""; multi = false; pop = null; buzz(6); refresh();
    }
    const selNodes = () => [...selIds].map(find).filter(Boolean);
    const uniqueName = (dir, name, ignore) => {
      let n = name, i = 1; const [base, ext] = splitExt(name);
      while (dir.kids.some((k) => k !== ignore && norm(k.name) === norm(n))) { n = base + (i === 1 ? " - Kopie" : ` - Kopie (${i})`) + (ext ? "." + ext : ""); i++; }
      return n;
    };
    function removeNode(n) { const p = parentOf(n); if (p) p.kids.splice(p.kids.indexOf(n), 1); }
    function deleteSel() {
      const list = selNodes(); if (!list.length) return;
      list.forEach((n) => { trashFrom.set(n.id, parentOf(n)); removeNode(n); trash.kids.push(n); });
      selIds.clear(); buzz(10); toast(`› ${list.length === 1 ? `„${list[0].name}“ liegt` : `${list.length} Elemente liegen`} jetzt im Papierkorb.`); refresh();
    }
    function restoreSel() {
      selNodes().forEach((n) => { const to = trashFrom.get(n.id) || root.kids[1]; removeNode(n); n.name = uniqueName(to, n.name); to.kids.push(n); });
      selIds.clear(); buzz(10); refresh();
    }
    function foreverSel() { selNodes().forEach(removeNode); selIds.clear(); buzz(8); refresh(); }
    function doPaste() {
      if (!clip) return;
      const items = clip.ids.map(find).filter(Boolean);
      for (const n of items) { if (n.kind === "folder" && (n === here || all(n).includes(here))) { toast("› Ein Ordner lässt sich nicht in sich selbst einfügen."); return; } }
      const created = [];
      items.forEach((n) => {
        if (clip.mode === "cut") { removeNode(n); n.name = uniqueName(here, n.name); here.kids.push(n); created.push(n.id); }
        else { const c = JSON.parse(JSON.stringify(n)); const renum = (x) => { x.id = ++uid; x.kids.forEach(renum); }; renum(c); c.name = uniqueName(here, c.name); here.kids.push(c); created.push(c.id); }
      });
      if (clip.mode === "cut") clip = null;
      selIds = new Set(created); buzz(10); refresh();
    }
    function validName(name, ignore) {
      const t = name.trim();
      if (!t) return "Der Name darf nicht leer sein.";
      if (BAD.test(t)) return 'Diese Zeichen sind nicht erlaubt: \\ / : * ? " < > |';
      if (here.kids.some((k) => k !== ignore && norm(k.name) === norm(t))) return "Es gibt hier schon etwas mit diesem Namen.";
      return "";
    }
    function openPop(kind) {
      pop = kind; popErr = ""; paintPop();
      const inp = popEl.querySelector("input"); if (inp) { inp.focus(); inp.select(); }
    }
    function paintPop() {
      if (!pop) { popEl.hidden = true; popEl.innerHTML = ""; return; }
      popEl.hidden = false;
      const chip = (a, t, on) => `<button type="button" class="wn-chip${on ? " on" : ""}" data-pop="${a}">${t}</button>`;
      let html = "";
      if (pop === "new") html = `<div class="wn-pt">Neu</div><div class="wn-chips">${chip("newfolder", "Ordner")}${chip("newtxt", "Textdokument")}</div>`;
      else if (pop === "view") html = `<div class="wn-pt">Ansicht</div><div class="wn-chips">${chip("v:symbole", "Symbole", view === "symbole")}${chip("v:details", "Details", view === "details")}</div>`;
      else if (pop === "sort") html = `<div class="wn-pt">Sortieren nach</div><div class="wn-chips">${Object.entries(SORTS).map(([id, t]) => chip("s:" + id, t, sort.by === id)).join("")}</div><div class="wn-chips">${chip("d:asc", "Aufsteigend ↑", sort.dir === "asc")}${chip("d:desc", "Absteigend ↓", sort.dir === "desc")}</div>`;
      else if (pop === "newfolder" || pop === "newtxt" || pop === "rename") {
        const n = pop === "rename" ? selNodes()[0] : null;
        const val = pop === "newfolder" ? "Neuer Ordner" : pop === "newtxt" ? "Neues Textdokument" : n ? (showExt ? n.name : shownName(n)) : "";
        html = `<div class="wn-pt">${pop === "rename" ? "Umbenennen" : pop === "newfolder" ? "Neuer Ordner" : "Neues Textdokument"}</div>
          <input class="wn-input" id="wnName" type="text" value="${esc(val)}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Name">
          ${pop === "newtxt" ? `<p class="wn-hint">Endung .txt wird angehängt.</p>` : pop === "rename" && n && n.kind === "file" && !showExt ? `<p class="wn-hint">Die Endung „.${esc(splitExt(n.name)[1])}“ bleibt erhalten.</p>` : ""}
          <p class="wn-err">${esc(popErr)}</p><div class="wn-btns"><button type="button" class="sim-cancel" data-pop="cancel">Abbrechen</button><button type="button" class="sim-ok" data-pop="ok">OK</button></div>`;
      }
      popEl.innerHTML = html;
      popEl.querySelectorAll("[data-pop]").forEach((b) => b.onclick = () => popAct(b.dataset.pop));
      const inp = popEl.querySelector("input");
      if (inp) inp.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); popAct("ok"); } else if (e.key === "Escape") popAct("cancel"); };
    }
    function popAct(a) {
      if (a === "cancel") { pop = null; refresh(); return; }
      if (a === "newfolder" || a === "newtxt") { openPop(a); return; }
      if (a.indexOf("v:") === 0) { view = a.slice(2); pop = null; buzz(6); refresh(); return; }
      if (a.indexOf("s:") === 0) { sort.by = a.slice(2); buzz(6); refresh(); return; }
      if (a.indexOf("d:") === 0) { sort.dir = a.slice(2); pop = null; buzz(6); refresh(); return; }
      if (a === "ok") {
        const inp = popEl.querySelector("#wnName"); if (!inp) return;
        let name = inp.value.trim();
        if (pop === "rename") {
          const n = selNodes()[0]; if (!n) { pop = null; refresh(); return; }
          if (n.kind === "file" && !showExt) name += (splitExt(n.name)[1] ? "." + splitExt(n.name)[1] : "");
          popErr = validName(name, n); if (popErr) { paintPop(); return; }
          n.name = name;
        } else {
          if (pop === "newtxt") name += ".txt";
          popErr = validName(name); if (popErr) { paintPop(); return; }
          const nn = mk(pop === "newfolder" ? { n: name, k: [] } : { n: name, s: 1 });
          here.kids.push(nn); selIds = new Set([nn.id]);
        }
        pop = null; buzz(10); refresh();
      }
    }
    function act(a) {
      lastTap = { id: null, t: 0 };
      if (a === "start") { startOpen = !startOpen; pop = null; refresh(); return; }
      if (a === "open-explorer") { openExplorer(root); return; }
      if (a === "taskapp") { if (win === "open") win = "min"; else win = "open"; startOpen = false; refresh(); return; }
      if (a === "min") { win = "min"; refresh(); return; }
      if (a === "close") { win = "closed"; pop = null; refresh(); return; }
      if (a === "back") { const p = navHist.pop(); if (p) { here = p; selIds.clear(); query = ""; refresh(); } return; }
      if (a === "up") { if (here === trash) { go(""); return; } const p = parentOf(here); if (p && p !== here) { navHist.push(here); here = p; selIds.clear(); query = ""; refresh(); } return; }
      if (a === "new" || a === "view" || a === "sort") { pop = pop === a ? null : a; refresh(); return; }
      if (a === "rename") { openPop("rename"); return; }
      if (a === "del") { deleteSel(); return; }
      if (a === "restore") { restoreSel(); return; }
      if (a === "delforever") { foreverSel(); return; }
      if (a === "cut" || a === "copy") { clip = { mode: a, ids: [...selIds] }; buzz(6); toast(a === "cut" ? "› Ausgeschnitten. Jetzt Zielordner öffnen und „Einfügen“." : "› Kopiert. Jetzt Zielordner öffnen und „Einfügen“."); refresh(); return; }
      if (a === "paste") { doPaste(); return; }
      if (a === "ext") { showExt = !showExt; buzz(6); refresh(); return; }
      if (a === "multi") { multi = !multi; refresh(); return; }
    }

    /* Antippen im Explorer */
    winEl.addEventListener("click", (e) => {
      cancelIdle(); armIdle();
      const g = e.target.closest("[data-go]");
      if (g) { go(g.dataset.go); return; }
      const b = e.target.closest("[data-act]");
      if (b && !b.disabled) { act(b.dataset.act); return; }
      const it = e.target.closest("[data-id]");
      if (it) {
        const id = +it.dataset.id, now = Date.now(), dbl = lastTap.id === id && now - lastTap.t < 600;
        lastTap = { id, t: now };
        if (dbl) {
          const n = find(id);
          if (n && n.kind === "folder") { go(pathOf(n).join("/")); return; }
          toast(`› „${n.name}“ wird geöffnet (in dieser Übung nur zum Ansehen).`); return;
        }
        if (multi || e.ctrlKey || e.metaKey) { if (selIds.has(id)) selIds.delete(id); else selIds.add(id); } else selIds = new Set([id]);
        pop = null; refresh(); return;
      }
      if (e.target.id === "wnBody" || e.target.classList.contains("wn-list")) { selIds.clear(); refresh(); }
    });
    barEl.addEventListener("click", (e) => { const b = e.target.closest("[data-act]"); if (b) { cancelIdle(); act(b.dataset.act); armIdle(); } });
    startEl.addEventListener("click", (e) => { const b = e.target.closest("[data-act]"); if (b && !b.disabled) act(b.dataset.act); });
    node.addEventListener("pointerdown", (e) => { if (startOpen && !e.target.closest(".wn-start,.wn-startbtn")) { startOpen = false; startEl.hidden = true; paintBar(); } });

    const onKey = (e) => {
      if (!node.isConnected || win !== "open" || (e.target && e.target.tagName === "INPUT")) return;
      const c = e.ctrlKey || e.metaKey;
      if (c && (e.key === "c" || e.key === "C")) { e.preventDefault(); if (selIds.size) act("copy"); }
      else if (c && (e.key === "x" || e.key === "X")) { e.preventDefault(); if (selIds.size) act("cut"); }
      else if (c && (e.key === "v" || e.key === "V")) { e.preventDefault(); doPaste(); }
      else if (c && (e.key === "a" || e.key === "A")) { e.preventDefault(); selIds = new Set(listing().map((n) => n.id)); refresh(); }
      else if (e.key === "F2") { e.preventDefault(); if (selIds.size === 1) openPop("rename"); }
      else if (e.key === "Delete") { e.preventDefault(); if (inTrashView()) foreverSel(); else deleteSel(); }
      else if (e.key === "Backspace") { e.preventDefault(); act("up"); }
    };
    document.addEventListener("keydown", onKey);

    /* ── Aufgabenkarte, Checkliste, Dock ───────────── */
    function paintTask() {
      const box = q("#wnTask");
      if (!guided) {
        box.innerHTML = `<div class="sim-check${checkOpen ? " open" : ""}" id="wnCheckBox">
          <button type="button" class="sim-check-head" id="wnCheckToggle"><span>Checkliste · <b id="wnScore"></b></span><span class="chev">▾</span></button>
          <div class="sim-check-body" id="wnCList"></div></div>`;
        const cb = box.querySelector("#wnCheckBox");
        box.querySelector("#wnCheckToggle").onclick = () => { checkOpen = !checkOpen; cb.classList.toggle("open", checkOpen); };
      } else if (cur >= crit.length) {
        box.innerHTML = `<div class="sim-task done open"><div class="sim-task-head"><span class="n">✓</span><b>Alles aufgeräumt.</b></div><div class="sim-task-body"><p>Tippe unten auf „Fertig“.</p></div></div>`;
      } else {
        const c = crit[cur], t = c.task || {};
        box.innerHTML = `<div class="sim-task${taskOpen ? " open" : ""}" id="wnTaskBox">
          <button type="button" class="sim-task-head" id="wnTaskToggle"><span class="n">Aufgabe ${cur + 1}/${crit.length}</span><b>${esc(c.label)}</b><span class="chev">▾</span></button>
          <div class="sim-task-body">
            ${t.wo ? `<p><span class="lbl">Wo?</span> ${esc(t.wo)}</p>` : ""}
            ${t.was ? `<p><span class="lbl">Was?</span> ${esc(t.was)}</p>` : ""}
            ${t.probe ? `<p><span class="lbl">Probe</span> ${esc(t.probe)}</p>` : ""}
          </div></div>`;
        const tb = box.querySelector("#wnTaskBox");
        box.querySelector("#wnTaskToggle").onclick = () => { taskOpen = !taskOpen; tb.classList.toggle("open", taskOpen); };
      }
    }
    function paintChecklist() {
      if (guided) return;
      const list = q("#wnCList"); if (!list) return;
      list.innerHTML = crit.map((c) => `<div class="row${critOK(c) ? " ok" : ""}"><i>✓</i><span>${esc(c.label)}</span></div>`).join("");
      const sc = q("#wnScore"); if (sc) sc.textContent = `${passedCount()}/${crit.length}`;
    }
    const statusEl = h(`<span class="sim-status"></span>`);
    function paintStatus() { statusEl.innerHTML = `<span class="s-txt">${win === "open" ? esc(pathOf(here).join(" › ") || (here === trash ? "Papierkorb" : "Dieser PC")) : "Desktop"}</span>`; }
    function paintDock() {
      if (guided) {
        if (cur >= crit.length) ctx.action(`Fertig ${env.ICON.check}`, () => ctx.finish({ c: crit.length, t: crit.length }), { variant: "good" });
        else ctx.action(`Probe ${env.ICON.check}`, probe);
      } else if (passedCount() >= crit.length) ctx.action(`Fertig ${env.ICON.check}`, () => ctx.finish({ c: passedCount(), t: crit.length }), { variant: "good" });
      else ctx.action(`Prüfen ${env.ICON.check}`, freeCheck);
    }

    /* ── Hinweise ──────────────────────────────────── */
    const hintCheck = () => (guided && cur < crit.length ? crit[cur].checks.find((ck) => !evalCheck(ck)) || null : null);
    function opBtn(ck) {
      switch (ck.op) {
        case "exists": return ck.type === "folder" || !ck.type ? "new" : null;
        case "inTrash": return "del";
        case "view": return "view";
        case "sort": return "sort";
        case "ext": return "ext";
        case "clip": return ck.mode === "cut" ? "cut" : "copy";
        case "explorer": return ck.value === "open" ? "start" : "close";
        default: return null;
      }
    }
    function paintHints() {
      node.querySelectorAll(".hint").forEach((el) => el.classList.remove("hint"));
      const ck = hintCheck(); if (!ck) return;
      const b = (crit[cur].task || {}).btn || opBtn(ck);
      if (!b) return;
      const el = node.querySelector(`[data-act="${b}"]`);
      if (el && !el.disabled) el.classList.add("hint");
      if (ck.op === "explorer" && ck.value === "open" && win === "open") return;
      if (ck.op === "explorer" && startOpen) { const e2 = node.querySelector('[data-act="open-explorer"]'); if (e2) e2.classList.add("hint"); }
    }

    function refresh() { paintWin(); paintPop(); paintDesktop(); paintBar(); paintStatus(); paintChecklist(); paintHints(); if (!guided) { ctx.setProgress(passedCount() / crit.length); if (passedCount() >= crit.length) { if (give) { give.remove(); give = null; } paintDock(); } } }
    function probe() {
      const c = crit[cur]; if (!c) return;
      if (critOK(c)) { simMsg("ok", `Passt. ${esc((c.task && c.task.probe) || "")}`); buzz(20); cur++; ctx.setProgress(cur / crit.length); paintTask(); paintDock(); paintHints(); }
      else { simMsg("no", `Noch nicht ganz. ${esc(c.hint || "Schau dir den Ordner nochmal an.")}`); buzz([30, 40, 30]); }
    }
    function freeCheck() {
      const n = passedCount(), missing = crit.filter((c) => !critOK(c)).map((c) => c.label);
      simMsg(n === crit.length ? "ok" : "no", n === crit.length ? "Alles richtig. Alles ist aufgeräumt." : `${n} von ${crit.length}. Noch offen: ${esc(missing.join(" · "))}`);
      buzz(n === crit.length ? 20 : [30, 40, 30]); ctx.setProgress(n / crit.length);
      if (give) { give.remove(); give = null; }
      if (n < crit.length) { give = h(`<button class="btn ghost">Abgeben · ${n}/${crit.length}</button>`); give.onclick = () => ctx.finish({ c: n, t: crit.length }); ctx.dock.append(give); }
      paintDock();
    }
    let idle = null;
    const cancelIdle = () => { clearTimeout(idle); node.classList.remove("wn-nudge"); };
    const armIdle = () => { clearTimeout(idle); if (guided) idle = setTimeout(() => node.classList.add("wn-nudge"), 12000); };

    /* ── Einbau ────────────────────────────────────── */
    document.body.classList.add("sim-on", "sim-win");
    const topbar = ctx.root.querySelector(".player-top");
    topbar.insertBefore(h(`<span class="sim-file"><b>⊞</b><span>${esc(step.file || "Windows 11")}</span></span>`), topbar.querySelector(".progress"));
    ctx.dock.prepend(statusEl);
    ctx.hintsFor = () => (guided && cur < crit.length ? [crit[cur].hint].filter(Boolean) : step.hints || []);
    ctx.hintKey = () => (guided ? "a" + cur : "frei");
    ctx.body.append(node);
    ctx.setProgress(0);
    paintTask(); refresh(); paintDock();
    if (step.intro) simMsg("info", esc(step.intro));
    armIdle();

    return () => {
      document.body.classList.remove("sim-on", "sim-win");
      timers.forEach(clearTimeout); cancelIdle();
      document.removeEventListener("keydown", onKey);
    };
  };
})();
