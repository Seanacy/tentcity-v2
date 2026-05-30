"use client";

import { MapPin, ChevronRight, Navigation } from "lucide-react";
import type { Location } from "@/types/database";

interface LocationCardProps {
  location: Location;
  onDirections: (location: Location) => void;
  onDetails: (location: Location) => void;
}

export default function LocationCard({
  location,
  onDirections,
  onDetails,
}: LocationCardProps) {
  const primaryCategory = location.categories?.[0];
  const borderColor = primaryCategory?.color ?? "#5ba3a8";

  return (
    <div
      className="bg-[#1e2a3a] rounded-xl overflow-hidden border-l-4 transition-transform hover:scale-[1.01]"
      style={{ borderLeftColor: borderColor }}
    >
      <div className="p-4">
        {/* Name */}
        <h3 className="text-sm font-bold text-white leading-tight mb-1">
          {location.name}
        </h3>

        {/* Description */}
        {location.description && (
          <p className="text-xs text-[#8899a6] leading-relaxed mb-2 line-clamp-2">
            {location.description}
          </p>
        )}

        {/* Address */}
        <div className="flex items-start gap-1.5 mb-3">
          <MapPin className="w-3.5 h-3.5 text-[#5ba3a8] mt-0.5 flex-shrink-0" />
          <span className="text-xs text-[#8899a6]">{location.address}</span>
        </div>

        {/* Category tags */}
        {location.categories && location.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {location.categories.map((cat) => (
              <span
                key={cat.id}
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                style={{
                  backgroundColor: `${cat.color}22`,
                  color: cat.color,
                  border: `1px solid ${cat.color}44`,
                }}
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onDirections(location)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#2a3a4e] hover:bg-[#354a5e] text-xs text-[#5ba3a8] font-medium transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            Directions
          </button>
          <button
            onClick={() => onDetails(location)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#5ba3a8] hover:bg-[#4a9298] text-xs text-white font-medium transition-colors"
          >
            Details
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
