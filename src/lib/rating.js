/* Frame Rate rating language — one source of truth for what a score means.
   Used by the review form (live meaning) and review displays. */

const RATING_MEANINGS = [
  {
    min: 8,
    label: "PERFECT · MUST WATCH",
    hint: "A film worth going out of your way for.",
    accent: "border-[#FF3B78] bg-[#FF3B78]/12 text-[#FF3B78]",
  },
  {
    min: 7,
    label: "WATCHABLE",
    hint: "Solid, worth your evening.",
    accent: "border-[#B52F67] bg-[#B52F67]/12 text-[#B52F67]",
  },
  {
    min: 6,
    label: "MIXED",
    hint: "Good pieces, uneven whole.",
    accent: "border-[#85858C]/50 bg-[#85858C]/10 text-[#85858C]",
  },
  {
    min: 0,
    label: "SKIP",
    hint: "Not worth the runtime.",
    accent: "border-[#55555C] bg-[#55555C]/12 text-[#85858C]",
  },
];

export function getRatingMeaning(rating) {
  const value = Number(rating) || 0;
  return RATING_MEANINGS.find((entry) => value >= entry.min) || RATING_MEANINGS[RATING_MEANINGS.length - 1];
}

export function formatRating(rating) {
  const value = Number(rating) || 0;
  return value.toFixed(1);
}