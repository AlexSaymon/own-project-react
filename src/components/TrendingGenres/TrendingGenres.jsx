import { useEffect, useState } from "react";
import { fetchGenres } from "../../services/api";
import s from "./TrendingGenres.module.css";

const TrendingGenres = ({ genreIds }) => {
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
    <div className={s.genresWrapper}>
      {genreIds.slice(0, 2).map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? (
          <li className={s.genres} key={genre.id}>
            {genre.name}
          </li>
        ) : null;
      })}
    </div>
  );
};

export default TrendingGenres;
