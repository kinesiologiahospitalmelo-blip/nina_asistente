const CACHE = "nina-cache-v3";

const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/nina.css",
  "./js/nina.js",

  "./js/modulos/voz.js",
  "./js/modulos/wakeword.js",
  "./js/modulos/identidadUsuario.js",
  "./js/modulos/comandosOffline.js",
  "./js/modulos/comandosOnline.js",
  "./js/modulos/aprendizaje.js",
  "./js/modulos/buscador.js",
  "./js/modulos/gps.js",
  "./js/modulos/llamadas.js",
  "./js/modulos/ia.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE ? caches.delete(k) : null))
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
