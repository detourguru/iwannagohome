import { BaseStory } from "@/type/responseType";

interface ChatCardProps {
  story: BaseStory;
  role: string;
}
export default function ChatCard({ story, role }: ChatCardProps) {
  const isUser = role !== "system" ? true : false;
  return (
    <div
      className={`my-4 w-fit flex flex-col gap-1 ${
        isUser ? "ml-auto" : "justify-start"
      }`}
    >
      {!isUser && <span className="text-regular-12">{story.character}</span>}
      <span
        className={`h-fit rounded-xl py-2 px-4 items-center flex ${
          role === "system" ? "bg-primary" : "bg-gray-100"
        }`}
      >
        {story.init}
      </span>
    </div>
  );
}
