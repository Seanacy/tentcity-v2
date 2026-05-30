import type { BridgeWorkTask } from "@/types/database";

const BRIDGEWORK_API = "https://bridge-work-omega.vercel.app/api/tasks";

export async function fetchBridgeWorkTasks(): Promise<BridgeWorkTask[]> {
  try {
    const res = await fetch(BRIDGEWORK_API, { cache: "no-store" });
    if (!res.ok) return [];
    const data: BridgeWorkTask[] = await res.json();
    return data.filter(
      (t) =>
        t.status?.toLowerCase() === "open" ||
        t.status?.toLowerCase() === "available"
    );
  } catch {
    console.error("Failed to fetch BridgeWork tasks");
    return [];
  }
}
