import { hablar } from "./voz.js";
import { obtenerUbicacionBasica } from "./gps.js";
import { llamarContacto, llamarEmergencia } from "./llamadas.js";

// Teléfonos (poné los reales)
const telefonos = {
  rodrigo: "NUMERO_RODRIGO",
  sara: "NUMERO_SARA",
  gusi: "NUMERO_GUSI",
  diego: "NUMERO_DIEGO"
};

export function manejarComandoOffline(texto) {
  const t = texto.toLowerCase().trim();

  // --- LLAMAR A MIS HIJOS ---
  if (
    t.includes("llamame con mis hijos") ||
    t.includes("llamar hijos") ||
    t.includes("llamar a mis hijos") ||
    t.includes("mis hijos")
  ) {
    hablar("¿A cuál de tus hijos querés llamar? Rodrigo, Sara o Gusi.");
    return true;
  }

  // --- LLAMAR A UNA PERSONA ESPECÍFICA ---
  if (t.includes("llamá a rodrigo") || t.includes("llama a rodrigo")) {
    llamarContacto("Rodrigo", telefonos.rodrigo);
    return true;
  }

  if (t.includes("llamá a sara") || t.includes("llama a sara")) {
    llamarContacto("Sara", telefonos.sara);
    return true;
  }

  if (t.includes("llamá a gusi") || t.includes("llama a gusi")) {
    llamarContacto("Gusi", telefonos.gusi);
    return true;
  }

  if (t.includes("llamá a diego") || t.includes("llama a diego")) {
    llamarContacto("Diego", telefonos.diego);
    return true;
  }

  // --- LLAMAR EMERGENCIAS ---
  if (t.includes("107")) {
    llamarEmergencia("107");
    return true;
  }

  if (t.includes("911")) {
    llamarEmergencia("911");
    return true;
  }

  return false;
}
