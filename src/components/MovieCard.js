import Link from "next/link";
import { getRatingLabel } from "../data/movies";

const gradients = [
  "linear-gradient(160deg, rgba(255,59,120,0.35), rgba(90,20,50,0.55) 45%, rgba(8,8,8,0.95))",
  "linear-gradient(160deg, rgba(120,60,200,0.35), rgba(40,15,70,0.55) 45%, rgba(8,8,8,0.95))",
  "linear-gradient(160deg, rgba(20,140,150,0.32), rgba(10,50,60,0.55) 45%, rgba(8,8,8,0.95))",
  "linear-gradient(160deg, rgba(40,90,200,0.32), rgba(15,30,70,0.55) 45%, rgba(8,8,8,0.95))",
  "linear-gradient(160deg, rgba(160,40,60,0.35), rgba(60,12,25,0.55) 45%, rgba(8,8,8,0.95))",
];

export default function MovieCard({ movie }) {
  const rating = Number(movie.rating);
  const ratingLabel = getRatingLabel(rating);

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group block"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-[#252529] shadow-[0_18px_36px_rgba(0,0,0,0.3)] transition duration-300 group-hover:-translate-y-1 group-hover:border-[#FF3B78]/55">
        <div
          className="absolute inset-0 transition duration-300 group-hover:scale-[1.04]"
          style={{ background: gradients[movie.id % gradients.length] }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center transition duration-300 group-hover:scale-[1.03]">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-[#252529] bg-[#080808] text-lg font-black text-[#F5F5F5] shadow-md">
            F
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#85858C]">
            Frame Rate
          </span>
        </div>

        <div className="absolute right-3 top-3 rounded-md border border-[#FF3B78]/30 bg-[#080808]/82 px-2.5 py-1 text-xs font-bold text-[#FF3B78] shadow-sm backdrop-blur-sm">
          ★ {rating.toFixed(1)}
        </div>

        <div className="absolute bottom-3 left-3 rounded-md bg-[#FF3B78] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#101012]">
          {ratingLabel}
        </div>
      </div>

      <div className="px-1 pb-1 pt-4">
        <h3 className="text-lg font-bold leading-snug text-[#F5F5F5] transition group-hover:text-[#FF3B78]">
          {movie.title}
        </h3>

        <p className="mt-1.5 text-sm text-[#85858C]">
          {movie.year} · {movie.genre?.slice(0, 2).join(" · ") || "Drama"}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-[#FF3B78]">★ {rating.toFixed(1)}</span>
          <span className="text-xs text-[#85858C]">/ 10</span>
        </div>
      </div>
    </Link>
  );
}
