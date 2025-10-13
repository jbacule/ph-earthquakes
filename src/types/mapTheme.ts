export interface MapTheme {
	id: string;
	name: string;
	url: string;
	attribution: string;
	description: string;
}

export const MAP_THEMES: MapTheme[] = [
	{
		id: "cartodb-positron",
		name: "Light (Positron)",
		url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
		description: "Clean, minimal style - best for data visualization",
	},
	{
		id: "openstreetmap",
		name: "OpenStreetMap",
		url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		description: "Standard OpenStreetMap style",
	},
	{
		id: "cartodb-dark",
		name: "Dark (Dark Matter)",
		url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
		description: "Dark theme - modern look with excellent contrast",
	},
	{
		id: "opentopomap",
		name: "Topographic",
		url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
		attribution:
			'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
		description: "Detailed topographic map with contour lines",
	},
];

export const DEFAULT_THEME_ID = "cartodb-positron";

