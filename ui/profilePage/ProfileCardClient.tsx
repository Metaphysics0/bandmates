"use client";

import { useLoggedInUser } from "../../providers/userProvider";
import ProfileCard from "../profileCard/ProfileCard";
import ProfileCardSkeleton from "../skeletons/ProfileCard";

export default function ProfileCardClient() {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

<<<<<<< HEAD
  if (!loggedInUser) return <ProfileCardSkeleton />
=======
  if (!loggedInUser) return <ProfileCardSkeleton />;
>>>>>>> 112ce7c757b493a74c336b58b7e91730d9af5575
  return <ProfileCard profile={loggedInUser} />;
}
