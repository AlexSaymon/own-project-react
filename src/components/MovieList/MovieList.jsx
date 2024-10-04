import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";
import { fetchGenres } from "../../services/api"; // Import fetchGenres directly

const MovieList = ({ movies }) => {
  const location = useLocation();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchGenres();
      setGenres(data);
    };
    getData();
  }, []);

  if (!genres.length) return null;

  return (
    <div className={s.container}>
      <ul className={s.list}>
        {movies.map((movie) => (
          <li className={s.listItem} key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <img
                className={s.image}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="trending movie"
              />
              <div className={s.movieInfoWrapper}>
                <p className={s.title}>{movie.title}</p>

                <div className={s.genresWrapper}>
                  {movie.genre_ids.slice(0, 2).map((id) => {
                    const genre = genres.find((g) => g.id === id);
                    return genre ? (
                      <li className={s.genres} key={genre.id}>
                        {genre.name}
                      </li>
                    ) : null;
                  })}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
