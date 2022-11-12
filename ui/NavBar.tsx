"use client";

import { BandMatesLogo } from "./Logo";
import { FaRegPaperPlane, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ROUTES } from "../data/routes";

export default function NavBar() {
  const segment = useSelectedLayoutSegment();
  const isHero = segment === null;
  return (
    <nav
      className="flex justify-around py-4 bg-white/80
    backdrop-blur-md shadow-md w-fit p-10 rounded-md ml-auto
    fixed top-0 left-0 right-0 z-20"
    >
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
        <div className="route-actions flex">{ROUTES.map(NavLink)}</div>
      </div>
    </nav>
  );
}

function NavLink(slug: typeof ROUTES[number]) {
  const isActive = slug === useSelectedLayoutSegment();
  const iconColor = isActive ? "red" : "blue";

  const iconMap = {
    messages: <FaRegPaperPlane />,
    profile: <FaUserCircle />,
  };

  return (
    <Link
      key={slug}
      href={`/${slug}`}
      className={`text-${iconColor}-500 text-2xl`}
    >
      {iconMap[slug]}
    </Link>
  );
}
