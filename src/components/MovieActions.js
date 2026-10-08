"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import {
  getCollections,
  addMovieToCollection,
  createCollection as createCollectionInSupabase,
} from "../lib/collections";
import { useEffect, useState } from "react";
import SignInGate from "./SignInGate";
import { getCurrentUser } from "../lib/auth";
import {
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
} from "../lib/watchlist";
import { safeGetItem, safeSetItem } from "../lib/storage";

export default function MovieActions({ movieId }) {
  const [watchLater, setWatchLater] = useState(false);
  const [showCollectionMenu, setShowCollectionMenu] = useState(false);
  const [collections, setCollections] = useState([]);
  const [gateAction, setGateAction] = useState(null);

  // Message shown when collection action has a problem
  const [collectionMessage, setCollectionMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadData() {
      const saved = await isInWatchlist(movieId);
      const savedCollections = await getCollections();

      if (active) {
        setWatchLater(saved);
        setCollections(savedCollections);
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [movieId]);

  const toggleWatchLater = async () => {
    const user = await getCurrentUser();

    if (!user) {
      setGateAction("add to Watch Later");
      return;
    }

    let result;

    if (watchLater) {
      result = await removeFromWatchlist(movieId);
    } else {
      result = await addToWatchlist(movieId);
    }

    if (result.error) {
      if (result.error.message === "Movie is already in Watch Later.") {
        return;
      }

      console.error("Watchlist error:", result.error);
      return;
    }

    setWatchLater(!watchLater);
  };

  const addToCollection = async (collectionId) => {
    // Clear any previous message
    setCollectionMessage("");

    const result = await addMovieToCollection(collectionId, movieId);

    if (result.error) {
      // Movie is already in this collection
      if (result.error.message === "Movie is already in this collection.") {
        setCollectionMessage("Movie is already in this collection.");
      } else {
        console.error("Error adding movie to collection:", result.error);
        setCollectionMessage("Could not add movie to collection.");
      }

      return;
    }

    // Successfully added
    setCollectionMessage("Movie added to collection.");
    setShowCollectionMenu(false);

    // Hide success message after 2 seconds
    setTimeout(() => {
      setCollectionMessage("");
    }, 2000);
  };

  const createCollection = async () => {
    const user = await getCurrentUser();

    if (!user) {
      setGateAction("create a collection");
      setShowCollectionMenu(false);
      return;
    }

    const name = prompt("Enter collection name:");

    if (!name || !name.trim()) {
      return;
    }

    const result = await createCollectionInSupabase({
      name: name.trim(),
      description:
        "A hand-picked run of films worth watching in one sitting.",
      movieId,
    });

    if (result.error) {
      console.error("Error creating collection:", result.error);
      setCollectionMessage("Could not create collection.");
      return;
    }

    setCollections([...collections, result.data]);
    setCollectionMessage("Collection created successfully.");
    setShowCollectionMenu(false);

    setTimeout(() => {
      setCollectionMessage("");
    }, 2000);
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
          onClick={() => {
            setShowCollectionMenu(!showCollectionMenu);
            setCollectionMessage("");
          }}
          className="fr-button-secondary"
        >
          + Collection
        </button>

        {showCollectionMenu && (
          <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-lg border border-[#252529] bg-[#151518] p-2 shadow-[0_16px_32px_rgba(0,0,0,0.4)]">
            <p className="px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-[#FF3B78]">
              Add to collection
            </p>

            {collections.length > 0 &&
              collections.map((collection) => (
                <button
                  key={collection.id}
                  type="button"
                  onClick={() => addToCollection(collection.id)}
                  className="w-full rounded-md px-3 py-2.5 text-left text-sm text-[#85858C] transition hover:bg-[#101012] hover:text-[#F5F5F5]"
                >
                  {collection.name}
                </button>
              ))}

            <button
              type="button"
              onClick={createCollection}
              className="mt-1 w-full rounded-md border-t border-[#252529] px-3 py-2.5 text-left text-sm text-[#F5F5F5] transition hover:bg-[#101012] hover:text-[#FF3B78]"
            >
              + Create new collection
            </button>
          </div>
        )}
      </div>

      {collectionMessage && (
        <p className="w-full text-sm text-[#85858C]">
          {collectionMessage}
        </p>
      )}

      <SignInGate
        open={Boolean(gateAction)}
        action={gateAction || "continue"}
        onClose={() => setGateAction(null)}
      />
    </div>
  );
}