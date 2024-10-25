"use client";

import { IMAGE_DATA } from "@/constants/image";
import Image from "next/image";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

interface SceneCardProps extends PropsWithChildren {
  id: string;
}

const SceneCard = ({ id }: SceneCardProps) => {
  const li = useRef<HTMLLIElement>(null);
  const [widthAndHeight, setWidthAndHeight] = useState([0, 0]);
  useEffect(() => {
    if (li.current) {
      setWidthAndHeight([li.current.offsetWidth, li.current.offsetHeight]);
    }
  }, [li]);
  return (
    <li
      ref={li}
      className="grid grid-cols-1 gap-1.5 w-full bg-gray-50 rounded-lg shadow-md p-4 hover:bg-gray-100 cursor-pointer border-gray-100"
    >
      <div className="w-full">
        <Image
          className="w-full h-40 object-cover rounded-lg"
          src={IMAGE_DATA.filter((data) => data.id === id)[0].src}
          alt={IMAGE_DATA.filter((data) => data.id === id)[0].alt}
          width={widthAndHeight[0]}
          height={widthAndHeight[1]}
        />
      </div>
      <div>
        <h2 className="text-bold-18 text-center">
          {IMAGE_DATA.filter((data) => data.id === id)[0].title}
        </h2>
      </div>
      <div className="flex justify-center items-center text-gray-700 text-regular-14">
        <span>
          난이도: {IMAGE_DATA.filter((data) => data.id === id)[0].difficulty}
        </span>
      </div>
    </li>
  );
};

export default SceneCard;
