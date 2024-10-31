import Button from "@/components/Button/Button";
import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-10/12 text-center flex flex-col gap-6 justify-center">
      <div className="w-full place-items-center">
        <Image
          className="w-1/3"
          src="svg/ic-sad-face.svg"
          alt="슬픈얼굴"
          width={0}
          height={0}
          sizes="100vw"
        />
        <span className="text-bold-34">404</span>
      </div>
      <span className="text-bold-24">이곳에는 아무것도 없습니다.</span>
      <Button href="/" variant="home">
        메인화면 가기
      </Button>
    </div>
  );
};

export default NotFound;
