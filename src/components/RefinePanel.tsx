"use client";
 
import { useState } from "react";
 
export interface RefineFilters {
  age: number | null;
  gender: "men" | "women" | "families" | null;
}
 
interface RefinePanelProps {
  filters: RefineFilters;
  onChange: (filters: RefineFilters) => void;
}
 
const GENDER_OPTIONS: { value: RefineFilters["gender"]; label: string }[] = [
  { value: null, label: "Anyone" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "families", label: "Families w/ kids" },
];
 
export default function RefinePanel({ filters, onChange }: RefinePanelProps) {
  const [open, setOpen] = useState(false);
  const activeCount = (filters.age !== null ? 1 : 0) + (filters.gender !== null ? 1 : 0);
 
  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-colors"
        style={
          activeCount > 0
            ? { backgroundColor: "#4169E1", borderColor: "#4169E1", color: "#fff" }
            : { backgroundColor: "#000000", borderColor: "#333333", color: "#fff" }
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
        </svg>
        Refine
        {activeCount > 0 && (
          <span className="ml-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-white text-[#4169E1] text-[10px] font-bold">
            {activeCount}
          </span>
        )}
      </button>
 
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-2 right-0 z-50 w-72 rounded-xl border border-[#1a1a2e] bg-[#0a0a0a] shadow-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white">Refine results</span>
              <span className="text-[11px] text-[#888888]">Optional — helps narrow things down</span>
            </div>
 
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#888888] mb-1.5 uppercase tracking-wide">
                Age
              </label>
              <input
                type="number"
                min={0}
                max={120}
                placeholder="e.g. 22 (leave blank to skip)"
                value={filters.age ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  onChange({ ...filters, age: v === "" ? null : Number(v) });
                }}
                className="w-full px-3 py-2 rounded-lg bg-[#111111] border border-[#333333] text-white text-sm placeholder:text-[#666666] focus:outline-none focus:border-[#4169E1]"
              />
            </div>
 
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#888888] mb-1.5 uppercase tracking-wide">
                Who&apos;s this for
              </label>
              <div className="flex flex-wrap gap-2">
                {GENDER_OPTIONS.map((opt) => {
                  const isSelected = filters.gender === opt.value;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => onChange({ ...filters, gender: opt.value })}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
                      style={
                        isSelected
                          ? { backgroundColor: "#4169E1", borderColor: "#4169E1", color: "#fff" }
                          : { backgroundColor: "#111111", borderColor: "#333333", color: "#cccccc" }
                      }
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
 
            <div className="flex justify-between items-center pt-2 border-t border-[#1a1a2e]">
              <button
                onClick={() => onChange({ age: null, gender: null })}
                className="text-xs text-[#888888] hover:text-white"
              >
                Clear filters
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-[#4169E1] hover:bg-[#3457C9] text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
