import Link from "next/link";
import { USER_TYPE_OPTIONS } from "../data/consts";
import { Users } from "../lib/supabase/db";
import supabaseServer from "../lib/supabase/supabase-server";
import { IProfile } from "../types/database";
import DropdownList from "./inputs/DropdownList";
import { SelectedOptionProvider } from "./inputs/DropdownListProvider";
import SignUpWithSpotfiyButton from "./inputs/SignUpWithSpotifyButton";
import ProfileCard from "./ProfileCard";

export default async function HeroProfileCard() {
  const profile = await Users.loadUserFromSession(supabaseServer());

  return profile ? (
    <SignedInProfileCard profile={profile} />
  ) : (
    <SignUpModalCard />
  );
}

function SignedInProfileCard({ profile }: { profile: IProfile }) {
  return (
    <div className="flex flex-col items-center">
      <ProfileCard profile={profile} />
      <Link
        href="/profile"
        className="bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500 transition duration-75 text-white font-bold py-2 px-4 border-b-4 rounded-full outline-none my-2"
      >
        Take me to my profile!
      </Link>
    </div>
  );
}

function SignUpModalCard() {
  return (
    <div className="p-5 pb-4 bg-white rounded-xl shadow-xl">
      <div className="video-wrapper mb-4 rounded-md">
        <iframe
          src="https://www.youtube.com/embed/UIofe-CEyII"
          frameBorder="0"
          className="rounded-md"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="container flex flex-col align-middle justify-center mb-2">
        <SelectedOptionProvider>
          <div className="mb-3">
            <DropdownList options={USER_TYPE_OPTIONS} />
          </div>
          <SignUpWithSpotfiyButton />
        </SelectedOptionProvider>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a
          href=""
          className="text-orange-500 font-medium hover:text-orange-600 transition duration-75 underline"
        >
          Log In
        </a>
      </div>
    </div>
  );
}
