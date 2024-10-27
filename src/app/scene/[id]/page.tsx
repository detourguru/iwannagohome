"use client";

import ChatCard from "@/components/Card/ChatCard";
import InputBar from "@/components/Input/InputBar";
import useFetchData from "@/hooks/useFetchData";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SceneDetail() {
  const path = usePathname();
  const { data: baseStory, isLoading } = useFetchData(path);
  const data = baseStory[0];

  return (
    !isLoading && (
      <div className="flex flex-col gap-5 h-full">
        <div className="flex flex-col gap-3 flex-1 overflow-y-auto no-scrollbar">
          <header className="flex flex-col gap-5 text-center">
            <Image
              className="w-full object-cover max-h-48 rounded-lg"
              alt={data.story_info.alt}
              src={data.image_src}
              width={0}
              height={0}
              sizes="100vw"
            />
            <div className="flex flex-col gap-1">
              <span className="text-bold-14">{data.story_info.title}</span>
              <span className="text-regular-14">{data.story}</span>
            </div>
            <hr className="h-0.5 border-t-0 bg-gray-100"></hr>
          </header>
          <section className="py-2">
            <ChatCard story={data} role="system" />
          </section>
        </div>
        <footer className="">
          <InputBar target={data.character} />
        </footer>
      </div>
    )
  );
}
