import React from "react";
import { useNavigate } from "react-router-dom";

interface RecentTaskProps {
  name: string;
  daysAgo: number;
}

const RecentTask: React.FC<RecentTaskProps> = ({ name, daysAgo }) => (
  <div className="flex flex-col justify-center py-3 pr-4 pl-10 w-full max-md:pl-5">
    <div className="text-sm text-stone-900">{name}</div>
    <div className="mt-2 text-xs text-stone-900 text-opacity-40">
      {daysAgo} Days ago
    </div>
  </div>
);

const RecentlyFinishedCard: React.FC = () => {
  const recentTasks = [{ name: "take mom to airport", daysAgo: 8 }];
  const navigate = useNavigate();
  const handleMenuItemClick = (path: string) => {
    navigate(path);
    window.location.href = path;
  };

  return (
    <div className="flex flex-col py-6 mt-8 w-full leading-tight bg-white rounded-2xl border border-solid border-stone-900 border-opacity-10 max-w-[408px]">
      <div className="flex gap-10 justify-between items-center px-10 w-full min-h-[48px] max-md:px-5">
        <h2 className="self-stretch my-auto text-xl font-bold text-stone-900">
          Recently Finished
        </h2>
        <div className="flex gap-1 items-center self-stretch my-auto text-sm text-stone-900 text-opacity-40">
          <div
            className="self-stretch my-auto hover:cursor-pointer"
            onClick={() => handleMenuItemClick("/pages/TaskListAndSearch")}
          >
            View more
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/182c60e250d6ab2a3a57297d30e95ab86cc166e3949ce9e6abed68ad38da102a?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
          />
        </div>
      </div>
      <div className="flex flex-col mt-1 w-full">
        {recentTasks.map((task, index) => (
          <RecentTask key={index} name={task.name} daysAgo={task.daysAgo} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyFinishedCard;
