// ==========================================
// Comandos OFFLINE — Nina v2
// ==========================================

import { hablar } from "./voz.js";
import { obtenerUbicacionBasica } from "./gps.js";
import { llamarContacto, llamarEmergencia } from "./llamadas.js";
import { saludoPersonalizado, nombreUsuario } from "./identidadUsuario.js";

// ==========================================
// COMANDOS
// ==========================================

export function respuestaRapidaBoton(accion) {
  manejarComandoOffline(accion, true);
}

export function manejarComandoOffline(texto) {
  const t = texto.toLowerCase().trim();
  const ahora = new Date();

  // ---------------- HORA ----------------
  if (t.includes("hora") || t === "hora") {
    const h = ahora.getHours().toString().padStart(2, "0");
    const m = ahora.getMinutes().toString().padStart(2, "0");
    hablar(`Son las ${h}:${m}.`);
    return true;
  }

  // ---------------- DÍA ----------------
  if (t.includes("día") || t.includes("dia") || t === "dia") {
    const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
    hablar(`Hoy es ${dias[ahora.getDay()]}.`);
    return true;
  }

  // ---------------- FECHA ----------------
  if (t.includes("fecha")) {
    const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio",
      "agosto","septiembre","octubre","noviembre","diciembre"];

    hablar(`Hoy es ${dias[ahora.getDay()]} ${ahora.getDate()} de ${meses[ahora.getMonth()]}.`);
    return true;
  }

  // ---------------- CÓMO ES MI DÍA ----------------
  if (t.includes("cómo es mi día") || t.includes("como es mi dia") || t === "dia_completo") {
    hablar("Hoy tenés un día tranquilo. Te recomiendo un juego de memoria y después un crucigrama.");
    return true;
  }

  // ---------------- DÓNDE ESTOY ----------------
  if (t.includes("dónde estoy") || t.includes("donde estoy") || t === "donde") {
    obtenerUbicacionBasica();
    return true;
  }

  // ---------------- JUEGO RECOMENDADO ----------------
  if (t.includes("juego") || t.includes("recomendame") || t.includes("recomendá")) {
    const juegos = [
      "Un juego de memoria te vendría muy bien.",
      "Podés hacer un crucigrama sencillo.",
      "Te recomiendo un juego de atención."
    ];
    hablar(juegos[Math.floor(Math.random() * juegos.length)]);
    return true;
  }

  // ---------------- CRUCIGRAMA ----------------
  if (t.includes("crucigrama")) {
    hablar("El crucigrama es excelente para el lenguaje y la memoria.");
    return true;
  }

  // ---------------- MEMORIA ----------------
  if (t.includes("memoria")) {
    hablar("Muy bien, el juego de memoria te ayuda a mantener tu mente activa.");
    return true;
  }

  // ---------------- LLAMAR HIJOS ----------------
  if (t.includes("llamar hijos") || t === "llamar_hijos") {
    llamarContacto("Hijos", "123456789");
    return true;
  }

  // ---------------- EMERGENCIAS ----------------
  if (t.includes("107") || t === "emergencia_107") {
    llamarEmergencia("107");
    return true;
  }

  if (t.includes("911") || t === "emergencia_911") {
    llamarEmergencia("911");
    return true;
  }

  // ---------------- ESTADOS EMOCIONALES ----------------
  if (t.includes("me siento mal") || t.includes("estoy triste") || t.includes("tengo miedo")) {
    hablar("Lo siento mucho. Si podés, avisale a tu familia o llamá a un médico.");
    return true;
  }

  // ---------------- SALUDOS ----------------
  if (t.includes("hola") || t.includes("buen día") || t.includes("buen dia")) {
    hablar(saludoPersonalizado());
    return true;
  }

  // ---------------- QUIÉN SOS ----------------
  if (t.includes("quien sos") || t.includes("quién sos") || t.includes("quien habla")) {
    hablar(`Soy Nina, tu asistente personal. Estoy acá para ayudarte, ${nombreUsuario()}.`);
    return true;
  }

  return false;
}
