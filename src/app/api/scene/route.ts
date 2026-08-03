import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import { errorResponse } from "@/utils/errorResponse";

export async function GET() {
  const { data, error } = await supabase.from("base_story").select("*");
  if (error) {
    return errorResponse(error.message, 500);
  }

  return NextResponse.json({ message: "ok", status: 200, data });
}
