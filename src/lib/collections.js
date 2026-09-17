import { supabase } from "./supabase";

export async function createCollection({
  name,
  description,
  movieId,
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: null,
      error: new Error("You must be signed in."),
    };
  }

  const { data: collection, error: collectionError } = await supabase
    .from("collections")
    .insert({
      name,
      description,
      creator_id: user.id,
    })
    .select()
    .single();

  if (collectionError) {
    return { data: null, error: collectionError };
  }

  const { error: movieError } = await supabase
    .from("collection_movies")
    .insert({
      collection_id: collection.id,
      movie_id: Number(movieId),
    });

  if (movieError) {
    return { data: null, error: movieError };
  }

  return { data: collection, error: null };
}
export async function getCollections() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("creator_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching collections:", error);
    return [];
  }

  return data;
}
export async function addMovieToCollection(collectionId, movieId) {
  const { error } = await supabase
    .from("collection_movies")
    .insert({
      collection_id: Number(collectionId),
      movie_id: Number(movieId),
    });

  if (error) {
    console.error("Error adding movie to collection:", error);
    return { error };
  }

  return { error: null };
}