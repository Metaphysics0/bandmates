"use client";

import { UserMetadata } from "@supabase/supabase-js";
import Image from "next/image";
import { useState } from "react";
import { IProfile } from "../types/db";
import UpdateProfilePhotoModal from "./inputs/UpdateProfilePhotoModal";

export default function ProfileForm({
  profile,
}: {
  profile: IProfile | UserMetadata | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <form className="col-span-2 grid grid-cols-2 items-center mt-4">
      <div className="flex flex-col">
        <input
          type="text"
          name="first_name"
          id="first_name"
          placeholder="Name"
          className="mb-3 rounded-2xl shadow-md border-none focus:ring-0 outline-none font-bold"
        />
        <input
          type="text"
          name="artist_type"
          id="artist_type"
          placeholder="Artist Type"
          className="mb-3 rounded-2xl shadow-md border-none focus:ring-0 outline-none font-bold"
        />
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Location"
          className="mb-3 rounded-2xl shadow-md border-none focus:ring-0 outline-none font-bold"
        />
        <textarea
          name="bio"
          id="bio"
          rows={4}
          placeholder="Bio"
          className="mb-3 rounded-2xl shadow-md border-none focus:ring-0 outline-none font-bold"
        ></textarea>
        <div
          className="flex items-center cursor-pointer mx-auto"
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={profile?.avatar_url}
            className="bg-white shadow-md rounded-xl mr-2"
            alt="profile picture preview"
            width={28}
            height={28}
          />
          <p className="text-orange-500 cursor-pointer hover:text-orange-400 underline hover:no-underline">
            Change profile photo
          </p>
          <UpdateProfilePhotoModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <audio controls className="mb-2">
          <source src="horse.ogg" type="audio/ogg" />
          <source src="horse.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <audio controls className="mb-2">
          <source src="horse.ogg" type="audio/ogg" />
          <source src="horse.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <audio controls>
          <source src="horse.ogg" type="audio/ogg" />
          <source src="horse.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="mt-auto col-span-2 flex justify-center">
        <button className="bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-75">
          Submit
        </button>
      </div>
    </form>
  );
}
