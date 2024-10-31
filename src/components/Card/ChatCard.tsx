import { GeminiChatHistoryType } from "@/type/common";
import Image from "next/image";

interface ChatCardProps {
  chat: GeminiChatHistoryType;
  target: string;
  preview?: boolean;
}

export default function ChatCard({ chat, target, preview }: ChatCardProps) {
  const isUser = chat.role !== "model" ? true : false;
  const loading = !isUser && chat.parts[0].text === "loading" ? true : false;
  return (
    <div
      className={`my-4 w-fit flex flex-col gap-1 ${
        isUser ? "ml-auto" : "justify-start"
      }`}
    >
      {!isUser && <span className="text-regular-12">{target}</span>}
      <span
        className={`h-fit ${
          preview ? "text-xs" : ""
        } rounded-xl py-2 px-4 items-center flex ${
          chat.role === "model" ? "bg-primary" : "bg-gray-100"
        }`}
      >
        {loading ? (
          <Image
            className="w-6"
            width={0}
            height={0}
            sizes="100vw"
            alt="loading"
            src="/svg/ic-loading.svg"
          />
        ) : (
          chat.parts[0].text
        )}
      </span>
    </div>
  );
}
