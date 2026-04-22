"use client";

import type { ShopMarker } from "@/components/map/ZoneInfoCard";
import {
  CONGESTION_COLORS,
  CONGESTION_LABELS,
} from "@/constants/congestionColors";
import { KYOTO_ZONES } from "@/constants/kyotoZones";
import type { CongestionZone } from "@/types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";

const KYOTO_CENTER: [number, number] = [35.0116, 135.7681];
const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY ?? "";

interface KyotoMapInnerProps {
  congestionData: Map<string, CongestionZone>;
  selectedZoneId: string | null;
  shopsByZone: Map<string, ShopMarker[] | null>;
  onZoneClick: (id: string) => void;
  onDismiss: () => void;
  activeTagZoneIds: Set<string> | null;
  userPosition: [number, number] | null;
}

// ── Pulsing dot icon ──────────────────────────────────────────────────────────
const pulsingDotIcon = L.divIcon({
  className: "",
  html: `
    <div style="position:relative;width:20px;height:20px;">
      <div style="
        position:absolute;inset:0;border-radius:50%;
        background:rgba(59,130,246,0.25);
        animation:kyoto-pulse-ring 1.8s ease-out infinite;
      "></div>
      <div style="
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        width:12px;height:12px;border-radius:50%;
        background:#3b82f6;
        border:2px solid #fff;
        box-shadow:0 0 0 2px rgba(59,130,246,0.4);
      "></div>
    </div>
    <style>
      @keyframes kyoto-pulse-ring {
        0%   { transform:scale(0.5); opacity:0.8; }
        100% { transform:scale(2.4); opacity:0; }
      }
    </style>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// ── Auto-fit controller ───────────────────────────────────────────────────────
function MapController({
  activeTagZoneIds,
}: {
  activeTagZoneIds: Set<string> | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!activeTagZoneIds || activeTagZoneIds.size === 0) return;
    const matching = KYOTO_ZONES.filter((z) => activeTagZoneIds.has(z.id));
    if (matching.length === 0) return;
    const bounds = L.latLngBounds(
      matching.map((z) => [z.center.lat, z.center.lng]),
    );
    map.fitBounds(bounds, { padding: [80, 80], maxZoom: 14 });
  }, [activeTagZoneIds, map]);

  return null;
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function KyotoMapInner({
  congestionData,
  selectedZoneId,
  onZoneClick,
  activeTagZoneIds,
  userPosition,
}: KyotoMapInnerProps) {
  const circleRefs = useRef<Map<string, L.Circle>>(new Map());
  const isFiltering = activeTagZoneIds !== null;

  // Resolve selected zone center for the dotted line
  const selectedZoneGeo = selectedZoneId
    ? (KYOTO_ZONES.find((z) => z.id === selectedZoneId) ?? null)
    : null;

  return (
    <MapContainer
      center={KYOTO_CENTER}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
      zoomControl={true}
      preferCanvas={false} // must be false — Marker/Polyline require SVG renderer
    >
      <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
        url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
        tileSize={512}
        zoomOffset={-1}
      />

      <MapController activeTagZoneIds={activeTagZoneIds} />

      {/* ── Congestion circles ── */}
      {KYOTO_ZONES.map((zone) => {
        const data = congestionData.get(zone.id);
        if (!data) return null;
        const colors = CONGESTION_COLORS[data.level];

        const isMatch = activeTagZoneIds?.has(zone.id) ?? false;
        const isSelected = zone.id === selectedZoneId;
        const isDimmed = isFiltering && !isMatch;

        return (
          <Circle
            key={zone.id}
            center={[zone.center.lat, zone.center.lng]}
            radius={zone.radius}
            pathOptions={{
              fillColor: isDimmed ? "#aaa" : colors.fill,
              fillOpacity: isDimmed
                ? 0.04
                : isMatch
                  ? 0.38
                  : isSelected
                    ? colors.fillOpacity + 0.15
                    : colors.fillOpacity,
              color: isDimmed ? "#bbb" : colors.stroke,
              opacity: isDimmed ? 0.1 : isMatch ? 0.9 : isSelected ? 1 : 0.7,
              weight: isSelected ? 3 : isMatch ? 2.5 : 1.5,
            }}
            ref={(ref) => {
              if (ref) circleRefs.current.set(zone.id, ref);
              else circleRefs.current.delete(zone.id);
            }}
            eventHandlers={{ click: () => onZoneClick(zone.id) }}
          >
            <Tooltip direction="top" offset={[0, -10]} permanent={false}>
              <div style={{ minWidth: 120 }}>
                <span className="font-medium">{zone.name}</span>
                <br />
                {CONGESTION_LABELS[data.level]}
              </div>
            </Tooltip>
          </Circle>
        );
      })}

      {/* ── Dotted line: user → selected zone ── */}
      {userPosition && selectedZoneGeo && (
        <Polyline
          positions={[
            userPosition,
            [selectedZoneGeo.center.lat, selectedZoneGeo.center.lng],
          ]}
          pathOptions={{
            color: "#3b82f6",
            weight: 2,
            opacity: 0.65,
            dashArray: "6 9",
            lineCap: "round",
          }}
        />
      )}

      {/* ── User position pulsing dot (rendered last = on top) ── */}
      {userPosition && (
        <Marker
          position={userPosition}
          icon={pulsingDotIcon}
          zIndexOffset={1000}
        >
          <Tooltip direction="top" offset={[0, -14]} permanent={false}>
            <span className="text-xs font-medium">You are here</span>
          </Tooltip>
        </Marker>
      )}
    </MapContainer>
  );
}
