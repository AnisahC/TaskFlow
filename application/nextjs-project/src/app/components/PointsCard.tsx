import React from "react";

const PointsCard: React.FC = () => {
  return (
    <div className="flex mr-6 items-center px-10 py-11 w-full bg-white rounded-2xl border border-solid border-stone-900 border-opacity-10 min-h-[209px] max-md:px-5">
      <div className="flex flex-col self-stretch my-auto w-[237px]">
        <div className="flex flex-col max-w-full w-[237px]">
          <h2 className="text-xl font-bold leading-tight text-stone-900">
            My Points
          </h2>
          <p className="self-start mt-1 text-5xl text-center leading-[67px] text-stone-900 text-opacity-40 max-md:text-4xl max-md:leading-[62px]">
            0
          </p>
        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9f0ca0d443ed13df5c1a41bacc079f953c5541044db3679e6d97a48ca85dfe8?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
        alt=""
        className="object-contain shrink-0 self-stretch my-auto aspect-[0.92] w-[59px]"
      />
    </div>
  );
};

export default PointsCard;
