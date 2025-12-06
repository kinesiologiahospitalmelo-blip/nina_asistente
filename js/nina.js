// ================================
// NINA v2 — Controlador Principal
// ================================

import { iniciarEscuchaContinua, reconocimiento } from "./listenerContinuo.js";
import { procesarWakeWord } from "./modulos/wakeword.js";
import { identificarUsuario, nombreUsuario } from "./modulos/identidadUsuario.js";

import { hablar } from "./modulos/voz.js";
import { manejarComandoOffline, respuestaRapidaBoton } from "./modulos/comandosOffline.js";
import { manejarComandoOnline } from "./modulos/comandosOnline.js";
import { registrarFrase, predecirIntencion } from "./modulos/aprendizaje.js";
import { prepararBuscador } from "./modulos/buscador.js";

// ================================
// ELEMENTOS DOM
// ================================
const btnHablar = document.getElementById("btnHablar");
const estadoVoz = document.getElementById("estadoVoz");
const textoUsuario = document.getElementById("textoUsuario");
const textoNina = document.getElementById("textoNina");

// ================================
// PREPARAR BUSCADOR GOOGLE
// ================================
prepararBuscador();

// ================================
// RESPUESTA POR BOTONES OFFLINE
// ================================
document.querySelectorAll(".btn-small[data-accion]").forEach(boton => {
  boton.addEventListener("click", () => {
    const accion = boton.getAttribute("data-accion");
    textoUsuario.textContent = `(botón ${accion})`;
    respuestaRapidaBoton(accion);
  });
});

// ================================
// BOTÓN PARA ACTIVAR MICRÓFONO
// ================================
btnHablar.addEventListener("click", () => {
  iniciarEscuchaContinua();
  estadoVoz.textContent = "Escuchando… (modo continuo activado)";
});

// ================================
// PROCESAR RESULTADO DE VOZ
// ================================
reconocimiento.onresult = (event) => {
  const frase = event.results[0][0].transcript.toLowerCase();
  textoUsuario.textContent = frase;

  // Aprendizaje
  registrarFrase(frase);

  // Identificación del usuario
  identificarUsuario(frase);

  // Wake-word
  const { textoLimpio, tieneWake } = procesarWakeWord(frase);

  if (!tieneWake) return; // ignorar ruido o frases sin activar a Nina

  procesarEntrada(textoLimpio);
};

// ================================
// PROCESADOR DE ENTRADA
// ================================
function procesarEntrada(frase) {

  if (!frase || frase.trim() === "") {
    hablar("Sí, decime.");
    return;
  }

  // PREDICCIÓN INTELIGENTE (offline)
  const intencion = predecirIntencion(frase);

  if (intencion && manejarComandoOffline(intencion)) {
    return;
  }

  // INTENTO OFFLINE NORMAL
  if (manejarComandoOffline(frase)) {
    return;
  }

  // INTENTO ONLINE
  if (navigator.onLine && manejarComandoOnline(frase)) {
    return;
  }

  // IA (Gemini) — futuro
  hablar("No entendí bien. Más adelante voy a poder ayudarte mejor gracias a la inteligencia artificial.");
}
