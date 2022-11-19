import { Provider } from "@supabase/supabase-js";
import { supabase } from "./client";

export async function signInWithSpotify() {
  const { data, error } = await oAuthSignIn("spotify");
}

export async function signInWithGoogle() {
  const { data, error } = await oAuthSignIn("google");
}

export async function signout() {
  const { error } = await supabase.auth.signOut();
}

const oAuthSignIn = (provider: Provider) =>
  supabase.auth.signInWithOAuth({ provider });
