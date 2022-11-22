import { IconType } from "react-icons";
import { HiHome, HiOutlinePaperAirplane } from "react-icons/hi2";
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
    description: "Talk with other artists",
    slug: "messages",
    icon: HiOutlinePaperAirplane,
  },
  {
    name: "Profile",
    description: "Personalize your account",
    slug: "profile",
    icon: CgProfile,
  },
];

export interface IRoute {
  name: string;
  description: string;
  slug: string;
  icon: IconType;
}
