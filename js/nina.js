import { procesarWakeWord } from "./modulos/wakeword.js";
import { identificarUsuario, saludarNombre } from "./modulos/identidadUsuario.js";
import { hablar } from "./modulos/voz.js";
import { manejarComandoOffline, respuestaRapidaBoton } from "./modulos/comandosOffline.js";
import { manejarComandoOnline } from "./modulos/comandosOnline.js";
import { registrarFrase, predecirIntencion } from "./modulos/aprendizaje.js";
import { prepararBuscador } from "./modulos/buscador.js";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;

const btnHablar = document.getElementById("btnHablar");
const estadoVoz = document.getElementById("estadoVoz");
const textoUsuario = document.getElementById("textoUsuario");
const textoNina = document.getElementById("textoNina");

// -------- Reconocimiento --------
let reconocimiento = null;

if (SpeechRecognition) {
  reconocimiento = new SpeechRecognition();
  reconocimiento.lang = "es-AR";
  reconocimiento.interimResults = false;
} else {
  estadoVoz.textContent = "Tu navegador no soporta reconocimiento de voz.";
  btnHablar.disabled = true;
}

// -------- Botón micrófono --------
btnHablar.addEventListener("click", () => {
  if (!reconocimiento) return;
  estadoVoz.textContent = "Te escucho...";
  reconocimiento.start();
});

// -------- Botones offline --------
document.querySelectorAll(".btn-small[data-accion]").forEach(btn => {
  btn.addEventListener("click", () => {
    const accion = btn.getAttribute("data-accion");
    respuestaRapidaBoton(accion);
  });
});

// -------- Buscador --------
prepararBuscador();

// -------- Procesar voz --------
reconocimiento.onresult = (event) => {
  const frase = event.results[0][0].transcript.toLowerCase().trim();
  textoUsuario.textContent = frase;

  registrarFrase(frase);

  // --- Wakeword ---
  const { textoLimpio, tieneWake } = procesarWakeWord(frase);

  if (tieneWake) {
    hablar("¿Con quién hablo?");
    return;
  }

  // --- Identificación ---
  if (identificarUsuario(frase)) return;

  // --- Intenciones offline ---
  const intencion = predecirIntencion(frase);
  if (intencion && manejarComandoOffline(intencion)) return;

  if (manejarComandoOffline(frase)) return;

  // --- Comandos online ---
  if (navigator.onLine && manejarComandoOnline(frase)) return;

  hablar("No entendí bien. Probá preguntarme la hora o el día.");
};

reconocimiento.onend = () => {
  estadoVoz.textContent = "Tocá el botón para hablar";
};
