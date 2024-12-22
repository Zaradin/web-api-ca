// SearchPage.js
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getMovieByTitle } from "../api/tmdb-api";
import SearchBox from "../components/searchBox";
import SearchMoviesPage from "../components/searchMoviesPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Header from "../components/headerMovieList";

function SearchPage() {
  const [query, setQuery] = useState("");

  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useQuery(["searchMovies", query], () => getMovieByTitle(query), {
    enabled: query.length > 0,
    retry: false,
  });

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <Header title="Search Movies" />
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <SearchBox query={query} handleSearchChange={handleSearchChange} />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <SearchMoviesPage
          movies={movies || []}
          action={(movie) => <AddToFavoritesIcon movie={movie} />}
          loading={isLoading}
        />
      )}
    </div>
  );
}

export default SearchPage;
