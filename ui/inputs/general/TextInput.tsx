"use client";

import { UseFormRegister } from "react-hook-form";

export default function TextInput({
  formName,
  label,
  placeholder,
  formRegister,
}: {
  label: string;
  formName: string;
  placeholder?: string;
  formRegister: UseFormRegister<any>;
}) {
  return (
    <label className="flex flex-col">
      <span className="w-fit ml-1 font-bold text-lg">{label}</span>
      <input
        type="text"
        {...formRegister(formName)}
        placeholder={placeholder}
        className="mb-3 rounded-2xl shadow-md border-none focus:ring-0 outline-none font-bold text-slate-800"
      />
    </label>
  );
}
