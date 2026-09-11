import { getRatingLabel } from "../data/movies";

export default function RatingBadge({ rating }) {
  const numericRating = Number(rating) || 0;
  const label = getRatingLabel(numericRating);

  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-[#FFD369]/35 bg-[#17191A] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#EEEEEE]">
      <span className="text-[#FFD369]">★ {numericRating.toFixed(1)}</span>
      <span className="text-[#393E46]">•</span>
      <span className="text-[#C9C9C9]">{label}</span>
    </span>
  );
}
