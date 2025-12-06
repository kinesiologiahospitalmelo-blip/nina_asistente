import { hablar } from "./voz.js";

export function llamarContacto(nombre, telefono) {
  hablar(`Llamando a ${nombre}...`);
  window.location.href = `tel:${telefono}`;
}

export function llamarEmergencia(numero) {
  hablar(`Llamando al ${numero}...`);
  window.location.href = `tel:${numero}`;
}
