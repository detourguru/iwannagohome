type ErrorReportParams = {
  method: string;
  url: string;
  requestBody: unknown;
  message: string;
  status: number;
};

export default async function errorReport({
  method,
  url,
  requestBody,
  message,
  status,
}: ErrorReportParams) {
  await fetch(process.env.NEXT_PUBLIC_HOST_NAME + "/api/http", {
    method: "POST",
    body: JSON.stringify({
      method,
      url,
      request_body: requestBody,
      response_body: { error: message },
      status_code: status,
    }),
  });
}
