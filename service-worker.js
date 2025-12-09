self.addEventListener("install", (e) => {
  console.log("SW instalado");
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  console.log("SW activado");
  clients.claim();
});

self.addEventListener("fetch", (event) => {
  // No hacemos cache, solo permitimos que la PWA sea válida
});
