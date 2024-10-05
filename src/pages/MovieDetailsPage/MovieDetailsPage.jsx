import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { fetchMovieById } from "../../services/api";
import s from "./MovieDetailsPage.module.css";
import { GoArrowLeft, GoCalendar, GoHeart } from "react-icons/go";
import RunTime from "../../components/RunTime/RunTime";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const goBackRef = useRef(location.state);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovieById(movieId);
      setMovie(data);
      console.log(data);
    };

    getData();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const releaseDate = movie.release_date.split("-")[0];

  const userScore = Math.round((movie.vote_average / 10) * 100);

  return (
    <div className={s.container}>
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
          <li className={s.title}>{movie.title}</li>
          <div className={s.genresWrapper}>
            {movie.genres.map((genre) => (
              <li className={s.genres} key={genre.id}>
                {genre.name}
              </li>
            ))}
            <li className={s.runTime}>
              <GoCalendar className={s.calendarIcon} />
              <RunTime movieTime={movie.runtime} />
            </li>
            <li className={s.releaseDate}>
              <GoCalendar className={s.calendarIcon} />
              <p>{releaseDate}</p>
            </li>
            <li className={s.userscore}>
              <GoHeart className={s.scoreIcon} />
              <p>Score: {userScore}%</p>
            </li>
          </div>
          <li>
            <p className={s.overview}>{movie.overview}</p>
          </li>
          <li>
            <p>Country:{movie.origin_country}</p>
          </li>
          <li>
            <p>Country:{movie.origin_country}</p>
          </li>
          <li>
            <p>Country:{movie.origin_country}</p>
          </li>
          <li>
            <p>Country:{movie.origin_country}</p>
          </li>
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
