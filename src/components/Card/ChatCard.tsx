import { STORY_DATA } from "@/constants/contents";

interface ChatCardProps {
  storyId: string;
  role: string;
}
export default function ChatCard({ storyId, role }: ChatCardProps) {
  const currentStory = STORY_DATA.filter((data) => data.id === storyId)[0];
  const isUser = role !== "system" ? true : false;
  return (
    <div
      className={`my-4 w-fit flex flex-col gap-1 ${
        isUser ? "ml-auto" : "justify-start"
      }`}
    >
      {!isUser && (
        <span className="text-regular-12">{currentStory.character}</span>
      )}
      <span
        className={`h-fit rounded-xl py-2 px-4 items-center flex ${
          role === "system" ? "bg-primary" : "bg-gray-100"
        }`}
      >
        {currentStory.initChat}
      </span>
    </div>
  );
}
