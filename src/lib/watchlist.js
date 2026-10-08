import { supabase } from "./supabase";

export async function addToWatchlist(movieId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: new Error("You must be signed in."),
    };
  }

  const movie = Number(movieId);

  // Check if movie is already in Watch Later
  const { data: existingMovie, error: checkError } = await supabase
    .from("watchlist")
    .select("user_id, movie_id")
    .eq("user_id", user.id)
    .eq("movie_id", movie)
    .maybeSingle();

  if (checkError) {
    console.error("Error checking watchlist:", checkError);

    return {
      error: checkError,
    };
  }

  // Movie is already in Watch Later
  if (existingMovie) {
    return {
      error: new Error("Movie is already in Watch Later."),
    };
  }

  // Add movie to Watch Later
  const { error } = await supabase
    .from("watchlist")
    .insert({
      user_id: user.id,
      movie_id: movie,
    });

  if (error) {
    console.error("Error adding movie to Watch Later:", error);

    return {
      error,
    };
  }

  return {
    error: null,
  };
}


export async function removeFromWatchlist(movieId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: new Error("You must be signed in."),
    };
  }

  const movie = Number(movieId);

  const { error } = await supabase
    .from("watchlist")
    .delete()
    .eq("user_id", user.id)
    .eq("movie_id", movie);

  if (error) {
    console.error("Error removing movie from Watch Later:", error);

    return {
      error,
    };
  }

  return {
    error: null,
  };
}


export async function isInWatchlist(movieId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const movie = Number(movieId);

  const { data, error } = await supabase
    .from("watchlist")
    .select("movie_id")
    .eq("user_id", user.id)
    .eq("movie_id", movie)
    .maybeSingle();

  if (error) {
    console.error("Error checking watchlist:", error);
    return false;
  }

  return Boolean(data);
}