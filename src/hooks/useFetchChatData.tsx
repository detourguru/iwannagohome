import { ChatType } from "@/type/common";
import { useEffect, useState } from "react";

interface FetchDataProps {
  path: string;
  body?: any;
}

export default function useFetchChatData({ path, body }: FetchDataProps) {
  const [data, setData] = useState<ChatType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api${path}`, body);
        if (!response.ok) {
          throw new Error("문제가 발생했습니다.");
        }
        const result = await response.json();
        setData(result.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [path, body]);

  return { data, isLoading };
}
