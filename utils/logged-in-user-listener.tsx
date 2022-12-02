"use client";

import { useLoggedInUser } from "../providers/userProvider";
import { IProfile } from "../types/database";

export default function LoggedInUserListener({
  profile,
}: {
  profile?: IProfile;
}) {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  if (profile) setLoggedInUser(profile);
  return null;
}
