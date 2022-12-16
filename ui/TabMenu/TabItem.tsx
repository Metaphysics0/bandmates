"use client";

import Link from "next/link";
import { Tab } from "@headlessui/react";

import { Item } from "./TabMenu";
import { useSelectedLayoutSegment } from "next/navigation";

export const TabItem = ({
  path,
  item: { slug, text },
}: {
  path: string;
  item: Item;
}) => {
  const href = slug ? path + "/" + slug : path;
  const segment = useSelectedLayoutSegment();
  const isActive =
    // Example home pages e.g. `/layouts`
    (!slug && segment === null) ||
    // Nested pages e.g. `/layouts/electronics`
    segment === slug;

  return (
    <Link
      href={href}
      className={classNames(
        "flex w-full rounded-lg py-2.5 px-2 text-lg font-medium leading-5 text-blue-700",
        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
        isActive
          ? "bg-white shadow"
          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
      )}
    >
      <Tab className="m-auto">{text}</Tab>
    </Link>
  );
};

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");
