import { createClient } from "@supabase/supabase-js";

// Untyped client — avoids Database generic constraint issues with supabase-js v2
// (same workaround already used in lib/tracking.ts for the same reason).
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getFavoriteIds(userId: string): Promise<Set<number>> {
  const { data } = await supabase
    .from("location_favorites")
    .select("location_id")
    .eq("user_id", userId);
  return new Set((data || []).map((r) => r.location_id as number));
}

export async function toggleFavorite(
  userId: string,
  locationId: number,
  currentlyFavorited: boolean
): Promise<void> {
  if (currentlyFavorited) {
    await supabase
      .from("location_favorites")
      .delete()
      .eq("user_id", userId)
      .eq("location_id", locationId);
  } else {
    await supabase
      .from("location_favorites")
      .insert({ user_id: userId, location_id: locationId });
  }
}

export async function getSubscribedIds(userId: string): Promise<Set<number>> {
  const { data } = await supabase
    .from("location_subscriptions")
    .select("location_id")
    .eq("user_id", userId);
  return new Set((data || []).map((r) => r.location_id as number));
}

export async function toggleSubscribe(
  userId: string,
  locationId: number,
  currentlySubscribed: boolean
): Promise<void> {
  if (currentlySubscribed) {
    await supabase
      .from("location_subscriptions")
      .delete()
      .eq("user_id", userId)
      .eq("location_id", locationId);
  } else {
    await supabase
      .from("location_subscriptions")
      .insert({ user_id: userId, location_id: locationId });
  }
}

export async function submitFlag(
  userId: string,
  locationId: number,
  reason: string
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("location_flags")
    .insert({ user_id: userId, location_id: locationId, reason });
  return { error: error?.message ?? null };
}

export interface LocationSuggestionInput {
  name: string;
  address?: string;
  description?: string;
  category?: string;
  phone?: string;
  hours?: string;
}

export async function submitLocationSuggestion(
  userId: string,
  payload: LocationSuggestionInput
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("location_suggestions")
    .insert({ submitted_by: userId, ...payload });
  return { error: error?.message ?? null };
}
