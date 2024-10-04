import axios from "axios";

const AUTH_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjQ4MmFhZTI3NThmODE4YzUwMTg1OGUxN2I0MDlkNSIsIm5iZiI6MTcyNzg4NDU0Ni45Mzc4MzUsInN1YiI6IjY2ZmQ2YWFmMTU5MmVmMWJhOTg0YWE0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zjShvti7lbwTejR0JZG23o5m39tuMDVZg_oXq2zz38k";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${AUTH_KEY}`,
  },
};

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  );
  return data.results;
};

export const fetchGenres = async () => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?language=en-US?per_page=3",
    options
  );
  return data.genres;
};

export const fetchAllMovies = async (query) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US`,
    options
  );
  return data.results;
};

export const fetchConfiguration = async () => {
  const { data } = await axios.get("https://api.themoviedb.org/3/configuration", options);
  return data;
};

export const fetchMovieById = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );
  return data;
};

export const fetchCredits = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    options
  );
  return data.cast;
};

export const fetchReviews = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return data.results;
};
