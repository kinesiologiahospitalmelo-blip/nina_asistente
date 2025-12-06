// js/modulos/comandosOffline.js
import { hablar } from "./voz.js";
import { obtenerUbicacionBasica } from "./gps.js";
import { llamarContacto, llamarEmergencia } from "./llamadas.js";

// Números reales
const telefonos = {
  rodrigo: "PONER_NUMERO_RODRIGO",
  sara:    "PONER_NUMERO_SARA",
  gusi:    "PONER_NUMERO_GUSI",
  diego:   "PONER_NUMERO_DIEGO"
};

// Para los botones del HTML
export function respuestaRapidaBoton(accion) {
  manejarComandoOffline(accion);
}

/**
 * Maneja comandos sin internet.
 * Devuelve true si manejó.
 */
export function manejarComandoOffline(texto) {
  const t = texto.toLowerCase().trim();
  const ahora = new Date();

  // ===============================================================
  // LLAMADAS INDIVIDUALES (primero para evitar interferencia con identidad)
  // ===============================================================

  if (t.includes("llamá a rodrigo") || t.includes("llama a rodrigo")) {
    llamarContacto("Rodrigo", telefonos.rodrigo);
    return true;
  }

  if (t.includes("llamá a sara") || t.includes("llama a sara")) {
    llamarContacto("Sara", telefonos.sara);
    return true;
  }

  if (t.includes("llamá a gusi") || t.includes("llama a gusi")) {
    llamarContacto("Gusi", telefonos.gusi);
    return true;
  }

  if (t.includes("llamá a diego") || t.includes("llama a diego")) {
    llamarContacto("Diego", telefonos.diego);
    return true;
  }

  // ===============================================================
  // LLAMAR A MIS HIJOS
  // ===============================================================
  if (
    t === "llamar_hijos" ||
    t.includes("llamar hijos") ||
    t.includes("llamar a mis hijos") ||
    (t.includes("llamar") && t.includes("hijos"))
  ) {
    hablar("¿A cuál de tus hijos querés llamar? Rodrigo, Sara o Gusi. También puedo llamar a Diego.");
    return true;
  }

  // ===============================================================
  // EMERGENCIAS
  // ===============================================================
  if (t.includes("107") || t === "emergencia_107") {
    hablar("Llamando al ciento siete.");
    setTimeout(() => llamarEmergencia("107"), 350);
    return true;
  }

  if (t.includes("911") || t === "emergencia_911") {
    hablar("Llamando al nueve uno uno.");
    setTimeout(() => llamarEmergencia("911"), 350);
    return true;
  }

  // ===============================================================
  // HORA
  // ===============================================================
  if (t.includes("hora") || t === "hora") {
    const h = ahora.getHours();
    const m = ahora.getMinutes().toString().padStart(2, "0");
    hablar(`Son las ${h}:${m}.`);
    return true;
  }

  // ===============================================================
  // DÍA
  // ===============================================================
  if (t.includes("día") || t.includes("dia")) {
    const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
    hablar(`Hoy es ${dias[ahora.getDay()]}.`);
    return true;
  }

  // ===============================================================
  // FECHA
  // ===============================================================
  if (t.includes("fecha")) {
    const meses = ["enero","febrero","marzo","abril","mayo","junio",
      "julio","agosto","septiembre","octubre","noviembre","diciembre"];
    hablar(`Hoy es ${ahora.getDate()} de ${meses[ahora.getMonth()]}.`);
    return true;
  }

  // ===============================================================
  // UBICACIÓN
  // ===============================================================
  if (t.includes("dónde estoy") || t.includes("donde estoy") || t === "donde") {
    obtenerUbicacionBasica();
    return true;
  }

  // ===============================================================
  // JUEGO / CRUCIGRAMA / MEMORIA
  // ===============================================================

  if (t.includes("juego") || t === "juego") {
    const opciones = [
      "Te recomiendo un juego de memoria.",
      "Podés hacer un crucigrama sencillo.",
      "Probá un juego de atención un ratito."
    ];
    hablar(opciones[Math.floor(Math.random() * opciones.length)]);
    return true;
  }

  if (t.includes("crucigrama")) {
    hablar("El crucigrama es muy bueno para el lenguaje y la memoria.");
    return true;
  }

  if (t.includes("memoria")) {
    hablar("El juego de memoria te ayuda a mantener tu mente activa.");
    return true;
  }

  return false;
}
