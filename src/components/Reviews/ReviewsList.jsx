// import React from 'react';

// const ReviewsList = () => {
//   return <div></div>;
// };

// export default ReviewsList;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from 'api/api';

const Reviews = () => {
  const [reviewsList, setReviewsList] = useState([]);
  const { movieId } = useParams();
  
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetchMovieReviews(movieId);
        setReviewsList(response);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchReview();
  }, [movieId]);

  return (
    <ul>
      {reviewsList.length > 0
        ? reviewsList.map(({ author, content, id }) => (
            <li key={id}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          ))
        : "Sorry, we don't have any review for this movie"}
    </ul>
  );
};
export default Reviews;