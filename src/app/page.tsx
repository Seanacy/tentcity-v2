"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import Navbar from "@/components/Navbar";
import CategoryPills from "@/components/CategoryPills";
import LocationCard from "@/components/LocationCard";
import LocationDetail from "@/components/LocationDetail";
import DirectionsPanel from "@/components/DirectionsPanel";
import SearchBar from "@/components/SearchBar";
import SupportButton from "@/components/SupportButton";
import BridgeWorkCard from "@/components/BridgeWorkCard";
import { supabase } from "@/lib/supabase";
import { fetchBridgeWorkTasks } from "@/lib/bridgework";
import type { Location, Category, BridgeWorkTask } from "@/types/database";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const MINNEAPOLIS_CENTER: [number, number] = [-93.265, 44.978];
const DEFAULT_ZOOM = 12;

const CATEGORY_COLORS: Record<string, string> = {
  Encampment: "#297373",
  Community: "#5ba3a8",
  Shelter: "#8B4513",
  Food: "#FF6B6B",
  Medical: "#FF0000",
  Hygiene: "#4169E1",
  Resources: "#32CD32",
  Clothing: "#9B59B6",
  Employment: "#F39C12",
};

export default function MapPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const [locations, setLocations] = useState<Location[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<
    { id: number; name: string; address: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [bridgeWorkTasks, setBridgeWorkTasks] = useState<BridgeWorkTask[]>([]);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("id");
      if (data) setCategories(data);
    }
    fetchCategories();
  }, []);

  // Fetch locations filtered by selected categories
  useEffect(() => {
    async function fetchLocations() {
      setLoading(true);
      let query = supabase
        .from("locations")
        .select("*, categories(*), assets:location_assets(*)");

      if (selectedCategoryIds.length > 0) {
        const { data: junctionData } = await supabase
          .from("location_categories")
          .select("location_id")
          .in("category_id", selectedCategoryIds);

        if (junctionData) {
          const ids = [...new Set((junctionData as { location_id: number }[]).map((j) => j.location_id))];
          if (ids.length === 0) {
            setLocations([]);
            setLoading(false);
            return;
          }
          query = query.in("id", ids);
        }
      }

      const { data } = await query.order("name");
      if (data) setLocations(data as Location[]);
      setLoading(false);
    }
    fetchLocations();
  }, [selectedCategoryIds]);

  // Fetch BridgeWork tasks when Employment category (id 9) is selected
  useEffect(() => {
    if (selectedCategoryIds.includes(9)) {
      fetchBridgeWorkTasks().then(setBridgeWorkTasks);
    } else {
      setBridgeWorkTasks([]);
    }
  }, [selectedCategoryIds]);

  // Init map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: MINNEAPOLIS_CENTER,
      zoom: DEFAULT_ZOOM,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Sync markers
  useEffect(() => {
    if (!mapRef.current) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    locations.forEach((loc) => {
      if (!loc.latitude || !loc.longitude) return;
      const cat = loc.categories?.[0]?.name || "Resources";
      const color = CATEGORY_COLORS[cat] || "#5ba3a8";

      const el = document.createElement("div");
      el.style.cssText = `width:24px;height:24px;border-radius:50%;background:${color};border:3px solid #fff;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.4)`;

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([Number(loc.longitude), Number(loc.latitude)])
        .addTo(mapRef.current!);

      el.addEventListener("click", () => handleMarkerClick(loc));
      markersRef.current.push(marker);
    });

    // BridgeWork task markers (orange)
    bridgeWorkTasks.forEach((task) => {
      if (!task.latitude || !task.longitude) return;

      const el = document.createElement("div");
      el.style.cssText =
        "width:24px;height:24px;border-radius:50%;background:#F39C12;border:3px solid #fff;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.4)";

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([Number(task.longitude), Number(task.latitude)])
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [locations, bridgeWorkTasks]);

  const handleMarkerClick = useCallback((loc: Location) => {
    setSelectedLocation(loc);
    setShowDetail(true);
    setShowDirections(false);
    mapRef.current?.flyTo({
      center: [Number(loc.longitude), Number(loc.latitude)],
      zoom: 15,
      duration: 1000,
    });
  }, []);

  const handleCategoryToggle = (id: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  // SEARCH — database only
  const handleSearch = async (term: string) => {
    if (term.length < 2) {
      setSearchSuggestions([]);
      return;
    }
    const { data } = await supabase
      .from("locations")
      .select("id, name, address")
      .or(`name.ilike.%${term}%,address.ilike.%${term}%`)
      .limit(8);
    if (data) setSearchSuggestions(data);
  };

  const handleSearchSelect = async (id: number) => {
    let loc = locations.find((l) => l.id === id);
    if (!loc) {
      const { data } = await supabase
        .from("locations")
        .select("*, categories(*), assets:location_assets(*)")
        .eq("id", id)
        .single();
      if (data) loc = data as Location;
    }
    if (loc) handleMarkerClick(loc);
    setIsSearchExpanded(false);
    setSearchSuggestions([]);
  };

  const renderSidebar = () => {
    if (showDirections && selectedLocation) {
      return (
        <DirectionsPanel
          destination={selectedLocation}
          onBack={() => {
            setShowDirections(false);
            setShowDetail(true);
          }}
          onStartRoute={(mode, start) => console.log("Route:", mode, "→", start)}
        />
      );
    }

    if (showDetail && selectedLocation) {
      return (
        <LocationDetail
          location={selectedLocation}
          onClose={() => {
            setShowDetail(false);
            setSelectedLocation(null);
          }}
          onGetDirections={() => {
            setShowDirections(true);
            setShowDetail(false);
          }}
        />
      );
    }

    const totalResults = locations.length + bridgeWorkTasks.length;

    return (
      <div className="flex flex-col h-full">
        <div className="p-3 border-b border-[#2f3e50] flex items-center justify-between">
          <span className="font-semibold text-sm">Locations</span>
          <span className="text-xs text-[#8899a6]">{totalResults} results</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5ba3a8]" />
            </div>
          ) : locations.length === 0 && bridgeWorkTasks.length === 0 ? (
            <div className="p-6 text-center text-[#8899a6]">
              No locations found.
            </div>
          ) : (
            <>
              {locations.map((loc) => (
                <LocationCard
                  key={loc.id}
                  location={loc}
                  onDetails={() => handleMarkerClick(loc)}
                  onDirections={() => {
                    setSelectedLocation(loc);
                    setShowDirections(true);
                  }}
                />
              ))}

              {bridgeWorkTasks.length > 0 && (
                <>
                  <div className="px-4 py-2 mt-2 border-t border-[#2f3e50]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#F39C12]" />
                      <span className="text-xs font-semibold text-[#F39C12] uppercase tracking-wider">
                        BridgeWork
                      </span>
                      <span className="text-[10px] text-[#8899a6]">
                        {bridgeWorkTasks.length} cash tasks
                      </span>
                    </div>
                  </div>
                  {bridgeWorkTasks.map((task) => (
                    <div key={task.id} className="px-2 py-1">
                      <BridgeWorkCard task={task} />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col pt-14">
      <Navbar />

      {/* Filter bar: search + category pills */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#0f1419] border-b border-[#2f3e50] overflow-hidden">
        <SearchBar
          suggestions={searchSuggestions}
          onSearch={handleSearch}
          onSelect={handleSearchSelect}
          isExpanded={isSearchExpanded}
          onExpand={() => setIsSearchExpanded(true)}
          onCollapse={() => {
            setIsSearchExpanded(false);
            setSearchSuggestions([]);
          }}
        />
        <div
          className={`flex-1 overflow-x-auto transition-all duration-300 ${
            isSearchExpanded ? "max-w-0 opacity-0" : "max-w-full opacity-100"
          }`}
        >
          <CategoryPills
            categories={categories.map((c) => ({
              id: c.id,
              name: c.name,
              color: CATEGORY_COLORS[c.name] || c.color,
            }))}
            selectedIds={selectedCategoryIds}
            onToggle={handleCategoryToggle}
          />
        </div>
      </div>

      {/* Main: sidebar + map */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-full md:w-[380px] flex-shrink-0 bg-[#0f1419] border-r border-[#2f3e50] overflow-hidden flex flex-col">
          {renderSidebar()}
        </div>
        <div className="hidden md:block flex-1 relative">
          <div ref={mapContainerRef} className="absolute inset-0" />
        </div>
      </div>

      <SupportButton />
    </div>
  );
}
