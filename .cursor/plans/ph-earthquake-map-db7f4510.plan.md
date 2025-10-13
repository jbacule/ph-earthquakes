<!-- db7f4510-bd71-410e-a445-ff31a54855e2 4cd71ba3-49cf-4ffe-8ba0-9b393fd77665 -->
# Philippines Earthquake Map Implementation

## 1. Install Dependencies

Add required packages for mapping and clustering:

- `leaflet` - Core mapping library
- `react-leaflet` - React bindings for Leaflet
- `react-leaflet-cluster` - Marker clustering
- `@types/leaflet` - TypeScript definitions

## 2. Create Type Definitions

Create `src/types/earthquake.ts` with comprehensive interfaces based on data.json analysis:

**EarthquakeProperties** interface including:

- `mag: number` - Magnitude (e.g., 7.4, 6.7)
- `place: string` - Location description (e.g., "20 km E of Santiago, Philippines")
- `time: number` - Unix timestamp in milliseconds (convert to readable format)
- `url: string` - USGS event page URL for details
- `alert: string | null` - Alert level: "green", "yellow", "orange", "red", or null
- `title: string` - Full title (e.g., "M 7.4 - 20 km E of Santiago, Philippines")
- `tsunami: number` - Tsunami warning flag (0 or 1)
- `felt: number | null` - Number of "Did You Feel It?" reports
- `sig: number` - Significance value for sorting (higher = more significant)
- `status: string` - Review status ("reviewed", "automatic", etc.)
- `type: string` - Event type (usually "earthquake")
- `updated: number` - Last update timestamp

**EarthquakeGeometry** interface:

- `type: "Point"` - GeoJSON geometry type
- `coordinates: [number, number, number]` - [longitude, latitude, depth in km]

**EarthquakeFeature** interface:

- `type: "Feature"` - GeoJSON feature type
- `id: string` - Unique earthquake ID (e.g., "us6000rfwz")
- `properties: EarthquakeProperties`
- `geometry: EarthquakeGeometry`

**EarthquakeCollection** interface:

- `type: "FeatureCollection"`
- `features: EarthquakeFeature[]`
- `metadata: { generated: number, count: number, title: string, url: string }`

These types support filtering by: magnitude range, alert level, tsunami warning, date range, significance, and sorting by time, magnitude, or significance.

## 3. Build Map Component

Create `src/components/Map.tsx` as a client component with:

- Dynamic import to handle Leaflet's SSR issues in Next.js 15
- OpenStreetMap tile layer
- Initial view centered on Philippines (lat: 12.8797, lng: 121.774, zoom: 6)
- Pan/zoom controls enabled

## 4. Create Earthquake Markers

Build `src/components/EarthquakeMarker.tsx` with:

- Custom marker colors based on magnitude ranges:
  - Red for mag >= 7.0
  - Orange for mag >= 6.0
  - Yellow for mag >= 5.0
  - Blue for mag >= 4.0
  - Gray for mag < 4.0
- Popup showing: magnitude, location, date/time, depth, alert level, and link to USGS details
- Marker size variations based on magnitude

## 5. Add Marker Clustering

Integrate `react-leaflet-cluster` in Map component to:

- Group nearby markers when zoomed out
- Show cluster count
- Expand clusters on click
- Apply custom cluster styling

## 6. Build Filter Component

Create `src/components/FilterPanel.tsx` with:

- Magnitude range slider (min/max magnitude filter)
- Date range picker or presets (last 24h, 7 days, etc.)
- Alert level filter (green, yellow, orange, red)
- Toggle for tsunami warnings
- Clear filters button

## 7. Create Data Fetching Service

Build `src/lib/earthquakeService.ts` with:

- Function to fetch from API endpoint
- Function to load local data.json as fallback
- Error handling
- Data transformation/validation

## 8. Build Main Page

Update `src/app/page.tsx` to:

- Fetch earthquake data on mount
- Add refresh button to reload data
- Pass filtered data to Map component
- Include FilterPanel with state management
- Show loading states and error handling
- Display metadata (count, date range, last updated)

## 9. Style Components

Create `src/components/ui/` components if needed:

- Use shadcn/ui components for filters (Slider, Select, Button)
- Add Tailwind classes for layout and responsive design
- Ensure map takes full viewport height minus header

## 10. Update Metadata and Layout

Update `src/app/layout.tsx`:

- Change title to "Philippines Earthquakes Map"
- Update description
- Add Leaflet CSS import

## 11. Add Leaflet CSS

Ensure Leaflet styles are loaded by importing in layout or adding to globals.css:

```css
@import 'leaflet/dist/leaflet.css';
```

## Key Files to Create/Modify

- `src/types/earthquake.ts` - Type definitions
- `src/components/Map.tsx` - Main map component
- `src/components/EarthquakeMarker.tsx` - Individual markers
- `src/components/FilterPanel.tsx` - Filter controls
- `src/lib/earthquakeService.ts` - Data fetching
- `src/app/page.tsx` - Main page with integration
- `src/app/layout.tsx` - Metadata updates
- `src/app/globals.css` - Leaflet CSS import

### To-dos

- [ ] Install leaflet, react-leaflet, react-leaflet-cluster, and @types/leaflet
- [ ] Create earthquake type definitions based on USGS GeoJSON format
- [ ] Build earthquake data fetching service with API and local fallback
- [ ] Create base Map component with OpenStreetMap and Philippines view
- [ ] Build EarthquakeMarker with magnitude-based colors and detail popups
- [ ] Add marker clustering functionality to Map component
- [ ] Create FilterPanel with magnitude, date, alert level, and tsunami filters
- [ ] Integrate all components in main page with state management and refresh button
- [ ] Add Leaflet CSS, apply Tailwind styling, and ensure responsive layout
- [ ] Update app metadata and layout title/description