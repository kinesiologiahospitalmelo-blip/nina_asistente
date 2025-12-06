// js/modulos/comandosOnline.js
import { hablar } from "./voz.js";
import { buscarEnGoogle } from "./buscador.js";

// Devuelve true si manejó el comando
export function manejarComandoOnline(texto) {
  const t = texto.toLowerCase().trim();

  // Buscar en Google
  if (t.startsWith("busca") || t.startsWith("buscá") || t.startsWith("busca en google")) {
    // Ej: "busca en google recetas de pollo"
    const partes = t.split("google");
    const query = partes[1] ? partes[1].trim() : t.replace("busca", "").replace("buscá", "").trim();
    if (query.length === 0) {
      hablar("Decime qué querés que busque, por ejemplo, buscá en Google ejercicios de memoria.");
      return true;
    }
    buscarEnGoogle(query);
    return true;
  }

  // En el futuro: otros comandos online: clima, direcciones, etc.

  return false;
}
