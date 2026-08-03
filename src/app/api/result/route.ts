import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import { errorResponse } from "@/utils/errorResponse";

export async function GET() {
  const { count, error } = await supabase
    .from("chat")
    .select("*", { count: "exact", head: true });
  if (error) {
    return errorResponse(error.message, 500);
  }

  return NextResponse.json({ message: "ok", status: 200, data: count });
}
