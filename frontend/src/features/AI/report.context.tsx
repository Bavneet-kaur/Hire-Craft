import { createContext, useState } from "react";

interface ReportContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  report: null;
  setReport: (report: null) => void;
  reports: unknown[];
  setReports: (reports: unknown[]) => void;
}

export const ReportContext = createContext<ReportContextType | null>(null)

export const ReportProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState<unknown[]>([]);
  return (
    <ReportContext.Provider value={{ loading, setLoading, report, setReport, reports, setReports }}>
      {children}
    </ReportContext.Provider>
  );
};

