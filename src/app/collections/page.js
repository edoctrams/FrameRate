"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import EmptyState from "../../components/EmptyState";
import CollectionCard from "../../components/CollectionCard";
import { safeGetItem, safeSetItem } from "../../lib/storage";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const saved = safeGetItem("collections", []);
    setCollections(saved);
  }, []);

  const sortedCollections = [...collections].sort((a, b) => (b.likes || 0) - (a.likes || 0));

  const toggleLike = (collectionId) => {
    const votedKey = `collection-voted-${collectionId}`;
    const hasVoted = safeGetItem(votedKey, false) === true;
    if (hasVoted) return;

    const updated = collections.map((collection) => {
      if (String(collection.id) !== String(collectionId)) return collection;
      return { ...collection, likes: (collection.likes || 0) + 1 };
    });

    setCollections(updated);
    safeSetItem("collections", updated);
    safeSetItem(votedKey, true);
  };

  return (
    <main className="fr-page">
      <Navbar />

      <div className="fr-shell">
        <section className="fr-panel rounded-lg px-8 py-12 sm:px-12">
          <span className="fr-label">The Archive</span>
          <h1 className="mt-4 text-4xl font-black tracking-normal text-[#EEEEEE] sm:text-5xl">
            Community Collections
          </h1>
          <p className="mt-3 max-w-2xl text-base text-[#C9C9C9]">
            Community curated movie lists — discover what people are collecting.
          </p>
        </section>

        {sortedCollections.length === 0 ? (
          <EmptyState
            title="No collections yet"
            description="Create your first collection from a movie page."
            actionLabel="Explore Movies"
            actionHref="/dashboard-new"
          />
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sortedCollections.map((collection) => {
              const hasVoted = safeGetItem(`collection-voted-${collection.id}`, false) === true;
              return (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  onLike={hasVoted ? undefined : toggleLike}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
