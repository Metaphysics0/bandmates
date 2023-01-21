"use client";

import { useLoggedInUser } from "../../providers/userProvider";
import ProfileCard from "../profileCard/ProfileCard";
import ProfileCardSkeleton from "../skeletons/ProfileCard";

export default function ProfileCardClient() {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  if (!loggedInUser) return <ProfileCardSkeleton />;
  return (
    <div className="flex flex-col items-center justify-center">
      <ProfileCard profile={loggedInUser} />
    </div>
  );
}
