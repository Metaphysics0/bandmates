"use client";

import { ChangeEvent, useRef } from "react";
import { BsSoundwave } from "react-icons/bs";
import { useLoggedInUser } from "../../providers/userProvider";

export default function UploadSoundSnippets() {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  const inputRef = useRef<HTMLInputElement | null>(null);

  // 👇️ open file input box on click of other element
  const handleClick = () => inputRef.current?.click();

  const onSoundUpload = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("CHANGED", event);
  };

  return (
    <>
      {(loggedInUser?.sound_snippets || []).map(soundSnippet)}
      <div className="flex items-center cursor-pointer justify-center mt-3 border-[#a9a9a9] border bg-[#d8d8d8] hover:bg-[#adadad] transition-all rounded-full p-3 w-[calc(100%_-_10rem)]">
        <input
          className="hidden"
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onSoundUpload}
        />
        <p className="w-fit flex items-center font-bold text-slate-700 opacity-90">
          Add Sound! <BsSoundwave />
        </p>
      </div>
    </>
  );
}

const soundSnippet = (src: string) => (
  <audio controls className="mb-2">
    <source src={src} type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
);
