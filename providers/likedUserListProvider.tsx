"use client";

import React from "react";
import { IProfile } from "../types/database";

const LikedUsers = React.createContext<
  [IProfile[], React.Dispatch<React.SetStateAction<IProfile[]>>] | undefined
>(undefined);

export function LikedUsersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [likedUsers, setLikedUsers] = React.useState<IProfile[]>([]);
  return (
    <LikedUsers.Provider value={[likedUsers, setLikedUsers]}>
      {children}
    </LikedUsers.Provider>
  );
}

export function useLikedUsers() {
  const context = React.useContext(LikedUsers);
  if (context === undefined) {
    throw new Error("useLikedUsers must be used within a LikedUsersProvider");
  }
  return context;
}
