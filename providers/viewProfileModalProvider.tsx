"use client";

import React, { useEffect } from "react";
import { IProfile } from "../types/database";

const ProfileModal = React.createContext<
  | [
      IShouldShowProfileModal,
      React.Dispatch<React.SetStateAction<IShouldShowProfileModal>>
    ]
  | undefined
>(undefined);

export function ProfileModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shouldShowProfileModal, toggleProfileModal] = React.useState({
    shouldShowModal: false,
  });
  return (
    <ProfileModal.Provider value={[shouldShowProfileModal, toggleProfileModal]}>
      {children}
    </ProfileModal.Provider>
  );
}

export function useProfileModal() {
  const context = React.useContext(ProfileModal);
  if (context === undefined) {
    throw new Error("profileModal must be used within a profileModalProvider");
  }
  const [shouldShowProfileModal, toggleProfileModal] = context;
  useEffect(() => {
    const closeModalOnEscape = (e: KeyboardEvent | any): void => {
      if (e.key === "Escape") toggleProfileModal({ shouldShowModal: false });
    };
    document.addEventListener("keydown", closeModalOnEscape);
    return () => {
      document.removeEventListener("keydown", closeModalOnEscape);
    };
  }, [toggleProfileModal]);

  return context;
}

interface IShouldShowProfileModal {
  shouldShowModal: boolean;
  profile?: IProfile;
}
