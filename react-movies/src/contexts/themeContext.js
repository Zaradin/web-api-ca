import React, { createContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState("light");

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === "dark"
                        ? {
                              background: {
                                  default: "#121212",
                                  paper: "#1d1d1d",
                                  TextField: "#1d1d1d",
                              },
                              text: {
                                  primary: "#ffffff",
                                  secondary: "#aaaaaa",
                              },
                          }
                        : {}),
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: {
                            body: {
                                backgroundColor:
                                    mode === "dark" ? "#121212" : "#ffffff", // Keep light theme as is
                                color: mode === "dark" ? "#ffffff" : "#000000", // Only change text color in dark mode
                            },
                        },
                    },
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
