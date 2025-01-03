import React, { useState, useEffect } from "react";
import { addFavorite, getFavorites } from "../api/movies-api";
import toast from "react-hot-toast";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState([]);
    const [toWatch, setToWatch] = useState([]);
    const [myReviews, setMyReviews] = useState({});

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await getFavorites();
                setFavorites(data.movieIds || []); // Assuming `movieIds` is the array in your schema
            } catch (error) {
                console.error("Failed to fetch favorites:", error);
            }
        };

        fetchFavorites();
    }, []);

    const addToFavorites = async (movie) => {
        try {
            // Call the API to add the favorite
            const response = await addFavorite(movie.id);

            if (!favorites.includes(movie.id)) {
                setFavorites((prev) => [...prev, movie.id]); // Update context state
            }
        } catch (error) {
            console.error("Failed to add favorite:", error);
            toast.error("Failed to add to favorites. Please try again.");
        }
    };

    const addToWatch = (movie) => {
        let newToWatch = [];
        if (!toWatch.includes(movie.id)) {
            newToWatch = [...toWatch, movie.id];
        } else {
            newToWatch = [...toWatch];
        }
        setToWatch(newToWatch);
        console.log(toWatch);
    };

    const addReview = (movie, review) => {
        setMyReviews({ ...myReviews, [movie.id]: review });
    };
    //console.log(myReviews);

    // We will use this function in the next step
    const removeFromFavorites = (movie) => {
        setFavorites(favorites.filter((mId) => mId !== movie.id));
    };

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                addToFavorites,
                addToWatch,
                removeFromFavorites,
                addReview,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
