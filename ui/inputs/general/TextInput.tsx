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
    <label className="flex justify-between mb-4">
      <span className="font-bold text-lg">{label}</span>
      <input
        type="text"
        {...formRegister(formName)}
        placeholder={placeholder}
        className="w-3/4 rounded-md shadow-md border-none focus:ring-0 outline-none font-bold text-slate-800"
      />
    </label>
  );
}
