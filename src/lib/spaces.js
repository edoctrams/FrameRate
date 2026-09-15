import { safeGetItem, safeSetItem } from "./storage";
import { seededDiscussions } from "../data/spaces";
import { seededTrailers, seededNews } from "../data/trailers-news";
import { initialComments } from "../data/comments";

/* Spaces is the community area of Frame Rate: Discussions, Trailers and News.
   All three sections share one shell, one side rail and one storage layer. */

export const SPACES_TABS = [
  { key: "discussions", type: "discussion", label: "Discussions", href: "/spaces/discussions" },
  { key: "trailers", type: "trailer", label: "Trailers", href: "/spaces/trailers" },
  { key: "news", type: "news", label: "News", href: "/spaces/news" },
];

export function getTabByKey(key) {
  return SPACES_TABS.find((tab) => tab.key === key) || SPACES_TABS[0];
}

export function getTabByType(type) {
  return SPACES_TABS.find((tab) => tab.type === type) || SPACES_TABS[0];
}

export function detailHref(type, id) {
  return `${getTabByType(type).href}/${id}`;
}

export const SEEDED_BY_TYPE = {
  discussion: seededDiscussions,
  trailer: seededTrailers,
  news: seededNews,
};

const DISCUSSIONS_KEY = "discussions";
const INTEREST_TOTAL_KEY = "spaces-interested-totals";

function commentsKey(type, id) {
  return `spaces-comments-${type}-${id}`;
}

function interestFlagKey(type, id) {
  return `spaces-interested-${type}-${id}`;
}

/* ---------------------------------------------------------------- items --- */

export function getStoredDiscussions() {
  const stored = safeGetItem(DISCUSSIONS_KEY, []);
  return Array.isArray(stored) ? stored : [];
}

export function getAllDiscussions() {
  const stored = getStoredDiscussions();
  const seededIds = new Set(seededDiscussions.map((item) => String(item.id)));
  const userCreated = stored.filter((item) => !seededIds.has(String(item.id)));
  return [...userCreated, ...seededDiscussions];
}

export function getItemsByType(type) {
  if (type === "discussion") return getAllDiscussions();
  return SEEDED_BY_TYPE[type] || [];
}

export function getSpacesItem(type, id) {
  return getItemsByType(type).find((item) => String(item.id) === String(id)) || null;
}

export function saveDiscussion(discussion) {
  const stored = getStoredDiscussions();
  const withoutDuplicate = stored.filter((item) => String(item.id) !== String(discussion.id));
  const next = [discussion, ...withoutDuplicate];
  safeSetItem(DISCUSSIONS_KEY, next);
  return next;
}

export function getItemsRankedByInterest(type) {
  return [...getItemsByType(type)].sort(
    (a, b) => getInterestedCount(type, b.id) - getInterestedCount(type, a.id)
  );
}

/* --------------------------------------------------------------- counts --- */

export function formatCount(value) {
  const number = Number(value) || 0;
  if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
  if (number >= 1000) return `${(number / 1000).toFixed(1)}K`;
  return String(number);
}

export function formatRelativeTime(isoString) {
  if (!isoString) return "";
  const then = new Date(isoString).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Math.max(0, Date.now() - then);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatPostedAt(item) {
  if (!item) return "";
  return item.time || formatRelativeTime(item.createdAt);
}

/* ------------------------------------------------------------- comments --- */

export function getSeedComments(type, id) {
  return initialComments[`${type}-${id}`] || [];
}

export function getUserComments(type, id) {
  const stored = safeGetItem(commentsKey(type, id), null);
  if (Array.isArray(stored)) return stored;
  if (type === "discussion") {
    // Discussions created in the earlier build stored replies under this key.
    const legacy = safeGetItem(`discussion-replies-${id}`, null);
    if (Array.isArray(legacy)) return legacy;
  }
  return [];
}

export function getCommentThread(type, id) {
  return [...getSeedComments(type, id), ...getUserComments(type, id)];
}

export function getCommentCount(type, id) {
  // Derived from the rendered thread so the count on a card always equals the
  // number of comments shown on its detail page.
  return getCommentThread(type, id).length;
}

export function addComment(type, id, comment) {
  const next = [...getUserComments(type, id), comment];
  safeSetItem(commentsKey(type, id), next);
  return next;
}

/* ----------------------------------------------------------- interested --- */

function getInterestTotals() {
  const totals = safeGetItem(INTEREST_TOTAL_KEY, {});
  return totals && typeof totals === "object" ? totals : {};
}

export function hasShownInterest(type, id) {
  return safeGetItem(interestFlagKey(type, id), false) === true;
}

export function getInterestedCount(type, id) {
  const item = getSpacesItem(type, id);
  const base = Number(item?.interested ?? 0) || 0;
  const delta = Number(getInterestTotals()[`${type}-${id}`]) || 0;
  return base + delta;
}

export function toggleInterest(type, id) {
  const totals = getInterestTotals();
  const key = `${type}-${id}`;
  const active = hasShownInterest(type, id);

  totals[key] = (Number(totals[key]) || 0) + (active ? -1 : 1);
  safeSetItem(INTEREST_TOTAL_KEY, totals);
  safeSetItem(interestFlagKey(type, id), !active);

  return { active: !active, count: getInterestedCount(type, id) };
}

/* --------------------------------------------------------- most interest --- */

/* Pure seed ranking — no localStorage access, so it is safe to use as the
   initial render state (server + first client paint stay identical). */
export function getSeedMostInterested(limit = 5) {
  const rows = SPACES_TABS.flatMap((tab) =>
    (SEEDED_BY_TYPE[tab.type] || []).map((item) => ({
      type: tab.type,
      id: item.id,
      title: item.title || item.headline,
      movie: item.movie,
      tabKey: tab.key,
      tabLabel: tab.label,
      href: detailHref(tab.type, item.id),
      interested: Number(item.interested ?? 0) || 0,
      comments: Number(item.replies ?? item.comments ?? 0) || 0,
    }))
  );

  return rows.sort((a, b) => b.interested - a.interested).slice(0, limit);
}

export function getMostInterested(limit = 5) {
  const rows = SPACES_TABS.flatMap((tab) =>
    getItemsByType(tab.type).map((item) => ({
      type: tab.type,
      id: item.id,
      title: item.title || item.headline,
      movie: item.movie,
      tabKey: tab.key,
      tabLabel: tab.label,
      href: detailHref(tab.type, item.id),
      interested: getInterestedCount(tab.type, item.id),
      comments: getCommentCount(tab.type, item.id),
    }))
  );

  return rows.sort((a, b) => b.interested - a.interested).slice(0, limit);
}