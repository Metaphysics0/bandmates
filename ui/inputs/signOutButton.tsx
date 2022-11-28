"use client";

import { signOut } from "../../lib/supabase/auth";

export default function SignOutButton() {
  return (
    <button
      className="bg-red-500 hover:bg-red-400 text-white font-semibold p-2 rounded-lg shadow-md mr-3 transition duration-75"
      onClick={(e) => {
        e.preventDefault();
        signOut();
      }}
    >
      Log Out
    </button>
  );
}
