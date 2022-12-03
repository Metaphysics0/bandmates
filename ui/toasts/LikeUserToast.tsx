"use client";
import Link from "next/link";
import toast, { Toast } from "react-hot-toast";
import { IProfile } from "../../types/database";

export default function LikeUserToast({
  profile,
  action,
  toastObject,
}: {
  action: "like" | "unlike";
  profile: IProfile;
  toastObject: Toast;
}) {
  return (
    <div>
      <span className="mr-1">{action === "unlike" ? "🤍" : "❤️"}</span>
      <span>
        {action === "unlike" ? "Unliked" : "Liked"} {profile.full_name}
      </span>
      <Link
        className="ml-1 bg-slate-200 p-1 font-semibold rounded-lg"
        href="/profile/likes"
        onClick={() => toast.dismiss(toastObject.id)}
      >
        View Likes
      </Link>
    </div>
  );
}
