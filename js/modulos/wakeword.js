// ================================
// Wakeword Inteligente — Nina v2
// ================================

// Variantes que activan a Nina
const wakewords = [
  "nina", "niña", "inna", "ninna", "ninaa", "mina", "ina",
  "hola nina", "hola", "ola", "holaa"
];

// Normaliza texto: sin tildes, todo minúsculas
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function procesarWakeWord(frase) {
  const f = normalizar(frase);

  // Detectar si contiene wakeword
  let tieneWake = wakewords.some(w => f.includes(w));

  if (!tieneWake) {
    return { textoLimpio: frase, tieneWake: false };
  }

  // Quitar la palabra de activación para quedarse con intención
  let limpio = f;
  wakewords.forEach(w => {
    limpio = limpio.replace(w, "");
  });

  limpio = limpio.trim();

  return { textoLimpio: limpio, tieneWake: true };
}
