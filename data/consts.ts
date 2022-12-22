import { ISignUpSelectOption, ISocialContactMethod } from "../types/types";
import DiscordIcon from "../ui/icons/Discord";
import InstagramIcon from "../ui/icons/Instagram";
import TwitterIcon from "../ui/icons/Twitter";
import WhatsAppIcon from "../ui/icons/WhatsApp";

export const USER_TYPE_OPTIONS: ISignUpSelectOption[] = [
  { value: "Select the most relevant!", id: 123, disabled: true },
  {
    value: "Guitarist",
    emoji: "🎸",
    signUpHeader: "Fellow Guitarist!",
    signUpDescription:
      "Joining the community will give you an incredible outlet to showcase your riffs, to collaborate with other guitarists and musicians, and to get inspired from other artists.",
  },
  {
    value: "Drummer",
    emoji: "🥁",
    signUpHeader: "We love drummers ❤️",
    signUpDescription:
      "Joining the community will give you an incredible outlet to showcase your chops, to collaborate with other musicians, and to get inspired from other artists.",
  },
  {
    value: "Singer",
    emoji: "🎤",
    signUpHeader: "Gimme some vocal melodies.",
    signUpDescription:
      "Joining the community will give you an incredible outlet to showcase your talent, to collaborate with other musicians, and to get inspired from other artists.",
  },
  {
    value: "Producer",
    emoji: "👨🏻‍💻",
    signUpHeader: "Lofi beats to study and chill to 24/7.",
    signUpDescription:
      "Joining the community will give you an incredible outlet to showcase your talent, to collaborate with other musicians, and to get inspired from other artists.",
  },
  {
    value: "Listener",
    emoji: "🎧",
    signUpHeader: "Let's listen",
    signUpDescription:
      "Joining the community will give you an incredible outlet to showcase your talent, to collaborate with other musicians, and to get inspired from other artists.",
  },
  {
    value: "Pianist",
    emoji: "🎹",
    signUpHeader: "Love me some keys.",
    signUpDescription:
      "Joining the community, especially as someone who knows how to play the keys, will give you a tremendous outlet to showcase your talent, collaborate with other musicians, and to get inspired from other artists.",
  },
  {
    value: "Songwriter",
    emoji: "✍️",
    signUpHeader: "Drake had most of his music written for him.",
    signUpDescription:
      "Joining the community as a songwriter will give you an amazing place to showcase your talent, collaborate with other musicians, and to get inspired from other artists.",
  },
  {
    value: "Composer",
    emoji: "🎼",
    signUpHeader: "Compose some Bach.",
    signUpDescription:
      "Joining the community as a composer will give you a tremendous outlet to showcase your talent, collaborate with other artists, and to get inspired for your next piece.",
  },
  {
    value: "Artist",
    emoji: "🧑‍🎨",
    signUpHeader: "Compose some Bach.",
    signUpDescription:
      "Joining the community as a composer will give you a tremendous outlet to showcase your talent, collaborate with other artists, and to get inspired for your next piece.",
  },
  {
    value: "Philosopher",
    emoji: "🧠",
  },
  {
    value: "Rapper",
    emoji: "💥",
  },
  {
    value: "All of the above",
    emoji: "🌎",
  },
];

export const PREMIUM_SEARCH_FILTERS: string[] = [
  "👾 Lo-Fi",
  "✨ Neo-Soul",
  "🎸 Math Rock",
  "🖤 Emo",
  "🪐 Djent",
  "😤 Hardcore",
  "🎺 Jazz",
];

export const SOCIAL_CONTACT_METHODS: ISocialContactMethod[] = [
  {
    provider: "instagram",
    icon: InstagramIcon,
  },
  {
    provider: "discord",
    icon: DiscordIcon,
  },
  {
    provider: "whatsapp",
    icon: WhatsAppIcon,
  },
  {
    provider: "twitter",
    icon: TwitterIcon,
  },
];
