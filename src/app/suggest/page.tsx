"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/lib/auth";
import { submitLocationSuggestion } from "@/lib/locationActions";
import { Send, LogIn } from "lucide-react";

export default function SuggestLocationPage() {
  const { user, loading } = useAuth();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [hours, setHours] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !name.trim()) return;
    setSubmitting(true);
    setError(null);
    const { error } = await submitLocationSuggestion(user.id, {
      name: name.trim(),
      address: address.trim() || undefined,
      description: description.trim() || undefined,
      category: category.trim() || undefined,
      phone: phone.trim() || undefined,
      hours: hours.trim() || undefined,
    });
    setSubmitting(false);
    if (error) {
      setError(error);
    } else {
      setDone(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      <Navbar />
      <div className="max-w-md mx-auto pt-20 px-4 pb-12">
        <h1 className="text-xl font-bold text-white mb-1">Suggest a Location</h1>
        <p className="text-sm text-[#888888] mb-6">
          Know a resource that&apos;s missing from the map? Tell us about it.
        </p>

        {loading ? null : !user ? (
          <div className="p-4 rounded-xl bg-[#111111] border border-[#1a1a2e] text-center">
            <p className="text-sm text-[#cccccc] mb-3">
              Sign in to suggest a new location.
            </p>
            <a
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4169E1] hover:bg-[#3457C9] text-sm font-semibold text-white transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </a>
          </div>
        ) : done ? (
          <div className="p-4 rounded-xl bg-[#111111] border border-[#1a1a2e] text-center">
            <p className="text-sm text-[#cccccc]">
              Thanks! Your suggestion was submitted for review.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Location name *"
              required
              className="w-full px-3 py-2.5 rounded-lg bg-[#111111] border border-[#1a1a2e] text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#4169E1]"
            />
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full px-3 py-2.5 rounded-lg bg-[#111111] border border-[#1a1a2e] text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#4169E1]"
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category (e.g. Food, Shelter, Medical)"
              className="w-full px-3 py-2.5 rounded-lg bg-[#111111] border border-[#1a1a2e] text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#4169E1]"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="w-full px-3 py-2.5 rounded-lg bg-[#111111] border border-[#1a1a2e] text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#4169E1]"
            />
            <input
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Hours"
              className="w-full px-3 py-2.5 rounded-lg bg-[#111111] border border-[#1a1a2e] text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#4169E1]"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What should people know about this place?"
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg bg-[#111111] border border-[#1a1a2e] text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#4169E1]"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={submitting || !name.trim()}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#4169E1] hover:bg-[#3457C9] disabled:opacity-50 text-sm font-semibold text-white transition-colors"
            >
              <Send className="w-4 h-4" />
              {submitting ? "Submitting..." : "Submit Suggestion"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
