
import { GoogleGenAI, Type } from "@google/genai";
import { Movie } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getMovieAIInsight(movieTitle: string): Promise<{ aiScore: number, insight: string }> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a critical AI analysis for the movie "${movieTitle}". 
      Return a score (0-100) based on cinematic quality and a 1-sentence punchy insight.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            aiScore: { type: Type.NUMBER },
            insight: { type: Type.STRING }
          },
          required: ["aiScore", "insight"]
        }
      }
    });

    const data = JSON.parse(response.text.trim());
    return data;
  } catch (error) {
    console.error("Gemini Error:", error);
    return { aiScore: 85, insight: "An impressive cinematic journey worth exploring." };
  }
}

export async function getRecommendedMovies(prompt: string): Promise<string[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Given the mood "${prompt}", recommend 5 modern popular movie titles.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text.trim());
  } catch (error) {
    return ["Inception", "Arrival", "Parasite", "The Matrix", "Mad Max: Fury Road"];
  }
}
