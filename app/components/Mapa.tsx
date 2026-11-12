"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";

// TODO: ponto exato do terreno ainda não confirmado (coordenada aproximada da rua).
const EMPREENDIMENTO: [number, number] = [-27.67937, -48.76879];
const PREFEITURA: [number, number] = [-27.6822943, -48.7645033];

export default function Mapa() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: LeafletMap | undefined;
    let cancelado = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelado || !ref.current) return;

      map = L.map(ref.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      }).setView([-27.6808, -48.7667], 15);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);

      const icone = (svg: string, extra = "") =>
        L.divIcon({
          className: "",
          html: `<div class="pino ${extra}">${svg}</div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

      const casa =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/></svg>';
      const predio =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>';

      L.marker(EMPREENDIMENTO, { icon: icone(casa) })
        .addTo(map)
        .bindTooltip("Paraíso das Águas", { direction: "top", offset: [0, -16] });
      L.marker(PREFEITURA, { icon: icone(predio, "pino-sec") })
        .addTo(map)
        .bindTooltip("Nova sede da Prefeitura", { direction: "top", offset: [0, -16] });
    })();

    return () => {
      cancelado = true;
      map?.remove();
    };
  }, []);

  return (
    <div className="mapa h-[380px] w-full overflow-hidden rounded-3xl md:h-[520px]">
      <div ref={ref} className="h-full w-full" />
    </div>
  );
}
