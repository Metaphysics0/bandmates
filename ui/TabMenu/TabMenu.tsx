"use client";

import { Tab } from "@headlessui/react";
import { TabItem } from "./TabItem";

export type Item = {
  text: string;
  slug?: string;
};

export default function TabMenu({
  path,
  items,
}: {
  path: string;
  items: Item[];
}) {
  return (
    <div className="w-full max-w-md px-2 py-10 sm:px-0 m-auto">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {items.map((category) => (
            <TabItem key={category.text} item={category} path={path} />
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
}
