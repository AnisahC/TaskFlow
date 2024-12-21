import React, { useState } from "react";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="mb-4 relative">
      <label htmlFor={id} className="text-base font-medium text-stone-400">
        {label}
      </label>
      <input
        id={id}
        type={type === "password" && !isPasswordVisible ? "password" : "text"}
        value={value}
        onChange={onChange}
        required={required}
        aria-label={ariaLabel}
        className="w-full bg-transparent border-b border-stone-400 focus:outline-none focus:border-stone-600 transition-colors pr-10"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 bottom-2.5 focus:outline-none"
          title={isPasswordVisible ? "Hide password" : "Show password"}
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        >
          {isPasswordVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-500 hover:text-green-700 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-5-10-5s2.13-2.698 5.125-4.397M9.88 14.882A3 3 0 0012 15a3 3 0 100-6 3 3 0 00-2.12 5.122z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.121 9.879A3.001 3.001 0 0112 9a3 3 0 00-2.12 5.122m10.607-1.607A10.013 10.013 0 0012 5c-5.523 0-10 5-10 5s2.13-2.698 5.125-4.397M18.366 18.366l-1.414 1.414M5.634 18.366l1.414 1.414"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-500 hover:text-green-700 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.414 12A3 3 0 0112 15a3 3 0 110-6 3 3 0 013.414 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19.428 15.429A10.013 10.013 0 0012 5c-5.523 0-10 5-10 5s2.476 4.95 10 4.95 10-4.95 10-4.95"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};
