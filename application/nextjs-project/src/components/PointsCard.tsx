import React, { useEffect, useState } from "react";

interface Task {
  title: string;
  priority: string; // Priority can be "Low", "Medium", or "High"
}

const PointsCard: React.FC = () => {
  const [points, setPoints] = useState<number | null>(null);
  const [showOverview, setShowOverview] = useState<boolean>(false); // State to toggle modal
  const [tasks, setTasks] = useState<Task[]>([]); // State to store tasks

  // Fetch User Points
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
        setPoints(0); // Default fallback
      }
    };

    fetchUserPoints();
  }, []);

  // Fetch User Tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks"); // Replace with your actual endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data); // Set tasks data
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Function to calculate points based on priority
  const calculateTaskPoints = (priority: string) => {
    switch (priority) {
      case "High":
        return 600;
      case "Medium":
        return 300;
      case "Low":
        return 100;
      default:
        return 0;
    }
  };

  const handleCardClick = () => {
    setShowOverview(true);
  };

  const handleCloseModal = () => {
    setShowOverview(false);
  };

  return (
    <div>
      {/* Points Card */}
      <div
        onClick={handleCardClick}
        className="flex cursor-pointer max-w-[408px] mr-6 items-center px-10 py-11 w-full bg-pink-50 rounded-2xl border border-solid border-green-300 min-h-[209px] max-md:px-5 shadow-md hover:bg-pink-100 transition duration-200"
      >
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

      {/* Modal for Point Overview */}
      {showOverview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg max-w-md text-center">
            <h3 className="text-2xl font-bold text-pink-700 mb-4">
              Points System Overview
            </h3>
            <ul className="text-green-700 text-lg space-y-2 mb-4">
              <li>⭐ Low Priority: <span className="font-semibold">100 points</span></li>
              <li>⭐ Medium Priority: <span className="font-semibold">300 points</span></li>
              <li>⭐ High Priority: <span className="font-semibold">600 points</span></li>
            </ul>

            <div className="text-left text-gray-700">
              <h4 className="text-lg font-semibold mb-2">Task Points:</h4>
              <ul className="space-y-2">
                {tasks.map((task, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{task.title}</span>
                    <span className="font-bold text-green-600">
                      {calculateTaskPoints(task.priority)} pts
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleCloseModal}
              className="mt-6 px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsCard;
