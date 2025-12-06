// js/modulos/ia.js
import { hablar } from "./voz.js";

// En el futuro, cuando quieras usar IA (ChatGPT / Gemini), este módulo
// se va a encargar de mandar el texto al modelo y traer la respuesta.

// Ahora no se usa, pero lo dejamos preparado:

export async function responderConIA(textoUsuario) {
  // Ejemplo futuro:
  // const respuesta = await fetch("TU_ENDPOINT_IA", { ... });
  // hablar(respuesta);
  hablar("Más adelante voy a poder contestarte con inteligencia artificial cuando tengamos eso activado.");
}
