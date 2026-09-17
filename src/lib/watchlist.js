import { supabase } from "./supabase";

export async function addToWatchlist(movieId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: new Error("You must be signed in.") };
  }

  const { error } = await supabase.from("watchlist").insert({
    user_id: user.id,
    movie_id: Number(movieId),
  });

  return { error };
}

export async function removeFromWatchlist(movieId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: new Error("You must be signed in.") };
  }

  const { error } = await supabase
    .from("watchlist")
    .delete()
    .eq("user_id", user.id)
    .eq("movie_id", Number(movieId));

  return { error };
}
export async function isInWatchlist(movieId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { data, error } = await supabase
    .from("watchlist")
    .select("movie_id")
    .eq("user_id", user.id)
    .eq("movie_id", Number(movieId))
    .maybeSingle();

  if (error) {
    console.error("Error checking watchlist:", error);
    return false;
  }

  return Boolean(data);
}