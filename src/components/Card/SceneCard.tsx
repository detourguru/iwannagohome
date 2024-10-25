"use client";

import { IMAGE_DATA } from "@/constants/contents";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

interface SceneCardProps extends PropsWithChildren {
  id: string;
}

const SceneCard = ({ id }: SceneCardProps) => {
  const router = useRouter();

  const currentData = IMAGE_DATA.filter((data) => data.id === id)[0];

  const handleOnClick = () => {
    return router.push(`/scene/${currentData.id}`);
  };

  return (
    <li
      className="grid grid-cols-1 gap-1.5 w-full bg-gray-50 rounded-lg shadow-md p-4 hover:bg-gray-100 cursor-pointer border-gray-100"
      onClick={() => handleOnClick()}
    >
      <div className="w-full">
        <Image
          className="w-full h-40 object-cover rounded-lg"
          src={currentData.src}
          alt={currentData.alt}
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <div>
        <h2 className="text-bold-18 text-center">{currentData.title}</h2>
      </div>
      <div className="flex justify-center items-center text-gray-700 text-regular-14">
        <span>난이도: {currentData.difficulty}</span>
      </div>
    </li>
  );
};

export default SceneCard;
