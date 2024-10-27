import { initBaseStoryResponse } from "@/constants/contents";
import { useEffect, useState } from "react";

export default function useFetchData(path: string) {
  const [data, setData] = useState([initBaseStoryResponse]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api${path}`);
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
  }, []);

  return { data, isLoading };
}
