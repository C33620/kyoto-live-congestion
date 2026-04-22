import { KYOTO_ZONES } from "@/constants/kyotoZones";
import { ZONE_ACTIVITY_PROFILE } from "@/constants/zoneActivityProfile";
import type { CongestionZone } from "@/types";

export interface ZoneMatch {
  zoneId: string;
  name: string;
  score: number; // how many selected tags match
  level: number; // congestion level 1–5
  isHiddenGem: boolean;
}

export function getMatchingZones(
  selectedTags: string[],
  congestionData: Map<string, CongestionZone>,
): ZoneMatch[] {
  if (selectedTags.length === 0) return [];

  return (
    KYOTO_ZONES.map((zone) => {
      const profile = ZONE_ACTIVITY_PROFILE[zone.id] ?? [];
      const score = selectedTags.filter((tag) => profile.includes(tag)).length;
      return {
        zoneId: zone.id,
        name: zone.name,
        score,
        level: congestionData.get(zone.id)?.level ?? 3,
        isHiddenGem: zone.isHiddenGem,
      };
    })
      .filter(({ score }) => score > 0)
      // Sort: most matching tags first, then quietest
      .sort((a, b) => b.score - a.score || a.level - b.level)
  );
}
