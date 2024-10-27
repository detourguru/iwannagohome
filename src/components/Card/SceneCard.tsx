"use client";

import { BaseStory } from "@/type/responseType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

interface SceneCardProps extends PropsWithChildren {
  story: BaseStory;
}

const SceneCard = ({ story }: SceneCardProps) => {
  const router = useRouter();

  const handleOnClick = () => {
    return router.push(`/scene/${story.story_id}`);
  };

  return (
    <li
      className="grid grid-cols-1 gap-1.5 w-full bg-gray-50 rounded-lg shadow-md p-4 hover:bg-gray-100 cursor-pointer border-gray-100"
      onClick={() => handleOnClick()}
    >
      <div className="w-full">
        <Image
          className="w-full h-40 object-cover rounded-lg"
          src={story.story_info.image_src}
          alt={story.story_info.alt}
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <div>
        <h2 className="text-bold-18 text-center">{story.story_info.title}</h2>
      </div>
      <div className="flex justify-center items-center text-gray-700 text-regular-14">
        <span>난이도: {story.story_info.difficulty}</span>
      </div>
    </li>
  );
};

export default SceneCard;
