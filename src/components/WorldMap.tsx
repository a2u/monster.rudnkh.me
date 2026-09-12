"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { VStack } from "@astryxdesign/core/Layout";
import type { Flavor } from "@/data/types";
import "leaflet/dist/leaflet.css";

function pinIcon(color: string) {
  return L.divIcon({
    className: "monster-pin",
    html: `<span style="background:${color}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -12],
  });
}

function FlyTo({ flavor }: { flavor?: Flavor }) {
  const map = useMap();

  useEffect(() => {
    if (!flavor) return;
    map.flyTo([flavor.foundAt.lat, flavor.foundAt.lng], 6, { duration: 1.1 });
  }, [flavor, map]);

  return null;
}

export function WorldMap({
  flavors,
  focusSlug,
}: {
  flavors: Flavor[];
  focusSlug?: string;
}) {
  const router = useRouter();
  const focus = flavors.find((flavor) => flavor.slug === focusSlug);

  const bounds = useMemo(() => {
    if (flavors.length === 0) return undefined;
    return L.latLngBounds(
      flavors.map((flavor) => [flavor.foundAt.lat, flavor.foundAt.lng]),
    );
  }, [flavors]);

  return (
    <MapContainer
      className="map-fill"
      center={focus ? [focus.foundAt.lat, focus.foundAt.lng] : [20, 20]}
      zoom={focus ? 6 : 2}
      minZoom={2}
      worldCopyJump
      scrollWheelZoom
      bounds={focus ? undefined : bounds}
      boundsOptions={{ padding: [48, 48], maxZoom: 4 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {focus ? <FlyTo flavor={focus} /> : null}
      {flavors.map((flavor) => (
        <Marker
          key={flavor.slug}
          position={[flavor.foundAt.lat, flavor.foundAt.lng]}
          icon={pinIcon(flavor.accent)}
          eventHandlers={{
            click: () => {
              router.prefetch(`/flavors/${flavor.slug}`);
            },
          }}
        >
          <Popup>
            <VStack gap={2}>
              <Text weight="semibold">{flavor.name}</Text>
              <Text type="supporting" color="secondary">
                {flavor.foundAt.place}
              </Text>
              <Button
                label="Open card"
                variant="primary"
                size="sm"
                href={`/flavors/${flavor.slug}`}
              />
            </VStack>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
