"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useSelectOption } from "./inputs/DropdownListProvider";
import DropdownList from "./inputs/DropdownList";
import { USER_TYPE_OPTIONS } from "../data/consts";
import SignUpWithSpotfiyButton from "./inputs/SignUpWithSpotifyButton";
import { useSignUpModal } from "../providers/modalProvider";
import { SignInWithSpotify } from "../lib/supabase/auth";

export default function SignUpModal() {
  const [selectedOption] = useSelectOption();

  const [{ shouldShowModal, toggleModalReason }, toggleModal] =
    useSignUpModal();

  const signUpQueryParams = {
    initialMusicianType: selectedOption,
  };

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
                  <div className="flex flex-col align-center p-1 mb-3">
                    <button
                      className="p-2 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => toggleModal({ shouldShowModal: false })}
                    >
                      <ImCross />
                    </button>
                    <h3 className="text-3xl font-semibold text-center">
                      {toggleModalReason || "Join the community"}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-lg text-center mb-6">
                    It&apos;s free
                  </p>
                  <div className="mx-auto mb-2 w-1/4">
                    <DropdownList options={USER_TYPE_OPTIONS} />
                  </div>
                  <div className="p-5 flex items-center mx-auto w-fit">
                    <SignUpWithSpotfiyButton options={signUpQueryParams} />
                  </div>
                  <p className="text-center text-sm pb-4">
                    Already have an account?{" "}
                    <span
                      onClick={SignInWithSpotify}
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
