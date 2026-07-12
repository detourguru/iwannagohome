"use client";

import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loading from "@/components/Loading/Loading";
import { useEffect, useState } from "react";

interface FetchDataProps {
  path: string;
  body?: any;
}
export default function useFetchData({ path, body }: FetchDataProps) {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await fetch(`/api${path}`, body);
        if (!response.ok) {
          setError(await response.text());
          return;
        }
        const result = await response.json();
        setData(result.data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "알 수 없는 에러");
      } finally {
        setIsLoading(false);
      }
    };

    fetching();
  }, [path, body]);

  const status = error ? (
    <ErrorMessage message={error} />
  ) : (
    <Loading isLoading={isLoading} />
  );

  return { data, isLoading, error, status };
}
