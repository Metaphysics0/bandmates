"use client";

import { MouseEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Users } from "../../lib/supabase/db";
import { useSignUpModal } from "../../providers/modalProvider";
import { useLoggedInUser } from "../../providers/userProvider";
import { IProfile } from "../../types/database";

export default function ProfileLikeButton({ profile }: { profile: IProfile }) {
  const [isHovering, setIsHovering] = useState(false);
  const [shouldShowSignUpModal, toggleSignUpModal] = useSignUpModal();
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  const handleClick = async (e: MouseEvent<HTMLElement>) => {
    if (!loggedInUser) {
      toggleSignUpModal({
        shouldShowModal: true,
        toggleModalReason: `${profile.full_name} wants to be liked 😢💔`,
      });
      return;
    }

    const likedUsersToSet = [...(loggedInUser.liked_users || []), profile.id];

    const { data, error } = await Users.updateById(loggedInUser.id, {
      liked_users: likedUsersToSet,
    });

    if (error) {
      toast.error("Unable to like user at this time");
      return;
    }

    setLoggedInUser({ ...loggedInUser, liked_users: likedUsersToSet });

    toast(`Liked ${profile.full_name}`, {
      icon: "❤️",
      duration: 2500,
    });
  };

  const hasLikedProfile =
    loggedInUser && loggedInUser.liked_users?.includes(profile.id);

  const shouldShowFilledHeart = hasLikedProfile || isHovering;

  return (
    <>
      <div
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        className="text-3xl cursor-pointer"
        onClick={handleClick}
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
