"use client";

import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

interface FetchDataProps {
  path: string;
  body?: any;
}
export default function useFetchData({ path, body }: FetchDataProps) {
  const [data, setData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await fetch(`/api${path}`, body);
        if (!response.ok) {
          return NextResponse.json(
            { error: await response.text() },
            { status: 500 }
          );
        }
        const result = await response.json();
        setData(result.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetching();
  }, [path, body]);

  return { data, isLoading };
}
