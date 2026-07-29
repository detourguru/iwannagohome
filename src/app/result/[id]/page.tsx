"use client";

import TextAccordion from "@/components/Accodion/TextAccodion";
import Button from "@/components/Button/Button";
import useFetchData from "@/hooks/useFetchData";
import { ChatType } from "@/type/common";
import { usePathname } from "next/navigation";

export default function Result() {
  const current = usePathname();
  const { data, status } = useFetchData<ChatType[]>({ path: current });

  if (!data) return status;

  return (
    <div className="w-full h-full flex flex-col text-center gap-5 break-keep">
      <div className="h-full overflow-auto flex flex-col gap-5">
        <header className="flex flex-col gap-3">
          <span className="text-bold-34">
            {data[0].base_story.story_info.title}
          </span>
          <span className="text-bold-70">
            {data[0].chat_analyze.result.emoji}
          </span>
          <span className="text-regular-16">
            {data[0].chat_analyze.summary}
          </span>
        </header>
        <section className="flex flex-col gap-3 bg-gray-50 h-auto p-4 text-regular-14 rounded-xl">
          <span className="text-bold-20">
            {data[0].chat_analyze.result.title}
          </span>
          <span>{data[0].chat_analyze.result.context}</span>
        </section>
        <TextAccordion type="review" data={data[0]} />
        <TextAccordion type="advise" data={data[0]} />
      </div>
      <footer className="flex flex-col gap-2">
        <Button href="" variant="share">
          공유하기
        </Button>
        <Button variant="home" href="/">
          홈으로 가기
        </Button>
      </footer>
    </div>
  );
}
