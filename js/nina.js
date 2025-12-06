// js/nina.js
import { procesarWakeWord } from "./modulos/wakeword.js";
import { identificarUsuario } from "./modulos/identidadUsuario.js";
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

let reconocimiento = null;

// -------- inicializar reconocimiento -------
if (SpeechRecognition) {
  reconocimiento = new SpeechRecognition();
  reconocimiento.lang = "es-AR";
  reconocimiento.interimResults = false;
} else {
  estadoVoz.textContent = "Tu navegador no soporta reconocimiento de voz.";
  btnHablar.disabled = true;
}

// -------- botón micrófono --------
btnHablar.addEventListener("click", () => {
  estadoVoz.textContent = "Te escucho…";
  reconocimiento.start();
});

// -------- botones rápidos --------
document.querySelectorAll(".btn-small[data-accion]").forEach(btn => {
  btn.addEventListener("click", () => {
    const accion = btn.getAttribute("data-accion");
    textoUsuario.textContent = "(botón " + accion + ")";
    respuestaRapidaBoton(accion);
  });
});

// -------- buscador --------
prepararBuscador();

// -------- PROCESAR RESULTADO DE VOZ --------
reconocimiento.onresult = (event) => {
  const frase = event.results[0][0].transcript.toLowerCase().trim();
  textoUsuario.textContent = frase;
  registrarFrase(frase);

  // 1) WAKEWORD
  const { textoLimpio, tieneWake } = procesarWakeWord(frase);
  if (tieneWake) {
    hablar("¿Con quién hablo?");
    return;
  }

  // 2) PRIMERO: comandos de llamada (para evitar confusión con identidad)
  if (manejarComandoOffline(frase)) return;

  // 3) Identificación de persona (“soy Mercedes”, “habla Rodrigo”)
  if (identificarUsuario(frase)) return;

  // 4) Predicción inteligente
  const intencion = predecirIntencion(frase);
  if (intencion && manejarComandoOffline(intencion)) return;

  // 5) Comandos online (solo si hay internet)
  if (navigator.onLine && manejarComandoOnline(frase)) return;

  // 6) Fallback
  hablar("No entendí bien. ¿Querés que llame a alguien o te diga la hora?");
};

reconocimiento.onend = () => {
  estadoVoz.textContent = "Tocá el botón para hablar";
};
