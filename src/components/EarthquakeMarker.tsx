"use client";

import { CircleMarker, Popup } from "react-leaflet";
import { useEffect, useRef } from "react";
import type { EarthquakeFeature } from "@/types/earthquake";
import {
	formatEarthquakeDate,
	getMagnitudeColor,
	getMagnitudeRadius,
	getAlertColor,
} from "@/lib/earthquakeService";

interface EarthquakeMarkerProps {
	earthquake: EarthquakeFeature;
	shouldOpen?: boolean;
}

export default function EarthquakeMarker({
	earthquake,
	shouldOpen = false,
}: EarthquakeMarkerProps) {
	const markerRef = useRef<any>(null);

	useEffect(() => {
		if (shouldOpen && markerRef.current) {
			// Small delay to ensure map has finished animating
			setTimeout(() => {
				markerRef.current?.openPopup();
			}, 1600); // Slightly after the 1.5s fly animation
		}
	}, [shouldOpen]);
	const { properties, geometry, id } = earthquake;
	const [longitude, latitude, depth] = geometry.coordinates;

	const color = getMagnitudeColor(properties.mag);
	const radius = getMagnitudeRadius(properties.mag);

	return (
		<CircleMarker
			ref={markerRef}
			center={[latitude, longitude]}
			radius={radius}
			pathOptions={{
				fillColor: color,
				color: "#fff",
				weight: 2,
				opacity: 1,
				fillOpacity: 0.7,
			}}
		>
			<Popup maxWidth={300} className="earthquake-popup">
				<div className="space-y-2 p-2">
					<h3 className="font-bold text-lg text-gray-900">
						{properties.title}
					</h3>

					<div className="space-y-1 text-sm">
						<div className="flex justify-between">
							<span className="font-semibold text-gray-700">Magnitude:</span>
							<span
								className="font-bold"
								style={{ color: getMagnitudeColor(properties.mag) }}
							>
								{properties.mag}
							</span>
						</div>

						<div className="flex justify-between">
							<span className="font-semibold text-gray-700">Location:</span>
							<span className="text-gray-600 text-right flex-1 ml-2">
								{properties.place}
							</span>
						</div>

						<div className="flex justify-between">
							<span className="font-semibold text-gray-700">Time:</span>
							<span className="text-gray-600 text-right flex-1 ml-2">
								{formatEarthquakeDate(properties.time)}
							</span>
						</div>

						<div className="flex justify-between">
							<span className="font-semibold text-gray-700">Depth:</span>
							<span className="text-gray-600">{depth.toFixed(2)} km</span>
						</div>

						{properties.alert && (
							<div className="flex justify-between">
								<span className="font-semibold text-gray-700">Alert Level:</span>
								<span
									className="font-bold uppercase"
									style={{ color: getAlertColor(properties.alert) }}
								>
									{properties.alert}
								</span>
							</div>
						)}

						{properties.tsunami === 1 && (
							<div className="flex justify-between">
								<span className="font-semibold text-gray-700">Tsunami:</span>
								<span className="text-red-600 font-bold">Warning</span>
							</div>
						)}

						{properties.felt !== null && (
							<div className="flex justify-between">
								<span className="font-semibold text-gray-700">Felt:</span>
								<span className="text-gray-600">{properties.felt} reports</span>
							</div>
						)}

						<div className="flex justify-between">
							<span className="font-semibold text-gray-700">Status:</span>
							<span className="text-gray-600 capitalize">
								{properties.status}
							</span>
						</div>

						<div className="flex justify-between items-center text-xs text-gray-500 pt-1">
							<span>ID: {id}</span>
						</div>
					</div>

					<div className="pt-2 border-t border-gray-200">
						<a
							href={properties.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
						>
							View Details on USGS
							<svg
								className="w-4 h-4 ml-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
						</a>
					</div>
				</div>
			</Popup>
		</CircleMarker>
	);
}

