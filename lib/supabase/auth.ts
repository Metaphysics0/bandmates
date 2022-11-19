import { Provider } from "@supabase/supabase-js";
import { supabase } from "./client";

export async function SignInWithOAuth(provider: Provider) {
  const { data, error } = await oAuthSignIn(provider);
  console.log("DATA", data);
}

export async function signout() {
  const { error } = await supabase.auth.signOut();
}

const oAuthSignIn = (provider: Provider) =>
  supabase.auth.signInWithOAuth({ provider });

export const AVAILABLE_PROVIDERS: IAvailableProvider[] = ["spotify", "google"];

export type IAvailableProvider = "spotify" | "google";
