"use client";

import { MouseEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Users } from "../../lib/supabase/db";
import { useSignUpModal } from "../../providers/modalProvider";
import { IProfile } from "../../types/database";

export default function ProfileLikeButton({
  profile,
  currentLoggedInUser,
}: {
  profile: IProfile;
  currentLoggedInUser?: IProfile;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [shouldShowSignUpModal, toggleSignUpModal] = useSignUpModal();

  const hasLikedProfile =
    currentLoggedInUser &&
    currentLoggedInUser.liked_users?.includes(profile.id);
  const shouldShowFilledHeart = hasLikedProfile || isHovering;

  async function likeOrUnlikeUser(e: MouseEvent<HTMLElement>) {
    if (!currentLoggedInUser) {
      toggleSignUpModal({
        shouldShowModal: true,
        toggleModalReason: `${profile.full_name} wants to be liked 😢💔`,
      });
      return;
    }

    const { error } = hasLikedProfile
      ? await Users.unlikeUser(currentLoggedInUser, profile)
      : await Users.likeUser(currentLoggedInUser, profile);

    if (error) {
      toast.error("Unable to like user at this time");
      console.error(error);
      return;
    }

    // For the UI
    currentLoggedInUser.liked_users = hasLikedProfile
      ? // @ts-ignore: Object is possibly 'null'
        currentLoggedInUser.liked_users.filter((id) => id !== profile.id)
      : [...(currentLoggedInUser.liked_users || []), profile.id];

    toast(`${hasLikedProfile ? "Unliked" : "Liked"} ${profile.full_name}`, {
      icon: hasLikedProfile ? "🤍" : "❤️",
      duration: 2500,
    });
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
