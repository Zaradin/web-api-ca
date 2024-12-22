import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import toast from "react-hot-toast";

const RemoveFromFavoritesIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleRemoveFromFavorites = (e) => {
        e.preventDefault();
        context.removeFromFavorites(movie);
        toast.success("Removed from favorites successfully! 🎉", {
            duration: 2000,
        });
    };
    return (
        <IconButton
            aria-label="remove from favorites"
            onClick={handleRemoveFromFavorites}
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFromFavoritesIcon;
