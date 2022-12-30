"use client";

import Link from "next/link";
import { USER_TYPE_OPTIONS } from "../../data/consts";
import { useLoggedInUser } from "../../providers/userProvider";
import { IProfile } from "../../types/database";
import DropdownList from "../inputs/DropdownList";
import SignUpWithSpotfiyButton from "../inputs/SignUpWithSpotifyButton";
import ProfileCard from "./ProfileCard";

export default function HeroProfileCard() {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  return (
    <>
      {loggedInUser ? (
        <SignedInProfileCard profile={loggedInUser} />
      ) : (
        <SignUpCard />
      )}
    </>
  );
}

function SignedInProfileCard({ profile }: { profile: IProfile }) {
  return (
    <div className="flex flex-col items-center">
      <ProfileCard profile={profile} />
      <Link href="/profile" className="profile-btn">
        Take me to my profile!
      </Link>
    </div>
  );
}

function SignUpCard() {
  return (
    <div className="p-5 pb-4 bg-white rounded-xl shadow-xl max-w-sm">
      <div className="video-wrapper mb-4 rounded-md">
        <iframe
          src="https://www.youtube.com/embed/UIofe-CEyII"
          frameBorder="0"
          className="rounded-md"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="container flex flex-col align-middle justify-center">
        <div className="mb-3">
          <DropdownList options={USER_TYPE_OPTIONS} />
        </div>
        <div className="mb-1">
          <SignUpWithSpotfiyButton />
        </div>
        <p className="text-center text-sm font-medium text-slate-800">
          Log in with the same button! 👆
        </p>
      </div>
    </div>
  );
}
