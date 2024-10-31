"use client";

import useGeminiChat from "@/hooks/useGeminiChat";
import Loading from "../Loading/Loading";

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

    const response = await fetch(`/api/analyze`, {
      method: "POST",
      body: JSON.stringify(analyze),
    });

    if (!response.ok) {
      throw new Error("문제가 발생했습니다.");
    }
    return (location.href = href);
  };

  // TODO: 공통 모듈로 합체
  const handleButtonClick = async () => {
    const response = await fetch(`/api${href}`, body);

    if (!response.ok) {
      throw new Error("문제가 발생했습니다.");
    }

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
