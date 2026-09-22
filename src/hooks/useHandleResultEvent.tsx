"use client";

import { ButtonProps } from "@/components/Button/Button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function useHandleResultEvent({ variant, href }: ButtonProps) {
  const current = usePathname();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleButtonClick = () => {
    if (variant === "share") {
      navigator.clipboard.writeText(
        process.env.NEXT_PUBLIC_HOST_NAME + current
      );
      setCopied(true);
    } else {
      return (location.href = href);
    }
  };

  return {
    handleButtonClick,
    copied,
  };
}
