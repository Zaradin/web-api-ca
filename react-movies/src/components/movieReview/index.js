import React from "react";
import Typography from "@mui/material/Typography";

const MovieReview = ({ author, review }) => {
    return (
        <>
            <Typography variant="h5" component="h3">
                Review By: {review.author || author}
            </Typography>

            <Typography variant="h6" component="p">
                {review.content || review}
            </Typography>
        </>
    );
};
export default MovieReview;
