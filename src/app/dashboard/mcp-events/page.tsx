"use client";

import { useState, useCallback } from "react";
import {
  Zap,
  RefreshCw,
  ChevronDown,
  Inbox,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface ScrapedEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  source: string;
  url?: string;
  score?: number;
  approved?: boolean;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

const cityOptions = [
  "Minneapolis",
  "St. Paul",
  "Duluth",
  "Rochester",
  "Chicago",
  "Denver",
  "Seattle",
  "Portland",
  "Phoenix",
  "Los Angeles",
];

const categoryOptions = [
  { label: "Community", value: "community" },
  { label: "Shelter", value: "shelter" },
  { label: "Food", value: "food" },
  { label: "Medical", value: "medical" },
  { label: "Employment", value: "employment" },
  { label: "Resources", value: "resources" },
  { label: "Clothing", value: "clothing" },
  { label: "Hygiene", value: "hygiene" },
];

export default function McpEventsPage() {
  const [city, setCity] = useState("Minneapolis");
  const [category, setCategory] = useState("community");
  const [cityOpen, setCityOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState<ScrapedEvent[]>([]);
  const [rejected, setRejected] = useState<ScrapedEvent[]>([]);
  const [lastFetch, setLastFetch] = useState<{
    total: number;
    cached: boolean;
  } | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const citySlug = city.toLowerCase().replace(/\s+/g, "-");
      const url = `${SUPABASE_URL}/functions/v1/scrape-events?city=${citySlug}&categories=${category}`;
      const res = await fetch(url);
      const data = await res.json();
      setApproved(data.events || []);
      setRejected(data.rejected || []);
      setLastFetch({
        total: data.total || 0,
        cached: data.cached || false,
      });
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setApproved([]);
      setRejected([]);
      setLastFetch(null);
    } finally {
      setLoading(false);
    }
  }, [city, category]);

  const categoryLabel =
    categoryOptions.find((c) => c.value === category)?.label || category;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          MCP Events Review Dashboard
        </h1>
        <p className="text-sm text-[#888888] mt-1">
          Review AI-filtered events for homeless services
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        {/* City dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setCityOpen(!cityOpen);
              setCategoryOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#111111] border border-[#1a1a2e] text-sm text-white hover:border-[#4169E1] transition-colors min-w-[160px] justify-between"
          >
            {city}
            <ChevronDown
              className={`w-4 h-4 text-[#888888] transition-transform ${cityOpen ? "rotate-180" : ""}`}
            />
          </button>
          {cityOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-[#111111] border border-[#1a1a2e] rounded-lg shadow-xl overflow-hidden z-10 max-h-60 overflow-y-auto">
              {cityOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCity(c);
                    setCityOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-[#1a1a2e] transition-colors ${
                    c === city
                      ? "text-[#4169E1] bg-[#4169E1]/10"
                      : "text-[#cccccc]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setCategoryOpen(!categoryOpen);
              setCityOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#111111] border border-[#1a1a2e] text-sm text-white hover:border-[#4169E1] transition-colors min-w-[160px] justify-between"
          >
            {categoryLabel}
            <ChevronDown
              className={`w-4 h-4 text-[#888888] transition-transform ${categoryOpen ? "rotate-180" : ""}`}
            />
          </button>
          {categoryOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-[#111111] border border-[#1a1a2e] rounded-lg shadow-xl overflow-hidden z-10">
              {categoryOptions.map((c) => (
                <button
                  key={c.value}
                  onClick={() => {
                    setCategory(c.value);
                    setCategoryOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-[#1a1a2e] transition-colors ${
                    c.value === category
                      ? "text-[#4169E1] bg-[#4169E1]/10"
                      : "text-[#cccccc]"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Refresh button */}
        <button
          onClick={fetchEvents}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#4169E1] hover:bg-[#3457C9] disabled:opacity-50 text-sm font-medium text-white transition-colors"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          {loading ? "Scraping..." : "Refresh"}
        </button>
      </div>

      {/* Stats bar */}
      {lastFetch && (
        <div className="flex gap-4 mb-4 text-xs text-[#888888]">
          <span>
            Total scraped: <span className="text-white">{lastFetch.total}</span>
          </span>
          <span>
            Approved:{" "}
            <span className="text-emerald-400">{approved.length}</span>
          </span>
          <span>
            Rejected: <span className="text-red-400">{rejected.length}</span>
          </span>
          {lastFetch.cached && (
            <span className="text-amber-400">Cached result</span>
          )}
        </div>
      )}

      {/* Tables grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Approved Events */}
        <div className="bg-[#111111] rounded-xl border border-[#1a1a2e] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1a1a2e] flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-semibold text-white">
              Approved Events
            </h2>
            {approved.length > 0 && (
              <span className="ml-auto text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                {approved.length}
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#888888] text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3 font-medium">Title</th>
                  <th className="text-left px-5 py-3 font-medium">Location</th>
                  <th className="text-left px-5 py-3 font-medium">Score</th>
                  <th className="text-left px-5 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-16 text-center">
                      <Loader2 className="w-6 h-6 text-[#4169E1] mx-auto mb-2 animate-spin" />
                      <p className="text-sm text-[#888888]">
                        Scraping events...
                      </p>
                    </td>
                  </tr>
                ) : approved.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-16 text-center">
                      <Inbox className="w-8 h-8 text-[#1a1a2e] mx-auto mb-2" />
                      <p className="text-sm text-[#888888]">No Data</p>
                      <p className="text-xs text-[#888888]/60 mt-1">
                        Click Refresh to fetch events for {city}
                      </p>
                    </td>
                  </tr>
                ) : (
                  approved.map((event) => (
                    <tr
                      key={event.id}
                      className="border-t border-[#1a1a2e] hover:bg-[#1a1a2e]/50 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-white font-medium truncate max-w-[200px]">
                            {event.title}
                          </span>
                          {event.url && (
                            <a
                              href={event.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#4169E1] hover:text-[#5a82f5] shrink-0"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        {event.description &&
                          event.description !== "No description available" && (
                            <p className="text-xs text-[#888888] mt-0.5 truncate max-w-[200px]">
                              {event.description}
                            </p>
                          )}
                      </td>
                      <td className="px-5 py-3 text-[#cccccc] truncate max-w-[150px]">
                        {event.location}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            (event.score || 0) >= 0.5
                              ? "bg-emerald-400/20 text-emerald-400"
                              : (event.score || 0) >= 0.3
                                ? "bg-amber-400/20 text-amber-400"
                                : "bg-blue-400/20 text-blue-400"
                          }`}
                        >
                          {((event.score || 0) * 100).toFixed(0)}%
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[#cccccc] text-xs whitespace-nowrap">
                        {event.date}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rejected Events */}
        <div className="bg-[#111111] rounded-xl border border-[#1a1a2e] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1a1a2e] flex items-center gap-2">
            <Zap className="w-4 h-4 text-red-400" />
            <h2 className="text-base font-semibold text-white">
              Rejected Events
            </h2>
            {rejected.length > 0 && (
              <span className="ml-auto text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                {rejected.length}
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#888888] text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3 font-medium">Title</th>
                  <th className="text-left px-5 py-3 font-medium">Location</th>
                  <th className="text-left px-5 py-3 font-medium">Score</th>
                  <th className="text-left px-5 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-16 text-center">
                      <Loader2 className="w-6 h-6 text-[#4169E1] mx-auto mb-2 animate-spin" />
                      <p className="text-sm text-[#888888]">
                        Scraping events...
                      </p>
                    </td>
                  </tr>
                ) : rejected.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-16 text-center">
                      <Inbox className="w-8 h-8 text-[#1a1a2e] mx-auto mb-2" />
                      <p className="text-sm text-[#888888]">No Data</p>
                      <p className="text-xs text-[#888888]/60 mt-1">
                        No rejected events to review
                      </p>
                    </td>
                  </tr>
                ) : (
                  rejected.map((event) => (
                    <tr
                      key={event.id}
                      className="border-t border-[#1a1a2e] hover:bg-[#1a1a2e]/50 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#cccccc] truncate max-w-[200px]">
                            {event.title}
                          </span>
                          {event.url && (
                            <a
                              href={event.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#888888] hover:text-[#4169E1] shrink-0"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-[#888888] truncate max-w-[150px]">
                        {event.location}
                      </td>
                      <td className="px-5 py-3">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-red-400/20 text-red-400">
                          {((event.score || 0) * 100).toFixed(0)}%
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[#888888] text-xs whitespace-nowrap">
                        {event.date}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
