import supabase from "./supabase-browser";

export async function SignInWithSpotify() {
  return await supabase.auth.signInWithOAuth({
    provider: "spotify",
  });
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
}

export async function getSession() {
  return await supabase.auth.getSession();
}
