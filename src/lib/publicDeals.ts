import type { ShopMarker } from "@/components/map/ZoneInfoCard";

export interface PublicDeal {
  deal_id: string;
  venue_id: string;
  venue_name: string;
  venue_type: string;
  normalized_name: string;
  normalized_address: string;
  google_maps_url?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  title: string;
  description: string;
  deal_type: string;
  fine_print?: string | null;
  end_at: string;
  is_featured: boolean;
  updated_at: string;
}

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "";

export async function fetchPublicDeals(): Promise<PublicDeal[]> {
  try {
    const res = await fetch(`${DASHBOARD_URL}/api/deals/public`, {
      next: { revalidate: 180 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");
}

export function getDealsForShop(
  deals: PublicDeal[],
  shopName: string,
): PublicDeal[] {
  const shopNorm = normalizeName(shopName);
  return deals.filter((d) => {
    // Exact match only — prevents false positives on partial name overlap
    const viewNorm = d.normalized_name?.toLowerCase().trim() ?? "";
    if (viewNorm) return viewNorm === shopNorm;
    return normalizeName(d.venue_name) === shopNorm;
  });
}

// ─── Ward → zone mapping ──────────────────────────────────────────────────────
// Maps Kyoto ward name keywords (from normalized_address) to KyotoFlow zone ids
const WARD_TO_ZONE: Record<string, string> = {
  shimogyo: "central-kawaramachi",
  nakagyo: "central-kawaramachi",
  higashiyama: "higashiyama",
  fushimi: "fushimi-inari",
  ukyo: "arashiyama-sagano",
  sakyo: "philosopher-path",
  kita: "kinkakuji",
  kamigyo: "kyoto-imperial-park",
  nishikyo: "katsura-imperial-villa",
  minami: "kyoto-station",
  yamashina: "tofukuji",
};

/**
 * Returns the best KyotoFlow zone id for a deal based on its normalized_address.
 * Returns null if no ward keyword matches — deal should not be rendered.
 */
export function getZoneForDeal(normalizedAddress: string): string | null {
  const addr = normalizedAddress.toLowerCase();
  for (const [ward, zoneId] of Object.entries(WARD_TO_ZONE)) {
    if (addr.includes(ward)) return zoneId;
  }
  return null;
}

/**
 * Builds a synthetic ShopMarker from a deal so it can appear
 * in the correct zone's shop list even if OpenStreetMap has no entry for it.
 */
export function dealToSyntheticShop(deal: PublicDeal): ShopMarker {
  return {
    id: -Math.abs(
      deal.venue_id.split("").reduce((a, c) => a + c.charCodeAt(0), 0),
    ),
    name: deal.venue_name,
    type:
      deal.venue_type === "bakery"
        ? "bakery"
        : deal.venue_type === "restaurant"
          ? "restaurant"
          : "cafe",
    lat: 0,
    lon: 0,
    cuisine: undefined,
    rating: null,
    tags: deal.google_maps_url
      ? ({ website: deal.google_maps_url } as Record<string, string>)
      : undefined,
  };
}
