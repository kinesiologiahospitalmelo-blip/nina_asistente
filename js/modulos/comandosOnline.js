// ==========================================
// Comandos ONLINE — Nina v2
// ==========================================

import { hablar } from "./voz.js";
import { buscarEnGoogle } from "./buscador.js";

export function manejarComandoOnline(texto) {
  const t = texto.toLowerCase().trim();

  // ---------------- BUSCAR EN GOOGLE ----------------
  if (
    t.startsWith("busca ") ||
    t.startsWith("buscá ") ||
    t.startsWith("buscar ") ||
    t.startsWith("busca en google") ||
    t.includes("google")
  ) {
    let query = t.replace("busca en google", "")
                 .replace("buscar", "")
                 .replace("busca", "")
                 .replace("buscá", "")
                 .replace("google", "")
                 .trim();

    if (query.length === 0) {
      hablar("Decime qué querés que busque en Google.");
      return true;
    }

    buscarEnGoogle(query);
    return true;
  }

  // ---------------- IA (Gemini) — futuro inmediato ----------------
  if (t.includes("pregunta a la inteligencia") || t.includes("ia")) {
    hablar("Pronto voy a poder contestarte con inteligencia artificial.");
    return true;
  }

  return false;
}
