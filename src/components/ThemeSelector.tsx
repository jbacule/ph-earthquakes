"use client";

import { MAP_THEMES } from "@/types/mapTheme";
import type { MapTheme } from "@/types/mapTheme";

interface ThemeSelectorProps {
	currentTheme: MapTheme;
	onThemeChange: (theme: MapTheme) => void;
}

export default function ThemeSelector({
	currentTheme,
	onThemeChange,
}: ThemeSelectorProps) {
	return (
		<div className="space-y-3">
			<h3 className="text-sm font-semibold text-gray-900">Map Theme</h3>
			<div className="space-y-2">
				{MAP_THEMES.map((theme) => (
					<button
						key={theme.id}
						type="button"
						onClick={() => onThemeChange(theme)}
						className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
							currentTheme.id === theme.id
								? "border-blue-500 bg-blue-50"
								: "border-gray-200 bg-white hover:border-gray-300"
						}`}
					>
						<div className="flex items-start justify-between gap-2">
							<div className="flex-1 min-w-0">
								<div className="font-semibold text-sm text-gray-900">
									{theme.name}
								</div>
								<div className="text-xs text-gray-600 mt-0.5">
									{theme.description}
								</div>
							</div>
							{currentTheme.id === theme.id && (
								<svg
									className="w-5 h-5 text-blue-500 shrink-0"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
							)}
						</div>
					</button>
				))}
			</div>
		</div>
	);
}

