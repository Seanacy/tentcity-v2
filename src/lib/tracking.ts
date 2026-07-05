import { createClient } from "@supabase/supabase-js";

// Untyped client — avoids Database generic constraint issues with supabase-js v2
const trackingClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SESSION_ID = crypto.randomUUID();

const ANON_DEVICE_KEY = "tentcity_anon_device_id";

/**
 * Get a stable per-browser anonymous ID for visitors who aren't signed in.
 * Generated once and stored in localStorage so the same device keeps the
 * same (hashed) anon_id across visits, just like a signed-in user would.
 */
export function getAnonDeviceId(): string {
  if (typeof window === "undefined") return crypto.randomUUID();
  try {
    let id = window.localStorage.getItem(ANON_DEVICE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(ANON_DEVICE_KEY, id);
    }
    return id;
  } catch {
    // localStorage unavailable (private browsing, etc.) — fall back to a
    // session-only ID rather than skipping tracking entirely.
    return crypto.randomUUID();
  }
}

/**
 * Hash a user ID into an anonymous identifier.
 * SHA-256 is one-way — can't be reversed to find the user.
 */
async function hashUserId(userId: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(userId);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Record an anonymized location ping.
 * Call this when the app opens and GPS is available.
 *
 * @param userId - The raw auth user ID (gets hashed before storage)
 * @param lat - Latitude
 * @param lng - Longitude
 * @param accuracy - GPS accuracy in meters
 * @param appSource - Which app: 'tentcity' | 'bridgework' | 'osaat'
 */
export async function trackLocation(
  userId: string,
  lat: number,
  lng: number,
  accuracy: number | null,
  appSource: "tentcity" | "bridgework" | "osaat"
) {
  try {
    const anonId = await hashUserId(userId);
    await trackingClient.from("location_pings").insert({
      anon_id: anonId,
      lat,
      lng,
      accuracy,
      app_source: appSource,
      session_id: SESSION_ID,
    });
  } catch {
    // Silent fail — tracking should never break the app
  }
}
