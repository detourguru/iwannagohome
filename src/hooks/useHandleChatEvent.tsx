/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { BaseStoryType, GeminiChatHistoryType } from "@/type/common";
import { KeyboardEvent, useEffect, useState } from "react";
import useGeminiChat from "@/hooks/useGeminiChat";
import getErrorCode from "@/utils/getErrorCode";
import { ERROR_MESSAGE } from "@/app/constants/errors";

export default function usehandleAddChatEvent(
  baseStory: BaseStoryType[] | null,
  isLoading: boolean,
) {
  const [chat, setChat] = useState("");
  const [history, setHistory] = useState<GeminiChatHistoryType[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [failedChat, setFailedChat] = useState<string | null>(null);

  const { askGeminiBot, geminiIsLoading } = useGeminiChat();

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
    setHistory((prev) => [...prev, { role, parts: [{ text: chat }] }]);
  };

  const handleAddAnswer = async (text: string) => {
    try {
      const data = await askGeminiBot({
        chatHistory: history,
        newChat: text,
      });
      setHistory((prev) => [
        ...prev,
        { role: "model", parts: [{ text: data }] },
      ]);
      setError(null);
      setFailedChat(null);
    } catch (e) {
      console.error(e);
      setHistory((prev) => prev.slice(0, -1)); // 턴 원복
      setFailedChat(text);
      setError(ERROR_MESSAGE[getErrorCode(e as Error)]);
    }
  };

  const sendChat = (text: string) => {
    if (geminiIsLoading || text.length === 0) return;
    handleAddChat(text, "user");
    setChat("");
    handleAddAnswer(text);
  };

  const handleOnClick = (text: string) => {
    sendChat(text);
  };

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendChat(e.currentTarget.value);
    }
  };

  const handleRetry = () => {
    if (!failedChat) return;
    const text = failedChat;
    setError(null);
    setFailedChat(null);
    handleAddChat(text, "user");
    handleAddAnswer(text);
  };

  return {
    chat,
    handleOnClick,
    handleSubmit,
    history,
    setChat,
    geminiIsLoading,
    error,
    handleRetry,
  };
}
