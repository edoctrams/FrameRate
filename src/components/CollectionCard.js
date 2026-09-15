import Link from "next/link";
import { getMovieById } from "../data/movies";

const gradients = [
  "linear-gradient(160deg, rgba(255,59,120,0.35), rgba(90,20,50,0.55) 45%, rgba(8,8,8,0.95))",
  "linear-gradient(160deg, rgba(120,60,200,0.35), rgba(40,15,70,0.55) 45%, rgba(8,8,8,0.95))",
  "linear-gradient(160deg, rgba(20,140,150,0.32), rgba(10,50,60,0.55) 45%, rgba(8,8,8,0.95))",
  "linear-gradient(160deg, rgba(40,90,200,0.32), rgba(15,30,70,0.55) 45%, rgba(8,8,8,0.95))",
  "linear-gradient(160deg, rgba(160,40,60,0.35), rgba(60,12,25,0.55) 45%, rgba(8,8,8,0.95))",
];

/* Collections store movie ids in localStorage; older records may already hold
   movie objects. Normalise both so every preview tile has a stable key. */
function resolveMovie(entry) {
  if (entry && typeof entry === "object") return entry;
  return getMovieById(entry);
}

function initialsFor(title, fallback) {
  if (!title) return fallback;
  return title.replace(/[^a-zA-Z0-9 ]/g, "").trim().slice(0, 2).toUpperCase();
}

export default function CollectionCard({ collection, onLike }) {
  const resolvedMovies = (collection.movies ?? []).map(resolveMovie).filter(Boolean);
  const movieCount = resolvedMovies.length;
  const previewMovies = resolvedMovies.slice(0, 5);

  return (
    <div className="group rounded-2xl border border-[#252529] bg-[#151518] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#FF3B78]/50">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-black tracking-tight text-[#F5F5F5]">
            {collection.name}
          </h2>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#55555C]">
            {collection.creator ?? "Frame Rate"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onLike?.(collection.id)}
          className="shrink-0 rounded-full border border-[#FF3B78]/35 bg-[#FF3B78]/10 px-3 py-1.5 text-xs font-semibold text-[#FF3B78] transition hover:border-[#FF3B78]"
        >
          ▲ {collection.likes ?? 0}
        </button>
      </div>

      {collection.description ? (
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#85858C]">
          {collection.description}
        </p>
      ) : null}

      <div className="mt-5 flex gap-2">
        {previewMovies.length > 0 ? (
          previewMovies.map((movie, index) => (
            <div
              key={`preview-${movie.id ?? movie.title ?? "movie"}-${index}`}
              title={movie.title}
              className="relative h-20 w-14 shrink-0 overflow-hidden rounded-md border border-[#252529]"
              style={{ background: gradients[index % gradients.length] }}
            >
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[#F5F5F5]/70">
                {initialsFor(movie.title, "F")}
              </span>
            </div>
          ))
        ) : (
          <span className="text-sm text-[#55555C]">No movies yet</span>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#252529] pt-4">
        <span className="text-xs uppercase tracking-[0.16em] text-[#55555C]">
          {movieCount} {movieCount === 1 ? "film" : "films"} · {collection.likes ?? 0} likes
        </span>
        {movieCount > 0 ? (
          <Link
            href={`/collections/${collection.id}`}
            className="text-sm font-semibold text-[#FF3B78] transition hover:text-[#F5F5F5]"
          >
            View collection →
          </Link>
        ) : null}
      </div>
    </div>
  );
}

