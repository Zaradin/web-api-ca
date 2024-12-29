import React, { useState, createContext } from "react";
import { logIn, signUp } from "../auth/auth.js";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const existingToken = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(existingToken);
    const [userName, setUserName] = useState("");

    //Function to put JWT token in local storage.
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
        console.log(result.code);
        return result.code === 201 ? true : false;
    };

    const signout = () => {
        setTimeout(() => setIsAuthenticated(false), 100);
        // localStorage.removeItem("token");
        // setAuthToken(null);
        // setIsAuthenticated(false);
        // setUserName("");
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
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
