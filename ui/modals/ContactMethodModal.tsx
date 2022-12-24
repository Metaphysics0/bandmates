"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoggedInUser } from "../../providers/userProvider";
import { ISocialContactProvider } from "../../types/types";
import SocialMediaInput from "../inputs/general/SocialMediaInput";
import { Users } from "../../lib/supabase/db";
import toast from "react-hot-toast";

export default function ContactMethodModal({
  isOpen = false,
  setIsOpen,
  contactMethod,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  contactMethod: ISocialContactProvider;
}) {
  const closeModal = () => {
    setIsOpen(false);
  };
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  const { register, unregister, handleSubmit, reset } = useForm();

  const onSubmit: SubmitHandler<any> = async (
    socialField: Record<ISocialContactProvider, string>
  ) => {
    const params = {
      [`${contactMethod}_link`]: socialField[contactMethod],
    };

    if (!loggedInUser) return;

    const { error } = await Users.updateById(loggedInUser.id, params);

    if (error) {
      toast.error("Error updating profile");
      console.error(error);
      return;
    }

    setLoggedInUser({ ...loggedInUser, ...params });
    toast(`Succesfully added ${contactMethod} link`, {
      icon: "🔥",
      duration: 2500,
    });
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-0 text-left align-middle shadow-xl transition-all flex flex-col items-center pb-3">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900 py-5"
                >
                  Link your {contactMethod} account!
                </Dialog.Title>
                <SocialMediaInput
                  contactMethod={contactMethod}
                  formRegister={register}
                />
                <div className="flex ml-auto items-center">
                  <p
                    className="cursor-pointer text-slate-500 mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </p>
                  <div className="btn-submit" onClick={handleSubmit(onSubmit)}>
                    Save
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
