import React, { useState, createContext, useEffect } from "react";
import { logIn, signUp } from "../auth/auth.js";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const existingToken = localStorage.getItem("token"); // Get token from localStorage
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(existingToken);
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);

    // Function to put JWT token in local storage.
    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    };

    const authenticate = async (username, password) => {
        const result = await logIn(username, password);
        if (result.token) {
            setToken(result.token);
            setIsAuthenticated(true);
            setUserName(username);
        }
    };

    const register = async (username, password) => {
        const result = await signUp(username, password);
        return result.code === 201 ? true : false;
    };

    const signout = () => {
        localStorage.removeItem("token");
        setAuthToken(null);
        setIsAuthenticated(false);
        setUserName("");
    };

    useEffect(() => {
        if (existingToken) {
            setIsAuthenticated(true);
            setAuthToken(existingToken);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);
    }, [existingToken]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                loading,
                authenticate,
                register,
                signout,
                userName,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
