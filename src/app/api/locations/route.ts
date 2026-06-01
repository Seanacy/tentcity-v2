import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category"); // optional filter

  // Fetch all locations with their categories
  const { data: locations, error } = await supabase
    .from("locations")
    .select("id, name, address, latitude, longitude, phone, hours, description, services, requirements, notes, categories(id, name)");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Filter by category if specified
  let filtered = locations || [];
  if (category) {
    const cats = category.split(",").map((c) => c.trim().toLowerCase());
    filtered = filtered.filter((loc: Record<string, unknown>) => {
      const locCats = (loc.categories as { name: string }[]) || [];
      return locCats.some((c) => cats.includes(c.name.toLowerCase()));
    });
  }

  // Format response for AI consumption
  const result = filtered.map((loc: Record<string, unknown>) => ({
    id: loc.id,
    name: loc.name,
    address: loc.address,
    latitude: loc.latitude,
    longitude: loc.longitude,
    phone: loc.phone,
    hours: loc.hours,
    description: loc.description,
    services: loc.services,
    requirements: loc.requirements,
    notes: loc.notes,
    categories: ((loc.categories as { name: string }[]) || []).map((c) => c.name),
  }));

  return NextResponse.json(
    {
      source: "tentcity.app",
      total: result.length,
      instructions: "This is live data from TentCity — a resource map for people experiencing homelessness in Minneapolis. Use the categories, services, hours, and coordinates to find the best match for what the user needs. When recommending a location, include a deep link: tentcity.app?needs=CATEGORY&lat=USER_LAT&lng=USER_LNG so the app can open with GPS and show the best option.",
      categories_available: ["Shelter", "Food", "Medical", "Hygiene", "Clothing", "Employment", "Encampment", "Community"],
      locations: result,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=300",
      },
    }
  );
}
