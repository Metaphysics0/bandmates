"use client";

import { useEffect, useState } from "react";
import { IProfile, IProfileUpdateFields } from "../../types/database";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import AutoComplete from "react-google-autocomplete";
import { Users } from "../../lib/supabase/db";
import { useProfileForm } from "../../providers/profileFormProvider";
import toast, { Toaster } from "react-hot-toast";
import { useLoggedInUser } from "../../providers/userProvider";
import GeneralTextInput from "../inputs/general/TextInput";
import TextAreaInput from "../inputs/general/TextAreaInput";
import UpdateAvatarModal from "../modals/UpdateAvatarModal";
import UploadSoundSnippets from "../inputs/UploadSoundSnippets";
import ContactMethods from "../inputs/ContactMethods";
import ProfileCardClient from "./ProfileCardClient";
import SpotifyData from "./SpotifyData";
import ProfilePhotos from "../inputs/profilePhotos/ProfilePhotos";

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

  return (
    <>
      <FormSectionTitle title="General Info" subText="Stuff that matters" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-rows-2 grid-flow-col gap-4"
      >
        <div className="col-span-2 row-span-2 flex flex-col justify-between">
          <GeneralTextInput
            label="Name:"
            placeholder="Name"
            formName="full_name"
            formRegister={register}
          />
          <label className="flex justify-between">
            <span className="w-fit font-bold text-lg">Location:</span>
            <Controller
              control={control}
              name="location"
              render={({ field: { onChange } }) => (
                <AutoComplete
                  placeholder={profile.location || "Enter a location"}
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
                  className="text-input p-2 w-3/4 mb-4"
                  onPlaceSelected={(place) => onChange(place.formatted_address)}
                />
              )}
            />
          </label>
          <TextAreaInput
            formRegister={register}
            formName="bio"
            placeholder="Talk about yourself"
            label="Bio:"
            rows={2}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={shouldDisableSubmit}
              className={`${
                shouldDisableSubmit
                  ? "bg-slate-400 hover:bg-slate-300"
                  : "bg-red-500 hover:bg-red-400"
              } text-white h-min font-semibold py-2 px-4 rounded-md shadow-md transition duration-75`}
            >
              Update
            </button>
          </div>
          <div className="border-b border-slate-300 border-opacity-60 h-1 my-4"></div>
          <FormSectionTitle
            title="Contact Methods"
            subText="How can people reach you?"
          />
          <ContactMethods />
          <div className="border-b border-slate-300 border-opacity-60 h-1 my-4"></div>
          <div>
            <FormSectionTitle
              title="Sound snippets"
              subText="Show off some recordings"
            />
            <UploadSoundSnippets />
          </div>
        </div>
        <div className="row-span-1">
          <ProfileCardClient />
          <ProfilePhotos profile={loggedInUser} />
        </div>
        <div className="row-span-1">
          {/* <SpotifyData profile={loggedInUser} /> */}
        </div>
      </form>
      <Toaster position="top-right" />
      <UpdateAvatarModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

const FormSectionTitle = ({
  title,
  subText,
}: {
  title: string;
  subText?: string;
}) => {
  return (
    <div className="mb-9">
      <h5 className="text-2xl font-bold">{title}</h5>
      {subText ? <p className="font-light">{subText}</p> : null}
    </div>
  );
};
