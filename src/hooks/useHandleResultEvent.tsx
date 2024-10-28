"use client";

import { ButtonProps } from "@/components/Button/Button";
import { usePathname } from "next/navigation";

export default function useHandleResultEvent() {
  const current = usePathname();

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

  return {
    handleButtonClick,
  };
}