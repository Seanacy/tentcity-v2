"use client";
 
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import Navbar from "@/components/Navbar";
import CategoryPills from "@/components/CategoryPills";
import RefinePanel, { RefineFilters } from "@/components/RefinePanel";
import LocationCard from "@/components/LocationCard";
import LocationDetail from "@/components/LocationDetail";
import DirectionsPanel from "@/components/DirectionsPanel";
import SearchBar from "@/components/SearchBar";
import SupportButton from "@/components/SupportButton";
import BridgeWorkCard from "@/components/BridgeWorkCard";
import { supabase } from "@/lib/supabase";
import { trackLocation, getAnonDeviceId } from "@/lib/tracking";
import { useAuth } from "@/lib/auth";
import { fetchBridgeWorkTasks } from "@/lib/bridgework";
import { fuzzTaskLocation } from "@/lib/fuzz";
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
  const { user } = useAuth();
 
  const [locations, setLocations] = useState<Location[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([3, 4]);
  const [refineFilters, setRefineFilters] = useState<RefineFilters>({ age: null, gender: null });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<
    { id: number; name: string; address: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [bridgeWorkTasks, setBridgeWorkTasks] = useState<BridgeWorkTask[]>([]);
  const [selectedBWTask, setSelectedBWTask] = useState<BridgeWorkTask | null>(null);
  const [showListPanel, setShowListPanel] = useState(false);
  const [deepLinkProcessed, setDeepLinkProcessed] = useState(false);
 
  // Deep link handler: ?needs=food,hygiene
  useEffect(() => {
    if (deepLinkProcessed || locations.length === 0 || categories.length === 0) return;
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const needs = params.get("needs");
    if (!needs) return;
 
    const needsList = needs.split(",").map((n) => n.trim().toLowerCase());
 
    // Match needs to category IDs
    const matchedCatIds = categories
      .filter((c) => needsList.includes(c.name.toLowerCase()))
      .map((c) => c.id);
 
    if (matchedCatIds.length === 0) return;
 
    // Select those categories on the map
    setSelectedCategoryIds(matchedCatIds);
 
    // Filter locations that have ANY of the matching categories
    const matchingLocations = locations.filter((loc) =>
      loc.categories?.some((c: { id: number }) => matchedCatIds.includes(c.id))
    );
 
    if (matchingLocations.length === 0) return;
 
    // Grab GPS and find the closest match
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;
 
          // Sort by distance
          const withDistance = matchingLocations.map((loc) => {
            const dLat = Number(loc.latitude) - userLat;
            const dLng = Number(loc.longitude) - userLng;
            const dist = Math.sqrt(dLat * dLat + dLng * dLng);
            return { loc, dist };
          });
          withDistance.sort((a, b) => a.dist - b.dist);
 
          // Auto-select the best (closest) match
          const best = withDistance[0].loc;
          setSelectedLocation(best);
          setShowDetail(true);
          mapRef.current?.flyTo({
            center: [Number(best.longitude), Number(best.latitude)],
            zoom: 15,
            duration: 1000,
          });
        },
        () => {
          // GPS denied — just select the first match without distance sorting
          const best = matchingLocations[0];
          setSelectedLocation(best);
          setShowDetail(true);
          mapRef.current?.flyTo({
            center: [Number(best.longitude), Number(best.latitude)],
            zoom: 15,
            duration: 1000,
          });
        },
        { enableHighAccuracy: false, timeout: 10000 }
      );
    }
 
    setDeepLinkProcessed(true);
  }, [locations, categories, deepLinkProcessed]);
 
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
 
  // Apply optional age/gender refine filters on top of category-filtered locations.
  // A listing with no gender_served / age_min / age_max on file is treated as open to everyone.
  const visibleLocations = useMemo(() => locations.filter((loc) => {
    const l = loc as Location & { gender_served?: string | null; age_min?: number | null; age_max?: number | null };
    if (refineFilters.gender && l.gender_served && l.gender_served !== refineFilters.gender) {
      return false;
    }
    if (refineFilters.age !== null) {
      if (l.age_min != null && refineFilters.age < l.age_min) return false;
      if (l.age_max != null && refineFilters.age > l.age_max) return false;
    }
    return true;
  }), [locations, refineFilters]);
 
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
    map.doubleClickZoom.disable();
    mapRef.current = map;
 
    // Request user location and center map
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          map.flyTo({ center: [longitude, latitude], zoom: 13, duration: 1500 });
 
          // Add pulsing blue dot for user location
          const dot = document.createElement("div");
          dot.style.cssText = `
            width: 16px; height: 16px; border-radius: 50%;
            background: #4169E1; border: 3px solid #fff;
            box-shadow: 0 0 0 6px rgba(65,105,225,0.3);
            animation: pulse 2s infinite;
          `;
          new mapboxgl.Marker({ element: dot })
            .setLngLat([longitude, latitude])
            .addTo(map);

          // Track anonymized location for every visitor — signed-in users
          // use their real (hashed) ID, everyone else uses a stable
          // per-browser anonymous ID, so TentCity's pings land in the same
          // shared table as BridgeWork's and OSAAT's signed-in-user pings.
          const idForTracking = user?.id || getAnonDeviceId();
          trackLocation(idForTracking, latitude, longitude, pos.coords.accuracy, "tentcity");
        },
        () => {
          // Permission denied or error — stay on Minneapolis default
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
 
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
 
    visibleLocations.forEach((loc) => {
      if (!loc.latitude || !loc.longitude) return;
      // Use the first category that matches a selected filter, else first category
      const matchedCat = selectedCategoryIds.length > 0
        ? loc.categories?.find((c: { id: number; name: string }) => selectedCategoryIds.includes(c.id))
        : null;
      const cat = matchedCat?.name || loc.categories?.[0]?.name || "Resources";
      const color = CATEGORY_COLORS[cat] || "#5ba3a8";
 
      const el = document.createElement("div");
      el.style.cssText = `width:32px;height:32px;border-radius:50%;background:${color};border:3px solid #fff;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.4);touch-action:manipulation;-webkit-tap-highlight-color:transparent`;
 
      const marker = new mapboxgl.Marker({ element: el, anchor: "center" })
        .setLngLat([Number(loc.longitude), Number(loc.latitude)])
        .addTo(mapRef.current!);
 
      marker.getElement().addEventListener("click", (e) => { e.stopPropagation(); handleMarkerClick(loc); });
      markersRef.current.push(marker);
    });
 
    // BridgeWork task markers (orange) — pin position is fuzzed 200-500m
    // for signed-out visitors so the real address/location isn't exposed via the map.
    bridgeWorkTasks.forEach((task) => {
      if (!task.latitude || !task.longitude) return;

      const realLat = Number(task.latitude);
      const realLng = Number(task.longitude);
      const pin = user
        ? { latitude: realLat, longitude: realLng }
        : fuzzTaskLocation(task.id, realLat, realLng);

      const el = document.createElement("div");
      el.style.cssText =
        "width:32px;height:32px;border-radius:50%;background:#F39C12;border:3px solid #fff;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.4);touch-action:manipulation;-webkit-tap-highlight-color:transparent";

      const marker = new mapboxgl.Marker({ element: el, anchor: "center" })
        .setLngLat([pin.longitude, pin.latitude])
        .addTo(mapRef.current!);

      marker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();
        setSelectedBWTask(task);
        setSelectedLocation(null);
        setShowDetail(false);
        setShowListPanel(true);
        mapRef.current?.flyTo({
          center: [pin.longitude, pin.latitude],
          zoom: 15,
          duration: 1000,
        });
      });

      markersRef.current.push(marker);
    });
  }, [visibleLocations, bridgeWorkTasks, user]);
 
  const handleMarkerClick = useCallback((loc: Location) => {
    setSelectedLocation(loc);
    setSelectedBWTask(null);
    setShowDetail(true);
    setShowDirections(false);
    setShowListPanel(true);
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
 
    if (selectedBWTask) {
      const formattedPay = new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0,
      }).format(selectedBWTask.pay);
 
      return (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-[#1a1a2e]">
            <button onClick={() => setSelectedBWTask(null)} className="text-[#888888] hover:text-white text-sm">
              ← Back
            </button>
            <span className="text-xs font-semibold text-[#F39C12] uppercase tracking-wider">BridgeWork Task</span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-[#F39C12]" />
              <span className="text-xs text-[#F39C12] font-semibold">Cash Task</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{selectedBWTask.title}</h2>
            <div className="text-2xl font-bold text-[#F39C12] mb-4">{formattedPay} <span className="text-sm font-normal text-[#888888]">cash</span></div>
            {selectedBWTask.description && (
              <p className="text-sm text-[#cccccc] leading-relaxed mb-4">{selectedBWTask.description}</p>
            )}
            {user ? (
              <div className="flex items-start gap-2 mb-4">
                <span className="text-[#4169E1] mt-0.5">📍</span>
                <a
                  href={`https://maps.apple.com/?daddr=${encodeURIComponent(selectedBWTask.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#4169E1] hover:underline"
                >
                  {selectedBWTask.location}
                </a>
              </div>
            ) : (
              <div className="flex items-start gap-2 mb-4">
                <span className="text-[#666666] mt-0.5">📍</span>
                <span className="text-sm text-[#666666] italic">Sign in to see the exact location</span>
              </div>
            )}
            <div className="text-xs text-[#888888] mb-6">
              Status: <span className="text-[#22c55e] font-semibold">{selectedBWTask.status}</span>
            </div>
            <div className="flex flex-col gap-3">
              {user ? (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedBWTask.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[#4169E1] hover:bg-[#3457C9] text-white font-semibold transition-colors"
                >
                  📍 Get Directions
                </a>
              ) : (
                <a
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[#4169E1] hover:bg-[#3457C9] text-white font-semibold transition-colors"
                >
                  Sign in to get directions
                </a>
              )}
              <a
                href="https://bridgework.life"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[#F39C12] hover:bg-[#e08e0b] text-white font-semibold transition-colors"
              >
                Claim on BridgeWork →
              </a>
            </div>
          </div>
        </div>
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
 
    const totalResults = visibleLocations.length + bridgeWorkTasks.length;
 
    return (
      <div className="flex flex-col h-full">
        <div className="p-3 border-b border-[#1a1a2e] flex items-center justify-between">
          <span className="font-semibold text-sm">Locations</span>
          <span className="text-xs text-[#888888]">{totalResults} results</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4169E1]" />
            </div>
          ) : visibleLocations.length === 0 && bridgeWorkTasks.length === 0 ? (
            <div className="p-6 text-center text-[#888888]">
              No locations found.
            </div>
          ) : (
            <>
              {visibleLocations.map((loc) => (
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
                  <div className="px-4 py-2 mt-2 border-t border-[#1a1a2e]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#F39C12]" />
                      <span className="text-xs font-semibold text-[#F39C12] uppercase tracking-wider">
                        BridgeWork
                      </span>
                      <span className="text-[10px] text-[#888888]">
                        {bridgeWorkTasks.length} cash tasks
                      </span>
                    </div>
                  </div>
                  {bridgeWorkTasks.map((task) => (
                    <div key={task.id} className="px-2 py-1">
                      <BridgeWorkCard task={task} signedIn={!!user} />
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
 
      {/* Filter bar: search + category pills — floats over map on mobile */}
      <div className="flex items-center gap-2 px-3 py-2 bg-transparent md:bg-[#000000] md:border-b md:border-[#1a1a2e] overflow-visible absolute md:relative top-14 md:top-auto left-0 right-0 z-30">
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
            categories={categories
              .filter((c) => c.name !== "Encampment")
              .sort((a, b) => {
                const order = ["Shelter", "Food", "Employment"];
                const ai = order.indexOf(a.name);
                const bi = order.indexOf(b.name);
                if (ai !== -1 && bi !== -1) return ai - bi;
                if (ai !== -1) return -1;
                if (bi !== -1) return 1;
                return a.id - b.id;
              })
              .map((c) => ({
                id: c.id,
                name: c.name,
                color: CATEGORY_COLORS[c.name] || c.color,
              }))}
            selectedIds={selectedCategoryIds}
            onToggle={handleCategoryToggle}
          />
        </div>
        <RefinePanel filters={refineFilters} onChange={setRefineFilters} />
      </div>
 
      {/* Main: sidebar + map */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Map — always visible, full area */}
        <div className="absolute inset-0 md:relative md:flex-1">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>
 
        {/* List toggle button — mobile only */}
        <button
          onClick={() => setShowListPanel((p) => !p)}
          className="md:hidden absolute top-12 left-3 z-20 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#000000]/90 backdrop-blur-sm border border-[#1a1a2e] text-white text-sm shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          {visibleLocations.length} Locations
        </button>
 
        {/* Sidebar — desktop: always visible left column; mobile: slide-in panel */}
        <div
          className={`
            absolute inset-y-0 left-0 w-[85vw] max-w-[380px] z-30
            bg-[#000000] border-r border-[#1a1a2e]
            transform transition-transform duration-300 ease-in-out
            ${showListPanel ? "translate-x-0" : "-translate-x-full"}
            md:relative md:translate-x-0 md:w-[380px] md:max-w-none md:order-first
            flex-shrink-0 overflow-hidden flex flex-col
          `}
        >
          {/* Close button — mobile only */}
          <button
            onClick={() => setShowListPanel(false)}
            className="md:hidden absolute top-3 right-3 z-10 p-1 rounded-full bg-[#111111] text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          {renderSidebar()}
        </div>
 
        {/* Backdrop — mobile only, when panel is open */}
        {showListPanel && (
          <div
            className="md:hidden absolute inset-0 bg-black/40 z-20"
            onClick={() => setShowListPanel(false)}
          />
        )}
      </div>
 
      <SupportButton />
    </div>
  );
}
