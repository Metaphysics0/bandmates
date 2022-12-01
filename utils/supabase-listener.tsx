"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Users } from "../lib/supabase/db";
import supabase from "../lib/supabase/supabase-browser";
import { useLoggedInUser } from "../providers/userProvider";

// this component handles refreshing server data when the user logs in or out
// this method avoids the need to pass a session down to child components
// in order to re-render when the user's session changes
// #elegant!
export default function SupabaseListener({
  accessToken,
}: {
  accessToken?: string;
}) {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session !== null) {
        const user = await Users.loadUserFromSession(session);
        if (user) {
          console.log("setting logged in user!", user);

          setLoggedInUser(user);
        }
      }
      if (session?.access_token !== accessToken) {
        // server and client are out of sync
        // reload the page to fetch fresh server data
        // https://beta.nextjs.org/docs/data-fetching/mutating
        router.refresh();
      }
    });
  }, [accessToken, router, setLoggedInUser]);

  return null;
}
