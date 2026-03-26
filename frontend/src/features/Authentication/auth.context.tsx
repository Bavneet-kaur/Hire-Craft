import { createContext, useState, useEffect } from "react";
import { getMe } from "./auth.api";


interface AuthContextType {
    user: any;
    setUser: (user: any) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchMe = async () => {
        try {
            const data = await getMe();
            setUser(data.user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setLoading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};