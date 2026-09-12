export type FlavorSeries = "Original" | "Ultra" | "Juice" | "Other";

export type Flavor = {
  slug: string;
  name: string;
  series: FlavorSeries;
  description: string;
  notes: string;
  foundAt: {
    lat: number;
    lng: number;
    place: string;
  };
  capturedAt: string;
  photo: string;
  accent: string;
};
