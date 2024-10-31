import { PostgrestError } from "@supabase/supabase-js";

export default async function useErrorReport(
  request: Request,
  error: PostgrestError | null
) {
  const req = await request.json();
  const data = await fetch(process.env.NEXT_PUBLIC_HOST_NAME + "/api/http", {
    method: "POST",
    body: JSON.stringify({
      method: request.method,
      url: request.url,
      request_body: req,
      response_body: {
        error: error ? error.message : "알 수 없는 에러 발생",
      },
      status_code: status,
    }),
  });

  return { data };
}
