import { hablar } from "./voz.js";

// Nombres válidos
const usuarios = {
  mercedes: "Mercedes",
  merce: "Merce",
  mecha: "Mecha",
  tata: "Tata",
  tatonia: "Tatonia",
  edes: "Edes",
  rodrigo: "Rodrigo",
  sara: "Sara",
  gusi: "Gusi",
  victoria: "Victoria",
  valentina: "Valentina",
  morena: "Morena",
  lucia: "Lucía",
  manu: "Manu",
  diego: "Diego"
};

export function identificarUsuario(frase) {
  const f = frase.toLowerCase();

  for (const clave in usuarios) {
    if (f.includes(clave)) {
      saludarNombre(usuarios[clave]);
      return true;
    }
  }

  return false;
}

export function saludarNombre(nombre) {

  // Familia directa de Mercedes
  const apodosMercedes = ["Mercedes", "Merce", "Mecha", "Tata", "Tatonia", "Edes"];

  if (apodosMercedes.includes(nombre)) {
    hablar(`Hola ${nombre}, ¿cómo estás hoy?`);
    return;
  }

  // Hijos
  if (nombre === "Rodrigo") {
    hablar("Hola Rodrigo, ¿cómo estás?");
    return;
  }
  if (nombre === "Sara") {
    hablar("Hola Sara, un gusto escucharte.");
    return;
  }
  if (nombre === "Gusi") {
    hablar("Hola Gusi, ¿cómo estás?");
    return;
  }

  // Nietos
  if (["Victoria","Valentina","Morena","Lucía","Manu"].includes(nombre)) {
    hablar(`Hola ${nombre}, ¿cómo estás?`);
    return;
  }

  // Yerno
  if (nombre === "Diego") {
    hablar("Hola Diego, ¿todo bien?");
    return;
  }

  // Nadie reconocido
  hablar("No te conozco, que tengas un lindo día.");
}
