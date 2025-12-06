// js/modulos/comandosOffline.js
import { hablar } from "./voz.js";
import { obtenerUbicacionBasica } from "./gps.js";
import { llamarContacto, llamarEmergencia } from "./llamadas.js";

// PONÉ LOS NÚMEROS REALES
const telefonos = {
  rodrigo: "NUMERO_RODRIGO",
  sara:    "NUMERO_SARA",
  gusi:    "NUMERO_GUSI",
  diego:   "NUMERO_DIEGO"
};

// --- DETECTAMOS PRIMERO LOS COMANDOS DE LLAMADA ---
function esComandoLlamada(t) {
  return (
    t.includes("llama") ||
    t.includes("llamá") ||
    t.includes("llamar")
  );
}

export function manejarComandoOffline(texto) {
  const t = texto.toLowerCase().trim();
  const ahora = new Date();

  // -----------------------------
  // 1) LLAMADAS (PRIORIDAD ALTA)
  // -----------------------------

  // Llamar a un hijo específico
  if (t.includes("a rodrigo")) {
    llamarContacto("Rodrigo", telefonos.rodrigo);
    return true;
  }
  if (t.includes("a sara")) {
    llamarContacto("Sara", telefonos.sara);
    return true;
  }
  if (t.includes("a gusi")) {
    llamarContacto("Gusi", telefonos.gusi);
    return true;
  }
  if (t.includes("a diego")) {
    llamarContacto("Diego", telefonos.diego);
    return true;
  }

  // Llamar a mis hijos (pregunta)
  if (
    t.includes("llamar a mis hijos") ||
    t.includes("llamame con mis hijos") ||
    t.includes("llamar hijos") ||
    t === "llamar_hijos" ||
    (esComandoLlamada(t) && t.includes("hijos"))
  ) {
    hablar("¿A cuál de tus hijos querés llamar? Rodrigo, Sara o Gusi. También puedo llamar a Diego.");
    return true;
  }

  // Emergencias
  if (t === "emergencia_107" || t.includes("107")) {
    hablar("Llamando al ciento siete.");
    setTimeout(() => llamarEmergencia("107"), 300);
    return true;
  }

  if (t === "emergencia_911" || t.includes("911")) {
    hablar("Llamando al nueve uno uno.");
    setTimeout(() => llamarEmergencia("911"), 300);
    return true;
  }

  // -----------------------------
  // 2) OTROS COMANDOS
  // -----------------------------

  if (t.includes("hora")) {
    const h = ahora.getHours();
    const m = ahora.getMinutes().toString().padStart(2, "0");
    hablar(`Son las ${h}:${m}.`);
    return true;
  }

  if (t.includes("día") || t.includes("dia")) {
    const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    hablar(`Hoy es ${dias[ahora.getDay()]}.`);
    return true;
  }

  if (t.includes("fecha")) {
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio",
                   "agosto","septiembre","octubre","noviembre","diciembre"];
    hablar(`Hoy es ${ahora.getDate()} de ${meses[ahora.getMonth()]}.`);
    return true;
  }

  if (t.includes("donde estoy") || t.includes("dónde estoy") || t === "donde") {
    obtenerUbicacionBasica();
    return true;
  }

  if (t.includes("crucigrama")) {
    hablar("El crucigrama es muy bueno para tu mente.");
    return true;
  }

  if (t.includes("memoria")) {
    hablar("El juego de memoria te ayuda a mantener la mente activa.");
    return true;
  }

  return false;
}
