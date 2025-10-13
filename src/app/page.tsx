"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import type {
	EarthquakeCollection,
	EarthquakeFeature,
	EarthquakeFilters,
} from "@/types/earthquake";
import {
	fetchEarthquakes,
	formatEarthquakeDate,
} from "@/lib/earthquakeService";
import { getDateRange, type USGSQueryParams } from "@/lib/usgsApi";
import FilterPanel from "@/components/FilterPanel";
import QueryControls from "@/components/QueryControls";
import EarthquakeList from "@/components/EarthquakeList";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { MapRef } from "@/components/Map";
import Image from "next/image";
import { MAP_THEMES, DEFAULT_THEME_ID } from "@/types/mapTheme";
import type { MapTheme } from "@/types/mapTheme";

// Dynamic import to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/Map"), {
	ssr: false,
	loading: () => (
		<div className="h-full w-full flex items-center justify-center bg-gray-100">
			<div className="text-center space-y-2">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
				<p className="text-gray-600">Loading map...</p>
			</div>
		</div>
	),
});

export default function Home() {
	const [data, setData] = useState<EarthquakeCollection | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filters, setFilters] = useState<EarthquakeFilters>({
		minMagnitude: 0,
		maxMagnitude: 10,
		alertLevels: null,
		tsunamiOnly: false,
	});
	const [filterSheetOpen, setFilterSheetOpen] = useState(false);
	const [listSheetOpen, setListSheetOpen] = useState(false);
	const [mapTheme, setMapTheme] = useState<MapTheme>(
		MAP_THEMES.find((t) => t.id === DEFAULT_THEME_ID) || MAP_THEMES[0]
	);
	
	const mapRef = useRef<MapRef>(null);

	// Initialize with last 7 days
	const [queryParams, setQueryParams] = useState<USGSQueryParams>({
		...getDateRange(7),
		orderBy: "magnitude",
	});

	const loadData = async () => {
		setLoading(true);
		setError(null);
		try {
			const earthquakeData = await fetchEarthquakes(queryParams);
			setData(earthquakeData);
		} catch (err) {
			setError(
				"Failed to fetch from USGS API. Please check your connection or try again.",
			);
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleFetchFromAPI = () => {
		loadData();
	};

	const handleEarthquakeClick = (earthquake: EarthquakeFeature) => {
		const [lng, lat] = earthquake.geometry.coordinates;
		mapRef.current?.flyToLocation(lat, lng, 12);
		// Open the popup after flying to location
		setTimeout(() => {
			mapRef.current?.openPopupById(earthquake.id);
		}, 100); // Small delay to ensure flyToLocation is called first
		setListSheetOpen(false); // Close the list sheet after clicking
	};

	useEffect(() => {
		loadData(); // Load API data on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Filter earthquakes based on current filters
	const filteredEarthquakes = useMemo(() => {
		if (!data) return [];

		return data.features.filter((earthquake: EarthquakeFeature) => {
			const { properties } = earthquake;

			// Magnitude filter
			if (
				properties.mag < filters.minMagnitude ||
				properties.mag > filters.maxMagnitude
			) {
				return false;
			}

			// Alert level filter
			if (filters.alertLevels && filters.alertLevels.length > 0) {
				if (!properties.alert || !filters.alertLevels.includes(properties.alert)) {
					return false;
				}
			}

			// Tsunami filter
			if (filters.tsunamiOnly && properties.tsunami !== 1) {
				return false;
			}

			return true;
		});
	}, [data, filters]);

	// Get largest magnitude earthquake
	const largestEarthquake = useMemo(() => {
		if (!filteredEarthquakes.length) return null;
		return filteredEarthquakes.reduce((max, current) =>
			current.properties.mag > max.properties.mag ? current : max
		);
	}, [filteredEarthquakes]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center space-y-4">
					<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto" />
					<p className="text-xl text-gray-600">Loading earthquake data...</p>
				</div>
			</div>
		);
	}

	if (error || !data) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<Card className="p-8 max-w-md text-center space-y-4">
					<div className="text-red-500 text-5xl">⚠️</div>
					<h1 className="text-2xl font-bold text-gray-900">Error Loading Data</h1>
					<p className="text-gray-600">{error || "An unknown error occurred"}</p>
					<Button onClick={loadData}>Try Again</Button>
				</Card>
			</div>
		);
	}

	// Structured data for SEO
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebApplication",
				"name": "Philippines Earthquakes Map",
				"description": "Interactive earthquake monitoring application for the Philippines with real-time USGS data",
				"url": "https://ph-earthquakes.jbacule.dev",
				"applicationCategory": "UtilityApplication",
				"operatingSystem": "Web Browser",
				"offers": {
					"@type": "Offer",
					"price": "0",
					"priceCurrency": "USD"
				},
				"author": {
					"@type": "Person",
					"name": "Josh Bacule",
					"url": "https://jbacule.dev"
				},
				"publisher": {
					"@type": "Person",
					"name": "Josh Bacule",
					"url": "https://jbacule.dev"
				},
				"datePublished": "2024-01-01",
				"dateModified": new Date().toISOString().split('T')[0],
				"keywords": "Philippines earthquakes, earthquake map, seismic activity, USGS data, real-time monitoring",
				"browserRequirements": "Requires JavaScript. Requires HTML5.",
				"featureList": [
					"Real-time earthquake monitoring",
					"Interactive map visualization",
					"Magnitude filtering",
					"Date range selection",
					"Alert level filtering",
					"Tsunami warnings",
					"Detailed earthquake information",
					"Mobile-responsive design"
				]
			},
			{
				"@type": "Organization",
				"name": "Philippines Earthquakes Map",
				"url": "https://ph-earthquakes.jbacule.dev",
				"logo": "https://ph-earthquakes.jbacule.dev/icon.png",
				"sameAs": [
					"https://jbacule.dev"
				]
			},
			{
				"@type": "Dataset",
				"name": "Philippines Earthquake Data",
				"description": "Real-time earthquake data for the Philippines region from USGS",
				"url": "https://ph-earthquakes.jbacule.dev",
				"keywords": "earthquakes, Philippines, seismic activity, USGS, real-time data",
				"creator": {
					"@type": "Person",
					"name": "Josh Bacule",
					"url": "https://jbacule.dev"
				},
				"distribution": {
					"@type": "DataDownload",
					"encodingFormat": "application/json",
					"contentUrl": "https://earthquake.usgs.gov/fdsnws/event/1/query"
				},
				"spatialCoverage": {
					"@type": "Place",
					"geo": {
						"@type": "GeoShape",
						"box": "4.478 116.191 21.33 127.354"
					},
					"name": "Philippines"
				},
				"temporalCoverage": `${queryParams.startTime || ''}/${queryParams.endTime || ''}`,
				"variableMeasured": [
					{
						"@type": "PropertyValue",
						"name": "Magnitude",
						"description": "Earthquake magnitude on the Richter scale"
					},
					{
						"@type": "PropertyValue",
						"name": "Depth",
						"description": "Earthquake depth in kilometers"
					},
					{
						"@type": "PropertyValue",
						"name": "Alert Level",
						"description": "USGS alert level (green, yellow, orange, red)"
					}
				]
			}
		]
	};

	return (
		<div className="h-screen flex flex-col">
			{/* Structured Data for SEO */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			
			{/* Header */}
			<header className="bg-white border-b border-gray-200 shadow-sm z-10 relative">
				<div className="px-4 py-3 flex items-center justify-between gap-2">
					{/* Center: Title */}
					<div className="flex items-center gap-2 min-w-0 flex-1">
						<div className="shrink-0 relative w-6 h-6 sm:w-8 sm:h-8">
							<Image
								src="/icon.png"
								alt="Earthquake Icon"
								width={32}
								height={32}
								className="w-full h-full object-contain"
								priority
							/>
						</div>
						<div className="min-w-0 flex-1">
							<h1 className="text-sm sm:text-xl font-bold text-gray-900 truncate">
								Philippines Earthquakes
							</h1>
							<div className="flex items-center gap-2 flex-wrap">
								<p className="text-xs text-gray-500 hidden sm:inline">
									{data.metadata.title}
								</p>
								<Badge variant="default" className="text-xs">
									🌐 Live
								</Badge>
								<span className="text-xs font-semibold text-gray-900 sm:hidden">
									{filteredEarthquakes.length} quakes
								</span>
							</div>
						</div>
					</div>

					{/* Right: Info */}
					<div className="flex items-center gap-2 shrink-0">
						<div className="hidden md:block text-right">
							<p className="text-sm font-semibold text-gray-900">
								{filteredEarthquakes.length} Earthquakes
							</p>
							<p className="text-xs text-gray-500">
								Last updated:{" "}
								{formatEarthquakeDate(data.metadata.generated)}
							</p>
						</div>
					</div>
				</div>

				{/* Stats Bar */}
				{largestEarthquake && (
					<div className="px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border-t border-gray-200">
						<div className="flex items-center justify-between text-sm flex-wrap gap-2">
							<div className="flex items-center gap-2">
								<span className="font-semibold text-red-700">⚡ Largest:</span>
								<span className="text-gray-900">
									M {largestEarthquake.properties.mag} - {largestEarthquake.properties.place}
								</span>
							</div>
							<div className="flex items-center gap-3">
								<a
									href={largestEarthquake.properties.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:text-blue-800 font-medium"
								>
									View Details →
								</a>
							</div>
						</div>
					</div>
				)}
			</header>

			{/* Main Content - Full screen map */}
			<main className="flex-1 relative overflow-hidden">
				<Map ref={mapRef} earthquakes={filteredEarthquakes} theme={mapTheme} />
				
				{/* Map Overlay Controls - Top Left */}
				<div className="absolute top-[85px] left-3 z-[1000] flex flex-col gap-2">
					{/* Filter Button */}
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="default"
								size="icon"
								onClick={() => setFilterSheetOpen(true)}
								className="bg-white hover:bg-gray-50 text-gray-700 shadow-lg border border-gray-300 w-[34px] h-[34px]"
								aria-label="Open filters and settings"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
									/>
								</svg>
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={10}>
							<p>Filters & Settings</p>
						</TooltipContent>
					</Tooltip>

					{/* Earthquake List Button */}
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="default"
								size="icon"
								onClick={() => setListSheetOpen(true)}
								className="bg-white hover:bg-gray-50 text-gray-700 shadow-lg border border-gray-300 w-[34px] h-[34px]"
								aria-label="View earthquake list"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 10h16M4 14h16M4 18h16"
									/>
								</svg>
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={10}>
							<p>Earthquake List</p>
						</TooltipContent>
					</Tooltip>

					{/* Theme Switcher Button with Dropdown */}
					<div className="relative group">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="default"
									size="icon"
									className="bg-white hover:bg-gray-50 text-gray-700 shadow-lg border border-gray-300 w-[34px] h-[34px]"
									aria-label="Change map theme"
								>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
										/>
									</svg>
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={10}>
								<p>Change Map Theme</p>
							</TooltipContent>
						</Tooltip>
						{/* Dropdown Menu */}
						<div className="absolute left-full ml-2 top-0 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
							<div className="p-2">
								<div className="text-xs font-semibold text-gray-500 px-3 py-2">
									MAP THEME
								</div>
								{MAP_THEMES.map((theme) => (
									<button
										key={theme.id}
										type="button"
										onClick={() => setMapTheme(theme)}
										className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
											mapTheme.id === theme.id
												? "bg-blue-50 text-blue-700"
												: "hover:bg-gray-50 text-gray-700"
										}`}
									>
										<div className="flex items-center justify-between gap-2">
											<div className="flex-1 min-w-0">
												<div className="font-medium text-sm">
													{theme.name}
												</div>
												<div className="text-xs text-gray-500 truncate">
													{theme.description}
												</div>
											</div>
											{mapTheme.id === theme.id && (
												<svg
													className="w-4 h-4 text-blue-600 shrink-0"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											)}
										</div>
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Refresh Button */}
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="default"
								size="icon"
								onClick={loadData}
								disabled={loading}
								className="bg-white hover:bg-gray-50 text-gray-700 shadow-lg border border-gray-300 w-[34px] h-[34px] disabled:opacity-50"
								aria-label="Refresh earthquake data"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
									/>
								</svg>
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right" sideOffset={10}>
							<p>Refresh Data</p>
						</TooltipContent>
					</Tooltip>
				</div>

				{/* Footer Credit - Bottom Left */}
				<div className="absolute bottom-2 left-2 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-md border border-gray-200">
					<a
						href="https://jbacule.dev"
						target="_blank"
						rel="noopener noreferrer"
						className="text-xs text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
					>
						<span>Created by</span>
						<span className="font-semibold">Josh Bacule</span>
						<svg
							className="w-3 h-3"
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
			</main>

			{/* Filter Sheet (Left Side) */}
			<Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
				<SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
					<SheetHeader>
						<SheetTitle>Filters & Settings</SheetTitle>
						<SheetDescription>
							Configure API query and display filters
						</SheetDescription>
					</SheetHeader>
					
					<div className="space-y-4 mt-4">
						{/* API Query Controls */}
						<QueryControls
							queryParams={queryParams}
							onQueryParamsChange={setQueryParams}
							onFetch={handleFetchFromAPI}
							loading={loading}
						/>

						{/* Filters */}
						<FilterPanel
							filters={filters}
							onFiltersChange={setFilters}
							totalCount={data.features.length}
							filteredCount={filteredEarthquakes.length}
						/>

						{/* Legend */}
						<Card className="p-4 space-y-3">
							<h3 className="text-sm font-bold text-gray-900">Magnitude Legend</h3>
							<div className="space-y-2 text-xs">
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 rounded-full bg-red-600" />
									<span>≥ 7.0 - Major</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 rounded-full bg-orange-500" />
									<span>6.0 - 6.9 - Strong</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 rounded-full bg-yellow-500" />
									<span>5.0 - 5.9 - Moderate</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 rounded-full bg-blue-500" />
									<span>4.0 - 4.9 - Light</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 rounded-full bg-gray-500" />
									<span>&lt; 4.0 - Minor</span>
								</div>
							</div>
						</Card>
					</div>
				</SheetContent>
			</Sheet>

			{/* Earthquake List Sheet (Right Side) */}
			<Sheet open={listSheetOpen} onOpenChange={setListSheetOpen}>
				<SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto p-0">
					<SheetHeader className="p-4 pb-0">
						<SheetTitle>Earthquake List</SheetTitle>
						<SheetDescription>
							{filteredEarthquakes.length} earthquake{filteredEarthquakes.length !== 1 ? 's' : ''} found. Click to view on map.
						</SheetDescription>
					</SheetHeader>
					
					<EarthquakeList
						earthquakes={filteredEarthquakes}
						onEarthquakeClick={handleEarthquakeClick}
					/>
				</SheetContent>
			</Sheet>
		</div>
	);
}
