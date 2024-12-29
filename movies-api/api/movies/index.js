import movieModel from "./movieModel";
import asyncHandler from "express-async-handler";
import express from "express";
import {
    getUpcomingMovies,
    getMovieGenres,
    getMovies,
    getMovie,
    getTrendingPeople,
    getNowPlayingMovies,
    getMovieCast,
    getActorDetails,
    getActorMovieCredits,
    getMovieByTitle,
    getMovieRecommendations,
} from "../tmdb-api";

const router = express.Router();

router.get(
    "/movies",
    asyncHandler(async (req, res) => {
        const movies = await getMovies();
        res.status(200).json(movies);
    })
);

router.get(
    "/tmdb/movie/:id",
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const movie = await getMovie(id);
        res.status(200).json(movie);
    })
);

// Get movie details
router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const movie = await movieModel.findByMovieDBId(id);
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({
                message: "The movie you requested could not be found.",
                status_code: 404,
            });
        }
    })
);

router.get(
    "/tmdb/upcoming",
    asyncHandler(async (req, res) => {
        const upcomingMovies = await getUpcomingMovies();
        res.status(200).json(upcomingMovies);
    })
);

router.get(
    "/tmdb/trendingpeople",
    asyncHandler(async (req, res) => {
        const trendingPeople = await getTrendingPeople();
        res.status(200).json(trendingPeople);
    })
);

router.get(
    "/tmdb/nowplaying",
    asyncHandler(async (req, res) => {
        const { page = 1 } = req.query;
        const trendingPeople = await getNowPlayingMovies(page);
        res.status(200).json(trendingPeople);
    })
);

router.get(
    "/tmdb/genre",
    asyncHandler(async (req, res) => {
        const movieGenres = await getMovieGenres();
        res.status(200).json(movieGenres);
    })
);

router.get(
    "/tmdb/getmoviecast/:id",
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const movieCast = await getMovieCast(id);
        res.status(200).json(movieCast);
    })
);

router.get(
    "/tmdb/getactordetails/:id",
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const actorDetails = await getActorDetails(id);
        res.status(200).json(actorDetails);
    })
);

router.get(
    "/tmdb/getactormoviecredits/:id",
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const actorMovieCredits = await getActorMovieCredits(id);
        res.status(200).json(actorMovieCredits);
    })
);

router.get(
    "/tmdb/getmoviebytitle/:title",
    asyncHandler(async (req, res) => {
        const title = req.params.title;
        const movie = await getMovieByTitle(title);
        res.status(200).json(movie);
    })
);

router.get(
    "/tmdb/movie/:id/recommendations",
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const movies = await getMovieRecommendations(id);
        res.status(200).json(movies);
    })
);

router.post(
    "/tmdb/movie/:id/reviews",
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { author, content, rating } = req.body;

        try {
            const movieId = mongoose.Types.ObjectId(id);
            const movie = await movieModel.findOne({ _id: movieId });

            if (!movie) {
                res.status(404).json({ message: "Movie not found" });
                return;
            }

            // Create a new review object
            const newReview = {
                author: author,
                content: content,
                rating: rating,
            };

            // Add the review to the movie's reviews array
            movie.reviews.push(newReview);
            await movie.save();
            res.status(201).json(newReview);
        } catch (error) {
            console.error("Error saving review:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    })
);

export default router;
