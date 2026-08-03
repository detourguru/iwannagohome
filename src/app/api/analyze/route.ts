import errorReport from "@/utils/errorReport";
import { errorResponse } from "@/utils/errorResponse";
import { supabase } from "@/utils/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const { error, status } = await supabase.from("chat_analyze").insert(req);

  if (error) {
    await errorReport({
      method: request.method,
      url: request.url,
      requestBody: req,
      message: error.message,
      status,
    });
    return errorResponse(error.message, 500);
  }

  return NextResponse.json({ message: "ok", status: 200 });
}
