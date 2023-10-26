"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard.jsx";
import Header from "./Header.jsx";
import { TextField } from "@mui/material";

function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const [movies, setMovies] = useState(null);

  async function getData() {
    let response = await axios.get(
      "https://movie-app-backend-9bbbc.web.app/movies"
    );
    setMovies(response.data);
  }

  async function getSearchData(e) {
    e.preventDefault();
    const query = e.target[0].value;
    let response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=175aa1a09e34f74602a6ff0c2919d825&&query=${query}`
    );
    setMovies(response.data);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app">
      <Header setUserInfo={setUserInfo} userInfo={userInfo} />
      <form className="search-form" onSubmit={getSearchData}>
        <TextField id="outlined-basic" label="Search" variant="outlined" />
      </form>
      <div className="card-grid">
        {movies
          ? movies.results.map((movie) => {
              return (
                <MovieCard
                  page={"main"}
                  key={movie.id}
                  movie={movie}
                  userInfo={userInfo}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Home;
