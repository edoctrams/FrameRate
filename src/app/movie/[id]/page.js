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
            <Link href="/dashboard-new" className="mt-6 inline-block text-[#C9C9C9] transition hover:text-[#FFD369]">
              ← Back to Frame Rate
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const ratingLabel = getRatingLabel(movie.rating);

  return (
    <main className="fr-page">
      <Navbar />

      <div className="fr-shell">
        <Link href="/dashboard-new" className="text-sm text-[#92979D] transition hover:text-[#FFD369]">
          ← Back to Explore
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[340px_1fr]">
          <div className="flex aspect-[2/3] items-center justify-center rounded-lg border border-[rgba(238,238,238,0.12)] bg-[#17191A] shadow-[0_18px_42px_rgba(0,0,0,0.25)]">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg border border-[#393E46] bg-[#0D0F10] text-2xl font-black text-[#EEEEEE] shadow-md">
                F
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-[0.32em] text-[#92979D]">Frame Rate</p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#92979D]">
              {movie.type} · {movie.platform}
            </p>

            <h1 className="mt-4 text-5xl font-black leading-tight tracking-normal text-[#EEEEEE] sm:text-6xl">
              {movie.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-base text-[#C9C9C9]">
              <span>{movie.year}</span>
              <span>·</span>
              <span>{movie.duration}</span>
              <span>·</span>
              <span>{movie.genre.join(" · ")}</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="text-4xl font-black text-[#FFD369]">★ {movie.rating.toFixed(1)}</span>
              <span className="rounded-md bg-[#FFD369] px-3 py-1.5 text-sm font-bold text-[#222831]">
                {ratingLabel}
              </span>
            </div>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#C9C9C9]">{movie.description}</p>

            <MovieActions movieId={id} />
          </div>
        </div>

        <ReviewSection movieId={id} movieTitle={movie.title} />
      </div>
    </main>
  );
}
