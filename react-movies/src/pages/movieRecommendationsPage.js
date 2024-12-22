import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovieRecommendations } from "../api/tmdb-api";
import { getMovie } from "../api/tmdb-api"; // Import the getMovie API function
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const MovieRecommendationsPage = () => {
    const { movieId } = useParams();

    // movie name using the movie id
    const {
        data: movieData,
        error: movieError,
        isLoading: isMovieLoading,
    } = useQuery(["movie", movieId], () =>
        getMovie({ queryKey: ["movie", { id: movieId }] })
    );

    // movie recommendations using the movie id
    const { data, error, isLoading, isError } = useQuery(
        ["recommendations", movieId],
        () => getMovieRecommendations(movieId)
    );

    if (isLoading || isMovieLoading) {
        return <Spinner />;
    }

    if (isError || movieError) {
        return <h1>{error.message || movieError.message}</h1>;
    }

    const recommendations = data.results;
    const movieName = movieData.title || movieData.name;

    return (
        <PageTemplate
            title={`Recommended Movies like ${movieName}`}
            movies={recommendations}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie} />;
            }}
        />
    );
};

export default MovieRecommendationsPage;
