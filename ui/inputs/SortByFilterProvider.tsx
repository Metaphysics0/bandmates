"use client";

import React from "react";
import { IDropdownListOption } from "../../types/types";

const SelectedFilterContext = React.createContext<
  | [
      IDropdownListOption | undefined,
      React.Dispatch<React.SetStateAction<IDropdownListOption | any>>
    ]
  | undefined
>(undefined);

export function SortByFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedFilter, setSelectedFilter] = React.useState();
  return (
    <SelectedFilterContext.Provider value={[selectedFilter, setSelectedFilter]}>
      {children}
    </SelectedFilterContext.Provider>
  );
}

export function useSelectedFilter() {
  const context = React.useContext(SelectedFilterContext);
  if (context === undefined) {
    throw new Error("useSelectOption must be used within a CounterProvider");
  }
  return context;
}
