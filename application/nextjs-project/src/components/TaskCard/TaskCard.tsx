import * as React from "react";
import { PriorityTag } from "./PriorityTag";
import { DateDisplay } from "./DateTimeDisplay";

interface TaskCardProps {
  priority: string | string[];
  title: string;
  category: string;
  date: string;
  time?: string;
  description: string;
  isCompleted?: boolean;
  onClick: () => void;
}

export function TaskCard({
  priority,
  date,
  time,
  title,
  description,
  isCompleted,
  category,
  onClick,
}: TaskCardProps) {
  const priorities = Array.isArray(priority) ? priority : [priority];

  // Determine border color based on priority level
  const borderColor = priorities.includes("High")
    ? "border-red-500"
    : priorities.includes("Medium")
    ? "border-yellow-500"
    : priorities.includes("Low")
    ? "border-green-500"
    : "border-gray-300"; // Default for no specific priority

  return (
    <article
      onClick={onClick}
      className={`flex flex-col items-start p-4 mt-3 w-full bg-pink-50 border-l-4 rounded-lg shadow-md ${borderColor}`}
    >
      {/* Priority Tags */}
      <div className="flex gap-1.5 items-start">
        {priorities.map((p, index) => (
          <PriorityTag key={index} priority={p} />
        ))}
      </div>

      {/* Title */}
      <h2 className="text-lg my-2 text-green-700 font-semibold">{title}</h2>

      {/* Date and Category */}
      <div className="flex flex-row items-end space-x-4 my-1 w-full">
        <DateDisplay date={date} time={time} />
        <div className="flex-grow"></div>
        <h3 className="text-green-600 text-sm font-medium">{category}</h3>
      </div>
    </article>
  );
}
