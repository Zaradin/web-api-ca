export const logIn = async (email, password) => {
    try {
        const response = await fetch("http://localhost:8080/api/users", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ email, password }), // Changed from username to email
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.msg || "Login failed");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token); // Store JWT
        return data;
    } catch (err) {
        console.error("Login error:", err.message);
        throw err;
    }
};

export const signUp = async (email, password, username) => {
    try {
        const response = await fetch(
            "http://localhost:8080/api/users?action=register",
            {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({ email, password, username }), // Send email, password, and username
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.msg || "Signup failed");
        }

        return await response.json();
    } catch (err) {
        console.error("Signup error:", err.message);
        throw err;
    }
};

export const logOut = () => {
    localStorage.removeItem("token");
    console.log("Logged out successfully");
};
