"use client";

import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import type { Flavor } from "@/data/types";

const WorldMap = dynamic(
  () => import("@/components/WorldMap").then((mod) => mod.WorldMap),
  { ssr: false },
);

export function MapView({ flavors }: { flavors: Flavor[] }) {
  const searchParams = useSearchParams();
  const focus = searchParams.get("focus") ?? undefined;
  return <WorldMap flavors={flavors} focusSlug={focus} />;
}
