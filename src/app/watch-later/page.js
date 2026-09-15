"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import MovieCard from "../../components/MovieCard";
import { movies } from "../../data/movies";
import EmptyState from "../../components/EmptyState";
import { safeGetItem } from "../../lib/storage";

export default function WatchLaterPage() {
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const saved = movies.filter((movie) => safeGetItem(`watchLater-${movie.id}`, false) === true);
    setSavedMovies(saved);
  }, []);

  return (
    <main className="fr-page">
      <Navbar />

      <div className="fr-shell">
        <section className="px-2 pb-4 pt-12 sm:px-8">
          <span className="fr-label">Saved For Later</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#F5F5F5] sm:text-5xl">
            Watch Later<span className="text-[#FF3B78]">.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[#85858C]">
            Movies and series you want to revisit later.
          </p>
        </section>

        {savedMovies.length === 0 ? (
          <EmptyState
            title="You haven't added anything yet."
            description="Save movies you want to watch later and they will show up here."
            actionLabel="Explore Movies"
            actionHref="/dashboard-new"
          />
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {savedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
