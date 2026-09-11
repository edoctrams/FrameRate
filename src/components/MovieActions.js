"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { safeGetItem, safeSetItem } from "../lib/storage";

export default function MovieActions({ movieId }) {
  const [watchLater, setWatchLater] = useState(false);
  const [showCollectionMenu, setShowCollectionMenu] = useState(false);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const saved = safeGetItem(`watchLater-${movieId}`, false) === true;
    setWatchLater(saved);

    const savedCollections = safeGetItem("collections", []);
    setCollections(savedCollections);
  }, [movieId]);

  const toggleWatchLater = () => {
    const newValue = !watchLater;
    setWatchLater(newValue);
    safeSetItem(`watchLater-${movieId}`, newValue);
  };

  const addToCollection = (collectionName) => {
    const updatedCollections = collections.map((collection) => {
      if (collection.name !== collectionName) {
        return collection;
      }

      if (collection.movies.includes(movieId)) {
        return collection;
      }

      return {
        ...collection,
        movies: [...collection.movies, movieId],
      };
    });

    setCollections(updatedCollections);
    safeSetItem("collections", updatedCollections);
    setShowCollectionMenu(false);
  };

  const createCollection = () => {
    const name = prompt("Enter collection name:");

    if (!name || !name.trim()) {
      return;
    }

    const newCollection = {
      id: Date.now(),
      name: name.trim(),
      movies: [movieId],
      likes: 0,
    };

    const updatedCollections = [...collections, newCollection];
    setCollections(updatedCollections);
    safeSetItem("collections", updatedCollections);
    setShowCollectionMenu(false);
  };

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={toggleWatchLater}
        className="fr-button-secondary"
      >
        {watchLater ? "✓ Added to Watch Later" : "+ Watch Later"}
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowCollectionMenu(!showCollectionMenu)}
          className="fr-button-secondary"
        >
          + Collection
        </button>

        {showCollectionMenu && (
          <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-lg border border-[rgba(238,238,238,0.14)] bg-[#17191A] p-2 shadow-[0_16px_32px_rgba(0,0,0,0.4)]">
            <p className="px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-[#FFD369]">
              Add to collection
            </p>

            {collections.length > 0 &&
              collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => addToCollection(collection.name)}
                  className="w-full rounded-md px-3 py-2.5 text-left text-sm text-[#C9C9C9] transition hover:bg-[#222831] hover:text-[#EEEEEE]"
                >
                  {collection.name}
                </button>
              ))}

            <button
              type="button"
              onClick={createCollection}
              className="mt-1 w-full rounded-md border-t border-[rgba(238,238,238,0.12)] px-3 py-2.5 text-left text-sm text-[#EEEEEE] transition hover:bg-[#222831] hover:text-[#FFD369]"
            >
              + Create new collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
