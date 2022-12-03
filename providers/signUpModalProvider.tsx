"use client";

import React, { useEffect } from "react";

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
  const [signUpModal, toggleSignUpModal] = context;
  useEffect(() => {
    const closeModalOnEscape = (e: KeyboardEvent | any): void => {
      if (e.key === "Escape") toggleSignUpModal({ shouldShowModal: false });
    };
    document.addEventListener("keydown", closeModalOnEscape);
    return () => {
      document.removeEventListener("keydown", closeModalOnEscape);
    };
  }, [toggleSignUpModal]);

  return context;
}

interface ISignUpStateValue {
  shouldShowModal: boolean;
  toggleModalReason?: string;
}
