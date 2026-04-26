import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 600;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}

if (!serviceRoleKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const zoneId = searchParams.get("zoneId");

  if (!zoneId) {
    return NextResponse.json({ error: "Missing zoneId" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("zone_shops")
    .select("data")
    .eq("zone_id", zoneId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Zone not found" }, { status: 404 });
  }

  return NextResponse.json(data.data, {
    headers: {
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
    },
  });
}
