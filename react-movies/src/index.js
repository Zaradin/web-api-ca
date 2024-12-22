import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import UpComingPage from "./pages/upComingPage";
import MoviePage from "./pages/movieDetailsPage";
import ActorPage from "./pages/actorDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import TrendingPeoplePage from "./pages/trendingPeoplePage";
import NowPlayingPage from "./pages/nowPlayingPage";
import MovieRecommendationsPage from "./pages/movieRecommendationsPage";
import SignUp from "./components/signUp";
import SignIn from "./components/signIn";
import AccountDetailsPage from "./pages/acountDetailsPage";
import ProtectedRoute from "./components/protectedRoute";
import SearchPage from "./pages/searchPage";
import ThemeContextProvider from "./contexts/themeContext";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false,
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeContextProvider>
                <BrowserRouter>
                    <Toaster position="bottom-right" reverseOrder={false} />
                    <SiteHeader />
                    <MoviesContextProvider>
                        <Routes>
                            <Route
                                path="/reviews/:id"
                                element={<MovieReviewPage />}
                            />
                            <Route
                                path="/movies/favorites"
                                element={<FavoriteMoviesPage />}
                            />
                            <Route
                                path="/movies/upcoming"
                                element={<UpComingPage />}
                            />
                            <Route path="/movies/:id" element={<MoviePage />} />
                            <Route path="/" element={<HomePage />} />
                            <Route path="*" element={<Navigate to="/" />} />
                            <Route
                                path="/reviews/form"
                                element={<AddMovieReviewPage />}
                            />
                            <Route path="/actor/:id" element={<ActorPage />} />
                            <Route
                                path="/trending/people"
                                element={<TrendingPeoplePage />}
                            />
                            <Route path="/search" element={<SearchPage />} />
                            <Route
                                path="/movies/nowshowing"
                                element={<NowPlayingPage />}
                            />
                            <Route
                                path="/movie/:movieId/recommendations"
                                element={<MovieRecommendationsPage />}
                            />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<SignIn />} />
                            <Route
                                path="/account"
                                element={
                                    <ProtectedRoute>
                                        <AccountDetailsPage />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </MoviesContextProvider>
                </BrowserRouter>
            </ThemeContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
