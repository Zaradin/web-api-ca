import React, { useState } from "react";
import { logIn } from "../../auth/auth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate("/");
            toast.success("Logged in successfully! 🎉", {
                duration: 2000,
            });
        } catch (error) {
            console.error("Login failed:", error.message);
            setError(error.message);
            toast.error("Login failed please try again! ", {
                duration: 2000,
            });
        }
    };

    const handleSignUpRedirect = () => {
        navigate("/signup");
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, mt: 5 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                >
                    Sign In
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    {error && (
                        <Typography
                            color="error"
                            variant="body1"
                            align="center"
                            sx={{ mb: 2 }}
                        >
                            {error}
                        </Typography>
                    )}
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        Sign In
                    </Button>
                    <Divider sx={{ my: 2 }}>Or</Divider>
                    <Button
                        onClick={handleSignUpRedirect}
                        variant="outlined"
                        color="secondary"
                        fullWidth
                    >
                        Don’t have an account? Sign Up
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignIn;
