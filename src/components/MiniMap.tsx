"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import type { Flavor } from "@/data/types";
import "leaflet/dist/leaflet.css";

function pinIcon(color: string) {
  return L.divIcon({
    className: "monster-pin",
    html: `<span style="background:${color}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

export function MiniMap({ flavor }: { flavor: Flavor }) {
  return (
    <MapContainer
      className="mini-map"
      center={[flavor.foundAt.lat, flavor.foundAt.lng]}
      zoom={11}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[flavor.foundAt.lat, flavor.foundAt.lng]}
        icon={pinIcon(flavor.accent)}
      />
    </MapContainer>
  );
}
