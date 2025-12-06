import { hablar } from "./voz.js";

const nombres = {
  // Mercedes
  mercedes: "Mercedes",
  merce: "Merce",
  mecha: "Mecha",
  tata: "Tata",
  tatonia: "Tatonia",
  edes: "Edes",

  // Hijos
  rodrigo: "Rodrigo",
  sara: "Sara",
  gusi: "Gusi",

  // Yerno
  diego: "Diego",

  // Nietos
  victoria: "Victoria",
  valentina: "Valentina",
  morena: "Morena",
  lucia: "Lucía",
  manu: "Manu"
};

export function identificarUsuario(frase) {
  const f = frase.toLowerCase();

  for (const key in nombres) {
    if (f.includes(key)) {
      saludarNombre(nombres[key]);
      return true;
    }
  }

  return false;
}

export function saludarNombre(nombre) {
  const apodosMercedes = ["Mercedes", "Merce", "Mecha", "Tata", "Tatonia", "Edes"];

  if (apodosMercedes.includes(nombre)) {
    hablar(`Hola ${nombre}, ¿cómo estás hoy?`);
    return;
  }

  if (["Rodrigo", "Sara", "Gusi"].includes(nombre)) {
    hablar(`Hola ${nombre}, me alegra escucharte.`);
    return;
  }

  if (["Victoria","Valentina","Morena","Lucía","Manu"].includes(nombre)) {
    hablar(`Hola ${nombre}, ¡qué alegría escucharte!`);
    return;
  }

  if (nombre === "Diego") {
    hablar("Hola Diego, ¿todo bien por ahí?");
    return;
  }

  hablar("No te conozco, que tengas un lindo día.");
}
