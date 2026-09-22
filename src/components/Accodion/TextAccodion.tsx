"use client";

import { ChatType } from "@/type/common";
import Image from "next/image";
import React, { useId, useState } from "react";
import ChatCard from "@/components/Card/ChatCard";

interface TextAccordionProps {
  type: string;
  data: ChatType;
}

const TextAccordion = ({ type, data }: TextAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-3 p-2 bg-gray-50 h-auto text-regular-14 rounded-xl">
      <button
        type="button"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full text-bold-20 flex justify-center flex-row gap-5"
      >
        {type === "review" ? "대화 내용 다시보기" : "관계 개선을 위한 조언"}
        <span className="flex flex-row gap-2 justify-center items-center text-regular-16">
          <Image
            className="w-5 h-5"
            src={`/svg/ic-${isOpen ? "close" : "open"}-accod.svg`}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
          />
          {isOpen ? "접기" : "펼치기"}
        </span>
      </button>

      {isOpen && (
        <div id={contentId}>
          {type === "review" && (
            <div className="text-regular-16 p-2 text-start">
              {data.chat_history.map((item, index) => (
                <ChatCard
                  preview
                  key={index}
                  chat={item}
                  target={data.base_story.story_info.character}
                />
              ))}
            </div>
          )}
          {type === "advise" && (
            <ul className="text-regular-14 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <li className="text-bold-16">👀 현재 상황</li>
                <dl className="whitespace-pre-line break-keep">
                  {JSON.parse(data.chat_analyze.advise).current}
                </dl>
              </div>
              <div className="flex flex-col gap-2">
                <li className="text-bold-16">🧑‍🔧 해결 방법</li>
                <dl className="whitespace-pre-line break-keep">
                  {JSON.parse(data.chat_analyze.advise).solution}
                </dl>
              </div>
              <div className="flex flex-col gap-2">
                <li className="text-bold-16">🤔 주의 사항</li>
                <dl className="whitespace-pre-line break-keep">
                  {JSON.parse(data.chat_analyze.advise).caution}
                </dl>
              </div>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TextAccordion;
