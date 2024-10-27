"use client";

import ChatCard from "@/components/Card/ChatCard";
import InputBar from "@/components/Input/InputBar";
import { initBaseStoryResponse } from "@/constants/contents";
import useFetchData from "@/hooks/useFetchData";
import useHandleEvent from "@/hooks/useHandleEvent";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SceneDetail() {
  const path = usePathname();

  const { data: baseStory, isLoading } = useFetchData({
    path: path,
    init: initBaseStoryResponse,
  });

  const data = baseStory[0];

  const { chat, history, setChat, handleOnClick, handleSubmit } =
    useHandleEvent(data);

  return (
    !isLoading && (
      <div className="flex flex-col gap-5 h-full">
        <div className="flex flex-col gap-3 flex-1 overflow-y-auto no-scrollbar">
          <header className="flex flex-col gap-5 text-center">
            <Image
              className="w-full object-cover max-h-48 rounded-lg"
              alt={data.story_info.alt}
              src={data.story_info.image_src}
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
            {history.map((item, index) => (
              <ChatCard
                key={index}
                chat={item}
                target={data.story_info.character}
              />
            ))}
          </section>
        </div>
        <footer className="">
          <InputBar
            story={data}
            onClick={handleOnClick}
            onSubmit={handleSubmit}
            chat={chat}
            setChat={setChat}
          />
        </footer>
      </div>
    )
  );
}
