"use client";

import AnalyzeButton from "@/components/Button/AnalyzeButton";
import ChatCard from "@/components/Card/ChatCard";
import InputBar from "@/components/Input/InputBar";
import useAutoScroll from "@/hooks/useAutoScroll";
import useFetchStoryData from "@/hooks/useFetchStoryData";
import useHandleChatEvent from "@/hooks/useHandleChatEvent";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { v4 } from "uuid";

export default function SceneDetail() {
  const path = usePathname();
  const chatId = v4();

  const { data: baseStory, isLoading } = useFetchStoryData({
    path: path,
  });

  const { chat, history, setChat, handleOnClick, handleSubmit } =
    useHandleChatEvent(baseStory, isLoading);

  const { bottomRef } = useAutoScroll(history);

  const noScriptHistory = history.slice(1);
  const turnLength = noScriptHistory.filter(
    (history) => history.role === "user"
  ).length;

  const body = {
    method: "POST",
    body: JSON.stringify({
      chat_id: chatId,
      chat_history: noScriptHistory,
      story_id: path.split("/")[path.split("/").length - 1],
    }),
  };

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
        <footer className="flex flex-col items-center">
          {turnLength >= 0 && (
            <div className="h-fit cursor-pointer">
              <AnalyzeButton href={`/result/${chatId}`} body={body}>
                분석하기
              </AnalyzeButton>
            </div>
          )}
          <InputBar
            story={baseStory[0]}
            onClick={handleOnClick}
            onSubmit={handleSubmit}
            chat={chat}
            setChat={setChat}
            turnLength={turnLength}
          />
        </footer>
      </div>
    )
  );
}
