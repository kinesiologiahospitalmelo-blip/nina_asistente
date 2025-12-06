import { hablar } from "./voz.js";
import { obtenerUbicacionBasica } from "./gps.js";
import { llamarContacto, llamarEmergencia } from "./llamadas.js";
import { saludoPersonalizado, nombreUsuario } from "./identidadUsuario.js";

export function respuestaRapidaBoton(accion) {
  manejarComandoOffline(accion, true);
}

export function manejarComandoOffline(texto) {
  const t = texto.toLowerCase().trim();
  const ahora = new Date();

  // SALUDOS
  if (t.includes("hola")) {
    hablar(saludoPersonalizado());
    return true;
  }

  // QUIÉN SOS
  if (t.includes("quien sos") || t.includes("quién sos") || t.includes("quien habla")) {
    hablar(`Soy Nina, tu asistente. Estoy acá para ayudarte, ${nombreUsuario()}.`);
    return true;
  }

  // HORA
  if (t.includes("hora")) {
    const h = ahora.getHours();
    const m = ahora.getMinutes().toString().padStart(2, "0");
    hablar(`Son las ${h}:${m}.`);
    return true;
  }

  // DÍA
  if (t.includes("día") || t.includes("dia")) {
    const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
    hablar(`Hoy es ${dias[ahora.getDay()]}.`);
    return true;
  }

  // FECHA
  if (t.includes("fecha")) {
    const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    hablar(`Hoy es ${dias[ahora.getDay()]} ${ahora.getDate()} de ${meses[ahora.getMonth()]}.`);
    return true;
  }

  // DONDE ESTOY
  if (t.includes("donde estoy") || t.includes("dónde estoy") || t === "donde") {
    obtenerUbicacionBasica();
    return true;
  }

  // JUEGOS
  if (t.includes("crucigrama")) {
    hablar("El crucigrama es muy bueno para ejercitar el lenguaje.");
    return true;
  }

  if (t.includes("memoria")) {
    hablar("El juego de memoria es excelente para mantener tu mente activa.");
    return true;
  }

  // LLAMAR HIJOS
  if (
    t.includes("llamar hijos") ||
    t.includes("llamar a mis hijos") ||
    t.includes("mis hijos")
  ) {
    llamarContacto("Hijos", "123456789");
    return true;
  }

  // EMERGENCIAS
  if (t.includes("107")) {
    llamarEmergencia("107");
    return true;
  }

  if (t.includes("911")) {
    llamarEmergencia("911");
    return true;
  }

  return false;
}
