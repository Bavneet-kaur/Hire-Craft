import * as pdfParseModule from "pdf-parse";
import { generateReport, generateResumePdf } from "../services/ai.services";
import aiReportModel from "../models/ai.report.model";
import { Request, Response } from "express";


const pdfParse = (pdfParseModule as any).default ?? pdfParseModule;
type AuthRequest = Request & { user?: any };
/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
export async function generateReportController(req: AuthRequest, res: Response) {
    const resumeContent = await pdfParse(req.file!.buffer);
    const { selfDescription, jobDescription } = req.body;

    const reportByAi = await generateReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });

    const report = await aiReportModel.create({
        user: req.user!.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...reportByAi
    });

    res.status(201).json({
        message: "Interview report generated successfully.",
        report
    });
}

/**
 * @description Controller to get interview report by interviewId.
 */
export async function getReportByIdController(req: AuthRequest, res: Response) {
    const { interviewId } = req.params;

    const report = await aiReportModel.findOne({ _id: interviewId, user: req.user!.id });

    if (!report) {
        return res.status(404).json({
            message: "Interview report not found."
        });
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        report
    });
}

/**
 * @description Controller to get all interview reports of logged in user.
 */
export async function getAllReportsController(req: AuthRequest, res: Response) {
    const reports = await aiReportModel
        .find({ user: req.user!.id })
        .sort({ createdAt: -1 })
        .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        reports
    });
}

/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
export async function generateResumePdfController(req: AuthRequest, res: Response) {
    const { reportId } = req.params;

    const report = await aiReportModel.findById(reportId);

    if (!report) {
        return res.status(404).json({
            message: "Interview report not found."
        });
    }

    const { resume, jobDescription, selfDescription } = report;
    if (!resume || !jobDescription || !selfDescription) {
        return res.status(400).json({
            message: "Resume, job description and self description are required to generate PDF."
        });
    }
    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription });

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${reportId}.pdf`
    });

    res.send(pdfBuffer);
}