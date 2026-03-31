import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const AI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const reportSchema = z.object({
    matchScore: z.number(),
    technicalQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string(),
    })),
    behavioralQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string(),
    })),
    skillGap: z.array(z.object({
        skill: z.string(),
        severity: z.enum(['low', 'medium', 'high']),
    })),
    preparationPlan: z.array(z.object({
        day: z.number(),
        focus: z.string(),
        tasks: z.array(z.string()),
        resources: z.array(z.string()).optional(),
    })),
});
const reportJsonSchema = {
    type: "object",
    properties: {
        matchScore: {
            type: "number",
            description: "A score between 0 & 100 indicating how well the candidate's profile matches the job description"
        },
        technicalQuestions: {
            type: "array",
            description: "Technical questions that can be asked in the interview along with their intention & how to answer them",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The technical question that can be asked in the interview" },
                    intention: { type: "string", description: "The intention of the interviewer behind asking this question" },
                    answer: { type: "string", description: "How to answer this question, what points to cover, what approach to take" },
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: "array",
            description: "Behavioral questions that can be asked in the interview along with their intention & how to answer them",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The behavioral question that can be asked in the interview" },
                    intention: { type: "string", description: "The intention of the interviewer behind asking this question" },
                    answer: { type: "string", description: "How to answer this question, what points to cover, what approach to take" },
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGap: {
            type: "array",
            description: "List of skill gaps in the candidate's profile along with their severity",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string", description: "The skill which the candidate is lacking" },
                    severity: { type: "string", enum: ["low", "medium", "high"], description: "How important is this skill for the job" },
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: "array",
            description: "Day-wise structured preparation plan for the candidate",
            items: {
                type: "object",
                properties: {
                    day: { type: "number", description: "Day number of the preparation plan" },
                    focus: { type: "string", description: "Main focus topic for the day" },
                    tasks: {
                        type: "array",
                        description: "List of tasks for the day",
                        items: { type: "string", description: "Specific task to complete" }
                    },
                    resources: {
                        type: "array",
                        description: "Helpful resources for the tasks",
                        items: { type: "string", description: "Learning resource like URL, video, or article" }
                    },
                },
                required: ["day", "focus", "tasks"]
            }
        },
    },
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGap", "preparationPlan"]
};

export type ReportType = z.infer<typeof reportSchema>;

export const generateReport = async ({
    resume,
    selfDescription,
    jobDescription
}: {
    resume: string;
    selfDescription: string;
    jobDescription: string;
}): Promise<ReportType> => {

    const prompt = `Generate an interview preparation report for a candidate with the following details:
        Resume: ${resume}
        Self Description: ${selfDescription}
        Job Description: ${jobDescription}
    `;

    const response = await AI.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: reportJsonSchema,
        },
    });

    const parsed = reportSchema.parse(JSON.parse(response.text!));
    return parsed;
};