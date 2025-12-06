// ==========================================
// Buscador — Nina v2
// ==========================================

import { hablar } from "./voz.js";

export function prepararBuscador() {
  const input = document.getElementById("googleTexto");
  const btn = document.getElementById("googleBtn");

  if (!input || !btn) return;

  btn.addEventListener("click", () => {
    const texto = input.value.trim();
    if (!texto) {
      hablar("Decime qué querés buscar en Google.");
      return;
    }
    buscarEnGoogle(texto);
  });
}

export function buscarEnGoogle(query) {
  if (!navigator.onLine) {
    hablar("No hay conexión a internet, no puedo buscar en Google.");
    return;
  }

  hablar(`Buscando ${query} en Google...`);
  const url = "https://www.google.com/search?q=" + encodeURIComponent(query);
  window.open(url, "_blank");
}
