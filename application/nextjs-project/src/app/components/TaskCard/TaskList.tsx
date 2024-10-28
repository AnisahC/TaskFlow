import * as React from "react";
import { TaskCard } from "./TaskCard";
import { Task, TaskStatus } from "./types";

interface TaskListProps {
  title: string;
  items: Task[];
  status: TaskStatus;
}

export function TaskList({ title, items, status }: TaskListProps) {
  return (
    <section className="flex flex-col flex-1 shrink px-4 pt-4 pb-6 rounded basis-0 bg-zinc-200 min-w-[240px] max-md:max-w-full">
      <h2 className="text-lg leading-10 text-black">{title}</h2>
      {items.map((item, index) => (
        <TaskCard
          key={index}
          priority={item.priority}
          title={item.title}
          category={item.category}
          date={item.date}
          time={item.time}
          description={item.description}
        />
      ))}
    </section>
  );
}
