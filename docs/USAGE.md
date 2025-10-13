# Philippines Earthquakes Map - Usage Guide

## Overview
This is an interactive web application that displays recent earthquake activity in the Philippines using data from the USGS (United States Geological Survey) Earthquake API.

## Features

### 🗺️ Interactive Map
- **OpenStreetMap** integration with Leaflet
- **Marker Clustering** - Nearby earthquakes are grouped together when zoomed out
- **Color-Coded Markers** by magnitude:
  - 🔴 Red: ≥ 7.0 (Major)
  - 🟠 Orange: 6.0 - 6.9 (Strong)
  - 🟡 Yellow: 5.0 - 5.9 (Moderate)
  - 🔵 Blue: 4.0 - 4.9 (Light)
  - ⚪ Gray: < 4.0 (Minor)
- **Detailed Popups** - Click on any marker to see:
  - Magnitude and location
  - Date and time
  - Depth
  - Alert level
  - Tsunami warning (if any)
  - Felt reports
  - Link to USGS details

### 🔍 API Query Controls
Configure USGS API queries with:
- **Date Range**:
  - Quick presets: 24 Hours, 7 Days, 30 Days
  - Custom date selection (start and end dates)
- **Magnitude Filter** (optional):
  - Minimum magnitude
  - Maximum magnitude
  - Leave empty for default (≥ 2.5)
- **Sort Order**:
  - Magnitude ↓ (descending, default)
  - Magnitude ↑ (ascending)
  - Time ↓ (most recent first)
  - Time ↑ (oldest first)

### 🎛️ Display Filters
Filter earthquakes on the map:
- **Magnitude Range** - Show only earthquakes within a specific magnitude range
- **Alert Levels** - Filter by USGS alert levels:
  - 🟢 Green (minimal threat)
  - 🟡 Yellow (moderate threat)
  - 🟠 Orange (significant threat)
  - 🔴 Red (severe threat)
- **Tsunami Warnings** - Show only earthquakes with tsunami warnings

### 📊 Stats & Information
- Total earthquake count
- Filtered earthquake count
- Largest earthquake highlight
- Last update timestamp
- Data source indicator (Live API or Local Data)

## How to Use

### 1. Start the Development Server
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### 2. Initial Load
- The app loads with local sample data from `public/data.json`
- This data contains earthquakes from October 5-12, 2025

### 3. Fetch Live Data from USGS API
1. Configure your query in the **API Query** panel:
   - Select a date range (use quick presets or custom dates)
   - Optionally set magnitude limits
   - Choose sort order
2. Click **"Fetch Data"** button
3. The map will update with fresh data from USGS

### 4. Filter the Display
- Use the **Filters** panel to narrow down what you see on the map
- Filters are applied client-side and don't require a new API call
- Click **"Clear All Filters"** to reset

### 5. Explore the Map
- Pan and zoom freely
- Click markers to see details
- Click clusters to zoom in and expand them
- Click "View Details on USGS" in popups for full earthquake information

### 6. Refresh Data
- Click the **"Refresh"** button in the header to reload current data
- If using API data, it will fetch with the same query parameters
- If using local data, it will reload from the local file

## API Details

### USGS Earthquake API
- **Base URL**: `https://earthquake.usgs.gov/fdsnws/event/1/query`
- **Format**: GeoJSON
- **Geographic Bounds**: Philippines region (4.478°N - 21.33°N, 116.191°E - 127.354°E)

### Query Parameters
- `starttime`: YYYY-MM-DD
- `endtime`: YYYY-MM-DD
- `minmagnitude`: number (optional, default ≥ 2.5)
- `maxmagnitude`: number (optional)
- `orderby`: time | time-asc | magnitude | magnitude-asc

### Example API URL
```
https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2025-10-05&endtime=2025-10-12&minlatitude=4.478&minlongitude=116.191&maxlatitude=21.33&maxlongitude=127.354&orderby=magnitude
```

## Files Structure

```
src/
├── app/
│   ├── page.tsx              # Main page with state management
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles + Leaflet CSS
├── components/
│   ├── Map.tsx               # Map container with clustering
│   ├── EarthquakeMarker.tsx  # Individual earthquake markers
│   ├── FilterPanel.tsx       # Display filters UI
│   ├── QueryControls.tsx     # API query configuration UI
│   └── ui/                   # Shadcn UI components
├── lib/
│   ├── earthquakeService.ts  # Data fetching and utilities
│   ├── usgsApi.ts           # USGS API integration
│   └── utils.ts             # Helper functions
└── types/
    └── earthquake.ts         # TypeScript type definitions

public/
└── data.json                 # Sample local earthquake data
```

## Technology Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Leaflet** - Map library
- **react-leaflet** - React bindings for Leaflet
- **react-leaflet-cluster** - Marker clustering
- **OpenStreetMap** - Map tiles

## Notes

- **CORS**: The USGS API supports CORS, so browser requests work fine
- **Rate Limiting**: USGS API has no strict rate limits but be reasonable with requests
- **Data Freshness**: Earthquake data is typically updated within minutes of an event
- **Offline Mode**: The app can work with local data when the API is unavailable
- **Responsive**: The layout is optimized for desktop viewing (mobile improvements can be added)

## Troubleshooting

### Map Not Displaying
- Check browser console for errors
- Ensure Leaflet CSS is loaded
- Try refreshing the page

### API Fetch Fails
- Check internet connection
- Verify date range is valid
- The app will show an error message with details
- You can still use local data as fallback

### Markers Not Showing
- Check if filters are too restrictive
- Verify the data has earthquakes in the selected range
- Try clearing all filters

## Future Enhancements

Possible improvements:
- Mobile-responsive sidebar (collapsible)
- Export data to CSV/JSON
- Time animation (replay earthquakes chronologically)
- Heatmap view
- Compare multiple time periods
- Email/push notifications for large earthquakes
- Custom geographic bounds selection

