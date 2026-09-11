"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useEffect, useState } from "react";
import { movies } from "../data/movies";
import MovieCard from "./MovieCard";
import EmptyState from "./EmptyState";
import { safeGetItem, safeSetItem } from "../lib/storage";

export default function CollectionDetail({ id }) {
  const [collection, setCollection] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const collections = safeGetItem("collections", []);
    const found = collections.find((c) => String(c.id) === String(id));
    setCollection(found || null);

    const voted = safeGetItem(`collection-voted-${id}`, false);
    setHasVoted(voted === true);
  }, [id]);

  const toggleLike = () => {
    if (!collection || hasVoted) return;

    const collections = safeGetItem("collections", []);
    const updated = collections.map((c) => {
      if (String(c.id) !== String(id)) return c;
      return { ...c, likes: (c.likes || 0) + 1 };
    });

    safeSetItem("collections", updated);
    safeSetItem(`collection-voted-${id}`, true);
    setHasVoted(true);
    setCollection({ ...collection, likes: (collection.likes || 0) + 1 });
  };

  if (!collection) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-3xl font-black text-[#EEEEEE]">Collection not found</h1>
        <p className="mt-3 text-[#92979D]">This collection may have been removed or never existed.</p>
        <Link href="/collections" className="fr-button mt-6 inline-flex">
          Back to Collections
        </Link>
      </div>
    );
  }

  const collectionMovies = (collection.movies || [])
    .map((movieId) => movies.find((m) => String(m.id) === String(movieId)))
    .filter(Boolean);

  return (
    <div className="fr-shell">
      <Link href="/collections" className="text-sm text-[#92979D] transition hover:text-[#FFD369]">
        ← Back to Collections
      </Link>

      <section className="fr-panel mt-8 rounded-lg p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="fr-label">Community</span>
            <h1 className="mt-4 text-4xl font-black tracking-normal text-[#EEEEEE] sm:text-5xl">
              {collection.name}
            </h1>
            <p className="mt-3 text-base text-[#92979D]">
              {collectionMovies.length} {collectionMovies.length === 1 ? "movie" : "movies"} in this collection
            </p>
          </div>

          <button
            type="button"
            onClick={toggleLike}
            disabled={hasVoted}
            className={`fr-button-secondary ${hasVoted ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            ▲ {collection.likes || 0} {hasVoted ? "• Liked" : "Like"}
          </button>
        </div>
      </section>

      {collectionMovies.length === 0 ? (
        <EmptyState
          title="No movies in this collection yet"
          description="Add movies to this collection from a movie page."
          actionLabel="Explore Movies"
          actionHref="/dashboard-new"
        />
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {collectionMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
