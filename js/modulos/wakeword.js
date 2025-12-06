// js/modulos/wakeword.js

const variantesNina = ["nina", "niña", "mina", "ina", "nino", "ninaa", "ninna"];
const variantesHola = ["hola", "ola", "holaa", "ola nina", "hola nina"];

export function procesarWakeWord(frase) {
  let tieneWake = false;

  // Si contiene alguna variante de Nina
  if (variantesNina.some(v => frase.includes(v))) {
    tieneWake = true;
  }

  // O alguna variante de Hola
  if (variantesHola.some(v => frase.includes(v))) {
    tieneWake = true;
  }

  let textoLimpio = frase;

  if (tieneWake) {
    // Quitamos las palabras de activación para quedarnos con la intención
    [...variantesNina, ...variantesHola].forEach(v => {
      textoLimpio = textoLimpio.replace(v, "");
    });
    textoLimpio = textoLimpio.trim();
  }

  return { textoLimpio, tieneWake };
}
