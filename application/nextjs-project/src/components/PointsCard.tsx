import React, { useEffect, useState } from "react";

const PointsCard: React.FC = () => {
  const [points, setPoints] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await fetch("/api/getUsersPoints");
        if (!response.ok) {
          throw new Error("Failed to fetch user points");
        }
        const data = await response.json();
        setPoints(data.myPoints);
      } catch (error) {
        console.error("Error fetching points:", error);
        setPoints(0); // Fallback to 0 points if the fetch fails
      }
    };

    fetchUserPoints();
  }, []);

  return (
    <div className="flex max-w-[408px] mr-6 items-center px-10 py-11 w-full bg-pink-50 rounded-2xl border border-solid border-green-300 min-h-[209px] max-md:px-5 shadow-md">
      <div className="flex flex-row my-auto w-[237px]">
        <div className="flex flex-col w-3/4">
          <h2 className="text-xl font-bold leading-tight text-green-700">
            My Points
          </h2>
          <p className="self-start mt-1 text-5xl text-center leading-[67px] text-pink-700 max-md:text-4xl max-md:leading-[62px]">
            {points !== null ? points : "Loading..."}
          </p>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9f0ca0d443ed13df5c1a41bacc079f953c5541044db3679e6d97a48ca85dfe8?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
          alt="Points Icon"
          className="object-contain my-auto w-[40px] right-6"
        />
      </div>
    </div>
  );
};

export default PointsCard;
