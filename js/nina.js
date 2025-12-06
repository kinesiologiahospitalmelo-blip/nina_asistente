// js/nina.js
import { hablar } from "./modulos/voz.js";
import { procesarWakeWord } from "./modulos/wakeword.js";
import { manejarComandoOffline } from "./modulos/comandosOffline.js";
import { manejarComandoOnline } from "./modulos/comandosOnline.js";
import { respuestaRapidaBoton } from "./modulos/comandosOffline.js";
import { prepararBuscador } from "./modulos/buscador.js";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

const statusEl = document.getElementById("status");
const micBtn = document.getElementById("micBtn");
const textoUsuarioEl = document.getElementById("textoUsuario");
const textoNinaEl = document.getElementById("textoNina");

let recognizer = null;
let escuchando = false;

// Inicializar buscador de Google
prepararBuscador();

// Botones de acciones rápidas (offline / sin voz)
document.querySelectorAll(".small-btn[data-accion]").forEach(btn => {
  btn.addEventListener("click", () => {
    const accion = btn.getAttribute("data-accion");
    textoUsuarioEl.textContent = "(botón: " + accion + ")";
    respuestaRapidaBoton(accion);
  });
});

// --- Inicializar reconocimiento de voz si está disponible ---
if (!SpeechRecognition) {
  statusEl.textContent = "Este navegador no soporta reconocimiento de voz. Usá los botones de abajo.";
  statusEl.classList.add("error");
  micBtn.disabled = true;
} else {
  recognizer = new SpeechRecognition();
  recognizer.lang = "es-AR";        // voz argentina
  recognizer.interimResults = false;
  recognizer.maxAlternatives = 1;

  recognizer.onstart = () => {
    escuchando = true;
    micBtn.classList.add("listening");
    statusEl.textContent = "Te estoy escuchando. Hablá claro y despacio.";
  };

  recognizer.onend = () => {
    escuchando = false;
    micBtn.classList.remove("listening");
    if (navigator.onLine) {
      statusEl.textContent = "Listo. Si querés, tocá de nuevo para hablar.";
    } else {
      statusEl.textContent = "Sin conexión. Podés usar los botones de abajo.";
      statusEl.classList.add("error");
    }
  };

  recognizer.onerror = (event) => {
    console.error("Error reconocimiento:", event.error);
    statusEl.textContent = "Hubo un problema al escuchar. Probá otra vez o usá los botones.";
    statusEl.classList.add("error");
    escuchando = false;
    micBtn.classList.remove("listening");
  };

  recognizer.onresult = (event) => {
    const texto = event.results[0][0].transcript;
    textoUsuarioEl.textContent = texto;
    manejarEntradaPorVoz(texto);
  };

  if (navigator.onLine) {
    statusEl.textContent = "Tocá el botón para que te escuche.";
  } else {
    statusEl.textContent = "Sin conexión. Podés usar los botones de abajo.";
    statusEl.classList.add("error");
  }
  micBtn.disabled = false;
}

// Click en botón de micrófono
micBtn.addEventListener("click", () => {
  if (!recognizer) return;
  if (!navigator.onLine) {
    statusEl.textContent = "No hay conexión. Uso por voz no disponible. Usá los botones.";
    statusEl.classList.add("error");
    return;
  }
  if (!escuchando) {
    recognizer.start();
  } else {
    recognizer.stop();
  }
});

// --- Manejar lo que dice la persona por voz ---
function manejarEntradaPorVoz(fraseRaw) {
  const frase = fraseRaw.toLowerCase().trim();

  // Primero procesamos wake word (Nina / hola + variantes)
  const { textoLimpio, tieneWake } = procesarWakeWord(frase);

  if (!tieneWake) {
    hablar("Si querés que te ayude, empezá la frase diciendo Nina o Hola Nina.");
    return;
  }

  // 1) Intentar con comandos offline (siempre disponibles)
  const manejadoOffline = manejarComandoOffline(textoLimpio);
  if (manejadoOffline) return;

  // 2) Si hay internet, probar comandos online (buscador, etc.)
  if (navigator.onLine) {
    const manejadoOnline = manejarComandoOnline(textoLimpio);
    if (manejadoOnline) return;
  }

  // 3) Si en el futuro activamos IA, acá iría la llamada a ia.js
  // Por ahora, respuesta genérica:
  hablar("No estoy segura de haber entendido. Probá preguntarme la hora, el día o pedirme que te recomiende un juego.");
}
