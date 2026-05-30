"use client";

import { X, MapPin, Phone, Clock, FileText, Globe, Tag, Navigation } from "lucide-react";
import type { Location } from "@/types/database";

interface LocationDetailProps {
  location: Location;
  onClose: () => void;
  onGetDirections: (location: Location) => void;
}

export default function LocationDetail({
  location,
  onClose,
  onGetDirections,
}: LocationDetailProps) {
  const rows: { label: string; icon: React.ReactNode; value: React.ReactNode }[] = [
    {
      label: "Address",
      icon: <MapPin className="w-4 h-4 text-[#4169E1]" />,
      value: location.address,
    },
    ...(location.phone
      ? [
          {
            label: "Phone",
            icon: <Phone className="w-4 h-4 text-[#4169E1]" />,
            value: (
              <a href={`tel:${location.phone}`} className="text-[#4169E1] hover:underline">
                {location.phone}
              </a>
            ),
          },
        ]
      : []),
    ...(location.hours
      ? [
          {
            label: "Hours",
            icon: <Clock className="w-4 h-4 text-[#4169E1]" />,
            value: location.hours,
          },
        ]
      : []),
    ...(location.description
      ? [
          {
            label: "Description",
            icon: <FileText className="w-4 h-4 text-[#4169E1]" />,
            value: location.description,
          },
        ]
      : []),
    {
      label: "Coordinates",
      icon: <Globe className="w-4 h-4 text-[#4169E1]" />,
      value: `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`,
    },
    ...(location.categories && location.categories.length > 0
      ? [
          {
            label: "Categories",
            icon: <Tag className="w-4 h-4 text-[#4169E1]" />,
            value: (
              <div className="flex flex-wrap gap-1.5">
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
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="absolute inset-0 z-40 bg-[#000000] overflow-y-auto animate-in slide-in-from-left duration-300">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#000000] border-b border-[#1a1a2e]">
        <h2 className="text-base font-bold text-white truncate pr-4">
          {location.name}
        </h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-[#111111] transition-colors flex-shrink-0"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-[#888888]" />
        </button>
      </div>

      {/* Image */}
      {location.image_url && (
        <div className="px-4 pt-4">
          <img
            src={location.image_url}
            alt={location.name}
            className="w-full h-44 object-cover rounded-xl"
          />
        </div>
      )}

      {/* Get Directions button */}
      <div className="px-4 pt-4">
        <button
          onClick={() => onGetDirections(location)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#4169E1] hover:bg-[#3457C9] text-sm font-semibold text-white transition-colors"
        >
          <Navigation className="w-4 h-4" />
          Get Directions
        </button>
      </div>

      {/* Detail rows */}
      <div className="px-4 py-4 space-y-0">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex gap-3 py-3 border-b border-[#1a1a2e] last:border-b-0"
          >
            <div className="flex-shrink-0 mt-0.5">{row.icon}</div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-[#666666] font-semibold mb-0.5">
                {row.label}
              </p>
              <div className="text-sm text-[#cccccc] leading-relaxed">
                {row.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
