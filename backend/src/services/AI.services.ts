import { GoogleGenAI } from "@google/genai";
import * as z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
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

