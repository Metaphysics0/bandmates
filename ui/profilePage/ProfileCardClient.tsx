"use client";

import Image from "next/image";
import { useLoggedInUser } from "../../providers/userProvider";
import ProfileCard from "../profileCard/ProfileCard";
import ProfileCardSkeleton from "../skeletons/ProfileCard";
import UpdateAvatarModal from "../modals/UpdateAvatarModal";
import { useState } from "react";
import SignOutButton from "../inputs/signOutButton";

export default function ProfileCardClient() {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  if (!loggedInUser) return <ProfileCardSkeleton />;
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <ProfileCard profile={loggedInUser} />
        <p className="text-slate-800 font-extrabold text-center mt-2 text-lg drop-shadow-md">
          This is how you&apos;ll appear! 👆
        </p>
        <SignOutButton />
      </div>
      <UpdateAvatarModal
        isOpen={isAvatarModalOpen}
        setIsOpen={setIsAvatarModalOpen}
      />
    </>
  );
}
