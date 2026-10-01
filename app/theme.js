/* ============================================================
   LERNRAUM — Darstellung: Dark Mode + Textgröße
   Wird als erstes Skript im <head> geladen (kein Aufblitzen).
   Speicher: lernraum.theme = "auto" | "light" | "dark"
             lernraum.textsize = "m" | "l" | "xl"
   Setzt data-theme ("light"/"dark") und data-ts am <html>-Element.
   ============================================================ */
(function () {
  "use strict";
  var root = document.documentElement;
  var mq = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : { matches: false };
  function get(k, d) { try { var v = localStorage.getItem("lernraum." + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
  function put(k, v) { try { localStorage.setItem("lernraum." + k, JSON.stringify(v)); } catch (e) { /* privater Modus */ } }
  function mode() { var m = get("theme", "auto"); return m === "dark" || m === "light" ? m : "auto"; }
  function effective() { var m = mode(); return m === "dark" || (m === "auto" && mq.matches) ? "dark" : "light"; }
  function size() { var s = get("textsize", "m"); return s === "l" || s === "xl" ? s : "m"; }
  function apply() {
    var e = effective();
    root.setAttribute("data-theme", e);
    root.setAttribute("data-ts", size());
    root.style.colorScheme = e;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", e === "dark" ? "#141414" : "#FEFEFE");
    try { window.dispatchEvent(new CustomEvent("lernraum-theme", { detail: { theme: e, size: size() } })); } catch (x) { /* alte Browser */ }
  }
  window.LERNRAUM_THEME = {
    mode: mode, effective: effective, size: size,
    set: function (m) { put("theme", m); apply(); },
    setSize: function (s) { put("textsize", s); apply(); },
    cycle: function () { var o = ["auto", "dark", "light"]; this.set(o[(o.indexOf(mode()) + 1) % 3]); }
  };
  apply();
  if (mq.addEventListener) mq.addEventListener("change", function () { if (mode() === "auto") apply(); });
  document.addEventListener("DOMContentLoaded", apply);
})();
