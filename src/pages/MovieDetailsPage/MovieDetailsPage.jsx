import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { fetchMovieById } from "../../services/api";
import s from "./MovieDetailsPage.module.css";
import { GoArrowLeft } from "react-icons/go";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const goBackRef = useRef(location.state);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovieById(movieId);
      setMovie(data);
    };

    getData();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const releaseDate = movie.release_date.split("-")[0];

  const userScore = Math.round((movie.vote_average / 10) * 100);

  return (
    <div>
      <Link className={s.link} to={goBackRef.current ?? "/movies"}>
        <GoArrowLeft className={s.arrowIcon} />
        Go back
      </Link>
      <div className={s.contentWrapper}>
        <img
          className={s.image}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
        <ul className={s.list}>
          <li className={s.title}>
            {movie.title} ({releaseDate})
          </li>
          <li>Userscore: {userScore}%</li>
          <li>
            <h2 className={s.overviewTitle}>Overview</h2>
            <h2 className={s.overview}>{movie.overview}</h2>
          </li>
          <h2 className={s.genresTitle}>Genres</h2>
          <div className={s.genresWrapper}>
            {movie.genres.map((genre) => (
              <li className={s.genres} key={genre.id}>
                {genre.name}
              </li>
            ))}
          </div>
        </ul>
      </div>
      <div className={s.additionalInfo}>
        <h2 className={s.additionalInfoTitle}>Additonal information:</h2>
        <Link className={s.castLink} to={`/movies/${movieId}/cast`}>
          Cast
        </Link>
        <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
