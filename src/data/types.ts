export type Flavor = {
  slug: string;
  name: string;
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
