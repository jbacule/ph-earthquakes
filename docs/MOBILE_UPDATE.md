# Mobile-Friendly Update

## ✅ Changes Implemented

### 1. **Collapsible Sidebar with Burger Menu**
- Left burger menu (☰) opens filter/settings panel
- Sidebar is now a Sheet component that slides from the left
- Contains:
  - API Query Controls (date range, magnitude, sort order)
  - Display Filters (magnitude range, alert levels, tsunami toggle)
  - Magnitude Legend
- Fully responsive and mobile-friendly
- Closes automatically when needed

### 2. **Earthquake List Panel**
- Right burger menu (☰) opens earthquake list
- Slides from the right side
- Shows scrollable list of all filtered earthquakes
- Each item displays:
  - Magnitude with color coding
  - Location
  - Date/time
  - Depth
  - Alert level (if any)
  - Tsunami warning (if any)
  - Felt reports count
- **Click to zoom**: Clicking any earthquake automatically:
  - Zooms to that location on the map (zoom level 12)
  - Closes the list panel
  - Centers the map on the earthquake

### 3. **Fully Responsive Header**
- Compact mobile layout
- Burger menus on both sides for easy thumb access
- Responsive title and stats
- Refresh button always accessible
- Shows earthquake count on mobile

### 4. **Full-Screen Map**
- Map now takes the full screen space
- No permanent sidebars
- Better mobile experience
- All controls accessible via sheets

## 📱 Mobile Experience

### Layout:
```
┌─────────────────────────────┐
│ ☰  Philippines Earthquakes ☰│  ← Header with burger menus
├─────────────────────────────┤
│                             │
│                             │
│        MAP (Full Screen)    │  ← Interactive map
│                             │
│                             │
└─────────────────────────────┘
```

### Interactions:

1. **Left Burger (☰)** → Opens Filters & Settings
   - Configure API query
   - Set display filters
   - View legend

2. **Right Burger (☰)** → Opens Earthquake List
   - Scroll through all earthquakes
   - Click any item to zoom to location
   - Auto-closes after selection

3. **Map Interaction**
   - Click markers for details
   - Pan and zoom freely
   - Cluster expansion

## 🎯 Features

### Auto-Zoom Functionality
When you click an earthquake in the list:
- Map smoothly flies to the location
- Zooms to level 12 for detailed view
- List panel automatically closes
- Duration: 1.5 seconds smooth animation

### Responsive Design
- Mobile-first approach
- Touch-friendly buttons
- Optimized for small screens
- Works on tablets and desktops
- Sidebars become sheets on mobile

## 🚀 Technical Implementation

### New Components:
1. **EarthquakeList** (`src/components/EarthquakeList.tsx`)
   - Displays earthquake cards
   - Handles click events
   - Color-coded by magnitude

2. **Map with Ref** (`src/components/Map.tsx`)
   - Exposed `flyToLocation` method
   - MapController for external control
   - ForwardRef for parent access

### State Management:
- `filterSheetOpen` - Controls left sheet visibility
- `listSheetOpen` - Controls right sheet visibility
- `mapRef` - Reference to map for programmatic control

### Mobile Optimizations:
- Icon-only buttons on mobile
- Truncated text for small screens
- Responsive font sizes
- Touch-friendly spacing

## 📏 Breakpoints

- **Mobile** (< 640px): Icon buttons, compact layout
- **Tablet** (640px - 768px): Some text visible
- **Desktop** (> 768px): Full layout with all details

## 🎨 UI Improvements

1. **Header**:
   - Burger menus instead of permanent sidebars
   - Responsive stats display
   - Compact on mobile, expanded on desktop

2. **Sheets**:
   - Smooth slide-in animations
   - Overlay backdrop
   - Easy close (X button or backdrop click)
   - Scrollable content

3. **Earthquake Cards**:
   - Color-coded left border
   - Clear magnitude display
   - Clickable with hover effects
   - Visual "Click to view" indicator

## 🔄 User Flow

1. Open app → Map loads with data
2. Click left ☰ → Configure filters
3. Click right ☰ → View list
4. Click earthquake → Zoom to location
5. List closes → View on map
6. Click marker → See details

Perfect for mobile earthquake monitoring! 📱🌏

