// components/map/KyotoMap.tsx
"use client";

import { ActivityTagFilter } from "@/components/map/ActivityTagFilter";
import KawaiiLoader from "@/components/map/KawaiiLoader";
import type { ShopMarker } from "@/components/map/ZoneInfoCard";
import { ZoneInfoCard } from "@/components/map/ZoneInfoCard";
import { KYOTO_ZONES } from "@/constants/kyotoZones";
import { congestionAdapter } from "@/lib/congestion";
import type { CongestionZone } from "@/types";
import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface OverpassElement {
  id: number;
  lat: number;
  lon: number;
  tags?: {
    name?: string;
    "name:en"?: string;
    shop?: string;
    amenity?: string;
    cuisine?: string;
    [key: string]: string | undefined;
  };
}

const KyotoMapInner = dynamic(() => import("@/components/map/KyotoMapInner"), {
  ssr: false,
});

const REFRESH_INTERVAL_MS = 10 * 60 * 1000;
const MIN_LOADER_MS = 3000;
const TAB_WIDTH = 28; // px — always-visible peek width

// ─── Overpass fetch ───────────────────────────────────────────────────────────
async function fetchShopsNear(
  lat: number,
  lng: number,
  radiusMeters: number,
): Promise<ShopMarker[]> {
  const query = `
    [out:json][timeout:25];
    (
      node["shop"](around:${radiusMeters},${lat},${lng});
      node["amenity"~"^(restaurant|cafe|bar|fast_food)$"](around:${radiusMeters},${lat},${lng});
    );
    out body;
  `;

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
  });
  const data = await res.json();

  return data.elements.map((el: OverpassElement) => ({
    id: el.id,
    lat: el.lat,
    lon: el.lon,
    name:
      el.tags?.name ||
      el.tags?.["name:en"] ||
      el.tags?.shop ||
      el.tags?.amenity ||
      "Shop",
    type: el.tags?.shop || el.tags?.amenity || "shop",
    cuisine: el.tags?.cuisine,
  }));
}

// ─── Component ────────────────────────────────────────────────────────────────
export function KyotoMap() {
  const [congestionData, setCongestionData] = useState<
    Map<string, CongestionZone>
  >(new Map());
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [activeTagZoneIds, setActiveTagZoneIds] = useState<Set<string> | null>(
    null,
  );
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  // ── User geolocation ────────────────────────────────────────────────────────
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null,
  );

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
      () => null,
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  const activeTagZoneIdsRef = useRef<Set<string> | null>(null);
  useEffect(() => {
    activeTagZoneIdsRef.current = activeTagZoneIds;
  }, [activeTagZoneIds]);

  const [shopsByZone, setShopsByZone] = useState<
    Map<string, ShopMarker[] | null>
  >(new Map());

  // ── Filter drawer state + swipe ─────────────────────────────────────────────
  const [filterOpen, setFilterOpen] = useState(false);
  const swipeStartX = useRef<number | null>(null);
  const swipeStartY = useRef<number | null>(null);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    swipeStartX.current = e.touches[0].clientX;
    swipeStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (swipeStartX.current === null || swipeStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - swipeStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - swipeStartY.current);
    // Only react to clearly horizontal swipes
    if (Math.abs(dx) > 40 && Math.abs(dx) > dy) {
      if (dx < 0) setFilterOpen(false); // swipe left  → hide
      if (dx > 0) setFilterOpen(true); // swipe right → show
    }
    swipeStartX.current = null;
    swipeStartY.current = null;
  };

  // ── Data loading ────────────────────────────────────────────────────────────
  const loadData = useCallback(async (isBackground = false) => {
    if (isBackground) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const [zones] = await Promise.all([
        congestionAdapter.fetchAllZones(),
        !isBackground
          ? new Promise<void>((res) => setTimeout(res, MIN_LOADER_MS))
          : Promise.resolve(),
      ]);

      const map = new Map(zones.map((z) => [z.id, z]));
      setCongestionData(map);
      setLastFetched(new Date());
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData(false);
  }, [loadData]);

  useEffect(() => {
    const interval = setInterval(() => loadData(true), REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [loadData]);

  // ── Zone interactions ───────────────────────────────────────────────────────
  const handleZoneClick = useCallback(
    async (zoneId: string) => {
      const currentFilter = activeTagZoneIdsRef.current;

      if (selectedZoneId === zoneId && !currentFilter) {
        setSelectedZoneId(null);
        return;
      }

      setSelectedZoneId(zoneId);
      if (shopsByZone.has(zoneId)) return;

      setShopsByZone((prev) => new Map(prev).set(zoneId, null));

      try {
        const zoneGeometry = KYOTO_ZONES.find((z) => z.id === zoneId);
        if (!zoneGeometry) return;

        const shops = await fetchShopsNear(
          zoneGeometry.center.lat,
          zoneGeometry.center.lng,
          zoneGeometry.radius,
        );
        setShopsByZone((prev) => new Map(prev).set(zoneId, shops));
      } catch (err) {
        console.error("Overpass fetch failed:", err);
        setShopsByZone((prev) => new Map(prev).set(zoneId, []));
      }
    },
    [selectedZoneId, shopsByZone],
  );

  const handleDismissCard = useCallback(() => {
    setSelectedZoneId(null);
  }, []);

  const selectedZone = selectedZoneId
    ? (congestionData.get(selectedZoneId) ?? null)
    : null;

  const selectedShops = selectedZoneId
    ? shopsByZone.has(selectedZoneId)
      ? shopsByZone.get(selectedZoneId)!
      : null
    : null;

  return (
    <div className="relative w-full h-full">
      {isLoading ? (
        <KawaiiLoader />
      ) : (
        <KyotoMapInner
          congestionData={congestionData}
          selectedZoneId={selectedZoneId}
          shopsByZone={shopsByZone}
          onZoneClick={handleZoneClick}
          onDismiss={handleDismissCard}
          activeTagZoneIds={activeTagZoneIds}
          userPosition={userPosition}
        />
      )}

      {/* ── Refresh button + timestamp ── */}
      <div className="absolute top-4 left-16 flex items-center gap-2 z-[2000]">
        <button
          onClick={() => loadData(true)}
          disabled={isRefreshing || isLoading}
          aria-label="Refresh congestion data"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-surface-offset)] transition-colors disabled:opacity-50"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <svg
            className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          {isRefreshing ? "Updating…" : "Refresh"}
        </button>

        {lastFetched && (
          <span
            className="text-xs text-[var(--color-text-muted)] bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-1.5 rounded-lg"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            Updated{" "}
            {lastFetched.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
        )}
      </div>

      {/* ── Activity tag filter — swipeable drawer ── */}
      <div
        className="absolute bottom-4 left-0 z-[2000] flex items-end"
        style={{
          transform: filterOpen
            ? "translateX(0)"
            : `translateX(calc(-100% + ${TAB_WIDTH}px))`,
          transition: "transform 320ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Filter panel */}
        <div className="pl-4">
          <ActivityTagFilter
            congestionData={congestionData}
            onZoneSelect={(zoneId) => setSelectedZoneId(zoneId)}
            onTagsChange={(matchingIds, tagIds) => {
              setActiveTagZoneIds(matchingIds);
              setSelectedTagIds(tagIds ?? []);
            }}
          />
        </div>

        {/* Always-visible tab — tap or swipe to toggle */}
        <button
          onClick={() => setFilterOpen((o) => !o)}
          aria-label={filterOpen ? "Hide filters" : "Show filters"}
          className="shrink-0 flex flex-col items-center justify-center gap-1.5 mb-3 ml-1"
          style={{
            width: TAB_WIDTH,
            height: 68,
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderLeft: "none",
            borderRadius: "0 10px 10px 0",
            boxShadow: "var(--shadow-md)",
            color: "var(--color-text-muted)",
          }}
        >
          {/* Dot indicator — filled when filters are active */}
          {selectedTagIds.length > 0 && (
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--color-primary)",
                flexShrink: 0,
              }}
            />
          )}

          {/* Chevron — flips with open state */}
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
            style={{
              transform: filterOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 320ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <path d="M9 18l6-6-6-6" />
          </svg>

          {/* Vertical label */}
          <span
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
              color: "var(--color-text-muted)",
              lineHeight: 1,
            }}
          >
            Filter
          </span>
        </button>
      </div>

      {/* ── Zone info card ── */}
      {selectedZone && (
        <div className="absolute top-4 right-4 z-[2000]">
          <ZoneInfoCard
            zone={selectedZone}
            shops={selectedShops}
            onDismiss={handleDismissCard}
            selectedTagIds={selectedTagIds}
            userPosition={userPosition}
          />
        </div>
      )}
    </div>
  );
}
