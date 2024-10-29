"use client";

import { ACCOR_DATA } from "@/constants/contents";
import { ChatType } from "@/type/common";
import Image from "next/image";
import React, { useState } from "react";

interface TextAccordionProps {
  type: string;
  data: ChatType;
}

const TextAccordion = ({ type, data }: TextAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col gap-3 p-2 bg-gray-50 h-auto text-regular-14 rounded-xl">
      <div
        onClick={toggleAccordion}
        className="cursor-pointer flex flex-col gap-4"
      >
        <div className="text-bold-20 flex justify-center flex-row gap-5">
          {ACCOR_DATA.filter((data) => data.type === type)[0].title}
          <div className="flex flex-row gap-2 justify-center items-center text-regular-16">
            <Image
              className="w-5 h-5"
              src={`/svg/ic-${isOpen ? "close" : "open"}-accod.svg`}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
            />
            <span>{isOpen ? "접기" : "펼치기"}</span>
          </div>
        </div>
        {/* TODO: 범용성 추가 */}
        {isOpen && (
          <div className="text-regular-16">{data.chat_analyze.advise}</div>
        )}
      </div>
    </div>
  );
};

export default TextAccordion;
