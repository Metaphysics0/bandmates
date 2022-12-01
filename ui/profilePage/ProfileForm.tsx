"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IProfile, IProfileUpdateFields } from "../../types/database";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import UpdateProfilePhotoModal from "../inputs/UpdateProfilePhotoModal";
import AutoComplete from "react-google-autocomplete";
import SignOutButton from "../inputs/signOutButton";
import { Users } from "../../lib/supabase/db";
import { useProfileForm } from "../../providers/profileFormProvider";

export default function ProfileForm({ profile }: { profile: IProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldDisableSubmit, setShouldDisableSubmit] = useState(true);
  const [profileForm, setProfileForm] = useProfileForm();

  const { register, handleSubmit, watch, control } = useForm({
    defaultValues: {
      full_name: profile.full_name,
      artist_type: profile.artist_type,
      bio: profile.bio,
      location: profile.location,
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name !== undefined && profile[name] !== value) {
        setProfileForm(value);
        setShouldDisableSubmit(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [profile, profileForm, setProfileForm, watch]);

  const onSubmit: SubmitHandler<IProfileUpdateFields> = async (
    fieldsToUpdate: IProfileUpdateFields
  ): Promise<void> => {
    const { error } = await Users.updateById(profile.id, fieldsToUpdate);
    if (error) {
      console.error("Error updating profile", error);
      return;
    }
  };

  const commonInputClass =
    "mb-3 rounded-2xl shadow-md border-none focus:ring-0 outline-none font-bold";

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
          className={commonInputClass}
        />
        <input
          type="text"
          {...register("artist_type")}
          placeholder="Artist Type"
          className={commonInputClass}
        />
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange } }) => (
            <AutoComplete
              placeholder={profile.location || "Enter a location"}
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
              className={commonInputClass + " p-2"}
              onPlaceSelected={(place) => onChange(place.formatted_address)}
            />
          )}
        />
        <textarea
          {...register("bio")}
          rows={4}
          placeholder="Bio"
          className={commonInputClass}
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
