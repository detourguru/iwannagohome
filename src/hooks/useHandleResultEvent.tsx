"use client";

import { ButtonProps } from "@/components/Button/Button";
import { usePathname } from "next/navigation";

export default function useHandleResultEvent({ variant, href }: ButtonProps) {
  const current = usePathname();

  const handleButtonClick = () => {
    if (variant === "share") {
      navigator.clipboard.writeText(
        process.env.NEXT_PUBLIC_HOST_NAME + current
      );
      alert("복사 되었습니다.");
    } else {
      return (location.href = href);
    }
  };

  return {
    handleButtonClick,
  };
}
