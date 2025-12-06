// js/modulos/wakeword.js

const variantesNina = ["nina", "niña", "mina", "ina", "nino", "ninaa", "ninna"];
const variantesHola = ["hola", "ola", "holaa", "ola nina", "hola nina"];

export function procesarWakeWord(frase) {
  let tieneWake = false;

  if (variantesNina.some(v => frase.includes(v))) {
    tieneWake = true;
  }

  if (variantesHola.some(v => frase.includes(v))) {
    tieneWake = true;
  }

  let textoLimpio = frase;

  if (tieneWake) {
    [...variantesNina, ...variantesHola].forEach(v => {
      textoLimpio = textoLimpio.replace(v, "");
    });
    textoLimpio = textoLimpio.trim();
  }

  return { textoLimpio, tieneWake };
}
