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
        <div
          className="flex items-center cursor-pointer mx-auto"
          onClick={() => setIsAvatarModalOpen(true)}
        >
          {loggedInUser.avatar_url ? (
            <Image
              src={loggedInUser.avatar_url}
              className="bg-white shadow-md rounded-xl mr-2"
              alt="profile picture preview"
              width={28}
              height={28}
            />
          ) : (
            <div className="bg-white shadow-md rounded-xl mr-2"></div>
          )}
          <p className="text-orange-500 cursor-pointer hover:text-orange-400 underline hover:no-underline">
            Change profile photo
          </p>
        </div>
        <div>
          <SignOutButton />
        </div>
      </div>
      <UpdateAvatarModal
        isOpen={isAvatarModalOpen}
        setIsOpen={setIsAvatarModalOpen}
      />
    </>
  );
}
