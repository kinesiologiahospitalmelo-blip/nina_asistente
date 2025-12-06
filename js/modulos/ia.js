import { hablar } from "./voz.js";

// URL del Worker Cloudflare
const WORKER_URL = "https://plain-morning-23f8.direccion-deporte-lanus.workers.dev/gemini";

export async function responderConIA(pregunta, contexto = "") {
  try {
    const body = {
      contents: [
        {
          parts: [
            {
              text: `Contexto: ${contexto}\nPregunta: ${pregunta}`
            }
          ]
        }
      ]
    };

    const resp = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      hablar("La IA no pudo responder en este momento.");
      return;
    }

    const data = await resp.json();

    if (!data || !data.candidates || !data.candidates[0].content) {
      hablar("La IA no entendió la pregunta.");
      return;
    }

    const texto = data.candidates[0].content.parts[0].text.trim();
    hablar(texto);
    return texto;

  } catch (err) {
    console.error("Error IA:", err);
    hablar("Hubo un problema conectando la inteligencia artificial.");
  }
}
