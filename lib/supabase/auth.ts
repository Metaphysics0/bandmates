import { Provider, SignInWithOAuthCredentials } from "@supabase/supabase-js";
import supabase from "./client";

export async function SignInWithOAuth(credentials: SignInWithOAuthCredentials) {
  const { data, error } = await oAuthSignIn(credentials);
  console.log("DATA", data);
}

export async function signout() {
  const { error } = await supabase.auth.signOut();
}

export async function getSession() {
  return await supabase.auth.getSession();
}

const oAuthSignIn = (credentials: SignInWithOAuthCredentials) =>
  supabase.auth.signInWithOAuth(credentials);

export const AVAILABLE_PROVIDERS: IAvailableProvider[] = ["spotify", "google"];

export type IAvailableProvider = "spotify" | "google";
