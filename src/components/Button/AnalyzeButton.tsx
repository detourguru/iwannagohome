"use client";

import { useRef, useState } from "react";
import useGeminiChat from "@/hooks/useGeminiChat";
import Loading from "../Loading/Loading";
import fetchData from "@/utils/fetchData";
import errorReport from "@/utils/errorReport";

export interface AnalyzeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  const [error, setError] = useState<string | null>(null);
  const chatSavedRef = useRef(false);

  const handleButtonClick = async () => {
    let gemini: any;
    setError(null);
    try {
      const chatInsert = chatSavedRef.current
        ? Promise.resolve()
        : fetchData({ path: `/api${href}`, body: body }).then(() => {
            chatSavedRef.current = true;
          });

      const [, geminiResponse] = await Promise.all([
        chatInsert,
        askGemini(text),
      ]);

      gemini = JSON.parse(geminiResponse);

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
      const message =
        error instanceof Error ? error.message : "알 수 없는 에러";

      try {
        await errorReport({
          method: "POST",
          url: "AnalyzeButton",
          requestBody: gemini,
          message,
          status: 500,
        });
      } catch (reportError) {
        console.error(reportError);
      }

      setError("분석 중 문제가 발생했어요. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Loading text="대화 분석 중..." isLoading={geminiIsLoading} />
      {error ? (
        <div className="w-full flex items-center justify-between gap-2 bg-red-50 text-red-500 text-regular-14 rounded-md px-3 py-2">
          <span className="min-w-0 line-clamp-3">⚠️ {error}</span>
          <button
            type="button"
            onClick={() => handleButtonClick()}
            className="shrink-0 text-bold-14 underline"
          >
            재시도
          </button>
        </div>
      ) : (
        <button
          disabled={disabled}
          onClick={() => handleButtonClick()}
          className={`h-fit mb-2 p-2 text-regular-12 text-white bg-secondary animate-pulse w-full flex items-center justify-center rounded-xl`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default AnalyzeButton;
