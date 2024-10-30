import * as React from "react";
import { PriorityTag } from "./PriorityTag";
import { DateDisplay } from "./DateTimeDisplay";
import { title } from "process";

interface TaskCardProps {
  priority: string | string[];
  title: string;
  category: string;
  date: string;
  time?: string;
  description: string;
}

export function TaskCard({
  priority,
  date,
  time,
  title,
  description,
  category,
}: TaskCardProps) {
  const priorities = Array.isArray(priority) ? priority : [priority];

  return (
    <article className="flex flex-col items-start p-4 mt-3 w-full bg-white rounded shadow-[0px_2px_0px_rgba(0,0,0,0.16)]">
      <div className="flex gap-1.5 items-start">
        {priorities.map((p, index) => (
          <PriorityTag key={index} priority={p} />
        ))}
      </div>
      <h2 className="text-lg">{title}</h2>
      <h3 className="text-gray-500">{category}</h3>
      <p className="self-stretch mt-3 text-sm leading-5 text-zinc-900">
        {description}
      </p>
      <DateDisplay date={date} time={time} />
    </article>
  );
}
