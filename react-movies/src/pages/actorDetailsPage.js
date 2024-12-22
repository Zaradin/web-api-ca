import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails } from "../api/tmdb-api";
import { getActorMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import ActorDetails from "../components/actorDetails";

const ActorPage = () => {
    const { id } = useParams();

    const {
        data: actor,
        error,
        isLoading,
        isError,
    } = useQuery(["actor", { id }], getActorDetails);

    const { data: credits, isLoading: creditsLoading } = useQuery(
        ["actorCredits", { id }],
        getActorMovieCredits
    );

    if (isLoading || creditsLoading) {
        return <Spinner />;
    }

    if (isError) return <Typography variant="h5">{error.message}</Typography>;

    return (
        <>
            <ActorDetails actor={actor} credits={credits} />
        </>
    );
};

export default ActorPage;
