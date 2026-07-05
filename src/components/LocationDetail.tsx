"use client";

import { useEffect, useState } from "react";
import {
  X,
  MapPin,
  Phone,
  Clock,
  FileText,
  Globe,
  Tag,
  Navigation,
  Heart,
  Bell,
  Flag,
} from "lucide-react";
import type { Location } from "@/types/database";
import { useAuth } from "@/lib/auth";
import {
  getFavoriteIds,
  toggleFavorite,
  getSubscribedIds,
  toggleSubscribe,
  submitFlag,
} from "@/lib/locationActions";

interface LocationDetailProps {
  location: Location;
  onClose: () => void;
  onGetDirections: (location: Location) => void;
}

export default function LocationDetail({
  location,
  onClose,
  onGetDirections,
}: LocationDetailProps) {
  const { user } = useAuth();
  const [favorited, setFavorited] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showFlagForm, setShowFlagForm] = useState(false);
  const [flagReason, setFlagReason] = useState("");
  const [flagSubmitted, setFlagSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavorited(false);
      setSubscribed(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const [favIds, subIds] = await Promise.all([
        getFavoriteIds(user.id),
        getSubscribedIds(user.id),
      ]);
      if (cancelled) return;
      setFavorited(favIds.has(location.id));
      setSubscribed(subIds.has(location.id));
    })();
    return () => {
      cancelled = true;
    };
  }, [user, location.id]);

  const handleFavoriteClick = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setBusy(true);
    await toggleFavorite(user.id, location.id, favorited);
    setFavorited((f) => !f);
    setBusy(false);
  };

  const handleSubscribeClick = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setBusy(true);
    await toggleSubscribe(user.id, location.id, subscribed);
    setSubscribed((s) => !s);
    setBusy(false);
  };

  const handleFlagClick = () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setShowFlagForm((v) => !v);
  };

  const handleFlagSubmit = async () => {
    if (!user || !flagReason.trim()) return;
    setBusy(true);
    const { error } = await submitFlag(user.id, location.id, flagReason.trim());
    setBusy(false);
    if (!error) {
      setFlagSubmitted(true);
      setShowFlagForm(false);
      setFlagReason("");
    }
  };

  const rows: { label: string; icon: React.ReactNode; value: React.ReactNode }[] = [
    {
      label: "Address",
      icon: <MapPin className="w-4 h-4 text-[#4169E1]" />,
      value: (
        <a
          href={`https://maps.apple.com/?daddr=${encodeURIComponent(location.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4169E1] hover:underline"
        >
          {location.address}
        </a>
      ),
    },
    ...(location.phone
      ? [
          {
            label: "Phone",
            icon: <Phone className="w-4 h-4 text-[#4169E1]" />,
            value: (
              <a href={`tel:${location.phone}`} className="text-[#4169E1] hover:underline">
                {location.phone}
              </a>
            ),
          },
        ]
      : []),
    ...(location.hours
      ? [
          {
            label: "Hours",
            icon: <Clock className="w-4 h-4 text-[#4169E1]" />,
            value: location.hours,
          },
        ]
      : []),
    ...(location.description
      ? [
          {
            label: "Description",
            icon: <FileText className="w-4 h-4 text-[#4169E1]" />,
            value: location.description,
          },
        ]
      : []),
    {
      label: "Coordinates",
      icon: <Globe className="w-4 h-4 text-[#4169E1]" />,
      value: `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`,
    },
    ...(location.categories && location.categories.length > 0
      ? [
          {
            label: "Categories",
            icon: <Tag className="w-4 h-4 text-[#4169E1]" />,
            value: (
              <div className="flex flex-wrap gap-1.5">
                {location.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{
                      backgroundColor: `${cat.color}22`,
                      color: cat.color,
                      border: `1px solid ${cat.color}44`,
                    }}
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="absolute inset-0 z-40 bg-[#000000] overflow-y-auto animate-in slide-in-from-left duration-300">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#000000] border-b border-[#1a1a2e]">
        <h2 className="text-base font-bold text-white truncate pr-4">
          {location.name}
        </h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-[#111111] transition-colors flex-shrink-0"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-[#888888]" />
        </button>
      </div>

      {/* Image */}
      {location.image_url && (
        <div className="px-4 pt-4">
          <img
            src={location.image_url}
            alt={location.name}
            className="w-full h-44 object-cover rounded-xl"
          />
        </div>
      )}

      {/* Get Directions button */}
      <div className="px-4 pt-4">
        <button
          onClick={() => onGetDirections(location)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#4169E1] hover:bg-[#3457C9] text-sm font-semibold text-white transition-colors"
        >
          <Navigation className="w-4 h-4" />
          Get Directions
        </button>
      </div>

      {/* Favorite / Notify / Report — signed-out taps send to /login */}
      <div className="px-4 pt-3 flex gap-2">
        <button
          onClick={handleFavoriteClick}
          disabled={busy}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
            favorited
              ? "bg-[#4169E1]/20 text-[#4169E1]"
              : "bg-[#111111] text-[#888888] hover:bg-[#1a1a2e]"
          }`}
        >
          <Heart className="w-3.5 h-3.5" fill={favorited ? "currentColor" : "none"} />
          {favorited ? "Saved" : "Save"}
        </button>
        <button
          onClick={handleSubscribeClick}
          disabled={busy}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
            subscribed
              ? "bg-[#4169E1]/20 text-[#4169E1]"
              : "bg-[#111111] text-[#888888] hover:bg-[#1a1a2e]"
          }`}
        >
          <Bell className="w-3.5 h-3.5" fill={subscribed ? "currentColor" : "none"} />
          {subscribed ? "Notified" : "Notify Me"}
        </button>
        <button
          onClick={handleFlagClick}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#111111] text-[#888888] hover:bg-[#1a1a2e] text-xs font-medium transition-colors"
        >
          <Flag className="w-3.5 h-3.5" />
          Report
        </button>
      </div>

      {/* Inline report form */}
      {showFlagForm && (
        <div className="mx-4 mt-2 p-3 rounded-lg bg-[#111111] border border-[#1a1a2e]">
          <p className="text-xs text-[#888888] mb-2">
            What&apos;s wrong with this listing?
          </p>
          <textarea
            value={flagReason}
            onChange={(e) => setFlagReason(e.target.value)}
            rows={2}
            placeholder="e.g. Closed down, wrong address, wrong hours..."
            className="w-full px-3 py-2 rounded-lg bg-[#000000] border border-[#1a1a2e] text-xs text-white placeholder-[#555555] focus:outline-none focus:border-[#4169E1]"
          />
          <button
            onClick={handleFlagSubmit}
            disabled={busy || !flagReason.trim()}
            className="mt-2 w-full px-3 py-2 rounded-lg bg-[#4169E1] hover:bg-[#3457C9] disabled:opacity-50 text-xs font-semibold text-white transition-colors"
          >
            Submit Report
          </button>
        </div>
      )}
      {flagSubmitted && (
        <p className="mx-4 mt-2 text-xs text-[#4169E1]">
          Thanks — we&apos;ll take a look.
        </p>
      )}

      {/* Detail rows */}
      <div className="px-4 py-4 space-y-0">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex gap-3 py-3 border-b border-[#1a1a2e] last:border-b-0"
          >
            <div className="flex-shrink-0 mt-0.5">{row.icon}</div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-[#666666] font-semibold mb-0.5">
                {row.label}
              </p>
              <div className="text-sm text-[#cccccc] leading-relaxed">
                {row.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
