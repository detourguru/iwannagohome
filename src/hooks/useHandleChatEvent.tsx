"use client";

import { BaseStoryType, GeminiChatHistoryType } from "@/type/common";
import { KeyboardEvent, useEffect, useState } from "react";

export default function useHandleChatEvent(
  baseStory: BaseStoryType[],
  isLoading: boolean
) {
  const [chat, setChat] = useState("");
  const [history, setHistory] = useState<GeminiChatHistoryType[] | []>([]);
  useEffect(() => {
    if (!isLoading && baseStory) {
      setHistory([
        {
          role: "user",
          parts: [{ text: baseStory[0].personality }],
          hidden: true,
        },
        {
          role: "system",
          parts: [{ text: baseStory[0].story_info.init }],
        },
      ]);
    }
  }, [isLoading, baseStory]);

  const handleChat = (chat: string) => {
    setHistory([
      ...history,
      {
        role: "user",
        parts: [{ text: chat }],
      },
    ]);
  };

  const handleOnClick = (text: string) => {
    if (text.length > 0) {
      handleChat(text);
      setChat("");
    }
  };

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== "" && e.key === "Enter") {
      handleChat(e.currentTarget.value);
      setChat("");
    }
  };
  return { chat, handleOnClick, handleSubmit, history, setChat };
}
