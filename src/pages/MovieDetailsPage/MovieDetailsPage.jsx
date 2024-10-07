import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { fetchMovieById } from "../../services/api";
import s from "./MovieDetailsPage.module.css";
import { GoArrowLeft, GoCalendar, GoHeart, GoStopwatch } from "react-icons/go";
import RunTime from "../../components/RunTime/RunTime";
import Loader from "../../components/Loader/Loader";

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

  if (!movie)
    return (
      <div>
        <Loader />
      </div>
    );

  const releaseDate = movie.release_date.split("-")[0];

  const userScore = Math.round((movie.vote_average / 10) * 100);

  return (
    <div className={s.container}>
      <Link className={s.link} to={goBackRef.current ?? "/"}>
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
          <div className={s.movieInfoPcWrapper}>
            <div className={s.genresWrapper}>
              {movie.genres.map((genre) => (
                <li className={s.genres} key={genre.id}>
                  {genre.name}
                </li>
              ))}
            </div>
            <div className={s.movieDataWrapper}>
              <li className={s.runTime}>
                <GoStopwatch className={s.movieDataIcon} />
                <RunTime movieTime={movie.runtime} />
              </li>
              <li className={s.releaseDate}>
                <GoCalendar className={s.movieDataIcon} />
                <p>{releaseDate}</p>
              </li>
              <li className={s.userscore}>
                <GoHeart className={s.movieDataIcon} />
                <p>Score: {userScore}%</p>
              </li>
            </div>
          </div>

          <li>
            <p className={s.overview}>{movie.overview}</p>
          </li>
          <div className={s.movieInfoWrapper}>
            <li className={s.movieInfoItem}>
              <p>Country : {movie.origin_country}</p>
            </li>
            <li className={s.movieInfoItem}>
              <p>Release date : {movie.release_date}</p>
            </li>
            {movie.production_companies.slice(0, 1).map((production) => (
              <li key={production.id} className={s.movieInfoItem}>
                <p>Production : {production.name}</p>
              </li>
            ))}
            <li className={s.movieInfoItem}>
              <p>
                Quality: <span className={s.hd}>HD</span>
              </p>
            </li>
          </div>
        </ul>
      </div>
      <h2 className={s.additionalInfoTitle}>Additonal information:</h2>
      <div className={s.additionalInfo}>
        <Link className={s.additionalInfoLink} to={`/movies/${movieId}/cast`}>
          <span className={s.additionalInfoSpan}>Cast</span>
        </Link>
        <Link className={s.additionalInfoLink} to={`/movies/${movieId}/reviews`}>
          <span className={s.additionalInfoSpan}>Reviews</span>
        </Link>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
