"use client";

import TextAccordion from "@/components/Accodion/TextAccodion";
import Button from "@/components/Button/Button";
import useFetchChatData from "@/hooks/useFetchChatData";
import { usePathname } from "next/navigation";

export default function Result() {
  const current = usePathname();
  const { data, isLoading } = useFetchChatData({ path: current });
  return (
    data && (
      <div className="w-full h-full flex flex-col text-center gap-5">
        <div className="h-full overflow-auto flex flex-col gap-5">
          <header className="flex flex-col gap-3">
            <span className="text-bold-34">
              {data[0].base_story.story_info.title}
            </span>
            <span className="text-bold-70">🥺</span>
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
          <TextAccordion type="advise" data={data[0]} />
        </div>
        <footer className="flex flex-col gap-2">
          <Button
            href={`
        ${process.env.NEXT_PUBLIC_HOST_NAME + "/scene"}
            
            `}
            variant="replay"
          >
            다시 대화하기
          </Button>
          <Button href="" variant="share">
            공유하기
          </Button>
        </footer>
      </div>
    )
  );
}
