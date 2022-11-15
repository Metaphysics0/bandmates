import Image from "next/image";
import { IProfile } from "../types/db";
import guitarist from "../public/guitarist.jpg";
import { MdLocationOn } from "react-icons/md";

export default function ProfileCard(profile: IProfile) {
  return (
    <article className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white h-80 cursor-pointer">
      <div className="w-full h-full relative">
        <Image
          src={guitarist}
          alt={profile.full_name || "musician"}
          className="h-full w-full object-cover"
        />
        <div className="absolute text-white top-0 left-0 font-semibold mt-2 ml-3">
          <p className=" text-xl">{profile.full_name}, 23</p>
          <p className="text-lg">Guitarist</p>
        </div>
        <div className="absolute px-2 py-2 bottom-0 font-medium text-slate-100 w-full flex justify-between">
          <div className="flex items-center">
            <MdLocationOn />
            <p>Lisbon, Portugal</p>
          </div>

          <p className="font-semibold">85% match 🔥</p>
        </div>
      </div>
    </article>
  );
}
