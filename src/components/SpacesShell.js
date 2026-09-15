"use client";

/* eslint-disable react-hooks/set-state-in-effect */

/* Shared shell for every Spaces section: Discussions, Trailers, News.
   All three tabs reuse the same heading, sub-navigation, feed grid and
   right-hand Most Interested rail so the area feels like one destination. */

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import MostInterested from "./MostInterested";
import DiscussionCard from "./DiscussionCard";
import SpacesContentCard from "./SpacesContentCard";
import SignInGate from "./SignInGate";
import { movies } from "../data/movies";
import { seededDiscussions } from "../data/spaces";
import { seededTrailers, seededNews } from "../data/trailers-news";
import { getCurrentUser } from "../lib/auth";
import {
  SPACES_TABS,
  getTabByKey,
  getItemsByType,
  getCommentCount,
  getInterestedCount,
  getSeedComments,
  saveDiscussion,
  formatRelativeTime,
} from "../lib/spaces";

const PURE_SEEDS = {
  discussion: seededDiscussions,
  trailer: seededTrailers,
  news: seededNews,
};

const TAB_COPY = {
  discussions: {
    heading: "Discussions",
    description:
      "Community-started conversations about films, endings, characters and everything worth debating.",
    cta: "Start a Discussion",
  },
  trailers: {
    heading: "Trailers",
    description:
      "Trailers, teasers and first looks picked by Frame Rate. Open one and tell everyone what you think.",
    cta: null,
  },
  news: {
    heading: "News",
    description: "Release dates, casting news and industry updates from the Frame Rate desk.",
    cta: null,
  },
};

function buildRows(type, items) {
  return items.map((item) => ({
    item,
    commentCount:
      Number(item.replies ?? item.comments ?? getSeedComments(type, item.id).length) || 0,
    interested: Number(item.interested ?? 0) || 0,
  }));
}

export default function SpacesShell({ tabKey = "discussions" }) {
  const tab = getTabByKey(tabKey);
  const copy = TAB_COPY[tab.key] || TAB_COPY.discussions;
  const isDiscussions = tab.type === "discussion";

  const [rows, setRows] = useState(() => buildRows(tab.type, PURE_SEEDS[tab.type] || []));
  const [showCreate, setShowCreate] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");

  const loadRows = () =>
    setRows(
      buildRows(
        tab.type,
        getItemsByType(tab.type)
      ).map((row) => ({
        ...row,
        commentCount: getCommentCount(tab.type, row.item.id),
        interested: getInterestedCount(tab.type, row.item.id),
      }))
    );

  useEffect(() => {
    loadRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab.type]);

  const openCreate = () => {
    if (!getCurrentUser()) {
      setShowGate(true);
      return;
    }
    setShowCreate(true);
  };

  const closeCreate = () => {
    setShowCreate(false);
    setTitle("");
    setBody("");
    setSelectedMovie("");
  };

  const createDiscussion = () => {
    if (!title.trim() || !body.trim()) return;

    const user = getCurrentUser();
    const movie = movies.find((item) => String(item.id) === selectedMovie);

    saveDiscussion({
      id: Date.now(),
      title: title.trim(),
      content: body.trim(),
      movie: movie ? movie.title : null,
      movieId: movie ? movie.id : null,
      author: user?.name || "You",
      createdAt: new Date().toISOString(),
      time: formatRelativeTime(new Date().toISOString()),
      replies: 0,
      interested: 0,
    });

    loadRows();
    closeCreate();
  };

  return (
    <main className="fr-page">
      <Navbar />

      <div className="fr-shell">
        <header className="px-2 sm:px-8">
          <span className="fr-label">Frame Rate / Community</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-[#F5F5F5] sm:text-5xl lg:text-6xl">
            Spaces<span className="text-[#FF3B78]">.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#85858C]">
            Discussions, trailers and news — one place for everything happening around the
            films you care about.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0 px-2 sm:px-8 xl:px-0">
            <div className="flex flex-col gap-5 border-b border-[#252529] pb-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex overflow-x-auto rounded-full border border-[#252529] bg-[#101012] p-1.5">
                {SPACES_TABS.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                      item.key === tab.key
                        ? "bg-[#FF3B78] text-[#F5F5F5]"
                        : "text-[#85858C] hover:text-[#F5F5F5]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {copy.cta ? (
                <button type="button" onClick={openCreate} className="fr-button shrink-0 rounded-full">
                  + {copy.cta}
                </button>
              ) : (
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#55555C]">
                  Curated by Frame Rate
                </span>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-black tracking-tight text-[#F5F5F5]">{copy.heading}</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#85858C]">{copy.description}</p>
            </div>

            {rows.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-[#252529] bg-[#151518] p-10 text-center">
                <p className="text-lg font-semibold text-[#F5F5F5]">Nothing here yet.</p>
                <p className="mt-2 text-sm text-[#85858C]">
                  {isDiscussions
                    ? "Be the first to start a conversation in this space."
                    : "New content is on the way."}
                </p>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-5">
                {rows.map(({ item, commentCount, interested }, index) =>
                  isDiscussions ? (
                    <DiscussionCard
                      key={`discussion-${item.id}`}
                      discussion={item}
                      commentCount={commentCount}
                      interested={interested}
                    />
                  ) : (
                    <SpacesContentCard
                      key={`${tab.type}-${item.id}`}
                      item={item}
                      type={tab.type}
                      index={index}
                      commentCount={commentCount}
                      interested={interested}
                    />
                  )
                )}
              </div>
            )}
          </div>

          <aside className="px-2 sm:px-8 xl:sticky xl:top-28 xl:self-start xl:px-0">
            <MostInterested activeTab={tab.key} />
          </aside>
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-10">
          <div className="w-full max-w-xl rounded-2xl border border-[#252529] bg-[#151518] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.6)] sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-[#252529] pb-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF3B78]">
                  Spaces / Discussions
                </span>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-[#F5F5F5]">
                  Start a Discussion
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCreate}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#252529] text-xl text-[#85858C] transition hover:border-[#FF3B78]/50 hover:text-[#FF3B78]"
              >
                ×
              </button>
            </div>

            <div className="mt-6">
              <label htmlFor="discussion-title" className="text-sm font-medium text-[#85858C]">
                Discussion title
              </label>
              <input
                id="discussion-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="What do you want to talk about?"
                className="mt-2 w-full rounded-lg border border-[#252529] bg-[#080808] px-4 py-3 text-[#F5F5F5] outline-none transition placeholder:text-[#55555C] focus:border-[#FF3B78] focus:ring-2 focus:ring-[#FF3B78]/20"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="discussion-body" className="text-sm font-medium text-[#85858C]">
                Discussion content
              </label>
              <textarea
                id="discussion-body"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={6}
                placeholder="Share the take, question or theory you want the community to weigh in on."
                className="mt-2 w-full resize-none rounded-lg border border-[#252529] bg-[#080808] px-4 py-3 text-[#F5F5F5] outline-none transition placeholder:text-[#55555C] focus:border-[#FF3B78] focus:ring-2 focus:ring-[#FF3B78]/20"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="discussion-movie" className="text-sm font-medium text-[#85858C]">
                Tag a movie or series <span className="text-[#55555C]">(optional)</span>
              </label>
              <select
                id="discussion-movie"
                value={selectedMovie}
                onChange={(event) => setSelectedMovie(event.target.value)}
                className="mt-2 w-full rounded-lg border border-[#252529] bg-[#080808] px-4 py-3 text-[#F5F5F5] outline-none transition focus:border-[#FF3B78] focus:ring-2 focus:ring-[#FF3B78]/20"
              >
                <option value="">No movie tag</option>
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button type="button" onClick={closeCreate} className="fr-button-secondary">
                Cancel
              </button>
              <button
                type="button"
                onClick={createDiscussion}
                disabled={!title.trim() || !body.trim()}
                className="fr-button disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create Discussion
              </button>
            </div>
          </div>
        </div>
      )}

      <SignInGate
        open={showGate}
        action="start a discussion"
        onClose={() => setShowGate(false)}
      />
    </main>
  );
}
