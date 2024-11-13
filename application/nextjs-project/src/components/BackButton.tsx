"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  text: string;
  iconSrc: string; // Ensure iconSrc is part of the props
}

export const BackButton: React.FC<BackButtonProps> = ({ text, iconSrc }) => {
  const router = useRouter();

  return (
    <nav className="flex flex-col text-lg tracking-tight leading-none text-blue-500 whitespace-nowrap max-w-[74px]">
      <button
        className="flex gap-1.5 items-center px-2.5 py-2.5"
        onClick={() => router.back()}
      >
        <img
          loading="lazy"
          src={iconSrc} // Use iconSrc passed as a prop
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-3 aspect-[0.6]"
        />
        <span className="self-stretch my-auto">{text}</span>
      </button>
    </nav>
  );
};
