import { BaseStoryType } from "@/type/common";
import { useEffect, useState } from "react";

interface FetchDataProps {
  path: string;
  init: BaseStoryType;
  body?: any;
}

export default function useFetchData({ path, init, body }: FetchDataProps) {
  const [data, setData] = useState([init]);
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
  });

  return { data, isLoading };
}
