const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/report`;

export interface Report {
    _id: string;
    title: string;
    matchScore: number;
    createdAt: string;
    jobDescription: string;
    selfDescription: string;
    content: string;
}

export interface GenerateReportPayload {
    jobDescription: string;
    selfDescription: string;
    resumeFile?: File;
}

/**
 * @description Generate interview report based on user profile and job description.
 */
export const generateReport = async (
    payload: GenerateReportPayload
): Promise<Report> => {
    const formData = new FormData();
    formData.append("jobDescription", payload.jobDescription);
    formData.append("selfDescription", payload.selfDescription);
    if (payload.resumeFile) {
        formData.append("resume", payload.resumeFile);
    }

    const res = await fetch(`${BASE_URL}/`, {
        method: "POST",
        credentials: "include",
        body: formData,
    });

    if (!res.ok) throw new Error("Failed to generate interview report");
    return res.json();
};

/**
 * @description Get a single interview report by ID.
 */
export const getReportById = async (
    interviewId: string
): Promise<Report> => {
    const res = await fetch(`${BASE_URL}/${interviewId}`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch interview report");
    return res.json();
};

/**
 * @description Get all interview reports for the logged-in user.
 */
export const getAllReports = async (): Promise<Report[]> => {
    const res = await fetch(`${BASE_URL}/`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch interview reports");
    return res.json();
};

/**
 * @description Generate and download a resume PDF for a given report ID.
 */
export const generateResumePdf = async (
    ReportId: string
): Promise<Blob> => {
    const res = await fetch(`${BASE_URL}/resume/pdf/${ReportId}`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to generate resume PDF");
    return res.blob();
};