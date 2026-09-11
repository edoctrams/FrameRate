"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { movies } from "../../data/movies";
import { seededDiscussions } from "../../data/discussions";
import DiscussionCard from "../../components/DiscussionCard";
import EmptyState from "../../components/EmptyState";
import { safeGetItem, safeSetItem } from "../../lib/storage";

export default function DiscussionsPage() {
  const [discussions, setDiscussions] = useState(seededDiscussions);
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");

  useEffect(() => {
    const saved = safeGetItem("discussions", []);
    if (saved && saved.length) {
      setDiscussions(saved);
    }
  }, []);

  const createDiscussion = () => {
    if (!title.trim()) return;

    const movie = movies.find((movie) => movie.id.toString() === selectedMovie);
    const newDiscussion = {
      id: Date.now(),
      title: title.trim(),
      movie: movie ? movie.title : null,
      movieId: movie ? movie.id : null,
      author: "You",
      replies: 0,
      time: "Just now",
      content: "",
    };

    const nextItems = [newDiscussion, ...discussions];
    setDiscussions(nextItems);
    safeSetItem("discussions", nextItems);
    setTitle("");
    setSelectedMovie("");
    setShowCreate(false);
  };

  return (
    <main className="fr-page">
      <Navbar />

      <div className="fr-shell">
        <div className="fr-panel flex flex-col gap-6 rounded-lg px-8 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-12">
          <div>
            <span className="fr-label">After the Screening</span>
            <h1 className="mt-4 text-4xl font-black tracking-normal text-[#EEEEEE] sm:text-5xl">
              Discussions
            </h1>
            <p className="mt-3 max-w-2xl text-base text-[#C9C9C9]">
              Talk about movies, endings, characters, and everything worth debating.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="fr-button"
          >
            + Start Discussion
          </button>
        </div>

        {discussions.length === 0 ? (
          <EmptyState
            title="No discussions yet."
            description="Start a conversation about a film, a scene, or a character decision."
            secondaryAction={<button type="button" onClick={() => setShowCreate(true)} className="fr-button mt-6 inline-flex">Start a Discussion</button>}
          />
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {discussions.map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
          </div>
        )}
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="w-full max-w-lg rounded-lg border border-[rgba(238,238,238,0.14)] bg-[#17191A] p-6 shadow-xl sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-[#EEEEEE]">Start a Discussion</h2>
              <button type="button" onClick={() => setShowCreate(false)} className="text-2xl text-[#92979D] transition hover:text-[#FFD369]">
                ×
              </button>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-[#C9C9C9]">Discussion title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What do you want to talk about?"
                className="mt-2 w-full rounded-lg border border-[rgba(238,238,238,0.14)] bg-[#0D0F10] px-4 py-3 text-[#EEEEEE] placeholder:text-[#92979D] outline-none transition focus:border-[#FFD369] focus:ring-2 focus:ring-[#FFD369]/20"
              />
            </div>

            <div className="mt-5">
              <label className="text-sm font-medium text-[#C9C9C9]">Tag a movie or series</label>
              <select
                value={selectedMovie}
                onChange={(e) => setSelectedMovie(e.target.value)}
                className="mt-2 w-full rounded-lg border border-[rgba(238,238,238,0.14)] bg-[#0D0F10] px-4 py-3 text-[#EEEEEE] outline-none transition focus:border-[#FFD369] focus:ring-2 focus:ring-[#FFD369]/20"
              >
                <option value="">No movie tag</option>
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.id}>{movie.title}</option>
                ))}
              </select>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button type="button" onClick={() => setShowCreate(false)} className="fr-button-secondary">
                Cancel
              </button>
              <button type="button" onClick={createDiscussion} disabled={!title.trim()} className="fr-button disabled:cursor-not-allowed disabled:opacity-50">
                Create Discussion
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
