import React from "react";

interface MenuItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  isActive = false,
}) => {
  const baseClasses =
    "flex gap-3 items-center px-5 py-3.5 w-full rounded-3xl min-h-[48px]";
  const activeClasses = isActive
    ? "bg-emerald-50 text-teal-500"
    : "text-stone-900";

  return (
    <div className={`flex flex-col justify-center p-4 w-full ${activeClasses}`}>
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
  );
};

const Sidebar: React.FC = () => {
  return (
    <nav className="flex flex-col w-[19%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow pb-96 w-full text-base font-medium leading-tight shadow-sm bg-stone-50 min-h-[922px] max-md:pb-24 ">
        <div className="flex flex-col justify-center self-center p-4 w-full text-black whitespace-nowrap max-w-[280px] min-h-[80px]">
          <div className="flex gap-3 justify-center items-center px-5 py-3.5 w-full rounded-3xl bg-emerald-500 bg-opacity-0 min-h-[48px] shadow-[0px_2px_32px_rgba(0,0,0,0.02)]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2245afc7abcdfb022e33ee91eb9d9b353cee40d5981849070729b95b47ac801d?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
            />
            <div className="flex-1 shrink self-stretch my-auto basis-0">
              Overview
            </div>
          </div>
        </div>
        <MenuItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/6b52a7cd88356f9ac42be21be3fae0b7e4a2136b776a033ed16c75406af052b3?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
          label="Add Task"
          isActive={true}
        />
        <MenuItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/95c6970b609598c2e23104d55fa6004300948c1597ac8b8e0a66f2280f698042?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
          label="My Colour Theme"
        />
      </div>
    </nav>
  );
};

export default Sidebar;
