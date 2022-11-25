import { SignInWithOAuthCredentials } from "@supabase/supabase-js";
import supabase from "./supbase-browser";

export async function SignInWithSpotify(queryParams: any = {}) {
  const oAuthParams: SignInWithOAuthCredentials = {
    provider: "spotify",
    options: { queryParams },
  };
  return await oAuthSignIn(oAuthParams);
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
}

export async function getSession() {
  return await supabase.auth.getSession();
}

const oAuthSignIn = async (credentials: SignInWithOAuthCredentials) =>
  await supabase.auth.signInWithOAuth(credentials);

export const AVAILABLE_PROVIDERS: IAvailableProvider[] = ["spotify", "google"];

export type IAvailableProvider = "spotify" | "google";
