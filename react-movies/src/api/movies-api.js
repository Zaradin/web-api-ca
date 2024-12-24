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

//TODO
export const getMovieByTitle = async (title) => {
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/${title}`,
        {
            headers: {
                Authorization: window.localStorage.getItem("token"),
            },
        }
    );
    return response.json();
};

export const getMovieRecommendations = async (args) => {
    const [, idPart] = args.queryKey || {};
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
