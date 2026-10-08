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

  // Create the collection
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
    console.error("Error creating collection:", collectionError);
    return {
      data: null,
      error: collectionError,
    };
  }

  // Add the first movie to the new collection
  const { error: movieError } = await supabase
    .from("collection_movies")
    .insert({
      collection_id: collection.id,
      movie_id: Number(movieId),
    });

  if (movieError) {
    console.error("Error adding movie to new collection:", movieError);
    return {
      data: null,
      error: movieError,
    };
  }

  return {
    data: collection,
    error: null,
  };
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
  const collection = Number(collectionId);
  const movie = Number(movieId);

  // Check whether the movie is already in this collection
  const { data: existingMovie, error: checkError } = await supabase
    .from("collection_movies")
    .select("collection_id, movie_id")
    .eq("collection_id", collection)
    .eq("movie_id", movie)
    .maybeSingle();

  if (checkError) {
    console.error("Error checking collection:", checkError);

    return {
      error: checkError,
    };
  }

  // Movie is already present
  if (existingMovie) {
    return {
      error: new Error("Movie is already in this collection."),
    };
  }

  // Add movie to collection
  const { error } = await supabase
    .from("collection_movies")
    .insert({
      collection_id: collection,
      movie_id: movie,
    });

  if (error) {
    console.error("Error adding movie to collection:", error);

    return {
      error,
    };
  }

  return {
    error: null,
  };
}