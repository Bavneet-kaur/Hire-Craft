import express from "express";
import { authUser } from "../middlewares/auth";
import {
    generateReportController,
    getReportByIdController,
    getAllReportsController,
    generateResumePdfController
} from "../controllers/report.controller";
import upload from "../middlewares/file"

const reportRouter = express.Router();

/**
 * @route POST /api/report/
 * @description generate new interview report on the basis of user self description, resume pdf and job description.
 * @access private
 */
reportRouter.post("/", authUser, upload.single("resume"), generateReportController);

/**
 * @route GET /api/interview/report/:reportId
 * @description get interview report by interviewId.
 * @access private
 */
reportRouter.get("/report/:reportId", authUser, getReportByIdController,);

/**
 * @route GET /api/report/
 * @description get all interview reports of logged in user.
 * @access private
 */
reportRouter.get("/", authUser, getAllReportsController);

/**
 * @route POST /api/report/resume/pdf/:reportId
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
reportRouter.post("/resume/pdf/:interviewReportId", authUser, generateResumePdfController);

export default reportRouter;