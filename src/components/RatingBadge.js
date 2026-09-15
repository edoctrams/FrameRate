import { getRatingLabel } from "../data/movies";

export default function RatingBadge({ rating }) {
  const numericRating = Number(rating) || 0;
  const label = getRatingLabel(numericRating);

  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-[#FF3B78]/35 bg-[#151518] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#F5F5F5]">
      <span className="text-[#FF3B78]">★ {numericRating.toFixed(1)}</span>
      <span className="text-[#252529]">•</span>
      <span className="text-[#85858C]">{label}</span>
    </span>
  );
}
