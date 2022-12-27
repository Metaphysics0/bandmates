import supabase from "./supabase-browser";

export async function SignInWithSpotify() {
  return await supabase.auth.signInWithOAuth({
    provider: "spotify",
    options: {
      scopes:
        "user-top-read user-read-currently-playing user-read-playback-state",
    },
  });
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
}

export async function getSession() {
  return await supabase.auth.getSession();
}
