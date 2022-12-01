"use client";

import { MouseEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import supabaseBrowser from "../../lib/supabase/supabase-browser";
import { useSignUpModal } from "../../providers/modalProvider";
import { IProfile } from "../../types/database";

export default function ProfileLikeButton({ profile }: { profile: IProfile }) {
  const [isHovering, setIsHovering] = useState(false);
  const [shouldShowSignUpModal, toggleSignUpModal] = useSignUpModal();

  const handleClick = async (e: MouseEvent<HTMLElement>) => {
    try {
      const {
        data: { session },
        error,
      } = await supabaseBrowser.auth.getSession();

      if (!session) {
        toggleSignUpModal({
          shouldShowModal: true,
          toggleModalReason: `${profile.full_name} wants to be liked 😢💔`,
        });
        return;
      }

      toast(`Liked ${profile.full_name}`, {
        icon: "❤️",
        duration: 2500,
      });
    } catch (error) {
      toast.error(`Unable to like ${profile.full_name} at this time 😢💔`);
      console.error(error);
    }
  };

  return (
    <>
      <div
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        className="text-3xl cursor-pointer"
        onClick={handleClick}
      >
        {isHovering ? (
          <AiFillHeart className="text-pink-500" />
        ) : (
          <AiOutlineHeart className="text-white" />
        )}
      </div>
      <Toaster position="top-right" />
    </>
  );
}
