"use client";

import React from "react";
import { IProfile } from "../types/database";

const UserContext = React.createContext<
  | [IProfile | undefined, React.Dispatch<React.SetStateAction<IProfile | any>>]
  | undefined
>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState();
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
