"use client";
import React, { useEffect, useState } from "react";
import { Task } from "@/components/TaskCard/types";
import { TaskList } from "@/components/TaskCard/TaskList";
import { TaskStatus } from "@/components/TaskCard/types";
import { BackButton } from "@/components/BackButton";

const alltask = {
  todo: {
    title: (
      <span className="text-yellow-700 border-b-4 border-yellow-500 pb-1">
        TO DO
      </span>
    ),
    items: [] as Task[],
  },
  inProgress: {
    title: (
      <span className="text-blue-700 border-b-4 border-blue-500 pb-1">
        IN PROGRESS
      </span>
    ),
    items: [] as Task[],
  },
  completed: {
    title: (
      <span className="text-green-700 border-b-4 border-green-500 pb-1">
        COMPLETED
      </span>
    ),
    items: [] as Task[],
  },
};

const TaskBoard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]); // Ensure it's always an array
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("../api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);

        // Categorize tasks based on their status
        alltask.todo.items = data.filter(
          (task: { isCompleted: any }) => !task.isCompleted
        );
        alltask.completed.items = data.filter(
          (task: { isCompleted: any }) => task.isCompleted
        );
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchTasks();
  }, []);

  const handleSearch = () => {
    let query = `?title=${title}&category=${category}`;
    fetch(`/api/tasks${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Check the data from the API
        if (Array.isArray(data)) {
          setSearchResults(data);
          // Update tasks array to reflect search results
          alltask.todo.items = data.filter((task: Task) => !task.isCompleted);
          console.log(alltask.todo.items);
          alltask.completed.items = data.filter(
            (task: Task) => task.isCompleted
          );
        } else {
          setSearchResults([]); // Fallback to empty array if not
        }
      })
      .catch((error) => console.error("Error searching tasks:", error));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-5">
      <BackButton
        text="Back"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/32486b1ff544e50222c571c38267adedef2546f5260ee1da569301c13e1bcc36?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
      />

      <div className="flex items-center space-x-4 px-12 mt-8">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Search
        </button>
      </div>

      <div className="flex flex-col">
        <main className="flex min-h-full flex-wrap gap-4 items-start px-12 pt-6 pb-12 text-xs font-semibold rounded-none max-md:px-5">
          {Object.entries(alltask).map(([status, { title, items }]) => (
            <TaskList
              key={status}
              title={title}
              items={items}
              status={status as TaskStatus}
            />
          ))}
        </main>
      </div>
    </div>
  );
};
export default TaskBoard;