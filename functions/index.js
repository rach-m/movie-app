const express = require("express");
const functions = require("firebase-functions");
// const listController = require("../controllers/lists");
const key = process.env.TMDB_API_KEY;
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/movies", async (req, res)=> {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return res.json(data);
  } catch (err) {
    return res.json(err);
  }
});

app.get("/lists", (req, res)=> {
// database
});


exports.app = functions.https.onRequest(app);
