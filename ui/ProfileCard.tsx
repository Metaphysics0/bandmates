import Image from "next/image";
import { IProfile, IThinProfile } from "../types/database";
import guitarist from "../public/guitarist.jpg";
import { MdLocationOn } from "react-icons/md";
import ProfileLikeButton from "./inputs/ProfileLikeButton";

export default function ProfileCard({
  profile,
  currentLoggedInUser,
}: {
  profile: IProfile;
  currentLoggedInUser?: IProfile | IThinProfile;
}) {
  return (
    <article
      key={profile.id}
      className="group relative max-w-sm rounded-lg overflow-hidden shadow-lg bg-white h-80 cursor-zoom-in w-fit"
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

        <div className="absolute px-2 py-2 bottom-0 font-medium text-slate-100 w-full flex justify-between bg-opacity-50 bg-black">
          <div className="flex items-center">
            <MdLocationOn />
            <p>{profile.location || ""}</p>
          </div>
          <p className="font-semibold">85% match 🔥</p>
        </div>
        <ProfileCardOverlay profile={profile} />
      </div>
      <div className="absolute top-0 right-0 mt-2 mr-3">
        <ProfileLikeButton
          profile={profile}
          currentLoggedInUser={currentLoggedInUser}
        />
      </div>
    </article>
  );
}

function ProfileCardOverlay({ profile }: { profile: IProfile }) {
  return (
    <div className="absolute top-0 left-0 w-full h-0 flex items-center bg-indigo-700 opacity-0 group-hover:h-full group-hover:opacity-90 duration-500">
      <div className="px-2 flex flex-col items-center m-auto">
        <h3 className="text-2xl text-white opacity-100 font-bold">
          {profile.full_name}
        </h3>
        <p className="text-xl font-semibold text-center text-slate-100">
          {profile.bio || ""}
        </p>
        <button className="opacity-100 bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500 transition duration-75 text-white font-bold py-2 px-4 border-b-4 rounded-full outline-none my-2">
          View Profile
        </button>
      </div>
    </div>
  );
}
