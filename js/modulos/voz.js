// ============================================
// Voz Natural — Nina v2
// ============================================

let vozElegida = null;

// Normalizar selección de voz
function seleccionarVoz() {
  const voces = window.speechSynthesis.getVoices();

  // Preferencias en español (mejor calidad)
  const candidatas = voces.filter(v =>
    v.lang.startsWith("es") &&
    !v.name.toLowerCase().includes("compact")
  );

  if (candidatas.length > 0) return candidatas[0];
  return voces[0] || null;
}

// Chrome carga voces asíncronas
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    vozElegida = seleccionarVoz();
  };
}

export function hablar(texto) {
  const salida = document.getElementById("textoNina");
  if (salida) salida.textContent = texto;

  if (!("speechSynthesis" in window)) return;

  const u = new SpeechSynthesisUtterance(texto);
  u.lang = "es-AR";
  u.rate = 1;

  if (vozElegida) u.voice = vozElegida;

  // Stop previous speech
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}
