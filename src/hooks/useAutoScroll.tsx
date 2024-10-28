"use client";

import { useEffect, useRef } from "react";

export default function useAutoScroll<T>(array: T[]) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [array]);
  return { bottomRef };
}
