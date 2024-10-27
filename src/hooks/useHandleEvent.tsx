"use client";

import { ButtonProps } from "@/components/Button/Button";
import { BaseStoryType } from "@/type/common";
import { usePathname } from "next/navigation";
import { KeyboardEvent, useState } from "react";

export default function useHandleEvent(data?: BaseStoryType) {
  const current = usePathname();

  const [chat, setChat] = useState("");

  const [history, setHistory] = useState([
    {
      role: "user",
      parts: [{ text: data === undefined ? "" : data.personality }],
      hidden: true,
    },
    {
      role: "system",
      parts: [{ text: data === undefined ? "" : data.story_info.init }],
    },
  ]);

  const handleButtonClick = ({ variant, href }: ButtonProps) => {
    if (variant === "default" || variant === "replay") {
      return (location.href = href);
    } else if (variant === "share") {
      navigator.clipboard.writeText(
        process.env.NEXT_PUBLIC_HOST_NAME + current
      );
      alert("복사 되었습니다.");
    }
  };

  const handleChat = (chat: string) => {
    history.push({
      role: "user",
      parts: [{ text: chat }],
    });
    setHistory(history);
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

  return {
    chat,
    setChat,
    handleButtonClick,
    handleSubmit,
    handleOnClick,
    history,
  };
}
