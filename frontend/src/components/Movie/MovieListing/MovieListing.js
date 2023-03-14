import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import {  getAllMovies, getAllShows } from '../../../features/movie/movieSlice'
import "./MovieListing.css";
const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);

  console.log('datasssss', shows,movies);

  let renderMovies,
    renderShows = "";

  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    );

  renderShows =
    shows.Response === "True" ? (
      shows.Search.map((movie, index) => <MovieCard key={index} data={movie} />)
    ) : (
      <div className="shows-error">
        <h3>{shows.Error}</h3>
      </div>
    );
  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">{renderMovies}</div>
      </div>
      <div className="show-list">
        <h2>Shows</h2>
        <div className="movie-container">{renderShows}</div>
      </div>
    </div>
  );
};

export default MovieListing;
