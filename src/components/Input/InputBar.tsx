"use client";

import Image from "next/image";
import { KeyboardEvent, useState } from "react";

interface InputBarProps {
  target: string;
}

const InputBar = ({ target }: InputBarProps) => {
  const [text, setText] = useState("");
  const handleOnClick = () => {
    console.log(text);
  };
  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(text);
    }
  };
  return (
    <div className="w-full flex flex-row gap-2">
      <input
        value={text}
        className="w-11/12 text-regular-14 placeholder:text-gray-400 border border-gray-100 rounded-md p-2 focus:outline-none focus:border-slate-400"
        placeholder={`${target}에게 말을 걸어보세요.`}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => handleSubmit(e)}
      />
      <button className="w-1/12" type="button" onClick={() => handleOnClick()}>
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
