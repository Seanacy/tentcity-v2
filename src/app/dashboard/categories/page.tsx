"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/types/database";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  FolderOpen,
} from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

      if (!error && data) {
        setCategories(data as Category[]);
      }
      setLoading(false);
    }
    fetchCategories();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Category Management</h1>
      </div>

      {/* Sub-header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">All Categories</h2>
          <p className="text-sm text-[#888888] mt-0.5">
            {categories.length} categor{categories.length === 1 ? "y" : "ies"} configured
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#4169E1] hover:bg-[#3457C9] text-sm font-medium text-white transition-colors self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          New Category
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-[#4169E1] animate-spin" />
          <span className="ml-3 text-sm text-[#888888]">Loading categories...</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && categories.length === 0 && (
        <div className="text-center py-20">
          <FolderOpen className="w-10 h-10 text-[#1a1a2e] mx-auto mb-3" />
          <p className="text-sm text-[#888888]">No categories found.</p>
        </div>
      )}

      {/* Category cards */}
      {!loading && (
        <div className="space-y-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#111111] rounded-xl border border-[#1a1a2e] p-5"
            >
              <div className="flex items-start gap-4">
                {/* Color circle */}
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: cat.color }}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-white mb-1">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-sm text-[#888888] leading-relaxed mb-3">
                      {cat.description}
                    </p>
                  )}

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs mb-4">
                    <div>
                      <span className="text-[#888888] uppercase font-medium tracking-wider">
                        Icon
                      </span>{" "}
                      <span className="text-[#cccccc]">{cat.icon_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#888888] uppercase font-medium tracking-wider">
                        Color
                      </span>
                      <span className="text-[#cccccc]">{cat.color}</span>
                      <span
                        className="inline-block w-3 h-3 rounded-sm"
                        style={{ backgroundColor: cat.color }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-3 border-t border-[#1a1a2e]">
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
