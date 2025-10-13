"use client";

import type { EarthquakeFeature } from "@/types/earthquake";
import {
	formatEarthquakeDate,
	getMagnitudeColor,
	getAlertColor,
} from "@/lib/earthquakeService";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EarthquakeListProps {
	earthquakes: EarthquakeFeature[];
	onEarthquakeClick: (earthquake: EarthquakeFeature) => void;
}

export default function EarthquakeList({
	earthquakes,
	onEarthquakeClick,
}: EarthquakeListProps) {
	if (earthquakes.length === 0) {
		return (
			<div className="p-8 text-center">
				<p className="text-gray-500">No earthquakes found</p>
			</div>
		);
	}

	return (
		<div className="space-y-3 p-4">
			{earthquakes.map((earthquake) => {
				const { properties, geometry } = earthquake;
				const [, , depth] = geometry.coordinates;

				return (
					<Card
						key={earthquake.id}
						className="p-4 cursor-pointer hover:shadow-lg transition-shadow border-l-4"
						style={{ borderLeftColor: getMagnitudeColor(properties.mag) }}
						onClick={() => onEarthquakeClick(earthquake)}
					>
						<div className="space-y-2">
							{/* Header with magnitude */}
							<div className="flex items-start justify-between gap-2">
								<div className="flex items-center gap-2">
									<span
										className="text-2xl font-bold"
										style={{ color: getMagnitudeColor(properties.mag) }}
									>
										M {properties.mag}
									</span>
									{properties.tsunami === 1 && (
										<Badge variant="destructive" className="text-xs">
											🌊 Tsunami
										</Badge>
									)}
								</div>
								{properties.alert && (
									<Badge
										variant="outline"
										className="text-xs uppercase"
										style={{
											borderColor: getAlertColor(properties.alert),
											color: getAlertColor(properties.alert),
										}}
									>
										{properties.alert}
									</Badge>
								)}
							</div>

							{/* Location */}
							<div>
								<p className="font-semibold text-gray-900 text-sm">
									{properties.place}
								</p>
							</div>

							{/* Details */}
							<div className="flex flex-wrap gap-3 text-xs text-gray-600">
								<div className="flex items-center gap-1">
									<span className="font-semibold">🕐</span>
									<span>{formatEarthquakeDate(properties.time)}</span>
								</div>
								<div className="flex items-center gap-1">
									<span className="font-semibold">📏</span>
									<span>{depth.toFixed(1)} km deep</span>
								</div>
								{properties.felt !== null && properties.felt > 0 && (
									<div className="flex items-center gap-1">
										<span className="font-semibold">👥</span>
										<span>{properties.felt} felt reports</span>
									</div>
								)}
							</div>

							{/* Click indicator */}
							<div className="text-xs text-blue-600 font-medium pt-1">
								Click to view on map →
							</div>
						</div>
					</Card>
				);
			})}
		</div>
	);
}

