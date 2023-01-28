"use client";

import { UseFormRegister } from "react-hook-form";
import { SOCIAL_CONTACT_METHODS } from "../../../data/consts";
import { ISocialContactProvider } from "../../../types/types";

export default function SocialMediaInput({
  contactMethod,
  formRegister,
}: {
  contactMethod: ISocialContactProvider;
  formRegister: UseFormRegister<any>;
}) {
  // @ts-ignore
  const { linkPrefix, inputPlaceholder } = SOCIAL_CONTACT_METHODS.find(
    (method) => method.provider === contactMethod
  );

  return (
    <label className="flex justify-between mb-4 border-slate-300 rounded-md border">
      <div className="flex items-center bg-slate-300 px-3 opacity-50">
        {linkPrefix}
      </div>
      <input
        type="text"
        {...formRegister(contactMethod)}
        placeholder={inputPlaceholder}
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
