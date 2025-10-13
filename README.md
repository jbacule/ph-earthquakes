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

## 📖 Quick Start

1. **Open the app** and view the interactive earthquake map
2. **Left menu (☰)** - Configure filters, date range, and magnitude settings
3. **Right menu (☰)** - Browse earthquake list and click to zoom
4. **Map interaction** - Click markers for details, pan and zoom freely

For detailed usage instructions, see the [Usage Guide](./docs/USAGE.md).

## 💻 Technology Stack

- **Next.js 15** - React framework with App Router
- **React 19** - JavaScript library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Leaflet** - Open-source mapping library with marker clustering
- **Shadcn UI** - Accessible component library
- **USGS Earthquake API** - Real-time earthquake data

## 📁 Project Structure

```
ph-earthquakes/
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   ├── lib/             # Utilities & services
│   └── types/           # TypeScript definitions
├── public/              # Static assets
└── docs/               # Documentation
```

## 📚 Documentation

For more detailed information, see:
- [Detailed Usage Guide](./docs/USAGE.md)
- [Project Summary](./docs/PROJECT_SUMMARY.md)
- [Mobile Features](./docs/MOBILE_UPDATE.md)
- [SEO Implementation Guide](./docs/SEO_GUIDE.md)
- [SEO Summary](./docs/SEO_SUMMARY.md)
- [Post-Deployment Checklist](./docs/POST_DEPLOYMENT_CHECKLIST.md)

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

## 🌐 Data Source

Real-time earthquake data from [USGS Earthquake API](https://earthquake.usgs.gov/fdsnws/event/1/) in GeoJSON format. Updates within minutes of earthquake events.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

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
