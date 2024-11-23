import React, { useState } from "react";
import TaskModal from "./TaskModal";
import { TaskCard } from "./TaskCard";
import { Task, TaskStatus } from "./types";

interface TaskListProps {
  title: React.ReactNode;
  items: Task[];
  status: TaskStatus;
}

export function TaskList({ title, items, status }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleCardClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    console.log("Deleting task:", selectedTask);
    setSelectedTask(null);
  };

  const handleCompleteTask = () => {
    console.log("Completing task:", selectedTask);
    setSelectedTask(null);
  };
  return (
    <section className="flex flex-col flex-1 shrink px-4 pt-4 pb-6 rounded basis-0 min-w-[240px] max-md:max-w-full">
      <h2 className="text-lg leading-10 text-gray-500">{title}</h2>
      {items.map((item, index) => (
        <TaskCard
          key={index}
          priority={item.priority}
          title={item.title}
          category={item.category}
          date={item.startDate}
          description={item.description}
          isCompleted={item.isCompleted}
          onClick={() => handleCardClick(item)}
        />
      ))}
      {selectedTask &&
        (selectedTask.isCompleted ? (
          <TaskModal
            task={selectedTask}
            onClose={handleCloseModal}
            onDelete={handleDeleteTask}
            onComplete={handleCompleteTask}
            modalType="completed"
          />
        ) : (
          <TaskModal
            task={selectedTask}
            onClose={handleCloseModal}
            onDelete={handleDeleteTask}
            onComplete={handleCompleteTask}
            modalType="incomplete"
          />
        ))}
    </section>
  );
}
