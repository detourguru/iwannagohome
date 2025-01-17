"use client";

import { GeminiChatHistoryType } from "@/type/common";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { useState } from "react";

interface useGeminiProps {
  chatHistory: GeminiChatHistoryType[];
  newChat: string;
}

export default function useGeminiChat() {
  const [geminiIsLoading, setGeminiIsLoading] = useState(false);
  const askGeminiBot = async ({ chatHistory, newChat }: useGeminiProps) => {
    setGeminiIsLoading(true);
    const generator = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY!
    );
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];
    const model = generator.getGenerativeModel({
      model: "gemini-1.5-pro",
      safetySettings: safetySettings,
    });
    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat
      .sendMessage(newChat)
      .finally(() => setGeminiIsLoading(false));

    const response = result.response.text();

    return response;
  };

  const askGemini = async (script: string) => {
    setGeminiIsLoading(true);

    const generator = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY!
    );
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];
    const model = generator.getGenerativeModel({
      model: "gemini-1.5-pro",
      safetySettings: safetySettings,
    });
    const prompt = script;

    const result = await model
      .generateContent(prompt)
      .finally(() => setGeminiIsLoading(false));

    const response = result.response.text();

    return response;
  };

  return { askGeminiBot, askGemini, geminiIsLoading };
}
