"use client";

import Image from "next/image";
import { useLoggedInUser } from "../../providers/userProvider";
import ProfileCard from "../profileCard/ProfileCard";
import ProfileCardSkeleton from "../skeletons/ProfileCard";
import UpdateAvatarModal from "../modals/UpdateAvatarModal";
import { useState } from "react";
import SignOutButton from "../inputs/signOutButton";
import { Users } from "../../lib/supabase/db";

export default function ProfileCardClient() {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const MOCK_DATA = [
    {
      external_urls: [],
      followers: [],
      genres: [],
      href: "https://api.spotify.com/v1/artists/5LyRnL0rysObxDRxzSfV1z",
      id: "5LyRnL0rysObxDRxzSfV1z",
      images: [],
      name: "Counterparts",
      popularity: 53,
      type: "artist",
      uri: "spotify:artist:5LyRnL0rysObxDRxzSfV1z",
    },
  ];

  const updateThings = async () => {
    try {
      await Users.updateById(loggedInUser.id, {
        // @ts-ignore
        spotify_data: { items: MOCK_DATA },
      });
    } catch (error) {
      console.log("error", error);
    }
  };

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
        <button onClick={updateThings}>Update stuff</button>
      </div>
      <UpdateAvatarModal
        isOpen={isAvatarModalOpen}
        setIsOpen={setIsAvatarModalOpen}
      />
    </>
  );
}
