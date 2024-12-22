import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import toast from "react-hot-toast";

const AddToWatchIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleAddToWatch = (e) => {
        e.preventDefault();
        context.addToWatch(movie);
        toast.success("Added to watch successfully! 🎉", {
            duration: 2000,
        });
    };

    return (
        <IconButton aria-label="add to favorites" onClick={handleAddToWatch}>
            <PlaylistAddIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToWatchIcon;
