"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import supabase from "../lib/supabase/client";

// this component handles refreshing server data when the user logs in or out
// this method avoids the need to pass a session down to child components
// in order to re-render when the user's session changes
// #elegant!
export default function SupabaseListener({
  accessToken,
}: {
  accessToken?: string;
}) {
  console.log("ACCESS TOKEN", accessToken);

  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        // server and client are out of sync
        // reload the page to fetch fresh server data
        // https://beta.nextjs.org/docs/data-fetching/mutating
        router.refresh();
      }
    });
  }, [accessToken]);

  return null;
}
