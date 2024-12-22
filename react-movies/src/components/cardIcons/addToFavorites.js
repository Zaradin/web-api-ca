import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import toast from "react-hot-toast";

const AddToFavoritesIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleAddToFavorites = (e) => {
        e.preventDefault();
        context.addToFavorites(movie);
        toast.success("Added to favorites successfully! 🎉", {
            duration: 2000,
        });
    };

    return (
        <IconButton
            aria-label="add to favorites"
            onClick={handleAddToFavorites}
        >
            <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToFavoritesIcon;
