import Image from "next/image";

interface InputBarProps {
  target: string;
}

const InputBar = ({ target }: InputBarProps) => {
  return (
    <div className="w-full flex flex-row gap-2">
      <input
        className="w-11/12 text-regular-14 placeholder:text-gray-400 border border-gray-100 rounded-md p-2 focus:outline-none focus:border-slate-400"
        placeholder={`${target}에게 말을 걸어보세요.`}
      />
      <button className="w-1/12">
        <Image
          className="w-full h-fit rounded-full bg-primary p-2"
          alt="전송 아이콘"
          src="/svg/ic-send.svg"
          width={0}
          height={0}
          sizes="100vw"
        />
      </button>
    </div>
  );
};

export default InputBar;
