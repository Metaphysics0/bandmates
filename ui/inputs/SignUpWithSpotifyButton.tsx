"use client";

import { FaSpotify } from "react-icons/fa";
import { SignInWithSpotify } from "../../lib/supabase/auth";

export default function SignUpWithSpotfiyButton({
  options,
}: {
  options?: any;
}) {
  const handleSignIn = async (): Promise<void> => {
    const { data, error } = await SignInWithSpotify(options);
    if (error) {
      console.error("Error signing in with spotify", error);
    }
  };

  return (
    <div
      className="text-slate-100 bg-spotify-500 hover:bg-spotify-600 focus:ring-spotify-300 text-lg focus:outline-none focus:ring-4 font-medium rounded-full px-5 py-2.5 flex items-center justify-between w-fit m-auto shadow-md"
      onClick={handleSignIn}
    >
      <FaSpotify />
      <span className="font-semibold">Sign up with Spotify</span>
      <span></span>
    </div>
  );
}
