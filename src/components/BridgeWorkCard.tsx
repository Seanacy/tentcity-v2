"use client";

import { MapPin, DollarSign, ExternalLink } from "lucide-react";
import type { BridgeWorkTask } from "@/types/database";

interface BridgeWorkCardProps {
  task: BridgeWorkTask;
}

export default function BridgeWorkCard({ task }: BridgeWorkCardProps) {
  const formattedPay = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(task.pay);

  return (
    <div
      className="bg-[#1e2a3a] rounded-xl overflow-hidden border-l-4 transition-transform hover:scale-[1.01]"
      style={{ borderLeftColor: "#F39C12" }}
    >
      <div className="p-4">
        {/* Title */}
        <h3 className="text-sm font-bold text-white leading-tight mb-1">
          {task.title}
        </h3>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-[#8899a6] leading-relaxed mb-2 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Pay */}
        <div className="flex items-center gap-1.5 mb-2">
          <DollarSign className="w-3.5 h-3.5 text-[#F39C12] flex-shrink-0" />
          <span className="text-sm font-semibold text-[#F39C12]">
            {formattedPay}
          </span>
          <span className="text-[10px] text-[#8899a6]">cash</span>
        </div>

        {/* Location */}
        <div className="flex items-start gap-1.5 mb-3">
          <MapPin className="w-3.5 h-3.5 text-[#5ba3a8] mt-0.5 flex-shrink-0" />
          <span className="text-xs text-[#8899a6]">{task.location}</span>
        </div>

        {/* Category tag */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={{
              backgroundColor: "#F39C1222",
              color: "#F39C12",
              border: "1px solid #F39C1244",
            }}
          >
            {task.category || "Employment"}
          </span>
        </div>

        {/* Action */}
        <a
          href={`https://bridge-work-omega.vercel.app`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg bg-[#F39C12] hover:bg-[#e08e0b] text-xs text-white font-medium transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View on BridgeWork
        </a>
      </div>
    </div>
  );
}
