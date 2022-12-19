"use client";

import { UseFormRegister } from "react-hook-form";

export default function TextAreaInput({
  formName,
  label,
  placeholder,
  rows,
  formRegister,
}: {
  label: string;
  formName: string;
  rows?: number;
  placeholder?: string;
  formRegister: UseFormRegister<any>;
}) {
  return (
    <label className="flex justify-between mb-4">
      <span className="font-bold text-lg">{label}</span>
      <textarea
        {...formRegister(formName)}
        rows={rows || 4}
        placeholder={placeholder}
        className="mb-3 w-3/4 rounded-md shadow-md border-none focus:ring-0 outline-none font-bold text-slate-800 min-h-[50px]"
      ></textarea>
    </label>
  );
}
