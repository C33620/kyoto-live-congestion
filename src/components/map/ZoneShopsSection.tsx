"use client";

import type { ShopMarker } from "@/components/map/ZoneInfoCard";
import { useState } from "react";

// ─── Curation ─────────────────────────────────────────────────────────────────
const GENERIC_NAMES = new Set([
  "restaurant",
  "cafe",
  "bar",
  "fast_food",
  "bakery",
  "supermarket",
  "convenience",
  "pharmacy",
  "shop",
  "food",
  "drink",
  "store",
]);

function isLegitName(name: string): boolean {
  const n = name.trim().toLowerCase();
  return n.length >= 2 && !GENERIC_NAMES.has(n) && !/^\d+$/.test(n);
}

function scoreRestaurant(shop: ShopMarker): number {
  let score = 0;
  if (isLegitName(shop.name)) score += 3;
  const cuisine = shop.cuisine ?? shop.tags?.cuisine;
  if (cuisine) score += 2;
  if (/[\u3040-\u30FF\u4E00-\u9FFF]/.test(shop.name)) score += 1;
  if (shop.tags?.website || shop.tags?.phone) score += 1;
  if (shop.name.length >= 3 && shop.name.length <= 40) score += 1;
  return score;
}

function curateShops(shops: ShopMarker[]): ShopMarker[] {
  return shops
    .filter((s) => {
      if (!isLegitName(s.name)) return false;
      if (s.type === "restaurant") return scoreRestaurant(s) >= 3;
      return true;
    })
    .map((s) =>
      s.type === "restaurant" && s.rating == null
        ? { ...s, _qualityScore: scoreRestaurant(s) }
        : s,
    );
}

// ─── Category / cuisine configs ───────────────────────────────────────────────
const CATEGORY_CONFIG: Record<string, { label: string; emoji: string }> = {
  restaurant: { label: "Restaurants", emoji: "🍜" },
  cafe: { label: "Cafés", emoji: "☕" },
  bar: { label: "Bars", emoji: "🍺" },
  fast_food: { label: "Fast Food", emoji: "🍔" },
  bakery: { label: "Bakeries", emoji: "🥐" },
  supermarket: { label: "Supermarkets", emoji: "🛒" },
  convenience: { label: "Convenience", emoji: "🏪" },
  pharmacy: { label: "Pharmacies", emoji: "💊" },
};

const CUISINE_CONFIG: Record<string, { label: string; emoji: string }> = {
  japanese: { label: "Japanese", emoji: "🍱" },
  ramen: { label: "Ramen", emoji: "🍜" },
  sushi: { label: "Sushi", emoji: "🍣" },
  tempura: { label: "Tempura", emoji: "🍤" },
  yakitori: { label: "Yakitori", emoji: "🍢" },
  tonkatsu: { label: "Tonkatsu", emoji: "🥩" },
  udon: { label: "Udon", emoji: "🍝" },
  soba: { label: "Soba", emoji: "🍝" },
  kaiseki: { label: "Kaiseki", emoji: "🎎" },
  izakaya: { label: "Izakaya", emoji: "🏮" },
  chinese: { label: "Chinese", emoji: "🥢" },
  korean: { label: "Korean", emoji: "🫕" },
  italian: { label: "Italian", emoji: "🍝" },
  french: { label: "French", emoji: "🥖" },
  indian: { label: "Indian", emoji: "🍛" },
  thai: { label: "Thai", emoji: "🌶️" },
  american: { label: "American", emoji: "🍔" },
  burger: { label: "Burgers", emoji: "🍔" },
  pizza: { label: "Pizza", emoji: "🍕" },
  vegetarian: { label: "Vegetarian", emoji: "🥗" },
  vegan: { label: "Vegan", emoji: "🌱" },
  seafood: { label: "Seafood", emoji: "🦞" },
  steak: { label: "Steak", emoji: "🥩" },
  regional: { label: "Regional", emoji: "📍" },
};

function getCuisineConfig(c: string) {
  return CUISINE_CONFIG[c.toLowerCase()];
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface CuisineSubGroup {
  cuisine: string;
  label: string;
  emoji: string;
  items: ShopMarker[];
}

interface GroupedCategory {
  key: string;
  label: string;
  emoji: string;
  items: ShopMarker[];
  subGroups?: CuisineSubGroup[];
  ungrouped?: ShopMarker[];
}

// ─── Grouping ─────────────────────────────────────────────────────────────────
function groupShops(shops: ShopMarker[]): GroupedCategory[] {
  const knownOrder = Object.keys(CATEGORY_CONFIG);
  const restaurants = shops.filter((s) => s.type === "restaurant");
  const others = shops.filter(
    (s) => s.type !== "restaurant" && CATEGORY_CONFIG[s.type],
  );
  const result: GroupedCategory[] = [];

  if (restaurants.length > 0) {
    const cuisineMap = new Map<string, ShopMarker[]>();
    const ungrouped: ShopMarker[] = [];

    for (const shop of restaurants) {
      const raw = shop.cuisine ?? shop.tags?.cuisine ?? "";
      const cuisine = raw.split(";")[0].trim().toLowerCase();
      const config = cuisine ? getCuisineConfig(cuisine) : undefined;
      if (config) {
        if (!cuisineMap.has(cuisine)) cuisineMap.set(cuisine, []);
        cuisineMap.get(cuisine)!.push(shop);
      } else {
        ungrouped.push(shop);
      }
    }

    const knownCuisines = Object.keys(CUISINE_CONFIG);
    const subGroups: CuisineSubGroup[] = [...cuisineMap.entries()]
      .sort(([a], [b]) => {
        const ai = knownCuisines.indexOf(a);
        const bi = knownCuisines.indexOf(b);
        if (ai !== -1 && bi !== -1) return ai - bi;
        if (ai !== -1) return -1;
        if (bi !== -1) return 1;
        return a.localeCompare(b);
      })
      .map(([cuisine, items]) => {
        const config = getCuisineConfig(cuisine)!;
        const sorted = [...items].sort((a, b) => {
          const aJp = /[\u3040-\u30FF\u4E00-\u9FFF]/.test(a.name) ? 1 : 0;
          const bJp = /[\u3040-\u30FF\u4E00-\u9FFF]/.test(b.name) ? 1 : 0;
          return bJp - aJp || a.name.localeCompare(b.name, "ja");
        });
        return {
          cuisine,
          label: config.label,
          emoji: config.emoji,
          items: sorted,
        };
      });

    const sortedUngrouped = [...ungrouped].sort((a, b) => {
      const aJp = /[\u3040-\u30FF\u4E00-\u9FFF]/.test(a.name) ? 1 : 0;
      const bJp = /[\u3040-\u30FF\u4E00-\u9FFF]/.test(b.name) ? 1 : 0;
      return bJp - aJp || a.name.localeCompare(b.name, "ja");
    });

    result.push({
      key: "restaurant",
      label: "Restaurants",
      emoji: "🍜",
      items: restaurants,
      subGroups: subGroups.length > 0 ? subGroups : undefined,
      ungrouped: sortedUngrouped.length > 0 ? sortedUngrouped : undefined,
    });
  }

  const otherMap = new Map<string, ShopMarker[]>();
  for (const shop of others) {
    if (!otherMap.has(shop.type)) otherMap.set(shop.type, []);
    otherMap.get(shop.type)!.push(shop);
  }
  [...otherMap.entries()]
    .sort(([a], [b]) => knownOrder.indexOf(a) - knownOrder.indexOf(b))
    .forEach(([type, items]) => {
      const config = CATEGORY_CONFIG[type];
      result.push({
        key: type,
        label: config.label,
        emoji: config.emoji,
        items,
      });
    });

  return result;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
      style={{
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 200ms ease",
        flexShrink: 0,
      }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function RestaurantRow({ shop }: { shop: ShopMarker }) {
  return (
    <li>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${shop.lat},${shop.lon}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2 bg-[var(--color-surface)] hover:bg-[var(--color-surface-offset)] transition-colors group"
      >
        <p className="text-xs font-medium text-[var(--color-text)] truncate flex-1">
          {shop.name}
        </p>
        {shop.cuisine && (
          <span className="text-xs text-[var(--color-text-faint)] shrink-0 truncate max-w-[60px]">
            {shop.cuisine.split(";")[0]}
          </span>
        )}
        <span className="text-[var(--color-text-faint)] group-hover:text-[var(--color-primary)] transition-colors shrink-0">
          <ExternalLinkIcon />
        </span>
      </a>
    </li>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ZoneShopsSection({
  shops,
}: {
  shops: ShopMarker[] | null;
  zoneId: string;
}) {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const [openSubCategories, setOpenSubCategories] = useState<Set<string>>(
    new Set(),
  );

  const toggleCategory = (key: string) => {
    setOpenCategories((prev) => {
      const n = new Set(prev);
      if (n.has(key)) n.delete(key);
      else n.add(key);
      return n;
    });
  };

  const toggleSubCategory = (key: string) => {
    setOpenSubCategories((prev) => {
      const n = new Set(prev);
      if (n.has(key)) n.delete(key);
      else n.add(key);
      return n;
    });
  };

  if (shops === null) {
    return (
      <div className="flex items-center gap-2 py-3 text-xs text-[var(--color-text-muted)]">
        <svg
          className="animate-spin w-3.5 h-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
        Loading places…
      </div>
    );
  }

  const curated = curateShops(shops);

  if (curated.length === 0) {
    return (
      <p className="text-xs text-[var(--color-text-muted)] py-3 text-center">
        No places found in this area
      </p>
    );
  }

  const grouped = groupShops(curated);

  return (
    <div className="flex flex-col gap-1">
      {grouped.map(({ key, label, emoji, items, subGroups, ungrouped }) => {
        const isOpen = openCategories.has(key);
        return (
          <div
            key={key}
            className="rounded-lg overflow-hidden border border-[var(--color-border)]"
          >
            {/* ── Level 1: Category toggle ── */}
            <button
              onClick={() => toggleCategory(key)}
              className="w-full flex items-center gap-2 px-3 py-2 bg-[var(--color-surface-offset)] hover:bg-[var(--color-surface-dynamic)] transition-colors text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm shrink-0" aria-hidden="true">
                {emoji}
              </span>
              <span className="text-xs font-semibold text-[var(--color-text)] flex-1">
                {label}
              </span>
              <span className="text-xs text-[var(--color-text-muted)] tabular-nums mr-1">
                {items.length}
              </span>
              <span style={{ color: "var(--color-text-muted)" }}>
                <ChevronIcon isOpen={isOpen} />
              </span>
            </button>

            {isOpen && (
              <div>
                {subGroups || ungrouped ? (
                  <>
                    {/* ── Level 2: Cuisine subcategory toggles ── */}
                    {subGroups?.map((sub) => {
                      const isSubOpen = openSubCategories.has(sub.cuisine);
                      return (
                        <div
                          key={sub.cuisine}
                          className="border-t border-[var(--color-divider)]"
                        >
                          <button
                            onClick={() => toggleSubCategory(sub.cuisine)}
                            className="w-full flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-offset)] transition-colors text-left"
                            aria-expanded={isSubOpen}
                          >
                            <span
                              className="text-xs shrink-0"
                              aria-hidden="true"
                            >
                              {sub.emoji}
                            </span>
                            <span className="text-xs font-medium text-[var(--color-text-muted)] flex-1">
                              {sub.label}
                            </span>
                            <span className="text-xs text-[var(--color-text-faint)] tabular-nums mr-1">
                              {sub.items.length}
                            </span>
                            <span style={{ color: "var(--color-text-faint)" }}>
                              <ChevronIcon isOpen={isSubOpen} />
                            </span>
                          </button>
                          {isSubOpen && (
                            <ul
                              role="list"
                              className="divide-y divide-[var(--color-divider)]"
                            >
                              {sub.items.map((shop) => (
                                <RestaurantRow key={shop.id} shop={shop} />
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}

                    {/* ── Other (ungrouped) dropdown ── */}
                    {ungrouped && ungrouped.length > 0 && (
                      <div className="border-t border-[var(--color-divider)]">
                        {subGroups && subGroups.length > 0 ? (
                          <>
                            <button
                              onClick={() => toggleSubCategory("__other__")}
                              className="w-full flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-offset)] transition-colors text-left"
                              aria-expanded={openSubCategories.has("__other__")}
                            >
                              <span
                                className="text-xs shrink-0"
                                aria-hidden="true"
                              >
                                🍽️
                              </span>
                              <span className="text-xs font-medium text-[var(--color-text-muted)] flex-1">
                                Other
                              </span>
                              <span className="text-xs text-[var(--color-text-faint)] tabular-nums mr-1">
                                {ungrouped.length}
                              </span>
                              <span
                                style={{ color: "var(--color-text-faint)" }}
                              >
                                <ChevronIcon
                                  isOpen={openSubCategories.has("__other__")}
                                />
                              </span>
                            </button>
                            {openSubCategories.has("__other__") && (
                              <ul
                                role="list"
                                className="divide-y divide-[var(--color-divider)]"
                              >
                                {ungrouped.map((shop) => (
                                  <RestaurantRow key={shop.id} shop={shop} />
                                ))}
                              </ul>
                            )}
                          </>
                        ) : (
                          <ul
                            role="list"
                            className="divide-y divide-[var(--color-divider)]"
                          >
                            {ungrouped.map((shop) => (
                              <RestaurantRow key={shop.id} shop={shop} />
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  // ── Non-restaurant flat list ──
                  <ul
                    role="list"
                    className="divide-y divide-[var(--color-divider)]"
                  >
                    {items.map((shop) => (
                      <li key={shop.id}>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${shop.lat},${shop.lon}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 px-3 py-2 bg-[var(--color-surface)] hover:bg-[var(--color-surface-offset)] transition-colors group"
                        >
                          <p className="text-xs font-medium text-[var(--color-text)] truncate">
                            {shop.name}
                          </p>
                          <span className="text-[var(--color-text-faint)] group-hover:text-[var(--color-primary)] transition-colors">
                            <ExternalLinkIcon />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
