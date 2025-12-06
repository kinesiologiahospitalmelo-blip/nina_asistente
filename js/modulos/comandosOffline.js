import { hablar } from "./voz.js";
import { obtenerUbicacionBasica } from "./gps.js";
import { llamarContacto, llamarEmergencia } from "./llamadas.js";

export function respuestaRapidaBoton(accion) {
  manejarComandoOffline(accion);
}

export function manejarComandoOffline(texto) {
  const t = texto.toLowerCase().trim();
  const ahora = new Date();

  // Hora
  if (t.includes("hora")) {
    hablar(`Son las ${ahora.getHours()}:${ahora.getMinutes().toString().padStart(2,"0")}.`);
    return true;
  }

  // Día
  if (t.includes("día") || t.includes("dia")) {
    const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
    hablar(`Hoy es ${dias[ahora.getDay()]}.`);
    return true;
  }

  // Fecha
  if (t.includes("fecha")) {
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    hablar(`Hoy es ${ahora.getDate()} de ${meses[ahora.getMonth()]}.`);
    return true;
  }

  // Ubicacion
  if (t.includes("dónde") || t.includes("donde")) {
    obtenerUbicacionBasica();
    return true;
  }

  // Llamar hijos
  if (
    t.includes("llamar hijos") ||
    t.includes("llamar a mis hijos") ||
    t.includes("mis hijos")
  ) {
    hablar("Llamando a tus hijos.");
    llamarContacto("Hijos", "123456789");
    return true;
  }

  // Emergencias
  if (t.includes("107")) {
    hablar("Llamando al 107.");
    llamarEmergencia("107");
    return true;
  }

  if (t.includes("911")) {
    hablar("Llamando al 911.");
    llamarEmergencia("911");
    return true;
  }

  return false;
}
