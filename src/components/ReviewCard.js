"use client";

import { useState } from "react";
import AdvancedReview from "./AdvancedReview";
import { CURRENT_USER } from "../lib/reviews";
import { getRatingMeaning } from "../lib/rating";
import { safeGetItem, safeSetItem } from "../lib/storage";

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
      <span key={i} className={i <= fullStars ? "text-[#FF3B78]" : "text-[#252529]"}>
        ★
      </span>
    );
  }

  return <div className="flex gap-0.5 text-sm">{stars}</div>;
}

export default function ReviewCard({ review, onEdit, onDelete }) {
  const [revealed, setRevealed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reported, setReported] = useState(false);

  const isCurrentUser = review.username === CURRENT_USER;
  const isSpoiler = review.containsSpoilers;
  const meaning = getRatingMeaning(review.overallRating);

  const reportReview = (reason) => {
    const reports = safeGetItem("spoiler-reports", []);
    const alreadyReported = reports.some((item) => item.reviewId === review.id);
    if (!alreadyReported) {
      safeSetItem("spoiler-reports", [
        ...reports,
        {
          reviewId: review.id,
          movieId: review.movieId,
          reason,
          note: reason === "spoiler" ? "This review contains an unmarked spoiler." : "",
          reportedAt: new Date().toISOString(),
        },
      ]);
    }
    setReported(true);
    setMenuOpen(false);
  };

  return (
    <article className="relative rounded-2xl border border-[#252529] bg-[#151518] p-6 transition duration-300 hover:border-[#FF3B78]/40 sm:p-7">
      {/* Header row: the action menu lives here and is pinned to the card's
          top-right. It is a sibling of the review text, never part of it, so a
          one-line review and a ten-line review put ••• in the same place. */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#252529] bg-[#080808] text-sm font-bold text-[#FF3B78]">
            {review.username?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-[#F5F5F5]">
              {review.username}
              {isCurrentUser && (
                <span className="rounded-full bg-[#FF3B78]/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#FF3B78]">
                  You
                </span>
              )}
              {review.hasAdvancedReview && (
                <span className="rounded-full bg-[#FF3B78] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#F5F5F5]">
                  Advanced Reviewer
                </span>
              )}
            </p>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#55555C]">
              <span>{formatDate(review.createdAt)}</span>
              <span aria-hidden className="text-[#2E2E34]">
                ·
              </span>
              <span className="font-semibold uppercase tracking-[0.12em] text-[#B52F67]">
                {meaning.label}
              </span>
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-start gap-3">
          <div className="text-right">
            <span className="inline-block rounded-full border border-[#FF3B78]/40 bg-[#FF3B78]/10 px-3 py-1 text-sm font-bold text-[#FF3B78]">
              {Number(review.overallRating).toFixed(1)}/10
            </span>
            <div className="mt-2 hidden sm:block">
              <StarRating rating={Number(review.overallRating)} />
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="Review actions"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#252529] bg-[#080808] text-lg leading-none text-[#85858C] transition hover:border-[#FF3B78]/50 hover:text-[#FF3B78]"
            >
              •••
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-11 z-20 w-48 overflow-hidden rounded-xl border border-[#252529] bg-[#101012] py-1 shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
                {isCurrentUser ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onEdit?.(review);
                      }}
                      className="block w-full px-4 py-2.5 text-left text-sm text-[#F5F5F5] transition hover:bg-[#151518] hover:text-[#FF3B78]"
                    >
                      Edit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onDelete?.(review);
                      }}
                      className="block w-full px-4 py-2.5 text-left text-sm text-[#F5F5F5] transition hover:bg-[#151518] hover:text-[#FF3B78]"
                    >
                      Delete Review
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => reportReview("spoiler")}
                      className="block w-full px-4 py-2.5 text-left text-sm text-[#F5F5F5] transition hover:bg-[#151518] hover:text-[#FF3B78]"
                    >
                      Report Spoiler
                    </button>
                    <button
                      type="button"
                      onClick={() => reportReview("review")}
                      className="block w-full px-4 py-2.5 text-left text-sm text-[#F5F5F5] transition hover:bg-[#151518] hover:text-[#FF3B78]"
                    >
                      Report Review
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {reported && (
        <p className="mt-4 rounded-xl border border-[#252529] bg-[#101012] px-4 py-3 text-xs text-[#85858C]">
          Thanks — this review has been reported to the Frame Rate team.
        </p>
      )}

      {isSpoiler && !revealed ? (
        <div className="mt-5 overflow-hidden rounded-xl border border-[#FF3B78]/50 bg-[#FF3B78]/8">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF3B78]">
                ⚠ Spoiler Review
              </p>
              <p className="mt-1 text-xs text-[#85858C]">
                This review contains spoilers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="rounded-full bg-[#FF3B78] px-4 py-2 text-xs font-semibold text-[#F5F5F5] transition hover:bg-[#ff5c92]"
            >
              Reveal Review
            </button>
          </div>
          <p className="select-none px-5 pb-5 text-sm leading-7 text-[#85858C] blur-[6px]">
            {review.text}
          </p>
        </div>
      ) : (
        <>
          <p className="mt-5 leading-7 text-[#85858C]">{review.text}</p>
          {isSpoiler && <p className="mt-3 text-xs text-[#FF3B78]">Contains spoilers.</p>}
        </>
      )}

      {review.hasAdvancedReview && review.advancedRatings && (
        <AdvancedReview ratings={review.advancedRatings} />
      )}
    </article>
  );
}
