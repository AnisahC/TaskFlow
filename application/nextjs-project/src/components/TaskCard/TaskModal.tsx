import React from "react";
import { Task } from "./types";
import { useRouter } from "next/navigation";

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onDelete: () => void;
  onComplete: () => void;
  modalType: string;
}

const TaskModal: React.FC<TaskModalProps> = ({
  task,
  onClose,
  onDelete,
  onComplete,
  modalType,
}) => {
  const router = useRouter();

  const handleReload = () => {
    // router.reload(); // Didn't work
    window.location.reload(); // Keep for now to ensure working state
  };

  // Function to delete a task
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: task._id }), // Send the task ID to delete
      });

      if (response.ok) {
        handleReload();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function to mark a task as completed
  const handleComplete = async () => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: task._id }), // Send the task ID to mark as completed
      });

      if (response.ok) {
        handleReload();
      } else {
        console.error("Failed to mark task as completed");
      }
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  // Function to mark a task as completed
  const handleUncomplete = async () => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: task._id }), // Send the task ID to mark as completed
      });

      if (response.ok) {
        handleReload();
      } else {
        console.error("Failed to mark task as completed");
      }
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{task.title}</h2>
        <p className="text-gray-700 mb-2">Category: {task.category}</p>
        <p className="text-gray-700 mb-2">Start Date: {task.startDate}</p>
        <p className="text-gray-700 mb-2">End Date: {task.endDate}</p>
        <p className="text-gray-700 mb-4">Description: {task.description}</p>
        <div className="flex justify-end space-x-4">
          {modalType === "completed" ? (
            <button
              onClick={handleUncomplete}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              UnComplete
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              Complete
            </button>
          )}

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
