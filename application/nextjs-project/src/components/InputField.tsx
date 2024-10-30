import React from "react";
import { InputFieldProps } from "./types";

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  ariaLabel,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="text-base font-medium text-stone-400">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        aria-label={ariaLabel}
        className="w-full bg-transparent border-b border-stone-400 focus:outline-none focus:border-stone-600 transition-colors"
      />
    </div>
  );
};
