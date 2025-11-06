
import { GoogleGenAI } from "@google/genai";

// Create the GoogleGenAI instance.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChatReply = async (prompt: string): Promise<string> => {
  try {
    // Generate content with the specified model and prompt.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a user in a social chat app. Generate a short, casual, friendly, and sometimes flirty or funny reply to the following message. Keep it brief, like a real chat message. Message: "${prompt}"`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating chat reply:", error);
    return "Sorry, I'm having trouble thinking of a reply right now.";
  }
};