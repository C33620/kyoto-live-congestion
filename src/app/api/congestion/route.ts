import {
  KYOTO_ZONES,
  type ZoneGeometryWithCategory,
} from "@/constants/kyotoZones";
import { NextResponse } from "next/server";

// ─── Optional BestTime upgrade path ──────────────────────────────────────────
const BESTTIME_API_KEY = process.env.BESTTIME_API_KEY ?? "";

// ─── JST helper ───────────────────────────────────────────────────────────────
function getJSTDate(): Date {
  return new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
}

// ─── National holiday checker ─────────────────────────────────────────────────
// Returns a crowd boost for Japanese national holidays.
// All public holidays increase Kyoto crowds noticeably. [web:508]
function getNationalHolidayBoost(jst: Date): number {
  const m = jst.getMonth(); // 0-based
  const d = jst.getDate();
  const dow = jst.getDay(); // 0=Sun

  // Helper: nth Monday of a month
  function nthMonday(n: number): number {
    let count = 0;
    for (let day = 1; day <= 31; day++) {
      const test = new Date(jst.getFullYear(), m, day);
      if (test.getMonth() !== m) break;
      if (test.getDay() === 1) {
        count++;
        if (count === n) return day;
      }
    }
    return -1;
  }

  // January
  if (m === 0 && d === 1) return 2; // New Year's Day
  if (m === 0 && d <= 3) return 2; // Shogatsu (Jan 2–3 still very busy)
  if (m === 0 && d === nthMonday(2)) return 1; // Coming of Age Day

  // February
  if (m === 1 && d === 11) return 1; // National Foundation Day
  if (m === 1 && d === 23) return 1; // Emperor's Birthday
  if (m === 1 && d === 24 && dow === 1) return 1; // Observed if on weekend

  // March
  if (m === 2 && d === 20) return 1; // Vernal Equinox Day
  if (m === 2 && d === 21 && dow === 1) return 1; // Observed

  // April/May — Golden Week handled in seasonal boost, skip here to avoid double-count
  // (April 29, May 3–5 are inside the Golden Week boost window)

  // July
  const thirdMondayJuly = nthMonday(3);
  if (m === 6 && d === thirdMondayJuly) return 1; // Marine Day

  // August
  if (m === 7 && d === 11) return 1; // Mountain Day
  if (m === 7 && d === 12 && dow === 1) return 1; // Observed
  // Obon: not a national holiday but hugely impacts Kyoto crowds
  if (m === 7 && d >= 13 && d <= 16) return 1; // Obon week

  // September — Silver Week 2026 (Sep 19–23, rare 5-day holiday) [web:497]
  const thirdMondaySep = nthMonday(3);
  if (m === 8 && d === thirdMondaySep) return 1; // Respect for Aged Day
  if (m === 8 && d === 22) return 1; // 2026 Citizens' Holiday (Silver Week bridge)
  if (m === 8 && d === 23) return 1; // Autumnal Equinox Day
  // Silver Week window boost (5-day holiday = Golden Week equivalent)
  if (m === 8 && d >= 19 && d <= 23) return 1;

  // October
  const secondMondayOct = nthMonday(2);
  if (m === 9 && d === secondMondayOct) return 1; // Sports Day

  // November
  if (m === 10 && d === 3) return 1; // Culture Day — autumn leaf peak [web:502]
  if (m === 10 && d === 23) return 1; // Labor Thanksgiving Day

  // December
  if (m === 11 && d === 23) return 1; // Emperor's Birthday (observed)
  if (m === 11 && d === 31) return 2; // New Year's Eve rush

  return 0;
}

// ─── Seasonal boost ───────────────────────────────────────────────────────────
function getSeasonalBoost(jst: Date): { boost: number; isGoldenWeek: boolean } {
  const m = jst.getMonth();
  const d = jst.getDate();

  // Golden Week: April 29 – May 5
  if ((m === 3 && d >= 29) || (m === 4 && d <= 5))
    return { boost: 2, isGoldenWeek: true };

  // Cherry blossom peak: March 25 – April 10
  if ((m === 2 && d >= 25) || (m === 3 && d <= 10))
    return { boost: 2, isGoldenWeek: false };

  // Cherry blossom shoulder: April 11–28
  if (m === 3 && d >= 11) return { boost: 1, isGoldenWeek: false };

  // Autumn peak: Nov 10 – Dec 5
  if ((m === 10 && d >= 10) || (m === 11 && d <= 5))
    return { boost: 2, isGoldenWeek: false };

  // Autumn shoulder: Nov 1–9
  if (m === 10 && d < 10) return { boost: 1, isGoldenWeek: false };

  // Gion Matsuri: July 10–24
  if (m === 6 && d >= 10 && d <= 24) return { boost: 1, isGoldenWeek: false };

  // New Year: Dec 31 – Jan 3
  if ((m === 11 && d === 31) || (m === 0 && d <= 3))
    return { boost: 2, isGoldenWeek: false };

  // Obon: August 13–16
  if (m === 7 && d >= 13 && d <= 16) return { boost: 1, isGoldenWeek: false };

  // Summer August
  if (m === 7) return { boost: 1, isGoldenWeek: false };

  // Low season: February, June, September (outside Silver Week)
  if ([1, 5].includes(m)) return { boost: -1, isGoldenWeek: false };

  return { boost: 0, isGoldenWeek: false };
}

// ─── Time-of-day base score ───────────────────────────────────────────────────
function timeScore(h: number): number {
  if (h < 6) return 1;
  if (h < 8) return 2;
  if (h < 9) return 3;
  if (h < 11) return 4;
  if (h < 16) return 5;
  if (h < 18) return 4;
  if (h < 20) return 3;
  if (h < 22) return 2;
  return 1;
}

// ─── Zone configurations ──────────────────────────────────────────────────────
const CATEGORY_BASE: Record<string, number> = {
  "temple-shrine": 1,
  "nature-garden": 0,
  "market-shopping": 0,
  "district-culture": 0,
  "transport-hub": 1,
};

const HOT_ZONES = new Set([
  "gion-kiyomizudera",
  "fushimi-inari",
  "arashiyama-sagano",
  "kinkakuji",
  "higashiyama",
  "nishiki-market",
  "kyoto-station",
]);

const MARKET_ZONES = new Set([
  "nishiki-market",
  "teramachi-sanjo",
  "toji-market",
]);

const EVENING_ZONES = new Set(["pontocho", "gion-kiyomizudera"]);

const TRANSPORT_ZONES = new Set(["kyoto-station"]);

// ─── Core estimation ──────────────────────────────────────────────────────────
function estimateCongestion(zone: ZoneGeometryWithCategory): 1 | 2 | 3 | 4 | 5 {
  const jst = getJSTDate();
  const jstHour = jst.getHours();
  const dayOfWeek = jst.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const { boost, isGoldenWeek } = getSeasonalBoost(jst);
  const holidayBoost = getNationalHolidayBoost(jst);

  let score = timeScore(jstHour);

  score += CATEGORY_BASE[zone.category] ?? 0;

  if (HOT_ZONES.has(zone.id) && !zone.isHiddenGem) score += 1;

  // Weekend or holiday boost (not for hidden gems)
  const isDayOff = isWeekend || holidayBoost > 0;
  if (isDayOff) score += zone.isHiddenGem ? 0 : 1;

  // Market zones: narrow peak 10am–3pm
  if (MARKET_ZONES.has(zone.id)) {
    // Toji market: only busy on the 21st of each month
    if (zone.id === "toji-market") {
      if (jst.getDate() !== 21 || jstHour < 9 || jstHour > 16) score -= 3;
    } else if (jstHour < 10 || jstHour > 15) {
      score -= 2;
    }
  }

  // Evening zones
  if (EVENING_ZONES.has(zone.id)) {
    if (jstHour >= 18 && jstHour < 22) score += 1;
    else if (jstHour >= 9 && jstHour < 18) score -= 1;
  }

  // Transport hubs: never below 3 during waking hours
  if (TRANSPORT_ZONES.has(zone.id) && jstHour >= 6) {
    score = Math.max(score, 3);
  }

  // Hidden gems: hard discount
  if (zone.isHiddenGem) score -= 2;

  // Seasonal boost (hidden gems exempt, except Golden Week)
  if (!zone.isHiddenGem) {
    score += boost;
    score += holidayBoost;
  } else if (isGoldenWeek) {
    score += 1;
  }

  return Math.max(1, Math.min(5, Math.round(score))) as 1 | 2 | 3 | 4 | 5;
}

// ─── Response builder ─────────────────────────────────────────────────────────
function buildZoneResult(zone: ZoneGeometryWithCategory) {
  return {
    id: zone.id,
    name: zone.name,
    category: zone.category,
    description: zone.description,
    isHiddenGem: zone.isHiddenGem,
    alternativeTo: zone.alternativeTo,
    level: estimateCongestion(zone),
    updatedAt: new Date().toISOString(),
  };
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function GET() {
  if (BESTTIME_API_KEY) {
    console.warn(
      "[congestion] BESTTIME_API_KEY set but estimation mode active.",
    );
  }

  const results = KYOTO_ZONES.map((zone) => buildZoneResult(zone));

  console.log(
    "[estimation]",
    results.map((r) => `${r.id}=L${r.level}`).join(", "),
  );

  return NextResponse.json(results, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=120",
    },
  });
}
