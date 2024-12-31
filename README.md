# Assignment 2 - Web API.

Name: Josh Crotty

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)

-   JWT Authentication
-   All TMDB API calls moved to the backned
-   Users can submit movie reviews that are stored in a mongodb collection
-   Account details page, (Username, email, account creation date, all reviews listed, and user favourites listed) is displayed
-   Auth check for adding movies to favorites.

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

---

NODEENV=development
PORT=8080
HOST=
mongoDB=MyMongoDBURL
seedDb=true
secret=ilikecake

---

## API Design

Give an overview of your web API design, perhaps similar to the following:

-   /api/movies/movies | GET | Gets a list of movies
-   /api/movies/tmdb/movie/{movieid} | GET | Gets a single movie
-   /api/movies/tmdb/upcoming | GET | Get upcoming movies that are being released
-   /api/movies/tmdb/trendingpeople | GET | Get a list of trending people on TMDB
-   /api/movies/tmdb/genre | GET | Get a list of different genres of movies and TV Shows on TMDB
-   /api/movies/tmdb/{title} | GET | Get movies by a search title
-   /api/movies/tmdb/movie/{movieid}/recommendations | GET | Get a list of recommendated movies similar to movieid
-   /api/movies/tmdb/nowplaying/{page} | GET | Get a list of movies that are currently playing in theatres

If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).

## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.

**Protected Routes:**

-   /movies/favorites
-   /account

## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.

## Independent learning (if relevant)

Briefly explain any non-standard features developed for the app.
