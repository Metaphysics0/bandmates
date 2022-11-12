import Image from "next/image";
import { IProfile } from "../types/db";
import guitarist from "../public/guitarist.jpg";

export default function ProfileCard(profile: IProfile) {
  return (
    <article className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <Image
        className="w-full"
        src={guitarist}
        alt={profile.full_name || "musician"}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{profile?.full_name}</div>
        <p className="text-gray-700 text-base">Lorem ipsum dolor sit.</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </article>
  );
}
