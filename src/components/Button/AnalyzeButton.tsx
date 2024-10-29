"use client";

import { useState } from "react";

export interface AnalyzeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
  body?: any;
}

const AnalyzeButton = ({ children, href, body }: AnalyzeButtonProps) => {
  const [loading, setLoading] = useState(true);

  // TODO: 공통 모듈로 합체
  const handleButtonClick = async () => {
    try {
      const response = await fetch(`/api${href}`, body);
      if (!response.ok) {
        throw new Error("문제가 발생했습니다.");
      }
    } finally {
      setLoading(false);
      if (!loading) {
        return (location.href = href);
      }
    }
  };

  return (
    <button
      onClick={() => handleButtonClick()}
      className={
        "h-fit mb-4 p-2 text-regular-12 text-white bg-secondary animate-pulse w-full flex items-center justify-center rounded-xl"
      }
    >
      {children}
    </button>
  );
};

export default AnalyzeButton;
