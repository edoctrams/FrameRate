import { safeGetItem, safeSetItem } from "./storage";

export const AUTH_KEY = "frameRateUser";

export function getCurrentUser() {
  return safeGetItem(AUTH_KEY, null);
}

export function isSignedIn() {
  const user = getCurrentUser();
  return Boolean(user && user.name);
}

export function signIn(user) {
  const nextUser = {
    name: user?.name || "Parth",
    email: user?.email || "parth@framerate.app",
    signedInAt: new Date().toISOString(),
  };
  safeSetItem(AUTH_KEY, nextUser);
  return nextUser;
}

export function signOut() {
  safeSetItem(AUTH_KEY, null);
}