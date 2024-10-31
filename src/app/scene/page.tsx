"use client";

import SceneCard from "@/components/Card/SceneCard";
import Loading from "@/components/Loading/Loading";
import useFetchData from "@/hooks/useFetchData";
import { usePathname } from "next/navigation";

export default function Scene() {
  const path = usePathname();
  const { data: baseStory, isLoading } = useFetchData({
    path: path,
  });

  return (
    <section className="w-full h-full overflow-auto flex flex-col gap-5">
      <Loading isLoading={isLoading} />
      <div className="text-bold-24 text-center">상황 선택</div>
      <ul className="grid grid-cols-1 gap-5">
        {baseStory &&
          baseStory.map((data) => {
            return <SceneCard key={data.id} story={data} />;
          })}
      </ul>
    </section>
  );
}
