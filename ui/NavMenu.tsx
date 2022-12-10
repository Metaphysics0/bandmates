"use client";

import Link from "next/link";
import { IRoute, PROTECTED_ROUTES, ROUTES } from "../data/routes";
import { useSelectedLayoutSegment } from "next/navigation";

import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsChevronDown } from "react-icons/bs";
import { Session } from "@supabase/supabase-js";

export default function NavMenu({ session }: { session: Session | null }) {
  return (
    <div className="absolute top-9 w-full max-w-sm px-4 z-20">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500 px-3 py-2 text-base font-bold text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              Menu
              <BsChevronDown
                aria-hidden="true"
                className={`${open ? "rotate-180 transform" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                    {ROUTES.map((route) => NavMenuItem(route, session))}
                  </div>
                  <div className="bg-gray-50 p-4">
                    <Link
                      href="/about"
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          FAQ / Contact Us
                        </span>
                      </span>
                      <span className="block text-sm text-gray-500">
                        Have a question? Come over
                      </span>
                    </Link>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

const NavMenuItem = (item: IRoute, session: Session | null) => {
  const segment = useSelectedLayoutSegment();
  const isHomePage = item.slug === "";
  const isActive = item.slug === segment || (isHomePage && segment === null);
  const disabledClass = "opacity-40 pointer-events-none cursor-not-allowed";

  const shouldShowDisabledUi =
    session === null && PROTECTED_ROUTES.includes(item.slug);

  return (
    <Link
      key={item.name}
      href={`/${item.slug}`}
      className={`-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out ${
        isActive ? "bg-red-50" : ""
      } hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50
      ${shouldShowDisabledUi ? disabledClass : ""}`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#FB923C] text-white rounded-md sm:h-12 sm:w-12">
        <item.icon aria-hidden="true" className="w-6 h-6" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-900">{item.name}</p>
        <p className="text-sm text-gray-500">
          {item.description} {shouldShowDisabledUi ? "(Sign in required)" : ""}
        </p>
      </div>
    </Link>
  );
};
