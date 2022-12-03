"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { MouseEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Users } from "../../lib/supabase/db";
import { useLikedUsers } from "../../providers/likedUserListProvider";
import { useSignUpModal } from "../../providers/signUpModalProvider";
import { IProfile, IThinProfile } from "../../types/database";

export default function ProfileLikeButton({
  profile,
  currentLoggedInUser,
}: {
  profile: IProfile;
  currentLoggedInUser?: IProfile | IThinProfile;
}) {
  const [likedUsers, setLikedUsers] = useLikedUsers();

  const [isHovering, setIsHovering] = useState(false);
  const [shouldShowSignUpModal, toggleSignUpModal] = useSignUpModal();

  const segment = useSelectedLayoutSegment();

  const shouldUnlikeUser =
    currentLoggedInUser &&
    currentLoggedInUser.liked_users?.includes(profile.id);
  const shouldShowFilledHeart = shouldUnlikeUser || isHovering;

  async function likeOrUnlikeUser(e: MouseEvent<HTMLElement>) {
    console.log("ROUTER PATH", segment);

    if (!currentLoggedInUser) {
      toggleSignUpModal({
        shouldShowModal: true,
        toggleModalReason: `${profile.full_name} wants to be liked 😢💔`,
      });
      return;
    }

    const { error } = shouldUnlikeUser
      ? await Users.unlikeUser(currentLoggedInUser, profile)
      : await Users.likeUser(currentLoggedInUser, profile);

    if (error) {
      toast.error(
        `Unable to ${shouldUnlikeUser ? "like" : "Unlike"} user at this time`
      );
      console.error(error);
      return;
    }

    setLikedUsersForUi();

    toast(
      (t) => (
        <div>
          <span className="mr-1">{shouldUnlikeUser ? "🤍" : "❤️"}</span>
          <span>
            {shouldUnlikeUser ? "Unliked" : "Liked"} {profile.full_name}
          </span>
          <Link
            className="ml-1 bg-slate-200 p-1 font-semibold rounded-lg"
            href="/profile/likes"
          >
            View Likes
          </Link>
        </div>
      ),
      {
        duration: 3000,
      }
    );
  }

  function setLikedUsersForUi() {
    if (shouldUnlikeUser) {
      setLikedUsers(likedUsers.filter((user) => user.id !== profile.id));
      if (currentLoggedInUser)
        currentLoggedInUser.liked_users =
          currentLoggedInUser?.liked_users?.filter((id) => id !== profile.id) ||
          [];
      return;
    }

    setLikedUsers([...likedUsers, profile]);
    if (currentLoggedInUser)
      currentLoggedInUser.liked_users = [
        ...(currentLoggedInUser?.liked_users || []),
        profile.id,
      ];
  }

  return (
    <>
      <div
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        className="text-3xl cursor-pointer"
        onClick={likeOrUnlikeUser}
      >
        {shouldShowFilledHeart ? (
          <AiFillHeart className="text-pink-500" />
        ) : (
          <AiOutlineHeart className="text-white" />
        )}
      </div>
      <Toaster position="top-right" />
    </>
  );
}
