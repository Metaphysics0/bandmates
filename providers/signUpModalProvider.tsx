"use client";

import React from "react";

const SignUpModal = React.createContext<
  | [ISignUpStateValue, React.Dispatch<React.SetStateAction<ISignUpStateValue>>]
  | undefined
>(undefined);

export function SignUpModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [signUpModal, toggleSignUpModal] = React.useState({
    shouldShowModal: false,
  });
  return (
    <SignUpModal.Provider value={[signUpModal, toggleSignUpModal]}>
      {children}
    </SignUpModal.Provider>
  );
}

export function useSignUpModal() {
  const context = React.useContext(SignUpModal);
  if (context === undefined) {
    throw new Error("useSignUpModal must be used within a SignUpModalProvider");
  }
  return context;
}

interface ISignUpStateValue {
  shouldShowModal: boolean;
  toggleModalReason?: string;
}
