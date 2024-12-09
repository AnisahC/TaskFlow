"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  icon: string;
  label: string;
  to: string;
  isActive?: boolean;
  highlightColor: string; // Highlight color for active menu
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  to,
  isActive = false,
  highlightColor,
  onClick,
}) => {
  const baseClasses =
    "flex gap-3 items-center px-5 py-3.5 w-full rounded-3xl min-h-[48px]";
  const activeClasses = isActive
    ? `text-white font-semibold`
    : "text-stone-900 hover:text-pink-700 transition duration-200";

  return (
    <Link href={to} passHref>
      <div
        onClick={onClick}
        className={`flex flex-col justify-center p-4 w-full ${activeClasses}`}
        style={{ backgroundColor: isActive ? highlightColor : "transparent" }} // Apply highlight color
      >
        <div className={baseClasses}>
          <img
            loading="lazy"
            src={icon}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
          />
          <div className="flex-1 shrink self-stretch my-auto basis-0">
            {label}
          </div>
        </div>
      </div>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string>(pathname);

  const [bgColor, setBgColor] = useState<string>("#ffebf0"); // Sidebar background color
  const [highlightColor, setHighlightColor] = useState<string>("#9b7e6b"); // Default highlight color
  const [showColorPickers, setShowColorPickers] = useState<boolean>(false); // Toggle color pickers

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  const handleMenuItemClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav
      className="flex flex-col w-[19%] max-md:ml-0 max-md:w-full transition-all duration-300"
      style={{ backgroundColor: bgColor }} // Sidebar background
    >
      <div className="flex flex-col grow pb-10 w-full text-base font-medium leading-tight shadow-sm min-h-[922px] max-md:pb-24">
        {/* Sidebar Color Picker Section */}
        <div className="mt-6 mb-4 p-4 bg-white rounded-lg shadow-sm mx-4 flex flex-col items-center">
          <h3 className="text-green-700 text-sm font-semibold mb-2">
            Sidebar Customization
          </h3>
          {/* Color Change Button */}
          <button
            onClick={() => setShowColorPickers((prev) => !prev)}
            className="text-xs text-pink-700 hover:text-pink-900 underline"
          >
            Color Change
          </button>

          {/* Subtle Color Picker Section */}
          {showColorPickers && (
            <div className="mt-4 flex flex-col items-center gap-2">
              {/* Sidebar Background Color */}
              <label className="text-xs text-pink-700 mb-1">Sidebar:</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full focus:outline-none"
              />

              {/* Highlight Color */}
              <label className="text-xs text-pink-700 mb-1">Highlight:</label>
              <input
                type="color"
                value={highlightColor}
                onChange={(e) => setHighlightColor(e.target.value)}
                className="w-8 h-8 cursor-pointer border border-gray-300 rounded-full focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Menu Items */}
        <MenuItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/2245afc7abcdfb022e33ee91eb9d9b353cee40d5981849070729b95b47ac801d"
          label="Overview"
          to="/MyCenter"
          isActive={activeItem === "/MyCenter"}
          highlightColor={highlightColor}
          onClick={() => handleMenuItemClick("/MyCenter")}
        />
        <MenuItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/95c6970b609598c2e23104d55fa6004300948c1597ac8b8e0a66f2280f698042"
          label="Add Task"
          to="/MyCenter/addTask"
          isActive={activeItem === "/MyCenter/addTask"}
          highlightColor={highlightColor}
          onClick={() => handleMenuItemClick("/MyCenter/addTask")}
        />
      </div>
    </nav>
  );
};

export default Sidebar;
