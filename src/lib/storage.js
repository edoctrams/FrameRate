export function safeParse(value, fallback = null) {
  if (value === null || value === undefined) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function safeGetItem(key, fallback = null) {
  if (typeof localStorage === "undefined") return fallback;
  try {
    return safeParse(localStorage.getItem(key), fallback);
  } catch {
    return fallback;
  }
}

export function safeSetItem(key, value) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures (e.g. quota exceeded, private mode).
  }
}