import { Suspense, useEffect, useState } from "react";
import { fetchCredits } from "../../services/api";
import { useParams } from "react-router-dom";
import s from "./Cast.module.css";

const Cast = () => {
  const [credits, setCredits] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const getCreditsData = async () => {
      const credits = await fetchCredits(movieId);
      setCredits(credits);
    };
    getCreditsData();
  }, [movieId]);

  return (
    <div className={s.container}>
      <Suspense fallback={<h2>Loading...</h2>}>
        <ul className={s.list}>
          {credits.map((credit) => (
            <li className={s.listItem} key={credit.id}>
              {credit.profile_path ? (
                <img
                  className={s.image}
                  src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
                  alt={credit.name}
                />
              ) : (
                <h2 className={s.noImage}>No image for this actor</h2>
              )}
              <div className={s.creditInfo}>
                <h2 className={s.creditName}>{credit.name}</h2>

                {credit.character ? (
                  <span className={s.character}>{credit.character}</span>
                ) : (
                  <h2>Support actor</h2>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
};

export default Cast;
