// js/modulos/gps.js
import { hablar } from "./voz.js";

export function obtenerUbicacionBasica() {
  if (!("geolocation" in navigator)) {
    hablar("Tu dispositivo no me deja ver tu ubicación.");
    return;
  }

  hablar("Voy a ver dónde estás, un momento.");

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude.toFixed(4);
      const lon = pos.coords.longitude.toFixed(4);
      hablar(`Estás en una ubicación aproximada de latitud ${lat} y longitud ${lon}.`);
      // Más adelante: si querés dirección real, ahí sí hace falta una API externa con internet.
    },
    (err) => {
      console.error(err);
      hablar("No pude obtener tu ubicación en este momento.");
    }
  );
}
