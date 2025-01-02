# Assignment 2 - Web API.

Name: Josh Crotty

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)

-   JWT Authentication
-   All TMDB API calls moved to the backned
-   Users can submit movie reviews that are stored in a mongodb collection
-   Account details page, (Username, email, account creation date, all reviews listed, and user favourites listed) is displayed
-   Auth check for adding movies to favorites.
-   Users movie reviews are now displayed in the account details page, also with a link to the review page

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

**GET** Endpoints

-   /api/movies/movies | GET | Gets a list of movies
-   /api/movies/tmdb/movie/{movieid} | GET | Gets a single movie
-   /api/movies/tmdb/upcoming | GET | Get upcoming movies that are being released
-   /api/movies/tmdb/trendingpeople | GET | Get a list of trending people on TMDB
-   /api/movies/tmdb/genre | GET | Get a list of different genres of movies and TV Shows on TMDB
-   /api/movies/tmdb/{title} | GET | Get movies by a search title
-   /api/movies/tmdb/movie/{movieid}/recommendations | GET | Get a list of recommendated movies similar to movieid
-   /api/movies/tmdb/nowplaying/{page} | GET | Get a list of movies that are currently playing in theatres

**USER** Endpoints

-   /api/users/ | POST | register a user or authenticate a user
-   /api/users/userdetails | GET | Gets the currently logged in user details
-   /api/users/reviews | GET | Get currently logged in users reviews stored in mongodb

**POST** Endpoints

-   /api/movies/tmdb/movie/${id}/reviews | POST | Insert a movie review into the mongodb

If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).

## Security and Authentication

JWT was used for the security and authentication. For assignment 1, firebase was used, but for assignment two
I made the slow transition from firebase to my custom JWT authentication functionality.

For the protected routes, the implementation was done within the protectedRoutes react
component with the use of checking the auth context and using react outlets.

**Protected Routes:**

-   /movies/favorites
-   /account
-   /reviews/{id}
-   /reviews/form

## Integrating with React App

All TMDB API calls have been moved to the backend and now use custom API calls in the frontend.

Also, movie reviews are now displayed in the user account details page. Any reviews that user has made will show.

## Independent learning (if relevant)

Briefly explain any non-standard features developed for the app.
