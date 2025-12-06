import { hablar } from "./voz.js";

export function obtenerUbicacionBasica() {
  if (!("geolocation" in navigator)) {
    hablar("Tu dispositivo no permite ver la ubicación.");
    return;
  }

  hablar("Viendo tu ubicación, un momento...");

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
        const resp = await fetch(url);
        const data = await resp.json();

        const calle = data.address.road || "una calle sin nombre";
        const ciudad = data.address.city || data.address.town || data.address.village || "una zona desconocida";
        const barrio = data.address.suburb || "";
        const provincia = data.address.state || "";

        hablar(`Estás cerca de ${calle}, en ${barrio}, ${ciudad}, ${provincia}.`);
      } catch (e) {
        hablar("No pude obtener una dirección exacta, pero detecté tu ubicación aproximada.");
      }
    },

    () => {
      hablar("No pude obtener tu ubicación ahora.");
    }
  );
}
