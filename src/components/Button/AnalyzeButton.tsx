"use client";

import useGeminiChat from "@/hooks/useGeminiChat";
import Loading from "../Loading/Loading";
import fetchData from "@/utils/fetchData";

export interface AnalyzeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
  body: {
    method: string;
    body: string;
  };
  text: string;
}

const AnalyzeButton = ({
  children,
  href,
  body,
  text,
  disabled,
}: AnalyzeButtonProps) => {
  const { askGemini, geminiIsLoading } = useGeminiChat();

  const handleInsertAnalyze = async () => {
    const gemini = JSON.parse(
      (await askGemini(text)).replaceAll("```", "").replaceAll("json", "")
    );
    try {
      const keysToCheck = ["summary", "result", "advise"];
      const allKeysExist = keysToCheck.every((key) => key in gemini);

      if (!allKeysExist) {
        // TODO: 재시도 할 수 있는 방법 고민
        throw Error("gemini 응답 생성 이슈");
      }

      const analyze = {
        chat_id: JSON.parse(body.body).chat_id,
        summary: gemini.summary,
        result: {
          title: gemini.result.status,
          emoji: gemini.result.emoji,
          context: gemini.result.context,
        },
        advise: gemini.advise,
      };

      await fetchData({
        path: "/api/analyze",
        body: {
          method: "POST",
          body: JSON.stringify(analyze),
        },
      });

      return (location.href = href);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;

      // error report
      await fetchData({
        path: "/api/http",
        body: {
          method: "POST",
          body: JSON.stringify({
            method: "POST",
            url: "AnalyzeButton",
            request_body: {
              body: JSON.stringify(gemini),
            },
            response_body: {
              error: message,
            },
            status_code: 500,
          }),
        },
      });

      alert("죄송합니다. 에러가 발생했습니다.\n다시 시도해주세요.");
      return (location.href = process.env.NEXT_PUBLIC_HOST_NAME!);
    }
  };

  const handleButtonClick = async () => {
    await fetchData({
      path: `/api${href}`,
      body: body,
    });

    await handleInsertAnalyze();
  };

  return (
    <>
      <Loading text="대화 분석 중..." isLoading={geminiIsLoading} />
      <button
        disabled={disabled}
        onClick={() => handleButtonClick()}
        className={`h-fit mb-2 p-2 text-regular-12 text-white bg-secondary animate-pulse w-full flex items-center justify-center rounded-xl`}
      >
        {children}
      </button>
    </>
  );
};

export default AnalyzeButton;
