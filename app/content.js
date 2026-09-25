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

window.LERNRAUM = {
  school: "Hans-Böckler-Berufskolleg",
  // Öffentliche Adresse der App – für QR-Codes, wenn die App als Einzeldatei läuft
  publicUrl: "https://lernen.yannikbrand.eu/app/",
  // Basis für "link"-Schritte und Materialsammlungen: dort liegen die bestehenden Materialien
  materialBase: "https://lernen.yannikbrand.eu/",
  // Anzeigenamen für Fächer auf der Startseite (Kürzel → Name)
  faecher: {
    PBP: "Personalbezogene Prozesse",
    GPU: "Geschäftsprozesse im Unternehmen"
  },
  subjects: []
};
