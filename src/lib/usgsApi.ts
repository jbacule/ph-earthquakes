import type { EarthquakeCollection } from "@/types/earthquake";

// Philippines bounding box coordinates
const PHILIPPINES_BOUNDS = {
	minLatitude: 4.478,
	minLongitude: 116.191,
	maxLatitude: 21.33,
	maxLongitude: 127.354,
};

export type OrderBy =
	| "time"
	| "time-asc"
	| "magnitude"
	| "magnitude-asc";

export interface USGSQueryParams {
	startTime: string; // YYYY-MM-DD
	endTime: string; // YYYY-MM-DD
	minMagnitude?: number;
	maxMagnitude?: number;
	orderBy?: OrderBy;
}

/**
 * Builds the USGS API URL with query parameters
 */
export function buildUSGSApiUrl(params: USGSQueryParams): string {
	const baseUrl =
		"https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";

	const queryParams = new URLSearchParams({
		starttime: params.startTime,
		endtime: params.endTime,
		minlatitude: PHILIPPINES_BOUNDS.minLatitude.toString(),
		minlongitude: PHILIPPINES_BOUNDS.minLongitude.toString(),
		maxlatitude: PHILIPPINES_BOUNDS.maxLatitude.toString(),
		maxlongitude: PHILIPPINES_BOUNDS.maxLongitude.toString(),
		orderby: params.orderBy || "magnitude",
	});

	// Add optional magnitude filters
	if (params.minMagnitude !== undefined) {
		queryParams.append("minmagnitude", params.minMagnitude.toString());
	}

	if (params.maxMagnitude !== undefined) {
		queryParams.append("maxmagnitude", params.maxMagnitude.toString());
	}

	return `${baseUrl}&${queryParams.toString()}`;
}

/**
 * Fetches earthquake data from USGS API
 */
export async function fetchUSGSEarthquakes(
	params: USGSQueryParams,
): Promise<EarthquakeCollection> {
	const url = buildUSGSApiUrl(params);

	try {
		const response = await fetch(url, {
			cache: "no-store", // Always fetch fresh data
		});

		if (!response.ok) {
			throw new Error(
				`USGS API error! status: ${response.status} - ${response.statusText}`,
			);
		}

		const data: EarthquakeCollection = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching earthquake data from USGS API:", error);
		throw error;
	}
}

/**
 * Gets date range for the last N days
 */
export function getDateRange(days: number): {
	startTime: string;
	endTime: string;
} {
	const endDate = new Date();
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - days);

	return {
		startTime: formatDateForAPI(startDate),
		endTime: formatDateForAPI(endDate),
	};
}

/**
 * Formats a Date object to YYYY-MM-DD string
 */
export function formatDateForAPI(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

/**
 * Parses a YYYY-MM-DD string to Date object
 */
export function parseAPIDate(dateStr: string): Date {
	const [year, month, day] = dateStr.split("-").map(Number);
	return new Date(year, month - 1, day);
}

