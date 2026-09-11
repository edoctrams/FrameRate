"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import Link from "next/link";
import { useEffect, useState } from "react";
import { seededDiscussions, initialReplies } from "../data/discussions";
import { safeGetItem, safeSetItem } from "../lib/storage";

export default function DiscussionDetail({ id }) {
  const [discussion, setDiscussion] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const storedDiscussions = safeGetItem("discussions", []);
    const allDiscussions = [...storedDiscussions, ...seededDiscussions];
    const found = allDiscussions.find((d) => String(d.id) === String(id));
    setDiscussion(found || null);

    const storedReplies = safeGetItem(`discussion-replies-${id}`, null);
    setReplies(storedReplies || initialReplies[id] || []);
  }, [id]);

  const addReply = () => {
    if (!replyText.trim() || !discussion) return;

    const nextReplies = [
      ...replies,
      {
        id: Date.now(),
        author: "You",
        time: "Just now",
        content: replyText.trim(),
      },
    ];

    setReplies(nextReplies);
    safeSetItem(`discussion-replies-${id}`, nextReplies);
    setReplyText("");
  };

  if (!discussion) {
    return (
      <main className="fr-page">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h1 className="text-3xl font-black">Discussion not found</h1>
          <Link href="/discussions" className="fr-button mt-6 inline-flex">
            Back to Discussions
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="fr-shell">
      <Link href="/discussions" className="text-sm text-[#92979D] transition hover:text-[#FFD369]">
        ← Back to Discussions
      </Link>

      <article className="fr-panel mt-8 rounded-lg p-6 md:p-8">
        {discussion.movieId && (
          <Link href={`/movie/${discussion.movieId}`} className="inline-flex items-center rounded-md border border-[#FFD369]/35 bg-[#FFD369]/10 px-3 py-1.5 text-sm text-[#FFD369] transition hover:border-[#FFD369]">
            {discussion.movie}
          </Link>
        )}

        <h1 className="mt-5 text-3xl font-black leading-tight md:text-4xl">{discussion.title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[#92979D]">
          <span>by {discussion.author}</span>
          <span>•</span>
          <span>{discussion.time}</span>
        </div>

        <div className="mt-8 text-base leading-7 text-[#C9C9C9]">
          {discussion.content || "No content provided for this discussion."}
        </div>
      </article>

      <section className="mt-10">
        <h2 className="mb-5 text-xl font-bold text-[#EEEEEE]">
          {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
        </h2>

        <div className="space-y-3">
          {replies.map((reply) => (
            <div key={reply.id} className="rounded-lg border border-[rgba(238,238,238,0.12)] bg-[#17191A] p-5">
              <div className="flex items-center gap-2 text-sm text-[#92979D]">
                <span className="font-semibold text-[#EEEEEE]">{reply.author}</span>
                <span>•</span>
                <span>{reply.time}</span>
              </div>
              <p className="mt-3 text-base leading-6 text-[#C9C9C9]">{reply.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-[rgba(238,238,238,0.12)] bg-[#17191A] p-5">
        <h2 className="text-lg font-bold text-[#EEEEEE]">Join the discussion</h2>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write your reply..."
          rows={5}
          className="mt-3 w-full resize-none rounded-lg border border-[rgba(238,238,238,0.14)] bg-[#0D0F10] px-4 py-4 text-[#EEEEEE] placeholder:text-[#92979D] outline-none transition focus:border-[#FFD369] focus:ring-2 focus:ring-[#FFD369]/20"
        />

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={addReply}
            disabled={!replyText.trim()}
            className="fr-button disabled:cursor-not-allowed disabled:opacity-50"
          >
            Post Reply
          </button>
        </div>
      </section>
    </div>
  );
}
