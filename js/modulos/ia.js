// js/modulos/ia.js
import { hablar } from "./voz.js";

const API_KEY = "PONER_ACA_TU_API_KEY_DE_GEMINI";

export async function responderConIA(pregunta, contexto = "") {
  if (!API_KEY || API_KEY === "PONER_ACA_TU_API_KEY_DE_GEMINI") {
    hablar("No tengo activada la inteligencia artificial todavía.");
    return;
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const body = {
      contents: [{
        parts: [{
          text: `Contexto del usuario: ${contexto}\nPregunta: ${pregunta}`
        }]
      }]
    };

    const respuesta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await respuesta.json();

    if (!data || !data.candidates) {
      hablar("La IA no pudo responder.");
      return;
    }

    const texto = data.candidates[0].content.parts[0].text;

    hablar(texto);
    return texto;

  } catch (e) {
    console.error(e);
    hablar("Hubo un problema con la inteligencia artificial.");
  }
}
