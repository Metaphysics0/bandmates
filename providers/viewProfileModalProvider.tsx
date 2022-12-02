"use client";

import React from "react";
import { IProfile } from "../types/database";

const ProfileModal = React.createContext<
  | [ISignUpStateValue, React.Dispatch<React.SetStateAction<ISignUpStateValue>>]
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
  return context;
}

interface ISignUpStateValue {
  shouldShowModal: boolean;
  profile?: IProfile;
}
