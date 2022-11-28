"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IProfile } from "../types/database";
import { useForm } from "react-hook-form";
import UpdateProfilePhotoModal from "./inputs/UpdateProfilePhotoModal";
import _ from "lodash";
import SignOutButton from "./inputs/signOutButton";

export default function ProfileForm({ profile }: { profile: IProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldDisableSubmit, setShouldDisableSubmit] = useState(true);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      full_name: profile.full_name,
      artist_type: profile.artist_type,
      bio: profile.bio,
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name !== undefined && profile[name] !== value) {
        setShouldDisableSubmit(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [profile, watch]);

  const onSubmit = (data: any) => {
    console.log("DATA", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-span-2 grid grid-cols-2 items-center mt-4"
    >
      <div className="flex flex-col">
        <input
          type="text"
          {...register("full_name")}
          placeholder="Name"
          className="mb-3 rounded-2xl shadow-md border-none focus:ring-0 outline-none font-bold"
        />
        <input
          type="text"
          {...register("artist_type")}
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
          {...register("bio")}
          rows={4}
          placeholder="Bio"
          className="mb-3 rounded-2xl shadow-md border-none focus:ring-0 outline-none font-bold"
        ></textarea>
        <div
          className="flex items-center cursor-pointer mx-auto"
          onClick={() => setIsOpen(true)}
        >
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
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
          <UpdateProfilePhotoModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <SignOutButton />
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
      <div className="mt-3 col-span-2 flex justify-center">
        <button
          type="submit"
          disabled={shouldDisableSubmit}
          className={`${
            shouldDisableSubmit
              ? "bg-slate-400 hover:bg-slate-300"
              : "bg-red-500 hover:bg-red-400"
          } text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-75`}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
