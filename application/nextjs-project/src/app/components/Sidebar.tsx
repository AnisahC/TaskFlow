"use client";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface MenuItemProps {
  icon: string;
  label: string;
  to: string;
  isActive?: boolean;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  to,
  isActive = false,
  onClick,
}) => {
  const baseClasses =
    "flex gap-3 items-center px-5 py-3.5 w-full rounded-3xl min-h-[48px]";
  const activeClasses = isActive
    ? "bg-emerald-50 text-teal-500"
    : "text-stone-900";

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex flex-col justify-center p-4 w-full ${activeClasses}`}
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
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>(location.pathname);
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);
  const navigate = useNavigate();
  const handleMenuItemClick = (path: string) => {
    navigate(path);
    window.location.href = path;
  };

  return (
    <nav className="flex flex-col w-[19%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow pb-96 w-full text-base font-medium leading-tight shadow-sm bg-stone-50 min-h-[922px] max-md:pb-24 ">
        <MenuItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/2245afc7abcdfb022e33ee91eb9d9b353cee40d5981849070729b95b47ac801d?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
          label="Overview"
          to="/pages/MyCenter"
          isActive={activeItem === "/pages/MyCenter"}
          onClick={() => handleMenuItemClick("/pages/MyCenter")}
        />
        <MenuItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/95c6970b609598c2e23104d55fa6004300948c1597ac8b8e0a66f2280f698042?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
          label="Add Task"
          to="/pages/MyCenter/addTask"
          isActive={activeItem === "/pages/MyCenter/addTask"}
          onClick={() => handleMenuItemClick("/pages/MyCenter/addTask")}
        />
        <MenuItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/95c6970b609598c2e23104d55fa6004300948c1597ac8b8e0a66f2280f698042?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
          label="My Colour Theme"
          to="/pages/my-colour-theme"
          isActive={activeItem === "/pages/my-colour-theme"}
          onClick={() => handleMenuItemClick("/pages/MyCenter/my-colour-theme")}
        />
      </div>
    </nav>
  );
};

export default Sidebar;
