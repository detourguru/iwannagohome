"use client";

import { BaseStoryType } from "@/type/common";
import { KeyboardEvent, useState } from "react";

export default function useHandleChatEvent(data: BaseStoryType) {
  const [chat, setChat] = useState("");
  const [history, setHistory] = useState([
    {
      role: "user",
      parts: [{ text: data.personality }],
      hidden: true,
    },
    {
      role: "system",
      parts: [{ text: data.story_info.init }],
    },
  ]);

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
