/* ============================================================
   LERNRAUM — Themensuche (läuft komplett im Browser)
   Tolerant für Groß-/Kleinschreibung, Umlaute (ü = u), Tippfehler
   (kleiner Abstand) und ein paar Synonyme. Alle Suchwörter müssen passen.
   API: LERNRAUM_SEARCH.score(anfrage, text) → 0 = kein Treffer, sonst Punkte
   ============================================================ */
(function () {
  "use strict";
  const fold = (s) => String(s || "").toLowerCase().replace(/ß/g, "ss").normalize("NFD").replace(/[̀-ͯ]/g, "");
  const words = (s) => fold(s).split(/[^a-z0-9]+/).filter(Boolean);

  // Gruppen gleichbedeutender Wörter (bereits "gefaltet": ohne Umlaute)
  const GROUPS = [
    ["zeitform", "zeitformen", "zeiten", "tense", "tenses", "present", "past", "grammatik"],
    ["klausur", "probeklausur", "pruefung", "prufung", "exam", "test", "arbeit"],
    ["telefon", "telefonieren", "telephoning", "phone", "call", "anruf"],
    ["bedarf", "personalbedarf", "personal", "mitarbeiter", "stellen"],
    ["preis", "preise", "kalkulation", "kosten", "bezug", "bezugskalkulation", "angebot"],
    ["brief", "briefe", "geschaeftsbrief", "letter", "anschreiben", "din", "5008"],
    ["sechseck", "magisches", "wirtschaftsziele", "ziele"],
    ["training", "ueben", "uebung", "ubung", "endlos", "drill", "aufgaben"],
    ["englisch", "english"], ["rechnen", "berechnen", "rechnung", "calc"],
    ["lernkarten", "karten", "vokabeln", "cards", "flashcards"]
  ];
  const SYN = new Map();
  GROUPS.forEach((g) => g.forEach((w) => SYN.set(w, g)));

  // Abstand mit Vertauschungen (Damerau-Levenshtein, einfache Form), höchstens max
  function near(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return false;
    const d = [];
    for (let i = 0; i <= a.length; i++) { d[i] = [i]; }
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
      let v = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, d[i - 2][j - 2] + 1);
      d[i][j] = v;
    }
    return d[a.length][b.length] <= max;
  }
  // Ähnlich zu einem Teil eines (zusammengesetzten) Wortes?
  function nearIn(q, w, max) {
    if (near(q, w, max)) return true;
    for (let len = q.length - 1; len <= q.length + 1; len++)
      for (let i = 0; i + len <= w.length; i++) if (near(q, w.slice(i, i + len), max)) return true;
    return false;
  }

  // Punkte für ein Suchwort gegen die Wörter eines Textes
  function one(q, hw) {
    let best = 0;
    for (const w of hw) {
      if (w === q) return 3;
      if (w.startsWith(q)) best = Math.max(best, 2.5);
      else if (q.length >= 3 && w.includes(q)) best = Math.max(best, 2);
      else if (q.length >= 4 && nearIn(q, w, q.length >= 7 ? 2 : 1)) best = Math.max(best, 1.5);
    }
    if (best) return best;
    const g = SYN.get(q) || (q.length >= 4 && [...SYN.keys()].find((k) => k.startsWith(q)) && SYN.get([...SYN.keys()].find((k) => k.startsWith(q))));
    if (g && g.some((s) => hw.some((w) => w === s || w.startsWith(s)))) return 1.2;
    return 0;
  }

  function score(query, text) {
    const qs = words(query);
    if (!qs.length) return 0;
    const hw = words(text);
    let sum = 0;
    for (const q of qs) { const p = one(q, hw); if (!p) return 0; sum += p; }
    return sum;
  }

  window.LERNRAUM_SEARCH = { score, fold };
})();
