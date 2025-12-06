export function procesarWakeWord(frase) {
  const f = frase.toLowerCase();

  const wakewords = ["nina", "niña", "hola nina"];

  const tieneWake = wakewords.some(w => f.includes(w));

  let limpio = frase;

  if (tieneWake) {
    wakewords.forEach(w => limpio = limpio.replace(w, ""));
    limpio = limpio.trim();
  }

  return { textoLimpio: limpio, tieneWake };
}
