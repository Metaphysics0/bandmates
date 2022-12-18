"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { useLoggedInUser } from "../../providers/userProvider";
import { IAvailableContactMethod } from "../../types/types";

export default function ContactMethodModal({
  isOpen = false,
  setIsOpen,
  contactMethod,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  contactMethod: undefined | IAvailableContactMethod;
}) {
  const closeModal = () => setIsOpen(false);
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-0 text-left align-middle shadow-xl transition-all flex flex-col items-center">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900 py-5"
                >
                  Link your {contactMethod} account!
                </Dialog.Title>
                <div className="btn-submit">Save</div>
                <div className="cursor-pointer" onClick={closeModal}>
                  <p className="text-slate-500">Cancel</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
