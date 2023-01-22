"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { useProfileModal } from "../../providers/viewProfileModalProvider";
import guitarist from "../../public/guitarist.jpg";
import { IProfile } from "../../types/database";
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

  return shouldShowModal ? (
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
                <h3 className="text-4xl font-bold">{profile?.full_name}</h3>
                {infoFieldToReflect.map((info, idx) => (
                  <ProfileInfoField info={info} profile={profile} key={idx} />
                ))}
                <div className="mt-2">
                  <strong>Top Artists:</strong>
                  <UsersTopArtists items={profile?.spotify_data?.items ?? []} />
                </div>
                <div className="w-3/4 h-3/4">
                  <GraphScreen artists={profile?.spotify_data?.items ?? []} />
                </div>
              </section>
              <section className="flex flex-col items-center justify-center">
                <div className="w-3/4 h-auto">
                  <Image
                    src={activeProfilePhoto}
                    alt={profile?.full_name || "musician"}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <ProfilePhotos
                  profile={profile || null}
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
  profile: IProfile | undefined;
}) => (
  <div className="flex">
    <h4 className="mr-2">{info.title}:</h4>
    {/* @ts-ignore */}
    <p>{profile[info.value] ?? "Not Provided"}</p>
  </div>
);

interface IProfileInfoField {
  title: string;
  value: keyof IProfile;
}
