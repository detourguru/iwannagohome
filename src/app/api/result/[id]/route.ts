import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const pathList = pathname.split("/");
  const chatId = pathList[pathList.length - 1];
  const { data, error } = await supabase
    .from("chat")
    .select("*, base_story (*), chat_analyze (*)")
    .eq("chat_id", chatId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "ok", status: 200, data });
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  const { error } = await supabase.from("chat").insert(req);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "ok", status: 200 });
}