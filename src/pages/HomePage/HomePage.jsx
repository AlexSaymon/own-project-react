import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

import s from "./HomePage.module.css";
import { fetchTrendingMovies } from "../../services/api";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTrendingMovies();
      setTrendingMovies(data);
    };
    getData();
  }, []);
  return (
    <div className={s.container}>
      <h2 className={s.header}>Trending today</h2>
      <MovieList movies={trendingMovies} />
    </div>
  );
};

export default HomePage;
