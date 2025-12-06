// ==========================================
// IA (Gemini Ready) — Nina v2
// ==========================================

import { hablar } from "./voz.js";

// En el futuro:
// Agregar tu API Key de Gemini
// const API_KEY = "TU_API_KEY_AQUÍ";

export async function responderConIA(textoUsuario) {
  // Si no hay internet, salimos
  if (!navigator.onLine) {
    hablar("No tengo conexión para consultar la inteligencia artificial.");
    return;
  }

  // Código listo para activar Gemini (desactivado por ahora):
  /*
  const respuesta = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + API_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: textoUsuario }] }]
    })
  });

  const data = await respuesta.json();
  const textoIA = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (textoIA) {
    hablar(textoIA);
    return;
  }
  */

  // Respuesta por defecto hasta activar Gemini
  hablar("Pronto voy a poder responder usando inteligencia artificial, Mercedes.");
}
