"use client";

import { Heart } from "lucide-react";

export default function SupportButton() {
  return (
    <button
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-[#3a6b6e] hover:bg-[#2e5558] text-white text-sm font-semibold shadow-lg shadow-black/30 transition-colors"
      onClick={() => {
        /* TODO: open support/donation modal */
      }}
    >
      <Heart className="w-4 h-4 fill-current" />
      Support Our Cause
    </button>
  );
}
