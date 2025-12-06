// js/modulos/comandosOffline.js
import { hablar } from "./voz.js";
import { obtenerUbicacionBasica } from "./gps.js";
import { llamarContacto, llamarEmergencia } from "./llamadas.js";

// Poné acá los números reales
const telefonos = {
  rodrigo: "NUMERO_RODRIGO",
  sara:    "NUMERO_SARA",
  gusi:    "NUMERO_GUSI",
  diego:   "NUMERO_DIEGO"
};

// Para botones
export function respuestaRapidaBoton(accion) {
  manejarComandoOffline(accion);
}

/**
 * Devuelve true si manejó el comando.
 */
export function manejarComandoOffline(texto) {
  const t = texto.toLowerCase().trim();
  const ahora = new Date();

  // --- HORA ---
  if (t.includes("hora") || t === "hora") {
    const h = ahora.getHours();
    const m = ahora.getMinutes().toString().padStart(2,"0");
    hablar(`Son las ${h}:${m}.`);
    return true;
  }

  // --- DÍA ---
  if (t.includes("día") || t.includes("dia") || t === "dia") {
    const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
    hablar(`Hoy es ${dias[ahora.getDay()]}.`);
    return true;
  }

  // --- FECHA ---
  if (t.includes("fecha")) {
    const meses = ["enero","febrero","marzo","abril","mayo","junio",
      "julio","agosto","septiembre","octubre","noviembre","diciembre"];
    hablar(`Hoy es ${ahora.getDate()} de ${meses[ahora.getMonth()]}.`);
    return true;
  }

  // --- DÓNDE ESTOY ---
  if (t.includes("dónde estoy") || t.includes("donde estoy") || t === "donde") {
    obtenerUbicacionBasica();
    return true;
  }

  // --- JUEGO RECOMENDADO ---
  if (t.includes("juego") || t === "juego") {
    const opciones = [
      "Te recomiendo un juego de memoria.",
      "Podés hacer un crucigrama sencillo.",
      "Probá un juego de atención un ratito."
    ];
    hablar(opciones[Math.floor(Math.random() * opciones.length)]);
    return true;
  }

  // --- CRUCIGRAMA ---
  if (t.includes("crucigrama")) {
    hablar("El crucigrama es muy bueno para el lenguaje y la memoria.");
    return true;
  }

  // --- MEMORIA ---
  if (t.includes("memoria")) {
    hablar("El juego de memoria te ayuda a mantener tu mente activa.");
    return true;
  }

  // --- LLAMAR A MIS HIJOS (frase general) ---
  if (
    t === "llamar_hijos" ||                      // botón
    t.includes("llamar hijos") ||
    t.includes("llamar a mis hijos") ||
    t.includes("llamame con mis hijos") ||
    t.includes("mis hijos")
  ) {
    hablar("¿A cuál de tus hijos querés llamar? Rodrigo, Sara o Gusi. También puedo llamar a Diego.");
    return true;
  }

  // --- LLAMAR A UNO ESPECÍFICO ---
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

  // --- EMERGENCIAS ---
  if (t === "emergencia_107" || t.includes("107")) {
    llamarEmergencia("107");
    return true;
  }

  if (t === "emergencia_911" || t.includes("911")) {
    llamarEmergencia("911");
    return true;
  }

  return false;
}
