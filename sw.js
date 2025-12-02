const CACHE_NAME = "app-offline-v1";

const URLS_TO_CACHE = [
  "/app_off/",
  "/app_off/index.html",
  "/app_off/style.css",       // cambia a tu archivo real
  "/app_off/script.js",       // cambia a tu archivo real
  "/app_off/icons/icon-192.png",
  "/app_off/icons/icon-512.png"
];

// INSTALACIÓN — guarda los archivos en caché
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// INTERCEPTA REQUESTS — sirve desde cache si no hay internet
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
  );
});
