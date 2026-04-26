import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { Agent, fetch, setGlobalDispatcher } from "undici";
import { KYOTO_ZONES } from "../src/constants/kyotoZones";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

setGlobalDispatcher(
  new Agent({
    connect: {
      timeout: 30000,
    },
  }),
);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL in .env.local");
}

if (!serviceRoleKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in .env.local");
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const OVERPASS_INSTANCES = [
  "https://overpass-api.de/api/interpreter",
  "https://lz4.overpass-api.de/api/interpreter",
  "https://z.overpass-api.de/api/interpreter",
  "https://overpass.openstreetmap.ru/api/interpreter",
];

async function fetchFromOverpass(
  query: string,
): Promise<Record<string, unknown>> {
  let lastError = "";

  for (const instance of OVERPASS_INSTANCES) {
    try {
      console.log(`  → trying ${instance}`);

      const res = await fetch(instance, {
        method: "POST",
        body: `data=${encodeURIComponent(query)}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "kyoto-live-congestion-seeder/1.0",
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(60000),
      });

      if (!res.ok) {
        lastError = `${instance} → ${res.status} ${res.statusText}`;
        console.warn(`  ✗ ${lastError}`);
        continue;
      }

      return (await res.json()) as Record<string, unknown>;
    } catch (err) {
      lastError = `${instance} → ${String(err)}`;
      console.warn(`  ✗ ${lastError}`);
    }
  }

  throw new Error(`All Overpass instances failed. Last: ${lastError}`);
}

async function seed() {
  console.log("env file path:", path.resolve(process.cwd(), ".env.local"));
  console.log("NEXT_PUBLIC_SUPABASE_URL loaded:", !!supabaseUrl);
  console.log("SUPABASE_SERVICE_ROLE_KEY loaded:", !!serviceRoleKey);

  for (const zone of KYOTO_ZONES) {
    console.log(`Seeding: ${zone.id}`);

    const query = `
      [out:json][timeout:25];
      (
        node["shop"](around:${zone.radius},${zone.center.lat},${zone.center.lng});
        node["amenity"~"^(restaurant|cafe|bar|fast_food)$"](around:${zone.radius},${zone.center.lat},${zone.center.lng});
      );
      out body;
    `.trim();

    try {
      const data = await fetchFromOverpass(query);

      const { error } = await supabase.from("zone_shops").upsert({
        zone_id: zone.id,
        data,
        fetched_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }

      console.log(`✓ ${zone.id}`);
    } catch (err) {
      console.error(`✗ ${zone.id}:`, err);
    }

    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log("Done!");
}

seed();
