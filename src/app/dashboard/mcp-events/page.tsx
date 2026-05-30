"use client";

import { useState } from "react";
import {
  Zap,
  RefreshCw,
  ChevronDown,
  Inbox,
} from "lucide-react";

const cityOptions = ["Minneapolis", "St. Paul", "Duluth", "Rochester"];
const categoryOptions = ["Shelter", "Food", "Medical", "Employment", "Legal Aid"];

export default function McpEventsPage() {
  const [city, setCity] = useState("Minneapolis");
  const [category, setCategory] = useState("Shelter");
  const [cityOpen, setCityOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

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
      <div className="flex flex-wrap gap-3 mb-6">
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
            <ChevronDown className={`w-4 h-4 text-[#888888] transition-transform ${cityOpen ? "rotate-180" : ""}`} />
          </button>
          {cityOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-[#111111] border border-[#1a1a2e] rounded-lg shadow-xl overflow-hidden z-10">
              {cityOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCity(c);
                    setCityOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-[#1a1a2e] transition-colors ${
                    c === city ? "text-[#4169E1] bg-[#4169E1]/10" : "text-[#cccccc]"
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
            {category}
            <ChevronDown className={`w-4 h-4 text-[#888888] transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
          </button>
          {categoryOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-[#111111] border border-[#1a1a2e] rounded-lg shadow-xl overflow-hidden z-10">
              {categoryOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCategory(c);
                    setCategoryOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-[#1a1a2e] transition-colors ${
                    c === category ? "text-[#4169E1] bg-[#4169E1]/10" : "text-[#cccccc]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Refresh button */}
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#4169E1] hover:bg-[#3457C9] text-sm font-medium text-white transition-colors">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Tables grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Approved Events */}
        <div className="bg-[#111111] rounded-xl border border-[#1a1a2e] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1a1a2e] flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-semibold text-white">
              Approved Events
            </h2>
          </div>

          {/* Table header */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#888888] text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3 font-medium">Title</th>
                  <th className="text-left px-5 py-3 font-medium">Location</th>
                  <th className="text-left px-5 py-3 font-medium">Relevance</th>
                  <th className="text-left px-5 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center">
                    <Inbox className="w-8 h-8 text-[#1a1a2e] mx-auto mb-2" />
                    <p className="text-sm text-[#888888]">No Data</p>
                    <p className="text-xs text-[#888888]/60 mt-1">
                      Click Refresh to fetch events for {city}
                    </p>
                  </td>
                </tr>
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
          </div>

          {/* Table header */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#888888] text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3 font-medium">Title</th>
                  <th className="text-left px-5 py-3 font-medium">Location</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                  <th className="text-left px-5 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center">
                    <Inbox className="w-8 h-8 text-[#1a1a2e] mx-auto mb-2" />
                    <p className="text-sm text-[#888888]">No Data</p>
                    <p className="text-xs text-[#888888]/60 mt-1">
                      No rejected events to review
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
