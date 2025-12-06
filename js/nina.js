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

// --- init reconocimiento de voz ---
if (SpeechRecognition) {
  reconocimiento = new SpeechRecognition();
  reconocimiento.lang = "es-AR";
  reconocimiento.interimResults = false;
} else {
  if (estadoVoz) estadoVoz.textContent = "Tu navegador no soporta voz.";
  if (btnHablar) btnHablar.disabled = true;
}

// --- botón micrófono ---
if (btnHablar && reconocimiento) {
  btnHablar.addEventListener("click", () => {
    estadoVoz.textContent = "Te escucho…";
    reconocimiento.start();
  });
}

// --- botones rápidos offline ---
document.querySelectorAll(".btn-small[data-accion]").forEach(btn => {
  btn.addEventListener("click", () => {
    const accion = btn.getAttribute("data-accion");
    textoUsuario.textContent = `(botón ${accion})`;
    respuestaRapidaBoton(accion);
  });
});

// --- buscador Google ---
prepararBuscador();

// --- resultado de voz ---
if (reconocimiento) {
  reconocimiento.onresult = (event) => {
    const frase = event.results[0][0].transcript.toLowerCase().trim();
    textoUsuario.textContent = frase;
    registrarFrase(frase);

    // 1) Wakeword: “nina”, “hola nina”
    const { textoLimpio, tieneWake } = procesarWakeWord(frase);

    if (tieneWake) {
      // La despertaste: pregunta quién habla
      hablar("¿Con quién hablo?");
      return;
    }

    // 2) Identidad (soy mercedes, soy rodrigo, etc.)
    if (identificarUsuario(frase)) {
      return;
    }

    // 3) Predicción simple offline
    const intencion = predecirIntencion(frase);
    if (intencion && manejarComandoOffline(intencion)) return;

    // 4) Intento offline normal
    if (manejarComandoOffline(frase)) return;

    // 5) Intento online
    if (navigator.onLine && manejarComandoOnline(frase)) return;

    // 6) Fallback
    hablar("No entendí bien. Probá preguntarme la hora, el día o pedime que llame a alguien.");
  };

  reconocimiento.onend = () => {
    if (estadoVoz) estadoVoz.textContent = "Tocá el botón para hablar";
  };
}
