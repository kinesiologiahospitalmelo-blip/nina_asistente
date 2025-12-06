// ==========================================
// Service Worker — Nina v2
// ==========================================

const CACHE_NAME = "nina-cache-v2";
const URLS_TO_CACHE = [
  "/nina_asistente/",
  "/nina_asistente/index.html",
  "/nina_asistente/css/nina.css",
  "/nina_asistente/js/nina.js",
  "/nina_asistente/js/listenerContinuo.js",

  "/nina_asistente/js/modulos/wakeword.js",
  "/nina_asistente/js/modulos/voz.js",
  "/nina_asistente/js/modulos/identidadUsuario.js",
  "/nina_asistente/js/modulos/comandosOffline.js",
  "/nina_asistente/js/modulos/comandosOnline.js",
  "/nina_asistente/js/modulos/aprendizaje.js",
  "/nina_asistente/js/modulos/buscador.js",
  "/nina_asistente/js/modulos/gps.js",
  "/nina_asistente/js/modulos/llamadas.js",
  "/nina_asistente/js/modulos/ia.js"
];

// Instalación: cache inicial
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activación: limpia caches viejos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      )
    )
  );
});

// Fetch: usa caché cuando no hay internet
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
