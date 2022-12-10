"use client";

import { useLoggedInUser } from "../../providers/userProvider";
import ProfileCard from "../profileCard/ProfileCard";

export default function ProfileCardClient() {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  return <ProfileCard profile={loggedInUser!} />;
}
