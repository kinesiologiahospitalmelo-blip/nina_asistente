// ================================
// Listener Continuo — Nina v2
// ================================

export const reconocimiento =
  window.SpeechRecognition
    ? new window.SpeechRecognition()
    : window.webkitSpeechRecognition
      ? new window.webkitSpeechRecognition()
      : null;

let escuchando = false;

// Configuración base
if (reconocimiento) {
  reconocimiento.lang = "es-AR";
  reconocimiento.interimResults = false;
  reconocimiento.continuous = true;
}

// Inicia modo continuo
export function iniciarEscuchaContinua() {
  if (!reconocimiento) return;

  if (!escuchando) {
    escuchando = true;
    try {
      reconocimiento.start();
      actualizarEstado("Escuchando… (modo continuo)");
    } catch (e) {
      // Chrome a veces tira error si ya está escuchando
    }
  }
}

// Reintenta automáticamente si se corta
reconocimiento.onend = () => {
  if (escuchando) {
    try { reconocimiento.start(); } catch {}
  }
};

function actualizarEstado(texto) {
  const el = document.getElementById("estadoVoz");
  if (el) el.textContent = texto;
}
