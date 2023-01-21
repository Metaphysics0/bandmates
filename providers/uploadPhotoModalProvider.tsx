"use client";

import React, { createContext, useState } from "react";
import useCloseModalOnEscape from "../utils/useCloseModalOnEscape";

const UploadPhotoModalContext = createContext<
  | [
      IUploadPhotoModalValues,
      React.Dispatch<React.SetStateAction<IUploadPhotoModalValues>>
    ]
  | undefined
>(undefined);

export function UploadPhotoModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shouldShowModal, setShouldShowModal] = useState({ isOpen: false });
  return (
    <UploadPhotoModalContext.Provider
      value={[shouldShowModal, setShouldShowModal]}
    >
      {children}
    </UploadPhotoModalContext.Provider>
  );
}

export function useUploadPhotoModal() {
  const context = React.useContext(UploadPhotoModalContext);

  if (context === undefined) {
    throw new Error("useSignUpModal must be used within a SignUpModalProvider");
  }

  // const [shouldShowModal, setShouldShowModal] = context;
  // useCloseModalOnEscape(setShouldShowModal);

  return context;
}

interface IUploadPhotoModalValues {
  isOpen: boolean;
  indexOfPhoto?: number;
}
