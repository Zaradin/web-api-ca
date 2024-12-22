import React from "react";
import { getUpcoming } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToWatchIcon from "../components/cardIcons/addToWatch";

const UpComingPage = (props) => {
    const { data, error, isLoading, isError } = useQuery(
        "upComing",
        getUpcoming
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const upComingMovies = data.results;

    // Redundant, but necessary to avoid app crashing.
    const favorites = upComingMovies.filter((m) => m.favorite);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    const addToWatch = (movieId) => true;

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={upComingMovies}
            action={(movie) => {
                return <AddToWatchIcon movie={movie} />;
            }}
        />
    );
};
export default UpComingPage;
