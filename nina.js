// --- VOZ DE SALIDA (Nina habla) ---
function hablar(texto) {
  document.getElementById("textoNina").textContent = texto;
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = "es-ES";
  u.rate = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

// --- RESPUESTAS RÁPIDAS (botones, modo offline o sin voz) ---
function respuestaRapida(tipo) {
  const ahora = new Date();
  let texto = "";

  if (tipo === "hora") {
    const h = ahora.getHours().toString().padStart(2, "0");
    const m = ahora.getMinutes().toString().padStart(2, "0");
    texto = `Son las ${h} y ${m}.`;
  } else if (tipo === "dia") {
    const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    texto = `Hoy es ${dias[ahora.getDay()]} ${ahora.getDate()} de ${meses[ahora.getMonth()]}.`;
  } else if (tipo === "dia_completo") {
    texto = "Hoy tenés un día tranquilo. Te recomiendo hacer un juego de memoria y después un crucigrama. Más tarde podés descansar un rato.";
  } else if (tipo === "juego") {
    const opciones = [
      "Te recomiendo empezar con el juego de memoria.",
      "Probá un crucigrama sencillo.",
      "Podés hacer un ratito el juego de atención."
    ];
    texto = opciones[Math.floor(Math.random() * opciones.length)];
  } else if (tipo === "crucigrama") {
    texto = "Perfecto. Vamos al juego de crucigrama. Es muy bueno para el lenguaje y la memoria.";
  } else if (tipo === "memoria") {
    texto = "Muy bien, el juego de memoria te ayuda a mantener tu mente activa.";
  } else if (tipo === "mal") {
    texto = "Lo siento. Si seguís sintiéndote mal, avisale a tu familia o llamá a un médico. Más adelante, esta app podrá avisar sola a tus hijos.";
  }

  document.getElementById("textoUsuario").textContent = "(botón)";
  hablar(texto);
}

// --- (Futuro) Ir a app de juegos ---
function irAJuegos() {
  // por ahora solo mensaje; después le ponemos el link real a tu app de juegos
  alert("Aquí más adelante vamos a abrir la app de juegos cognitivos.");
}

// --- RECONOCIMIENTO DE VOZ (solo online) ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
const statusEl = document.getElementById("status");
const micBtn = document.getElementById("micBtn");
const textoUsuario = document.getElementById("textoUsuario");

let recognizer = null;
let escuchando = false;

// Inicializar según soporte y conexión
if (!SpeechRecognition) {
  statusEl.textContent = "Este navegador no soporta reconocimiento de voz. Usá los botones de abajo.";
  statusEl.classList.add("error");
  micBtn.disabled = true;
} else {
  recognizer = new SpeechRecognition();
  recognizer.lang = "es-AR";
  recognizer.interimResults = false;
  recognizer.maxAlternatives = 1;

  recognizer.onstart = () => {
    escuchando = true;
    micBtn.classList.add("listening");
    statusEl.textContent = "Te estoy escuchando. Hablá claro y despacio.";
  };

  recognizer.onend = () => {
    escuchando = false;
    micBtn.classList.remove("listening");
    if (navigator.onLine) {
      statusEl.textContent = "Listo. Si querés, tocá de nuevo para hablar.";
    } else {
      statusEl.textContent = "Sin conexión. Podés usar los botones de abajo.";
      statusEl.classList.add("error");
    }
  };

  recognizer.onerror = (event) => {
    console.error("Error reconocimiento:", event.error);
    statusEl.textContent = "Hubo un problema al escuchar. Probá otra vez o usá los botones.";
    statusEl.classList.add("error");
    escuchando = false;
    micBtn.classList.remove("listening");
  };

  recognizer.onresult = (event) => {
    const texto = event.results[0][0].transcript;
    textoUsuario.textContent = texto;
    procesarFrase(texto);
  };

  // Estado inicial:
  if (navigator.onLine) {
    statusEl.textContent = "Tocá el botón para que te escuche.";
  } else {
    statusEl.textContent = "Sin conexión. Podés usar los botones de abajo.";
    statusEl.classList.add("error");
  }
  micBtn.disabled = false;
}

// Click en botón de micrófono
micBtn.addEventListener("click", () => {
  if (!recognizer) return;
  if (!navigator.onLine) {
    statusEl.textContent = "No hay conexión. Uso por voz no disponible. Usá los botones.";
    statusEl.classList.add("error");
    return;
  }
  if (!escuchando) {
    recognizer.start();
  } else {
    recognizer.stop();
  }
});

// --- Interpretación de frases ---
function procesarFrase(fraseRaw) {
  const frase = fraseRaw.toLowerCase();

  if (!frase.includes("nina")) {
    hablar("Si querés que te ayude, empezá la frase diciendo Nina. Por ejemplo, Nina, qué hora es.");
    return;
  }

  let limpio = frase.replace("nina", "").trim();
  const ahora = new Date();

  if (limpio.includes("hora")) {
    const h = ahora.getHours().toString().padStart(2, "0");
    const m = ahora.getMinutes().toString().padStart(2, "0");
    hablar(`Son las ${h} y ${m}.`);
    return;
  }

  if (limpio.includes("día") || limpio.includes("dia")) {
    const dias = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    hablar(`Hoy es ${dias[ahora.getDay()]} ${ahora.getDate()} de ${meses[ahora.getMonth()]}.`);
    return;
  }

  if (limpio.includes("cómo es mi día") || limpio.includes("como es mi dia") || limpio.includes("como es mi día")) {
    hablar("Hoy tenés un día tranquilo. Te recomiendo hacer un juego de memoria y después un crucigrama. Más tarde podés descansar escuchando algo que te guste.");
    return;
  }

  if (limpio.includes("recomendame") || limpio.includes("recomendá") || limpio.includes("recomenda")) {
    const opciones = [
      "Te recomiendo empezar con el juego de memoria.",
      "Podés hacer un crucigrama sencillo.",
      "Probá un ratito el juego de atención."
    ];
    hablar(opciones[Math.floor(Math.random() * opciones.length)]);
    return;
  }

  if (limpio.includes("crucigrama")) {
    hablar("Muy bien. El crucigrama te ayuda con el lenguaje y la memoria. Más adelante te voy a abrir el juego directamente.");
    // FUTURO: window.location.href = "URL_DE_TU_APP_DE_JUEGOS";
    return;
  }

  if (limpio.includes("memoria")) {
    hablar("Perfecto. El juego de memoria es muy bueno para tu mente.");
    return;
  }

  if (limpio.includes("me siento mal") || limpio.includes("ayuda") || limpio.includes("ayudame")) {
    hablar("Lo siento mucho. Si podés, llamá a tu familia o a un médico. Más adelante, esta app podrá avisar sola a tus hijos.");
    return;
  }

  hablar("No estoy segura de haber entendido. Probá preguntarme la hora, el día o pedirme que te recomiende un juego.");
}
