import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import useErrorReport from "@/hooks/useErrorReport";

export async function GET() {
  const { data, error } = await supabase.from("chat").select("*");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "ok", status: 200, data });
}
