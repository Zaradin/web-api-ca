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
-   Users favorites are stored in a mongodb collection
-   Can add and remove favorites from the mongodb collection

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

## API Configuration

Within the react-movies folder, create a .env file which should contain:<br>
REACT*APP_TMDB_KEY=\_THE TMDB API KEY*

Within the movies-api folder, create a .env file which should contain:<br>
NODEENV=development<br>
PORT=8080<br>
HOST=localhost<br>
mongoDB=mongodb+srv://_mongoAtlasUsername_:_mongoAtlasPassword_@cluster0.gbc02.mongodb.net/goodmovies?retryWrites=true&w=majority&appName=goodmovies<br>
seedDb=true<br>
secret=ilikecake

---

## API Design

Give an overview of your web API design, perhaps similar to the following:

**GET** Endpoints

-   /api/movies/movies | GET | Gets a list of movies
-   /api/movies/tmdb/movie/{movieid} | GET | Gets a single movie
-   /api/movies/tmdb/upcoming | GET | Get upcoming movies that are being released
-   /api/movies/tmdb/getactordetails/${id} | GET | Gets an actors details (name, bio, image...)
-   /api/movies/tmdb/getactormoviecredits/${id} | GET | Gets an actors movie credits based on actorId
-   /api/movies/tmdb/getmoviecast/${id} | GET | Gets a movies cast based on movieId
-   /api/movies/tmdb/trendingpeople | GET | Get a list of trending people on TMDB
-   /api/movies/tmdb/getmoviebytitle/${title} | GET | Get a movie by a search query (search movies)
-   /api/movies/tmdb/genre | GET | Get a list of different genres of movies and TV Shows on TMDB
-   /api/movies/tmdb/{title} | GET | Get movies by a search title
-   /api/movies/tmdb/movie/{movieid}/recommendations | GET | Get a list of recommendated movies similar to movieid
-   /api/movies/tmdb/nowplaying/{page} | GET | Get a list of movies that are currently playing in theatres
-   /api/users/userdetails | GET | Gets the currently logged in user details
-   /api/users/reviews | GET | Get currently logged in users reviews stored in mongodb
-   /api/movies/getfavorites | GET | Gets a users favorites from the favorites collection

**POST** Endpoints

-   /api/users/ | POST | register a user or authenticate a user
-   /api/movies/addfavorite | POST | Add a movie to a users favorites into the mongodb collection
-   /api/movies/tmdb/movie/${id}/reviews | POST | Insert a movie review into the mongodb collection

**DELETE** Endpoints

-   /api/movies/removefavorite | DELETE | Deletes a users favorites by movieId

If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).

## Routes

-   /
-   /movies/upcoming
-   /movies/:id
-   /actor/:id
-   /trending/people
-   /search
-   /movies/nowshowing
-   /movie/:movieId/recommendations
-   /signup
-   /login

Also contains more routes, which are protected, they are mentioned below.

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

Used reacts react-hot-toast library to show toasts instead of using the react MUI toast.
