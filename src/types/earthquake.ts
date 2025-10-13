export interface EarthquakeProperties {
  mag: number;
  place: string;
  time: number; // Unix timestamp in milliseconds
  updated: number; // Last update timestamp
  url: string; // USGS event page URL
  detail: string; // Detailed API endpoint
  alert: "green" | "yellow" | "orange" | "red" | null;
  title: string;
  tsunami: number; // 0 or 1
  felt: number | null; // Number of "Did You Feel It?" reports
  cdi: number | null; // Community Decimal Intensity
  mmi: number | null; // Modified Mercalli Intensity
  sig: number; // Significance value
  status: string; // "reviewed", "automatic", etc.
  type: string; // Usually "earthquake"
  tz: null | number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst: number | null;
  dmin: number | null; // Minimum distance
  rms: number; // Root mean square
  gap: number | null; // Azimuthal gap
  magType: string; // Magnitude type
}

export interface EarthquakeGeometry {
  type: "Point";
  coordinates: [number, number, number]; // [longitude, latitude, depth in km]
}

export interface EarthquakeFeature {
  type: "Feature";
  id: string; // Unique earthquake ID
  properties: EarthquakeProperties;
  geometry: EarthquakeGeometry;
}

export interface EarthquakeMetadata {
  generated: number;
  url: string;
  title: string;
  status: number;
  api: string;
  count: number;
}

export interface EarthquakeCollection {
  type: "FeatureCollection";
  metadata: EarthquakeMetadata;
  features: EarthquakeFeature[];
  bbox: number[];
}

// Helper type for filtering
export interface EarthquakeFilters {
  minMagnitude: number;
  maxMagnitude: number;
  alertLevels: Array<"green" | "yellow" | "orange" | "red"> | null;
  tsunamiOnly: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Sorting options
export type SortOption = "time" | "magnitude" | "significance";
export type SortDirection = "asc" | "desc";

