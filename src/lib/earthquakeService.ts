import type { EarthquakeCollection } from "@/types/earthquake";
import type { USGSQueryParams } from "./usgsApi";
import { fetchUSGSEarthquakes } from "./usgsApi";

/**
 * Fetches earthquake data from USGS API or local data
 * @param params - USGS API query parameters (optional, uses local data if not provided)
 */
export async function fetchEarthquakes(
	params?: USGSQueryParams,
): Promise<EarthquakeCollection> {
	try {
		if (!params) {
			// Use local data.json if no params provided
			return await fetchLocalData();
		}

		// Fetch from USGS API
		return await fetchUSGSEarthquakes(params);
	} catch (error) {
		console.error("Error fetching earthquake data:", error);
		throw error;
	}
}

/**
 * Fetches local earthquake data from data.json
 */
export async function fetchLocalData(): Promise<EarthquakeCollection> {
	try {
		const response = await fetch("/data.json");
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data: EarthquakeCollection = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching local earthquake data:", error);
		throw error;
	}
}

/**
 * Formats Unix timestamp to human-readable date string
 * @param timestamp - Unix timestamp in milliseconds
 */
export function formatEarthquakeDate(timestamp: number): string {
	const date = new Date(timestamp);
	return date.toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		timeZoneName: "short",
	});
}

/**
 * Gets magnitude color based on magnitude value
 * @param magnitude - Earthquake magnitude
 */
export function getMagnitudeColor(magnitude: number): string {
	if (magnitude >= 7.0) return "#dc2626"; // red-600
	if (magnitude >= 6.0) return "#f97316"; // orange-500
	if (magnitude >= 5.0) return "#eab308"; // yellow-500
	if (magnitude >= 4.0) return "#3b82f6"; // blue-500
	return "#6b7280"; // gray-500
}

/**
 * Gets marker radius based on magnitude
 * @param magnitude - Earthquake magnitude
 */
export function getMagnitudeRadius(magnitude: number): number {
	if (magnitude >= 7.0) return 14;
	if (magnitude >= 6.0) return 12;
	if (magnitude >= 5.0) return 10;
	if (magnitude >= 4.0) return 8;
	return 6;
}

/**
 * Gets alert level color
 * @param alert - Alert level
 */
export function getAlertColor(
	alert: "green" | "yellow" | "orange" | "red" | null,
): string {
	switch (alert) {
		case "red":
			return "#dc2626";
		case "orange":
			return "#f97316";
		case "yellow":
			return "#eab308";
		case "green":
			return "#16a34a";
		default:
			return "#6b7280";
	}
}

