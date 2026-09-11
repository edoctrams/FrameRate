import Navbar from "../components/navbar";
import Link from "next/link";
import MovieCard from "../components/MovieCard";
import { movies } from "../data/movies";

const talkOfTheTown = movies.slice(0, 8);

export default function Home() {
  return (
    <main className="fr-page">
      <Navbar />

      <div className="fr-shell">
        <section className="fr-hero px-8 py-14 sm:px-12 sm:py-16 lg:px-16">
          <div className="relative max-w-5xl">
            <span className="fr-label">Now Showing</span>
            <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-normal text-[#EEEEEE] sm:text-6xl lg:text-7xl">
              Good films
              <br />
              great conversations
              <br />
              <span className="text-[#FFD369]">What are you</span>
              <br />
              watching?
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#C9C9C9]">
              Discover films and series worth talking about, from award-winning cinema to the next conversation starter.
            </p>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.28em] text-[#FFD369]">
              EAT · SLEEP · BINGE · REVIEW · REPEAT
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/dashboard-new" className="fr-button">
                Explore Movies
              </Link>
              <Link href="/discussions" className="fr-button-secondary">
                Start a Discussion
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="fr-label">The Screen</span>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-[#EEEEEE] sm:text-4xl">
                Talk of the Town
              </h2>
              <p className="mt-2 text-sm text-[#92979D]">
                Films everyone&apos;s talking about right now.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {talkOfTheTown.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
