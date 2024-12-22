import React from "react";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import Spinner from "../spinner";

function SearchMoviePage({ movies, loading, action }) {
  if (loading) {
    return <Spinner />;
  }

  return (
    <Grid container>
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <MovieList action={action} movies={movies} />
      </Grid>
    </Grid>
  );
}

export default SearchMoviePage;
