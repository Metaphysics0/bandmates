/* eslint-disable react/no-unescaped-entities */
"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useSelectOption } from "./inputs/DropdownListProvider";
import DropdownList from "./inputs/DropdownList";
import { USER_TYPE_OPTIONS } from "../data/consts";
import SignUpWithSpotfiyButton from "./inputs/SignUpWithSpotifyButton";

export default function SignUpModal() {
  const [shouldShowModal, toggleModal] = useState(false);
  const [nameInputValue, setNameInputValue] = useState("");
  const [selectedOption] = useSelectOption();

  const signUpQueryParams = {
    initialMusicianType: selectedOption,
    first_name: nameInputValue,
  };

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
        className="bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500 transition duration-75 text-white font-bold py-2 px-4 border-b-4 rounded outline-none"
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
                  <div className="mx-auto w-1/5">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={nameInputValue}
                      placeholder="First Name"
                      onChange={(e) => {
                        setNameInputValue(e.target.value.trim());
                      }}
                      className="rounded-2xl shadow-md border-none focus:ring-0 outline-none font-bold w-full"
                    />
                  </div>
                  <div className="p-5 flex items-center mx-auto w-fit">
                    <SignUpWithSpotfiyButton options={signUpQueryParams} />
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

const defaultHeader = "Join the community.";
const defaultDescription = "it's free";
