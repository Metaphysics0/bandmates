"use client";

import { useLoggedInUser } from "../../providers/userProvider";
import ProfileCard from "../profileCard/ProfileCard";
import ProfileCardSkeleton from "../skeletons/ProfileCard";

export default function ProfileCardClient() {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  if (!loggedInUser) return <ProfileCardSkeleton />;
  return <ProfileCard profile={loggedInUser} />;
}
