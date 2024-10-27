import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET() {
  const { data, error } = await supabase.from("base_story").select("*");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "ok", status: 200, data });
}
