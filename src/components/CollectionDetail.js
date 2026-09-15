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
        <h1 className="text-3xl font-black text-[#F5F5F5]">Collection not found</h1>
        <p className="mt-3 text-[#85858C]">This collection may have been removed or never existed.</p>
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
      <Link href="/collections" className="text-sm text-[#85858C] transition hover:text-[#FF3B78]">
        ← Back to Collections
      </Link>

      <section className="mt-8 border-b border-[#252529] pb-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="fr-label">Community Collection</span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-[#F5F5F5] sm:text-6xl">
              {collection.name}
            </h1>
            <p className="mt-5 text-base leading-7 text-[#85858C]">
              {collection.description ||
                "A hand-picked run of films curated by a Frame Rate member."}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[#55555C]">
              Curated by {collection.creator || "Frame Rate"} · {collectionMovies.length}{" "}
              {collectionMovies.length === 1 ? "film" : "films"} · {collection.likes || 0} likes
            </p>
          </div>

          <button
            type="button"
            onClick={toggleLike}
            disabled={hasVoted}
            className={`fr-button-secondary shrink-0 rounded-full ${hasVoted ? "cursor-not-allowed opacity-60" : ""}`}
          >
            ♥ {collection.likes || 0} {hasVoted ? "Liked" : "Like"}
          </button>
        </div>

        {collectionMovies.length > 0 && (
          <div className="mt-10 flex gap-3">
            {collectionMovies.slice(0, 5).map((movie, index) => (
              <div
                key={movie.id}
                className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg border border-[#252529]"
                style={{
                  background:
                    index % 3 === 0
                      ? "linear-gradient(160deg, rgba(255,59,120,0.35), rgba(8,8,8,0.95))"
                      : index % 3 === 1
                        ? "linear-gradient(160deg, rgba(120,60,200,0.35), rgba(8,8,8,0.95))"
                        : "linear-gradient(160deg, rgba(20,140,150,0.32), rgba(8,8,8,0.95))",
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-[#F5F5F5]/70">
                  F
                </span>
              </div>
            ))}
          </div>
        )}
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
