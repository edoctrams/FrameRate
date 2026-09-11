import { safeGetItem, safeSetItem } from "./storage";

export const CURRENT_USER = "Parth";

const REVIEWS_KEY = "reviews";

export function getReviewsForMovie(movieId) {
  const allReviews = safeGetItem(REVIEWS_KEY, {});
  return allReviews[String(movieId)] || [];
}

export function saveReview(review) {
  const allReviews = safeGetItem(REVIEWS_KEY, {});
  const movieId = String(review.movieId);
  const movieReviews = allReviews[movieId] || [];

  const existingIndex = movieReviews.findIndex((r) => r.id === review.id);
  let nextMovieReviews;

  if (existingIndex >= 0) {
    nextMovieReviews = [...movieReviews];
    nextMovieReviews[existingIndex] = review;
  } else {
    nextMovieReviews = [review, ...movieReviews];
  }

  allReviews[movieId] = nextMovieReviews;
  safeSetItem(REVIEWS_KEY, allReviews);
  return nextMovieReviews;
}

export function deleteReview(movieId, reviewId) {
  const allReviews = safeGetItem(REVIEWS_KEY, {});
  const movieIdStr = String(movieId);
  const movieReviews = allReviews[movieIdStr] || [];
  const nextMovieReviews = movieReviews.filter((r) => r.id !== reviewId);

  if (nextMovieReviews.length === 0) {
    delete allReviews[movieIdStr];
  } else {
    allReviews[movieIdStr] = nextMovieReviews;
  }

  safeSetItem(REVIEWS_KEY, allReviews);
  return nextMovieReviews;
}

export function getReviewStats(movieId) {
  const reviews = getReviewsForMovie(movieId);
  if (reviews.length === 0) return null;

  const total = reviews.reduce((sum, review) => sum + Number(review.overallRating), 0);
  const average = total / reviews.length;

  return {
    average,
    count: reviews.length,
  };
}