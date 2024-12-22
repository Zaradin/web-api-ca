import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import ActorCard from "../actorCard";
import Grid2 from "@mui/material/Grid2";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie, cast }) => {
    // Don't miss this!
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>
            <Typography variant="h6" component="p">
                {movie.overview}
            </Typography>
            <Paper component="ul" sx={{ ...root }}>
                <li>
                    <Chip label="Genres" sx={{ ...chip }} color="primary" />
                </li>
                {movie.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} sx={{ ...chip }} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={{ ...root }}>
                <Chip
                    icon={<AccessTimeIcon />}
                    label={`${movie.runtime} min.`}
                />
                <Chip
                    icon={<MonetizationIcon />}
                    label={`${movie.revenue.toLocaleString()}`}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${movie.vote_average} (${movie.vote_count}`}
                />
                <Chip label={`Released: ${movie.release_date}`} />
            </Paper>
            <Paper component="ul" sx={{ ...root }}>
                <li>
                    <Chip label="Production" sx={{ ...chip }} color="primary" />
                </li>
                {movie.production_countries.map((country) => (
                    <li key={country.name}>
                        <Chip label={country.name} sx={{ ...chip }} />
                    </li>
                ))}
            </Paper>

            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/movie/${movie.id}/recommendations`)} // Navigate to recommendations page
                sx={{ marginTop: "1em" }}
            >
                View Recommendations That are Similar
            </Button>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={{
                    position: "fixed",
                    bottom: "1em",
                    right: "1em",
                }}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Typography
                variant="h6"
                component="h4"
                style={{ marginTop: "1em" }}
            >
                Cast
            </Typography>
            <Grid2 container spacing={2}>
                {cast.map((actor) => (
                    <Grid2 item xs={6} sm={4} md={3} lg={2} key={actor.id}>
                        <Link
                            to={`/actor/${actor.id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <ActorCard actor={actor} />
                        </Link>
                    </Grid2>
                ))}
            </Grid2>
            <Drawer
                anchor="top"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <MovieReviews movie={movie} />
            </Drawer>
        </>
    );
};
export default MovieDetails;
