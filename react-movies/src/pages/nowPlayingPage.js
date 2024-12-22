import React, { useState } from "react";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const NowPlayingPage = () => {
    const [page, setPage] = useState(1);

    const { data, error, isLoading, isError } = useQuery(
        ["nowplaying", page],
        () => getNowPlayingMovies(page),
        { keepPreviousData: true }
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.results;

    // Redundant, but necessary to avoid app crashing.
    const favorites = movies.filter((m) => m.favorite);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    // eslint-disable-next-line no-unused-vars
    const addToFavorites = (movieId) => true;

    // Handle pagination change
    const handlePageChange = (event, value) => {
        setPage(value); 
    };

    return (
        <>
            <PageTemplate
                title="Now Playing in Theatres"
                movies={movies}
                action={(movie) => {
                    return <AddToFavoritesIcon movie={movie} />;
                }}
            />
            <Box // Used MUI box to make the Pagination stand out more
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 3,
                    border: "1px solid #ccc",
                    borderRadius: 2, // Rounded corners
                    backgroundColor: "#f9f9f9",
                }}
            >
                <Pagination
                    count={data.total_pages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                />
            </Box>
        </>
    );
};

export default NowPlayingPage;
