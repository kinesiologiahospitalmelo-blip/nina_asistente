// NINA ASISTENTE - Service Worker FINAL

const CACHE_NAME = "nina-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",

  // Estilos
  "/css/nina.css",

  // Archivos JS principales
  "/js/nina.js",

  // Módulos
  "/js/modulos/voz.js",
  "/js/modulos/wakeword.js",
  "/js/modulos/comandosOffline.js",
  "/js/modulos/comandosOnline.js",
  "/js/modulos/gps.js",
  "/js/modulos/llamadas.js",
  "/js/modulos/buscador.js",
  "/js/modulos/aprendizaje.js",
  "/js/modulos/ia.js",

  // Iconos
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
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// ACTIVACIÓN
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// FETCH
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp || fetch(event.request))
  );
});
