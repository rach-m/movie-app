'use client'

import { useEffect, useState} from 'react';
import Login from './login.jsx';
import Logout from "./Logout.jsx"
import axios from "axios"
import MovieCard from './MovieCard.jsx';


function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const [movies, setMovies] = useState(null)

  async function getData (){
    let response = await axios.get("https://movie-app-backend-9bbbc.web.app/movies")
      setMovies(response.data)
  }

  useEffect(()=>{
    getData()
  }, [])

console.log(userInfo)

  return (
    <div className="app">
      {!userInfo ? 
      <div><p>Welcome, Guest</p><Login setUserInfo={setUserInfo} /></div>
      : <div><p>Welcome, {userInfo.displayName}</p><Logout setUserInfo={setUserInfo}/></div>}
      <form><input></input></form>
      {movies ? movies.results.map(movie => {
        return <MovieCard key = {movie.id} movie = {movie} />
      }) : null}
    </div>
  );
}

export default Home;