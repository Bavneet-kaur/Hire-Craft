import { GoogleGenAI } from "@google/genai";
import * as z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
const AI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});
const reportSchema = z.object({
    matchScore: z.number().describe("A score between 0 & 100 indicating how well the candidate's profile matches the job description(JD)"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take, etc."),
    })).describe("Technical Questions that can be asked in the interbiew along with their intention & how to answer them."),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take, etc."),
    })).describe("Behavioral Questions that can be asked in the interbiew along with their intention & how to answer them."),
    skillGap: z.array(z.object({
        skill: z.string().describe("The skill which candidate is lacking -"),
        severity: z.enum(['low', 'medium', 'high']).describe("The severity of this skill gap, i.e. how important is this skill for the job and how it can impact the candidate's chances ")
    })).describe("List of skill gap in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("Day number of the preparation plan (e.g., Day 1, Day 2)"),
        focus: z.string().describe("Main focus topic for the day (e.g., React Basics, DSA - Arrays)"),
        tasks: z.array(z.string().describe("Specific task to complete")
        ).describe("List of tasks for the day"),
        resources: z.array(z.string().describe("Learning resource like URL, video, or article")).optional().describe("Helpful resources for the tasks"),
    })
    ).describe("Day-wise structured preparation plan for the candidate")
})
export const generateReport = async ({ }) => {
    console.log("generate report")
}
export const mainAI = async () => {
    const response = await AI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "What is interview ?",
    });
    console.log(response.text);
}

