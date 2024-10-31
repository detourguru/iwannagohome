import errorReport from "@/utils/errorReport";
import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();

  const { error, data } = await supabase.rpc("log_http_request", {
    p_method: req.method,
    p_url: req.url,
    p_request_body: req.request_body,
    p_response_body: req.response_body,
    p_status_code: req.status_code,
  });

  if (error) {
    errorReport(request, error);
    return NextResponse.json({ message: error.message, status: 500, data });
  }

  return NextResponse.json({ message: "successfully inserted", status: 200 });
}
