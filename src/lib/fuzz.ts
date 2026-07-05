// Deterministic seeded fuzz for a BridgeWork task's map pin.
// Same task always fuzzes to the same fake spot (no jitter on reload/re-render),
// but the fake spot never reveals the real address to signed-out visitors.
function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), h | 1);
    h ^= h + Math.imul(h ^ (h >>> 7), h | 61);
    return ((h ^ (h >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Returns a fake lat/lng offset from the real one by 200-500 meters,
 * in a random direction that's fixed per taskId (same task = same fake spot every time).
 */
export function fuzzTaskLocation(
  taskId: string | number,
  lat: number,
  lng: number
): { latitude: number; longitude: number } {
  const rand = seededRandom(`bw-task-${taskId}`);
  const angle = rand() * 2 * Math.PI;
  const distanceMeters = 200 + rand() * 300; // 200m - 500m off from real spot
  const dLat = (distanceMeters * Math.cos(angle)) / 111320;
  const dLng =
    (distanceMeters * Math.sin(angle)) /
    (111320 * Math.cos((lat * Math.PI) / 180));
  return { latitude: lat + dLat, longitude: lng + dLng };
}
