"use client";

import useGeminiChat from "@/hooks/useGeminiChat";

export interface AnalyzeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
  body: {
    method: string;
    body: string;
  };
  text: string;
}

const AnalyzeButton = ({ children, href, body, text }: AnalyzeButtonProps) => {
  const { askGemini } = useGeminiChat();

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
    }).finally(() => {
      return (location.href = href);
    });
    if (!response.ok) {
      throw new Error("문제가 발생했습니다.");
    }
  };

  // TODO: 공통 모듈로 합체
  const handleButtonClick = async () => {
    try {
      const response = await fetch(`/api${href}`, body);
      if (!response.ok) {
        throw new Error("문제가 발생했습니다.");
      }
    } finally {
      handleInsertAnalyze();
    }
  };

  return (
    <button
      onClick={() => handleButtonClick()}
      className={
        "h-fit mb-4 p-2 text-regular-12 text-white bg-secondary animate-pulse w-full flex items-center justify-center rounded-xl"
      }
    >
      {children}
    </button>
  );
};

export default AnalyzeButton;
