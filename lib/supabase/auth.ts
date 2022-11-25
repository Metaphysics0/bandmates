import { SignInWithOAuthCredentials } from "@supabase/supabase-js";
import supabase from "./supbase-browser";

export async function SignInWithSpotify(queryParams: any = {}) {
  const oAuthParams: SignInWithOAuthCredentials = {
    provider: "spotify",
    options: { queryParams },
  };
  const { data, error } = await oAuthSignIn(oAuthParams);
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
