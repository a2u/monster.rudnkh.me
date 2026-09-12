import { Suspense } from "react";
import { AppFrame } from "@/components/AppFrame";
import { getFlavors } from "@/data/loadFlavors";
import { MapView } from "@/components/MapView";
import { VisuallyHidden } from "@astryxdesign/core/VisuallyHidden";
import { Heading } from "@astryxdesign/core/Text";

export default function MapPage() {
  const flavors = getFlavors();

  return (
    <AppFrame height="fill" contentPadding={0}>
      <VisuallyHidden>
        <Heading level={1}>World map</Heading>
      </VisuallyHidden>
      <Suspense fallback={<div className="map-shell map-placeholder" />}>
        <div className="map-shell">
          <MapView flavors={flavors} />
        </div>
      </Suspense>
    </AppFrame>
  );
}
