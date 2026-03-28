import { GoogleGenAI } from "@google/genai";

const AI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

export const mainAI = async () => {
    const response = await AI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "What is interview ?",
    });
    console.log(response.text);
}

