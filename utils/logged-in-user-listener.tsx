"use client";

import { useEffect } from "react";
import { useLoggedInUser } from "../providers/userProvider";
import { IProfile } from "../types/database";

export default function LoggedInUserListener({
  profile,
}: {
  profile?: IProfile;
}) {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  useEffect(() => {
    if (profile) setLoggedInUser(profile);
    else setLoggedInUser(null);
  });

  return null;
}
