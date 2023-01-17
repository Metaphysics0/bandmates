"use client";

import Link from "next/link";
import { useSignUpModal } from "../../providers/signUpModalProvider";
import { useLoggedInUser } from "../../providers/userProvider";
import { useProfileModal } from "../../providers/viewProfileModalProvider";
import { IProfile } from "../../types/database";

export default function ViewProfileButton({ profile }: { profile: IProfile }) {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();
  const [
    { shouldShowModal: shouldShowProfileModal },
    setShouldShowProfileModal,
  ] = useProfileModal();
  const [{ shouldShowModal: shouldShowSignUpModal }, setShouldShowSignUpModal] =
    useSignUpModal();

  const handleClick = (e: any) => {
    e.preventDefault();
    if (!loggedInUser) {
      setShouldShowSignUpModal({
        shouldShowModal: true,
        toggleModalReason: `View ${profile.full_name}'s full profile and more after signing up!`,
      });
      return;
    }
    setShouldShowProfileModal({ shouldShowModal: true, profile });
    window.history.pushState({}, "", `/users/${profile.id}`);
  };

  return (
    <Link
      href={`/users/[userId]`}
      as={`/users/${profile.id}`}
      shallow={true}
      scroll={false}
      onClick={handleClick}
    >
      <div className="opacity-100 bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500 transition duration-75 text-white font-bold py-2 px-4 border-b-4 rounded-full outline-none my-2">
        View Profile!
      </div>
    </Link>
  );
}
