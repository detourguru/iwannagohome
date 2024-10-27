import { GeminiChatHistoryType } from "@/type/common";

interface ChatCardProps {
  chat: GeminiChatHistoryType;
  target: string;
}

export default function ChatCard({ chat, target }: ChatCardProps) {
  const isUser = chat.role !== "system" ? true : false;
  return (
    chat.hidden !== true && (
      <div
        className={`my-4 w-fit flex flex-col gap-1 ${
          isUser ? "ml-auto" : "justify-start"
        }`}
      >
        {!isUser && <span className="text-regular-12">{target}</span>}
        <span
          className={`h-fit rounded-xl py-2 px-4 items-center flex ${
            chat.role === "system" ? "bg-primary" : "bg-gray-100"
          }`}
        >
          {chat.parts[0].text}
        </span>
      </div>
    )
  );
}
