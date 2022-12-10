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
import toast, { Toaster } from "react-hot-toast";
import { TagsInput } from "react-tag-input-component";
import { BsSoundwave } from "react-icons/bs";
import { useLoggedInUser } from "../../providers/userProvider";
import { compatObject } from "../../utils/helperMethods";

export default function ProfileForm({ profile }: { profile: IProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldDisableSubmit, setShouldDisableSubmit] = useState(true);
  const [profileForm, setProfileForm] = useProfileForm();
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  const { register, handleSubmit, watch, control } = useForm({
    defaultValues: {
      full_name: profile.full_name,
      artist_type: profile.artist_type,
      bio: profile.bio,
      location: profile.location,
      tags: profile.tags,
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name !== undefined && profile[name as keyof IProfile] !== value) {
        setProfileForm(value);
        setShouldDisableSubmit(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [profile, profileForm, setProfileForm, watch]);

  useEffect(() => {
    setLoggedInUser(profile);
  }, [profile, setLoggedInUser]);

  const onSubmit: SubmitHandler<IProfileUpdateFields> = async (
    fieldsToUpdate: IProfileUpdateFields
  ): Promise<void> => {
    const { error } = await Users.updateById(profile.id, fieldsToUpdate);
    if (error) {
      toast.error("Error updating profile");
      console.error(error);
      return;
    }

    // @ts-expect-error
    setLoggedInUser({ ...loggedInUser, ...fieldsToUpdate });
    toast("Succesfully updated profile info", {
      icon: "👍",
      duration: 2500,
    });
  };

  const formStyles = {
    input:
      "mb-3 rounded-2xl shadow-md border-none focus:ring-0 outline-none font-bold text-slate-800",
    label: "flex flex-col",
    span: "w-fit ml-1 font-bold text-lg",
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="col-span-2 grid grid-cols-2 items-center mt-4"
      >
        <div className="flex flex-col">
          <label className={formStyles.label}>
            <span className={formStyles.span}>Name:</span>
            <input
              type="text"
              {...register("full_name")}
              placeholder="Name"
              className={formStyles.input}
            />
          </label>
          <label className={formStyles.label}>
            <span className={formStyles.span}>Artist Type:</span>
            <input
              type="text"
              {...register("artist_type")}
              placeholder="Guitarist"
              className={formStyles.input}
            />
          </label>
          <label className={formStyles.label}>
            <span className={formStyles.span}>Location:</span>
            <Controller
              control={control}
              name="location"
              render={({ field: { onChange } }) => (
                <AutoComplete
                  placeholder={profile.location || "Enter a location"}
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
                  className={formStyles.input + " p-2"}
                  onPlaceSelected={(place) => onChange(place.formatted_address)}
                />
              )}
            />
          </label>
          <label className={formStyles.label}>
            <span className={formStyles.span}>Bio:</span>
            <textarea
              {...register("bio")}
              rows={4}
              placeholder="Bio"
              className={formStyles.input + " min-h-[50px]"}
            ></textarea>
          </label>
          <label className={formStyles.label}>
            <span className={formStyles.span}>Tags:</span>
            <Controller
              control={control}
              name="tags"
              render={({ field: { onChange, value } }) => (
                <TagsInput
                  value={value || []}
                  onChange={onChange}
                  placeHolder="LoFi, R&B, ... (Press enter to add!)"
                />
              )}
            />
          </label>
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
        {/* SOUND SNIPPETS */}
        <div className="flex flex-col items-center mb-auto">
          <h3 className={formStyles.span}>Sound Snippets</h3>
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
          <AddSoundPlaceholder />
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
      <Toaster position="top-right" />
    </>
  );
}

const AddSoundPlaceholder = () => {
  return (
    <div className="flex items-center cursor-pointer justify-center mt-3 border-[#a9a9a9] border bg-[#d8d8d8] hover:bg-[#adadad] transition-all rounded-full p-3 w-[calc(100%_-_10rem)]">
      <p className="w-fit flex items-center font-bold text-slate-700 opacity-90">
        Add Sound! <BsSoundwave />
      </p>
    </div>
  );
};

const SounSnippetUploader = () => {};
