import { HttpError } from "@/type/common";
import { NextResponse } from "next/server";

export function errorResponse(message: string, status: number) {
  const body: HttpError = { error: message, status };
  return NextResponse.json(body, { status });
}
