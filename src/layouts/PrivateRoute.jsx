import { Navigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import Load from "@components/ui/Load";
import DashboardLayout from "@layouts/DashboardLayout";

const PrivateRoute = () => {
    const { auth, loading } = useAuth();

    // if (loading) {
    //     return null;
    // }

    if (auth) {
        return <DashboardLayout />;
    }

    if (!auth && !loading) {
        return <Navigate to={"/"} />;
    }
};

export default PrivateRoute;
