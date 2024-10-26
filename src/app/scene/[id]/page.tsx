import ChatCard from "@/components/Card/ChatCard";
import InputBar from "@/components/Input/InputBar";
import { IMAGE_DATA, STORY_DATA } from "@/constants/contents";
import Image from "next/image";

interface SceneDetailProps {
  params: Promise<any>;
}

export default async function SceneDetail({ params }: SceneDetailProps) {
  const { id } = await params;
  const currentData = IMAGE_DATA.filter((data) => data.id === id)[0];
  const currentStory = STORY_DATA.filter((data) => data.id === id)[0];

  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto no-scrollbar">
        <header className="flex flex-col gap-5 text-center">
          <Image
            className="w-full object-cover max-h-48 rounded-lg"
            alt={currentData.alt}
            src={currentData.src}
            width={0}
            height={0}
            sizes="100vw"
          />
          <div className="flex flex-col gap-1">
            <span className="text-bold-14">{currentData.title}</span>
            <span className="text-regular-14">{currentStory.story}</span>
          </div>
          <hr className="h-0.5 border-t-0 bg-gray-100"></hr>
        </header>
        <section className="py-2">
          <ChatCard storyId={id} role="system" />
        </section>
      </div>
      <footer className="">
        <InputBar target={currentStory.character} />
      </footer>
    </div>
  );
}
