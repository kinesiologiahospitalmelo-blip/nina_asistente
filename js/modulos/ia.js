// js/modulos/ia.js
import { hablar } from "./voz.js";

const API_KEY = "AIzaSyCBmGcrSH1F4Dr7qzLWPWFPbqjcUd2_LGI";

export async function responderConIA(pregunta, contexto = "") {
  if (!API_KEY) {
    hablar("La inteligencia artificial no está configurada.");
    return;
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateText?key=${API_KEY}`;

    const body = {
      model: "gemini-1.5-flash",
      prompt: {
        text: `Contexto:\n${contexto}\n\nPregunta del usuario:\n${pregunta}`
      }
    };

    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await respuesta.json();

    if (!data || !data.candidates || !data.candidates[0].outputText) {
      console.error("DATA IA:", data);
      hablar("No pude obtener respuesta de la IA.");
      return;
    }

    const texto = data.candidates[0].outputText;
    hablar(texto);
    return texto;

  } catch (e) {
    console.error("IA ERROR:", e);
    hablar("La IA tuvo un problema para conectarse.");
  }
}
