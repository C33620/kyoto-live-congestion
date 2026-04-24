import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius");

  if (!lat || !lng || !radius) {
    return NextResponse.json(
      { error: "Missing lat, lng, or radius" },
      { status: 400 },
    );
  }

  const query = `
    [out:json][timeout:25];
    (
      node["shop"](around:${radius},${lat},${lng});
      node["amenity"~"^(restaurant|cafe|bar|fast_food)$"](around:${radius},${lat},${lng});
    );
    out body;
  `.trim();

  const overpassUrl = new URL("https://overpass.kumi.systems/api/interpreter");
  overpassUrl.searchParams.set("data", query);

  const res = await fetch(overpassUrl.toString(), {
    method: "GET",
    cache: "no-store",
    headers: {
      "User-Agent": "kyoto-live-congestion/1.0 (contact: hello@yourdomain.com)",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: `Overpass ${res.status}`, details: text.slice(0, 300) },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
