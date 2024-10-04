import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllMovies } from "../../services/api";
import SearchBar from "../../components/SearchBar/SearchBar";
import { toast, ToastContainer } from "react-toast";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAllMovies(query);
      setAllMovies(data);

      if (data.length < 1 && query !== "") {
        toast.error("No results found");
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
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {allMovies.length > 0 && <MovieList movies={allMovies} />}
      <ToastContainer />
    </div>
  );
};

export default MoviesPage;
