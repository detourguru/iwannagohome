"use client";

import { RESULT_SCRIPT } from "@/app/constants/script";
import AnalyzeButton from "@/components/Button/AnalyzeButton";
import ChatCard from "@/components/Card/ChatCard";
import InputBar from "@/components/Input/InputBar";
import Loading from "@/components/Loading/Loading";
import useAutoScroll from "@/hooks/useAutoScroll";
import useFetchData from "@/hooks/useFetchData";
import useHandleChatEvent from "@/hooks/useHandleChatEvent";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

export default function SceneDetail() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const path = usePathname();
  const chatId = v4();

  const { data: baseStory, isLoading } = useFetchData({
    path: path,
  });

  const {
    chat,
    history,
    setChat,
    handleOnClick,
    handleSubmit,
    geminiIsLoading,
  } = useHandleChatEvent(baseStory, isLoading);

  const { bottomRef } = useAutoScroll(history);

  const noScriptHistory = history.slice(1);
  const turnLength = noScriptHistory.filter(
    (history) => history.role === "user"
  ).length;

  if (noScriptHistory[noScriptHistory.length - 1]?.role === "user") {
    noScriptHistory.push({ role: "model", parts: [{ text: "loading" }] });
  }

  const body = {
    method: "POST",
    body: JSON.stringify({
      chat_id: chatId,
      chat_history: noScriptHistory,
      story_id: path.split("/")[path.split("/").length - 1],
    }),
  };

  useEffect(() => {
    if (baseStory) {
      setText(RESULT_SCRIPT(baseStory, noScriptHistory));
    }

    setCount(
      noScriptHistory.filter((history) => history.role === "user").length
    );
  }, [baseStory, noScriptHistory]);

  return (
    baseStory && (
      <div className="flex flex-col gap-5 h-full">
        <Loading isLoading={isLoading} />
        <div className="flex flex-col gap-3 flex-1 -mb-2 overflow-y-auto no-scrollbar">
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
              <span className="text-regular-14 break-keep">
                {baseStory[0].story}
              </span>
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
          <div className="flex flex-col gap-2 text-center text-regular-14 opacity-40">
            <span className="">현재 대화 {count}턴 / 최대 15턴</span>
            <span className="text-gray-500">
              5턴 이후부터 분석을 요청할 수 있어요.
            </span>
          </div>
        </div>
        <footer className="flex flex-col items-center">
          {turnLength >= 5 && (
            <div className="h-fit cursor-pointer">
              <AnalyzeButton
                disabled={geminiIsLoading}
                href={`/result/${chatId}`}
                body={body}
                text={text}
              >
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
