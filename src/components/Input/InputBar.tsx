"use client";

import { BaseStoryType } from "@/type/common";
import Image from "next/image";
import { KeyboardEvent } from "react";

interface InputBarProps {
  story: BaseStoryType;
  onSubmit: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClick: (text: string) => void;
  chat: string;
  setChat: (chat: string) => void;
  turnLength: number;
}

const InputBar = ({
  story,
  onClick,
  onSubmit,
  chat,
  setChat,
  turnLength,
}: InputBarProps) => {
  return (
    <div className="w-full flex flex-row gap-2">
      <input
        readOnly={turnLength >= 15 ? true : false}
        className="w-11/12 text-regular-14 placeholder:text-gray-400 border border-gray-100 rounded-md p-2 focus:outline-none focus:border-slate-400"
        placeholder={
          turnLength >= 15
            ? "더 이상 입력할 수 없습니다."
            : `${story.story_info.character}에게 말을 걸어보세요.`
        }
        value={chat}
        onChange={(e) => setChat(e.target.value)}
        onKeyUp={(e) => onSubmit(e)}
      />
      <button className="w-1/12" type="button" onClick={() => onClick(chat)}>
        <Image
          className="w-full h-fit rounded-full bg-primary p-2"
          alt="전송 아이콘"
          src="/svg/ic-send.svg"
          width={0}
          height={0}
          sizes="100vw"
        />
      </button>
    </div>
  );
};

export default InputBar;
