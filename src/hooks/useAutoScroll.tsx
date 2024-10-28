"use client";

import { useEffect, useRef } from "react";

export default function useAutoScroll(array: any) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [array]);
  return { bottomRef };
}
