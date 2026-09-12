export function formatDateTime(iso: string): string {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "long",
      timeStyle: "short",
      hourCycle: "h23",
    }).format(new Date(iso));
  }

  const [, year, month, day, hour, minute] = match;
  const asUtc = new Date(
    Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
    ),
  );

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    hourCycle: "h23",
    timeZone: "UTC",
  }).format(asUtc);
}

export function formatCoordinates(lat: number, lng: number): string {
  const latHemisphere = lat >= 0 ? "N" : "S";
  const lngHemisphere = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(5)}° ${latHemisphere}, ${Math.abs(lng).toFixed(5)}° ${lngHemisphere}`;
}

