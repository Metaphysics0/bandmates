"use client";

import { ChangeEvent, useRef } from "react";
import { BsSoundwave } from "react-icons/bs";
import { useLoggedInUser } from "../../providers/userProvider";
import UserStorage from "../../lib/supabase/storage";
import toast from "react-hot-toast";

export default function UploadSoundSnippets() {
  const [loggedInUser, setLoggedInUser] = useLoggedInUser();

  const inputRef = useRef<HTMLInputElement | null>(null);

  // 👇️ open file input box on click of other element
  const handleClick = () => inputRef.current?.click();

  const onSoundUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files && event.target.files[0];
      if (!loggedInUser) {
        toast.error("Unable to upload profile at this time");
        return;
      }

      if (!file) {
        toast.error("Error accepting your file. Please try a new one");
        return;
      }

      const publicUrl = await UserStorage.uploadSoundSnippet({
        file,
        profile: loggedInUser,
      });

      setLoggedInUser({
        ...loggedInUser,
        sound_snippets: [...(loggedInUser.sound_snippets || []), publicUrl],
      });
    } catch (error) {
      console.error(error);
      toast.error("Error uploading sound snippet modal");
    }
  };

  return (
    <>
      {(loggedInUser?.sound_snippets || []).map(soundSnippet)}
      <div
        className="flex items-center cursor-pointer justify-center mt-3 border-[#a9a9a9] border bg-[#d8d8d8] hover:bg-[#adadad] transition-all rounded-full p-3 w-[calc(100%_-_10rem)]"
        onClick={handleClick}
      >
        <input
          className="hidden"
          ref={inputRef}
          type="file"
          accept="audio/*"
          onChange={onSoundUpload}
        />
        <p className="w-fit flex items-center font-bold text-slate-700 opacity-90">
          Add Sound! <BsSoundwave />
        </p>
      </div>
    </>
  );
}

const soundSnippet = (src: string, idx: number) => (
  <audio key={idx} controls className="mb-2">
    <source src={src} type="audio/wav" />
    Your browser does not support the audio element.
  </audio>
);