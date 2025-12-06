// NINA ASISTENTE - Service Worker COMPLETO

const CACHE_NAME = "nina-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/css/nina.css",
  "/js/nina.js",

  // módulos
  "/js/modulos/voz.js",
  "/js/modulos/wakeword.js",
  "/js/modulos/comandosOffline.js",
  "/js/modulos/comandosOnline.js",
  "/js/modulos/gps.js",
  "/js/modulos/llamadas.js",
  "/js/modulos/buscador.js",
  "/js/modulos/aprendizaje.js",
  "/js/modulos/ia.js",

  // íconos
  "/icons/icon-72.png",
  "/icons/icon-96.png",
  "/icons/icon-128.png",
  "/icons/icon-144.png",
  "/icons/icon-152.png",
  "/icons/icon-192.png",
  "/icons/icon-384.png",
  "/icons/icon-512.png"
];

// INSTALACIÓN
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Instalando y cacheando archivos...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// ACTIVACIÓN
self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activo y limpiando viejos caches...");

  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});

// RESPUESTAS CACHE-FIRST
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((resp) => resp || fetch(event.request))
  );
});
