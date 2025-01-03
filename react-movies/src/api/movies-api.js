export const getMovies = async () => {
    const response = await fetch("http://localhost:8080/api/movies/movies", {
        headers: {
            Authorization: window.localStorage.getItem("token"),
        },
    });
    return response.json();
};

export const getMovie = async (args) => {
    const [, idPart] = args.queryKey || {};
    // Check if idPart is defined before trying to destructure
    if (!idPart) {
        throw new Error("Invalid queryKey: missing id");
    }
    const { id } = idPart;
    try {
        const response = await fetch(
            `http://localhost:8080/api/movies/tmdb/movie/${id}`,
            {
                headers: {
                    Authorization: window.localStorage.getItem("token"),
                },
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Invalid content type. Expected JSON.");
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching movie:", error.message);
        throw error;
    }
};

export const getUpcoming = async () => {
    const response = await fetch(
        "http://localhost:8080/api/movies/tmdb/upcoming",
        {
            headers: {
                Authorization: window.localStorage.getItem("token"),
            },
        }
    );
    return response.json();
};

export const getTrendingPeople = async () => {
    const response = await fetch(
        "http://localhost:8080/api/movies/tmdb/trendingpeople",
        {
            headers: {
                Authorization: window.localStorage.getItem("token"),
            },
        }
    );
    return response.json();
};

export const getMovieGenres = async () => {
    const response = await fetch(
        "http://localhost:8080/api/movies/tmdb/genre",
        {
            headers: {
                Authorization: window.localStorage.getItem("token"),
            },
        }
    );
    return response.json();
};

export const getMovieByTitle = async (title) => {
    console.log(title);
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/getmoviebytitle/${title}`,
        {
            headers: {
                Authorization: window.localStorage.getItem("token"),
            },
        }
    );
    const data = await response.json();

    return data.results;
};

export const getMovieRecommendations = async (args) => {
    const [, idPart] = args.queryKey;
    if (!idPart) {
        throw new Error("Invalid queryKey: missing id");
    }
    const { id } = idPart;
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/movie/${id}/recommendations`,
        {
            headers: {
                Authorization: window.localStorage.getItem("token"),
            },
        }
    );
    return response.json();
};

export const getNowPlayingMovies = async (page = 1) => {
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/nowplaying?page=${page}`,
        {
            headers: {
                Authorization: window.localStorage.getItem("token"),
            },
        }
    );
    return response.json();
};

export const getMovieCast = async (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/getmoviecast/${id}`,
        {
            headers: {
                Authorization: window.localStorage.getItem("token"),
            },
        }
    );
    return response.json();
};

export const getActorDetails = async (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/getactordetails/${id}`,
        {
            headers: {
                Authorization: window.localStorage.getItem("token"),
            },
        }
    );
    return response.json();
};

export const getActorMovieCredits = async (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/getactormoviecredits/${id}`,
        {
            headers: {
                Authorization: window.localStorage.getItem("token"),
            },
        }
    );
    return response.json();
};

export const addMovieReview = async (id, author, content, rating) => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/movies/tmdb/movie/${id}/reviews`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: window.localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    author: author,
                    content: content,
                    rating: rating,
                }),
            }
        );

        if (!response.ok) {
            throw new Error((await response.json()).message);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};

export const getUserReviews = async () => {
    const response = await fetch("http://localhost:8080/api/users/reviews", {
        headers: {
            Authorization: window.localStorage.getItem("token"),
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch user reviews");
    }

    return response.json();
};

export const getUserDetails = async () => {
    try {
        const response = await fetch(
            "http://localhost:8080/api/users/userdetails",
            {
                headers: {
                    Authorization: window.localStorage.getItem("token"),
                },
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to fetch user details");
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};

export const getFavorites = async () => {
    const response = await fetch(
        "http://localhost:8080/api/movies/getfavorites",
        {
            headers: {
                Authorization: window.localStorage.getItem("token"),
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch favorites");
    }

    return response.json();
};

export const addFavorite = async (movieId) => {
    const response = await fetch(
        "http://localhost:8080/api/movies/addfavorite",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: window.localStorage.getItem("token"),
            },
            body: JSON.stringify({ movieId }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to add favorite");
    }

    return response.json();
};

export const removeFavorite = async (movieId) => {
    const response = await fetch(
        "http://localhost:8080/api/movies/removefavorite",
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: window.localStorage.getItem("token"),
            },
            body: JSON.stringify({ movieId }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to remove favorite");
    }

    return response.json();
};
