/* Lernraum – Offline-Cache. Netzwerk zuerst, damit neue Inhalte sofort ankommen. */
const CACHE = "lernraum-v34";
const SHELL = ["./", "index.html", "styles.css", "app.js", "content.js", "vendor/qrcode.js", "i18n.js", "theme.js", "search.js", "kurse/pbp-personalbedarf.js", "kurse/gpu-preiskalkulation.js", "kurse/inwi-geschaeftsbrief.js", "kurse/englisch-foerderkurs.js", "kurse/englisch-telephoning.js", "kurse/vw-magisches-sechseck.js", "kurse/materialien.js", "fonts/fonts.css", "fonts/archivo-latin-500-normal.woff2", "fonts/archivo-latin-600-normal.woff2", "fonts/archivo-latin-700-normal.woff2", "fonts/archivo-latin-800-normal.woff2", "fonts/jetbrains-mono-latin-400-normal.woff2", "fonts/jetbrains-mono-latin-500-normal.woff2", "fonts/jetbrains-mono-latin-700-normal.woff2", "manifest.json", "icon.svg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  // Musik/Video und Teilanfragen (Range) nicht anfassen: der Browser lädt sie direkt (sonst Fehler bei 206-Antworten, volle Videos im Cache)
  if (e.request.headers.has("range") || /\.(m4a|mp4|webm)$/i.test(new URL(e.request.url).pathname)) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok && new URL(e.request.url).origin === location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
