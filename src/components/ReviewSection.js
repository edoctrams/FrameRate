"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import SignInGate from "./SignInGate";
import { getCurrentUser } from "../lib/auth";
import { getReviewsForMovie, saveReview, deleteReview, getReviewStats } from "../lib/reviews";

export default function ReviewSection({ movieId, movieTitle }) {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState("All");
  const [showGate, setShowGate] = useState(false);

  const filters = ["All", "Advanced Reviews", "Spoiler Reviews", "Highest Rated", "Newest"];

  const visibleReviews = useMemo(() => {
    const list = [...reviews];
    switch (filter) {
      case "Advanced Reviews":
        return list.filter((review) => review.hasAdvancedReview);
      case "Spoiler Reviews":
        return list.filter((review) => review.containsSpoilers);
      case "Highest Rated":
        return list.sort((a, b) => Number(b.overallRating) - Number(a.overallRating));
      case "Newest":
        return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      default:
        return list;
    }
  }, [reviews, filter]);

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
    if (!getCurrentUser()) {
      setShowGate(true);
      return;
    }

    setEditingReview(null);
    setShowForm(true);
  };

  const openEditForm = (review) => {
    if (!getCurrentUser()) {
      setShowGate(true);
      return;
    }

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
    <section className="mt-24 border-t border-[#252529] pt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="fr-label">Screening Room</span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#F5F5F5] sm:text-4xl">
            Reviews
          </h2>
          <p className="mt-2 text-sm text-[#85858C]">
            What people are saying about {movieTitle}.
          </p>
        </div>

        <button type="button" onClick={openForm} className="fr-button rounded-full">
          Write a Review
        </button>
      </div>

      {/* Community review stats */}
      {stats && (
        <div className="mt-8 flex flex-wrap items-end gap-8 rounded-2xl border border-[#252529] bg-[#151518] px-8 py-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FF3B78]">
              Community Rating
            </p>
            <p className="mt-2 text-4xl font-black text-[#F5F5F5]">
              {stats.average.toFixed(1)}
              <span className="text-base font-normal text-[#85858C]"> / 10</span>
            </p>
          </div>
          <div className="h-12 w-px bg-[#252529]" />
          <p className="text-sm text-[#85858C]">
            Based on {stats.count} {stats.count === 1 ? "review" : "reviews"}
          </p>
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[#252529] bg-[#151518] p-10 text-center">
          <p className="text-lg font-semibold text-[#F5F5F5]">No reviews yet.</p>
          <p className="mt-2 text-sm text-[#85858C]">
            Be the first person to review this movie.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-10 flex flex-wrap items-center gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                  filter === item
                    ? "bg-[#FF3B78] text-[#F5F5F5]"
                    : "border border-[#252529] bg-[#151518] text-[#85858C] hover:text-[#F5F5F5]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {visibleReviews.length === 0 ? (
            <p className="mt-8 text-sm text-[#85858C]">No {filter.toLowerCase()} yet.</p>
          ) : (
            <div className="mt-8 space-y-4">
              {visibleReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}
<SignInGate
        open={showGate}
        action="write a review"
        onClose={() => setShowGate(false)}
      />

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
