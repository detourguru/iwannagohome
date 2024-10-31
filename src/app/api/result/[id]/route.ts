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

export async function POST(request: Request) {
  const req = await request.json();
  const { error, status } = await supabase.from("chat").insert(req);

  if (error) {
    // error report
    await fetch(process.env.NEXT_PUBLIC_HOST_NAME + "/api/http", {
      method: "POST",
      body: JSON.stringify({
        method: request.method,
        url: request.url,
        request_body: req,
        response_body: {
          error: error.message,
        },
        status_code: status,
      }),
    });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "ok", status: 200 });
}
