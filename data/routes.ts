import { IconType } from "react-icons";
import { HiHome, HiOutlinePaperAirplane } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";

export const ROUTES: IRoute[] = [
  {
    name: "Home",
    description: "Is where the heart is",
    href: "/",
    icon: HiHome,
  },
  {
    name: "Messages",
    description: "Talk with other artists",
    href: "/messages",
    icon: HiOutlinePaperAirplane,
  },
  {
    name: "Profile",
    description: "Personalize your account",
    href: "/profile",
    icon: CgProfile,
  },
];

interface IRoute {
  name: string;
  description: string;
  href: string;
  icon: IconType;
}
