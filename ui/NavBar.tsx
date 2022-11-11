"use client";

import { BandMatesLogo } from "./Logo";
import { CgProfile } from "react-icons/cg";
import { FaRegPaperPlane } from "react-icons/fa";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ROUTES } from "../data/routes";

export default function NavBar() {
  const segment = useSelectedLayoutSegment();
  const isHero = segment === null;
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex justify-between w-full items-center mx-auto">
        {!isHero ? (
          <div className="logo-wrap">
            <Link
              href="/"
              className="group flex w-full items-center space-x-2.5"
            >
              <BandMatesLogo />
            </Link>
          </div>
        ) : (
          <div></div>
        )}
        <div className="route-actions flex">
          {ROUTES.map((slug) =>
            NavLink({
              item: {
                slug,
              },
            })
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ item }: { item: INavItem }) {
  const segment = useSelectedLayoutSegment();
  const isActive = item.slug === segment;
  const iconColor = isActive ? "red" : "blue";

  const iconMap = {
    messages: <FaRegPaperPlane />,
    profile: <CgProfile />,
  };

  return (
    <Link
      key={item.slug}
      href={`/${item.slug}`}
      className={`text-${iconColor}-500 text-2xl`}
    >
      {iconMap[item.slug]}
    </Link>
  );
}

type INavItem = {
  slug: typeof ROUTES[number];
  description?: string;
};
