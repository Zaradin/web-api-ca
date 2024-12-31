import React, { useContext, useState } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import toast from "react-hot-toast";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    textAlign: "center",
};

const AddToFavoritesIcon = ({ movie }) => {
    const context = useContext(MoviesContext);
    const { isAuthenticated } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleAddToFavorites = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setOpen(true);
            return;
        }
        context.addToFavorites(movie);
        toast.success("Added to favorites successfully! 🎉", {
            duration: 2000,
        });
    };

    return (
        <>
            <IconButton
                aria-label="add to favorites"
                onClick={handleAddToFavorites}
            >
                <FavoriteIcon color="primary" fontSize="large" />
            </IconButton>

            {/* Modal */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        You need to be logged in to add favorites. Login or
                        Create an Account!
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 2 }}
                        onClick={() => {
                            setOpen(false);
                            navigate("/login");
                        }}
                    >
                        Log In
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            setOpen(false);
                            navigate("/signup");
                        }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default AddToFavoritesIcon;
