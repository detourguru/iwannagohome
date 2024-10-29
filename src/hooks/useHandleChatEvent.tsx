/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { BaseStoryType, GeminiChatHistoryType } from "@/type/common";
import { KeyboardEvent, useEffect, useState } from "react";
import useGeminiChat from "./useGeminiChat";

export default function usehandleAddChatEvent(
  baseStory: BaseStoryType[] | null,
  isLoading: boolean
) {
  const [chat, setChat] = useState("");
  const [history, setHistory] = useState<GeminiChatHistoryType[] | []>([]);

  const { askGemini } = useGeminiChat({ chatHistory: history, newChat: chat });

  useEffect(() => {
    const createInitHistory = () => {
      if (!isLoading && baseStory && history.length === 0) {
        setHistory([
          {
            role: "user",
            parts: [{ text: baseStory[0].personality }],
          },
          {
            role: "model",
            parts: [{ text: baseStory[0].story_info.init }],
          },
        ]);
      }
    };

    createInitHistory();
  }, [isLoading, baseStory, history]);

  const handleAddChat = (chat: string, role: string) => {
    setHistory([
      ...history,
      {
        role: role,
        parts: [{ text: chat }],
      },
    ]);
  };

  const handleOnClick = (text: string) => {
    if (text.length > 0) {
      handleAddChat(text, "user");
      setChat("");
      handleAddAnswer();
    }
  };

  const handleAddAnswer = async () => {
    const data = await askGemini();
    setHistory((prev) => [...prev, { role: "model", parts: [{ text: data }] }]);
  };
  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== "" && e.key === "Enter") {
      handleAddChat(e.currentTarget.value, "user");
      setChat("");
      handleAddAnswer();
    }
  };

  return { chat, handleOnClick, handleSubmit, history, setChat };
}
