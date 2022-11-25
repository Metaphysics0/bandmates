"use client";

import { signout } from "../../lib/supabase/auth";

export default function SignOutText() {
  return (
    <div className="text-center text-sm pt-1 opacity-70">
      Not you?{" "}
      <span
        onClick={signout}
        className="cursor-pointer text-orange-500 font-medium hover:text-orange-600 transition duration-75 underline hover:no-underline"
      >
        Log out
      </span>
    </div>
  );
}
