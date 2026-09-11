"use client";

import { useState } from "react";

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
      <div className="w-full max-w-2xl rounded-lg border border-[rgba(238,238,238,0.14)] bg-[#17191A] p-6 shadow-xl sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-[rgba(238,238,238,0.1)] pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#FFD369] font-semibold">
              Screening Room
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#EEEEEE]">
              {initialReview ? "Edit Review" : "Write a Review"}
            </h2>
            <p className="mt-1 text-sm text-[#92979D]">{movieTitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[rgba(238,238,238,0.14)] text-xl text-[#92979D] transition hover:border-[#FFD369]/50 hover:text-[#FFD369]"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#C9C9C9]">Overall Rating</label>
            <span className="rounded-md bg-[#FFD369] px-3 py-1 text-sm font-bold text-[#0D0F10]">
              {rating}/10
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-3 w-full"
          />
          <div className="mt-1 flex justify-between text-[10px] text-[#92979D]">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium text-[#C9C9C9]">Your Review</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What did you think of the film?"
            rows={4}
            className="mt-2 w-full resize-none rounded-lg border border-[rgba(238,238,238,0.14)] bg-[#0D0F10] px-4 py-3 text-[#EEEEEE] placeholder:text-[#92979D] outline-none transition focus:border-[#FFD369] focus:ring-2 focus:ring-[#FFD369]/20"
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <input
            id="spoiler-toggle"
            type="checkbox"
            checked={spoiler}
            onChange={(e) => setSpoiler(e.target.checked)}
            className="h-4 w-4 accent-[#FFD369]"
          />
          <label htmlFor="spoiler-toggle" className="text-sm text-[#C9C9C9]">
            Contains spoilers
          </label>
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={() => setAdvancedEnabled(!advancedEnabled)}
            className="text-sm font-semibold text-[#FFD369] transition hover:text-[#EEEEEE]"
          >
            {advancedEnabled ? "− Hide Advanced Review" : "+ Add Advanced Review"}
          </button>
          <p className="mt-1 text-xs text-[#92979D]">
            Rate individual aspects of the film to help the community.
          </p>
        </div>

        {advancedEnabled && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {advancedCategories.map(({ key, label }) => (
              <div key={key} className="rounded-lg border border-[rgba(238,238,238,0.12)] bg-[#0D0F10] p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#C9C9C9]">{label}</span>
                  <span className="font-bold text-[#FFD369]">{advanced[key]}/10</span>
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
          <div className="mt-5 rounded-lg border border-[#FFD369]/60 bg-[#FFD369]/10 p-4">
            <p className="text-sm font-semibold text-[#EEEEEE]">
              Submit without an Advanced Review?
            </p>
            <p className="mt-2 text-sm leading-6 text-[#C9C9C9]">
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
