import { IconType } from "react-icons";
import { HiHome, HiOutlinePaperAirplane } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { MdExplore } from "react-icons/md";

export const ROUTES: IRoute[] = [
  {
    name: "Home",
    description: "Is where the heart is",
    slug: "",
    icon: HiHome,
  },
  {
    name: "Explore",
    description: "Discover talent",
    slug: "explore",
    icon: MdExplore,
  },
  {
    name: "Messages",
    description: "Collaborate and talk with other artists!",
    slug: "messages",
    icon: HiOutlinePaperAirplane,
  },
  {
    name: "Profile",
    description: "Personalize your account and view likes artists",
    slug: "profile",
    icon: CgProfile,
  },
];

export const PROTECTED_ROUTES = ["profile", "messages", "likes"];

export interface IRoute {
  name: string;
  description: string;
  slug: string;
  signInRequired?: boolean;
  icon: IconType;
}
