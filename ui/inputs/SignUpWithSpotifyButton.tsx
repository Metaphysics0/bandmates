"use client";

import { SiSpotify } from "react-icons/si";
import { SignInWithSpotify } from "../../lib/supabase/auth";

export default function SignUpWithSpotfiyButton({
  options,
}: {
  options?: any;
}) {
  return (
    <button
      type="button"
      className="text-slate-100 bg-spotify-500 hover:bg-spotify-600 focus:ring-spotify-300 text-lg focus:outline-none focus:ring-4 font-medium rounded-full px-5 py-2.5 flex items-center justify-between w-[calc(100%_-_2rem)] m-auto"
      onClick={() => SignInWithSpotify(options)}
    >
      <SiSpotify className="mr-1" />
      Sign up with Spotify
      <div></div>
    </button>
  );
}
