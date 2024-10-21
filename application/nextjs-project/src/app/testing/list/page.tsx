"use client";
import React, { useEffect, useState } from 'react';

interface Task {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  priority: string;
  category: string;
  description: string;
}

const ListTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchTasks();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 style={{marginTop: '20px', marginLeft: '20px'}}>Task List</h1>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} style={{marginTop: '20px', marginLeft: '20px'}}>
              <h2>{task.title}</h2>
              <p>Start Date: {task.startDate}</p>
              <p>End Date: {task.endDate}</p>
              <p>Priority: {task.priority}</p>
              <p>Category: {task.category}</p>
              <p>Description: {task.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{marginLeft: '20px'}}>No tasks found.</p>
      )}
    </div>
  );
};

export default ListTasks;
