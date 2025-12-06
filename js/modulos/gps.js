// ==========================================
// GPS — Nina v2
// ==========================================

import { hablar } from "./voz.js";

export function obtenerUbicacionBasica() {
  if (!("geolocation" in navigator)) {
    hablar("Tu dispositivo no permite ver la ubicación.");
    return;
  }

  hablar("Viendo tu ubicación, un momento...");

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude.toFixed(4);
      const lon = pos.coords.longitude.toFixed(4);
      hablar(`Estás en una zona aproximada con latitud ${lat} y longitud ${lon}.`);
    },
    () => {
      hablar("No pude obtener tu ubicación ahora.");
    }
  );
}
