"use client";
import * as React from "react";

interface BackButtonProps {
  text: string;
  iconSrc: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ text, iconSrc }) => {
  return (
    <nav className="flex flex-col text-lg tracking-tight leading-none text-blue-600 whitespace-nowrap max-w-[74px]">
      <button
        className="flex gap-1.5 items-center px-2.5 py-2.5"
        onClick={() => window.history.back()}
      >
        <img
          loading="lazy"
          src={iconSrc}
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-3 aspect-[0.6]"
        />
        <span className="self-stretch my-auto">{text}</span>
      </button>
    </nav>
  );
};
