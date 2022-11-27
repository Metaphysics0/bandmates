import { IconType } from "react-icons";
import { HiHome, HiOutlinePaperAirplane } from "react-icons/hi2";
import { AiOutlineHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

export const ROUTES: IRoute[] = [
  {
    name: "Home",
    description: "Is where the heart is",
    slug: "",
    icon: HiHome,
  },
  {
    name: "Messages",
    description: "Collaborate and talk with other artists!",
    slug: "messages",
    icon: HiOutlinePaperAirplane,
  },
  {
    name: "Likes",
    description: "All the artists you liked in one place.",
    slug: "likes",
    icon: AiOutlineHeart,
  },
  {
    name: "Profile",
    description: "Add music and personalize your account",
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
