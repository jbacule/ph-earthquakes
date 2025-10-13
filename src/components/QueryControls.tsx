"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { OrderBy, USGSQueryParams } from "@/lib/usgsApi";
import { formatDateForAPI } from "@/lib/usgsApi";

interface QueryControlsProps {
	queryParams: USGSQueryParams;
	onQueryParamsChange: (params: USGSQueryParams) => void;
	onFetch: () => void;
	loading: boolean;
}

export default function QueryControls({
	queryParams,
	onQueryParamsChange,
	onFetch,
	loading,
}: QueryControlsProps) {
	const handleStartTimeChange = (value: string) => {
		onQueryParamsChange({ ...queryParams, startTime: value });
	};

	const handleEndTimeChange = (value: string) => {
		onQueryParamsChange({ ...queryParams, endTime: value });
	};

	const handleMinMagnitudeChange = (value: string) => {
		const min = value === "" ? undefined : Number.parseFloat(value);
		onQueryParamsChange({ ...queryParams, minMagnitude: min });
	};

	const handleMaxMagnitudeChange = (value: string) => {
		const max = value === "" ? undefined : Number.parseFloat(value);
		onQueryParamsChange({ ...queryParams, maxMagnitude: max });
	};

	const handleOrderByChange = (value: OrderBy) => {
		onQueryParamsChange({ ...queryParams, orderBy: value });
	};

	const setPresetDateRange = (days: number) => {
		const endDate = new Date();
		const startDate = new Date();
		startDate.setDate(startDate.getDate() - days);

		onQueryParamsChange({
			...queryParams,
			startTime: formatDateForAPI(startDate),
			endTime: formatDateForAPI(endDate),
		});
	};

	return (
		<div className="space-y-4">
			{/* API Query Section */}
			<div className="space-y-3">
				{/* Date Range Presets */}
				<div className="space-y-2">
					<label className="text-sm font-semibold text-gray-700">
						Quick Date Range
					</label>
					<div className="grid grid-cols-3 gap-2">
						<Button
							onClick={() => setPresetDateRange(1)}
							variant="outline"
							size="sm"
							className="text-xs"
						>
							24 Hours
						</Button>
						<Button
							onClick={() => setPresetDateRange(7)}
							variant="outline"
							size="sm"
							className="text-xs"
						>
							7 Days
						</Button>
						<Button
							onClick={() => setPresetDateRange(30)}
							variant="outline"
							size="sm"
							className="text-xs"
						>
							30 Days
						</Button>
					</div>
				</div>

				{/* Start Date */}
				<div className="space-y-2">
					<label className="text-sm font-semibold text-gray-700">
						Start Date
					</label>
					<Input
						type="date"
						value={queryParams.startTime}
						onChange={(e) => handleStartTimeChange(e.target.value)}
						className="w-full"
					/>
				</div>

				{/* End Date */}
				<div className="space-y-2">
					<label className="text-sm font-semibold text-gray-700">End Date</label>
					<Input
						type="date"
						value={queryParams.endTime}
						onChange={(e) => handleEndTimeChange(e.target.value)}
						className="w-full"
					/>
				</div>

				{/* Magnitude Range */}
				<div className="space-y-2">
					<label className="text-sm font-semibold text-gray-700">
						API Magnitude Filter
					</label>
					<div className="flex gap-2 items-center">
						<Input
							type="number"
							min="0"
							max="10"
							step="0.1"
							value={queryParams.minMagnitude ?? ""}
							onChange={(e) => handleMinMagnitudeChange(e.target.value)}
							className="w-24"
							placeholder="Min"
						/>
						<span className="text-gray-500 text-sm">to</span>
						<Input
							type="number"
							min="0"
							max="10"
							step="0.1"
							value={queryParams.maxMagnitude ?? ""}
							onChange={(e) => handleMaxMagnitudeChange(e.target.value)}
							className="w-24"
							placeholder="Max"
						/>
					</div>
					<p className="text-xs text-gray-500">
						Leave empty for no limit (default ≥ 2.5)
					</p>
				</div>

				{/* Order By */}
				<div className="space-y-2">
					<label className="text-sm font-semibold text-gray-700">
						Sort Order
					</label>
					<div className="grid grid-cols-2 gap-2">
						<button
							type="button"
							onClick={() => handleOrderByChange("magnitude")}
							className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
								queryParams.orderBy === "magnitude"
									? "bg-blue-600 text-white ring-2 ring-blue-400"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							Magnitude ↓
						</button>
						<button
							type="button"
							onClick={() => handleOrderByChange("magnitude-asc")}
							className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
								queryParams.orderBy === "magnitude-asc"
									? "bg-blue-600 text-white ring-2 ring-blue-400"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							Magnitude ↑
						</button>
						<button
							type="button"
							onClick={() => handleOrderByChange("time")}
							className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
								queryParams.orderBy === "time"
									? "bg-blue-600 text-white ring-2 ring-blue-400"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							Time ↓
						</button>
						<button
							type="button"
							onClick={() => handleOrderByChange("time-asc")}
							className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
								queryParams.orderBy === "time-asc"
									? "bg-blue-600 text-white ring-2 ring-blue-400"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							Time ↑
						</button>
					</div>
				</div>

				{/* Info */}
				<div className="p-3 bg-blue-50 rounded-md border border-blue-200">
					<p className="text-xs text-blue-800">
						<strong>Note:</strong> Fetches data from USGS API for the
						Philippines region (4.478°N - 21.33°N, 116.191°E - 127.354°E)
					</p>
				</div>
			</div>
		</div>
	);
}

