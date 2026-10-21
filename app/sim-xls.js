/* Excel-Simulation (Schritt-Typ "xls") – Tabellen, Formeln, Funktionen, Formatieren, Sortieren, Diagramme; handytauglich, automatisch geprüft.
   Wird von app.js geladen: window.LernraumSim.xls(step, ctx, env) → Aufräum-Funktion.
   Datenformat und Prüf-Operationen: app/README.md → „Excel-Simulation“. Formeln auf Deutsch (Trennzeichen „;“, Dezimalkomma). */
(function () {
  "use strict";
  window.LernraumSim = window.LernraumSim || {};

  /* ══════════════ Adressen ══════════════ */
  const colName = (c) => { let s = "", n = c + 1; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; };
  const colIdx = (s) => { let n = 0; for (const ch of s.toUpperCase()) n = n * 26 + ch.charCodeAt(0) - 64; return n - 1; };
  const addr = (c, r) => colName(c) + (r + 1);
  const parseAddr = (a) => { const m = /^\$?([A-Za-z]{1,2})\$?(\d+)$/.exec(a); return m ? { c: colIdx(m[1]), r: +m[2] - 1 } : null; };
  const parseRange = (s) => {
    const [x, y] = String(s).split(":"), a = parseAddr(x), b = parseAddr(y || x);
    return a && b ? { c1: Math.min(a.c, b.c), r1: Math.min(a.r, b.r), c2: Math.max(a.c, b.c), r2: Math.max(a.r, b.r) } : null;
  };
  const rangeCells = (s) => { const r = parseRange(s), out = []; if (!r) return out; for (let y = r.r1; y <= r.r2; y++) for (let x = r.c1; x <= r.c2; x++) out.push(addr(x, y)); return out; };
  const normRef = (s) => String(s).replace(/[$\s]/g, "").toUpperCase();

  /* ══════════════ Formel-Maschine ══════════════ */
  class XlErr { constructor(code) { this.code = code; } }
  const isErr = (v) => v instanceof XlErr;
  const isRange = (v) => v && typeof v === "object" && Array.isArray(v.range);

  function parseConst(raw) {
    const t = String(raw).trim();
    if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(t)) return parseFloat(t.replace(/\./g, "").replace(",", "."));
    if (/^-?\d+(,\d+)?$/.test(t)) return parseFloat(t.replace(",", "."));
    if (/^-?\d+\.\d+$/.test(t)) return parseFloat(t);
    if (/^(wahr|falsch)$/i.test(t)) return t.toUpperCase() === "WAHR";
    return String(raw);
  }

  function tokenize(s) {
    const t = []; let i = 0;
    while (i < s.length) {
      const ch = s[i];
      if (/\s/.test(ch)) { i++; continue; }
      if (ch === '"') {
        let j = i + 1, str = "";
        while (j < s.length) { if (s[j] === '"') { if (s[j + 1] === '"') { str += '"'; j += 2; continue; } break; } str += s[j++]; }
        if (j >= s.length) throw new XlErr("#NAME?");
        t.push({ k: "str", v: str }); i = j + 1; continue;
      }
      const rest = s.slice(i);
      let m = /^\$?[A-Za-z]{1,2}\$?\d+(:\$?[A-Za-z]{1,2}\$?\d+)?(?![A-Za-z0-9_.(])/.exec(rest);
      if (m) { t.push({ k: "ref", v: m[0] }); i += m[0].length; continue; }
      m = /^\d+(?:[.,]\d+)?(?:[eE][+-]?\d+)?/.exec(rest);
      if (m) { t.push({ k: "num", v: parseFloat(m[0].replace(",", ".")) }); i += m[0].length; continue; }
      m = /^[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß0-9._]*/.exec(rest);
      if (m) { t.push({ k: "id", v: m[0].toUpperCase() }); i += m[0].length; continue; }
      m = /^(<>|<=|>=)/.exec(rest);
      if (m) { t.push({ k: "op", v: m[0] }); i += 2; continue; }
      if ("+-*/^&=<>();%".includes(ch)) { t.push({ k: "op", v: ch }); i++; continue; }
      throw new XlErr("#NAME?");
    }
    return t;
  }

  function parse(tokens) {
    let p = 0;
    const peek = () => tokens[p], next = () => tokens[p++];
    const isOp = (v) => peek() && peek().k === "op" && peek().v === v;
    const CMP = ["=", "<>", "<", ">", "<=", ">="];
    function cmp() { let l = cat(); while (peek() && peek().k === "op" && CMP.includes(peek().v)) { const op = next().v; l = { t: "bin", op, l, r: cat() }; } return l; }
    function cat() { let l = add(); while (isOp("&")) { next(); l = { t: "bin", op: "&", l, r: add() }; } return l; }
    function add() { let l = mul(); while (isOp("+") || isOp("-")) { const op = next().v; l = { t: "bin", op, l, r: mul() }; } return l; }
    function mul() { let l = pow(); while (isOp("*") || isOp("/")) { const op = next().v; l = { t: "bin", op, l, r: pow() }; } return l; }
    function pow() { let l = unary(); while (isOp("^")) { next(); l = { t: "bin", op: "^", l, r: unary() }; } return l; }
    function unary() { if (isOp("-")) { next(); return { t: "neg", x: unary() }; } if (isOp("+")) { next(); return unary(); } return post(); }
    function post() { let x = atom(); while (isOp("%")) { next(); x = { t: "pct", x }; } return x; }
    function atom() {
      const tk = next();
      if (!tk) throw new XlErr("#WERT!");
      if (tk.k === "num") return { t: "num", v: tk.v };
      if (tk.k === "str") return { t: "str", v: tk.v };
      if (tk.k === "ref") return { t: "ref", v: tk.v };
      if (tk.k === "id") {
        if (isOp("(")) {
          next();
          const args = [];
          if (isOp(")")) { next(); return { t: "fn", n: tk.v, args }; }
          for (;;) {
            args.push(cmp());
            if (isOp(";")) { next(); continue; }
            if (isOp(")")) { next(); break; }
            throw new XlErr("#WERT!");
          }
          return { t: "fn", n: tk.v, args };
        }
        if (tk.v === "WAHR") return { t: "bool", v: true };
        if (tk.v === "FALSCH") return { t: "bool", v: false };
        throw new XlErr("#NAME?");
      }
      if (tk.k === "op" && tk.v === "(") { const e = cmp(); if (!isOp(")")) throw new XlErr("#WERT!"); next(); return e; }
      throw new XlErr("#WERT!");
    }
    const e = cmp();
    if (p < tokens.length) throw new XlErr("#WERT!");
    return e;
  }

  const toNum = (v) => {
    if (isErr(v)) throw v;
    if (v === null || v === undefined || v === "") return 0;
    if (typeof v === "number") return v;
    if (typeof v === "boolean") return v ? 1 : 0;
    if (isRange(v)) throw new XlErr("#WERT!");
    const c = parseConst(v);
    if (typeof c === "number") return c;
    throw new XlErr("#WERT!");
  };
  const toBool = (v) => { if (isErr(v)) throw v; if (typeof v === "boolean") return v; if (typeof v === "number") return v !== 0; if (typeof v === "string") { if (/^wahr$/i.test(v)) return true; if (/^falsch$/i.test(v)) return false; } throw new XlErr("#WERT!"); };
  const toText = (v) => { if (isErr(v)) throw v; if (v === null || v === undefined) return ""; if (typeof v === "boolean") return v ? "WAHR" : "FALSCH"; if (typeof v === "number") return String(+v.toPrecision(12)).replace(".", ","); return String(v); };
  const roundTo = (x, n, mode) => {
    const f = Math.pow(10, n), s = Math.sign(x), a = Math.abs(x) * f;
    const e = Math.abs(a - Math.round(a)) < 1e-9 ? Math.round(a) : a;
    const r = mode === "up" ? Math.ceil(e - 1e-9) : mode === "down" ? Math.floor(e + 1e-9) : Math.round(e + 1e-9);
    return (s * r) / f;
  };
  const flatNums = (args, direct = true) => {
    const out = [];
    args.forEach((a) => {
      if (isRange(a)) a.range.forEach((row) => row.forEach((v) => { if (isErr(v)) throw v; if (typeof v === "number") out.push(v); }));
      else if (direct) out.push(toNum(a));
    });
    return out;
  };
  const critTest = (crit) => {
    if (typeof crit === "number") return (v) => typeof v === "number" && v === crit;
    const m = /^(<=|>=|<>|<|>|=)?(.*)$/.exec(toText(crit));
    const op = m[1] || "=", rhs = m[2], num = /^-?\d+([.,]\d+)?$/.test(rhs.trim()) ? parseFloat(rhs.replace(",", ".")) : null;
    return (v) => {
      if (num !== null) {
        if (typeof v !== "number") return op === "<>";
        return op === "=" ? v === num : op === "<>" ? v !== num : op === "<" ? v < num : op === ">" ? v > num : op === "<=" ? v <= num : v >= num;
      }
      const s = toText(v === undefined ? null : v).toLowerCase(), t = rhs.toLowerCase();
      return op === "<>" ? s !== t : s === t;
    };
  };
  const cmpVals = (a, b) => {
    if (a === null) a = typeof b === "string" ? "" : 0;
    if (b === null) b = typeof a === "string" ? "" : 0;
    const ka = typeof a === "number" ? 0 : typeof a === "string" ? 1 : 2, kb = typeof b === "number" ? 0 : typeof b === "string" ? 1 : 2;
    if (ka !== kb) return ka - kb;
    if (ka === 1) { const x = a.toLowerCase(), y = b.toLowerCase(); return x < y ? -1 : x > y ? 1 : 0; }
    return a < b ? -1 : a > b ? 1 : 0;
  };

  function makeEngine(getRaw) {
    const cache = new Map(), stack = new Set();
    const norm = (a) => a.replace(/\$/g, "").toUpperCase();
    function value(a) {
      a = norm(a);
      if (cache.has(a)) return cache.get(a);
      const raw = getRaw(a);
      let v;
      if (raw === undefined || raw === "") v = null;
      else if (raw[0] === "=") {
        if (stack.has(a)) return new XlErr("#ZIRKEL!");
        stack.add(a);
        try { v = ev(parse(tokenize(raw.slice(1)))); if (isRange(v)) v = v.range[0][0]; if (v === undefined) v = null; }
        catch (e) { v = isErr(e) ? e : new XlErr("#WERT!"); }
        stack.delete(a);
      } else v = parseConst(raw);
      cache.set(a, v);
      return v;
    }
    const FN = {
      SUMME: (a) => flatNums(a).reduce((x, y) => x + y, 0),
      MITTELWERT: (a) => { const n = flatNums(a); if (!n.length) throw new XlErr("#DIV/0!"); return n.reduce((x, y) => x + y, 0) / n.length; },
      MIN: (a) => { const n = flatNums(a); return n.length ? Math.min(...n) : 0; },
      MAX: (a) => { const n = flatNums(a); return n.length ? Math.max(...n) : 0; },
      ANZAHL: (a) => flatNums(a, false).length + a.filter((x) => !isRange(x) && typeof x === "number").length,
      ANZAHL2: (a) => { let n = 0; a.forEach((x) => { if (isRange(x)) x.range.forEach((r) => r.forEach((v) => { if (v !== null) n++; })); else n++; }); return n; },
      PRODUKT: (a) => flatNums(a).reduce((x, y) => x * y, 1),
      RUNDEN: (a) => roundTo(toNum(a[0]), a[1] === undefined ? 0 : toNum(a[1])),
      AUFRUNDEN: (a) => roundTo(toNum(a[0]), a[1] === undefined ? 0 : toNum(a[1]), "up"),
      ABRUNDEN: (a) => roundTo(toNum(a[0]), a[1] === undefined ? 0 : toNum(a[1]), "down"),
      BETRAG: (a) => Math.abs(toNum(a[0])),
      UND: (a) => a.every((x) => toBool(x)),
      ODER: (a) => a.some((x) => toBool(x)),
      NICHT: (a) => !toBool(a[0]),
      VERKETTEN: (a) => a.map(toText).join(""),
      ZÄHLENWENN: (a) => { const t = critTest(a[1]); let n = 0; a[0].range.forEach((r) => r.forEach((v) => { if (t(v)) n++; })); return n; },
      SUMMEWENN: (a) => {
        const t = critTest(a[1]), src = a[0].range, sum = (a[2] || a[0]).range; let s = 0;
        src.forEach((r, y) => r.forEach((v, x) => { if (t(v)) { const w = sum[y] && sum[y][x]; if (isErr(w)) throw w; if (typeof w === "number") s += w; } }));
        return s;
      },
      SVERWEIS: (a) => {
        const key = a[0], m = a[1].range, col = toNum(a[2]);
        if (col < 1 || col > (m[0] || []).length) throw new XlErr("#BEZUG!");
        const exact = a.length > 3 && !(a[3] === true || (typeof a[3] === "number" && a[3] !== 0));
        let hit = -1;
        if (exact) hit = m.findIndex((r) => r[0] !== null && cmpVals(r[0], key) === 0);
        else m.forEach((r, i) => { if (r[0] !== null && cmpVals(r[0], key) <= 0) hit = i; });
        if (hit < 0) throw new XlErr("#NV");
        const out = m[hit][col - 1];
        if (isErr(out)) throw out;
        return out === null ? 0 : out;
      }
    };
    FN.ZAEHLENWENN = FN["ZÄHLENWENN"];
    const ALIAS = { SUM: "SUMME", AVERAGE: "MITTELWERT", COUNT: "ANZAHL", IF: "WENN", ROUND: "RUNDEN", VLOOKUP: "SVERWEIS" };
    function ev(n) {
      switch (n.t) {
        case "num": case "str": case "bool": return n.v;
        case "ref": {
          if (n.v.includes(":")) {
            const r = parseRange(n.v), rows = [];
            if (!r || r.c2 - r.c1 > 60 || r.r2 - r.r1 > 400) throw new XlErr("#BEZUG!");
            for (let y = r.r1; y <= r.r2; y++) { const row = []; for (let x = r.c1; x <= r.c2; x++) row.push(value(addr(x, y))); rows.push(row); }
            return { range: rows };
          }
          const v = value(n.v);
          if (isErr(v)) throw v;
          return v;
        }
        case "neg": return -toNum(ev(n.x));
        case "pct": return toNum(ev(n.x)) / 100;
        case "bin": {
          const l = ev(n.l), r = ev(n.r);
          if (n.op === "&") return toText(l) + toText(r);
          if (["=", "<>", "<", ">", "<=", ">="].includes(n.op)) {
            if (isErr(l)) throw l; if (isErr(r)) throw r;
            const c = cmpVals(l === undefined ? null : l, r === undefined ? null : r);
            return n.op === "=" ? c === 0 : n.op === "<>" ? c !== 0 : n.op === "<" ? c < 0 : n.op === ">" ? c > 0 : n.op === "<=" ? c <= 0 : c >= 0;
          }
          const x = toNum(l), y = toNum(r);
          if (n.op === "+") return x + y;
          if (n.op === "-") return x - y;
          if (n.op === "*") return x * y;
          if (n.op === "/") { if (y === 0) throw new XlErr("#DIV/0!"); return x / y; }
          return Math.pow(x, y);
        }
        case "fn": {
          const name = ALIAS[n.n] || n.n;
          if (name === "WENN") {
            if (n.args.length < 2) throw new XlErr("#WERT!");
            return toBool(ev(n.args[0])) ? ev(n.args[1]) : n.args[2] ? ev(n.args[2]) : false;
          }
          if (name === "WENNFEHLER") {
            try { const v = ev(n.args[0]); return isErr(v) ? ev(n.args[1]) : v; } catch (e) { if (isErr(e)) return ev(n.args[1]); throw e; }
          }
          const f = FN[name];
          if (!f) throw new XlErr("#NAME?");
          const args = n.args.map(ev);
          if ((name === "ZÄHLENWENN" || name === "ZAEHLENWENN" || name === "SUMMEWENN") && !isRange(args[0])) throw new XlErr("#WERT!");
          if (name === "SVERWEIS" && !isRange(args[1])) throw new XlErr("#WERT!");
          return f(args);
        }
        default: throw new XlErr("#WERT!");
      }
    }
    return value;
  }

  /* Formel beim Kopieren verschieben (relative Bezüge wandern, $-Bezüge bleiben) */
  function shiftRaw(raw, dc, dr) {
    if (!raw || raw[0] !== "=") return raw;
    return raw.replace(/("(?:[^"]|"")*")|(?<![A-Za-z0-9_.$])(\$?)([A-Za-z]{1,2})(\$?)(\d+)(?![A-Za-z0-9_.(])/g, (m, str, d1, col, d2, row) => {
      if (str) return str;
      let c = colIdx(col), r = +row - 1;
      if (!d1) c += dc;
      if (!d2) r += dr;
      if (c < 0 || r < 0) return "#BEZUG!";
      return d1 + colName(c) + d2 + (r + 1);
    });
  }

  /* ══════════════ Darstellung ══════════════ */
  const FILLS = { keine: ["Keine", null], gelb: ["Gelb", "#fff2a8"], gruen: ["Grün", "#c6efce"], blau: ["Blau", "#cfe2f7"], rot: ["Rot", "#f8cbad"] };
  const NUMFMTS = { standard: "Standard", zahl: "Zahl", euro: "Währung (€)", prozent: "Prozent" };
  const DEC_DEFAULT = { zahl: 2, euro: 2, prozent: 0 };
  const FUNCS = ["SUMME", "MITTELWERT", "MIN", "MAX", "ANZAHL", "WENN", "RUNDEN", "SUMMEWENN", "ZÄHLENWENN", "SVERWEIS"];
  const AUTOS = { SUMME: "Summe", MITTELWERT: "Mittelwert", ANZAHL: "Anzahl", MIN: "Min", MAX: "Max" };
  const CHARTS = { saeule: "Säule", linie: "Linie", kreis: "Kreis" };
  const PALETTE = ["#217346", "#2b7de9", "#e8683b", "#9c5fb5", "#d4a017", "#5b6770"];
  const thou = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  function fmtNumber(v, f) {
    const nf = f.numfmt || "standard", dec = f.dec !== undefined ? f.dec : DEC_DEFAULT[nf];
    if (nf === "standard") {
      if (dec === undefined) return String(+v.toPrecision(10)).replace(".", ",");
      return v.toFixed(dec).replace(".", ",");
    }
    const x = nf === "prozent" ? v * 100 : v, fixed = Math.abs(x).toFixed(dec), [i, d] = fixed.split(".");
    const body = (x < 0 && +fixed !== 0 ? "-" : "") + (nf === "prozent" ? i : thou(i)) + (d ? "," + d : "");
    return body + (nf === "euro" ? " €" : nf === "prozent" ? " %" : "");
  }

  window.LernraumSim.xls = function (step, ctx, env) {
    const { h, esc, toast, buzz, reduced } = env;
    const crit = step.criteria;
    const guided = step.mode !== "free";
    const sh = step.sheet || {};
    const COLS = sh.cols || 6, ROWS = sh.rows || 12;
    const colw = (c) => (sh.colw && sh.colw[colName(c)]) || (c === 0 && sh.wideA ? 112 : 78);

    /* ── Zustand ───────────────────────────────────── */
    const cells = { ...(sh.cells || {}) };
    const fmts = {};
    Object.entries(sh.fmt || {}).forEach(([k, v]) => rangeCells(k).forEach((a) => { fmts[a] = { ...(fmts[a] || {}), ...v }; }));
    let chart = sh.chart ? { ...sh.chart } : null;
    let sel = { a: { c: 0, r: 0 }, b: { c: 0, r: 0 } };
    let tab = "start", pop = null, editing = false, clip = null, drag = false, armed = null;
    let cur = 0, taskOpen = false, checkOpen = window.innerWidth >= 600, give = null;
    const timers = new Set();
    const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); return t; };

    let eng = null;
    const dirty = () => { eng = null; };
    const getRaw = (a) => cells[a];
    const val = (a) => { if (!eng) eng = makeEngine(getRaw); return eng(a); };
    const display = (a) => {
      const v = val(a), f = fmts[a] || {};
      if (v === null) return "";
      if (isErr(v)) return v.code;
      if (typeof v === "boolean") return v ? "WAHR" : "FALSCH";
      if (typeof v === "number") return fmtNumber(v, f);
      return String(v);
    };
    const rng = () => ({ c1: Math.min(sel.a.c, sel.b.c), r1: Math.min(sel.a.r, sel.b.r), c2: Math.max(sel.a.c, sel.b.c), r2: Math.max(sel.a.r, sel.b.r) });
    const selCells = () => { const r = rng(), out = []; for (let y = r.r1; y <= r.r2; y++) for (let x = r.c1; x <= r.c2; x++) out.push(addr(x, y)); return out; };
    const actA = () => addr(sel.a.c, sel.a.r);
    const selLabel = () => { const r = rng(); return r.c1 === r.c2 && r.r1 === r.r2 ? addr(r.c1, r.r1) : addr(r.c1, r.r1) + ":" + addr(r.c2, r.r2); };
    const isSingle = () => { const r = rng(); return r.c1 === r.c2 && r.r1 === r.r2; };

    function setRaw(a, text) {
      let t = String(text).trim();
      if (t === "") { delete cells[a]; dirty(); return; }
      if (t[0] !== "=") {
        let m;
        if ((m = /^(-?\d+(?:[.,]\d+)?)\s*%$/.exec(t))) { t = String(+(parseFloat(m[1].replace(",", ".")) / 100).toPrecision(12)).replace(".", ","); fmts[a] = { ...(fmts[a] || {}), numfmt: (fmts[a] || {}).numfmt || "prozent" }; }
        else if ((m = /^(-?\d{1,3}(?:\.\d{3})*(?:,\d+)?|-?\d+(?:,\d+)?)\s*(€|eur)$/i.exec(t))) { t = m[1].replace(/\./g, ""); fmts[a] = { ...(fmts[a] || {}), numfmt: (fmts[a] || {}).numfmt || "euro" }; }
      }
      cells[a] = t;
      dirty();
    }

    /* ── Prüfung ───────────────────────────────────── */
    const eqVal = (v, want, tol) => {
      if (isErr(v)) return false;
      if (typeof want === "number") return typeof v === "number" && Math.abs(v - want) <= (tol === undefined ? 0.005 : tol);
      return String(v === null ? "" : v).trim().toLowerCase() === String(want).trim().toLowerCase();
    };
    function evalCheck(ck) {
      switch (ck.op) {
        case "value": {
          const list = rangeCells(ck.cell);
          if (Array.isArray(ck.value)) return list.length === ck.value.length && list.every((a, i) => eqVal(val(a), ck.value[i], ck.tol));
          return list.length > 0 && list.every((a) => eqVal(val(a), ck.value, ck.tol));
        }
        case "text": return rangeCells(ck.cell).every((a) => display(a).replace(/\s/g, "") === String(ck.value).replace(/\s/g, ""));
        case "formula": {
          return rangeCells(ck.cell).every((a) => {
            const raw = String(cells[a] || ""), up = raw.toUpperCase();
            if (raw[0] !== "=") return false;
            if ((ck.uses || []).some((f) => !up.includes(f + "("))) return false;
            if ((ck.refs || []).some((rf) => !normRef(raw).includes(normRef(rf)))) return false;
            if (ck.abs && !raw.includes("$")) return false;
            return true;
          });
        }
        case "formulas": return rangeCells(ck.range).every((a) => String(cells[a] || "")[0] === "=");
        case "fmt": return rangeCells(ck.cell).every((a) => {
          const f = fmts[a] || {};
          if (ck.prop === "bold") return !!f.bold === (ck.value !== false);
          if (ck.prop === "align") { const v = val(a); return (f.align || (typeof v === "number" ? "right" : "left")) === ck.value; }
          if (ck.prop === "numfmt") return (f.numfmt || "standard") === ck.value;
          if (ck.prop === "dec") return (f.dec !== undefined ? f.dec : DEC_DEFAULT[f.numfmt || "standard"]) === ck.value;
          if (ck.prop === "fill") return (f.fill || "keine") === ck.value;
          return false;
        });
        case "chart": return !!chart && chart.type === ck.type && (!ck.range || normRef(chart.range) === normRef(ck.range));
        case "sorted": {
          const r = parseRange(ck.range);
          if (!r) return false;
          const c = r.c1 + (ck.col || 0), vals = [];
          for (let y = r.r1; y <= r.r2; y++) vals.push(val(addr(c, y)));
          for (let i = 1; i < vals.length; i++) { const d = cmpVals(vals[i - 1], vals[i]); if (ck.dir === "desc" ? d < 0 : d > 0) return false; }
          return true;
        }
        default: return false;
      }
    }
    const critOK = (c) => c.checks.every(evalCheck);
    const passedCount = () => crit.filter(critOK).length;

    /* ── Gerüst ────────────────────────────────────── */
    const node = h(`<div class="sim xls">
      <div class="sim-ribbon">
        <div class="sim-tabs" role="tablist" id="xlTabs"></div>
        <div class="sim-groups" id="xlGroups"></div>
        <div class="sim-pop" id="xlPop" hidden></div>
      </div>
      <div id="xlTask"></div>
      <div id="xlOut"></div>
      <div class="xl-fbar">
        <span class="xl-name" id="xlName">A1</span>
        <button type="button" class="xl-fx" id="xlFx" aria-label="Funktion einfügen">fx</button>
        <input id="xlInput" class="xl-input" type="text" inputmode="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Formelleiste">
        <button type="button" class="xl-edbtn ok" id="xlOk" aria-label="Eingabe bestätigen" hidden>✓</button>
        <button type="button" class="xl-edbtn no" id="xlNo" aria-label="Eingabe abbrechen" hidden>✕</button>
      </div>
      <div class="xl-keys" id="xlKeys" hidden></div>
      <div class="xl-scroll" id="xlScroll">
        <div class="xl-sheet" id="xlSheet"></div>
        <div class="xl-chart" id="xlChart"></div>
      </div>
    </div>`);
    const q = (s) => node.querySelector(s);
    const out = q("#xlOut"), groups = q("#xlGroups"), popEl = q("#xlPop"), sheetEl = q("#xlSheet"), input = q("#xlInput"), keysEl = q("#xlKeys");
    function simMsg(kind, html) { out.innerHTML = `<div class="sim-msg ${kind}"><span class="ico">${kind === "ok" ? "✓" : kind === "no" ? "✗" : "i"}</span><span>${html}</span></div>`; }

    /* ── Tabelle ───────────────────────────────────── */
    function paintSheet() {
      const r = rng(), tgt = hintCell();
      let html = `<table class="xl-grid"><thead><tr><th class="xl-corner" data-all="1"></th>${Array.from({ length: COLS }, (_, c) => `<th class="xl-ch${c >= r.c1 && c <= r.c2 ? " on" : ""}" data-col="${c}" style="min-width:${colw(c)}px;width:${colw(c)}px">${colName(c)}</th>`).join("")}</tr></thead><tbody>`;
      for (let y = 0; y < ROWS; y++) {
        html += `<tr><th class="xl-rh${y >= r.r1 && y <= r.r2 ? " on" : ""}" data-row="${y}">${y + 1}</th>`;
        for (let x = 0; x < COLS; x++) {
          const a = addr(x, y), f = fmts[a] || {}, v = val(a), inSel = x >= r.c1 && x <= r.c2 && y >= r.r1 && y <= r.r2;
          const al = f.align || (typeof v === "number" || isErr(v) ? "right" : "left");
          const fill = f.fill && FILLS[f.fill] ? FILLS[f.fill][1] : null;
          const cls = "xl-c" + (inSel ? " sel" : "") + (x === sel.a.c && y === sel.a.r ? " act" : "") + (isErr(v) ? " err" : "") + (tgt === a && !inSel ? " hint" : "");
          html += `<td class="${cls}" data-a="${a}" style="text-align:${al};${f.bold ? "font-weight:700;" : ""}${fill ? `background:${fill};` : ""}">${esc(display(a))}</td>`;
        }
        html += "</tr>";
      }
      sheetEl.innerHTML = html + "</tbody></table><span class='xl-handle' id='xlHandle' role='presentation'></span>";
      placeHandle();
    }
    function placeHandle() {
      const hd = q("#xlHandle"), last = sheetEl.querySelector(`[data-a="${addr(rng().c2, rng().r2)}"]`);
      if (!hd || !last) return;
      hd.style.left = last.offsetLeft + last.offsetWidth - 20 + "px";
      hd.style.top = last.offsetTop + last.offsetHeight - 20 + "px";
    }
    function paintBar() {
      q("#xlName").textContent = selLabel();
      if (!editing) input.value = cells[actA()] || "";
      q("#xlOk").hidden = !editing;
      q("#xlNo").hidden = !editing;
      keysEl.hidden = !editing;
    }
    function paintStatus() {
      const nums = selCells().map(val).filter((v) => typeof v === "number");
      statusEl.innerHTML = editing ? `<span class="s-txt">Eingeben</span>`
        : `<span class="s-txt">Bereit${!isSingle() && nums.length ? ` · Summe: ${esc(fmtNumber(nums.reduce((x, y) => x + y, 0), {}))} · Anzahl: ${nums.length}` : ""}</span>`;
    }

    /* ── Diagramm ──────────────────────────────────── */
    function paintChart() {
      const box = q("#xlChart");
      if (!chart) { box.innerHTML = ""; return; }
      const r = parseRange(chart.range);
      if (!r) { box.innerHTML = ""; return; }
      const header = r.r2 > r.r1 && typeof val(addr(r.c1 + 1, r.r1)) === "string";
      const labels = [], vals = [];
      for (let y = r.r1 + (header ? 1 : 0); y <= r.r2; y++) { const v = val(addr(r.c1 + 1, y)); labels.push(display(addr(r.c1, y))); vals.push(typeof v === "number" ? v : 0); }
      const title = header ? display(addr(r.c1 + 1, r.r1)) : "Diagramm";
      const W = 320, H = 200, pl = 34, pb = 28, pt = 26, max = Math.max(1, ...vals), n = vals.length || 1;
      let g = "";
      if (chart.type === "kreis") {
        const tot = vals.reduce((x, y) => x + Math.max(0, y), 0) || 1; let a0 = -Math.PI / 2;
        vals.forEach((v, i) => {
          const a1 = a0 + (Math.max(0, v) / tot) * Math.PI * 2, cx = 90, cy = 112, R = 70;
          const large = a1 - a0 > Math.PI ? 1 : 0;
          g += Math.max(0, v) === tot ? `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${PALETTE[i % 6]}"/>` : `<path d="M${cx} ${cy}L${cx + R * Math.cos(a0)} ${cy + R * Math.sin(a0)}A${R} ${R} 0 ${large} 1 ${cx + R * Math.cos(a1)} ${cy + R * Math.sin(a1)}Z" fill="${PALETTE[i % 6]}" stroke="#fff" stroke-width="1.5"/>`;
          g += `<rect x="180" y="${52 + i * 20}" width="10" height="10" fill="${PALETTE[i % 6]}"/><text x="196" y="${61 + i * 20}" font-size="11" fill="#333">${esc(labels[i])} (${Math.round((Math.max(0, v) / tot) * 100)} %)</text>`;
          a0 = a1;
        });
      } else {
        const bw = (W - pl - 10) / n, y0 = H - pb, ph = y0 - pt;
        g += `<path d="M${pl} ${pt}V${y0}H${W - 6}" stroke="#999" fill="none"/>`;
        [0, 0.5, 1].forEach((t) => { g += `<text x="${pl - 4}" y="${y0 - t * ph + 3}" font-size="9" text-anchor="end" fill="#666">${esc(fmtNumber(max * t, {}))}</text>`; });
        if (chart.type === "saeule") vals.forEach((v, i) => { const bh = (Math.max(0, v) / max) * ph; g += `<rect x="${pl + i * bw + bw * 0.18}" y="${y0 - bh}" width="${bw * 0.64}" height="${bh}" fill="${PALETTE[0]}"/>`; });
        else {
          const pts = vals.map((v, i) => `${pl + i * bw + bw / 2},${y0 - (Math.max(0, v) / max) * ph}`);
          g += `<polyline points="${pts.join(" ")}" fill="none" stroke="${PALETTE[1]}" stroke-width="2.4"/>` + pts.map((p) => `<circle cx="${p.split(",")[0]}" cy="${p.split(",")[1]}" r="3.5" fill="${PALETTE[1]}"/>`).join("");
        }
        labels.forEach((l, i) => { g += `<text x="${pl + i * bw + bw / 2}" y="${H - 10}" font-size="${n > 6 ? 8 : 10}" text-anchor="middle" fill="#333">${esc(l.length > 9 ? l.slice(0, 8) + "…" : l)}</text>`; });
      }
      box.innerHTML = `<div class="xl-chart-card"><b>${esc(title)}</b><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(CHARTS[chart.type] + 'diagramm: ' + title)}">${g}</svg></div>`;
    }

    /* ── Ribbon ────────────────────────────────────── */
    const TABS = [["start", "Start"], ["einfuegen", "Einfügen"], ["formeln", "Formeln"], ["daten", "Daten"]];
    function paintTabs() {
      q("#xlTabs").innerHTML = `<button type="button" class="sim-tab" disabled>Datei</button>` + TABS.map(([id, t]) => `<button type="button" class="sim-tab" data-tab="${id}" aria-selected="${id === tab}">${t}</button>`).join("");
      node.querySelectorAll(".sim-tab[data-tab]").forEach((b) => b.onclick = () => { commitIfEditing(); tab = b.dataset.tab; pop = null; refresh(); });
    }
    const btn = (a, label, o = {}) => `<button type="button" class="sim-b xl-b${o.on ? " on" : ""}${o.bold ? " bold" : ""}${o.cls ? " " + o.cls : ""}" data-act="${a}"${o.title ? ` title="${esc(o.title)}"` : ""}>${label}</button>`;
    const grp = (lbl, inner) => `<div class="sim-group"><span class="sim-lbl">${lbl}</span><div class="sim-btns">${inner}</div></div>`;
    function paintRibbon() {
      const f = fmts[actA()] || {}, v = val(actA());
      const al = f.align || (typeof v === "number" ? "right" : "left");
      let html = "";
      if (tab === "start") {
        html = grp("Zwischenablage", btn("copy", "Kopieren") + btn("paste", "Einfügen") + btn("clear", "Löschen"))
          + grp("Schrift", btn("bold", "F", { bold: true, on: !!f.bold }) + btn("fill", "Füllfarbe ▾", { cls: "wide" }))
          + grp("Ausrichtung", btn("align:left", "Links", { on: al === "left" }) + btn("align:center", "Mitte", { on: al === "center" }) + btn("align:right", "Rechts", { on: al === "right" }))
          + grp("Zahl", btn("numfmt", `${NUMFMTS[f.numfmt || "standard"]} ▾`, { cls: "wide" }) + btn("dec+", "+ Dez.") + btn("dec-", "− Dez."))
          + grp("Bearbeiten", btn("auto", "∑ AutoSumme ▾", { cls: "wide" }) + btn("fillmenu", "Ausfüllen ▾", { cls: "wide" }));
      } else if (tab === "einfuegen") {
        html = grp("Diagramme", btn("chart", "Diagramm ▾", { cls: "wide" }) + btn("chartdel", "Diagramm entfernen", { cls: "wide" }));
      } else if (tab === "formeln") {
        html = grp("Funktionsbibliothek", btn("auto", "∑ AutoSumme ▾", { cls: "wide" }) + btn("func", "fx Funktion ▾", { cls: "wide" }));
      } else if (tab === "daten") {
        html = grp("Sortieren", btn("sort-asc", "A → Z aufsteigend", { cls: "wide" }) + btn("sort-desc", "Z → A absteigend", { cls: "wide" }));
      }
      groups.innerHTML = html;
    }

    const chip = (attr, label, on) => `<button type="button" class="sim-chip${on ? " on" : ""}" ${attr}>${label}</button>`;
    function paintPop() {
      if (!pop) { popEl.hidden = true; popEl.innerHTML = ""; return; }
      popEl.hidden = false;
      const f = fmts[actA()] || {};
      let html = "";
      if (pop === "fill") html = `<div class="sim-dtitle">Füllfarbe</div><div class="sim-chips">${Object.entries(FILLS).map(([id, [t, c]]) => chip(`data-fill="${id}"`, `<i class="xl-dot" style="background:${c || "#fff"}"></i>${t}`, (f.fill || "keine") === id)).join("")}</div>`;
      else if (pop === "numfmt") html = `<div class="sim-dtitle">Zahlenformat</div><div class="sim-chips">${Object.entries(NUMFMTS).map(([id, t]) => chip(`data-nf="${id}"`, t, (f.numfmt || "standard") === id)).join("")}</div>`;
      else if (pop === "auto") html = `<div class="sim-dtitle">AutoSumme</div><div class="sim-chips">${Object.entries(AUTOS).map(([id, t]) => chip(`data-auto="${id}"`, t)).join("")}</div>`;
      else if (pop === "fillmenu") html = `<div class="sim-dtitle">Ausfüllen (Formel kopieren)</div><div class="sim-chips">${chip('data-fd="down"', "Nach unten")}${chip('data-fd="right"', "Nach rechts")}</div>`;
      else if (pop === "chart") html = `<div class="sim-dtitle">Diagramm aus dem markierten Bereich</div><div class="sim-chips">${Object.entries(CHARTS).map(([id, t]) => chip(`data-ch="${id}"`, t, chart && chart.type === id)).join("")}</div>`;
      else if (pop === "func") html = `<div class="sim-dtitle">Funktion einfügen</div><div class="sim-chips">${FUNCS.map((n) => chip(`data-fn="${n}"`, n)).join("")}</div>`;
      popEl.innerHTML = html;
      popEl.querySelectorAll("[data-fill]").forEach((b) => b.onclick = () => applyFmt("fill", b.dataset.fill));
      popEl.querySelectorAll("[data-nf]").forEach((b) => b.onclick = () => { selCells().forEach((a) => { const g = fmts[a] = { ...(fmts[a] || {}) }; g.numfmt = b.dataset.nf; delete g.dec; }); pop = null; buzz(6); refresh(); });
      popEl.querySelectorAll("[data-auto]").forEach((b) => b.onclick = () => autoSum(b.dataset.auto));
      popEl.querySelectorAll("[data-fd]").forEach((b) => b.onclick = () => fillRange(b.dataset.fd));
      popEl.querySelectorAll("[data-ch]").forEach((b) => b.onclick = () => makeChart(b.dataset.ch));
      popEl.querySelectorAll("[data-fn]").forEach((b) => b.onclick = () => insertFn(b.dataset.fn));
    }

    /* ── Aktionen ──────────────────────────────────── */
    function applyFmt(prop, value) {
      selCells().forEach((a) => { const g = fmts[a] = { ...(fmts[a] || {}) }; if (value === null || value === "keine") delete g[prop]; else g[prop] = value; });
      pop = null; buzz(6); refresh();
    }
    function bumpDec(d) {
      selCells().forEach((a) => {
        const g = fmts[a] = { ...(fmts[a] || {}) };
        const curDec = g.dec !== undefined ? g.dec : DEC_DEFAULT[g.numfmt || "standard"];
        const v = val(a);
        const base = curDec !== undefined ? curDec : (typeof v === "number" ? (String(+v.toPrecision(10)).split(".")[1] || "").length : 0);
        g.dec = Math.max(0, Math.min(6, base + d));
      });
      buzz(6); refresh();
    }
    function autoSum(fn) {
      const r = rng(), put = (a, c1, r1, c2, r2) => setRaw(a, `=${fn}(${addr(c1, r1)}:${addr(c2, r2)})`);
      let target = null;
      if (isSingle()) {
        const x = r.c1, y = r.r1;
        let y1 = y - 1;
        while (y1 >= 0 && typeof val(addr(x, y1)) === "number") y1--;
        if (y1 < y - 1) { put(addr(x, y), x, y1 + 1, x, y - 1); target = addr(x, y); }
        else {
          let x1 = x - 1;
          while (x1 >= 0 && typeof val(addr(x1, y)) === "number") x1--;
          if (x1 < x - 1) { put(addr(x, y), x1 + 1, y, x - 1, y); target = addr(x, y); }
        }
        if (!target) { pop = null; toast("› Hier stehen keine Zahlen darüber oder links daneben. Markiere die Zahlen selbst."); refresh(); return; }
      } else if (r.r2 > r.r1 || r.c2 === r.c1) {
        if (r.r2 + 1 >= ROWS) { toast("› Unter dem Bereich ist kein Platz."); return; }
        for (let x = r.c1; x <= r.c2; x++) put(addr(x, r.r2 + 1), x, r.r1, x, r.r2);
        target = addr(r.c1, r.r2 + 1);
      } else {
        if (r.c2 + 1 >= COLS) { toast("› Rechts vom Bereich ist kein Platz."); return; }
        put(addr(r.c2 + 1, r.r1), r.c1, r.r1, r.c2, r.r1);
        target = addr(r.c2 + 1, r.r1);
      }
      const p = parseAddr(target); sel = { a: { ...p }, b: { ...p } };
      pop = null; buzz(10); refresh();
    }
    function fillRange(dir) {
      const r = rng();
      if (isSingle()) { toast("› Markiere erst die Zelle mit der Formel und die Zellen, in die sie kopiert werden soll."); return; }
      if (dir === "down") {
        if (r.r2 === r.r1) { toast("› Markiere mehrere Zeilen untereinander."); return; }
        for (let x = r.c1; x <= r.c2; x++) for (let y = r.r1 + 1; y <= r.r2; y++) { const src = cells[addr(x, r.r1)]; if (src === undefined) delete cells[addr(x, y)]; else cells[addr(x, y)] = shiftRaw(src, 0, y - r.r1); fmts[addr(x, y)] = { ...(fmts[addr(x, r.r1)] || {}) }; }
      } else {
        if (r.c2 === r.c1) { toast("› Markiere mehrere Spalten nebeneinander."); return; }
        for (let y = r.r1; y <= r.r2; y++) for (let x = r.c1 + 1; x <= r.c2; x++) { const src = cells[addr(r.c1, y)]; if (src === undefined) delete cells[addr(x, y)]; else cells[addr(x, y)] = shiftRaw(src, x - r.c1, 0); fmts[addr(x, y)] = { ...(fmts[addr(r.c1, y)] || {}) }; }
      }
      dirty(); pop = null; buzz(10); refresh();
    }
    function makeChart(type) {
      const r = rng();
      if (r.c2 === r.c1 || r.r2 === r.r1) { pop = null; toast("› Markiere zuerst die Beschriftungen und die Zahlen (mindestens 2 Spalten und 2 Zeilen), z. B. A1:B6."); refresh(); return; }
      chart = { type, range: addr(r.c1, r.r1) + ":" + addr(r.c1 + 1, r.r2) };
      pop = null; buzz(10); refresh();
      const cb = q("#xlChart"); if (cb && cb.scrollIntoView) cb.scrollIntoView({ block: "nearest", behavior: reduced() ? "auto" : "smooth" });
    }
    function currentRegion() {
      const filled = (x, y) => x >= 0 && y >= 0 && x < COLS && y < ROWS && cells[addr(x, y)] !== undefined;
      let c1 = sel.a.c, c2 = c1, r1 = sel.a.r, r2 = r1, grow = true;
      if (!filled(c1, r1)) return null;
      while (grow) {
        grow = false;
        for (let y = r1 - 1; y <= r2 + 1; y++) { if (filled(c1 - 1, y)) { c1--; grow = true; break; } if (filled(c2 + 1, y)) { c2++; grow = true; break; } }
        for (let x = c1 - 1; x <= c2 + 1; x++) { if (filled(x, r1 - 1)) { r1--; grow = true; break; } if (filled(x, r2 + 1)) { r2++; grow = true; break; } }
      }
      return { c1, r1, c2, r2 };
    }
    function sortData(dir) {
      let r = rng(), key = sel.a.c;
      if (isSingle()) { r = currentRegion(); if (!r) { toast("› Markiere eine Zelle in der Tabelle, nach der sortiert werden soll."); return; } }
      else if (r.c1 === r.c2) { const reg = currentRegion(); if (reg) r = { c1: reg.c1, c2: reg.c2, r1: r.r1, r2: r.r2 }; }   /* Auswahl auf die Nachbarspalten erweitern, damit Zeilen zusammenbleiben */
      let y0 = r.r1;
      const hasHead = (x, y) => typeof val(addr(x, y)) === "string";
      if (y0 < r.r2 && Array.from({ length: r.c2 - r.c1 + 1 }, (_, i) => hasHead(r.c1 + i, y0)).every(Boolean) && Array.from({ length: r.c2 - r.c1 + 1 }, (_, i) => typeof val(addr(r.c1 + i, y0 + 1))).some((t) => t === "number")) y0++;
      if (key < r.c1 || key > r.c2) key = r.c1;
      const rows = [];
      for (let y = y0; y <= r.r2; y++) { const row = []; for (let x = r.c1; x <= r.c2; x++) row.push({ raw: cells[addr(x, y)], f: fmts[addr(x, y)], v: val(addr(x, y)) }); rows.push(row); }
      rows.sort((p, s) => (dir === "desc" ? -1 : 1) * cmpVals(p[key - r.c1].v, s[key - r.c1].v));
      rows.forEach((row, i) => row.forEach((c, j) => { const a = addr(r.c1 + j, y0 + i); if (c.raw === undefined) delete cells[a]; else cells[a] = c.raw; if (c.f) fmts[a] = c.f; else delete fmts[a]; }));
      dirty(); buzz(10); refresh();
    }
    function copy() { const r = rng(); clip = { w: r.c2 - r.c1 + 1, h: r.r2 - r.r1 + 1, c: r.c1, r: r.r1, items: selCells().map((a) => ({ raw: cells[a], f: fmts[a] })) }; toast("› Kopiert: " + selLabel()); }
    function paste() {
      if (!clip) { toast("› Erst Zellen kopieren."); return; }
      const a0 = rng(), dc = a0.c1 - clip.c, dr = a0.r1 - clip.r;
      clip.items.forEach((it, i) => {
        const x = a0.c1 + (i % clip.w), y = a0.r1 + Math.floor(i / clip.w);
        if (x >= COLS || y >= ROWS) return;
        const a = addr(x, y);
        if (it.raw === undefined) delete cells[a]; else cells[a] = shiftRaw(it.raw, dc, dr);
        if (it.f) fmts[a] = { ...it.f }; else delete fmts[a];
      });
      dirty(); buzz(8); refresh();
    }
    function clearSel() { selCells().forEach((a) => delete cells[a]); dirty(); buzz(6); refresh(); }

    /* Eingabe */
    function startEdit() { editing = true; paintBar(); paintStatus(); input.focus(); const n = input.value.length; try { input.setSelectionRange(n, n); } catch { /* egal */ } }
    function commit() {
      if (!editing) return;
      const a = actA(); setRaw(a, input.value); editing = false; input.blur();
      if (sel.a.r + 1 < ROWS) { sel = { a: { c: sel.a.c, r: sel.a.r + 1 }, b: { c: sel.a.c, r: sel.a.r + 1 } }; }
      armed = null; buzz(8); refresh();
    }
    function commitIfEditing() { if (editing) { const a = actA(); setRaw(a, input.value); editing = false; input.blur(); } }
    function cancel() { editing = false; input.blur(); refresh(); }
    function insertAtCaret(txt) {
      if (!editing) { editing = true; paintBar(); }
      input.focus();
      const s = input.selectionStart, e = input.selectionEnd;
      input.setRangeText(txt, s, e, "end");
      input.dispatchEvent(new Event("input"));
    }
    function insertFn(name) {
      pop = null;
      if (!editing) { input.value = "="; editing = true; }
      paintPop(); paintBar(); paintStatus();
      input.focus();
      const s = input.selectionStart;
      input.setRangeText(`${name}(`, s, input.selectionEnd, "end");
      keyHint();
    }
    function toggleAbs() {
      const v = input.value, pos = input.selectionStart;
      const re = /(\$?)([A-Za-z]{1,2})(\$?)(\d+)/g; let m;
      while ((m = re.exec(v))) {
        if (pos >= m.index && pos <= m.index + m[0].length) {
          const st = !m[1] && !m[3] ? [1, 1] : m[1] && m[3] ? [0, 1] : !m[1] && m[3] ? [1, 0] : [0, 0];
          const rep = (st[0] ? "$" : "") + m[2] + (st[1] ? "$" : "") + m[4];
          input.value = v.slice(0, m.index) + rep + v.slice(m.index + m[0].length);
          const np = m.index + rep.length; input.setSelectionRange(np, np); return;
        }
      }
      toast("› Setze den Cursor in einen Zellbezug wie B2 und tippe dann F4.");
    }
    const KEYS = ["=", "(", ")", ";", ":", "+", "-", "*", "/", "^", "&", "%", "$", "<", ">", '"'];
    keysEl.innerHTML = KEYS.map((k) => `<button type="button" class="xl-key" data-k="${esc(k)}">${esc(k)}</button>`).join("") + `<button type="button" class="xl-key f4" data-k="F4">F4 $</button>`;
    keysEl.addEventListener("pointerdown", (e) => e.preventDefault());
    keysEl.addEventListener("click", (e) => { const b = e.target.closest("[data-k]"); if (!b) return; if (b.dataset.k === "F4") toggleAbs(); else insertAtCaret(b.dataset.k); });
    function keyHint() { /* Platz für spätere Hinweise */ }

    function act(a) {
      commitIfEditing();
      if (["fill", "numfmt", "auto", "fillmenu", "chart", "func"].includes(a)) { pop = pop === a ? null : a; refresh(); }
      else if (a === "copy") copy();
      else if (a === "paste") paste();
      else if (a === "clear") clearSel();
      else if (a === "bold") { const on = !(fmts[actA()] || {}).bold; selCells().forEach((c) => { const g = fmts[c] = { ...(fmts[c] || {}) }; if (on) g.bold = true; else delete g.bold; }); buzz(6); refresh(); }
      else if (a.indexOf("align:") === 0) applyFmt("align", a.slice(6));
      else if (a === "dec+") bumpDec(1);
      else if (a === "dec-") bumpDec(-1);
      else if (a === "chartdel") { if (!chart) { toast("› Es gibt kein Diagramm."); return; } chart = null; buzz(8); refresh(); }
      else if (a === "sort-asc") sortData("asc");
      else if (a === "sort-desc") sortData("desc");
    }
    groups.addEventListener("click", (e) => { const b = e.target.closest("[data-act]"); if (b && !b.disabled) { cancelIdle(); act(b.dataset.act); armIdle(); } });

    /* ── Zellen antippen, Bereich ziehen ───────────── */
    const cellOf = (el) => { const td = el && el.closest ? el.closest("[data-a]") : null; return td ? parseAddr(td.dataset.a) : null; };
    sheetEl.addEventListener("mousedown", (e) => { if (editing && /^=/.test(input.value)) e.preventDefault(); });
    sheetEl.addEventListener("click", (e) => {
      const th = e.target.closest("[data-col],[data-row],[data-all]");
      if (th) {
        commitIfEditing(); pop = null;
        if (th.dataset.all) sel = { a: { c: 0, r: 0 }, b: { c: COLS - 1, r: ROWS - 1 } };
        else if (th.dataset.col !== undefined) sel = { a: { c: +th.dataset.col, r: 0 }, b: { c: +th.dataset.col, r: ROWS - 1 } };
        else sel = { a: { c: 0, r: +th.dataset.row }, b: { c: COLS - 1, r: +th.dataset.row } };
        refresh(); return;
      }
      const p = cellOf(e.target);
      if (!p) return;
      if (editing) {
        const v = input.value, pos = input.selectionStart === null ? v.length : input.selectionStart;
        if (v[0] === "=" && (pos === 0 || "=(;+-*/^&<>:".includes(v[pos - 1]))) { insertAtCaret(addr(p.c, p.r)); return; }
        commitIfEditing();
      }
      cancelIdle(); armIdle();
      if (e.shiftKey) sel = { a: sel.a, b: p };
      else if (isSingle() && armed === addr(p.c, p.r) && !pop) { armed = null; startEdit(); return; }
      else { sel = { a: p, b: { ...p } }; armed = addr(p.c, p.r); }
      pop = null; refresh();
    });
    sheetEl.addEventListener("pointerdown", (e) => {
      if (e.target.id === "xlHandle") { e.preventDefault(); drag = true; pt = { x: e.clientX, y: e.clientY }; clearInterval(scrollTimer); scrollTimer = setInterval(edgeScroll, 40); try { e.target.setPointerCapture(e.pointerId); } catch { /* egal */ } buzz(6); }
    });
    let pt = null, scrollTimer = null;
    const dragTo = (x, y) => {
      const p = cellOf(document.elementFromPoint(x, y));
      if (p && (p.c !== sel.b.c || p.r !== sel.b.r)) { sel.b = p; paintSheet(); paintBar(); paintStatus(); paintRibbon(); }
    };
    const onMove = (e) => { if (!drag) return; pt = { x: e.clientX, y: e.clientY }; dragTo(pt.x, pt.y); };
    /* am Rand der Tabelle automatisch weiterrollen, damit man auch entfernte Zellen erreicht */
    const edgeScroll = () => {
      if (!drag || !pt) return;
      const sc = q("#xlScroll"), bb = sc.getBoundingClientRect(), E = 44, V = 14;
      const dx = pt.x > bb.right - E ? V : pt.x < bb.left + E + 38 ? -V : 0, dy = pt.y > bb.bottom - E ? V : pt.y < bb.top + E + 32 ? -V : 0;
      if (dx || dy) { sc.scrollBy(dx, dy); dragTo(pt.x, pt.y); }
    };
    const onUp = () => { if (drag) { drag = false; clearInterval(scrollTimer); refresh(); } };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    input.addEventListener("focus", () => { if (!editing) { editing = true; paintBar(); paintStatus(); } });
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); commit(); } else if (e.key === "Escape") { e.preventDefault(); cancel(); } });
    q("#xlOk").onclick = commit;
    q("#xlNo").onclick = cancel;
    q("#xlOk").addEventListener("pointerdown", (e) => e.preventDefault());
    q("#xlFx").onclick = () => { cancelIdle(); pop = pop === "func" ? null : "func"; refresh(); };

    const onKey = (e) => {
      if (!node.isConnected || editing) return;
      if (e.target && e.target.tagName === "INPUT") return;
      const mv = { ArrowDown: [0, 1], ArrowUp: [0, -1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key];
      if (mv) { e.preventDefault(); const c = Math.max(0, Math.min(COLS - 1, sel.a.c + mv[0])), r = Math.max(0, Math.min(ROWS - 1, sel.a.r + mv[1])); sel = { a: { c, r }, b: { c, r } }; refresh(); }
      else if (e.key === "Delete") clearSel();
      else if (e.key === "F2" || e.key === "Enter") { e.preventDefault(); startEdit(); }
      else if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "C")) { e.preventDefault(); copy(); }
      else if ((e.ctrlKey || e.metaKey) && (e.key === "v" || e.key === "V")) { e.preventDefault(); paste(); }
      else if ((e.ctrlKey || e.metaKey) && (e.key === "b" || e.key === "B")) { e.preventDefault(); act("bold"); }
      else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) { input.value = ""; startEdit(); input.value = e.key; e.preventDefault(); }
    };
    document.addEventListener("keydown", onKey);

    /* ── Aufgabenkarte, Checkliste, Dock ───────────── */
    function paintTask() {
      const box = q("#xlTask");
      if (!guided) {
        box.innerHTML = `<div class="sim-check${checkOpen ? " open" : ""}" id="xlCheckBox">
          <button type="button" class="sim-check-head" id="xlCheckToggle"><span>Checkliste · <b id="xlScore"></b></span><span class="chev">▾</span></button>
          <div class="sim-check-body" id="xlCList"></div></div>`;
        const cb = box.querySelector("#xlCheckBox");
        box.querySelector("#xlCheckToggle").onclick = () => { checkOpen = !checkOpen; cb.classList.toggle("open", checkOpen); };
      } else if (cur >= crit.length) {
        box.innerHTML = `<div class="sim-task done open"><div class="sim-task-head"><span class="n">✓</span><b>Die Tabelle ist fertig.</b></div><div class="sim-task-body"><p>Tippe unten auf „Fertig“.</p></div></div>`;
      } else {
        const c = crit[cur], t = c.task || {};
        box.innerHTML = `<div class="sim-task${taskOpen ? " open" : ""}" id="xlTaskBox">
          <button type="button" class="sim-task-head" id="xlTaskToggle"><span class="n">Aufgabe ${cur + 1}/${crit.length}</span><b>${esc(c.label)}</b><span class="chev">▾</span></button>
          <div class="sim-task-body">
            ${t.wo ? `<p><span class="lbl">Wo?</span> ${esc(t.wo)}</p>` : ""}
            ${t.was ? `<p><span class="lbl">Was?</span> ${esc(t.was)}</p>` : ""}
            ${t.probe ? `<p><span class="lbl">Probe</span> ${esc(t.probe)}</p>` : ""}
          </div></div>`;
        const tb = box.querySelector("#xlTaskBox");
        box.querySelector("#xlTaskToggle").onclick = () => { taskOpen = !taskOpen; tb.classList.toggle("open", taskOpen); };
      }
    }
    function paintChecklist() {
      if (guided) return;
      const list = q("#xlCList");
      if (!list) return;
      list.innerHTML = crit.map((c) => `<div class="row${critOK(c) ? " ok" : ""}"><i>✓</i><span>${esc(c.label)}</span></div>`).join("");
      const sc = q("#xlScore");
      if (sc) sc.textContent = `${passedCount()}/${crit.length}`;
    }
    const statusEl = h(`<span class="sim-status"></span>`);
    function paintDock() {
      if (guided) {
        if (cur >= crit.length) ctx.action(`Fertig ${env.ICON.check}`, () => ctx.finish({ c: crit.length, t: crit.length }), { variant: "good" });
        else ctx.action(`Probe ${env.ICON.check}`, probe);
      } else if (passedCount() >= crit.length) ctx.action(`Fertig ${env.ICON.check}`, () => ctx.finish({ c: passedCount(), t: crit.length }), { variant: "good" });
      else ctx.action(`Prüfen ${env.ICON.check}`, freeCheck);
    }

    /* ── Hinweise ──────────────────────────────────── */
    const OP_TAB = { fmt: "start", chart: "einfuegen", sorted: "daten", formulas: "start" };
    function opBtn(ck) {
      switch (ck.op) {
        case "fmt": return ck.prop === "bold" ? "bold" : ck.prop === "align" ? `align:${ck.value}` : ck.prop === "numfmt" ? "numfmt" : ck.prop === "dec" ? "dec+" : "fill";
        case "chart": return "chart";
        case "sorted": return ck.dir === "desc" ? "sort-desc" : "sort-asc";
        case "formulas": return "fillmenu";
        default: return null;
      }
    }
    const hintCheck = () => (guided && cur < crit.length ? crit[cur].checks.find((ck) => !evalCheck(ck)) || null : null);
    function hintCell() {
      const ck = hintCheck();
      if (!ck) return null;
      const spec = ck.cell || ck.range;
      if (!spec) return null;
      const list = rangeCells(spec);
      return list.find((a) => !evalCheck({ ...ck, cell: a, range: a, value: Array.isArray(ck.value) ? ck.value[list.indexOf(a)] : ck.value })) || list[0] || null;
    }
    function paintHints() {
      node.querySelectorAll(".sim-tab.hint, .xl-b.hint, .xl-input.hint").forEach((el) => el.classList.remove("hint"));
      const ck = hintCheck();
      if (!ck) return;
      const t = crit[cur].task || {};
      const wantTab = t.tab || OP_TAB[ck.op];
      if (wantTab && tab !== wantTab) { const el = node.querySelector(`.sim-tab[data-tab="${wantTab}"]`); if (el) el.classList.add("hint"); return; }
      const b = t.btn || opBtn(ck);
      const el = b && groups.querySelector(`[data-act="${b}"]`);
      if (el) el.classList.add("hint");
      if (["value", "formula", "text"].includes(ck.op)) input.classList.add("hint");
    }

    function refresh() {
      paintTabs(); paintRibbon(); paintPop(); paintSheet(); paintBar(); paintStatus(); paintChart(); paintChecklist(); paintHints();
      if (!guided) {
        ctx.setProgress(passedCount() / crit.length);
        if (passedCount() >= crit.length) { if (give) { give.remove(); give = null; } paintDock(); }
      }
    }
    function probe() {
      commitIfEditing(); refresh();
      const c = crit[cur];
      if (!c) return;
      if (critOK(c)) {
        simMsg("ok", `Passt. ${esc((c.task && c.task.probe) || "")}`);
        buzz(20); cur++; ctx.setProgress(cur / crit.length);
        paintTask(); paintDock(); paintHints(); paintSheet();
      } else {
        simMsg("no", `Noch nicht ganz. ${esc(c.hint || "Schau dir die Tabelle nochmal an.")}`);
        buzz([30, 40, 30]);
      }
    }
    function freeCheck() {
      commitIfEditing(); refresh();
      const n = passedCount(), missing = crit.filter((c) => !critOK(c)).map((c) => c.label);
      simMsg(n === crit.length ? "ok" : "no", n === crit.length ? "Alles richtig. Die Tabelle ist fertig." : `${n} von ${crit.length}. Noch offen: ${esc(missing.join(" · "))}`);
      buzz(n === crit.length ? 20 : [30, 40, 30]);
      ctx.setProgress(n / crit.length);
      if (give) { give.remove(); give = null; }
      if (n < crit.length) { give = h(`<button class="btn ghost">Abgeben · ${n}/${crit.length}</button>`); give.onclick = () => ctx.finish({ c: n, t: crit.length }); ctx.dock.append(give); }
      paintDock();
    }

    let idle = null;
    const cancelIdle = () => { clearTimeout(idle); node.classList.remove("xl-nudge"); };
    const armIdle = () => { clearTimeout(idle); if (guided) idle = setTimeout(() => node.classList.add("xl-nudge"), 12000); };
    node.addEventListener("pointerdown", () => { cancelIdle(); armIdle(); });

    /* ── Einbau ────────────────────────────────────── */
    document.body.classList.add("sim-on", "sim-xls");
    const topbar = ctx.root.querySelector(".player-top");
    topbar.insertBefore(h(`<span class="sim-file"><b>X</b><span>${esc(step.file || "Mappe1.xlsx")} – Excel</span></span>`), topbar.querySelector(".progress"));
    ctx.dock.prepend(statusEl);
    ctx.hintsFor = () => (guided && cur < crit.length ? [crit[cur].hint].filter(Boolean) : step.hints || []);
    ctx.hintKey = () => (guided ? "a" + cur : "frei");
    ctx.body.append(node);
    ctx.setProgress(0);
    paintTask();
    refresh();
    paintDock();
    if (step.intro) simMsg("info", esc(step.intro));
    armIdle();

    return () => {
      document.body.classList.remove("sim-on", "sim-xls");
      timers.forEach(clearTimeout);
      cancelIdle();
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      clearInterval(scrollTimer);
    };
  };

  /* für Tests und Werkzeuge */
  window.LernraumSim.xlsEngine = { makeEngine, shiftRaw, fmtNumber, parseConst };
})();
