import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded = jwtDecode(token);
        if (!decoded || Date.now() >= decoded.exp * 1000) {
            throw new Error("Token is invalid or expired");
        }

        return children;
    } catch (error) {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
