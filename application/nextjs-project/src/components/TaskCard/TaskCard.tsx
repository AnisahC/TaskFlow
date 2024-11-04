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
  onClick: () => void;
}

export function TaskCard({
  priority,
  date,
  time,
  title,
  description,
  category,
  onClick,
}: TaskCardProps) {
  const priorities = Array.isArray(priority) ? priority : [priority];

  // Determine border color based on priority level
  const borderColor = priorities.includes("High") ? "border-red-500" :
                      priorities.includes("Medium") ? "border-yellow-500" :
                      priorities.includes("Low") ? "border-green-500" :
                      "border-gray-300"; // Default for no specific priority

  return (
    <article
      onClick={onClick}
      className={`flex flex-col items-start p-4 mt-3 w-full bg-white border-l-4 rounded-lg shadow-lg ${borderColor}`}
    >
      <div className="flex gap-1.5 items-start">
        {priorities.map((p, index) => (
          <PriorityTag key={index} priority={p} />
        ))}
      </div>
      <h2 className="text-lg my-2">{title}</h2>

      <div className="flex flex-row items-end space-x-4 my-1 w-full">
        <DateDisplay date={date} time={time} />
        <div className="flex-grow"></div>
        <h3 className="text-gray-500 my-auto">{category}</h3>
      </div>
    </article>
  );
}
