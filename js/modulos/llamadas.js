// js/modulos/llamadas.js
import { hablar } from "./voz.js";

export function llamarContacto(nombre, telefono) {
  hablar(`Voy a llamar a ${nombre}.`);
  // En un celu Android, esto abre el dialer:
  window.location.href = `tel:${telefono}`;
}

export function llamarEmergencia(numero) {
  hablar(`Voy a llamar al ${numero}.`);
  window.location.href = `tel:${numero}`;
}
