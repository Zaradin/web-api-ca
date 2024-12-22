import React from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../spinner";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth"; // Optional hook for easier Firebase auth state handling

const ProtectedRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth); // Hook that gives us the current user and loading status

    if (loading) {
        return <Spinner />;
    }

    // If no authenticated user redirect to the login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If authenticated, render the children (protected content)
    return children;
};

export default ProtectedRoute;
