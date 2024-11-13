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
    <Link href={to} passHref>
      <div
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
      </div>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string>(pathname);

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  const handleMenuItemClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="flex flex-col w-[19%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow pb-96 w-full text-base font-medium leading-tight shadow-sm bg-stone-50 min-h-[922px] max-md:pb-24 ">
        <MenuItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/2245afc7abcdfb022e33ee91eb9d9b353cee40d5981849070729b95b47ac801d?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
          label="Overview"
          to="/MyCenter"
          isActive={activeItem === "/MyCenter"}
          onClick={() => handleMenuItemClick("/MyCenter")}
        />
        <MenuItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/95c6970b609598c2e23104d55fa6004300948c1597ac8b8e0a66f2280f698042?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
          label="Add Task"
          to="/MyCenter/addTask"
          isActive={activeItem === "/MyCenter/addTask"}
          onClick={() => handleMenuItemClick("/MyCenter/addTask")}
        />
        <MenuItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/95c6970b609598c2e23104d55fa6004300948c1597ac8b8e0a66f2280f698042?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
          label="My Colour Theme"
          to="/MyCenter/my-colour-theme"
          isActive={activeItem === "/MyCenter/my-colour-theme"}
          onClick={() => handleMenuItemClick("/MyCenter/my-colour-theme")}
        />
      </div>
    </nav>
  );
};

export default Sidebar;
