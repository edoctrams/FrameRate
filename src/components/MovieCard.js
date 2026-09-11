import Link from "next/link";
import { getRatingLabel } from "../data/movies";

export default function MovieCard({ movie }) {
  const rating = Number(movie.rating);
  const ratingLabel = getRatingLabel(rating);

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group block"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-[rgba(238,238,238,0.12)] bg-[#17191A] shadow-[0_18px_36px_rgba(0,0,0,0.22)] transition duration-300 group-hover:-translate-y-1 group-hover:border-[#FFD369]/55">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(57,62,70,0.2),rgba(13,15,16,0.78))]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center transition duration-300 group-hover:scale-[1.03]">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-[#393E46] bg-[#0D0F10] text-lg font-black text-[#EEEEEE] shadow-md">
            F
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#92979D]">
            Frame Rate
          </span>
        </div>

        <div className="absolute right-3 top-3 rounded-md border border-[#FFD369]/30 bg-[#0D0F10]/82 px-2.5 py-1 text-xs font-bold text-[#FFD369] shadow-sm backdrop-blur-sm">
          ★ {rating.toFixed(1)}
        </div>

        <div className="absolute bottom-3 left-3 rounded-md bg-[#FFD369] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#222831]">
          {ratingLabel}
        </div>
      </div>

      <div className="px-1 pb-1 pt-4">
        <h3 className="text-lg font-bold leading-snug text-[#EEEEEE] transition group-hover:text-[#FFD369]">
          {movie.title}
        </h3>

        <p className="mt-1.5 text-sm text-[#92979D]">
          {movie.year} · {movie.genre?.slice(0, 2).join(" · ") || "Drama"}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-[#FFD369]">★ {rating.toFixed(1)}</span>
          <span className="text-xs text-[#92979D]">/ 10</span>
        </div>
      </div>
    </Link>
  );
}
