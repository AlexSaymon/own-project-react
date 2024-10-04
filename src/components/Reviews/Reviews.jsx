import { useEffect, useState } from "react";
import { fetchReviews } from "../../services/api";
import { useParams } from "react-router-dom";
import s from "./Reviews.module.css";
import { GoPersonFill } from "react-icons/go";
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const getReviewsData = async () => {
      const reviews = await fetchReviews(movieId);
      setReviews(reviews);
    };
    getReviewsData();
  }, [movieId]);

  return (
    <div>
      {reviews.length > 1 ? (
        <ul className={s.list}>
          {reviews.map((review) => (
            <li className={s.listItem} key={review.id}>
              <h3 className={s.authorName}>
                <span className={s.authorTitle}>Author:</span>
                {review.author_details.name.length > 1
                  ? review.author_details.name
                  : review.author_details.username}
              </h3>
              <div className={s.reviewWrapper}>
                <GoPersonFill className={s.icon} />
                <p className={s.reviewContent}>{review.content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2>There no reviews for that movie.</h2>
      )}
    </div>
  );
};

export default Reviews;
