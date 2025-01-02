import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";

const MovieReviewPage = (props) => {
    let location = useLocation();
    const { movie, author, review } = location.state;
    console.log(author);
    return (
        <PageTemplate movie={movie}>
            <MovieReview author={author} review={review} />
        </PageTemplate>
    );
};

export default MovieReviewPage;
