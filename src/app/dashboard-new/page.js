import Navbar from "../../components/navbar";
import Link from "next/link";
import MovieCard from "../../components/MovieCard";
import { movies } from "../../data/movies";

const trending = [
  { movie: movies.find((m) => m.title === "Interstellar"), interested: "22.1K" },
  { movie: movies.find((m) => m.title === "The Dark Knight"), interested: "18.8K" },
  { movie: movies.find((m) => m.title === "Oppenheimer") ?? movies[5], interested: "18.4K" },
].filter((row) => row.movie);

const platforms = [
  { name: "Netflix", description: "Big hits, binge-worthy picks, and trending watches" },
  { name: "Prime Video", description: "Award-winning films and high-rotation favorites" },
  { name: "Hotstar", description: "Popular releases and fan-favorite streaming picks" },
];

function TrendingRow({ index, movie, interested }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group flex items-center gap-4 rounded-xl border border-transparent px-4 py-2.5 transition-colors duration-300 hover:border-[#252529] hover:bg-[#151518] sm:gap-5 sm:px-5"
    >
      <span className="w-8 text-xl font-black leading-none text-[#55555C] transition-colors duration-300 group-hover:text-[#FF3B78] sm:text-2xl">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-[#F5F5F5] sm:text-base">
        {movie.title}
        <span className="ml-2 hidden text-xs font-normal text-[#85858C] sm:inline">
          {movie.genre.slice(0, 2).join(" · ")}
        </span>
      </span>
      <span className="text-sm font-bold text-[#85858C] transition-colors duration-300 group-hover:text-[#FF3B78]">
        {interested}
        <span className="ml-2 hidden text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#55555C] sm:inline">
          Interested
        </span>
      </span>
      <span className="text-sm text-[#FF3B78] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">→</span>
    </Link>
  );
}

export default function DashboardPage() {
  return (
    <main className="fr-page">
      <Navbar />

      <div className="fr-shell">
        {/* Opening */}
        <section className="relative overflow-hidden px-2 pb-20 pt-16 sm:px-8 sm:pt-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[70rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,59,120,0.22), rgba(181,47,103,0.08) 60%, transparent)",
            }}
          />
          <div className="relative">
            <span className="fr-label">Frame Rate / 001</span>
            <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[1.04] tracking-tight text-[#F5F5F5] sm:text-6xl lg:text-[5.5rem]">
              A better way to find
              <br />
              <span className="text-[#FF3B78]">your next favorite</span>
              <br />
              film.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#85858C]">
              Frame Rate scores films the way they deserve — frame by frame. Discover,
              rate, and talk about the movies worth your time.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/search" className="fr-button rounded-full">
                Explore Movies
              </Link>
              <Link href="/spaces/discussions" className="fr-button-secondary rounded-full">
                Start a Discussion
              </Link>
            </div>
          </div>
        </section>

        {/* Trending — compact */}
        <section className="mt-6 max-w-3xl">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <span className="fr-label">Most Interested</span>
              <h2 className="mt-2 text-xl font-black tracking-tight text-[#F5F5F5]">
                Trending Now
              </h2>
            </div>
            <p className="text-xs text-[#55555C]">The titles everyone is talking about.</p>
          </div>
          <div className="flex flex-col gap-1">
            {trending.map((row, i) => (
              <TrendingRow key={row.movie.id} index={i} movie={row.movie} interested={row.interested} />
            ))}
          </div>
        </section>

        {/* Freshly indexed */}
        <section className="mt-24">
          <div className="mb-10">
            <span className="fr-label">Freshly Indexed</span>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#F5F5F5] sm:text-5xl">
              Explore the signal
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {movies.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {platforms.map((platform) => {
          const platformMovies = movies.filter((movie) => movie.platform === platform.name);
          if (!platformMovies.length) return null;
          return (
            <section key={platform.name} className="mt-28">
              <div className="mb-10">
                <span className="fr-label">The Streaming Guide</span>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-[#F5F5F5] sm:text-4xl">
                  {platform.name}
                </h2>
                <p className="mt-3 text-sm text-[#85858C]">{platform.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                {platformMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
