import { supabase } from "./supabase";
export const CURRENT_USER = "Parth";

// Get reviews for a specific movie
export async function getReviewsForMovie(movieId) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("movie_id", Number(movieId))
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  const userIds = [...new Set(data.map((review) => review.user_id))];

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username, display_name")
    .in("id", userIds);

  const profileMap = Object.fromEntries(
    (profiles || []).map((profile) => [profile.id, profile])
  );

  return data.map((review) => {
    const profile = profileMap[review.user_id];

    return {
      id: review.id,
      movieId: String(review.movie_id),
      userId: review.user_id,
      username: profile?.username || "User",
      overallRating: Number(review.overall_rating),
      text: review.body,
      containsSpoilers: review.contains_spoilers,
      hasAdvancedReview: review.has_advanced_review,
      advancedRatings: review.advanced_ratings,
      createdAt: review.created_at,
    };
  });
}

// Save or update a review
export async function saveReview(review) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: null,
      error: new Error("You must be signed in."),
    };
  }

  const reviewData = {
    user_id: user.id,
    movie_id: Number(review.movieId),
    overall_rating: Number(review.overallRating),
    body: review.text.trim(),
    contains_spoilers: review.containsSpoilers,
    has_advanced_review: review.hasAdvancedReview,
    advanced_ratings: review.advancedRatings,
  };

  let data;
  let error;

  if (review.id) {
    const result = await supabase
      .from("reviews")
      .update(reviewData)
      .eq("id", review.id)
      .eq("user_id", user.id)
      .select()
      .single();

    data = result.data;
    error = result.error;
  } else {
    const result = await supabase
      .from("reviews")
      .insert(reviewData)
      .select()
      .single();

    data = result.data;
    error = result.error;
  }

  if (error) {
    console.error("Error saving review:", error);
  }

  return { data, error };
}

// Delete a review
export async function deleteReview(movieId, reviewId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: new Error("You must be signed in."),
    };
  }

  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId)
    .eq("user_id", user.id)
    .eq("movie_id", Number(movieId));

  if (error) {
    console.error("Error deleting review:", error);
  }

  return { error };
}

// Get review statistics
export async function getReviewStats(movieId) {
  const reviews = await getReviewsForMovie(movieId);

  if (reviews.length === 0) {
    return null;
  }

  const total = reviews.reduce(
    (sum, review) => sum + Number(review.overallRating),
    0
  );

  return {
    average: total / reviews.length,
    count: reviews.length,
  };
}
export async function reportReview(reviewId, reason) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: new Error("You must be signed in.") };
  }

  const { error } = await supabase
    .from("review_reports")
    .insert({
      review_id: reviewId,
      reporter_id: user.id,
      reason: reason,
    });

  if (error) {
    console.error("Error reporting review:", error);
  }

  return { error };
}