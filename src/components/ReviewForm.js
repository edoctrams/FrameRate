"use client";

import { useState } from "react";
import { formatRating, getRatingMeaning } from "../lib/rating";

const advancedCategories = [
  { key: "cinematography", label: "Cinematography" },
  { key: "direction", label: "Direction" },
  { key: "acting", label: "Acting" },
  { key: "story", label: "Story" },
  { key: "music", label: "Music" },
  { key: "editing", label: "Editing" },
];

const defaultAdvanced = {
  cinematography: 8,
  direction: 8,
  acting: 8,
  story: 8,
  music: 8,
  editing: 8,
};

export default function ReviewForm({ movieId, movieTitle, initialReview, onClose, onSave }) {
  const [rating, setRating] = useState(initialReview?.overallRating || 8);
  const [text, setText] = useState(initialReview?.text || "");
  const [spoiler, setSpoiler] = useState(initialReview?.containsSpoilers || false);
  const [advancedEnabled, setAdvancedEnabled] = useState(initialReview?.hasAdvancedReview || false);
  const [advanced, setAdvanced] = useState(initialReview?.advancedRatings || defaultAdvanced);
  const [confirmNoAdvanced, setConfirmNoAdvanced] = useState(false);

  const meaning = getRatingMeaning(rating);

  const handleRatingChange = (value) => {
    setRating(Number(value));
  };

  const handleSubmitClick = () => {
    if (!text.trim()) return;

    if (!advancedEnabled && !confirmNoAdvanced) {
      setConfirmNoAdvanced(true);
      return;
    }

    const review = {
      id: initialReview?.id || Date.now(),
      movieId: String(movieId),
      username: initialReview?.username || "Parth",
      overallRating: rating,
      text: text.trim(),
      containsSpoilers: spoiler,
      hasAdvancedReview: advancedEnabled,
      advancedRatings: advancedEnabled ? { ...advanced } : null,
      createdAt: initialReview?.createdAt || new Date().toISOString(),
    };

    onSave(review);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-8">
      <div className="w-full max-w-2xl rounded-lg border border-[#252529] bg-[#151518] p-6 shadow-xl sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-[#252529] pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#FF3B78] font-semibold">
              Frame Rate / Reviews
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#F5F5F5]">
              {initialReview ? "Edit Review" : "Write a Review"}
            </h2>
            <p className="mt-1 text-sm text-[#85858C]">{movieTitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#252529] text-xl text-[#85858C] transition hover:border-[#FF3B78]/50 hover:text-[#FF3B78]"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="mt-6">
          <label htmlFor="overall-rating" className="text-sm font-medium text-[#85858C]">
            Rating
          </label>

          <div
            id="rating-meaning"
            aria-live="polite"
            className={`mt-3 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-xl border px-5 py-4 ${meaning.accent}`}
          >
            <span className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black leading-none tracking-tight">
                {formatRating(rating)}
              </span>
              <span className="text-sm font-semibold opacity-70">/ 10</span>
            </span>

            <span aria-hidden className="hidden h-9 w-px bg-current opacity-20 sm:block" />

            <span className="flex min-w-0 flex-col">
              <span className="text-sm font-black tracking-[0.16em]">{meaning.label}</span>
              <span className="mt-1 text-xs text-[#85858C]">{meaning.hint}</span>
            </span>
          </div>

          <input
            id="overall-rating"
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={rating}
            onChange={(e) => handleRatingChange(e.target.value)}
            aria-describedby="rating-meaning"
            className="mt-4 w-full"
          />
          <div className="mt-1 flex justify-between text-[10px] text-[#85858C]">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium text-[#85858C]">Your Review</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What did you think of the film?"
            rows={4}
            className="mt-2 w-full resize-none rounded-lg border border-[#252529] bg-[#080808] px-4 py-3 text-[#F5F5F5] placeholder:text-[#85858C] outline-none transition focus:border-[#FF3B78] focus:ring-2 focus:ring-[#FF3B78]/20"
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <input
            id="spoiler-toggle"
            type="checkbox"
            checked={spoiler}
            onChange={(e) => setSpoiler(e.target.checked)}
            className="h-4 w-4 accent-[#FF3B78]"
          />
          <label htmlFor="spoiler-toggle" className="text-sm text-[#85858C]">
            Contains spoilers
          </label>
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={() => setAdvancedEnabled(!advancedEnabled)}
            className="text-sm font-semibold text-[#FF3B78] transition hover:text-[#F5F5F5]"
          >
            {advancedEnabled ? "− Hide Advanced Review" : "+ Add Advanced Review"}
          </button>
          <p className="mt-1 text-xs text-[#85858C]">
            Rate individual aspects of the film to help the community.
          </p>
        </div>

        {advancedEnabled && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {advancedCategories.map(({ key, label }) => (
              <div key={key} className="rounded-lg border border-[#252529] bg-[#080808] p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#85858C]">{label}</span>
                  <span className="font-bold text-[#FF3B78]">{advanced[key]}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={advanced[key]}
                  onChange={(e) => setAdvanced({ ...advanced, [key]: Number(e.target.value) })}
                  className="mt-2 w-full"
                />
              </div>
            ))}
          </div>
        )}

        {confirmNoAdvanced && (
          <div className="mt-5 rounded-lg border border-[#FF3B78]/60 bg-[#FF3B78]/10 p-4">
            <p className="text-sm font-semibold text-[#F5F5F5]">
              Submit without an Advanced Review?
            </p>
            <p className="mt-2 text-sm leading-6 text-[#85858C]">
              Advanced reviews help the Frame Rate community understand what makes a movie work. Are you sure you want to submit without one?
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmNoAdvanced(false)}
                className="fr-button-secondary"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleSubmitClick}
                className="fr-button-accent"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        )}

        {!confirmNoAdvanced && (
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="fr-button-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmitClick}
              disabled={!text.trim()}
              className="fr-button disabled:cursor-not-allowed disabled:opacity-50"
            >
              {initialReview ? "Save Changes" : "Submit Review"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
