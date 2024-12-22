import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const signUp = async (email, password, username) => {
    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await updateProfile(userCredential.user, {
            displayName: username,
        });

        console.log("User signed up with username:", username);
    } catch (error) {
        console.error("Sign-up error:", error.message);
        throw new Error(error.message);
    }
};

export const logIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
};

export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error.message);
    }
};
