// ==========================================
// Llamadas — Nina v2
// ==========================================

import { hablar } from "./voz.js";

export function llamarContacto(nombre, telefono) {
  hablar(`Voy a llamar a ${nombre}.`);
  // Móviles Android e iPhone abrirán el marcador
  window.location.href = `tel:${telefono}`;
}

export function llamarEmergencia(numero) {
  hablar(`Llamando al ${numero}.`);
  window.location.href = `tel:${numero}`;
}
