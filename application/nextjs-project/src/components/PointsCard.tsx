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
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false); // Toggle color picker
  const [boxColor, setBoxColor] = useState<string>("#fff0f6"); // Default box color
  const [borderColor, setBorderColor] = useState<string>("#86efac"); // Default border color

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const tasks: Task[] = await response.json();
        const filteredTasks = tasks.filter((task) => task.isCompleted);
        setCompletedTasks(filteredTasks);

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

  const handleOpenModal = () => setShowOverview(true);
  const handleCloseModal = () => setShowOverview(false);
  const toggleColorPicker = () => setShowColorPicker((prev) => !prev);

  return (
    <div>
      {/* Points Card */}
      <div
        className="flex flex-col items-center max-w-[408px] mr-6 px-6 py-8 w-full rounded-2xl min-h-[209px] max-md:px-5 shadow-md transition duration-200"
        style={{ backgroundColor: boxColor, borderColor: borderColor, borderWidth: "2px", borderStyle: "solid" }}
      >
        <div className="flex items-center justify-center w-full space-x-4">
          {/* Star on the Left */}
          <span className="text-3xl text-yellow-500">⭐</span>

          {/* Points Content */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold leading-tight text-green-700">
              My Points
            </h2>
            <p className="mt-1 text-5xl text-center leading-[67px] text-pink-700 max-md:text-4xl max-md:leading-[62px]">
              {points}
            </p>
            <button
              onClick={handleOpenModal}
              className="mt-4 text-sm font-medium text-green-700 hover:text-pink-700 underline"
            >
              Click here to view point system overview
            </button>
            {/* Color Change Button */}
            <button
              onClick={toggleColorPicker}
              className="mt-2 text-xs text-pink-700 hover:text-pink-900 underline"
            >
              Color Change
            </button>
          </div>

          {/* Star on the Right */}
          <span className="text-3xl text-yellow-500">⭐</span>
        </div>

        {/* Color Picker Section */}
        {showColorPicker && (
          <div className="mt-4 flex flex-col items-center">
            <label className="text-xs text-pink-700 mb-1">Box Color:</label>
            <input
              type="color"
              value={boxColor}
              onChange={(e) => setBoxColor(e.target.value)}
              className="mb-2"
            />
            <label className="text-xs text-pink-700 mb-1">Border Color:</label>
            <input
              type="color"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
            />
          </div>
        )}
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
