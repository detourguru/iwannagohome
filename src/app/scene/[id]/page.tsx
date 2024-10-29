"use client";

import AnalyzeButton from "@/components/Button/AnalyzeButton";
import ChatCard from "@/components/Card/ChatCard";
import InputBar from "@/components/Input/InputBar";
import useAutoScroll from "@/hooks/useAutoScroll";
import useFetchStoryData from "@/hooks/useFetchStoryData";
import useHandleChatEvent from "@/hooks/useHandleChatEvent";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

export default function SceneDetail() {
  const [text, setText] = useState("");
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

  useEffect(() => {
    if (baseStory) {
      // TODO: 분리
      setText(`
        아래 제공되는 데이터를 바탕으로, 당신은 다음과 같은 요약 자료를 제공해야합니다.
        - character: ${baseStory[0].story_info.character}
        - summary: 대화를 고려했을 때, model이 맡은 역할인 ${
          baseStory[0].story_info.character
        }의 4줄 이하의 속마음.
        - status: [증오함, 미움, 어색함, 애증, 사랑함] 단계의 감정 상태 중, ${
          baseStory[0].story_info.character
        }와 사용자(user)의 관계는 무엇인지. "당신과 ㅇㅇ는(은) ㅇㅇ 사이"와 같이 작성.
        - context: 왜 위의 감정상태 관계라고 판단했는지, 관계를 개선하기 위해서는 어떤 식으로 대화를 진행해야하는지에 대한 3줄 이하의 요약 내용.
        - advise: 관계 개선을 위한 조언: 현재문제(current), 해결방법(solution), 주의할점(caution)을 각각 3줄 이내.
        데이터: ${JSON.stringify(noScriptHistory)}

        제공되는 데이터는 반드시 다음 형식을 따라야합니다.
        {
          character: ""
          summary: "",
          result : {status: "", context: ""},
          advise : {
            current: "",
            solution: "",
            caution: ""
          }
        }`);
    }
  }, [noScriptHistory]);

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
          {turnLength >= 5 && (
            <div className="h-fit cursor-pointer">
              <AnalyzeButton href={`/result/${chatId}`} body={body} text={text}>
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
