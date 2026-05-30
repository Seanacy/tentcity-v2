"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, MapPin } from "lucide-react";

interface Suggestion {
  id: number;
  name: string;
  address: string;
}

interface SearchBarProps {
  suggestions: Suggestion[];
  onSearch: (term: string) => void;
  onSelect: (id: number) => void;
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export default function SearchBar({
  suggestions,
  onSearch,
  onSelect,
  isExpanded,
  onExpand,
  onCollapse,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        if (!query) {
          onCollapse();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [query, onCollapse]);

  function handleInputChange(value: string) {
    setQuery(value);
    onSearch(value);
    setShowDropdown(value.length > 0 && suggestions.length > 0);
  }

  function handleSelect(id: number) {
    setShowDropdown(false);
    setQuery("");
    onSelect(id);
    onCollapse();
  }

  function handleClear() {
    setQuery("");
    onSearch("");
    setShowDropdown(false);
    onCollapse();
  }

  // Update dropdown visibility when suggestions change
  useEffect(() => {
    if (query.length > 0 && suggestions.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [suggestions, query]);

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`flex items-center gap-2 rounded-full bg-[#111111] border border-[#1a1a2e] transition-all duration-300 ease-in-out ${
          isExpanded ? "w-full px-3 py-2" : "w-10 h-10 justify-center cursor-pointer"
        }`}
        onClick={!isExpanded ? onExpand : undefined}
      >
        <Search className="w-4 h-4 text-[#4169E1] flex-shrink-0" />

        {isExpanded && (
          <>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Search locations..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-[#666666] outline-none min-w-0"
            />
            {query && (
              <button
                onClick={handleClear}
                className="flex-shrink-0 p-0.5 rounded-full hover:bg-[#1a1a2e] transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5 text-[#888888]" />
              </button>
            )}
          </>
        )}
      </div>

      {/* Autocomplete dropdown */}
      {showDropdown && isExpanded && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#111111] border border-[#1a1a2e] rounded-xl shadow-2xl overflow-hidden z-50 max-h-64 overflow-y-auto">
          {suggestions.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-[#1a1a2e] transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#4169E1] mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-white font-medium truncate">
                  {item.name}
                </p>
                <p className="text-xs text-[#888888] truncate">{item.address}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
