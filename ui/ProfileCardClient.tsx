"use client";

import Image from "next/image";
import { IProfile } from "../types/database";
import guitarist from "../public/guitarist.jpg";
import { MdLocationOn } from "react-icons/md";
import ProfileLikeButton from "./inputs/ProfileLikeButton";
import { useProfileForm } from "../providers/profileFormProvider";

export default function ProfileCardClient({
  profile,
}: {
  profile: IProfile;
  isEditMode?: boolean;
}) {
  const [profileForm, setProfileForm] = useProfileForm();
  return (
    <article
      key={profile.id}
      className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white h-80 cursor-zoom-in w-fit"
    >
      <div className="w-full h-full relative">
        {profile.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={profile.full_name || "musician"}
            width="100"
            height="100"
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={guitarist}
            alt={profile.full_name || "musician"}
            className="h-full w-full object-cover"
          />
        )}

        <div className="absolute text-white top-0 left-0 font-semibold mt-2 ml-3 bg-opacity-50 bg-black p-2 rounded-lg">
          <p className=" text-xl drop-shadow">
            {profileForm?.full_name || profile.full_name}
          </p>
          <p className="text-lg">
            {profileForm?.artist_type || profile.artist_type}
          </p>
        </div>

        <div className="absolute top-0 right-0 mt-2 mr-3">
          <ProfileLikeButton />
        </div>

        <div className="absolute px-2 py-2 bottom-0 font-medium text-slate-100 w-full flex justify-between bg-opacity-50 bg-black">
          <div className="flex items-center">
            <MdLocationOn />
            <p>{profileForm?.location || profile.location}</p>
          </div>
          <p className="font-semibold">85% match 🔥</p>
        </div>
      </div>
    </article>
  );
}
