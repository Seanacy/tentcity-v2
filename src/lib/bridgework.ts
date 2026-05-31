import type { BridgeWorkTask } from "@/types/database";

const BRIDGEWORK_API = "https://bridge-work-omega.vercel.app/api/tasks";

interface BridgeWorkAPITask {
  id: string;
  title: string;
  description: string;
  pay: number;
  address: string;
  lat: number;
  lng: number;
  status: string;
  created_at: string;
}

export async function fetchBridgeWorkTasks(): Promise<BridgeWorkTask[]> {
  try {
    const res = await fetch(BRIDGEWORK_API, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    const tasks: BridgeWorkAPITask[] = json.tasks || json;
    return tasks
      .filter(
        (t) =>
          t.status?.toLowerCase() === "open" ||
          t.status?.toLowerCase() === "available"
      )
      .map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        category: "Employment",
        pay: t.pay,
        location: t.address,
        latitude: t.lat,
        longitude: t.lng,
        status: t.status,
        created_at: t.created_at,
      }));
  } catch {
    console.error("Failed to fetch BridgeWork tasks");
    return [];
  }
}
