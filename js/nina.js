import { hablar } from "./modulos/voz.js";
import { procesarWakeWord } from "./modulos/wakeword.js";
import { manejarComandoOffline, respuestaRapidaBoton } from "./modulos/comandosoffline.js";
import { manejarComandoOnline } from "./modulos/comandosonline.js";
import { registrarFrase, predecirIntencion, sugerenciaDiaria } from "./modulos/aprendizaje.js";
import { prepararBuscador } from "./modulos/buscador.js";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

const statusEl = document.getElementById("status");
const micBtn = document.getElementById("micBtn");
const textoUsuarioEl = document.getElementById("textoUsuario");
const textoNinaEl = document.getElementById("textoNina");

let recognizer = null;
let escuchando = false;

prepararBuscador();

document.querySelectorAll(".small-btn[data-accion]").forEach(btn => {
  btn.addEventListener("click", () => {
    const accion = btn.getAttribute("data-accion");
    textoUsuarioEl.textContent = "(botón " + accion + ")";
    respuestaRapidaBoton(accion);
  });
});

/// ===== RECONOCIMIENTO DE VOZ ===== ///
if (!SpeechRecognition) {
  statusEl.textContent = "Tu navegador no soporta reconocimiento por voz.";
  micBtn.disabled = true;
} else {
  recognizer = new SpeechRecognition();
  recognizer.lang = "es-AR";
  recognizer.interimResults = false;

  recognizer.onstart = () => {
    escuchando = true;
    micBtn.classList.add("listening");
    statusEl.textContent = "Te escucho…";
  };

  recognizer.onend = () => {
    escuchando = false;
    micBtn.classList.remove("listening");
    statusEl.textContent = "Listo. Tocá si querés hablar de nuevo.";
  };

  recognizer.onerror = (e) => {
    statusEl.textContent = "Error escuchando. Probá otra vez.";
  };

  recognizer.onresult = (event) => {
    const frase = event.results[0][0].transcript;
    textoUsuarioEl.textContent = frase;
    procesarEntrada(frase);
  };

  micBtn.disabled = false;
}

micBtn.addEventListener("click", () => {
  if (!navigator.onLine) {
    statusEl.textContent = "Sin internet: la voz no funciona.";
    return;
  }
  if (!escuchando) recognizer.start();
  else recognizer.stop();
});

/// ===== PROCESAR ENTRADA POR VOZ ===== ///
function procesarEntrada(fraseRaw) {
  const frase = fraseRaw.toLowerCase().trim();
  const { textoLimpio, tieneWake } = procesarWakeWord(frase);

  registrarFrase(frase); // aprendizaje

  if (!tieneWake) {
    hablar("Decime Nina antes de pedirme algo.");
    return;
  }

  // 1) Predicción Inteligente Offline
  const intencion = predecirIntencion(textoLimpio);

  if (intencion && manejarComandoOffline(intencion)) {
    return;
  }

  // 2) Intento offline normal
  if (manejarComandoOffline(textoLimpio)) return;

  // 3) Online
  if (navigator.onLine && manejarComandoOnline(textoLimpio)) return;

  // 4) IA futura
  hablar("No entendí bien. Probá preguntarme la hora o el día.");
}
