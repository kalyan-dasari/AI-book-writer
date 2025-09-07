
import { GoogleGenAI, type Chat, Type, GenerateContentResponse } from '@google/genai';
import { type Chapter } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const chapterSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: 'The title of this chapter.',
    },
    content: {
      type: Type.STRING,
      description: 'The full text content of this chapter, written in a narrative style. It should be at least a few paragraphs long.',
    },
  },
  required: ['title', 'content'],
};

const parseChapterFromResponse = (response: GenerateContentResponse): Chapter => {
    try {
        const jsonString = response.text;
        // Sometimes the model returns the JSON wrapped in ```json ... ```
        const cleanJsonString = jsonString.replace(/^```json\s*|```$/g, '').trim();
        const parsed = JSON.parse(cleanJsonString);
        if (parsed.title && parsed.content) {
            return parsed as Chapter;
        } else {
            throw new Error('Parsed JSON does not match Chapter structure.');
        }
    } catch (error) {
        console.error("Failed to parse chapter JSON:", error);
        throw new Error("The AI returned an invalid response format. Please try again.");
    }
};

export const startBook = async (prompt: string): Promise<{ chat: Chat; firstChapter: Chapter }> => {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      responseMimeType: 'application/json',
      responseSchema: chapterSchema,
    },
  });

  const initialPrompt = `You are a master storyteller. Your task is to write the first chapter of a book based on the user's description. The chapter must have a compelling title and engaging content that sets up the story.

  User's book description: "${prompt}"

  Generate the first chapter now.`;
  
  const response = await chat.sendMessage({ message: initialPrompt });
  const firstChapter = parseChapterFromResponse(response);

  return { chat, firstChapter };
};

export const continueBook = async (chat: Chat): Promise<Chapter> => {
  const continuePrompt = `Continue the story from the previous chapter. Write the next chapter, ensuring it logically follows the established plot and characters. Give it a suitable title.`;

  const response = await chat.sendMessage({ message: continuePrompt });
  const nextChapter = parseChapterFromResponse(response);

  return nextChapter;
};
