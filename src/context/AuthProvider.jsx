import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const getAuth = async () => {
            try {
                const { data } = await axios.get("/user/auth", {
                    withCredentials: true,
                });
                setAuth(data);
            } catch (error) {
                setAuth(null);
            } finally {
                setLoading(false);
            }
        };

        getAuth();
    }, [navigate]);

    const logout = async () => {
        await axios.get("/user/logout", { withCredentials: true });

        setAuth(null);
    };

    return (
        <AuthContext.Provider
            value={{
                loading,
                auth,
                setAuth,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
