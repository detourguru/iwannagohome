import { GeminiChatHistoryType } from "@/type/common";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

    const model = generator.getGenerativeModel({ model: "gemini-1.0-pro" });
    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessage(newChat);
    const response = result.response.text();

    return response;
  };

  return { askGemini };
}
