// Offline-Cache: App-Dateien zuerst aus dem Cache, Produktdaten immer frisch aus dem Netz.
const CACHE = "kalorienbuch-v4";
const FILES = ["./", "index.html", "style.css", "app.js", "vendor/html5-qrcode.min.js", "manifest.webmanifest",
  "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (url.hostname.endsWith("openfoodfacts.org")) return;
  // Eigene Dateien: Netz zuerst und am Browser-Cache vorbei (GitHub Pages cacht 10 Minuten), sonst Offline-Kopie
  if (url.origin === location.origin) {
    e.respondWith(fetch(e.request, { cache: "no-cache" }).then(r => {
      const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true })));
    return;
  }
  // Schriften: Cache zuerst
  if (url.hostname.includes("fonts.g")) {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
      const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r;
    })));
  }
});
