"use client";

import { ACTIVITY_TAGS } from "@/constants/activityTags";
import {
  CONGESTION_COLORS,
  CONGESTION_LABELS,
} from "@/constants/congestionColors";
import { KYOTO_ZONES } from "@/constants/kyotoZones";
import { ZONE_TAG_PROFILES } from "@/constants/zoneTagProfiles";
import type { CongestionZone } from "@/types";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ShopMarker {
  id: number;
  lat: number;
  lon: number;
  name: string;
  type: string;
  cuisine?: string;
  rating?: number | null;
  tags?: Record<string, string>;
}

interface ZoneInfoCardProps {
  zone: CongestionZone;
  shops: ShopMarker[] | null;
  onDismiss: () => void;
  selectedTagIds?: string[];
  userPosition?: [number, number] | null;
}

// ─── Lazy-loaded heavy sections ───────────────────────────────────────────────
const ZoneShopsSection = dynamic(
  () => import("@/components/map/ZoneShopsSection"),
  { ssr: false, loading: () => <ShopsSkeleton /> },
);

// ─── Distance helpers ─────────────────────────────────────────────────────────
function haversineKm(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLon = ((b[1] - a[1]) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a[0] * Math.PI) / 180) *
      Math.cos((b[0] * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

function formatDuration(minutes: number): string {
  if (minutes < 1) return "< 1 min";
  if (minutes < 60) return `${Math.round(minutes)} min`;
  return `${Math.floor(minutes / 60)}h ${Math.round(minutes % 60)}min`;
}

// ─── Shared icon sub-components ───────────────────────────────────────────────
function MapPinIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// ─── Shops skeleton (shown while ZoneShopsSection loads) ─────────────────────
function ShopsSkeleton() {
  return (
    <div className="flex flex-col gap-1 pt-1">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-8 rounded-lg bg-[var(--color-surface-offset)] animate-pulse"
        />
      ))}
    </div>
  );
}

// ─── Distance row ─────────────────────────────────────────────────────────────
function DistanceRow({
  userPosition,
  zoneId,
}: {
  userPosition: [number, number];
  zoneId: string;
}) {
  const zoneGeo = KYOTO_ZONES.find((z) => z.id === zoneId);
  if (!zoneGeo) return null;

  const km = haversineKm(userPosition, [
    zoneGeo.center.lat,
    zoneGeo.center.lng,
  ]);
  const walkMin = (km / 5) * 60;
  const transitMin = (km / 20) * 60 * 1.3;
  const distLabel =
    km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;

  return (
    <div className="flex items-center gap-3 mt-2.5 pt-2.5 border-t border-[var(--color-divider)]">
      {/* Walk */}
      <span
        className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]"
        title="Estimated walking time"
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          className="shrink-0"
        >
          <circle cx="12" cy="4" r="1.5" />
          <path d="M9 12l2-4 3 3-1 4" />
          <path d="M7 20l2-4M17 20l-3-5" />
        </svg>
        {formatDuration(walkMin)}
      </span>

      {/* Transit */}
      <span
        className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]"
        title="Estimated transit time"
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          className="shrink-0"
        >
          <rect x="1" y="6" width="22" height="13" rx="2" />
          <path d="M1 13h22" />
          <circle cx="5" cy="19" r="1" />
          <circle cx="19" cy="19" r="1" />
          <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
        ~{formatDuration(transitMin)}
      </span>

      {/* Distance */}
      <span className="ml-auto text-xs text-[var(--color-text-faint)] tabular-nums font-medium">
        {distLabel}
      </span>
    </div>
  );
}

// ─── Activities section ───────────────────────────────────────────────────────
function ActivitiesSection({
  zoneId,
  selectedTagIds,
}: {
  zoneId: string;
  selectedTagIds: string[];
}) {
  const matchingTagProfiles = selectedTagIds
    .map((tagId) => {
      const tag = ACTIVITY_TAGS.find((t) => t.id === tagId);
      const profile = ZONE_TAG_PROFILES?.[zoneId]?.[tagId];
      return tag && profile ? { tag, profile } : null;
    })
    .filter(Boolean) as {
    tag: (typeof ACTIVITY_TAGS)[number];
    profile: {
      tip: string;
      bestTime?: string;
      district?: string;
      website?: string;
      googleMaps?: string;
    };
  }[];

  if (matchingTagProfiles.length === 0) return null;

  return (
    <>
      <div className="h-px bg-[var(--color-divider)] mx-4 shrink-0" />
      <div className="px-4 py-3 shrink-0">
        <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-2">
          Why visit here
        </p>
        <div className="flex flex-col gap-3">
          {matchingTagProfiles.map(({ tag, profile }) => (
            <div key={tag.id} className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-sm shrink-0" aria-hidden="true">
                  {tag.emoji}
                </span>
                <span className="text-xs font-medium text-[var(--color-text)]">
                  {tag.label}
                  {profile.district && (
                    <span className="text-[var(--color-text-muted)] font-normal">
                      {" "}
                      · {profile.district}
                    </span>
                  )}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] pl-5 leading-relaxed">
                {profile.tip}
              </p>
              {profile.bestTime && (
                <p className="text-xs text-[var(--color-primary)] pl-5">
                  ⏰ Best time: {profile.bestTime}
                </p>
              )}
              {(profile.googleMaps || profile.website) && (
                <div className="flex items-center gap-1.5 pl-5 mt-1 flex-wrap">
                  {profile.googleMaps && (
                    <a
                      href={profile.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border border-[var(--color-border)] bg-[var(--color-surface-offset)] hover:bg-[var(--color-surface-dynamic)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                    >
                      <MapPinIcon />
                      Maps
                    </a>
                  )}
                  {profile.website && (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border border-[var(--color-border)] bg-[var(--color-surface-offset)] hover:bg-[var(--color-surface-dynamic)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                    >
                      <GlobeIcon />
                      Website
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function formatUpdatedAt(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ZoneInfoCard({
  zone,
  shops,
  onDismiss,
  selectedTagIds = [],
  userPosition,
}: ZoneInfoCardProps) {
  const colors = CONGESTION_COLORS[zone.level];
  const label = CONGESTION_LABELS[zone.level];

  // Reset scroll position when zone changes
  const [scrollKey, setScrollKey] = useState(0);
  useEffect(() => {
    setScrollKey((k) => k + 1);
  }, [zone.id]);

  return (
    <div
      role="dialog"
      aria-label={`Congestion info for ${zone.name}`}
      className="w-64 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl"
      style={{
        boxShadow: "var(--shadow-lg)",
        maxHeight: "calc(100vh - 6rem)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Header ── */}
      <div className="p-4 pb-3 shrink-0">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h2 className="text-sm font-semibold text-[var(--color-text)] leading-snug">
            {zone.name}
          </h2>
          <button
            onClick={onDismiss}
            aria-label="Close info card"
            className="shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors p-0.5 rounded"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${colors.tailwindBg}`}
            aria-hidden="true"
          />
          <span className={`text-sm font-medium ${colors.tailwindText}`}>
            {label}
          </span>
          <span className="ml-auto text-xs text-[var(--color-text-faint)] tabular-nums font-medium">
            Level {zone.level}/5
          </span>
        </div>

        <div
          className="w-full h-2 rounded-full bg-[var(--color-surface-offset)] overflow-hidden mb-3"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(zone.level / 5) * 100}%`,
              backgroundColor: colors.fill,
            }}
          />
        </div>

        <p className="text-xs text-[var(--color-text-muted)]">
          Last updated{" "}
          <time dateTime={zone.updatedAt} className="tabular-nums">
            {formatUpdatedAt(zone.updatedAt)}
          </time>
        </p>

        {/* ── Distance estimates (only when user position is available) ── */}
        {userPosition && (
          <DistanceRow userPosition={userPosition} zoneId={zone.id} />
        )}
      </div>

      {/* ── Matching activities ── */}
      <ActivitiesSection zoneId={zone.id} selectedTagIds={selectedTagIds} />

      <div className="h-px bg-[var(--color-divider)] mx-4 shrink-0" />

      {/* ── Shops section (code-split) ── */}
      <div
        key={scrollKey}
        className="flex flex-col min-h-0 overflow-y-auto p-4 pt-3"
      >
        <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-2 shrink-0">
          Nearby places
        </p>
        <ZoneShopsSection shops={shops} zoneId={zone.id} />
      </div>
    </div>
  );
}
