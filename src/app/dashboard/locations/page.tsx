"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Location } from "@/types/database";
import {
  Search,
  Plus,
  MapPin,
  Phone,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchLocations() {
      setLoading(true);
      const { data, error } = await supabase
        .from("locations")
        .select("*, categories(*)")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setLocations(data as unknown as Location[]);
      }
      setLoading(false);
    }
    fetchLocations();
  }, []);

  const filtered = locations.filter((loc) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      loc.name.toLowerCase().includes(q) ||
      loc.address.toLowerCase().includes(q) ||
      (loc.description?.toLowerCase().includes(q) ?? false)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">All Locations</h1>
          <p className="text-sm text-[#888888] mt-1">
            You have {filtered.length} active location{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#4169E1] hover:bg-[#3457C9] text-sm font-medium text-white transition-colors self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          New Location
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
        <input
          type="text"
          placeholder="Search locations by name, address, or descript..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#111111] border border-[#1a1a2e] text-sm text-white placeholder-[#888888] focus:outline-none focus:border-[#4169E1] transition-colors"
        />
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-[#4169E1] animate-spin" />
          <span className="ml-3 text-sm text-[#888888]">Loading locations...</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-20">
          <MapPin className="w-10 h-10 text-[#1a1a2e] mx-auto mb-3" />
          <p className="text-sm text-[#888888]">
            {searchQuery ? "No locations match your search." : "No locations found."}
          </p>
        </div>
      )}

      {/* Location cards */}
      {!loading && (
        <div className="space-y-4">
          {filtered.map((loc) => (
            <div
              key={loc.id}
              className="bg-[#111111] rounded-xl border border-[#1a1a2e] p-5"
            >
              {/* Name + address */}
              <h3 className="text-base font-semibold text-white mb-1">
                {loc.name}
              </h3>
              <p className="text-sm text-[#888888] flex items-center gap-1.5 mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#4169E1] flex-shrink-0" />
                {loc.address}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs mb-3">
                {/* Categories */}
                {loc.categories && loc.categories.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#888888] uppercase font-medium tracking-wider">
                      Categories
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.categories.map((cat) => (
                        <span
                          key={cat.id}
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                          style={{
                            backgroundColor: `${cat.color}20`,
                            color: cat.color,
                          }}
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Coordinates */}
                <div>
                  <span className="text-[#888888] uppercase font-medium tracking-wider">
                    Coordinates
                  </span>{" "}
                  <span className="text-[#cccccc]">
                    {loc.latitude.toFixed(4)}, {loc.longitude.toFixed(4)}
                  </span>
                </div>

                {/* Phone */}
                {loc.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-[#888888]" />
                    <span className="text-[#888888] uppercase font-medium tracking-wider">
                      Phone
                    </span>{" "}
                    <span className="text-[#cccccc]">{loc.phone}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {loc.description && (
                <div className="mb-4">
                  <span className="text-[#888888] uppercase text-xs font-medium tracking-wider">
                    Description
                  </span>
                  <p className="text-sm text-[#cccccc] mt-1 leading-relaxed line-clamp-2">
                    {loc.description}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2 border-t border-[#1a1a2e]">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a2e] hover:bg-[#252540] text-sm font-medium text-[#cccccc] transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 text-sm font-medium transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
