import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import MovieList from "../movieList";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";
import Grid from "@mui/material/Grid2";
import img from "../../images/film-poster-placeholder.png";

const ActorDetails = ({ actor, credits }) => {
    return (
        <>
            <Card sx={{ maxWidth: 600, margin: "auto", mt: 3 }}>
                <CardMedia
                    component="img"
                    image={
                        actor.profile_path
                            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                            : img
                    }
                    alt={actor.name}
                />
                <CardContent>
                    <Typography variant="h4">{actor.name}</Typography>
                    <Typography variant="body1">
                        Born: {actor.birthday}
                    </Typography>
                    <Typography variant="body1">
                        Place of Birth: {actor.place_of_birth}
                    </Typography>
                    <Typography variant="body1">{actor.biography}</Typography>
                </CardContent>
            </Card>

            <Typography
                variant="h3"
                component="h3"
                sx={{ mt: 4, textAlign: "center" }}
            >
                Movies Starring {actor.name}
            </Typography>

            {/* Render MovieList without filter card */}
            <Grid container spacing={2} sx={{ padding: "20px" }}>
                <MovieList
                    movies={credits.cast}
                    action={(movie) => {
                        return <AddToFavoritesIcon movie={movie} />;
                    }}
                />
            </Grid>
        </>
    );
};

export default ActorDetails;
