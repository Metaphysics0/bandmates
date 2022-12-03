"use client";

import { MouseEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Users } from "../../lib/supabase/db";
import { useSignUpModal } from "../../providers/signUpModalProvider";
import { useLoggedInUser } from "../../providers/userProvider";
import { IProfile } from "../../types/database";
import LikeUserToast from "../toasts/LikeUserToast";

export default function ProfileLikeButton({ profile }: { profile: IProfile }) {
  const [isHovering, setIsHovering] = useState(false);
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();
  const [shouldShowSignUpModal, toggleSignUpModal] = useSignUpModal();
  const [hasLikedUser, setHasLikedUser] = useState<boolean>(false);

  useEffect(() => {
    setHasLikedUser(!!loggedInUser?.liked_users?.includes(profile.id));
  }, [loggedInUser, profile.id]);

  async function likeOrUnlikeUser(e: MouseEvent<HTMLElement>) {
    if (!loggedInUser) {
      toggleSignUpModal({
        shouldShowModal: true,
        toggleModalReason: `${profile.full_name} wants to be liked 😢💔`,
      });
      return;
    }

    const { error } = hasLikedUser
      ? await Users.unlikeUser(loggedInUser, profile)
      : await Users.likeUser(loggedInUser, profile);

    if (error) {
      toast.error(
        `Unable to ${hasLikedUser ? "unlike" : "like"} user at this time`
      );
      console.error(error);
      return;
    }

    toast(
      (toastObject) => (
        <LikeUserToast
          action={hasLikedUser ? "unlike" : "like"}
          profile={profile}
          toastObject={toastObject}
        />
      ),
      {
        duration: 3000,
      }
    );

    updateProfileState();
  }

  function updateProfileState() {
    if (!loggedInUser?.liked_users) return;

    if (hasLikedUser) {
      const liked_users = loggedInUser.liked_users.filter(
        (id) => id !== profile.id
      );

      setLoggedInUser({ ...loggedInUser, liked_users });
      return;
    }

    const liked_users = [...(loggedInUser.liked_users || []), profile.id];

    setLoggedInUser({ ...loggedInUser, liked_users });
  }

  return (
    <>
      <div
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        className="text-3xl cursor-pointer"
        onClick={likeOrUnlikeUser}
      >
        {hasLikedUser || isHovering ? (
          <AiFillHeart className="text-pink-500" />
        ) : (
          <AiOutlineHeart className="text-white" />
        )}
      </div>
      <Toaster position="top-right" />
    </>
  );
}
