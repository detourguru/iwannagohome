import { BaseStoryType } from "@/type/common";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

interface SceneCardProps extends PropsWithChildren {
  story: BaseStoryType;
}

const SceneCard = ({ story }: SceneCardProps) => {
  return (
    <li>
      <Link
        href={`/scene/${story.story_id}`}
        className="grid grid-cols-1 gap-1.5 w-full bg-gray-50 rounded-xl shadow-md p-4 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark border-gray-100"
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
          <h2 className="text-bold-18 font-heading text-center">
            {story.story_info.title}
          </h2>
        </div>
        <div className="flex justify-center items-center text-gray-700 text-regular-14">
          <span>난이도: {story.story_info.difficulty}</span>
        </div>
      </Link>
    </li>
  );
};

export default SceneCard;
