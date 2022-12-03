"use client";

import Image from "next/image";
import { useProfileModal } from "../../providers/viewProfileModalProvider";
import guitarist from "../../public/guitarist.jpg";

export default function ProfileModal() {
  const [{ shouldShowModal, profile }, toggleModal] = useProfileModal();

  return shouldShowModal ? (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onClick={() => toggleModal({ shouldShowModal: false })}
      >
        <div
          className="relative my-6 mx-auto w-[calc(100%_-_15rem)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/*content*/}
          <div className="p-5 flex justify-between items-center border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
            <section className="flex flex-col justify-around">
              <h3 className="text-4xl font-bold">{profile?.full_name}</h3>
              <div>
                <h4>Artist Type:</h4>
                <strong>{profile?.artist_type}</strong>
              </div>
              <div>
                <h4>Location:</h4>
                <strong>{profile?.location}</strong>
              </div>
              <div>
                <strong>Bio:</strong>
                <p>{profile?.bio}</p>
              </div>
            </section>
            <section>
              <div className="h-52 w-52">
                <Image
                  src={guitarist}
                  alt={profile?.full_name || "musician"}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null;
}
