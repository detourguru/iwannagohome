"use client";

import ChatCard from "@/components/Card/ChatCard";
import InputBar from "@/components/Input/InputBar";
import useAutoScroll from "@/hooks/useAutoScroll";
import useFetchData from "@/hooks/useFetchData";
import useHandleChatEvent from "@/hooks/useHandleChatEvent";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SceneDetail() {
  const path = usePathname();

  const { data: baseStory, isLoading } = useFetchData({
    path: path,
  });

  const { chat, history, setChat, handleOnClick, handleSubmit } =
    useHandleChatEvent(baseStory, isLoading);

  const { bottomRef } = useAutoScroll(history);

  const noScriptHistory = history.slice(1);

  return (
    baseStory && (
      <div className="flex flex-col gap-5 h-full">
        <div className="flex flex-col gap-3 flex-1 overflow-y-auto no-scrollbar">
          <header className="flex flex-col gap-5 text-center">
            <Image
              className="w-full object-cover max-h-48 rounded-lg"
              alt={baseStory[0].story_info.alt}
              src={baseStory[0].story_info.image_src}
              width={0}
              height={0}
              sizes="100vw"
            />
            <div className="flex flex-col gap-1">
              <span className="text-bold-14">
                {baseStory[0].story_info.title}
              </span>
              <span className="text-regular-14">{baseStory[0].story}</span>
            </div>
            <hr className="h-0.5 border-t-0 bg-gray-100"></hr>
          </header>
          <section className="py-2">
            {noScriptHistory.map((item, index) => (
              <ChatCard
                key={index}
                chat={item}
                target={baseStory[0].story_info.character}
              />
            ))}
          </section>
          <div ref={bottomRef} />
        </div>
        <footer className="">
          <InputBar
            story={baseStory[0]}
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
