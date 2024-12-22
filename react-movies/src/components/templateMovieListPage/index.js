import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";

function MovieListPageTemplate({ movies, title, action }) {
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const [popularityFilter, setPopularityFilter] = useState("desc");
    const genreId = Number(genreFilter);

    console.log(movies);

    let displayedMovies = movies
        .filter((m) => {
            return (
                m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1
            );
        })
        .filter((m) => {
            return genreId > 0 ? m.genre_ids.includes(genreId) : true;
        });

    displayedMovies = displayedMovies.sort((a, b) => {
        if (popularityFilter === "desc") {
            return b.popularity - a.popularity;
        } else {
            return a.popularity - b.popularity;
        }
    });

    const handleChange = (type, value) => {
        if (type === "name") {
            setNameFilter(value);
        } else if (type === "genre") {
            setGenreFilter(value);
        } else if (type === "popularity") {
            setPopularityFilter(value);
        }
    };

    return (
        <Grid container>
            <Grid size={12}>
                <Header title={title} />
            </Grid>
            <Grid container sx={{ flex: "1 1 500px" }}>
                <Grid
                    key="find"
                    size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                    sx={{ padding: "20px" }}
                >
                    <FilterCard
                        onUserInput={handleChange}
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                        onSortChange={(value) =>
                            handleChange("popularity", value)
                        }
                    />
                </Grid>
                <MovieList action={action} movies={displayedMovies}></MovieList>
            </Grid>
        </Grid>
    );
}
export default MovieListPageTemplate;
