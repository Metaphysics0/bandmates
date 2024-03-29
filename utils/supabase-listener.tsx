"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import supabase from "../lib/supabase/supabase-browser";
import { useLoggedInUser } from "../providers/userProvider";
import { IProfile } from "../types/database";

/*
  This component is responsible for the following 2 things:
  1. refreshing the router & session when the auth state changes.
  2. initializing the user on init.
*/
export default function SupabaseSessionHandler({
  accessToken,
  user,
}: {
  accessToken?: string;
  user?: IProfile;
}) {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  useEffect(() => {
    if (user && !loggedInUser) {
      setLoggedInUser(user);
    }
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
      if (["SIGNED_OUT", "USER_DELETED"].includes(event)) {
        setLoggedInUser(null);
      }
    });
  }, [accessToken, loggedInUser, router, setLoggedInUser, user]);

  return null;
}
