import React from "react";
import { useRouter } from "next/navigation";

const RecentlyFinishedCard: React.FC = () => {
  const router = useRouter();

  const handleMenuItemClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col py-6 mt-8 w-full leading-tight bg-pink-50 rounded-2xl border border-solid border-green-300 max-w-[408px] shadow-md">
      <div className="flex gap-10 justify-between items-center px-10 w-full min-h-[48px] max-md:px-5">
        {/* Updated Title */}
        <h2 className="self-stretch my-auto text-xl font-bold text-green-700">
          View Task List
        </h2>
        <div className="flex gap-1 items-center self-stretch my-auto text-sm text-green-700 hover:text-pink-700">
          <div
            className="self-stretch my-auto hover:cursor-pointer"
            onClick={() => handleMenuItemClick("/TaskListAndSearch")}
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
      {/* Placeholder text */}
      <div className="flex flex-col items-center justify-center mt-4 text-sm text-pink-700">
        <p>Click "View more" to see your task list.</p>
      </div>
    </div>
  );
};

export default RecentlyFinishedCard;
