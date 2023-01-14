"use client";

import { MouseEvent } from "react";
import { signOut } from "../../lib/supabase/auth";
import { useLoggedInUser } from "../../providers/userProvider";

export default function SignOutButton() {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  const logOut = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoggedInUser(null);
    signOut();
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-400 text-white font-semibold p-2 rounded-lg shadow-md mr-3 transition duration-75"
      onClick={logOut}
    >
      Log Out
    </button>
  );
}
