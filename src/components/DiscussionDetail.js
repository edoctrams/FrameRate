"use client";

/* eslint-disable react-hooks/set-state-in-effect */

/* Discussion detail — works for seeded discussions and for anything a user
   creates in Spaces, because the record is resolved from the same store the
   create form writes to. */

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
  formatPostedAt,
  getCommentCount,
  getCommentThread,
  getInterestedCount,
  getSeedComments,
  getSpacesItem,
  getTabByType,
  hasShownInterest,
  toggleInterest,
} from "../lib/spaces";

export default function DiscussionDetail({ id, initialItem = null }) {
  const tab = getTabByType("discussion");

  const [discussion, setDiscussion] = useState(initialItem);
  const [ready, setReady] = useState(Boolean(initialItem));
  const [thread, setThread] = useState(() => getSeedComments("discussion", id));
  const [commentCount, setCommentCount] = useState(
    Number(initialItem?.replies ?? 0) || 0
  );
  const [interested, setInterested] = useState(Number(initialItem?.interested ?? 0) || 0);
  const [active, setActive] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    setDiscussion(getSpacesItem("discussion", id));
    setReady(true);
    setThread(getCommentThread("discussion", id));
    setCommentCount(getCommentCount("discussion", id));
    setInterested(getInterestedCount("discussion", id));
    setActive(hasShownInterest("discussion", id));
  }, [id]);

  const requireUser = (action) => {
    const user = getCurrentUser();
    if (!user) {
      setShowGate(true);
      return null;
    }
    return user;
  };

  const handleInterest = () => {
    if (!requireUser()) return;
    const result = toggleInterest("discussion", id);
    setActive(result.active);
    setInterested(result.count);
  };

  const addReply = () => {
    if (!replyText.trim()) return;
    const user = requireUser();
    if (!user) return;

    addComment("discussion", id, {
      id: Date.now(),
      author: user.name || "You",
      createdAt: new Date().toISOString(),
      content: replyText.trim(),
    });

    setThread(getCommentThread("discussion", id));
    setCommentCount(getCommentCount("discussion", id));
    setReplyText("");
  };

  if (!ready) {
    return (
      <main className="fr-page">
        <Navbar />
        <div className="fr-shell">
          <p className="text-sm text-[#85858C]">Loading discussion…</p>
        </div>
      </main>
    );
  }

  if (!discussion) {
    return (
      <main className="fr-page">
        <Navbar />
        <div className="fr-shell text-center">
          <h1 className="text-3xl font-black text-[#F5F5F5]">Discussion not found</h1>
          <p className="mt-3 text-sm text-[#85858C]">
            This conversation may have been removed, or the link is incorrect.
          </p>
          <Link href={tab.href} className="fr-button mt-6 inline-flex rounded-full">
            Back to Discussions
          </Link>
        </div>
      </main>
    );
  }
return (
    <main className="fr-page">
      <Navbar />

      <div className="fr-shell">
        <Link
          href={tab.href}
          className="px-2 text-sm text-[#85858C] transition hover:text-[#FF3B78] sm:px-8 xl:px-0"
        >
          ← Back to Discussions
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0 px-2 sm:px-8 xl:px-0">
            <article className="rounded-2xl border border-[#252529] bg-[#151518] p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#FF3B78]/30 bg-[#FF3B78]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF3B78]">
                  Discussion
                </span>
                {discussion.movie ? (
                  discussion.movieId ? (
                    <Link
                      href={`/movie/${discussion.movieId}`}
                      className="rounded-full border border-[#252529] bg-[#101012] px-3 py-1.5 text-xs text-[#85858C] transition hover:border-[#FF3B78]/50 hover:text-[#FF3B78]"
                    >
                      {discussion.movie}
                    </Link>
                  ) : (
                    <span className="rounded-full border border-[#252529] bg-[#101012] px-3 py-1.5 text-xs text-[#85858C]">
                      {discussion.movie}
                    </span>
                  )
                ) : null}
              </div>

              <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-[#F5F5F5] sm:text-4xl">
                {discussion.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-[#85858C]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#252529] bg-[#080808] text-xs font-bold text-[#FF3B78]">
                  {discussion.author?.charAt(0)?.toUpperCase() || "U"}
                </span>
                <span className="font-semibold text-[#F5F5F5]">{discussion.author}</span>
                <span className="text-[#55555C]">·</span>
                <span className="text-xs text-[#55555C]">{formatPostedAt(discussion)}</span>
              </div>

              <div className="mt-8 border-t border-[#252529] pt-8 text-base leading-8 text-[#85858C]">
                {discussion.content || "No content provided for this discussion."}
              </div>

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
            </article>

            <section className="mt-10">
              <h2 className="text-xl font-black tracking-tight text-[#F5F5F5]">
                Comments ({commentCount})
              </h2>

              <div className="mt-5 flex flex-col gap-3">
                {thread.length === 0 ? (
                  <p className="text-sm text-[#85858C]">
                    No comments yet. Start the conversation.
                  </p>
                ) : (
                  thread.map((reply) => (
                    <CommentRow key={`discussion-${id}-reply-${reply.id}`} comment={reply} />
                  ))
                )}
              </div>

              <div className="mt-8 rounded-2xl border border-[#252529] bg-[#151518] p-5 sm:p-6">
                <h3 className="text-lg font-bold text-[#F5F5F5]">Join the discussion</h3>
                <textarea
                  value={replyText}
                  onChange={(event) => setReplyText(event.target.value)}
                  rows={5}
                  placeholder="Write your reply…"
                  className="mt-4 w-full resize-none rounded-lg border border-[#252529] bg-[#080808] px-4 py-3 text-[#F5F5F5] outline-none transition placeholder:text-[#55555C] focus:border-[#FF3B78] focus:ring-2 focus:ring-[#FF3B78]/20"
                />
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={addReply}
                    disabled={!replyText.trim()}
                    className="fr-button rounded-full disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Post Reply
                  </button>
                </div>
              </div>
            </section>
          </div>

          <aside className="px-2 sm:px-8 xl:sticky xl:top-28 xl:self-start xl:px-0">
            <MostInterested activeTab="discussions" />
          </aside>
        </div>
      </div>

      <SignInGate open={showGate} action="join this discussion" onClose={() => setShowGate(false)} />
    </main>
  );
}