import { UUID } from "crypto";

export type BaseStoryType = {
  id: number;
  story_id: string;
  story: string;
  personality: string;
  story_info: {
    alt: string;
    title: string;
    difficulty: string;
    character: string;
    init: string;
    image_src: string;
  };
};

export type GeminiChatHistoryType = {
  role: string;
  parts: { text: string }[];
  hidden?: boolean;
};

export type ChatType = {
  chat_id: UUID;
  chat_history: GeminiChatHistoryType[];
  story_id: "";
};
