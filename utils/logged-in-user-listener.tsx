"use client";

import { useEffect } from "react";
import { useLoggedInUser } from "../providers/userProvider";
import { IProfile } from "../types/database";

export default function LoggedInUserListener({
  profile,
}: {
  profile?: IProfile | null | undefined;
}) {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  const _setProfileIfNeeded = () => {
    if (profile) {
      console.log("LOADING PROFILE: ", profile.id);

      setLoggedInUser(profile);
    }
  };

  useEffect(_setProfileIfNeeded, [profile, setLoggedInUser]);

  return null;
}
