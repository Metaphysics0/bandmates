"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Dispatch, Fragment, SetStateAction, useRef } from "react";
import toast from "react-hot-toast";
import UserStorage from "../../lib/supabase/storage";
import { useLoggedInUser } from "../../providers/userProvider";

export default function UpdateAvatarModal({
  isOpen = false,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  function closeModal() {
    setIsOpen(false);
  }
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsOpen(false);
      const file = event.target.files && event.target.files[0];
      if (!loggedInUser) {
        toast.error("Unable to upload profile at this time");
        return;
      }

      if (!file) {
        toast.error("Error accepting your file. Please try a new one");
        return;
      }

      const publicUrl = await UserStorage.updateAvatar({
        file,
        profile: loggedInUser,
      });

      setLoggedInUser({ ...loggedInUser, avatar_url: publicUrl });

      toastUploadSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Error uploading profile modal");
    }
  };

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
                  Change Profile Photo
                </Dialog.Title>
                <div className="cursor-pointer w-full border-b-slate-300 border-t-slate-300 border text-center py-3">
                  <input
                    className="hidden"
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <p
                    className="text-blue-500 font-semibold"
                    onClick={() => inputRef.current?.click()}
                  >
                    Upload photo
                  </p>
                </div>
                <div className="cursor-pointer text-center w-full py-3 border-b-slate-300 border-b">
                  <p className="text-red-500 font-semibold">
                    Remove current photo
                  </p>
                </div>

                <div
                  className="w-full py-3 cursor-pointer text-center"
                  onClick={closeModal}
                >
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

const toastUploadSuccess = () =>
  toast("Succesfully updated profile photo", {
    icon: "👍",
    duration: 2500,
  });

const toastError = (error: any) => toast.error(error);
