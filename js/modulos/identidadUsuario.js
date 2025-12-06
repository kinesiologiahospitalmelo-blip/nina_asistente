// =====================================
// Identidad del Usuario — Nina v2
// =====================================

// Variantes del nombre de tu mamá
const variantes = [
  "mercedes", "merce", "mecha", "tata", "tatonia", "edes"
];

// Nombre por defecto
let nombreDetectado = localStorage.getItem("nina_usuario") || null;

// Normaliza texto
function normalizar(t) {
  return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function identificarUsuario(frase) {
  const f = normalizar(frase);

  for (const v of variantes) {
    if (f.includes(v)) {
      nombreDetectado = v;
      localStorage.setItem("nina_usuario", v);
      return true;
    }
  }

  return false;
}

export function nombreUsuario() {
  return nombreDetectado || "Mercedes";
}

// Saludo personalizado
export function saludoPersonalizado() {
  const n = nombreUsuario();

  switch (n) {
    case "merce": return "Hola Merce, ¿cómo estás hoy?";
    case "mecha": return "Hola Mecha, estoy acá para ayudarte.";
    case "tata": return "Hola Tata, ¿cómo te sentís?";
    case "tatonia": return "Hola Tatonia querida, decime qué necesitas.";
    case "edes": return "Hola Edes, ¿cómo estás?";
    default: return "Hola Mercedes, ¿en qué te puedo ayudar?";
  }
}
