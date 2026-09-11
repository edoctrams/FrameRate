"use client";

import { useState } from "react";
import AdvancedReview from "./AdvancedReview";
import { CURRENT_USER } from "../lib/reviews";

function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StarRating({ rating }) {
  const fullStars = Math.round(rating);
  const stars = [];

  for (let i = 1; i <= 10; i++) {
    stars.push(
      <span
        key={i}
        className={i <= fullStars ? "text-[#FFD369]" : "text-[#393E46]"}
      >
        ★
      </span>
    );
  }

  return <div className="flex gap-0.5 text-sm">{stars}</div>;
}

export default function ReviewCard({ review, onEdit, onDelete }) {
  const [revealed, setRevealed] = useState(false);
  const isCurrentUser = review.username === CURRENT_USER;
  const isSpoiler = review.containsSpoilers;

  return (
    <article className="rounded-lg border border-[rgba(238,238,238,0.12)] bg-[#17191A] p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#393E46] bg-[#0D0F10] text-sm font-bold text-[#FFD369]">
              {review.username?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-sm font-bold text-[#EEEEEE]">
                {review.username}
                {isCurrentUser && (
                  <span className="ml-2 rounded-md bg-[#FFD369]/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#FFD369]">
                    You
                  </span>
                )}
              </p>
              <p className="text-xs text-[#92979D]">{formatDate(review.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-block rounded-md bg-[#FFD369] px-3 py-1 text-sm font-bold text-[#0D0F10]">
            {Number(review.overallRating).toFixed(1)}/10
          </span>
          <div className="mt-2">
            <StarRating rating={Number(review.overallRating)} />
          </div>
        </div>
      </div>

      {isSpoiler && !revealed ? (
        <div className="mt-5 rounded-lg border border-[#FFD369]/60 bg-[#FFD369]/10 p-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FFD369]">
              Spoiler Review
            </p>
          </div>
          <p className="mt-2 text-sm text-[#C9C9C9]">
            This review contains spoilers.
          </p>
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mt-3 rounded-md bg-[#FFD369] px-4 py-2 text-sm font-semibold text-[#0D0F10] transition hover:bg-[#ffdf85]"
          >
            Reveal Review
          </button>
        </div>
      ) : (
        <p className="mt-5 leading-7 text-[#C9C9C9]">{review.text}</p>
      )}

      {isSpoiler && revealed && (
        <p className="mt-2 text-xs text-[#92979D]">
          This review contains spoilers.
        </p>
      )}

      {review.hasAdvancedReview && review.advancedRatings && (
        <AdvancedReview ratings={review.advancedRatings} />
      )}

      {isCurrentUser && (
        <div className="mt-5 flex items-center gap-3 border-t border-[rgba(238,238,238,0.1)] pt-4">
          <button
            type="button"
            onClick={() => onEdit(review)}
            className="rounded-md border border-[rgba(238,238,238,0.14)] bg-[#0D0F10] px-3 py-1.5 text-xs font-medium text-[#C9C9C9] transition hover:border-[#FFD369]/50 hover:text-[#FFD369]"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(review)}
            className="rounded-md border border-[rgba(238,238,238,0.14)] bg-[#0D0F10] px-3 py-1.5 text-xs font-medium text-[#C9C9C9] transition hover:border-[#FFD369]/50 hover:text-[#FFD369]"
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
}
