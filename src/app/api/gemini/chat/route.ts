import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { chatHistory, newChat } = await request.json();
  const generator = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
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
    model: "gemini-2.5-flash",
    safetySettings: safetySettings,
  });
  const chat = model.startChat({
    history: chatHistory,
  });

  try {
    const result = await chat.sendMessage(newChat);
    return NextResponse.json({ response: result.response.text() });
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
