// js/modulos/identidadUsuario.js
import { hablar } from "./voz.js";

const nombresValidos = {
  // Mercedes y apodos
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

  // Nietos
  victoria: "Victoria",
  valentina: "Valentina",
  morena: "Morena",
  lucia: "Lucía",
  manu: "Manu",

  // Yerno
  diego: "Diego"
};

function normalizar(t) {
  return t.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function identificarUsuario(frase) {
  const f = normalizar(frase);

  // Debe tener palabras clave de identificación
  const esIdentificacion =
    f.startsWith("soy ") ||
    f.startsWith("habla") ||
    f.startsWith("aca ") ||
    f.startsWith("acá ");

  if (!esIdentificacion) return false;

  // buscar nombres válidos
  for (const key in nombresValidos) {
    if (f.includes(key)) {
      saludarNombre(nombresValidos[key]);
      return true;
    }
  }

  // si dijo "soy X" pero X no existe…
  hablar("Ese nombre no está registrado. No te puedo ayudar.");
  return true;
}

function saludarNombre(nombre) {

  const apodosMercedes = [
    "Mercedes","Merce","Mecha","Tata","Tatonia","Edes"
  ];

  if (apodosMercedes.includes(nombre)) {
    hablar(`Hola ${nombre}, ¿cómo estás hoy?`);
    return;
  }

  if (["Rodrigo","Sara","Gusi"].includes(nombre)) {
    hablar(`Hola ${nombre}, qué gusto escucharte.`);
    return;
  }

  if (["Victoria","Valentina","Morena","Lucía","Manu"].includes(nombre)) {
    hablar(`Hola ${nombre}, ¡qué alegría escucharte!`);
    return;
  }

  if (nombre === "Diego") {
    hablar("Hola Diego, ¿cómo va todo por ahí?");
    return;
  }

  hablar("Ese nombre no está registrado.");
}
