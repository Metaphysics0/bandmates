"use client";

import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiCheck } from "react-icons/hi2";
import { IDropdownListOption } from "../../types/types";
import { useSelectedFilter } from "./SortByFilterProvider";

export default function SortByFilter({
  options,
}: {
  options: IDropdownListOption[];
}) {
  const [selectedFilter, setSelectedFilter] = useSelectedFilter();

  return (
    <div className="w-full">
      <Listbox value={selectedFilter} onChange={setSelectedFilter}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            {selectedFilter ? (
              <span className="block truncate font-bold">
                {/* @ts-ignore */}
                {selectedFilter.value} {selectedFilter.emoji || ""}
              </span>
            ) : (
              <span className="text-slate-700 block truncate font-semibold">
                Sort By
              </span>
            )}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={option}
                  disabled={option.disabled}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-bold" : "font-semibold"
                        } ${
                          option.disabled ? "opacity-40 cursor-default" : ""
                        }`}
                      >
                        {option.value} {option.emoji || ""}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <HiCheck aria-hidden className="h-5 w-5" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
