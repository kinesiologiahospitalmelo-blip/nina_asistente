// ==========================================
// Aprendizaje Local — Nina v2
// ==========================================

const STORAGE_KEY = "nina_memoria_local_v2";

const memoriaInicial = {
  historialFrases: [],
  intencionesFrecuentes: {},
  horariosUso: {},
  preferencias: {},
};

function cargar() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : memoriaInicial;
  } catch {
    return memoriaInicial;
  }
}

function guardar() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memoria));
}

let memoria = cargar();

// ==========================================
// Registrar frase
// ==========================================
export function registrarFrase(frase, intencion = null) {
  const ahora = new Date();

  memoria.historialFrases.push({
    frase,
    intencion,
    fecha: ahora.toISOString()
  });

  if (memoria.historialFrases.length > 150)
    memoria.historialFrases = memoria.historialFrases.slice(-100);

  if (intencion) {
    if (!memoria.intencionesFrecuentes[intencion])
      memoria.intencionesFrecuentes[intencion] = 0;

    memoria.intencionesFrecuentes[intencion]++;
  }

  guardar();
}

// ==========================================
// Predicción simple offline
// ==========================================
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
    emergencia107: ["107"],
    emergencia911: ["911"]
  };

  for (const clave in patrones) {
    if (patrones[clave].some(p => f.includes(p))) {
      registrarFrase(frase, clave);
      return clave;
    }
  }

  // Intento aprender frases repetidas
  const match = memoria.historialFrases.find(h => h.frase === frase);
  if (match) return match.intencion;

  registrarFrase(frase, null);
  return null;
}
