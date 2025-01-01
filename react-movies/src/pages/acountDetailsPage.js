import React, { useEffect, useState, useContext } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { MoviesContext } from "../contexts/moviesContext";
import { ThemeContext } from "../contexts/themeContext";
import { getMovie } from "../api/movies-api";
import { jwtDecode } from "jwt-decode";
import { getUserReviews } from "../api/movies-api";

const AccountDetailsPage = () => {
    const [user, setUser] = useState(null);
    const { favorites } = useContext(MoviesContext);
    const [movieDetails, setMovieDetails] = useState([]); // For displaying favorite movies
    const [userReviews, setUserReviews] = useState([]);
    const { mode, toggleTheme } = useContext(ThemeContext);
    const [movieDetailsMap, setMovieDetailsMap] = useState({}); // Map of movie details for reviews

    const ratings = [
        {
            value: 5,
            label: "Excellent",
        },
        {
            value: 4,
            label: "Good",
        },
        {
            value: 3,
            label: "Average",
        },
        {
            value: 2,
            label: "Poor",
        },
        {
            value: 0,
            label: "Terrible",
        },
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken);
            } catch (error) {
                console.error("Token decoding error:", error);
                setUser(null);
            }
        }
    }, []);

    useEffect(() => {
        if (favorites.length > 0) {
            Promise.all(
                favorites.map((movieId) =>
                    getMovie({ queryKey: [null, { id: movieId }] })
                )
            )
                .then((movies) => setMovieDetails(movies))
                .catch((error) =>
                    console.error("Error fetching movie details: ", error)
                );
        }
    }, [favorites]);

    useEffect(() => {
        // Fetch user reviews
        const fetchReviews = async () => {
            try {
                const reviews = await getUserReviews();
                setUserReviews(reviews);

                // Fetch movie details for each review's tmdb_id
                const movieIds = reviews.map((review) => review.tmdb_id);
                const uniqueMovieIds = [...new Set(movieIds)]; // Remove duplicates

                const movies = await Promise.all(
                    uniqueMovieIds.map((movieId) =>
                        getMovie({ queryKey: [null, { id: movieId }] })
                    )
                );

                const movieDetailsMap = movies.reduce((map, movie) => {
                    map[movie.id] = movie;
                    return map;
                }, {});

                setMovieDetailsMap(movieDetailsMap);
            } catch (error) {
                console.error("Error fetching user reviews:", error.message);
            }
        };

        fetchReviews();
    }, []);

    const userNameInitial = user?.username?.[0];

    return (
        <Container maxWidth="lg">
            <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                    <Paper
                        elevation={3}
                        sx={{ padding: 3, textAlign: "center" }}
                    >
                        <Box display="flex" justifyContent="center" mb={2}>
                            <Avatar
                                sx={{
                                    bgcolor: "primary.main",
                                    width: 100,
                                    height: 100,
                                }}
                            >
                                {userNameInitial}
                            </Avatar>
                        </Box>
                        <Typography variant="h6">
                            {user?.username || "No Username"}
                        </Typography>
                        <Typography variant="body1">
                            {user?.email || "No Email"}
                        </Typography>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={mode === "dark"}
                                    onChange={toggleTheme}
                                />
                            }
                            label={mode === "dark" ? "Dark Mode" : "Light Mode"}
                            sx={{ mt: 2 }}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={8}>
                    {/* Favorites Section */}
                    <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Your Favorite Movies
                        </Typography>
                        <Box>
                            {favorites.length === 0 ? (
                                <Typography>No favorites yet!</Typography>
                            ) : (
                                <Grid container spacing={2}>
                                    {movieDetails.map((movie) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            key={movie.id}
                                        >
                                            <Card>
                                                <CardMedia
                                                    component="img"
                                                    height="300"
                                                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                    alt={movie.title}
                                                    sx={{ height: 300 }}
                                                />
                                                <CardContent>
                                                    <Typography
                                                        variant="h7"
                                                        component="div"
                                                    >
                                                        {movie.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {movie.release_date
                                                            ? movie.release_date.slice(
                                                                  0,
                                                                  4
                                                              )
                                                            : "N/A"}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Box>
                    </Paper>

                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Typography variant="h5">Your Reviews</Typography>
                        <Box>
                            {userReviews.length === 0 ? (
                                <Typography>No reviews yet!</Typography>
                            ) : (
                                userReviews.map((review) => {
                                    const movie =
                                        movieDetailsMap[review.tmdb_id];
                                    const ratingLabel =
                                        ratings.find(
                                            (rating) =>
                                                rating.value === review.rating
                                        )?.label || "No rating";
                                    return (
                                        <Paper
                                            key={review._id}
                                            elevation={2}
                                            sx={{
                                                padding: 2,
                                                marginBottom: 2,
                                            }}
                                        >
                                            <Typography variant="h6">
                                                {movie
                                                    ? movie.title
                                                    : "Movie not found"}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {movie
                                                    ? `${movie.release_date.slice(
                                                          0,
                                                          4
                                                      )} | Your Rating: ${ratingLabel}`
                                                    : "No movie details available"}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Reviewed by:{" "}
                                                {review.author || "Anonymous"}
                                            </Typography>
                                            <Typography variant="body1">
                                                {review.content}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Posted on:{" "}
                                                {new Date(
                                                    review.date
                                                ).toLocaleDateString()}
                                            </Typography>
                                        </Paper>
                                    );
                                })
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AccountDetailsPage;
