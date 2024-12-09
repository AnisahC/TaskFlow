import React, { useEffect, useState } from "react";

interface Task {
  title: string;
  priority: string;
  isCompleted: boolean;
}

const PointsCard: React.FC = () => {
  const [points, setPoints] = useState<number>(0); // Total points
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]); // Filtered completed tasks
  const [showOverview, setShowOverview] = useState<boolean>(false); // Modal toggle

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        // Fetch all tasks
        const response = await fetch("/api/tasks"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const tasks: Task[] = await response.json();

        // Filter only completed tasks
        const filteredTasks = tasks.filter((task) => task.isCompleted);
        setCompletedTasks(filteredTasks);

        // Calculate total points for completed tasks
        const totalPoints = filteredTasks.reduce((sum, task) => {
          if (task.priority === "Low") return sum + 100;
          if (task.priority === "Medium") return sum + 300;
          if (task.priority === "High") return sum + 600;
          return sum;
        }, 0);

        setPoints(totalPoints);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchCompletedTasks();
  }, []);

  const handleCardClick = () => setShowOverview(true); // Open modal
  const handleCloseModal = () => setShowOverview(false); // Close modal

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
              {points}
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

      {/* Modal for Points Overview */}
      {showOverview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="p-6 bg-white rounded-lg shadow-lg max-w-md text-center">
            <h3 className="text-2xl font-bold text-pink-700 mb-4">
              Points System Overview
            </h3>
            {/* General Points Overview */}
            <ul className="text-green-700 text-lg space-y-2 mb-6 border-b pb-4 border-gray-300">
              <li>
                ⭐ Low Priority:{" "}
                <span className="font-semibold">100 points</span>
              </li>
              <li>
                ⭐ Medium Priority:{" "}
                <span className="font-semibold">300 points</span>
              </li>
              <li>
                ⭐ High Priority:{" "}
                <span className="font-semibold">600 points</span>
              </li>
            </ul>

            {/* Completed Tasks Section */}
            <h4 className="text-xl font-bold text-green-600 mb-2">
              Your Completed Tasks
            </h4>
            {completedTasks.length > 0 ? (
              <ul className="text-green-700 text-md space-y-2">
                {completedTasks.map((task, index) => (
                  <li key={index}>
                    ⭐ <strong>{task.title}</strong> (
                    {task.priority} Priority):{" "}
                    <span className="font-semibold">
                      {task.priority === "Low"
                        ? "100 points"
                        : task.priority === "Medium"
                        ? "300 points"
                        : "600 points"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-pink-700">No completed tasks yet.</p>
            )}

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="mt-6 px-6 py-2 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition duration-200"
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
