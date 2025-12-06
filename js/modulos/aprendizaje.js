// js/modulos/aprendizaje.js

/**
 * Módulo de aprendizaje local de Nina.
 * TODO lo hace sin internet.
 * Guarda datos en localStorage o IndexedDB.
 */

const STORAGE_KEY = "nina_memoria_local";

// Estructura inicial si no existe memoria
const memoriaInicial = {
  historialFrases: [],      // últimas frases usadas
  intencionesFrecuentes: {},// mapa: "hora" -> 14 usos, etc.
  horariosUso: {},          // hora del día donde más se usa cada intención
  estadosEmocionales: {},   // tristeza, aburrimiento, etc
  sugerencias: [],          // sugerencias adaptativas
  ultimaActividad: null,    // último juego recomendado
  preferencias: {},         // preferencias de juegos o acciones
  dias: {}                  // registro por días
};

function cargarMemoria() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return memoriaInicial;
  try { return JSON.parse(data); }
  catch { return memoriaInicial; }
}

function guardarMemoria(m) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(m));
}

let memoria = cargarMemoria();

/**
 * Registra una frase que dijo la persona.
 */
export function registrarFrase(frase, intencion = null) {
  const ahora = new Date();
  const hora = ahora.getHours();

  // Guardar frase
  memoria.historialFrases.push({
    frase,
    intencion,
    fecha: ahora.toISOString(),
    hora
  });

  if (memoria.historialFrases.length > 150)
    memoria.historialFrases = memoria.historialFrases.slice(-100);

  // Registrar intención
  if (intencion) {
    if (!memoria.intencionesFrecuentes[intencion]) {
      memoria.intencionesFrecuentes[intencion] = 0;
    }
    memoria.intencionesFrecuentes[intencion]++;

    // Registrar horario de uso
    if (!memoria.horariosUso[intencion]) memoria.horariosUso[intencion] = {};
    memoria.horariosUso[intencion][hora] =
      (memoria.horariosUso[intencion][hora] || 0) + 1;
  }

  guardarMemoria(memoria);
}

/**
 * Detectar intención básica según patrones aprendidos.
 */
export function predecirIntencion(frase) {
  const f = frase.toLowerCase();

  const patrones = {
    hora: ["hora", "qué hora", "que hora"],
    dia: ["qué día", "que dia", "día"],
    fecha: ["fecha"],
    donde: ["dónde estoy", "donde estoy"],
    juego: ["juego", "recomendame", "recomendá"],
    crucigrama: ["crucigrama"],
    memoria: ["memoria"],
    mal: ["mal", "triste", "miedo"],
    llamarHijos: ["mis hijos"],
    llamarRodrigo: ["rodrigo"],
    llamarSara: ["sara"],
    llamarGusi: ["gusi"],
    emergencia107: ["107"],
    emergencia911: ["911"]
  };

  for (const clave in patrones) {
    if (patrones[clave].some(p => f.includes(p))) {
      registrarFrase(frase, clave);
      return clave;
    }
  }

  // Aprendizaje: si se repite una frase desconocida, la detecta
  const coincidencia = memoria.historialFrases.find(h => h.frase === frase);
  if (coincidencia) {
    registrarFrase(frase, coincidencia.intencion || null);
    return coincidencia.intencion;
  }

  registrarFrase(frase, null);
  return null;
}

/**
 * Sugerencias inteligentes
 */
export function sugerenciaDiaria() {
  const ahora = new Date();
  const hora = ahora.getHours();

  if (hora >= 6 && hora <= 10) return "Podés empezar el día con un juego de memoria suave.";
  if (hora >= 11 && hora <= 14) return "Este es un buen momento para un crucigrama.";
  if (hora >= 17 && hora <= 20) return "¿Querés hacer una actividad tranquila?";

  return "Decime qué querés hacer y te ayudo.";
}
