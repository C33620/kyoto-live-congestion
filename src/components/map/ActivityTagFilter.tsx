"use client";

import { ACTIVITY_TAGS } from "@/constants/activityTags";
import { CONGESTION_COLORS } from "@/constants/congestionColors";
import { getMatchingZones } from "@/lib/zoneScoring";
import type { CongestionZone } from "@/types";
import { useEffect, useState } from "react";

interface ActivityTagFilterProps {
  congestionData: Map<string, CongestionZone>;
  onZoneSelect: (zoneId: string) => void;
  onTagsChange: (matchingIds: Set<string> | null, tagIds?: string[]) => void;
}

export function ActivityTagFilter({
  congestionData,
  onZoneSelect,
  onTagsChange,
}: ActivityTagFilterProps) {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [pinnedZoneId, setPinnedZoneId] = useState<string | null>(null);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tagId)) {
        next.delete(tagId);
      } else {
        next.add(tagId);
      }
      return next;
    });
  };

  const clearAll = () => {
    setSelectedTags(new Set());
    setPinnedZoneId(null);
    onTagsChange(null, []);
  };

  // Fires after every selectedTags change — resets pin and updates map
  useEffect(() => {
    setPinnedZoneId(null);
    if (selectedTags.size === 0) {
      onTagsChange(null);
      return;
    }
    const matches = getMatchingZones([...selectedTags], congestionData);
    onTagsChange(new Set(matches.map((m) => m.zoneId)), [...selectedTags]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags]);

  const matches =
    selectedTags.size > 0
      ? getMatchingZones([...selectedTags], congestionData)
      : [];

  return (
    <div
      className="w-72 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl"
      style={{ boxShadow: "var(--shadow-lg)" }}
    >
      {/* ── Header ── */}
      <div className="p-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-[var(--color-text)] uppercase tracking-wide">
            What are you looking for?
          </p>
          {selectedTags.size > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* ── Tag grid ── */}
        <div className="flex flex-wrap gap-1.5">
          {ACTIVITY_TAGS.map((tag) => {
            const isActive = selectedTags.has(tag.id);
            return (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all border"
                style={{
                  background: isActive
                    ? "var(--color-primary)"
                    : "var(--color-surface-offset)",
                  color: isActive ? "white" : "var(--color-text-muted)",
                  borderColor: isActive
                    ? "var(--color-primary)"
                    : "var(--color-border)",
                }}
              >
                <span aria-hidden="true">{tag.emoji}</span>
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Results ── */}
      {selectedTags.size > 0 && (
        <>
          <div className="h-px bg-[var(--color-divider)] mx-3" />
          <div className="px-3 py-2">
            <p className="text-xs text-[var(--color-text-muted)]">
              {matches.length === 0
                ? "No areas match — try fewer tags"
                : pinnedZoneId
                  ? "Showing 1 area — click a tag to reset"
                  : `${matches.length} area${matches.length !== 1 ? "s" : ""} highlighted on map`}
            </p>

            {/* Quietest match callout */}
            {matches[0] && (
              <button
                onClick={() => {
                  const zoneId = matches[0].zoneId;
                  const currentTagIds = [...selectedTags];
                  setPinnedZoneId(zoneId);
                  // ↓ Pass tag IDs so ZoneInfoCard keeps "Why visit here"
                  onTagsChange(new Set([zoneId]), currentTagIds);
                  onZoneSelect(zoneId);
                }}
                className="mt-1.5 w-full flex items-center gap-2 px-2 py-1.5 rounded-lg
                  bg-[var(--color-surface-offset)] hover:bg-[var(--color-primary-highlight)]
                  transition-colors text-left"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      CONGESTION_COLORS[
                        matches[0].level as keyof typeof CONGESTION_COLORS
                      ]?.fill,
                  }}
                />
                <span className="text-xs font-medium text-[var(--color-text)] flex-1 truncate">
                  {matches[0].name}
                  {matches[0].isHiddenGem && <span className="ml-1">💎</span>}
                </span>
                <span className="text-xs text-[var(--color-text-faint)]">
                  {pinnedZoneId === matches[0].zoneId
                    ? "Showing only ↓"
                    : "Quietest match →"}
                </span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
