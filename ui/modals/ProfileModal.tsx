"use client";

import Image from "next/image";
import { useProfileModal } from "../../providers/viewProfileModalProvider";
import guitarist from "../../public/guitarist.jpg";
import { IProfile } from "../../types/database";
import GraphScreen from "../spotify/pie/GraphScreen";
import UsersTopArtists from "../spotify/UsersTopArtists";

export default function ProfileModal() {
  const [{ shouldShowModal, profile }, setShouldShowProfileModal] =
    useProfileModal();

  const closeModal = () => {
    setShouldShowProfileModal({ shouldShowModal: false });
    window.history.pushState({ prevUrl: window.location.href }, "", "/");
  };

  const PROFILE_INFO_FIELDS: IProfileInfoField[] = [
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
                {PROFILE_INFO_FIELDS.map((info, idx) => (
                  <ProfileInfoField info={info} profile={profile} key={idx} />
                ))}
                <div className="mt-2">
                  <strong>Top Artists:</strong>
                  <UsersTopArtists items={profile?.spotify_data?.items ?? []} />
                </div>
                <div>
                  <GraphScreen artists={profile?.spotify_data?.items ?? []} />
                </div>
              </section>
              <section className="flex items-center justify-center">
                <div className="h-52 w-52">
                  <Image
                    src={profile?.avatar_url || guitarist}
                    height={150}
                    width={150}
                    alt={profile?.full_name || "musician"}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
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
