"use client";

import { useMemo, useState } from "react";
import Navbar from "../../components/navbar";
import MovieCard from "../../components/MovieCard";
import { movies } from "../../data/movies";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredMovies = useMemo(() => {
    const searchText = query.trim().toLowerCase();
    if (!searchText) return movies;

    return movies.filter((movie) => {
      const joinedGenres = movie.genre.join(" ").toLowerCase();
      return (
        movie.title.toLowerCase().includes(searchText) ||
        joinedGenres.includes(searchText) ||
        String(movie.year).includes(searchText) ||
        movie.platform.toLowerCase().includes(searchText) ||
        movie.type.toLowerCase().includes(searchText)
      );
    });
  }, [query]);

  return (
    <main className="fr-page">
      <Navbar />

      <div className="fr-shell">
        <section className="fr-panel rounded-lg px-8 py-12 sm:px-12">
          <span className="fr-label">Find Your Next Screening</span>
          <h1 className="mt-4 text-4xl font-black tracking-normal text-[#EEEEEE] sm:text-5xl">
            Find Your Next Screening
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[#C9C9C9]">
            Search movies and series by title, genre, platform, or year.
          </p>

          <div className="relative mt-8 max-w-3xl">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#92979D]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, series, genres, years, or platforms..."
              className="h-14 w-full rounded-lg border border-[rgba(238,238,238,0.14)] bg-[#0D0F10] pl-14 pr-12 text-base text-[#EEEEEE] placeholder:text-[#92979D] outline-none transition focus:border-[#FFD369] focus:ring-2 focus:ring-[#FFD369]/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md border border-[rgba(238,238,238,0.14)] bg-[#17191A] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-[#C9C9C9] transition hover:border-[#FFD369]/50 hover:text-[#FFD369]"
              >
                Clear
              </button>
            )}
          </div>
        </section>

        <div className="mt-14">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-[#EEEEEE]">
                {query ? "Search Results" : "Popular on Frame Rate"}
              </h2>
              <p className="mt-1 text-sm text-[#92979D]">
                {filteredMovies.length} result{filteredMovies.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          {filteredMovies.length === 0 ? (
            <div className="fr-panel rounded-lg p-16 text-center">
              <p className="text-xl font-bold text-[#EEEEEE]">No results found.</p>
              <p className="mt-3 text-[#92979D]">Try another title, genre, year, or platform.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
