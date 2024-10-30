"use client";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavigationBarProps {
  iconSrc: string;
  notificationIconSrc: string;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  iconSrc,
  notificationIconSrc,
}) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate("/CreateAccount");
    window.location.href = "/CreateAccount";
  };
  return (
    <header className="flex flex-wrap gap-10 items-start px-7 py-5 w-full bg-stone-500 max-md:px-5 max-md:max-w-full">
      <nav>
        <label className="relative inline-block w-10 h-6">
          <input
            type="checkbox"
            checked={isSwitchOn}
            onChange={handleSwitchChange}
            className="opacity-0 w-0 h-0"
          />
          <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition duration-300 before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition before:duration-300" />
          <span
            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition duration-300 ${
              isSwitchOn ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
          <span
            className={`absolute left-1 bottom-1 h-4 w-4 bg-white rounded-full transition-transform duration-300 ${
              isSwitchOn ? "transform translate-x-4" : ""
            }`}
          />
        </label>
      </nav>

      <img
        loading="lazy"
        src={notificationIconSrc}
        alt="Notification icon"
        className="object-contain shrink-0 w-6 aspect-square ml-auto hover:cursor-pointer"
        onClick={handleImageClick}
      />
    </header>
  );
};
