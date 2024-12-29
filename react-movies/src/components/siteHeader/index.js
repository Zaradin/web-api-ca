import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/authContext";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [authAnchorEl, setAuthAnchorEl] = useState(null); // State for auth menu
    const open = Boolean(anchorEl);
    const authOpen = Boolean(authAnchorEl);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();

    const { isAuthenticated, signout } = useContext(AuthContext); // Use AuthContext

    const menuOptions = [
        { label: "Home", path: "/" },
        { label: "Favorites", path: "/movies/favorites" },
        { label: "Upcoming", path: "/movies/upcoming" },
        { label: "Trending People", path: "/trending/people" },
        { label: "In Theatres", path: "/movies/nowshowing" },
        { label: "Search Movies", path: "/search" },
    ];

    // Handle menu item selection
    const handleMenuSelect = (pageURL) => {
        navigate(pageURL, { replace: true });
        setAnchorEl(null);
    };

    // Handle auth menu item selection
    const handleAuthMenuSelect = (pageURL) => {
        navigate(pageURL, { replace: true });
        setAuthAnchorEl(null);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Open the authentication menu
    const handleAuthMenu = (event) => {
        setAuthAnchorEl(event.currentTarget);
    };

    // Handle sign out
    const handleSignOut = () => {
        signout();
        toast.success("Successfully logged out 🎉", {
            duration: 2000,
        });
        navigate("/");
    };

    return (
        <>
            <AppBar position="fixed" color="secondary">
                <Toolbar>
                    <Typography variant="h4" sx={{ flexGrow: 1 }}>
                        TMDB Client
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        All you ever wanted to know about Movies!
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuOptions.map((opt) => (
                                    <MenuItem
                                        key={opt.label}
                                        onClick={() =>
                                            handleMenuSelect(opt.path)
                                        }
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    ) : (
                        <>
                            {menuOptions.map((opt) => (
                                <Button
                                    key={opt.label}
                                    color="inherit"
                                    onClick={() => handleMenuSelect(opt.path)}
                                >
                                    {opt.label}
                                </Button>
                            ))}
                        </>
                    )}
                    {/* Auth Button with Dropdown */}
                    <Button
                        color="inherit"
                        startIcon={<AccountCircle />}
                        onClick={handleAuthMenu}
                    >
                        Account
                    </Button>
                    <Menu
                        id="auth-menu"
                        anchorEl={authAnchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={authOpen}
                        onClose={() => setAuthAnchorEl(null)}
                    >
                        {isAuthenticated
                            ? [
                                  <MenuItem
                                      key="view-account"
                                      onClick={() =>
                                          handleAuthMenuSelect("/account")
                                      }
                                  >
                                      View Account
                                  </MenuItem>,
                                  <MenuItem
                                      key="sign-out"
                                      onClick={handleSignOut}
                                  >
                                      Sign Out
                                  </MenuItem>,
                              ]
                            : [
                                  <MenuItem
                                      key="sign-in"
                                      onClick={() =>
                                          handleAuthMenuSelect("/login")
                                      }
                                  >
                                      Sign In
                                  </MenuItem>,
                                  <MenuItem
                                      key="sign-up"
                                      onClick={() =>
                                          handleAuthMenuSelect("/signup")
                                      }
                                  >
                                      Sign Up
                                  </MenuItem>,
                              ]}
                    </Menu>
                </Toolbar>
            </AppBar>
            <Offset />
        </>
    );
};

export default SiteHeader;
