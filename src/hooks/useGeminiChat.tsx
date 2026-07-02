"use client";

import { GeminiChatHistoryType } from "@/type/common";
import fetchData from "@/utils/fetchData";
import { useState } from "react";

interface useGeminiProps {
  chatHistory: GeminiChatHistoryType[];
  newChat: string;
}

export default function useGeminiChat() {
  const [geminiIsLoading, setGeminiIsLoading] = useState(false);
  const askGeminiBot = async ({ chatHistory, newChat }: useGeminiProps) => {
    setGeminiIsLoading(true);

    const res = await fetchData({
      path: "/api/gemini/chat",
      body: {
        method: "POST",
        body: JSON.stringify({ chatHistory, newChat }),
      },
    });

    setGeminiIsLoading(false);

    return res.response;
  };

  const askGemini = async (script: string) => {
    setGeminiIsLoading(true);

    const res = await fetchData({
      path: "/api/gemini",
      body: {
        method: "POST",
        body: JSON.stringify({ script }),
      },
    });

    setGeminiIsLoading(false);
    return res.response;
  };

  return { askGeminiBot, askGemini, geminiIsLoading };
}
