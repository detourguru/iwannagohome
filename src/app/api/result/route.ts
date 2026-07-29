import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET() {
  const { count, error } = await supabase
    .from("chat")
    .select("*", { count: "exact", head: true });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "ok", status: 200, data: count });
}
