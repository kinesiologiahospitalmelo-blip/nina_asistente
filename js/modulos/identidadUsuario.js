// js/modulos/identidadUsuario.js
import { hablar } from "./voz.js";

const nombresValidos = {
  mercedes:"Mercedes",
  merce:"Merce",
  mecha:"Mecha",
  tata:"Tata",
  tatonia:"Tatonia",
  edes:"Edes",

  rodrigo:"Rodrigo",
  sara:"Sara",
  gusi:"Gusi",

  victoria:"Victoria",
  valentina:"Valentina",
  morena:"Morena",
  lucia:"Lucía",
  manu:"Manu",

  diego:"Diego"
};

function normalizar(t) {
  return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function identificarUsuario(frase) {
  const f = normalizar(frase);

  // Solo entra si la frase tiene "soy", "habla", "acá"
  const esIdentificacion =
    f.includes("soy ") ||
    f.includes("habla") ||
    f.includes("aca") ||
    f.includes("acá");

  if (!esIdentificacion) return false;

  // Buscar nombre
  for (const key in nombresValidos) {
    if (f.includes(key)) {
      return saludarNombre(nombresValidos[key]);
    }
  }

  // Si dijo “soy X” pero X NO existe:
  hablar("Ese nombre no está registrado, no te puedo ayudar.");
  return true;
}

function saludarNombre(nombre) {
  const apodos = ["Mercedes","Merce","Mecha","Tata","Tatonia","Edes"];

  if (apodos.includes(nombre)) {
    hablar(`Hola ${nombre}, ¿cómo estás hoy?`);
    return true;
  }

  if (["Rodrigo","Sara","Gusi"].includes(nombre)) {
    hablar(`Hola ${nombre}, qué gusto escucharte.`);
    return true;
  }

  if (["Victoria","Valentina","Morena","Lucía","Manu"].includes(nombre)) {
    hablar(`Hola ${nombre}, ¡qué alegría escucharte!`);
    return true;
  }

  if (nombre === "Diego") {
    hablar("Hola Diego, ¿cómo va todo por ahí?");
    return true;
  }

  hablar("Ese nombre no está registrado, no te puedo ayudar.");
  return true;
}
