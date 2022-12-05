"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useProfileModal } from "../../providers/viewProfileModalProvider";
import { IProfile } from "../../types/database";

export default function ViewProfileButton({ profile }: { profile: IProfile }) {
  const [{ shouldShowModal }, setShouldShowModal] = useProfileModal();

  return (
    <Link
      href={`/users/${profile.id}`}
      shallow={true}
      scroll={false}
      onClick={() => setShouldShowModal({ shouldShowModal: true, profile })}
    >
      <div className="opacity-100 bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500 transition duration-75 text-white font-bold py-2 px-4 border-b-4 rounded-full outline-none my-2">
        View Profile
      </div>
    </Link>
  );
}
