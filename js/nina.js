import { iniciarEscuchaContinua, reconocimiento } from "./listenerContinuo.js";
import { procesarWakeWord } from "./modulos/wakeword.js";
import { identificarUsuario } from "./modulos/identidadUsuario.js";
import { hablar } from "./modulos/voz.js";
import { manejarComandoOffline, respuestaRapidaBoton } from "./modulos/comandosOffline.js";
import { manejarComandoOnline } from "./modulos/comandosOnline.js";
import { registrarFrase, predecirIntencion } from "./modulos/aprendizaje.js";
import { prepararBuscador } from "./modulos/buscador.js";

// ---------------- DOM ----------------
const btnHablar = document.getElementById("btnHablar");
const estadoVoz = document.getElementById("estadoVoz");
const textoUsuario = document.getElementById("textoUsuario");

// ---------------- BUFFER DE VOZ ----------------
let bufferFrase = "";
let ultimoTiempo = Date.now();

// ---------------- BUSCADOR ----------------
prepararBuscador();

// ---------------- BOTONES ----------------
document.querySelectorAll(".btn-small[data-accion]").forEach(btn => {
  btn.addEventListener("click", () => {
    const accion = btn.getAttribute("data-accion");
    textoUsuario.textContent = `(botón ${accion})`;
    respuestaRapidaBoton(accion);
  });
});

// ---------------- ACTIVAR MIC ----------------
btnHablar.addEventListener("click", () => {
  iniciarEscuchaContinua();
  estadoVoz.textContent = "Escuchando (modo continuo)…";
});

// ---------------- RECONOCIMIENTO ----------------
reconocimiento.onresult = event => {
  const fraseRaw = event.results[0][0].transcript.toLowerCase().trim();
  const ahora = Date.now();

  if (ahora - ultimoTiempo < 800) {
    bufferFrase += " " + fraseRaw;
  } else {
    bufferFrase = fraseRaw;
  }

  ultimoTiempo = ahora;

  const frase = bufferFrase.trim();
  textoUsuario.textContent = frase;

  registrarFrase(frase);

  // Identificación sin wakeword
  if (identificarUsuario(frase)) return;

  const { textoLimpio, tieneWake } = procesarWakeWord(frase);

  if (!tieneWake) return;

  procesarEntrada(textoLimpio);
};

// ---------------- PROCESAR ----------------
function procesarEntrada(frase) {
  if (!frase || frase.trim() === "") {
    hablar("Sí, decime.");
    return;
  }

  const intencion = predecirIntencion(frase);
  if (intencion && manejarComandoOffline(intencion)) return;

  if (manejarComandoOffline(frase)) return;

  if (navigator.onLine && manejarComandoOnline(frase)) return;

  hablar("No entendí bien, pero voy a mejorar pronto.");
}
