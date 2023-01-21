"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";
import { BsFillImageFill } from "react-icons/bs";
import UserStorage from "../../lib/supabase/storage";
import { useUploadPhotoModal } from "../../providers/uploadPhotoModalProvider";
import { useLoggedInUser } from "../../providers/userProvider";

export default function UploadPhotoModal() {
  const [modalValues, setModalValues] = useUploadPhotoModal();

  function closeModal() {
    setModalValues({ isOpen: false });
  }
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  const handleFiles = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    try {
      if (!loggedInUser) {
        toast.error("Unable to upload profile at this time");
        return;
      }

      if (!file) {
        toast.error("Error accepting your file. Please try a new one");
        return;
      }

      const photoUrl = await UserStorage.updateProfilePhotos({
        file,
        profile: loggedInUser,
        indexOfPhotoToUpdate: modalValues.indexOfPhoto || 0,
      });

      setLoggedInUser({
        ...loggedInUser,
        profile_photos: [...(loggedInUser?.profile_photos ?? []), photoUrl],
      });

      closeModal();
      toastUploadSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Error uploading profile modal");
    }
  };

  return (
    <Transition appear show={modalValues.isOpen} as={Fragment}>
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
              <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white px-0 text-left align-middle shadow-xl transition-all flex flex-col items-center">
                <Dropzone onDrop={handleFiles} maxFiles={1}>
                  {({ getRootProps, getInputProps }) => (
                    <section className="p-3">
                      <div
                        {...getRootProps()}
                        className="p-10 hover:opacity-70 cursor-pointer border-2 border-dashed border-slate-400 rounded-lg"
                      >
                        <input {...getInputProps()} />
                        <div className="flex justify-center">
                          <BsFillImageFill />
                        </div>
                        <p className="text-center">
                          Drop your image here, or{" "}
                          <span className="text-blue-400 font-medium">
                            browse
                          </span>
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
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
