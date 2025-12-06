// js/modulos/llamadas.js
import { hablar } from "./voz.js";

export function llamarContacto(nombre, telefono) {
  hablar(`Llamando a ${nombre}...`);
  setTimeout(() => {
    window.location.href = `tel:${telefono}`;
  }, 350);
}

export function llamarEmergencia(numero) {
  hablar(`Llamando al ${numero}...`);
  setTimeout(() => {
    window.location.href = `tel:${numero}`;
  }, 350);
}
