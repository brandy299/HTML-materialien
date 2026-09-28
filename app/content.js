/* ============================================================
   LERNRAUM — BASIS (Einstellungen + Helfer)
   Die Kurse selbst liegen in app/kurse/*.js und werden in index.html geladen.
   ------------------------------------------------------------
   Aufbau:  Fach (Kurs) → Themen → Schritte

   Schritt-Typen:
     slides     Präsentation zum Durchwischen
     quiz       Multiple Choice (eine richtige Antwort)
     sort       Karten in Kategorien einsortieren
     cloze      Lückentext mit Wortbank (Lücken in {geschweiften Klammern})
     calc       Rechenschema mit Zahlenfeld
     cards      Karteikarten (Vorderseite / Rückseite)
     selfcheck  Kann-Liste zur Selbsteinschätzung
     word       Word-Simulation: Dokument formatieren (geführt oder frei)
     link       bestehendes HTML-Material öffnen

   Anleitung mit Beispielen: app/README.md
   ============================================================ */

/* Rechenschema als Folien-Tabelle. Werte leer lassen = Blanko-Schema. */
function schema(v = []) {
  const rows = [
    ["Ist-Personalbestand am Jahresanfang", v[0]],
    ["− voraussichtliche Abgänge", v[1]],
    ["+ erwartete Zugänge", v[2]],
    ["= Zwischensumme", v[3], "sum"],
    ["Soll-Personalbestand", v[4]],
    ["= erforderlicher Personalbedarf", v[5], "sum"]
  ];
  return `<table class="scheme">${rows.map(([l, x, c]) =>
    `<tr class="${c || ""}"><td>${l}</td><td>${x ?? "____"}</td></tr>`).join("")}</table>`;
}

/* ── Diagramm-Bausteine für Folien und Merkkästen (Creative Director) ──
   Werden im Lernraum-Design gezeichnet – bitte keine eigenen Grafiken bauen.
   Beispiele: app/README.md → „Grafiken“. */
const _e = (x) => String(x ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* Zeitstrahl: Vergangenheit → jetzt → Zukunft.
   zeitstrahl([{ at: 20, label: "yesterday", text: "Harry played" },
               { at: 50, label: "now", text: "Harry is playing", hi: true, from: 42, to: 58 }],
              { title: "Zeitstrahl", now: 50, axis: ["Vergangenheit", "jetzt", "Zukunft"] })
   at/from/to = Position 0–100. hi = pink hervorgehoben. from/to = Zeitraum als Balken.
   also: [10, 30, 70] = weitere Punkte ohne Karte (z. B. Gewohnheit „every Saturday“). */
function zeitstrahl(marks = [], opts = {}) {
  const now = opts.now ?? 50;
  const axis = opts.axis || ["Vergangenheit", "jetzt", "Zukunft"];
  const ms = [...marks].sort((a, b) => a.at - b.at);
  // Karten abwechselnd auf Reihen verteilen, wenn sie sich zu nahe kommen
  // geschätzte Kartenbreite in % (Handy ≈ 320 px Breite) → Karten, die sich überlappen würden, in eine neue Reihe
  const span = (m) => {
    const w = Math.min(58, (Math.max(String(m.text).length * 7.4, String(m.label || "").length * 7.2) + 24) / 3.2);
    return m.at < 22 ? [0, w] : m.at > 78 ? [100 - w, 100] : [m.at - w / 2, m.at + w / 2];
  };
  const rows = [];
  ms.forEach((m) => { const [l, r] = span(m); let k = 0; while (rows[k] !== undefined && l < rows[k] + 2) k++; rows[k] = r; m._row = k; });
  const nRows = Math.max(1, rows.length);
  const pos = (at) => `left:${Math.max(0, Math.min(100, at))}%`;
  const card = (m) => {
    const bottom = 34 + (nRows - 1 - m._row) * 62 + 14;
    const side = m.at < 22 ? "left:0" : m.at > 78 ? "right:0" : `left:${m.at}%;transform:translateX(-50%)`;
    return `<div class="dt-stem" style="${pos(m.at)};bottom:29px;height:${bottom - 29}px"></div>
      <div class="dt-card ${m.hi ? "hi" : ""}" style="${side};bottom:${bottom}px">${m.label ? `<b>${_e(m.label)}</b>` : ""}<span>${_e(m.text)}</span></div>`;
  };
  return `<figure class="dia dia-time">${opts.title ? `<figcaption class="dia-cap">${_e(opts.title)}</figcaption>` : ""}
    <div class="dt-stage" style="--rows:${nRows}" role="img" aria-label="${_e(ms.map((m) => `${m.label || ""} ${m.text}`).join(" · "))}">
      <div class="dt-line"></div><div class="dt-now" style="${pos(now)}"></div>
      ${ms.filter((m) => m.from != null && m.to != null).map((m) => `<div class="dt-span" style="left:${m.from}%;width:${m.to - m.from}%"></div>`).join("")}
      ${ms.map((m) => (m.also || []).map((x) => `<div class="dt-dot rep" style="${pos(x)}"></div>`).join("") + `<div class="dt-dot ${m.hi ? "hi" : ""}" style="${pos(m.at)}"></div>${card(m)}`).join("")}
      <div class="dt-axis"><span style="left:0">${_e(axis[0])}</span><span style="left:${now}%;transform:translateX(-50%)">${_e(axis[1])}</span><span style="right:0">${_e(axis[2])}</span></div>
    </div></figure>`;
}

/* Ablauf / Rechenkette von oben nach unten.
   ablauf([{ text: "Listeneinkaufspreis", value: "1.000,00 €" },
           { op: "− Liefererrabatt", value: "10 %", note: "vom Listenpreis" },
           { text: "Zieleinkaufspreis", value: "900,00 €", hi: true }], { title: "Bezugskalkulation" })
   Einträge mit text = Kasten, mit op = Pfeil mit Rechenschritt. hi = pink, sub = grau (Zwischenergebnis). */
function ablauf(items = [], opts = {}) {
  const val = (v) => (v != null && v !== "" ? `<span class="df-val">${_e(v)}</span>` : "");
  return `<figure class="dia dia-flow">${opts.title ? `<figcaption class="dia-cap">${_e(opts.title)}</figcaption>` : ""}${items.map((it) => it.op != null
    ? `<div class="df-op"><span class="df-chip">${_e(it.op)}${val(it.value)}</span>${it.note ? `<span class="df-note">${_e(it.note)}</span>` : ""}</div>`
    : `<div class="df-node ${it.hi ? "hi" : ""} ${it.sub ? "sub" : ""}"><span>${_e(it.text)}</span>${val(it.value)}</div>`).join("")}</figure>`;
}

/* Standard-Zeilen für den Aufgabentyp "calc" (Personalbedarf) */
function bedarfRows(ist, ab, zu, soll, opts = {}) {
  const zw = ist - ab + zu;
  const L = opts.klausur
    ? ["Ist-Personalbestand", "− Abgänge", "+ Zugänge", "= fortgeschriebener Ist-Bestand", "Soll-Bestand (Bruttopersonalbedarf)", "= Nettopersonalbedarf"]
    : ["Ist-Personalbestand am Jahresanfang", "− voraussichtliche Abgänge", "+ erwartete Zugänge", "= Zwischensumme", "Soll-Personalbestand", "= erforderlicher Personalbedarf"];
  const rows = [
    { label: L[0], value: ist },
    { label: L[1], value: ab, either: true },
    { label: L[2], value: zu },
    { label: L[3], value: zw, sum: true },
    { label: L[4], value: soll },
    { label: L[5], value: soll - zw, sum: true, signed: true }
  ];
  if (opts.split) {
    rows.push({ label: "Ersatzbedarf (Abgänge − Zugänge)", value: ab - zu, sep: true });
    rows.push({ label: "Neubedarf (Soll − ursprünglicher Ist)", value: soll - ist });
  }
  return rows;
}

/* Rechenschema + gestufte Tipps aus den Zahlen des Falls */
function bedarf(ist, ab, zu, soll, opts = {}) {
  const zw = ist - ab + zu, nb = soll - zw;
  const sig = (v) => (v > 0 ? "+ " + v : v < 0 ? "− " + Math.abs(v) : "0");
  const hints = [
    "Übertrage zuerst die Zahlen aus dem Fall: <b>Ist-Bestand</b>, <b>Abgänge</b>, <b>Zugänge</b> und <b>Soll</b>. Zähle die Namen – jede Person ist 1.",
    `Zwischensumme: Vom Ist-Bestand ziehst du die Abgänge ab und zählst die Zugänge dazu.<br><b>${ist} − ${ab} + ${zu} = ?</b>`,
    `Personalbedarf: <b>Soll minus Zwischensumme</b> – nicht andersherum! Achte auf das Vorzeichen.<br><b>${soll} − ${zw} = ?</b>`
  ];
  if (opts.split) hints.push(`Ersatzbedarf = Abgänge − Zugänge = <b>${ab} − ${zu}</b>.<br>Neubedarf = Soll − ursprünglicher Ist = <b>${soll} − ${ist}</b>.`);
  hints.push(`Lösungsweg: ${ist} − ${ab} + ${zu} = <b>${zw}</b> → ${soll} − ${zw} = <b>${sig(nb)}</b>` +
    (opts.split ? ` → Ersatz ${ab - zu} + Neu ${soll - ist} = ${sig(nb)}` : "") +
    `<br>${nb > 0 ? "Positiv: Es muss eingestellt werden." : nb < 0 ? "Negativ: Es sind zu viele da." : "Null: Es passt genau."}`);
  return { rows: bedarfRows(ist, ab, zu, soll, opts), hints };
}

/* ── Übersetzbare Texte eines Kurses (für app.js und app/tools/texte.js) ──
   mapTexts(subject, fn) liefert eine Kopie, in der jeder übersetzbare Text x durch fn(x) ersetzt ist.
   Nicht übersetzt werden: ids, Zahlen, Lösungsindizes, Word-Simulation (Prüfkriterien vergleichen Text),
   Übungsklausuren (wie die echte Prüfung: Deutsch) und Links. */
function mapTexts(subject, fn) {
  const T = (x) => (typeof x === "string" && x.trim() ? fn(x) : x);
  const TL = (a) => (Array.isArray(a) ? a.map(T) : a);
  const common = (o) => { ["title", "kicker", "case", "prompt", "explain", "result", "hint", "text"].forEach((k) => { if (k in o) o[k] = T(o[k]); }); if (o.hints) o.hints = TL(o.hints); };
  const step = (st0) => {
    const st = { ...st0 };
    if (st.type === "word" || st.type === "link") { st.title = T(st.title); return st; }
    common(st);
    if (st.distractors) st.distractors = TL(st.distractors);
    if (st.slides) st.slides = st.slides.map((x) => ({ ...x, kicker: T(x.kicker), title: T(x.title), body: T(x.body), big: T(x.big) }));
    if (st.questions) st.questions = st.questions.map((q) => ({ ...q, q: T(q.q), options: TL(q.options), explain: T(q.explain), hint: T(q.hint), hints: TL(q.hints) }));
    if (st.categories) st.categories = TL(st.categories);
    if (st.items) st.items = st.items.map((it) => (typeof it === "string" ? T(it) : { ...it, text: T(it.text) }));
    if (st.rows) st.rows = st.rows.map((r) => ({ ...r, label: T(r.label) }));
    if (st.cards) st.cards = st.cards.map((c) => ({ ...c, front: T(c.front), back: T(c.back) }));
    return st;
  };
  return {
    ...subject,
    description: T(subject.description),
    topics: subject.topics.map((t0) => {
      if (t0.exam || subject.materials) return t0;
      const t = { ...t0, title: T(t0.title), kicker: T(t0.kicker), group: T(t0.group), help: T(t0.help), description: T(t0.description) };
      t.steps = (t0.steps || []).map(step);
      return t;
    })
  };
}

window.LERNRAUM = {
  school: "Hans-Böckler-Berufskolleg",
  // Öffentliche Adresse der App – für QR-Codes, wenn die App als Einzeldatei läuft
  publicUrl: "https://lernen.yannikbrand.eu/app/",
  // Basis für "link"-Schritte und Materialsammlungen: dort liegen die bestehenden Materialien
  materialBase: "https://lernen.yannikbrand.eu/",
  // Anzeigenamen für Fächer auf der Startseite (Kürzel → Name)
  faecher: {
    PBP: "Personalbezogene Prozesse",
    GPU: "Geschäftsprozesse im Unternehmen",
    INWI: "Informationswirtschaft",
    Englisch: "Englisch"
  },
  subjects: [],
  // Übersetzungen der Kursinhalte: app/uebersetzungen/<kurs-id>.<sprache>.js (siehe app/AGENT-ANLEITUNG.md)
  translations: []
};
