"use client";

import Button from "@/components/Button/Button";
import useFetchStoryData from "@/hooks/useFetchStoryData";

export default function Home() {
  const { data } = useFetchStoryData({ path: "/result" });
  return (
    <section className="grid grid-cols-1 gap-5 w-full">
      <div className="grid grid-cols-1 gap-3 text-regular-20 text-center leading-9">
        AI 연인이 삐졌다! 어떻게 하지?
        <span className="text-bold-34">&quot;나 집에 갈래!&quot;</span>
        <span className="text-bold-70">🥺</span>
        당신은 어떻게 해야할까요?
        <br />
        연인과의 대화를 통해 관계를 개선해보세요.
      </div>
      <div className="grid grid-cols-1 gap-5 w-5/6 place-self-center">
        <div className="bg-gray-100 h-[4vw] px-7 py-8 text-regular-14 flex items-center justify-center rounded-xl">
          🤯 현재까지 <span className="text-bold-14">&nbsp;{data?.length}</span>
          명이 연인과 대화했어요
        </div>
        <Button href="scene" variant="default">
          내가 뭐 잘못한거 있어..?
        </Button>
      </div>
      <div className="flex text-gray-500 text-regular-14 text-center justify-center">
        🍯 대화 팁 🍯
        <br />
        1. 모든 인물들은 저마다의 사연이 있어요.
        <br />
        2. 분석 결과의 조언을 다음 대화에 적용해보세요.
        <br />
        3. 15턴 동안 대화를 통해 문제 상황을 해결해보세요.
      </div>
    </section>
  );
}
