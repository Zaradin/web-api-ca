import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCast } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
//import useMovie from "../hooks/useMovie";

const MoviePage = (props) => {
    const { id } = useParams();

    const {
        data: movie,
        error,
        isLoading,
        isError,
    } = useQuery(["movie", { id: id }], getMovie);

    // Fetch cast details
    const {
        data: castData,
        error: castError,
        isLoading: isCastLoading,
        isError: isCastError,
    } = useQuery(["movieCast", { id }], getMovieCast);

    if (isLoading || isCastLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    if (isCastError) {
        return <h1>{castError.message}</h1>;
    }

    // filter the cast data down to just the actors as it contains much more data, that we don't need
    const actors = castData?.cast
        ?.filter((member) => member.known_for_department === "Acting")
        .sort((a, b) => b.popularity - a.popularity) // Sort by popularity (descending)
        .slice(0, 15);
    return (
        <>
            {movie ? (
                <>
                    <PageTemplate movie={movie}>
                        <MovieDetails movie={movie} cast={actors} />
                    </PageTemplate>
                </>
            ) : (
                <p>Waiting for movie details</p>
            )}
        </>
    );
};

export default MoviePage;
