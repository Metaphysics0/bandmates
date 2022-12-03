"use client";

import { useEffect } from "react";
import { useProfileModal } from "../../providers/viewProfileModalProvider";

export default function ProfileModal() {
  const [{ shouldShowModal, profile }, toggleModal] = useProfileModal();

  useEffect(() => {
    const closeModalOnEscape = (e: KeyboardEvent | any): void => {
      if (e.key === "Escape") toggleModal({ shouldShowModal: false });
    };
    document.addEventListener("keydown", closeModalOnEscape);
    return () => {
      document.removeEventListener("keydown", closeModalOnEscape);
    };
  }, [toggleModal]);

  return (
    <>
      {shouldShowModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => toggleModal({ shouldShowModal: false })}
          >
            <div
              className="relative my-6 mx-auto w-[calc(100%_-_6rem)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
                <section>
                  <h3>{profile?.full_name}</h3>
                  <p className="text-center text-sm pb-4">
                    <span
                      onClick={() => console.log("ahh")}
                      className="text-orange-500 font-medium hover:text-orange-600 transition duration-75 underline"
                    >
                      Log In
                    </span>
                  </p>
                </section>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
