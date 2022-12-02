"use client";

import React from "react";
import { IProfile } from "../types/database";

const LoggedInUser = React.createContext<
  | [IProfile | null, React.Dispatch<React.SetStateAction<IProfile | null>>]
  | undefined
>(undefined);

export function LoggedInUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedInUser, setLoggedInUser] = React.useState<IProfile | null>(null);
  return (
    <LoggedInUser.Provider value={[loggedInUser, setLoggedInUser]}>
      {children}
    </LoggedInUser.Provider>
  );
}

export function useLoggedInUser() {
  const context = React.useContext(LoggedInUser);
  if (context === undefined) {
    throw new Error(
      "useloggedInUser must be used within a loggedInUserProvider"
    );
  }
  return context;
}
