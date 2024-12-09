"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "./themetoggle";

interface NavigationBarProps {
  iconSrc: string;
  notificationIconSrc: string;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  iconSrc,
  notificationIconSrc,
}) => {
  const router = useRouter();

  const handleImageClick = () => {
    router.push("/CreateAccount");
  };

  return (
    <header className="flex flex-wrap items-center px-7 py-5 w-full bg-pink-100 border-b-2 border-green-400 shadow-lg max-md:px-5 max-md:max-w-full">
      <div className="flex ml-auto items-center gap-2">
        <ThemeToggle />
        <img
          loading="lazy"
          src={notificationIconSrc}
          alt="Logout/Login Icon"
          className="object-contain w-6 aspect-square hover:cursor-pointer hover:opacity-80 transition-opacity duration-300"
          onClick={handleImageClick}
        />
        <span
          onClick={handleImageClick}
          className="text-sm font-semibold text-green-700 hover:text-pink-700 cursor-pointer transition-colors duration-300"
        >
          Logout/Login here
        </span>
      </div>
    </header>
  );
};
