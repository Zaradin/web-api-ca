export const getMovies = () => {
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getMovie = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getMovieByTitle = async (title) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${
                process.env.REACT_APP_TMDB_KEY
            }&query=${encodeURIComponent(title)}`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();

        return data.results;
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
};

export const getMovieRecommendations = (movieId) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getMovieCast = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getNowPlayingMovies = (page = 1) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getActorDetails = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getActorMovieCredits = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getUpcoming = () => {
    return fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getTrendingPeople = () => {
    return fetch(
        `https://api.themoviedb.org/3/trending/person/day?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    )
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.message);
                });
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getGenres = async () => {
    return fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
            process.env.REACT_APP_TMDB_KEY +
            "&language=en-US"
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getMovieReviews = (id) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
        .then((res) => res.json())
        .then((json) => {
            // console.log(json.results);
            return json.results;
        });
};
