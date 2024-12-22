import React from "react";
import { getTrendingPeople } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import TrendingPageTemplate from "../components/templateTrendingPeople";
import Typography from "@mui/material/Typography";

const TrendingPeoplePage = (props) => {
    const { data, error, isLoading, isError } = useQuery(
        "trendingPeople",
        getTrendingPeople
    );

    if (isLoading) return <Spinner />;
    if (isError) return <h1>{error.message}</h1>;

    return (
        <>
            <Typography
                variant="h3"
                component="h3"
                sx={{ mt: 4, textAlign: "center" }}
            >
                Trending People
            </Typography>
            <TrendingPageTemplate
                people={data.results}
                title="Trending People"
            />
        </>
    );
};
export default TrendingPeoplePage;
