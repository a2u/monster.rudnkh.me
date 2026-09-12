"use client";

import dynamic from "next/dynamic";
import type { Flavor } from "@/data/types";

const MiniMap = dynamic(
  () => import("@/components/MiniMap").then((mod) => mod.MiniMap),
  { ssr: false },
);

export function MiniMapView({ flavor }: { flavor: Flavor }) {
  return <MiniMap flavor={flavor} />;
}
