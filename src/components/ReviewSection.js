"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { getReviewsForMovie, saveReview, deleteReview, getReviewStats } from "../lib/reviews";

export default function ReviewSection({ movieId, movieTitle }) {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [stats, setStats] = useState(null);

  const loadReviews = () => {
    const stored = getReviewsForMovie(movieId);
    setReviews(stored);
    setStats(getReviewStats(movieId));
  };

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const openForm = () => {
    setEditingReview(null);
    setShowForm(true);
  };

  const openEditForm = (review) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingReview(null);
  };

  const handleSave = (review) => {
    saveReview(review);
    loadReviews();
    closeForm();
  };

  const handleDelete = (review) => {
    deleteReview(movieId, review.id);
    loadReviews();
  };

  return (
    <section className="mt-20 border-t border-[rgba(238,238,238,0.12)] pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#FFD369] font-semibold">
            Screening Room
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#EEEEEE]">Reviews</h2>
          <p className="mt-2 text-sm text-[#92979D]">
            What people are saying about {movieTitle}.
          </p>
        </div>

        <button type="button" onClick={openForm} className="fr-button">
          Write a Review
        </button>
      </div>

      {/* Community review stats */}
      {stats && (
        <div className="mt-6 inline-flex flex-wrap items-center gap-4 rounded-lg border border-[rgba(255,211,105,0.28)] bg-[#17191A] px-5 py-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#FFD369] font-semibold">
              Community Reviews
            </p>
            <p className="mt-1 text-2xl font-black text-[#EEEEEE]">
              {stats.average.toFixed(1)}
              <span className="text-sm font-normal text-[#92979D]">/10</span>
            </p>
          </div>
          <div className="h-8 w-px bg-[rgba(238,238,238,0.12)]" />
          <p className="text-sm text-[#92979D]">
            Based on {stats.count} {stats.count === 1 ? "review" : "reviews"}
          </p>
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="mt-8 rounded-lg border border-[rgba(238,238,238,0.12)] bg-[#17191A] p-8 text-center">
          <p className="text-lg font-semibold text-[#EEEEEE]">No reviews yet.</p>
          <p className="mt-2 text-sm text-[#92979D]">
            Be the first person to review this movie.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onEdit={openEditForm}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <ReviewForm
          movieId={movieId}
          movieTitle={movieTitle}
          initialReview={editingReview}
          onClose={closeForm}
          onSave={handleSave}
        />
      )}
    </section>
  );
}
