// js/modulos/voz.js
let vozSeleccionada = null;

function elegirVoz() {
  const voces = window.speechSynthesis.getVoices();
  // Buscamos voces en español, preferentemente latino / Google
  const candidatas = voces.filter(v =>
    v.lang.startsWith("es") &&
    (!v.name.toLowerCase().includes("compact"))
  );
  if (candidatas.length > 0) return candidatas[0];
  return voces[0] || null;
}

// Algunos navegadores cargan las voces de forma asíncrona
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    vozSeleccionada = elegirVoz();
  };
}

export function hablar(texto) {
  const salida = document.getElementById("textoNina");
  if (salida) salida.textContent = texto;

  if (!("speechSynthesis" in window)) return;

  const u = new SpeechSynthesisUtterance(texto);
  u.lang = "es-AR"; // preferencia argentina
  if (vozSeleccionada) u.voice = vozSeleccionada;
  u.rate = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}
