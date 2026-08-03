import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import errorReport from "@/utils/errorReport";
import { errorResponse } from "@/utils/errorResponse";

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const pathList = pathname.split("/");
  const chatId = pathList[pathList.length - 1];
  const { data, error } = await supabase
    .from("chat")
    .select("*, base_story (*), chat_analyze (*)")
    .eq("chat_id", chatId);

  if (error) {
    return errorResponse(error.message, 500);
  }

  return NextResponse.json({ message: "ok", status: 200, data });
}

export async function POST(request: Request) {
  const req = await request.json();
  const { error, status } = await supabase.from("chat").insert(req);

  if (error) {
    await errorReport({
      method: request.method,
      url: request.url,
      requestBody: req,
      message: error.message,
      status,
    });
    return errorResponse(error.message, status);
  }

  return NextResponse.json({ message: "ok", status: 200 });
}
