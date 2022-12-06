"use client";

import Link from "next/link";
import { Suspense } from "react";
import { USER_TYPE_OPTIONS } from "../../data/consts";
import { useLoggedInUser } from "../../providers/userProvider";
import { IProfile } from "../../types/database";
import DropdownList from "../inputs/DropdownList";
import SignUpWithSpotfiyButton from "../inputs/SignUpWithSpotifyButton";
import ProfileCard from "./ProfileCard";

export default function HeroProfileCard() {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  return (
    <Suspense fallback={<h1>loading...</h1>}>
      {loggedInUser ? (
        <SignedInProfileCard profile={loggedInUser} />
      ) : (
        <SignUpCard />
      )}
    </Suspense>
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

function SignUpCard() {
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
        <div className="mb-3">
          <DropdownList options={USER_TYPE_OPTIONS} />
        </div>
        <SignUpWithSpotfiyButton />
      </div>
    </div>
  );
}
