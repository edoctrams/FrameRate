"use client";

import { useMemo, useState } from "react";
import Navbar from "../../components/navbar";
import MovieCard from "../../components/MovieCard";
import { movies } from "../../data/movies";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("Content");

  const tabs = ["Content", "Collections", "Cast & Crew", "Users"];

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
        <section className="px-2 pb-4 pt-12 sm:px-8">
          <span className="fr-label">Search Frame Rate</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#F5F5F5] sm:text-5xl">
            Search the <span className="text-[#FF3B78]">archive.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[#85858C]">
            Search movies and series by title, genre, platform, or year.
          </p>

          <div className="relative mt-8 max-w-3xl">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#85858C]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, shows, cast & crew or users..."
              className="h-14 w-full rounded-full border border-[#252529] bg-[#080808] pl-14 pr-12 text-base text-[#F5F5F5] placeholder:text-[#55555C] outline-none transition focus:border-[#FF3B78] focus:ring-2 focus:ring-[#FF3B78]/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-[#252529] bg-[#151518] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-[#85858C] transition hover:border-[#FF3B78]/50 hover:text-[#FF3B78]"
              >
                Clear
              </button>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {tabs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  tab === item
                    ? "bg-[#FF3B78] text-[#F5F5F5]"
                    : "border border-[#252529] bg-[#151518] text-[#85858C] hover:text-[#F5F5F5]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {tab !== "Content" ? (
          <div className="fr-panel mt-14 rounded-2xl p-16 text-center">
            <p className="text-xl font-bold text-[#F5F5F5]">No {tab.toLowerCase()} results yet.</p>
            <p className="mt-3 text-sm text-[#85858C]">
              Searching {tab} is coming soon — switch to Content to search movies and series.
            </p>
          </div>
        ) : (
        <div className="mt-14">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-[#F5F5F5]">
                {query ? "Search Results" : "Popular on Frame Rate"}
              </h2>
              <p className="mt-1 text-sm text-[#85858C]">
                {filteredMovies.length} result{filteredMovies.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          {filteredMovies.length === 0 ? (
            <div className="fr-panel rounded-2xl p-16 text-center">
              <p className="text-xl font-bold text-[#F5F5F5]">No results found.</p>
              <p className="mt-3 text-[#85858C]">Try another title, genre, year, or platform.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
        )}
      </div>
    </main>
  );
}
