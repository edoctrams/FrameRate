import { supabase } from "./supabase";

import { safeSetItem } from "./storage";

export const AUTH_KEY = "frameRateUser";


// Get the currently signed-in Supabase user
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}


// Check whether a user is signed in
export async function isSignedIn() {
  const user = await getCurrentUser();

  return Boolean(user);
}


// Register a new user
export async function registerUser({
  name,
  username,
  email,
  password,
}) {

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });


  if (error) {
    return { data: null, error };
  }


  return {
    data: {
      ...data,
      profile: {
        username: username.trim(),
        display_name: name.trim(),
      },
    },
    error: null,
  };
}


// Sign in an existing user
export async function loginUser(email, password) {

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });


  if (error) {
    return { data, error };
  }


  const user = data.user;


  if (user) {

    const { data: existingProfile } =
      await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();


    if (!existingProfile) {

      const username =
        user.email.split("@")[0];


      const { error: profileError } =
        await supabase
          .from("profiles")
          .insert({
            id: user.id,
            username: username,
            display_name: username,
          });


      if (profileError) {
        return {
          data: null,
          error: profileError,
        };
      }
    }
  }


  return {
    data,
    error: null,
  };
}


// Sign out
export async function signOut() {

  await supabase.auth.signOut();

  safeSetItem(AUTH_KEY, null);
}