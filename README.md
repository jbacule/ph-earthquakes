# 🌏 Philippines Earthquakes Map

An interactive, real-time earthquake monitoring application for the Philippines region. Built with Next.js 15, React 19, and powered by live data from the USGS Earthquake API.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🗺️ Interactive Map
- **OpenStreetMap** integration with Leaflet
- **Marker Clustering** - Automatic grouping of nearby earthquakes
- **Color-coded markers** by magnitude (red, orange, yellow, blue, gray)
- **Auto-zoom to earthquakes** from the list
- **Detailed popups** with comprehensive earthquake information

### 📱 Mobile-First Design
- **Collapsible sidebars** with burger menu navigation
- **Full-screen map** for better viewing
- **Touch-friendly** controls and interactions
- **Responsive layout** for all screen sizes

### 🔍 Advanced Filtering
- **Magnitude range** slider
- **Alert level** filters (green, yellow, orange, red)
- **Tsunami warnings** toggle
- **Date range** selection with quick presets
- **Sort options** (time/magnitude, ascending/descending)

### 📊 Real-Time Data
- **Live USGS API** integration
- **Automatic data fetching** on load
- **Manual refresh** capability
- **Philippines region** bounded (4.478°N - 21.33°N, 116.191°E - 127.354°E)

### 📋 Earthquake List
- **Scrollable list** of all filtered earthquakes
- **Click to zoom** and auto-open details
- **Color-coded cards** by magnitude
- **Quick stats** at a glance

### 🔍 SEO & Performance
- **Comprehensive SEO** optimization with structured data
- **Social media** ready with Open Graph and Twitter Cards
- **PWA capable** - installable as mobile app
- **Performance optimized** for Core Web Vitals
- **Accessibility** enhanced with ARIA labels

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ph-earthquakes

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
```

## 📖 Usage

### Basic Navigation

1. **Left Menu (☰)** - Opens filters and settings
   - Configure API query parameters
   - Set display filters
   - View magnitude legend

2. **Right Menu (☰)** - Opens earthquake list
   - Browse all earthquakes
   - Click any item to zoom to location
   - Details auto-open on the map

3. **Map Interaction**
   - Click markers for detailed popup
   - Pan and zoom freely
   - Click clusters to expand

### Fetching Data

1. Click the left menu to open filters
2. Configure date range (or use presets: 24h, 7d, 30d)
3. Optionally set magnitude filters
4. Choose sort order
5. Click "Fetch Data" button
6. Map updates with fresh USGS data

### Filtering Display

- Use magnitude range slider to narrow results
- Select specific alert levels
- Toggle tsunami warnings only
- Filters apply instantly without refetching

## 🎨 Technology Stack

### Core
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first styling

### Mapping
- **Leaflet 1.9.4** - Open-source mapping library
- **react-leaflet 5.0.0** - React bindings for Leaflet
- **react-leaflet-cluster 3.1.1** - Marker clustering
- **OpenStreetMap** - Free map tiles

### UI Components
- **Shadcn UI** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library

### Data Source
- **USGS Earthquake API** - Real-time earthquake data
- **GeoJSON** format for geographic data

## 📁 Project Structure

```
ph-earthquakes/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main application page
│   │   ├── layout.tsx            # Root layout with metadata
│   │   └── globals.css           # Global styles + Leaflet CSS
│   ├── components/
│   │   ├── Map.tsx               # Leaflet map with clustering
│   │   ├── EarthquakeMarker.tsx  # Individual earthquake markers
│   │   ├── EarthquakeList.tsx    # Scrollable earthquake list
│   │   ├── FilterPanel.tsx       # Display filters UI
│   │   ├── QueryControls.tsx     # API query configuration
│   │   └── ui/                   # Shadcn UI components
│   ├── lib/
│   │   ├── earthquakeService.ts  # Data fetching & utilities
│   │   ├── usgsApi.ts           # USGS API integration
│   │   └── utils.ts             # Helper functions
│   └── types/
│       └── earthquake.ts         # TypeScript type definitions
├── public/
│   └── data.json                 # Sample earthquake data
├── docs/                         # Additional documentation
│   ├── USAGE.md                  # Detailed usage guide
│   ├── PROJECT_SUMMARY.md        # Implementation details
│   └── MOBILE_UPDATE.md          # Mobile features documentation
└── README.md                     # This file
```

## 🎯 Key Features Explained

### Auto-Zoom & Popup
When you click an earthquake in the list:
1. Map smoothly flies to the location (1.5s animation)
2. Popup automatically opens showing details
3. List panel closes for better viewing

### Magnitude Color Scheme
- 🔴 **≥ 7.0** - Major (Red)
- 🟠 **6.0-6.9** - Strong (Orange)  
- 🟡 **5.0-5.9** - Moderate (Yellow)
- 🔵 **4.0-4.9** - Light (Blue)
- ⚪ **< 4.0** - Minor (Gray)

### USGS API Query Parameters
- `starttime` / `endtime` - Date range (YYYY-MM-DD)
- `minmagnitude` / `maxmagnitude` - Magnitude filters
- `orderby` - Sort order (time/magnitude, asc/desc)
- `minlatitude` / `maxlatitude` - Philippines bounds
- `minlongitude` / `maxlongitude` - Philippines bounds

## 📚 Documentation

For more detailed information, see:
- [Detailed Usage Guide](./docs/USAGE.md)
- [Project Summary](./docs/PROJECT_SUMMARY.md)
- [Mobile Features](./docs/MOBILE_UPDATE.md)
- [SEO Implementation Guide](./docs/SEO_GUIDE.md) ⭐ NEW
- [SEO Summary](./docs/SEO_SUMMARY.md) ⭐ NEW
- [Post-Deployment Checklist](./docs/POST_DEPLOYMENT_CHECKLIST.md) ⭐ NEW

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev          # Start dev server with Turbopack
pnpm build        # Create production build
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run Biome linter
pnpm format       # Format code with Biome
```

### Environment Setup

No environment variables required! The app uses public USGS API endpoints.

## 🌐 API Information

**USGS Earthquake API**
- Base URL: `https://earthquake.usgs.gov/fdsnws/event/1/query`
- Format: GeoJSON
- Documentation: [USGS API Docs](https://earthquake.usgs.gov/fdsnws/event/1/)
- Rate Limits: None (reasonable use)
- Real-time Updates: Within minutes of earthquake events

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Creator

**Josh Bacule**
- Website: [jbacule.dev](https://jbacule.dev)
- Portfolio: Full-stack Software Engineer

## 🙏 Acknowledgments

- [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/) - Real-time earthquake data
- [OpenStreetMap](https://www.openstreetmap.org/) - Free map tiles
- [Leaflet](https://leafletjs.com/) - Open-source mapping library
- [Shadcn UI](https://ui.shadcn.com/) - Beautiful component library

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Built with ❤️ for earthquake monitoring in the Philippines** 🇵🇭  
**Created by [Josh Bacule](https://jbacule.dev)**
