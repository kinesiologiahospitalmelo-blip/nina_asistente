// js/nina.js
import { hablar } from "./modulos/voz.js";
import { procesarWakeWord } from "./modulos/wakeword.js";
import { identificarUsuario } from "./modulos/identidadUsuario.js";
import { manejarComandoOffline, respuestaRapidaBoton } from "./modulos/comandosOffline.js";
import { manejarComandoOnline } from "./modulos/comandosOnline.js";
import { registrarFrase, predecirIntencion } from "./modulos/aprendizaje.js";
import { prepararBuscador } from "./modulos/buscador.js";

// ====== ELEMENTOS HTML CORRECTOS ======
const btnHablar = document.getElementById("btnHablar");
const estadoVoz = document.getElementById("estadoVoz");
const textoUsuario = document.getElementById("textoUsuario");
const textoNina = document.getElementById("textoNina");

// ====== VERIFICAR SOPORTE ======
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;

let recognizer = null;

if (!SpeechRecognition) {
  estadoVoz.textContent = "Este dispositivo no soporta reconocimiento de voz.";
  btnHablar.disabled = true;
} else {
  recognizer = new SpeechRecognition();
  recognizer.lang = "es-AR";
  recognizer.interimResults = false;
}

// ====== BOTONES RÁPIDOS ======
document.querySelectorAll(".btn-small[data-accion]").forEach(btn => {
  btn.addEventListener("click", () => {
    const accion = btn.getAttribute("data-accion");
    textoUsuario.textContent = "(botón " + accion + ")";
    respuestaRapidaBoton(accion);
  });
});

prepararBuscador();

// ====== EVENTOS DEL RECO ======
if (recognizer) {
  recognizer.onstart = () => {
    estadoVoz.textContent = "Te escucho…";
    btnHablar.classList.add("listening");
  };

  recognizer.onend = () => {
    estadoVoz.textContent = "Micrófono listo";
    btnHablar.classList.remove("listening");
  };

  recognizer.onerror = () => {
    estadoVoz.textContent = "Hubo un error con el micrófono.";
  };

  recognizer.onresult = (event) => {
    const frase = event.results[0][0].transcript.toLowerCase().trim();
    textoUsuario.textContent = frase;
    registrarFrase(frase);
    procesarEntrada(frase);
  };
}

// ====== BOTÓN HABLAR ======
btnHablar.addEventListener("click", () => {
  recognizer.start();
});

// ====== LÓGICA PRINCIPAL ======
function procesarEntrada(frase) {

  // 1) WAKE WORD
  const { textoLimpio, tieneWake } = procesarWakeWord(frase);
  if (tieneWake) {
    hablar("¿Con quién hablo?");
    return;
  }

  // 2) IDENTIDAD
  if (identificarUsuario(frase)) return;

  // 3) COMANDOS OFFLINE (incluye llamadas)
  if (manejarComandoOffline(frase)) return;

  // 4) APRENDIZAJE
  const intencion = predecirIntencion(frase);
  if (intencion && manejarComandoOffline(intencion)) return;

  // 5) ONLINE (si hay internet)
  if (navigator.onLine && manejarComandoOnline(frase)) return;

  // 6) FALLBACK
  hablar("No entendí. ¿Querés que llame a alguien o te diga la hora?");
}
