"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Dispatch, Fragment, SetStateAction, useRef } from "react";
import toast from "react-hot-toast";
import supabase from "../../lib/supabase/supabase-browser";
import { Users } from "../../lib/supabase/db";
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

  // 👇️ open file input box on click of other element
  const handleClick = () => inputRef.current?.click();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!loggedInUser) {
      console.log("LOGGED IS NOT LOGGED IN", loggedInUser);
      return;
    }

    setIsOpen(false);

    const filePath = `${loggedInUser?.id}/${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true, cacheControl: "3600" });

    if (uploadError) {
      toastError("error uploading avatar user");
      console.log("ERROR", uploadError);
      return;
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(uploadData.path);

    const { error: updateUserError } = await Users.updateById(loggedInUser.id, {
      avatar_url: publicUrl,
    });

    if (updateUserError) {
      toastError("error setting new profile picture");
      console.log(updateUserError);
      return;
    }

    setLoggedInUser({ ...loggedInUser, avatar_url: publicUrl });

    toastUploadSuccess();
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
                    onClick={handleClick}
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
