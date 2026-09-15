"use client";

/* eslint-disable react-hooks/set-state-in-effect */

/* Detail view for Frame Rate provided Spaces content: trailers and news.
   Users can read, mark interest and comment — they cannot create these. */

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import MostInterested from "./MostInterested";
import SignInGate from "./SignInGate";
import CommentRow from "./CommentRow";
import { getCurrentUser } from "../lib/auth";
import {
  addComment,
  formatCount,
  getCommentCount,
  getCommentThread,
  getInterestedCount,
  getSeedComments,
  getSpacesItem,
  getTabByType,
  hasShownInterest,
  toggleInterest,
} from "../lib/spaces";

const gradients = {
  trailer: "linear-gradient(150deg, rgba(255,59,120,0.4), rgba(90,20,50,0.45) 50%, rgba(8,8,8,0.96))",
  news: "linear-gradient(150deg, rgba(181,47,103,0.4), rgba(40,10,28,0.5) 50%, rgba(8,8,8,0.96))",
};

export default function ContentDetail({ type, id, initialItem = null }) {
  const tab = getTabByType(type);
  const isTrailer = type === "trailer";

  const [item, setItem] = useState(initialItem);
  const [ready, setReady] = useState(Boolean(initialItem));
  const [thread, setThread] = useState(() => getSeedComments(type, id));
  const [commentCount, setCommentCount] = useState(
    Number(initialItem?.comments ?? initialItem?.replies ?? 0) || 0
  );
  const [interested, setInterested] = useState(Number(initialItem?.interested ?? 0) || 0);
  const [active, setActive] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    setItem(getSpacesItem(type, id));
    setReady(true);
    setThread(getCommentThread(type, id));
    setCommentCount(getCommentCount(type, id));
    setInterested(getInterestedCount(type, id));
    setActive(hasShownInterest(type, id));
  }, [type, id]);

  const handleInterest = () => {
    if (!getCurrentUser()) {
      setShowGate(true);
      return;
    }
    const result = toggleInterest(type, id);
    setActive(result.active);
    setInterested(result.count);
  };

  const submitComment = () => {
    if (!commentText.trim()) return;

    if (!getCurrentUser()) {
      setShowGate(true);
      return;
    }

    const user = getCurrentUser();
    addComment(type, id, {
      id: Date.now(),
      author: user?.name || "You",
      createdAt: new Date().toISOString(),
      content: commentText.trim(),
    });

    setThread(getCommentThread(type, id));
    setCommentCount(getCommentCount(type, id));
    setCommentText("");
  };

  if (!ready) {
    return (
      <main className="fr-page">
        <Navbar />
        <div className="fr-shell">
          <p className="text-sm text-[#85858C]">Loading…</p>
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="fr-page">
        <Navbar />
        <div className="fr-shell text-center">
          <h1 className="text-3xl font-black text-[#F5F5F5]">Not found</h1>
          <p className="mt-3 text-sm text-[#85858C]">
            This {isTrailer ? "trailer" : "story"} is no longer available.
          </p>
          <Link href={tab.href} className="fr-button mt-6 inline-flex rounded-full">
            Back to {tab.label}
          </Link>
        </div>
      </main>
    );
  }

  const title = isTrailer ? item.title : item.headline;
return (
    <main className="fr-page">
      <Navbar />

      <div className="fr-shell">
        <Link
          href={tab.href}
          className="px-2 text-sm text-[#85858C] transition hover:text-[#FF3B78] sm:px-8 xl:px-0"
        >
          ← Back to {tab.label}
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0 px-2 sm:px-8 xl:px-0">
            <article className="overflow-hidden rounded-2xl border border-[#252529] bg-[#151518]">
              <div
                aria-hidden
                className="relative flex h-40 items-center justify-center border-b border-[#252529] sm:h-52"
                style={{ background: gradients[type] || gradients.news }}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#F5F5F5]/25 bg-[#080808]/50 text-lg text-[#F5F5F5]">
                  {isTrailer ? "▶" : "✦"}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF3B78]">
                  {isTrailer ? "Trailer" : "News"}
                </span>
                <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#F5F5F5] sm:text-4xl">
                  {title}
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                  {item.movieId ? (
                    <Link
                      href={`/movie/${item.movieId}`}
                      className="rounded-full border border-[#FF3B78]/35 bg-[#FF3B78]/10 px-3 py-1.5 text-[#FF3B78] transition hover:border-[#FF3B78]"
                    >
                      {item.movie}
                    </Link>
                  ) : null}
                  <span className="rounded-full border border-[#252529] bg-[#101012] px-3 py-1.5 text-[#85858C]">
                    {isTrailer ? item.release : item.date}
                  </span>
                  <span className="rounded-full border border-[#252529] bg-[#101012] px-3 py-1.5 text-[#55555C]">
                    {isTrailer ? item.meta : item.distributor || "Frame Rate Desk"}
                  </span>
                </div>

                <p className="mt-6 text-base leading-8 text-[#85858C]">{item.description}</p>

                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#252529] pt-6">
                  <button
                    type="button"
                    onClick={handleInterest}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "border border-[#FF3B78] bg-[#FF3B78] text-[#F5F5F5]"
                        : "border border-[#FF3B78]/40 bg-[#FF3B78]/10 text-[#FF3B78] hover:border-[#FF3B78]"
                    }`}
                  >
                    <span aria-hidden>▲</span>
                    {formatCount(interested)} Interested
                  </button>
                  <span className="text-sm text-[#85858C]">
                    {commentCount} {commentCount === 1 ? "comment" : "comments"}
                  </span>
                </div>
              </div>
            </article>

            <section className="mt-10">
              <h2 className="text-xl font-black tracking-tight text-[#F5F5F5]">
                Comments ({commentCount})
              </h2>

              <div className="mt-5 flex flex-col gap-3">
                {thread.length === 0 ? (
                  <p className="text-sm text-[#85858C]">
                    No comments yet. Be the first to react.
                  </p>
                ) : (
                  thread.map((comment) => (
                    <CommentRow key={`${type}-${id}-comment-${comment.id}`} comment={comment} />
                  ))
                )}
              </div>

              <div className="mt-8 rounded-2xl border border-[#252529] bg-[#151518] p-5 sm:p-6">
                <h3 className="text-lg font-bold text-[#F5F5F5]">Add a comment</h3>
                <textarea
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                  rows={4}
                  placeholder={
                    isTrailer
                      ? "What did you think of this trailer?"
                      : "Share your take on this story."
                  }
                  className="mt-4 w-full resize-none rounded-lg border border-[#252529] bg-[#080808] px-4 py-3 text-[#F5F5F5] outline-none transition placeholder:text-[#55555C] focus:border-[#FF3B78] focus:ring-2 focus:ring-[#FF3B78]/20"
                />
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={submitComment}
                    disabled={!commentText.trim()}
                    className="fr-button rounded-full disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </section>
          </div>

          <aside className="px-2 sm:px-8 xl:sticky xl:top-28 xl:self-start xl:px-0">
            <MostInterested activeTab={tab.key} />
          </aside>
        </div>
      </div>

      <SignInGate open={showGate} action="join in" onClose={() => setShowGate(false)} />
    </main>
  );
}