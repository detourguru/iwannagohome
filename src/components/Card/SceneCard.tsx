"use client";

import { IMAGE_DATA } from "@/constants/image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

interface SceneCardProps extends PropsWithChildren {
  id: string;
}

const SceneCard = ({ id }: SceneCardProps) => {
  const li = useRef<HTMLLIElement>(null);
  const [widthAndHeight, setWidthAndHeight] = useState([0, 0]);
  const router = useRouter();

  const currentData = IMAGE_DATA.filter((data) => data.id === id)[0];

  const handleOnClick = () => {
    return router.push(`/scene/${currentData.page}`);
  };

  useEffect(() => {
    if (li.current) {
      setWidthAndHeight([li.current.offsetWidth, li.current.offsetHeight]);
    }
  }, [li]);

  return (
    <li
      ref={li}
      className="grid grid-cols-1 gap-1.5 w-full bg-gray-50 rounded-lg shadow-md p-4 hover:bg-gray-100 cursor-pointer border-gray-100"
      onClick={() => handleOnClick()}
    >
      <div className="w-full">
        <Image
          className="w-full h-40 object-cover rounded-lg"
          src={currentData.src}
          alt={currentData.alt}
          width={widthAndHeight[0]}
          height={widthAndHeight[1]}
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
