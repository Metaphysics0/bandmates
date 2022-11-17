/* eslint-disable react/no-unescaped-entities */
"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { SiSpotify } from "react-icons/si";
import { signInWithSpotify } from "../../lib/supabase/auth";

export default function Modal() {
  const [shouldShowModal, toggleModal] = useState(false);
  const socialButtonStyle =
    "text-white text-lg text-bold bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center w-max";

  useEffect(() => {
    const closeModalOnEscape = (e: KeyboardEvent | any): void => {
      if (e.key === "Escape") toggleModal(false);
    };

    document.addEventListener("keydown", closeModalOnEscape);

    return () => {
      document.removeEventListener("keydown", closeModalOnEscape);
    };
  }, []);

  return (
    <>
      <button
        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
        type="button"
        onClick={() => toggleModal(true)}
        autoFocus
      >
        Sign Up
      </button>
      {shouldShowModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => toggleModal(false)}
          >
            <div
              className="relative my-6 mx-auto w-[calc(100%_-_6rem)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex justify-between w-full bg-white outline-none focus:outline-none">
                <section className="w-3/6">
                  <h3>Left section</h3>
                </section>
                <section className="w-3/6">
                  <div className="flex flex-col align-center p-1 mb-3">
                    <button
                      className="p-2 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => toggleModal(false)}
                    >
                      <ImCross />
                    </button>
                    <h3 className="text-3xl font-semibold text-center">
                      💯 Join the community! 💯
                    </h3>
                  </div>
                  <div className="p-5 flex flex-col justify-center items-center">
                    <p className="text-slate-500 text-lg text-center mb-6">
                      Join my cult bro
                    </p>
                    <button
                      type="button"
                      className={socialButtonStyle}
                      onClick={signInWithSpotify}
                    >
                      <SiSpotify className="mr-1" />
                      Sign up with Spotify
                    </button>
                  </div>
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
