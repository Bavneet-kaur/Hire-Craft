import { useContext, useEffect } from "react";
import { ReportContext } from "../report.context";
import { useParams } from "react-router-dom";
import {
    getAllReports,
    generateReport,
    getReportById,
    generateResumePdf,
} from "../service/report.api";

export const useReport = () => {
    const context = useContext(ReportContext);
    const { reportId } = useParams<{ reportId: string }>();

    if (!context) {
        throw new Error("useReport must be used within ReportProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const createReport = async ({
        jobDescription,
        selfDescription,
        resumeFile,
    }: {
        jobDescription: string;
        selfDescription: string;
        resumeFile?: File;
    }) => {
        setLoading(true);
        try {
            const data = await generateReport({ jobDescription, selfDescription, resumeFile });
            setReport(data as any);
            return data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchReportById = async (id: string) => {
        setLoading(true);
        try {
            const data = await getReportById(id);
            setReport(data as any);
            return data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchReports = async () => {
        setLoading(true);
        try {
            const data = await getAllReports();
            setReports(data);
            return data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const downloadResumePdf = async (id: string) => {
        setLoading(true);
        try {
            const blob = await generateResumePdf(id);

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `resume_${id}.pdf`;
            link.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (reportId) {
            fetchReportById(reportId);
        } else {
            fetchReports();
        }
    }, [reportId]);

    return {
        loading,
        report,
        reports,
        createReport,
        fetchReportById,
        fetchReports,
        downloadResumePdf,
    };
};