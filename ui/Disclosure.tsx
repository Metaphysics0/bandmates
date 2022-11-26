"use client";

import { Disclosure } from "@headlessui/react";
import { HiOutlineChevronUp } from "react-icons/hi2";

export default function DisclosureComponent() {
  return (
    <div className="w-full container mx-auto px-4 pt-16">
      <div className="flex flex-col items-center">
        <h1 className="text-8xl drop-shadow-lg font-extrabold mb-2">
          Bands.fm
        </h1>
        <p className="text-xl font-bold">
          Our goal is to create a place for artists to create, collaborate, and
          get inspired from one another.
        </p>
        <p className="text-xl">
          Bands.fm has given hundreds of artists from all around the world
          opportunities to manifest their creative ideas.
        </p>
      </div>
      <div className="mb-20"></div>
      <h2 className="text-center drop-shadow-md text-5xl font-bold mb-4">
        FAQ
      </h2>
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2 drop-shadow-lg">
        {FAQS.map((faq, idx) => (
          <Disclosure as="div" className="my-1" key={idx}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{faq.title}</span>
                  <HiOutlineChevronUp
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {faq.text}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}

const FAQS: IFaq[] = [
  {
    title: "Tell me more about Bands.fm!",
    text: "I created this website to fill a gap I noticed in the music industry. To have a place to connect with like minded musicians",
  },
  {
    title: "Do you offer technical support?",
    text: "Send me an email at ryan@bands.fm and I'll try get back to you as soon as I can.",
  },
  {
    title: "What technologies are used?",
    text: "Bands.fm uses cutting edge serverless technologies. Next.js 13 server components for the frontend, Supabase for the backend data services. Tailwind for styling.",
  },
  {
    title: "Who owns the rights to the music after collaboration?",
    text: "No clue bro. Ask Ariel",
  },
];

interface IFaq {
  title: string;
  text: string;
}
