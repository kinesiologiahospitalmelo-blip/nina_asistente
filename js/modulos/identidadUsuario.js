// js/modulos/identidadUsuario.js
import { hablar } from "./voz.js";

const nombres = {
  // Mercedes + apodos
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

function normalizar(t) {
  return t.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function identificarUsuario(frase) {
  const f = normalizar(frase);

  // Frases típicas: “soy mercedes”, “habla rodrigo”, “acá sara”
  for (const key in nombres) {
    if (f.includes(key)) {
      saludarNombre(nombres[key]);
      return true;
    }
  }
  return false;
}

export function saludarNombre(nombre) {
  const apodosMercedes = ["Mercedes","Merce","Mecha","Tata","Tatonia","Edes"];

  // Mercedes
  if (apodosMercedes.includes(nombre)) {
    hablar(`Hola ${nombre}, ¿cómo estás hoy?`);
    return;
  }

  // Hijos
  if (["Rodrigo","Sara","Gusi"].includes(nombre)) {
    hablar(`Hola ${nombre}, me alegra escucharte.`);
    return;
  }

  // Nietos
  if (["Victoria","Valentina","Morena","Lucía","Manu"].includes(nombre)) {
    hablar(`Hola ${nombre}, qué alegría escucharte.`);
    return;
  }

  // Yerno
  if (nombre === "Diego") {
    hablar("Hola Diego, ¿todo bien por ahí?");
    return;
  }

  // Otros
  hablar("No te conozco, que tengas un lindo día.");
}
