"use client";
import React, { useEffect, useState } from "react";
import { Task } from "@/components/TaskCard/types";

// Constants for days and months
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Function to get the days in the month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Fill in dates for the calendar grid
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const dates: (number | null)[] = Array.from<number | null>({
    length: firstDayOfMonth,
  })
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("../api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchTasks();
  }, [currentDate]);

  // Function to check if a task falls on a specific date
  const isTaskOnDate = (task: Task, date: Date) => {
    const taskStartDate = new Date(task.startDate);
    const taskEndDate = new Date(task.endDate);

    // Ignore the time part of the date
    const taskStartDateOnly = new Date(
      taskStartDate.getFullYear(),
      taskStartDate.getMonth(),
      taskStartDate.getDate()
    );
    const taskEndDateOnly = new Date(
      taskEndDate.getFullYear(),
      taskEndDate.getMonth(),
      taskEndDate.getDate()
    );
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    return dateOnly >= taskStartDateOnly && dateOnly <= taskEndDateOnly;
  };

  // Function to handle month change
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(event.target.value, 10);
    setCurrentDate(new Date(year, newMonth, 1));
  };

  // Function to handle year change
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setCurrentDate(new Date(newYear, month, 1));
  };

  return (
    <div className="w-4/5 mx-auto p-4">
      {/* Month and Year with Navigation */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <label htmlFor="month" className="mr-2">
            Month:
          </label>
          <select
            id="month"
            value={month}
            onChange={handleMonthChange}
            className="border rounded p-1"
          >
            {monthNames.map((monthName, index) => (
              <option key={index} value={index}>
                {monthName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="year" className="mr-2">
            Year:
          </label>
          <select
            id="year"
            value={year}
            onChange={handleYearChange}
            className="border rounded p-1"
          >
            {Array.from({ length: 10 }, (_, i) => year - 5 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Days of the Week Header */}
      <div className="grid grid-cols-7 text-center text-gray-700 font-medium">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-2 border">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 text-center gap-0 border-t border-l">
        {dates.map((date, index) => {
          const currentDate = new Date(year, month, date || 1);
          return (
            <div
              key={index}
              className="border-r border-b p-2 flex flex-col items-start justify-start aspect-square overflow-y-auto"
            >
              {/* Date number */}
              <span
                className={`text-lg font-semibold ${
                  date ? "" : "text-transparent"
                }`}
              >
                {date !== null ? date : ""}
              </span>

              {/* Tasks for the current date */}
              {tasks
                .filter((task) => isTaskOnDate(task, currentDate))
                .map((task, taskIndex) => (
                  <div
                    key={taskIndex}
                    className="mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md w-full"
                  >
                    {task.title}
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
