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
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
        <header className="flex flex-col gap-5 text-center">
          <Image
            className="w-full object-cover h-[30vw] rounded-lg"
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
          <div className="my-4 w-fit flex flex-col gap-1">
            <span className="text-regular-12">{currentStory.character}</span>
            <span className="h-fit bg-primary rounded-xl py-2 px-4 items-center flex">
              나 집에 갈래.
            </span>
          </div>
        </section>
      </div>
      <footer className="">
        <InputBar target={currentStory.character} />
      </footer>
    </div>
  );
}
