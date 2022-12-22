"use client";

import { UseFormRegister } from "react-hook-form";
import { ISocialContactProvider } from "../../../types/types";

export default function SocialMediaInput({
  contactMethod,
  formRegister,
}: {
  contactMethod: ISocialContactProvider;
  formRegister: UseFormRegister<any>;
}) {
  const { prefix, placeholder } = SOCIAL_MEDIA_MAPPING[contactMethod];
  return (
    <label className="flex justify-between mb-4 border-slate-300 rounded-md border">
      <div className="flex items-center bg-slate-300 px-3 opacity-50">
        {prefix}
      </div>
      <input
        type="text"
        {...formRegister(contactMethod)}
        placeholder={placeholder}
        className="rounded-md outline-none border-none focus:ring-0 font-bold"
      />
    </label>
  );
}

const SOCIAL_MEDIA_MAPPING: ISocialMediaInputMap = {
  instagram: {
    prefix: "https://instagram.com/",
    placeholder: "my-insta-name",
  },
  discord: {
    prefix: "https://discordapp.com/users/",
    placeholder: "MyUser#7801",
  },
  whatsapp: {
    prefix: " https://wa.me/",
    placeholder: "15554443333",
  },
  twitter: {
    prefix: "https://twitter.com/",
    placeholder: "MyTwitterName",
  },
};

type ISocialMediaInputMap = {
  [k in ISocialContactProvider]: {
    prefix: string;
    placeholder: string;
  };
};
