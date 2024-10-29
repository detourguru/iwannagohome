import { GeminiChatHistoryType } from "@/type/common";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

interface useGeminiProps {
  chatHistory: GeminiChatHistoryType[];
  newChat: string;
}

export default function useGeminiChat({
  chatHistory,
  newChat,
}: useGeminiProps) {
  const askGemini = async () => {
    const generator = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY!
    );
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];
    const model = generator.getGenerativeModel({
      model: "gemini-1.5-pro",
      safetySettings: safetySettings,
    });
    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessage(newChat);
    const response = result.response.text();

    return response;
  };

  return { askGemini };
}
