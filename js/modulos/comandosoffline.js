// js/modulos/comandosOffline.js
import { hablar } from "./voz.js";
import { obtenerUbicacionBasica } from "./gps.js";
import { llamarContacto, llamarEmergencia } from "./llamadas.js";

// Para usar también desde botones (index.html)
export function respuestaRapidaBoton(accion) {
  manejarComandoOffline(accion, true);
}

/**
 * Devuelve true si el comando fue manejado aquí.
 * texto: texto SIN "nina"/"hola" (limpio)
 */
export function manejarComandoOffline(texto, desdeBoton = false) {
  const t = texto.toLowerCase().trim();
  const ahora = new Date();

  // --- HORA ---
  if (t.includes("hora") || t === "hora") {
    const h = ahora.getHours().toString().padStart(2, "0");
    const m = ahora.getMinutes().toString().padStart(2, "0");
    hablar(`Son las ${h} y ${m}.`);
    return true;
  }

  // --- DÍA ---
  if (t.includes("día") || t.includes("dia")) {
    const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
    hablar(`Hoy es ${dias[ahora.getDay()]}.`);
    return true;
  }

  // --- FECHA ---
  if (t.includes("fecha")) {
    const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    hablar(`Hoy es ${dias[ahora.getDay()]} ${ahora.getDate()} de ${meses[ahora.getMonth()]}.`);
    return true;
  }

  // --- CÓMO ES MI DÍA ---
  if (t.includes("cómo es mi día") || t.includes("como es mi dia") || t.includes("como es mi día")) {
    hablar("Hoy tenés un día tranquilo. Te recomiendo hacer un juego de memoria y después un crucigrama. Más tarde podés descansar un rato.");
    return true;
  }

  // --- DÓNDE ESTOY ---
  if (t.includes("dónde estoy") || t.includes("donde estoy") || t === "donde") {
    obtenerUbicacionBasica();
    return true;
  }

  // --- RECOMENDAR JUEGO ---
  if (t.includes("recomendame") || t.includes("recomendá") || t.includes("recomenda") || t === "juego") {
    const opciones = [
      "Te recomiendo empezar con el juego de memoria.",
      "Probá un crucigrama sencillo.",
      "Podés hacer un ratito el juego de atención."
    ];
    const texto = opciones[Math.floor(Math.random() * opciones.length)];
    hablar(texto);
    return true;
  }

  // --- JUGAR CRUCIGRAMA ---
  if (t.includes("crucigrama")) {
    hablar("Perfecto. El crucigrama es muy bueno para el lenguaje y la memoria. Más adelante te voy a abrir el juego directamente.");
    // FUTURO: abrir app de juegos
    return true;
  }

  // --- JUGAR MEMORIA ---
  if (t.includes("memoria")) {
    hablar("Muy bien, el juego de memoria te ayuda a mantener tu mente activa.");
    return true;
  }

  // --- LLAMAR A MIS HIJOS / PERSONAS ---
  if (t.includes("llamá a mis hijos") || t.includes("llama a mis hijos") || texto === "llamar_hijos") {
    // Podés personalizar números acá:
    llamarContacto("Hijos", "123456789");
    return true;
  }

  if (t.includes("llamá a rodrigo") || t.includes("llama a rodrigo")) {
    llamarContacto("Rodrigo", "123456789"); // cambiar por número real
    return true;
  }

  if (t.includes("llamá a sara") || t.includes("llama a sara")) {
    llamarContacto("Sara", "123456789");
    return true;
  }

  if (t.includes("llamá a gusi") || t.includes("llama a gusi")) {
    llamarContacto("Gusi", "123456789");
    return true;
  }

  // --- EMERGENCIAS ---
  if (t.includes("llamá al 107") || t.includes("llama al 107") || texto === "emergencia_107") {
    llamarEmergencia("107");
    return true;
  }

  if (t.includes("llamá al 911") || t.includes("llama al 911") || texto === "emergencia_911") {
    llamarEmergencia("911");
    return true;
  }

  // --- ESTADO EMOCIONAL ---
  if (t.includes("me siento mal") || t.includes("estoy triste") || t.includes("tengo miedo")) {
    hablar("Lo siento mucho. Si podés, avisale a tu familia o llamá a un médico. Más adelante esta app va a poder avisar sola a tus hijos.");
    return true;
  }

  // Acá podemos seguir agregando comandos offline (rutinas, medicación, etc.)

  return false;
}
