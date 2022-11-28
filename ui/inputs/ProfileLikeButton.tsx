"use client";

import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function handleClick(e: any) {
  console.log("I was clicked", e);
}
export default function ProfileLikeButton() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      className="text-3xl cursor-pointer"
    >
      {isHovering ? (
        <AiFillHeart className="text-pink-500" />
      ) : (
        <AiOutlineHeart className="text-white" />
      )}
    </div>
  );
}
