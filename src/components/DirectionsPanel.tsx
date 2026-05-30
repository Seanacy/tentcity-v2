"use client";

import { useState } from "react";
import { ArrowLeft, Car, Footprints, Bike, Navigation, MapPin, LocateFixed } from "lucide-react";
import type { Location } from "@/types/database";

type TransportMode = "driving" | "walking" | "cycling";

interface DirectionsPanelProps {
  destination: Location;
  onBack: () => void;
  onStartRoute: (mode: TransportMode, startAddress: string) => void;
}

const modes: { key: TransportMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "driving", label: "Driving", icon: Car },
  { key: "walking", label: "Walking", icon: Footprints },
  { key: "cycling", label: "Biking", icon: Bike },
];

export default function DirectionsPanel({
  destination,
  onBack,
  onStartRoute,
}: DirectionsPanelProps) {
  const [mode, setMode] = useState<TransportMode>("driving");
  const [startAddress, setStartAddress] = useState("");

  function handleUseCurrentLocation() {
    setStartAddress("Current Location");
  }

  return (
    <div className="bg-[#000000] h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-[#1a1a2e]">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg hover:bg-[#111111] transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-[#888888]" />
        </button>
        <h2 className="text-sm font-bold text-white">Directions</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Transport mode selector */}
        <div className="flex gap-2">
          {modes.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl text-xs font-medium transition-all ${
                mode === key
                  ? "bg-[#4169E1] text-white"
                  : "bg-[#111111] text-[#888888] hover:bg-[#1a1a2e]"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        {/* Start point */}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#666666] font-semibold mb-1.5 block">
            Start
          </label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-[#111111] border border-[#1a1a2e] rounded-xl px-3 py-2.5">
              <MapPin className="w-4 h-4 text-[#4169E1] flex-shrink-0" />
              <input
                type="text"
                value={startAddress}
                onChange={(e) => setStartAddress(e.target.value)}
                placeholder="Enter start address"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-[#666666] outline-none min-w-0"
              />
            </div>
            <button
              onClick={handleUseCurrentLocation}
              className="flex-shrink-0 p-2.5 rounded-xl bg-[#111111] border border-[#1a1a2e] hover:bg-[#1a1a2e] transition-colors"
              aria-label="Use current location"
              title="Current Location"
            >
              <LocateFixed className="w-4 h-4 text-[#4169E1]" />
            </button>
          </div>
        </div>

        {/* End point */}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#666666] font-semibold mb-1.5 block">
            Destination
          </label>
          <div className="flex items-center gap-2 bg-[#111111] border border-[#1a1a2e] rounded-xl px-3 py-2.5">
            <Navigation className="w-4 h-4 text-[#4169E1] flex-shrink-0" />
            <span className="text-sm text-white truncate">{destination.name}</span>
          </div>
        </div>

        {/* Start Route button */}
        <button
          onClick={() => onStartRoute(mode, startAddress)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#4169E1] hover:bg-[#3457C9] text-sm font-semibold text-white transition-colors"
        >
          <Navigation className="w-4 h-4" />
          Start Route
        </button>
      </div>
    </div>
  );
}
