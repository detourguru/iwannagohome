import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import useErrorReport from "@/hooks/useErrorReport";

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const pathList = pathname.split("/");
  const storyId = pathList[pathList.length - 1];

  const { data, error } = await supabase
    .from("base_story")
    .select("*")
    .eq("story_id", storyId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "ok", status: 200, data });
}

export async function POST(request: NextRequest) {
  const { error } = await supabase.from("chat").insert(request.body);

  if (error) {
    useErrorReport(request, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "ok", status: 200 });
}
