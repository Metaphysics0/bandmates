"use client";

import React from "react";
import { ISignUpSelectOption } from "../../types/types";

const SelectedOptionContext = React.createContext<
  | [
      ISignUpSelectOption | undefined,
      React.Dispatch<React.SetStateAction<ISignUpSelectOption | any>>
    ]
  | undefined
>(undefined);

export function SelectedOptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedOption, setSelectedOption] = React.useState();
  return (
    <SelectedOptionContext.Provider value={[selectedOption, setSelectedOption]}>
      {children}
    </SelectedOptionContext.Provider>
  );
}

export function useSelectOption() {
  const context = React.useContext(SelectedOptionContext);
  if (context === undefined) {
    throw new Error("useSelectOption must be used within a CounterProvider");
  }
  return context;
}
