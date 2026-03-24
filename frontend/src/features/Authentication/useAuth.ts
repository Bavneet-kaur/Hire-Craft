import { useContext } from "react";
import { AuthContext } from "./auth.context";
import { loginUser, registerUser, logoutUser, getMe } from "./auth.api";

interface LoginInput {
    email: string;
    password: string;
}
interface RegisterInput {
    name: string;
    email: string;
    password: string;
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    const { user, setUser, loading, setLoading } = context;
    const handleRegister = async ({ name, email, password }: RegisterInput) => {
        try {
            setLoading(true);
            const data = await registerUser({ name, email, password });
            setUser(data.user);
            return data;
        } catch (error: any) {
            throw new Error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async ({ email, password }: LoginInput) => {
        try {
            setLoading(true);
            const data = await loginUser({ email, password });
            setUser(data.user);
            return data;
        } catch (error: any) {
            throw new Error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logoutUser();
            setUser(null);
        } catch (error: any) {
            throw new Error(error.message || "Logout failed");
        } finally {
            setLoading(false);
        }
    };
    const fetchMe = async () => {
        try {
            setLoading(true);
            const data = await getMe();
            setUser(data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout,
        fetchMe,
    };
}