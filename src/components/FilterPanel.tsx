"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { EarthquakeFilters } from "@/types/earthquake";

interface FilterPanelProps {
	filters: EarthquakeFilters;
	onFiltersChange: (filters: EarthquakeFilters) => void;
	totalCount: number;
	filteredCount: number;
}

export default function FilterPanel({
	filters,
	onFiltersChange,
	totalCount,
	filteredCount,
}: FilterPanelProps) {
	const handleMinMagnitudeChange = (value: string) => {
		const min = Number.parseFloat(value);
		if (!Number.isNaN(min)) {
			onFiltersChange({ ...filters, minMagnitude: min });
		}
	};

	const handleMaxMagnitudeChange = (value: string) => {
		const max = Number.parseFloat(value);
		if (!Number.isNaN(max)) {
			onFiltersChange({ ...filters, maxMagnitude: max });
		}
	};

	const toggleAlertLevel = (
		level: "green" | "yellow" | "orange" | "red",
	) => {
		const currentLevels = filters.alertLevels || [];
		const newLevels = currentLevels.includes(level)
			? currentLevels.filter((l) => l !== level)
			: [...currentLevels, level];

		onFiltersChange({
			...filters,
			alertLevels: newLevels.length > 0 ? newLevels : null,
		});
	};

	const toggleTsunami = () => {
		onFiltersChange({ ...filters, tsunamiOnly: !filters.tsunamiOnly });
	};

	const clearFilters = () => {
		onFiltersChange({
			minMagnitude: 0,
			maxMagnitude: 10,
			alertLevels: null,
			tsunamiOnly: false,
		});
	};

	const alertLevels: Array<"green" | "yellow" | "orange" | "red"> = [
		"green",
		"yellow",
		"orange",
		"red",
	];

	const getAlertColor = (level: string) => {
		switch (level) {
			case "red":
				return "bg-red-500 hover:bg-red-600";
			case "orange":
				return "bg-orange-500 hover:bg-orange-600";
			case "yellow":
				return "bg-yellow-500 hover:bg-yellow-600";
			case "green":
				return "bg-green-500 hover:bg-green-600";
			default:
				return "bg-gray-500 hover:bg-gray-600";
		}
	};

	const isAlertActive = (level: "green" | "yellow" | "orange" | "red") => {
		return filters.alertLevels?.includes(level) || false;
	};

	return (
		<div className="space-y-4">
			{/* Display Filters Section */}
			<div className="space-y-3">
				<h3 className="text-sm font-semibold text-gray-700">Display Filters</h3>
				
				{/* Results Count Badge */}
				<div className="flex items-center gap-2">
					<span className="text-sm text-gray-600">Showing:</span>
					<Badge variant="secondary" className="text-sm">
						{filteredCount} / {totalCount}
					</Badge>
				</div>

				{/* Magnitude Range */}
				<div className="space-y-2">
					<label className="text-sm font-semibold text-gray-700">
						Magnitude Range
					</label>
					<div className="flex gap-2 items-center">
						<Input
							type="number"
							min="0"
							max="10"
							step="0.1"
							value={filters.minMagnitude}
							onChange={(e) => handleMinMagnitudeChange(e.target.value)}
							className="w-20"
							placeholder="Min"
						/>
						<span className="text-gray-500">to</span>
						<Input
							type="number"
							min="0"
							max="10"
							step="0.1"
							value={filters.maxMagnitude}
							onChange={(e) => handleMaxMagnitudeChange(e.target.value)}
							className="w-20"
							placeholder="Max"
						/>
					</div>
				</div>

				{/* Alert Levels */}
				<div className="space-y-2">
					<label className="text-sm font-semibold text-gray-700">
						Alert Levels
					</label>
					<div className="flex flex-wrap gap-2">
						{alertLevels.map((level) => (
							<button
								type="button"
								key={level}
								onClick={() => toggleAlertLevel(level)}
								className={`px-3 py-1 rounded-md text-white text-xs font-medium transition-all uppercase ${
									getAlertColor(level)
								} ${
									isAlertActive(level)
										? "ring-2 ring-offset-2 ring-gray-400 opacity-100"
										: "opacity-50"
								}`}
							>
								{level}
							</button>
						))}
					</div>
				</div>

				{/* Tsunami Filter */}
				<div className="space-y-2">
					<label className="text-sm font-semibold text-gray-700">
						Special Filters
					</label>
					<button
						type="button"
						onClick={toggleTsunami}
						className={`px-3 py-2 rounded-md text-sm font-medium transition-all w-full ${
							filters.tsunamiOnly
								? "bg-blue-600 text-white ring-2 ring-blue-400"
								: "bg-gray-100 text-gray-700 hover:bg-gray-200"
						}`}
					>
						🌊 Tsunami Warnings Only
					</button>
				</div>

				{/* Clear Filters */}
				<Button
					onClick={clearFilters}
					variant="outline"
					className="w-full"
					size="sm"
				>
					Clear All Filters
				</Button>
			</div>
		</div>
	);
}

