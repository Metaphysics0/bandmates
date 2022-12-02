"use client";

import React from "react";
import { IProfile } from "../types/database";

const LoggedInUser = React.createContext<
  | [IProfile | undefined, React.Dispatch<React.SetStateAction<IProfile | any>>]
  | undefined
>(undefined);

export function LoggedInUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedInUser, setLoggedInUser] = React.useState();
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
