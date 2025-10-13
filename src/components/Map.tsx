"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import type { EarthquakeFeature } from "@/types/earthquake";
import EarthquakeMarker from "./EarthquakeMarker";
import "leaflet/dist/leaflet.css";
import { useEffect, useImperativeHandle, forwardRef, useState } from "react";
import L from "leaflet";
import type { MapTheme } from "@/types/mapTheme";

// Fix for default marker icon in react-leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
	iconUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
	shadowUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface MapProps {
	earthquakes: EarthquakeFeature[];
	theme: MapTheme;
}

export interface MapRef {
	flyToLocation: (lat: number, lng: number, zoom?: number) => void;
	openPopupById: (earthquakeId: string) => void;
}

// Component to control map from outside
function MapController({ targetLocation }: { targetLocation: [number, number, number] | null }) {
	const map = useMap();

	useEffect(() => {
		if (targetLocation) {
			const [lat, lng, zoom] = targetLocation;
			map.flyTo([lat, lng], zoom, {
				duration: 1.5,
			});
		}
	}, [targetLocation, map]);

	return null;
}

const Map = forwardRef<MapRef, MapProps>(({ earthquakes, theme }, ref) => {
	const [targetLocation, setTargetLocation] = useState<[number, number, number] | null>(null);
	const [targetPopupId, setTargetPopupId] = useState<string | null>(null);

	useImperativeHandle(ref, () => ({
		flyToLocation: (lat: number, lng: number, zoom: number = 12) => {
			setTargetLocation([lat, lng, zoom]);
		},
		openPopupById: (earthquakeId: string) => {
			setTargetPopupId(earthquakeId);
			// Reset after a delay to allow the popup to open
			setTimeout(() => setTargetPopupId(null), 500);
		},
	}));

	useEffect(() => {
		// Force a re-render when leaflet is loaded
		if (typeof window !== "undefined") {
			window.dispatchEvent(new Event("resize"));
		}
	}, []);

	// Philippines center coordinates
	const center: [number, number] = [12.8797, 121.774];
	const zoom = 6;

	return (
		<div className="h-full w-full">
			<MapContainer
				center={center}
				zoom={zoom}
				className="h-full w-full"
				scrollWheelZoom={true}
			>
				<MapController targetLocation={targetLocation} />
				<TileLayer
					attribution={theme.attribution}
					url={theme.url}
				/>

				<MarkerClusterGroup
					chunkedLoading
					maxClusterRadius={50}
					spiderfyOnMaxZoom={true}
					showCoverageOnHover={false}
					zoomToBoundsOnClick={true}
					iconCreateFunction={(cluster: any) => {
						const count = cluster.getChildCount();
						let size = "small";
						let bgColor = "bg-blue-500";

						if (count > 50) {
							size = "large";
							bgColor = "bg-red-500";
						} else if (count > 20) {
							size = "medium";
							bgColor = "bg-orange-500";
						}

						const sizeClass =
							size === "large"
								? "w-12 h-12 text-lg"
								: size === "medium"
									? "w-10 h-10 text-base"
									: "w-8 h-8 text-sm";

						return L.divIcon({
							html: `<div class="${sizeClass} ${bgColor} rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white">${count}</div>`,
							className: "custom-cluster-icon",
							iconSize: L.point(40, 40, true),
						});
					}}
				>
					{earthquakes.map((earthquake) => (
						<EarthquakeMarker 
							key={earthquake.id} 
							earthquake={earthquake}
							shouldOpen={targetPopupId === earthquake.id}
						/>
					))}
				</MarkerClusterGroup>
			</MapContainer>
		</div>
	);
});

Map.displayName = "Map";

export default Map;

