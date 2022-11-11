import { BandMatesLogo } from "./Logo";
import { CgProfile } from "react-icons/cg";
import { FaRegPaperPlane } from "react-icons/fa";
import Link from "next/link";
import styles from "../styles/Main.module.css";
import { inter, nunito } from "../styles/fonts"

export default function NavBar({ isHero = false }: { isHero?: boolean }) {
  const commonLinkStyle =
    "block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white text-2xl";
  return (
    <nav
      className={`bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded ${
        isHero ? "h-44" : ""
      }`}
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
        ) : <div></div>}
        <div className="route-actions flex">
          <Link href="/messages" className={commonLinkStyle}>
            <FaRegPaperPlane />
          </Link>
          <Link
            href="/profile"
            className={`group flex w-full items-center space-x-2.5 ${commonLinkStyle} ml-7`}
          >
            <CgProfile />
          </Link>
        </div>
      </div>
    </nav>
  );
}
