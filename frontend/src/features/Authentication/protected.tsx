import { Navigate } from "react-router";
import Loader from '../../components/loader';
import { useAuth } from "./useAuth";

function Protected({ children }: { children: React.ReactNode }) {
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <main>
                <Loader />
            </main>
        )
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default Protected;