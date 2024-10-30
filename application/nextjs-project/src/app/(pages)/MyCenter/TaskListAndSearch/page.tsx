"use client";
import React, { useState } from "react";

import { TaskList } from "@/components/TaskCard/TaskList";
import { TaskStatus } from "@/components/TaskCard/types";
import { BackButton } from "@/components/BackButton";
const tasks = {
  todo: {
    title: "TO DO",
    items: [
      {
        title: "Task 1",
        category: "General",
        priority: "low",
        date: "Jan 29th, 2022",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra venenatis accumsan.",
      },
    ],
  },
  inProgress: {
    title: "IN PROGRESS",
    items: [
      {
        title: "Task 2",
        category: "General",
        priority: ["low", "medium"],
        date: "Jan 29th, 2022",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra venenatis accumsan.",
      },
    ],
  },
  completed: {
    title: "COMPLETED",
    items: [
      {
        title: "Task 3",
        category: "General",
        priority: "low",
        date: "Jan 29th, 2022",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra venenatis accumsan.",
      },
      {
        title: "Task 4",
        category: "General",
        priority: "medium",
        date: "Jan 29th, 2022",
        time: "00:00",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra venenatis accumsan.",
      },
    ],
  },
};

const TaskBoard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]); // Ensure it's always an array

  const handleSearch = () => {
    let query = `?title=${title}&category=${category}`;
    fetch(`/api/tasks/search${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Check the data from the API
        // Ensure that 'data' is an array
        if (Array.isArray(data)) {
          setSearchResults(data);
        } else {
          setSearchResults([]); // Fallback to empty array if not
        }
      })
      .catch((error) => console.error("Error searching tasks:", error));
  };

  return (
    <div>
      <BackButton
        text="Back"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/32486b1ff544e50222c571c38267adedef2546f5260ee1da569301c13e1bcc36?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
      />

      <div className="flex items-center space-x-4 px-12">
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
          {Object.entries(tasks).map(([status, { title, items }]) => (
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
