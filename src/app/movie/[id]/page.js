import Link from "next/link";
import MovieActions from "../../../components/MovieActions";
import Navbar from "../../../components/navbar";
import ReviewSection from "../../../components/ReviewSection";
import { getMovieById, getRatingLabel } from "../../../data/movies";

export default async function MoviePage({ params }) {
  const { id } = await params;
  const movie = getMovieById(id);

  if (!movie) {
    return (
      <main className="fr-page">
        <Navbar />
        <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-6 text-center">
          <div>
            <h1 className="text-4xl font-black">Movie not found</h1>
            <Link href="/dashboard-new" className="mt-6 inline-block text-[#85858C] transition hover:text-[#FF3B78]">
              ← Back to Frame Rate
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const ratingLabel = getRatingLabel(movie.rating);
  const rating = Number(movie.rating);

  const breakdown = [
    { label: "Cinematography", value: Math.min(10, rating + 0.2) },
    { label: "Direction", value: Math.min(10, rating + 0.1) },
    { label: "Acting", value: Math.min(10, rating) },
    { label: "Story", value: Math.min(10, rating - 0.2) },
    { label: "Music", value: Math.min(10, rating + 0.05) },
    { label: "Editing", value: Math.min(10, rating - 0.15) },
  ];

  return (
    <main className="fr-page">
      <Navbar />

      <div className="fr-shell">
        <Link href="/dashboard-new" className="text-sm text-[#85858C] transition hover:text-[#FF3B78]">
          ← Back to Explore
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[360px_1fr]">
          <div className="relative flex aspect-[2/3] items-center justify-center overflow-hidden rounded-2xl border border-[#252529] shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,59,120,0.32), rgba(90,20,50,0.5) 45%, rgba(8,8,8,0.95))",
              }}
            />
            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg border border-[#252529] bg-[#080808]/80 text-2xl font-black text-[#F5F5F5]">
                F
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-[0.32em] text-[#85858C]">Frame Rate</p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#85858C]">
              {movie.type} · {movie.platform}
            </p>

            <h1 className="mt-4 text-5xl font-black leading-tight tracking-normal text-[#F5F5F5] sm:text-6xl">
              {movie.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-base text-[#85858C]">
              <span>{movie.year}</span>
              <span>·</span>
              <span>{movie.duration}</span>
              <span>·</span>
              <span>{movie.genre.join(" · ")}</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="text-4xl font-black text-[#FF3B78]">★ {movie.rating.toFixed(1)}</span>
              <span className="rounded-full border border-[#FF3B78]/40 bg-[#FF3B78]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF3B78]">
                {ratingLabel}
              </span>
            </div>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#85858C]">{movie.description}</p>

            <MovieActions movieId={id} />
          </div>
        </div>

        {/* Frame Rate Breakdown */}
        <section className="mt-24 border-t border-[#252529] pt-14">
          <span className="fr-label">The Score, Decoded</span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#F5F5F5] sm:text-4xl">
            Frame Rate Breakdown
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-16 gap-y-8 sm:grid-cols-2">
            {breakdown.map((item) => (
              <div key={item.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-medium text-[#F5F5F5]">{item.label}</span>
                  <span className="text-sm font-bold text-[#FF3B78]">
                    {item.value.toFixed(1)}
                  </span>
                </div>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#151518]">
                  <div
                    className="h-full rounded-full bg-[#FF3B78] transition-all duration-500"
                    style={{ width: `${Math.round(item.value * 10)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <ReviewSection movieId={id} movieTitle={movie.title} />
      </div>
    </main>
  );
}
