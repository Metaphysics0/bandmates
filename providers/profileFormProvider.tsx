"use client";

import React from "react";
import { IProfileUpdateFields } from "../types/database";

const ProfileForm = React.createContext<
  | [
      IProfileUpdateFields,
      React.Dispatch<React.SetStateAction<IProfileUpdateFields>>
    ]
  | undefined
>(undefined);

export function ProfileFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profileForm, setProfileForm] = React.useState({});
  return (
    <ProfileForm.Provider value={[profileForm, setProfileForm]}>
      {children}
    </ProfileForm.Provider>
  );
}

export function useProfileForm() {
  const context = React.useContext(ProfileForm);
  if (context === undefined) {
    throw new Error("useProfileForm must be used within a ProfileFormProvider");
  }
  return context;
}
