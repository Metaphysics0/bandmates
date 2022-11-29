"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Users } from "../lib/supabase/db";
import supabase from "../lib/supabase/supabase-browser";
import { useUser } from "./userProvider";

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

  const [user, setUser] = useUser();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user?.id) {
        const { data: user, error: userError } = await Users.find(
          session.user?.id
        );
        // @ts-ignore
        if (user[0]) setUser(user[0]);
      }
      if (event === "SIGNED_OUT") setUser(null);
      if (session?.access_token !== accessToken) {
        // server and client are out of sync
        // reload the page to fetch fresh server data
        // https://beta.nextjs.org/docs/data-fetching/mutating
        router.refresh();
      }
    });
  }, [accessToken, router, setUser]);

  return null;
}
