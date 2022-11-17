import { supabase } from "./client";

export async function signInWithSpotify() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "spotify",
  });
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}

export async function signout() {
  const { error } = await supabase.auth.signOut();
}
