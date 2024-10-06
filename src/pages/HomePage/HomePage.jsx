import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";
import { fetchAllMovies, fetchTrendingMovies } from "../../services/api";
import { toast, ToastContainer } from "react-toast";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const trendingData = await fetchTrendingMovies();
        if (!query) {
          return setMovies(trendingData);
        } else {
          const allData = await fetchAllMovies(query);
          setMovies(allData);
          setLoading(false);
        }
      } catch {
        toast.error("No results found");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [query]);

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      return searchParams({});
    }
    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <Header handleChangeQuery={handleChangeQuery} />
      {loading ? (
        <Loader />
      ) : (
        <div className={s.container}>
          {!query ? (
            <h2 className={s.header}>Trending today</h2>
          ) : (
            <h2 className={s.header}>All results per your request</h2>
          )}
          <MovieList movies={movies} />
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default HomePage;
