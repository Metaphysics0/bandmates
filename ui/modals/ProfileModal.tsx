"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { SOCIAL_CONTACT_METHODS } from "../../data/consts";
import { useProfileModal } from "../../providers/viewProfileModalProvider";
import guitarist from "../../public/guitarist.jpg";
import { IProfile } from "../../types/database";
import ContactMethods from "../inputs/ContactMethods";
import ProfilePhotos from "../inputs/profilePhotos/ProfilePhotos";
import GraphScreen from "../spotify/pie/GraphScreen";
import UsersTopArtists from "../spotify/UsersTopArtists";

export default function ProfileModal() {
  const [{ shouldShowModal, profile }, setShouldShowProfileModal] =
    useProfileModal();

  const closeModal = () => {
    setShouldShowProfileModal({ shouldShowModal: false });

    window.history.pushState({ prevUrl: window.location.href }, "", "/");
  };

  const infoFieldToReflect: IProfileInfoField[] = [
    {
      title: "Artist Type",
      value: "artist_type",
    },
    {
      title: "Location",
      value: "location",
    },
    {
      title: "Bio",
      value: "bio",
    },
  ];

  const [activeProfilePhoto, setActiveProfilePhoto] = useState<
    string | StaticImageData
  >(profile?.avatar_url || guitarist);

  const hasAtLeastOneContactMethod = (profile: IProfile): boolean =>
    SOCIAL_CONTACT_METHODS.map((c) => c.provider + "_link").some(
      (provider) =>
        profile.hasOwnProperty(provider) &&
        profile[provider as keyof IProfile] !== null
    );

  return shouldShowModal && profile ? (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onClick={closeModal}
      >
        <div
          className="relative my-6 mx-auto w-[calc(100%_-_15rem)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/*content*/}
          <div className="p-5 border-0 max-h-screen overflow-scroll rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
            <div className="grid grid-cols-2">
              <section className="flex flex-col justify-around">
                {/* GENERAL INFO */}
                <h3 className="text-4xl font-bold mb-1">{profile.full_name}</h3>
                {infoFieldToReflect.map((info, idx) => (
                  <ProfileInfoField info={info} profile={profile} key={idx} />
                ))}
                {hasAtLeastOneContactMethod(profile) ? (
                  <ContactMethods user={profile} forProfileModal={true} />
                ) : null}
                {/* SPOTIFY DATA */}
                <div className="mt-2">
                  <strong>Top Artists:</strong>
                  <UsersTopArtists items={profile.spotify_data?.items ?? []} />
                </div>
                <div className="w-3/4 h-3/4">
                  {profile ? <GraphScreen user={profile} /> : null}
                </div>
              </section>
              <section className="flex flex-col items-center justify-center">
                <div className="w-3/4 h-auto">
                  <Image
                    src={activeProfilePhoto}
                    alt={profile.full_name || "musician"}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <ProfilePhotos
                  profile={profile}
                  isForProfileModal={true}
                  setActiveProfilePhotoForModal={setActiveProfilePhoto}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null;
}

const ProfileInfoField = ({
  info,
  profile,
}: {
  info: IProfileInfoField;
  profile: IProfile;
}) => {
  const value = profile[info.value];
  if (!value || typeof value !== "string") return null;

  const emoji =
    // @ts-ignore
    {
      location: "📍",
      artist_type: "🧑‍🎤",
    }[info.value] ?? "";

  return (
    <div className="flex">
      <h4 className="mr-2">{info.title}:</h4>
      <p className="font-medium">
        {value}
        {emoji ? ` ${emoji}` : ""}
      </p>
    </div>
  );
};

interface IProfileInfoField {
  title: string;
  value: keyof IProfile;
}
