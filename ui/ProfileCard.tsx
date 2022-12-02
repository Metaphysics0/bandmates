import Image from "next/image";
import { IProfile } from "../types/database";
import guitarist from "../public/guitarist.jpg";
import { MdLocationOn } from "react-icons/md";
import { FaGuitar } from "react-icons/fa";
import ProfileLikeButton from "./inputs/ProfileLikeButton";

export default function ProfileCard({
  profile,
  currentLoggedInUser,
}: {
  profile: IProfile;
  currentLoggedInUser?: IProfile;
}) {
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
          <p className=" text-xl drop-shadow">{profile.full_name}</p>
          <p className="text-lg">{profile.artist_type || ""}</p>
        </div>

        <div className="absolute top-0 right-0 mt-2 mr-3">
          <ProfileLikeButton
            profile={profile}
            currentLoggedInUser={currentLoggedInUser}
          />
        </div>

        <div className="absolute px-2 py-2 bottom-0 font-medium text-slate-100 w-full flex justify-between bg-opacity-50 bg-black">
          <div className="flex items-center">
            <MdLocationOn />
            <p>{profile.location || ""}</p>
          </div>
          <p className="font-semibold">85% match 🔥</p>
        </div>
      </div>
    </article>
  );
}

export function ProfileCardSkeleton() {
  return (
    <div
      role="status"
      className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center bg-white p-3 rounded-lg shadow-lg flex flex-col justify-between"
    >
      <div className="flex justify-center items-center w-full h-52 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <FaGuitar className="w-12 h-12 text-gray-200" />
      </div>
      <div className="w-full">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
// TODO: Add Overlay.
// function ProfileCardOverlay(profile) {

// }
