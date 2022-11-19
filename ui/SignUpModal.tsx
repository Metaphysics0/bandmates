/* eslint-disable react/no-unescaped-entities */
"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { SiSpotify } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import {
  AVAILABLE_PROVIDERS,
  IAvailableProvider,
  SignInWithOAuth,
} from "../lib/supabase/auth";
import { useSelectOption } from "./inputs/DropdownListProvider";
import { capitalize } from "../utils/strings";
import DropdownList from "./inputs/DropdownList";
import { USER_TYPE_OPTIONS } from "../data/consts";

export default function SignUpModal() {
  const [shouldShowModal, toggleModal] = useState(false);
  const [selectedOption] = useSelectOption();

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
        className="bg-red-500 hover:bg-red-400 transition duration-75 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded outline-none"
        type="button"
        onClick={() => toggleModal(true)}
        autoFocus
      >
        Sign Up!
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
              <div className="border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
                <section>
                  <div className="flex flex-col align-center p-1 mb-3">
                    <button
                      className="p-2 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => toggleModal(false)}
                    >
                      <ImCross />
                    </button>
                    <h3 className="text-3xl font-semibold text-center">
                      {selectedOption?.signUpHeader ?? defaultHeader}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-lg text-center mb-6">
                    {selectedOption?.signUpDescription ?? defaultDescription}
                  </p>
                  <div className="mx-auto mb-2 w-1/4">
                    <DropdownList options={USER_TYPE_OPTIONS} />
                  </div>
                  <div className="p-5 flex flex-col items-center mx-auto w-fit">
                    {AVAILABLE_PROVIDERS.map(socialSignInButton)}
                  </div>
                  <p className="text-center text-sm pb-4">
                    Already have an account?{" "}
                    <a
                      href=""
                      className="text-orange-500 font-medium hover:text-orange-600 transition duration-75 underline"
                    >
                      Log In
                    </a>
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

const socialSignInButton = (provider: IAvailableProvider, idx: number) => {
  const socialButtonStyle =
    provider === "spotify"
      ? "text-slate-100 bg-spotify-500 hover:bg-spotify-600 focus:ring-spotify-300"
      : "text-black bg-slate-100 hover:bg-slate-200 focus:ring-slate-300 border-1 border-slate-700";

  const iconMap = {
    spotify: <SiSpotify className="mr-1" />,
    google: <FcGoogle className="mr-1" />,
    facebook: <FaFacebook className="mr-1" />,
  };

  return (
    <>
      <button
        type="button"
        className={` text-lg focus:outline-none focus:ring-4 font-medium rounded-full px-5 py-2.5 flex items-center w-max ${socialButtonStyle}`}
        onClick={() => SignInWithOAuth(provider)}
        key={idx}
      >
        {iconMap[provider]}
        Sign up with {capitalize(provider)}
      </button>
      {idx === 0 && <span className="my-2"> Or </span>}
    </>
  );
};

const defaultHeader = "Join the community.";
const defaultDescription = "it's free";
