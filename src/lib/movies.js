import { supabase } from "./supabase";

export async function getMovies() {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching movies:", error);
    return [];
  }

  return data;
}
export async function getMovieByIdFromSupabase(id) {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching movie:", error);
    return null;
  }

  return data;
}